---
title: "EDDS Software Design Document (issue 15.0)"
description: "The EDDS Software Design Document gives the top-level architectural design of the EGOS Data Dissemination System(../scos2000/edds.md) at release v2.3.0."
tags: ["Software Design Document", "EDDS (EGOS Data Dissemination System)"]
sources: [sdd]
---

# Software Design Document (SDD) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-SDD-1001</dd><dt>Issue / version</dt><dd>Version 15.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, M. Hawkshaw, M.Lobjakas, R. Ots, K. Panitzek</dd><dt>Type</dt><dd>Software Design Document</dd><dt>Status</dt><dd>Version 15.0 'Issue for EDDS v2.3.0i1' (Document Change Log, PDF p. 3). Superseded by later issues; the library also holds the 2025 issue (sdd-v24).</dd><dt>Pages</dt><dd>135</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SDD.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SDD.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:00:17Z</dd><dt>SHA-256</dt><dd><code>517c61603a4b1b3846fe7e0cfbb5d498ceea9bccdf24c7161b6a6ea8141b48bd</code></dd><dt>Size</dt><dd>1.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/SDD.pdf">SDD.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The **EDDS Software Design Document** gives the top-level architectural design of the [EGOS Data Dissemination System](../scos2000/edds.md) at release v2.3.0. EDDS gives users without access to the [SCOS-2000](../scos2000/index.md) monitoring and control facilities controlled access to mission data: telemetry, telecommand history, events, parameters, files and reports. Detailed design is left to the JavaDoc.

Section 4 sets out the three service families: management services (accounts, roles, quotas), data services, split into batch requests that return a finite data set and stream requests that deliver live data, and notification services. It also describes the client applications (web portal, standalone and web MMI, and user programs calling the SOAP web services defined in the EUICD) and the network context: the Web Server sits in the RELAY LAN or Office LAN, the EDDS Server and data providers in the OPS LAN. EDDS reads packets from the PARC, parameters from the DARC and SMON, files from the FARC, and uses SCOS-2000 to produce MCS reports.

Section 6 describes the architecture. SOAP requests enter at the Web Server, pass over an ActiveMQ message bus and are stored by the Archiver in a relational database. The EDDS Server dispatches them to data providers through Camel routes, and the Delivery Manager returns results by e-mail, FTP or SFTP, with Secure File Transfer (SFT) carrying files across the ESOC firewall. Each provider is a chain-of-responsibility pipeline of data manager, filter, formatter, encryption and compression. The PARC provider explains how EDDS adds APID, type and subtype filtering on top of the SPID-only PARC CORBA interface by loading the SCOS-2000 packet definitions. It also covers the newer SCOS-2000 Data Provision Services, which deliver packets already decoded.


## Key points

- The SDD covers only the top-level architecture; detailed design is in the JavaDoc generated from the source code (section 7.2). *(PDF p. 7)*
- EDDS provides mission data to users without MCS access but provides no analysis tools; data include telemetry, science and non-science data, telecommand history and auxiliary data such as flight dynamics data. *(PDF p. 14)*
- Data services are either batch (a request lists data types with filters per type and returns a finite data set via the chosen delivery method, optionally scheduled or recurring) or stream (continuous data actively pulled by the client). *(PDF p. 14)*
- Users reach EDDS through the web portal, the standalone or web MMI, or their own programs using the SOAP web-services interface described in the EUICD. *(PDF p. 15)*
- Internal clients use the OPS LAN or Office LAN; external clients reach the EDDS Web Server in the RELAY LAN; the Web Server includes a Delivery Manager for e-mail, FTP and SFTP delivery. *(PDF p. 16)*
- EDDS uses the PARC for TM, TC and event packets, the DARC and SMON for telemetry parameters, the FARC for mission files and SCOS-2000 for MCS reports. *(PDF p. 18)*
- The Request Submitter polls a directory for request files in EDDS or GDDS format; GDDS-format requests are validated against the GDDS schema and converted to EDDS format by XSLT. *(PDF p. 18)*
- SOAP requests are passed over a message bus and stored in a relational database by the EDDS Archiver, which also schedules recurring batch requests; the EDDS Server executes requests against FARC, DARC, SMON, Data Provision Services and PARC. *(PDF p. 22)*
- To meet ESOC network security rules, all connections are initiated from the OPS LAN; the EDDS Server reaches the ActiveMQ broker by JMS on default port 61616 and responses return to the RELAY LAN via the SFT daemon. *(PDF p. 28)*
- The PARC CORBA interface allows queries by SPID only, with no type/subtype filtering; EDDS adds APID, TYPE and SUBTYPE filters by loading the SCOS-2000 packet definition table and mapping APIDs to SPIDs. *(PDF p. 64)*
- The SCOS-2000 Data Provision Services deliver archive data already decoded and can supply TM parameter information; packet streaming (live TM, TC, events and out-of-limits) is only supported through Data Provision Services. *(PDF p. 65)*
- COTS used include Apache Camel 2.14.1 as routing engine, Spring Framework 4.1.3, MyBatis and the XFDU library 1.1 for XML Formatted Data Units. *(PDF p. 21)*
- The EDDS database is accessed through MyBatis with a one-to-one mapping between tables and Java models, behind a 'DaoAccess' façade. *(PDF p. 133)*


