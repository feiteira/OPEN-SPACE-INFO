---
title: "EDDS Software Design Document (issue 25.0)"
description: "This 2025 issue of the EDDS Software Design Document describes the architecture of the EGOS Data Dissemination System(../scos2000/edds.md) at release v3.6.1."
tags: ["Software Design Document", "EDDS (EGOS Data Dissemination System)"]
sources: [sdd-v24]
---

# Software Design Document (SDD) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-SDD-1001</dd><dt>Issue / version</dt><dd>Version 25.0</dd><dt>Date</dt><dd>2025-03-07</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Manu Mohan, Florian Cleyssac, Rui Santos, M. Hawkshaw, M.Lobjakas, R. Ots, K. Panitzek, Rokibul Uddin, Abhishek Annadanappa Chandrashekar, Teresa Noviello, Alessandro Afloarei, Diwakar Kushwaha</dd><dt>Type</dt><dd>Software Design Document</dd><dt>Status</dt><dd>Title page: Version 25.0, 2025-03-07, 'Issue for EDDS v3.6.1i1' (Document Change Log, PDF p. 3); body footers read 'VERSION: 24.0 2025-01-10'. Latest SDD issue in the library; supersedes sdd (issue 15.0, 2018).</dd><dt>Pages</dt><dd>161</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SDD.v24.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SDD.v24.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:01:34Z</dd><dt>SHA-256</dt><dd><code>8913e69f1f79b17d7f3c770a70445bef4e7d21d5a107508739e3dd8ad19788bf</code></dd><dt>Size</dt><dd>2.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/SDD-v24.pdf">SDD-v24.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

This 2025 issue of the **EDDS Software Design Document** describes the architecture of the [EGOS Data Dissemination System](../scos2000/edds.md) at release v3.6.1. It keeps the full 2018 design (library item sdd). Users without access to the [SCOS-2000](../scos2000/index.md) monitoring and control facilities submit batch, stream and management requests through the MMI, the web portal or SOAP web services. Requests travel over ActiveMQ to an Archiver that stores them in a database and to an EDDS Server that runs chain-of-responsibility pipelines (data manager, filter, formatter, encryption, compression) against the PARC, SCOS-2000 Data Provision Services, DARC, SMON, FARC and file-system providers. A Delivery Manager returns the results, and Secure File Transfer crosses the ESOC firewall.

What is new is support for missions run by the European Ground Systems Common Core ([EGS-CC](../scos2000/ancillary-and-egs-cc.md)). Two new data providers fetch EGS-CC historical data (TM, TC, parameters, messages, events): the HARC provider uses the EGS-CC 'ARC standalone' Java library against the EGS-CC HBase archive, and the EGSCC REST provider uses REST end points, with data delivered over HTTP or Kafka and a STOMP client. Sections 7 and 8 give the architecture and batch-request scenarios for both. Section 10 documents the GitLab DevOps pipeline that builds Docker images and deploys EDDS to a Kubernetes cluster with Helm.

Three appendices matter for data users. Appendix B outlines the ARC standalone API. Appendix C compares the fields of an EGS-CC TM packet report with the SCOS-2000 one: EGS-CC lacks SPID, PI1/PI2, packet length, mnemonic and ground-station fields, and the SPID is mapped to the EGS-CC packet ID. Appendix D maps EGS-CC dataspaces and data partitions onto EDDS domains and data partitions.


## Key points

