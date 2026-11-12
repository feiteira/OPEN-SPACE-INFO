---
title: "Packet Utilisation Definitions for XMM (Nye)"
description: "An eight-page ESOC paper, scanned in the NASA Technical Reports Server, on how the XMM (X-ray Multi-Mirror) project chose which parts of the draft ESA Packet Utilisation Standard (PUS) to implement."
tags: ["Paper", "Mission data delivery documents"]
sources: [ntrs-19950011181-xmm-packet-utilisation]
---

# Packet Utilisation Definitions for the ESA XMM Mission

<dl class="osi-meta"><dt>Document ID</dt><dd>NTRS 19950011181 (N95-17596)</dd><dt>Organisation</dt><dd>European Space Operations Centre (ESOC), ESA</dd><dt>Authors</dt><dd>H. R. Nye</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Historical conference paper written before launch (XMM is described as due for launch on Ariane 5 at the end of 1999) and while the ESA Packet Utilisation Standard (PSS-07-101) was 'not yet approved' (reference 3, PDF p. 6). The service type numbers it uses are the XMM pre-PUS 'missionisation' and do not match the later PSS-07-101 or ECSS-E-70-41 numbering.</dd><dt>Pages</dt><dd>8</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ntrs.nasa.gov/api/citations/19950011181/downloads/19950011181.pdf" rel="noopener">https://ntrs.nasa.gov/api/citations/19950011181/downloads/19950011181.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:12Z</dd><dt>SHA-256</dt><dd><code>d924d671e8ec5e816d43e3a150ace201719477a5e083f9b0f01288474f969806</code></dd><dt>Size</dt><dd>524.5 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/ntrs-19950011181-xmm-packet-utilisation.pdf">ntrs-19950011181-xmm-packet-utilisation.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An eight-page ESOC paper, scanned in the NASA Technical Reports Server, on how the XMM (X-ray Multi-Mirror) project chose which parts of the draft ESA Packet Utilisation Standard (PUS) to implement. The author calls this selection and tailoring of PUS services and packet structures to a mission 'missionisation'. XMM was to be the first ESA science spacecraft to use the ESA packet telemetry and telecommand standards and the first ESOC science mission on the new object-oriented, distributed flight control system infrastructure.

The paper first sets out the operations concept: real-time control from ESOC through a single ground station with up to 22 hours of contact per day, no bulk on-board storage of science or housekeeping data, and safety during non-contact periods handled by time-tagged commands, limited on-board monitoring and a history of on-board events. It then lists the selected services in three groups. On-line control covers periodic housekeeping, device commands, TC verification, non-periodic event reports, task management and science telemetry. Safety management covers time-tag commands, on-board monitoring of up to 30 parameters and storage of non-periodic packets. Operations maintenance covers memory maintenance, telemetry management, telemetry definition and test commands. For each service it gives the subtypes.

The closing figures show the TM source packet and TC packet headers of the ESA packet standards and the XMM data field headers, which are only partly legible in the scan. For an engineer it is an early, concrete example of PUS tailoring, and it shows service numbering from before the PUS was approved.


## Key points

