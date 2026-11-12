---
title: "psm.dat: Parameter sets mapping to commands/sequences"
description: "Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the r"
tags: [MIB, "Parameter sets"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# psm.dat: Parameter sets mapping to commands/sequences

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.5.5</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

Parameter sets are named collections of command or sequence parameters for which predefined combinations of values, called parameter value sets, can be stored in the database and then applied in the real-time environment to give a value to every contained parameter with one high-level mnemonic (ICD 7.0 §3.3.3.5, PDF p.200-201). The psm table is the mapping table that says which parameter sets are used by which commands or sequences: one record per (task, set) pair. It resolves the many-to-many relationship between commands or sequences and parameter sets described in the commanding data overview. One parameter set may be attached to several commands or to several sequences, but never to both a command and a sequence. The ICD explains that even when a command and a sequence have the same parameters with the same names, the PVS_BIT values (bit offset for a command, formal parameter position for a sequence) would necessarily differ when the value sets are built.[^icd]

**Key:** `PSM_NAME`, `PSM_TYPE`, `PSM_PARSET`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="psm_name"><td>1</td><td><code>PSM_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the task, a command (CCF_CNAME) or a sequence (CSF_NAME), to which the parameter set in PSM_PARSET is attached. Part of the key.<div class="osi-extra">Refers to <a href="../ccf/">ccf.CCF_CNAME / csf.CSF_NAME</a>. <span class="osi-pg">ICD PDF p. 205</span></div></td></tr>
<tr id="psm_type"><td>2</td><td><code>PSM_TYPE</code></td><td>Char(1)</td><td>M</td><td>Type of the task the parameter set is attached to. Part of the key.<ul class="osi-vals"><li><code>C</code> The task is a command</li><li><code>S</code> The task is a sequence</li></ul><div class="osi-extra"> <span class="osi-pg">ICD PDF p. 205</span></div></td></tr>
<tr id="psm_parset"><td>3</td><td><code>PSM_PARSET</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter set (PST_NAME) attached to this task. Part of the key.<div class="osi-extra">Refers to <a href="../pst/">pst.PST_NAME</a>. <span class="osi-pg">ICD PDF p. 205</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PSM_NAME` → [ccf.CCF_CNAME](ccf.md#ccf_cname) / [csf.CSF_NAME](csf.md#csf_name): Selected by PSM_TYPE ('C' or 'S').
- `PSM_PARSET` → [pst.PST_NAME](pst.md#pst_name): A set may not be attached to both a command and a sequence.

## History across ICD issues

The parameter-set tables appear with the same section numbers (§3.3.3.5.x) in ICD 5.1 (icd-5-1-tos-gci PDF p.97-99), ICD 6.7 Draft A (icd-6-7-drafta PDF p.188-192), ICD 6.9 (icd-6-9-archive-org PDF p.193-197) and ICD 7.0 (PDF p.200-205). psm is unchanged from ICD 5.1 (icd-5-1-tos-gci PDF p.99) to ICD 7.0 (PDF p.205): three key fields, all mandatory, with PSM_TYPE 'C'/'S'. Unlike cvp, PSM_TYPE allows sequences without a 'not supported' remark. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    The database stores only a placeholder COL1 (no rows), because the file is empty. The file is empty (0 bytes) in the 2025-09-16 and 2020-04-16 Solar Orbiter releases and in the SWA IDB. Consistently, CCF_DEFSET is empty in all 5454 ccf rows of the 2025 release and SDF_VALSET is empty in all sdf rows, so Solar Orbiter does not use parameter sets in its MIB. The HCSS MIB Clarification and Tailoring Note says the HCSS (Herschel) ingestion ignores PST, PSV, CPS and PVS (hcss-mib-clarification-tailoring-note, §5.2.11, PDF p.14), and the HPSDB note marks all five parameter-set tables 'not supported by CCS, do not use' (h-p-1-asp-tn-1060-mib-processing-hpsdb, §5.3.16-5.3.20, PDF p.39-40). pyscos2000 has no psm model. The HCSS note lists PST, PSV, CPS and PVS as ignored but does not mention PSM (hcss-mib-clarification-tailoring-note PDF p.14).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `psm.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.5.5, PDF p. 205.