- Change log runs from issue 1.0 (2007-04-13, post-PDR) to 25.0 (2025-03-07) for EDDS v3.6.1i1; issues 16.0 to 24.0 cover EDDS v2.4.0 to v3.6.0. *(PDF p. 3)*
- Data services remain split into batch services (finite stored data set, optionally scheduled or recurring) and stream services (continuous live data). *(PDF p. 15)*
- Packet streaming of live TM, TC, events and out-of-limits data is only supported through the SCOS-2000 Data Provision Services; clients pull the stream from the ActiveMQ bus to a CometD stream via the client API. *(PDF p. 67)*
- The HARC data provider retrieves EGS-CC historical data (TM, TC, parameters, messages, events) from the EGS-CC HBase archive through the ARC standalone Java API, distributed through the ESOC Nexus; batch only. *(PDF p. 68)*
- The EGSCC REST data provider retrieves EGS-CC data through the EGS-CC REST API acting as a STOMP client. *(PDF p. 69)*
- Unlike SCOS-2000, EGS-CC saves all processed data in its archive; the ARC standalone singleton inside the EDDS Server fetches batch data from the HBase archive using configuration files supplied by the EGS-CC team. *(PDF p. 148)*
- In the REST architecture EGS-CC delivers data to EDDS through HTTP or Kafka, and the JSON data are transformed into EDDS intermediate objects before filtering and formatting. *(PDF p. 152)*
- The GitLab CI pipeline has three stages (package_source, build_publish_image, Helm_deploy); Docker images are built per EDDS component and deployed to a Kubernetes cluster. *(PDF p. 155)*
- ARC standalone interfaces: IOpaqueDataRepository queries TM/TC data and IProcessedDataRepository queries parameter data from the HBase archive. *(PDF p. 158)*
- EGS-CC TM report fields (proto format) include Apid, Packet_id, Generation_time, Earth_received_time, Source_sequence_counter, Pus_type, Pus_sub_type, Spacecraft_id, Virtual_channel_id, Route, Body and Datapartition; the SPID is mapped to the Packet ID. *(PDF p. 160)*
- Fields of the SCOS-2000 TM report that are not applicable to EGS-CC include Spid, Pi1, Pi2, Packet_length, Mnemonic, Domain, Ground_station, Sle_service_id and Database_version, with possible impact on ARES. *(PDF p. 160)*
- Each EGS-CC mission has one static dataspace, mapped to an EDDS domain, and many dynamic data partitions (sessions such as Live and Playback), mapped to EDDS data partitions. *(PDF p. 161)*


## Cited by these wiki pages (6)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (69 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 8 |
    | 1.1 | Purpose | 8 |
    | 1.2 | Scope | 8 |
    | 1.3 | Document Overview | 8 |
    | 2 | References | 9 |
    | 2.1 | Applicable Documents | 9 |
    | 2.2 | Reference Documents | 9 |
    | 3 | Glossary | 12 |
    | 3.1 | Acronyms | 12 |
    | 3.2 | Definition of Terms | 13 |
    | 4 | System Design Overview | 15 |
    | 4.1 | Introduction | 15 |
    | 4.2 | EDDS Services | 15 |
    | 4.3 | Client Applications | 16 |
    | 4.4 | System Context | 17 |
    | 4.5 | External Interfaces | 18 |
    | 5 | Design Standards, Conventions and Procedures | 21 |
    | 6 | Software Top Level Architectural Design | 23 |
    | 6.1 | Overall Architecture | 23 |
    | 6.1.1 | Top Level Component Architecture | 23 |
    | 6.1.2 | EDDS deployment | 24 |
    | 6.1.3 | EDDS vs. ESOC Network Security requirements | 29 |
    | 6.1.4 | EDDS Scalability | 29 |
    | 6.1.5 | EDDS Component Overview | 30 |
    | 6.1.6 | EDDS Services | 36 |
    | 6.1.7 | Scenarios | 37 |
    | 6.2 | Software Product Components | 44 |
    | 6.2.1 | EDDS Client Application | 44 |
    | 6.2.2 | EDDS Client API | 47 |
    | 6.2.3 | Secure File Transfer | 49 |
    | 6.2.4 | Request Submitter | 50 |
    | 6.2.5 | EDDS Stream Client | 51 |
    | 6.2.6 | EDDS Web Server | 52 |
    | 6.2.7 | EDDS Archiver | 54 |
    | 6.2.8 | EDDS Server | 60 |
    | 6.2.9 | PARC and Data Provision data providers | 66 |
    | 6.2.10 | HARC data provider | 67 |
    | 6.2.11 | EGSCC data provider | 68 |
    | 6.2.12 | EDDS FARC Interface | 71 |
    | 6.2.13 | FARC data provider | 72 |
    | 6.2.14 | File System data provider | 74 |
    | 6.2.15 | DARC data provider | 76 |
    | 6.2.16 | SMON data provider | 77 |
    | 6.2.17 | Delivery Manager | 78 |
    | 6.3 | Software Product Sub Components | 84 |
    | 6.3.8 | Generic Batch Request Handler Factory (Data Manager, Filter, Formatter, XML Transformer, Encryption, Data Compress) | 96 |
    | 6.3.9 | PARC & Data Provision Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compress) | 102 |
    | 6.3.10 | EDDS HBase Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compress) | 118 |
    | 6.3.11 | FARC Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compress) | 122 |
    | 6.3.12 | EDDS File System Request Processor (Data Provider, Filter, Formatter) | 127 |
    | 6.3.13 | DARC Request Processor (Data Manager, Filter, Formatter, Encryption, Data Compression) | 130 |
    | 6.3.14 | EDDS SMON Request Processor (Data Provider, Filter, Formatter) | 134 |
    | 7 | EDDS-CC Architecture | 148 |
    | 7.1 | Software Top Level Architectural Design | 148 |
    | 7.2 | Overall Architecture | 148 |
    | 8 | EDDS-CC REST Architecture | 151 |
    | 8.1 | Software Top Level Architectural Design | 151 |
    | 8.2 | Overall Architecture | 151 |
    | 9 | Software Components Detailed Design | 153 |
    | 9.1 | Database Design | 153 |
    | 9.2 | Software Detailed Design | 154 |
    | 10 | EDDS DevOps | 155 |
    | 10.1 | Packaging Source | 155 |
    | 10.2 | Building and Publishing EDDS Image | 155 |
    | 10.3 | Deploying EDDS Artifacts | 156 |
    | APPENDIX A | Chain of Responsibility Pattern | 157 |
    | APPENDIX B | ARC Standalone API | 158 |
    | APPENDIX C | Response Format Compatibility for ARES | 160 |
    | APPENDIX D | Dataspace and Datapartition in EGS-CC | 161 |


