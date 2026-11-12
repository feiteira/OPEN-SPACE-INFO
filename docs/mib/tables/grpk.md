---
title: "grpk.dat: Telemetry packets groups"
description: "grpk lists the members of packet groups, one record per telemetry packet (identified by its SCOS-2000 Packet ID) included in a group declared in grp with GRP_GTYPE = 'PK'. A packet may belong to sever"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# grpk.dat: Telemetry packets groups

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.6.3</span><span class="osi-chip">4 rows in Solar Orbiter 2025-09-16</span></div>

grpk lists the members of packet groups, one record per telemetry packet (identified by its SCOS-2000 Packet ID) included in a group declared in grp with GRP_GTYPE = 'PK'. A packet may belong to several groups. Enabling or inhibiting the group enables or inhibits every member packet. An inhibited packet is still stored in the archive, but it is neither distributed nor used for parameter extraction. A parameter that is also carried in another, non-inhibited packet keeps being updated from that packet, and the telemetry query display highlights the inhibited packet in red (ICD 7.0 Annex 1, p. 246-247). Group enable/inhibit is simply the repetition of the packet operation over the group content; there is no special handling of packets that belong to several groups and no specific user interface.[^icd]

**Key:** `GRPK_GNAME`, `GRPK_PKSPID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="grpk_gname"><td>1</td><td><code>GRPK_GNAME</code></td><td>Char(14)</td><td>M</td><td>Name of the monitoring group to which the packet belongs (the ICD's wording says 'parameter', copied from grpa); must match GRP_NAME of a group with GRP_GTYPE = 'PK'.<div class="osi-extra">Refers to <a href="../grp/">grp.GRP_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 4 of 4 rows; e.g. <code>GRPHK</code></span> <span class="osi-pg">ICD PDF p. 109</span></div></td></tr>
<tr id="grpk_pkspid"><td>2</td><td><code>GRPK_PKSPID</code></td><td>Number(10)</td><td>M</td><td>SPID of the telemetry packet belonging to the group; unsigned integer matching PID_SPID.<div class="osi-extra">Refers to <a href="../pid/">pid.PID_SPID</a>. <span class="osi-fstat">Solar Orbiter: filled in 4 of 4 rows; e.g. <code>58200</code>, <code>58201</code>, <code>58202</code>, <code>58907</code></span> <span class="osi-pg">ICD PDF p. 110</span></div></td></tr>
</tbody></table></div>

## Relationships

- `GRPK_GNAME` → [grp.GRP_NAME](grp.md#grp_name): Group must have GRP_GTYPE = 'PK'.
- `GRPK_PKSPID` → [pid.PID_SPID](pid.md#pid_spid): Packet identified by SCOS-2000 Packet ID.

## History across ICD issues

Not present in ICD 5.1; introduced in ICD 6.0 together with grp and grpa (ICD 7.0 Annex 1, p. 247). ICD 6.7 Draft A (p. 103), 6.9 (p. 107) and 7.0 (p. 109-110) give the same two mandatory key fields. Not modelled by pyscos2000, so no ICD 7.2 comparison is available.

!!! note "Notes from the extraction"
    grpk is not in the pyscos2000 schema; the Solar Orbiter SQLite table uses generic columns COL1 and COL2, mapped here to GRPK_GNAME and GRPK_PKSPID. Solar Orbiter 2025-09-16: 4 records, all in group GRPHK ('Packet for HK monitoring'), SPIDs 58200, 58201, 58202 and 58907, all of which exist in pid. The ICD description of GRPK_GNAME says 'to which this parameter belongs', an editorial copy from grpa.

## In the Solar Orbiter MIB

The 2025-09-16 release has **4** rows in `grpk.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.6.3, PDF p. 109.
