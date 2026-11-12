---
title: "ppf.dat: Printout proforma"
description: "The ppf table is meant to hold the list and format of telemetry printout proforma, the reports SCOS-2000 can print with selected monitoring parameter values: one record per proforma, giving its name, "
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# ppf.dat: Printout proforma

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.7</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

The ppf table is meant to hold the list and format of telemetry printout proforma, the reports SCOS-2000 can print with selected monitoring parameter values: one record per proforma, giving its name, a header printed on the top line of each page, and the number of parameters. The parameters themselves are listed in ppc. The ICD says ppf and ppc need not be imported into the run-time database and can be used as initialisation files read directly by the relevant application. It also notes that printout proforma can currently be defined only with the relevant SCOS-2000 editor: importing printout definitions as specified here would need extensions and changes to the underlying data structures. The table therefore documents an intended interface more than a supported import path.[^icd]

**Key:** `PPF_NUMBE`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="ppf_numbe"><td>1</td><td><code>PPF_NUMBE</code></td><td>Char(4)</td><td>M</td><td>Name of the printout proforma: alphanumeric string of up to 4 characters that uniquely identifies it. Referenced by ppc.PPC_NUMBE.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 124</span></div></td></tr>
<tr id="ppf_head"><td>2</td><td><code>PPF_HEAD</code></td><td>Char(32)</td><td>O</td><td>Header printed on the top line of each printed page.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 124</span></div></td></tr>
<tr id="ppf_nbpr"><td>3</td><td><code>PPF_NBPR</code></td><td>Number(2)</td><td>O</td><td>Number of parameters to be printed, integer 1 to 32. Must equal the number of ppc records for this printout. Not marked mandatory in the ICD.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 124</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PPF_NUMBE` → [ppc.PPC_NUMBE](ppc.md#ppc_numbe): One printout has PPF_NBPR ppc records.

## History across ICD issues

ICD 5.1 §3.3.2.6.7 (icd-5-1-tos-gci, PDF p.57-58) defines the same table, including the remark that import is not yet supported; the third field is printed 'PPF_NBPR0', apparently a typo. ICD 6.7 Draft A (icd-6-7-drafta PDF p.116-117), ICD 6.9 (icd-6-9-archive-org PDF p.120-121) and ICD 7.0 (PDF p.123-124) name it PPF_NBPR. No change to this table is recorded in the ICD 7.0 change annexes. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    ppf.dat is empty (0 bytes) in both Solar Orbiter releases and in the SWA IDB; the database has only a placeholder COL1. pyscos2000 has no ppf model. The HPSDB note (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.31) does not load ppf and requires it to be absent. Unlike the display tables, ppf/ppc are not listed in the Summary of Displays related data (ICD 7.0 Table 2, PDF p.28) or in the §3.2 summary (PDF p.32).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `ppf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.7, PDF p. 123.
