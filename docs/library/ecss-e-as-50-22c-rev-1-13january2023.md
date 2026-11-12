---
title: "ECSS Adoption Notice of CCSDS 132.0-B-3 (TM SDLP)"
description: "An ECSS Adoption Notice that makes the CCSDS Blue Book CCSDS 132.0-B-3, TM Space Data Link Protocol (Issue 3, October 2021) applicable to ECSS projects with a minimum set of changes."
tags: ["Adoption Notice", "ECSS standards"]
sources: [ecss-e-as-50-22c-rev-1-13january2023]
---

# Space engineering
Adoption Notice of CCSDS 132.0-B-3, TM Space Data Link Protocol

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-AS-50-22C Rev.1</dd><dt>Issue / version</dt><dd>First issue, Revision 1</dd><dt>Date</dt><dd>2023-01-13</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS Space Communications Working Group)</dd><dt>Authors</dt><dd>ECSS Space Communications Working Group</dd><dt>Type</dt><dd>Adoption Notice</dd><dt>Status</dt><dd>ECSS-E-AS-50-22C Rev.1 of 13 January 2023 is 'First issue, Revision 1' and replaces the first issue ECSS-E-AS-50-22C of 1 March 2021, which together with ECSS-E-AS-50-23C replaced ECSS-E-ST-50-03C (change log, p. 3). The context clause states that ECSS-E-ST-50-03C is superseded by ECSS-E-AS-50-22 and ECSS-E-AS-50-23 (latest versions) (p. 6). Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>13</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-22C-Rev.1(13January2023).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-22C-Rev.1(13January2023).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:10Z</dd><dt>SHA-256</dt><dd><code>4ca0a0b2c06a6e1de140cca1d41f579fe320884ffdcdd5224c7172ed3880cb36</code></dd><dt>Size</dt><dd>317.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-AS-50-22C-Rev.1-13January2023-.pdf">ECSS-E-AS-50-22C-Rev.1-13January2023-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ECSS **Adoption Notice** that makes the CCSDS Blue Book **CCSDS 132.0-B-3, TM Space Data Link Protocol (Issue 3, October 2021)** applicable to ECSS projects with a minimum set of changes. Together with ECSS-E-AS-50-23C (AOS), it replaces the 2008 ECSS standard ECSS-E-ST-50-03C, Telemetry transfer frame protocol. Page 6 gives the ECSS mapping from each superseded ECSS-E-ST-50-0x standard to its adoption notice and CCSDS base book.

The only normative change (Table 4-1) is an **addition**. ECSS keeps its own **extended virtual channel frame count**, which was already in ECSS-E-ST-50-03C and is not in the CCSDS book. When it is used, the Transfer Frame Secondary Header is 32 bits long (so its length field holds 3) and carries a 24-bit count of the roll-overs of the 8-bit Virtual Channel Frame Count. This gives a 32-bit frame count. Its use is tied to a master channel or to a single virtual channel and stays static for a mission phase.

Informative Annex A lists what CCSDS 132.0-B-3 adds or changes compared with ECSS-E-ST-50-03C: formal service interfaces and protocol procedures, optional SDLS and SDLS Extended Procedures interfaces (including the new Type-2 **Frame Security Report** in the OCF), different wording on frame-count resets, the Synchronization Flag now tied to the VCA service rather than to asynchronously inserted data, normative managed parameters, a PICS and **Only Idle Data frame randomization**. An engineer uses this notice with CCSDS 132.0-B-3 to configure an ECSS-compliant TM frame generator or decoder.


## Key points

- Requirement ECSS-E-AS-50-22_1530001 makes CCSDS 132.0-B-3, TM Space Data Link Protocol, Issue 3, October 2021 applicable with the amendments of Table 4-1. *(PDF p. 8)*
- Rev.1 updates the notice to the new CCSDS issue, adding clarifications and support for the SDLS Extended Procedures (CCSDS 355.1-B-1), a PICS proforma and Only Idle Data frame randomization options. *(PDF p. 3)*
- New requirement 4.1.3.1.7 allows the Transfer Frame Secondary Header to carry an extended virtual channel frame count, specified in the new section 4.1.3.4. *(PDF p. 8)*
- With the extended count the Transfer Frame Secondary Header is 32 bits (4 octets), so the Secondary Header Length field contains 3, and its data field holds the 24-bit extension. *(PDF p. 9)*
- The extension is a binary count of roll-overs of the 8-bit Virtual Channel Frame Count, giving a 32-bit count: the 24 most significant bits in the secondary header and the 8 least significant bits in the primary header. *(PDF p. 9)*
- Use of the extended count is associated with either a master channel (every frame carries it, with the value of its own virtual channel) or a single virtual channel, and is static throughout a mission phase. *(PDF p. 10)*
- CCSDS 132.0-B-3 adds optional SDLS and SDLS Extended Procedures interfaces for TM frames, including the SDLS Frame Security Report (FSR) as a new Type-2 Report (subsection 4.1.5.5); ECSS-E-ST-50-03 had no SDLS support. *(PDF p. 11)*
- Frame counts (modulo 256): CCSDS 132.0-B-3 forbids resetting them before 255 'unless it is unavoidable', where ECSS-E-ST-50-03 said 'unless there is a major system reset'. *(PDF p. 12)*
- In CCSDS 132.0-B-3 a Synchronization Flag of '1' means the frame carries a VCA-SDU; ECSS-E-ST-50-03 had used flag '1' also for legacy asynchronously inserted data. *(PDF p. 12)*
- Subsection 4.1.4.6.2 of CCSDS 132.0-B-3 specifies randomization of the data field of Only Idle Data (OID) frames, with two implementation options in its informative Annex D; ECSS-E-ST-50-03 had no such specification. *(PDF p. 12)*


