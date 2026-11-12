---
title: "ECSS Adoption Notice of CCSDS 131.0-B-5 (TM coding)"
description: "An ECSS Adoption Notice for telemetry synchronization and channel coding."
tags: ["Adoption Notice", "ECSS standards"]
sources: [ecss-e-as-50-21c-rev-2-5december2024]
---

# Space engineering
Adoption Notice of CCSDS 131.0-B-5, TM Synchronization and Channel Coding

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-AS-50-21C Rev. 2</dd><dt>Issue / version</dt><dd>First issue, Revision 2</dd><dt>Date</dt><dd>2024-12-05</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS Space Communications Working Group)</dd><dt>Authors</dt><dd>ECSS Space Communications Working Group</dd><dt>Type</dt><dd>Adoption Notice</dd><dt>Status</dt><dd>ECSS-E-AS-50-21C Rev. 2 of 5 December 2024 is 'First issue, Revision 2'. It follows ECSS-E-AS-50-21C (1 March 2021, first issue, which superseded ECSS-E-ST-50-01C of 31 July 2008) and ECSS-E-AS-50-21C Rev.1 (13 January 2023) (change log, p. 3). The context clause states that ECSS-E-ST-50-01C is superseded by ECSS-E-AS-50-21 (latest version) (p. 6). Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>12</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2024/12/ECSS-E-AS-50-21C-Rev.2(5December2024).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2024/12/ECSS-E-AS-50-21C-Rev.2(5December2024).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:08Z</dd><dt>SHA-256</dt><dd><code>5a79cc6745e7ac4352c6dcfa8215fa00611c11d6d1ef9b35552b0635bfa51f0c</code></dd><dt>Size</dt><dd>346.3 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-AS-50-21C-Rev.2-5December2024-.pdf">ECSS-E-AS-50-21C-Rev.2-5December2024-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ECSS **Adoption Notice** for telemetry synchronization and channel coding. Instead of keeping its own coding standard, ECSS makes the CCSDS Blue Book **CCSDS 131.0-B-5, TM Synchronization and Channel Coding (Issue 5, September 2023)** applicable as written, apart from a short list of amendments. It is the current ECSS replacement for the 2008 stand-alone standard ECSS-E-ST-50-01C, and page 6 repeats the ECSS mapping table from the superseded ECSS-E-ST-50-01C/-03C/-04C to the six adoption notices ECSS-E-AS-50-21 to -26 and their CCSDS base books.

Clause 4 (Table 4-1) holds the normative changes:

* soft-decision decoding with at least **3-bit quantization** becomes mandatory for the convolutional decoder (CCSDS only recommends it);
* the **Reed-Solomon E=8** code may only be used with **4D-8PSK trellis-coded modulation**, only with interleaving depth I=8, and it is never concatenated with a convolutional code. E=16 keeps I=1, 2, 3, 4, 5 and 8;
* the interleaving depth is fixed on a physical channel for a mission phase (the word 'normally' is deleted).

Informative Annex A lists what changed compared with ECSS-E-ST-50-01C. CCSDS 131.0-B-5 adds LDPC codes, turbo rates 1/3 and 1/6, the matching ASM patterns, a 131071-bit pseudo-randomizer for high-rate links (the 255-bit one stays for legacy use), normative frame lengths and managed parameters, USLP frames, ground-to-space use, formal service interfaces and security considerations. The old application-profile annex has no equivalent in the CCSDS book. Rev. 2 updates the notice to the CCSDS issue with the new randomizer and adds the differences that earlier revisions missed. An engineer uses this notice to see which CCSDS TM coding options an ECSS project may use.


## Key points