- XMM was to be the first ESA scientific spacecraft to implement the ESA packet telecommand and telemetry standards, and the first ESOC-controlled science mission to use the new object-oriented, distributed flight control system infrastructure due for deployment in 1995. *(PDF p. 1)*
- The paper defines 'missionisation' as selecting services from the PUS and tailoring the related packet structures to the needs of a particular mission. *(PDF p. 2)*
- XMM operations concept: real-time control from ESOC via a single ground station with up to 22 hours of contact per day; all science and housekeeping data transmitted in real time, with no bulk storage on board. *(PDF p. 2)*
- Safety during non-contact periods relies on time-tagged commands, a low degree of on-board monitoring and a history of on-board events. *(PDF p. 2)*
- The PUS reserves two fixed fields in the data field header for packet type and packet subtype, so that every packet is identifiable by its function and required processing. *(PDF p. 3)*
- XMM numbering: periodic housekeeping is TM Type 1, device commands TC Type 2 (pulse subtype 1, register load subtype 2), TC verification TM Type 3 (subtypes 1 to 4 for acceptance and execution success or failure), non-periodic telemetry TM Type 4 (event, exception and major anomaly reports). *(PDF p. 3)*
- Task management is TC Type 5 (start, stop, load task parameters, mode transition) and science telemetry is TM Type 15. *(PDF p. 4)*
- Time-tag commands are TC and TM Type 7, with six subtypes from loading a command into the time-tag buffer to deleting all commands; on-board monitoring is TC and TM Type 8 and covers at most 30 parameters. *(PDF p. 4)*
- Non-periodic packet storage (TC Type 11) keeps TC verification, event, exception and major anomaly reports in a cyclic buffer for retrieval after non-coverage periods. *(PDF p. 5)*
- Operations maintenance uses memory maintenance (Type 6: load, dump, checksum), telemetry management (Type 9: enable or disable generation of all or specific TM packets), telemetry definition (Type 10: define new housekeeping packets for satellite systems only) and test commands (TC Type 13). *(PDF p. 5)*
- Missionisation ends with expanding each packet type and subtype down to field level (purpose, length and format agreed between satellite and ground developers), documented in the XMM Packet Structure Definition (RS-PX-0032). *(PDF p. 5)*
- The TM source packet header is shown as 48 bits: version number 3, type 1, data field header flag 1, application process ID 11, segmentation flags 2, source sequence count 14, followed by a 16-bit packet length. *(PDF p. 7)*


## Cited by these wiki pages (4)

- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (15 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 1 |
    |  | Introduction | 1 |
    |  | XMM Operations Concept | 2 |
    |  | XMM Flight Control Systems | 2 |
    |  | XMM Services | 3 |
    |  | 1) On-line Control | 3 |
    |  | 2) Safety Management | 4 |
    |  | 3) Operations Maintenance | 5 |
    |  | Data Structures | 5 |
    |  | Conclusion | 6 |
    |  | References | 6 |
    |  | Figure 1. Telemetry Source Packet Fields (from Ref 1) | 7 |
    |  | Figure 2. Telemetry Packet: Data Field Header (from Ref 5) | 7 |
    |  | Figure 3. Telecommand Packet Fields (From Ref 2) | 8 |
    |  | Figure 4. Telecommand Packet: Data Field Header (from Ref 5) | 8 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| 1 | [PSS-04-106](../references/index.md#ref-pss-04-106) | ESA Packet Telemetry Standard | Issue 1 January 1988 | bibliography |
| 2 | [PSS-04-107](../references/index.md#ref-pss-04-107) | ESA Packet Telecommand Standard | Issue 2 April 1992 | bibliography |
| 3 | [PSS-07-101](../references/index.md#ref-pss-07-101) | ESA Packet Utilisation Standard | not yet approved | bibliography |
| 4 | [RS-PX-0028](../references/index.md#ref-rs-px-0028) | XMM Operations Interface Requirements Document | Issue 2a March 1994 | bibliography |
| 5 | [RS-PX-0032](../references/index.md#ref-rs-px-0032) | XMM Packet Structure Definition | Issue 2 1994-06-29 | bibliography |

!!! note "Notes"
    Poor OCR of a scanned two-column conference paper: columns are interleaved in the text layer, and the data field header diagrams (Figures 2 and 4) are unreadable noise. The printed proceedings page numbers are 1235 to 1242, but the proceedings volume and date are not printed on the scanned pages. The NTRS accession number N95-17596 appears on PDF p. 1. The PDF has 8 pages; the text extraction shows a ninth, empty page. References 1, 2 and 3 are in the library as esa-pss-04-106-issue1-january1988, esa-pss-04-107-issue2-april1992 and (in its approved form) esa-pss-07-101-issue1-may1994. A companion ESOC paper on the PUS itself is in the library as ntrs-19950011180-esa-pus-paper.

