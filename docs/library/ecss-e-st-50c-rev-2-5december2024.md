---
title: "ECSS-E-ST-50C Rev.2: Communications (2024)"
description: "The top-level ECSS standard for space communications, in its December 2024 revision."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50c-rev-2-5december2024]
---

# Space engineering
Communications

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50C Rev.2</dd><dt>Issue / version</dt><dd>Second issue, Revision 2</dd><dt>Date</dt><dd>2024-12-05</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS-E-ST-50C Revision Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-50C Revision Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue, Revision 2, dated 5 December 2024. It revises ECSS-E-ST-50C Rev.1 (1 March 2021), which revised ECSS-E-ST-50C (31 July 2008), itself following ECSS-E-50 Part 1A (20 October 2003) and Part 2A (4 July 2005); ECSS-E-ST-50B was never issued (change log, p. 3). Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>88</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2024/12/ECSS-E-ST-50C-Rev.2(5December2024).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2024/12/ECSS-E-ST-50C-Rev.2(5December2024).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:22Z</dd><dt>SHA-256</dt><dd><code>ffa7c8783c35eb46495437461bb809a61f7f6816cd4da0745626afd9cbb27d2b</code></dd><dt>Size</dt><dd>843.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50C-Rev.2-5December2024-.pdf">ECSS-E-ST-50C-Rev.2-5December2024-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The top-level ECSS standard for **space communications**, in its December 2024 revision. It sets the requirements for developing the end-to-end data communication system of a spacecraft: space-ground and space-to-space links in operations, and the links used during assembly, integration and test. It is a process and top-level requirements standard in the ECSS-E-ST-10 framework. The protocol details sit in the Level-3 ECSS-E-ST-50-xx standards, in the ECSS Adoption Notices of CCSDS books and in CCSDS standards, and the ground segment is mostly left to ECSS-E-ST-70.

Rev.2 is a small maintenance revision. It removes the issue numbers and dates of the adopted CCSDS books (in the clause 4.2 table and the bibliography), so that ECSS-E-ST-50 need not be reissued whenever CCSDS updates a book. It also deletes twelve generic terms from clause 3.2 at the request of the Glossary Task Force, and fixes the 'CSDP' typo in 5.2.5.3c.

Content an engineer finds:

* clause 4: the principles (guaranteed in-order delivery for control, best effort for payload data), the table of which adoption notice (ECSS-E-AS-50-21 to -26) replaces which part of ECSS-E-ST-50-01C/-03C/-04C, Figure 4-2 mapping CCSDS and Internet protocols onto OSI layers, the three domains (space network, space link, ground network) and the review milestones;
* clause 5: numbered requirements (ECSS-E-ST-50_09700xx) on telecommanding (in-sequence delivery, erroneous-TC acceptance below 10^-2/N, hardware essential telecommands, authentication and encryption, destination identifiers), telemetry, space link performance (uplink BER 10^-5, frame rejection and undetected-error targets), ITU frequency filing, link services, on-board and inter-spacecraft networks and the ground network;
* normative Annexes A to H, which define the eight communication-system DRDs (CSRD to CSOM, including the CSPD compliance profile), and Annex I, which maps them to reviews.


## Key points

