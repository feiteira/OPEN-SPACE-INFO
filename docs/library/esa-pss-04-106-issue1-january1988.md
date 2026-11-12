---
title: "ESA PSS-04-106 Packet Telemetry Standard (Issue 1, 1988)"
description: "ESA's Packet Telemetry Standard of January 1988 is the agency's subset of the CCSDS Packet Telemetry recommendation (102.0-B-2) for spacecraft that use the ESA ground network."
tags: ["Standard", "ECSS standards"]
sources: [esa-pss-04-106-issue1-january1988]
---

# Packet Telemetry Standard

<dl class="osi-meta"><dt>Document ID</dt><dd>ESA PSS-04-106</dd><dt>Issue / version</dt><dd>Issue 1</dd><dt>Date</dt><dd>January 1988</dd><dt>Organisation</dt><dd>European Space Agency (ESA), PSS-04 Space Data Communications branch; prepared by the Standards Approval Board (STAB) for Space Data Communications, approved by the Inspector General, ESA, and published by ESA Publications Division, ESTEC, Noordwijk</dd><dt>Authors</dt><dd>The Standards Approval Board (STAB) for Space Data Communications</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Issue 1 of January 1988 is the only issue listed in the Document Change Record (PDF p. 6). That record says the standard is directly derived from the CCSDS Packet Telemetry Blue Book CCSDS 102.0-B-2 (January 1987) and supersedes the previous version, TTC-A-06 Issue No. 1 (February 1986). Clause 1.2 adds that it supersedes the PCM Telemetry Standard TTC-A-02 (p. 13). The document itself names no successor. In the ECSS system, ECSS-E-ST-50-03C (31 July 2008) contains an informative Annex B, 'Changes from ESA-PSS-04-106', for checking the compatibility of existing systems (library item ecss-e-st-50-03c-31july2008, PDF p. 34). ECSS-E-70-41A Annex C transcribes this standard's spacecraft-time text (library item ecss-e-70-41a-30jan2003-pus, PDF p. 217). The PSS series has been replaced by ECSS standards. This copy was downloaded from ecss.nl.</dd><dt>Pages</dt><dd>88</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ESA-PSS-04-106_Issue1(January1988).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ESA-PSS-04-106_Issue1(January1988).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:51Z</dd><dt>SHA-256</dt><dd><code>2b5770a6e2adb1c4cff882f17f395e3db869198683705413a1a0bbed0288a9e0</code></dd><dt>Size</dt><dd>3.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ESA-PSS-04-106_Issue1-January1988-.pdf">ESA-PSS-04-106_Issue1-January1988-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

ESA's **Packet Telemetry Standard** of January 1988 is the agency's subset of the CCSDS Packet Telemetry recommendation (102.0-B-2) for spacecraft that use the ESA ground network. It is the ancestor of today's [Space Packet](../ccsds/space-packet.md) and [TM Space Data Link Protocol](../ccsds/tm-sdlp.md) books (see the [history page](../overview/history.md)). The library copy is a scanned PDF and its text comes from OCR, so the values here were checked against the page images.

The standard defines three data structures. The **Source Packet** has a 6-octet header: a 3-bit version fixed at Version 2 (`0b100`), a type bit, a data field header flag, an 11-bit APID, segmentation flags, a 14-bit sequence count and a length field. It is followed by an optional data field header and an optional packet error control field. The **Telemetry Packet** carries one segment of a long Source Packet, so that a single source cannot hold the downlink. The maximum segment length (256, 512 or 1024 octets, or none) is set per virtual channel. The **Transfer Frame** has a 6-octet primary header with a 10-bit spacecraft ID, a 3-bit virtual channel ID (up to eight channels), frame counters and an 11-bit first header pointer. It may also carry a 4-octet secondary header that extends the VC count, and a trailer with the [CLCW](../ccsds/cop-1.md) and a 16-bit CRC. Each frame follows the marker `0x1ACFFC1D`. With Reed-Solomon coding a frame is 1115, 892 or 1784 octets long.

Later sections cover the ground extraction steps and spacecraft elapsed time in CUC format. Section 7 explains how that time is correlated with UTC through virtual channel 0 (see [time correlation](../scos2000/time-correlation.md)). The remaining sections define the two delivery services, and the appendices cover CCSDS terminology, the choice of sync marker, a CRC encoder and channel-coding performance.


## Key points

