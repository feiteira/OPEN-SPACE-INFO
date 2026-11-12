---
title: "ECSS Adoption Notice of CCSDS 232.0-B-4 (TC SDLP)"
description: "An ECSS Adoption Notice: rather than rewriting the TC data link protocol, ECSS adopts the CCSDS Blue Book CCSDS 232.0-B-4, TC Space Data Link Protocol (Issue 4, October 2021) and lists only the clause"
tags: ["Adoption Notice", "ECSS standards"]
sources: [ecss-e-as-50-25c-rev-1-13january2023]
---

# Space engineering
Adoption Notice of CCSDS 232.0-B-4, TC Space Data Link Protocol

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-AS-50-25C Rev.1</dd><dt>Issue / version</dt><dd>First issue, Revision 1</dd><dt>Date</dt><dd>2023-01-13</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Section (prepared by the ECSS Space Communications Working Group)</dd><dt>Authors</dt><dd>ECSS Space Communications Working Group</dd><dt>Type</dt><dd>Adoption Notice</dd><dt>Status</dt><dd>ECSS-E-AS-50-25C Rev.1 of 13 January 2023 is 'First issue, Revision 1' and replaces the 1 March 2021 first issue (change log, p. 3). The first issue, together with ECSS-E-AS-50-24C and ECSS-E-AS-50-26C, replaces ECSS-E-ST-50-04C (change log p. 3; context p. 6). Whether a later revision exists is not stated in the document.</dd><dt>Pages</dt><dd>23</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-25C-Rev.1(13January2023).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2023/01/ECSS-E-AS-50-25C-Rev.1(13January2023).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:11Z</dd><dt>SHA-256</dt><dd><code>fe761d1fe2365a31b673981193ea204550f13901f923eeb521c6d316525efd63</code></dd><dt>Size</dt><dd>369.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-AS-50-25C-Rev.1-13January2023.pdf">ECSS-E-AS-50-25C-Rev.1-13January2023.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ECSS **Adoption Notice**: rather than rewriting the TC data link protocol, ECSS adopts the CCSDS Blue Book **CCSDS 232.0-B-4, TC Space Data Link Protocol (Issue 4, October 2021)** and lists only the clauses it changes for use in ECSS projects. Together with the notices for TC synchronization and channel coding (ECSS-E-AS-50-24C) and COP-1 (ECSS-E-AS-50-26C), it supersedes the older stand-alone ECSS-E-ST-50-04C telecommand standard, and page 6 gives a mapping table from each superseded ECSS-E-ST-50-0x standard to its replacement notice and CCSDS base document.

The core is Table 4-1, a clause-by-clause applicability table that shows the ECSS text, a comment and the original CCSDS wording. The main ECSS tailorings are:

* the Transfer Frame Data Field is capped at **1017 octets**, and the **Frame Error Control Field is mandatory** (the CCSDS options for 1019 octets and for no FECF are removed, also in the SDLS clause 6.3.7 and the managed-parameter tables 5-1 and 5-4);
* the CLCW **No Bit Lock Flag** becomes a mandatory, real report of the spacecraft demodulators' bit lock;
* a new clause **4.4.9, Packet Assembly Controller Function**, inherited from ECSS-E-ST-50-04, is added. It reassembles Packets or MAP_SDUs from segmented Frame Data Units, enters a *lockout* state on bad segment sequences, and is released by a one-octet **MAP Reset** control segment sent on a paired control MAP (data MAP ID + 32).

Informative Annex A lists further differences from ECSS-E-ST-50-04C: formal service interfaces, optional SDLS support, normative managed parameters and a PICS. An engineer uses this notice to know exactly which CCSDS TC frame options an ECSS-compliant spacecraft must support.


## Key points

- Requirement ECSS-E-AS-50-25_1560001 makes CCSDS 232.0-B-4, TC Space Data Link Protocol, Issue 4, October 2021 applicable with the modifications of Table 4-1. *(PDF p. 8)*
- The superseded ECSS-E-ST-50-01C, -50-03C and -50-04C (31 July 2008) map to Adoption Notices ECSS-E-AS-50-21 (CCSDS 131.0), -22 (132.0), -23 (732.0), -24 (231.0), -25 (232.0) and -26 (232.1). *(PDF p. 6)*
- Clause 4.1.1b is modified so that the Transfer Frame Data Field is up to 1017 octets (the CCSDS option of 1019 octets is deleted). *(PDF p. 8)*
- The Frame Error Control Field (2 octets) is made mandatory: 4.1.1c is changed from optional to mandatory and 4.1.4.1.1 and 4.1.4.1.3 are deleted. *(PDF p. 9)*
- The CLCW No Bit Lock Flag is no longer optional: '0' when at least one spacecraft demodulation unit for the physical channel has bit lock, '1' when none has; it always reports the actual physical channel status. *(PDF p. 10)*
- New clause 4.4.9 adds the Packet Assembly Controller Function, usable by MAP Packet Extraction and MAP Reception to reassemble Packets or MAP_SDUs; the name is inherited from earlier standards. *(PDF p. 12)*
- Each Packet Assembly Controller instance uses a pair of 6-bit MAP Identifiers: a data MAP (MSB 0, range 0 to 31) and a control MAP equal to the data MAP + 32. *(PDF p. 13)*
- The function keeps a reassembly status flag ('1' while reconstruction is in progress) and enters a lockout state on an incorrect sequence of Sequence Flags or an invalid control segment; eight illegal sequence-flag transitions are listed. *(PDF p. 15)*
- The function reports the data MAP ID, reassembly status flag and lockout status flag to the sending end, but the format and transport of that status are not specified. *(PDF p. 17)*
- A control segment is one octet long (Segment Header only) with Sequence Flags '11' and a control-MAP identifier; a valid control segment is a MAP Reset command, which discards a partial packet and exits lockout. *(PDF p. 18)*
- Managed-parameter Table 5-1 (Presence of Frame Error Control: Present only) and Table 5-4 (Maximum Frame Data Unit Length: up to 1017) are modified accordingly. *(PDF p. 19)*
- Clause 6.3.7 (SDLS) is modified so that the FECF always follows the Security Trailer, or the Data Field when there is no trailer. *(PDF p. 20)*
- Annex A notes that, unlike ECSS-E-ST-50-04C, CCSDS 232.0-B-4 offers formal service interfaces, optional SDLS, normative managed parameters (formerly 'mission configuration parameters' in Annex E of ECSS-E-ST-50-04) and a normative PICS. *(PDF p. 21)*


