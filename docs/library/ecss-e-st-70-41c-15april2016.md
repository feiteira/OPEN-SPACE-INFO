---
title: "ECSS-E-ST-70-41C Packet Utilization Standard (PUS-C)"
description: "PUS-C, the second issue of the ECSS Packet Utilization Standard, is the reference for the application-level ground-space interface of most current ESA missions."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-70-41c-15april2016]
---

# Space engineering
Telemetry and telecommand packet utilization

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70-41C</dd><dt>Issue / version</dt><dd>Second issue</dd><dt>Date</dt><dd>2016-04-15</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-70-41C Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-70-41C Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue, dated 15 April 2016. The change log (p. 3) lists ECSS-E-70-41A (30 January 2003) as the first issue and ECSS-E-70-41B as never issued. This copy does not mention any later revision. The plan's page 'PUS-A vs PUS-C (and the 2024 Rev.1 draft)' refers to a later draft that is not part of this document.</dd><dt>Pages</dt><dd>656</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2016/06/ECSS-E-ST-70-41C15April2016.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2016/06/ECSS-E-ST-70-41C15April2016.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:03Z</dd><dt>SHA-256</dt><dd><code>fed627dae2aa2a1e9dbfb873861002fbee40a37a3883019d6701af34852ea51d</code></dd><dt>Size</dt><dd>4.9 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-70-41C-15April2016.pdf">ECSS-E-ST-70-41C-15April2016.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

**PUS-C**, the second issue of the ECSS Packet Utilization Standard, is the reference for the application-level ground-space interface of most current ESA missions. It sits above the CCSDS Space Packet Protocol and the ECSS-E-ST-50 data link standards. It defines a menu of optional *service types*, each a set of request and report message types carried in CCSDS space packets, tailored per application process. Compared with PUS-A, it was rebuilt on a formal **PUS foundation model** (clause 5), which gives generic rules for service, subservice, capability, message and transaction types and for their deployment onto application processes, on-board parameters, memories, virtual channels and file systems. It also separates semantics (clause 6, system requirements) strictly from syntax (clause 8, interface requirements).

Clause 7 defines the **packet field types**: PTC/PFC codes for Boolean, enumerated, integers, reals, strings, absolute and relative time and deduced and packet fields. It also defines the PUS use of the **space packet**: the TM secondary header (PUS version 2, time reference status, service type and subtype, message counter, destination ID, time) and the TC secondary header (PUS version 2, acknowledgement flags, service type and subtype, source ID), padding and the CRC/ISO checksum.

The standard service types are ST[01] request verification, [02] device access, [03] housekeeping, [04] parameter statistics, [05] events, [06] memory management, [08] function management, [09] time management, [11] time-based scheduling, [12] on-board monitoring, [13] large packet transfer, [14] real-time forwarding control, [15] on-board storage and retrieval, [17] test, [18] OBCPs, [19] event-action, [20] parameter management, [21] request sequencing, [22] position-based scheduling and [23] file management. Each has clause 6 and clause 8 sections, and Annex C summarises every message type with its tailoring rule. Clause 9 covers the CPDU, and the annexes give real-number formats and checksums.


## Key points