- The Document Change Record says Issue 1 is directly derived from the CCSDS Packet Telemetry Blue Book 102.0-B-2 (January 1987) and supersedes the previous version, TTC-A-06 Issue No. 1 (February 1986). *(PDF p. 6)*
- The standard belongs to the Space Link Standards & Protocols sub-branch (PSS-04-1XX) and supersedes the PCM Telemetry Standard TTC-A-02. Spaceborne telemetry systems must comply with it whenever the ESA ground network facilities are used. *(PDF p. 13)*
- It specifies three data structures: the Source Packet (the end-to-end unit), the Telemetry Packet (a segmentation unit for multiplexing long packets) and the Transfer Frame (the link unit, which supports virtual channels). Channel coding is left to the Telemetry Channel Coding Standard (reference [2]). *(PDF p. 14)*
- Bit 0 is the first bit transmitted and, in a binary value, the most significant bit. An octet is an 8-bit word, and octets are numbered with the same convention. *(PDF p. 17)*
- The Source Packet header is 48 bits: a 3-bit version (only Version 2, coded 100, is permitted), a type bit (0 for telemetry), a data field header flag, an 11-bit APID, 2-bit segmentation flags, a 14-bit source sequence count and a 16-bit packet length (data field octets minus 1). *(PDF p. 24)*
- APID all ones identifies Idle Source Packets, which keep ground packet extraction synchronised. APID all zeros is reserved for the standard Source Packet that carries the spacecraft time sample. *(PDF p. 25)*
- In a Source Packet the segmentation flags are always 11. The source sequence count runs modulo 16 384 per APID and must not be short-cycled during continuous operation, but it may restart after an interruption such as a power-off. *(PDF p. 25)*
- A Source Packet is 7 to 65 542 octets long. The data field header and packet error control field are optional subdivisions of the data field, and their detailed formats are outside this standard. *(PDF p. 26)*
- When a Source Packet's data field is longer than LSEGMENT it is split into Telemetry Packets with segmentation flags 01 (first), 00 (continuation) and 10 (last); 11 means unsegmented. The length field of each segment gives the length still remaining of the original data field. *(PDF p. 28)*
- Worked example in the standard: a 2106-octet Source Packet with LSEGMENT = 512 becomes four Telemetry Packets carrying 512 data octets each and a last packet carrying 52 data octets. *(PDF p. 51)*
- Frame lengths are fixed per physical channel. With Reed-Solomon coding the frame is 1115 octets (the CCSDS cross-support length, interleaving depth 5), 892 octets (depth 4) or 1784 octets (depth 8). Without R-S coding it is any whole number of octets from 128 to 2040. *(PDF p. 34)*
- The Attached Synchronisation Marker is 1ACFFC1D (hex). A second marker, 352EF853, is proposed for cases such as forward-played tape-recorder frames embedded in the real-time stream. *(PDF p. 35)*
- The 48-bit primary header holds a 2-bit version (00), a 10-bit spacecraft ID, a 3-bit virtual channel ID, an Operational Control Field flag, 8-bit master channel and virtual channel frame counts, and a 16-bit frame data field status. The status field contains the secondary header flag, synchronisation flag, packet order flag, 2-bit segment length identifier and 11-bit first header pointer. *(PDF p. 36)*
- Spacecraft identifiers identify both the spacecraft and the physical link. ESA projects obtain them from the ESA Directorate of Operations (D/OPS) at ESOC, with separate identifiers for flight, development and simulated data streams. *(PDF p. 37)*
- Only forward-ordered, synchronous insertion of packets is recognised, so the packet order flag must be 0 when the synchronisation flag is 0. The segment length identifier codes LSEGMENT as 256 (00), 512 (01) or 1024 (10) octets, or no segmentation (11). *(PDF p. 40)*
- In the first header pointer, all ones means that no packet header starts in the frame, and all ones minus one (11111111110) marks a virtual channel in the IDLE state. *(PDF p. 41)*
- The optional secondary header is 4 octets long (version 00, length field 000011) and carries 24 more bits of virtual channel frame count, mainly for frames recorded on board and played back later. If used, it must appear in every frame of the master channel. *(PDF p. 43)*
- The trailer has a 32-bit Operational Control Field and a 16-bit Frame Error Control Word. When the OCF type bit is 0 the field holds the CLCW, which is mandatory with packet telecommand. The Frame Error Control Word is mandatory unless the frame is carried inside a Reed-Solomon codeblock. *(PDF p. 45)*
- The frame check sequence is a CRC with generator x^16 + x^12 + x^5 + 1. The shift register is preset to all ones and the CRC covers the frame without the sync marker. The earlier TTC-A-06 issue included the marker, and existing designs based on it remain supported. *(PDF p. 46)*
- Spacecraft elapsed time uses the CCSDS unsegmented time code (CUC): a P-field starting 0010, 1 to 4 coarse octets and 0 to 3 fine octets, TAI seconds and an arbitrary epoch. *(PDF p. 56)*
- For time correlation, the on-board clock is sampled at the first bit of the sync marker of the virtual channel 0 frame whose VC frame count is 0 (or, optionally, every 128 down to 1 frames). The sample is sent in the APID 0 time packet, and the ground station time-tags the same marker bit in CDS-coded UTC. *(PDF p. 58)*
- Two standard ESA network services are defined. Service 1, Source Packet Delivery, covers reassembly, packet accounting, time correlation and CLCW extraction for COP-1. Service 2 is Transfer Frame Delivery. *(PDF p. 64)*
- Appendix A maps ESA terms to CCSDS terms: Source Packet Header = Source Packet Primary Header, Data Field Header = Secondary Header, and Telemetry Packet = the CCSDS Version 2 Telemetry Segment. ESA numbers octets from 0, unlike reference [1]. *(PDF p. 71)*
- Appendix D estimates frame-loss and packet-loss probabilities for uncoded PSK, Reed-Solomon (255,223), rate-1/2 k = 7 convolutional coding with Viterbi decoding, and the concatenated scheme. *(PDF p. 77)*


