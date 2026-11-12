---
title: "plf.dat: Parameters location in fixed packets"
description: "plf describes the layout of fixed-format telemetry packets: for each SCOS-2000 packet (SPID) it lists which monitoring parameters are extracted and where. Each record places one parameter in one packe"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# plf.dat: Parameters location in fixed packets

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.5.1</span><span class="osi-chip">400,792 rows in Solar Orbiter 2025-09-16</span></div>

plf describes the layout of fixed-format telemetry packets: for each SCOS-2000 packet (SPID) it lists which monitoring parameters are extracted and where. Each record places one parameter in one packet by byte offset and bit offset of its first occurrence; the length follows from the parameter's PTC/PFC. Super-commutated parameters, which appear several times in a packet, are described in the same single record by the number of occurrences, the bit distance between them and the time spacing used to time-stamp each sample. A parameter may appear in many packets. Overlapping entries (two parameters from the same bits) and gaps are allowed, but a parameter may have only one record per packet. Offsets count from the end of the SCOS-2000 TM header; with the SCOS-2000 packetiser this is the first byte of the source packet header, because the whole source packet is stored in the packet body. The standard monitoring displays (ANDs, GRDs, SCDs) and the telemetry model use plf to extract parameter values. Internally generated packets (constants packet, MISC packet, synthetic packets) also need plf entries.[^icd]

