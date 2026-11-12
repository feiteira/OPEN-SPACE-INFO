---
title: "cap.dat: Numerical calibrations definition"
description: "cap holds the points of the numerical calibration curves declared in caf: one record per raw/engineering value pair. SCOS-2000 calibrates a raw value by locating it between two consecutive points of t"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# cap.dat: Numerical calibrations definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.3</span><span class="osi-chip">7,830 rows in Solar Orbiter 2025-09-16</span></div>

cap holds the points of the numerical calibration curves declared in caf: one record per raw/engineering value pair. SCOS-2000 calibrates a raw value by locating it between two consecutive points of the curve and interpolating linearly between them (as the CAF_INTER description of ICD 6.7/6.9 explains). Outside the range covered by the points it either extrapolates from the first or last two points or returns an invalid value, depending on the curve's CAF_INTER flag. Raw values are written in the format declared by CAF_RAWFMT and, for unsigned integers, in the radix given by CAF_RADIX. Engineering values follow CAF_ENGFMT and are always decimal, even when they are unsigned integers. Because the key is the pair (CAP_NUMBR, CAP_XVALS), a curve cannot contain two points with the same raw value. The number of records per curve should agree with CAF_NCURVE.[^icd]

**Key:** `CAP_NUMBR`, `CAP_XVALS`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="cap_numbr"><td>1</td><td><code>CAP_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Identifier of the calibration curve this point belongs to; must match CAF_NUMBR of an existing caf record.<div class="osi-extra">Refers to <a href="../caf/">caf.CAF_NUMBR</a>. <span class="osi-fstat">Solar Orbiter: filled in 7,830 of 7,830 rows; e.g. <code>CDST0007TM</code>, <code>CITP1054TM</code>, <code>CICP0400TM</code>, <code>CICP0420TM</code>, <code>CITP1083TM</code></span> <span class="osi-pg">ICD PDF p. 68</span></div></td></tr>
<tr id="cap_xvals"><td>2</td><td><code>CAP_XVALS</code></td><td>Char(14)</td><td>M</td><td>Raw value of the calibration point, written in a format compatible with CAF_RAWFMT. Unsigned integer raw values (CAF_RAWFMT = 'U') must be written in the radix of the curve (CAF_RADIX).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 7,830 of 7,830 rows; e.g. <code>0</code>, <code>4095</code>, <code>255</code>, <code>-32768</code>, <code>32767</code></span> <span class="osi-pg">ICD PDF p. 68</span></div></td></tr>
<tr id="cap_yvals"><td>3</td><td><code>CAP_YVALS</code></td><td>Char(14)</td><td>M</td><td>Engineering value of the calibration point, written in a format compatible with CAF_ENGFMT. All engineering values, including unsigned integers, are written in decimal whatever the curve's CAF_RADIX.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 7,830 of 7,830 rows; e.g. <code>0</code>, <code>0.0201</code>, <code>0.1001</code>, <code>0.05</code>, <code>1.002</code></span> <span class="osi-pg">ICD PDF p. 68</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CAP_NUMBR` → [caf.CAF_NUMBR](caf.md#caf_numbr): Many points per curve.

## History across ICD issues

ICD 5.1 ('Numerical calibration curves definition: cap', p. 33) has the same three fields but CAP_NUMBR is Number(4). The identifier became Char(10) in ICD 6.0 (ICD 7.0 Annex 1, p. 247; field-type change also listed for 6.2/6.3, p. 253). The definition is unchanged in ICD 6.7 Draft A (p. 63-64), 6.9 (p. 66-67) and 7.0 (p. 68). pyscos2000 (ICD 7.2) matches: three mandatory fields, key CAP_NUMBR + CAP_XVALS.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 7,830 points for 679 curves (every CAP_NUMBR exists in caf and every curve has at least 2 points; the largest has 1,024). Raw values reach the full 14-character field width, as do engineering values. Example (real data): curve CAHP0000TM maps raw -2048 to -180 and raw 2047 to 179.91211, a two-point linear calibration.

## In the Solar Orbiter MIB

The 2025-09-16 release has **7,830** rows in `cap.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.3, PDF p. 68.