## Cited by these wiki pages (14)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [How it all fits together](../overview/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Data Link Security (CCSDS 355.0-B-2)](../ccsds/sdls.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TC synchronization and channel coding: the CLTU (CCSDS 231.0-B-4)](../ccsds/tc-coding-cltu.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)


??? abstract "Contents (15 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 5 |
    | 2 | Context information | 6 |
    | 3 | Abbreviated terms | 7 |
    | 4 | Application requirements | 8 |
    | Table 4-1 | Applicability table for CCSDS 232.0-B-4 | 8 |
    | 4.4.9 (new) | Packet Assembly Controller Function (new clause inside Table 4-1) | 11 |
    | Annex A | Differences from ECSS-E-ST-50-04C (informative) | 21 |
    | A.1 | General | 21 |
    | A.2 | Differences | 21 |
    | A.2.1 | Specification of service interfaces | 21 |
    | A.2.2 | Interfaces for Space Data Link Security (SDLS) | 21 |
    | A.2.3 | Managed parameters | 21 |
    | A.2.4 | Protocol Implementation Conformance Statement | 22 |
    |  | Bibliography | 23 |


## Documents this one references (10)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [CCSDS 232.0-B-4](../references/index.md#ref-ccsds-232-0-b-4) · [library](ccsds-232-0-232x0b4e1c1.md) | TC Space Data Link Protocol | Issue 4 October 2021 | normative |
|  | [ECSS-E-AS-50-21C Rev.1](../references/index.md#ref-ecss-e-as-50-21c-rev-1) | Space engineering - Adoption Notice of CCSDS 131.0-B-4, TM Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-22C Rev.1](../references/index.md#ref-ecss-e-as-50-22c-rev-1) · [library](ecss-e-as-50-22c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 132.0-B-3, TM Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-23C Rev.1](../references/index.md#ref-ecss-e-as-50-23c-rev-1) · [library](ecss-e-as-50-23c-rev-1-13january2023.md) | Space engineering -Adoption Notice of CCSDS 232.0-B-4, AOS Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-24C Rev.1](../references/index.md#ref-ecss-e-as-50-24c-rev-1) · [library](ecss-e-as-50-24c-rev-1-13january2023.md) | Space engineering - Adoption Notice of CCSDS 231.0-B-4, TC Synchronization and Channel Coding | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-25C Rev.1](../references/index.md#ref-ecss-e-as-50-25c-rev-1) ·  | Space engineering - Adoption Notice of CCSDS 232.0-B-4, TC Space Data Link Protocol | Rev.1 | bibliography |
|  | [ECSS-E-AS-50-26C](../references/index.md#ref-ecss-e-as-50-26c) · [library](ecss-e-as-50-26c-1march2021.md) | Space engineering - Adoption Notice of CCSDS 232.1-B-2, Communications Operation Procedure-1 |  | bibliography |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | Space engineering - Space data links - Telemetry synchronization and channel coding | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | Space engineering - Space data links - Telemetry transfer frame protocol | 31 July 2008 | bibliography |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | Space engineering - Space data links - Telecommand protocols synchronization and channel coding | 31 July 2008 | bibliography |

!!! note "Notes"
    Adoption notices contain no normative-references clause; the adopted CCSDS 232.0-B-4 is listed above as 'normative' because requirement ECSS-E-AS-50-25_1560001 makes it applicable (p. 8). The bibliography (p. 23) prints ECSS-E-AS-50-23C Rev.1 as 'Adoption Notice of CCSDS 232.0-B-4, AOS Space Data Link Protocol', an apparent typo for CCSDS 732.0-B-x (the context table on p. 6 maps ECSS-E-AS-50-23 to CCSDS 732.0-B-x). The change log (p. 3) says Rev.1 'adds a protocol implementation conformance statement proforma as new normative Annex A', but this document's Annex A is the informative 'Differences from ECSS-E-ST-50-04C'; the PICS meant is Annex A of CCSDS 232.0-B-4 itself (p. 22). The scope text runs '232.0-B-4TC' together (p. 5). The comment on the Table 5-4 row says 'Table 5-1' (p. 19). The registry gives 23 pages, while srcgrep shows 24 PDF pages (the last one is blank). Printed page numbers equal PDF page numbers.

