---
title: "ESA PSS-07-101 Packet Utilisation Standard (ESA PUS, Issue 1, 1994)"
description: "The first Packet Utilisation Standard (PUS), ESA PSS-07-101 Issue 1 (May 1994), was prepared by ESA's Committee for Operations and EGSE Standards."
tags: ["Standard", "ECSS standards"]
sources: [esa-pss-07-101-issue1-may1994]
---

# Packet utilisation standard

<dl class="osi-meta"><dt>Document ID</dt><dd>ESA PSS-07-101</dd><dt>Issue / version</dt><dd>Issue 1</dd><dt>Date</dt><dd>May 1994</dd><dt>Organisation</dt><dd>European Space Agency (ESA), PSS-07 ground segment branch; prepared by the ESA Committee for Operations and EGSE Standards (COES), approved by the Inspector General, ESA, and published by ESA Publications Division, ESTEC, Noordwijk</dd><dt>Authors</dt><dd>ESA Committee for Operations and EGSE Standards (COES)</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Issue 1 of May 1994 is the only issue listed in the Document Change Record, as a new document (PDF p. 5). The text expects an Issue 2: chapter 20 defers the On-board Traffic Management Service to it (p. 178), and chapter 2 says the standard will be extended for on-board autonomy (p. 20). No Issue 2 is in the library. The ECSS successors are ECSS-E-70-41A (30 January 2003, library item ecss-e-70-41a-30jan2003-pus) and ECSS-E-ST-70-41C (15 April 2016). The latter notes that PUS version number 0 in the TC and TM packet headers 'was used by the ESA PUS (ESA PSS-07-101)' and version 1 by ECSS-E-70-41A (ecss-e-st-70-41c-15april2016, PDF pp. 439 and 442), and lists PSS-07-101 in its bibliography (p. 656). This scanned copy was downloaded from ecss.nl. Its cover carries an ESTEC Technical Information &amp; Documentation Centre stamp.</dd><dt>Pages</dt><dd>225</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2022/04/ESA-PSS-07-101_Issue1(May1994).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2022/04/ESA-PSS-07-101_Issue1(May1994).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:49Z</dd><dt>SHA-256</dt><dd><code>2f7e8b4f02694fb0f854ca86177899fd9918b782326fc1c28a5bea5ed79c43fb</code></dd><dt>Size</dt><dd>11.8 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ESA-PSS-07-101_Issue1-May1994-.pdf">ESA-PSS-07-101_Issue1-May1994-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The first **Packet Utilisation Standard (PUS)**, ESA PSS-07-101 Issue 1 (May 1994), was prepared by ESA's Committee for Operations and EGSE Standards. It defines the application-level interface between ground and spacecraft, on top of the [PSS-04-106](esa-pss-04-106-issue1-january1988.md) packet telemetry and [PSS-04-107](esa-pss-04-107-issue2-april1992.md) packet telecommand standards. It is the ancestor of the ECSS [PUS](../ecss/pus/index.md) (see [PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md)). The library copy is a scanned PDF and its text comes from OCR.

Chapter 3 lists numbered operational requirements, from telecommanding and verification to testability. Each mission is meant to treat the standard as a 'shopping list', de-select what it does not need, and record the result in a ground/space ICD. Chapter 4 fixes the [packet structures](../ecss/pus/packets.md). Every TC packet carries a 24-bit data field header (PUS version, checksum type, 4-bit Ack, service type and subtype) and a packet error control field. TM source packets use packet version 2 and a header with PUS version, checksum type, a spare field, type, subtype and optional CUC or CDS time. The TC sequence count may be split into a source ID and a per-source count.

Chapters 5 to 21 specify 17 service types: verification, device commanding (including CPDU packets), housekeeping and diagnostic reporting, parameter statistics, events, memory, task and function management, time management and reporting, scheduling with sub-schedules and interlocks, monitoring, large data transfer, packet transmission control, storage and retrieval, traffic management (left to Issue 2) and test. Chapter 22 summarises the requests and reports, and chapter 23 defines the [parameter types](../ecss/pus/parameter-types.md) (PTC/PFC). The appendices give examples, the CRC and ISO checksum algorithms, and the mission parameters.


