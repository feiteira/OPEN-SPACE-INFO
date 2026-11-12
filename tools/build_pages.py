#!/usr/bin/env python3
"""Generate the data-driven wiki pages.

Usage: python3 -I tools/build_pages.py

Inputs : data/sources.json, data/library/*.json, data/mib_schema/*.json, data/glossary.json (optional),
         docs/explorer/data/*/meta.json, front matter 'sources' of the hand-written pages.
Outputs: docs/library/*.md, docs/references/index.md, docs/mib/tables/*.md, docs/about/sources-and-copies.md,
         docs/glossary.md, docs/includes/abbreviations.md, docs/explorer/data/fields.json
"""
import glob
import json
import os
import re
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
DOCS = os.path.join(ROOT, "docs")
REG = json.load(open(os.path.join(ROOT, "data", "sources.json")))
REGD = {o["slug"]: o for o in REG}
GENERATED_DIRS = ("library/", "references/", "mib/tables/")

CATEGORY = {
    "ccsds": "CCSDS standards and reports", "ecss": "ECSS standards", "mib-icd": "MIB / Database Import ICD",
    "edds": "EDDS (EGOS Data Dissemination System)", "core": "SCOS-2000, EGSE and Herschel/Planck",
    "tdrs": "TDRS", "nis": "Ground stations, NCTRS/NIS and SLE", "mission-ddid": "Mission data delivery documents",
    "context": "ESOC evolution and context", "tooling": "Tools, MIB editors and related standards", "mib": "MIB databases (data)",
}
TABLE_ORDER = ["general", "monitoring", "display", "commanding", "verification", "sequence", "parameter-set", "mission-specific"]
FAMILY_LABEL = {"general": "General", "monitoring": "Monitoring", "display": "Displays", "commanding": "Commanding",
                "verification": "Command verification", "sequence": "Command sequences", "parameter-set": "Parameter sets",
                "mission-specific": "Solar Orbiter mission-specific tables (not in the ICD)"}


def H(s):
    """Escape untrusted text for inline Markdown/HTML."""
    s = "" if s is None else str(s)
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def M(s):
    """Neutralise raw HTML in untrusted Markdown text, leaving code spans untouched."""
    parts = re.split(r"(`[^`]*`)", "" if s is None else str(s))
    return "".join(p if p.startswith("`") and p.endswith("`") and len(p) > 1 else p.replace("<", "&lt;").replace(">", "&gt;") for p in parts)


def cell(s):
    return M(s).replace("|", "\\|").replace("\n", " ").strip()


def yaml_str(s):
    return json.dumps(str(s or ""), ensure_ascii=False)