**Key:** `PLF_NAME`, `PLF_SPID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="plf_name"><td>1</td><td><code>PLF_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the monitoring parameter to be extracted; must match PCF_NAME.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>NCD05011</code>, <code>NIU00043</code>, <code>NIU00044</code>, <code>NIU00045</code>, <code>NIU00046</code></span> <span class="osi-pg">ICD PDF p. 97</span></div></td></tr>
<tr id="plf_spid"><td>2</td><td><code>PLF_SPID</code></td><td>Number(10)</td><td>M</td><td>SCOS-2000 Packet ID of the packet from which the parameter values are extracted; a positive integer matching PID_SPID.<div class="osi-extra">Refers to <a href="../pid/">pid.PID_SPID</a>. <span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>80028</code>, <code>33542</code>, <code>33543</code>, <code>50215</code>, <code>33508</code></span> <span class="osi-pg">ICD PDF p. 97</span></div></td></tr>
<tr id="plf_offby"><td>3</td><td><code>PLF_OFFBY</code></td><td>Number(5)</td><td>M</td><td>Byte offset of the first occurrence of the parameter, counted from the end of the SCOS-2000 TM header. With the SCOS-2000 telemetry packetiser this coincides with the start of the TM source packet header. Integer starting from 0 (negative values not allowed).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>16</code>, <code>18</code>, <code>22</code>, <code>20</code>, <code>26</code></span> <span class="osi-pg">ICD PDF p. 97</span></div></td></tr>
<tr id="plf_offbi"><td>4</td><td><code>PLF_OFFBI</code></td><td>Number(1)</td><td>M</td><td>Bit number, within the byte given by PLF_OFFBY, of the first bit of the first occurrence; bit 0 is the leftmost (most significant) bit of the byte. Integer from 0 to 7.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>0</code>, <code>4</code>, <code>6</code>, <code>2</code>, <code>1</code></span> <span class="osi-pg">ICD PDF p. 98</span></div></td></tr>
<tr id="plf_nbocc"><td>5</td><td><code>PLF_NBOCC</code></td><td>Number(4)</td><td>O</td><td>Number of occurrences of the parameter in the packet, from 1 to 9999. Use 1 for parameters that are not super-commutated.<div class="osi-extra">Default <code>1</code>. <span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>1</code>, <code>1024</code>, <code>8</code>, <code>16</code>, <code>100</code></span> <span class="osi-pg">ICD PDF p. 98</span></div></td></tr>
<tr id="plf_lgocc"><td>6</td><td><code>PLF_LGOCC</code></td><td>Number(5)</td><td>O</td><td>Distance in bits between the starts of two consecutive occurrences of a super-commutated parameter, from 0 to 32767. Irrelevant when PLF_NBOCC = 1.<div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>0</code>, <code>16</code>, <code>744</code>, <code>672</code>, <code>608</code></span> <span class="osi-pg">ICD PDF p. 98</span></div></td></tr>
<tr id="plf_time"><td>7</td><td><code>PLF_TIME</code></td><td>Number(9)</td><td>O</td><td>Time offset in milliseconds of the first occurrence relative to the packet time, used to adjust the time stamp of the extracted sample (for super-commutated and non-commutated parameters alike). Integer from -4080000 to 4080000. Together with PLF_TDOCC it is used by graphic displays to plot super-commutated samples and to show sample times on scrolling displays and printouts (Note 1, p. 98).<div class="osi-extra">Default <code>0</code>. <span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>0</code>, <code>-875</code>, <code>-1875</code>, <code>-12375</code>, <code>-4875</code></span> <span class="osi-pg">ICD PDF p. 98</span></div></td></tr>
<tr id="plf_tdocc"><td>8</td><td><code>PLF_TDOCC</code></td><td>Number(9)</td><td>O</td><td>Time delay in milliseconds between two consecutive occurrences of a super-commutated parameter, from 1 to 4080000. Irrelevant when PLF_NBOCC = 1. Since ICD 6.1 the default is 1 and 0 is not an allowed value.<div class="osi-extra">Default <code>1</code>. <span class="osi-fstat">Solar Orbiter: filled in 400,792 of 400,792 rows; e.g. <code>1</code>, <code>0</code>, <code>125</code></span> <span class="osi-pg">ICD PDF p. 98</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PLF_NAME` → [pcf.PCF_NAME](pcf.md#pcf_name): Many-to-many link between parameters and fixed packets (section 3.3.2, p. 39).
- `PLF_SPID` → [pid.PID_SPID](pid.md#pid_spid): Fixed packet structure identified by SPID.

## History across ICD issues

ICD 5.1 (p. 44-45) has the same eight fields, with PLF_TDOCC default '0'. ICD 6.0 added the ability to display super-commutated parameters in ANDs (DCR-2422, ICD 7.0 Annex 1, p. 246). ICD 6.1 corrected PLF_TDOCC: its default is 1, not 0, and 0 is not allowed (S2K-40-DCR-847, p. 251). Unchanged in ICD 6.7 Draft A (p. 91-93), 6.9 (p. 95-97) and 7.0 (p. 97-99). pyscos2000 (ICD 7.2) matches: key PLF_NAME + PLF_SPID, defaults NBOCC '1', LGOCC '0', TIME '0', TDOCC '1'.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 400,792 records placing 107,792 parameters in 9,056 packets. NCD05011 ('OBCHP_PTM_EID', the event identifier at byte 16) appears in 2,322 packets. 725 records are super-commutated (PLF_NBOCC from 8 to 2,046, most often 1,024), e.g. NCA3Z001 in SPID 29540 with 16 occurrences every 744 bits, PLF_TIME -1875 ms and PLF_TDOCC 125 ms. 487 non-super-commutated records give PLF_TDOCC = 0, a value the ICD has disallowed since issue 6.1; it is irrelevant for single occurrences. PLF_TIME is non-zero in 91 records (all negative). 239 records have PLF_OFFBY &lt; 16, mostly in internally generated packets (e.g. SPID 36997 'OBC_HPTM_packet', TM(0,0) APID 34, and SPIDs 66980-66982 'Good/Bad/Idle mini-transfer frame', TM(161,5/4/3) APID 1966) or header fields; saved synthetic parameters use offsets 0 and 13 in SPID 66838. One record (NYM0796V in SPID 66028 'LMS_MLG High Frequency') names a parameter missing from pcf; per ICD section 2.4 (p. 23) the importer would reject it for relational inconsistency. 15,067 raw (PCF_NATUR 'R') parameters have neither a plf nor a vpd entry (1,192 of them have a PCF_PID).

## In the Solar Orbiter MIB

The 2025-09-16 release has **400,792** rows in `plf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.5.1, PDF p. 97.