- Requirement ECSS-E-AS-50-21_1520001 makes CCSDS 131.0-B-5, TM Synchronization and Channel Coding, Issue 5 (September 2023) applicable as written with the amendments of Table 4-1. *(PDF p. 8)*
- Rev. 2 updates the notice to the CCSDS issue that adds a revised pseudo-randomizer for high-data-rate links, and adds previously missed differences concerning USLP, turbo code rates and ASM bit patterns; Rev.1 (13 January 2023) had added USLP and ground-to-space support. *(PDF p. 3)*
- Mapping of superseded standards: ECSS-E-ST-50-01C maps to ECSS-E-AS-50-21 (CCSDS 131.0-B-x); ECSS-E-ST-50-03C to -22 (132.0-B-x) and -23 (732.0-B-x); ECSS-E-ST-50-04C to -24 (231.0-B-x), -25 (232.0-B-x) and -26 (232.1-B-x). *(PDF p. 6)*
- Clause 3.2.4 is modified: soft bit decisions with at least three-bit quantization shall be used for the decoder of the convolutional code (CCSDS says 'should ... whenever constraints permit'). *(PDF p. 8)*
- New requirement 4.3.1c: the Reed-Solomon code with E=8 shall not be used unless the modulation is 4D-8PSK-TCM. *(PDF p. 9)*
- Clause 4.3.5.1 is modified: interleaving depth I = 1, 2, 3, 4, 5 or 8 when E=16, and I = 8 only when E=8; clause 4.3.5.2 makes the interleaving depth fixed on a Physical Channel for a Mission Phase. *(PDF p. 9)*
- Clause 5.1 is modified so that concatenated codes use only the E=16 Reed-Solomon code with a convolutional code; a new NOTE states that E=8 is not concatenated with a convolutional code. *(PDF p. 9)*
- CCSDS 131.0-B-5 specifies turbo rates 1/2, 1/3, 1/4 and 1/6, whereas ECSS-E-ST-50-01 had only 1/2 and 1/4; it also adds LDPC codes, which ECSS-E-ST-50-01 did not include. *(PDF p. 10)*
- Section 10 of CCSDS 131.0-B-5 specifies a 131071-bit pseudo-randomizer that replaces the 255-bit randomizer of ECSS-E-ST-50-01 unless backward compatibility with legacy systems requires the latter. *(PDF p. 10)*
- CCSDS 131.0-B-5 supports TM, AOS and USLP (CCSDS 732.1-B-3) frames and also ground-to-space and space-to-space links (Section 13); ECSS-E-ST-50-01 covered neither USLP nor such use. *(PDF p. 11)*
- The mission configuration parameters of ECSS-E-ST-50-01 Annex G become normative managed parameters in Section 12 of CCSDS 131.0-B-5; the application profiles of ECSS-E-ST-50-01 Annex D have no equivalent (guidance is in CCSDS 131.4-M-1-S and CCSDS 130.1-G-3). *(PDF p. 11)*


## Cited by these wiki pages (8)

