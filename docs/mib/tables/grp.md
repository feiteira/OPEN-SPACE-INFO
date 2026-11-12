---
title: "grp.dat: Monitoring groups definition"
description: "grp defines named monitoring groups, one record per group. A group is either a parameter group (members listed in grpa) or a packet group (members listed in grpk). SCOS-2000 uses monitoring groups to "
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# grp.dat: Monitoring groups definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.6.1</span><span class="osi-chip">2 rows in Solar Orbiter 2025-09-16</span></div>

grp defines named monitoring groups, one record per group. A group is either a parameter group (members listed in grpa) or a packet group (members listed in grpk). SCOS-2000 uses monitoring groups to enable or inhibit the processing or monitoring of many parameters or packets with a single command. According to the ICD change annex, inhibiting a parameter stops its processing: no calibration, no limit checking and no distribution of updates. Inhibiting a packet means it is still stored but neither distributed nor used for parameter extraction, while parameters also carried by other packets keep updating from those. Enabling or inhibiting a group simply repeats the operation on each member; membership of several groups gets no special treatment, and there is no dedicated user interface for the feature. A parameter is enabled by default at system start. The ICD declares all three fields mandatory, including the description.[^icd]

**Key:** `GRP_NAME`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="grp_name"><td>1</td><td><code>GRP_NAME</code></td><td>Char(14)</td><td>M</td><td>Unique identification name of the monitoring group; referenced by GRPA_GNAME and GRPK_GNAME.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 2 of 2 rows; e.g. <code>GRPHK</code>, <code>GRPPAR</code></span> <span class="osi-pg">ICD PDF p. 108</span></div></td></tr>
<tr id="grp_descr"><td>2</td><td><code>GRP_DESCR</code></td><td>Char(24)</td><td>M</td><td>Textual description of the monitoring group (the ICD prints 'Textural'). Mandatory.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 2 of 2 rows; e.g. <code>Example for Parameters</code>, <code>Packet for HK monitoring</code></span> <span class="osi-pg">ICD PDF p. 108</span></div></td></tr>
<tr id="grp_gtype"><td>3</td><td><code>GRP_GTYPE</code></td><td>Char(2)</td><td>M</td><td>Type of the monitoring group, which decides whether its members are listed in grpa or grpk.<ul class="osi-vals"><li><code>PA</code> Parameters group (members in grpa)</li><li><code>PK</code> Packets group (members in grpk)</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 2 of 2 rows; e.g. <code>PA</code>, <code>PK</code></span> <span class="osi-pg">ICD PDF p. 108</span></div></td></tr>
</tbody></table></div>

## Relationships

- `GRP_NAME` → [grpa.GRPA_GNAME](grpa.md#grpa_gname): Members of parameter groups (GRP_GTYPE = 'PA').
- `GRP_NAME` → [grpk.GRPK_GNAME](grpk.md#grpk_gname): Members of packet groups (GRP_GTYPE = 'PK').

## History across ICD issues

Not present in ICD 5.1. Parameter groups, packet groups and group enable/inhibit were introduced in ICD 6.0 with the repatriation of Herschel/Planck CCS functions (ICD 7.0 Annex 1, p. 246-247). ICD 6.7 Draft A (p. 102), 6.9 (p. 106) and 7.0 (p. 108) give the same three mandatory fields. pyscos2000 (ICD 7.2) does not model grp, so no 7.2 comparison is possible from that source.

!!! note "Notes from the extraction"
    grp is not part of the pyscos2000 schema, so the Solar Orbiter SQLite table uses generic columns COL1..COL3, mapped here in ICD order to GRP_NAME, GRP_DESCR, GRP_GTYPE. Solar Orbiter 2025-09-16: 2 groups, 'GRPHK' ('Packet for HK monitoring', type PK) and 'GRPPAR' ('Example for Parameters', type PA). GRPPAR has no members because grpa.dat is empty, so both appear to be examples or templates rather than operational groups (inference). The 2020 release had a single group.

## In the Solar Orbiter MIB

The 2025-09-16 release has **2** rows in `grp.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.6.1, PDF p. 108.
