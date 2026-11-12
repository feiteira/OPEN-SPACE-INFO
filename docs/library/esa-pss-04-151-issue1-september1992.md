---
title: "ESA PSS-04-151 Telecommand Decoder Specification (Issue 1)"
description: "ESA's Telecommand Decoder Specification, Issue 1."
tags: ["Specification", "ECSS standards"]
sources: [esa-pss-04-151-issue1-september1992]
---

# Telecommand decoder specification

<dl class="osi-meta"><dt>Document ID</dt><dd>ESA PSS-04-151</dd><dt>Issue / version</dt><dd>Issue 1</dd><dt>Date</dt><dd>September 1992</dd><dt>Organisation</dt><dd>European Space Agency (ESA), PSS-04 Space Data Communications branch; prepared by the Standards Approval Board (STAB) for Space Data Communications, approved by the Inspector General, ESA, and published by ESA Publications Division, ESTEC, Noordwijk</dd><dt>Authors</dt><dd>The Standards Approval Board (STAB) for Space Data Communications</dd><dt>Type</dt><dd>Specification</dd><dt>Status</dt><dd>The title page reads 'ESA PSS-04-151 Issue 1, September 1992' (PDF p. 1). The Document Change Record, the copyright line (1993) and every running head date Issue 1 'September 1993' (pp. 2, 4). The change record describes it as a new document that complies with, and completes, PSS-04-107. Later documents cite it as 'Issue 1, September 1993': ESA PSS-07-101 (library item esa-pss-07-101-issue1-may1994, p. 13), ECSS-E-70-41A Annex D, which transcribes its CPDU requirements (ecss-e-70-41a-30jan2003-pus, p. 221), and the ECSS-E-ST-70-41C bibliography (ecss-e-st-70-41c-15april2016, p. 656). Its forerunner was the contract document THB/CS/2077/av, 'Specification for a Standard ESA/CCSDS Telecommand Decoder', first issued in 1986 and last updated in May 1988 (p. 117). The document names no successor. This copy was downloaded from ecss.nl, where the file name uses the title-page date.</dd><dt>Pages</dt><dd>126</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ESA-PSS-04-151_Issue1(September1992).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ESA-PSS-04-151_Issue1(September1992).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:23Z</dd><dt>SHA-256</dt><dd><code>65ea771d625bbbfd6d937ce62fd76c013ecc7eac5feaa6d7493a9a5fee46e738</code></dd><dt>Size</dt><dd>3.9 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ESA-PSS-04-151_Issue1-September1992-.pdf">ESA-PSS-04-151_Issue1-September1992-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

ESA's **Telecommand Decoder Specification**, Issue 1. The title page dates it September 1992, but the change record, copyright line and running heads say September 1993. It is a functional design specification for the on-board telecommand front end that implements the [PSS-04-107 packet telecommand standard](esa-pss-04-107-issue2-april1992.md): the TC decoder, the Authentication Unit (AU) and the Command Pulse Distribution Unit (CPDU). The library copy is a scanned PDF and its text comes from OCR, so the values here were checked against the page images.

Section 3 sets the subsystem requirements: two redundant, always-powered decoder chains, real-time CLCW monitoring, a defined cold-start state after power loss, an automated sequence-controlled service, MAP multiplexing, and authentication that is transparent to the data link layers. Sections 5 to 7 complete the [coding](../ccsds/tc-coding-cltu.md), [transfer](../ccsds/cop-1.md) and segmentation layers. They fix 8-octet codeblocks, explain the (63,56) code as an expurgated Hamming code with a reference decoder, start FARM-1 in Lockout at cold start, and make the spacecraft ID, VC ID, window widths and authenticated MAPs programmable.

Section 8 specifies the AU: a 40-bit signature computed with a secret 60-bit LFSR hash and a hard knapsack, fixed and programmable 2940-bit keys, three LAC registers, and control commands on MAP 63 (see [link security](../ccsds/security.md)). Section 9 defines the CPDU, which drives up to 256 command-pulse outputs from short CRC-protected TC packets for recovery when the data handling system is unavailable. Sections 10 and 11 cover the telemetry reports (including the 32-bit Frame Analysis Report) and the interfaces. The appendices give an example configuration, hexadecimal test CLTUs, and how the early Alenia Spazio and Saab Space decoders differ from this specification.


