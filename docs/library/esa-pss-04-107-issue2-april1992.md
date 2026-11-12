---
title: "ESA PSS-04-107 Packet Telecommand Standard (Issue 2, 1992)"
description: "ESA's Packet Telecommand Standard, Issue 2 (April 1992), is derived from the 1987 CCSDS telecommand recommendations."
tags: ["Standard", "ECSS standards"]
sources: [esa-pss-04-107-issue2-april1992]
---

# Packet telecommand standard

<dl class="osi-meta"><dt>Document ID</dt><dd>ESA PSS-04-107</dd><dt>Issue / version</dt><dd>Issue 2</dd><dt>Date</dt><dd>April 1992</dd><dt>Organisation</dt><dd>European Space Agency (ESA), PSS-04 Space Data Communications branch; prepared by the Standards Approval Board (STAB) for Space Data Communications, approved by the Inspector General, ESA, and published by ESA Publications Division, ESTEC, Noordwijk</dd><dt>Authors</dt><dd>The Standards Approval Board (STAB) for Space Data Communications</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>According to the Document Change Record (PDF p. 6), Issue 1 (June 1990) was a new document directly derived from the CCSDS telecommand recommendations (its references [1] to [4]). Issue 2 (April 1992) changes sections 4.3.2, 6.3.3, Tables 6.2 and 6.3, 7.3.3 and 10.2, marks the changes with change bars, and says they are only editorial, so that Issue 2 is otherwise identical to Issue 1. Clause 1.2 says the standard supersedes the PCM Telecommand Standard TTC-A-01 (p. 15). The document names no successor. ECSS-E-ST-50-04C (31 July 2008) contains an informative Annex B, 'Changes from ESA-PSS-04-107', which lists technical differences such as the renamed segmentation sublayer and packet blocking (library item ecss-e-st-50-04c31july2008, PDF p. 131). The companion decoder specification is ESA PSS-04-151 (library item esa-pss-04-151-issue1-september1992). This copy was downloaded from ecss.nl.</dd><dt>Pages</dt><dd>182</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ESA-PSS-04-107_Issue2(April1992).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ESA-PSS-04-107_Issue2(April1992).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:54Z</dd><dt>SHA-256</dt><dd><code>e5db6a25de7b65f1c9f7eeb557b55f9d7ca126e32fb925d2a07d11b893115939</code></dd><dt>Size</dt><dd>10.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ESA-PSS-04-107_Issue2-April1992-.pdf">ESA-PSS-04-107_Issue2-April1992-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

ESA's **Packet Telecommand Standard**, Issue 2 (April 1992), is derived from the 1987 CCSDS telecommand recommendations. Issue 2 only makes editorial changes to Issue 1 of June 1990. It is the forerunner of the [TC Space Data Link Protocol](../ccsds/tc-sdlp.md), [COP-1](../ccsds/cop-1.md) and [CLTU coding](../ccsds/tc-coding-cltu.md) specifications (see the [history page](../overview/history.md)). The library copy is a scanned PDF and its text comes from OCR, so the values here were checked against the page images.

The uplink is described as five layers. The **physical layer** defines the acquisition and idle sequences, four carrier modulation modes and the physical layer operation procedure (PLOP). The **coding layer** wraps each frame in a CLTU: the start sequence `0xEB90`, 8-octet codeblocks (shorter ones allowed) protected by a (63,56) modified BCH code, and a tail sequence. The **transfer layer** defines the TC Transfer Frame and the AD, BD and BC frame types. The frame has a 5-octet header with a 10-bit spacecraft ID, a 6-bit virtual channel ID and an 8-bit sequence number, is at most 256 octets long and always ends with a CRC. The same layer defines the Unlock and Set V(R) control commands, the 32-bit CLCW, and the complete COP-1 protocol: FOP-1 and FARM-1 variables, sliding windows and state tables. The **segmentation layer** adds a one-octet segment header with sequence flags and a 6-bit MAP ID. The **packetisation layer** defines the TC packet (version `0b000`, type 1).

Further sections cover systematic retransmission for deep space, optional encrypted authentication of TC segments (see [link security](../ccsds/security.md)), the three ground-station services, and the performance targets.


## Key points

