---
title: "EDDS External User ICD (issue 15.0)"
description: "The EDDS External User Interface Control Document (EUICD) is the formal interface specification of the EGOS Data Dissemination System(../scos2000/edds.md)."
tags: ["Interface Control Document", "EDDS (EGOS Data Dissemination System)"]
sources: [euicd-i15r0]
---

# External User Interface Control Document (EUICD) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-ICD-1001</dd><dt>Issue / version</dt><dd>Version 15.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, M. Hawkshaw, R. Ots, K. Panitzek</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Version 15.0 'Issue for EDDS v2.3.0i1' (Document Change Log, PDF p. 3, which dates the issue 2018-01-15 while the title page says 2018-02-16). Superseded by later issues; the library holds issue 24.0 of 2025 (euicd-v25) and the earlier issues 7.0 (euicd-unversioned) and 13.0 (euicd-v13).</dd><dt>Pages</dt><dd>285</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/ESOC/EGOS-GEN-EDDS-ICD-1001_EUICD_i15r0_2.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/ESOC/EGOS-GEN-EDDS-ICD-1001_EUICD_i15r0_2.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:57:31Z</dd><dt>SHA-256</dt><dd><code>61f35427b3519ec93219806f05d3310c788b9981c47914487e16a2dd5cc2de03</code></dd><dt>Size</dt><dd>3.3 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/EUICD-i15r0.pdf">EUICD-i15r0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The **EDDS External User Interface Control Document (EUICD)** is the formal interface specification of the [EGOS Data Dissemination System](../scos2000/edds.md). It is the document a developer needs to write a client that requests [SCOS-2000](../scos2000/index.md) mission data from ESOC, or to parse what EDDS returns. Mission-specific Data Definition Interface Documents ([DDIDs](../scos2000/gdds-and-ddids.md)) are expected to be derived from it.

Chapters 4 to 8 describe the services (authentication, batch, stream and user management), the data types (TM, TC and event packets from the PARC, parameters from the DARC or SMON, MCS and EDDS reports, FARC files, file-system files, acknowledgements), the request-to-response mapping and every output **format**. These are the self-describing **EDDS binary** format, in which a header lists the size of each optional per-packet field, with 21 TM header fields (SSC, APID, PID, category, PI1/PI2, data stream, CUC generation and reception times, SPID, ground station, virtual channel, PUS type/subtype, time quality and more), 29 TC fields and 6 EV fields, illustrated with a GDDS-compatible hexadecimal example; XML with mission XSLT; XFDU packaging; the TDRS spreadsheet; ASCII (including a TC report modelled on the SCOS-2000 command history); length-prefixed Google Protocol Buffers; and RawSourceBinary, a bare stream of CCSDS source packets. Chapter 7 gives the request and response ID naming rules, and chapter 8 the delivery mechanisms.

Chapter 9 documents the SOAP/WSDL port types, messages and bindings, chapters 10 to 12 the e-mail, file-server and Java client API (with code examples and push notifications), and Appendices A to L the XML schema types of every request, filter, format, report, schedule and user-management element. Appendices M and N cover the TDRS-style spreadsheet and Protocol Buffers.


## Key points

