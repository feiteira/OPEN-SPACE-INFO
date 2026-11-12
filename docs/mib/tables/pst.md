---
title: "pst.dat: Parameter sets"
description: "Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the r"
tags: [MIB, "Parameter sets"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# pst.dat: Parameter sets

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.5.1</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the real-time environment to give a value to every contained parameter with one high-level mnemonic (ICD 7.0 §3.3.3.5, PDF p.200-201). The pst table declares the parameter sets themselves: one record per set, with a unique name and a description. A parameter set is a named collection of command or sequence parameters. Its named value combinations are declared in psv and filled in pvs, the optional list of member parameters is in cps (used only off-line), and psm says which commands or sequences use the set. A set can be shared by several commands or by several sequences, but not by both a command and a sequence. In the real-time environment a value set is applied by name to give values to all member parameters at once. Commands (CCF_DEFSET) and sequences (CSF_DEFSET) can name a default value set, and sequence elements can take a parameter value from a value set (SDF_VTYPE = 'P', SDF_VALSET).[^icd]

**Key:** `PST_NAME`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="pst_name"><td>1</td><td><code>PST_NAME</code></td><td>Char(8)</td><td>M</td><td>Unique name of the parameter set. Referenced by psv.PSV_NAME, cps.CPS_NAME, pvs.PVS_PSID and psm.PSM_PARSET.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 201</span></div></td></tr>
<tr id="pst_descr"><td>2</td><td><code>PST_DESCR</code></td><td>Char(24)</td><td>O</td><td>Text description of the parameter set.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 201</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PST_NAME` → [psv.PSV_NAME](psv.md#psv_name): Value sets belonging to the set.
- `PST_NAME` → [cps.CPS_NAME](cps.md#cps_name): Member parameters (off-line completeness checks only).
- `PST_NAME` → [pvs.PVS_PSID](pvs.md#pvs_psid): Values of the member parameters.
- `PST_NAME` → [psm.PSM_PARSET](psm.md#psm_parset): Many-to-many relationship between commands/sequences and parameter sets via psm (§3.3.3, PDF p.126-127).

## History across ICD issues

The parameter-set tables appear with the same section numbers (§3.3.3.5.x) in ICD 5.1 (icd-5-1-tos-gci PDF p.97-99), ICD 6.7 Draft A (icd-6-7-drafta PDF p.188-192), ICD 6.9 (icd-6-9-archive-org PDF p.193-197) and ICD 7.0 (PDF p.200-205). pst has the same two fields (PST_NAME Char(8) key and mandatory, PST_DESCR Char(24) optional) in all four issues (ICD 5.1 PDF p.97; ICD 7.0 PDF p.201). pyscos2000 (ICD 7.2) models it as PSTTable with PST_NAME (key, not optional) and PST_DESCR (optional), the same names, order and optionality as ICD 7.0.

!!! note "Notes from the extraction"
    The Solar Orbiter database uses the pyscos2000 column names PST_NAME and PST_DESCR, with no rows. The file is empty (0 bytes) in the 2025-09-16 and 2020-04-16 Solar Orbiter releases and in the SWA IDB. Consistently, CCF_DEFSET is empty in all 5454 ccf rows of the 2025 release and SDF_VALSET is empty in all sdf rows, so Solar Orbiter does not use parameter sets in its MIB. The HCSS MIB Clarification and Tailoring Note says the HCSS (Herschel) ingestion ignores PST, PSV, CPS and PVS (hcss-mib-clarification-tailoring-note, §5.2.11, PDF p.14), and the HPSDB note marks all five parameter-set tables 'not supported by CCS, do not use' (h-p-1-asp-tn-1060-mib-processing-hpsdb, §5.3.16-5.3.20, PDF p.39-40). No discrepancy between ICD 7.0 and pyscos2000 (7.2).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `pst.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.5.1, PDF p. 201.
