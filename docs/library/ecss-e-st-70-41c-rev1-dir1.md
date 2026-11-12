---
title: "ECSS-E-ST-70-41C Rev.1 DIR1 (PUS public review draft)"
description: "The public-review draft (DIR1, 11 December 2024) of revision 1 of ECSS-E-ST-70-41C, the ECSS Packet Utilization Standard (PUS)."
tags: ["Standard", "Tools, MIB editors and related standards"]
sources: [ecss-e-st-70-41c-rev1-dir1]
---

# Space engineering - Telemetry and telecommand packet utilization

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70-41C Rev.1 DIR1</dd><dt>Issue / version</dt><dd>Rev.1 DIR1 (Draft for Public Review)</dd><dt>Date</dt><dd>2024-12-11</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section</dd><dt>Authors</dt><dd>ECSS-E-ST-70-41C Rev.1 Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Draft: distributed for ECSS Public Review from 12 December 2024 to 28 February 2025; the disclaimer states it is an ECSS Draft Standard that may not be referred to as an ECSS Standard until published (PDF p. 1). The change log lists the DFR of 30 September 2024 and publication as a next step (PDF p. 3). The published standard remains ECSS-E-ST-70-41C (15 April 2016), library item ecss-e-st-70-41c-15april2016.</dd><dt>Pages</dt><dd>733</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2024/12/ECSS-E-ST-70-41C-Rev.1-DIR1(11December2024).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2024/12/ECSS-E-ST-70-41C-Rev.1-DIR1(11December2024).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:37Z</dd><dt>SHA-256</dt><dd><code>88e74086cc7919623372cd8bd3cb1762991951ddc59403d5e782d67a72770a86</code></dd><dt>Size</dt><dd>7.3 MB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/ecss-e-st-70-41c-rev1-dir1.pdf">ecss-e-st-70-41c-rev1-dir1.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The public-review draft (DIR1, 11 December 2024) of revision 1 of ECSS-E-ST-70-41C, the ECSS Packet Utilization Standard (PUS). It defines the application-level interface between ground and space: a set of standard services for remote monitoring and control of spacecraft subsystems and payloads, and the structure of the telecommand packets carrying requests and the telemetry packets carrying reports. Missions tailor it as a 'menu' of services and capability sets.

The change log gives the aims of the revision: remove deficiencies of issue C, add lessons learned, align with newer ECSS and CCSDS standards and the ECSS drafting rules, and make the PUS foundation model consistent. Main changes: a reworked ST[01] request verification and ST[03] housekeeping, deletion of ST[08] function management (service type 8 is now reserved), new standard services ST[24] file transfer (based on CFDP), ST[25] file data storage, ST[26] parameter extraction and ST[27] critical packet log management, and configuration policies formalised as requirements.

The structure follows the 2016 issue. Chapter 4 gives context and modelling; chapter 5 the PUS foundation model (generic service type and deployment abstraction levels); chapter 6 the system requirements for service types ST[01] to ST[27], with 7, 8, 10 and 16 reserved; chapter 7 the space-to-ground interface, including packet field type codes (Boolean to deduced, absolute and relative time) and the CCSDS space packet with the PUS TM and TC secondary headers (PUS version number 2, time reference status, message type ID, message type counter, destination or source APID, spare and padding, and packet error control by CRC or ISO checksum); chapter 8 the request and report layouts for every service; chapter 9 the CPDU. Annexes cover IEEE and MIL-STD-1750A real formats, CRC and ISO checksums, a summary of all requests and reports, and a specification index.


## Key points