## Key points

- The PUS complements the ESA packet telemetry and telecommand standards (PSS-04-106 and PSS-04-107), which cover end-to-end transport, by defining the application-level interface between ground and space for electrical integration and testing and for flight operations. *(PDF p. 4)*
- The PUS sits under the Mission Data Utilisation Standards (PSS-07-10) in the PSS-07 ground segment tree. Its siblings are the Orbit & Navigation (PSS-07-102), Station M&C (PSS-07-103) and Time (PSS-07-104) Data Utilisation Standards. *(PDF p. 17)*
- The standard does not define protocols between on-board application processes or the content of payload/science packets, but science packets must conform and must have a data field header. Audio and video, which are multiplexed at frame level, are out of scope. *(PDF p. 17)*
- The PUS is a 'shopping list'. Missions should de-select requirements and services rather than pick them, record the result in a mission ground/space ICD, and always implement at least the minimum capability set of each service they use. *(PDF p. 18)*
- The three factors that drive telemetry and telecommand demands are on-board complexity, on-board autonomy and data transmission capacity. Autonomy support is deliberately basic in this issue. *(PDF p. 19)*
- The operational requirements in chapter 3 carry identifiers such as OBSCH-1. Mission-dependent values appear as named mission parameters in angle brackets (for example &lt;TIME_CORREL_ACCUR&gt;), often with typical values, and Appendix B lists them. *(PDF p. 23)*
- A service is defined by its requests and reports, a minimum capability set and optional additional capability sets. The service provider is an on-board application process, the service user is the ground system, and reports are either responses (to a request) or indications. *(PDF p. 51)*
- TC packets use packet version 0, type 1 and an 11-bit destination APID. The data field header and packet error control are mandatory, except that CPDU packets have no data field header. *(PDF p. 54)*
- TC sequence flags are set to 11 (stand-alone packet) for all ESA missions. The 14-bit sequence count is split into &lt;NUM_SOURCE_BITS&gt; of source ID (for example, the control centre) and a sequence count kept by each source for each APID. Acknowledgement packets must include the packet sequence control field to identify the telecommand they acknowledge. *(PDF p. 55)*
- The 24-bit TC data field header holds a 3-bit PUS version (0), a 1-bit checksum type (0 = ISO 16-bit checksum, 1 = CRC), a 4-bit Ack field, an 8-bit service type and an 8-bit subtype. *(PDF p. 56)*
- The four Ack bits request success reports for acceptance, start of execution, progress and completion of execution. Failure reports are always generated, and reports go only to the source of the telecommand. *(PDF p. 57)*
- Service types and subtypes 0 to 127 are reserved for the standard; 128 to 255 are mission-specific. *(PDF p. 57)*
- TM source packets use packet version 2 (field value 4) and type 0. A data field header is mandatory except in the spacecraft time packet. APID 0 is reserved for the time packet and APID all ones for idle packets, segmentation flags are always 11, and the 14-bit count wraps without short-cycling. *(PDF p. 58)*
- The TM data field header holds a 3-bit PUS version (0), a 1-bit checksum type, 4 spare bits, the service type and subtype, and an optional (mission-defined) CUC or CDS time field. The CDS format uses the CCSDS epoch of 1 January 1958. *(PDF p. 59)*
- Table 4-1 numbers 17 standard services: 1 telecommand verification, 2 device-level commanding, 3 housekeeping & diagnostic data reporting, 4 parameter statistics, 5 events, 6 memory management, 7 task management, 8 function management, 9 time management, 10 time reporting, 11 onboard scheduling, 12 onboard monitoring, 13 large data transfer, 14 packet transmission control, 15 onboard storage and retrieval, 16 onboard traffic management and 17 test. *(PDF p. 61)*
- Telecommand verification: subtypes 1 and 2 (acceptance success and failure) form the minimum set. Subtypes 3 to 8 report start, progress and completion of execution, each as a success/failure pair. *(PDF p. 65)*
- Device command distribution covers on/off and register-load commands in TC packets, CPDU packets (no data field header, up to 256 output lines) and device commands carried directly in a TC segment for non-nominal cases. *(PDF p. 67)*
- In housekeeping and diagnostic reporting, the parameter reports are subtypes 25 (housekeeping) and 26 (diagnostic). *(PDF p. 80)*
- Event reporting has four subtypes: 1 normal/progress report and 2 to 4 error/anomaly reports of low, medium and high severity. Each report carries a report ID that, with the APID, defines its parameters. *(PDF p. 90)*
- The time reporting service (type 10) is provided by a single application process. It emits Time Report (10,1) without a data field header, sampling the clock at the first sync-marker bit of selected virtual channel 0 frames as defined in PSS-04-106. *(PDF p. 110)*
- The on-board schedule supports &lt;NUM_SUB_SCHEDS&gt; sub-schedules (typically five to ten) and command interlocks, so a command's release can depend on the success or failure of an earlier command in the same sub-schedule. *(PDF p. 39)*
- Chapter 20 (On-board Traffic Management Service) contains only a scope statement; the specification is deferred to Issue 2 of the standard. *(PDF p. 178)*
- The test service (type 17) defines only the connection test: request (17,1), with the report as subtype 2. *(PDF p. 179)*
- Parameter types are a subset of ISO 8824 (ASN.1). The standard uses its own compact encodings rather than the ISO 8825 basic encoding rules because of space-link bandwidth constraints. *(PDF p. 186)*
- A parameter code is a PTC (type code) plus a PFC (format code). PTC 1 is Boolean, 2 enumerated, 3 unsigned integer, 4 signed integer, 5 real, 6 bit string, 7 octet string, 8 character string, 9 absolute time, 10 relative time and 11 deduced. *(PDF p. 189)*
- Appendix A specifies the CRC (A.2) and the ISO 16-bit checksum (A.3) used in the packet error control field, and gives an example of a 24-bit OBDH command in service type 2 (A.4). *(PDF p. 207)*