## Cited by these wiki pages (8)

- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)


??? abstract "Contents (70 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 7 |
    | 1.1 | Purpose | 7 |
    | 1.2 | Scope | 7 |
    | 1.3 | Document Overview | 7 |
    | 2 | References | 8 |
    | 2.1 | Applicable Documents | 8 |
    | 2.2 | Reference Documents | 8 |
    | 3 | Glossary | 11 |
    | 3.1 | Acronyms | 11 |
    | 3.2 | Definition of Terms | 12 |
    | 4 | System Design Overview | 14 |
    | 4.1 | Introduction | 14 |
    | 4.2 | EDDS Services | 14 |
    | 4.3 | Client Applications | 15 |
    | 4.4 | System Context | 16 |
    | 4.5 | External Interfaces | 17 |
    | 5 | Design Standards, Conventions and Procedures | 20 |
    | 5.1 | Architectural Design Method | 20 |
    | 5.2 | Detail Design Method | 20 |
    | 5.3 | Documentation Standards | 20 |
    | 5.4 | Naming Conventions | 20 |
    | 5.5 | Programming Standards | 20 |
    | 5.6 | Reuse of Pre-developed Software | 20 |
    | 6 | Software Top Level Architectural Design | 22 |
    | 6.1 | Overall Architecture | 22 |
    | 6.1.1 | Top Level Component Architecture | 22 |
    | 6.1.2 | EDDS deployment | 23 |
    | 6.1.3 | EDDS vs. ESOC Network Security requirements | 28 |
    | 6.1.4 | EDDS Scalability | 28 |
    | 6.1.5 | EDDS Component Overview | 29 |
    | 6.1.6 | EDDS Services | 34 |
    | 6.1.7 | Scenarios | 35 |
    | 6.2 | Software Product Components | 42 |
    | 6.2.1 | EDDS Client Application | 42 |
    | 6.2.2 | EDDS Client API | 45 |
    | 6.2.3 | Secure File Transfer | 47 |
    | 6.2.4 | Request Submitter | 48 |
    | 6.2.5 | EDDS Stream Client | 49 |
    | 6.2.6 | EDDS Web Server | 50 |
    | 6.2.7 | EDDS Archiver | 52 |
    | 6.2.8 | EDDS Server | 58 |
    | 6.2.9 | PARC and Data Provision data providers | 64 |
    | 6.2.10 | EDDS FARC Interface | 66 |
    | 6.2.11 | FARC data provider | 67 |
    | 6.2.12 | File System data provider | 69 |
    | 6.2.13 | DARC data provider | 71 |
    | 6.2.14 | SMON data provider | 72 |
    | 6.2.15 | Delivery Manager | 73 |
    | 6.3 | Software Product Sub Components | 78 |
    | 6.3.1 | Configuration Manager | 79 |
    | 6.3.2 | Acknowledgement Manager | 81 |
    | 6.3.3 | EDDS Batch Request Manager | 82 |
    | 6.3.4 | EDDS Stream Request Manager | 84 |
    | 6.3.5 | EDDS Batch Request Handler | 85 |
    | 6.3.6 | EDDS Quota Check Handler | 87 |
    | 6.3.7 | Generic Stream Request Processor | 89 |
    | 6.3.8 | Generic Batch Request Handler Factory (Data Manager, Filter, Formatter, XML Transformer, Encryption, Data Compress) | 90 |
    | 6.3.9 | PARC & Data Provision Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compress) | 96 |
    | 6.3.10 | FARC Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compress) | 112 |
    | 6.3.11 | EDDS File System Request Processor (Data Provider, Filter, Formatter) | 117 |
    | 6.3.12 | DARC Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compression) | 120 |
    | 6.3.13 | EDDS SMON Request Processor (Data Provider, Filter, Formatter) | 124 |
    | 6.3.14 | EDDS Report Request Processor | 126 |
    | 6.3.15 | EDDS User Request Processor | 127 |
    | 6.3.16 | EDDS Database Manager | 129 |
    | 6.3.17 | EDDS File System Index | 132 |
    | 7 | Software Components Detailed Design | 133 |
    | 7.1 | Database Design | 133 |
    | 7.2 | Software Detailed Design | 134 |
    | APPENDIX A | Chain of Responsibility Pattern | 135 |


