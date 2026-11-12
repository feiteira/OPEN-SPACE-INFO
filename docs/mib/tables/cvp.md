---
title: "cvp.dat: Verification profiles"
description: "The cvp table is the mapping table that gives each command its verification profile: which verification stages (cvs) apply to which task. There is one record per stage attached to a command or sequenc"
tags: [MIB, "Command verification"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# cvp.dat: Verification profiles

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.4.3</span><span class="osi-chip">10,697 rows in Solar Orbiter 2025-09-16</span></div>

The cvp table is the mapping table that gives each command its verification profile: which verification stages (cvs) apply to which task. There is one record per stage attached to a command or sequence, though current SCOS-2000 releases only support verification for commands. A command can have several stages, but at most one of each CVS_TYPE (for example only one acceptance stage). Since SCOS-2000 R4.0 a report-based stage can be disabled dynamically by clearing the corresponding acknowledgement flag when loading the command. This only disables a stage that cvs defines and cvp attaches to the command; it cannot add a new report-based stage at run time. Every command for which the receiving on-board application generates PUS service 1 reports must therefore be linked here to the matching stage. Together with cvs and cve, this table is the 'CEV' part of the commanding database (Table 3, PDF p.29).[^icd]

**Key:** `CVP_TASK`, `CVP_TYPE`, `CVP_CVSID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="cvp_task"><td>1</td><td><code>CVP_TASK</code></td><td>Char(8)</td><td>M</td><td>Name of the command (CCF_CNAME) or sequence (CSF_NAME) that uses the stage given in CVP_CVSID. Part of the key.<div class="osi-extra">Refers to <a href="../ccf/">ccf.CCF_CNAME / csf.CSF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 10,697 of 10,697 rows; e.g. <code>INSERTBU</code>, <code>INSERTTT</code>, <code>REIN_TTR</code>, <code>ZACX0001</code>, <code>ZAHG0000</code></span> <span class="osi-pg">ICD PDF p. 200</span></div></td></tr>
<tr id="cvp_type"><td>2</td><td><code>CVP_TYPE</code></td><td>Char(1)</td><td>O</td><td>Type of task the verification stage is attached to. Part of the key, but printed with the import default 'C' instead of 'M' in the Ma/Def column.<ul class="osi-vals"><li><code>C</code> The task is a command</li><li><code>S</code> The task is a sequence (not supported by SCOS-2000)</li></ul><div class="osi-extra">Default <code>C</code>. <span class="osi-fstat">Solar Orbiter: filled in 10,697 of 10,697 rows; e.g. <code>C</code></span> <span class="osi-pg">ICD PDF p. 200</span></div></td></tr>
<tr id="cvp_cvsid"><td>3</td><td><code>CVP_CVSID</code></td><td>Number(5)</td><td>M</td><td>Identifier (CVS_ID) of the stage attached to the task. At most one stage of a given type (for example CVS_TYPE = 'A' or 'C') may be attached to each command. Part of the key.<div class="osi-extra">Refers to <a href="../cvs/">cvs.CVS_ID</a>. <span class="osi-fstat">Solar Orbiter: filled in 10,697 of 10,697 rows; e.g. <code>11</code>, <code>17</code>, <code>9088</code>, <code>9000</code>, <code>9001</code></span> <span class="osi-pg">ICD PDF p. 200</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CVP_TASK` → [ccf.CCF_CNAME](ccf.md#ccf_cname) / [csf.CSF_NAME](csf.md#csf_name): In practice commands only (CVP_TYPE = 'C').
- `CVP_CVSID` → [cvs.CVS_ID](cvs.md#cvs_id): Many-to-many relationship between commands and stages (§3.3.3, PDF p.126).
- `CVP_TASK` → [ccf.CCF_ILSTAGE](ccf.md#ccf_ilstage) / [ccf.CCF_ACK](ccf.md#ccf_ack): The importer checks CCF_ILSTAGE against the stages attached here (PDF p.138). CCF_ACK flags can disable attached report-based stages at load time (PDF p.140, p.200).

## History across ICD issues

ICD 5.1 §3.3.3.4.3 (icd-5-1-tos-gci, PDF p.96-97) defines the same three key fields, with CVP_CVSID Number(5) and CVP_TYPE default 'C'. It says the first SCOS-2000 release supports only command verification and has no paragraph on dynamic disabling. That paragraph comes from the R4.0 change to the command ACK flags (ICD 6.0, Annex 1 PDF p.250) and is in ICD 6.7 Draft A (icd-6-7-drafta PDF p.187). ICD 6.2/6.3 record 'CVP_CVSID Field Type changed' (PDF p.253). ICD 6.7 Draft A prints CVP_CVSID as Number(10) (icd-6-7-drafta PDF p.187), and ICD 6.9 restored Number(5) to match CVS_ID (S2K-DCR-3909, PDF p.260; icd-6-9-archive-org PDF p.192). ICD 7.0 (PDF p.199-200) keeps Number(5). Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    Column mapping: COL1..COL3 = CVP_TASK, CVP_TYPE, CVP_CVSID; all 10697 lines of the 2025 cvp.dat have 3 fields (10277 rows in the 2020-04-16 release). All rows have CVP_TYPE = 'C'. There are 5393 distinct tasks: 5304 commands have two stages (one acceptance 'A/R' and one completion, either 'C/R' or 'C/V'), and 89 have a single completion stage. No command has two stages of the same CVS_TYPE, as ICD 7.0 requires, and every CVP_CVSID exists in cvs. The most used stages are 11 (2263 commands), 17 (2185), and 14001 and 14007 (1524 each). Discrepancy: two rows attach stages 14001/14007 to ZCSD2005, which is in neither ccf nor csf. ICD 7.0 §2.4 says the importer rejects records that break relational integrity, with a warning (PDF p.23). 62 of the 5454 ccf commands have no cvp entry. The key printed in ICD 7.0 is all three fields; CVP_TYPE carries a default rather than 'M', although §3.3 says key fields are marked mandatory (PDF p.36). pyscos2000 has no cvp model. The HPSDB note generates CVP from the command's verification list and forces CVP_TYPE to 'C' (h-p-1-asp-tn-1060-mib-processing-hpsdb PDF p.38-39).

## In the Solar Orbiter MIB

The 2025-09-16 release has **10,697** rows in `cvp.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.4.3, PDF p. 199.
