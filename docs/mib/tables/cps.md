---
title: "cps.dat: Parameter sets definition"
description: "Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the r"
tags: [MIB, "Parameter sets"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# cps.dat: Parameter sets definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.5.3</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the real-time environment to give a value to every contained parameter with one high-level mnemonic (ICD 7.0 §3.3.3.5, PDF p.200-201). The cps table can list explicitly the parameters contained in each parameter set: one record per member parameter, naming the set, the command parameter or sequence formal parameter, and the parameter's bit offset (commands) or position (sequences), which identifies it uniquely within the set. SCOS-2000 itself does not use this table, because parameter sets are defined by pst and populated through pvs. It is meant for the off-line database system, where it can be used to check that the associated parameter value sets are complete, that is, that every value set supplies the expected parameters.[^icd]

**Key:** `CPS_NAME`, `CPS_BIT`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="cps_name"><td>1</td><td><code>CPS_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of a parameter set (PST_NAME). Part of the key.<div class="osi-extra">Refers to <a href="../pst/">pst.PST_NAME</a>. <span class="osi-pg">ICD PDF p. 202</span></div></td></tr>
<tr id="cps_par"><td>2</td><td><code>CPS_PAR</code></td><td>Char(8)</td><td>M</td><td>Name of a command parameter (CDF_PNAME) or of a sequence formal parameter (CSP_FPNAME) that belongs to the set given in CPS_NAME.<div class="osi-extra">Refers to <a href="../cdf/">cdf.CDF_PNAME / csp.CSP_FPNAME</a>. <span class="osi-pg">ICD PDF p. 202</span></div></td></tr>
<tr id="cps_bit"><td>3</td><td><code>CPS_BIT</code></td><td>Number(4)</td><td>M</td><td>Unique identification of the parameter within the set: for command parameters, its bit offset in the command (CDF_BIT); for sequence parameters, its position (CSP_FPNUM). Part of the key.<div class="osi-extra">Refers to <a href="../cdf/">cdf.CDF_BIT / csp.CSP_FPNUM</a>. <span class="osi-pg">ICD PDF p. 202</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CPS_NAME` → [pst.PST_NAME](pst.md#pst_name): Owning parameter set.
- `CPS_PAR` → [cdf.CDF_PNAME](cdf.md#cdf_pname) / [csp.CSP_FPNAME](csp.md#csp_fpname): Member parameter; with CPS_BIT it identifies a specific occurrence.
- `CPS_BIT` → [cdf.CDF_BIT](cdf.md#cdf_bit) / [csp.CSP_FPNUM](csp.md#csp_fpnum): Same convention as pvs.PVS_BIT.

## History across ICD issues

The parameter-set tables appear with the same section numbers (§3.3.3.5.x) in ICD 5.1 (icd-5-1-tos-gci PDF p.97-99), ICD 6.7 Draft A (icd-6-7-drafta PDF p.188-192), ICD 6.9 (icd-6-9-archive-org PDF p.193-197) and ICD 7.0 (PDF p.200-205). In ICD 5.1 (icd-5-1-tos-gci PDF p.97-98) none of the three cps fields is marked mandatory, not even the key fields. ICD 6.7 Draft A (icd-6-7-drafta PDF p.189), ICD 6.9 (icd-6-9-archive-org PDF p.194) and ICD 7.0 (PDF p.202) mark all three 'M'. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    The database stores only a placeholder COL1 (no rows), because the file is empty. The file is empty (0 bytes) in the 2025-09-16 and 2020-04-16 Solar Orbiter releases and in the SWA IDB. Consistently, CCF_DEFSET is empty in all 5454 ccf rows of the 2025 release and SDF_VALSET is empty in all sdf rows, so Solar Orbiter does not use parameter sets in its MIB. The HCSS MIB Clarification and Tailoring Note says the HCSS (Herschel) ingestion ignores PST, PSV, CPS and PVS (hcss-mib-clarification-tailoring-note, §5.2.11, PDF p.14), and the HPSDB note marks all five parameter-set tables 'not supported by CCS, do not use' (h-p-1-asp-tn-1060-mib-processing-hpsdb, §5.3.16-5.3.20, PDF p.39-40). pyscos2000 has no cps model, consistent with the ICD statement that SCOS-2000 does not use the table.

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `cps.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.5.3, PDF p. 201.
