---
title: "paf.dat: Textual (de-)calibrations"
description: "The paf table defines the textual (de-)calibrations of command and sequence parameters, also called parameter alias sets, one record per alias set; the alias/raw value pairs of each set are in PAS. A "
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# paf.dat: Textual (de-)calibrations

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.6.3</span><span class="osi-chip">624 rows in Solar Orbiter 2025-09-16</span></div>

The paf table defines the textual (de-)calibrations of command and sequence parameters, also called parameter alias sets, one record per alias set; the alias/raw value pairs of each set are in PAS. A parameter with calibration category T (CPC_CATEG or CSP_CATEG) references one alias set through CPC_PAFREF or CSP_PAFREF, and an alias set may be shared by many parameters. The operator can then enter or read the parameter as a text string (an engineering value such as ENABLED) instead of a number, and the aliases may also serve as default values; parameters using textual calibration display and accept engineering values in ASCII (DISPFMT=A). Unlike the monitoring calibrations (CAF/CAP, TXF/TXP), the commanding (de-)calibrations work in both directions: engineering to raw, for display and for encoding, and raw to engineering, for display. They can be attached to command parameters (CPC) and to sequence formal parameters (CSP) alike, but only to parameters whose raw value is numerical (not strings or times). The record gives the numeric format of the raw values of the set, which must be compatible with the type of the parameters that use it, and, for off-line checking only, the number of aliases.[^icd]

**Key:** `PAF_NUMBR`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="paf_numbr"><td>1</td><td><code>PAF_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric name uniquely identifying the commanding textual (de-)calibration (alias set); referenced by CPC_PAFREF, CSP_PAFREF and PAS_NUMBR.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 624 of 624 rows; e.g. <code>CAAT0001TC</code>, <code>CAAT0001TM</code>, <code>CAAT0003TC</code>, <code>CAAT0005TC</code>, <code>CAAT0007TC</code></span> <span class="osi-pg">ICD PDF p. 209</span></div></td></tr>
<tr id="paf_descr"><td>2</td><td><code>PAF_DESCR</code></td><td>Char(24)</td><td>O</td><td>Textual description of the (de-)calibration.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 624 of 624 rows; e.g. <code>HK SID</code>, <code>Memory ID</code>, <code>Mode</code>, <code>Navigation status indica</code>, <code>Odd parity in TCs</code></span> <span class="osi-pg">ICD PDF p. 209</span></div></td></tr>
<tr id="paf_rawfmt"><td>3</td><td><code>PAF_RAWFMT</code></td><td>Char(1)</td><td>O</td><td>Numeric format of the raw values (PAS_ALVAL) of the alias set; it must be compatible with the type of the parameters using the set.<ul class="osi-vals"><li><code>I</code> Signed integer</li><li><code>U</code> Unsigned integer (import default)</li><li><code>R</code> Real</li></ul><div class="osi-extra">Default <code>U</code>. <span class="osi-fstat">Solar Orbiter: filled in 624 of 624 rows; e.g. <code>U</code>, <code>I</code></span> <span class="osi-pg">ICD PDF p. 209</span></div></td></tr>
<tr id="paf_nalias"><td>4</td><td><code>PAF_NALIAS</code></td><td>Number(3)</td><td>O</td><td>Number of PAS records (aliases) defined for this set. Grey in ICD 7.0: not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 620 of 624 rows; e.g. <code>2</code>, <code>3</code>, <code>4</code>, <code>8</code>, <code>5</code></span> <span class="osi-pg">ICD PDF p. 209</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PAF_NUMBR` → [pas.PAS_NUMBR](pas.md#pas_numbr): Alias/raw value pairs of the set; PAF_NALIAS should equal their number.
- `PAF_NUMBR` → [cpc.CPC_PAFREF](cpc.md#cpc_pafref): Command parameters with CPC_CATEG=T.
- `PAF_NUMBR` → [csp.CSP_PAFREF](csp.md#csp_pafref): Sequence formal parameters with CSP_CATEG=T.

## History across ICD issues

ICD 5.1 (2001, section 3.3.3.6.3, PDF p.101) has the same four fields with PAF_NUMBR Number(4). ICD 6.7 Draft A (PDF p.195-196), ICD 6.9 (PDF p.200-201) and ICD 7.0 (PDF p.208-209) use Char(10) for PAF_NUMBR (identifier change of ICD 6.0, Annex 1 of ICD 7.0, PDF p.247). pyscos2000 (ICD 7.2) has the same four columns, key and default U.

!!! note "Notes from the extraction"
    No column discrepancy (4 columns in paf.dat). Solar Orbiter 2025-09-16: 624 alias sets (605 in 2020); PAF_RAWFMT U 622, I 2. PAF_NALIAS matches the PAS count wherever filled; it is empty for four sets (CNISX205TC, CNISX207TC, CNISX211TC, CNISX214TC) and set CCDT0004TX ('Event ID list') declares 1419 aliases, a four-digit value exceeding the declared Number(3). 30 alias sets are not referenced by any CPC or CSP record. Names end in 'TC' (547), 'TX' (58) or 'TM' (19), a mission naming convention not explained in the ICD.

## In the Solar Orbiter MIB

The 2025-09-16 release has **624** rows in `paf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.6.3, PDF p. 208.
