---
title: "EDDS External User ICD (issue 24.0)"
description: "Issue 24.0 (January 2025) of the EDDS External User Interface Control Document is the most recent public specification of how clients talk to the EGOS Data Dissemination System(../scos2000/edds.md) an"
tags: ["Interface Control Document", "EDDS (EGOS Data Dissemination System)"]
sources: [euicd-v25]
---

# External User Interface Control Document (EUICD) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-ICD-1001</dd><dt>Issue / version</dt><dd>Version 24.0</dd><dt>Date</dt><dd>2025-01-10</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team (COSMIC)</dd><dt>Authors</dt><dd>Florian Cleyssac, Rui Santos, M. Hawkshaw, R. Ots, K. Panitzek, Rokibul Uddin, Abhishek Annadanappa Chandrashekar, Teresa Noviello, AlaEddine Zaghdoud, Manu Mohan</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Version 24.0 'Issue for EDDS v3.6.0i1' (Document Change Log, PDF p. 3). Latest EUICD issue in the library; the CIG and SDD issues 25.0 of 2025-03-07 (cig-v24, sdd-v24) cite EUICD Issue 24.0 as current.</dd><dt>Pages</dt><dd>373</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUICD.v25.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUICD.v25.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:59:26Z</dd><dt>SHA-256</dt><dd><code>f6bae63aee0d6abfe620acc39f2d97abfb21fdb78404545776d22184d4e096d2</code></dd><dt>Size</dt><dd>4.8 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/EUICD-v25.pdf">EUICD-v25.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 24.0 (January 2025) of the **EDDS External User Interface Control Document** is the most recent public specification of how clients talk to the [EGOS Data Dissemination System](../scos2000/edds.md) and what it returns, at release v3.6.0. It keeps everything in the 2014 to 2018 issues. The services (authentication, batch, stream, user management) and the [SCOS-2000](../scos2000/index.md) data types are unchanged: PARC packets via the PARC Manager or Data Provision Services, DARC and SMON parameters, MCS and EDDS reports, FARC and file-system files. So are the formats: self-describing EDDS binary with optional TM/TC/EV header fields, XML/XSLT, XFDU, TDRS spreadsheet, ASCII, Protocol Buffers and RawSourceBinary, together with the naming rules, delivery options, SOAP/WSDL services, Java client API and XML schema appendices.

Close to 90 pages were added for missions run on the European Ground Systems Common Core ([EGS-CC](../scos2000/ancillary-and-egs-cc.md)). Data can now come from the EGS-CC HBase archive (HARC) or the EGS-CC REST interface. New `Egscc*` request types cover parameters, parameter definitions, raw and decoded TM, TC reports, log messages, activities and out-of-limits. There are dedicated EGS-CC binary header layouts (for example a 16-field EGS-CC TM header with packet instance ID, live flag, Earth-received time, route and data partition) and Protocol Buffers messages whose times are strings of seconds since epoch with 12 decimal places. Other additions are an EDDS REST API (section 9.5, with batchRequest, getStatus, streamRequest and other operations), a section on GDDS-format requests accepted by the Request Submitter and how they map to EDDS requests, live packet streaming via Data Provision Services, a large Java code-example appendix (O) and the DevOps pipeline (P).


## Key points

