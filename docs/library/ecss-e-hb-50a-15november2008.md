---
title: "ECSS-E-HB-50A Communications guidelines (handbook)"
description: "The informative ECSS communications handbook, the companion to ECSS-E-ST-50 and its Level-3 data-link, coding, RF and on-board bus standards."
tags: ["Handbook", "ECSS standards"]
sources: [ecss-e-hb-50a-15november2008]
---

# Space engineering
Communications guidelines

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-HB-50A</dd><dt>Issue / version</dt><dd>First issue</dd><dt>Date</dt><dd>2008-11-15</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-HB-50 Working Group)</dd><dt>Authors</dt><dd>ECSS-E-HB-50 Working Group</dd><dt>Type</dt><dd>Handbook</dd><dt>Status</dt><dd>First issue, dated 15 November 2008 (change log, p. 3). The handbook is informative and not binding, and the ECSS standards prevail in any conflict (scope, p. 17). It describes the 2008 generation of ECSS-E-ST-50-0x standards, which were later superseded by the ECSS-E-AS-50-2x adoption notices (see ecss-e-st-50c-rev-1-1march2021, p. 20). The 2021 ECSS-E-ST-50C Rev.1 still cites ECSS-E-HB-50 in its bibliography and in requirement 5.4.9a.</dd><dt>Pages</dt><dd>261</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/handbooks/ecss-e-hb/ECSS-E-HB-50A15November2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/handbooks/ecss-e-hb/ECSS-E-HB-50A15November2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:15Z</dd><dt>SHA-256</dt><dd><code>16e0c09dd3883375cbc53c9a7ffa843d434cfc9786929df9ea924f839a056e0f</code></dd><dt>Size</dt><dd>2.6 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-HB-50A-15November2008.pdf">ECSS-E-HB-50A-15November2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The informative **ECSS communications handbook**, the companion to ECSS-E-ST-50 and its Level-3 data-link, coding, RF and on-board bus standards. It explains how the ECSS E-50 standards and the related CCSDS Recommended Standards fit together into a coherent protocol stack, evaluates issues that the standards cannot discuss, and gives guidance on option selection.

Section 3 is a primer on CCSDS document colours (Blue, Green, Magenta, Orange, Yellow, Silver), the withdrawal of ESA PSS standards, and ECSS's then-policy of re-publishing modified CCSDS books, which was being replaced by adoption notices. Tables 3-1 and 3-2 list each covered standard with its 2008 issue and date, and an OSI-layer map shows where each one sits.

Section 4 has one chapter per standard, each giving purpose, description, *differences from CCSDS*, options and recommended practice. It covers ECSS-E-ST-50, ranging/Doppler, RF and modulation (including the 'transponder dual lock' issue), TM coding, the TM transfer frame, the TC protocols (14 documented differences from CCSDS 231/232, e.g. the Packet Assembly Controller and one frame per CLTU), AOS, Proximity-1, Space Packet and Encapsulation, IPv4/IPv6, PUS (field usage and reserved APIDs 0 and 2047), CFDP, SCIDs, compression, time codes, SpaceWire, MIL-1553 and discrete interfaces.

Section 5 covers cross-cutting topics such as channel coding options, playback of recorded frames, idle data, security, interoperability and PICS. Section 6 recounts the history of CCSDS (TC/TM, AOS, Proximity-1, CFDP, DTN, SOIS) and gives applicability tables. Annexes A-F are draft **PICS proformas** for the sending and receiving ends of ECSS-E-ST-50-01, -03 and -04, and Annex G gives false-decoding probabilities for RS E=8 with 4D-8PSK-TCM. This is a good map of the European space-link protocol landscape around 2008.


## Key points

