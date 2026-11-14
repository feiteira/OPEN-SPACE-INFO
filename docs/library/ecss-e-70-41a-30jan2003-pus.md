---
title: "ECSS-E-70-41A Packet Utilization Standard (PUS-A)"
description: "The first ECSS Packet Utilization Standard (PUS-A)."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-70-41a-30jan2003-pus]
---

# Space engineering
Ground systems and operations — Telemetry and telecommand packet utilization

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-70-41A</dd><dt>Date</dt><dd>2003-01-30</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS Working Group for Ground Systems and Operations; published by ESA Publications Division)</dd><dt>Authors</dt><dd>ECSS Working Group for Ground Systems and Operations</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Published 30 January 2003 as ECSS-E-70-41A ('PUS-A'). The document has no change log and states no issue number beyond the 'A' letter. Its successor is ECSS-E-ST-70-41C, the second issue of 15 April 2016 (library item ecss-e-st-70-41c-15april2016). Its change log lists ECSS-E-70-41A as the first issue and ECSS-E-70-41B as never issued (PUS-C p. 3). Footnotes on pp. 44 and 48 note that PUS version 0 was used by the earlier ESA PUS.</dd><dt>Pages</dt><dd>228</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://redmine.oas.inaf.it/attachments/download/416/ECSS-E-70-41A(30Jan2003)-PUS.pdf" rel="noopener">https://redmine.oas.inaf.it/attachments/download/416/ECSS-E-70-41A(30Jan2003)-PUS.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:05Z</dd><dt>SHA-256</dt><dd><code>ca5ecf050941deeab4a693fc15a167ec13b2fce7f9bc7bd81e912eeeaf32fd0d</code></dd><dt>Size</dt><dd>2.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-70-41A-30Jan2003-PUS.pdf">ECSS-E-70-41A-30Jan2003-PUS.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The first ECSS **Packet Utilization Standard (PUS-A)**. It defines the application-level interface between ground and spacecraft that sits on top of the CCSDS packet telemetry and telecommand recommendations (CCSDS 102.0 and 203.0). The scope (clause 1) frames PUS as a *menu*: every service is optional, it comes as a minimum capability set plus additional ones, and each mission tailors it per application process and documents the result in a space-ground ICD.

The document covers:

* **Operations concepts (clause 4)**: APID allocation (APID 0 reserved for the time packet, 2047 for idle packets, and one APID per CPDU), packet routing and size, the telecommand execution profile and verification, telemetry reporting, scheduling, monitoring, storage and diagnostic mode;
* **Packet structures (clause 5)**: the TC data field header (PUS version, 4-bit Ack, service type and subtype, optional source ID) and the TM data field header (PUS version, type and subtype, optional packet sub-counter, destination ID and time), plus the 16-bit packet error control;
* **16 standard services (clauses 6-21)**, each with a concept, requests and reports, and capability sets: 1 TC verification, 2 device command distribution, 3 housekeeping and diagnostic reporting, 4 parameter statistics, 5 events, 6 memory management, 8 function management, 9 time management, 11 scheduling, 12 on-board monitoring, 13 large data transfer, 14 packet forwarding control, 15 storage and retrieval, 17 test, 18 on-board operations procedures and 19 event-action. Clause 22 summarises all the requests and reports;
* **Parameter types (clause 23)**: PTC 1-11 with their PFC formats and the structure rules for repeated groups. This is the origin of the PTC/PFC scheme that the SCOS-2000 MIB uses.

Normative annexes give the CRC and ISO checksum, the mission constants, the spacecraft time packet and time correlation (taken from ESA PSS-04-106), and the CPDU (taken from ESA PSS-04-151).


## Key points

