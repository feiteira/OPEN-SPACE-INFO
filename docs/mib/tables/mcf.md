---
title: "mcf.dat: Polynomial calibrations definitions"
description: "mcf defines polynomial calibrations, one record per definition, by giving up to five coefficients. SCOS-2000 computes the engineering value Y of a raw value X as Y = A0 + A1*X + A2*X^2 + A3*X^3 + A4*X"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# mcf.dat: Polynomial calibrations definitions

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.6</span><span class="osi-chip">229 rows in Solar Orbiter 2025-09-16</span></div>

mcf defines polynomial calibrations, one record per definition, by giving up to five coefficients. SCOS-2000 computes the engineering value Y of a raw value X as Y = A0 + A1*X + A2*X^2 + A3*X^3 + A4*X^4, where A0 is MCF_POL1 and A4 is MCF_POL5. Unspecified higher-order coefficients default to 0, so a linear calibration needs only MCF_POL1 and MCF_POL2. Parameters use a polynomial calibration by naming it in PCF_CURTX or CUR_SELECT (numerical parameters, PCF_CATEG = 'N'). The engineering result is always real, which matters when several calibrations are attached to one parameter through cur, because they must all share the same engineering format. Polynomial identifiers share a name space with the other non-textual calibrations: an MCF_IDENT may not equal any CAF_NUMBR or LGF_IDENT. The ICD suggests a naming convention or a reserved range of names to guarantee this.[^icd]

**Key:** `MCF_IDENT`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="mcf_ident"><td>1</td><td><code>MCF_IDENT</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric identifier that uniquely names the polynomial calibration; used in PCF_CURTX and CUR_SELECT. It must not overlap with CAF_NUMBR or LGF_IDENT values.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>CCAX0001TM</code>, <code>CIAP0002TM</code>, <code>CIAP0003TM</code>, <code>CIAP0004TM</code>, <code>CIAP0005TM</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
<tr id="mcf_descr"><td>2</td><td><code>MCF_DESCR</code></td><td>Char(32)</td><td>O</td><td>Free textual description of the polynomial calibration.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>13V Current</code>, <code>13V Voltage</code>, <code>15_5V_minus</code>, <code>15_5V_plus</code>, <code>2.5V Current cal</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
<tr id="mcf_pol1"><td>3</td><td><code>MCF_POL1</code></td><td>Char(14)</td><td>M</td><td>Coefficient A0 (constant term), a numerical value in real format (Appendix A).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>0</code>, <code>-273.15</code>, <code>-52.6</code>, <code>-273</code>, <code>-7.4407</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
<tr id="mcf_pol2"><td>4</td><td><code>MCF_POL2</code></td><td>Char(14)</td><td>O</td><td>Coefficient A1 of the first-order term, in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>1</code>, <code>0.0378</code>, <code>0.001220703125</code>, <code>0.1</code>, <code>7.35043E-4</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
<tr id="mcf_pol3"><td>5</td><td><code>MCF_POL3</code></td><td>Char(14)</td><td>O</td><td>Coefficient A2 of the second-order term, in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>0</code>, <code>-0.000006</code>, <code>-0.00003199115</code>, <code>0.0003508</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
<tr id="mcf_pol4"><td>6</td><td><code>MCF_POL4</code></td><td>Char(14)</td><td>O</td><td>Coefficient A3 of the third-order term, in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>0</code>, <code>-0.0000001434</code>, <code>0.00000000563</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
<tr id="mcf_pol5"><td>7</td><td><code>MCF_POL5</code></td><td>Char(14)</td><td>O</td><td>Coefficient A4 of the fourth-order term, in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 229 of 229 rows; e.g. <code>0</code>, <code>0.000000000021</code></span> <span class="osi-pg">ICD PDF p. 71</span></div></td></tr>
</tbody></table></div>

## Relationships

- `MCF_IDENT` → [pcf.PCF_CURTX](pcf.md#pcf_curtx), [cur.CUR_SELECT](cur.md#cur_select): Shareable among parameters; must be unique across caf.CAF_NUMBR and lgf.LGF_IDENT.

## History across ICD issues

ICD 5.1 calls the table 'Polynomial calibration curves: mcf' (p. 34-35); it has the same seven fields with MCF_IDENT as Number(4) and default '0' for MCF_POL2 to MCF_POL5. MCF_IDENT became Char(10) with the other calibration identifiers in ICD 6.0 (ICD 7.0 Annex 1, p. 247). Unchanged in ICD 6.7 Draft A (p. 66-67), 6.9 (p. 69-70) and 7.0 (p. 70-71). pyscos2000 (ICD 7.2) matches, including the '0' defaults.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 229 polynomial calibrations. Every record fills all five coefficients explicitly; 226 are linear (only A0 and A1 non-zero) and 3 use higher orders, e.g. CIAP0081TM 'DPU_TMP' (A0 = 180.65, A1 = -0.4018, A2 = 0.0003508, A3 = -0.0000001434, A4 = 0.000000000021, real data). Coefficients are written in fixed or scientific notation (e.g. 7.35043E-4). No MCF_IDENT collides with a CAF_NUMBR; 3 definitions are not referenced by any parameter.

## In the Solar Orbiter MIB

The 2025-09-16 release has **229** rows in `mcf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.6, PDF p. 70.