- The handbook is informative best practice and is not binding; in case of conflict the ECSS standards prevail. *(PDF p. 17)*
- The E-50 series covers the space link and space network in detail and the ground network only as needed for end-to-end services; other ground aspects belong to the ECSS E-70 series. *(PDF p. 24)*
- CCSDS publication categories: Blue Books (Recommended Standards), Green (Informational Reports), Magenta (Recommended Practices), Orange (Experimental), Yellow (Record) and Silver (Historical, with '-S' appended to the number). *(PDF p. 25)*
- ESA PSS communication standards were modified versions of CCSDS recommendations; all PSS documents have been withdrawn in favour of ECSS or CCSDS standards. *(PDF p. 25)*
- ECSS differs from CCSDS in having the ESA-developed PUS (ECSS-E-ST-70-41) as an application layer and in combining the TC protocols into the single ECSS-E-ST-50-04. Modifying CCSDS books was being phased out in favour of adoption notices. *(PDF p. 26)*
- In 2008 the covered issues were the 'C' editions of 31 July 2008 for E-ST-50, -01, -02, -03, -04, -05, -12 and -14 and 15 Nov 2008 for -13, with -11 (SpaceWire protocols) to be published; ECSS-E-ST-70-41 was issue A of 30 Jan 2003. *(PDF p. 27)*
- Other covered standards and issues: CCSDS 133.0-B-1 (Sep 2003), 133.1-B-1 (Jun 2006), 135.0-B-3 (Oct 2006), 301.0-B-3 (Jan 2002), 320.0-B-5 (Sep 2007), 727.0-B-4 (Jan 2007) and 732.0-B-2 (Jul 2006); for AOS there was no ECSS standard, only CCSDS 732.0-B. *(PDF p. 28)*
- The space link protocols are mapped onto five OSI layers (physical, data link, network, transport, application); CFDP spans transport and application, and Proximity-1 spans data link and physical. *(PDF p. 29)*
- 'Transponder dual lock': when both receivers lock, one near its threshold (about -122 dBm), telecommands can be rejected; Cryosat-2 combines both LGA signals with a 3 dB hybrid; see report TEC-ETC/2008.66/PMcM. *(PDF p. 44)*
- ECSS-E-ST-50-04 includes the optional Packet Assembly Controller, inherited from PSS, so its minimum TC segment is one octet (CCSDS: two). European hardware uses the PAC, but European missions generally do not use segmentation. *(PDF p. 69)*
- In CCSDS several TC frames may share one CLTU; in ECSS-E-ST-50-04 a CLTU contains exactly one frame, for reliability and compatibility with European hardware. *(PDF p. 69)*
- ECSS-E-ST-70-41 (2003) still calls the packets 'telemetry source packet' and 'telecommand packet' and the secondary header the 'Data Field Header'; it reserves APID 2047 (idle) and APID 0 (time), while CCSDS 135.0-B also reserves 2045-2046 and 2040-2044. *(PDF p. 95)*
- PUS makes the 16-bit Packet Error Control field mandatory on TC packets and optional (fixed per APID) on TM; it was not yet in CCSDS 133.0-B-1. *(PDF p. 95)*
- Playback of recorded TM frames by asynchronous insertion uses a dedicated VC; in forward mode recorded ASMs must use the alternative pattern 0x352EF853, and recorded CLCWs must not be processed by the real-time TC system. *(PDF p. 127)*
- Applicability guidance: ECSS-E-ST-50-05 and CCSDS 301.0-B for all missions; AOS for very large return data volumes; Proximity-1 for inter-spacecraft links; ECSS-E-ST-70-41 for all ESA missions. *(PDF p. 141)*
- For ground components the handbook points to the EGOS portal (SCOS-2000, SIMSAT, ground station systems, ESA SLE Gateway). *(PDF p. 142)*
- Annexes A-F are draft PICS proformas for the sending and receiving ends of ECSS-E-ST-50-01, ECSS-E-ST-50-03 and ECSS-E-ST-50-04. *(PDF p. 144)*
- For the R-S E=8 code (interleaving I=8) concatenated with 4D-8PSK-TCM, the false decoding probability stays below 1e-19 when the mean BER is below 1e-9 or the FER below 5e-7, which is negligible. *(PDF p. 256)*


## Cited by these wiki pages (23)

