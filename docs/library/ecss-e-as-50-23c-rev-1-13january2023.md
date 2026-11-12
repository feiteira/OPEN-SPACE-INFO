---
title: "ECSS Adoption Notice of CCSDS 732.0-B-4 (AOS SDLP)"
description: "An ECSS Adoption Notice that makes the CCSDS Blue Book CCSDS 732.0-B-4, AOS Space Data Link Protocol (Issue 4, October 2021) applicable to ECSS projects with a minimum set of changes."
tags: ["Adoption Notice", "ECSS standards"]
sources: [ecss-e-as-50-23c-rev-1-13january2023]
---

# Space engineering
Adoption Notice of CCSDS 732.0-B-4, AOS Space Data Link Protocol

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-AS-50-23C Rev.1</dd><dt>Issue / version</dt><dd>First issue, Revision 1</dd><dt>Date</dt><dd>2023-01-13</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS Space Communications Working Group)</dd><dt>Authors</dt><dd>ECSS Space Communications Working Group</dd><dt>Type</dt><dd>Adoption Notice</dd><dt>Status</dt><dd>ECSS-E-AS-50-23C Rev.1 of 13 January 2023 is 'First issue, Revision 1' and replaces ECSS-E-AS-50-23C of 1 March 2021; the first issue, together with ECSS-E-AS-50-22C, replaced ECSS-E-ST-50-03C (change log, p. 3). The context clause states that ECSS-E-ST-50-03C is superseded by ECSS-E-AS-50-22 and ECSS-E-AS-50-23 (latest versions) (p. 6). Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>11</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-23C-Rev.1(13January2023).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-23C-Rev.1(13January2023).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:11Z</dd><dt>SHA-256</dt><dd><code>c5445447c841da86529d2fd1fab00cc4b354e1c7744359fe189fbc1b1dc7b7f1</code></dd><dt>Size</dt><dd>302.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-AS-50-23C-Rev.1-13January2023-.pdf">ECSS-E-AS-50-23C-Rev.1-13January2023-.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ECSS **Adoption Notice** that makes the CCSDS Blue Book **CCSDS 732.0-B-4, AOS Space Data Link Protocol (Issue 4, October 2021)** applicable to ECSS projects with a minimum set of changes. AOS (Advanced Orbiting Systems) frames do the same job as TM frames and add some features of their own. The ECSS standard ECSS-E-ST-50-03C, which this notice and ECSS-E-AS-50-22C supersede, covered only the TM Transfer Frame and had no AOS frame, so the notice has no 'differences' annex. Page 6 gives the ECSS mapping from each superseded ECSS-E-ST-50-0x standard to its adoption notice and CCSDS base book.

The normative changes in Table 4-1 are few:

* the **Replay Flag** of the AOS primary header must always be '0' (realtime). CCSDS allows '1' for replayed frames, but ECSS forbids it because other ways of replaying frames exist and because the flag makes processing at the receiving end more complex. The CCSDS interpretation requirement and its notes are deleted;
* a new note to the **Frame Header Error Control** clause says that this optional field may be restricted to physical channels whose frames are not protected by an error-correcting code. With Reed-Solomon coding, for example, it brings no benefit and is strongly discouraged.

The change log says that Rev.1 follows the new CCSDS issue, with SDLS Extended Procedures support, a PICS proforma and Only Idle Data randomization options, all of which are in the CCSDS book. An engineer uses this notice to know how an ECSS mission may use AOS framing, for example on high-rate payload downlinks.


## Key points

- Requirement ECSS-E-AS-50-23_1540001 makes CCSDS 732.0-B-4, AOS Space Data Link Protocol, Issue 4, October 2021 applicable with the amendments of Table 4-1. *(PDF p. 8)*
- The AOS protocol of CCSDS 732.0-B-4 has a similar purpose to the TM Space Data Link Protocol (CCSDS 132.0-B-3) and supports some features not available in it; ECSS-E-ST-50-03 was limited to the TM Transfer Frame and did not include the AOS Transfer Frame. *(PDF p. 6)*
- Clause 4.1.2.5.2 is modified: the Replay Flag shall be set to '0'. *(PDF p. 8)*
- A new NOTE explains that '0' indicates a Realtime Transfer Frame and that ECSS does not allow the CCSDS value '1' (Replay Transfer Frame), because there are alternative means of replaying frames and processing at the receiving end becomes more complex; CCSDS requirement 4.1.2.5.3 and its notes are deleted. *(PDF p. 9)*
- New NOTE 2 to clause 4.1.2.6.1: Frame Header Error Control may be restricted to physical channels where the AOS frames are not protected by an error-correcting code; with e.g. Reed-Solomon coding it brings no benefit and is strongly discouraged. *(PDF p. 10)*
- Rev.1 adds clarifications and support for SDLS Extended Procedures (CCSDS 355.1-B-1), a PICS proforma and Only Idle Data frame randomization options, following the new CCSDS issue. *(PDF p. 3)*


