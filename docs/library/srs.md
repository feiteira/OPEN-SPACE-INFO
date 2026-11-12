---
title: "EDDS Software Requirements Specification (issue 18.0)"
description: "The EDDS Software Requirements Specification defines what the EGOS Data Dissemination System(../scos2000/edds.md) must do, at the level of release 2.3.0."
tags: ["Requirements Specification", "EDDS (EGOS Data Dissemination System)"]
sources: [srs]
---

# Software Requirements Specification (SRS) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-SRS-1001</dd><dt>Issue / version</dt><dd>Version 18.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, Dave Beaven, Michael Hawkshaw</dd><dt>Type</dt><dd>Requirements Specification</dd><dt>Status</dt><dd>Version 18.0 'Updates for EDDS 2.3.0' (Document Change Log, PDF p. 3). Superseded: the 2025 CIG and SDD cite SRS Issue 23.0 of 2021-12-03, which is not in the library.</dd><dt>Pages</dt><dd>125</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SRS.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SRS.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:02:35Z</dd><dt>SHA-256</dt><dd><code>3a7b3cf9e072eb0e48e31083de9d058c494066e9646d46e37053ddd3946d8717</code></dd><dt>Size</dt><dd>2.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/SRS.pdf">SRS.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The **EDDS Software Requirements Specification** defines what the [EGOS Data Dissemination System](../scos2000/edds.md) must do, at the level of release 2.3.0. It is the richest source in the EDDS set on *why* EDDS exists and what data it serves.

Section 4 gives the background. EDDS replaces and merges three ESOC ground-segment subsystems that gave users outside the control room access to [SCOS-2000](../scos2000/index.md) data: the [Telemetry Data Retrieval System (TDRS)](../scos2000/tdrs.md), Web Remote Monitoring (WebRM) and the [Generic Data Disposition System (GDDS)](../scos2000/gdds-and-ddids.md). It also takes ideas from the MUST parameter-analysis prototype. Section 4 then defines the data types (TM, TC and event packets with statistics; TM parameters from the DARC parameter archive or generated on the fly by SMON; MCS and EDDS reports; FARC archived files; acknowledgements), the delivery mechanisms (file server over SFTP, EDDS server download, stream in timely or complete mode, e-mail) and the formats (binary with a configurable EDDS header, XFDU, XML with mission XSLT, TDRS-style spreadsheet, ASCII, GDDS binary). A further subsection explains the ESOC network security domains (OPS, Office, Relay, PISA LANs, public Internet).

Section 5 holds about 400 numbered requirements (EDDS-SR-xxxxx), each with need, priority, stability, verification method and source. Many trace back to the TDRS SRD, the GDDS SRD or the WebRM baseline. They specify, for example, the TM packet filters (type, subtype, APID, PI1/PI2, virtual channel, SPID, SSC, spacecraft ID, on-board or reception time), the content of EDDS TM and TC binary packet headers, duplicate-packet handling, CCSDS ASCII time codes in spreadsheet output, quotas, roles, scheduling, security and MMI.


## Key points

- Parameter data: ESA mission control systems generate parameters on the fly from packets, so a dedicated parameter archive (DARC) was developed to meet EDDS performance criteria, alongside the new packet archive (PARC). *(PDF p. 13)*
- EDDS requirements are based on three existing subsystems, TDRS (parameter extraction from SCOS-2000 history files into MVDA or spreadsheet files), WebRM (remote monitoring over CORBA external interfaces) and GDDS (web and FTP front end to MCS archive data), plus the MUST analysis prototype. *(PDF p. 13)*
- EDDS is multi-mission: user accounts and privileges group users by mission and domain, behind a single authentication entry point. *(PDF p. 14)*
- Data-type/format matrix: TM and TC packets in EDDS binary, XFDU, GDDS_BINARY and SFDU; reports in XML/ASCII; parameters additionally in TDRS spreadsheet format; formats marked * support splitting responses into chunks and suspend/resume. *(PDF p. 15)*
- Packets are delivered as processed by the MCS in network byte order; parameters come either from the DARC (fast, configurable subset) or from SMON, generated on the fly from the packet archive (slower but all parameters). *(PDF p. 16)*
- MCS reports follow SCOS-2000 release 5 reports: TM packet, TM gap, TM parameter, TC packet, OBEV, OOL, OBQ, event record, command record and OBSM reports, provided in XML with mission XSLT for final formatting. *(PDF p. 16)*
- Stream delivery supports offline (archived) and online data; online mode is either 'timely' (drops data to meet latency) or 'complete' (delivers everything, possibly late). *(PDF p. 17)*
- Binary format means data as received from the MCS in network endian order with a configurable EDDS header prepended to each packet; the spreadsheet format follows the TDRS External ICD. *(PDF p. 19)*
- Requirement terms: Need (E, D1, D2, D3), Priority 1-3, Stability S/N and Type codes; a 'domain' is an instance of an MCS or data archive. *(PDF p. 12)*
- EDDS-SR-00320 lists TM packet filters: type, subtype, APID (including PID and PCAT), P1, P2, virtual channel, domain, on-board or reception time, quality flag, database version, ground station ID, SPID, SSC and spacecraft ID. *(PDF p. 36)*
- EDDS-SR-00780 lets each mission choose the EDDS TM packet header fields (SSC, APID, P1, P2, virtual channel, OBT, reception time, validity, SPID, PID, ground station, data unit type, type, subtype, time quality, mnemonic). *(PDF p. 39)*
- Duplicate packets can be defined per mission as APID+SSC, APID+SCET or APID+OBT. *(PDF p. 40)*
- Spreadsheet output offers CCSDS ASCII time code A and B formats (EDDS-SR-00650). *(PDF p. 62)*


