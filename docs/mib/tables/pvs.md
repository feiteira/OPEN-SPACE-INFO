---
title: "pvs.dat: Parameter value sets definition"
description: "Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the r"
tags: [MIB, "Parameter sets"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# pvs.dat: Parameter value sets definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.5.4</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the real-time environment to give a value to every contained parameter with one high-level mnemonic (ICD 7.0 §3.3.3.5, PDF p.200-201). The pvs table holds the contents of the parameter value sets: one record per value in a value set, giving the value-set name (psv), its parameter set (pst), the command or sequence parameter concerned, the parameter's bit offset or position, the representation (raw or engineering) and the value itself. When an operator applies a value set, each listed parameter takes the given value. A record whose value is left empty leaves that parameter's current value unchanged. Because one name can denote a command parameter and a sequence parameter, the ICD requires parameters that share a name and are used in parameter sets to have the same raw and engineering formats (same PTC and display format).[^icd]

**Key:** `PVS_ID`, `PVS_BIT`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="pvs_id"><td>1</td><td><code>PVS_ID</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter value set (PSV_PVSID) this record belongs to. Part of the key.<div class="osi-extra">Refers to <a href="../psv/">psv.PSV_PVSID</a>. <span class="osi-pg">ICD PDF p. 202</span></div></td></tr>
<tr id="pvs_psid"><td>2</td><td><code>PVS_PSID</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter set (PST_NAME) the value set belongs to.<div class="osi-extra">Refers to <a href="../pst/">pst.PST_NAME</a>. <span class="osi-pg">ICD PDF p. 202</span></div></td></tr>
<tr id="pvs_pname"><td>3</td><td><code>PVS_PNAME</code></td><td>Char(8)</td><td>M</td><td>Name of the command parameter (CDF_PNAME) or sequence parameter (CSP_FPNAME) whose value is given in PVS_VALS. If two sequence parameters, or a command parameter and a sequence parameter, have the same name and are used in parameter sets, they must have the same raw and engineering formats: the same CPC_PTC/CSP_PTC and the same CPC_DISPFMT/CSP_DISPFMT.<div class="osi-extra">Refers to <a href="../cdf/">cdf.CDF_PNAME / csp.CSP_FPNAME</a>. <span class="osi-pg">ICD PDF p. 203</span></div></td></tr>
<tr id="pvs_inter"><td>4</td><td><code>PVS_INTER</code></td><td>Char(1)</td><td>O</td><td>Representation of the value in PVS_VALS.<ul class="osi-vals"><li><code>R</code> Raw representation</li><li><code>E</code> Engineering representation; only for parameters associated with a calibration definition (CPC_CATEG/CSP_CATEG = 'T' or 'C')</li></ul><div class="osi-extra">Default <code>R</code>. <span class="osi-pg">ICD PDF p. 203</span></div></td></tr>
<tr id="pvs_vals"><td>5</td><td><code>PVS_VALS</code></td><td>Char</td><td>O</td><td>Value for the parameter named in PVS_PNAME, in raw form unless PVS_INTER = 'E'. Raw values follow the parameter type (CPC_PTC/CSP_PTC) and, for unsigned integers, the radix (CPC_RADIX/CSP_RADIX). Engineering values follow the engineering representation (CPC_DISPFMT/CSP_DISPFMT). No fixed size: the maximum length depends on the maximum allowed command size (§3.3.3.2). May be left Null, in which case applying the value set does not change this parameter's current value.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 204</span></div></td></tr>
<tr id="pvs_bit"><td>6</td><td><code>PVS_BIT</code></td><td>Number(4)</td><td>M</td><td>Unique identification of the parameter within the set: bit offset in the command (CDF_BIT) for command parameters, position (CSP_FPNUM) for sequence parameters. Part of the key.<div class="osi-extra">Refers to <a href="../cdf/">cdf.CDF_BIT / csp.CSP_FPNUM</a>. <span class="osi-pg">ICD PDF p. 204</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PVS_ID` → [psv.PSV_PVSID](psv.md#psv_pvsid): Owning value set.
- `PVS_PSID` → [pst.PST_NAME](pst.md#pst_name): Owning parameter set.
- `PVS_PNAME` → [cdf.CDF_PNAME](cdf.md#cdf_pname) / [csp.CSP_FPNAME](csp.md#csp_fpname): Formats constrained by cpc/csp (PTC, RADIX, DISPFMT, CATEG).
- `PVS_BIT` → [cdf.CDF_BIT](cdf.md#cdf_bit) / [csp.CSP_FPNUM](csp.md#csp_fpnum): Occurrence identifier.
- `PVS_ID` → [sdf.SDF_VALSET](sdf.md#sdf_valset): ICD 7.0 describes a 1-to-1 relationship between an sdf entry and a parameter value set (§3.3.3, PDF p.127).

## History across ICD issues

The parameter-set tables appear with the same section numbers (§3.3.3.5.x) in ICD 5.1 (icd-5-1-tos-gci PDF p.97-99), ICD 6.7 Draft A (icd-6-7-drafta PDF p.188-192), ICD 6.9 (icd-6-9-archive-org PDF p.193-197) and ICD 7.0 (PDF p.200-205). ICD 5.1 (icd-5-1-tos-gci PDF p.98-99) has the same 6 fields, with PVS_VALS Char(17) and PVS_INTER 'E' worded as 'associated to a calibration curve'. ICD 6.2/6.3 updated the PVS_INTER description (ICD 7.0 Annex 1, PDF p.253). ICD 6.7 Draft A (icd-6-7-drafta PDF p.191) and ICD 6.9 (icd-6-9-archive-org PDF p.196) still print PVS_VALS as Char(17). ICD 7.0 (S2K-8073, for SCOS 5.5.3 and 6.0.0 or later) replaced the fixed size with the maximum command parameter size, for PVS_VALS and other value fields (Annex 2, PDF p.261), giving 'Char' with no length (PDF p.204). Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    The database stores only a placeholder COL1 (no rows), because the file is empty. The file is empty (0 bytes) in the 2025-09-16 and 2020-04-16 Solar Orbiter releases and in the SWA IDB. Consistently, CCF_DEFSET is empty in all 5454 ccf rows of the 2025 release and SDF_VALSET is empty in all sdf rows, so Solar Orbiter does not use parameter sets in its MIB. The HCSS MIB Clarification and Tailoring Note says the HCSS (Herschel) ingestion ignores PST, PSV, CPS and PVS (hcss-mib-clarification-tailoring-note, §5.2.11, PDF p.14), and the HPSDB note marks all five parameter-set tables 'not supported by CCS, do not use' (h-p-1-asp-tn-1060-mib-processing-hpsdb, §5.3.16-5.3.20, PDF p.39-40). pyscos2000 has no pvs model. Observation by this wiki: PVS_PSID repeats information that can be derived from PVS_ID through psv.PSV_NAME, and the ICD does not say what happens if the two disagree.

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `pvs.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.5.4, PDF p. 202.
