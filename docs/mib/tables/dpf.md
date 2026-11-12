---
title: "dpf.dat: Alphanumeric displays"
description: "The dpf table lists the Alphanumeric Displays (ANDs) of the SCOS-2000 monitoring system, one record per display proforma. An AND is a tabular page of telemetry values: either a 32-parameter display th"
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# dpf.dat: Alphanumeric displays

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.1</span><span class="osi-chip">33 rows in Solar Orbiter 2025-09-16</span></div>

The dpf table lists the Alphanumeric Displays (ANDs) of the SCOS-2000 monitoring system, one record per display proforma. An AND is a tabular page of telemetry values: either a 32-parameter display that also shows information about the packet which carried the most recently displayed sample, or a 64-parameter display. dpf only gives the identity, layout type and header line of each display; the parameters shown and their positions are listed in the companion table dpc, keyed on the same display name. Only monitoring parameters processed by the telemetry model (parameters located in fixed packets through plf, or synthetic parameters of any type) can appear on ANDs; values extracted from variable packets can only be shown with the VPD application. ICD section 3.1 adds that dpf/dpc do not define the TM query display or the detailed out-of-limits display. From SCOS-2000 R5.0 the definitions are converted into XML files in the FARC instead of being imported into the run-time database; the ASCII format remains supported for backward compatibility and is imported in a delta fashion, so existing displays, including ones built at run time with the TM Desktop display editor, are kept.[^icd]

**Key:** `DPF_NUMBE`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="dpf_numbe"><td>1</td><td><code>DPF_NUMBE</code></td><td>Char(8)</td><td>M</td><td>Name of the Alphanumeric Display (AND): an alphanumeric string that uniquely identifies the display. It is the table key and is referenced by every dpc record (DPC_NUMBE) that places a parameter or a comment on this display.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 33 of 33 rows; e.g. <code>DICA0000</code>, <code>DICA0100</code>, <code>DICA0200</code>, <code>DICA0300</code>, <code>DICA0400</code></span> <span class="osi-pg">ICD PDF p. 111</span></div></td></tr>
<tr id="dpf_type"><td>2</td><td><code>DPF_TYPE</code></td><td>Char(1)</td><td>M</td><td>Layout type of the alphanumeric display. Two values are defined: a 32-parameter display that also shows information about the packet containing the last displayed parameter sample, or a 64-parameter display. No other code (for example '2') is defined in ICD 7.0.<ul class="osi-vals"><li><code>1</code> 32-parameter display, with information about the packet that contained the last displayed parameter sample</li><li><code>3</code> 64-parameter display</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 33 of 33 rows; e.g. <code>3</code>, <code>1</code></span> <span class="osi-pg">ICD PDF p. 111</span></div></td></tr>
<tr id="dpf_head"><td>3</td><td><code>DPF_HEAD</code></td><td>Char(32)</td><td>O</td><td>Alphanumeric header text shown on the top line of the display. Optional; no import default is given.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 33 of 33 rows; e.g. <code>SEB/DPM Params</code>, <code>SDM Params</code>, <code>Detector Assembly Params</code>, <code>Slit Change Mechanism Params</code>, <code>Scan Stage Params</code></span> <span class="osi-pg">ICD PDF p. 111</span></div></td></tr>
</tbody></table></div>

## Relationships

- `DPF_NUMBE` → [dpc.DPC_NUMBE](dpc.md#dpc_numbe): One AND has many dpc records (one per displayed parameter or free-text entry). ICD 7.0 §3.3.2.7.2, PDF p.111.
- `DPF_NUMBE` → [pcf.PCF_NAME](pcf.md#pcf_name) (through [dpc.DPC_NAME](dpc.md#dpc_name)): Many-to-many relationship between monitoring parameters and monitoring displays; the content of displays is defined in dpc, gpc and spc. ICD 7.0 §3.3.2, PDF p.39.

## History across ICD issues

ICD 5.1 §3.3.2.6.1 (icd-5-1-tos-gci, PDF p.50-51) defines the same three fields with the same types, keys and values. The table moved to §3.3.2.7.1 when monitoring groups were inserted as §3.3.2.6 (ICD 6.7 Draft A, icd-6-7-drafta PDF p.104; ICD 6.9, icd-6-9-archive-org PDF p.108; ICD 7.0 PDF p.110-111). Since SCOS-2000 R5.0 (ICD issue 6.4) display definitions are no longer kept in the run-time (POST) MIB database: the ASCII tables are converted on request into XML files stored in the FARC, in a delta fashion that keeps previously imported displays and displays created at run time with the TM Desktop editor (ICD 7.0 §2.5, PDF p.24; §3.3.2.7, PDF p.110; Annex 1, PDF p.254). The XML format is in [AD-5], SCOS-2000 TM Displays and Printout definitions Service ICD (ICD-5001), which is not in the library. The table is not modelled in pyscos2000 (ICD 7.2-based schema), so the 7.2 definition could not be compared.

!!! note "Notes from the extraction"
    Column mapping: the Solar Orbiter database stores this table as COL1..COL3, mapped here to DPF_NUMBE, DPF_TYPE, DPF_HEAD; every line of dpf.dat in MIB__20250916M25925PFMS001_SOL has exactly 3 tab-separated fields, matching ICD 7.0. Content: 33 ANDs (unchanged from the 2020-04-16 release), 28 of type '1' and 5 of type '3'. Thirty-one are named DICA* and show only NIC* parameters (608 dpc rows), with headers such as 'SPICE Temperatures' and 'SPICE Instrument Params'. DIPA0001 'Status Overview' shows 17 NIP* parameters whose PCF descriptions all start with 'PHI_'. DQQA1234 ('This is a test') is a one-entry test display that also appears, identically, in the SWA instrument database. pyscos2000 has no dpf model, so no 7.2 cross-check is possible. The H-P-1-ASP-TN-1060 note (Herschel/Planck HPSDB) copies all three fields unchanged (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.28).

## In the Solar Orbiter MIB

The 2025-09-16 release has **33** rows in `dpf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.1, PDF p. 110.
