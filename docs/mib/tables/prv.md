---
title: "prv.dat: Parameter range values"
description: "The prv table lists the allowed values and value ranges of each range set declared in PRF, one record per allowed range or discrete value. A record with both a minimum and a maximum defines an inclusi"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# prv.dat: Parameter range values

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.7.2</span><span class="osi-chip">1,072 rows in Solar Orbiter 2025-09-16</span></div>

The prv table lists the allowed values and value ranges of each range set declared in PRF, one record per allowed range or discrete value. A record with both a minimum and a maximum defines an inclusive range: a parameter value passes the check if it lies within the limits or equals one of them. A record with only a minimum and an empty maximum defines one allowed discrete value. A set can mix any number of ranges and discrete values, one record per allowed value or range, so that the records of a set together list everything the parameter may take. The limits are written in the representation and type declared by the set (PRF_INTER, PRF_DSPFMT) and, for unsigned integers, in its radix (PRF_RADIX); their maximum length follows from the maximum command size. SCOS-2000 applies these checks when command parameters and sequence formal parameters are entered or loaded, for example on a manual stack; by default only formal parameter values are checked when a sequence is loaded.[^icd]

**Key:** `PRV_NUMBR`, `PRV_MINVAL`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="prv_numbr"><td>1</td><td><code>PRV_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Name (PRF_NUMBR) of the range set to which this allowed value or range belongs.<div class="osi-extra">Refers to <a href="../prf/">prf.PRF_NUMBR</a>. <span class="osi-fstat">Solar Orbiter: filled in 1,072 of 1,072 rows; e.g. <code>VCD2X05F</code>, <code>VCTX0001</code>, <code>VCDEID15</code>, <code>VCDEID25</code>, <code>VCD2X03F</code></span> <span class="osi-pg">ICD PDF p. 213</span></div></td></tr>
<tr id="prv_minval"><td>2</td><td><code>PRV_MINVAL</code></td><td>Char</td><td>M</td><td>Low limit of the range, or the single allowed value if PRV_MAXVAL is empty. Written in a format compatible with PRF_DSPFMT (and PRF_RADIX for unsigned integers). Part of the key. Maximum length depends on the maximum command size.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1,072 of 1,072 rows; e.g. <code>0</code>, <code>1</code>, <code>4</code>, <code>100</code>, <code>2</code></span> <span class="osi-pg">ICD PDF p. 213</span></div></td></tr>
<tr id="prv_maxval"><td>3</td><td><code>PRV_MAXVAL</code></td><td>Char</td><td>O</td><td>High limit of the range. Empty means that PRV_MINVAL is a discrete allowed value. Written in a format compatible with PRF_DSPFMT (and PRF_RADIX for unsigned integers).<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 762 of 1,072 rows; e.g. <code>255</code>, <code>100</code>, <code>30</code>, <code>10</code>, <code>65535</code></span> <span class="osi-pg">ICD PDF p. 213</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PRV_NUMBR` → [prf.PRF_NUMBR](prf.md#prf_numbr): Range set owning the value/range; representation and radix come from PRF.

## History across ICD issues

ICD 5.1 (2001, section 3.3.3.7.2, PDF p.103-104): PRV_NUMBR Number(4), PRV_MINVAL and PRV_MAXVAL Char(17), key PRV_NUMBR + PRV_MINVAL. ICD 6.7 Draft A (PDF p.199) and ICD 6.9 (PDF p.204): PRV_NUMBR Char(10). ICD 7.0 (PDF p.213): limit fields without fixed size, bounded by the maximum command size (S2K-8073, PDF p.261). pyscos2000 (ICD 7.2) has the same three columns, the same key and PRV_MAXVAL optional.

!!! note "Notes from the extraction"
    No discrepancy in columns, keys or optionality (3 columns in prv.dat). Solar Orbiter 2025-09-16: 1072 records (631 in 2020) for 565 sets, all resolving to PRF. 762 records are ranges and 310 are discrete values; all 310 discrete values belong to the 16 ASCII (engineering text) range sets, so every numeric set is expressed as min/max ranges. Hexadecimal limits are written without prefix (e.g. 0 to 7FFF for set VIP06012). Longest limits: 16 characters (PRV_MINVAL), 10 (PRV_MAXVAL).

## In the Solar Orbiter MIB

The 2025-09-16 release has **1,072** rows in `prv.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.7.2, PDF p. 213.
