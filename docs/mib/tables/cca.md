---
title: "cca.dat: Numerical (de-)calibration curves"
description: "The cca table defines the numerical (de-)calibration curves used for command and sequence parameters, one record per curve; the points of each curve are in CCS. A parameter with calibration category C"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# cca.dat: Numerical (de-)calibration curves

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.6.1</span><span class="osi-chip">99 rows in Solar Orbiter 2025-09-16</span></div>

The cca table defines the numerical (de-)calibration curves used for command and sequence parameters, one record per curve; the points of each curve are in CCS. A parameter with calibration category C (CPC_CATEG or CSP_CATEG) references one curve through CPC_CCAREF or CSP_CCAREF, and a curve may be shared by many parameters (many-to-one). Unlike the monitoring calibrations (CAF/CAP, TXF/TXP), the commanding (de-)calibrations work in both directions: engineering to raw, for display and for encoding, and raw to engineering, for display. They can be attached to command parameters (CPC) and to sequence formal parameters (CSP) alike, but only to parameters whose raw value is numerical (not strings or times). The record states the numeric format of the engineering values (signed, unsigned or real) and of the raw values, which must be compatible with the engineering display format and the type of the parameters using the curve, and the radix in which unsigned raw values are written in CCS. To avoid ambiguity when an operator types an engineering value, the ICD requires curves to give a one-to-one correspondence between raw and engineering values. The unit and the number of points are informative, for off-line consistency checks.[^icd]

