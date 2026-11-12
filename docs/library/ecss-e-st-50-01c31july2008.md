---
title: "ECSS TM Synchronization and Channel Coding (2008)"
description: "The 2008 ECSS standard for telemetry synchronization and channel coding: how the downlink stream of TM or AOS transfer frames is protected with error-correcting codes, framed with a sync marker and ra"
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50-01c31july2008]
---

# Space engineering
Space data links - Telemetry synchronization and channel coding

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50-01C</dd><dt>Issue / version</dt><dd>Second issue</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-50-01C Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-50-01C Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue (31 July 2008), following ECSS-E-50-01A (first issue, 6 November 2007); ECSS-E-50-01B was never issued (change log, p. 3). The document does not state that it is superseded. The library's ECSS-E-AS-50-21C Rev. 2 (5 December 2024) states that ECSS-E-ST-50-01C is superseded by ECSS-E-AS-50-21 (latest version), the ECSS Adoption Notice of CCSDS 131.0-B-x (that notice, pp. 3 and 6).</dd><dt>Pages</dt><dd>69</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-01C31July2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-01C31July2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:21Z</dd><dt>SHA-256</dt><dd><code>d2b235477bcb4a7a9a562077494e36885470403d140b90462fc47ccd3cc29255</code></dd><dt>Size</dt><dd>1.6 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50-01C31July2008.pdf">ECSS-E-ST-50-01C31July2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The 2008 ECSS standard for **telemetry synchronization and channel coding**: how the downlink stream of TM or AOS transfer frames is protected with error-correcting codes, framed with a sync marker and randomized. It closely follows CCSDS 131.0-B-1, whose codes it subsets, in 'shall' requirement form, and Annex E compares it with the 1989 ESA-PSS-04-103 Telemetry channel coding standard. ECSS has since superseded it with the adoption notice ECSS-E-AS-50-21.

Clause 4 gives an overview of the coding concepts. The normative clauses then specify:

* the **convolutional code** (clause 5): rate 1/2, constraint length 7, connection vectors 171/133 octal with inversion of G2, Viterbi decoding with soft decisions of at least 3 bits, and punctured rates 2/3, 3/4, 5/6 and 7/8;
* the **Reed-Solomon (255,223) code** with E=16 (clause 6): field and code generator polynomials, interleaving depth I=1, 2, 3, 4, 5 or 8, virtual fill, the dual-basis representation, and E=8 (255,239) restricted to 4D-8PSK-TCM with I=8;
* **turbo codes** of rates 1/2 and 1/4 (clause 7) for information blocks of 1784, 3568, 7136 and 8920 bits;
* **frame synchronization** with the attached sync marker (clause 8): 0x1ACFFC1D, longer turbo ASMs and the embedded ASM 0x352EF853;
* the 255-bit **pseudo-randomizer** h(x) = x^8+x^7+x^5+x^3+1 (clause 9).

The informative annexes give the Berlekamp/conventional transformation, Reed-Solomon coefficient expansions, compatible frame lengths (for example 1115 octets at I=5), application profiles with coding gains, the changes from ESA-PSS-04-103, the differences from CCSDS 131.0-B-1, the mission configuration parameters and a turbo code patent notice. It remains a compact reference for downlinks designed to the 2008 ECSS profile.


## Key points

