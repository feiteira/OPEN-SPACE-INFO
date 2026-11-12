---
title: "prf.dat: Parameter range sets"
description: "The prf table defines range sets, i.e. named sets of allowed values or value ranges that SCOS-2000 uses to check the values of command parameters (through CPC_PRFREF) and of sequence formal parameters"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# prf.dat: Parameter range sets

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.7.1</span><span class="osi-chip">565 rows in Solar Orbiter 2025-09-16</span></div>

The prf table defines range sets, i.e. named sets of allowed values or value ranges that SCOS-2000 uses to check the values of command parameters (through CPC_PRFREF) and of sequence formal parameters (through CSP_PRFREF), one record per set; the individual ranges and discrete values are in PRV. A set may be shared by many parameters. Only parameters whose raw value is numerical or a time can be range checked; strings cannot. The record states whether the limits are written as raw or engineering values, the representation type of the limits (ASCII, signed or unsigned integer, real, absolute or relative time) and, for unsigned integers, their radix; these must be compatible with the type or engineering format of every parameter using the set. When a command sequence is loaded on a manual stack only the formal parameter values are checked against their range sets, not every value of the contained commands and sequences, although SCOS-2000 can be configured to check all parameter values at sequence loading time. The unit and the number of ranges are informative, for off-line consistency checks.[^icd]

