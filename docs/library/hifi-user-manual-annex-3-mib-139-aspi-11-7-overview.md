---
title: "HIFI MIB 139 (ASPI 11.7) overview"
description: "A 562-page listing, apparently generated from the database, of the HIFI instrument's Mission Information Base (MIB) as of HIFI MIB issue 139, equivalent to HIFIASPI MIB 11.7."
tags: ["User Manual", "MIB / Database Import ICD"]
sources: [hifi-user-manual-annex-3-mib-139-aspi-11-7-overview]
---

# HIFI User Manual Annex MIB 139 (ASPI 11.7) overview

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-U/HIF/UM/2004-001 (Annex)</dd><dt>Issue / version</dt><dd>64 (title page); 65 (page footers)</dd><dt>Date</dt><dd>2008-07-11</dd><dt>Organisation</dt><dd>SRON (HIFI instrument consortium)</dd><dt>Authors</dt><dd>Luc Dubbeldam, Anna Di Giorgio, Peter Roelfsema, Willem Luinge</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Annex of the HIFI User Manual dated 11 July 2008, describing 'MIB issue 139, equivalent to HIFI_ASPI MIB 11.7' (PDF p. 4). The title page says Issue 64 while every page footer says Issue 65. The document change record page (PDF p. 2) is empty. Prepared by L. Dubbeldam and agreed by IFSI, the ICC, HIFI AIV and HIFI System.</dd><dt>Pages</dt><dd>562</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/996743/HIFI+User+Manual+Annex+MIB+139+-+ASPI+11.7+-+overview" rel="noopener">https://www.cosmos.esa.int/documents/12133/996743/HIFI+User+Manual+Annex+MIB+139+-+ASPI+11.7+-+overview</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:05Z</dd><dt>SHA-256</dt><dd><code>87061fc8283c57743b14d84a1c0c5b221f9cc91e760f6a93047bb63c81e93f33</code></dd><dt>Size</dt><dd>11.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.pdf">hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 562-page listing, apparently generated from the database, of the HIFI instrument's Mission Information Base (MIB) as of HIFI MIB issue 139, equivalent to HIFI_ASPI MIB 11.7. HIFI is the heterodyne spectrometer on ESA's Herschel. The annex to the HIFI User Manual presents the MIB tables in readable form rather than as raw SCOS-2000 ASCII files, so it is a rare complete printed example of a real instrument MIB.

Section 1.1 lists the command parameters of each HIFI subsystem (FCU, HRS, WBS, LCU, OBS) with database name, mnemonic, description, raw and engineering ranges and units. Section 1.2 gives the command-parameter de-calibration curves, textual (PAF) and numerical (CCA). Section 1.3 lists command parameter ranges. Section 1.4 lists the monitoring parameters per subsystem (ICU, FCU, HRS, WBS, LCU, OBS), with calibration, units, limits and the packet they belong to. Section 1.5 gives the textual (TXF) and numerical (CAF) calibration curves, and section 1.6 the monitoring checks (number of checks, type, low and high values, relevance-check parameter and value).

The second half defines the packets. Section 1.7 has about 187 telecommand packet definitions, each listing the bit offset, element length, element type (fixed area or editable parameter), parameter name and default value. This mirrors the TC structure in the HIFI TC ICD. Section 1.8 covers fixed telemetry packets (housekeeping, essential HK, IF power, tune and OOL reports, LCU tables) with byte and bit offsets of every parameter. Section 1.9 covers variable telemetry packets such as scan reports, with repeated groups given as position formulas. For an engineer it shows how one Herschel instrument populated the SCOS-2000 MIB tables, including its HP/HM/HD naming convention.


## Key points

