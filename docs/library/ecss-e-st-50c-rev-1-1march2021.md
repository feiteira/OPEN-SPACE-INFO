---
title: "ECSS-E-ST-50C Rev.1 Communications"
description: "The top-level ECSS standard for space communications."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50c-rev-1-1march2021]
---

# Space engineering
Communications

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50C Rev.1</dd><dt>Issue / version</dt><dd>Second issue, Revision 1</dd><dt>Date</dt><dd>2021-03-01</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS-E-ST-50C Revision Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-50C Revision Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue, Revision 1, dated 1 March 2021. It revises ECSS-E-ST-50C of 31 July 2008, which followed ECSS-E-50 Part 1A (20 October 2003) and Part 2A (4 July 2005); ECSS-E-ST-50B was never issued (change log, p. 3). Changes from the 2008 issue are shown with revision tracking. Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>89</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2021/03/ECSS-E-ST-50C-Rev.1(1March2021).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2021/03/ECSS-E-ST-50C-Rev.1(1March2021).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:08Z</dd><dt>SHA-256</dt><dd><code>50f1a580a3592e04501d44b9b25365e16b3682e8d3a9335cdafba8ce88c5b700</code></dd><dt>Size</dt><dd>1.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50C-Rev.1-1March2021.pdf">ECSS-E-ST-50C-Rev.1-1March2021.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The top-level ECSS standard for **space communications**. It covers the end-to-end data communication system between spacecraft, ground stations and control centres, and between spacecraft. It is mainly a *process* standard, framed within ECSS-E-ST-10 systems engineering. It defines the terminology and the engineering activities, and sets top-level functional and performance requirements. The protocol details are left to Level-3 ECSS standards, to the ECSS Adoption Notices of CCSDS books (ECSS-E-AS-50-21 to -26) and to CCSDS standards directly. The ground segment itself is left to ECSS-E-ST-70.

Clause 4 explains the principles: the three domains (space network, space link and ground network), the communication engineering activities and review milestones (SRR to FRR), and spacecraft-control considerations such as commanding in the blind. Its Figure 4-2 maps CCSDS and Internet protocols onto the OSI layers, and a table shows which adoption notice supersedes which part of ECSS-E-ST-50-01/-03/-04.

Clause 5 holds the numbered requirements:

* **telecommanding**: in-sequence delivery, an erroneous-TC acceptance probability below 10^-2/N, hardware-decoded essential telecommands, authentication and encryption, TC destination identification;
* **telemetry**: essential telemetry, source identification, time-stamping, authentication and encryption;
* **space link**: uplink BER of 10^-5, frame rejection and undetected-error targets, ITU frequency filing before SRR, identifiers, error detection, ARQ verification, guaranteed and expedited delivery, time correlation, ranging/Doppler, TC receipt confirmation, exception reporting;
* **on-board and inter-spacecraft networks** and the **ground network**.

Normative Annexes A to H define the eight communication-system DRDs (CSRD, CSBD, CSAD, CSVP, CSADD, CSDDD, CSPD and CSOM), and Annex I maps them to project reviews.


## Key points

