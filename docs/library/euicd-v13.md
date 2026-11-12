---
title: "EDDS External User ICD (issue 13.0)"
description: "Issue 13.0 (May 2017) of the EDDS External User Interface Control Document specifies the client-facing interfaces of the EGOS Data Dissemination System(../scos2000/edds.md) at release v2.2.0."
tags: ["Interface Control Document", "EDDS (EGOS Data Dissemination System)"]
sources: [euicd-v13]
---

# External User Interface Control Document (EUICD) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-ICD-1001</dd><dt>Issue / version</dt><dd>Version 13.0</dd><dt>Date</dt><dd>2017-05-05</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, M. Hawkshaw, R. Ots, K. Panitzek</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Version 13.0 'Issue for EDDS v.2.2.0i1' (Document Change Log, PDF p. 3). Superseded by issue 15.0 of 2018-02-16 (euicd-i15r0) and later issues up to 24.0 (euicd-v25).</dd><dt>Pages</dt><dd>273</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUICD%20v13.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUICD%20v13.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:56:04Z</dd><dt>SHA-256</dt><dd><code>102d8871d58ff7f1ed46f41dd4f4111dae58adff5beffb332ba731b962707171</code></dd><dt>Size</dt><dd>3.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/EUICD-v13.pdf">EUICD-v13.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 13.0 (May 2017) of the **EDDS External User Interface Control Document** specifies the client-facing interfaces of the [EGOS Data Dissemination System](../scos2000/edds.md) at release v2.2.0. It defines how external programs ask ESOC for [SCOS-2000](../scos2000/index.md) mission data and how the results are encoded. Its structure is the same as in the neighbouring issues: services and client applications (chapter 4), data types and request-to-response mapping (5), output formats (6), request and response naming (7), delivery (8), WSDL/SOAP web services (9), e-mail and file-server interfaces (10 and 11), the Java client API (12), and the XML schema appendices A to L, plus the TDRS spreadsheet (M) and Protocol Buffers (N).

The format chapter is the technical core for telemetry engineers. It defines the self-describing **EDDS binary** file: a header octet giving the number of optional fields, then one size octet per field, then each packet preceded by its chosen fields. The optional fields are 21 for TM (sequence counter, APID, PID, category, SCOS-2000 PI1/PI2 and data stream, CUC generation and reception times, SPID, ground station, virtual channel, PUS type/subtype, SLE service, time quality, database version, domain), more for TC and a few for SCOS-2000 events. The chapter also gives a GDDS-compatible hexadecimal example, the XML, XFDU, TDRS spreadsheet and ASCII formats (including the command-history-style TC report with its verification-stage columns), and length-prefixed Google Protocol Buffers records for parameters and reports.

Compared with issue 7.0 (2014), this issue adds the SCOS-2000 Data Provision Services as a packet source and as the route for live packet streaming (SCOS 5.4.21/5.5.4 or later), and requires the SLES 12 DARC (3.0.0) for parameter streaming. It also documents out-of-limit report packet versions 5 to 7. Issue 15.0 later adds the RawSourceBinary format.


## Key points

- The EUICD describes the common elements for all missions; mission-specific Data Definition Interface Documents (DDIDs) are expected to be derived from it. *(PDF p. 14)*
- Batch responses can be zip, tar (USTAR) or tar.gz compressed and optionally AES-encrypted at mission level. *(PDF p. 19)*
- Parameter streaming requires the SLES 12 DARC (version 3.0.0 or later); live TM, TC, event-log and OOL packet streaming is supported only via the Data Provision Services in SCOS 5.4.21 and 5.5.4 or later. *(PDF p. 20)*
- Raw packet requests return PARC data exactly as stored, as hexadecimal strings wrapped in XML tags, with only basic time and SPID filtering. *(PDF p. 29)*
- Out-of-limit reports support PARC packet versions 5, 6 and 7 (version 7 with change request GAIA-SPR-694 applied). *(PDF p. 30)*
- Supported formats: Binary, EDDS Binary, XML and XML Transform, SFDU (from the GDDS DDID) and ASCII; no RawSourceBinary yet. *(PDF p. 32)*
- EDDS Binary raw header: one octet with the number N of header fields, then N one-octet field sizes; the selected fields precede every data element. *(PDF p. 34)*
- TM data elements are the raw packet in network byte order preceded by a 1-byte EDDS sequence count (reset after 255) and a 4-byte length; 21 optional TM header fields are defined (Table 6). *(PDF p. 36)*
- A GDDS-format TM binary file is reproduced by selecting EDDS header fields 8, 10, 12, 13, 17 and 18. *(PDF p. 39)*
- ASCII TC report stage columns: R (release to NCTRS/NIS), G (ground reception), T (uplink), O (on-board reception), A (acceptance), SS (execution start), execution steps and CC (completion). *(PDF p. 45)*
- Protocol Buffers binary files carry an ASCII '# Key: Value;' header line (Type, Version) followed by varint length-prefixed serialized messages. *(PDF p. 46)*
- Request ID format: [RequestType].[Subtype].[Mission].[Domain].[yyyy.DDD.hh.mm.ss.SSS]; response files append @[time].[Counter].[Extension]. *(PDF p. 57)*
- EDDS web services are described in WSDL with SOAP bindings mapping directly to the XML schemas. *(PDF p. 59)*


