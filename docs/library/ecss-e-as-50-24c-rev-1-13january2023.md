---
title: "ECSS Adoption Notice of CCSDS 231.0-B-4 (TC coding)"
description: "An ECSS Adoption Notice that makes the CCSDS Blue Book CCSDS 231.0-B-4, TC Synchronization and Channel Coding (Issue 4, July 2021) applicable to ECSS projects."
tags: ["Adoption Notice", "ECSS standards"]
sources: [ecss-e-as-50-24c-rev-1-13january2023]
---

# Space engineering
Adoption Notice of CCSDS 231.0-B-4, TC Synchronization and Channel Coding

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-AS-50-24C Rev.1</dd><dt>Issue / version</dt><dd>First issue, Revision 1</dd><dt>Date</dt><dd>2023-01-13</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS Space Communications Working Group)</dd><dt>Authors</dt><dd>ECSS Space Communications Working Group</dd><dt>Type</dt><dd>Adoption Notice</dd><dt>Status</dt><dd>ECSS-E-AS-50-24C Rev.1 of 13 January 2023 is 'First issue, Revision 1' and replaces ECSS-E-AS-50-24C of 1 March 2021; the first issue, together with ECSS-E-AS-50-25C and ECSS-E-AS-50-26C, replaced ECSS-E-ST-50-04C (change log, p. 3). The context clause states that ECSS-E-ST-50-04 is superseded by this notice together with ECSS-E-AS-50-25 and ECSS-E-AS-50-26 (latest versions) (p. 6). Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>19</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-24C-Rev.1(13January2023).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-24C-Rev.1(13January2023).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:13Z</dd><dt>SHA-256</dt><dd><code>131cbf1cc54b5438eb24e3dd06ffffeb7e95ebbfc086bd5b988e981b23efe06d</code></dd><dt>Size</dt><dd>379.1 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-AS-50-24C-Rev.1-13January2023-.pdf">ECSS-E-AS-50-24C-Rev.1-13January2023-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ECSS **Adoption Notice** that makes the CCSDS Blue Book **CCSDS 231.0-B-4, TC Synchronization and Channel Coding (Issue 4, July 2021)** applicable to ECSS projects. It covers the uplink coding layer: BCH and LDPC codewords, the **CLTU**, the randomizer, the acquisition and idle sequences and the **Physical Layer Operations Procedures (PLOP)**. It replaces clauses 8 (synchronization and coding sublayer) and 9 (physical layer) of the 2008 ECSS-E-ST-50-04C, whose frame and COP-1 parts went to ECSS-E-AS-50-25C and -26C.

Table 4-1 makes the CCSDS options stricter in several ways:

* a CLTU carries **exactly one TC Transfer Frame** or a single USLP frame (CCSDS allows several TC frames);
* the modified **BCH code is always decoded in error-correcting (SEC) mode**: it corrects one bit and detects two. The error-detecting (TED) option is removed, so one error in the Start Sequence is accepted;
* the **randomizer is mandatory** for BCH as well as for LDPC, and the FECF is always used;
* the **Acquisition Sequence** is at least 16 octets of alternating ones and zeros, and the **Idle Sequence** is at least 8 bits;
* with **PLOP-2**, at least one octet of Idle Sequence shall separate consecutive CLTUs, to avoid a synchronization lockout that a false start pattern could cause;
* the managed-parameter Table 8-2 is restricted to match.

Informative Annex A lists further differences from ECSS-E-ST-50-04C: LDPC coding, normative managed parameters, formal service interfaces, the optional CLTU Repetitions parameter and USLP support. The performance annex now lives in CCSDS 230.1-G-3. Rev.1 aligns the notice with CCSDS 231.0-B-4 and USLP and corrects notes that showed the randomizer as optional for BCH. An engineer uses this notice to build or verify an ECSS-compliant spacecraft command decoder or ground CLTU generator.


## Key points

- Requirement ECSS-E-AS-50-24_1550001 makes CCSDS 231.0-B-4, TC Synchronization and Channel Coding, Issue 4, July 2021 applicable with the modifications of Table 4-1. *(PDF p. 8)*
- CCSDS 231.0-B-4 corresponds to clauses 8 (Synchronization and coding sublayer) and 9 (Physical layer) of ECSS-E-ST-50-04. *(PDF p. 6)*
- Modified Note 2 to the Transfer Frame definition: the service data unit of the Coding & Synchronization sublayer is one TC Transfer Frame or a single USLP Transfer Frame (CCSDS allows one or more TC frames); Annex A3 of CCSDS is changed in the same way. *(PDF p. 8)*
- Clause 2.2.2 is changed so that the modified BCH code is decoded in error-correcting mode and the FECF is used to reduce the probability of undetected errors. *(PDF p. 9)*
- Randomization is not optional for either BCH or LDPC: clauses 2.2.4, 3.4.3, Note 2 of 5.2.3, Table 5-1 and 6.1 are modified, Note 2 of 6.3.1 is deleted, and the Table 8-2 Randomizer row allows only 'Used'. *(PDF p. 9)*
- Clause 3.5 is modified: BCH codewords shall be decoded in Single Error Correction (SEC) mode, correcting one bit and detecting two; the Triple Error Detection (TED) option is deleted. *(PDF p. 10)*
- With BCH coding, the search for the Start Sequence in State 2 accepts a Start Sequence containing one error; Table 8-2 allows only 'Error-Correcting' decoding and '1' error in the Start Sequence. *(PDF p. 11)*
- Clause 7.2.2 is modified: the Acquisition Sequence minimum length shall be 16 octets (CCSDS: preferred minimum), with alternating ones and zeros. *(PDF p. 13)*
- Clause 7.2.4 is modified: the Idle Sequence shall be at least 8 bits long; its maximum length is unconstrained. *(PDF p. 13)*
- Clause 7.5.2 is modified: with PLOP-2 a minimum Idle Sequence of one octet shall be inserted between each CLTU, to prevent a lockout when a CLTU start pattern is missed and a false start pattern spans the last BCH codeword and the Tail Sequence. *(PDF p. 14)*
- Annex A: CCSDS 231.0-B-4 adds LDPC coding (ECSS-E-ST-50-04 had only the modified BCH code), normative managed parameters (formerly informative Annex E), formal service interfaces and the optional Repetitions parameter for CLTU transfer. *(PDF p. 17)*
- ECSS-E-ST-50-04 Annex D (frame rejection and undetected error rates) has no equivalent in CCSDS 231.0-B-4; similar data is in CCSDS 230.1-G-3. CCSDS 231.0-B-4 supports both TC SDLP and USLP frames. *(PDF p. 18)*


