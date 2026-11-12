---
title: "ECSS Adoption Notice of CCSDS 232.1-B-2 (COP-1)"
description: "A short ECSS Adoption Notice that makes the CCSDS Blue Book CCSDS 232.1-B-2, Communications Operation Procedure-1 (Issue 2, September 2010) applicable to ECSS projects with one targeted modification."
tags: ["Adoption Notice", "ECSS standards"]
sources: [ecss-e-as-50-26c-1march2021]
---

# Space engineering
Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-AS-50-26C</dd><dt>Issue / version</dt><dd>First issue</dd><dt>Date</dt><dd>2021-03-01</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS Space Communications Working Group)</dd><dt>Authors</dt><dd>ECSS Space Communications Working Group</dd><dt>Type</dt><dd>Adoption Notice</dd><dt>Status</dt><dd>First issue of 1 March 2021; together with ECSS-E-AS-50-24C and ECSS-E-AS-50-25C it replaces ECSS-E-ST-50-04C (change log, p. 3). The scope notes that a later CCSDS technical corrigendum to 232.1-B-2 does not affect this notice (p. 5). The library's ECSS-E-AS-50-25C Rev.1 (13 January 2023) still lists ECSS-E-AS-50-26C without a revision in its bibliography.</dd><dt>Pages</dt><dd>12</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2021/03/ECSS-E-AS-50-26C(1March2021).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2021/03/ECSS-E-AS-50-26C(1March2021).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:13Z</dd><dt>SHA-256</dt><dd><code>61c4caee1b9aba3856282cd51aa4e02f5c9a16bf63207abc17871fb87b4e33ee</code></dd><dt>Size</dt><dd>702.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-AS-50-26C-1March2021.pdf">ECSS-E-AS-50-26C-1March2021.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short ECSS **Adoption Notice** that makes the CCSDS Blue Book **CCSDS 232.1-B-2, Communications Operation Procedure-1 (Issue 2, September 2010)** applicable to ECSS projects with one targeted modification. COP-1 is the retransmission protocol used with the TC Space Data Link Protocol. The sending end (FOP-1) and the receiving end (FARM-1) cooperate, through the CLCW report, to deliver telecommand frames in order, without gaps or duplicates. COP-1 was previously specified in clause 7 of ECSS-E-ST-50-04C, which this notice supersedes jointly with ECSS-E-AS-50-24C (TC coding) and ECSS-E-AS-50-25C (TC data link). Page 6 tabulates each superseded ECSS-E-ST-50-0x standard against its adoption notice and the CCSDS issue it was based on in 2021.

The single normative change (Table 4-1, clause 3.3.2) concerns **Type-BD (bypass) frames** arriving when no FARM-1 back-end buffer is free. CCSDS lets the buffer contents be erased and an *optional* 'Aborted Indication' be sent. ECSS instead makes this explicit: the **FDU Arrived Indication** gains a parameter, the **FDU aborted indication**. It is set only when a Type-BD frame was accepted with no buffer available, which tells the higher procedures that buffered data was overwritten.

Informative Annex A records the one other difference from ECSS-E-ST-50-04C: that standard had special requirements for a FARM-1 with a single back-end buffer per virtual channel, which CCSDS 232.1-B-2 does not include. The bibliography lists the full family of ECSS-E-AS-50-2x notices, the superseded 2008 standards and the CCSDS TC coding Green Book.


## Key points

- CCSDS 232.1-B-2, Communications Operation Procedure-1, Issue 2, September 2010 applies with the modifications in Table 4-1. *(PDF p. 8)*
- A recently published technical corrigendum to CCSDS 232.1-B-2 does not affect the Adoption Notice. *(PDF p. 5)*
- COP-1 is used with the TC Space Data Link Protocol to deliver frames in sequence and without gaps or duplication; it was previously clause 7 of ECSS-E-ST-50-04. *(PDF p. 6)*
- In 2021 the adoption notices were based on CCSDS 131.0-B-3 (Sept. 2017), 132.0-B-2 (Sept. 2015), 732.0-B-3 (August 2016), 231.0-B-3 (Sept. 2017), 232.0-B-3 (Sept. 2015) and 232.1-B-2 (Sept. 2010). *(PDF p. 6)*
- Clause 3.3.2 is modified: when a Type-BD frame is accepted by FARM-1 with no buffer available, the buffer data is erased and the FDU Arrived Indication carries a new 'FDU aborted indication' parameter (GVCID, FDU aborted indication). *(PDF p. 9)*
- The FDU aborted indication is set only when a Type-BD Transfer Frame is accepted by FARM-1 and there is no buffer available; the optional CCSDS 'Aborted Indication' signal is removed. *(PDF p. 10)*
- ECSS-E-ST-50-04 had requirements for a FARM-1 with only one back-end buffer per virtual channel; this special case is not in CCSDS 232.1-B-2. *(PDF p. 11)*


