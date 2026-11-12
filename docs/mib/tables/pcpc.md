---
title: "pcpc.dat: Packet headers parameters"
description: "The pcpc table defines the named TC packet header parameters, one record per parameter. A header parameter is a header element whose value is not a constant fixed area but is filled in by SCOS-2000 at"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# pcpc.dat: Packet headers parameters

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.1.2</span><span class="osi-chip">7 rows in Solar Orbiter 2025-09-16</span></div>

The pcpc table defines the named TC packet header parameters, one record per parameter. A header parameter is a header element whose value is not a constant fixed area but is filled in by SCOS-2000 at encoding time, for example the APID, the PUS service type and subtype, the acknowledgement flags, the packet length or the packet sequence count. PCDF records of type A, T, S, K or P point to a PCPC record through PCDF_PNAME to give such an element a name, and the same header parameter can be used at different positions or in several packet headers (with the constraint stated under PCDF_LEN that every use of a given parameter must have the same length). The only behavioural attribute held here is PCPC_CODE, which states whether the default value written in PCDF_VALUE for this parameter is a signed or an unsigned integer, and therefore whether PCDF_RADIX applies. Operators cannot edit these values on a manual stack: they come from the CCF record of each command or are computed by the command subsystem (packet length, source sequence counter per APID).[^icd]

**Key:** `PCPC_PNAME`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="pcpc_pname"><td>1</td><td><code>PCPC_PNAME</code></td><td>Char(8)</td><td>M</td><td>Unique name of the packet header parameter. PCDF records of type A, T, S, K or P quote this name in PCDF_PNAME to identify which header parameter occupies a given position in a packet header.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 7 of 7 rows; e.g. <code>DFH_ACK</code>, <code>DFH_SRC</code>, <code>DFH_STPE</code>, <code>DFH_TYPE</code>, <code>PH_APID</code></span> <span class="osi-pg">ICD PDF p. 128</span></div></td></tr>
<tr id="pcpc_desc"><td>2</td><td><code>PCPC_DESC</code></td><td>Char(24)</td><td>M</td><td>Textual description of the header parameter (up to 24 characters). Mandatory in the ICD, although it is descriptive only.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 7 of 7 rows; e.g. <code>APID</code>, <code>Ack</code>, <code>Packet Length</code>, <code>Sequence Count</code>, <code>Service Subtype</code></span> <span class="osi-pg">ICD PDF p. 128</span></div></td></tr>
<tr id="pcpc_code"><td>3</td><td><code>PCPC_CODE</code></td><td>Char(1)</td><td>O</td><td>Format flag telling SCOS-2000 how the value given for this parameter in PCDF_VALUE is written: as a signed integer (then expressed in decimal) or as an unsigned integer (then expressed in the radix given by PCDF_RADIX). If left empty, unsigned is assumed.<ul class="osi-vals"><li><code>I</code> Signed integer: PCDF_VALUE is decimal and PCDF_RADIX is irrelevant.</li><li><code>U</code> Unsigned integer (import default): PCDF_VALUE is expressed in the radix given by PCDF_RADIX.</li></ul><div class="osi-extra">Default <code>U</code>. <span class="osi-fstat">Solar Orbiter: filled in 7 of 7 rows; e.g. <code>U</code></span> <span class="osi-pg">ICD PDF p. 129</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PCPC_PNAME` → [pcdf.PCDF_PNAME](pcdf.md#pcdf_pname): Each PCDF element of type A, T, S, K or P names a header parameter; one parameter may appear in several headers.

## History across ICD issues

Unchanged in structure in ICD 5.1 (section 3.3.3.1.2, PDF p.60-61), ICD 6.7 Draft A (PDF p.121), ICD 6.9 (PDF p.125-126) and ICD 7.0 (PDF p.128-129): PCPC_PNAME Char(8) key, PCPC_DESC Char(24) mandatory and PCPC_CODE Char(1) with import default 'U' and values I/U. pyscos2000 (ICD 7.2) has the same three columns, with PCPC_DESC mandatory and PCPC_CODE defaulting to 'U'.

!!! note "Notes from the extraction"
    No discrepancy in names, order or optionality between ICD 7.0, pyscos2000 (7.2) and the Solar Orbiter pcpc.dat (3 columns). Solar Orbiter 2025-09-16 defines 7 header parameters, all unsigned: PH_APID, PH_SSC, PH_LEN (primary header) and DFH_ACK, DFH_TYPE, DFH_STPE, DFH_SRC (data field header). DFH_SRC ('Source ID') is new compared with the 2020-04-16 release (6 records), where the source identifier was still a fixed area in PCDF.

## In the Solar Orbiter MIB

The 2025-09-16 release has **7** rows in `pcpc.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.1.2, PDF p. 128.
