---
title: "caf.dat: Numerical calibrations"
description: "caf defines numerical calibration curves, i.e. piecewise-linear point-pair calibrations that convert a parameter's raw value into an engineering value. It holds one record per curve; the raw/engineeri"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# caf.dat: Numerical calibrations

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.2</span><span class="osi-chip">679 rows in Solar Orbiter 2025-09-16</span></div>

caf defines numerical calibration curves, i.e. piecewise-linear point-pair calibrations that convert a parameter's raw value into an engineering value. It holds one record per curve; the raw/engineering point pairs themselves are in cap. A curve can be shared by any number of monitoring parameters, which reference it through PCF_CURTX (single calibration) or CUR_SELECT (conditional calibration). The record declares the numeric formats of the engineering and raw values stored in cap, the radix used to write unsigned raw values, an optional unit for consistency checks against PCF_UNIT, the number of points and the extrapolation behaviour. SCOS-2000 attaches the extrapolation behaviour to the curve (CAF_INTER), not to the parameter, so every parameter using a curve extrapolates in the same way; a copy of the curve with a different flag is needed if two parameters need different behaviour. Calibration applies only to parameters whose raw representation is numerical (no strings or times), including user defined constants and synthetic parameters, whose computed value is treated as raw (section 3.3.2.2, p. 62).[^icd]

