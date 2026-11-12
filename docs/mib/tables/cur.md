---
title: "cur.dat: Calibration conditional selection"
description: "cur associates monitoring parameters with several calibration definitions and says which one applies at any moment. It holds one record per parameter/calibration pair. For each parameter the records a"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# cur.dat: Calibration conditional selection

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.1</span><span class="osi-chip">1,974 rows in Solar Orbiter 2025-09-16</span></div>

cur associates monitoring parameters with several calibration definitions and says which one applies at any moment. It holds one record per parameter/calibration pair. For each parameter the records are evaluated in increasing CUR_POS order and the first one whose applicability expression CUR_RLCHK = CUR_VALPAR is true selects the calibration (CUR_SELECT) to use; all later entries for that parameter are ignored. This conditional or multiple calibration lets one telemetry parameter be calibrated according to the value of another telemetry parameter (ICD 7.0 Annex 1, p. 246). A parameter listed here must leave PCF_CURTX empty. ICD 7.0 lists three limitations. Static pre-transmission validation (PTV) checks may not use the engineering value (PTV_INTER = 'E') of parameters with multiple calibrations. The Variable Packets Display cannot show calibrated values of conditionally calibrated parameters and shows raw values instead. The same applies to the Packet History display. All calibrations attached to one parameter must produce engineering values of the same format.[^icd]

**Key:** `CUR_PNAME`, `CUR_POS`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="cur_pname"><td>1</td><td><code>CUR_PNAME</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter to be calibrated; must match the PCF_NAME of an existing monitoring parameter (whose PCF_CURTX must then be left null).<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 1,974 of 1,974 rows; e.g. <code>NDS00010</code>, <code>NDS01010</code>, <code>NDS3Z002</code>, <code>NDS3Z01X</code>, <code>NCF7Z021</code></span> <span class="osi-pg">ICD PDF p. 64</span></div></td></tr>
<tr id="cur_pos"><td>2</td><td><code>CUR_POS</code></td><td>Number(2)</td><td>M</td><td>Evaluation order of the applicability criteria of the calibrations attached to the parameter, starting with the lowest value. Only the first calibration whose criterion CUR_RLCHK = CUR_VALPAR is true is activated; the other entries of the same parameter are ignored.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,974 of 1,974 rows; e.g. <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>5</code></span> <span class="osi-pg">ICD PDF p. 64</span></div></td></tr>
<tr id="cur_rlchk"><td>3</td><td><code>CUR_RLCHK</code></td><td>Char(8)</td><td>M</td><td>Name of the parameter whose value decides whether this calibration applies; CUR_VALPAR gives the value it is compared with. Only parameters with a signed or unsigned integer raw representation that are processed by the telemetry model library (TM parameters with a plf entry, or synthetic parameters of any kind) may be used.<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-fstat">Solar Orbiter: filled in 1,974 of 1,974 rows; e.g. <code>NPWZ0000</code>, <code>NDSZ0001</code>, <code>NDSZ0002</code>, <code>NIMD6605</code>, <code>NIMD6609</code></span> <span class="osi-pg">ICD PDF p. 64</span></div></td></tr>
<tr id="cur_valpar"><td>4</td><td><code>CUR_VALPAR</code></td><td>Number(5)</td><td>M</td><td>Raw value of the applicability parameter CUR_RLCHK for which this calibration applies; the applicability expression is CUR_RLCHK = CUR_VALPAR.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,974 of 1,974 rows; e.g. <code>10</code>, <code>11</code>, <code>1</code>, <code>0</code>, <code>2</code></span> <span class="osi-pg">ICD PDF p. 64</span></div></td></tr>
<tr id="cur_select"><td>5</td><td><code>CUR_SELECT</code></td><td>Char(10)</td><td>M</td><td>Identifier of the calibration to apply when the applicability expression is true. It must match TXF_NUMBR if CUR_PNAME is a status parameter (PCF_CATEG = 'S'), or CAF_NUMBR, MCF_IDENT or LGF_IDENT if it is numerical (PCF_CATEG = 'N'). All calibrations attached to the same parameter must give the same engineering format: ASCII for textual calibrations; real for polynomial, logarithmic and numerical curves with CAF_ENGFMT = 'R'; signed integer for numerical curves with CAF_ENGFMT = 'I'; unsigned integer for CAF_ENGFMT = 'U'. The description continues on PDF p. 65.<div class="osi-extra">Refers to <a href="../txf/">txf.TXF_NUMBR | caf.CAF_NUMBR | mcf.MCF_IDENT | lgf.LGF_IDENT</a>. <span class="osi-fstat">Solar Orbiter: filled in 1,974 of 1,974 rows; e.g. <code>CPWP0041TM</code>, <code>CPWP5041TM</code>, <code>CPWP0042TM</code>, <code>CPWP5042TM</code>, <code>CPWP0036TM</code></span> <span class="osi-pg">ICD PDF p. 64</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CUR_PNAME` → [pcf.PCF_NAME](pcf.md#pcf_name): Parameter being calibrated; many-to-many link between parameters and calibrations (section 3.3.2, p. 38-39).
- `CUR_RLCHK` → [pcf.PCF_NAME](pcf.md#pcf_name): Applicability (selector) parameter; one parameter can drive many criteria.
- `CUR_SELECT` → [caf.CAF_NUMBR](caf.md#caf_numbr) / [mcf.MCF_IDENT](mcf.md#mcf_ident) / [lgf.LGF_IDENT](lgf.md#lgf_ident) / [txf.TXF_NUMBR](txf.md#txf_numbr): Calibration selected; the target table depends on PCF_CATEG of CUR_PNAME.

## History across ICD issues

Not present in ICD 5.1 (2001), which allowed only one calibration per parameter through PCF_CURTX. Conditional calibration ('Curve Selection') was introduced in ICD 6.0 with the repatriation of Herschel/Planck CCS functions (ICD 7.0 Annex 1, p. 246). The five-field layout is unchanged in ICD 6.7 Draft A (p. 58-60), 6.9 (p. 62-63) and 7.0 (p. 63-65). ICD 6.4 restricted CUR_RLCHK to parameters processed by the TM model (p. 254). ICD 6.9 lists only the PTV and Variable Packets Display limitations (icd-6-9 p. 62); ICD 7.0 adds the Packet History display limitation and speaks of 'conditional' calibration (S2K-8681, p. 263). pyscos2000 (ICD 7.2) has the same five fields, keys and optionality.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. Solar Orbiter 2025-09-16: 1,974 records for 907 parameters (902 numerical, 5 status), driven by 52 different selector parameters and pointing to 382 distinct calibrations (1,944 entries resolve to caf, 30 to txf, none to mcf or lgf). Every parameter has CUR_POS 1 and 2; up to 12 positions are used (e.g. NDS00010 has 12 entries selected by NDSS0783 to NDSS0794). All CUR_PNAME, CUR_RLCHK and CUR_SELECT values resolve, and no parameter in cur also has PCF_CURTX. The most used selector is NPWZ0000 ('PCDU_MODEL', 1,718 entries), a dynamic user defined constant in the 'Dynamic UDCs' packet (SPID 66830); together with NDSZ0001/NDSZ0002 this suggests (inference) that Solar Orbiter uses cur mainly to switch between unit-specific calibration models.

## In the Solar Orbiter MIB

The 2025-09-16 release has **1,974** rows in `cur.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.1, PDF p. 63.