## Cited by these wiki pages (9)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TDRS: Telemetry Data Retrieval Service](../scos2000/tdrs.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (56 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 7 |
    | 2 | Applicable and reference documents | 8 |
    | 2.1 | Applicable documents | 8 |
    | 2.2 | Reference documents | 8 |
    | 3 | Terms, definitions and abbreviated terms | 10 |
    | 3.1 | Acronyms | 10 |
    | 3.2 | Definition of Terms | 12 |
    | 3.3 | Requirement terms | 12 |
    | 4 | General Description | 13 |
    | 4.1 | Relationship to Current Projects | 13 |
    | 4.2 | Relationship to Predecessor and Successor Projects | 13 |
    | 4.3 | Function and Purpose | 14 |
    | 4.3.1 | Data Types | 15 |
    | 4.3.2 | Delivery Mechanism | 17 |
    | 4.3.3 | Formatting | 17 |
    | 4.3.4 | Services | 19 |
    | 4.4 | Environmental Considerations | 21 |
    | 4.5 | Relation to Other Systems | 22 |
    | 4.6 | General Constraints | 23 |
    | 4.7 | Logical Model Description | 23 |
    | 4.7.1 | General Use Case | 26 |
    | 4.7.2 | Batch Service Use Case | 27 |
    | 4.7.3 | Stream Services Use case | 30 |
    | 4.7.4 | Account Management Use Case | 31 |
    | 5 | Specific Requirements | 33 |
    | 5.1 | Functional Requirements | 33 |
    | 5.1.1 | Data Types | 33 |
    | 5.1.2 | Formatting | 58 |
    | 5.1.3 | Delivery Mechanism | 62 |
    | 5.1.4 | Services | 74 |
    | 5.2 | Performance and Budget Requirements | 100 |
    | 5.3 | Interface Requirements | 104 |
    | 5.4 | Operational Requirements | 108 |
    | 5.5 | Resources Requirements | 110 |
    | 5.5.1 | Computer Hardware Requirements | 111 |
    | 5.5.2 | Computer Hardware Resources Utilisation | 111 |
    | 5.5.3 | Computer Software Requirements | 111 |
    | 5.6 | Development Constraints | 112 |
    | 5.7 | Security and Privacy Requirements | 112 |
    | 5.8 | Portability Requirements | 115 |
    | 5.9 | Software Quality Requirements | 116 |
    | 5.10 | Software Reliability Requirements | 116 |
    | 5.11 | Software Maintainability Requirements | 116 |
    | 5.12 | Safety Requirements | 117 |
    | 5.13 | Software Configuration and Delivery Requirements | 117 |
    | 5.14 | Personnel-related Requirements | 118 |
    | 5.15 | Data Definition and Database Requirements | 118 |
    | 5.16 | MMI Specifications | 118 |
    | 5.17 | (no title printed) | 121 |
    | 5.18 | Reuse & Reusability Requirements | 121 |
    | 5.19 | Interface Management Requirements | 122 |
    | 5.20 | Observability Requirements | 122 |
    | 5.21 | Other Requirements | 122 |
    | 6 | Verification, Validation, and Acceptance Requirements | 123 |
    | 6.1 | Validation Approach and Requirements | 123 |
    | 6.2 | Acceptance Requirement | 123 |