- The update from ECSS-E-70-41A introduced the PUS foundation model (used to produce the standard and the mission-specific service types and the mission services) and a proper separation of system and interface requirements. *(PDF p. 3)*
- All services are optional and implemented at distinct capability levels; PUS is a 'menu' selected per application process. The standard mainly addresses the spacecraft, and it assumes the ground segment implements all standardized capabilities. *(PDF p. 10)*
- Normative references include ECSS-E-ST-70-01 (OBCPs), ECSS-E-ST-70-11 (operability), ECSS-E-ST-70-31 (monitoring and control data definition), CCSDS 133.0-B-1 (Space Packet Protocol, September 2003) and CCSDS 301.0-B-4 (Time Code Formats, November 2010). *(PDF p. 11)*
- Messages from a subservice user to a provider are requests, made of instructions; messages back are reports, made of notifications, and come as verification, data and event reports. *(PDF p. 19)*
- Standard service type IDs (Table 4-1): 1 request verification, 2 device access, 3 housekeeping, 4 parameter statistics reporting, 5 event reporting, 6 memory management, 8 function management, 9 time management, 11 time-based scheduling, 12 on-board monitoring, 13 large packet transfer, 14 real-time forwarding control, 15 on-board storage and retrieval, 17 test, 18 OBCP, 19 event-action, 20 parameter management, 21 request sequencing, 22 position-based scheduling, 23 file management; 7, 10 and 16 are reserved. *(PDF p. 22)*
- Service interdependencies: request verification is accessible to any service in the same application process; event reporting and large packet transfer are accessible to any service; on-board monitoring and event-action require an event reporting service. *(PDF p. 24)*
- Service type IDs are 1-255, with standard ones at most 127 and mission-specific ones at least 128; message subtype IDs are 1-255, with standard ones at most 127 and mission-specific subtypes in a standard service at least 128. A removed standard service type's ID is not reused. *(PDF p. 26)*
- APIDs are unsigned integers up to 2046: APID 2047 is reserved for idle packets, APID 0 for spacecraft time packets, and other values are reserved per the SANA registry. *(PDF p. 39)*
- Absolute time values are offsets from an epoch: CUC may use the CCSDS 1958 epoch or an agency epoch (free-running counter), while CDS must use 1958 January 1; PUS supports CUC coarse time of 1 to 4 octets and fine time of 1 to 10 octets. *(PDF p. 435)*
- Absolute time (PTC 9) PFCs: 0 explicit P-field, 1 CDS without µs (6 octets), 2 CDS with µs (8 octets), 3-18 CUC with coarse octets = (PFC+1) div 4 and fine octets = (PFC+1) mod 4, and 19-46 CUC with longer fine time. *(PDF p. 436)*
- Deduced fields are PTC 11 PFC 0, and their structure may depend only on preceding fields of the same packet and/or mission constants; packet fields are PTC 12 (PFC 0 TM packet, PFC 1 TC packet). *(PDF p. 437)*
- All PUS packets are stand-alone space packets (sequence flags '11'); the TM packet sequence count wraps from 2^14-1 to 0; TC packets carry a sequence count or packet name that, with the source ID, identifies the packet. *(PDF p. 438)*
- TM secondary header: PUS version number (4 bits, set to 2), spacecraft time reference status (4 bits), service type ID (8), message subtype ID (8), message type counter (16), destination ID (16), time (absolute time), optional spare. Version 0 was the ESA PUS (ESA PSS-07-101) and version 1 was ECSS-E-70-41A. *(PDF p. 439)*
- Whether TM packets carry a packet error control field, and whether it is the ISO 16-bit checksum or the 16-bit CRC, is declared at mission tailoring. *(PDF p. 441)*
- TC secondary header: PUS version number (4 bits, 2), acknowledgement flags (4 bits), service type ID (8), message subtype ID (8), source ID (16), optional spare. Ack bit 3 requests success reports for acceptance, bit 2 for start, bit 1 for progress and bit 0 for completion of execution. *(PDF p. 442)*
- Every TC packet carries a checksum (ISO or CRC 16-bit, declared at mission tailoring), computed when all other fields are complete and verified on-board. *(PDF p. 444)*
- A CPDU is a simple unit giving ground direct access to equipment (e.g. resetting a transponder). It has its own APID, a pulse duration unit of 10-15 ms, up to 2^12 addressable outputs and 12 to 504 pulse instructions per request; pulse duration = unit x 2^n with n = 0 to 7. *(PDF p. 606)*
- ST[01] reports: TM[1,1]/[1,2] acceptance success/failure, TM[1,3]/[1,4] start, TM[1,5]/[1,6] progress, TM[1,7]/[1,8] completion, and TM[1,10] failed routing verification. *(PDF p. 628)*
- Examples of message types in Annex C: TM[3,25] housekeeping parameter report, TM[5,1] informative event report, TC[6,2] load raw memory data areas, TC[8,1] perform a function, TM[9,2]/TM[9,3] CUC/CDS time reports, TC[17,1] are-you-alive test, TC[23,1] create a file. *(PDF p. 630)*
- Annex D indexes each service type to its system (clause 6) and interface (clause 8) pages, e.g. ST[03] housekeeping at pp. 78 and 456 and ST[12] on-board monitoring at pp. 198 and 508. *(PDF p. 655)*