## Cited by these wiki pages (4)

- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (68 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 14 |
    | 1.1 | Purpose | 14 |
    | 1.2 | Scope | 14 |
    | 1.3 | Document Overview | 14 |
    | 2 | References | 16 |
    | 2.1 | Applicable documents | 16 |
    | 2.2 | Reference documents | 16 |
    | 3 | Glossary | 17 |
    | 3.1 | Acronyms | 17 |
    | 3.2 | Definition of Terms | 18 |
    | 4 | Software Overview | 19 |
    | 4.1 | EDDS Services Overview | 19 |
    | 4.2 | EDDS Interface Overview | 22 |
    | 4.3 | Client Applications Overview | 22 |
    | 5 | Data Types | 29 |
    | 5.1 | Packet | 29 |
    | 5.2 | Parameter | 30 |
    | 5.3 | Report | 30 |
    | 5.4 | Archived Files | 31 |
    | 5.5 | Acknowledgement | 31 |
    | 5.6 | Request and Response Mappings | 31 |
    | 6 | Formats | 32 |
    | 6.1 | EDDS Binary | 34 |
    | 6.2 | XML | 42 |
    | 6.3 | XML Transform | 44 |
    | 6.4 | XFDU | 44 |
    | 6.5 | TDRS Spreadsheet | 44 |
    | 6.6 | ASCII | 44 |
    | 6.7 | Binary | 46 |
    | 7 | Naming Conventions | 57 |
    | 7.1 | Request ID Convention | 57 |
    | 7.2 | Response ID Convention | 57 |
    | 8 | Delivery | 58 |
    | 8.1 | Delivery Mechanism | 58 |
    | 9 | Web Services Description | 59 |
    | 9.1 | Web Service Introduction | 59 |
    | 9.2 | PortTypes | 59 |
    | 9.3 | Messages | 74 |
    | 9.4 | Bindings | 98 |
    | 10 | E-mail Interface | 106 |
    | 10.1 | Data Elements | 106 |
    | 10.2 | Message Description | 106 |
    | 10.3 | Communication Protocol | 106 |
    | 10.4 | Errors | 106 |
    | 11 | File Server Interface | 107 |
    | 11.1 | Data Elements | 107 |
    | 11.2 | Message Description | 107 |
    | 11.3 | Communication Protocol | 107 |
    | 11.4 | Errors | 107 |
    | 12 | Client API | 108 |
    | 12.1 | Edds Web Services Client API | 109 |
    | 12.2 | EDDS Push notifications client | 118 |
    | 12.3 | EDDS Utility methods | 119 |
    | 12.4 | Dependencies | 120 |
    | APPENDIX A | Acknowledgement Data Type | 121 |
    | APPENDIX B | Authentication Data Type | 126 |
    | APPENDIX C | Batch Request Data Type | 127 |
    | APPENDIX D | Common Data Types | 171 |
    | APPENDIX E | Delivery Data Type | 185 |
    | APPENDIX F | File System Data Types | 189 |
    | APPENDIX G | Filter Data Type | 196 |
    | APPENDIX H | Format Data Type | 219 |
    | APPENDIX I | Report Data Type | 227 |
    | APPENDIX J | Schedule Data Type | 244 |
    | APPENDIX K | User Management Data Type | 248 |
    | APPENDIX L | Stream Request Data Type | 268 |
    | APPENDIX M | EDDS Parameter Spreadsheet | 272 |
    | APPENDIX N | Google Protocol Buffers | 273 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [661.0-B.1](../references/index.md#ref-661-0-b-1) | CCSDS, XML Formatted Data Unit (XFDU) Structure and Construction Rules. | BLUE BOOK 661.0-B.1 Set 2008 | applicable |
| [AD-2] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document DDID Appendix F | Issue 1.4 2008-04-11 | applicable |
| [RD-1] | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | EDDS Client Software User Manual | Version 12.0 2017-05-05 | reference |
| [RD-2] | [RFC 2045](../references/index.md#ref-rfc-2045) | Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies | November 1996 | reference |
| [RD-3] | [catalogue](../references/index.md#ref-web-services-definition-language-wsdl-1-1-http-www-w3-org-tr-wsdl) | Web Services Definition Language (WSDL) 1.1 (http://www.w3.org/TR/wsdl) | 2001-03-15 | reference |
| [RD-4] | [no reference](../references/index.md#ref-no-reference) | MUST Architectural Design Document | Version 1.1 2006-01-13 | reference |
| [RD-5] | [catalogue](../references/index.md#ref-xsl-transforms-xslt-version-1-0-http-www-w3-org-tr-xslt) | XSL Transforms (XSLT) Version 1.0 (http://www.w3.org/TR/xslt) | 1999-11-16 | reference |
| [RD-6] | [catalogue](../references/index.md#ref-extensible-markup-language-xml-1-0-fourth-edition-http-www-w3-org-tr-xml) | Extensible Markup Language (XML) 1.0 (Fourth Edition) (http://www.w3.org/TR/xml) | 2006-09-29 | reference |
| [RD-7] | [catalogue](../references/index.md#ref-soap-version-1-2-part-1-messaging-framework-http-www-w3-org-tr-soap12-part1) | SOAP Version 1.2 Part 1: Messaging Framework (http://www.w3.org/TR/soap12-part1/) | 2003-06-24 | reference |
| [RD-8] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-9] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-10] | [EGOS-MCS-S2K-GLO-0001](../references/index.md#ref-egos-mcs-s2k-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms | Version 1.7 2007-03-20 | reference |
| [RD-11] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS), EGOS Data Dissemination System (EDDS) | Version 16.0 2017-05-05 | reference |
| [RD-12] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | Software Design Document (SDD), EGOS Data Dissemination System (EDDS) | Version 13.0 2017-05-05 | reference |
| [RD-13] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document (DDID) | Version 1.4 2008-04-11 | reference |
| [RD-14] | [EGOS-MCS-S2K-ICD-0017](../references/index.md#ref-egos-mcs-s2k-icd-0017) · [library](icd-0017-tdrs-5-1.md) | TDRS External Interfaces Control Document | Version 5.1 2008-08-22 | reference |
| [RD-15] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Version 12.0 2017-05-05 | reference |
| [RD-16] | [catalogue](../references/index.md#ref-google-protocol-buffers-https-developers-google-com-protocol-buffers) | Google Protocol Buffers (https://developers.google.com/protocol-buffers/) | 2012-09-17 | reference |
|  | [catalogue](../references/index.md#ref-scos-2000-command-history-operator-user-manual) | SCOS 2000 Command History Operator User Manual |  | mentioned |

!!! note "Notes"
    File published as 'EGOS-GEN-EDDS-EUICD v13.pdf'; content is Version 13.0 of 2017-05-05, consistent with the file name. The DCR (PDF p. 3) lists changes for edds#908, edds#924 and EDDS 2.2. The same typos as in later issues are present ('filted.xsd'; header line said to end with byte value 'A0'). Table 2 maps packet statistics responses to C.24 and PktTmReportResponse to I.24. The reference list cites the SRS at Version 16.0, the SDD at 13.0, the SUM at 12.0 and the CIG at 12.0. Printed page numbers are PDF page minus 13. Same document as euicd-unversioned (7.0), euicd-i15r0 (15.0) and euicd-v25 (24.0).

