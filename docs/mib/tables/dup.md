---
title: "dup.dat: Packet duplication to secondary APIDs (inferred title)"
description: "Inferred from the data; not documented in any available ICD. Each record links one SCOS-2000 TM packet definition (column 1, a PID_SPID) to a second APID (column 2) in the range 1953-1996. These APIDs"
tags: [MIB, "Solar Orbiter mission-specific tables (not in the ICD)"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# dup.dat: Packet duplication to secondary APIDs (inferred title)

<div class="osi-chips"><span class="osi-chip warn">not defined in the ICD</span><span class="osi-chip">69 rows in Solar Orbiter 2025-09-16</span></div>

!!! warning "Inference"
    This table is not defined by the SCOS-2000 Database Import ICD. Its column meanings below were inferred from the data and are this wiki's interpretation.

Inferred from the data; not documented in any available ICD. Each record links one SCOS-2000 TM packet definition (column 1, a PID_SPID) to a second APID (column 2) in the range 1953-1996. These APIDs do not belong to on-board applications in this MIB: for each of the 41 distinct values the pid table holds many finer packet definitions with the same type/subtype, and the pic table holds a record keyed by that APID (PIC_APID) that places the second identification field PI2 (or PI1) deeper inside the packet. Example: SPID 14177 'On-board Parameters Value Report' (TM(139,3) from APID 163, no extra identification field) maps to APID 1953, where PIC defines a 32-bit PI1 at byte 17 and pid defines 20 specific reports (e.g. 'FSS Thresholds Value Report'). This suggests a ground mechanism that copies (duplicates) generic packets such as event reports (5,x), memory dumps (6,6), monitoring reports (12,9) or parameter reports under a ground-only APID, so that SCOS-2000 can identify and decommutate each variant with its own SPID and layout. The mechanism itself is not described in the available sources.

**Key:** `COL1`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="col1"><td>1</td><td><code>COL1</code></td><td>Number (up to 5 digits observed)</td><td>M</td><td>Inferred: SCOS-2000 packet ID (SPID) of the original packet definition. All 69 values (2025 release) exist in pid.PID_SPID and are unique. The referenced packets are mostly PUS event reports (5,1), (5,2), (5,3) (38 rows), memory dumps (6,6) (11), and mission-specific report types 12/9, 131/2, 131/128, 132/2, 139/3, 141/3 and 142/11.<div class="osi-extra">Refers to <a href="../pid/">pid.PID_SPID</a>. <span class="osi-fstat">Solar Orbiter: filled in 69 of 69 rows; e.g. <code>10095</code>, <code>10103</code>, <code>10153</code>, <code>10168</code>, <code>10169</code></span></div></td></tr>
<tr id="col2"><td>2</td><td><code>COL2</code></td><td>Number (4 digits observed, 1953-1996)</td><td>M</td><td>Inferred: the secondary (ground) APID under which the duplicated packet is identified again. 41 distinct values in 2025; several SPIDs can share one APID (e.g. 1961 for six memory-dump SPIDs). Every value has pid records (PID_APID) and pic records (PIC_APID) with the same type/subtype as the source packet but different PI1/PI2 offsets.<div class="osi-extra">Refers to <a href="../pid/">pid.PID_APID; pic.PIC_APID</a>. <span class="osi-fstat">Solar Orbiter: filled in 69 of 69 rows; e.g. <code>1995</code>, <code>1989</code>, <code>1975</code>, <code>1969</code>, <code>1960</code></span></div></td></tr>
</tbody></table></div>

## Relationships

- `COL1` → [pid.PID_SPID](pid.md#pid_spid): All 69 values match (inferred foreign key).
- `COL2` → [pic.PIC_APID](pic.md#pic_apid): All 41 APIDs have APID-specific PIC records defining the secondary identification fields (inferred).
- `COL2` → [pid.PID_APID](pid.md#pid_apid): All APIDs have packet definitions; APIDs 1950-1999 carry 2,421 pid records in 2025.

## History across ICD issues

Not part of any ICD issue (5.1, 6.7 Draft A, 6.9, 7.0) nor of the pyscos2000 (7.2) schema. 36 rows in MIB__20200416M10720PFMS001_SOL, 69 rows in MIB__20250916M25925PFMS001_SOL. Not present in the SWA instrument database.

!!! note "Notes from the extraction"
    Meanings inferred from joins against pid and pic (2025 release). The pic precedence rules of ICD 7.0 section 3.3.2.4.2 (type/subtype/APID first, then type/subtype; PDF p.91-92) explain how an APID-specific PIC record changes the identification of a packet; how and where the duplication is performed is not stated in the available sources. The name 'dup' presumably abbreviates 'duplicate' (inference).

## In the Solar Orbiter MIB

The 2025-09-16 release has **69** rows in `dup.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