## Cited by these wiki pages (46)

- [CCSDS File Delivery Protocol (CCSDS 727.0-B-5)](../ccsds/cfdp.md)
- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Commanding in the MIB: commands and their parameters](../mib/commanding.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS-E-ST-70-31C: monitoring and control data definition](../ecss/e-st-70-31c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [How it all fits together](../overview/index.md)
- [MIB parameter types: PTC/PFC in SCOS-2000](../mib/parameter-types.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [PUS message type catalogue](../ecss/pus/message-types.md)
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
- [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)
- [Worked example: decoding a real Solar Orbiter telemetry packet](../overview/worked-example-tm.md)
- [XTCE: XML Telemetric and Command Exchange (CCSDS 660)](../ccsds/xtce.md)


??? abstract "Contents (71 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 8 |
    | 1 | Scope | 9 |
    | 2 | Normative references | 11 |
    | 3 | Terms, definitions and abbreviated terms | 12 |
    | 4 | Context and background | 18 |
    | 4.1 | Introduction | 18 |
    | 4.2 | Modelling the PUS | 21 |
    | 5 | The PUS foundation model | 25 |
    | 5.1 | Introduction | 25 |
    | 5.2 | Convention | 26 |
    | 5.3 | The generic service type abstraction level | 26 |
    | 5.4 | The generic service deployment abstraction level | 38 |
    | 6 | Service type system requirements | 55 |
    | 6.1 | ST[01] request verification | 55 |
    | 6.2 | ST[02] device access | 64 |
    | 6.3 | ST[03] housekeeping | 78 |
    | 6.4 | ST[04] parameter statistics reporting | 111 |
    | 6.5 | ST[05] event reporting | 121 |
    | 6.6 | ST[06] memory management | 127 |
    | 6.8 | ST[08] function management | 157 |
    | 6.9 | ST[09] time management | 160 |
    | 6.11 | ST[11] time-based scheduling | 168 |
    | 6.12 | ST[12] on-board monitoring | 198 |
    | 6.13 | ST[13] large packet transfer | 229 |
    | 6.14 | ST[14] real-time forwarding control | 237 |
    | 6.15 | ST[15] on-board storage and retrieval | 265 |
    | 6.17 | ST[17] test | 318 |
    | 6.18 | ST[18] on-board control procedure | 321 |
    | 6.19 | ST[19] event-action | 342 |
    | 6.20 | ST[20] parameter management | 352 |
    | 6.21 | ST[21] request sequencing | 358 |
    | 6.22 | ST[22] position-based scheduling | 369 |
    | 6.23 | ST[23] file management | 403 |
    | 7 | Space to ground interface requirements | 425 |
    | 7.1 | Introduction | 425 |
    | 7.2 | Convention | 427 |
    | 7.3 | Packet field type code | 428 |
    | 7.4 | The CCSDS Space Packet | 438 |
    | 8 | Service type interface requirements | 445 |
    | 8.1 | ST[01] request verification | 445 |
    | 8.2 | ST[02] device access | 451 |
    | 8.3 | ST[03] housekeeping | 456 |
    | 8.4 | ST[04] parameter statistics reporting | 473 |
    | 8.5 | ST[05] event reporting | 477 |
    | 8.6 | ST[06] memory management | 481 |
    | 8.8 | ST[08] function management | 492 |
    | 8.9 | ST[09] time management | 493 |
    | 8.11 | ST[11] time-based scheduling | 496 |
    | 8.12 | ST[12] on-board monitoring | 508 |
    | 8.13 | ST[13] large packet transfer | 526 |
    | 8.14 | ST[14] real-time forwarding control | 529 |
    | 8.15 | ST[15] on-board storage and retrieval | 538 |
    | 8.17 | ST[17] test | 558 |
    | 8.18 | ST[18] on-board control procedure | 560 |
    | 8.19 | ST[19] event-action | 568 |
    | 8.20 | ST[20] on-board parameter management | 573 |
    | 8.21 | ST[21] request sequencing | 577 |
    | 8.22 | ST[22] position-based scheduling | 583 |
    | 8.23 | ST[23] file management | 596 |
    | 9 | Command Pulse Distribution Unit | 606 |
    | 9.1 | Scope | 606 |
    | 9.2 | System requirements | 606 |
    | 9.3 | Interface requirements | 608 |
    | Annex A | IEEE and MIL-STD real formats (informative) | 610 |
    | Annex B | CRC and ISO checksum (informative) | 615 |
    | B.1 | The cyclic redundancy code (CRC) | 615 |
    | B.2 | The ISO checksum | 622 |
    | Annex C | Summary of requests and reports for PUS standard services (informative) | 628 |
    | Annex D | System and interface specification index (informative) | 655 |
    |  | Bibliography | 656 |


## Documents this one references (27)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ECSS-E-ST-70 | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering – Ground systems and operations |  | normative |
| ECSS-E-ST-70-01 | [ECSS-E-ST-70-01](../references/index.md#ref-ecss-e-st-70-01) | Space engineering – Spacecraft on-board control procedures |  | normative |
| ECSS-E-ST-70-11 | [ECSS-E-ST-70-11](../references/index.md#ref-ecss-e-st-70-11) | Space engineering – Space segment operability |  | normative |
| ECSS-E-ST-70-31 | [ECSS-E-ST-70-31](../references/index.md#ref-ecss-e-st-70-31) | Space engineering – Ground systems and operations – Monitoring and control data definition |  | normative |
| CCSDS 133.0-B-1 | [CCSDS 133.0-B-1](../references/index.md#ref-ccsds-133-0-b-1) | Space Packet Protocol, Blue Book | September 2003 | normative |
| CCSDS 301.0-B-4 | [CCSDS 301.0-B-4](../references/index.md#ref-ccsds-301-0-b-4) · [library](ccsds-301-0-301x0b4e1.md) | Time Code Formats, Blue Book | November 2010 | normative |
| CCSDS A30.0-G-3 | [CCSDS A30.0-G-3](../references/index.md#ref-ccsds-a30-0-g-3) | CCSDS Glossary | July 1997 | bibliography |
| CCSDS 102.0-B-5 | [CCSDS 102.0-B-5](../references/index.md#ref-ccsds-102-0-b-5) | Packet Telemetry | Issue 5 November 2000 | bibliography |
| CCSDS 200.0-G-6 | [CCSDS 200.0-G-6](../references/index.md#ref-ccsds-200-0-g-6) | Telecommand Summary of Concept and Rationale | January 1987 | bibliography |
| CCSDS 202.0-B-3 | [CCSDS 202.0-B-3](../references/index.md#ref-ccsds-202-0-b-3) | Telecommand Part 2 – Data Routing Service | Issue 3 June 2001 | bibliography |
| CCSDS 727.0-B-4 | [CCSDS 727.0-B-4](../references/index.md#ref-ccsds-727-0-b-4) | CCSDS File Delivery Protocol (CFDP) | Issue 4 January 2007 | bibliography |
| CCSDS 732.0-B-2 | [CCSDS 732.0-B-2](../references/index.md#ref-ccsds-732-0-b-2) | AOS Space Data Link Protocol | issue 2 23 May 2007 | bibliography |
| CCSDS 910.2-G-1 | [CCSDS 910.2-G-1](../references/index.md#ref-ccsds-910-2-g-1) | Standard Terminology, Conventions and Methodology (TCM) for defining Data Services | November 1994 | bibliography |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-50-03 | [ECSS-E-ST-50-03](../references/index.md#ref-ecss-e-st-50-03) | Space engineering – Space data links – Telemetry transfer frame protocol |  | bibliography |
| ECSS-E-ST-50-04 | [ECSS-E-ST-50-04](../references/index.md#ref-ecss-e-st-50-04) | Space engineering – Space data links – Telecommand protocols synchronization and channel coding |  | bibliography |
| ESA PSS-04-151 | [ESA PSS-04-151](../references/index.md#ref-esa-pss-04-151) | Telecommand Decoder Specification | Issue 1 September 1993 | bibliography |
| ESA PSS-07-101 | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) | Packet utilization standard | Issue 1 May 1994 | bibliography |
| ITU-T V.41 | [ITU-T V.41](../references/index.md#ref-itu-t-v-41) | Code-Independent Error Control System – Data Communication over the Telephone Network (before renaming known as Information Technology - CCITT V.41) | 1989 | bibliography |
| ISO 8473-1:1998 | [ISO 8473-1:1998](../references/index.md#ref-iso-8473-1-1998) | Information Technology - Protocol for Providing the Connectionless-Mode Network Service: Protocol specification second edition | second edition 1998 | bibliography |
| SANA | [catalogue](../references/index.md#ref-space-assigned-numbers-authority-http-sanaregistry-org) | Space Assigned Numbers Authority, http://sanaregistry.org |  | bibliography |
|  | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | ECSS-E-ST-50 series of standards |  | mentioned |
|  | [Mil-Std-1553B](../references/index.md#ref-mil-std-1553b) | Mil-Std-1553B bus (low-level commanding of a remote terminal) |  | mentioned |
|  | [ANSI X3.4](../references/index.md#ref-ansi-x3-4) | ANSI X3.4 (definition of visible characters) |  | mentioned |
| Reference [7] | [IEEE 754](../references/index.md#ref-ieee-754) | IEEE 754 Standard for binary floating-point arithmetic |  | mentioned |
| Reference [8] | [MIL-STD-1750a](../references/index.md#ref-mil-std-1750a) | Military Standard Sixteen-Bit Computer Instruction Set Architecture | 2nd July 1980 | mentioned |

!!! note "Notes"
    This is the largest library item: 656 printed pages, plus a blank PDF page 657 (srcgrep shows 657). Printed page numbers equal PDF page numbers. Unlike other ECSS standards in the library, the extracted text shows no requirement identifiers such as 'ECSS-E-ST-70-41_xxxxxxx', although the change log mentions naming each requirement. The table of contents omits clause 3.4 Nomenclature (p. 17). Service names vary between clauses: ST[18] is 'on-board control procedure' in clauses 6 and 8 but 'on-board operations procedure' in Annexes C and D, and ST[20] is 'parameter management' in clause 6 but 'on-board parameter management' in clause 8 and Annex D. Annex A cites 'Reference [7]' (IEEE 754) and 'Reference [8]' (MIL-STD-1750a) (pp. 610, 613), but the bibliography is unnumbered and lists neither, apparently a leftover from ECSS-E-70-41A. They are recorded above as 'mentioned'. The bibliography's TM and TC data-link entries cite the 2008 ECSS-E-ST-50-03/-04 rather than the later ECSS-E-AS-50-2x adoption notices. Many figures (packet layouts, models) extract as scrambled text, and the time-formula notes use mathematical italic Unicode characters (p. 436).