## Cited by these wiki pages (8)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TC synchronization and channel coding: the CLTU (CCSDS 231.0-B-4)](../ccsds/tc-coding-cltu.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (16 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 5 |
    | 2 | Context information | 6 |
    | 3 | Abbreviated terms | 7 |
    | 4 | Application requirements | 8 |
    | Table 4-1 | Applicability table for CCSDS 231.0-B-4 | 8 |
    | Annex A | Differences from ECSS-E-ST-50-04C (informative) | 17 |
    | A.1 | General | 17 |
    | A.2 | Differences | 17 |
    | A.2.1 | Coding methods | 17 |
    | A.2.2 | Managed parameters | 17 |
    | A.2.3 | Specification of service interfaces | 17 |
    | A.2.4 | Addition of optional Repetitions parameter | 18 |
    | A.2.5 | Application profiles | 18 |
    | A.2.6 | USLP Transfer Frame | 18 |
    |  | Bibliography | 19 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [CCSDS 231.0-B-4](../references/index.md#ref-ccsds-231-0-b-4) · [library](ccsds-231-0-231x0b4e1.md), [library](ccsds-231-0-231x0b4e1c1.md) | TC Synchronization and Channel Coding | Issue 4 July 2021 | normative |
|  | [ECSS-E-AS-50-21C Rev.1](../references/index.md#ref-ecss-e-as-50-21c-rev-1) | Space engineering - Adoption Notice of CCSDS 131.0-B-4, TM Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-22C Rev.1](../references/index.md#ref-ecss-e-as-50-22c-rev-1) · [library](ecss-e-as-50-22c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 132.0-B-3, TM Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-23C Rev.1](../references/index.md#ref-ecss-e-as-50-23c-rev-1) · [library](ecss-e-as-50-23c-rev-1-13january2023.md) | Space engineering -Adoption Notice of CCSDS 732.0-B-4, AOS Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-24C Rev.1](../references/index.md#ref-ecss-e-as-50-24c-rev-1) ·  | Space engineering - Adoption Notice of CCSDS 231.0-B-4, TC Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-25C Rev.1](../references/index.md#ref-ecss-e-as-50-25c-rev-1) · [library](ecss-e-as-50-25c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 232.0-B-4, TC Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-26C](../references/index.md#ref-ecss-e-as-50-26c) · [library](ecss-e-as-50-26c-1march2021.md) | Space engineering - Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1 |  | bibliography |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | Space engineering - Space data links - Telemetry synchronization and channel coding | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | Space engineering - Space data links - Telemetry transfer frame protocol | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | Space engineering - Space data links - Telecommand protocols synchronization and channel coding | 31 July 2008 | bibliography |
|  | [CCSDS 230.1-G-3](../references/index.md#ref-ccsds-230-1-g-3) · [library](ccsds-230-1-230x1g3e1.md) | TC Synchronization and Channel Coding - Summary of Concept and Rationale – Green Book | Issue 3 October 2021 | bibliography |

!!! note "Notes"
    Adoption notices contain no normative-references clause; the adopted CCSDS 231.0-B-4 is listed as 'normative' because requirement ECSS-E-AS-50-24_1550001 makes it applicable (p. 8). The context clause says the coding schemes are 'for use with CCSDS 231.0-B-4, TC Space Data Link Protocol' (p. 6), a typo for CCSDS 232.0-B-4. The change log cites 'Note 2 to Transfer Frame definition in 1.6.1.2' (p. 3) while Table 4-1 says 1.6.1.3 (p. 8). Annex A.2.6 prints 'CSDS 231.0-B-4' (p. 18). Table 4-1 cells are extracted with interleaved columns (pp. 10, 12, 14). The bibliography lists the TM coding notice at Rev.1 (CCSDS 131.0-B-4); the library holds the newer ECSS-E-AS-50-21C Rev. 2 (CCSDS 131.0-B-5). The superseded ECSS-E-ST-50-04C is in the library as ecss-e-st-50-04c31july2008 and CCSDS 231.0-B-4 as ccsds-231-0-231x0b4e1 (with a later corrigendum copy, ccsds-231-0-231x0b4e1c1). Printed page numbers equal PDF page numbers; srcgrep shows 20 PDF pages (the last one blank) while the registry gives 19.