## Cited by these wiki pages (8)

- [ECSS: the European space standards system](../ecss/index.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Methodology](../about/methodology.md)
- [PUS parameter types (PTC/PFC)](../ecss/pus/parameter-types.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (70 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 4 |
    |  | Document Change Record | 5 |
    |  | Contents | 6 |
    |  | List of Figures | 10 |
    |  | List of Tables | 11 |
    |  | Applicable Documents | 13 |
    |  | Reference Documents | 14 |
    | 1 | Introduction | 16 |
    | 1.1 | Purpose | 16 |
    | 1.2 | Scope | 17 |
    | 1.3 | Structure of the Standard | 18 |
    | 1.4 | Applicability | 18 |
    | 2 | Context of the PUS | 19 |
    | 3 | Operational Requirements | 22 |
    | 3.1 | Introduction | 22 |
    | 3.2 | Telecommanding | 24 |
    | 3.3 | Telecommand Transmission and Distribution | 27 |
    | 3.4 | Telecommand Verification | 27 |
    | 3.5 | Satellite Status Reporting | 31 |
    | 3.6 | Telemetry Timing | 36 |
    | 3.7 | Memory Management | 37 |
    | 3.8 | Software Management | 38 |
    | 3.9 | On-board Scheduling | 39 |
    | 3.10 | On-board Monitoring | 42 |
    | 3.11 | Large Data Transfer | 44 |
    | 3.12 | Telemetry Generation and Transmission Control | 45 |
    | 3.13 | On-board Storage and Retrieval | 46 |
    | 3.14 | On-board Traffic Management | 48 |
    | 3.15 | Packet Routing | 48 |
    | 3.16 | Testability | 49 |
    | 4 | Service Specification | 50 |
    | 4.1 | Introduction | 50 |
    | 4.2 | Definitions | 51 |
    | 4.3 | Conventions | 52 |
    | 4.4 | Telecommand Packet Structure | 54 |
    | 4.5 | Telemetry Source Packet Structure | 58 |
    | 4.6 | Standard Services | 61 |
    | 5 | Telecommand Verification Service | 62 |
    | 6 | Device Command Distribution Service | 66 |
    | 7 | Housekeeping and Diagnostic Data Reporting Service | 71 |
    | 8 | Parameter Statistics Reporting Service | 83 |
    | 9 | Event Reporting Service | 89 |
    | 10 | Memory Management Service | 91 |
    | 11 | Task Management Service | 99 |
    | 12 | Function Management Service | 104 |
    | 13 | Time Management Service | 108 |
    | 14 | Time Reporting Service | 110 |
    | 15 | Onboard Scheduling Service | 112 |
    | 16 | Onboard Monitoring Service | 131 |
    | 17 | Large Data Transfer Service | 147 |
    | 18 | Packet Transmission Control Service | 158 |
    | 19 | Onboard Storage and Retrieval Service | 166 |
    | 20 | Onboard Traffic Management Service | 178 |
    | 21 | Test Service | 179 |
    | 22 | Summary of Service Requests and Reports | 181 |
    | 23 | Parameter Types and Structure Rules | 186 |
    | 23.1 | Introduction | 186 |
    | 23.2 | Conventions | 186 |
    | 23.3 | Encoding Formats of Parameter Types | 187 |
    | 23.4 | Tailoring of Packet Structures for a Mission | 187 |
    | 23.5 | Simple Parameter Types | 189 |
    | 23.6 | Structured Field Types | 196 |
    | Appendix A | Examples | 203 |
    | A.1 | Examples/Explanations for Operational Requirements | 203 |
    | A.2 | Specification of the Cyclic Redundancy Code (CRC) | 207 |
    | A.3 | Specification of the ISO Checksum | 213 |
    | A.4 | Use of Service Type 2, Device Command Distribution | 216 |
    | Appendix B | Mission Parameters | 217 |
    | Appendix C | Glossary of Terms | 220 |
    | Appendix D | Glossary of Abbreviations | 224 |


## Documents this one references (27)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD1] | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | Packet telemetry standard | Issue 1 January 1988 | applicable |
| [AD2] | [ESA PSS-04-103](../references/index.md#ref-esa-pss-04-103) | Telemetry channel coding standard | Issue 1 September 1989 | applicable |
| [AD3] | [ESA PSS-04-107](../references/index.md#ref-esa-pss-04-107) · [library](esa-pss-04-107-issue2-april1992.md) | Packet telecommand standard | Issue 2 April 1992 | applicable |
| [AD4] | [ESA PSS-04-202](../references/index.md#ref-esa-pss-04-202) | Time code formats and procedures standard (not available before mid 1995; [AD1] and [RD2] cover the topic until then) |  | applicable |
| [AD5] | [ESA PSS-04-105](../references/index.md#ref-esa-pss-04-105) | Radio frequency and modulation standard | Issue 1 December 1989 | applicable |
| [AD6] | [ESA PSS-01-40](../references/index.md#ref-esa-pss-01-40) | System safety requirements for ESA space systems and associated equipment | Issue 2 September 1988 | applicable |
| [AD7] | [ESA PSS-04 151](../references/index.md#ref-esa-pss-04-151) · [library](esa-pss-04-151-issue1-september1992.md) | Telecommand decoder specification | Issue 1 September 1993 | applicable |
| [RD1] | [CCSDS 203.0-B-1](../references/index.md#ref-ccsds-203-0-b-1) | Telecommand: Part 3, Data Management Service | Blue Book January 1987 | reference |
| [RD2] | [CCSDS 301.0-B-1](../references/index.md#ref-ccsds-301-0-b-1) | Time Code Format | Blue Book January 1987 | reference |
| [RD3] | [ESA PSS-07-10](../references/index.md#ref-esa-pss-07-10) | Mission Data Utilisation Standards | Draft 4 May 1992 | reference |
| [RD4] | [ESA PSS-07-501](../references/index.md#ref-esa-pss-07-501) | Space Segment Operability Requirements | to be issued | reference |
| [RD5] | [ESA PSS-07-201](../references/index.md#ref-esa-pss-07-201) | Packet Data Description standard | to be issued | reference |
| [RD6] | [NASA NSTS 1700.7B](../references/index.md#ref-nasa-nsts-1700-7b) | Safety Policy and Requirements for Payloads using STS | Basic Issue January 1989 | reference |
| [RD7] | [catalogue](../references/index.md#ref-j-g-fletcher-an-arithmetic-checksum-for-serial-transmission-ieee-transactions-on) | J.G. Fletcher, An Arithmetic Checksum for Serial Transmission, IEEE Transactions on Communication, COM-30(1) | January 1982 | reference |
| [RD8] | [ISO/IEC 8473-1](../references/index.md#ref-iso-iec-8473-1) | Information Technology - Protocol for Providing the Connectionless-mode Network Service | Second Edition 1994 | reference |
| PSS-07-0 | [ESA PSS-07-0](../references/index.md#ref-esa-pss-07-0) | Ground Segment Infrastructure (root of the PSS-07 documentation tree) |  | mentioned |
| PSS-07-20 | [ESA PSS-07-20](../references/index.md#ref-esa-pss-07-20) | Mission Data Description (PSS-07 documentation tree) |  | mentioned |
| PSS-07-30 | [ESA PSS-07-30](../references/index.md#ref-esa-pss-07-30) | Mission Data Exchange (PSS-07 documentation tree) |  | mentioned |
| PSS-07-40 | [ESA PSS-07-40](../references/index.md#ref-esa-pss-07-40) | Ground System Functions (PSS-07 documentation tree) |  | mentioned |
| PSS-07-50 | [ESA PSS-07-50](../references/index.md#ref-esa-pss-07-50) | Missions Operations Requirements (PSS-07 documentation tree) |  | mentioned |
| PSS-07-60 | [ESA PSS-07-60](../references/index.md#ref-esa-pss-07-60) | Man/Computer Interaction (PSS-07 documentation tree) |  | mentioned |
| PSS-07-70 | [ESA PSS-07-70](../references/index.md#ref-esa-pss-07-70) | Ground System Testing & Validation (PSS-07 documentation tree) |  | mentioned |
| PSS-07-102 | [ESA PSS-07-102](../references/index.md#ref-esa-pss-07-102) | Orbit & Navigation Data Utilisation Standard (PSS-07-10 documentation tree) |  | mentioned |
| PSS-07-103 | [ESA PSS-07-103](../references/index.md#ref-esa-pss-07-103) | Station M&C Data Utilisation Standard (PSS-07-10 documentation tree) |  | mentioned |
| PSS-07-104 | [ESA PSS-07-104](../references/index.md#ref-esa-pss-07-104) | Time Data Utilisation Standard (PSS-07-10 documentation tree) |  | mentioned |
| ISO 8824 | [ISO 8824](../references/index.md#ref-iso-8824) | Specification of Abstract Syntax Notation One (ASN.1) |  | mentioned |
| ISO 8825 | [ISO 8825](../references/index.md#ref-iso-8825) | Specification of Basic Encoding Rules for Abstract Syntax Notation One (ASN.1) |  | mentioned |

!!! note "Notes"
    This is a scanned PDF. Its text was produced by OCR (RapidOCR) and has merged words, dropped lines and partly scrambled tables (the service data unit tables and the chapter 22 summary table), so every number, field size and bit pattern in this entry was checked against rendered page images. Page numbering: printed page n is PDF page n + 15 in the body (printed page 1 is PDF p. 16). PDF p. 1 is the coloured cover with a stamp; p. 2 is the inner title page. Oddities: the contents page lists the Applicable Documents at page ix and the Reference Documents at page x, but they are printed on pages xii and xiii (PDF pp. 13-14). Service type 2 is called 'Device-Level Commanding Service' in Table 4-1 (p. 61) but 'Device Command Distribution Service' in the contents and in chapter 6. The contents spell chapter titles 'On-board ...', while the body headings use 'Onboard ...'. Applicable document [AD7] is printed 'ESA PSS-04 151' (missing hyphen) and dated September 1993, although the PSS-04-151 title page says September 1992. The TM packet version is described as 'Version 2 (value = 4)', i.e. bits 100, matching PSS-04-106, while the TC packet uses version 0. The OCR of Table 4-1 misreads service 6 as '9'; the scan shows the services numbered 1 to 17 in order.

