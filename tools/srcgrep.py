#!/usr/bin/env python3
"""Search the extracted text of a registered source document.

Usage:
  python3 -I tools/srcgrep.py list [FILTER]            # list source slugs (optionally filtered)
  python3 -I tools/srcgrep.py info SLUG                # registry entry for one source
  python3 -I tools/srcgrep.py grep SLUG REGEX [-C N]   # matches with PDF page numbers
  python3 -I tools/srcgrep.py page SLUG N [M]          # print PDF page N (to M) of the text
  python3 -I tools/srcgrep.py toc SLUG                 # lines that look like numbered headings

The corpus root defaults to /home/feiteira/JLF/ESA-OPEN-DOCS and can be overridden
with the OSI_CORPUS environment variable. Page numbers are PDF page indexes
(1-based, counted from form feeds inserted by pdftotext), not printed page labels.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = os.environ.get("OSI_CORPUS", "/home/feiteira/JLF/ESA-OPEN-DOCS")
REG = os.path.join(HERE, "..", "data", "sources.json")


def registry():
    return {o["slug"]: o for o in json.load(open(REG))}


def pages(slug):
    reg = registry()
    if slug not in reg:
        sys.exit(f"unknown slug {slug!r}; try: srcgrep.py list")
    t = reg[slug].get("text")
    if not t:
        sys.exit(f"{slug} has no extracted text")
    return open(os.path.join(CORPUS, t), encoding="utf-8", errors="replace").read().split("\f")


def main(argv):
    if len(argv) < 2:
        sys.exit(__doc__)
    cmd = argv[1]
    if cmd == "list":
        flt = argv[2].lower() if len(argv) > 2 else ""
        for s, o in sorted(registry().items()):
            if flt in s or flt in (o.get("category") or ""):
                print(f"{s}\t{o.get('pages')}p\t{o.get('category')}\t{o.get('source_url')}")
    elif cmd == "info":
        print(json.dumps(registry()[argv[2]], indent=1))
    elif cmd == "grep":
        slug, rx = argv[2], re.compile(argv[3], re.I)
        ctx = int(argv[argv.index("-C") + 1]) if "-C" in argv else 0
        n = 0
        for pi, p in enumerate(pages(slug), 1):
            lines = p.split("\n")
            for li, line in enumerate(lines):
                if rx.search(line):
                    lo, hi = max(0, li - ctx), min(len(lines), li + ctx + 1)
                    for k in range(lo, hi):
                        mark = ">" if k == li else " "
                        print(f"p.{pi}{mark} {re.sub(' {3,}', '  ', lines[k]).rstrip()}")
                    if ctx:
                        print("--")
                    n += 1
                    if n >= 400:
                        print("... (truncated at 400 matches)")
                        return
    elif cmd == "page":
        ps = pages(argv[2])
        a = int(argv[3])
        b = int(argv[4]) if len(argv) > 4 else a
        for i in range(a, b + 1):
            if 1 <= i <= len(ps):
                print(f"===== PDF page {i} / {len(ps)} =====")
                print(re.sub(" {3,}", "  ", ps[i - 1]))
    elif cmd == "toc":
        rx = re.compile(r"^\s{0,6}(\d+(\.\d+){0,3}|[A-H](\.\d+){0,3}|ANNEX [A-Z])\s{1,6}[A-Z][^.]{2,90}$")
        for pi, p in enumerate(pages(argv[2]), 1):
            for line in p.split("\n"):
                if rx.match(line) and "...." not in line:
                    print(f"p.{pi}: {line.strip()}")
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main(sys.argv)