- The standard covers space-ground and space-to-space links and the AIT links to the spacecraft; it details the space link and space network domains and covers the ground network only as needed for end-to-end services (other ground aspects are in ECSS-E-ST-70). *(PDF p. 9)*
- For control operations the objective is guaranteed, in-order delivery of commands (commands may be repeated, never lost); for payload data the goal is to move as much data as possible, accepting some loss. *(PDF p. 16)*
- Table in clause 4.2: ECSS-E-AS-50-21 (CCSDS 131.0-B-3) supersedes ECSS-E-ST-50-01C; -22 (132.0-B-2) the TM Transfer Frame of ECSS-E-ST-50-03C; -23 (732.0-B-3) adds AOS; -24 (231.0-B-3), -25 (232.0-B-3) and -26 (232.1-B-2) replace clauses 8-9, 5-6 and 7 of ECSS-E-ST-50-04C. *(PDF p. 20)*
- Figure 4-2 places CCSDS and Internet protocols on the OSI layers (CFDP, BP/LTP, IP over CCSDS, Space Packet and Encapsulation, TC/TM/AOS/USLP/Proximity-1 data links, coding sublayers, RF) and cites ECSS-E-ST-70-41C as an example of an application-specific source/sink. *(PDF p. 21)*
- The communication engineering milestones are SRR, PDR, CDR, QR, AR, ORR and FRR, following the ECSS-E-ST-10 process. *(PDF p. 27)*
- A service guaranteeing in-sequence delivery of telecommands is required (5.4.2), and the probability of accepting an erroneous telecommand must be below 10^-2/N, N being the number of TCs expected over the mission (5.4.3). *(PDF p. 37)*
- Essential telecommands must be decodable and distributed even when all other systems, including the CDMU, are non-operational; for critical operations they must not depend on software, and their list is agreed at PDR. *(PDF p. 37)*
- TC encryption is required when authentication alone cannot meet the security requirements; SDLS in ECSS-E-AS-50-25 is cited as a data-link option. *(PDF p. 38)*
- New in Rev.1: hot-redundant TC chains must avoid repeatedly selecting the channel with lower signal quality (dual-lock issue, see ECSS-E-HB-50 clause 4.4.5.2), and all telecommands must carry a destination spacecraft identifier. *(PDF p. 39)*
- All telemetry must carry a source spacecraft identifier and be time-stamped against a common on-board reference time; telemetry-in-the-blind must be supported. *(PDF p. 40)*
- Uplink budgets assume a BER of 10^-5 at the TC decoder input; at that BER the uplink frame rejection rate for 256-octet frames must be below 10^-5. *(PDF p. 45)*
- With BCH coding, the probability of undetected uplink frame error can be below 10^-18 with frame error control and below 10^-8 without; downlink frame rejection should be below 10^-5 and acceptance of corrupted maximum-size frames below 10^-12. *(PDF p. 46)*
- An application for frequency assignment must be made to the ITU Radiocommunication Bureau before SRR. *(PDF p. 47)*
- Space link frames must identify the spacecraft and link; data units must carry a source/destination identifier and a sequence identifier, and the protocol must include error detection. *(PDF p. 48)*
- The space link must provide guaranteed and expedited delivery, time correlation of on-board time with ground time, ranging and/or Doppler tracking, TC receipt confirmation at the space network gateway, and exception reporting. *(PDF p. 50)*
- Eight DRDs are defined (CSRD, CSBD, CSAD, CSVP, CSADD, CSDDD, CSPD, CSOM). The CSPD records frequency, protocol, address, channel and SCID assignments and is the formal statement of compliance to ECSS-E-50. *(PDF p. 88)*


## Cited by these wiki pages (17)

- [AOS Space Data Link Protocol (CCSDS 732.0-B-4)](../ccsds/aos.md)
- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Encapsulation Packet Protocol (CCSDS 133.1-B-3)](../ccsds/encapsulation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Data Link Security (CCSDS 355.0-B-2)](../ccsds/sdls.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TC synchronization and channel coding: the CLTU (CCSDS 231.0-B-4)](../ccsds/tc-coding-cltu.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Unified Space Data Link Protocol (CCSDS 732.1-B-3)](../ccsds/uslp.md)


