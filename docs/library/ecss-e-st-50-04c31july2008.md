---
title: "ECSS Telecommand Protocols, Sync and Coding (2008)"
description: "The 2008 ECSS standard for the whole telecommand (TC) uplink data link, from the segment to the radiated carrier."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50-04c31july2008]
---

# Space engineering
Space data links - Telecommand protocols, synchronization and channel coding

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50-04C</dd><dt>Issue / version</dt><dd>Second issue</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue (31 July 2008), following ECSS-E-50-04A (first issue, 14 November 2007); ECSS-E-50-04B was never issued (change log, p. 3). The document does not state that it is superseded. The library's later ECSS adoption notices state that it is replaced by ECSS-E-AS-50-24C (CCSDS 231.0-B-x), ECSS-E-AS-50-25C (CCSDS 232.0-B-x) and ECSS-E-AS-50-26C (CCSDS 232.1-B-x) (e.g. ECSS-E-AS-50-24C Rev.1, pp. 3 and 6).</dd><dt>Pages</dt><dd>155</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-04C31July2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-04C31July2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:57Z</dd><dt>SHA-256</dt><dd><code>5fc484a2aeae0431d2488f70f7e452a78a9a8817efa8e394d37bcd860906f268</code></dd><dt>Size</dt><dd>2.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50-04C31July2008.pdf">ECSS-E-ST-50-04C31July2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The 2008 ECSS standard for the whole **telecommand (TC) uplink data link**, from the segment to the radiated carrier. It closely follows CCSDS 231.0-B-1, 232.0-B-1 and 232.1-B-1, and Annex B compares it with the 1992 ESA Packet telecommand standard ESA-PSS-04-107. ECSS has since replaced it with three adoption notices.

Its clauses follow the protocol stack:

* **Segmentation sublayer** (clause 5): the TC Segment, a one-octet header with 2-bit Sequence Flags and a 6-bit MAP Identifier, plus blocking of several packets into one frame, segmentation and reassembly, MAP multiplexing and the optional **Packet Assembly Controller** with lockout and MAP reset;
* **Transfer sublayer** (clause 6): the variable-length **TC Transfer Frame** (5-octet primary header with version, Bypass and Control Command flags, 10-bit SCID, 6-bit VCID and 10-bit Frame Length; up to 1024 octets; mandatory 16-bit FECF), the 4-octet **CLCW** carried in the TM OCF, and the frame procedures and VC multiplexing;
* **COP-1** (clause 7): FOP-1 and FARM-1 variables, the sliding window, the service interfaces, the Unlock and Set V(R) control commands and complete state tables;
* **Synchronization and channel coding** (clause 8): the (63,56) modified **BCH codeblock**, the **CLTU** with Start Sequence 0xEB90 and Tail Sequence 0xC5C5C5C5C5C5C579, the mandatory randomizer, fill, and SEC-only decoding;
* **Physical layer** (clause 9): acquisition and idle sequences, carrier modulation modes CMM-1 to CMM-4, and **PLOP-1/PLOP-2**.

The annexes give the FECF algorithm, the changes from ESA-PSS-04-107 (for example frames of 1024 instead of 256 octets, and COP-1B instead of COP-1A), the differences from CCSDS (one frame per CLTU, mandatory FECF and randomizer), frame rejection and undetected-error performance, and the mission configuration parameters. It remains a compact, complete reference for ESA telecommand chains of that generation.


## Key points