## Documents this one references (48)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS) for the EDDS | Issue 18.0 2018-02-16 | applicable |
| [AD-2] | [EGOS-GEN-EDDS-SDP-0001](../references/index.md#ref-egos-gen-edds-sdp-0001) | Software Development Plan (SDP) for the EDDS | Issue 1.1 2010-01-18 | applicable |
| [AD-3] | [EGOS-GEN-EDDS-ICD-1001](../references/index.md#ref-egos-gen-edds-icd-1001) · [library](euicd-unversioned.md), [library](euicd-i15r0.md), [library](euicd-v25.md), [library](euicd-v13.md) | EDDS External User Interface Control Document (EUICD) | Issue 15.0 2018-02-16 | applicable |
| [AD-4] | [EGOS-GEN-GEN-SAD-1001-i0r0](../references/index.md#ref-egos-gen-gen-sad-1001) | EGOS High Level Software Architectural Design Document | 0.0 Draft C 2006-05-15 | applicable |
| [AD-5] | [BSSC 2005(1)](../references/index.md#ref-bssc-20051) | Tailoring of ECSS software Engineering Standards for Ground segments in ESA | Issue 1.0 June 2005 | applicable |
| [AD-6] | [EGOS-GEN-GEN-TN-1001](../references/index.md#ref-egos-gen-gen-tn-1001) | EGOS Preferred 3rd Party Products | Issue 1.2 2006-12-20 | applicable |
| [AD-7] | [EGGS-ESOC-GS-SRS-1001](../references/index.md#ref-eggs-esoc-gs-srs-1001) | ESOC Generic Ground Systems (EGGS): Development Requirements Specification | Issue 1.0 2006-11-10 | applicable |
| [AD-8] | [EGOS-GEN-SFT-SUM-1001](../references/index.md#ref-egos-gen-sft-sum-1001) | SFT documentation | Issue 2.0 2010-04-20 | applicable |
| [AD-9] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | Configuration and Installation Guide (CIG) | Issue 14.0 2018-02-16 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0010](../references/index.md#ref-egos-gen-gen-tn-0010) | EGOS Template Guidelines | 3.0 01.11.07 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0020](../references/index.md#ref-egos-gen-gen-tn-0020) | CIG Template Guidelines | 3.0 01.11.07 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0021](../references/index.md#ref-egos-gen-gen-tn-0021) | SRN Template Guidelines | 3.0 01.11.07 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0030](../references/index.md#ref-egos-gen-gen-tn-0030) | ICD Template Guidelines | 3.0 01.11.07 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0040](../references/index.md#ref-egos-gen-gen-tn-0040) | ADD Template Guidelines | 3.0 01.11.07 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0050](../references/index.md#ref-egos-gen-gen-tn-0050) | OUM Template Guidelines | 2.0 27.10.06 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0060](../references/index.md#ref-egos-gen-gen-tn-0060) | SUM Template Guidelines | 3.0 01.11.07 | applicable |
| [E-DOT] | [EGOS-GEN-GEN-TN-0070](../references/index.md#ref-egos-gen-gen-tn-0070) | SRD Template Guidelines | 2.0 27.10.06 | applicable |
| [RD-1] | [catalogue](../references/index.md#ref-producer-archive-interface-specification) | Producer-Archive Interface Specification | Draft White Book December-2005 | reference |
| [RD-2] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-3] | [S2K-MCS-SRD-0004-TOS-GIC](../references/index.md#ref-s2k-mcs-srd-0004-tos-gic) | SCOS-2000 TM Data Retrieval Services SRD | Issue 3.1 2003-08-29 | reference |
| [RD-4] | [EGOS-MCS-GDDS-SRD-5720](../references/index.md#ref-egos-mcs-gdds-srd-5720) | Data Disposition System Software Requirements Document | Issue 1.4 2004-08-30 | reference |
| [RD-5] | [ESA/TOS-GIC](../references/index.md#ref-esa-tos-gic) | WEB-RM User & Software Requirements Baseline | Issue 1.4 2003-11-24 | reference |
| [RD-6] | [No reference](../references/index.md#ref-no-reference) | MUST Repository ICD | Draft 1.0 (No Date) | reference |
| [RD-7] | [No reference](../references/index.md#ref-no-reference) | MUST Rosetta Performance TN | Issue 1.1 (No Date) | reference |
| [RD-8] | [No reference](../references/index.md#ref-no-reference) | MUST Server Software Requirements Specification | Issue 1.0 2006-07-04 | reference |
| [RD-9] | [661.0-B.1](../references/index.md#ref-661-0-b-1) | XML Formatted Data Unit (XFDU) Structure and Construction Rules | BLUE BOOK 661.0-B.1 Set 2008 | reference |
| [RD-10] | [EGOS-GEN-GEN-SAD-1001-i0r0](../references/index.md#ref-egos-gen-gen-sad-1001) | EGOS High Level Architectural Design Document | 0.0DraftC 2005-05-15 | reference |
| [RD-11] | [S2K-MCS-ICD-0017-TOS-GIC](../references/index.md#ref-s2k-mcs-icd-0017-tos-gic) | TDRS External Interfaces Control Document | Issue 4.3 2004-03-31 | reference |
| [RD-12] | [EGOS-MCS-GDDS-ICD-1003](../references/index.md#ref-egos-mcs-gdds-icd-1003) | Generic Data Delivery Interface Document (GDDID) | Issue 1.2 2004-08-30 | reference |
| [RD-13] | [910.4-B-1](../references/index.md#ref-910-4-b-1) | CCSDS Definition Cross Support Reference Model – Part 1, Space Link Extension Services | Issue 1 May-1996 | reference |
| [RD-14] | [catalogue](../references/index.md#ref-esacert-information-including-security-plan-template-and-guidelines-http-forum-e) | ESACERT information including Security Plan template and guidelines: http://forum.esacert.esa.int/guidelines.html | N/A | reference |
| [RD-15] | [DOPS-COM-POL-34555-OPS-ECT](../references/index.md#ref-dops-com-pol-34555-ops-ect) | Implementation of the ESA Network Security Policy for OPSNET | Issue 2 Revision 3 2007-11-09 | reference |
| [RD-16] | [EGOS-GEN-EDDS-ICD-1001](../references/index.md#ref-egos-gen-edds-icd-1001) · [library](euicd-unversioned.md), [library](euicd-i15r0.md), [library](euicd-v25.md), [library](euicd-v13.md) | EGOS ICD Raw Data Media Production System | Issue 1 2007-04-13 | reference |
| [RD-17] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd-v24.md) | EDDS SDD | Issue 13 2017-05-05 | reference |
| [RD-18] | [EGOS-MDW-TN-1002](../references/index.md#ref-egos-mdw-tn-1002) | Analysis of Web Services and PARC, Enhancements to support EDDS | Issue 1 2007-04-13 | reference |
| [RD-19] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-20] | [EGOS-MCS-S2K-ICD-1004](../references/index.md#ref-egos-mcs-s2k-icd-1004) | MONITORING & CONTROL SCOS-2000 - SFM SERVICE ICD | Issue 6 2008-11-07 | reference |
| [RD-21] | [EGOS-MCS-S2K-ICD-1005](../references/index.md#ref-egos-mcs-s2k-icd-1005) | SYSTEM MANAGEMENT SCOS-2000 - SFM SERVICE ICD | Issue 5 2008-11-07 | reference |
| [RD-22] | [CCSDS 661.0-B-1](../references/index.md#ref-ccsds-661-0-b-1) | XML FORMATTED DATA UNIT (XFDU) STRUCTURE AND CONSTRUCTION RULES - Blue book | September 2008 | reference |
| [RD-23] | [EGOS-GEN-DARC-ICD-1001](../references/index.md#ref-egos-gen-darc-icd-1001) | DARC ICD | Issue 2.0 2014-06-06 | reference |
| [RD-24] | [EGOS-GEN-DARC-SDD-0040](../references/index.md#ref-egos-gen-darc-sdd-0040) | Software Design Document DARC | Issue 2.0 2014-06-06 | reference |
| [RD-25] | [EGOS-MDW-UDK-ICD-0001](../references/index.md#ref-egos-mdw-udk-icd-0001) | EGOS USER DESKTOP ICD | Issue 2.2 2008-11-25 | reference |
| [RD-26] | [EGOS-MDW-UDK-SDD-0001](../references/index.md#ref-egos-mdw-udk-sdd-0001) | EGOS USER DESKTOP SDD | Issue 2.1 2008-07-28 | reference |
| [RD-27] | [EGOS-MDW-LLC-ICD-1005](../references/index.md#ref-egos-mdw-llc-icd-1005) | Session Manager ICD | Issue 1.3a 2008-12-12 | reference |
| [RD-28] | [EGOS-MDW-COR-SDD-1005](../references/index.md#ref-egos-mdw-cor-sdd-1005) | Session Manager SDD | Issue 1.3a 2008-12-12 | reference |
| [RD-29] | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | EDDS Client Software User Manual (SUM) | Issue 12.0 2017-05-05 | reference |
| [RD-30] | [catalogue](../references/index.md#ref-common-development-and-distribution-license-cddl-version-1-0-gnu-general-public-) | Common Development and Distribution License (CDDL) version 1.0 + GNU General Public License (GPL) version 2 (https://glassfish.dev.java.net/public/CDDL+GPL.html) |  | reference |
| [RD-31] | [catalogue](../references/index.md#ref-apache-license-version-2-0-http-www-apache-org-licenses-license-2-0) | Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) |  | reference |

!!! note "Notes"
    The file name 'SDD.pdf' carries no version; the content is Version 15.0 of 2018-02-16 (EDDS v2.3.0i1). The Software Release Note of the same delivery (srn, PDF p. 9) lists the SDD at I13r0 of 2017-05-05, so the two documents disagree on the current SDD issue. The SDD cites the Client SUM as [RD-29] in the reference list but as [RD-31] in section 4.3 (PDF p. 15), where [RD-31] is actually the Apache License. Section 1.3 says Appendix A is 'Top Level Architecture Traceability', but the actual Appendix A is the Chain of Responsibility Pattern. [RD-16] reuses the document number EGOS-GEN-EDDS-ICD-1001 for an RDM production ICD. Architecture figures are images and are not in the text extraction. Printed page numbers are PDF page minus 6. Earlier issue of the same document as sdd-v24.

