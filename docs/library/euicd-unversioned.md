---
title: "EDDS External User ICD (issue 7.0)"
description: "This is issue 7.0 (December 2014) of the EDDS External User Interface Control Document, the interface specification of the EGOS Data Dissemination System(../scos2000/edds.md) at release v1.5.0, publis"
tags: ["Interface Control Document", "EDDS (EGOS Data Dissemination System)"]
sources: [euicd-unversioned]
---

# External User Interface Control Document (EUICD) — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-ICD-1001</dd><dt>Issue / version</dt><dd>Version 7.0</dd><dt>Date</dt><dd>2014-12-17</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Human Spaceflight and Operations, HSO-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Michael Hawkshaw, Miriam Saltzer, Rui Santos, M. Hawkshaw, R. Ots, L. Kimmel, D. Sarjas</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Version 7.0 'Issue for EDDS v1.5.0i1' (Document Change Log, PDF p. 3). The oldest EUICD issue in the library; superseded by issues 13.0 (euicd-v13), 15.0 (euicd-i15r0) and 24.0 (euicd-v25).</dd><dt>Pages</dt><dd>267</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUICD.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUICD.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:19:57Z</dd><dt>SHA-256</dt><dd><code>0deda851e43b12ab21a15ca47d781816b7d6f1ec0d47fd2099a1d2bc22359421</code></dd><dt>Size</dt><dd>3.3 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/EUICD-unversioned.pdf">EUICD-unversioned.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

This is issue 7.0 (December 2014) of the **EDDS External User Interface Control Document**, the interface specification of the [EGOS Data Dissemination System](../scos2000/edds.md) at release v1.5.0, published when ESOC's ground-segment group still belonged to the Directorate of Human Spaceflight and Operations. It defines the authentication, batch, stream and user-management services through which external users and programs obtain [SCOS-2000](../scos2000/index.md) mission data, and the XML schemas, file formats and web-service operations involved.

The content and chapter structure match the later issues. Services and client applications come first, then data types (PARC TM, TC and event packets, DARC and SMON parameters, MCS and EDDS reports, FARC files, file-system data, acknowledgements) with the request-to-response mapping. The output formats follow: the self-describing EDDS binary with its 21 optional TM header fields and the TC and event fields, a GDDS-compatible example, XML/XSLT, XFDU, the TDRS spreadsheet, ASCII including the command-history-style TC report, and Google Protocol Buffers. The rest covers naming conventions, delivery, WSDL/SOAP port types, messages and bindings, the e-mail and file-server interfaces, the Java client API, and schema appendices A to N.

It is useful mainly as a historical baseline. In this issue packets come only from the PARC Manager interface (the SCOS-2000 Data Provision Services appear only from issue 13.0), live streaming is limited to DARC parameters with the SLES 11 DARC 2.1.1 or later, there is no RawSourceBinary format, and out-of-limit report packet versions are not yet listed. Comparing it with issues 13.0, 15.0 and 24.0 shows how the EDDS interface grew between 2014 and 2025.


## Key points

- Mission-specific Data Definition Interface Documents (DDIDs) are expected to be created from the EUICD, which covers only elements common to all missions. *(PDF p. 13)*
- Batch responses can be zip, tar (USTAR) or tar.gz compressed and optionally AES-encrypted at mission level. *(PDF p. 18)*
- Only streaming of DARC parameters is supported; it requires the SLES 11 DARC version 2.1.1 or later, which publishes samples on an ActiveMQ topic with headers such as ValueType, Value, Validity (0 Valid, 1 Invalid, 2 Unknown, 3 Expired), GenerationTime and Name. *(PDF p. 19)*
- Packets are extracted only through the PARC Manager interface of the packet archive; raw requests return the PARC hexadecimal packet strings wrapped in XML. *(PDF p. 27)*
- Supported formats: Binary, EDDS Binary, XML and XML Transform, SFDU (from the GDDS DDID) and ASCII. *(PDF p. 30)*
- EDDS Binary files start with an EDDS Raw Header (field count N followed by N one-octet sizes), and each data element is preceded by the selected header fields. *(PDF p. 32)*
- 21 optional TM header fields are defined (Table 6) and each TM data element carries a 1-byte EDDS sequence count reset after 255. *(PDF p. 34)*
- A worked example shows a GDDS TM packet binary file expressed with EDDS header fields (SCET, packet length, ground station, virtual channel, SLE service, time quality). *(PDF p. 37)*
- ASCII TC report stage columns follow the SCOS-2000 Command History: R (release to NCTRS/NIS), G, T, O, A, SS, execution steps and CC. *(PDF p. 43)*
- Protocol Buffers binary files begin with an ASCII header line starting with '# ' and listing Type and Version. *(PDF p. 44)*
- Request ID format: [RequestType].[Subtype].[Mission].[Domain].[yyyy.DDD.hh.mm.ss.SSS], with response files suffixed @[time].[Counter].[Extension]. *(PDF p. 54)*
- Web services are defined in WSDL with SOAP bindings onto the XML schemas. *(PDF p. 56)*


