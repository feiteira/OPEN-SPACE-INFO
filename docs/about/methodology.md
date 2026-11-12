---
title: Methodology
description: How the sources were found, copied and read, how the pages were written and fact-checked, and the known limitations.
sources: [mib-20250916m25925pfms001-sol, mib-20200416m10720pfms001-sol, swa-idb-ascii, swa-idb-v6-5-0, stix-idb-v2-26-38-raw, alc-scos-fax-2003-01-27, alc-scos-2003-03-27, esa-pss-04-106-issue1-january1988, esa-pss-04-107-issue2-april1992, esa-pss-04-151-issue1-september1992, esa-pss-07-101-issue1-may1994, c-gsp-mcs-nctrs, c-gsp-mcs-scos]
---

# Methodology

## 1. Finding and copying sources

Sources were found by web search and by browsing public archives: ESA mission archives, the CCSDS and
ECSS publication sites, conference proceedings, and the Solar Orbiter instrument-team site at IRAP.
Only files reachable without login, payment or bypassing access controls were copied. Paywalled
papers and HTTP-403 resources were recorded as "not copied" and cited by title only. Each copy was logged
with its original URL, the UTC copy time and a SHA-256 checksum. The full list is on
[Sources & copies](sources-and-copies.md).[^registry]

The sources were collected in two rounds. The first (5 to 12 November 2026) gathered the core
CCSDS, ECSS, SCOS-2000, EDDS and Solar Orbiter documents and the two Solar Orbiter MIB releases. A
second round on 12 November 2026 added 78 documents: further CCSDS books (among them RF and
modulation, Proximity-1, security, SLE Forward Space Packet and service management), four more
ECSS E-50 adoption notices and the E-70 ground systems and operations standards, the four ESA PSS
packet standards of 1988 to 1994, Herschel/Planck and Solar Orbiter interface documents, and the
SWA 6.5.0 and STIX 2.26.38 instrument databases.[^registry][^pss][^idb]

Two documents found in a public archive print operational login credentials. The wiki cites them
and links to their original location, but does not republish the files.[^nohost]

## 2. Reading the sources

Text was extracted from every PDF with `pdftotext`, keeping PDF page boundaries so that citations
can give exact PDF page numbers. Scanned documents were treated separately: the Alcatel fax of
March 2003, which has no text layer, was read from its page images, and the four ESA PSS standards, which are scans, were read
from their OCR text (produced with RapidOCR) with every number, field size and code checked against the page
images.[^fax][^pss] Figures that are pictures (for example the frame drawings of the Solar Orbiter
packet ICD) are not in the extracted text; where a page relies on one, its footnote says that the
drawing was read in the PDF. The MIB releases and instrument databases were loaded into SQLite
databases so that every statistic quoted on the site comes from an explicit SQL query, shown in
an "SQL used" box on the page.[^idb]

## 3. Writing and checking the pages

The pages were drafted by AI agents (Anthropic's Claude) working from the extracted text under the
[authoring rules](https://github.com/feiteira/OPEN-SPACE-INFO/blob/main/AUTHORING.md). Every fact
must cite a clause and a PDF page, inferences must be labelled as such, and quotations must be short.
**A separate agent then fact-checked every page**: it re-opened each cited page, checked field sizes,
values and numbers against the standards and the data, re-ran the SQL, and fixed what was wrong.
Further passes compared the pages with each other, so that a header field, a count from the MIB or
the date of a standard reads the same everywhere it appears.
The library entries, the [reference catalogue](../references/index.md) and the
[MIB table pages](../mib/tables/index.md) were generated from structured extractions of the documents.
The table definitions were cross-checked against the open-source `pyscos2000` schema and against
the real data.

## 4. Known limitations

* Errors can survive review. Always check important details against the cited clause, and please
  [report mistakes](https://github.com/feiteira/OPEN-SPACE-INFO/issues).
* Several sources are old issues; the [standards map](../overview/standards-map.md) shows which
  issue each page uses and whether it is current, and the [history](../overview/history.md) page
  explains the ESA PSS standards that preceded them.
* Many SCOS-2000 documents (SUMs, ADDs, internal ICDs) are not public. The
  [reference catalogue](../references/index.md) lists them with the public documents that cite them.
* The Solar Orbiter MIB pages show only two of the 111 posted spacecraft MIB releases (the first
  and the latest), plus two versions of the SWA instrument database and one of the STIX
  instrument database.[^idb] See [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md).
* Some "SQL used" blocks written early in the project query tables such as `cvs`, `cve` or `dpc` with
  generic column names (`COL1`, `COL2` …) in ICD field order. The local databases were later rebuilt
  with the ICD field names. The results are the same, but the column names differ.
* Only Solar Orbiter has a public MIB in the library. For the other missions the wiki describes
  the interface documents, not parameter-level databases.

[^registry]: This wiki's source registry (`data/sources.json`), summarised on [Sources & copies](sources-and-copies.md): original URL, copy time (UTC), SHA-256 checksum and size of each document, and the collection round of the documents added on 12 November 2026.
[^pss]: The four scanned ESA PSS standards: [PSS-04-106](../library/esa-pss-04-106-issue1-january1988.md), [PSS-04-107](../library/esa-pss-04-107-issue2-april1992.md), [PSS-04-151](../library/esa-pss-04-151-issue1-september1992.md) and [PSS-07-101](../library/esa-pss-07-101-issue1-may1994.md); how they were read is described on the [history](../overview/history.md) page.
[^fax]: [Alcatel fax: SCOS MIB naming limits, part 2 (March 2003)](../library/alc-scos-2003-03-27.md), catalogued from its page images; part 1 ([January 2003](../library/alc-scos-fax-2003-01-27.md)) has an OCR-quality text layer.
[^idb]: [Solar Orbiter MIB release of 16 September 2025](../library/mib-20250916m25925pfms001-sol.md) and [of 16 April 2020](../library/mib-20200416m10720pfms001-sol.md); the [SWA instrument database 6.3.4](../library/swa-idb-ascii.md) and [6.5.0](../library/swa-idb-v6-5-0.md); the [STIX instrument database v2.26.38](../library/stix-idb-v2-26-38-raw.md). The count of 111 releases comes from the IRAP directory listing <https://solarorbiter.irap.omp.eu/MIB/MIBs/> as surveyed on 2026-11-05 (not a library item).
[^nohost]: Herschel/Planck FOP procedures [C_GSP_MCS_NCTRS](../library/c-gsp-mcs-nctrs.md) and [C_GSP_MCS_SCOS](../library/c-gsp-mcs-scos.md); the reason is recorded in their registry entries.
