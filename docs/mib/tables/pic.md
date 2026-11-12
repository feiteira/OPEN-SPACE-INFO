---
title: "pic.dat: Packets identification criteria"
description: "pic tells the SCOS-2000 telemetry packetiser which additional identification fields (PI1, PI2) to read from an incoming TM packet to identify it uniquely, and where to find them. A record covers one P"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# pic.dat: Packets identification criteria

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.4.2</span><span class="osi-chip">256 rows in Solar Orbiter 2025-09-16</span></div>

pic tells the SCOS-2000 telemetry packetiser which additional identification fields (PI1, PI2) to read from an incoming TM packet to identify it uniquely, and where to find them. A record covers one PUS type/subtype combination, optionally limited to one APID, and gives the byte offset and bit width of each field. If no extra field is needed, both offsets are set to -1. Lookup precedence: a record matching type, subtype and APID is used first; otherwise a record matching type and subtype only (APID left blank); if neither exists, pid is searched with PI1 = PI2 = 0. The packetiser then searches pid with type/subtype/APID/PI1/PI2 to find the SPID and TPSD. The section 3.3.2.4 overview warns that this assumes all packets of one type/subtype carry their identification fields at the same position and with the same length, a constraint on the on-board design that PIC_APID (ICD 6.5) relaxes per APID. pic is loaded directly by the packetiser and is not imported into the run-time database.[^icd]

**Key:** `PIC_TYPE`, `PIC_STYPE`, `PIC_APID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="pic_type"><td>1</td><td><code>PIC_TYPE</code></td><td>Number(3)</td><td>M</td><td>PUS service type of the TM source packet, an integer from 0 to 255.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 256 of 256 rows; e.g. <code>5</code>, <code>13</code>, <code>233</code>, <code>12</code>, <code>142</code></span> <span class="osi-pg">ICD PDF p. 92</span></div></td></tr>
<tr id="pic_stype"><td>2</td><td><code>PIC_STYPE</code></td><td>Number(3)</td><td>M</td><td>PUS service subtype of the TM source packet, an integer from 0 to 255.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 256 of 256 rows; e.g. <code>3</code>, <code>2</code>, <code>1</code>, <code>6</code>, <code>4</code></span> <span class="osi-pg">ICD PDF p. 92</span></div></td></tr>
<tr id="pic_pi1_off"><td>3</td><td><code>PIC_PI1_OFF</code></td><td>Number(5)</td><td>M</td><td>Offset in bytes of the first additional identification field, counted from the start of the TM source packet (the start of the SCOS-2000 packet body). Set to -1 when no additional identification field is needed for this type/subtype combination.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 256 of 256 rows; e.g. <code>-1</code>, <code>16</code>, <code>18</code>, <code>19</code>, <code>17</code></span> <span class="osi-pg">ICD PDF p. 92</span></div></td></tr>
<tr id="pic_pi1_wid"><td>4</td><td><code>PIC_PI1_WID</code></td><td>Number(3)</td><td>M</td><td>Width of the first additional identification field in bits.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 256 of 256 rows; e.g. <code>0</code>, <code>16</code>, <code>8</code>, <code>32</code></span> <span class="osi-pg">ICD PDF p. 92</span></div></td></tr>
<tr id="pic_pi2_off"><td>5</td><td><code>PIC_PI2_OFF</code></td><td>Number(5)</td><td>M</td><td>Offset in bytes of the second additional identification field, if any, counted from the start of the TM source packet (start of the SCOS-2000 packet body). Set to -1 when the second field is not relevant.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 256 of 256 rows; e.g. <code>-1</code>, <code>18</code>, <code>17</code>, <code>19</code>, <code>114</code></span> <span class="osi-pg">ICD PDF p. 93</span></div></td></tr>
<tr id="pic_pi2_wid"><td>6</td><td><code>PIC_PI2_WID</code></td><td>Number(3)</td><td>M</td><td>Width of the second additional identification field in bits.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 256 of 256 rows; e.g. <code>0</code>, <code>8</code>, <code>32</code>, <code>16</code>, <code>40</code></span> <span class="osi-pg">ICD PDF p. 93</span></div></td></tr>
<tr id="pic_apid"><td>7</td><td><code>PIC_APID</code></td><td>Number(5)</td><td>O</td><td>APID of the TM source packet to which this record is restricted. If the field is omitted or blank, no APID is specified and the record applies to all APIDs of this type/subtype; the import default 99999 stands for 'any APID'. Part of the table key since ICD 7.0.<div class="osi-extra">Default <code>99999</code>. <span class="osi-fstat">Solar Orbiter: filled in 47 of 256 rows; e.g. <code>1954</code>, <code>1956</code>, <code>1957</code>, <code>1958</code>, <code>1974</code></span> <span class="osi-pg">ICD PDF p. 93</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PIC_TYPE, PIC_STYPE, PIC_APID` → [pid.PID_TYPE](pid.md#pid_type), [pid.PID_STYPE](pid.md#pid_stype), [pid.PID_APID](pid.md#pid_apid): The extracted PI1/PI2 values are matched against pid.PID_PI1_VAL and pid.PID_PI2_VAL.

## History across ICD issues

ICD 5.1 (p. 42-43) has six fields keyed on type and subtype; PIC_PI2_OFF and PIC_PI2_WID are not mandatory there, and the second offset is described as counted from the 'end' of the SCOS-2000 packet body. ICD 6.5 (R4.2) added the optional PIC_APID so that PI1/PI2 position and width can be defined for a specific APID/type/subtype (SPR-3071, DCR-4535; ICD 7.0 Annex 1, p. 255). ICD 6.7 corrected PIC_PI2_OFF to count from the start of the body and stated that PIC_APID cannot be a key because it may be null or omitted (S2K-DCR-5502 items 3 and 7, p. 258-259). ICD 6.7 Draft A (p. 86-87) and 6.9 (p. 90-91) show PIC_APID as field 7 without key mark or default. ICD 7.0 made PIC_APID part of the key (S2K-8528, applicable to SCOS-2000 4.2 or higher, p. 262) and prints the import default 99999 (p. 93). pyscos2000 (ICD 7.2) matches ICD 7.0: key PIC_TYPE + PIC_STYPE + PIC_APID, PIC_APID optional with default '99999'.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 256 records; 183 need no extra identification (PIC_PI1_OFF = -1 with width 0); PI1 is mostly at byte offset 16 (just after a 16-byte primary plus data field header), 8, 16 or 32 bits wide, and PI2 offsets reach byte 114. PIC_APID is filled in 47 records (41 distinct APIDs, e.g. TM(5,1) defined per APID 1974, 1975, 1985, 1991 with different PI2 widths); the others apply to all APIDs.

## In the Solar Orbiter MIB

The 2025-09-16 release has **256** rows in `pic.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.4.2, PDF p. 91.