- Issue 1 (June 1990) was directly derived from the CCSDS telecommand recommendations. Issue 2 (April 1992) marks its changes with change bars, and they are only editorial. *(PDF p. 6)*
- The standard supersedes the PCM Telecommand Standard TTC-A-01. With the Radio Frequency and Modulation Standard (PSS-04-105) for the physical channel, it is mandatory whenever the standard ESA ground network is used, and the Packet Utilisation Standard covers the higher layers. *(PDF p. 15)*
- The telecommand system is layered into packetisation, segmentation, transfer, coding and physical layers. Each layer reports to its peer, and the transfer layer's report, the CLCW, travels in the trailer of the telemetry Transfer Frame defined by PSS-04-106. *(PDF p. 20)*
- A ground station offers the control centre three telecommand interfaces. Service 1 is the sequence-controlled service for packets without authentication. In Service 2, packets carry authentication of segments, so the control centre segments them itself. Service 3 is the expedited service for data units of 1 to 249 octets. *(PDF p. 28)*
- For Service 2, the control centre inserts a 9-octet authentication tail after each segment's worth of data. In the standard's example, a packet of 300 octets becomes an 'altered' packet of 318 octets. *(PDF p. 29)*
- The acquisition sequence is at least 128 bits of alternating zeros and ones, starting with a zero. At least 8 bits of idle sequence must separate successive CLTUs. The four carrier modulation modes (CMM-1 to CMM-4) are combined into a PLOP, and the standard shows ESA's PLOP-2. *(PDF p. 32)*
- CLCW bit 16 ('No RF Available') and bit 17 ('No Bit Lock') report the state of the spacecraft physical layer to the ground station. *(PDF p. 33)*
- A CLTU is a 16-bit start sequence EB90 (hex), one or more fixed-length TC codeblocks, and a tail sequence. The tail sequence is one codeblock of alternating zeros and ones ending in a one. *(PDF p. 41)*
- Codeblocks are 8 octets (recommended), 7, 6 or 5 octets. Each holds 7 complemented parity bits of a (63,56) modified BCH code with g(x) = x^7 + x^6 + x^2 + x^0, followed by a filler bit set to 0. Shorter codeblocks are coded with leading virtual fill. *(PDF p. 43)*
- The CLTU decoder has INACTIVE, SEARCH and DECODE states. It accepts a start sequence with up to one bit in error, decodes codeblocks in single-error-correction mode. A codeblock with one detected error is corrected only if its filler bit is 0, so the tail sequence (whose last bit is 1) is always rejected and the decoder returns to SEARCH. *(PDF p. 48)*
- The TC Transfer Frame has a 5-octet header: 2-bit version (00), bypass flag, control command flag, 2 reserved bits, 10-bit spacecraft ID, 6-bit virtual channel ID, 2 reserved bits, 8-bit frame length (octets minus 1) and 8-bit frame sequence number. The data field is 1 to 249 octets and the 2-octet CRC is mandatory, giving frames of 8 to 256 octets. *(PDF p. 59)*
- Together, the bypass and control command flags give three legal frame types: AD (0,0) for sequence-controlled data, BD (1,0) for expedited data and BC (1,1) for control commands. The combination (0,1) is illegal. *(PDF p. 61)*
- The 6-bit virtual channel ID is a sub-identifier that picks the spacecraft telecommand chain (typically two chains for redundancy). ESA projects obtain both the spacecraft and the VC identifiers from ESA D/OPS at ESOC. *(PDF p. 62)*
- There are two control commands. Unlock is the single octet 00000000. Set V(R) is three octets, 10000010 00000000 followed by the new V(R) value. *(PDF p. 64)*
- The frame CRC uses g(x) = x^16 + x^12 + x^5 + 1 with the encoder and decoder preset to all ones, and covers the whole frame except the CRC. *(PDF p. 65)*
- The 32-bit CLCW contains: control word type (0), version (00), status field (000), COP in effect (01 = COP-1), 6-bit VC ID, 2 reserved bits, the No RF Available, No Bit Lock, Lockout, Wait and Retransmit flags, a 2-bit FARM-B counter, a report type bit (set to 0) and the 8-bit report value N(R). *(PDF p. 68)*
- FOP-1 has six states: Active, Retransmit without Wait, Retransmit with Wait, Initialising without BC Frame, Initialising with BC Frame, and Initial. Its variables include V(S), NN(R), the Wait and Sent queues, T1_Initial, Transmission_Limit, Timeout_Type, Suspend_State and the window width K. *(PDF p. 86)*
- When the timer expires at the transmission limit, Timeout_Type 0 raises an alert and Timeout_Type 1 suspends the AD service, which can later be resumed (intended mainly for deep-space use). *(PDF p. 92)*
- The FOP sliding window K must satisfy 1 &lt;= K &lt;= PW and K &lt; 256. *(PDF p. 93)*
- FARM-1 has the states Open, Wait and Lockout. Its sliding window width W is an even number from 2 to 254 (200 at most is recommended), split into PW = NW = W/2. A frame whose N(S) falls in the remaining lockout area causes Lockout. *(PDF p. 96)*
- A TC segment has a one-octet header: 2-bit sequence flags (01 first, 00 continuation, 10 last, 11 unsegmented) and a 6-bit MAP ID. Its data field is up to 248 octets. Using bit 2 of the header as a control flag splits the 64 MAPs into 32 data and 32 control MAPs, one pair per packet assembly controller. *(PDF p. 136)*
- A packet assembly controller (PAC) enters Lockout on an incorrect sequence of segments (according to the sequence flags) or an incorrect control segment format. It is unlocked or reset by the one-octet control segment 'Reset Command' 111XXXXX, where the X bits give the PAC's MAP address. *(PDF p. 139)*
- The TC packet has a 6-octet header: version 1 (000), type 1, data field header flag, 11-bit APID, 2-bit sequence flags, 14-bit packet name or sequence count, and a length field (octets minus 1). Packets are 7 to 65 542 octets. *(PDF p. 145)*
- The optional 16-bit packet error control field is either the frame CRC or a 16-bit checksum specified in the Packet Utilisation Standard, and its presence is implied by the APID. *(PDF p. 149)*
- After checking the error control and the fixed header fields, the receiving application process reports each TC packet by telemetry as clean and conforming, clean but not conforming, or rejected as dirty. *(PDF p. 150)*
- For deep space, setting the FOP-1 timer to its minimum and choosing a transmission limit makes the ground retransmit a whole frame sequence systematically, without waiting for CLCW acknowledgements. The same technique can speed up commanding during launch. *(PDF p. 153)*
- Authentication appends a signature to each TC segment; the data stay in plain text because secrecy is not required. Including a count number makes each authenticated segment unique, which defeats replay of recorded commands. *(PDF p. 155)*
- Three Logical Authentication Channels are provided: Principal and Auxiliary for two independent streams (for example from two control centres) and Recovery. The COP-1 control frames Unlock and Set V(R) are not authenticated. *(PDF p. 156)*
- Authentication control commands use a reserved segment header: MAP 63 with the sequence flags set to unsegmented. *(PDF p. 157)*
- The authentication tail is a 2-bit LAC ID, a 30-bit LAC count and an N-octet signature, within a segment of at most 249 octets. The decoder specification (reference [8]) sets N = 5, giving a 9-octet tail. *(PDF p. 159)*
- The standard recommends that the uplink bit error rate be guaranteed better than 10^-5. At that rate it guarantees a frame rejection probability better than 1 in 10^5 and an undetected frame error probability better than 1 in 10^19. *(PDF p. 162)*
- A typical ESA spacecraft carries two TC decoders, which produce two CLCWs. Appendix C gives two schemes for inserting them into telemetry: one selected CLCW in every frame, or the two CLCWs in alternate frames. *(PDF p. 171)*


