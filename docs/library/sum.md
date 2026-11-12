---
title: "EDDS Software User Manual (issue 14.0)"
description: "The EDDS Software User Manual explains how end users and mission administrators use the EGOS Data Dissemination System(../scos2000/edds.md) client, release v2.3.0."
tags: ["User Manual", "EDDS (EGOS Data Dissemination System)"]
sources: [sum]
---

# Software User Manual (SUM) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-SUM-1001</dd><dt>Issue / version</dt><dd>Version 14.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, M. Hawkshaw, M. Lobjakas, R. Ots, K. Panitzek</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Version 14.0 'Issue for EDDS v.2.3.0i1' (Document Change Log, PDF p. 3). Superseded: the library also holds issue 22.0 (sum-v22).</dd><dt>Pages</dt><dd>111</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SUM.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SUM.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:05:49Z</dd><dt>SHA-256</dt><dd><code>c3ce61634f054bb8f0db6f479b4a64ca85bae9674ffacf243370f5db61bf2355</code></dd><dt>Size</dt><dd>3.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/SUM.pdf">SUM.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The **EDDS Software User Manual** explains how end users and mission administrators use the [EGOS Data Dissemination System](../scos2000/edds.md) client, release v2.3.0. The client is an Eclipse-RCP application based on the EGOS User Desktop, available standalone or as a web application. It gives access to data from the [SCOS-2000](../scos2000/index.md) archives and related ESOC systems ([archives](../scos2000/archives.md)).

Section 4 covers client requirements (Java 8, Windows 7 or SLES 12, Tomcat port 8080), the mission EDDS web page and the Java client API that wraps the EDDS WSDL. Section 5 is a quick start. Administrators build access rights from data access sets, operation data sets, quota sets (which can restrict SPIDs, APIDs and parameter names), roles and groups. The section then catalogues every **request type**. Batch requests cover FARC files, catalogues and subscriptions; DARC parameters, definitions, previews and statistics; PARC TM, TC and event packets (EDDS-header binary, raw PARC XML, reports, statistics, TM gap reports, OOL records); SMON on-the-fly parameters; file-system catalogues; and SCOS-2000 Data Provision Service requests, which return already-decoded packets. Stream requests cover DARC parameters, with PARC streams defined but not yet submittable.

Section 6 walks through the client views: login, user management, request summary, request forms, live stream viewer, parameter and quota views, file view and message displays. It also covers the web application, Request Submitter and Performance Processor. Appendix A defines the date/time, day-of-year, ISO duration and CRON formats used in forms, and Appendices B and C show every batch and stream request form. For a wiki reader it is the practical companion to the EUICD's formal request and response formats.


## Key points

- The standalone EDDS client is based on EUD and Eclipse RCP, downloaded from the mission's EDDS web page; it needs Java 1.8.0_72 on Windows 7 or SLES 12 and talks to the web server, typically on Tomcat port 8080. *(PDF p. 11)*
- The EDDS Client APIs are a Java library implementing the EDDS WSDL interfaces behind a façade usable by any client application. *(PDF p. 12)*
- User access is configured per mission through Data Access Sets, optional Operation Data Sets and Quota Sets (which can restrict SPIDs, APIDs and parameter names), assigned to roles and then to users or groups. *(PDF p. 14)*
- Batch requests go to three archives (FARC, DARC, PARC) plus EDDS reports; PARC data can be obtained via the PARC Manager, the Data Provision Services or SMON. *(PDF p. 15)*
- DARC requests: Parameter (timestamps and values), Parameter Definition (description, type, unit), Parameter Preview and Parameter Statistics (min, max, average, standard deviation, valid/invalid sample counts). *(PDF p. 15)*
- Packet TM returns raw packets with headers as set in the EDDS header configuration; Packet TM Raw PARC data returns packets exactly as stored in the PARC, one XML element per packet; Packet TM Report gives header fields (SPID, APID, type, subtype, data stream, times) plus raw data. *(PDF p. 15)*
- The RAWSOURCEBINARY output format of the Packet TM Report is a binary file holding the uninterrupted flow of the RawBodyData content; the TM Gap Report requires SCOS 5.4.18 or later, or 5.5.2 or later. *(PDF p. 15)*
- The OOL Record Report returns records with timestamps, record types, parameter states, values and limits, showing raw values only, not engineering values. *(PDF p. 16)*
- Data Provision Services in SCOS (v5.4.21 and later, 5.5.4 and later) let EDDS retrieve packet data from the PARC over CORBA without having to decode it; the Packet TM Report can then include parameter information. *(PDF p. 16)*
- Stream requests are supported for DARC parameters; PARC stream forms (TC, TM, SCOS event log, out of limits) can be saved but not yet submitted in this release. *(PDF p. 17)*
- Form time formats: dateTime 'YYYY-MM-DDThh:mm:ss[.xxxxxxZ]' and day-of-year 'YYYY-DDDThh:mm:ss[.xxxxxxZ]'; durations use the 'PnYnMnDTnHnMnS' form. *(PDF p. 69)*


