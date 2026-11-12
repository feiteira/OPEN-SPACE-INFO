---
title: "ppc.dat: Printout proforma definition"
description: "The ppc table lists the monitoring parameters printed in each telemetry printout proforma declared in ppf: one record per parameter in the printout, with its position and the number format used to pri"
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# ppc.dat: Printout proforma definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.8</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

The ppc table lists the monitoring parameters printed in each telemetry printout proforma declared in ppf: one record per parameter in the printout, with its position and the number format used to print its value (binary, octal, decimal, hexadecimal or the normal engineering/raw form). The number of records per printout must equal PPF_NBPR. As for ppf, the ICD says these files need not be imported into the run-time database and can serve as initialisation files read directly by the printing application, and that printout proforma can currently be defined only with the SCOS-2000 editor. Importing them as specified would need extensions to the underlying data structures, so the table mainly documents the intended structure of a printout definition.[^icd]

**Key:** `PPC_NUMBE`, `PPC_POS`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="ppc_numbe"><td>1</td><td><code>PPC_NUMBE</code></td><td>Char(4)</td><td>M</td><td>Name of the printout proforma; must match PPF_NUMBE of the corresponding printout. Part of the key.<div class="osi-extra">Refers to <a href="../ppf/">ppf.PPF_NUMBE</a>. <span class="osi-pg">ICD PDF p. 124</span></div></td></tr>
<tr id="ppc_pos"><td>2</td><td><code>PPC_POS</code></td><td>Number(2)</td><td>M</td><td>Position of the parameter in the printout. Part of the key.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 125</span></div></td></tr>
<tr id="ppc_name"><td>3</td><td><code>PPC_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the monitoring parameter (PCF_NAME) printed in the printout.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-pg">ICD PDF p. 125</span></div></td></tr>
<tr id="ppc_form"><td>4</td><td><code>PPC_FORM</code></td><td>Char(1)</td><td>O</td><td>Format used to print the parameter values. B, O and H apply only to raw values of unsigned integer parameters; N prints the engineering value for calibrated parameters, otherwise raw decimal.<ul class="osi-vals"><li><code>B</code> Binary; only applicable to raw values of unsigned integer parameters</li><li><code>O</code> Octal; only applicable to raw values of unsigned integer parameters</li><li><code>D</code> Decimal</li><li><code>H</code> Hexadecimal; only applicable to raw values of unsigned integer parameters</li><li><code>N</code> Normal: the engineering value is shown for parameters associated with one or more calibration definitions, otherwise the raw value in decimal</li></ul><div class="osi-extra">Default <code>N</code>. <span class="osi-pg">ICD PDF p. 125</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PPC_NUMBE` → [ppf.PPF_NUMBE](ppf.md#ppf_numbe): Record count must equal PPF_NBPR.
- `PPC_NAME` → [pcf.PCF_NAME](pcf.md#pcf_name): Monitoring parameter printed.

## History across ICD issues

Unchanged in field names, types and keys from ICD 5.1 §3.3.2.6.8 (icd-5-1-tos-gci, PDF p.58) through ICD 6.7 Draft A (icd-6-7-drafta PDF p.117-118), ICD 6.9 (icd-6-9-archive-org PDF p.121-122) and ICD 7.0 §3.3.2.7.8 (PDF p.124-125). The only wording change is that the 'N' format refers to 'one or more calibration definitions' instead of 'a calibration curve', following the ICD 6.0 introduction of multiple calibrations per parameter. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    ppc.dat is empty (0 bytes) in both Solar Orbiter releases and in the SWA IDB; the database has only a placeholder COL1. pyscos2000 has no ppc model. The HPSDB note (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.31) requires ppc to be absent.

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `ppc.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.8, PDF p. 124.