- [AOS Space Data Link Protocol (CCSDS 732.0-B-4)](../ccsds/aos.md)
- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (21 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 5 |
    | 2 | Context information | 6 |
    | 3 | Abbreviated terms | 7 |
    | 4 | Application requirements | 8 |
    | Table 4-1 | Applicability table for CCSDS 131.0-B-5 | 8 |
    | Annex A | Differences from ECSS-E-ST-50-01C (informative) | 10 |
    | A.1 | General | 10 |
    | A.2 | Differences | 10 |
    | A.2.1 | Addition of LDPC codes | 10 |
    | A.2.2 | Addition of turbo code rates | 10 |
    | A.2.3 | ASM bit patterns | 10 |
    | A.2.4 | Pseudo-randomizer | 10 |
    | A.2.5 | Transfer frame lengths | 11 |
    | A.2.6 | USLP transfer frame | 11 |
    | A.2.7 | Managed parameters | 11 |
    | A.2.8 | Ground to space | 11 |
    | A.2.9 | Specification of service interfaces | 11 |
    | A.2.10 | Security considerations | 11 |
    | A.2.11 | Application profiles | 11 |
    |  | Bibliography | 12 |


## Documents this one references (14)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [CCSDS 131.0-B-5](../references/index.md#ref-ccsds-131-0-b-5) · [library](ccsds-131-0-131x0b5.md) | TM Synchronization and Channel Coding | Issue 5 September 2023 | normative |
|  | [ECSS-E-AS-50-21C Rev.2](../references/index.md#ref-ecss-e-as-50-21c-rev-2) | Space engineering - Adoption Notice of CCSDS 131.0-B-5, TM Synchronization and Channel Coding | Rev.2 | bibliography |
|  | [ECSS-E-AS-50-22C Rev.1](../references/index.md#ref-ecss-e-as-50-22c-rev-1) · [library](ecss-e-as-50-22c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 132.0-B-3, TM Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-23C Rev.1](../references/index.md#ref-ecss-e-as-50-23c-rev-1) · [library](ecss-e-as-50-23c-rev-1-13january2023.md) | Space engineering -Adoption Notice of CCSDS 732.0-B-4, AOS Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-24C Rev.1](../references/index.md#ref-ecss-e-as-50-24c-rev-1) · [library](ecss-e-as-50-24c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 231.0-B-4, TC Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-25C Rev.1](../references/index.md#ref-ecss-e-as-50-25c-rev-1) · [library](ecss-e-as-50-25c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 232.0-B-4, TC Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-26C](../references/index.md#ref-ecss-e-as-50-26c) · [library](ecss-e-as-50-26c-1march2021.md) | Space engineering - Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1 |  | bibliography |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | Space engineering - Space data links - Telemetry synchronization and channel coding | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | Space engineering - Space data links - Telemetry transfer frame protocol | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | Space engineering - Space data links - Telecommand protocols synchronization and channel coding | 31 July 2008 | bibliography |
|  | [CCSDS 130.1-G-3](../references/index.md#ref-ccsds-130-1-g-3) · [library](ccsds-130-1-130x1g3e1.md) | TM Synchronization and Channel Coding, Summary of Concept and Rationale – Green Book | Issue 3 June 2020 | bibliography |
|  | [CCSDS 131.4-M-1-S](../references/index.md#ref-ccsds-131-4-m-1-s) | TM Channel Coding Profiles – Silver Book | Issue 1 July 2011 | bibliography |
|  | [CCSDS 230.1-G-3](../references/index.md#ref-ccsds-230-1-g-3) · [library](ccsds-230-1-230x1g3e1.md) | TC Synchronization and Channel Coding, Summary of Concept and Rationale – Green Book | Issue 3 October 2021 | bibliography |
|  | [CCSDS 732.1-B-3](../references/index.md#ref-ccsds-732-1-b-3) · [library](ccsds-732-1-732x1b3e1.md) | Unified Space Data Link Protocol – Blue Book | Issue 3 June 2024 | bibliography |

!!! note "Notes"
    Adoption notices contain no normative-references clause; the adopted CCSDS 131.0-B-5 is listed as 'normative' because requirement ECSS-E-AS-50-21_1520001 makes it applicable (p. 8). Requirement ECSS-E-AS-50-21_1520002 carries only Table 4-1. This is the newest of the TM coding notices; the superseded ECSS-E-ST-50-01C (31 July 2008) is in the library as ecss-e-st-50-01c31july2008, and the adopted CCSDS 131.0-B-5 as ccsds-131-0-131x0b5; the library also holds the later CCSDS 131.0-B-6 (ccsds-131-0-131x0b6ec1), which this notice does not adopt. The 21C first issue (2021) and Rev.1 (2023) are not in the library. Its bibliography still lists the companion notices at their 2023 revisions (ECSS-E-AS-50-22C to -25C Rev.1) and ECSS-E-AS-50-26C. Unlike the 2023 notices, the foreword omits the sentence about the series of ECSS standards. Printed page numbers equal PDF page numbers; srcgrep shows 13 PDF pages (the last one blank) while the registry gives 12.