## Cited by these wiki pages (5)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (73 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 6 |
    | 1.1 | Purpose | 6 |
    | 1.2 | Scope | 6 |
    | 1.3 | Document Overview | 6 |
    | 2 | References | 7 |
    | 2.1 | Applicable documents | 7 |
    | 2.2 | Reference documents | 7 |
    | 3 | Glossary | 8 |
    | 3.1 | Acronyms | 8 |
    | 3.2 | Definition of Terms | 9 |
    | 4 | Overview | 11 |
    | 4.1 | EDDS Introduction | 11 |
    | 4.2 | EDDS Client applications | 11 |
    | 4.3 | EDDS Web Page | 12 |
    | 4.4 | EDDS Client APIs | 12 |
    | 4.5 | Software Scope | 12 |
    | 5 | Quick Start Guide | 14 |
    | 5.1 | Setting up user access for a blank mission | 14 |
    | 5.2 | Batch Request types | 15 |
    | 5.2.1 | FARC Requests | 15 |
    | 5.2.2 | DARC Requests | 15 |
    | 5.2.3 | PARC Requests | 15 |
    | 5.2.4 | EDDS Reports | 16 |
    | 5.2.5 | SMON Requests | 16 |
    | 5.2.6 | File System Requests | 16 |
    | 5.2.7 | Data Provision Service Requests | 16 |
    | 5.3 | Stream Request types | 17 |
    | 5.3.1 | DARC Requests | 17 |
    | 5.3.2 | PARC Requests | 17 |
    | 6 | Reference Section | 18 |
    | 6.1 | EDDS Client | 18 |
    | 6.2 | EDDS MMI Web Application | 65 |
    | 6.3 | Request Submitter | 67 |
    | 6.4 | Performance Processor | 67 |
    | APPENDIX A | Data Types | 69 |
    | A.1 | DateTime Data Type | 69 |
    | A.2 | DOY DateTime Data Type | 69 |
    | A.3 | Duration Data Type | 70 |
    | A.4 | CRON Expression Data Type | 71 |
    | APPENDIX B | Batch Request Forms | 74 |
    | B.1 | Archive File | 75 |
    | B.2 | Archive Catalogue | 76 |
    | B.3 | Archive Subscription | 77 |
    | B.4 | Parameter | 78 |
    | B.5 | SMON Parameter | 80 |
    | B.6 | Parameter Definition | 81 |
    | B.7 | Parameter Preview | 82 |
    | B.8 | Parameter Statistics | 83 |
    | B.9 | Packet TM Statistics | 84 |
    | B.10 | Packet TC Statistics | 85 |
    | B.11 | Packet EV Statistics | 86 |
    | B.12 | Packet TM | 87 |
    | B.13 | Packet TC | 88 |
    | B.14 | Packet EV | 89 |
    | B.15 | Packet TM Raw PARC data | 90 |
    | B.16 | Packet TC Raw PARC data | 91 |
    | B.17 | Packet Ev Raw PARC data | 92 |
    | B.18 | Packet TM Report | 93 |
    | B.19 | Packet TM Gap Report | 94 |
    | B.20 | Packet TC Report | 95 |
    | B.21 | Event Record Report | 96 |
    | B.22 | OOL Record Report | 97 |
    | B.23 | EDDS Usage Report | 98 |
    | B.24 | File System File Catalogue and File System Folder Catalogue | 102 |
    | B.25 | File System File | 103 |
    | B.26 | File System Subscription | 104 |
    | APPENDIX C | Stream Request Forms | 105 |
    | C.1 | Schedule Page | 106 |
    | C.2 | Parameter Stream | 107 |
    | C.3 | Packet TC Stream | 108 |
    | C.4 | Packet TM Stream | 109 |
    | C.5 | SCOS Event Log Stream | 110 |
    | C.6 | Out of Limits Stream | 111 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS) for the EDDS | Issue 18.0 2018-02-16 | applicable |
| [AD-2] | [EGOS-GEN-EDDS-ICD-1001_EUICD](../references/index.md#ref-egos-gen-edds-icd-1001-euicd) | EXTERNAL USER INTERFACE CONTROL DOCUMENT (EUICD) | Issue 15.0 2018-02-16 | applicable |
| [AD-3] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | SOFTWARE DESIGN DOCUMENT (SDD) | Issue 13.0 2017-05-05 | applicable |
| [RD-1] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Issue 14.0 2018-02-16 | reference |
| [RD-2] | [S2K-MCS-SRD-0004-TOS-GIC](../references/index.md#ref-s2k-mcs-srd-0004-tos-gic) | SCOS-2000 TM Data Retrieval Services SRD | Issue 3.1 2003-08-29 | reference |
| [RD-3] | [EGOS-GEN-GEN-SAD-1001-i0r0](../references/index.md#ref-egos-gen-gen-sad-1001) | EGOS High Level Architectural Design Document | 0.0DraftC 2005-05-15 | reference |

!!! note "Notes"
    Internal cross-reference errors: section 4.4 cites the EUICD as [AD-03] and section 4.5 cites the SDD as [AD-04], while the reference table lists the EUICD as [AD-2] and the SDD as [AD-3]. The document overview (section 1.3) describes the appendices differently from their actual contents (Appendix A is Data Types, B batch request forms, C stream request forms). Appendix A.2 says 'xxxxxx indicates the nanoseconds' where A.1 says microseconds. Appendices B and C consist mostly of form screenshots, which are not in the text extraction. The applicable SDD is cited at Issue 13.0, although an SDD Issue 15.0 of the same date exists in the library (sdd). Printed page numbers are PDF page minus 5. The file name 'SUM.pdf' carries no version; earlier issue of the same document as sum-v22.