## Cited by these wiki pages (6)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (11 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 5 |
    | 2 | Context information | 6 |
    | 3 | Abbreviated terms | 7 |
    | 4 | Application requirements | 8 |
    | Table 4-1 | Applicability table for CCSDS 232.1-B-2 | 9 |
    | Annex A | Differences from ECSS-E-ST-50-04C (informative) | 11 |
    | A.1 | General | 11 |
    | A.2 | Differences | 11 |
    | A.2.1 | FARM-1 with single back-end buffer | 11 |
    |  | Bibliography | 12 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [CCSDS 232.1-B-2](../references/index.md#ref-ccsds-232-1-b-2) · [library](ccsds-232-1-232x1b2e2c1.md) | Communications Operation Procedure-1 | Issue 2 September 2010 | normative |
|  | [CCSDS 232.0-B-3](../references/index.md#ref-ccsds-232-0-b-3) | TC Space Data Link Protocol |  | mentioned |
|  | [ECSS-E-AS-50-21C](../references/index.md#ref-ecss-e-as-50-21c) | Space engineering - Adoption Notice of CCSDS 131.0-B-3, TM Synchronization and Channel Coding |  | bibliography |
|  | [ECSS-E-AS-50-22C](../references/index.md#ref-ecss-e-as-50-22c) | Space engineering - Adoption Notice of CCSDS 132.0-B-2, TM Space Data Link Protocol |  | bibliography |
|  | [ECSS-E-AS-50-23C](../references/index.md#ref-ecss-e-as-50-23c) | Space engineering -Adoption Notice of CCSDS 732.0-B-3, AOS Space Data Link Protocol |  | bibliography |
|  | [ECSS-E-AS-50-24C](../references/index.md#ref-ecss-e-as-50-24c) | Space engineering - Adoption Notice of CCSDS 231.0-B-3, TC Synchronization and Channel Coding |  | bibliography |
|  | [ECSS-E-AS-50-25C](../references/index.md#ref-ecss-e-as-50-25c) | Space engineering - Adoption Notice of CCSDS 232.0-B-3, TC Space Data Link Protocol |  | bibliography |
|  | [ECSS-E-AS-50-26C](../references/index.md#ref-ecss-e-as-50-26c) ·  | Space engineering - Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1 |  | bibliography |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) | Space engineering - Space data links - Telemetry synchronization and channel coding | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | Space engineering - Space data links - Telemetry transfer frame protocol | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) | Space engineering - Space data links - Telecommand protocols synchronization and channel coding | 31 July 2008 | bibliography |
|  | [CCSDS 230.1-G-2](../references/index.md#ref-ccsds-230-1-g-2) | TC Synchronization and Channel Coding, Summary of Concept and Rationale – Green Book | Issue 2 November 2012 | bibliography |

!!! note "Notes"
    There is no normative-references clause. CCSDS 232.1-B-2 is listed as 'normative' because clause 4a makes it applicable (p. 8). The context clause names the superseded companion as 'ECSS-E-ST-50-24C' (p. 6), where ECSS-E-AS-50-24C is meant, and Annex A.1 refers to itself as 'AS ECSS-E-AS-50-232.1-B-2' (p. 11). The context clause says differences are described 'in the informative Annex A', but the table of contents (p. 4) does not list Annex A or the Bibliography (they are on pp. 11-12). The title page says 'Requirements & Standards Division', while ECSS-E-AS-50-25C Rev.1 says 'Section'. The extraction of Table 4-1 interleaves columns (p. 9). Printed page numbers equal PDF page numbers, and PDF page 13 is blank.