- [AOS Space Data Link Protocol (CCSDS 732.0-B-4)](../ccsds/aos.md)
- [CCSDS File Delivery Protocol (CCSDS 727.0-B-5)](../ccsds/cfdp.md)
- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Encapsulation Packet Protocol (CCSDS 133.1-B-3)](../ccsds/encapsulation.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [How it all fits together](../overview/index.md)
- [Proximity-1 Space Link Protocol (CCSDS 211.0-B-6)](../ccsds/proximity-1.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [SLE forward service: Forward Space Packet (FSP)](../ccsds/sle/fsp.md)
- [SLE over TCP/IP (ISP1) and the SLE API](../ccsds/sle/isp1-and-api.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [Space Packet Protocol (CCSDS 133.0-B-2)](../ccsds/space-packet.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TC synchronization and channel coding: the CLTU (CCSDS 231.0-B-4)](../ccsds/tc-coding-cltu.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)


??? abstract "Contents (61 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Introduction | 17 |
    | 1.1 | Purpose | 17 |
    | 1.2 | Scope | 17 |
    | 1.3 | Document structure | 17 |
    | 2 | Terms, definitions and abbreviations | 19 |
    | 2.1 | Terms and definitions from other documents | 19 |
    | 2.2 | Terms specific to the present document | 19 |
    | 2.3 | Conventions | 19 |
    | 2.4 | Abbreviated terms | 20 |
    | 3 | The E-50 series of standards | 24 |
    | 3.1 | Background | 24 |
    | 3.2 | Standards covered in this handbook | 26 |
    | 3.3 | ECSS E-50 Protocols | 29 |
    | 3.4 | End to End Aspects | 33 |
    | 4 | Standards overview | 36 |
    | 4.1 | Introduction | 36 |
    | 4.2 | E-ST-50: Communications | 36 |
    | 4.3 | E-ST-50-02: Ranging and Doppler tracking | 38 |
    | 4.4 | E-ST-50-05: Radio frequency and modulation | 41 |
    | 4.5 | E-ST-50-01: Telemetry synchronization and channel coding | 46 |
    | 4.6 | E-ST-50-03: Telemetry transfer frame protocol | 53 |
    | 4.7 | E-ST-50-04: Telecommand protocols, synchronization and channel coding | 61 |
    | 4.8 | CCSDS 732.0-B: AOS Space Data Link Protocol | 77 |
    | 4.9 | CCSDS Proximity-1 Space Link Protocol | 82 |
    | 4.10 | CCSDS Packet Protocols | 86 |
    | 4.11 | Internet Protocols | 91 |
    | 4.12 | E-ST-70-41: Telemetry and telecommand packet utilization | 94 |
    | 4.13 | CCSDS 727.0-B: CCSDS File Delivery Protocol (CFDP) | 97 |
    | 4.14 | CCSDS 135.0-B: Space Link Identifiers | 103 |
    | 4.15 | CCSDS 320.0-B: CCSDS Global Spacecraft Identification Field | 107 |
    | 4.16 | Data Compression | 109 |
    | 4.17 | CCSDS 301.0-B: Time Code Formats | 116 |
    | 4.18 | E-ST-50-12: SpaceWire. Links, nodes, routers and networks | 117 |
    | 4.19 | E-ST-50-13: MIL 1553 Standard extension | 119 |
    | 4.20 | E-ST-50-14: Spacecraft discrete interfaces | 120 |
    | 5 | Specific topics | 123 |
    | 5.1 | Introduction | 123 |
    | 5.2 | Synchronization and channel coding | 123 |
    | 5.3 | Playback of recorded data | 127 |
    | 5.4 | Idle data | 128 |
    | 5.5 | Compression | 131 |
    | 5.6 | Security | 132 |
    | 5.7 | Interoperability | 133 |
    | 5.8 | Conformance and PICS | 134 |
    | 6 | Rationale and architectures | 136 |
    | 6.1 | Evolution of space communications standards | 136 |
    | 6.2 | Guidelines | 139 |
    | 7 | Supporting components | 142 |
    | 7.1 | Introduction | 142 |
    | 7.2 | Flight components | 142 |
    | 7.3 | Ground components | 142 |
    | 7.4 | Industry | 142 |
    | Annex A | Draft PICS for ECSS-E-ST-50-01: Sending end (informative) | 144 |
    | Annex B | Draft PICS for ECSS-E-ST-50-01: Receiving end (informative) | 157 |
    | Annex C | Draft PICS for ECSS-E-ST-50-03: Sending end (informative) | 171 |
    | Annex D | Draft PICS for ECSS-E-ST-50-03: Receiving end (informative) | 189 |
    | Annex E | Draft PICS for ECSS-E-ST-50-04: Sending end (informative) | 202 |
    | Annex F | Draft PICS for ECSS-E-ST-50-04: Receiving end (informative) | 232 |
    | Annex G | False decoding probabilities for concatenated R-S E=8 with 4D-8PSK-TCM (informative) | 255 |
    |  | References | 259 |


## Documents this one references (48)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| CCSDS 120.0-G | [CCSDS 120.0-G](../references/index.md#ref-ccsds-120-0-g) | Lossless Data Compression – Informational Report |  | reference |
| CCSDS 120.1-G | [CCSDS 120.1-G](../references/index.md#ref-ccsds-120-1-g) | Image Data Compression – Informational Report |  | reference |
| CCSDS 121.0-B | [CCSDS 121.0-B](../references/index.md#ref-ccsds-121-0-b) | Lossless Data Compression |  | reference |
| CCSDS 122.0-B | [CCSDS 122.0-B](../references/index.md#ref-ccsds-122-0-b) | Image Data Compression |  | reference |
| CCSDS 130.1-G | [CCSDS 130.1-G](../references/index.md#ref-ccsds-130-1-g) | TM Synchronization and Channel Coding – Summary of Concept and Rationale |  | reference |
| CCSDS 131.0-B | [CCSDS 131.0-B](../references/index.md#ref-ccsds-131-0-b) | TM Synchronization and Channel Coding |  | reference |
| CCSDS 132.0-B | [CCSDS 132.0-B](../references/index.md#ref-ccsds-132-0-b) | TM Space Data Link Protocol |  | reference |
| CCSDS 133.0-B | [CCSDS 133.0-B](../references/index.md#ref-ccsds-133-0-b) | Space Packet Protocol |  | reference |
| CCSDS 133.1-B | [CCSDS 133.1-B](../references/index.md#ref-ccsds-133-1-b) | Encapsulation Service |  | reference |
| CCSDS 135.0-B | [CCSDS 135.0-B](../references/index.md#ref-ccsds-135-0-b) | Space Link Identifiers |  | reference |
| CCSDS 211.0-B | [CCSDS 211.0-B](../references/index.md#ref-ccsds-211-0-b) | Proximity-1 Space Link Protocol - Data Link Layer |  | reference |
| CCSDS 211.1-B | [CCSDS 211.1-B](../references/index.md#ref-ccsds-211-1-b) | Proximity-1 Space Link Protocol - Physical Layer |  | reference |
| CCSDS 211.2-B | [CCSDS 211.2-B](../references/index.md#ref-ccsds-211-2-b) | Proximity-1 Space Link Protocol - Coding and Synchronization Sublayer |  | reference |
| CCSDS 230.1-G | [CCSDS 230.1-G](../references/index.md#ref-ccsds-230-1-g) | TC Synchronization and Channel Coding – Summary of Concept and Rationale |  | reference |
| CCSDS 231.0-B | [CCSDS 231.0-B](../references/index.md#ref-ccsds-231-0-b) | TC Synchronization and Channel Coding |  | reference |
| CCSDS 232.0-B | [CCSDS 232.0-B](../references/index.md#ref-ccsds-232-0-b) | TC Space Data Link Protocol |  | reference |
| CCSDS 232.1-B | [CCSDS 232.1-B](../references/index.md#ref-ccsds-232-1-b) | Communications Operation Procedure-1 |  | reference |
| CCSDS 301.0-B | [CCSDS 301.0-B](../references/index.md#ref-ccsds-301-0-b) | Time Code Formats |  | reference |
| CCSDS 320.0-B | [CCSDS 320.0-B](../references/index.md#ref-ccsds-320-0-b) | CCSDS Global Spacecraft Identification Field: Code Assignment Control Procedures |  | reference |
| CCSDS 350.0-G | [CCSDS 350.0-G](../references/index.md#ref-ccsds-350-0-g) | The Application of CCSDS Protocols to Secure Systems |  | reference |
| CCSDS 401.0-B | [CCSDS 401.0-B](../references/index.md#ref-ccsds-401-0-b) | Radio Frequency and Modulation Systems – Part 1 Earth Stations and Spacecraft |  | reference |
| CCSDS 413.0-G | [CCSDS 413.0-G](../references/index.md#ref-ccsds-413-0-g) | Bandwidth-Efficient Modulations: Summary of Definition, Implementation and Performance |  | reference |
| CCSDS 701.0-B-3-S | [CCSDS 701.0-B-3-S](../references/index.md#ref-ccsds-701-0-b-3-s) | Advanced Orbiting Systems, Networks and Data Links: Architectural Specification [obsolete document with silver status] | Issue 3 June 2001 | reference |
| CCSDS 714.0-B | [CCSDS 714.0-B](../references/index.md#ref-ccsds-714-0-b) | Space Communications Protocol Specification (SCPS) – Transport Protocol (SCPS-TP) |  | reference |
| CCSDS 720.1-G | [CCSDS 720.1-G](../references/index.md#ref-ccsds-720-1-g) | CCSDS File Delivery Protocol (CFDP) – Part 1: Introduction and Overview |  | reference |
| CCSDS 720.2-G | [CCSDS 720.2-G](../references/index.md#ref-ccsds-720-2-g) | CCSDS File Delivery Protocol (CFDP) – Part 2: Implementers Guide |  | reference |
| CCSDS 720.3-G | [CCSDS 720.3-G](../references/index.md#ref-ccsds-720-3-g) | CCSDS File Delivery Protocol (CFDP) – Part 3: Interoperability Testing Final Report |  | reference |
| CCSDS 727.0-B | [CCSDS 727.0-B](../references/index.md#ref-ccsds-727-0-b) | CCSDS File Delivery Protocol (CFDP) |  | reference |
| CCSDS 732.0-B | [CCSDS 732.0-B](../references/index.md#ref-ccsds-732-0-b) | AOS Space Data Link Protocol |  | reference |
| CCSDS 740.0-G | [CCSDS 740.0-G](../references/index.md#ref-ccsds-740-0-g) | Mars Mission Protocol Profiles – Purpose and Rationale |  | reference |
| CCSDS 910.0-G | [CCSDS 910.0-G](../references/index.md#ref-ccsds-910-0-g) | Space Link Extension Services – Executive Summary |  | reference |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering - Communications |  | reference |
| ECSS-E-ST-50-01 | [ECSS-E-ST-50-01](../references/index.md#ref-ecss-e-st-50-01) | Space data links - Telemetry synchronization and channel coding |  | reference |
| ECSS-E-ST-50-02 | [ECSS-E-ST-50-02](../references/index.md#ref-ecss-e-st-50-02) | Ranging and Doppler tracking |  | reference |
| ECSS-E-ST-50-03 | [ECSS-E-ST-50-03](../references/index.md#ref-ecss-e-st-50-03) | Space data links - Telemetry transfer frame protocol |  | reference |
| ECSS-E-ST-50-04 | [ECSS-E-ST-50-04](../references/index.md#ref-ecss-e-st-50-04) | Space data links - Telecommand protocols, synchronization and channel coding |  | reference |
| ECSS-E-ST-50-05 | [ECSS-E-ST-50-05](../references/index.md#ref-ecss-e-st-50-05) | Radio frequency and modulation |  | reference |
| ECSS-E-ST-50-11 | [ECSS-E-ST-50-11](../references/index.md#ref-ecss-e-st-50-11) | SpaceWire RMAP protocol |  | reference |
| ECSS-E-ST-50-12 | [ECSS-E-ST-50-12](../references/index.md#ref-ecss-e-st-50-12) | SpaceWire - Links, nodes, routers and networks |  | reference |
| ECSS-E-ST-50-13 | [ECSS-E-ST-50-13](../references/index.md#ref-ecss-e-st-50-13) | MIL 1553 Standard extension |  | reference |
| ECSS-E-ST-50-14 | [ECSS-E-ST-50-14](../references/index.md#ref-ecss-e-st-50-14) | Spacecraft discrete interfaces |  | reference |
| ECSS-E-ST-70-41 | [ECSS-E-ST-70-41](../references/index.md#ref-ecss-e-st-70-41) | Ground systems and operations - Telemetry and telecommand packet utilization |  | reference |
| PSS-04-151 | [PSS-04-151](../references/index.md#ref-pss-04-151) | ESA Telecommand decoder specification [obsolete document] | Issue 1 September 1993 | reference |
| RFC 791 | [RFC 791](../references/index.md#ref-rfc-791) | Internet Protocol, Protocol Specification [now known as IPv4] | Sep 1981 | reference |
| RFC 1883 | [RFC 1883](../references/index.md#ref-rfc-1883) | Internet Protocol, Version 6 (IPv6) Specification | Dec 1995 | reference |
| ISO/IEC 7498-1 | [ISO/IEC 7498-1](../references/index.md#ref-iso-iec-7498-1) | Information Technology—Open Systems Interconnection—Basic Reference Model: The Basic Model | 2nd edition 1994 | reference |
| TEC-ETC/2008.66/PMcM report | [TEC-ETC/2008.66/PMcM](../references/index.md#ref-tec-etc-2008-66-pmcm) | The transponder dual lock issue: Background and recommended remedial actions | June 2008 | reference |
|  | [catalogue](../references/index.md#ref-j-g-proakis-digital-communications-false-decoding-probability-formula) | J.G. Proakis, Digital Communications (false decoding probability formula) |  | mentioned |

!!! note "Notes"
    Printed page numbers equal PDF page numbers, and PDF page 262 is blank (the registry gives 261 pages). The text extraction uses Unicode non-breaking hyphens (U+2010/U+2011) in identifiers such as 'ECSS‐E‐HB‐50A', so plain-hyphen searches can miss them. The reference list (pp. 259-261) is headed 'References' and, by its stated convention, mostly omits issue numbers. Its explanation of specific-issue references gives 'ECSS-E-ST-50-01' as an example without any issue letter (p. 259). Table 3-1 lists ECSS-E-ST-50-11 as 'SpaceWire protocols, To be published' (p. 27), while the reference list calls it 'SpaceWire RMAP protocol' (p. 260). The handbook describes PUS issue A (2003), and ECSS-E-ST-70-41C (2016) post-dates it. Annex G curves and many figures are images or scrambled text. Some false-decoding curve captions say RS(255,239) while the table titles say RS(254,238) (pp. 256-258).