- The annex describes HIFI MIB issue 139, equivalent to HIFI_ASPI MIB 11.7. *(PDF p. 4)*
- Command parameters are listed per subsystem with database name (for example HP056191), mnemonic (HIF_ch1_mxbias0_V), description, raw and engineering minimum and maximum, and unit (for example raw 0 to 4095 for -10.000 to 10.000 mV). *(PDF p. 4)*
- Command parameter conversion curves are split into PAF textual de-calibrations (for example curve 100 HRH_switch with values H and V) and CCA numerical de-calibrations. *(PDF p. 31)*
- Monitoring parameters are listed per subsystem with name (HMnnn190 for ICU parameters such as HM001190 Structure_ID), mnemonic, description, raw-to-engineering calibration, unit, limits and the packet they appear in (for example ICU_housekeeping). *(PDF p. 52)*
- Monitoring calibrations are split into TXF textual and CAF numerical curves, the latter given as x/y value pairs. *(PDF p. 268)*
- Monitor parameter ranges list for each parameter the number of checks, check type, low and high values and an optional relevance check parameter (rlchk_mnem) with its validity value (valpar). *(PDF p. 329)*
- Each telecommand packet definition lists every element by bit offset, element length, element type (A for a fixed area, E for an editable parameter), parameter name and mnemonic and default value; for example HIFI_load_DRAM_bootmode has a fixed 8-bit MID = 0x11 followed by a 24-bit OBS_mem_start. *(PDF p. 355)*
- Fixed TM packet definitions give each parameter's byte offset and bit offset, for example HIFI_HK_rev_7 with HI_Prime_red at byte 1 bit 7 and Structure_ID at byte 16. *(PDF p. 456)*
- Variable TM packet definitions express repeated groups as position formulas such as '46+ 2 * i' with block sizes, controlled by repetition counters such as HI_FIXREP. *(PDF p. 562)*


## Cited by these wiki pages (5)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (27 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | MIB_OVERVIEW | 4 |
    | 1.1 | Command parameter overview | 4 |
    | 1.1.1 | FCU Command parameters | 4 |
    | 1.1.2 | HRS Command parameters | 8 |
    | 1.1.3 | WBS Command parameters | 11 |
    | 1.1.4 | LCU Command parameters | 12 |
    | 1.1.5 | OBS Command parameters | 26 |
    | 1.2 | Command parameter conversion curves | 31 |
    | 1.2.1 | PAF: Textual (de)-calibration overview | 31 |
    | 1.2.2 | CCA: Numerical (de)-calibration overview | 41 |
    | 1.3 | Command parameter ranges | 48 |
    | 1.4 | Monitoring parameter overview | 52 |
    | 1.4.1 | ICU Monitor parameters | 52 |
    | 1.4.2 | FCU Monitor parameters | 58 |
    | 1.4.3 | HRS Monitor parameters | 87 |
    | 1.4.4 | WBS Monitor parameters | 108 |
    | 1.4.5 | LCU Monitor parameters | 115 |
    | 1.4.6 | OBS Monitor parameters | 264 |
    | 1.5 | Monitor parameter conversion curves | 268 |
    | 1.5.1 | TXF: Textual calibration overview | 268 |
    | 1.5.2 | CAF: Numerical calibration overview | 282 |
    | 1.6 | Monitor parameter ranges | 329 |
    | 1.7 | Telecommand packet definition | 355 |
    | 1.8 | Telemetry Fixed packet definition | 456 |
    | 1.8.1 | HIFI_HK_rev_7 | 456 |
    | 1.8.2 | HIFI_essential_HK | 472 |
    | 1.9 | Telemetry variable packet definition | 507 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [HIFI MIB 139](../references/index.md#ref-hifi-mib-139) | HIFI MIB issue 139, equivalent to HIFI_ASPI MIB 11.7 | 139 / ASPI 11.7 | mentioned |
|  | [SRON-U/HIF/UM/2004-001](../references/index.md#ref-sron-u-hif-um-2004-001) | HIFI User Manual (parent document of this annex) |  | mentioned |

!!! note "Notes"
    Very large (562 pages) and apparently generated from the database; the text extraction keeps the tables but some columns are misaligned. The text extraction shows a 563rd, empty page. Printed page numbers ('Page: n of 562') match PDF page indexes. The title page says Issue 64 but every page footer says Issue 65, and the document ID is printed 'SRON-U/HIF/UM/2004-001' (HIF, not HIFI). The change record is empty. It contains no reference list. Inference (not stated in the document): the last three digits of the database names (190, 191, 194, 197) appear to match HIFI element positions in HPSDB (190 ICU, 191 FCU, 194 LCU, 197 OBS, as listed in h-p-2-asp-li-1441-09-herschel-hpsdb-release-note). Related library items: the HIFI TC ICD (hifi-telecommand-packet-structure-icd, issue 1.10 of 2009, which says its issue 1.8 matches HIFI MIB 141), the HIFI MIB editor documents (hifi-mib-editor-requirements, hifi-mib-editor-evaluation) and the HCSS MIB tailoring note (hcss-mib-clarification-tailoring-note).