- Category A spacecraft are those at an altitude above the Earth's surface of less than 2 × 10^6 km; category B at or above 2 × 10^6 km. *(PDF p. 10)*
- Bit numbering: the first transmitted bit of an N-bit field is bit 0 and is the most significant bit. *(PDF p. 11)*
- The basic convolutional code is rate 1/2, constraint length 7, with connection vectors G1 = 1111001 (171 octal) and G2 = 1011011 (133 octal) and symbol inversion on the G2 output path; the punctured versions (rates 2/3, 3/4, 5/6, 7/8) have no inversion. *(PDF p. 18)*
- Soft bit decisions with at least 3-bit quantization shall be used for the convolutional decoder; if NRZ-L to NRZ-M conversion is used it should be done at the encoder input and reversed at the decoder output. *(PDF p. 17)*
- Decoding failures of the Viterbi decoder are not signalled and produce error bursts, so ECSS-E-ST-50-03 requires a CRC on TM frames unless Reed-Solomon coding is used. *(PDF p. 17)*
- Reed-Solomon code: J = 8 bits per symbol, E = 16, n = 255, 32 parity symbols and k = 223 information symbols per codeword; field generator polynomial F(x) = x^8 + x^7 + x^2 + x + 1. *(PDF p. 22)*
- The Reed-Solomon interleaving depth I shall be 1, 2, 3, 4, 5 or 8 (I=1 means no interleaving), and shall be fixed on a physical channel for a mission phase; maximum codeblock length is 255I symbols. *(PDF p. 23)*
- The E=8 (255,239) Reed-Solomon code shall only be used with 4D-8PSK-TCM modulation, shall not be concatenated with a convolutional code and shall use interleaving depth I=8. *(PDF p. 28)*
- Turbo information block lengths are 1784, 3568, 7136 and 8920 bits (223 × 1, 2, 4 and 5 octets), with codeblock lengths of 3576/7152 bits for 1784 at rates 1/2 and 1/4. *(PDF p. 31)*
- The ASM is 1ACFFC1D for non-turbo-coded data, 034776C7 272895B0 for rate-1/2 turbo and 034776C7 272895B0 FCB88938 D8D76A4F for rate-1/4 turbo coded data. *(PDF p. 38)*
- The ASM immediately precedes each codeblock or frame with no intervening bits, and is never presented to the Reed-Solomon or turbo encoder or decoder. *(PDF p. 38)*
- A recorded frame stream embedded in real-time frames shall use the embedded ASM 352EF853; it shall not be used with turbo-coded frames. *(PDF p. 39)*
- Presence or absence of pseudo-randomization is fixed for a physical channel and is not signalled in the telemetry: the receiver knows it a priori. *(PDF p. 40)*
- The pseudo-random sequence is generated by h(x) = x^8 + x^7 + x^5 + x^3 + 1, repeats after 255 bits, and is never exclusive-ORed with the ASM. *(PDF p. 42)*
- Maximum TM frame lengths with E=16 Reed-Solomon: 223, 446, 669, 892, 1115 and 1784 octets for I = 1, 2, 3, 4, 5 and 8; with E=8 and I=8, 1912 octets. *(PDF p. 55)*
- Compared with ESA-PSS-04-103 (1989), the standard adds punctured convolutional codes, RS E=8 restricted to 4D-8PSK-TCM and turbo codes, and drops the PSS restriction on using the randomizer with convolutional coding under BPSK. *(PDF p. 62)*
- The codes are a subset of CCSDS 131.0-B-1: the CCSDS recommendations also have turbo rates 1/3 and 1/6 and unrestricted E=8 Reed-Solomon codes. *(PDF p. 63)*
- Mission configuration parameters of a physical channel: channel coding scheme, frame length, pseudo-randomization, embedded-stream ASM use, convolutional code rate, interleaving depth, virtual fill length, turbo code rate and turbo information block length. *(PDF p. 64)*


## Cited by these wiki pages (6)

- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (51 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 8 |
    | 2 | Normative references | 9 |
    | 3 | Terms, definitions and abbreviated terms | 10 |
    | 3.1 | Terms from other standards | 10 |
    | 3.2 | Terms specific to the present standard | 10 |
    | 3.3 | Abbreviations | 10 |
    | 3.4 | Conventions | 11 |
    | 4 | Overview | 12 |
    | 4.1 | Introduction | 12 |
    | 4.2 | Coding | 12 |
    | 4.3 | Convolutional codes | 13 |
    | 4.4 | Reed-Solomon codes | 13 |
    | 4.5 | Concatenated codes | 14 |
    | 4.6 | Turbo codes | 14 |
    | 4.7 | Synchronization and pseudo-randomization | 14 |
    | 5 | Convolutional coding | 17 |
    | 5.1 | Properties | 17 |
    | 5.2 | General | 17 |
    | 5.3 | Basic convolutional code | 18 |
    | 5.4 | Punctured convolutional code | 19 |
    | 6 | Reed-Solomon coding | 21 |
    | 6.1 | Properties | 21 |
    | 6.2 | General | 21 |
    | 6.3 | Specification | 22 |
    | 6.4 | Reed-Solomon with E=8 | 28 |
    | 7 | Turbo coding | 29 |
    | 7.1 | Properties | 29 |
    | 7.2 | General | 29 |
    | 7.3 | Specification | 30 |
    | 8 | Frame synchronization | 36 |
    | 8.1 | Introduction | 36 |
    | 8.2 | The attached sync marker (ASM) | 36 |
    | 8.3 | ASM bit patterns | 37 |
    | 8.4 | Location of ASM | 38 |
    | 8.5 | Relationship of ASM to Reed-Solomon and turbo codeblocks | 38 |
    | 8.6 | ASM for embedded data stream | 39 |
    | 9 | Pseudo-randomizer | 40 |
    | 9.1 | General | 40 |
    | 9.2 | Pseudo-randomizer description | 40 |
    | 9.3 | Synchronization and application of pseudo-randomizer | 41 |
    | 9.4 | Sequence specification | 42 |
    | Annex A | Transformation between Berlekamp and conventional representations (informative) | 44 |
    | Annex B | Expansion of Reed-Solomon coefficients (informative) | 52 |
    | Annex C | Compatible frame lengths (informative) | 54 |
    | Annex D | Application profiles (informative) | 56 |
    | Annex E | Changes from ESA-PSS-04-103 (informative) | 62 |
    | Annex F | Differences from CCSDS recommendations (informative) | 63 |
    | Annex G | Mission configuration parameters (informative) | 64 |
    | Annex H | Turbo code patent rights (informative) | 68 |
    |  | Bibliography | 69 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system - Glossary of terms |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering – Communications |  | bibliography |
| ECSS-E-ST-50-03 | [ECSS-E-ST-50-03](../references/index.md#ref-ecss-e-st-50-03) | Space engineering – Space data links - Telemetry transfer frame protocol |  | bibliography |
| ECSS-E-ST-50-05 | [ECSS-E-ST-50-05](../references/index.md#ref-ecss-e-st-50-05) | Space engineering – Radio frequency and modulation |  | bibliography |
| ECSS-E-HB-50 | [ECSS-E-HB-50](../references/index.md#ref-ecss-e-hb-50) | Space engineering – Communications guidelines |  | bibliography |
| CCSDS 130.1-G-1 | [CCSDS 130.1-G-1](../references/index.md#ref-ccsds-130-1-g-1) | TM Synchronization and Channel Coding, Summary of Concept and Rationale – Green Book | Issue 1 June 2006 | bibliography |
| CCSDS 131.0-B-1 | [CCSDS 131.0-B-1](../references/index.md#ref-ccsds-131-0-b-1) | TM Synchronization and Channel Coding – Blue Book | Issue 1 September 2003 | bibliography |
| CCSDS 732.0-B-2 | [CCSDS 732.0-B-2](../references/index.md#ref-ccsds-732-0-b-2) | AOS Space Data Link Protocol – Blue Book | Issue 2 July 2006 | bibliography |
| ESA-PSS-04-103 | [ESA-PSS-04-103](../references/index.md#ref-esa-pss-04-103) | Telemetry channel coding standard | Issue 1 September 1989 | bibliography |
|  | [US Patent 5,446,747](../references/index.md#ref-us-patent-5-446-747) | Turbo code patent owned by France Télécom and Télédiffusion de France |  | mentioned |

!!! note "Notes"
    Superseded by the adoption notice ECSS-E-AS-50-21 (library: ecss-e-as-50-21c-rev-2-5december2024, which adopts CCSDS 131.0-B-5, also in the library as ccsds-131-0-131x0b5). The extraction uses Unicode non-breaking hyphens (U+2011) in document IDs, so plain-hyphen regex searches can miss them. Figures (encoder diagrams, ASM bit patterns, randomizer logic) are images; the ASM values are only in Table 8-1 (p. 38). Clause 3.1 cites 'ECSS-ST-00-01' (p. 10) for the normative ECSS-S-ST-00-01, and the note to 6.4.2a cites 'ECSS-E-ST-05' (p. 28) where ECSS-E-ST-50-05 is meant. Superscripts are flattened in the extraction (for example '2 × 106 km' for 2 × 10^6 km, p. 10; 'x8 + x7' for x^8 + x^7). Annex H (p. 68) prints a named licensing contact with postal address, telephone, fax and e-mail; these are deliberately not reproduced here. Printed page numbers equal PDF page numbers; srcgrep shows 70 PDF pages (the last one blank) while the registry gives 69.