**Key:** `PRF_NUMBR`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="prf_numbr"><td>1</td><td><code>PRF_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric name uniquely identifying the range set; referenced by CPC_PRFREF, CSP_PRFREF and PRV_NUMBR.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 565 of 565 rows; e.g. <code>CACP4901TC</code>, <code>VCD00147</code>, <code>VCD00149</code>, <code>VCD00150</code>, <code>VCD00153</code></span> <span class="osi-pg">ICD PDF p. 211</span></div></td></tr>
<tr id="prf_descr"><td>2</td><td><code>PRF_DESCR</code></td><td>Char(24)</td><td>O</td><td>Textual description of the range set.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 565 of 565 rows; e.g. <code>Range Definition</code>, <code>Integer between 0 and 23</code>, <code>Integer between 1 and 23</code>, <code>Integer between 0 and 22</code>, <code>Integer between 0 and 25</code></span> <span class="osi-pg">ICD PDF p. 211</span></div></td></tr>
<tr id="prf_inter"><td>3</td><td><code>PRF_INTER</code></td><td>Char(1)</td><td>O</td><td>Representation in which the limits PRV_MINVAL and PRV_MAXVAL of this set are written.<ul class="osi-vals"><li><code>R</code> Raw values (import default).</li><li><code>E</code> Engineering values; allowed only if every parameter using the set is calibrated (CPC_CATEG/CSP_CATEG T or C).</li></ul><div class="osi-extra">Default <code>R</code>. <span class="osi-fstat">Solar Orbiter: filled in 565 of 565 rows; e.g. <code>R</code>, <code>E</code></span> <span class="osi-pg">ICD PDF p. 211</span></div></td></tr>
<tr id="prf_dspfmt"><td>4</td><td><code>PRF_DSPFMT</code></td><td>Char(1)</td><td>O</td><td>Representation type of the limit values in PRV, whose value formats are given in Appendix A. It must be compatible with the parameters using the set: with their PTC when PRF_INTER=R, and with their DISPFMT when PRF_INTER=E or for time parameters.<ul class="osi-vals"><li><code>A</code> ASCII.</li><li><code>I</code> Signed integer.</li><li><code>U</code> Unsigned integer (import default).</li><li><code>R</code> Real.</li><li><code>T</code> Absolute time.</li><li><code>D</code> Delta/relative time.</li></ul><div class="osi-extra">Default <code>U</code>. <span class="osi-fstat">Solar Orbiter: filled in 565 of 565 rows; e.g. <code>U</code>, <code>R</code>, <code>A</code>, <code>I</code></span> <span class="osi-pg">ICD PDF p. 212</span></div></td></tr>
<tr id="prf_radix"><td>5</td><td><code>PRF_RADIX</code></td><td>Char(1)</td><td>O</td><td>Radix of the limit values in PRV; only applicable for unsigned integers (PRF_DSPFMT=U). It may differ from the radix (CPC_RADIX/CSP_RADIX) of the parameters using the set.<ul class="osi-vals"><li><code>D</code> Decimal (import default)</li><li><code>H</code> Hexadecimal</li><li><code>O</code> Octal</li></ul><div class="osi-extra">Default <code>D</code>. <span class="osi-fstat">Solar Orbiter: filled in 549 of 565 rows; e.g. <code>D</code>, <code>H</code></span> <span class="osi-pg">ICD PDF p. 212</span></div></td></tr>
<tr id="prf_nrange"><td>6</td><td><code>PRF_NRANGE</code></td><td>Number(3)</td><td>O</td><td>Number of PRV records defined for this set. Grey in ICD 7.0: not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 564 of 565 rows; e.g. <code>1</code>, <code>2</code>, <code>20</code>, <code>5</code>, <code>58</code></span> <span class="osi-pg">ICD PDF p. 212</span></div></td></tr>
<tr id="prf_unit"><td>7</td><td><code>PRF_UNIT</code></td><td>Char(4)</td><td>O</td><td>Engineering unit mnemonic, for consistency checking against the unit (CPC_UNIT/CSP_UNIT) of the parameters using the set. Grey in ICD 7.0: not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 100 of 565 rows; e.g. <code>s</code>, <code>ms</code>, <code>#/nT</code>, <code>B</code>, <code>V</code></span> <span class="osi-pg">ICD PDF p. 213</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PRF_NUMBR` → [prv.PRV_NUMBR](prv.md#prv_numbr): Allowed values/ranges of the set (one-to-many); PRF_NRANGE should equal their number.
- `PRF_NUMBR` → [cpc.CPC_PRFREF](cpc.md#cpc_prfref): Command parameters checked against the set (many-to-one).
- `PRF_NUMBR` → [csp.CSP_PRFREF](csp.md#csp_prfref): Sequence formal parameters checked against the set.
- `PRF_UNIT` → [cpc.CPC_UNIT](cpc.md#cpc_unit) / [csp.CSP_UNIT](csp.md#csp_unit): Consistency check only.

## History across ICD issues

ICD 5.1 (2001, section 3.3.3.7.1, PDF p.102-103) has the same seven fields and defaults (R, U, D) with PRF_NUMBR Number(4). The range set identifier became Char(10) in ICD 6.0 (Annex 1 of ICD 7.0, 'Range Set ID' item, PDF p.247); ICD 6.7 Draft A (PDF p.197-199), ICD 6.9 (PDF p.202-204) and ICD 7.0 (PDF p.210-213) are identical in structure. pyscos2000 (ICD 7.2) has the same seven columns and key, but gives PRF_DSPFMT the default R instead of the ICD's U.

!!! note "Notes from the extraction"
    Default discrepancy: PRF_DSPFMT import default is 'U' in ICD 5.1, 6.9 and 7.0 but 'R' in pyscos2000 (7.2); a file leaving the field empty would be interpreted differently. Solar Orbiter always fills it, so the data are not affected. Solar Orbiter 2025-09-16: 565 range sets (531 in 2020); PRF_INTER R 549 and E 16; PRF_DSPFMT U 457, R 88, I 4 and A 16 (the 16 ASCII sets are exactly the engineering ones, holding lists of allowed alias texts); PRF_RADIX D 529, H 20, empty for the 16 ASCII sets. PRF_NRANGE disagrees with the PRV count for VCTX0001 (declares 104, has 101) and is empty for VNISLP01. Five sets are not referenced by any CPC or CSP record, while CSP_PRFREF 'VSM00001' points to a set that does not exist.

## In the Solar Orbiter MIB

The 2025-09-16 release has **565** rows in `prf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.7.1, PDF p. 210.
