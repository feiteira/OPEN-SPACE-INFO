---
title: "tpcf.dat: Telemetry packets characteristics"
description: "tpcf stores attributes that belong to a SCOS-2000 TM packet as a whole, i.e. to everything filed under one SCOS-2000 Packet ID (SPID), with at most one record per SPID. The main attribute is the packe"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# tpcf.dat: Telemetry packets characteristics

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.4.3</span><span class="osi-chip">11,150 rows in Solar Orbiter 2025-09-16</span></div>

tpcf stores attributes that belong to a SCOS-2000 TM packet as a whole, i.e. to everything filed under one SCOS-2000 Packet ID (SPID), with at most one record per SPID. The main attribute is the packet mnemonic, a short readable name that monitoring displays show as the source packet of parameter values. Without a mnemonic the displays show 'None'. The table also has an optional packet size. SCOS-2000 neither imports nor uses it, but missions may use it to generate archive (history file) configuration that needs the complete packet list. The ICD recommends a size of 0 for truly variable packets and the exact SCOS-2000 packet size for fixed packets: the SCOS-2000 TM packet header (64 bytes for header versions 0 to 3, 76 bytes for version 4) plus the full source packet length. A size larger than the real packet wastes disk space; a smaller one (but above 64 bytes) slows filing. A tpcf entry is also needed for internally generated packets so that displays show their mnemonic.[^icd]

**Key:** `TPCF_SPID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="tpcf_spid"><td>1</td><td><code>TPCF_SPID</code></td><td>Number(10)</td><td>M</td><td>SCOS-2000 Telemetry Packet Number (SCOS-2000 Packet ID); unsigned integer that must match PID_SPID of the packet.<div class="osi-extra">Refers to <a href="../pid/">pid.PID_SPID</a>. <span class="osi-fstat">Solar Orbiter: filled in 11,150 of 11,150 rows; e.g. <code>10000</code>, <code>1000002</code>, <code>1000003</code>, <code>1000006</code>, <code>10001</code></span> <span class="osi-pg">ICD PDF p. 93</span></div></td></tr>
<tr id="tpcf_name"><td>2</td><td><code>TPCF_NAME</code></td><td>Char(12)</td><td>O</td><td>Alphanumeric mnemonic of the telemetry packet, shown in the monitoring displays to identify the source packet of parameter values. If none is given, displays show the string 'None'.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 11,150 of 11,150 rows; e.g. <code>BAD_PKT</code>, <code>CTFBAD</code>, <code>CTFGOOD</code>, <code>CTFIDLE</code>, <code>DYNUDCS</code></span> <span class="osi-pg">ICD PDF p. 94</span></div></td></tr>
<tr id="tpcf_size"><td>3</td><td><code>TPCF_SIZE</code></td><td>Number(8)</td><td>O</td><td>Total length of the SCOS-2000 telemetry packet in bytes. Not imported into the run-time database and not used by any SCOS-2000 process (grey row); provided for mission-specific tools that generate history-file configuration. Recommended values: 0 for truly variable packets; for fixed packets the exact SCOS-2000 packet size, i.e. the SCOS-2000 TM header (64 bytes for header versions 0-3, 76 bytes for version 4) plus the whole source packet. Too large a value wastes disk space; too small a value (but above the 64-byte header) is filed correctly but more slowly, so the size matters most for frequent packets such as periodic housekeeping and verification reports. The description continues on PDF p. 96.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 11,150 of 11,150 rows; e.g. <code>0</code>, <code>42</code>, <code>18</code>, <code>26</code>, <code>22</code></span> <span class="osi-pg">ICD PDF p. 95</span></div></td></tr>
</tbody></table></div>

## Relationships

- `TPCF_SPID` → [pid.PID_SPID](pid.md#pid_spid): At most one tpcf record per SPID.

## History across ICD issues

ICD 5.1 (p. 43-44) has the same three fields. ICD 6.1 changed the TPCF_SIZE description to say that the SCOS-2000 header length depends on the header version (ICD 7.0 Annex 1, p. 251), and ICD 6.5 split the long description over two pages (p. 256). Unchanged in ICD 6.7 Draft A (p. 87-89), 6.9 (p. 91-93) and 7.0 (p. 93-96). pyscos2000 (ICD 7.2) matches: TPCF_SPID mandatory key, TPCF_NAME and TPCF_SIZE optional.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 11,150 records, one per pid SPID (every TPCF_SPID exists in pid and vice versa by count). All mnemonics are filled and unique, up to the full 12 characters (e.g. BAD_PKT, CTFGOOD, DYNUDCS). TPCF_SIZE is 0 for all 2,063 variable (TPSD) packets and for 262 fixed packets; the other 8,825 have sizes from 6 to 4,136 bytes. Most of these are smaller than the 64-byte SCOS-2000 header (7,487 of them are 64 bytes or less) and match the source packet length (e.g. SPID 10002 'YCSV84C0' has size 32 with its last plf parameter at byte 31). Inference: Solar Orbiter fills TPCF_SIZE with the source packet length, not with the header-inclusive SCOS-2000 size the ICD recommends; this is harmless because SCOS-2000 does not use the field.

## In the Solar Orbiter MIB

The 2025-09-16 release has **11,150** rows in `tpcf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.4.3, PDF p. 93.
