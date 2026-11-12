---
title: "txp.dat: Textual calibrations definition"
description: "txp holds the text strings of the textual calibrations declared in txf: one record per raw-value range and string pair. Any raw value of a status parameter that falls within TXP_FROM to TXP_TO, inclus"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# txp.dat: Textual calibrations definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.5</span><span class="osi-chip">35,032 rows in Solar Orbiter 2025-09-16</span></div>

txp holds the text strings of the textual calibrations declared in txf: one record per raw-value range and string pair. Any raw value of a status parameter that falls within TXP_FROM to TXP_TO, inclusive, is displayed and processed as the string TXP_ALTXT. A single raw value is expressed by giving the same value as lower and upper bound. Raw bounds are written in decimal in the format declared by TXF_RAWFMT. The key is the pair (TXP_NUMBR, TXP_FROM), so two ranges of one calibration cannot start at the same raw value. The resulting strings are the engineering values used in monitoring displays and, with OCF_INTER = 'C' and OCF_CODIN = 'A', as the expected values of status checks in ocp. A raw value that matches no range is shown as an invalid value '****'.[^icd]

**Key:** `TXP_NUMBR`, `TXP_FROM`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="txp_numbr"><td>1</td><td><code>TXP_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Identifier of the textual calibration this entry belongs to; must match TXF_NUMBR of an existing txf record.<div class="osi-extra">Refers to <a href="../txf/">txf.TXF_NUMBR</a>. <span class="osi-fstat">Solar Orbiter: filled in 35,032 of 35,032 rows; e.g. <code>PARAMIDTM</code>, <code>CCDT0004TX</code>, <code>CDMTX000TM</code>, <code>CCDT0384TM</code>, <code>CTCXZ001TM</code></span> <span class="osi-pg">ICD PDF p. 70</span></div></td></tr>
<tr id="txp_from"><td>2</td><td><code>TXP_FROM</code></td><td>Char(14)</td><td>M</td><td>Lower bound of the raw-value range, written in decimal in a format compatible with TXF_RAWFMT.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 35,032 of 35,032 rows; e.g. <code>1</code>, <code>0</code>, <code>2</code>, <code>3</code>, <code>4</code></span> <span class="osi-pg">ICD PDF p. 70</span></div></td></tr>
<tr id="txp_to"><td>3</td><td><code>TXP_TO</code></td><td>Char(14)</td><td>M</td><td>Upper bound of the raw-value range, written in decimal in a format compatible with TXF_RAWFMT.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 35,032 of 35,032 rows; e.g. <code>1</code>, <code>0</code>, <code>2</code>, <code>3</code>, <code>4</code></span> <span class="osi-pg">ICD PDF p. 70</span></div></td></tr>
<tr id="txp_altxt"><td>4</td><td><code>TXP_ALTXT</code></td><td>Char(14)</td><td>M</td><td>Alphanumeric string (up to 14 characters) displayed as the engineering value for any raw value in the range TXP_FROM to TXP_TO.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 35,032 of 35,032 rows; e.g. <code>Error</code>, <code>DISABLED</code>, <code>INVALID</code>, <code>IDLE</code>, <code>ENABLED</code></span> <span class="osi-pg">ICD PDF p. 70</span></div></td></tr>
</tbody></table></div>

## Relationships

- `TXP_NUMBR` → [txf.TXF_NUMBR](txf.md#txf_numbr): Many entries per textual calibration.

## History across ICD issues

ICD 5.1 (p. 34) has the same four fields, all mandatory, with TXP_NUMBR as Number(4); the identifier became Char(10) in ICD 6.0 (ICD 7.0 Annex 1, p. 247; also p. 253). Unchanged in ICD 6.7 Draft A (p. 65-66), 6.9 (p. 68-69) and 7.0 (p. 70). pyscos2000 (ICD 7.2) matches: four mandatory fields, key TXP_NUMBR + TXP_FROM.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 35,032 entries for 1,003 calibrations; every TXP_NUMBR exists in txf; no TXP_ALTXT exceeds 14 characters. Only 31 entries use a true range (TXP_FROM different from TXP_TO), e.g. CDMTX000TM maps 134217793-134256128 to 'MOTOR 1 CLOSE'; all others map single raw values. The largest set, PARAMIDTM, maps each on-board parameter ID to the ground parameter name (e.g. 167776256 -&gt; NCDT00B0, 0 -&gt; DUMMYVAL), turning a textual calibration into a parameter-ID lookup.

## In the Solar Orbiter MIB

The 2025-09-16 release has **35,032** rows in `txp.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.5, PDF p. 69.
