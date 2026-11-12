---
title: "ocf.dat: Monitoring checks"
description: "ocf declares, for each monitoring parameter that is checked, the general characteristics of its monitoring checks (out-of-limit, status, delta, status-consistency and event checks); there is at most o"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# ocf.dat: Monitoring checks

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.3.1</span><span class="osi-chip">5,338 rows in Solar Orbiter 2025-09-16</span></div>

ocf declares, for each monitoring parameter that is checked, the general characteristics of its monitoring checks (out-of-limit, status, delta, status-consistency and event checks); there is at most one record per parameter and the individual checks are listed in ocp. The record states how many consecutive valid samples must violate a check before the parameter is declared out of limits (OOL), how many ocp checks exist for the parameter (1 to 16), and how the limit values in ocp are to be interpreted: as raw or calibrated values, and as real, integer or ASCII values. These checks are run by the SCOS-2000 Behaviour Limit Checker. If its optimised processing of unchanged periodic samples is enabled (MISCconfig BEHV_ENABLE_OPTIMIZATION = 1), the MISCconfig variable MVC_MAX_CONST_NUMBR must be larger than the largest OCF_NBCHCK in the table. The relationship between pcf and ocf is one-to-one: each parameter references only one set of checks, which can contain up to 16 checks with their own types and applicability criteria.[^icd]

**Key:** `OCF_NAME`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="ocf_name"><td>1</td><td><code>OCF_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter to be checked; must match PCF_NAME of an existing monitoring parameter.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 5,338 of 5,338 rows; e.g. <code>NAHD0004</code>, <code>NAHD0005</code>, <code>NAHD0006</code>, <code>NAHD0007</code>, <code>NAHD0008</code></span> <span class="osi-pg">ICD PDF p. 73</span></div></td></tr>
<tr id="ocf_nbchck"><td>2</td><td><code>OCF_NBCHCK</code></td><td>Number(2)</td><td>M</td><td>Number of consecutive valid samples of the parameter that must violate a check before the parameter is declared out of limits (OOL). It filters out isolated glitches. When the Behaviour Limit Checker optimisation is enabled, MVC_MAX_CONST_NUMBR must exceed the largest value used here (warning at the start of section 3.3.2.3.1, p. 73, which spells the field 'OCF_NBCHK').<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5,338 of 5,338 rows; e.g. <code>1</code>, <code>2</code>, <code>3</code>, <code>14</code>, <code>5</code></span> <span class="osi-pg">ICD PDF p. 73</span></div></td></tr>
<tr id="ocf_nbool"><td>3</td><td><code>OCF_NBOOL</code></td><td>Number(2)</td><td>M</td><td>Number of checks defined for this parameter in ocp, an integer from 1 to 16. It must be consistent with the number of ocp records for the parameter.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5,338 of 5,338 rows; e.g. <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>6</code></span> <span class="osi-pg">ICD PDF p. 73</span></div></td></tr>
<tr id="ocf_inter"><td>4</td><td><code>OCF_INTER</code></td><td>Char(1)</td><td>M</td><td>Whether the limit values OCP_LVALU and OCP_HVALU of this parameter are raw or engineering values. Option 'C' is allowed only for parameters with one or more calibrations (see PCF_CURTX and cur). OCF_CODIN must be compatible with the data type of the view chosen here, and if the parameter is used in a command verification expression (cve) OCF_CODIN must also be compatible with CVE_INTER.<ul class="osi-vals"><li><code>U</code> Uncalibrated: limits are raw values</li><li><code>C</code> Calibrated: limits are engineering values</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5,338 of 5,338 rows; e.g. <code>C</code>, <code>U</code></span> <span class="osi-pg">ICD PDF p. 74</span></div></td></tr>
<tr id="ocf_codin"><td>5</td><td><code>OCF_CODIN</code></td><td>Char(1)</td><td>M</td><td>Data type in which the limit values OCP_LVALU and OCP_HVALU are written.<ul class="osi-vals"><li><code>R</code> Real values: only for raw values of real parameters (OCF_INTER = 'U' and PCF_PTC = 5), for engineering values of parameters with numerical curves of real engineering format (PCF_CATEG = 'N', CAF_ENGFMT = 'R'), or for engineering values of parameters with polynomial or logarithmic calibrations</li><li><code>A</code> ASCII strings: only for status parameters (PCF_CATEG = 'S') whose expected values are given in engineering (calibrated text) form, i.e. OCF_INTER = 'C'</li><li><code>I</code> Integer values: only for raw values of integer parameters (OCF_INTER = 'U' and PCF_PTC &lt; 5) or for engineering values of parameters with numerical curves of integer engineering format (PCF_CATEG = 'N', CAF_ENGFMT not 'R')</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5,338 of 5,338 rows; e.g. <code>I</code>, <code>R</code>, <code>A</code></span> <span class="osi-pg">ICD PDF p. 75</span></div></td></tr>
</tbody></table></div>

## Relationships

- `OCF_NAME` → [pcf.PCF_NAME](pcf.md#pcf_name): One-to-one: each parameter has at most one ocf record (section 3.3.2, p. 39).
- `OCF_NAME` → [ocp.OCP_NAME](ocp.md#ocp_name): One ocf record owns OCF_NBOOL (1-16) ocp check records.

## History across ICD issues

ICD 5.1 (p. 35-36) has the same five fields, all mandatory. Its OCF_INTER 'C' option required 'a calibration curve (PCF_CURTX not null)', and its OCF_CODIN 'A' option was tied to OCF_INTER = 'U'; ICD 7.0 allows 'C' for any calibrated parameter (including via cur) and ties 'A' to OCF_INTER = 'C' (p. 74-75). ICD 6.0 added delta checks and multiple sets of status checks (ICD 7.0 Annex 1, p. 246 and 249). ICD 6.5 added the warning about BEHV_ENABLE_OPTIMIZATION and MVC_MAX_CONST_NUMBR (p. 256). The field layout is unchanged in ICD 6.7 Draft A (p. 68-70), 6.9 (p. 71-73) and 7.0. pyscos2000 (ICD 7.2) matches: five mandatory fields, key OCF_NAME.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. ICD inconsistency: the field is named OCF_NBCHCK in the table but OCF_NBCHK in the warning text and change annex. Solar Orbiter 2025-09-16: 5,338 checked parameters. OCF_INTER/OCF_CODIN combinations: C/A 1,633 (status parameters checked against text), C/R 1,558, U/I 2,029, U/R 110, C/I 8. OCF_NBCHCK ranges from 1 (3,989 parameters) to 24; values 1, 2, 3, 4, 5, 8, 10, 14, 15 and 24 occur. OCF_NBOOL matches the number of ocp records for every parameter except NCDX9308, which declares 2 checks but has no ocp record (the ICD requires consistency; the importer behaviour in that case is not stated).

## In the Solar Orbiter MIB

The 2025-09-16 release has **5,338** rows in `ocf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.3.1, PDF p. 72.