- Rev.2 removes the issue identifier and date of the adopted CCSDS documents, so that ECSS-E-ST-50 does not need updating whenever an adopted CCSDS standard is updated; it also deletes 12 terms from clause 3.2 (communication service, cross support, downlink, service-provider, service-user, sink, telecommand, telemetry, telemetry link, uplink, user, user application). *(PDF p. 3)*
- The standard covers space-ground and space-to-space links in operations and the links used in AIT; it details the space link and space network domains and covers only the ground network aspects needed for end-to-end services (others are in ECSS-E-ST-70). *(PDF p. 9)*
- For control operations the objective is guaranteed delivery of commands in transmission order (commands can be repeated but not lost); for payload data the aim is to transfer as much data as possible, accepting some loss. *(PDF p. 15)*
- Table in clause 4.2: ECSS-E-AS-50-21 (CCSDS 131.0-B) supersedes the whole of ECSS-E-ST-50-01C; -22 (132.0-B) the TM Transfer Frame of ECSS-E-ST-50-03C; -23 (732.0-B) adds AOS; -24 (231.0-B), -25 (232.0-B) and -26 (232.1-B) replace clauses 8-9, 5-6 and 7 of ECSS-E-ST-50-04C. *(PDF p. 19)*
- Figure 4-2 maps CCSDS and Internet protocols onto the data link, coding and physical layers and upper layers, marks which CCSDS books are formally adopted by ECSS, and gives ECSS-E-ST-70-41C as an example of an application-specific source/sink. *(PDF p. 20)*
- Communication engineering milestones include SRR, PDR, CDR, QR, AR, ORR and FRR. *(PDF p. 26)*
- Requirement 5.4.2 demands a service guaranteeing in-sequence delivery of telecommands; 5.4.3 requires the probability of accepting an erroneous telecommand to be below 10^-2/N, N being the number of telecommands expected over the mission. *(PDF p. 36)*
- Essential telecommands must be decodable and distributed even when all other systems, including the CDMU, are non-operational; their list is agreed at PDR and, for critical operations, they must not depend on software. *(PDF p. 36)*
- Telecommand encryption is required when authentication alone cannot meet the security requirements; the SDLS option of ECSS-E-AS-50-25 is cited as a data-link-layer means. *(PDF p. 37)*
- Hot-redundant TC chains must not repeatedly select the input channel with lower signal quality (dual-lock issue, ECSS-E-HB-50 clause 4.4.5.2), and all telecommands must carry a destination spacecraft identifier. *(PDF p. 38)*
- Uplink budgets are based on a BER of 10^-5 at the telecommand decoder input; at that BER the uplink frame rejection rate for 256-octet frames shall be below 10^-5. *(PDF p. 44)*
- Downlink frame rejection should be below 10^-5 and the probability of accepting corrupted maximum-sized downlink frames below 10^-12; with BCH, undetected uplink frame error can be below 10^-18 with frame error control and 10^-8 without. *(PDF p. 45)*
- An application for frequency assignment shall be made to the Radio Communication Bureau of the ITU for the selected space communication frequencies. *(PDF p. 46)*
- Formatted space link data units shall carry a sequence identifier giving their position in the stream (5.6.13.3), and the space link protocol shall include an error detection capability (5.6.13.4). *(PDF p. 47)*
- The space link shall provide a guaranteed delivery service and an expedited delivery service for SDUs (5.6.14.2, 5.6.14.3). *(PDF p. 49)*
- The space link provides telecommand receipt confirmation and exception reporting; ranging/Doppler methods are referred to ECSS-E-ST-50-02. *(PDF p. 50)*
- The CSPD (Annex G) is the supplier's formal statement of compliance with ECSS-E-ST-50, listing frequencies, protocols and options, address, channel and spacecraft identifier assignments and bandwidth allocations; first version at CDR, final at FRR. *(PDF p. 80)*


## Cited by these wiki pages (7)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Proximity-1 Space Link Protocol (CCSDS 211.0-B-6)](../ccsds/proximity-1.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space link identifiers: SCIDs, VCIDs, APIDs and SANA](../ccsds/space-link-identifiers.md)
- [The standards landscape](../overview/standards-map.md)


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
    | 3.3 | Abbreviated terms | 13 |
    | 4 | Space communications engineering principles | 15 |
    | 4.1 | Context | 15 |
    | 4.2 | Overall space communication | 16 |
    | 4.3 | Space communication domains | 21 |
    | 4.4 | Communications engineering process | 24 |
    | 4.5 | Relationship with other standards | 26 |
    | 4.6 | &lt;&lt;deleted&gt;&gt; | 27 |
    | 4.7 | Spacecraft control considerations | 27 |
    | 5 | Requirements | 28 |
    | 5.1 | Introduction | 28 |
    | 5.2 | Space communication system engineering process | 28 |
    | 5.2.1 | Requirements engineering | 28 |
    | 5.2.2 | Analysis | 29 |
    | 5.2.3 | Design and configuration | 30 |
    | 5.2.4 | Implementation | 31 |
    | 5.2.5 | Verification | 33 |
    | 5.2.6 | Operations | 34 |
    | 5.3 | Space communication system | 35 |
    | 5.4 | Telecommanding | 36 |
    | 5.5 | Telemetry | 38 |
    | 5.6 | Space link | 41 |
    | 5.6.11 | Space link performance | 43 |
    | 5.6.12 | Space link frequency | 46 |
    | 5.6.13 | Space link protocol | 47 |
    | 5.6.14 | Space link service | 48 |
    | 5.7 | Space network | 51 |
    | 5.7.1 | On-board network | 51 |
    | 5.7.2 | On-board network services | 52 |
    | 5.7.3 | Inter-spacecraft network | 53 |
    | 5.7.4 | Inter-spacecraft network services | 54 |
    | 5.8 | Ground network | 55 |
    | Annex A | Communication system requirements document (CSRD) - DRD (normative) | 57 |
    | Annex B | Communication system baseline definition (CSBD) - DRD (normative) | 62 |
    | Annex C | Communication system analysis document (CSAD) - DRD (normative) | 68 |
    | Annex D | Communication system verification plan (CSVP) - DRD (normative) | 71 |
    | Annex E | Communication system architectural design document (CSADD) - DRD (normative) | 74 |
    | Annex F | Communication system detailed design document (CSDDD) - DRD (normative) | 77 |
    | Annex G | Communication system profile document (CSPD) - DRD (normative) | 80 |
    | Annex H | Communication system operations manual (CSOM) - DRD (normative) | 82 |
    | Annex I | Documentation summary (informative) | 85 |
    |  | Bibliography | 88 |


