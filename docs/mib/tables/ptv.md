---
title: "ptv.dat: Commands pre-transmission validation"
description: "The ptv table defines the static pre-transmission validation (PTV) of commands: telemetry-based conditions that must hold before SCOS-2000 releases a command. There is one record per check, each check"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# ptv.dat: Commands pre-transmission validation

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.2.4</span><span class="osi-chip">5 rows in Solar Orbiter 2025-09-16</span></div>

The ptv table defines the static pre-transmission validation (PTV) of commands: telemetry-based conditions that must hold before SCOS-2000 releases a command. There is one record per check, each check requiring that a given monitoring parameter equals a given value; all checks defined for the same command are implicitly ANDed, and because the key is the command plus the parameter, a parameter can be used only once per command. A PTV expression belongs to exactly one command: if the same condition is needed for another command it must be defined again (one-to-many relationship from CCF to PTV). The validity of the monitoring parameter is taken into account implicitly, so a check passes only if the parameter is valid and has the required value. Only parameters with a numerical raw representation (no strings or times) that are processed by the telemetry model (parameters located in PLF, or synthetic parameters) may be used. Static PTV can be overridden for an individual command inside a sequence with CSS_STAPTV, and is distinct from the dynamic PTV checks (feasibility, time checks, interlocks) that CSS_DYNPTV controls.[^icd]

**Key:** `PTV_CNAME`, `PTV_PARNAM`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="ptv_cname"><td>1</td><td><code>PTV_CNAME</code></td><td>Char(8)</td><td>M</td><td>Name of the command (CCF_CNAME) to which this validation check applies.<div class="osi-extra">Refers to <a href="../ccf/">ccf.CCF_CNAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>ZCD00D09</code>, <code>ZSM00120</code>, <code>ZSM00125</code>, <code>ZSM00130</code>, <code>ZSM00135</code></span> <span class="osi-pg">ICD PDF p. 160</span></div></td></tr>
<tr id="ptv_parnam"><td>2</td><td><code>PTV_PARNAM</code></td><td>Char(8)</td><td>M</td><td>Name of the monitoring parameter (PCF_NAME) tested by the check. It must have a numerical raw representation (not a string or time) and must be processed by the telemetry model library, i.e. be a TM parameter appearing in PLF or a synthetic parameter of any type.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>NMAXS005</code>, <code>NCDXS005</code></span> <span class="osi-pg">ICD PDF p. 160</span></div></td></tr>
<tr id="ptv_inter"><td>3</td><td><code>PTV_INTER</code></td><td>Char(1)</td><td>O</td><td>Representation in which the expected value PTV_VAL is written.<ul class="osi-vals"><li><code>R</code> Raw value (import default); for synthetic parameters the raw value is the output of the OL or hard-coded definition.</li><li><code>E</code> Engineering (calibrated) value; only for parameters with a single calibration (PCF_CURTX filled), not for parameters with conditional calibrations defined in CUR.</li></ul><div class="osi-extra">Default <code>R</code>. <span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>R</code></span> <span class="osi-pg">ICD PDF p. 160</span></div></td></tr>
<tr id="ptv_val"><td>4</td><td><code>PTV_VAL</code></td><td>Char(17)</td><td>M</td><td>Value that the validation parameter must equal for the check to pass. It is written raw unless PTV_INTER=E: raw values in decimal, compatible with the parameter type (PCF_PTC); engineering values in the parameter's engineering representation (ASCII for textually calibrated parameters, PCF_CATEG=S, or the CAF_ENGFMT of the numeric calibration).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 5 of 5 rows; e.g. <code>0</code></span> <span class="osi-pg">ICD PDF p. 161</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PTV_CNAME` → [ccf.CCF_CNAME](ccf.md#ccf_cname): Command being validated; multiple checks per command are ANDed.
- `PTV_PARNAM` → [pcf.PCF_NAME](pcf.md#pcf_name): Monitoring parameter tested; must be in plf or synthetic, numeric raw type.
- `PTV_INTER` → [pcf.PCF_CURTX](pcf.md#pcf_curtx) / cur: Engineering values require a single calibration (PCF_CURTX); not allowed with CUR conditional calibrations.

## History across ICD issues

The four fields are unchanged from ICD 5.1 (section 3.3.3.2.4, PDF p.73-74) through ICD 6.7 Draft A (PDF p.149), ICD 6.9 (PDF p.153-155) and ICD 7.0 (PDF p.159-161), with the same key (PTV_CNAME + PTV_PARNAM), PTV_VAL Char(17) mandatory and PTV_INTER defaulting to R. ICD 6.4 added the clarification that only parameters processed by the TM model can be used (Annex 1, PDF p.254). pyscos2000 (ICD 7.2) has the same columns, keys and default.

!!! note "Notes from the extraction"
    No column discrepancy (4 columns in ptv.dat). The 2020-04-16 Solar Orbiter release ships an empty ptv.dat (0 records); the 2025-09-16 release has 5 checks: commands ZSM00120, ZSM00125, ZSM00130 and ZSM00135 require monitoring parameter NMAXS005 to equal raw 0, and ZCD00D09 requires NCDXS005 to equal raw 0. Both parameters exist in PCF.

## In the Solar Orbiter MIB

The 2025-09-16 release has **5** rows in `ptv.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.2.4, PDF p. 159.
