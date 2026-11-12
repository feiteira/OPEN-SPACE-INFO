#!/usr/bin/env python3
"""Lint wiki pages against the authoring conventions (see AUTHORING.md).

Usage: python3 -I tools/check_page.py docs/path/page.md [more.md ...]
Exit code 0 when no errors (warnings may still be printed).
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
DOCS = os.path.join(ROOT, "docs")
REG = {o["slug"] for o in json.load(open(os.path.join(ROOT, "data", "sources.json")))}
PLAN = json.load(open(os.path.join(HERE, "plan.json")))
PLANNED = {p["path"] for p in PLAN["pages"]}
TABLES = set(PLAN["mib_tables"])
FIXED = {"index.md", "glossary.md", "references/index.md", "library/index.md", "mib/tables/index.md",
         "explorer/index.md", "about/index.md", "about/sources-and-copies.md", "about/methodology.md"}


def known_target(rel):
    if rel in PLANNED or rel in FIXED:
        return True
    m = re.fullmatch(r"library/([a-z0-9-]+)\.md", rel)
    if m:
        return m.group(1) in REG
    m = re.fullmatch(r"mib/tables/([a-z0-9_]+)\.md", rel)
    if m:
        return m.group(1) in TABLES
    return os.path.exists(os.path.join(DOCS, rel))


def check(path):
    errs, warns = [], []
    text = open(path, encoding="utf-8").read()
    rel_page = os.path.relpath(os.path.abspath(path), DOCS)
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        errs.append("missing YAML front matter")
        fm, body = "", text
    else:
        fm, body = m.group(1), text[m.end():]
    for key in ("title", "description", "sources"):
        if not re.search(rf"^{key}:", fm, re.M):
            errs.append(f"front matter lacks '{key}'")
    sm = re.search(r"^sources:\s*\[(.*?)\]", fm, re.M | re.S)
    srcs = []
    if sm:
        srcs = [s.strip().strip("'\"") for s in sm.group(1).split(",") if s.strip()]
        for s in srcs:
            if s not in REG:
                errs.append(f"front matter source '{s}' is not a registry slug")
    if not re.search(r"^# \S", body, re.M):
        errs.append("no level-1 heading ('# Title')")
    # links
    for lm in re.finditer(r"\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)", body):
        target = lm.group(1)
        if re.match(r"^[a-z]+://|^mailto:|^#", target):
            continue
        t = target.split("#", 1)[0]
        if not t:
            continue
        if not t.endswith(".md"):
            if not re.search(r"\.(png|svg|jpg|jpeg|gif|pdf|json|txt|csv)$", t):
                warns.append(f"link '{target}' does not point to a .md file")
            continue
        resolved = os.path.normpath(os.path.join(os.path.dirname(rel_page), t))
        if resolved.startswith(".."):
            errs.append(f"link '{target}' escapes docs/")
        elif not known_target(resolved):
            errs.append(f"link '{target}' -> '{resolved}' is not a planned/known page")
        lib = re.fullmatch(r"library/([a-z0-9-]+)\.md", resolved)
        if lib and lib.group(1) not in srcs:
            warns.append(f"cites library/{lib.group(1)} but it is not in front matter 'sources'")
    # footnotes
    refs = set(re.findall(r"\[\^([^\]]+)\](?!:)", body))
    defs = set(re.findall(r"^\[\^([^\]]+)\]:", body, re.M))
    for r in sorted(refs - defs):
        errs.append(f"footnote [^{r}] used but not defined")
    for d in sorted(defs - refs):
        warns.append(f"footnote [^{d}] defined but never used")
    if len(defs) == 0:
        errs.append("no footnote citations at all")
    # bitfields
    for bm in re.finditer(r"<div class=\"bitfield\"([^>]*)>", body):
        attrs = bm.group(1)
        fm2 = re.search(r"data-fields='([^']*)'", attrs)
        if not fm2:
            errs.append("bitfield without data-fields='[...]' (single-quoted JSON)")
            continue
        try:
            fields = json.loads(fm2.group(1))
            assert isinstance(fields, list) and fields
            for f in fields:
                assert isinstance(f.get("n"), str) and isinstance(f.get("b"), int) and f["b"] > 0
        except Exception as e:  # noqa: BLE001
            errs.append(f"bitfield data-fields JSON invalid: {e}")
    # mermaid fences closed
    if body.count("```") % 2:
        errs.append("odd number of ``` fences")
    words = len(re.findall(r"\w+", body))
    if words < 300:
        warns.append(f"page is short ({words} words)")
    return errs, warns, words


def main(paths):
    bad = 0
    for p in paths:
        errs, warns, words = check(p)
        status = "OK" if not errs else "FAIL"
        print(f"{status} {p} ({words} words)")
        for e in errs:
            print(f"  ERROR: {e}")
        for w in warns:
            print(f"  warn: {w}")
        bad += bool(errs)
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main(sys.argv[1:] or sys.exit(__doc__))