## Documents this one references (56)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system — Glossary of terms |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-10 | [ECSS-E-ST-10](../references/index.md#ref-ecss-e-st-10) | Space engineering – System engineering general requirements |  | bibliography |
| ECSS-E-ST-10-02 | [ECSS-E-ST-10-02](../references/index.md#ref-ecss-e-st-10-02) | Space engineering – Verification |  | bibliography |
| ECSS-E-HB-50 | [ECSS-E-HB-50](../references/index.md#ref-ecss-e-hb-50) | Space engineering – Communications guidelines |  | bibliography |
| ECSS-E-ST-50-05 | [ECSS-E-ST-50-05](../references/index.md#ref-ecss-e-st-50-05) | Space engineering – Radio frequency and modulation |  | bibliography |
| ECSS-E-AS-50-21 | [ECSS-E-AS-50-21](../references/index.md#ref-ecss-e-as-50-21) | Space engineering – ECSS Adoption Notice of CCSDS 131.0-B - TM Synchronization and Channel Coding |  | bibliography |
| ECSS-E-AS-50-22 | [ECSS-E-AS-50-22](../references/index.md#ref-ecss-e-as-50-22) | Space engineering – ECSS Adoption Notice of CCSDS 132.0-B - TM Space Data Link Protocol |  | bibliography |
| ECSS-E-AS-50-23 | [ECSS-E-AS-50-23](../references/index.md#ref-ecss-e-as-50-23) | Space engineering – ECSS Adoption Notice of CCSDS 732.0-B - AOS Space Data Link Protocol |  | bibliography |
| ECSS-E-AS-50-24 | [ECSS-E-AS-50-24](../references/index.md#ref-ecss-e-as-50-24) | Space engineering – ECSS Adoption Notice of CCSDS 231.0-B - TC Synchronization and Channel Coding |  | bibliography |
| ECSS-E-AS-50-25 | [ECSS-E-AS-50-25](../references/index.md#ref-ecss-e-as-50-25) | Space engineering – ECSS Adoption Notice of CCSDS 232.0-B - TC Space Data Link Protocol |  | bibliography |
| ECSS-E-AS-50-26 | [ECSS-E-AS-50-26](../references/index.md#ref-ecss-e-as-50-26) | Space engineering – ECSS Adoption Notice of CCSDS 232.1-B - Communications Operation Procedure-1 |  | bibliography |
| ECSS-E-ST-70 | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering – Ground systems and operations |  | bibliography |
| ECSS-M-ST-10 | [ECSS-M-ST-10](../references/index.md#ref-ecss-m-st-10) | Space project management – Project planning and implementation |  | bibliography |
| ECSS-M-ST-40 | [ECSS-M-ST-40](../references/index.md#ref-ecss-m-st-40) | Space project management – Configuration and information management |  | bibliography |
| CCSDS 734.1-B-1 | [CCSDS 734.1-B-1](../references/index.md#ref-ccsds-734-1-b-1) | Licklider Transmission Protocol (LTP) for CCSDS | May 2015 | bibliography |
| CCSDS 734.2-B-1 | [CCSDS 734.2-B-1](../references/index.md#ref-ccsds-734-2-b-1) | CCSDS Bundle Protocol Specification | September 2015 | bibliography |
| ISO 7498:1984 | [ISO 7498:1984](../references/index.md#ref-iso-7498-1984) | ISO Information processing systems – Open systems interconnection — Basic reference model | 1984 | bibliography |
|  | [ECSS-E-ST-20](../references/index.md#ref-ecss-e-st-20) | ECSS-E-ST-20 (source of the term 'essential function') |  | mentioned |
|  | [ECSS-E-ST-70-11](../references/index.md#ref-ecss-e-st-70-11) | ECSS-E-ST-70-11 (source of the terms commandable vital function, high priority command/telemetry, vital function, vital telecommand) |  | mentioned |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | ECSS-E-ST-50-01C 31 July 2008 (superseded by ECSS-E-AS-50-21) | 31 July 2008 | mentioned |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | ECSS-E-ST-50-03C 31 July 2008 (TM Transfer Frame topic superseded by ECSS-E-AS-50-22) | 31 July 2008 | mentioned |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | ECSS-E-ST-50-04C 31 July 2008 (clauses superseded by ECSS-E-AS-50-24, -25 and -26) | 31 July 2008 | mentioned |
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | Telemetry and telecommand packet utilization (example of an application-specific source/sink in Figure 4-2) |  | mentioned |
|  | [CCSDS 727.0-B](../references/index.md#ref-ccsds-727-0-b) | CCSDS File Delivery Protocol (CFDP) |  | mentioned |
|  | [CCSDS 121.0-B](../references/index.md#ref-ccsds-121-0-b) | Lossless Data Compression |  | mentioned |
|  | [CCSDS 122.0-B](../references/index.md#ref-ccsds-122-0-b) | Image Data Compression |  | mentioned |
|  | [CCSDS 122.1-B](../references/index.md#ref-ccsds-122-1-b) | Image Data Compression (second entry in Figure 4-2) |  | mentioned |
|  | [CCSDS 123.0-B](../references/index.md#ref-ccsds-123-0-b) | Lossless Multi&Hyper spectral Image Compression |  | mentioned |
|  | [CCSDS 734.2-B](../references/index.md#ref-ccsds-734-2-b) | Bundle Protocol (BP) |  | mentioned |
|  | [CCSDS 734.1-B](../references/index.md#ref-ccsds-734-1-b) | LTP |  | mentioned |
|  | [CCSDS 702.1-B](../references/index.md#ref-ccsds-702-1-b) | IP over CCSDS |  | mentioned |
|  | [CCSDS 133.0-B](../references/index.md#ref-ccsds-133-0-b) | Space Packet Protocol |  | mentioned |
|  | [CCSDS 133.1-B](../references/index.md#ref-ccsds-133-1-b) | Encapsulation Service / Encapsulation Packet |  | mentioned |
|  | [CCSDS 232.0-B](../references/index.md#ref-ccsds-232-0-b) | TC Space Data Link Protocol |  | mentioned |
|  | [CCSDS 132.0-B](../references/index.md#ref-ccsds-132-0-b) | TM Space Data Link Protocol |  | mentioned |
|  | [CCSDS 732.0-B](../references/index.md#ref-ccsds-732-0-b) | AOS Data Link Protocol |  | mentioned |
|  | [CCSDS 732.1-B](../references/index.md#ref-ccsds-732-1-b) | USLP |  | mentioned |
|  | [CCSDS 211.0-B](../references/index.md#ref-ccsds-211-0-b) | Proximity-1 Protocol |  | mentioned |
|  | [CCSDS 231.0-B](../references/index.md#ref-ccsds-231-0-b) | TC Synch. And Channel Coding |  | mentioned |
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
|  | [ECSS-E-ST-50-02](../references/index.md#ref-ecss-e-st-50-02) | Ranging and Doppler tracking (suitable methods for ranging/Doppler) |  | mentioned |

!!! note "Notes"
    Newer revision of the library item ecss-e-st-50c-rev-1-1march2021 (Rev.1, 1 March 2021). Apart from the changes listed in the change log, the text is essentially that of Rev.1, but pagination shifts by one page from clause 4 onwards because clause 3.2 is shorter (for example clause 4 starts on p. 15 here, p. 16 in Rev.1). The change log entry for Rev.1 is reduced to a lone bullet (p. 3), and the Rev.2 entry contains 'to avoid a an update' (p. 3). The foreword omits the sentence about the series of ECSS standards. Clause 3.3 still cites 'ECSS-ST-00-01' (p. 13). Figure 4-2 is a diagram whose labels are extracted as jumbled text (p. 20); its note still contains 'axample' and still names 'ECSS-E-50-05' for RF and modulation. Clause 4.3.2 is still headed 'Space network'. The 'mentioned' entries come from the clause 4.2 table, Figure 4-2 and running text, not from a reference list. Printed page numbers equal PDF page numbers; srcgrep shows 89 PDF pages (the last one blank) while the registry gives 88.