- Change log covers issues 1.0 (2007-04-13) to 24.0 (2025-01-10); DCRs for this issue include EDDS-1355 (pre-filtering of EGSCC requests), EDDS-1373 (align Kafka and EDDS response fields) and EDDS-1367 (activity argument data mapped to the TM parameter proto). *(PDF p. 3)*
- EDDS-1271 added EGS-CC out-of-limit requests to the interface (section 6.7.3.3.16, C.100, G.88 to G.90, I.50). *(PDF p. 4)*
- Live TM, TC, event-log and OOL packet streaming is supported only via the SCOS-2000 Data Provision Services (SCOS 5.4.21 and 5.5.4 or later), published on an ActiveMQ topic or forwarded over CometD. *(PDF p. 23)*
- The Request Submitter also accepts GDDS-format requests, converted to EDDS requests by an XSLT (GDDS2EDDS.xsl); scheduled GDDS requests always produce 10 EDDS requests because GDDS has no end date. *(PDF p. 27)*
- Packets are now extracted through the PARC Manager, the Data Provision Services, the HARC manager interface or the EGSCC REST interface; parameters come from DARC, SMON, HARC and EGSCC. *(PDF p. 33)*
- New request-to-response mappings include EgsccParam to EgsccParameterResponse, EgsccPktTmRaw to PktRawResponse, EgsccPktTmReport to EgsccPktTmReportResponse and EgsccLogMessageReport to EgsccLogMessageResponse. *(PDF p. 35)*
- The EGS-CC TM binary header defines 16 fields: APID, PID, CUC generation time, time quality (0 GOOD, 1 INACCURATE, 2 BAD, 255 NA), live flag, packet instance ID, Earth received time, SSC, PUS type, spacecraft ID, quality flag, virtual channel, PUS subtype, EGS-CC reception time, route and data partition. *(PDF p. 42)*
- EGS-CC Protocol Buffers reports express time fields as seconds since epoch with picosecond precision, as a fixed-point string with 12 decimal places. *(PDF p. 58)*
- The classic Packet TM Report proto includes spid, type, sub_type, time_quality, virtual_channel, data_unit_type, pi1, pi2, packet_length and mnemonic fields. *(PDF p. 67)*
- RawSourceBinary remains a continuous stream of TM source packets without additional header, available for the TM Report request. *(PDF p. 82)*
- Section 9.5 defines an EDDS REST API at /edds/EddsRestService/v1/ with POST operations such as batchRequest (returns job IDs), getStatus (returns an acknowledgement), streamRequest, reSubmit, getStatuses, getResponse and getRequest. *(PDF p. 136)*
- Appendix P: the GitLab pipeline has build, publish (JFROG repository) and deploy (Kubernetes cluster) stages. *(PDF p. 373)*


## Cited by these wiki pages (16)

