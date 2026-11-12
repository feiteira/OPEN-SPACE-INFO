---
title: "EDDS Software User Manual (issue 22.0)"
description: "Issue 22.0 (2025) of the EDDS Software User Manual covers the client of the EGOS Data Dissemination System(../scos2000/edds.md) at release v3.6.0."
tags: ["User Manual", "EDDS (EGOS Data Dissemination System)"]
sources: [sum-v22]
---

# Software User Manual (SUM) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-SUM-1001</dd><dt>Issue / version</dt><dd>Version 22.0</dd><dt>Date</dt><dd>2025-01-10</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Manu Mohan, Florian Cleyssac, Rui Santos, M. Hawkshaw, M. Lobjakas, R. Ots, K. Panitzek, Rokibul Uddin, Abhishek Annadanappa Chandrashekar, Teresa Noviello, Alessandro Afloarei, Diwkar Kushwaha</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Version 22.0 'Issue for EDDS v.3.6.0i1' (Document Change Log, PDF p. 3). Latest SUM issue in the library; supersedes sum (issue 14.0). The 2025 CIG and SDD issues 25.0 (for v3.6.1) still cite SUM Issue 22.0.</dd><dt>Pages</dt><dd>138</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SUM.v22.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SUM.v22.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:57Z</dd><dt>SHA-256</dt><dd><code>aa0581eb9e92e62493f7c4011114fcbb91066240f32f03f7e05685c8225de7b5</code></dd><dt>Size</dt><dd>4.6 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/SUM-v22.pdf">SUM-v22.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 22.0 (2025) of the **EDDS Software User Manual** covers the client of the [EGOS Data Dissemination System](../scos2000/edds.md) at release v3.6.0. It keeps the structure and most of the text of the 2018 issue (library item sum): client installation and requirements, the mission web page, the Java client API, user-access set-up with data access sets, operation data sets, quota sets, roles and groups, a reference tour of every client view, and appendices with the date/time, duration and CRON formats and every request form.

The main additions concern missions controlled by the European Ground Systems Common Core ([EGS-CC](../scos2000/ancillary-and-egs-cc.md)). Two new batch request families sit beside the classic FARC, DARC, PARC, SMON, file-system and [SCOS-2000](../scos2000/index.md) Data Provision Service requests. **HARC** requests read the EGS-CC HBase archive and return parameters, parameter definitions, raw TM, TM and TC reports, log messages and activity reports. **EGSCC REST** requests read through the EGS-CC REST interface and add out-of-limit reports. The DCRs record further changes: pre-filtering of EGS-CC requests, alignment of Kafka and EDDS response fields, EGS-CC OOL requests, quotas that also restrict TC requests, and filtering of request views by mission or user.

Two new reference sections help in reading EDDS outputs. Section 5.4 lists every request status (from SUBMITTED, QUEUED and ACTIVE to DELIVERED, DELIVERED_PARTIAL_RESULTS, SERVER_COMPLETED and the ERROR_* states), and section 5.5 lists the response compression options (TAR, TARGZ, ZIP). Section 6.5 describes the GitLab DevOps pipeline used to build and deploy EDDS.


## Key points

- Issue 22.0 is 'Issue for EDDS v.3.6.0i1'; issues 15.0 to 21.0 covered EDDS v2.4.0 to v3.5.0 (2020 to 2024). *(PDF p. 3)*
- DCRs record changes including EDDS-1355 (pre-filtering of EGSCC requests), EDDS-1373 (align Kafka and EDDS response fields), EDDS-1271 (EGSCC OOL requests) and EDDS-1376 (quotas restricting TC requests). *(PDF p. 4)*
- Batch requests now go to the FARC, DARC, PARC and HARC archives plus EDDS reports; PARC data come via the PARC Manager, Data Provision Services or SMON, and HARC data via HBase. *(PDF p. 17)*
- HARC requests (EGS-CC HBase archive) include Egscc parameter, Egscc parameter definition, Packet TM Raw EGSCC Data, Egscc TM Report, Egscc Packet TC Report, Egscc Packet TM, Egscc Log Message Report and Egscc Activity Report (activities with raw and engineering values). *(PDF p. 17)*
- EGSCC (REST) requests add an Egscc Out of Limit Report returning out-of-limit data with path, state, alarm state and value. *(PDF p. 17)*
- Packet TM Report's RAWSOURCEBINARY output is a binary file of the uninterrupted flow of RawBodyData; the TM Gap Report requires SCOS 5.4.18+ or 5.5.2+. *(PDF p. 18)*
- SCOS-2000 Data Provision Services (SCOS v5.4.21+ and 5.5.4+) deliver PARC packet data over CORBA without EDDS having to decode it. *(PDF p. 19)*
- PARC stream request forms can still only be saved, not submitted, because streaming from the PARC is not available in this release. *(PDF p. 19)*
- Request statuses include SUBMITTED, QUEUED, ACTIVE, DELIVERED, DELIVERED_PARTIAL_RESULTS, COMPLETED_NO_RESULTS, SERVER_COMPLETED, CANCELED, SUSPENDED and DELIVERED_RESP_DELETED, plus error states such as ERROR_ACCESS_DENIED and ERROR_LIMIT_EXCEEDED. *(PDF p. 20)*
- Further error states are ERROR_INVALID_REQUEST, ERROR_UNKNOWN, ERROR_DELIVERY and ERROR_LOCALLY_DELIVERED; response compression options are TAR, TARGZ and ZIP. *(PDF p. 21)*
- The EDDS DevOps pipeline has three manually triggered stages, package_source, build_publish_image (publishing to the JFROG repository) and helm_deploy. *(PDF p. 73)*
- Client requirements are unchanged from 2018 in the text: Windows 7 or SLES 12, Java 1.8.0_72, Tomcat port 8080 typical. *(PDF p. 13)*