## Documents this one references (48)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS) for the EDDS | Issue 23.0 2021-12-03 | applicable |
| [AD-2] | [EGOS-GEN-EDDS-SDP-0001](../references/index.md#ref-egos-gen-edds-sdp-0001) | Software Development Plan (SDP) for the EDDS | Issue 1.1 2010-01-18 | applicable |
| [AD-3] | [EGOS-GEN-EDDS-ICD-1001](../references/index.md#ref-egos-gen-edds-icd-1001) · [library](euicd-unversioned.md), [library](euicd-i15r0.md), [library](euicd-v25.md), [library](euicd-v13.md) | EDDS External User Interface Control Document (EUICD) | Issue 24.0 2025-01-10 | applicable |
| [AD-4] | [EGOS-GEN-GEN-SAD-1001-i0r0](../references/index.md#ref-egos-gen-gen-sad-1001) | EGOS High Level Software Architectural Design Document | 0.0 Draft C 2006-05-15 | applicable |
| [AD-5] | [BSSC 2005(1)](../references/index.md#ref-bssc-20051) | Tailoring of ECSS software Engineering Standards for Ground segments in ESA | Issue 1.0 June 2005 | applicable |
| [AD-6] | [EGOS-GEN-GEN-TN-1001](../references/index.md#ref-egos-gen-gen-tn-1001) | EGOS Preferred 3rd Party Products | Issue 1.2 2006-12-20 | applicable |
| [AD-7] | [EGGS-ESOC-GS-SRS-1001](../references/index.md#ref-eggs-esoc-gs-srs-1001) | ESOC Generic Ground Systems (EGGS): Development Requirements Specification | Issue 1.0 2006-11-10 | applicable |
| [AD-8] | [EGOS-GEN-SFT-SUM-1001](../references/index.md#ref-egos-gen-sft-sum-1001) | SFT documentation | Issue 2.0 2010-04-20 | applicable |
| [AD-9] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | Configuration and Installation Guide (CIG) | Issue 24.0 2025-01-10 | applicable |
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
| [RD-17] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md) | EDDS SDD | Issue 19 2021-12-03 | reference |
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
| [RD-29] | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | EDDS Client Software User Manual (SUM) | Issue 22.0 2025-01-10 | reference |
| [RD-30] | [catalogue](../references/index.md#ref-common-development-and-distribution-license-cddl-version-1-0-gnu-general-public-) | Common Development and Distribution License (CDDL) version 1.0 + GNU General Public License (GPL) version 2 (https://glassfish.dev.java.net/public/CDDL+GPL.html) |  | reference |
| [RD-31] | [catalogue](../references/index.md#ref-apache-license-version-2-0-http-www-apache-org-licenses-license-2-0) | Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) |  | reference |

!!! note "Notes"
    File-name vs content mismatch: published as 'EGOS-GEN-EDDS-SDD.v24.pdf' (slug sdd-v24), but the title page says Version 25.0 of 2025-03-07; body footers say 'VERSION: 24.0 2025-01-10' and the change-log page footer says 'VERSION: 24.0.0 2023-11-01'. Appendix B and C subsections are misnumbered 10.4 to 10.6 (continuing chapter 10), and several figure captions have garbled numbers (for example 'Figure 423', 'Figure 445'). Sections 7.1 and 8.1 are empty headings. The text alternates between 'EGSCC', 'EGS-CC' and 'EGOS-CC'. The reference list matches the 2018 issue apart from updated issues of the SRS (23.0), EUICD (24.0), CIG (24.0), SDD (19) and SUM (22.0). Printed page numbers are PDF page minus 7. Later issue of the same document as sdd.