- This is an ECSS Draft Standard for Public Review (12 December 2024 to 28 February 2025) and may not be referred to as an ECSS Standard until published. *(PDF p. 1)*
- Main changes of Rev.1: evolved ST[1] request verification and ST[3] housekeeping, deletion of ST[8] function management, standardisation of ST[26] parameter extraction and ST[27] critical packet log management, ST[24] file transfer and ST[25] file data storage for file-based operations, and configuration policies formalised as requirements. *(PDF p. 3)*
- The PUS defines the application-level interface between ground and space; all services are optional, each can be implemented at several capability-set levels, and the mission tailoring is usually documented in a space-to-ground ICD. *(PDF p. 10)*
- Service type 8 is now reserved; missions are encouraged to replace the former function management service with mission-specific service types or subservice types. *(PDF p. 145)*
- ST[24] file transfer adopts the CCSDS File Delivery Protocol (CCSDS 727.0-B-5) as file transaction protocol and adds downlink managers that automate the downlink of files generated on board. *(PDF p. 414)*
- ST[26] parameter extraction makes parameters from other application processes' telemetry packets available to central autonomy functions such as FDIR and OBCPs. *(PDF p. 462)*
- ST[27] keeps critical packets (events of mission-specified severity and negative TC acknowledgements) in a dedicated, 'bounded' on-board log, independent of ST[15]. *(PDF p. 467)*
- All PUS packets are stand-alone space packets (sequence flags 0b11); TM packets carry a packet sequence count, TC packets carry a sequence count or packet name that, with the source identifier, identifies the request; the CCSDS maximum packet size is 65542 bytes. *(PDF p. 487)*
- The TM packet secondary header contains the TM PUS version number (set to 2), spacecraft time reference status, message type ID (service type and subtype), message type counter, destination APID, time and an optional spare; version 0 was ESA PSS-07-101 and version 1 ECSS-E-70-41A. *(PDF p. 489)*
- The packet error control field is mandatory in the TM user data field; whether checksumming is used, and whether it is the ISO 16-bit checksum or the CRC 16-bit, is declared when tailoring. *(PDF p. 491)*
- The TC packet secondary header contains the TC PUS version number (2), four acknowledgement flags (bit 3 acceptance, bit 2 start, bit 1 progress, bit 0 completion), message type ID, source APID and an optional spare. *(PDF p. 492)*


## Cited by these wiki pages (31)

