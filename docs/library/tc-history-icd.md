---
title: "Herschel TC History File (THF) ICD"
description: "The interface control document for the TC History File (THF)."
tags: ["Interface Control Document", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [tc-history-icd]
---

# TC History Interface Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>SPIRE-ICS-DOC-000900</dd><dt>Issue / version</dt><dd>1.0</dd><dt>Date</dt><dd>2002-10-30</dd><dt>Organisation</dt><dd>Herschel SPIRE instrument team (SPIRE-ICS document series), for the Herschel Common Science System (HCSS); agreed by the HIFI, PACS and SPIRE EGSE and ICC managers and the ESA HSC manager</dd><dt>Authors</dt><dd>M. J. Graham</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1.0 of 30 October 2002 is the 'First released version' after drafts 0.1 (September 2001), 0.2 (30 October 2001) and 0.3 (25 January 2002) (change record, PDF p. 4). The approval line on the cover is blank (PDF p. 1). No later issue is in the library.</dd><dt>Pages</dt><dd>18</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000900_ICS_ICD_TC_History/TC_History_ICD.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000900_ICS_ICD_TC_History/TC_History_ICD.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:33Z</dd><dt>SHA-256</dt><dd><code>53cedc8ac4b01e7e20c2a2389489931ac684f6d2013d81a4befe0aaa2e69272e</code></dd><dt>Size</dt><dd>175.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/TC_History_ICD.pdf">TC_History_ICD.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The interface control document for the **TC History File (THF)**. The THF is the file through which the commanding history of a test or operational period reaches the Herschel Common Science System (HCSS). It is ICD#5 in the Herschel ground segment list of ICDs and applies to every mission phase. The file comes from the [SCOS-2000](../scos2000/index.md) based EGSE in instrument-level tests (ILT), from the Central Checkout System (CCS) in integrated system tests (IST), and from the MOC in operations. The ICD fixes only the file format. Generation in ILT is covered by ICD#8, and ingestion into the HCSS by the TC History technical note.

It quotes the ground segment IRD requirements behind the interface. The MOC must make the TC history of any period available, including uplink and execution status. The HSC uses it to flag observations not commanded as scheduled, and the ICCs use it to verify instrument commanding, with the HCSS pulling the data. It also covers the file naming convention (THF_yymmdd_cccc.DAT), security, backup and the expected volume (about one file per day).

The core is the data definition. The THF is ASCII, with fixed-length, blank-padded fields and no delimiters. A 93-character header record is followed, for each released command, by a 'C' command record (187 characters), a 'B' bit-pattern record (512 hex digits, i.e. a 256-octet TC) and zero or more 'P' parameter records (153 characters). The command record carries the SCOS-2000 command history attributes: release and execution times, static/dynamic PTV and CEV check states, group/block flags, interlock type and stage, source type, and a 17-character verification-status string with one status letter per stage. That string maps directly onto [SCOS-2000 command verification](../mib/command-verification.md).


## Key points

- The THF format is expected by the HCSS in all mission phases (ILT, IST and Ops). The document is ICD#5 of the ground segment list of ICDs [RD5]. *(PDF p. 7)*
- Requirement IR-3.1-300: the MOC makes TC history (uplink and execution status of all TCs) available to the HSC for any operational period. The HSC uses it to flag observations not commanded as scheduled, and ICCs use it for command verification. Under IR-3.1.330 the HSC pulls the data from the MOC. *(PDF p. 10)*
- In ILT the THF is delivered from SCOS-2000, and in IST from the CCS. The data source in operations is the MOC, with retrieval covered by the DDID. *(PDF p. 10)*
- The THF is read mainly by the HCSS TCHistoryIngestor. A failed transfer is detected at ingestion, which aborts the processing (possibly rolling back database transactions) and requests the file again. *(PDF p. 12)*
- The file naming convention is THF_yymmdd_cccc.DAT: yy, mm and dd give the start date of the data, and cccc is a cyclic counter for files generated on the same day. *(PDF p. 12)*
- Each THF covers a configurable time window. Because a THF might cover the whole mission, the window is written HHHHH:MM:SS (TBC) rather than HH:MM:SS. About one THF per day is expected. *(PDF p. 14)*
- The THF is ASCII. Each record is fixed-format, fixed-length and newline-terminated, with no field delimiters, and every field is left-justified and blank-padded. *(PDF p. 15)*
- The header record is 93 characters: file name (40), first and last TC release times (21 each, YYYY.DDD.HH.MM.SS.SSS) and time window (11). *(PDF p. 15)*
- The command data record ('C', 187 characters) holds the HCSS TCID (unsigned 32-bit integer), name (11), description (25), parent sequence (9), release time, and the predicted execution time (uplink time plus propagation delay for immediate commands, or the time-tag). It also holds the static PTV, dynamic PTV and CEV check states, the group and block flags, and the interlock status (type L/G/S and stage). *(PDF p. 16)*
- The verification status field is 19 characters with up to 17 stages: release from SCOS-2000, ground station reception, uplink, on-board reception, on-board application acceptance, start of execution, execution steps 0-9 and completion. Each stage is one status letter: F, S, P, I, T, U, X or blank. *(PDF p. 17)*
- The bit pattern record ('B', 513 characters) carries a hex encoding of a 256-octet TC bit pattern. It does not apply to ILT. *(PDF p. 18)*
- The parameter data record ('P', 153 characters) gives the parameter name (11), description (currently blank), raw/engineering representation, radix (Dec/Hex/Oct, for unsigned raw values only) and value (88). *(PDF p. 18)*


## Cited by these wiki pages (3)

- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (38 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 7 |
    | 1.1 | Purpose | 7 |
    | 1.2 | Scope | 7 |
    | 1.3 | Applicable Documents | 7 |
    | 1.4 | Reference Documents | 7 |
    | 1.5 | List of Acronyms | 8 |
    | 2 | Operational Assumptions and Constraints | 9 |
    | 3 | Requirements | 10 |
    | 3.1 | Functional Requirements | 10 |
    | 3.2 | On-Line Delivery Requirements | 10 |
    | 3.3 | Off-Line Delivery Requirements | 10 |
    | 4 | Interface Characteristics | 11 |
    | 4.1 | Interface Location and Medium | 11 |
    | 4.3 | Data Source, Destination and Transfer Mechanism | 11 |
    | 4.5 | Relationship with other interfaces | 11 |
    | 5 | Access | 12 |
    | 5.1 | Programs generating or using the Interface Data | 12 |
    | 5.2 | Failure Protection, Detection and Recovery Procedures | 12 |
    | 5.3 | File Naming Conventions | 12 |
    | 5.4 | Storage and File Detection Requirements | 12 |
    | 5.5 | Security Requirements | 12 |
    | 5.6 | Data Integrity Checks | 12 |
    | 5.7 | Backup Requirements | 12 |
    | 5.8 | Input / Output Protocols, Calling Sequence | 13 |
    | 5.9 | Synchronisation Requirements | 13 |
    | 5.10 | Error Handling | 13 |
    | 6 | Detailed Interface Specifications | 14 |
    | 6.1 | Data Structure | 14 |
    | 6.2 | Generation Method | 14 |
    | 6.3 | Data passed across the interface - direction of transfer | 14 |
    | 6.4 | Size and Frequency of Transfers | 14 |
    | 7 | Data Definition | 15 |
    | 7.1 | File characteristics | 15 |
    | 7.2 | Header Record | 15 |
    | 7.3 | Data Records | 15 |
    | 7.3.1 | Command Data Record | 16 |
    | 7.3.2 | Bit Pattern Record | 18 |
    | 7.3.3 | Parameter Data Record | 18 |


## Documents this one references (10)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD1 | [FIRST/FSC/DOC/0158](../references/index.md#ref-first-fsc-doc-0158) | FIRST Common Science System: Use Case Definitions | Issue 1.0 7 November 2000 | applicable |
| AD2 | [FIRST/FSC/DOC/0146](../references/index.md#ref-first-fsc-doc-0146) | Herschel Ground Segment Design Description Document | 1.1 10 December 2001 | applicable |
| AD3 | [FIRST/FSC/DOC/0117](../references/index.md#ref-first-fsc-doc-0117) | Herschel Ground Segment IRD | 2.0 6 December 2001 | applicable |
| RD1 | [FIRST/FSC/DOC/0115](../references/index.md#ref-first-fsc-doc-0115) | HCSS User Requirements Document | Issue 2.0 3 May 2001 | reference |
| RD2 | [SPIRE-ICS-NOT-000899](../references/index.md#ref-spire-ics-not-000899) | TC History Technical Note | 0.1 7 September 2001 | reference |
| RD3 | [11775/96/D/IM](../references/index.md#ref-11775-96-d-im) | INTEGRAL TC History File ICD | Issue A.1 11 December 2000 | reference |
| RD4 | [S2K-MCS-ICD-0008-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0008-tos-gci) | SCOS-2000 Command History Data Provision Services ICD | Issue 1.2 7 August 2000 | reference |
| RD5 | [FIRST/FSC/DOC/0150](../references/index.md#ref-first-fsc-doc-0150) | Ground Segment List of ICDs | 1.0 24 November 2000 | reference |
| RD6 | [FSCDT/TN/014](../references/index.md#ref-fscdt-tn-014) | Trading-off technical solutions for Relating TC history and HCSS commanding | 0.1 draft 14 February 2001 | reference |
| RD7 | [SPIRE-ICS-DOC-000975](../references/index.md#ref-spire-ics-doc-000975) | ICD#8 | 0.1 draft 25 January 2002 | reference |

!!! note "Notes"
    18 numbered pages; the extraction reports 19 PDF pages, the last of which is empty. Printed page N is PDF p. N. §3.1 says its IRD requirements are extracted from the Ground Segment IRD 'see [AD2]', but AD2 is the Design Description Document and AD3 is the IRD (PDF pp. 7, 10). The acronym list expands EGSE as 'Electrical Ground Segment Engineering' (PDF p. 8). The verification-status field is 19 characters long, but only 17 stages are defined. Related library items: tc-history-ingestion-tn (SPIRE-ICS-DOC-002314, the later HCSS ingestion note) and tch-ool-user-guide-v2-3 (TC history and out-of-limits ingestion user manual). AD3 (Herschel Ground Segment IRD, FIRST/FSC/DOC/0117 issue 2.0) is an earlier issue of the library item herschel-ground-segment-interface-requirements-document (FIRST/HSC/DOC/0117 issue 2 revision 6, 2006). Its requirements IR-3.1-300 to -330 appear there as FGS-IR-3.1-300 to -330. In the later issue, 3.1-330 says the MOC pushes the TC history (PDF p. 30 of that document), where this ICD says the HSC pulls it (PDF p. 10).