- PUS complements ECSS-E-50 and the CCSDS packet TM/TC recommendations by defining the application-level ground-space interface for integration, testing and flight operations. *(PDF p. 5)*
- All services are optional; each has a minimum capability set and optional additional capability sets, and PUS is a 'menu' tailored per application process and recorded in a space-ground interface control document (SGICD). *(PDF p. 14)*
- APID 2047 (all ones) is reserved by CCSDS for idle packets; PUS reserves APID 0 for the standard spacecraft time packet and requires a dedicated APID for each CPDU. *(PDF p. 24)*
- Missions may define &lt;TCPKT_MAX_LENGTH&gt; and &lt;TMPKT_MAX_LENGTH&gt; below the CCSDS 65K-octet maximum; data exceeding them use the large data transfer service with acknowledgement and retransmission. *(PDF p. 25)*
- TC packets follow CCSDS 203.0-B-2: version 0, type 1, data field header flag 1 (mandatory except for CPDU telecommands), 11-bit APID, sequence flags (11 = stand-alone), 14-bit sequence count per source and APID, packet length = data field octets - 1; maximum TC packet 65 542 octets. *(PDF p. 43)*
- TC data field header: CCSDS secondary header flag (0), TC packet PUS version number (1), Ack (4 bits: acceptance, start, progress, completion), service type (8 bits), service subtype (8 bits), optional source ID, spare; a 16-bit Packet Error Control is mandatory for TCs and its type is set by &lt;TC_CHECKSUM_TYPE&gt;. *(PDF p. 44)*
- Service types and subtypes 0-127 are reserved for the standard and 128-255 are mission-specific; within mission-specific services all subtypes 0-255 are free. *(PDF p. 45)*
- TM source packets follow CCSDS 102.0-B-5: type 0, data field header mandatory except for the time packet, grouping flags, 14-bit source sequence count per APID that wraps from 2^14-1 to 0 and must never 'short-cycle'. *(PDF p. 47)*
- TM data field header: spare bit, PUS version (1), spare, service type, service subtype, optional packet sub-counter, optional destination ID, optional time (CUC or CDS per &lt;APPL_TIME_CODE&gt;), spare; the optional 16-bit PEC is set by &lt;TM_CHECKSUM_TYPE&gt;. *(PDF p. 48)*
- Table 2 lists the standard service types: 1-6, 8, 9, 11-15 and 17-19; types 7, 10 and 16 are not used. *(PDF p. 50)*
- Service 1 reports: (1,1)/(1,2) acceptance success/failure, (1,3)/(1,4) execution started, (1,5)/(1,6) progress, (1,7)/(1,8) execution completed success/failure; service 2 requests: (2,1) on-off, (2,2) register load, (2,3) CPDU commands. *(PDF p. 183)*
- A parameter code is the pair PTC (parameter type code) and PFC (parameter format code); missions adopt the standard formats and may add mission-specific PFCs. *(PDF p. 190)*
- The simple parameter types are PTC 1 Boolean, 2 Enumerated, 3 Unsigned integer, 4 Signed integer, 5 Real, 6 Bit-string, 7 Octet-string, 8 Character-string, 9 Absolute time, 10 Relative time and 11 Deduced. *(PDF p. 192)*
- The packet CRC uses g(x) = x^16 + x^12 + x^5 + 1 with encoder and decoder initialised to all ones, computed over the whole packet except the PEC field. *(PDF p. 207)*
- Annex B mission constants include &lt;APPL_TIME_CODE&gt;, &lt;CPDU_DURATION_UNIT&gt; (10 to 15 ms), &lt;CPDU_MAX_INSTR&gt; (12 to 120), &lt;MONLIST_MAX_PARAMS&gt;, &lt;SMALLEST_ADDRESSABLE_UNIT&gt;, &lt;TCPKT_MAX_LENGTH&gt;, &lt;TC_CHECKSUM_TYPE&gt; and &lt;TM_CHECKSUM_TYPE&gt;. *(PDF p. 215)*
- Spacecraft elapsed time is a CUC count of TAI seconds from an arbitrary epoch; P-field bits 0-3 = 0010, bits 4-5 = coarse octets minus one (1-4), bits 6-7 = fine octets (0-3). *(PDF p. 218)*
- The time packet (APID 0, no data field header) carries a rate octet, then the P- and T-field time sample. The clock is sampled at the leading edge of the ASM of the VC 0 frame with VC frame count 0 (every 256 VC0 frames by default, or 128 down to 1). *(PDF p. 219)*
- A CPDU telecommand packet is 10 to 248 octets long, with an even number of octets, ends with a 16-bit CRC, and is carried in a single TC segment and frame (normally on MAP 0). *(PDF p. 222)*