??? abstract "Contents (49 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 8 |
    | 1 | Scope | 9 |
    | 2 | Normative references | 10 |
    | 3 | Terms, definitions and abbreviated terms | 11 |
    | 3.1 | Terms defined in other standards | 11 |
    | 3.2 | Terms specific to the present standard | 11 |
    | 3.3 | Abbreviated terms | 14 |
    | 4 | Space communications engineering principles | 16 |
    | 4.1 | Context | 16 |
    | 4.2 | Overall space communication | 17 |
    | 4.3 | Space communication domains | 22 |
    | 4.4 | Communications engineering process | 25 |
    | 4.5 | Relationship with other standards | 27 |
    | 4.6 | &lt;&lt;deleted&gt;&gt; | 28 |
    | 4.7 | Spacecraft control considerations | 28 |
    | 5 | Requirements | 29 |
    | 5.1 | Introduction | 29 |
    | 5.2 | Space communication system engineering process | 29 |
    | 5.2.1 | Requirements engineering | 29 |
    | 5.2.2 | Analysis | 30 |
    | 5.2.3 | Design and configuration | 31 |
    | 5.2.4 | Implementation | 32 |
    | 5.2.5 | Verification | 34 |
    | 5.2.6 | Operations | 35 |
    | 5.3 | Space communication system | 36 |
    | 5.4 | Telecommanding | 37 |
    | 5.5 | Telemetry | 39 |
    | 5.6 | Space link | 42 |
    | 5.6.11 | Space link performance | 44 |
    | 5.6.12 | Space link frequency | 47 |
    | 5.6.13 | Space link protocol | 48 |
    | 5.6.14 | Space link service | 49 |
    | 5.7 | Space network | 52 |
    | 5.7.1 | On-board network | 52 |
    | 5.7.2 | On-board network services | 53 |
    | 5.7.3 | Inter-spacecraft network | 54 |
    | 5.7.4 | Inter-spacecraft network services | 55 |
    | 5.8 | Ground network | 56 |
    | Annex A | Communication system requirements document (CSRD) - DRD (normative) | 58 |
    | Annex B | Communication system baseline definition (CSBD) - DRD (normative) | 63 |
    | Annex C | Communication system analysis document (CSAD) - DRD (normative) | 69 |
    | Annex D | Communication system verification plan (CSVP) - DRD (normative) | 72 |
    | Annex E | Communication system architectural design document (CSADD) - DRD (normative) | 75 |
    | Annex F | Communication system detailed design document (CSDDD) - DRD (normative) | 78 |
    | Annex G | Communication system profile document (CSPD) - DRD (normative) | 81 |
    | Annex H | Communication system operations manual (CSOM) - DRD (normative) | 83 |
    | Annex I | Documentation summary (informative) | 86 |
    |  | Bibliography | 89 |