- [Command verification in the MIB](../mib/command-verification.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [SLE forward service: FCLTU](../ccsds/sle/fcltu.md)
- [SLE return services: RAF, RCF and ROCF](../ccsds/sle/return-services.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [TDRS: Telemetry Data Retrieval Service](../scos2000/tdrs.md)
- [The standards landscape](../overview/standards-map.md)
- [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md)


??? abstract "Contents (64 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 17 |
    | 1.1 | Purpose | 17 |
    | 1.2 | Scope | 17 |
    | 1.3 | Document Overview | 17 |
    | 2 | References | 19 |
    | 2.1 | Applicable documents | 19 |
    | 2.2 | Reference documents | 19 |
    | 3 | Glossary | 20 |
    | 3.1 | Acronyms | 20 |
    | 3.2 | Definition of Terms | 21 |
    | 4 | Software Overview | 22 |
    | 4.1 | EDDS Services Overview | 22 |
    | 4.2 | EDDS Interface Overview | 25 |
    | 4.3 | Client Applications Overview | 25 |
    | 5 | Data Types | 33 |
    | 5.1 | Packet | 33 |
    | 5.2 | Parameter | 33 |
    | 5.3 | Report | 34 |
    | 5.4 | Archived Files | 34 |
    | 5.5 | Acknowledgement | 35 |
    | 5.6 | Request and Response Mappings | 35 |
    | 6 | Formats | 37 |
    | 6.1 | EDDS Binary | 39 |
    | 6.2 | XML | 49 |
    | 6.3 | XML Transform | 51 |
    | 6.4 | XFDU | 51 |
    | 6.5 | TDRS Spreadsheet | 51 |
    | 6.6 | ASCII | 51 |
    | 6.7 | Binary | 53 |
    | 6.8 | RawSourceBinary | 82 |
    | 7 | Naming Conventions | 83 |
    | 7.1 | Request ID Convention | 83 |
    | 7.2 | Response ID Convention | 83 |
    | 8 | Delivery | 85 |
    | 8.1 | Delivery Mechanism | 85 |
    | 9 | Web Services Description | 86 |
    | 9.1 | Web Service Introduction | 86 |
    | 9.2 | PortTypes | 86 |
    | 9.3 | Messages | 103 |
    | 9.4 | Bindings | 128 |
    | 9.5 | EDDS REST API endpoints | 136 |
    | 10 | E-mail Interface | 146 |
    | 11 | File Server Interface | 147 |
    | 12 | Client API | 148 |
    | 12.1 | Edds Web Services Client API | 149 |
    | 12.2 | EDDS Push notifications client | 164 |
    | 12.3 | EDDS Utility methods | 165 |
    | 12.4 | Dependencies | 165 |
    | APPENDIX A | Acknowledgement Data Type | 166 |
    | APPENDIX B | Authentication Data Type | 171 |
    | APPENDIX C | Batch Request Data Type | 172 |
    | APPENDIX D | Common Data Types | 227 |
    | APPENDIX E | Delivery Data Type | 246 |
    | APPENDIX F | File System Data Types | 250 |
    | APPENDIX G | Filter Data Type | 257 |
    | APPENDIX H | Format Data Type | 294 |
    | APPENDIX I | Report Data Type | 305 |
    | APPENDIX J | Schedule Data Type | 328 |
    | APPENDIX K | User Management Data Type | 332 |
    | APPENDIX L | Stream Request Data Type | 351 |
    | APPENDIX M | EDDS Parameter Spreadsheet | 355 |
    | APPENDIX N | Google Protocol Buffers | 356 |
    | APPENDIX O | Code Examples | 357 |
    | APPENDIX P | EDDS DevOps | 373 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [661.0-B.1](../references/index.md#ref-661-0-b-1) | CCSDS, XML Formatted Data Unit (XFDU) Structure and Construction Rules. | BLUE BOOK 661.0-B.1 Set 2008 | applicable |
| [AD-2] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document DDID Appendix F | Issue 1.4 2008-04-11 | applicable |
| [RD-1] | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | EDDS Software User Manual | Version 22.0 2025-01-10 | reference |
| [RD-2] | [RFC 2045](../references/index.md#ref-rfc-2045) | Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies | November 1996 | reference |
| [RD-3] | [catalogue](../references/index.md#ref-web-services-definition-language-wsdl-1-1-http-www-w3-org-tr-wsdl) | Web Services Definition Language (WSDL) 1.1 (http://www.w3.org/TR/wsdl) | 2001-03-15 | reference |
| [RD-4] | [no reference](../references/index.md#ref-no-reference) | MUST Architectural Design Document | Version 1.1 2006-01-13 | reference |
| [RD-5] | [catalogue](../references/index.md#ref-xsl-transforms-xslt-version-1-0-http-www-w3-org-tr-xslt) | XSL Transforms (XSLT) Version 1.0 (http://www.w3.org/TR/xslt) | 1999-11-16 | reference |
| [RD-6] | [catalogue](../references/index.md#ref-extensible-markup-language-xml-1-0-fourth-edition-http-www-w3-org-tr-xml) | Extensible Markup Language (XML) 1.0 (Fourth Edition) (http://www.w3.org/TR/xml) | 2006-09-29 | reference |
| [RD-7] | [catalogue](../references/index.md#ref-soap-version-1-2-part-1-messaging-framework-http-www-w3-org-tr-soap12-part1) | SOAP Version 1.2 Part 1: Messaging Framework (http://www.w3.org/TR/soap12-part1/) | 2003-06-24 | reference |
| [RD-8] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-9] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-10] | [EGOS-MCS-S2K-GLO-0001](../references/index.md#ref-egos-mcs-s2k-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms | Version 1.7 2007-03-20 | reference |
| [RD-11] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS), EGOS Data Dissemination System (EDDS) | Version 22.0 2021-05-31 | reference |
| [RD-12] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | Software Design Document (SDD), EGOS Data Dissemination System (EDDS) | Version 24.0 2025-01-10 | reference |
| [RD-13] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document (DDID) | Version 1.4 2008-04-11 | reference |
| [RD-14] | [EGOS-MCS-S2K-ICD-0017](../references/index.md#ref-egos-mcs-s2k-icd-0017) · [library](icd-0017-tdrs-5-1.md) | TDRS External Interfaces Control Document | Version 5.1 2008-08-22 | reference |
| [RD-15] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Version 24.0 2025-01-10 | reference |
| [RD-16] | [catalogue](../references/index.md#ref-google-protocol-buffers-https-developers-google-com-protocol-buffers) | Google Protocol Buffers (https://developers.google.com/protocol-buffers/) | 2012-09-17 | reference |
|  | [catalogue](../references/index.md#ref-scos-2000-command-history-operator-user-manual) | SCOS 2000 Command History Operator User Manual |  | mentioned |

!!! note "Notes"
    File-name vs content mismatch: published as 'EGOS-GEN-EDDS-EUICD.v25.pdf' (slug euicd-v25), but the title page, approval table and footers all say Version 24.0 of 2025-01-10, and the change log ends at 24.0. There is no issue 25.0 content. The approval table lists 'EDDS Team, COSMIC' as preparer. Editing damage: the document-overview list replaces several appendix names with clause numbers (for example 'C.97 – Provides a list ... common data types'), and the chapter 7 heading is merged into a stray sentence ('The output is a binary file of the continuous raw data as provided by RawBodyData attribute. Naming Conventions', PDF p. 83). One mapping cites 'C.469'. DCR dates (2023-08-26 before 2024-05-07) are out of order. The SCOS 2000 Command History Operator User Manual is still cited in section 6.6. Printed page numbers are PDF page minus 16. Latest issue of the same document as euicd-unversioned, euicd-v13 and euicd-i15r0.