## Key points

- Issue 1 is a new document that complies with and completes the Packet Telecommand Standard PSS-04-107 (reference [2]). *(PDF p. 4)*
- This is a functional design specification for the on-board telecommand system, and its only applicable document is PSS-04-107. Of the layers, it concerns the coding, transfer, segmentation and authentication layers. The packetisation layer applies only to the CPDU, which is included because of its critical role in emergencies. *(PDF p. 15)*
- The requirements apply to free-flying ('conventional') spacecraft. Advanced Orbiting Systems such as space planes and data relay satellites are out of scope. *(PDF p. 17)*
- The front end must be fully redundant, with typically two separate chains, each with a TC decoder (including the AU when used) and a CPDU. Both chains are permanently powered and ready, special wake-up procedures are not allowed, and after a power loss the subsystem enters a predefined cold-start state. *(PDF p. 18)*
- ESA's worst acceptable uplink bit error rate is 10^-5. ESA favours an undetected frame error probability of 10^-14 or better, rather than the CCSDS figure of one frame in 10^9. Using the frame CRC on top of single-error-correction decoding gives better than 10^-19 at a BER of 10^-5. *(PDF p. 22)*
- PSS-04-105 specifies a maximum uplink symbol rate of 4 kHz. Rates around 20 kHz were expected within a decade, so designs should support the maximum feasible symbol rate. *(PDF p. 22)*
- Each TC decoder should have at least 4, and preferably up to 6, symbol-stream inputs. In the SEARCH state it locks onto whichever active input first delivers a start sequence. *(PDF p. 23)*
- Mission-specific data, which must be easy to reprogram on ground, include the 10-bit spacecraft ID, the 6-bit VC ID, the FARM window widths PW and NW (2 x 8 bits), a 5-bit authenticated MAP ID pointer, the 2940-bit fixed authentication key and the 11-bit CPDU application ID. *(PDF p. 24)*
- Unless ESA agrees otherwise, the TC codeblock length shall be 8 octets. *(PDF p. 31)*
- The decoder abandons a CLTU if its first codeblock is rejected. It also aborts the CLTU if more than 37 codeblocks are accepted, to avoid lock-up. *(PDF p. 33)*
- The (63,56) code of PSS-04-107 is an expurgated Hamming code. Its generator x^7 + x^6 + x^2 + 1 factors as (x^6 + x + 1)(x + 1), and with distance 4 it is used for single-error correction plus double-error detection. *(PDF p. 34)*
- At cold start, FARM-1 enters the Lockout state with the Retransmit flag, Wait flag, FARM-B counter and V(R) all at 0. *(PDF p. 41)*
- MAP 63 is reserved for controlling the Authentication Unit. Authenticated MAPs are chosen in data/control pairs by a 5-bit pointer; for example, pointer 0 selects MAPs 0 and 32. *(PDF p. 44)*
- The AU generates a 40-bit signature for each TC segment. A secret 60-bit linear feedback shift register hashes the segment, its 32-bit LAC value and 24 zero bits into a 60-bit pre-signature, which then goes through the knapsack. *(PDF p. 49)*
- The hard knapsack sums 60 secret 48-bit weights selected by the pre-signature bits, modulo 2^48. The 8 least significant bits are deleted, leaving the 40-bit signature. *(PDF p. 54)*
- An authentication key is 2940 bits: 2880 bits of knapsack weights and 60 hash coefficients. There is a fixed key in ROM for start-up and recovery and a programmable key in RAM for normal operations. *(PDF p. 54)*
- There are three LAC registers: Principal (ID 00), Auxiliary (01) and Recovery (10). The 30-bit counts start at all ones at cold start. Only the 8 least significant bits of the Recovery count are maintained in flight, in non-volatile memory, and its other 22 bits are fixed at 1. *(PDF p. 56)*
- The signature field is fixed at 5 octets (N = 5), so the authentication tail is 9 octets. Clause 8.4.1 gives a maximum TC segment length of 240 octets and a minimum of 10 octets. *(PDF p. 58)*
- Table 8.1 lists the authentication control commands: Dummy Segment, Select Fixed Key, Select Programmable Key, Load Fixed Key in Programmable Key Memory, Set New LAC Count Value, and Change Programmable Key Block A and B. All are sent on MAP 63 with the segment header all ones. *(PDF p. 59)*
- A new programmable key is loaded with 74 'Change Programmable Key Block' commands, each carrying a 40-bit block. *(PDF p. 62)*
- The CPDU lets operators reconfigure the spacecraft when there is no telemetry and only the BD service works. It is identified by its own APID. *(PDF p. 73)*
- The CPDU receives whole TC packets in single segments on its own MAP interface (in practice MAP 0). Once it has accepted a packet it executes all of its instructions, because no abort is provided, and it ignores new segments in the meantime. *(PDF p. 74)*
- A CPDU packet is 10 to 248 octets (an even number) and ends with the frame CRC. It must have version 000, type 1, no data field header, the programmed APID and sequence flags 11. *(PDF p. 75)*
- Each CPDU instruction is two octets. The first selects one of 256 pulse outputs, and the 3 least significant bits of the second set the pulse length to D x 2^n, where D is 10 to 15 ms; the maximum, 128 D, is 1.28 to 1.92 s. *(PDF p. 76)*
- The telemetry reports are the CLCW status report (the last 16 bits of the CLCW), a 16-bit CPDU status report, an 80-bit AU status report and the 32-bit Frame Analysis Report produced for every CLTU. *(PDF p. 83)*
- Appendix B gives hexadecimal test sequences for test jigs: CLTUs for Unlock, Set V(R), authenticated AU commands and a CPDU packet, each with the expected CLCW, FAR and status-report values. It also recommends that implementers use ESA's Telecommand Reference software. *(PDF p. 105)*
- Appendix C records that the forerunner contract specification THB/CS/2077/av, first issued in 1986, led to two TC decoder developments: one by Alenia Spazio (then Selenia Spazio) and one by Saab Space. *(PDF p. 117)*
- The early specification had a fixed, non-symmetrical FARM-1 window (W = 128, PW = 120, NW = 8). This specification instead allows any mission-fixed window, and the early window can safely be treated as a symmetrical window of 16 if K is at most 8. *(PDF p. 119)*
- Appendix C lists where the early decoders do not comply. For example, Alenia Spazio's decoder uses an 'Erasure mode' in the coding layer, which ESA waived. Saab Space's decoder handles FARM-1 event E10 (buffer release) incorrectly, so a set Wait flag can stall the link. *(PDF p. 121)*


