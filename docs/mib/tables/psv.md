---
title: "psv.dat: Parameter value sets"
description: "Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the r"
tags: [MIB, "Parameter sets"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# psv.dat: Parameter value sets

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.5.2</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the real-time environment to give a value to every contained parameter with one high-level mnemonic (ICD 7.0 §3.3.3.5, PDF p.200-201). The psv table declares the parameter value sets: one record per value set, giving its unique name, the parameter set (pst) it belongs to, and a description. The actual values for each member parameter are in pvs, keyed on the value-set name. Value-set names are the handles used elsewhere in the database. A command can name a default value set (CCF_DEFSET), as can a sequence (CSF_DEFSET), and a sequence element parameter can take its value from a value set (SDF_VTYPE = 'P' with SDF_VALSET). Because the key is the value-set name alone, value-set names must be unique across all parameter sets, not only within one set.[^icd]

**Key:** `PSV_PVSID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="psv_name"><td>1</td><td><code>PSV_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter set (PST_NAME) this value set belongs to. Mandatory but not part of the key.<div class="osi-extra">Refers to <a href="../pst/">pst.PST_NAME</a>. <span class="osi-pg">ICD PDF p. 201</span></div></td></tr>
<tr id="psv_pvsid"><td>2</td><td><code>PSV_PVSID</code></td><td>Char(8)</td><td>M</td><td>Unique name of the parameter value set; the table key. Referenced by pvs.PVS_ID, ccf.CCF_DEFSET, csf.CSF_DEFSET and sdf.SDF_VALSET.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 201</span></div></td></tr>
<tr id="psv_descr"><td>3</td><td><code>PSV_DESCR</code></td><td>Char(24)</td><td>O</td><td>Text description of the parameter value set.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 201</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PSV_NAME` → [pst.PST_NAME](pst.md#pst_name): Owning parameter set.
- `PSV_PVSID` → [pvs.PVS_ID](pvs.md#pvs_id): Values contained in the value set.
- `PSV_PVSID` → [ccf.CCF_DEFSET](ccf.md#ccf_defset): Default value set of a command (§3.3.3.2.1, PDF p.139).
- `PSV_PVSID` → [csf.CSF_DEFSET](csf.md#csf_defset): Default value set of a sequence (§3.3.3.3.1, PDF p.168).
- `PSV_PVSID` → [sdf.SDF_VALSET](sdf.md#sdf_valset): Value set providing a sequence element parameter value when SDF_VTYPE = 'P' (§3.3.3.3.3, PDF p.182, p.184).

## History across ICD issues

The parameter-set tables appear with the same section numbers (§3.3.3.5.x) in ICD 5.1 (icd-5-1-tos-gci PDF p.97-99), ICD 6.7 Draft A (icd-6-7-drafta PDF p.188-192), ICD 6.9 (icd-6-9-archive-org PDF p.193-197) and ICD 7.0 (PDF p.200-205). psv has the same three fields and the same key (PSV_PVSID only) in all four issues (ICD 5.1 PDF p.97; ICD 7.0 PDF p.201). pyscos2000 (ICD 7.2) models PSVTable as PSV_NAME (mandatory, not key), PSV_PVSID (key) and PSV_DESCR (optional), the same as ICD 7.0.

!!! note "Notes from the extraction"
    The Solar Orbiter database uses the pyscos2000 column names PSV_NAME, PSV_PVSID and PSV_DESCR, with no rows. The file is empty (0 bytes) in the 2025-09-16 and 2020-04-16 Solar Orbiter releases and in the SWA IDB. Consistently, CCF_DEFSET is empty in all 5454 ccf rows of the 2025 release and SDF_VALSET is empty in all sdf rows, so Solar Orbiter does not use parameter sets in its MIB. The HCSS MIB Clarification and Tailoring Note says the HCSS (Herschel) ingestion ignores PST, PSV, CPS and PVS (hcss-mib-clarification-tailoring-note, §5.2.11, PDF p.14), and the HPSDB note marks all five parameter-set tables 'not supported by CCS, do not use' (h-p-1-asp-tn-1060-mib-processing-hpsdb, §5.3.16-5.3.20, PDF p.39-40). No discrepancy between ICD 7.0 and pyscos2000 (7.2).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `psv.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.5.2, PDF p. 201.