**Key:** `CCA_NUMBR`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="cca_numbr"><td>1</td><td><code>CCA_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric name uniquely identifying the commanding numerical (de-)calibration curve; referenced by CPC_CCAREF, CSP_CCAREF and CCS_NUMBR.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 99 of 99 rows; e.g. <code>CAHP0000TC</code>, <code>CAHP0001TC</code>, <code>CAHP0002TC</code>, <code>CAHP0003TC</code>, <code>CAHP0004TC</code></span> <span class="osi-pg">ICD PDF p. 206</span></div></td></tr>
<tr id="cca_descr"><td>2</td><td><code>CCA_DESCR</code></td><td>Char(24)</td><td>O</td><td>Textual description of the (de-)calibration curve.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 99 of 99 rows; e.g. <code>AGC constant voltage</code>, <code>Current value</code>, <code>Go to Safe angular rate</code>, <code>K0 parameter</code>, <code>K1 parameter</code></span> <span class="osi-pg">ICD PDF p. 206</span></div></td></tr>
<tr id="cca_engfmt"><td>3</td><td><code>CCA_ENGFMT</code></td><td>Char(1)</td><td>O</td><td>Numeric format of the engineering values given in the CCS records of the curve (CCS_XVALS). It must be compatible with the engineering format (CPC_DISPFMT/CSP_DISPFMT) of the parameters using the curve.<ul class="osi-vals"><li><code>I</code> Signed integer</li><li><code>U</code> Unsigned integer</li><li><code>R</code> Real (import default)</li></ul><div class="osi-extra">Default <code>R</code>. <span class="osi-fstat">Solar Orbiter: filled in 99 of 99 rows; e.g. <code>R</code>, <code>U</code></span> <span class="osi-pg">ICD PDF p. 206</span></div></td></tr>
<tr id="cca_rawfmt"><td>4</td><td><code>CCA_RAWFMT</code></td><td>Char(1)</td><td>O</td><td>Numeric format of the raw values given in the CCS records of the curve (CCS_YVALS). It must be compatible with the type (PTC) of the parameters using the curve.<ul class="osi-vals"><li><code>I</code> Signed integer</li><li><code>U</code> Unsigned integer (import default)</li><li><code>R</code> Real</li></ul><div class="osi-extra">Default <code>U</code>. <span class="osi-fstat">Solar Orbiter: filled in 99 of 99 rows; e.g. <code>U</code>, <code>I</code></span> <span class="osi-pg">ICD PDF p. 206</span></div></td></tr>
<tr id="cca_radix"><td>5</td><td><code>CCA_RADIX</code></td><td>Char(1)</td><td>O</td><td>Radix in which the raw values (CCS_YVALS) of the curve are written; only applicable when the raw values are unsigned integers (CCA_RAWFMT=U). It may differ from the radix (CPC_RADIX/CSP_RADIX) of the parameters using the curve.<ul class="osi-vals"><li><code>D</code> Decimal (import default)</li><li><code>H</code> Hexadecimal</li><li><code>O</code> Octal</li></ul><div class="osi-extra">Default <code>D</code>. <span class="osi-fstat">Solar Orbiter: filled in 82 of 99 rows; e.g. <code>D</code></span> <span class="osi-pg">ICD PDF p. 207</span></div></td></tr>
<tr id="cca_unit"><td>6</td><td><code>CCA_UNIT</code></td><td>Char(4)</td><td>O</td><td>Engineering unit mnemonic, provided for consistency checking against the unit (CPC_UNIT/CSP_UNIT) of the parameters using the curve. Grey in ICD 7.0: not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 85 of 99 rows; e.g. <code>mA</code>, <code>deg</code>, <code>degC</code>, <code>V</code>, <code>DegC</code></span> <span class="osi-pg">ICD PDF p. 207</span></div></td></tr>
<tr id="cca_ncurve"><td>7</td><td><code>CCA_NCURVE</code></td><td>Number(3)</td><td>O</td><td>Number of CCS records (points) defined for this curve. Grey in ICD 7.0: not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 99 of 99 rows; e.g. <code>2</code>, <code>3</code>, <code>41</code>, <code>10</code>, <code>14</code></span> <span class="osi-pg">ICD PDF p. 207</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CCA_NUMBR` → [ccs.CCS_NUMBR](ccs.md#ccs_numbr): Points of the curve (one-to-many); CCA_NCURVE should equal their number.
- `CCA_NUMBR` → [cpc.CPC_CCAREF](cpc.md#cpc_ccaref): Command parameters with CPC_CATEG=C (many-to-one).
- `CCA_NUMBR` → [csp.CSP_CCAREF](csp.md#csp_ccaref): Sequence formal parameters with CSP_CATEG=C.
- `CCA_UNIT` → [cpc.CPC_UNIT](cpc.md#cpc_unit) / [csp.CSP_UNIT](csp.md#csp_unit): Consistency check only.

## History across ICD issues

ICD 5.1 (2001, section 3.3.3.6.1, PDF p.99-100) has the same seven fields and defaults (R, U, D) but CCA_NUMBR is Number(4). The identifier became Char(10) with the Herschel/Planck repatriation in ICD 6.0 (Annex 1 of ICD 7.0, 'Curve ID' item, PDF p.247; field type change and CCA_DESCR update listed for ICD 6.2/6.3, PDF p.253-254). ICD 6.7 Draft A (PDF p.192-194), ICD 6.9 (PDF p.197-199) and ICD 7.0 (PDF p.206-207) are identical. pyscos2000 (ICD 7.2) has the same seven columns, key and defaults.

!!! note "Notes from the extraction"
    No column discrepancy (7 columns in cca.dat). Solar Orbiter 2025-09-16: 99 curves (100 in 2020); CCA_ENGFMT R 97 and U 2; CCA_RAWFMT U 82 and I 17, CCA_RADIX D for the 82 unsigned curves and empty for the 17 signed ones, as the ICD rule implies. CCA_NCURVE always equals the CCS count and every curve is used by at least one CPC or CSP record. Curve names follow a mission convention ending in 'TC' (97) or 'TM' (2). The interpolation rule applied between curve points is not stated in ICD 7.0 for commanding curves.

## In the Solar Orbiter MIB

The 2025-09-16 release has **99** rows in `cca.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.6.1, PDF p. 206.
