---
title: "The ESA Packet Utilisation Standard (PUS) paper"
description: "A short ESOC conference paper that introduces the newly approved ESA Packet Utilisation Standard (PUS), ESA PSS-07-101, which ECSS-E-ST-70-41C still lists in its bibliography."
tags: ["Paper", "ECSS standards"]
sources: [ntrs-19950011180-esa-pus-paper]
---

# THE ESA STANDARD FOR TELEMETRY &amp; TELECOMMAND PACKET UTILISATION P.U.S.

<dl class="osi-meta"><dt>Document ID</dt><dd>N95-17595</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (Darmstadt)</dd><dt>Authors</dt><dd>J.-F. Kaufeler</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Historical conference paper. It describes the PUS as approved by the ESA Inspector General after a review during 1993, and therefore an Agency standard, and expects it to evolve incrementally (PDF p. 6). It cites the PUS as ESA PSS-07-101 Issue 1, May 1994 (PDF p. 6).</dd><dt>Pages</dt><dd>6</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ntrs.nasa.gov/api/citations/19950011180/downloads/19950011180.pdf" rel="noopener">https://ntrs.nasa.gov/api/citations/19950011180/downloads/19950011180.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:09Z</dd><dt>SHA-256</dt><dd><code>99a23beaa706966258e77dde43e69ee315c8419fced0579c6960834ed4466a79</code></dd><dt>Size</dt><dd>456.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ntrs-19950011180-esa-pus-paper.pdf">ntrs-19950011180-esa-pus-paper.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short ESOC conference paper that introduces the newly approved **ESA Packet Utilisation Standard (PUS)**, ESA PSS-07-101, which ECSS-E-ST-70-41C still lists in its bibliography. It explains why the standard was needed. The ESA packet telemetry and telecommand standards (PSS-04-106 and PSS-04-107, derived from CCSDS) carry packets end to end between ground applications and on-board Application Processes identified by an APID, but they leave the internal structure and content of packets open. The ESA Committee for Operations and EGSE Standards (**COES**), set up in 1987 to define a monitoring and control system common to satellite checkout (EGSE) and mission control, therefore first had to define how packets are used.

The paper describes:

* what the PUS contains: operational requirements for nominal and contingency operations, a fixed **packet data field header** with **Service Type** and **Service Subtype** (values 0-127 reserved for the PUS, 128-255 mission-specific, and an optional time field in telemetry), the service specifications with their service data units, and parameter encoding types;
* the **17 standard services** of that time, from Telecommand Verification (1) through Device Command Distribution, Housekeeping & Diagnostic, Statistics, Events, Memory, Task and Function Management, Time, On-Board Scheduling, On-board Monitoring, Large Data Transfer, Packet Transmission Control, Storage and Retrieval and On-Board Traffic Management to Test (17), with a paragraph on each;
* **mission tailoring**: missions implement subsets of services, omit 'mission-optional' fields that belong to unused capability sets, and fix encoding lengths at mission level;
* validation with the **PUSV** prototype and the **PUSSAT** reference satellite model (1992), and the plan for ESOC's **SCOS-II** to give full application-level support to PUS missions.

It is useful for the history of the PUS and for comparing the early service set, which still included Task Management, a separate Time Packet service and On-Board Traffic Management, with PUS-A and PUS-C.


## Key points

