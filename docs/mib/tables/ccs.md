---
title: "ccs.dat: Numerical (de-)calibration curves definition"
description: "The ccs table holds the points of the commanding numerical (de-)calibration curves declared in CCA, one record per engineering/raw value pair. Each pair links an engineering value to the raw value tha"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# ccs.dat: Numerical (de-)calibration curves definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.6.2</span><span class="osi-chip">1,226 rows in Solar Orbiter 2025-09-16</span></div>

The ccs table holds the points of the commanding numerical (de-)calibration curves declared in CCA, one record per engineering/raw value pair. Each pair links an engineering value to the raw value that is encoded in the command; SCOS-2000 uses the set of pairs of a curve to convert an engineering value entered by the user into the raw value to be encoded, and raw values back to engineering values for display. Contrary to the monitoring calibration tables (CAP), where the raw value comes first, here the engineering value is in the X column (CCS_XVALS) and the raw value in the Y column (CCS_YVALS). Engineering values are always written in decimal, whereas unsigned raw values use the radix declared for the curve (CCA_RADIX). Because the curve must be invertible without ambiguity, each engineering value should correspond to exactly one raw value and vice versa; the key (curve name plus raw value) prevents the same raw value from appearing twice in a curve. The value fields have no fixed size: their maximum length follows from the maximum command size.[^icd]

**Key:** `CCS_NUMBR`, `CCS_YVALS`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="ccs_numbr"><td>1</td><td><code>CCS_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Name (CCA_NUMBR) of the curve to which this value pair belongs.<div class="osi-extra">Refers to <a href="../cca/">cca.CCA_NUMBR</a>. <span class="osi-fstat">Solar Orbiter: filled in 1,226 of 1,226 rows; e.g. <code>CITP1091TC</code>, <code>CICPCMS0TC</code>, <code>CTC4Z101TC</code>, <code>CTC4Z106TC</code>, <code>CIWP0069TC</code></span> <span class="osi-pg">ICD PDF p. 207</span></div></td></tr>
<tr id="ccs_xvals"><td>2</td><td><code>CCS_XVALS</code></td><td>Char</td><td>M</td><td>Engineering value of the point, in a format compatible with CCA_ENGFMT. All values, unsigned integers included, are written in decimal whatever the curve radix (CCA_RADIX). Maximum length depends on the maximum command size.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,226 of 1,226 rows; e.g. <code>0</code>, <code>1</code>, <code>4</code>, <code>0.25</code>, <code>0.999984741</code></span> <span class="osi-pg">ICD PDF p. 208</span></div></td></tr>
<tr id="ccs_yvals"><td>3</td><td><code>CCS_YVALS</code></td><td>Char</td><td>M</td><td>Raw value of the point, in a format compatible with CCA_RAWFMT; unsigned integer raw values (CCA_RAWFMT=U) are written in the radix CCA_RADIX. Part of the key. Maximum length depends on the maximum command size.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,226 of 1,226 rows; e.g. <code>0</code>, <code>255</code>, <code>65535</code>, <code>-32768</code>, <code>32767</code></span> <span class="osi-pg">ICD PDF p. 208</span></div></td></tr>
</tbody></table></div>

## Relationships

- `CCS_NUMBR` → [cca.CCA_NUMBR](cca.md#cca_numbr): Curve owning the point; formats and radix come from CCA.

## History across ICD issues

ICD 5.1 (2001, section 3.3.3.6.2, PDF p.100-101): CCS_NUMBR Number(4), CCS_XVALS and CCS_YVALS Char(17), key CCS_NUMBR + CCS_YVALS. ICD 6.7 Draft A (PDF p.194-195) and ICD 6.9 (PDF p.199-200): CCS_NUMBR Char(10), values still Char(17). ICD 7.0 (PDF p.207-208): values without fixed size, bounded by the maximum command size (S2K-8073, Annex 2, PDF p.261). pyscos2000 (ICD 7.2) has the same three mandatory columns but marks all three, including CCS_XVALS, as key.

!!! note "Notes from the extraction"
    Key discrepancy: ICD 7.0 keys on CCS_NUMBR + CCS_YVALS only, pyscos2000 on all three columns. The ICD remark preceding the table speaks of 'CCA_XVALS', an evident slip for CCS_XVALS. Solar Orbiter 2025-09-16 has 1226 points (1233 in 2020) for 99 curves, all curve names resolving to CCA; longest values are 17 characters (XVALS) and 10 (YVALS). Curve CPWP8010TM maps engineering value 0 to two raw values (0 and 430), which contradicts the one-to-one requirement stated in the section introduction (ICD 7.0 section 3.3.3.6, PDF p.205) although it does not violate the table key.

## In the Solar Orbiter MIB

The 2025-09-16 release has **1,226** rows in `ccs.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.6.2, PDF p. 207.
