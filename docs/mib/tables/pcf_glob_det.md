---
title: "pcf_glob_det.dat: Global-to-detailed parameter decomposition (inferred title)"
description: "Inferred from the data; not documented in any available ICD. Each record states that a 'detailed' monitoring parameter (column 2) is a bit field inside a 'global' monitoring parameter (column 1), star"
tags: [MIB, "Solar Orbiter mission-specific tables (not in the ICD)"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# pcf_glob_det.dat: Global-to-detailed parameter decomposition (inferred title)

<div class="osi-chips"><span class="osi-chip warn">not defined in the ICD</span><span class="osi-chip">56,631 rows in Solar Orbiter 2025-09-16</span></div>

!!! warning "Inference"
    This table is not defined by the SCOS-2000 Database Import ICD. Its column meanings below were inferred from the data and are this wiki's interpretation.

Inferred from the data; not documented in any available ICD. Each record states that a 'detailed' monitoring parameter (column 2) is a bit field inside a 'global' monitoring parameter (column 1), starting column 3 bits after the start of the global parameter. Typical global parameters are whole words or octet strings that the spacecraft reports as one item (for example NAH0Z000 'APMHA_TM_1 [000]', an 8-bit unsigned integer with an on-board parameter ID); the detailed parameters are the flags and small enumerations inside them (NAHD0000 'APMHA_Mode', 3 bits at offset 0; NAHD0001, 1 bit at offset 3; and so on). The relation is consistent with the packet layouts: in all 215,859 cases (2025 release) where both parameters appear in the same packet, PLF bit position of the detailed parameter equals that of the global parameter plus column 3. SCOS-2000 extracts each parameter independently from PLF, so this table is probably used by mission tools, for example to generate PLF entries, to decode on-board parameter reports that carry only the global parameter, or to relate data-pool items to their fields. That use is an inference.

**Key:** `COL2`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="col1"><td>1</td><td><code>COL1</code></td><td>Char(8) observed</td><td>M</td><td>Inferred: name of the global (container) parameter. Always a pcf.PCF_NAME. 8,704 distinct globals in 2025; they are unsigned integers (3/4, 3/12, 3/13, 3/14) or fixed octet strings (PTC 7, up to 6,448 octets), and 14,016 rows refer to globals that have an on-board parameter ID (PCF_PID).<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 56,631 of 56,631 rows; e.g. <code>NAH0Z000</code>, <code>NAH0Z001</code>, <code>NAH0Z002</code>, <code>NAH0Z003</code>, <code>NAH0Z004</code></span></div></td></tr>
<tr id="col2"><td>2</td><td><code>COL2</code></td><td>Char(8) observed</td><td>M</td><td>Inferred: name of the detailed parameter contained in the global one. Always a pcf.PCF_NAME and unique in the table (each detailed parameter belongs to exactly one global parameter). Mostly booleans, enumerations, unsigned integers and reals (e.g. 1/0, 2/n, 3/4, 3/12, 5/1).<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 56,631 of 56,631 rows; e.g. <code>NAHD0000</code>, <code>NAHD0001</code>, <code>NAHD0002</code>, <code>NAHD0003</code>, <code>NAHD0004</code></span></div></td></tr>
<tr id="col3"><td>3</td><td><code>COL3</code></td><td>Number (0 to 50752 observed)</td><td>M</td><td>Inferred: bit offset of the detailed parameter from the first (most significant) bit of the global parameter. Verified against PLF: detailed position = global position + offset in every co-located case (215,859 of 215,859 in 2025; 194,375 of 194,375 in 2020). No bit-field detail extends beyond the width of its integer or octet-string global.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 56,631 of 56,631 rows; e.g. <code>0</code>, <code>3</code>, <code>4</code>, <code>5</code>, <code>6</code></span></div></td></tr>
</tbody></table></div>

## Relationships

- `COL1` → [pcf.PCF_NAME](pcf.md#pcf_name): All rows match (inferred).
- `COL2` → [pcf.PCF_NAME](pcf.md#pcf_name): All rows match; COL2 is unique (inferred).
- `COL3` → [plf.PLF_OFFBY](plf.md#plf_offby)*8+[plf.PLF_OFFBI](plf.md#plf_offbi): Offset relation verified for every packet containing both parameters (inferred from data).

## History across ICD issues

Not part of any ICD issue (5.1, 6.7 Draft A, 6.9, 7.0) nor of the pyscos2000 (7.2) schema. 52,417 rows in MIB__20200416M10720PFMS001_SOL, 56,631 rows in MIB__20250916M25925PFMS001_SOL, and 855 rows in the SWA instrument database. All 855 SWA rows also appear in the 2025 spacecraft table.

!!! note "Notes from the extraction"
    All meanings inferred from the data. In the SWA instrument database no detailed parameter has a PLF entry (the global parameter is placed in plf in 841 of the 855 rows), while in the spacecraft MIB 841 of these 855 detailed parameters are placed in plf; this suggests that the spacecraft MIB generation expands global parameters into PLF entries for their details (inference). The name presumably abbreviates 'PCF global/detailed' (inference).

## In the Solar Orbiter MIB

The 2025-09-16 release has **56,631** rows in `pcf_glob_det.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