## Cited by these wiki pages (49)

- [CCSDS File Delivery Protocol (CCSDS 727.0-B-5)](../ccsds/cfdp.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Commanding in the MIB: commands and their parameters](../mib/commanding.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS-E-ST-70-31C: monitoring and control data definition](../ecss/e-st-70-31c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [How it all fits together](../overview/index.md)
- [MIB parameter types: PTC/PFC in SCOS-2000](../mib/parameter-types.md)
- [PUS message type catalogue](../ecss/pus/message-types.md)
- [PUS packet structures: TC and TM headers](../ecss/pus/packets.md)
- [PUS parameter types (PTC/PFC)](../ecss/pus/parameter-types.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
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
- [Solar Orbiter simulator](../simulator/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Packet Protocol (CCSDS 133.0-B-2)](../ccsds/space-packet.md)
- [The standards landscape](../overview/standards-map.md)
- [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)
- [Worked example: decoding a real Solar Orbiter telemetry packet](../overview/worked-example-tm.md)


??? abstract "Contents (68 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Foreword | 3 |
    |  | Introduction | 5 |
    | 1 | Scope | 13 |
    | 2 | Normative references | 15 |
    | 3 | Terms, definitions and abbreviated terms | 17 |
    | 3.1 | Terms and definitions | 17 |
    | 3.2 | Abbreviated terms | 20 |
    | 4 | PUS operations concepts | 23 |
    | 4.1 | Introduction | 23 |
    | 4.2 | Application processes | 24 |
    | 4.3 | Packet design and routing | 24 |
    | 4.4 | Telecommanding | 26 |
    | 4.5 | Telemetry reporting | 30 |
    | 4.6 | Software management | 31 |
    | 4.7 | On-board operations scheduling | 32 |
    | 4.8 | On-board monitoring | 33 |
    | 4.9 | On-board operations procedures | 34 |
    | 4.10 | Attaching actions to on-board events | 34 |
    | 4.11 | On-board storage and retrieval | 34 |
    | 4.12 | Telemetry generation and forwarding | 35 |
    | 4.13 | Memory management | 35 |
    | 4.14 | Diagnostic mode | 36 |
    | 4.15 | Off-line testing | 37 |
    | 5 | Service specification | 39 |
    | 5.1 | Introduction | 39 |
    | 5.2 | Conventions | 40 |
    | 5.3 | Telecommand packet structure | 42 |
    | 5.4 | Telemetry source packet structure | 46 |
    | 5.5 | Standard services | 50 |
    | 6 | Telecommand verification service | 51 |
    | 7 | Device command distribution service | 57 |
    | 8 | Housekeeping and diagnostic data reporting service | 61 |
    | 9 | Parameter statistics reporting service | 73 |
    | 10 | Event reporting service | 79 |
    | 11 | Memory management service | 83 |
    | 12 | Function management service | 91 |
    | 13 | Time management service | 95 |
    | 14 | On-board operations scheduling service | 99 |
    | 15 | On-board monitoring service | 119 |
    | 16 | Large data transfer service | 135 |
    | 17 | Packet forwarding control service | 145 |
    | 18 | On-board storage and retrieval service | 153 |
    | 19 | Test service | 167 |
    | 20 | On-board operations procedure service | 169 |
    | 21 | Event-action service | 177 |
    | 22 | Summary of service requests and reports | 183 |
    | 23 | Parameter types and structure rules | 189 |
    | 23.1 | Introduction | 189 |
    | 23.2 | Conventions | 190 |
    | 23.3 | Encoding formats of parameter types | 190 |
    | 23.4 | Tailoring of packet structures for a mission | 191 |
    | 23.5 | Simple parameter types | 192 |
    | 23.6 | Structured field types | 199 |
    | Annex A | Examples (normative) | 207 |
    | A.1 | Specification of the cyclic redundancy code (CRC) | 207 |
    | A.2 | Specification of the ISO checksum | 212 |
    | A.3 | Use of service type 2, device command distribution | 214 |
    | Annex B | Mission constants (normative) | 215 |
    | Annex C | Spacecraft time protocols (normative) | 217 |
    | C.1 | Introduction | 217 |
    | C.2 | Presentation of spacecraft elapsed time | 217 |
    | C.3 | Standard spacecraft time source packet | 219 |
    | C.4 | Spacecraft time correlation procedures | 219 |
    | Annex D | Command pulse distribution unit (normative) | 221 |
    | D.1 | General requirements | 221 |
    | D.2 | Specification | 222 |
    | D.3 | Design requirements | 224 |
    |  | Bibliography | 225 |


## Documents this one references (25)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-P-001 | [ECSS-P-001](../references/index.md#ref-ecss-p-001) | Glossary of terms |  | normative |
| ECSS-E-50 | [ECSS-E-50](../references/index.md#ref-ecss-e-50) | Space engineering -- Communication (to be published) |  | normative |
| ECSS-E-70 | [ECSS-E-70](../references/index.md#ref-ecss-e-70) | Space engineering -- Ground systems and operations |  | normative |
| CCSDS 102.0-B-5 | [CCSDS 102.0-B-5](../references/index.md#ref-ccsds-102-0-b-5) | Packet Telemetry, Blue Book | Issue 5 November 2000 | normative |
| CCSDS 201.0-B-3 | [CCSDS 201.0-B-3](../references/index.md#ref-ccsds-201-0-b-3) | Telecommand Part 1 -- Channel Service, Blue Book | Issue 3 June 2000 | normative |
| CCSDS 202.0-B-3 | [CCSDS 202.0-B-3](../references/index.md#ref-ccsds-202-0-b-3) | Telecommand Part 2 -- Data Routing Service, Blue Book | Issue 3 June 2001 | normative |
| CCSDS 202.1-B-2 | [CCSDS 202.1-B-2](../references/index.md#ref-ccsds-202-1-b-2) | Telecommand Part 2.1 -- Command Operation Procedures, Blue Book | Issue 2 June 2001 | normative |
| CCSDS 203.0-B-2 | [CCSDS 203.0-B-2](../references/index.md#ref-ccsds-203-0-b-2) | Telecommand Part 3 -- Data Management Service, Blue Book | Issue 2 June 2001 | normative |
| CCSDS 301.0-B-2 | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | Time Code Format, Blue Book | Issue 2 April 1990 | normative |
| CCSDS 727.0-R-5 | [CCSDS 727.0-R-5](../references/index.md#ref-ccsds-727-0-r-5) | CCSDS File Delivery Protocol (CFDP), Red Book | Issue 5 August 2001 | normative |
| [1] | [CCSDS 100.0-G-1](../references/index.md#ref-ccsds-100-0-g-1) | Telemetry: Summary of Concept and Rationale, Green Book | December 1987 | bibliography |
| [2] | [CCSDS 200.0-G-6](../references/index.md#ref-ccsds-200-0-g-6) | Telecommand: Summary of Concept and Rationale, Green Book | January 1987 | bibliography |
| [3] | [catalogue](../references/index.md#ref-j-g-fletcher-an-arithmetic-checksum-for-serial-transmission-ieee-transaction-on-) | J.G. Fletcher, An Arithmetic Checksum for Serial Transmission, IEEE Transaction on Communication, Vol. COM- 30, No.1 | January 1982 | bibliography |
| [4] | [ISO 8473-1:1998](../references/index.md#ref-iso-8473-1-1998) | Information Technology - Protocol for Providing the Connectionless-Mode Network Service: Protocol specification second edition | second edition 1998 | bibliography |
| [5] | [ISO 8824](../references/index.md#ref-iso-8824) | Information Technology - Abstract Syntax Notation One (ASN.1) |  | bibliography |
| [6] | [ISO 8825](../references/index.md#ref-iso-8825) | Information Technology – Open Systems Interconnection - Specification of Basic Encoding Rules for Abstract Syntax Notation One (ASN.1) |  | bibliography |
| [7] | [IEEE 754:1985](../references/index.md#ref-ieee-754-1985) | Standard for Binary Floating-Point Arithmetic, IEEE Computer Society Document R(1991) | 1985 | bibliography |
| [8] | [MIL-STD-1750a](../references/index.md#ref-mil-std-1750a) | Military Standard Sixteen-Bit Computer Instruction Set Architecture | 2nd July 1980 | bibliography |
| [9] | [ANSI X3.4](../references/index.md#ref-ansi-x3-4) | Information Systems -- Coded Character Sets – 7-Bit American National Standard Code for Information Interchange (7-bit ASCII), American National Standards Institute | 1986 | bibliography |
| [10] | [ITU-T V.41](../references/index.md#ref-itu-t-v-41) | Code-Independent Error Control System – Data Communication over the Telephone Network (before renaming known as Information Technology - CCITT V.41) | 1989 | bibliography |
| [11] | [ECSS-M-00-02](../references/index.md#ref-ecss-m-00-02) | Space project management – Tailoring of space standards |  | bibliography |
|  | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | Packet Telemetry Standard (source of Annex C text) | Issue 1 January 1998 | mentioned |
|  | [ESA PSS-04-151](../references/index.md#ref-esa-pss-04-151) · [library](esa-pss-04-151-issue1-september1992.md) | Telecommand decoder specification (source of Annex D text) | Issue 1 September 1993 | mentioned |
|  | [catalogue](../references/index.md#ref-esa-pus-earlier-esa-packet-utilization-standard-pus-version-0) | ESA PUS (earlier ESA Packet Utilization Standard, PUS version 0) |  | mentioned |
|  | [ECSS-M-00-02A](../references/index.md#ref-ecss-m-00-02a) | ECSS-M-00-02A, clause 3 (definition of tailoring) | A | mentioned |

!!! note "Notes"
    This copy comes from an INAF Redmine attachment (redmine.oas.inaf.it), not from ecss.nl. The text extraction doubles hyphens in identifiers ('ECSS--E--70--41A', 'CCSDS 203.0--B--2'), so regex searches must allow for '--'. Printed page numbers equal PDF page numbers; PDF page 229 is blank, so srcgrep shows 229 pages while the registry gives 228. Pages 4, 6, 16, 226 and 228 are intentionally blank, and PDF page 227 is an ECSS Document Improvement Proposal form with Secretariat contact details (not reproduced here). Annex C says its text was transcribed from 'ESA PSS-04-106 Packet Telemetry Standard, Issue 1, January 1998' (p. 217), whereas ECSS-E-ST-50-03C dates that standard January 1988. The P-field table in C.2 prints '00100111' twice, where the seventh value should be '00100110' (p. 218). The normative reference ECSS-E-50 is footnoted 'To be published' (p. 15). Bit-field figures 3 and 4 extract as scrambled text (pp. 42, 46). Annex A opens with a stray 'A--A--' artefact (p. 207). The table of contents spells 'telemetr y' in Table 1 (p. 11).