## Cited by these wiki pages (6)

- [ECSS: the European space standards system](../ecss/index.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Methodology](../about/methodology.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (50 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Document Change Record | 6 |
    |  | References | 7 |
    |  | Contents | 9 |
    | 1 | Purpose and Scope | 13 |
    | 1.1 | Purpose | 13 |
    | 1.2 | Scope | 13 |
    | 2 | Applicability | 15 |
    | 2.1 | General | 15 |
    | 2.2 | Exceptions | 15 |
    | 3 | System Overview | 17 |
    | 3.1 | Bit Numbering Convention and Nomenclature | 17 |
    | 3.2 | Telemetry Data Flow | 18 |
    | 4 | Packet Formats | 21 |
    | 4.1 | General | 21 |
    | 4.2 | Source Packet Format | 23 |
    | 4.3 | Telemetry Packet Format | 27 |
    | 5 | Transfer Frame Format | 31 |
    | 5.1 | General | 31 |
    | 5.2 | Transfer Frame Length | 32 |
    | 5.3 | Attached Synchronisation Marker | 34 |
    | 5.4 | Transfer Frame Primary Header | 36 |
    | 5.5 | Transfer Frame Secondary Header | 42 |
    | 5.6 | Transfer Frame Data Field | 44 |
    | 5.7 | Transfer Frame Trailer | 45 |
    | 5.8 | Reed-Solomon Check Symbols | 48 |
    | 6 | Telemetry Transmission Protocols | 49 |
    | 6.1 | Introduction | 49 |
    | 6.2 | Transfer Frame Acquisition | 49 |
    | 6.3 | Virtual Channel Demultiplexing | 50 |
    | 6.4 | Extraction of Synchronously Inserted Telemetry Packets | 50 |
    | 6.5 | Source Packet Reconstruction | 53 |
    | 6.6 | Extraction of Asynchronously Inserted Data | 54 |
    | 7 | Spacecraft Time Protocols | 55 |
    | 7.1 | Introduction | 55 |
    | 7.2 | Presentation of Spacecraft Time | 55 |
    | 7.3 | Standard Spacecraft Time Source Packet | 57 |
    | 7.4 | Spacecraft Time Correlation Procedures | 58 |
    | 8 | Telemetry Downlink Signal | 61 |
    | 8.1 | General | 61 |
    | 8.2 | Bit Rate | 61 |
    | 9 | Telemetry Services and Performance Requirements | 63 |
    | 9.1 | Overview of the Services | 63 |
    | 9.2 | Service 1: Source Packet Delivery | 63 |
    | 9.3 | Service 2: Transfer Frame Delivery | 65 |
    | 9.4 | Performance Requirements | 66 |
    | 10 | Compatibility with Other Ground Networks | 69 |
    | Appendix A | Correspondence with CCSDS Terminology | 71 |
    | Appendix B | Selection and Performance of Transfer Frame Synchronisation Markers | 73 |
    | Appendix C | Possible Realisation of a Frame Check Sequence Encoder-Decoder | 75 |
    | Appendix D | Performance of Various Channel Coding Techniques | 77 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [CCSDS 102.0-B-2](../references/index.md#ref-ccsds-102-0-b-2) | Packet Telemetry | Recommendation, Issue 2, 'Blue Book' January 1987 | reference |
| [2] | [ESA PSS-04-103](../references/index.md#ref-esa-pss-04-103) | Telemetry Channel Coding Standard (directly derived from Reference [3]) | Issue 1 1989 | reference |
| [3] | [CCSDS 101.0-B-2](../references/index.md#ref-ccsds-101-0-b-2) | Telemetry Channel Coding | Recommendation, Issue 2, 'Blue Book' January 1987 | reference |
| [4] | [ESA PSS-04-107](../references/index.md#ref-esa-pss-04-107) · [library](esa-pss-04-107-issue2-april1992.md) | Packet Telecommand Standard | Issue 1 (to be issued in 1990) | reference |
| [5] | [ESA PSS-04-202](../references/index.md#ref-esa-pss-04-202) | Time Code Formats and Procedures Standard (directly derived from Reference [6]) | Issue 1 (to be issued in 1990/91) | reference |
| [6] | [CCSDS 301.0-B-1](../references/index.md#ref-ccsds-301-0-b-1) | Time Code Formats | Recommendation, Issue 1, 'Blue Book' January 1987 | reference |
| [7] | [ESA PSS-04-105](../references/index.md#ref-esa-pss-04-105) | Radio Frequency and Modulation Standard | Issue 1 1989 | reference |
| [A] | [catalogue](../references/index.md#ref-r-j-mceliece-the-theory-of-information-and-coding-encyclopedia-of-mathematics-an) | R.J. McEliece, 'The Theory of Information and Coding', Encyclopedia of Mathematics and its Applications, Vol. 3, Addison-Wesley (Appendix D reference list) | 1977 | bibliography |
| [B] | [Tech. Report N71-32505](../references/index.md#ref-tech-report-n71-32505) | A.J. Viterbi et al., 'Concatenation of Convolutional and Block Codes - Final Report', Nat. Tech. Inf. Service, U.S. Dep. of Com. (Appendix D reference list) | 1971 | bibliography |
| TTC-A-06 | [TTC-A-06](../references/index.md#ref-ttc-a-06) | Previous version of this standard (superseded) | Issue No. 1 February 1986 | mentioned |
| TTC-A-02 | [TTC-A-02](../references/index.md#ref-ttc-a-02) | PCM Telemetry Standard (superseded) |  | mentioned |
| CCITT V.41 | [CCITT Recommendation V.41](../references/index.md#ref-ccitt-recommendation-v-41) | Source of the generating polynomial G(X) = X^16 + X^12 + X^5 + 1 used for the frame check sequence |  | mentioned |

!!! note "Notes"
    This is a scanned PDF. Its text was produced by OCR (RapidOCR) and has merged words, dropped lines and scrambled tables, so every number, field size and bit pattern in this entry was checked against rendered page images. Page numbering: printed page n is PDF page n + 12 in the body (printed page 1 is PDF p. 13), and the front matter uses roman numerals. PDF p. 2 is blank; pp. 8, 12, 16, 60, 62, 68, 70 and 74 are 'page intentionally left blank'; pp. 86-88 are blank pages and the back cover. Oddities: the copyright line says 1989 although the issue is dated January 1988 (p. 4). Reference [2] (PSS-04-103) is dated 1989, and references [4] and [5] are marked 'to be issued' (p. 7). Clause 4.2.1.1 introduces the four subfields as 'Version Number, Reserved Bit, Data Field Header Flag and APID' but then defines bit 3 as the Type bit (p. 24). The packet version coded 100 is called 'Version 2' in the CCSDS numbering of the time. The P-field table in 7.2 prints 00100111 twice, where the seventh entry should be 00100110 (p. 56). The same duplicate appears in ECSS-E-70-41A Annex C, which transcribes this text. Appendix D has its own small reference list ([A], [B]) on p. 81, separate from the main References page. The OCR loses the first lines of the captions of Figures D.1, D.3 and D.4 (pp. 82, 84, 85).

