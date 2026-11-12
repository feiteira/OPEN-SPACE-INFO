---
title: "spc.dat: Scrolling displays definition"
description: "The spc table lists the monitoring parameters shown in each Scrolling Display (SCD) declared in spf: one record per displayed parameter, with its order in the display. For each parameter it sets how n"
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# spc.dat: Scrolling displays definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.6</span><span class="osi-chip">5 rows in Solar Orbiter 2025-09-16</span></div>

The spc table lists the monitoring parameters shown in each Scrolling Display (SCD) declared in spf: one record per displayed parameter, with its order in the display. For each parameter it sets how new samples are presented (on a new scrolled line, or by overwriting the old value), whether the Telemetry Desktop setting for invalid values applies, the number format (binary, octal, decimal, hexadecimal or normal engineering/raw), and the background and foreground colours of the field. The file is expected to be sorted by display name and position, and the number of records per display must equal SPF_NPAR. Only parameters processed by the telemetry model (plf-located or synthetic) are allowed. From SCOS-2000 R5.0 these definitions are converted into XML display files in the FARC.[^icd]

**Key:** `SPC_NUMBE`, `SPC_POS`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="spc_numbe"><td>1</td><td><code>SPC_NUMBE</code></td><td>Char(8)</td><td>M</td><td>Name of the SCD; must match SPF_NUMBE of the corresponding display. Part of the key.<div class="osi-extra">Refers to <a href="../spf/">spf.SPF_NUMBE</a>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>DICSP000</code></span> <span class="osi-pg">ICD PDF p. 121</span></div></td></tr>
<tr id="spc_pos"><td>2</td><td><code>SPC_POS</code></td><td>Number(1)</td><td>M</td><td>Order of the entry within the scrolling display. Part of the key; the file is expected to be sorted by SPC_NUMBE and SPC_POS.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>5</code></span> <span class="osi-pg">ICD PDF p. 121</span></div></td></tr>
<tr id="spc_name"><td>3</td><td><code>SPC_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the monitoring parameter (PCF_NAME) shown in the scrolling display.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>NIC0P015</code>, <code>NIC0P005</code>, <code>NIC0P020</code>, <code>NIC0P010</code>, <code>NICDF014</code></span> <span class="osi-pg">ICD PDF p. 121</span></div></td></tr>
<tr id="spc_updt"><td>4</td><td><code>SPC_UPDT</code></td><td>Char(1)</td><td>O</td><td>Controls how the parameter is updated: by scrolling onto a new line or by overwriting the old value with the new one.<ul class="osi-vals"><li><code> </code> Space or Null: update by scrolling to a new line</li><li><code>N</code> Update by overwriting (no scrolling)</li></ul><div class="osi-extra">Default <code> </code>. <span class="osi-fstat">Solar Orbiter: filled in 0 of 5 rows</span> <span class="osi-pg">ICD PDF p. 121</span></div></td></tr>
<tr id="spc_mode"><td>5</td><td><code>SPC_MODE</code></td><td>Char(1)</td><td>O</td><td>Controls whether the Telemetry Desktop option governing the display of invalid values applies. Unlike DPC_MODE (Y/N, default Y), the 'apply the option' value is a space.<ul class="osi-vals"><li><code> </code> Space or Null: invalid values shown only if the Telemetry Desktop option is set to 'Display invalid values'</li><li><code>N</code> Invalid values always shown, whatever the Telemetry Desktop setting</li></ul><div class="osi-extra">Default <code> </code>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>N</code></span> <span class="osi-pg">ICD PDF p. 122</span></div></td></tr>
<tr id="spc_form"><td>6</td><td><code>SPC_FORM</code></td><td>Char(1)</td><td>O</td><td>Format used to display the value. B, O and H apply only to raw values of unsigned integer parameters; N shows the engineering value for calibrated parameters, otherwise raw decimal.<ul class="osi-vals"><li><code>B</code> Binary; only applicable to raw values of unsigned integer parameters</li><li><code>O</code> Octal; only applicable to raw values of unsigned integer parameters</li><li><code>D</code> Decimal</li><li><code>H</code> Hexadecimal; only applicable to raw values of unsigned integer parameters</li><li><code>N</code> Normal: the engineering value is shown for parameters associated with one or more calibration definitions, otherwise the raw value in decimal</li></ul><div class="osi-extra">Default <code>N</code>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>H</code>, <code>N</code></span> <span class="osi-pg">ICD PDF p. 122</span></div></td></tr>
<tr id="spc_back"><td>7</td><td><code>SPC_BACK</code></td><td>Char(1)</td><td>O</td><td>Background colour of the parameter field.<ul class="osi-vals"><li><code>0</code> Black</li><li><code>1</code> Green</li><li><code>2</code> Blue</li><li><code>3</code> Cyan</li><li><code>4</code> Red</li><li><code>5</code> Yellow</li><li><code>6</code> Magenta</li><li><code>7</code> White</li></ul><div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>0</code></span> <span class="osi-pg">ICD PDF p. 123</span></div></td></tr>
<tr id="spc_fore"><td>8</td><td><code>SPC_FORE</code></td><td>Char(1)</td><td>M</td><td>Foreground colour of the parameter field.<ul class="osi-vals"><li><code>0</code> Black</li><li><code>1</code> Green</li><li><code>2</code> Blue</li><li><code>3</code> Cyan</li><li><code>4</code> Red</li><li><code>5</code> Yellow</li><li><code>6</code> Magenta</li><li><code>7</code> White</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>2</code></span> <span class="osi-pg">ICD PDF p. 123</span></div></td></tr>
</tbody></table></div>

