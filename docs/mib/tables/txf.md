---
title: "txf.dat: Textual calibrations"
description: "txf declares the textual calibrations, also called alias sets, which turn the raw value of a status parameter into a text string such as 'ON' or 'OFF'. It has one record per textual calibration. The i"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# txf.dat: Textual calibrations

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.4</span><span class="osi-chip">1,003 rows in Solar Orbiter 2025-09-16</span></div>

txf declares the textual calibrations, also called alias sets, which turn the raw value of a status parameter into a text string such as 'ON' or 'OFF'. It has one record per textual calibration. The individual raw-range to text mappings are stored in txp. Parameters use a textual calibration by naming it in PCF_CURTX (single calibration) or CUR_SELECT (conditional calibration), and must then have PCF_CATEG = 'S'. The txf record gives a description, the numeric format of the raw values listed in txp (which must be compatible with the type of the parameters using the calibration) and the number of txp entries. Status parameters are typically checked with status checks in ocp, whose expected values are then written as the calibrated strings when OCF_INTER = 'C' and OCF_CODIN = 'A'. A raw value with no matching text gives an invalid engineering value shown as '****' (PCF_INTER description, p. 50).[^icd]

**Key:** `TXF_NUMBR`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="txf_numbr"><td>1</td><td><code>TXF_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric identifier that uniquely names the textual calibration; it is the value used in PCF_CURTX, CUR_SELECT and TXP_NUMBR.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,003 of 1,003 rows; e.g. <code>AYMODELE</code>, <code>CAAT0001TM</code>, <code>CAAT0003TM</code>, <code>CAAT0005TM</code>, <code>CAAT0007TM</code></span> <span class="osi-pg">ICD PDF p. 69</span></div></td></tr>
<tr id="txf_descr"><td>2</td><td><code>TXF_DESCR</code></td><td>Char(32)</td><td>O</td><td>Free textual description of the textual calibration.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,003 of 1,003 rows; e.g. <code>Memory ID</code>, <code>Failure ID</code>, <code>Mode ID</code>, <code>Odd parity in TMs</code>, <code>APME Mode</code></span> <span class="osi-pg">ICD PDF p. 69</span></div></td></tr>
<tr id="txf_rawfmt"><td>3</td><td><code>TXF_RAWFMT</code></td><td>Char(1)</td><td>M</td><td>Format of the raw values (TXP_FROM, TXP_TO) given in the txp records of this calibration. It must be compatible with the type of the parameters that use the calibration.<ul class="osi-vals"><li><code>I</code> Signed integer</li><li><code>U</code> Unsigned integer</li><li><code>R</code> Real</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,003 of 1,003 rows; e.g. <code>U</code>, <code>I</code></span> <span class="osi-pg">ICD PDF p. 69</span></div></td></tr>
<tr id="txf_nalias"><td>4</td><td><code>TXF_NALIAS</code></td><td>Number(3)</td><td>O</td><td>Number of records defined in txp for this textual calibration. Grey row in the ICD: informative, not used by SCOS-2000 processing.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,003 of 1,003 rows; e.g. <code>2</code>, <code>4</code>, <code>3</code>, <code>5</code>, <code>6</code></span> <span class="osi-pg">ICD PDF p. 69</span></div></td></tr>
</tbody></table></div>

## Relationships

- `TXF_NUMBR` → [txp.TXP_NUMBR](txp.md#txp_numbr): Each alias set contains one or more text points (section 3.3.2, p. 39; the overview text calls the point table 'PAS', which is the commanding-side equivalent, while the monitoring points are in txp).
- `TXF_NUMBR` → [pcf.PCF_CURTX](pcf.md#pcf_curtx), [cur.CUR_SELECT](cur.md#cur_select): Used only by status parameters (PCF_CATEG = 'S'); shareable among parameters.

## History across ICD issues

ICD 5.1 (p. 33-34) has the same four fields but TXF_NUMBR is Number(4) ('identification number'). It became Char(10) in ICD 6.0 (ICD 7.0 Annex 1, p. 247; field-type change also listed for 6.2/6.3, p. 253). Unchanged in ICD 6.7 Draft A (p. 64-65), 6.9 (p. 67-68) and 7.0 (p. 69). pyscos2000 (ICD 7.2) matches.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. The ICD's monitoring overview (p. 39) says each textual calibration contains points in 'PAS', but the monitoring alias points are defined in txp (pas is the command-side table); this looks like an editorial slip in the ICD. Solar Orbiter 2025-09-16: 1,003 textual calibrations, raw format U (994) or I (9). TXF_NALIAS is declared Number(3) (at most 999) but four Solar Orbiter calibrations exceed that: PARAMIDTM 'Parameter ID' (19,803 entries, mapping on-board parameter IDs to ground parameter names, used by parameter-ID fields such as NCD0C095), CCDT0004TX 'Event ID list' (1,419), CDMTX000TM (1,192) and CCDT0384TM (1,173). TXF_NALIAS disagrees with the actual txp count for 2 calibrations (CYCT0002TM declares 2 but has 3 points; CYNT0002TM declares 2 but has 1); since the field is not used by SCOS-2000 this is harmless.

## In the Solar Orbiter MIB

The 2025-09-16 release has **1,003** rows in `txf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.4, PDF p. 69.