**Key:** `CAF_NUMBR`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="caf_numbr"><td>1</td><td><code>CAF_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric identifier that uniquely names the numerical calibration definition (calibration curve). It is the value used in PCF_CURTX, CUR_SELECT and CAP_NUMBR. Per the mcf and lgf remarks (p. 70-72), it must not coincide with any MCF_IDENT or LGF_IDENT, since all non-textual calibrations share one name space.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 679 of 679 rows; e.g. <code>CAHP0000TM</code>, <code>CAHP0001TM</code>, <code>CAHP0002TM</code>, <code>CAHP0003TM</code>, <code>CAHP0004TM</code></span> <span class="osi-pg">ICD PDF p. 65</span></div></td></tr>
<tr id="caf_descr"><td>2</td><td><code>CAF_DESCR</code></td><td>Char(32)</td><td>O</td><td>Free textual description of the calibration curve.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 679 of 679 rows; e.g. <code>AGC constant TM</code>, <code>APR1_APR1_IIN_TF</code>, <code>APR1_APR1_IOUT_TF</code>, <code>APR1_APR2_IIN_TF</code>, <code>APR1_APR2_IOUT_TF</code></span> <span class="osi-pg">ICD PDF p. 66</span></div></td></tr>
<tr id="caf_engfmt"><td>3</td><td><code>CAF_ENGFMT</code></td><td>Char(1)</td><td>M</td><td>Format of the engineering values (CAP_YVALS) given in the cap records of this curve.<ul class="osi-vals"><li><code>I</code> Signed integer</li><li><code>U</code> Unsigned integer</li><li><code>R</code> Real</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 679 of 679 rows; e.g. <code>R</code></span> <span class="osi-pg">ICD PDF p. 66</span></div></td></tr>
<tr id="caf_rawfmt"><td>4</td><td><code>CAF_RAWFMT</code></td><td>Char(1)</td><td>M</td><td>Format of the raw values (CAP_XVALS) given in the cap records of this curve. It must be compatible with the type of the parameters that use the curve.<ul class="osi-vals"><li><code>I</code> Signed integer</li><li><code>U</code> Unsigned integer</li><li><code>R</code> Real</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 679 of 679 rows; e.g. <code>U</code>, <code>I</code>, <code>R</code></span> <span class="osi-pg">ICD PDF p. 66</span></div></td></tr>
<tr id="caf_radix"><td>5</td><td><code>CAF_RADIX</code></td><td>Char(1)</td><td>O</td><td>Radix in which the raw values of the cap records are written. Only applicable to unsigned integer raw values (CAF_RAWFMT = 'U'); engineering values are always decimal.<ul class="osi-vals"><li><code>D</code> Decimal</li><li><code>H</code> Hexadecimal</li><li><code>O</code> Octal</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 612 of 679 rows; e.g. <code>D</code></span> <span class="osi-pg">ICD PDF p. 66</span></div></td></tr>
<tr id="caf_unit"><td>6</td><td><code>CAF_UNIT</code></td><td>Char(4)</td><td>O</td><td>Engineering unit mnemonic of the curve, available for consistency checking against the unit (PCF_UNIT) of the parameters that use it. The row is shaded grey in the ICD (not used by SCOS-2000 processing).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 654 of 679 rows; e.g. <code>A</code>, <code>V</code>, <code>degC</code>, <code>mA</code>, <code>dBm</code></span> <span class="osi-pg">ICD PDF p. 67</span></div></td></tr>
<tr id="caf_ncurve"><td>7</td><td><code>CAF_NCURVE</code></td><td>Number(3)</td><td>O</td><td>Number of calibration points defined in cap for this curve. Grey row in the ICD: informative, not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 679 of 679 rows; e.g. <code>2</code>, <code>7</code>, <code>3</code>, <code>4</code>, <code>11</code></span> <span class="osi-pg">ICD PDF p. 67</span></div></td></tr>
<tr id="caf_inter"><td>8</td><td><code>CAF_INTER</code></td><td>Char(1)</td><td>O</td><td>Extrapolation behaviour for raw values that fall outside the range covered by the calibration points (CAP_XVALS). This is the flag SCOS-2000 actually uses (PCF_INTER is ignored), so all parameters that share the curve behave the same; if different behaviours are required, a copy of the curve with another flag has to be defined.<ul class="osi-vals"><li><code>P</code> Compute a valid engineering value by linear extrapolation from the first two (below range) or last two (above range) points</li><li><code>F</code> Return an invalid engineering value for raw values outside the curve</li></ul><div class="osi-extra">Default <code>F</code>. <span class="osi-fstat">Solar Orbiter: filled in 0 of 679 rows</span> <span class="osi-pg">ICD PDF p. 67</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CAF_NUMBR` → [cap.CAP_NUMBR](cap.md#cap_numbr): One curve has one or more points in cap (section 3.3.2, p. 39).
- `CAF_NUMBR` → [pcf.PCF_CURTX](pcf.md#pcf_curtx), [cur.CUR_SELECT](cur.md#cur_select): Many parameters may share one curve (many-to-one from pcf).
- `CAF_UNIT` → [pcf.PCF_UNIT](pcf.md#pcf_unit): Consistency check only.

## History across ICD issues

ICD 5.1 ('Numerical calibration curves: caf', p. 32) has seven fields with CAF_NUMBR as Number(4). ICD 6.0 changed calibration identifiers from Number(4) to Char(10) (ICD 7.0 Annex 1, p. 247; also listed under 6.2/6.3, p. 253). CAF_INTER existed in SCOS-2000 since R4 but was first documented in ICD 6.7 (S2K-SPR-4911, p. 259); ICD 6.7 Draft A (p. 63) and 6.9 (p. 66) describe it as an interpolation/extrapolation switch ('P' interpolate/extrapolate, 'F' disabled) with default F. ICD 7.0 rewrote the description to make clear that the curve's flag, not PCF_INTER, governs extrapolation (S2K-8325, p. 261). pyscos2000 (ICD 7.2) has the same eight fields, key and defaults (CAF_INTER default 'F').

!!! note "Notes from the extraction"
    No structural discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 679 curves, all with real engineering format (CAF_ENGFMT 'R'); raw formats U (612, all with radix 'D'), I (66) and R (1). CAF_INTER is empty in every record, so the import default 'F' (no extrapolation) applies to all curves. CAF_NCURVE matches the actual number of cap points for all 679 curves (2 to 1,024 points). No CAF_NUMBR collides with an MCF_IDENT. 76 curves are referenced neither by PCF_CURTX nor by CUR_SELECT. Where both units are given, CAF_UNIT always equals the PCF_UNIT of the parameters that reference the curve through PCF_CURTX. Identifiers follow a 10-character pattern such as CAHP0000TM (the naming convention itself is not documented in the ICD).

## In the Solar Orbiter MIB

The 2025-09-16 release has **679** rows in `caf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.2, PDF p. 65.