## Relationships

- `SPC_NUMBE` → [spf.SPF_NUMBE](spf.md#spf_numbe): Record count per SCD must equal SPF_NPAR (1-5).
- `SPC_NAME` → [pcf.PCF_NAME](pcf.md#pcf_name): TM-model parameters only.

## History across ICD issues

ICD 5.1 §3.3.2.6.6 (icd-5-1-tos-gci, PDF p.56-57) has the same 8 fields with the same values; the key field SPC_POS is not marked mandatory there, and the 'Normal' format refers to a single 'calibration curve' rather than 'one or more calibration definitions'. ICD 6.7 Draft A (icd-6-7-drafta PDF p.114-116), ICD 6.9 (icd-6-9-archive-org PDF p.118-120) and ICD 7.0 (PDF p.121-123) mark SPC_POS mandatory. Since SCOS-2000 R5.0 (ICD issue 6.4) display definitions are no longer kept in the run-time (POST) MIB database: the ASCII tables are converted on request into XML files stored in the FARC, in a delta fashion that keeps previously imported displays and displays created at run time with the TM Desktop editor (ICD 7.0 §2.5, PDF p.24; §3.3.2.7, PDF p.110; Annex 1, PDF p.254). The XML format is in [AD-5], SCOS-2000 TM Displays and Printout definitions Service ICD (ICD-5001), which is not in the library. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    Column mapping: COL1..COL8 = SPC_NUMBE, SPC_POS, SPC_NAME, SPC_UPDT, SPC_MODE, SPC_FORM, SPC_BACK, SPC_FORE; all 5 lines of the 2025 spc.dat have 8 fields. Solar Orbiter's only SCD, DICSP000, shows 5 SPICE parameters (NIC0P015, NIC0P005, NIC0P020, NIC0P010, NICDF014) at positions 1-5, all present in pcf. SPC_UPDT is empty (scrolling), SPC_MODE 'N' (invalid values always shown), SPC_FORM 'H' for four and 'N' for one, black background '0' and blue foreground '2'. The rows are identical in the 2020-04-16 release; the SWA IDB spc.dat is empty. pyscos2000 has no spc model. The HPSDB note (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.30) maps all 8 fields with the ICD defaults and plans to restrict SPC_POS to 1-9 with at most 5 records.

## In the Solar Orbiter MIB

The 2025-09-16 release has **5** rows in `spc.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.6, PDF p. 121.
