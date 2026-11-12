---
title: Methodology
description: How the sources were found, copied and read, how the pages were written and fact-checked, and the known limitations.
sources: []
---

# Methodology

## 1. Finding and copying sources

Sources were found by web search and by browsing public archives: ESA mission archives, the CCSDS and
ECSS publication sites, conference proceedings, and the Solar Orbiter instrument-team site at IRAP.
Only files reachable without login, payment or bypassing access controls were copied. Paywalled
papers and HTTP-403 resources were recorded as "not copied" and cited by title only. Each copy was logged
with its original URL, the UTC copy time and a SHA-256 checksum. The full list is on
[Sources & copies](sources-and-copies.md).

## 2. Reading the sources

Text was extracted from every PDF with `pdftotext`, keeping PDF page boundaries so that citations
can give exact PDF page numbers. The one scanned document (an Alcatel fax from 2003) was read from
its page images. The MIB releases were loaded into SQLite databases so that every statistic quoted
on the site comes from an explicit SQL query.

## 3. Writing and checking the pages

The pages were drafted by AI agents (Anthropic's Claude) working from the extracted text under the
[authoring rules](https://github.com/feiteira/OPEN-SPACE-INFO/blob/main/AUTHORING.md). Every fact
must cite a clause and a PDF page, inferences must be labelled as such, and quotations must be short.
**A separate agent then fact-checked every page**: it re-opened each cited page, checked field sizes,
values and numbers against the standards and the data, re-ran the SQL, and fixed what was wrong.
The library entries, the [reference catalogue](../references/index.md) and the
[MIB table pages](../mib/tables/index.md) were generated from structured extractions of the documents.
The table definitions were cross-checked against the open-source `pyscos2000` schema and against
the real data.

## 4. Known limitations

* Errors can survive review. Always check important details against the cited clause, and please
  [report mistakes](https://github.com/feiteira/OPEN-SPACE-INFO/issues).
* Several sources are old issues; the [standards map](../overview/standards-map.md) shows which
  issue each page uses and whether it is current.
* Many SCOS-2000 documents (SUMs, ADDs, internal ICDs) are not public. The
  [reference catalogue](../references/index.md) lists them with the public documents that cite them.
* The Solar Orbiter MIB pages show only two of the 111 posted releases (the first and the latest).
