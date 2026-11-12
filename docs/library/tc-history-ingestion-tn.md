---
title: "HCSS TC History Ingestion Technical Note"
description: "Issue 0.2 (18 March 2003) of a technical note by M.J."
tags: ["Technical Note", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [tc-history-ingestion-tn]
---

# TC History Ingestion Technical Note

<dl class="osi-meta"><dt>Document ID</dt><dd>SPIRE-ICS-DOC-002314</dd><dt>Issue / version</dt><dd>0.2</dd><dt>Date</dt><dd>2003-03-18</dd><dt>Organisation</dt><dd>Herschel Common Science System (HCSS) development (organisation not printed; header 'Project Document', archived by SPIRE as SPIRE-ICS-DOC-002314)</dd><dt>Authors</dt><dd>M.J. Graham</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Issue 0.2 of 18 March 2003. The change record lists 0.1 (7 September 2001, original version) and 0.2 (17 February 2003, updated as part of release of code into HCSS) (PDF p. 2). It covers only the ILT phase (HCSS 0.1.x); the planned CORBA interface is not described (PDF p. 4).</dd><dt>Pages</dt><dd>11</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002314_DOC_ICS_TC_History_Ingestion/TCHistoryIngestionTN.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002314_DOC_ICS_TC_History_Ingestion/TCHistoryIngestionTN.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:37Z</dd><dt>SHA-256</dt><dd><code>45a480efb9d7e4be17a8dbc451d59534228ae554ec2a6ca61392e315c434dd6f</code></dd><dt>Size</dt><dd>128.6 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/tc-history-ingestion-tn.pdf">tc-history-ingestion-tn.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 0.2 (18 March 2003) of a technical note by M.J. Graham on the design of the **TC history ingestion** process in the Herschel Common Science System (HCSS). It covers the instrument level test (ILT) phase, HCSS version 0.1.x. The process fetches telecommand history from [SCOS-2000](../scos2000/index.md), converts it for the HCSS archive and links each record to the telecommand that the HCSS generated.

The note traces the process to requirement HCSS-UR-3.1-1111 and use case UCF-759 and lists its assumptions. SCOS-2000 produces an ASCII TC history file (THF). Commands from HCSS schedules carry a 32-bit TCID, while manual commands have a null TCID. OBSID and BBID setting commands identify observations and building blocks. TC history times are UT, schedule times TAI, and ILT schedules use only relative times. Event-driven TCs generated on board are out of scope.

There are two components, joined by TCP/IP. A THF server asks SCOS-2000 for a time window, receives the THF file name, reads the file from the directory SCOS-2000 writes to, and passes it on. A TC history ingestor checks the file and creates a TcHistory object per TC. It links each object to its TC by TCID, updates the success flags of observations and block executions, and reports missing TCs and missing history records. The link to SCOS-2000 uses TCP/IP, with a CORBA interface planned.

Section 3 describes the `nl.esa.herschel.tchingest` package and its FileIngestion API, shared with OOL ingestion. Section 4 records design decisions. Manual TCs are stored without associations (SCR-0119), orphan histories are kept and logged as errors (SPR-0118), and the database is committed once per THF, typically one per day. The operator view is in the [TC history and OOL user manual](tch-ool-user-guide-v2-3.md). See [Herschel/Planck ground segment](../scos2000/herschel-planck-ground.md) and [archives](../scos2000/archives.md).


## Key points

- This issue covers the ILT mission phase (HCSS 0.1.x), which requests data from SCOS-2000 over a TCP/IP interface; later versions were to use a CORBA interface. *(PDF p. 4)*
- The process retrieves TC history from SCOS-2000, converts it for storage in the HCSS archive and associates each TC history record with its TC. *(PDF p. 5)*
- Requirements: HCSS-UR-3.1-1111 (associate TC history with the commanding requests in the Observations Schedule) and UCF-759 (verify TC history against observation executions and flag failed, missing and additional commands). *(PDF p. 5)*
- Assumptions: the TC history file (THF) is an ASCII file produced by SCOS-2000; HCSS schedule commands are tagged with a 32-bit TCID while manual commands have a null or default TCID; OBSID and BBID commands relate history to observations. *(PDF p. 5)*
- TC history times are UT while schedule times are TAI, and ILT schedules use only relative times, so time conversion is needed; on-board generated event-driven TC packets are out of scope; the THF holds values only for editable command parameters. *(PDF p. 5)*
- Two components communicate via TCP/IP: a THF server, which requests a time period from SCOS-2000, receives the THF name and retrieves the file, and a TC history ingestor, which validates it, creates TCHistory objects and associates them by TCID. *(PDF p. 6)*
- The ingestor checks that the first line of the THF matches the TC History File ICD and that the file covers the requested time window; it runs continuously and requests a new THF after a configured wait. *(PDF p. 6)*
- Package nl.esa.herschel.tchingest has subpackages api, bin, doc, server, test and util; the FileIngestion interface (getFile, checkFile, processFile, initStore, commitData) is shared by TC history and OOL ingestion. *(PDF p. 7)*
- SCOS-2000 places the requested THF in a preconfigured directory, so THFServer must run on the SCOS-2000 host or have access to that directory (e.g. networked disks). *(PDF p. 9)*
- For manual TCs (TCID = 0) the ingestor assigns the Observation and Building Block whose time period contains the record's time stamp. *(PDF p. 10)*
- TC history records for manual commands are made persistent without associations (SCR-0119); a TcHistory with a non-zero TCID whose TC is missing is persisted and an error is logged (SPR-0118). *(PDF p. 10)*
- If all TCs of a Building Block succeed its uplinked status is set to successful; if all TCs of an Observation succeed its executed status is set to successful. *(PDF p. 11)*
- A database commit is done only at the end of processing a THF; typically one THF per day is expected, containing a day's TC history. *(PDF p. 11)*


## Cited by these wiki pages (2)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (25 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change Record | 2 |
    |  | Table of Contents | 3 |
    | 1 | Introduction | 4 |
    | 1.1 | Purpose and scope of the document | 4 |
    | 1.2 | References | 4 |
    | 1.3 | Document structure | 4 |
    | 2 | The TC History Ingestion Process | 5 |
    | 2.1 | Overview | 5 |
    | 2.1.1 | Requirements | 5 |
    | 2.1.2 | Assumptions | 5 |
    | 2.1.3 | Structure | 5 |
    | 2.1.3.1 | THF server | 6 |
    | 2.1.3.2 | TC history ingestor | 6 |
    | 2.2 | Class diagram | 6 |
    | 3 | Package Structure | 7 |
    | 3.1 | The nl.esa.herschel.tchingest.api API | 7 |
    | 3.1.1 | Interface summary | 7 |
    | 3.1.2 | Class summary | 7 |
    | 4 | Design Decisions | 9 |
    | 4.1 | The TC history ingestion API | 9 |
    | 4.2 | Interfacing with SCOS-2000 | 9 |
    | 4.3 | Validation of TCs and TC history records | 9 |
    | 4.4 | Interfacing with the database | 10 |
    | 4.5 | Successful operations | 11 |
    | 4.6 | Performance | 11 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [RD1] | [FIRST/FSC/DOC/0146](../references/index.md#ref-first-fsc-doc-0146) | FIRST Ground Segment Design Description | Issue 1.0, Revision 0 3rd Nov 2000 | reference |
| [RD2] | [FIRST/FSC/DOC/0146](../references/index.md#ref-first-fsc-doc-0146) | FIRST Ground Segment Design Description | Issue 1.0, Revision 0 3rd Nov 2000 | reference |
| [RD3] | [catalogue](../references/index.md#ref-tc-history-file-icd) | TC History File ICD |  | reference |
| [RD4] | [S2K-MCS-ICD-0008-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0008-tos-gci) | SCOS-2000 Command History Data Provision Services ICD | Issue 1.2 7th Aug 2000 | reference |
| [RD5] | [ICC/2001-001](../references/index.md#ref-icc-2001-001) | Technical Note on Observation and Building Block Identifiers for Herschel | Issue 1.0 6th June 2001 | reference |
| [RD6] | [FSCDT/TN/014](../references/index.md#ref-fscdt-tn-014) | Trading-off Technical solutions for relating TC History and HCSS commanding | Issue 0, Revision 1 14th Feb 2001 | reference |
| [RD7] | [FIRST/FSC/DOC/0115](../references/index.md#ref-first-fsc-doc-0115) | HCSS User Requirements Document | Issue 2.0 xx May 2001 | reference |
| [RD8] | [SCI-OT-ICD-7527](../references/index.md#ref-sci-ot-icd-7527) | FIRST/Planck Packet Structure Interface Control Document | Issue 1.0, Revision 0 1st September 2000 | reference |
| [RD9] | [FSCDT/TN-012](../references/index.md#ref-fscdt-tn-012) | Analysis of ILT use-cases | Issue 0.5 20th February 2001 | reference |
| [RD10] | [S2K-MCS-SUM-2360-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2360-tos-gci) | SCOS-2000 Command History Operator User Manual | Issue 1.4 23rd April 2001 | reference |
| [RD11] | [FIRST/FSC/DOC/0158](../references/index.md#ref-first-fsc-doc-0158) | FIRST Common Science System: Use Case Definitions | Issue 1.0 7th November 2000 | reference |

!!! note "Notes"
    The Table of Contents page (PDF p. 3) is empty. [RD1] and [RD2] are identical entries. Section 4.2.1 cites an unresolved '[RD?]' for the SCOS-2000 interface (PDF p. 9). References are cited inconsistently as [RD7] and [RD-3]. The Section 2.2 class diagram is not in the text layer. A stray 'Table 1' appears in the page-4 header. The tch-ool-user-guide-v2-3 cites this note as RD4 with the placeholder number 'SPIRE-ICS-DOC-000###', issue 0.2, 18th March 2003. The text extraction has a trailing empty page 12.