- The EUICD defines the EDDS Web Services interface and the Stream Web Service interface; where an XML schema file exists, the schema is the primary source and the document is updated after it. *(PDF p. 14)*
- Mission-specific Data Definition Interface Documents (DDIDs) are expected to be created from the EUICD. *(PDF p. 14)*
- Batch responses can be zip, tar (USTAR) or tar.gz compressed, and optionally AES-encrypted at mission level; every request has acknowledgement data delivered by e-mail or as an XML document. *(PDF p. 19)*
- Stream responses are read from an ActiveMQ topic or via the client API over CometD, one Google Protocol Buffers-encoded packet or parameter per message; section 4.1.3 says only DARC parameter streaming is supported (DARC 3.0.0 or later), while section 4.1.3.2 adds live TM, TC, event-log and OOL streaming through the SCOS-2000 Data Provision Services (SCOS 5.4.21 and 5.5.4 or later). *(PDF p. 20)*
- TM/TC/EV 'Raw' requests return packets exactly as stored in the PARC, as hexadecimal strings wrapped in XML tags, filterable only by start/end time and (TM, EV) SPID list. *(PDF p. 30)*
- Out-of-limit reports support PARC packet versions 5 (SCOS 5.4.19/5.5.2 or earlier), 6 (SCOS 5.4.20/5.5.3 or later) and 7 (with change request GAIA-SPR-694). *(PDF p. 31)*
- Supported formats: Binary, EDDS Binary, XML (and XML Transform), SFDU (from the GDDS DDID), ASCII and RawSourceBinary. *(PDF p. 33)*
- EDDS Binary starts with a raw header: one octet N (number of header fields) followed by N one-octet sizes; each data element is then preceded by the selected header fields. *(PDF p. 35)*
- Up to 21 TM header fields are defined, including Source Sequence Counter, APID, PID and Category (derived from the APID), P1val/P2val, Data Stream, Generation and Reception Time (CCSDS CUC), SPID, Ground Station, Virtual Channel, PUS Type/Subtype, SleServiceID, Time Quality (0 GOOD, 1 INACCURATE, 2 BAD), Database Version and Domain. *(PDF p. 36)*
- Each TM data element is the raw spacecraft packet in network byte order preceded by a 1-byte EDDS sequence count (wrapping after 255) and a 4-byte data length. *(PDF p. 37)*
- TC header fields include PUS type/subtype, source type, APID, verification status, CUC uplink/execution/last-update/release times, sequence name, sub-schedule, command source, acknowledgement flags, verification stages, PUS source sequence count and on-board verification stages. *(PDF p. 38)*
- A GDDS-compatible TM binary file is reproduced by selecting EDDS header fields 8, 10, 12, 13, 17 and 18 (SCET, packet length, ground station, virtual channel, SLE service, time quality). *(PDF p. 40)*
- The ASCII TC report follows the SCOS-2000 Command History; stage columns are R (release to NCTRS/NIS), G (ground station reception), T (uplink), O (on-board reception, AD mode only), A (acceptance), SS (execution start), execution steps and CC (completion). *(PDF p. 47)*
- Protocol Buffers files start with an ASCII header line ('# Key: Value; ...') giving Type and Version, followed by serialized messages each prefixed with its size as a varint. *(PDF p. 47)*
- RawSourceBinary, available only for the TM Report request, is a continuous stream of CCSDS TM source packets without any additional header. *(PDF p. 58)*
- Request IDs take the form [RequestType].[Subtype].[Mission].[Domain].[yyyy.DDD.hh.mm.ss.SSS] (or [RequestType].[Username].[time] for account requests), and response files append @[time].[Counter].[Extension]. *(PDF p. 59)*
- The EDDS web services are WSDL-defined with SOAP bindings mapping directly onto the XML schemas, using one-way and request-response operations. *(PDF p. 61)*


## Cited by these wiki pages (4)

- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (69 headings)"

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
    | 5 | Data Types | 30 |
    | 5.1 | Packet | 30 |
    | 5.2 | Parameter | 31 |
    | 5.3 | Report | 31 |
    | 5.4 | Archived Files | 32 |
    | 5.5 | Acknowledgement | 32 |
    | 5.6 | Request and Response Mappings | 32 |
    | 6 | Formats | 33 |
    | 6.1 | EDDS Binary | 35 |
    | 6.2 | XML | 43 |
    | 6.3 | XML Transform | 45 |
    | 6.4 | XFDU | 45 |
    | 6.5 | TDRS Spreadsheet | 45 |
    | 6.6 | ASCII | 45 |
    | 6.7 | Binary | 47 |
    | 6.8 | RawSourceBinary | 58 |
    | 7 | Naming Conventions | 59 |
    | 7.1 | Request ID Convention | 59 |
    | 7.2 | Response ID Convention | 59 |
    | 8 | Delivery | 60 |
    | 8.1 | Delivery Mechanism | 60 |
    | 9 | Web Services Description | 61 |
    | 9.1 | Web Service Introduction | 61 |
    | 9.2 | PortTypes | 61 |
    | 9.3 | Messages | 78 |
    | 9.4 | Bindings | 103 |
    | 10 | E-mail Interface | 111 |
    | 10.1 | Data Elements | 111 |
    | 10.2 | Message Description | 111 |
    | 10.3 | Communication Protocol | 111 |
    | 10.4 | Errors | 111 |
    | 11 | File Server Interface | 112 |
    | 11.1 | Data Elements | 112 |
    | 11.2 | Message Description | 112 |
    | 11.3 | Communication Protocol | 112 |
    | 11.4 | Errors | 112 |
    | 12 | Client API | 113 |
    | 12.1 | Edds Web Services Client API | 114 |
    | 12.2 | EDDS Push notifications client | 123 |
    | 12.3 | EDDS Utility methods | 124 |
    | 12.4 | Dependencies | 125 |
    | APPENDIX A | Acknowledgement Data Type | 126 |
    | APPENDIX B | Authentication Data Type | 131 |
    | APPENDIX C | Batch Request Data Type | 132 |
    | APPENDIX D | Common Data Types | 180 |
    | APPENDIX E | Delivery Data Type | 196 |
    | APPENDIX F | File System Data Types | 200 |
    | APPENDIX G | Filter Data Type | 207 |
    | APPENDIX H | Format Data Type | 230 |
    | APPENDIX I | Report Data Type | 239 |
    | APPENDIX J | Schedule Data Type | 256 |
    | APPENDIX K | User Management Data Type | 260 |
    | APPENDIX L | Stream Request Data Type | 280 |
    | APPENDIX M | EDDS Parameter Spreadsheet | 284 |
    | APPENDIX N | Google Protocol Buffers | 285 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [661.0-B.1](../references/index.md#ref-661-0-b-1) | CCSDS, XML Formatted Data Unit (XFDU) Structure and Construction Rules. | BLUE BOOK 661.0-B.1 Set 2008 | applicable |
| [AD-2] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document DDID Appendix F | Issue 1.4 2008-04-11 | applicable |
| [RD-1] | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | EDDS Client Software User Manual | Version 14.0 2018-02-16 | reference |
| [RD-2] | [RFC 2045](../references/index.md#ref-rfc-2045) | Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies | November 1996 | reference |
| [RD-3] | [catalogue](../references/index.md#ref-web-services-definition-language-wsdl-1-1-http-www-w3-org-tr-wsdl) | Web Services Definition Language (WSDL) 1.1 (http://www.w3.org/TR/wsdl) | 2001-03-15 | reference |
| [RD-4] | [no reference](../references/index.md#ref-no-reference) | MUST Architectural Design Document | Version 1.1 2006-01-13 | reference |
| [RD-5] | [catalogue](../references/index.md#ref-xsl-transforms-xslt-version-1-0-http-www-w3-org-tr-xslt) | XSL Transforms (XSLT) Version 1.0 (http://www.w3.org/TR/xslt) | 1999-11-16 | reference |
| [RD-6] | [catalogue](../references/index.md#ref-extensible-markup-language-xml-1-0-fourth-edition-http-www-w3-org-tr-xml) | Extensible Markup Language (XML) 1.0 (Fourth Edition) (http://www.w3.org/TR/xml) | 2006-09-29 | reference |
| [RD-7] | [catalogue](../references/index.md#ref-soap-version-1-2-part-1-messaging-framework-http-www-w3-org-tr-soap12-part1) | SOAP Version 1.2 Part 1: Messaging Framework (http://www.w3.org/TR/soap12-part1/) | 2003-06-24 | reference |
| [RD-8] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-9] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-10] | [EGOS-MCS-S2K-GLO-0001](../references/index.md#ref-egos-mcs-s2k-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms | Version 1.7 2007-03-20 | reference |
| [RD-11] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS), EGOS Data Dissemination System (EDDS) | Version 18.0 2018-02-16 | reference |
| [RD-12] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | Software Design Document (SDD), EGOS Data Dissemination System (EDDS) | Version 13.0 2017-05-05 | reference |
| [RD-13] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document (DDID) | Version 1.4 2008-04-11 | reference |
| [RD-14] | [EGOS-MCS-S2K-ICD-0017](../references/index.md#ref-egos-mcs-s2k-icd-0017) · [library](icd-0017-tdrs-5-1.md) | TDRS External Interfaces Control Document | Version 5.1 2008-08-22 | reference |
| [RD-15] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Version 14.0 2018-02-16 | reference |
| [RD-16] | [catalogue](../references/index.md#ref-google-protocol-buffers-https-developers-google-com-protocol-buffers) | Google Protocol Buffers (https://developers.google.com/protocol-buffers/) | 2012-09-17 | reference |
|  | [catalogue](../references/index.md#ref-scos-2000-command-history-operator-user-manual) | SCOS 2000 Command History Operator User Manual |  | mentioned |

!!! note "Notes"
    File name 'EGOS-GEN-EDDS-ICD-1001_EUICD_i15r0_2.pdf' matches the content (Version 15.0). Date conflict: title page 2018-02-16 versus change log 2018-01-15. The purpose note says changes are reported back 'to the EUD document' (apparently meaning this EUICD). The appendix overview calls the filter schema 'filted.xsd'. The Protocol Buffers header line is said to end with a line feed of 'byte value A0 in HEX' (PDF p. 48), which is presumably a typo for 0x0A. Section 6.8 contains a stray item numbered '7.' inside the RawSourceBinary description. In table 2 (PDF p. 32) PacketStatisticsResponse is referenced as C.27 although it is C.30 in the appendix, and PktTmReportResponse as I.24 although it is I.26. Appendix headings F and L are run together with their titles in the extraction ('Appendix FFile System Data Types'). Printed page numbers are PDF page minus 13. Same document as euicd-unversioned (7.0), euicd-v13 (13.0) and euicd-v25 (24.0).