- Scope: data structures and protocols for a telecommand space data link and the physical layer operation procedure; normally ground-to-space, but usable for space-to-space links. *(PDF p. 12)*
- The stack comprises the segmentation sublayer, the transfer sublayer (with COP-1) and the synchronization and channel coding sublayer of the data link layer, plus the physical layer procedures at the sending end; security sublayers may be inserted by tailoring. *(PDF p. 17)*
- The TC Segment Header holds 2-bit Sequence Flags (bits 0-1) and a 6-bit MAP Identifier (bits 2-7), allowing up to 64 MAPs per virtual channel. *(PDF p. 23)*
- The optional Packet Assembly Controller pairs a data MAP (MAP ID MSB '0') with a control MAP (same ID with MSB '1'); on an exception it enters lockout until a MAP reset control segment is received. *(PDF p. 30)*
- A TC Transfer Frame consists of a 5-octet Primary Header, the Data Field and a 2-octet Frame Error Control Field, all always present; its length never exceeds 1024 octets and is at least 8 octets. *(PDF p. 38)*
- TC Primary Header fields: Transfer Frame Version Number 2 bits, Bypass Flag 1, Control Command Flag 1, Reserved Spare 2, Spacecraft Identifier 10, Virtual Channel Identifier 6, Frame Length 10 (bits 22-31), Frame Sequence Number 8. *(PDF p. 38)*
- The CLCW is 4 octets, conveyed in the Operational Control Field of a telemetry transfer frame; the No Bit Lock Flag is bit 17. *(PDF p. 45)*
- COP-1 control commands are carried in type-BC frames: Unlock is a single all-zeros octet; Set V(R) is three octets, '10000010', all zeros, then the new V(R) value. *(PDF p. 89)*
- A BCH codeblock is 8 octets: 56 information bits, 7 complemented parity bits from the (63,56) modified BCH code with g(x) = x^7 + x^6 + x^2 + 1, and a filler bit always '0'. *(PDF p. 118)*
- A CLTU is a 16-bit Start Sequence (EB90), Encoded Data (one or more BCH codeblocks carrying exactly one TC Transfer Frame) and an 8-octet Tail Sequence of seven C5 octets followed by 79. *(PDF p. 115)*
- The randomizer is used in all CLTUs, with h(x) = x^8 + x^6 + x^4 + x^3 + x^2 + x + 1 (period 255 bits); the bit transition generator stays all-ones until the Start Sequence is detected. *(PDF p. 117)*
- Codeblocks shall be decoded in error-correcting (SEC) mode: one bit in error is corrected and two are detected. *(PDF p. 122)*
- The acquisition sequence shall be at least 128 bits of alternating ones and zeros. *(PDF p. 123)*
- The idle sequence shall be at least 8 bits of alternating ones and zeros. *(PDF p. 124)*
- Carrier modulation modes: CMM-1 unmodulated carrier, CMM-2 acquisition sequence, CMM-3 telecommand data (CLTU), CMM-4 idle sequence. *(PDF p. 125)*
- PLOP-2 should be used in preference to PLOP-1 because it supports a higher data throughput; with PLOP-2 a minimum idle sequence of one octet is inserted between CLTUs. *(PDF p. 126)*
- Changes from ESA-PSS-04-107: blocking of packets, VCs without segments, no authentication or Segment Trailer, maximum frame length 1024 instead of 256 octets, COP-1B instead of COP-1A, a different Tail Sequence, randomization added, only 64-bit codeblocks and PLOP-1 added. *(PDF p. 132)*
- Differences from CCSDS: the PAC (so segments can be one octet), exactly one frame per CLTU, mandatory FECF (minimum frame 8 instead of 6 octets), always accepting a one-bit error in the Start Sequence, mandatory randomization and SEC, mandatory idle between CLTUs in PLOP-2 and a defined No Bit Lock Flag. *(PDF p. 135)*
- Annex D gives frame rejection and undetected error performance for channel bit error rates of 10^-4, 10^-5 and 10^-6, assuming PLOP-2 on an AWGN binary symmetric channel. *(PDF p. 137)*


## Cited by these wiki pages (8)

- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TC synchronization and channel coding: the CLTU (CCSDS 231.0-B-4)](../ccsds/tc-coding-cltu.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (62 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 12 |
    | 2 | Normative references | 13 |
    | 3 | Terms, definitions and abbreviated terms | 14 |
    | 3.1 | Terms from other standards | 14 |
    | 3.2 | Terms specific to the present standard | 14 |
    | 3.3 | Abbreviated terms | 15 |
    | 3.4 | Conventions | 16 |
    | 4 | Overview | 17 |
    | 4.1 | Presentation | 17 |
    | 4.2 | Protocol profiles | 17 |
    | 4.3 | Segmentation sublayer | 18 |
    | 4.4 | Transfer sublayer | 19 |
    | 4.5 | Synchronization and channel coding sublayer | 19 |
    | 4.6 | Physical layer | 19 |
    | 4.7 | Virtual channels | 20 |
    | 5 | Segmentation sublayer | 21 |
    | 5.1 | Overview | 21 |
    | 5.2 | TC Segment | 22 |
    | 5.3 | Transfer notification | 24 |
    | 5.4 | Blocking of packets | 26 |
    | 5.5 | Segmentation | 28 |
    | 5.6 | MAP multiplexing | 33 |
    | 6 | Transfer sublayer | 35 |
    | 6.1 | Overview | 35 |
    | 6.2 | TC Transfer Frame definition | 37 |
    | 6.3 | CLCW definition | 45 |
    | 6.4 | Frame header procedure | 51 |
    | 6.5 | Frame error control procedure at the sending end | 51 |
    | 6.6 | Frame delimiting and fill removal procedure | 51 |
    | 6.7 | Frame error control procedure at the receiving end | 52 |
    | 6.8 | Frame header validation procedure | 52 |
    | 6.9 | Virtual channel multiplexing | 53 |
    | 7 | COP-1 | 55 |
    | 7.1 | Overview | 55 |
    | 7.2 | Internal variables | 58 |
    | 7.3 | Features of COP-1 interfaces | 71 |
    | 7.4 | Upper interface of COP-1 at the sending end | 73 |
    | 7.5 | Upper interface of COP-1 at the receiving end | 84 |
    | 7.6 | Lower interface of COP-1 at the sending end | 86 |
    | 7.7 | Lower interface of COP-1 at the receiving end | 88 |
    | 7.8 | Format of COP-1 control commands | 89 |
    | 7.9 | Actions | 90 |
    | 8 | Synchronization and channel coding sublayer | 113 |
    | 8.1 | Overview | 113 |
    | 8.2 | BCH codeblock | 113 |
    | 8.3 | Communications link transmission unit (CLTU) | 115 |
    | 8.4 | Randomization procedure | 117 |
    | 8.5 | BCH codeblock encoding procedure | 118 |
    | 8.6 | Fill bits | 119 |
    | 8.7 | Channel logic at the receiving end | 120 |
    | 8.8 | BCH codeblock decoding procedures | 121 |
    | 9 | Physical layer | 123 |
    | 9.1 | Overview | 123 |
    | 9.2 | Physical layer data structures | 123 |
    | 9.3 | Physical layer procedures | 124 |
    | Annex A | Frame error control (informative) | 129 |
    | Annex B | Changes from ESA-PSS-04-107 (informative) | 131 |
    | Annex C | Differences from CCSDS recommendations (informative) | 134 |
    | Annex D | Performance issues (informative) | 137 |
    | Annex E | Mission configuration parameters (informative) | 149 |
    |  | Bibliography | 155 |


## Documents this one references (15)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system - Glossary of terms |  | normative |
| CCSDS 135.0-B-3 | [CCSDS 135.0-B-3](../references/index.md#ref-ccsds-135-0-b-3) | Space Link Identifiers – Blue Book | Issue 3 October 2006 | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering - Communications |  | bibliography |
| ECSS-E-ST-50-03 | [ECSS-E-ST-50-03](../references/index.md#ref-ecss-e-st-50-03) | Space engineering – Space data links – Telemetry transfer frame protocol |  | bibliography |
| ECSS-E-ST-50-05 | [ECSS-E-ST-50-05](../references/index.md#ref-ecss-e-st-50-05) | Space engineering – Radio frequency and modulation |  | bibliography |
| ECSS-E-HB-50 | [ECSS-E-HB-50](../references/index.md#ref-ecss-e-hb-50) | Space engineering – Communications guidelines |  | bibliography |
| CCSDS 230.1-G-1 | [CCSDS 230.1-G-1](../references/index.md#ref-ccsds-230-1-g-1) | TC Synchronization and Channel Coding – Green Book | Issue 1 June 2006 | bibliography |
| CCSDS 231.0-B-1 | [CCSDS 231.0-B-1](../references/index.md#ref-ccsds-231-0-b-1) | TC Synchronization and Channel Coding – Blue Book | Issue 1 September 2003 | bibliography |
| CCSDS 232.0-B-1 | [CCSDS 232.0-B-1](../references/index.md#ref-ccsds-232-0-b-1) | TC Space Data Link Protocol – Blue Book | Issue 1 September 2003 | bibliography |
| CCSDS 232.1-B-1 | [CCSDS 232.1-B-1](../references/index.md#ref-ccsds-232-1-b-1) | Communications Operation Procedure-1 – Blue Book | Issue 1 September 2003 | bibliography |
| CCSDS 320.0-B-4 | [CCSDS 320.0-B-4](../references/index.md#ref-ccsds-320-0-b-4) | CCSDS Global Spacecraft Identification Field Code Assignment Control Procedures – Blue Book | Issue 3 January 2006 | bibliography |
| CCSDS 732.0-B-2 | [CCSDS 732.0-B-2](../references/index.md#ref-ccsds-732-0-b-2) | AOS Space Data Link Protocol – Blue Book | Issue 2 July 2006 | bibliography |
| CCSDS 912.3-B-1 | [CCSDS 912.3-B-1](../references/index.md#ref-ccsds-912-3-b-1) | Space Link Extension – Forward Space Packet Service Specification – Blue Book | Issue 1 November 2004 | bibliography |
| ESA-PSS-04-107 | [ESA-PSS-04-107](../references/index.md#ref-esa-pss-04-107) · [library](esa-pss-04-107-issue2-april1992.md) | Packet telecommand standard | Issue 2 April 1992 | bibliography |

!!! note "Notes"
    Unlike its sister standards, the foreword does not name a working group. Superseded by ECSS-E-AS-50-24C, -25C and -26C (all in the library; the CCSDS books they adopt, ccsds-231-0-231x0b4e1, ccsds-232-0-232x0b4e1c1 and ccsds-232-1-232x1b2e2c1, are also in the library). The normative CCSDS 135.0-B-3 is in the library at the later issue CCSDS 135.0-B-4 (ccsds-135-0-135x0b4s), and the FSP book at CCSDS 912.3-B-3 (ccsds-912-3-912x3b3s). Predecessor ESA-PSS-04-107 Issue 2 (April 1992) is in the library as esa-pss-04-107-issue2-april1992. The extraction uses Unicode non-breaking hyphens (U+2011) in document IDs. Figures (frame and CLCW formats, encoder, state diagrams, CMM sequences) are images; the CMM table is on p. 125. Clause 3.3 cites 'ECSS-ST-00-01' (p. 15) for ECSS-S-ST-00-01, and its NOTE names 'AC, CB and BD frames' where AD, BC and BD are meant. The bibliography gives CCSDS 320.0-B-4 as 'Issue 3, January 2006' (p. 155). Annex B prints 'PLOP_2' (p. 133). Superscripts are flattened in the text ('x7 + x6'). Printed page numbers equal PDF page numbers; srcgrep shows 156 PDF pages (the last one blank) while the registry gives 155.

