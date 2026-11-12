---
title: "sw_para.dat: Software names of SWA database items (inferred title)"
description: "Inferred from the data; not documented in any available ICD. Found only in the Solar Wind Analyser (SWA) instrument database delivered as ASCII files. It has the same three-column shape as the spacecr"
tags: [MIB, "Solar Orbiter mission-specific tables (not in the ICD)"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# sw_para.dat: Software names of SWA database items (inferred title)

<div class="osi-chips"><span class="osi-chip warn">not defined in the ICD</span><span class="osi-chip">2,841 rows in Solar Orbiter 2025-09-16</span></div>

!!! warning "Inference"
    This table is not defined by the SCOS-2000 Database Import ICD. Its column meanings below were inferred from the data and are this wiki's interpretation.

Inferred from the data; not documented in any available ICD. Found only in the Solar Wind Analyser (SWA) instrument database delivered as ASCII files. It has the same three-column shape as the spacecraft MIB's ASW_sw_para.dat: column 1 is an item name of the SWA database (1,758 monitoring parameters, 428 command parameters and 184 commands match pcf, cpc and ccf), column 2 is always empty, and column 3 holds either a software or display name (e.g. SID, vBM_EAS1, HV_MCP_V_MON, or 'SWA_TC_SYS_CFG_REQ: SWA TC report configuration parameters' for commands) or the placeholder 'a' (2,463 of 2,841 rows). It is presumably the instrument team's contribution to the spacecraft-level ASW_sw_para file, delivered before the software names were filled in (inference). SCOS-2000 does not use it.

**Key:** `COL1`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="col1"><td>1</td><td><code>COL1</code></td><td>Char(8) observed</td><td>M</td><td>Inferred: SWA database item name (unique). Matches pcf.PCF_NAME (1,758), cpc.CPC_PNAME (428) and ccf.CCF_CNAME (184) of the SWA database; the rest match none.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME | cpc.CPC_PNAME | ccf.CCF_CNAME (inferred)</a>. <span class="osi-fstat">Solar Orbiter: filled in 2,841 of 2,841 rows; e.g. <code>NIA00102</code>, <code>NIA00103</code>, <code>NIA00104</code>, <code>NIA00105</code>, <code>NIA00106</code></span></div></td></tr>
<tr id="col2"><td>2</td><td><code>COL2</code></td><td>Char (always empty)</td><td>O</td><td>Inferred: software name column, empty in all rows (by analogy with ASW_sw_para COL2).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 0 of 2,841 rows</span></div></td></tr>
<tr id="col3"><td>3</td><td><code>COL3</code></td><td>Char (max 85 observed)</td><td>M</td><td>Inferred: software/display name or description; 'a' is a placeholder in 2,463 rows; five rows hold 'x'.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 2,841 of 2,841 rows; e.g. <code>a</code>, <code>SID</code>, <code>SID_CNT</code>, <code>vBM_EAS1</code>, <code>avVBM_EAS1</code></span></div></td></tr>
</tbody></table></div>

## Relationships

- `COL1` → [pcf.PCF_NAME](pcf.md#pcf_name) / [cpc.CPC_PNAME](cpc.md#cpc_pname) / [ccf.CCF_CNAME](ccf.md#ccf_cname): Inferred from name matches in the SWA database.
- `(table)` → asw_sw_para: Same structure as the spacecraft MIB table (inferred).

## History across ICD issues

Not part of any ICD issue nor of pyscos2000. SWA database only (file dated 2021-12-03, 2,841 rows).

!!! note "Notes from the extraction"
    All meanings inferred. The solo_stats block here describes the SWA instrument database (swa-idb.sqlite), not the spacecraft MIB.

## In the Solar Orbiter MIB

The 2025-09-16 release has **2,841** rows in `sw_para.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