## Cited by these wiki pages (7)

- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Methodology](../about/methodology.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (90 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Document Change Record | 6 |
    |  | References | 7 |
    |  | Table of Contents | 9 |
    | 1 | Purpose and Scope | 15 |
    | 1.1 | Purpose | 15 |
    | 1.2 | Scope | 15 |
    | 2 | Applicability | 17 |
    | 2.1 | General | 17 |
    | 2.2 | Exceptions | 17 |
    | 3 | System Overview | 19 |
    | 3.1 | Bit Numbering Convention and Nomenclature | 19 |
    | 3.2 | Telecommand System Layers and Services | 20 |
    | 3.3 | Network Interface Services | 26 |
    | 4 | Physical Layer | 31 |
    | 4.1 | Overview of the Layer | 31 |
    | 4.2 | Standard Data Structures within the Layer | 31 |
    | 4.2.1 | Acquisition Sequence | 31 |
    | 4.2.2 | CLTU | 32 |
    | 4.2.3 | Idle Sequence | 32 |
    | 4.3 | Standard Procedures within the Layer | 32 |
    | 4.3.1 | Carrier Modulation Modes | 32 |
    | 4.3.2 | Physical Layer Operation Procedure (PLOP) | 34 |
    | 4.3.3 | Service Primitives of Interface between Physical Layer and Coding Layer | 34 |
    | 4.3.4 | Actions | 37 |
    | 5 | Coding Layer | 39 |
    | 5.1 | Overview of the Layer | 39 |
    | 5.2 | Standard Data Structures within the Layer | 40 |
    | 5.2.1 | Command Link Transmission Unit (CLTU) | 40 |
    | 5.2.2 | Start Sequence | 41 |
    | 5.2.3 | TC Codeblock Field | 41 |
    | 5.2.4 | Tail Sequence | 42 |
    | 5.3 | Standard Procedures within the Layer | 42 |
    | 5.3.1 | TC Codeblock Encoding Procedure | 42 |
    | 5.3.2 | CLTU Decoding Procedure | 44 |
    | 5.3.3 | Service Primitives of Interface between Coding Layer and Transfer Layer | 48 |
    | 5.3.4 | Service Primitives of Interface between Coding Layer and Physical Layer | 49 |
    | 5.3.5 | Actions | 50 |
    | 6 | Transfer Layer | 53 |
    | 6.1 | Overview of the Layer | 53 |
    | 6.1.1 | Services and Protocols | 53 |
    | 6.1.2 | Transfer Layer Sublayers | 56 |
    | 6.2 | Standard Data Structures within the Layer | 57 |
    | 6.2.1 | Transfer Layer Protocol Data Units | 57 |
    | 6.2.2 | TC Transfer Frame Format | 58 |
    | 6.2.3 | Command Link Control Word Format | 67 |
    | 6.3 | Standard Procedures within the Layer | 73 |
    | 6.3.1 | Frame Error Control Sublayer | 73 |
    | 6.3.2 | Frame Header Sublayer | 77 |
    | 6.3.3 | COP-1 Sublayer | 81 |
    | 6.3.3.2 | Internal Variables | 85 |
    |  | Table 6.2 FOP-1 State Table | 117 |
    |  | Table 6.3 FARM-1 State Table | 128 |
    | 7 | Segmentation Layer | 133 |
    | 7.1 | Overview of the Layer | 133 |
    | 7.2 | Standard Data Structures within the Layer | 135 |
    | 7.2.1 | Segment Header | 135 |
    | 7.2.2 | Segment Data Field | 137 |
    | 7.2.3 | Segment Trailer | 137 |
    | 7.3 | Standard Procedures within the Layer | 137 |
    | 7.3.1 | Segmentation Procedure (Sending End) | 137 |
    | 7.3.2 | Re-assembly Procedure (Receiving End) | 138 |
    | 7.3.3 | Service Primitives of Interface between Segmentation Layer and Higher Layers | 140 |
    | 7.3.4 | Service Primitives of Interface between Segmentation Layer and Transfer Layer | 142 |
    | 7.3.5 | Actions | 142 |
    | 8 | Packetization Layer | 143 |
    | 8.1 | Overview of the Layer | 143 |
    | 8.2 | Standard Data Structures within the Layer | 144 |
    | 8.2.1 | Packet Header | 144 |
    | 8.2.2 | Packet Data Field | 148 |
    | 8.3 | Standard Procedures within the Layer | 149 |
    | 8.3.1 | Protocol Elements | 149 |
    | 8.3.2 | Service Primitives of Interface between Packetisation Layer and Higher Layers | 150 |
    | 8.3.3 | Service Primitives of Interface between Packetisation Layer and Segmentation Layer | 151 |
    | 8.3.4 | Actions | 151 |
    | 9 | Deep-Space Telecommand | 153 |
    | 9.1 | Overview | 153 |
    | 9.2 | Systematic Retransmission with COP-1/AD | 153 |
    | 10 | Encrypted Authentication of Telecommand Data | 155 |
    | 10.1 | Concept Overview | 155 |
    | 10.2 | General Layout and Interface | 157 |
    | 10.3 | The LAC Counters | 159 |
    | 10.4 | Standard Data Structures within the Layer | 159 |
    | 11 | Telecommand Services and Performance Requirements | 161 |
    | 11.1 | Summary of the Services | 161 |
    | 11.2 | Performance Requirements | 162 |
    | 12 | Compatibility with Other Ground Networks | 163 |
    | Appendix A | Glossary of Acronyms | 165 |
    | Appendix B | Possible Realisation of a Frame Check Sequence Encoder-Decoder | 169 |
    | Appendix C | Data Link Management and Monitoring | 171 |
    | Appendix D | Data Link Performance: Rationale and Guidelines | 173 |


## Documents this one references (10)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [CCSDS 200.0-G-6](../references/index.md#ref-ccsds-200-0-g-6) | Telecommand: Summary of Concept and Service | Report, Issue 6, Green Book January 1987 | reference |
| [2] | [CCSDS 203.0-B-1](../references/index.md#ref-ccsds-203-0-b-1) | Telecommand Part 1: Channel Service, Architectural Specification | Recommendation, Issue 1, Blue Book January 1987 | reference |
| [3] | [CCSDS 202.0-B-1](../references/index.md#ref-ccsds-202-0-b-1) | Telecommand Part 2: Data Routing Service, Architectural Specification | Recommendation, Issue 1, Blue Book January 1987 | reference |
| [3] (second document) | [CCSDS 202.0-B-1](../references/index.md#ref-ccsds-202-0-b-1) | Telecommand Part 2.1: Command Operation Procedures, Detailed Specifications and State Matrices | Document, Issue 1 (Blue Book yet to be issued) | reference |
| [4] | [CCSDS 203.0-B-1](../references/index.md#ref-ccsds-203-0-b-1) | Telecommand Part 3: Data Management Service, Architectural Definition | Recommendation, Issue 1, Blue Book January 1987 | reference |
| [5] | [ESA PSS-04-105](../references/index.md#ref-esa-pss-04-105) | Radio Frequency and Modulation Standard | Issue 1 1989 | reference |
| [6] | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) · [library](esa-pss-07-101-issue1-may1994.md) | Packet Utilisation Standard | Issue 1 (to be issued in 1991/92) | reference |
| [7] | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | Packet Telemetry Standard | Issue 1 January 1988 | reference |
| [8] | [ESA PSS-04-151](../references/index.md#ref-esa-pss-04-151) · [library](esa-pss-04-151-issue1-september1992.md) | Telecommand Decoder Specification | Issue 1 (to be issued in 1991/92) | reference |
| TTC-A-01 | [TTC-A-01](../references/index.md#ref-ttc-a-01) | PCM Telecommand Standard (superseded by this standard) |  | mentioned |

!!! note "Notes"
    This is a scanned PDF. Its text was produced by OCR (RapidOCR) and has merged words, dropped lines and badly scrambled tables (the FOP-1 and FARM-1 state tables and state-transition figures on PDF pp. 117-131 are unusable as text), so every number, field size and bit pattern in this entry was checked against rendered page images. Page numbering: printed page n is PDF page n + 14 in the body (printed page 1 is PDF p. 15). PDF p. 2 is blank, p. 14 is a blank page whose OCR is a stray character, and pp. 181-182 are blank or the back cover. Oddities: reference [2] (Part 1, Channel Service) and reference [4] (Part 3, Data Management Service) print the same number, CCSDS 203.0-B-1. Reference [3] bundles two documents and gives both the number CCSDS 202.0-B-1 (p. 7). The running heads of Appendix D (printed pp. 159-160, PDF pp. 173-174) still read 'Issue 1 (June 1990)'. Clause 11.1 calls the Unlock and Set V(R) control frames 'type BD' (p. 161), whereas Table 6.1 defines control frames as BC (p. 61). The glossary entry for AD/BD/BC says 'Command Control Flag' where section 6 says 'Control Command Flag' (p. 165). Appendix D numbers its equations E.1 to E.5 (pp. 174-177). Clause 8.2.1.1 lists the subfields as 'Version Number, Reserved Bit, Data Field Header Flag and APID' but then defines bit 3 as the Type bit (p. 145). TC packets use Version 1 (000), while the PSS-04-106 telemetry source packets use Version 2 (100). The table of contents spells the chapter 'Packetization Layer', while the body uses 'Packetisation'.