## Cited by these wiki pages (6)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (19 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 5 |
    | 2 | Context information | 6 |
    | 3 | Abbreviated terms | 7 |
    | 4 | Application requirements | 8 |
    | Table 4-1 | Applicability table for CCSDS 132.0-B-3 | 8 |
    | 4.1.3.4 (new) | Extended virtual channel frame count (new section inside Table 4-1) | 8 |
    | Annex A | Differences from ECSS-E-ST-50-03C (informative) | 11 |
    | A.1 | General | 11 |
    | A.2 | Differences | 11 |
    | A.2.1 | Specification of service interfaces | 11 |
    | A.2.2 | Specification of protocol procedures | 11 |
    | A.2.3 | Interfaces for Space Data Link Security (SDLS) | 11 |
    | A.2.4 | Resetting a frame count | 12 |
    | A.2.5 | Synchronization Flag and asynchronously inserted data | 12 |
    | A.2.6 | Managed parameters | 12 |
    | A.2.7 | Protocol Implementation Conformance Statement | 12 |
    | A.2.8 | Only Idle Data Frame Randomization | 12 |
    |  | Bibliography | 13 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [CCSDS 132.0-B-3](../references/index.md#ref-ccsds-132-0-b-3) · [library](ccsds-132-0-132x0b3.md) | TM Space Data Link Protocol | Issue 3 October 2021 | normative |
|  | [CCSDS 355.1-B-1](../references/index.md#ref-ccsds-355-1-b-1) · [library](ccsds-355-1-355x1b1.md) | Space Data Link Security Protocol Extended Procedures |  | mentioned |
|  | [ECSS-E-AS-50-21C Rev.1](../references/index.md#ref-ecss-e-as-50-21c-rev-1) | Space engineering - Adoption Notice of CCSDS 131.0-B-4, TM Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-22C Rev.1](../references/index.md#ref-ecss-e-as-50-22c-rev-1) ·  | Space engineering - Adoption Notice of CCSDS 132.0-B-3, TM Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-23C Rev.1](../references/index.md#ref-ecss-e-as-50-23c-rev-1) · [library](ecss-e-as-50-23c-rev-1-13january2023.md) | Space engineering -Adoption Notice of CCSDS 732.0-B-4, AOS Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-24C Rev.1](../references/index.md#ref-ecss-e-as-50-24c-rev-1) · [library](ecss-e-as-50-24c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 231.0-B-4, TC Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-25C Rev.1](../references/index.md#ref-ecss-e-as-50-25c-rev-1) · [library](ecss-e-as-50-25c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 232.0-B-4, TC Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-26C](../references/index.md#ref-ecss-e-as-50-26c) · [library](ecss-e-as-50-26c-1march2021.md) | Space engineering - Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1 |  | bibliography |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | Space engineering - Space data links - Telemetry synchronization and channel coding | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | Space engineering - Space data links - Telemetry transfer frame protocol | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | Space engineering - Space data links - Telecommand protocols synchronization and channel coding | 31 July 2008 | bibliography |

!!! note "Notes"
    Adoption notices contain no normative-references clause; the adopted CCSDS 132.0-B-3 is listed as 'normative' because requirement ECSS-E-AS-50-22_1530001 makes it applicable (p. 8). The change log (p. 3) says Rev.1 'adds a protocol implementation conformance statement proforma as new normative Annex A' and 'only idle data frame randomization implementation options as new informative Annex D', but this notice has only one annex (the informative 'Differences from ECSS-E-ST-50-03C'); the annexes meant are Annexes A and D of CCSDS 132.0-B-3 itself (p. 12). The superseded ECSS-E-ST-50-03C is in the library as ecss-e-st-50-03c-31july2008 and the adopted CCSDS 132.0-B-3 as ccsds-132-0-132x0b3; the SDLS Extended Procedures book CCSDS 355.1-B-1 is ccsds-355-1-355x1b1; the 2021 first issue of this notice is not in the library. Companion notices in the library: ECSS-E-AS-50-21C Rev. 2 (2024), -23C Rev.1, -24C Rev.1, -25C Rev.1 and -26C. Printed page numbers equal PDF page numbers; srcgrep shows 14 PDF pages (the last one blank) while the registry gives 13.