def write(rel, text):
    p = os.path.join(DOCS, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as fh:
        fh.write(text)


def rel_link(from_rel, to_rel):
    return os.path.relpath(to_rel, os.path.dirname(from_rel)).replace(os.sep, "/")


def third_party_path(o):
    parts = o["local"].split("/")
    return "third-party/" + "/".join(parts[1:])


def human_size(n):
    for u in ("B", "KB", "MB", "GB"):
        if n < 1024 or u == "GB":
            return f"{n:.0f} {u}" if u == "B" else f"{n:.1f} {u}"
        n /= 1024.0


def front_matter(path):
    t = open(path, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n", t, re.S)
    if not m:
        return {}, t
    fm = m.group(1)
    out = {}
    tm = re.search(r"^title:\s*(.+)$", fm, re.M)
    if tm:
        out["title"] = tm.group(1).strip().strip("'\"")
    sm = re.search(r"^sources:\s*\[(.*?)\]", fm, re.M | re.S)
    if sm:
        out["sources"] = [s.strip().strip("'\"") for s in sm.group(1).split(",") if s.strip()]
    return out, t[m.end():]


def collect_cited_by():
    cited = defaultdict(list)
    for p in sorted(glob.glob(os.path.join(DOCS, "**", "*.md"), recursive=True)):
        rel = os.path.relpath(p, DOCS).replace(os.sep, "/")
        if rel.startswith(GENERATED_DIRS) or rel.startswith("includes/"):
            continue
        fm, body = front_matter(p)
        title = fm.get("title") or rel
        for s in set(fm.get("sources", [])) | set(re.findall(r"library/([a-z0-9-]+)\.md", body)):
            cited[s].append((title, rel))
    return cited


def mib_records():
    out = {}
    for key, slug in (("solo", "mib-20250916m25925pfms001-sol"), ("solo2020", "mib-20200416m10720pfms001-sol"), ("swa", "swa-idb-ascii")):
        mp = os.path.join(DOCS, "explorer", "data", key, "meta.json")
        meta = json.load(open(mp)) if os.path.exists(mp) else {"counts": {}}
        c = meta.get("counts", {})
        name = os.path.basename(REGD[slug]["source_url"])
        if key == "swa":
            title = "Solar Orbiter SWA instrument database, MIB-style ASCII tables (IRAP ASCII.zip)"
            what = ("The Solar Wind Analyser (SWA) instrument database in SCOS-2000 MIB table format, posted by the SWA/PAS team "
                    "at IRAP next to the spacecraft MIB releases.")
        else:
            d = re.search(r"MIB__(\d{4})(\d\d)(\d\d)", name)
            date = f"{d.group(1)}-{d.group(2)}-{d.group(3)}" if d else ""
            title = f"Solar Orbiter MIB release {date} ({name[:-4]})"
            what = (f"A complete Solar Orbiter Mission Information Base release dated {date}: the SCOS-2000 ASCII tables "
                    "(one tab-separated .dat file per table) plus the synthetic-parameter OL definitions, as posted publicly by "
                    "the Solar Orbiter SWA/PAS team at IRAP.")
        stats = ", ".join(f"{t}: {n:,}" for t, n in sorted(c.items(), key=lambda kv: -kv[1]) if n)
        out[slug] = {
            "slug": slug, "title": title, "short_title": title, "doc_id": name, "issue": None,
            "date": None, "organisation": "Solar Orbiter mission (MIB as posted by the SWA/PAS team at IRAP)", "authors": [],
            "doc_type": "Database (MIB)", "status_notes": None,
            "summary": what + f" The zip was copied unchanged; the wiki's [MIB Explorer](../explorer/index.md#/{key}) is generated from it. "
                       f"Row counts per table: {stats}.",
            "contents": [], "key_points": [], "references": [], "topics": ["missions/solar-orbiter/mib.md", "mib/index.md"],
            "notes": "The posting page states no licence or terms of use.", "_explorer": key,
        }
    return out


def load_library():
    recs = {}
    for f in glob.glob(os.path.join(ROOT, "data", "library", "*.json")):
        try:
            r = json.load(open(f, encoding="utf-8"))
            recs[r["slug"]] = r
        except Exception as e:  # noqa: BLE001
            print("bad library record", f, e)
    recs.update(mib_records())
    return recs


def norm_id(s):
    s = (s or "").upper().replace("\u2013", "-").replace("\u2014", "-")
    s = re.sub(r"[\s_]+", "-", s.strip())
    s = re.sub(r"[\[\]()]", "", s)
    s = re.sub(r"-+", "-", s).strip("-")
    s = re.sub(r"^ISSUE.*", "", s)
    return s


def ref_key(r):
    i = norm_id(r.get("doc_id"))
    if i and len(i) >= 4 and i not in ("NONE", "NULL", "N/A", "-"):
        i = re.sub(r"(-I\d+R\d+|-ISSUE-?\d.*|-VERSION-?\d.*)$", "", i)
        return "id:" + i
    t = re.sub(r"[^a-z0-9]+", " ", (r.get("title") or "").lower()).strip()
    return "t:" + t[:120] if t else None


def anchor(k):
    return "ref-" + re.sub(r"[^a-z0-9]+", "-", k.split(":", 1)[1].lower()).strip("-")[:80]


def family_of(k, title):
    s = k.split(":", 1)[1]
    t = (title or "").upper()
    if s.startswith("CCSDS") or "CCSDS" in t or re.match(r"^\d{3}\.\d-[BGMYOR]", s):
        return "CCSDS"
    if s.startswith("ECSS") or "ECSS" in t:
        return "ECSS"
    if s.startswith("ISO") or s.startswith("IEC"):
        return "ISO / IEC"
    if s.startswith("EGOS") or s.startswith("S2K") or "SCOS" in t or s.startswith("DTOS") or s.startswith("ESOC") or "-TOS-" in s:
        return "ESA/ESOC ground segment (SCOS-2000, EGOS, EDDS, NIS ...)"
    if re.match(r"^(SCI|H-P|HP-|HSC|FIRST|SPIRE|PACS|HIFI|SRON|PT-|PICC|LFI|HFI|PL-)", s) or "HERSCHEL" in t or "PLANCK" in t:
        return "Herschel / Planck"
    if re.match(r"^(RO-|MEX-|VEX-|SOL-|SOL\.|SO-|BC-|JUI)", s) or "SOLAR ORBITER" in t or "ROSETTA" in t:
        return "Mission documents (Rosetta, Mars Express, Venus Express, Solar Orbiter ...)"
    return "Other documents"


def build_library(recs, cited):
    lib_ids = {}
    for slug, r in recs.items():
        k = ref_key({"doc_id": r.get("doc_id"), "title": r.get("title")})
        if k:
            lib_ids.setdefault(k, []).append(slug)
    for o in REG:
        slug = o["slug"]
        r = recs.get(slug) or {"slug": slug, "title": slug, "short_title": slug, "summary": "Metadata not yet extracted."}
        rel = f"library/{slug}.md"
        tp = third_party_path(o)
        meta_rows = [
            ("Document ID", r.get("doc_id")), ("Issue / version", r.get("issue")), ("Date", r.get("date")),
            ("Organisation", r.get("organisation")), ("Authors", ", ".join(r.get("authors") or [])),
            ("Type", r.get("doc_type")), ("Status", r.get("status_notes")), ("Pages", o.get("pages")),
        ]
        prov_rows = [
            ("Original location", f'<a href="{H(o["source_url"])}" rel="noopener">{H(o["source_url"])}</a>'),
            ("Retrieved via", f'<a href="{H(o["retrieved_via"])}" rel="noopener">Internet Archive snapshot</a> (the original URL no longer served the file)' if o.get("retrieved_via") else None),
            ("Copied (UTC)", H(o["copied_at"])),
            ("SHA-256", f"<code>{H(o['sha256'])}</code>"),
            ("Size", human_size(o["bytes"])),
            ("Our copy", f'<a href="{rel_link(rel, tp)}">{H(os.path.basename(tp))}</a> (unchanged third-party file, not MIT; see the <a href="{rel_link(rel, "third-party/NOTICE.md")[:-3]}/">notice</a>)'),
        ]
        desc = re.split(r"(?<=[.!?])\s", re.sub(r"[*_`\[\]]", "", r.get("summary") or ""), maxsplit=1)[0][:200]
        out = ["---", f"title: {yaml_str(r.get('short_title') or r.get('title'))}", f"description: {yaml_str(desc)}",
               f"tags: [{yaml_str(r.get('doc_type') or 'Document')}, {yaml_str(CATEGORY.get(o['category'], o['category']))}]",
               f"sources: [{slug}]", "---", "", f"# {H(r.get('title') or slug)}", ""]
        out.append('<dl class="osi-meta">' + "".join(f"<dt>{k}</dt><dd>{H(v)}</dd>" for k, v in meta_rows if v not in (None, "", [])) + "</dl>\n")
        out.append("## Provenance\n")
        out.append('<dl class="osi-meta">' + "".join(f"<dt>{k}</dt><dd>{v}</dd>" for k, v in prov_rows if v) + "</dl>\n")
        out.append("## Summary\n\n" + M(r.get("summary") or "") + "\n")
        if r.get("_explorer"):
            out.append(f"\n[:material-database-search: Open this database in the MIB Explorer](../explorer/index.md#/{r['_explorer']}){{ .md-button .md-button--primary }}\n")
        if r.get("key_points"):
            out.append("\n## Key points\n")
            for kp in r["key_points"]:
                pg = f" *(PDF p. {kp['pdf_page']})*" if kp.get("pdf_page") else ""
                out.append(f"- {M(kp.get('text'))}{pg}")
            out.append("")
        cb = sorted(set(cited.get(slug, [])))
        out.append(f"\n## Cited by these wiki pages ({len(cb)})\n")
        if cb:
            for t, p in cb:
                out.append(f"- [{H(t)}]({rel_link(rel, p)})")
        else:
            out.append("*No wiki page cites this document yet.*")
        out.append("")
        if r.get("contents"):
            out.append("\n??? abstract \"Contents (" + str(len(r["contents"])) + " headings)\"\n")
            out.append("    | Section | Title | PDF page |\n    |---|---|---|")
            for c in r["contents"]:
                out.append(f"    | {cell(c.get('section'))} | {cell(c.get('title'))} | {cell(c.get('pdf_page'))} |")
            out.append("")
        refs = r.get("references") or []
        out.append(f"\n## Documents this one references ({len(refs)})\n")
        if refs:
            out.append("| Label | Document | Title | Issue / date | Kind |\n|---|---|---|---|---|")
            for x in refs:
                k = ref_key(x)
                did = cell(x.get("doc_id") or "")
                if k:
                    did = f"[{did or 'catalogue'}](../references/index.md#{anchor(k)})"
                    if k in lib_ids:
                        did += " · " + ", ".join(f"[library]({s}.md)" for s in lib_ids[k] if s != slug)
                iss = " ".join(cell(v) for v in (x.get("issue"), x.get("date")) if v)
                out.append(f"| {cell(x.get('label'))} | {did} | {cell(x.get('title'))} | {iss} | {cell(x.get('kind'))} |")
        else:
            out.append("*This document has no reference list.*")
        if r.get("notes"):
            out.append("\n!!! note \"Notes\"\n    " + M(r["notes"]).replace("\n", "\n    "))
        out.append("")
        write(rel, "\n".join(out) + "\n")
    # index
    by = defaultdict(list)
    for o in REG:
        by[o["category"]].append(o)
    idx = ["---", "title: Library", "description: Every source document and dataset used by this wiki, with summary, contents, reference list, original link and copy time.",
           "hide: [toc]", "sources: []", "---", "", "# Library", "",
           f"The library holds **{len(REG)} sources** used to write this wiki: standards, interface control documents, manuals, papers, presentations and MIB databases. "
           "Every entry has a summary, its table of contents, the documents it references, the wiki pages that cite it, a link to its original location, "
           "the UTC time it was copied, and a SHA-256 checksum of the copy kept in this repository. See [Sources & copies](../about/sources-and-copies.md) "
           "for the provenance policy, and the [reference catalogue](../references/index.md) for every document these sources cite.", ""]
    order = ["ccsds", "ecss", "mib-icd", "mib", "core", "edds", "tdrs", "nis", "mission-ddid", "context", "tooling"]
    for cat in order + [c for c in by if c not in order]:
        if cat not in by:
            continue
        idx.append(f"## {CATEGORY.get(cat, cat)} ({len(by[cat])})\n")
        idx.append("| Document | ID | Issue | Date | Type |\n|---|---|---|---|---|")
        for o in sorted(by[cat], key=lambda o: (recs.get(o["slug"], {}).get("short_title") or o["slug"]).lower()):
            r = recs.get(o["slug"], {})
            idx.append(f"| [{cell(r.get('short_title') or o['slug'])}]({o['slug']}.md) | {cell(r.get('doc_id'))} | {cell(r.get('issue'))} | {cell(r.get('date'))} | {cell(r.get('doc_type'))} |")
        idx.append("")
    write("library/index.md", "\n".join(idx) + "\n")
    return lib_ids


def build_references(recs, lib_ids):
    cat = {}
    for slug, r in recs.items():
        for x in r.get("references") or []:
            k = ref_key(x)
            if not k:
                continue
            e = cat.setdefault(k, {"ids": set(), "titles": defaultdict(int), "issues": set(), "cited": []})
            if x.get("doc_id"):
                e["ids"].add(str(x["doc_id"]).strip())
            if x.get("title"):
                e["titles"][str(x["title"]).strip()] += 1
            iss = " ".join(str(v) for v in (x.get("issue"), x.get("date")) if v)
            if iss:
                e["issues"].add(iss)
            e["cited"].append((slug, x.get("label") or "", x.get("pdf_page")))
    fams = defaultdict(list)
    for k, e in cat.items():
        title = max(e["titles"].items(), key=lambda kv: (kv[1], len(kv[0])))[0] if e["titles"] else ""
        fams[family_of(k, title)].append((k, e, title))
    total = len(cat)
    n_lib = sum(1 for k in cat if k in lib_ids)
    out = ["---", "title: Reference catalogue", "description: Every document cited by any document in the library, merged by identifier, with where it is cited and whether we hold a copy.",
           "sources: []", "---", "", "# Reference catalogue", "",
           f"This catalogue merges the reference lists of all {len(recs)} library sources: **{total} distinct documents**, cited "
           f"{sum(len(e['cited']) for e in cat.values())} times in total. **{n_lib}** of them are in our [library](../library/index.md); "
           "the rest are cited but not publicly available as far as we know (for example ESA-internal SUMs, ADDs and ICDs). "
           "Entries are merged by normalised document identifier, or by title when there is no identifier, so variant spellings may still appear separately.", "",
           "!!! tip \"Looking for an internal document?\"\n    Many SCOS-2000 documents are distributed only with the software (MICONYS, under the ESA Software Community License). "
           "The catalogue tells you their exact identifiers and which public documents cite them.", ""]
    fam_order = ["CCSDS", "ECSS", "ISO / IEC", "ESA/ESOC ground segment (SCOS-2000, EGOS, EDDS, NIS ...)", "Herschel / Planck",
                 "Mission documents (Rosetta, Mars Express, Venus Express, Solar Orbiter ...)", "Other documents"]
    for fam in fam_order:
        items = fams.get(fam)
        if not items:
            continue
        out.append(f"## {fam} ({len(items)})\n")
        for k, e, title in sorted(items, key=lambda t: (t[0].split(':', 1)[1])):
            ident = " / ".join(sorted(e["ids"]))[:200] or "(no identifier)"
            hold = " · ".join(f"[:material-book-check: in library]({rel_link('references/index.md', f'library/{s}.md')})" for s in lib_ids.get(k, []))
            out.append(f'<a id="{anchor(k)}"></a>\n**{H(ident)}**: {H(title)} {hold}\n')
            if e["issues"]:
                out.append(f": Issues cited: {H('; '.join(sorted(e['issues']))[:400])}\n")
            cites = defaultdict(list)
            for s, lab, pg in e["cited"]:
                cites[s].append(lab)
            out.append(": Cited by: " + ", ".join(
                f"[{H((recs.get(s, {}).get('short_title') or s))}]({rel_link('references/index.md', f'library/{s}.md')})" +
                (f" ({H(', '.join(sorted(set(l for l in labs if l)))[:60])})" if any(labs) else "")
                for s, labs in sorted(cites.items())) + "\n")
    write("references/index.md", "\n".join(out) + "\n")
    return total


def build_tables():
    sch = {}
    for f in glob.glob(os.path.join(ROOT, "data", "mib_schema", "*.json")):
        name = os.path.basename(f)[:-5]
        try:
            sch[name] = json.load(open(f, encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            print("bad schema", f, e)
    gen = sch.pop("_general", {})
    names = {t["table"]: t for t in gen.get("tables", [])}
    fields_json = {"_ptcpfc": {}}
    for row in gen.get("ptc_pfc_monitoring", []):
        try:
            fields_json["_ptcpfc"][f"{int(row['ptc'])}/{int(row['pfc'])}"] = {
                "t": row.get("s2k_type") or row.get("encoding") or "", "bits": row.get("size_bits") if isinstance(row.get("size_bits"), int) else None,
                "note": (row.get("pus_name") or "")}
        except Exception:  # noqa: BLE001
            pass
    by_family = defaultdict(list)
    for t, d in sorted(sch.items()):
        rel = f"mib/tables/{t}.md"
        fam = d.get("family") or names.get(t, {}).get("family") or ("mission-specific" if not d.get("icd", True) else "general")
        by_family[fam].append((t, d))
        fields_json[t] = {f["name"]: {"type": f.get("type"), "d": (f.get("description") or "")[:400]} for f in d.get("fields", []) if f.get("name")}
        icd = d.get("icd", True)
        title = f"{t}.dat: {d.get('name') or names.get(t, {}).get('title') or t}"
        out = ["---", f"title: {yaml_str(title)}", f"description: {yaml_str((d.get('purpose') or '')[:200])}",
               f"tags: [MIB, {yaml_str(FAMILY_LABEL.get(fam, fam))}]",
               "sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]", "---", "", f"# {H(title)}", ""]
        chips = [f"ICD 7.0 §{d['icd_section']}" if d.get("icd_section") and icd else "not defined in the ICD",
                 f"{(d.get('solo_stats') or {}).get('rows', 0):,} rows in Solar Orbiter 2025-09-16"]
        out.append('<div class="osi-chips">' + "".join(f'<span class="osi-chip{" warn" if "not defined" in c else ""}">{H(c)}</span>' for c in chips) + "</div>\n")
        if not icd:
            out.append('!!! warning "Inference"\n    This table is not defined by the SCOS-2000 Database Import ICD. Its column meanings below were '
                       "inferred from the data and are this wiki's interpretation.\n")
        out.append(H(d.get("purpose") or "") + (f"[^icd]" if icd and d.get("pdf_page") else "") + "\n")
        if d.get("keys"):
            out.append("**Key:** " + ", ".join(f"`{H(k)}`" for k in d["keys"]) + "\n")
        out.append("## Fields\n")
        out.append('<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>')
        stats = {f["name"]: f for f in (d.get("solo_stats") or {}).get("fields", []) if isinstance(f, dict) and f.get("name")}
        rows = (d.get("solo_stats") or {}).get("rows") or 0
        for f in d.get("fields", []):
            vals = ""
            if f.get("values"):
                vals = '<ul class="osi-vals">' + "".join(f"<li><code>{H(v.get('value'))}</code> {H(v.get('meaning'))}</li>" for v in f["values"] if isinstance(v, dict)) + "</ul>"
            extra = []
            if f.get("default") not in (None, ""):
                extra.append(f"Default <code>{H(f['default'])}</code>.")
            if f.get("references"):
                ref = str(f["references"])
                tm = re.match(r"([a-z0-9_]+)\.", ref)
                extra.append("Refers to " + (f'<a href="../{tm.group(1)}/">{H(ref)}</a>' if tm and tm.group(1) in sch else H(ref)) + ".")
            st = stats.get(f.get("name"))
            if st and rows:
                ex = ", ".join(f"<code>{H(e)}</code>" for e in (st.get("examples") or [])[:5])
                extra.append(f'<span class="osi-fstat">Solar Orbiter: filled in {st.get("filled", 0):,} of {rows:,} rows' + (f"; e.g. {ex}" if ex else "") + "</span>")
            pg = f' <span class="osi-pg">ICD PDF p. {H(f["pdf_page"])}</span>' if f.get("pdf_page") and icd else ""
            out.append(f'<tr id="{H((f.get("name") or "").lower())}"><td>{H(f.get("pos"))}</td><td><code>{H(f.get("name"))}</code></td><td>{H(f.get("type"))}</td>'
                       f'<td>{H(f.get("mandatory"))}</td><td>{H(f.get("description"))}{vals}<div class="osi-extra">{" ".join(extra)}{pg}</div></td></tr>')
        out.append("</tbody></table></div>\n")
        if d.get("relationships"):
            out.append("## Relationships\n")
            for r in d["relationships"]:
                tgt = str(r.get("target") or "")
                links = re.sub(r"\b([a-z]{2,6})\.([A-Z][A-Z0-9_]+)", lambda m: f"[{m.group(0)}]({m.group(1)}.md#{m.group(2).lower()})" if m.group(1) in sch else m.group(0), H(tgt))
                out.append(f"- `{H(r.get('field'))}` → {links}" + (f": {H(r.get('note'))}" if r.get("note") else ""))
            out.append("")
        if d.get("history"):
            out.append("## History across ICD issues\n\n" + H(d["history"]) + "\n")
        if d.get("notes"):
            out.append('!!! note "Notes from the extraction"\n    ' + H(d["notes"]).replace("\n", "\n    ") + "\n")
        out.append(f"## In the Solar Orbiter MIB\n\nThe 2025-09-16 release has **{rows:,}** rows in `{t}.dat`. "
                   f"Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the "
                   f"[Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).\n")
        if icd and d.get("pdf_page"):
            out.append(f"[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §{H(d.get('icd_section'))}, PDF p. {H(d.get('pdf_page'))}.")
        write(rel, "\n".join(out) + "\n")
    # index
    idx = ["---", "title: MIB table reference", "description: Every table of the SCOS-2000 MIB, field by field, from the Database Import ICD issue 7.0, with Solar Orbiter statistics.",
           "sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]", "---", "", "# MIB table reference", "",
           "One page per table of the SCOS-2000 Mission Information Base. Each page lists every field in ICD order, with its type, whether it is mandatory, "
           "its meaning and allowed values, foreign keys, history across ICD issues, and how it is filled in the real Solar Orbiter MIB. "
           "Field definitions come from the [SCOS-2000 Database Import ICD issue 7.0](../../library/icd-7-0-final.md), cross-checked against the "
           "open-source pyscos2000 schema (based on issue 7.2) and the data. For concepts, start with [The MIB](../index.md) and the [data model](../data-model.md).", ""]
    for fam in TABLE_ORDER + [f for f in by_family if f not in TABLE_ORDER]:
        if fam not in by_family:
            continue
        idx.append(f"## {FAMILY_LABEL.get(fam, fam)}\n\n| Table | Name | ICD § | Fields | Solar Orbiter rows |\n|---|---|---|---|---|")
        for t, d in by_family[fam]:
            idx.append(f"| [`{t}.dat`]({t}.md) | {cell(d.get('name'))} | {cell(d.get('icd_section') if d.get('icd', True) else '—')} | {len(d.get('fields', []))} | {(d.get('solo_stats') or {}).get('rows', 0):,} |")
        idx.append("")
    if gen.get("ptc_pfc_monitoring"):
        idx.append("## Parameter types (PTC/PFC) accepted by SCOS-2000\n\nFrom the ICD's parameter type tables. See [MIB parameter types](../parameter-types.md) for the explanation.\n")
        idx.append("| PTC | PFC | SCOS-2000 type | Size | PUS name | ICD PDF p. |\n|---|---|---|---|---|---|")
        for r in gen["ptc_pfc_monitoring"]:
            idx.append(f"| {cell(r.get('ptc'))} | {cell(r.get('pfc'))} | {cell(r.get('s2k_type'))} | {cell(r.get('size'))} | {cell(r.get('pus_name'))} | {cell(r.get('pdf_page'))} |")
        idx.append("")
    write("mib/tables/index.md", "\n".join(idx) + "\n")
    with open(os.path.join(DOCS, "explorer", "data", "fields.json"), "w", encoding="utf-8") as fh:
        json.dump(fields_json, fh, ensure_ascii=False, separators=(",", ":"))
    return len(sch)


def build_sources_page(recs):
    out = ["---", "title: Sources & copies", "description: Where every piece of information on this site comes from: original links, copy times and checksums for every document and dataset.",
           "hide: [toc]", "sources: []", "---", "", "# Sources & copies", "",
           '!!! abstract "In one sentence"\n    **All information on this site was retrieved from sources publicly available online.** This page links back to every one of them.', "",
           "## How the information was gathered", "",
           "Every document and dataset listed below was downloaded from a public web location that needed no login, payment or circumvention of access "
           "controls. Each download was logged with its original URL, the UTC time of the copy and a SHA-256 checksum. Three files that had moved were "
           "retrieved from Internet Archive snapshots of their original addresses; their entries say so. Text was extracted from the PDFs, and every wiki page "
           "cites the clause and PDF page it relies on. Pages that analyse the Solar Orbiter MIB cite the release they queried.", "",
           "Copies of the files are kept unchanged in this repository's [`third-party/`](../third-party/NOTICE.md) folder, so the citations stay checkable if an original "
           "location disappears. **They remain the property of their owners and are not covered by the MIT License** of the wiki text and code. "
           "If you are a rights holder and want a file removed, please open an issue on the repository.", "",
           "## Not copied", "",
           "- Five AIAA SpaceOps papers (SCOS-2000 Release 5, NIS, Data Security, Multi-Spacecraft, Common EGSE/MCS for Herschel/Planck) returned HTTP 403 (paywall). They are cited by title only.",
           "- The Herschel/Planck spacecraft database zips in the ESA Herschel Science Archive (`/hsa/legacy/operations/moc/sdb/data/`) returned HTTP 403 on 2026-11-05 and again on 2026-11-12.",
           "- 109 of the 111 Solar Orbiter MIB releases on the IRAP server: only the first (2020-04-16) and the latest (2025-09-16) were copied, to avoid a long bulk download from a small team server.", "",
           f"## All {len(REG)} sources", "",
           "| # | Source | Original location | Copied (UTC) | SHA-256 | Size | Our copy |", "|---|---|---|---|---|---|---|"]
    for i, o in enumerate(sorted(REG, key=lambda o: (o["category"], o["slug"])), 1):
        r = recs.get(o["slug"], {})
        url = o["source_url"]
        via = f" (via [archive]({o['retrieved_via']}))" if o.get("retrieved_via") else ""
        out.append(f"| {i} | [{cell(r.get('short_title') or o['slug'])}](../library/{o['slug']}.md) | [{cell(o.get('host'))}]({url}){via} | {o['copied_at']} | "
                   f"<code title=\"{o['sha256']}\">{o['sha256'][:12]}…</code> | {human_size(o['bytes'])} | [file](../{third_party_path(o)}) |")
    out.append("")
    write("about/sources-and-copies.md", "\n".join(out) + "\n")


def build_glossary():
    p = os.path.join(ROOT, "data", "glossary.json")
    if not os.path.exists(p):
        return 0
    terms = json.load(open(p, encoding="utf-8"))
    # abbreviations snippet (tooltips across the site)
    ab = []
    for t in sorted(terms, key=lambda t: t["abbr"].lower()):
        if re.fullmatch(r"[A-Za-z][A-Za-z0-9/\-]{1,14}", t["abbr"]) and t["abbr"].upper() == t["abbr"] or re.fullmatch(r"[A-Z][A-Za-z0-9]{1,10}", t["abbr"]):
            ab.append(f"*[{t['abbr']}]: {t['expansion'].replace(']', ')')}")
    write("includes/abbreviations.md", "\n".join(ab) + "\n")
    out = ["---", "title: Glossary", "description: Acronyms and terms used across this wiki, with their expansions as defined by the sources.",
           "sources: []", "---", "", "# Glossary", "",
           f"{len(terms)} acronyms and terms used in this wiki, expanded as the source documents define them. Across the whole site, "
           "hovering an acronym shows its expansion.", ""]
    letter = None
    for t in sorted(terms, key=lambda t: t["abbr"].lower()):
        L = t["abbr"][0].upper()
        if L != letter:
            letter = L
            out.append(f"\n## {L}\n")
        pages = ", ".join(f"[{H(pt)}]({pp})" for pt, pp in t.get("pages", [])[:6])
        out.append(f"**{H(t['abbr'])}**\n: {H(t['expansion'])}" + (f"  \n  <small>Used in: {pages}</small>" if pages else "") + "\n")
    write("glossary.md", "\n".join(out) + "\n")
    return len(terms)


def main():
    cited = collect_cited_by()
    recs = load_library()
    lib_ids = build_library(recs, cited)
    nref = build_references(recs, lib_ids)
    ntab = build_tables()
    build_sources_page(recs)
    ng = build_glossary()
    print(f"library pages: {len(REG)}, reference catalogue entries: {nref}, table pages: {ntab}, glossary terms: {ng}")


if __name__ == "__main__":
    main()