## Cited by these wiki pages (6)

- [AOS Space Data Link Protocol (CCSDS 732.0-B-4)](../ccsds/aos.md)
- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (7 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 5 |
    | 2 | Context information | 6 |
    | 3 | Abbreviated terms | 7 |
    | 4 | Application requirements | 8 |
    | Table 4-1 | Applicability table for CCSDS 732.0-B-4 | 8 |
    |  | Bibliography | 11 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [CCSDS 732.0-B-4](../references/index.md#ref-ccsds-732-0-b-4) · [library](ccsds-732-0-732x0b4.md) | AOS Space Data Link Protocol | Issue 4 October 2021 | normative |
|  | [CCSDS 355.1-B-1](../references/index.md#ref-ccsds-355-1-b-1) · [library](ccsds-355-1-355x1b1.md) | Space Data Link Security Protocol Extended Procedures |  | mentioned |
|  | [ECSS-E-AS-50-21C Rev.1](../references/index.md#ref-ecss-e-as-50-21c-rev-1) | Space engineering - Adoption Notice of CCSDS 131.0-B-4, TM Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-22C Rev.1](../references/index.md#ref-ecss-e-as-50-22c-rev-1) · [library](ecss-e-as-50-22c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 132.0-B-3, TM Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-23C Rev.1](../references/index.md#ref-ecss-e-as-50-23c-rev-1) ·  | Space engineering -Adoption Notice of CCSDS 732.0-B-4, AOS Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-24C Rev.1](../references/index.md#ref-ecss-e-as-50-24c-rev-1) · [library](ecss-e-as-50-24c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 231.0-B-4, TC Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-25C Rev.1](../references/index.md#ref-ecss-e-as-50-25c-rev-1) · [library](ecss-e-as-50-25c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 232.0-B-4, TC Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-26C](../references/index.md#ref-ecss-e-as-50-26c) · [library](ecss-e-as-50-26c-1march2021.md) | Space engineering - Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1 |  | bibliography |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | Space engineering - Space data links - Telemetry synchronization and channel coding | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | Space engineering - Space data links - Telemetry transfer frame protocol | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | Space engineering - Space data links - Telecommand protocols synchronization and channel coding | 31 July 2008 | bibliography |
|  | [CCDSD 132.0-B-3](../references/index.md#ref-ccdsd-132-0-b-3) | TM Space Data Link Protocol – Blue Book | Issue 3 October 2021 | bibliography |

!!! note "Notes"
    Adoption notices contain no normative-references clause; the adopted CCSDS 732.0-B-4 is listed as 'normative' because requirement ECSS-E-AS-50-23_1540001 makes it applicable (p. 8). The change log (p. 3) labels its first row 'ECSS-E-AS-50-23C Rev.1 First issue 13 January 2023', although the second row says the first issue was ECSS-E-AS-50-23C of 1 March 2021. It also says Rev.1 adds 'new normative Annex A' (PICS) and 'new informative Annex D', but this notice has no annexes at all; those are annexes of CCSDS 732.0-B-4. The last bibliography entry is printed 'CCDSD 132.0-B-3', a typo for CCSDS 132.0-B-3 (p. 11). The adopted CCSDS 732.0-B-4 is in the library as ccsds-732-0-732x0b4, and the library also holds the later CCSDS 732.0-B-5 (ccsds-732-0-732x0b5ec1), which this notice does not adopt; CCSDS 355.1-B-1 is ccsds-355-1-355x1b1; the superseded ECSS-E-ST-50-03C as ecss-e-st-50-03c-31july2008. The 2021 first issue of this notice is not in the library. Printed page numbers equal PDF page numbers; srcgrep shows 12 PDF pages (the last one blank) while the registry gives 11.