## Documents this one references (33)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-18] | [SLES12-064-ESOCL01](../references/index.md#ref-sles12-064-esocl01) | ESOC SuSE Linux Enterprise Server (SLES12) Baseline Definition | Issue 0.0 TBR | applicable |
| [AD-39] | [EGOS-MDW-EDDS-ICD-1001](../references/index.md#ref-egos-mdw-edds-icd-1001) | EDDS External User Interface Control Document (EUICD) | Version as part of this release | applicable |
| [AD-40] | [EGOS-MCS-GDDS-ICD-1002](../references/index.md#ref-egos-mcs-gdds-icd-1002) | Generic DDS – Interface Control Document RDM Image Transfer Control Files, GDDS-RDM ITCF ICD | Issue 1.1 2004-08-30 | applicable |
| [AD-41] | [EGGS-ESOC-GS-SRS-1001](../references/index.md#ref-eggs-esoc-gs-srs-1001) | ESOC Generic Ground Systems (EGGS): Development Requirements Specification | Issue 1.1.1 2008-10-31 | applicable |
| [RD-1] | [catalogue](../references/index.md#ref-producer-archive-interface-specification) | Producer-Archive Interface Specification | Draft White Book December-2005 | reference |
| [RD-2] | [EGOS-MCS-GDDS-TN-nnnn-i0r0](../references/index.md#ref-egos-mcs-gdds-tn-nnnn) | EGOS Data Dissemination System (EDDS) Concepts | 0.0 Draft C 2005-09-26 | reference |
| [RD-3] | [S2K-MCS-SRD-0004-TOS-GIC](../references/index.md#ref-s2k-mcs-srd-0004-tos-gic) | SCOS-2000 TM Data Retrieval Services SRD | Issue 3.1 2003-08-29 | reference |
| [RD-4] | [EGOS-MCS-GDDS-SRD-5720](../references/index.md#ref-egos-mcs-gdds-srd-5720) | Data Disposition System Software Requirements Document | Issue 1.4 2004-08-30 | reference |
| [RD-5] | [ESA/TOS-GIC](../references/index.md#ref-esa-tos-gic) | WEB-RM User & Software Requirements Baseline | Issue 1.4 2003-11-24 | reference |
| [RD-6] | [No reference](../references/index.md#ref-no-reference) | MUST Repository ICD | Draft 1.0 (No Date) | reference |
| [RD-7] | [No reference](../references/index.md#ref-no-reference) | MUST Rosetta Performance TN | Issue 1.1 (No Date) | reference |
| [RD-8] | [No reference](../references/index.md#ref-no-reference) | MUST Server Software Requirements Specification | Issue 1.0 2006-07-04 | reference |
| [RD-9] | [catalogue](../references/index.md#ref-xml-formatted-data-unit-xfdu-structure-and-construction-rules) | XML Formatted Data Unit (XFDU) Structure and Construction Rules | WHITE BOOK 2006-05-15 | reference |
| [RD-10] | [EGOS-GEN-GEN-SAD-1001-i0r0](../references/index.md#ref-egos-gen-gen-sad-1001) | EGOS High Level Architectural Design Document | 0.0DraftC 2005-05-15 | reference |
| [RD-11] | [S2K-MCS-ICD-0017-TOS-GIC](../references/index.md#ref-s2k-mcs-icd-0017-tos-gic) | TDRS External Interfaces Control Document | Issue 4.3 2004-03-31 | reference |
| [RD-12] | [EGOS-MCS-GDDS-ICD-1003](../references/index.md#ref-egos-mcs-gdds-icd-1003) | Generic Data Delivery Interface Document (GDDID) | Issue 1.2 2004-08-30 | reference |
| [RD-13] | [910.4-B-1](../references/index.md#ref-910-4-b-1) | CCSDS Definition Cross Support Reference Model – Part 1, Space Link Extension Services | Issue 1 May-1996 | reference |
| [RD-14] | [catalogue](../references/index.md#ref-esacert-information-including-security-plan-template-and-guidelines-http-forum-e) | ESACERT information including Security Plan template and guidelines: http://forum.esacert.esa.int/guidelines.html | N/A | reference |
| [RD-15] | [DOPS-COM-POL-34555-OPS-ECT](../references/index.md#ref-dops-com-pol-34555-ops-ect) | Implementation of the ESA Network Security Policy for OPSNET | Issue 2 Revision 3 2007-11-09 | reference |
| [RD-16] | [EGOS-GEN-EDDS-ICD-1001](../references/index.md#ref-egos-gen-edds-icd-1001) · [library](euicd-unversioned.md), [library](euicd-i15r0.md), [library](euicd-v25.md), [library](euicd-v13.md) | EGOS ICD Raw Data Media Production System | Issue 1 2007-04-13 | reference |
| [RD-17] | [EGOS-MDW-EDDS-SDD-1001](../references/index.md#ref-egos-mdw-edds-sdd-1001) | EDDS SDD | Issue 1 2007-04-13 | reference |
| [RD-18] | [EGOS-MDW-TN-1002](../references/index.md#ref-egos-mdw-tn-1002) | Analysis of Web Services and PARC, Enhancements to support EDDS | Issue 1 2007-04-13 | reference |
| [RD-19] | [EGOS-MDW-TN-1001](../references/index.md#ref-egos-mdw-tn-1001) | Analysis of TDRS, WEBRM, GDDS and MUST for suitability of reuse in implementing EDDS | Issue 1 2006-02-22 | reference |
| [RD-20] | [EGOS-MCS-S2K-SRS-1001](../references/index.md#ref-egos-mcs-s2k-srs-1001) | SCOS-2000 SMF SRS | Issue 1 Revision 3 2008-11-07 | reference |
| [RD-21] | [EGOS-MCS-S2K-ICD-1004](../references/index.md#ref-egos-mcs-s2k-icd-1004) | MONITORING & CONTROL SCOS-2000 - SFM SERVICE ICD | Issue 6 2008-11-07 | reference |
| [RD-22] | [EGOS-MCS-S2K-ICD-1005](../references/index.md#ref-egos-mcs-s2k-icd-1005) | SYSTEM MANAGEMENT SCOS-2000 - SFM SERVICE ICD | Issue 5 2008-11-07 | reference |
| [RD-23] | [CCSDS 661.0-B-1](../references/index.md#ref-ccsds-661-0-b-1) | XML FORMATTED DATA UNIT (XFDU) STRUCTURE AND CONSTRUCTION RULES - Blue book | September 2008 | reference |
| [RD-24] | [EGOS-GEN-DARC-ICD-1001](../references/index.md#ref-egos-gen-darc-icd-1001) | DARC ICD | Issue 1.1 2009-01-08 | reference |
| [RD-25] | [EGOS-GEN-DARC-SDD-0040](../references/index.md#ref-egos-gen-darc-sdd-0040) | Software Design Document DARC | Issue 1.0 2009-01-09 | reference |
| [RD-26] | [EGOS-MDW-UDK-ICD-0001](../references/index.md#ref-egos-mdw-udk-icd-0001) | EGOS USER DESKTOP ICD | Issue 2.2 2008-11-25 | reference |
| [RD-27] | [EGOS-MDW-UDK-SDD-0001](../references/index.md#ref-egos-mdw-udk-sdd-0001) | EGOS USER DESKTOP SDD | Issue 2.1 2008-07-28 | reference |
| [RD-28] | [EGOS-MDW-LLC-ICD-1005](../references/index.md#ref-egos-mdw-llc-icd-1005) | Session Manager ICD | Issue 1.3a 2008-12-12 | reference |
| [RD-29] | [EGOS-MDW-COR-SDD-1005](../references/index.md#ref-egos-mdw-cor-sdd-1005) | Session Manager SDD | Issue 1.3a 2008-12-12 | reference |

!!! note "Notes"
    Cross-reference inconsistencies inside the document: the text calls the DARC documents [RD-25] and [RD-26] (PDF p. 13) although [RD-26] is the EUD ICD, and cites XFDU as [RD-24] (PDF p. 19) although XFDU is [RD-9]/[RD-23] and [RD-24] is the DARC ICD; requirements cite sources such as '[RD-6] R-WEB-0315', where [RD-6] is now the MUST Repository ICD, apparently from an older numbering. Applicable documents are numbered [AD-18] and [AD-39] to [AD-41] only (others removed). Section 1 has no subsections. Section 5.17 has a number but no title (TOC PDF p. 5, body PDF p. 121). Many TOC page numbers are truncated in the text extraction. RID and 'eddsdswr#' markers are embedded in requirement texts. About 400 requirement IDs (EDDS-SR-xxxxx) appear in the text. Printed page numbers are PDF page minus 6. The file name 'SRS.pdf' carries no version.

