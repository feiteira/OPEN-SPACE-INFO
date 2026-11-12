---
title: "HCSS TC History and OOL Ingestion User Manual (2.3)"
description: "Issue 2.3 (13 November 2008) of the software user manual, by M.J."
tags: ["User Manual", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [tch-ool-user-guide-v2-3]
---

# User Manual for Telecommand History and Out-of-Limits ingestion

<dl class="osi-meta"><dt>Document ID</dt><dd>SPIRE-ICS-DOC-001852</dd><dt>Issue / version</dt><dd>2.3</dd><dt>Date</dt><dd>2008-11-13</dd><dt>Organisation</dt><dd>Herschel Common Science System (HCSS) / Herschel SPIRE (organisation not printed; running-header prefix SPIRE-RAL and archive folder '001852_DOC_RAL')</dd><dt>Authors</dt><dd>M.J.Graham, S.Guest</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Issue 2.3 of 13th November 2008, 'Support for DDS OOL files'. Earlier issues: 1.0 (24th October 2003, first combined version), 2.0 (2nd April 2004, IST support added), 2.1 (19th May 2004, tchoolretrieve command line mode), 2.2 (16th February 2007, timeout and file server delete properties) (Change Record, PDF p. 2). The applicability statement still refers to HCSS release 0.2 (PDF p. 4).</dd><dt>Pages</dt><dd>17</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/001852_DOC_RAL_Telecommand_History_OutofLimits_Ingestion/TchOolUserGuide%20v2.3.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/001852_DOC_RAL_Telecommand_History_OutofLimits_Ingestion/TchOolUserGuide%20v2.3.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:42Z</dd><dt>SHA-256</dt><dd><code>27e96b40cf4940c2c53b2d4da794f758534a62523a2f076388f9ac334e983571</code></dd><dt>Size</dt><dd>118.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/tch-ool-user-guide-v2.3.pdf">tch-ool-user-guide-v2.3.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 2.3 (13 November 2008) of the software user manual, by M.J. Graham and S. Guest, for the processes that ingest **telecommand history** and **out-of-limits (OOL)** data from [SCOS-2000](../scos2000/index.md) into the Herschel Common Science System (HCSS) database. The change record runs from the first combined version (October 2003) through IST support and a command-line retrieval mode (2004) and timeout and delete properties (2007) to support for OOL files in Data Disposition System (DDS) format (2008).

Each data type uses three components. A file retriever asks SCOS-2000 for a Telecommand History File (THF) or an Out-of-Limits file (ORF). A file server delivers the files over TCP/IP in ILT client-server mode. An ingestor validates each file, skips objects already in the database, stores the rest and links them to TCs, observations and building blocks. It also flags gaps in the TC IDs. In IST mode the user copies files from the SCOS machine and names them on the command line. The OOL ingestor treats files ending in `.OOL` or `.TLM` as DDS format.

Section 3 is a tutorial covering every `hcss.tchool.*` configuration property and its default: THF and ORF server ports 3187 and 3188, SCOS-2000 port 2209, a 60 000 ms retry wait with at most 5 attempts, a 1000 ms time tolerance, the SCOS output directory and the time zone. It also covers the commands `thfserver`, `orfserver`, `tchoolretrieve`, `tchingest` and `oolingest`. Appendix A gives the diagnosis and recovery for each exception: configuration, connection, database store and THF record-length errors. Appendix B lists warnings such as TCs missing from the database, time mismatches and TCs without history. The design is in the [TC history ingestion note](tc-history-ingestion-tn.md). See [monitoring checks](../mib/monitoring-checks.md), [GDDS and DDIDs](../scos2000/gdds-and-ddids.md) and [Herschel/Planck ground segment](../scos2000/herschel-planck-ground.md).


## Key points

- This issue is applicable to HCSS release 0.2, described as the first HCSS release to support the integrated system testing (IST) phase while continuing to support instrument level tests (ILT). *(PDF p. 4)*
- Components per data type: a file retriever that extracts a Telecommand History file (THF) or Out-of-Limits file (ORF) from SCOS-2000, a file server that supplies files over TCP/IP at periodic intervals (ILT), and an ingestor that works on files directly (IST) or via the server (ILT). *(PDF p. 6)*
- The OOL ingestor also accepts DDS-format files as retrieved from the MOC in the routine phase. *(PDF p. 6)*
- If the SCOS-2000 connection is lost, the file server waits a set time and retries a set number of times before aborting. *(PDF p. 6)*
- Ingestion validates the file and its time window, skips objects already in the database, makes new objects persistent even if linking later fails, links them where possible and commits. *(PDF p. 7)*
- The TC history ingestor checks the THF's first line, links each TCHistory object to its TC (none for manual commands), updates the success flags of Observations and Block Executions, and detects missing history from gaps in the TC IDs; OOLPacket objects are linked to the building block closest in time. *(PDF p. 7)*
- Default file-server settings: servers 127.0.0.1, THF server port 3187, ORF server port 3188, attemptwaittime 60000 ms, maxattempts 5, fileperiod 60000 ms. *(PDF p. 8)*
- Default SCOS-2000 settings: s2kserver 127.0.0.1, s2kport 2209, s2kdirectory /spired/HPR, s2ktimezone UTC, delete true, timeout 2000 ms. *(PDF p. 9)*
- Default date format yyyy/MM/dd-HH:mm:ss; the alternative yyyy.DDD.HH.mm.ss matches the time format used in THF and ORF files. *(PDF p. 9)*
- Two times are deemed equal if they differ by less than hcss.tchool.timetolerance, default 1000 ms. *(PDF p. 10)*
- Commands: thfserver and orfserver (ILT, on or with visibility of the SCOS-2000 machine); tchoolretrieve [TC | OL], which opens a GUI if no type is given (IST); tchingest and oolingest [file1] [file2] ..., which use client-server mode if no files are given. *(PDF p. 10)*
- oolingest treats a file whose name ends in '.OOL' or '.TLM' as DDS format and any other file as SCOS format. *(PDF p. 11)*
- Exception A.18: the TCH and OOL persistent classes are not initialised by initv and must be defined in the Versant schema with com.versant.DefineClass. *(PDF p. 14)*
- THF format errors (missing header record, wrong header time format, Command Data, Bit Pattern or Parameter Data Record of incorrect length) abort the ingestion attempt until the next scheduled retrieval. *(PDF p. 15)*
- Warning B.3: a first or last TC time stamp outside the requested THF time by more than the tolerance may indicate a time mismatch between SCOS-2000 and the ingestion process. *(PDF p. 16)*


## Cited by these wiki pages (3)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (32 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change Record | 2 |
    |  | Table of Contents | 3 |
    | 1 | Introduction | 4 |
    | 1.1 | Intended readership | 4 |
    | 1.2 | Applicability statement | 4 |
    | 1.3 | Purpose | 4 |
    | 1.4 | How to use this document | 4 |
    | 1.5 | Related documents | 4 |
    | 1.6 | Conventions | 5 |
    | 1.7 | Problem reporting instructions | 5 |
    | 2 | Ingestion overview | 6 |
    | 2.1 | File Retriever | 6 |
    | 2.2 | File Server | 6 |
    | 2.3 | Data Ingestion | 6 |
    | 2.3.1 | Getting the data (ILT-mode) | 7 |
    | 2.3.2 | Getting the data (IST-mode) | 7 |
    | 2.3.3 | Ingesting the data | 7 |
    | 2.3.4 | Specific steps for the TC history ingestor | 7 |
    | 2.3.5 | Specific steps for the OOL ingestor | 7 |
    | 3 | Data ingestion tutorial | 8 |
    | 3.1 | Configuring the ingestion processes | 8 |
    | 3.1.1 | Database | 8 |
    | 3.1.2 | File servers | 8 |
    | 3.1.3 | SCOS-2000 | 9 |
    | 3.1.4 | Ingestors | 9 |
    | 3.2 | Getting the files from SCOS-2000 | 10 |
    | 3.2.1 | ILT (Client-Server) mode | 10 |
    | 3.2.2 | IST mode | 10 |
    | 3.3 | Starting the ingestion processes | 10 |
    | A | Error Messages and Recovery Procedures | 12 |
    | A.1 | Ingestion exceptions | 12 |
    | B | Warning messages | 16 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [RD1] | [SPIRE-ICS-DOC-000900](../references/index.md#ref-spire-ics-doc-000900) · [library](tc-history-icd.md) | TC History Interface Control Document, M.J.Graham | 1.0 30th October 2002 | reference |
| [RD2] | [SPIRE-ICS-DOC-000974](../references/index.md#ref-spire-ics-doc-000974) | OOL Data Interface Control Document, M.J.Graham | 1.0 30th October 2002 | reference |
| [RD3] | [SPIRE-ICS-DOC-000975](../references/index.md#ref-spire-ics-doc-000975) | RTA-HCSS Data Interface Control Document, M.J.Graham | 1.0 30th October 2002 | reference |
| [RD4] | [SPIRE-ICS-DOC-000###](../references/index.md#ref-spire-ics-doc-000) | TC History Ingestion Technical Note, M.J.Graham | 0.2 18th March 2003 | reference |
| [RD5] | [SPIRE-ICS-DOC-000###](../references/index.md#ref-spire-ics-doc-000) | OOL Data Ingestion Technical Note, M.J.Graham | 0.1 18th March 2003 | reference |
| [RD6] | [PT-CMOC-MDS-3108-OPS-GDS](../references/index.md#ref-pt-cmoc-mds-3108-ops-gds) | Interface Control Document, Data Disposition System | 6 draft A 10th January 2008 | reference |

!!! note "Notes"
    The document number differs between pages: SPIRE-ICS-DOC-001852 on the title page and SPIRE-RAL-DOC-001852 in every running header. [RD4] is the library item tc-history-ingestion-tn, whose real number is SPIRE-ICS-DOC-002314. Appendix A uses 'A.1' twice, as the section heading and as the first exception. Property names are inconsistent: hcss.tchingest.database and hcss.tchingest.fileperiod against hcss.tchool.*; hcss.tchool.waitattempts in A.3 against attemptwaittime in 3.1.2; 'hcss.tch.ool.startime'. Warning B.10 is labelled 'Exception'. The default database and host names are site-specific. A problem-report URL and a contact name are printed. The applicability statement was not updated after issue 2.0. The text extraction has a trailing empty page 18.