- ESA's packet telemetry and telecommand standards, derived from CCSDS recommendations, cover end-to-end transfer between ground applications and on-board Application Processes but leave open the internal structure and content of packets; the PUS addresses this. *(PDF p. 1)*
- An Application Process is a logical on-board entity that generates TM packets and receives TC packets, uniquely identified by an Application ID used for the end-to-end connection with the ground. *(PDF p. 1)*
- The production of the PUS was the responsibility of the ESA Committee for Operations and EGSE Standards (COES), set up in 1987 to define functions common to satellite checkout (EGSE) and satellite control systems. *(PDF p. 2)*
- The PUS contains operational requirements, standards for the secondary data header of TM and TC packets, a set of PUS Services (on-board service model plus full definition of the service data units), and standards for data structures and parameter encoding types. *(PDF p. 2)*
- The Packet Data Field Header carries the Service Type and Service Subtype; up to 256 services and 256 subtypes per service, with 0-127 reserved for the PUS and 128-255 mission-specific. The TM and TC headers are identical except that a TM packet may carry an optional time field. *(PDF p. 3)*
- The header version number allows future versions, for example packets with multiple Service Data Units as proposed by NASA/JPL for deep-space missions. *(PDF p. 3)*
- 17 PUS Services were then defined: 1 Telecommand Verification, 2 Device Command Distribution, 3 Housekeeping & Diagnostic Data Reporting, 4 Statistical Data Reporting, 5 Event Reporting, 6 Memory Management, 7 Task Management, 8 Function Management, 9 Time Management, 10 Time Packet, 11 On-Board Scheduling, 12 On-board Monitoring, 13 Large Data Transfer, 14 Packet Transmission Control, 15 On-Board Storage and Retrieval, 16 On-Board Traffic Management, 17 Test. *(PDF p. 3)*
- No PUS service is mandatory, but all Application Processes are expected to implement Telecommand Verification; verification can cover acceptance, start, intermediate stages and completion, selectable per command, with positive and/or negative acknowledgements. *(PDF p. 4)*
- Device Command Distribution has three sub-services: distribution at TC Segment level (needing no software, e.g. to unblock or reset the Packet Assembly Controller), CPDU high-priority on/off pulses, and distribution by other Application Processes, e.g. over an internal bus. *(PDF p. 4)*
- Housekeeping packets can be defined or redefined in flight, and an optional event-driven mode generates a packet only when a parameter changes by more than a threshold; a diagnostic sub-service supports high sampling rates for troubleshooting. *(PDF p. 4)*
- On-Board Scheduling allows loading, deleting, reporting and controlling the release status of telecommands, time-shifting them, and interlocking a telecommand to the success or failure of an earlier one. *(PDF p. 5)*
- Large Data Transfer moves a large Service Data Unit (e.g. a file or large memory load) in a sequence of smaller packets, uplink or downlink; Storage and Retrieval may use several stores, and storing all event-driven packets gives a 'lost packet recovery' capability. *(PDF p. 5)*
- The Test service includes a standard Link Test ('Are you alive?') sub-service. *(PDF p. 5)*
- Tailoring: missions implement only the services and sub-services they need; mission-optional fields linked to unused capability sets can be omitted; the PUS specifies only the encoding type of each field, its length being fixed at mission level. *(PDF p. 6)*
- The standard was validated by the PUSV prototype on SPARC workstations with the PUSSAT reference satellite model (completed 1992) and approved by the ESA Inspector General after a review in 1993; ESOC's SCOS-II will give full application-level support to PUS missions. *(PDF p. 6)*


## Cited by these wiki pages (5)

- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (8 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 1 |
    | 1 | Introduction | 1 |
    | 2 | Scope of the PUS | 2 |
    | 3 | PUS Services | 3 |
    | 4 | Mission-Tailoring | 5 |
    | 5 | Validation | 6 |
    | 6 | Future Perspective | 6 |
    | 7 | References | 6 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| 1. | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) · [library](esa-pss-07-101-issue1-may1994.md) | Packet Utilisation Standard (PUS) | Issue 1 May 1994 | reference |
| 2. | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | Packet Telemetry Standard | Issue 1 January 1988 | reference |
| 3. | [ESA PSS-04-107](../references/index.md#ref-esa-pss-04-107) · [library](esa-pss-04-107-issue2-april1992.md) | Packet Telecommand Standard | Issue 2 April 1992 | reference |
| 4. | [CCSDS 102.0-B.2](../references/index.md#ref-ccsds-102-0-b-2) | (CCSDS) Packet Telemetry, Blue Book | B.2 January 1987 | reference |
| 5. | [CCSDS 203.0-B.1](../references/index.md#ref-ccsds-203-0-b-1) | (CCSDS) Telecommand: Part 3, Data Routing Service, Blue Book | B.1 January 1987 | reference |
| 6. | [ESA PSS-07-401](../references/index.md#ref-esa-pss-07-401) | (ESA) EGSE & Mission Control System (EMCS) Functional Requirements Specification | Issue 1, Draft 8 November 1992 | reference |

!!! note "Notes"
    Scanned NASA NTRS copy with an OCR text layer; accession number 'N95- 17595' is OCR'd at the top of PDF p. 1. Printed page numbers 1229-1234 map to PDF pp. 1-6, and the text extraction has a trailing empty page 7. The two-column layout is interleaved and PDF p. 2 begins with a line of OCR noise. OCR errors include 'i8' for service 16 in Table 1 (p. 3), 'Reportin,q', 'Mana.qement' (p. 4), 'exercase' (p. 6) and reference numbers 3, 5 and 6 OCR'd as '.', '°' and '.' (p. 6). Figure 1 (check-out/operations commonality) and Figure 2 (packet data field headers, with field widths such as 3, 1, 4, 8 and 8 bits) are garbled, so header field names and widths should be taken from the PUS itself (library: esa-pss-07-101-issue1-may1994). No date or venue is printed. The companion NTRS paper ntrs-19950011181-xmm-packet-utilisation (next record number) and the SCOS-II papers ntrs-scos2-new-generation and ntrs-scosii-ol (also by ESOC, and the former co-authored by P. Kaufeler) come from the same NTRS batch; that this volume is the SpaceOps 94 proceedings is an inference, not printed here. References 1-3 are in the library as esa-pss-07-101-issue1-may1994, esa-pss-04-106-issue1-january1988 and esa-pss-04-107-issue2-april1992.

