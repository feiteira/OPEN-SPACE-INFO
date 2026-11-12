---
title: "grpa.dat: Parameters groups"
description: "grpa lists the members of parameter groups, one record per monitoring parameter included in a group. A parameter may belong to any number of groups, and a group contains many parameters. The section 3"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# grpa.dat: Parameters groups

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.6.2</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

grpa lists the members of parameter groups, one record per monitoring parameter included in a group. A parameter may belong to any number of groups, and a group contains many parameters. The section 3.3.2 overview even mentions the same parameter appearing several times, although the key GRPA_GNAME + GRPA_PANAME allows a given parameter only once per group. The group itself must be declared in grp with GRP_GTYPE = 'PA'. Only parameters processed by the telemetry model library may be members, i.e. TM parameters that have a plf entry or synthetic parameters of any kind. Enabling or inhibiting the group then enables or inhibits each member parameter in turn. An inhibited parameter is not calibrated or limit checked and its updates are not distributed (ICD 7.0 Annex 1, p. 246-247). There is no specific user interface for group enable/inhibit, and parameters in several groups receive no special handling.[^icd]

**Key:** `GRPA_GNAME`, `GRPA_PANAME`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="grpa_gname"><td>1</td><td><code>GRPA_GNAME</code></td><td>Char(14)</td><td>M</td><td>Name of the monitoring group to which the parameter belongs; must match GRP_NAME of a group with GRP_GTYPE = 'PA'.<div class="osi-extra">Refers to <a href="../grp/">grp.GRP_NAME</a>. <span class="osi-pg">ICD PDF p. 109</span></div></td></tr>
<tr id="grpa_paname"><td>2</td><td><code>GRPA_PANAME</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter belonging to the group; must match PCF_NAME. Only parameters processed by the telemetry model library (TM parameters in plf, or synthetic parameters of any type) may be used.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-pg">ICD PDF p. 109</span></div></td></tr>
</tbody></table></div>

## Relationships

- `GRPA_GNAME` → [grp.GRP_NAME](grp.md#grp_name): Group must have GRP_GTYPE = 'PA'.
- `GRPA_PANAME` → [pcf.PCF_NAME](pcf.md#pcf_name): Many-to-many link between parameters and parameter groups (section 3.3.2, p. 39).

## History across ICD issues

Not present in ICD 5.1; introduced in ICD 6.0 together with grp and grpk (ICD 7.0 Annex 1, p. 247). ICD 6.7 Draft A (p. 102), 6.9 (p. 106) and 7.0 (p. 109) give the same two mandatory key fields. Not modelled by pyscos2000, so no ICD 7.2 comparison is available.

!!! note "Notes from the extraction"
    grpa is not in the pyscos2000 schema; because the Solar Orbiter grpa.dat files (2025-09-16 and 2020-04-16 releases, and the SWA database) are empty, the SQLite table has a single placeholder column COL1 and no rows, so the field mapping cannot be checked against data. The overview's 'possibly many times the same parameter' (p. 39) conflicts with the two-field key, which allows a parameter only once per group; the intended meaning is probably that one parameter can appear in many groups (inference).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `grpa.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.6.2, PDF p. 109.