## Cited by these wiki pages (6)

- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [ST[04] Parameter statistics reporting](../ecss/pus/st04-parameter-statistics.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (58 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 8 |
    | 1.1 | Purpose | 8 |
    | 1.2 | Scope | 8 |
    | 1.3 | Document Overview | 8 |
    | 2 | References | 9 |
    | 2.1 | Applicable documents | 9 |
    | 2.2 | Reference documents | 9 |
    | 3 | Glossary | 10 |
    | 3.1 | Acronyms | 10 |
    | 3.2 | Definition of Terms | 11 |
    | 4 | Overview | 13 |
    | 4.1 | EDDS Introduction | 13 |
    | 4.2 | EDDS Client applications | 13 |
    | 4.3 | EDDS Web Page | 14 |
    | 4.4 | EDDS Client APIs | 14 |
    | 4.5 | Software Scope | 14 |
    | 5 | Quick Start Guide | 16 |
    | 5.1 | Setting up user access for a blank mission | 16 |
    | 5.2 | Batch Request types | 17 |
    | 5.2.1 | HARC Requests | 17 |
    | 5.2.2 | EGSCC Requests | 17 |
    | 5.2.3 | FARC Requests | 17 |
    | 5.2.4 | DARC Requests | 17 |
    | 5.2.5 | PARC Requests | 18 |
    | 5.2.6 | EDDS Reports | 18 |
    | 5.2.7 | SMON Requests | 18 |
    | 5.2.8 | File System Requests | 19 |
    | 5.2.9 | Data Provision Service Requests | 19 |
    | 5.3 | Stream Request types | 19 |
    | 5.3.1 | DARC Requests | 19 |
    | 5.3.2 | PARC Requests | 19 |
    | 5.4 | Requests Statuses | 19 |
    | 5.5 | Compression options | 21 |
    | 6 | Reference Section | 22 |
    | 6.1 | EDDS Client | 22 |
    | 6.2 | EDDS MMI Web Application | 70 |
    | 6.3 | Request Submitter | 72 |
    | 6.4 | Performance Processor | 72 |
    | 6.5 | EDDS DevOps | 73 |
    | 6.5.1 | Running the EDDS pipeline | 73 |
    | APPENDIX A | Data Types | 74 |
    | APPENDIX B | Batch Request Forms | 79 |
    | B.6 | EGSCC Parameter | 87 |
    | B.8 | EGSCC Parameter Definition | 89 |
    | B.15 | EGSCC Packet TM | 96 |
    | B.19 | EGSCC Packet TM Raw HARC data | 101 |
    | B.23 | EGSCC Packet TM Report | 106 |
    | B.26 | EGSCC Packet TC Report | 110 |
    | B.27 | EGSCC Log Message Report | 112 |
    | B.28 | EGSCC Activity Report | 113 |
    | B.29 | EGSCC REST Log Message Report | 114 |
    | B.30 | EGSCC REST Packet TM Report | 116 |
    | B.31 | EGSCC REST Packet TC Report | 118 |
    | B.32 | EGSCC REST Packet TM | 119 |
    | B.33 | EGSCC REST Parameter | 120 |
    | B.34 | EGSCC REST Activity Report | 122 |
    | B.35 | EGSCC REST Out of Limit Report | 123 |
    | APPENDIX C | Stream Request Forms | 132 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS) for the EDDS | Issue 22.0 2021-05-31 | applicable |
| [AD-2] | [EGOS-GEN-EDDS-ICD-1001_EUICD](../references/index.md#ref-egos-gen-edds-icd-1001-euicd) | EXTERNAL USER INTERFACE CONTROL DOCUMENT (EUICD) | Issue 24.0 2025-01-10 | applicable |
| [AD-3] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | SOFTWARE DESIGN DOCUMENT (SDD) | Issue 24.0 2025-01-10 | applicable |
| [RD-1] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Issue 24.0 2025-01-10 | reference |
| [RD-2] | [S2K-MCS-SRD-0004-TOS-GIC](../references/index.md#ref-s2k-mcs-srd-0004-tos-gic) | SCOS-2000 TM Data Retrieval Services SRD | Issue 3.1 2003-08-29 | reference |
| [RD-3] | [EGOS-GEN-GEN-SAD-1001-i0r0](../references/index.md#ref-egos-gen-gen-sad-1001) | EGOS High Level Architectural Design Document | 0.0DraftC 2005-05-15 | reference |

!!! note "Notes"
    File name 'EGOS-GEN-EDDS-SUM.v22.pdf' matches the content (Version 22.0, 2025-01-10). The SRS is cited at Issue 22.0 of 2021-05-31, while the CIG and SDD of the same period cite SRS Issue 23.0 of 2021-12-03. Section 5.2 says 'batch requests to 3 data archives: FARC, DARC,PARC and HARC' (four are listed). The contributor list spells 'Diwkar Kushwaha' (spelled 'Diwakar' in the CIG and SDD), and 'Abhishek Annadanappa Chandrashekar' is split over three lines. One DCR says 'EGSSCC quotas'. The client software requirements (Windows 7, SLES 12, Java 1.8.0_72) appear unchanged from the 2018 text. Several EGS-CC request forms (for example B.30) are screenshots only, with no extractable text. Printed page numbers are PDF page minus 7. Later issue of the same document as sum.