## Documents this one references (54)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system — Glossary of terms |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-10 | [ECSS-E-ST-10](../references/index.md#ref-ecss-e-st-10) | Space engineering – System engineering general requirements |  | bibliography |
| ECSS-E-ST-10-02 | [ECSS-E-ST-10-02](../references/index.md#ref-ecss-e-st-10-02) | Space engineering – Verification |  | bibliography |
| ECSS-E-HB-50 | [ECSS-E-HB-50](../references/index.md#ref-ecss-e-hb-50) | Space engineering – Communications guidelines |  | bibliography |
| ECSS-E-ST-50-05 | [ECSS-E-ST-50-05](../references/index.md#ref-ecss-e-st-50-05) | Space engineering – Radio frequency and modulation |  | bibliography |
| ECSS-E-AS-50-21 | [ECSS-E-AS-50-21](../references/index.md#ref-ecss-e-as-50-21) | Space engineering – ECSS Adoption Notice of CCSDS 131.0-B-3 (Sept. 2017) - TM Synchronization and Channel Coding |  | bibliography |
| ECSS-E-AS-50-22 | [ECSS-E-AS-50-22](../references/index.md#ref-ecss-e-as-50-22) | Space engineering – ECSS Adoption Notice of CCSDS 132.0-B-2 (Sept. 2015) - TM Space Data Link Protocol |  | bibliography |
| ECSS-E-AS-50-23 | [ECSS-E-AS-50-23](../references/index.md#ref-ecss-e-as-50-23) | Space engineering – ECSS Adoption Notice of CCSDS 732.0-B-3 (August 2016) - AOS Space Data Link Protocol |  | bibliography |
| ECSS-E-AS-50-24 | [ECSS-E-AS-50-24](../references/index.md#ref-ecss-e-as-50-24) | Space engineering – ECSS Adoption Notice of CCSDS 231.0-B-3 (Sept. 2017) - TC Synchronization and Channel Coding |  | bibliography |
| ECSS-E-AS-50-25 | [ECSS-E-AS-50-25](../references/index.md#ref-ecss-e-as-50-25) | Space engineering – ECSS Adoption Notice of CCSDS 232.0-B-3 (Sept. 2015) - TC Space Data Link Protocol |  | bibliography |
| ECSS-E-AS-50-26 | [ECSS-E-AS-50-26](../references/index.md#ref-ecss-e-as-50-26) | Space engineering – ECSS Adoption Notice of CCSDS 232.1-B-2 (Sept. 2010) - Communications Operation Procedure-1 |  | bibliography |
| ECSS-E-ST-70 | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering – Ground systems and operations |  | bibliography |
| ECSS-M-ST-10 | [ECSS-M-ST-10](../references/index.md#ref-ecss-m-st-10) | Space project management – Project planning and implementation |  | bibliography |
| ECSS-M-ST-40 | [ECSS-M-ST-40](../references/index.md#ref-ecss-m-st-40) | Space project management – Configuration and information management |  | bibliography |
| CCSDS 734.1-B-1 | [CCSDS 734.1-B-1](../references/index.md#ref-ccsds-734-1-b-1) | Licklider Transmission Protocol (LTP) for CCSDS | May 2015 | bibliography |
| CCSDS 734.2-B-1 | [CCSDS 734.2-B-1](../references/index.md#ref-ccsds-734-2-b-1) | CCSDS Bundle Protocol Specification | September 2015 | bibliography |
| ISO 7498:1984 | [ISO 7498:1984](../references/index.md#ref-iso-7498-1984) | ISO Information processing systems – Open systems interconnection — Basic reference model | 1984 | bibliography |
|  | [ECSS-E-ST-20](../references/index.md#ref-ecss-e-st-20) | ECSS-E-ST-20 (source of the term 'essential function') |  | mentioned |
|  | [ECSS-E-ST-70-11](../references/index.md#ref-ecss-e-st-70-11) | ECSS-E-ST-70-11 (source of the terms vital function, high priority command/telemetry, vital telecommand) |  | mentioned |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) | ECSS-E-ST-50-01C (superseded by ECSS-E-AS-50-21) | 31 July 2008 | mentioned |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | ECSS-E-ST-50-03C (TM Transfer Frame topic superseded by ECSS-E-AS-50-22) | 31 July 2008 | mentioned |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) | ECSS-E-ST-50-04C (superseded by ECSS-E-AS-50-24, -25 and -26) | 31 July 2008 | mentioned |
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | Telemetry and telecommand packet utilization (example of an application-specific source/sink in Figure 4-2) |  | mentioned |
|  | [CCSDS 727.0-B](../references/index.md#ref-ccsds-727-0-b) | CCSDS File Delivery Protocol (CFDP) |  | mentioned |
|  | [CCSDS 121.0-B](../references/index.md#ref-ccsds-121-0-b) | Lossless Data Compression |  | mentioned |
|  | [CCSDS 122.0-B](../references/index.md#ref-ccsds-122-0-b) | Image Data Compression |  | mentioned |
|  | [CCSDS 122.1-B](../references/index.md#ref-ccsds-122-1-b) | Image Data Compression (second entry in Figure 4-2) |  | mentioned |
|  | [CCSDS 123.0-B](../references/index.md#ref-ccsds-123-0-b) | Lossless Multi & Hyper spectral Image Compression |  | mentioned |
|  | [CCSDS 702.1-B](../references/index.md#ref-ccsds-702-1-b) | IP over CCSDS |  | mentioned |
|  | [CCSDS 133.0-B](../references/index.md#ref-ccsds-133-0-b) | Space Packet Protocol |  | mentioned |
|  | [CCSDS 133.1-B](../references/index.md#ref-ccsds-133-1-b) | Encapsulation Service / Encapsulation Packet |  | mentioned |
|  | [CCSDS 232.0-B](../references/index.md#ref-ccsds-232-0-b) | TC Space Data Link Protocol |  | mentioned |
|  | [CCSDS 132.0-B](../references/index.md#ref-ccsds-132-0-b) | TM Space Data Link Protocol |  | mentioned |
|  | [CCSDS 732.0-B](../references/index.md#ref-ccsds-732-0-b) | AOS Data Link Protocol |  | mentioned |
|  | [CCSDS 732.1-B](../references/index.md#ref-ccsds-732-1-b) | USLP |  | mentioned |
|  | [CCSDS 211.0-B](../references/index.md#ref-ccsds-211-0-b) | Proximity-1 Protocol (Data Link Layer) |  | mentioned |
|  | [CCSDS 231.0-B](../references/index.md#ref-ccsds-231-0-b) | TC Synch. and Channel Coding |  | mentioned |
|  | [CCSDS 131.0-B](../references/index.md#ref-ccsds-131-0-b) | TM Synch. and Channel Coding |  | mentioned |
|  | [CCSDS 211.2-B](../references/index.md#ref-ccsds-211-2-b) | Proximity-1 Channel Coding & Sync. Layer |  | mentioned |
|  | [CCSDS 131.3-B](../references/index.md#ref-ccsds-131-3-b) | CCSDS Space Data Link Protocols over ETSI DVB-S2 standard |  | mentioned |
|  | [CCSDS 131.2-B](../references/index.md#ref-ccsds-131-2-b) | Flexible advanced coding and modulation scheme for high rate TM applications (SCCC) |  | mentioned |
|  | [CCSDS 211.1-B](../references/index.md#ref-ccsds-211-1-b) | Proximity-1 Physical Layer |  | mentioned |
|  | [CCSDS 355.0-B](../references/index.md#ref-ccsds-355-0-b) | Space Data Link Security Protocol (optional) |  | mentioned |
|  | [CCSDS 734.5-B](../references/index.md#ref-ccsds-734-5-b) | Bundle Security Protocol (BSP) (under development) |  | mentioned |
|  | [CCSDS 401.0-B](../references/index.md#ref-ccsds-401-0-b) | CCSDS Physical Layer standard |  | mentioned |
|  | [CCSDS 141.0-B](../references/index.md#ref-ccsds-141-0-b) | Optical Communications Physical Layer |  | mentioned |
|  | [CCSDS 142.0-B](../references/index.md#ref-ccsds-142-0-b) | Optical Communications Coding and Synchronization |  | mentioned |
|  | [RFC-793](../references/index.md#ref-rfc-793) | TCP |  | mentioned |
|  | [RFC-768](../references/index.md#ref-rfc-768) | UDP |  | mentioned |
|  | [RFC-791](../references/index.md#ref-rfc-791) | IP version 4 |  | mentioned |
|  | [RFC-4301](../references/index.md#ref-rfc-4301) | IP Sec |  | mentioned |
|  | [RFC-1883](../references/index.md#ref-rfc-1883) | IP version 6 |  | mentioned |
|  | [ECSS-E-ST-50-02](../references/index.md#ref-ecss-e-st-50-02) | Ranging and Doppler tracking |  | mentioned |

!!! note "Notes"
    Printed page numbers equal PDF page numbers, and PDF page 90 is blank (the registry gives 89 pages). Figure 4-2 is a diagram whose labels are extracted as jumbled text (p. 21). The 'mentioned' entries above come from the figure and running text, not from a reference list. The change log lists two 'Annex F' updates, the second carrying the CSPD title, which is actually Annex G (p. 3). Clause 4.3.2 is still headed 'Space network' although the change log says the term was replaced by 'on-board network' (p. 22). The bibliography cites the 2021 adoption notices with their 2021 CCSDS base issues (131.0-B-3, 132.0-B-2, 732.0-B-3, 231.0-B-3, 232.0-B-3, 232.1-B-2), not the later Rev.1 notices. Annex I opens with a stray 'A-A-' artefact (p. 86). The Figure 4-2 note contains the typo 'axample' (p. 21).