## Cited by these wiki pages (3)

- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (68 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 13 |
    | 1.1 | Purpose | 13 |
    | 1.2 | Scope | 13 |
    | 1.3 | Document Overview | 13 |
    | 2 | References | 15 |
    | 2.1 | Applicable documents | 15 |
    | 2.2 | Reference documents | 15 |
    | 3 | Glossary | 16 |
    | 3.1 | Acronyms | 16 |
    | 3.2 | Definition of Terms | 17 |
    | 4 | Software Overview | 18 |
    | 4.1 | EDDS Services Overview | 18 |
    | 4.2 | EDDS Interface Overview | 19 |
    | 4.3 | Client Applications Overview | 20 |
    | 5 | Data Types | 27 |
    | 5.1 | Packet | 27 |
    | 5.2 | Parameter | 28 |
    | 5.3 | Report | 28 |
    | 5.4 | Archived Files | 28 |
    | 5.5 | Acknowledgement | 29 |
    | 5.6 | Request and Response Mappings | 29 |
    | 6 | Formats | 30 |
    | 6.1 | EDDS Binary | 32 |
    | 6.2 | XML | 40 |
    | 6.3 | XML Transform | 42 |
    | 6.4 | XFDU | 42 |
    | 6.5 | TDRS Spreadsheet | 42 |
    | 6.6 | ASCII | 42 |
    | 6.7 | Binary | 44 |
    | 7 | Naming Conventions | 54 |
    | 7.1 | Request ID Convention | 54 |
    | 7.2 | Response ID Convention | 54 |
    | 8 | Delivery | 55 |
    | 8.1 | Delivery Mechanism | 55 |
    | 9 | Web Services Description | 56 |
    | 9.1 | Web Service Introduction | 56 |
    | 9.2 | PortTypes | 56 |
    | 9.3 | Messages | 70 |
    | 9.4 | Bindings | 92 |
    | 10 | E-mail Interface | 99 |
    | 10.1 | Data Elements | 99 |
    | 10.2 | Message Description | 99 |
    | 10.3 | Communication Protocol | 99 |
    | 10.4 | Errors | 99 |
    | 11 | File Server Interface | 100 |
    | 11.1 | Data Elements | 100 |
    | 11.2 | Message Description | 100 |
    | 11.3 | Communication Protocol | 100 |
    | 11.4 | Errors | 100 |
    | 12 | Client API | 101 |
    | 12.1 | Edds Web Services Client API | 102 |
    | 12.2 | EDDS Push notifications client | 111 |
    | 12.3 | EDDS Utility methods | 112 |
    | 12.4 | Dependencies | 112 |
    | APPENDIX A | Acknowledgement Data Type | 114 |
    | APPENDIX B | Authentication Data Type | 119 |
    | APPENDIX C | Batch Request Data Type | 120 |
    | APPENDIX D | Common Data Types | 162 |
    | APPENDIX E | Delivery Data Type | 175 |
    | APPENDIX F | File System Data Types | 179 |
    | APPENDIX G | Filter Data Type | 186 |
    | APPENDIX H | Format Data Type | 213 |
    | APPENDIX I | Report Data Type | 221 |
    | APPENDIX J | Schedule Data Type | 237 |
    | APPENDIX K | User Management Data Type | 241 |
    | APPENDIX L | Stream Request Data Type | 261 |
    | APPENDIX M | EDDS Parameter Spreadsheet | 266 |
    | APPENDIX N | Google Protocol Buffers | 267 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [661.0-B.1](../references/index.md#ref-661-0-b-1) | CCSDS, XML Formatted Data Unit (XFDU) Structure and Construction Rules. | BLUE BOOK 661.0-B.1 Set 2008 | applicable |
| [AD-2] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document DDID Appendix F | Issue 1.4 2008-04-11 | applicable |
| [RD-1] | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | EDDS Client Software User Manual | Version 6.0 2014-12-17 | reference |
| [RD-2] | [RFC 2045](../references/index.md#ref-rfc-2045) | Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies | November 1996 | reference |
| [RD-3] | [catalogue](../references/index.md#ref-web-services-definition-language-wsdl-1-1-http-www-w3-org-tr-wsdl) | Web Services Definition Language (WSDL) 1.1 (http://www.w3.org/TR/wsdl) | 2001-03-15 | reference |
| [RD-4] | [no reference](../references/index.md#ref-no-reference) | MUST Architectural Design Document | Version 1.1 2006-01-13 | reference |
| [RD-5] | [catalogue](../references/index.md#ref-xsl-transforms-xslt-version-1-0-http-www-w3-org-tr-xslt) | XSL Transforms (XSLT) Version 1.0 (http://www.w3.org/TR/xslt) | 1999-11-16 | reference |
| [RD-6] | [catalogue](../references/index.md#ref-extensible-markup-language-xml-1-0-fourth-edition-http-www-w3-org-tr-xml) | Extensible Markup Language (XML) 1.0 (Fourth Edition) (http://www.w3.org/TR/xml) | 2006-09-29 | reference |
| [RD-7] | [catalogue](../references/index.md#ref-soap-version-1-2-part-1-messaging-framework-http-www-w3-org-tr-soap12-part1) | SOAP Version 1.2 Part 1: Messaging Framework (http://www.w3.org/TR/soap12-part1/) | 2003-06-24 | reference |
| [RD-8] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-9] | [catalogue](../references/index.md#ref-deleted) | Deleted | Deleted | reference |
| [RD-10] | [EGOS-MCS-S2K-GLO-0001](../references/index.md#ref-egos-mcs-s2k-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms | Version 1.7 2007-03-20 | reference |
| [RD-11] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | Software Requirements Specification (SRS), EGOS Data Dissemination System (EDDS) | Version 10.0 2014-12-17 | reference |
| [RD-12] | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | Software Design Document (SDD), EGOS Data Dissemination System (EDDS) | Version 7.0 2014-12-17 | reference |
| [RD-13] | [EGOS-MCS-GDDS-1003](../references/index.md#ref-egos-mcs-gdds-1003) | Generic Data Disposition System (GDDS) Generic Data Delivery Interface Document (DDID) | Version 1.4 2008-04-11 | reference |
| [RD-14] | [EGOS-MCS-S2K-ICD-0017](../references/index.md#ref-egos-mcs-s2k-icd-0017) · [library](icd-0017-tdrs-5-1.md) | TDRS External Interfaces Control Document | Version 5.1 2008-08-22 | reference |
| [RD-15] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Version 6.0 2014-12-17 | reference |
| [RD-16] | [catalogue](../references/index.md#ref-google-protocol-buffers-https-developers-google-com-protocol-buffers) | Google Protocol Buffers (https://developers.google.com/protocol-buffers/) | 2012-09-17 | reference |
|  | [catalogue](../references/index.md#ref-scos-2000-command-history-operator-user-manual) | SCOS 2000 Command History Operator User Manual |  | mentioned |

!!! note "Notes"
    File-name vs content: published as 'EGOS-GEN-EDDS-EUICD.pdf' with no version (slug euicd-unversioned); the content is Version 7.0 of 2014-12-17 for EDDS v1.5.0i1. The approval table names the preparer as 'EDDS Team' (with a digital signature by Michael Hawkshaw), verification by Miriam Saltzer and approval by Rui Santos. The Document Change Record is an empty template (DCR No 00). The appendix overview on PDF p. 14 does not mention Appendix F, although Appendix F (File System Data Types) exists on PDF p. 179. Table 2 maps packet statistics responses to C.23 and PktTmReportResponse to I.24. The reference list cites the SRS at Version 10.0, the SDD at 7.0, and the SUM and CIG at 6.0. Typos shared with later issues: 'filted.xsd' and line feed 'byte value A0'. Printed page numbers are PDF page minus 12. Same document as euicd-v13, euicd-i15r0 and euicd-v25.