- [CCSDS File Delivery Protocol (CCSDS 727.0-B-5)](../ccsds/cfdp.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [PUS packet structures: TC and TM headers](../ecss/pus/packets.md)
- [PUS parameter types (PTC/PFC)](../ecss/pus/parameter-types.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [ST[01] Request verification](../ecss/pus/st01-request-verification.md)
- [ST[02] Device access](../ecss/pus/st02-device-access.md)
- [ST[03] Housekeeping](../ecss/pus/st03-housekeeping.md)
- [ST[04] Parameter statistics reporting](../ecss/pus/st04-parameter-statistics.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [ST[08] Function management](../ecss/pus/st08-function-management.md)
- [ST[09] Time management](../ecss/pus/st09-time-management.md)
- [ST[11] Time-based scheduling](../ecss/pus/st11-time-based-scheduling.md)
- [ST[12] On-board monitoring](../ecss/pus/st12-onboard-monitoring.md)
- [ST[13] Large packet transfer](../ecss/pus/st13-large-packet-transfer.md)
- [ST[14] Real-time forwarding control](../ecss/pus/st14-real-time-forwarding-control.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [ST[17] Test](../ecss/pus/st17-test.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [ST[19] Event-action](../ecss/pus/st19-event-action.md)
- [ST[20] On-board parameter management](../ecss/pus/st20-onboard-parameter-management.md)
- [ST[21] Request sequencing](../ecss/pus/st21-request-sequencing.md)
- [ST[22] Position-based scheduling](../ecss/pus/st22-position-based-scheduling.md)
- [ST[23] File management](../ecss/pus/st23-file-management.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Packet Protocol (CCSDS 133.0-B-2)](../ccsds/space-packet.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (57 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 9 |
    | 1 | Scope | 10 |
    | 2 | Normative references | 12 |
    | 3 | Terms, definitions and abbreviated terms | 13 |
    | 4 | Context and background | 19 |
    | 4.2 | Modelling the PUS | 21 |
    | 5 | The PUS foundation model | 26 |
    | 5.3 | The generic service type abstraction level | 27 |
    | 5.4 | The generic service deployment abstraction level | 39 |
    | 6 | Service type system requirements | 56 |
    | 6.1 | ST[01] request verification | 56 |
    | 6.2 | ST[02] device access | 65 |
    | 6.3 | ST[03] housekeeping | 78 |
    | 6.4 | ST[04] parameter statistics reporting | 101 |
    | 6.5 | ST[05] event reporting | 111 |
    | 6.6 | ST[06] memory management | 117 |
    | 6.8 | ST[08] (reserved) | 145 |
    | 6.9 | ST[09] time management | 146 |
    | 6.11 | ST[11] time-based scheduling | 159 |
    | 6.12 | ST[12] on-board monitoring | 190 |
    | 6.13 | ST[13] large packet transfer | 221 |
    | 6.14 | ST[14] real-time forwarding control | 229 |
    | 6.15 | ST[15] on-board storage and retrieval | 250 |
    | 6.17 | ST[17] test | 299 |
    | 6.18 | ST[18] on-board control procedure | 303 |
    | 6.19 | ST[19] event-action | 325 |
    | 6.20 | ST[20] parameter management | 335 |
    | 6.21 | ST[21] request sequencing | 342 |
    | 6.22 | ST[22] position-based scheduling | 355 |
    | 6.23 | ST[23] file management | 389 |
    | 6.24 | ST[24] file transfer | 414 |
    | 6.25 | ST[25] file data storage | 439 |
    | 6.26 | ST[26] parameter extraction | 462 |
    | 6.27 | ST[27] critical packet log management | 467 |
    | 7 | Space to ground interface requirements | 473 |
    | 7.3 | Packet field type code | 476 |
    | 7.4 | The CCSDS Space Packet | 487 |
    | 8 | Service type interface requirements | 495 |
    | 8.1 | ST[01] request verification | 495 |
    | 8.3 | ST[03] housekeeping | 506 |
    | 8.5 | ST[05] event reporting | 523 |
    | 8.11 | ST[11] time-based scheduling | 544 |
    | 8.12 | ST[12] on-board monitoring | 556 |
    | 8.15 | ST[15] on-board storage and retrieval | 585 |
    | 8.20 | ST[20] on-board parameter management | 619 |
    | 8.23 | ST[23] file management | 643 |
    | 8.24 | ST[24] file transfer | 655 |
    | 8.25 | ST[25] file data storage | 667 |
    | 8.26 | ST[26] parameter extraction | 676 |
    | 8.27 | ST[27] critical packet log management | 678 |
    | 9 | Command Pulse Distribution Unit | 679 |
    | Annex A | IEEE and MIL-STD real formats (informative) | 683 |
    | Annex B | CRC and ISO checksum | 688 |
    | Annex C | Summary of requests and reports for PUS standard services (informative) | 700 |
    | Annex D | System and interface specification index (informative) | 732 |
    |  | Bibliography | 733 |


## Documents this one references (31)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
|  | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering – Ground systems and operations |  | normative |
|  | [ECSS-E-ST-70-01](../references/index.md#ref-ecss-e-st-70-01) | Space engineering – Spacecraft on-board control procedures |  | normative |
|  | [ECSS-E-ST-70-11](../references/index.md#ref-ecss-e-st-70-11) | Space engineering – Space segment operability |  | normative |
|  | [ECSS-E-ST-70-31](../references/index.md#ref-ecss-e-st-70-31) | Space engineering – Ground systems and operations – Monitoring and control data definition |  | normative |
|  | [CCSDS 133.0-B-2](../references/index.md#ref-ccsds-133-0-b-2) · [library](ccsds-133-0-133x0b2e2.md) | Space Packet Protocol, Blue Book | June 2020 | normative |
|  | [CCSDS 301.0-B-4](../references/index.md#ref-ccsds-301-0-b-4) · [library](ccsds-301-0-301x0b4e1.md) | Time Code Formats, Blue Book | November 2010 | normative |
|  | [CCSDS 727.0-B-5](../references/index.md#ref-ccsds-727-0-b-5) · [library](ccsds-727-0-727x0b5e1.md) | File Delivery Protocol, Blue Book | July 2020 | normative |
|  | [CCSDS 720.1-G-4](../references/index.md#ref-ccsds-720-1-g-4) | File Delivery Protocol, Green Book | May 2021 | normative |
|  | [CCSDS A30.0-G-3](../references/index.md#ref-ccsds-a30-0-g-3) | CCSDS Glossary | July 1997 | bibliography |
|  | [CCSDS 102.0-B-5](../references/index.md#ref-ccsds-102-0-b-5) | Packet Telemetry | Issue 5 November 2000 | bibliography |
|  | [CCSDS 200.0-G-6](../references/index.md#ref-ccsds-200-0-g-6) | Telecommand Summary of Concept and Rationale | January 1987 | bibliography |
|  | [CCSDS 202.0-B-3](../references/index.md#ref-ccsds-202-0-b-3) | Telecommand Part 2 – Data Routing Service | Issue 3 June 2001 | bibliography |
|  | [CCSDS 133.0-B-2](../references/index.md#ref-ccsds-133-0-b-2) · [library](ccsds-133-0-133x0b2e2.md) | CCSDS Space Packet Protocol | Issue 2 June 2020 | bibliography |
|  | [CCSDS 301.0-B-4](../references/index.md#ref-ccsds-301-0-b-4) · [library](ccsds-301-0-301x0b4e1.md) | CCSDS Time Code Formats | Issue 4 November 2010 | bibliography |
|  | [CCSDS 727.0-B-5](../references/index.md#ref-ccsds-727-0-b-5) · [library](ccsds-727-0-727x0b5e1.md) | CCSDS File Delivery Protocol (CFDP) Recommended Standard | Issue 5 July 2020 | bibliography |
|  | [CCSDS 720.1-G-4](../references/index.md#ref-ccsds-720-1-g-4) | CCSDS File Delivery Protocol (CFDP) Introduction | Issue 4 May 2021 | bibliography |
|  | [CCSDS 732.0-B-2](../references/index.md#ref-ccsds-732-0-b-2) | AOS Space Data Link Protocol | issue 2 23 May 2007 | bibliography |
|  | [CCSDS 910.2-G-1](../references/index.md#ref-ccsds-910-2-g-1) | Standard Terminology, Conventions and Methodology (TCM) for defining Data Services | November 1994 | bibliography |
|  | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
|  | [ECSS-E-ST-50-03](../references/index.md#ref-ecss-e-st-50-03) | Space engineering – Space data links – Telemetry transfer frame protocol |  | bibliography |
|  | [ECSS-E-ST-50-04](../references/index.md#ref-ecss-e-st-50-04) | Space engineering – Space data links – Telecommand protocols synchronization and channel coding |  | bibliography |
|  | [ESA PSS-04-151](../references/index.md#ref-esa-pss-04-151) · [library](esa-pss-04-151-issue1-september1992.md) | Telecommand Decoder Specification | Issue 1 September 1993 | bibliography |
|  | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) · [library](esa-pss-07-101-issue1-may1994.md) | Packet utilization standard | Issue 1 May 1994 | bibliography |
|  | [ITU-T V.41](../references/index.md#ref-itu-t-v-41) | Code-Independent Error Control System – Data Communication over the Telephone Network (before renaming known as Information Technology - CCITT V.41) | 1989 | bibliography |
|  | [ISO 8473-1:1998](../references/index.md#ref-iso-8473-1-1998) | Information Technology - Protocol for Providing the Connectionless-Mode Network Service: Protocol specification | second edition 1998 | bibliography |
| SANA | [catalogue](../references/index.md#ref-space-packet-protocol-application-process-identifier-apid-registry-of-the-space-) | Space Packet Protocol Application Process Identifier (APID) registry of the Space Assigned Numbers Authority (SANA), https://sanaregistry.org/r/space_packet_protocol_application_process_id/ |  | bibliography |
| ANSI | [INCITS 4-1986[R2017]](../references/index.md#ref-incits-4-1986r2017) | American National Standard for Information Systems – Coded Character Sets – 7-Bit American National Standard Code for Information Interchange (7-Bit ASCII) |  | bibliography |
| Reference [7] | [IEEE 754](../references/index.md#ref-ieee-754) | IEEE 754 Standard for binary floating-point arithmetic |  | mentioned |
| Reference [8] | [MIL-STD-1750a](../references/index.md#ref-mil-std-1750a) | Military Standard Sixteen-Bit Computer Instruction Set Architecture | 2nd July 1980 | mentioned |
|  | [CCSDS 133.0-B-1](../references/index.md#ref-ccsds-133-0-b-1) | CCSDS Space Packet Protocol (cited in the Introduction and clause 7.4.1) |  | mentioned |

!!! note "Notes"
    Retrieved from ecss.nl as 'ECSS-E-ST-70-41C-Rev.1-DIR1(11December2024).pdf'. PDF page indices equal printed page numbers (733 pages; the extracted text has an empty 734th page). The draft shows editorial defects: the change log's 'Current step' row names 'ECSS-E-ST-32-02C Rev.2 DIR1' instead of this document, it refers to 'ECSS-E-70-41C (15 April 2026)' where 2016 is meant, and it lists 'ECSS-E-ST-70-41C Third issue 15 April 2016' as well as 'Second issue 15 April 2016' (PDF pp. 3-4). Later page headers read 'ECSS-E-ST-70-41C Rev.1 DIR1 Rev.1 DIR1 / 30 September 2024' (the DFR date). Several cross-references are broken ('Error! Reference source not found.', 3 occurrences, e.g. PDF p. 491). The Annex D page index uses page numbers about 3 lower than the actual pages. The normative reference list cites CCSDS 133.0-B-2 while the Introduction and clause 7.4.1 cite CCSDS 133.0-B-1. Many packet layout figures are rendered as fragmented text. Compare with the published 2016 issue (ecss-e-st-70-41c-15april2016) and PUS-A (ecss-e-70-41a-30jan2003-pus).

