---
title: "tcp.dat: Packet headers characteristics"
description: "The tcp table lists the telecommand packet header types known to the database, one record per header type. SCOS-2000 uses a packet header definition to build the first portion of every encoded TC pack"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# tcp.dat: Packet headers characteristics

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.1.1</span><span class="osi-chip">4 rows in Solar Orbiter 2025-09-16</span></div>

The tcp table lists the telecommand packet header types known to the database, one record per header type. SCOS-2000 uses a packet header definition to build the first portion of every encoded TC packet: the header is prefixed to the command application data, whose layout is defined separately through the CPC and CDF tables. Each command (CCF record) must name exactly one header through CCF_PKTID, while the same header can be shared by any number of commands. The header itself carries no layout information in this table: its elements (fixed areas and named header parameters such as APID, service type, subtype, acknowledgement flags, packet length and source sequence count) are described in PCDF, and the named header parameters in PCPC, so that TCP and PCPC are linked many-to-many through PCDF. Header parameter values cannot be edited by operators on a manual stack; the command source or command handler sets them (APID, type and subtype from the CCF record, packet length computed from the actual encoded length including repeated groups, sequence counter maintained by the multiplexer per APID). For special command types (CCF_CTYPE R, F, T or N) the PCDF/CDF entries describe a frame data field or throw-event content instead of a packet. The size of the header (sum of its PCDF_LEN values) reduces the room left for command parameters within the maximum command size.[^icd]

**Key:** `TCP_ID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="tcp_id"><td>1</td><td><code>TCP_ID</code></td><td>Char(8)</td><td>M</td><td>Unique identifier of the TC packet header definition. It is the value that commands quote in CCF_PKTID to select the header to be prepended when the command is encoded, and the value that PCDF records quote in PCDF_TCNAME to attach header elements to this header. Being the table key, a given name may appear only once; names are compared without regard to letter case and should not contain spaces (general rule of ICD section 3.3).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 4 of 4 rows; e.g. <code>HPC1_TC</code>, <code>NOM_TC</code>, <code>NOS2KHDR</code>, <code>NO_HDR</code></span> <span class="osi-pg">ICD PDF p. 128</span></div></td></tr>
<tr id="tcp_desc"><td>2</td><td><code>TCP_DESC</code></td><td>Char(24)</td><td>O</td><td>Free-text description of the packet header (up to 24 characters). It is informative only and has no effect on encoding.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 4 of 4 rows; e.g. <code>HPC_TC_Packet_Header</code>, <code>NIS Throw Events</code>, <code>NOM_DH_TC_Packet_Header</code>, <code>TCP Header for CF/CS</code></span> <span class="osi-pg">ICD PDF p. 128</span></div></td></tr>
</tbody></table></div>

## Relationships

- `TCP_ID` → [ccf.CCF_PKTID](ccf.md#ccf_pktid): One header is referenced by many commands; each command references exactly one header (ICD 7.0 section 3.3.3, PDF p.127-128).
- `TCP_ID` → [pcdf.PCDF_TCNAME](pcdf.md#pcdf_tcname): PCDF holds one record per element of the header (fixed areas and header parameters) with its bit offset and length.
- `TCP_ID` → [pcpc.PCPC_PNAME](pcpc.md#pcpc_pname) (via [pcdf.PCDF_PNAME](pcdf.md#pcdf_pname)): Many-to-many relationship between headers and header parameters, resolved by PCDF.

## History across ICD issues

The table is identical in all examined issues: two fields TCP_ID Char(8) mandatory key and TCP_DESC Char(24) optional, in ICD 5.1 (2001, section 3.3.3.1.1, PDF p.60), ICD 6.7 Draft A (2009, PDF p.121), ICD 6.9 (2010, PDF p.125) and ICD 7.0 (2017, PDF p.128). The pyscos2000 schema based on ICD 7.2 also has the same two columns (TCP_ID key and mandatory, TCP_DESC optional).

!!! note "Notes from the extraction"
    No discrepancy in field names, order or optionality between ICD 7.0, pyscos2000 (7.2) and the Solar Orbiter file (2 tab-separated columns in every line of tcp.dat). The 2025-09-16 Solar Orbiter MIB defines 4 headers (the 2020-04-16 release also has 4): NOM_TC (description 'NOM_DH_TC_Packet_Header', used by 5318 commands; 13 PCDF elements, i.e. 6-octet primary header plus a 4-octet data field header), HPC1_TC ('HPC_TC_Packet_Header', 125 commands; 7 PCDF elements, primary header only with data field header flag 0), NOS2KHDR ('NIS Throw Events', used by the 6 commands with CCF_CTYPE='N') and NO_HDR ('TCP Header for CF/CS', used by the 5 control frames and control segments with CCF_CTYPE 'F' or 'R'). NOS2KHDR and NO_HDR have no PCDF records, so for those commands all content comes from CDF (inference from the data: these special directives and throw events need no packet header, which is consistent with the ICD statement that their PCDF/CDF entries describe the frame data field or the throw-event fields rather than a packet).

## In the Solar Orbiter MIB

The 2025-09-16 release has **4** rows in `tcp.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.1.1, PDF p. 128.
