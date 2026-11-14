#!/usr/bin/env python3
"""Write the explicit navigation into mkdocs.yml (between '# NAV-BEGIN' and '# NAV-END')."""
import glob
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
DOCS = os.path.join(ROOT, "docs")


def title(rel):
    p = os.path.join(DOCS, rel)
    if not os.path.exists(p):
        return None
    m = re.search(r"^title:\s*(.+)$", open(p, encoding="utf-8").read(4000), re.M)
    return m.group(1).strip().strip("'\"") if m else rel


def short(t):
    t = re.sub(r"\s*\((CCSDS|ECSS)[^)]*\)\s*$", "", t)
    return t.replace('"', "'")


NAV = [
    ("Home", "index.md"),
    ("Start here", [("How it all fits together", "overview/index.md"), ("The standards landscape", "overview/standards-map.md"),
                    ("Downlink walkthrough", "overview/downlink.md"), ("Uplink walkthrough", "overview/uplink.md"),
                    ("Worked example: TM packet", "overview/worked-example-tm.md"), ("Worked example: telecommand", "overview/worked-example-tc.md"),
                    ("History of the packet standards", "overview/history.md")]),
    ("CCSDS", [("ccsds/index.md"),
               ("Packets", ["ccsds/space-packet.md", "ccsds/encapsulation.md"]),
               ("Data link protocols", ["ccsds/tm-sdlp.md", "ccsds/tc-sdlp.md", "ccsds/cop-1.md", "ccsds/aos.md", "ccsds/uslp.md", "ccsds/proximity-1.md"]),
               ("Security", ["ccsds/sdls.md", "ccsds/security.md"]),
               ("Synchronization, coding & RF", ["ccsds/tm-coding.md", "ccsds/tc-coding-cltu.md", "ccsds/rf-and-ranging.md", "ccsds/space-link-identifiers.md"]),
               ("Time, files & data definition", ["ccsds/time-codes.md", "ccsds/cfdp.md", "ccsds/xtce.md"]),
               ("Space Link Extension", ["ccsds/sle/index.md", "ccsds/sle/return-services.md", "ccsds/sle/fcltu.md", "ccsds/sle/fsp.md", "ccsds/sle/isp1-and-api.md", "ccsds/sle/service-management.md"])]),
    ("ECSS & PUS", [("ecss/index.md"),
                    ("Packet Utilization Standard", ["ecss/pus/index.md", "ecss/pus/packets.md", "ecss/pus/parameter-types.md",
                                                     "ecss/pus/pus-a-vs-pus-c.md", "ecss/pus/message-types.md",
                                                     ("PUS services", "PUS_SERVICES")]),
                    ("Other ECSS standards", ["ecss/e-st-50-communications.md", "ecss/e-st-70c.md", "ecss/e-st-70-31c.md", "ecss/e-st-70-11c.md",
                                              "ecss/e-st-70-32c.md", "ecss/e-st-70-01c.md"])]),
    ("SCOS-2000", ["scos2000/index.md", "scos2000/architecture.md", "scos2000/egse.md", "scos2000/time-correlation.md",
                   ("Data dissemination & archives", ["scos2000/edds.md", "scos2000/edds-formats.md", "scos2000/tdrs.md",
                                                       "scos2000/gdds-and-ddids.md", "scos2000/archives.md"]),
                   ("Ground stations", ["scos2000/nctrs-nis.md"]),
                   ("Operations preparation", ["scos2000/operations-preparation.md"]),
                   ("Evolution & case studies", ["scos2000/ancillary-and-egs-cc.md", "scos2000/herschel-planck-ground.md", "scos2000/herschel-planck-interfaces.md"])]),
    ("The MIB", ["mib/index.md", "mib/data-model.md", "mib/parameter-types.md",
                 ("Monitoring", ["mib/monitoring.md", "mib/calibration.md", "mib/monitoring-checks.md", "mib/synthetic-parameters.md"]),
                 ("Commanding", ["mib/commanding.md", "mib/command-verification.md", "mib/sequences.md"]),
                 "mib/displays.md", "mib/tailoring.md", "mib/icd-history.md", "mib/tooling.md",
                 ("Table reference", "TABLES")]),
    ("Missions", ["missions/index.md",
                  ("Solar Orbiter", ["missions/solar-orbiter/index.md", "missions/solar-orbiter/mib.md",
                                     "missions/solar-orbiter/pus-usage.md", "missions/solar-orbiter/swa.md",
                                     "missions/solar-orbiter/stix.md", "missions/solar-orbiter/instrument-interfaces.md"]),
                  "missions/herschel-planck.md", "missions/rosetta-mex-vex.md", "missions/other-missions.md"]),
    ("MIB Explorer", "explorer/index.md"),
    ("Simulator", "simulator/index.md"),
    ("Library", ["library/index.md", ("Reference catalogue", "references/index.md"), ("Glossary", "glossary.md"),
                 ("Sources & copies", "about/sources-and-copies.md"), ("Third-party notice", "third-party/NOTICE.md")]),
    ("About", ["about/index.md", "about/methodology.md"]),
]


def expand(item, depth):
    pad = "  " * depth
    lines = []
    if isinstance(item, str):
        t = title(item)
        if t is not None:
            lines.append(f'{pad}- "{short(t)}": {item}' if not item.endswith("index.md") else f"{pad}- {item}")
        return lines
    name, target = item
    if target == "PUS_SERVICES":
        sub = sorted(glob.glob(os.path.join(DOCS, "ecss/pus/st*.md")))
        lines.append(f'{pad}- "{name}":')
        for p in sub:
            rel = os.path.relpath(p, DOCS)
            lines.append(f'{pad}  - "{short(title(rel))}": {rel}')
        return lines
    if target == "TABLES":
        lines.append(f'{pad}- "{name}":')
        lines.append(f"{pad}  - mib/tables/index.md")
        for p in sorted(glob.glob(os.path.join(DOCS, "mib/tables/*.md"))):
            rel = os.path.relpath(p, DOCS)
            if rel.endswith("index.md"):
                continue
            lines.append(f'{pad}  - "{os.path.basename(rel)[:-3]}.dat": {rel}')
        return lines
    if isinstance(target, str):
        if title(target) is not None:
            lines.append(f'{pad}- "{name}": {target}')
        return lines
    sub = []
    for x in target:
        sub += expand(x, depth + 1)
    if sub:
        lines.append(f'{pad}- "{name}":')
        lines += sub
    return lines


def main():
    out = ["nav:"]
    for item in NAV:
        if isinstance(item, tuple) and isinstance(item[1], list):
            name, target = item
            sub = []
            for x in target:
                sub += expand(x if not (isinstance(x, str) and False) else x, 2)
            if sub:
                out.append(f'  - "{name}":')
                out += sub
        else:
            out += expand(item, 1)
    block = "# NAV-BEGIN\n" + "\n".join(out) + "\n# NAV-END\n"
    p = os.path.join(ROOT, "mkdocs.yml")
    y = open(p, encoding="utf-8").read()
    if "# NAV-BEGIN" in y:
        y = re.sub(r"# NAV-BEGIN\n.*?# NAV-END\n", block, y, flags=re.S)
    else:
        y = y.rstrip("\n") + "\n\n" + block
    open(p, "w", encoding="utf-8").write(y)
    print(f"nav written: {len(out) - 1} lines")


if __name__ == "__main__":
    main()
