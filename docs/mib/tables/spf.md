---
title: "spf.dat: Scrolling displays"
description: "The spf table lists the Scrolling Displays (SCDs), one record per display. A scrolling display shows from one to five monitoring parameters; each new sample is either written by scrolling onto a new l"
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# spf.dat: Scrolling displays

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.5</span><span class="osi-chip">1 rows in Solar Orbiter 2025-09-16</span></div>

The spf table lists the Scrolling Displays (SCDs), one record per display. A scrolling display shows from one to five monitoring parameters; each new sample is either written by scrolling onto a new line or overwrites the previous value, as set per parameter in spc. spf gives only the display identity, its header line, the number of parameters (which must equal the number of spc records for the display) and an update rate that exists only for external applications. The displayed parameters, their order, update mode, format and colours are in spc. Only parameters processed by the telemetry model can be shown, and from SCOS-2000 R5.0 the definitions are converted into XML files in the FARC instead of being imported into the run-time database.[^icd]

**Key:** `SPF_NUMBE`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="spf_numbe"><td>1</td><td><code>SPF_NUMBE</code></td><td>Char(8)</td><td>M</td><td>Name of the Scrolling Display (SCD): alphanumeric string that uniquely identifies it (the ICD misspells 'Scrolling' as 'Srolling'). Referenced by spc.SPC_NUMBE.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1 of 1 rows; e.g. <code>DICSP000</code></span> <span class="osi-pg">ICD PDF p. 120</span></div></td></tr>
<tr id="spf_head"><td>2</td><td><code>SPF_HEAD</code></td><td>Char(32)</td><td>O</td><td>Alphanumeric header shown on the top line of the display.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1 of 1 rows; e.g. <code>SPICE SFM Positions</code></span> <span class="osi-pg">ICD PDF p. 120</span></div></td></tr>
<tr id="spf_npar"><td>3</td><td><code>SPF_NPAR</code></td><td>Number(1)</td><td>M</td><td>Number of parameters in the display, integer 1 to 5. Must equal the number of spc records for this SCD (§3.3.2.7.6).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1 of 1 rows; e.g. <code>5</code></span> <span class="osi-pg">ICD PDF p. 120</span></div></td></tr>
<tr id="spf_upun"><td>4</td><td><code>SPF_UPUN</code></td><td>Number(2)</td><td>O</td><td>Display update rate in seconds, integer 1 to 99. Provided for external applications that read the database; not used by SCOS-2000.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1 of 1 rows; e.g. <code>10</code></span> <span class="osi-pg">ICD PDF p. 121</span></div></td></tr>
</tbody></table></div>

## Relationships

- `SPF_NUMBE` → [spc.SPC_NUMBE](spc.md#spc_numbe): One SCD has SPF_NPAR spc records.

## History across ICD issues

ICD 5.1 §3.3.2.6.5 (icd-5-1-tos-gci, PDF p.55-56) defines the same four fields, except that SPF_UPUN is given in milliseconds with no range. The unit was questioned in ICD 6.7 (S2K-DCR-5502 item 6, ICD 7.0 Annex 1 PDF p.259), and ICD 6.7 Draft A (icd-6-7-drafta PDF p.113-114), ICD 6.9 (icd-6-9-archive-org PDF p.117-118) and ICD 7.0 (PDF p.120-121) give seconds, range 1-99. Since SCOS-2000 R5.0 (ICD issue 6.4) display definitions are no longer kept in the run-time (POST) MIB database: the ASCII tables are converted on request into XML files stored in the FARC, in a delta fashion that keeps previously imported displays and displays created at run time with the TM Desktop editor (ICD 7.0 §2.5, PDF p.24; §3.3.2.7, PDF p.110; Annex 1, PDF p.254). The XML format is in [AD-5], SCOS-2000 TM Displays and Printout definitions Service ICD (ICD-5001), which is not in the library. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    Column mapping: COL1..COL4 = SPF_NUMBE, SPF_HEAD, SPF_NPAR, SPF_UPUN; the single line of the 2025 spf.dat has exactly 4 fields. Solar Orbiter defines one SCD, DICSP000 'SPICE SFM Positions', with SPF_NPAR = 5, which matches its 5 spc records, and SPF_UPUN = 10 (not used by SCOS-2000). The same record is in the 2020-04-16 release; the SWA IDB spf.dat is empty. pyscos2000 has no spf model. The HPSDB note (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.30) computes SPF_NPAR itself and ignores SPF_UPUN.

## In the Solar Orbiter MIB

The 2025-09-16 release has **1** rows in `spf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.5, PDF p. 120.