## Cited by these wiki pages (8)

- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Methodology](../about/methodology.md)
- [ST[02] Device access](../ecss/pus/st02-device-access.md)
- [Security in CCSDS space links](../ccsds/security.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (108 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Document Change Record | 4 |
    |  | References | 5 |
    |  | Table of Contents | 7 |
    | 1 | Purpose and Scope | 13 |
    | 1.1 | Purpose | 13 |
    | 1.2 | Scope | 13 |
    | 2 | Applicable Documents | 15 |
    | 3 | Overview of the Telecommand Subsystem Requirements | 17 |
    | 3.1 | Scope of the Requirements | 17 |
    | 3.2 | Operational Requirements | 17 |
    | 3.2.1 | Dual Access and Redundancy | 17 |
    | 3.2.2 | Monitoring via Telemetry | 18 |
    | 3.2.3 | Readiness and Accessibility | 18 |
    | 3.2.4 | Automated Sequence-Controlled Service | 19 |
    | 3.2.5 | Multiplexing of Data Streams | 20 |
    | 3.2.6 | Authentication of Command Data | 20 |
    | 3.3 | Data Communications Requirements | 21 |
    | 3.3.1 | Probability of Errors | 21 |
    | 3.3.2 | Maximum Uplink Symbol Rate | 22 |
    | 3.4 | Implementation Requirements | 23 |
    | 3.4.1 | Physical Layer (Symbol Stream) Interface Capability | 23 |
    | 3.4.2 | Telemetry Interface Capability | 23 |
    | 3.4.3 | MAP Interface Capability | 24 |
    | 3.4.4 | Mission-Specific Data Programming Capability | 24 |
    | 3.4.5 | Immunity to Changes of State | 25 |
    | 3.4.6 | Physical Distribution of Major Functions | 25 |
    | 3.4.7 | Cross-Coupling of Major Functions with MAP Interfaces | 26 |
    | 3.4.8 | Technology and Electrical Characteristics | 27 |
    | 4 | Physical Layer | 29 |
    | 5 | Coding Layer | 31 |
    | 5.1 | Specification | 31 |
    | 5.1.1 | TC Codeblock Length | 31 |
    | 5.1.2 | Additional Information on the Coding Layer Procedures | 31 |
    | 5.1.3 | First and Last Data Transfer in the DECODE State | 32 |
    | 5.1.4 | Polynomial Forms of the BCH Code | 33 |
    | 5.1.5 | Possible Realisation of a (63,56) Modified Hamming Decoder | 34 |
    | 5.2 | Design Requirements | 36 |
    | 6 | Transfer Layer | 41 |
    | 6.1 | Specification | 41 |
    | 6.2 | Design Requirements | 41 |
    | 6.2.1 | Spacecraft Identifier | 42 |
    | 6.2.2 | Virtual Channel Identifier | 42 |
    | 6.2.3 | FARM Sliding Window Width | 42 |
    | 7 | Segmentation Layer | 43 |
    | 7.1 | Specification | 43 |
    | 7.2 | Design Requirements | 43 |
    | 7.2.1 | MAP Interface Implementation Capability | 43 |
    | 7.2.2 | Selection of Authenticated MAPs (Authenticated MAP ID Pointer) | 44 |
    | 8 | Authentication Layer | 47 |
    | 8.1 | General Specification | 47 |
    | 8.2 | The Authentication Processor | 49 |
    | 8.2.1 | Functional Concept | 49 |
    | 8.2.2 | The Hashing Function | 49 |
    | 8.2.3 | The Hard Knapsack | 52 |
    | 8.2.4 | The Deletion Box | 54 |
    | 8.2.5 | The Signature Comparator | 54 |
    | 8.2.6 | The Authentication Key | 54 |
    | 8.3 | The Supervisor | 55 |
    | 8.3.1 | Functional Concept | 55 |
    | 8.3.2 | The LAC Registers | 56 |
    | 8.3.3 | The Final Authorisation Function | 57 |
    | 8.3.4 | The Control Command Processor | 57 |
    | 8.3.5 | The Deletion Function | 57 |
    | 8.4 | Formats of the Authenticated TC Segments | 58 |
    | 8.4.1 | General Format | 58 |
    | 8.4.2 | Specific Formats | 58 |
    | 8.4.3 | "Dummy Segment" Control Command | 59 |
    | 8.4.4 | "Select Key" Control Commands | 61 |
    | 8.4.5 | "Load Fixed Key In Programmable Key Memory" Control Command | 61 |
    | 8.4.6 | "Set New LAC Count Value" Control Command | 62 |
    | 8.4.7 | "Change Programmable Key Block" Control Commands | 62 |
    | 8.5 | Operational Procedures | 63 |
    | 8.5.1 | Introduction | 63 |
    | 8.5.2 | Procedures for Changing the Programmable Key Contents | 63 |
    | 8.5.3 | Recovery Procedures | 67 |
    | 8.6 | Design Requirements | 70 |
    | 9 | Command Pulse Distribution Unit | 73 |
    | 9.1 | General Requirements | 73 |
    | 9.2 | Specification | 74 |
    | 9.2.1 | Checking the TC Segment | 74 |
    | 9.2.2 | Checking the CPDU-specific TC Packet | 75 |
    | 9.2.3 | Processing the Application Data | 76 |
    | 9.3 | Design Requirements | 77 |
    | 9.3.1 | Application Identifier | 77 |
    | 9.3.2 | Maximum Capability of the CPDU | 77 |
    | 9.3.3 | Execution of Command Instructions | 78 |
    | 9.3.4 | Data Flow Control | 78 |
    | 9.3.5 | Output Waveforms | 79 |
    | 10 | Telemetry Reporting | 81 |
    | 10.1 | General Requirements | 81 |
    | 10.1.1 | Status Data | 81 |
    | 10.1.2 | Survey Data | 82 |
    | 10.1.3 | Data Report Storage before Readout | 82 |
    | 10.1.4 | "Cold Start" Data | 83 |
    | 10.2 | CLCW Status Report | 83 |
    | 10.3 | CPDU Status Report | 84 |
    | 10.4 | AU Status Report | 85 |
    | 10.5 | Frame Analysis Report (FAR) | 86 |
    | 11 | Interfaces | 91 |
    | 11.1 | Introduction | 91 |
    | 11.2 | Physical Layer (Symbol Stream) Interface | 91 |
    | 11.3 | MAP Interface | 92 |
    | 11.4 | Telemetry Interface | 98 |
    | 11.5 | Command Pulse Outputs | 101 |
    | Appendix A | Telecommand Subsystem Configuration on board an ESA Spacecraft | 103 |
    | Appendix B | Verification of Compliance | 105 |
    | Appendix C | Differences with Early Implementations | 117 |
    | Appendix D | Glossary of Acronyms | 125 |


## Documents this one references (4)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [ESA PSS-04-105](../references/index.md#ref-esa-pss-04-105) | Radio Frequency and Modulation Standard | Issue 1, or later compatible issue 1989 | reference |
| [2] | [ESA PSS-04-107](../references/index.md#ref-esa-pss-04-107) · [library](esa-pss-04-107-issue2-april1992.md) | Packet Telecommand Standard | Issue 2, or later compatible issue 1992 | applicable |
| [3] | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | Packet Telemetry Standard | Issue 1, or later compatible issue 1988 | reference |
| THB/CS/2077/av | [THB/CS/2077/av](../references/index.md#ref-thb-cs-2077-av) | Specification for a Standard ESA/CCSDS Telecommand Decoder (development contract document, forerunner of this specification) | first issue 1986; last issue May 1988 | mentioned |

!!! note "Notes"
    This is a scanned PDF. Its text was produced by OCR (RapidOCR) and has merged words, dropped lines and scrambled tables and figures, so every number, field size and bit pattern in this entry was checked against rendered page images. The hexadecimal test vectors of Appendix B are especially garbled in the OCR and must be read from the images. This scan has no ESA cover: PDF p. 1 is the inner title page. Printed page n is PDF page n + 12 in the body (printed page 1 is PDF p. 13). Date conflict: the title page says September 1992, while the change record, copyright line and all running heads say September 1993. The library slug and the ecss.nl file name follow the title page. Section 2 names reference [2] (PSS-04-107) as the only applicable document; the other two references are background, so they are marked 'reference' here. Other oddities: the running heads of printed pp. 29-30 (PDF pp. 41-42) misprint the number as 'ESA PSS-04-141'. Clause 8.2.6 says a block can start at any of '370 (74 x 5)' octet boundaries (p. 55), while 8.4.7 says 368 (p. 62). Clause 8.4.1 gives a maximum segment length of 240 octets and a minimum of 10 octets (p. 58). The minimum includes the 9-octet tail (8.2.2, p. 52), but PSS-04-107 Figure 10.2 allows authenticated segments of up to 249 octets including the tail, so the 240-octet maximum apparently excludes it. Appendix C says PSS-04-107 Issue 1 was published 'at the beginning of 1991', whereas PSS-04-107's own change record dates Issue 1 to June 1990. Appendix B names an ESTEC section head and a private software supplier with postal and telephone details; these are not reproduced here.

