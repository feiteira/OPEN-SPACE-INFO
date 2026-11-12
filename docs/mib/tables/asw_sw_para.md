---
title: "asw_sw_para.dat: Flight-software names of MIB items (inferred title)"
description: "Inferred from the data; not documented in any available ICD. Solar Orbiter's MIB delivers this extra file next to the ICD tables, as the ICD allows mission-specific extensions. Each record maps one MI"
tags: [MIB, "Solar Orbiter mission-specific tables (not in the ICD)"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# asw_sw_para.dat: Flight-software names of MIB items (inferred title)

<div class="osi-chips"><span class="osi-chip warn">not defined in the ICD</span><span class="osi-chip">105,222 rows in Solar Orbiter 2025-09-16</span></div>

!!! warning "Inference"
    This table is not defined by the SCOS-2000 Database Import ICD. Its column meanings below were inferred from the data and are this wiki's interpretation.

Inferred from the data; not documented in any available ICD. Solar Orbiter's MIB delivers this extra file next to the ICD tables, as the ICD allows mission-specific extensions. Each record maps one MIB item name (column 1) to the symbolic name the item has in the on-board application software or instrument software (column 2) and to a longer free-text description (column 3). Most names in column 1 are monitoring parameters (pcf.PCF_NAME, 77,565 of 105,222 rows in the 2025 release); others are command parameters (cpc), commands (ccf), textual calibrations (txf, paf) and range sets (prf). About 21,400 names match no table of the same release; their prefixes (e.g. BCAY, YIU5, YTCV) suggest items of software or instrument databases not delivered in the public MIB. Column 2 holds names such as AOCSCORE_STRUNITA_QUAT_LSB or HKD_TTRCPLR_TTRA_PIO_REGISTER__WATCHDOGASTATUS; when no software name exists, column 1 is repeated. SCOS-2000 itself does not read this file (it is outside the ICD); it is most likely used by mission tools to trace MIB items to software documentation. That last point is an inference.

**Key:** `COL1`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="col1"><td>1</td><td><code>COL1</code></td><td>Char (max 10 characters observed)</td><td>M</td><td>Inferred: name of the MIB item described by the record. Unique in every release (105,222 distinct values in 105,222 rows of the 2025 release). Matches pcf.PCF_NAME (77,565 rows), cpc.CPC_PNAME (3,676), ccf.CCF_CNAME (2,221), txf.TXF_NUMBR (208), prf.PRF_NUMBR (77) and paf.PAF_NUMBR (52); 21,423 names match none of these tables in the same release.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME | cpc.CPC_PNAME | ccf.CCF_CNAME | txf.TXF_NUMBR | paf.PAF_NUMBR | prf.PRF_NUMBR (polymorphic, inferred)</a>. <span class="osi-fstat">Solar Orbiter: filled in 105,222 of 105,222 rows; e.g. <code>BCAY0000</code>, <code>BCAY0001</code>, <code>BCAY0002</code>, <code>BCAY0004</code>, <code>BCAY0007</code></span></div></td></tr>
<tr id="col2"><td>2</td><td><code>COL2</code></td><td>Char (max 122 characters observed)</td><td>O</td><td>Inferred: symbolic name of the item in the flight or instrument software (e.g. data-pool or ICD mnemonic). In 18,984 rows of the 2025 release it simply repeats COL1, apparently when no software name exists. Not unique: 102,326 distinct values for 105,222 rows, because one software item can correspond to several MIB items (e.g. 'ALU' maps to four parameters NIU00362, NIU003E5, PIU51141, PIU51181). Empty in 2,733 rows of the 2020 release, always filled in 2025.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 105,222 of 105,222 rows; e.g. <code>SSEA_SEGMENTS_END_TIME_C</code>, <code>AOCSCORE_STRUNITA_TIMEFINELSB</code>, <code>AOCSCORE_STRUNITA_QUAT_LSB</code>, <code>SSEA_SEGMENTS_START_TIME_C</code>, <code>AOCSCORE_STRUNITA_TIMECOARSELSB</code></span></div></td></tr>
<tr id="col3"><td>3</td><td><code>COL3</code></td><td>Char (max 255 characters observed)</td><td>O</td><td>Inferred: free-text description of the item, often longer than the 24-character PCF_DESCR (e.g. 'Watchdog A status', or a full sentence for commands). Filled in 89,560 of 105,222 rows (2025). 2,729 rows contain only the placeholder 'a'. 23 values are exactly 255 characters long, which suggests truncation by the generating tool (inference).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 89,560 of 105,222 rows; e.g. <code>See AOCS SRS, Guidance chapter, Load AOCS AGP Profile Data subchapter</code>, <code>AOCS profiles</code>, <code>Close/Open</code>, <code>Disabled/Enabled status</code>, <code>Event ID list</code></span></div></td></tr>
</tbody></table></div>

## Relationships

- `COL1` → [pcf.PCF_NAME](pcf.md#pcf_name): Inferred from exact name matches (77,565 rows in 2025).
- `COL1` → [cpc.CPC_PNAME](cpc.md#cpc_pname): Inferred (3,676 rows). The SQLite column is named CPC_NAME (pyscos2000 naming).
- `COL1` → [ccf.CCF_CNAME](ccf.md#ccf_cname): Inferred (2,221 rows); COL3 then holds the long command description.
- `COL1` → [txf.TXF_NUMBR](txf.md#txf_numbr) / [paf.PAF_NUMBR](paf.md#paf_numbr) / [prf.PRF_NUMBR](prf.md#prf_numbr): Inferred (208 / 52 / 77 rows); e.g. CCDT0000TC maps to AGP_SUB_SEG_ID.

## History across ICD issues

Not part of any ICD issue (5.1, 6.7 Draft A, 6.9, 7.0) nor of the pyscos2000 (7.2) schema. Present in both Solar Orbiter releases examined: 85,430 rows in MIB__20200416M10720PFMS001_SOL and 105,222 rows in MIB__20250916M25925PFMS001_SOL. The SWA instrument database has a similar three-column file, sw_para.dat (see sw_para.json).

!!! note "Notes from the extraction"
    All column meanings are inferences from the data (exact name matches against pcf, cpc, ccf, txf, paf and prf of the same release); no document describing this file was found in the library. The file name is mixed case (ASW_sw_para.dat), unlike the lower-case rule of ICD 7.0 section 2.2 for ICD tables (PDF p.22). 'ASW' presumably stands for application software (inference). Each line has exactly 3 TAB-separated fields.

## In the Solar Orbiter MIB

The 2025-09-16 release has **105,222** rows in `asw_sw_para.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

