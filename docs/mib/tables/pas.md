---
title: "pas.dat: Textual (de-)calibrations definitions"
description: "The pas table holds the entries of the commanding textual (de-)calibrations declared in PAF, one record per alias/raw value pair. Each record associates a text string - the engineering interpretation "
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# pas.dat: Textual (de-)calibrations definitions

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.6.4</span><span class="osi-chip">11,834 rows in Solar Orbiter 2025-09-16</span></div>

The pas table holds the entries of the commanding textual (de-)calibrations declared in PAF, one record per alias/raw value pair. Each record associates a text string - the engineering interpretation shown to and typed by the operator - with the raw numerical value encoded in the command. When a command or sequence parameter with textual calibration (category T) is entered in engineering form, SCOS-2000 looks the text up in the alias set to obtain the raw value to encode; when a raw value is displayed, the alias text is shown. Raw values are always written in decimal and must match the raw format of the set (PAF_RAWFMT). The key (set name plus raw value) makes each raw value appear only once in a set. The text and value fields have no fixed length in ICD 7.0: their maximum length follows from the maximum command size. Aliases can also be used as default values of the parameters that reference the set (CPC_DEFVAL, CDF_VALUE, SDF_VALUE or CSP_DEFVAL written with an engineering representation).[^icd]

**Key:** `PAS_NUMBR`, `PAS_ALVAL`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="pas_numbr"><td>1</td><td><code>PAS_NUMBR</code></td><td>Char(10)</td><td>M</td><td>Name (PAF_NUMBR) of the textual (de-)calibration to which this text/value pair belongs.<div class="osi-extra">Refers to <a href="../paf/">paf.PAF_NUMBR</a>. <span class="osi-fstat">Solar Orbiter: filled in 11,834 of 11,834 rows; e.g. <code>CCDT0004TX</code>, <code>CTCXZ001TM</code>, <code>CTC2Z006TX</code>, <code>CIAT0054TC</code>, <code>CICT0055TC</code></span> <span class="osi-pg">ICD PDF p. 210</span></div></td></tr>
<tr id="pas_altxt"><td>2</td><td><code>PAS_ALTXT</code></td><td>Char</td><td>M</td><td>Text string giving the engineering interpretation of the raw value in PAS_ALVAL (the alias). Maximum length depends on the maximum command size.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 11,834 of 11,834 rows; e.g. <code>099 Spare</code>, <code>100 Spare</code>, <code>101 Spare</code>, <code>102 Spare</code>, <code>103 Spare</code></span> <span class="osi-pg">ICD PDF p. 210</span></div></td></tr>
<tr id="pas_alval"><td>3</td><td><code>PAS_ALVAL</code></td><td>Char</td><td>M</td><td>Raw value, written in decimal, in a format compatible with PAF_RAWFMT of the set. Part of the key. Maximum length depends on the maximum command size.<div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 11,834 of 11,834 rows; e.g. <code>1</code>, <code>0</code>, <code>2</code>, <code>3</code>, <code>4</code></span> <span class="osi-pg">ICD PDF p. 210</span></div></td></tr>
</tbody></table></div>

## Relationships

- `PAS_NUMBR` → [paf.PAF_NUMBR](paf.md#paf_numbr): Alias set owning the pair.

## History across ICD issues

ICD 5.1 (2001, section 3.3.3.6.4, PDF p.101-102): PAS_NUMBR Number(4), PAS_ALTXT Char(16), PAS_ALVAL Char(17), key PAS_NUMBR + PAS_ALVAL. ICD 6.7 Draft A (PDF p.196) and ICD 6.9 (PDF p.201): PAS_NUMBR Char(10), the other sizes unchanged. ICD 7.0 (PDF p.210): PAS_ALTXT and PAS_ALVAL without fixed size, bounded by the maximum command size (S2K-8073, PDF p.261). pyscos2000 (ICD 7.2) has the same three mandatory columns but marks all three, including PAS_ALTXT, as key.

!!! note "Notes from the extraction"
    Key discrepancy: ICD 7.0 keys on PAS_NUMBR + PAS_ALVAL, pyscos2000 on all three columns. Solar Orbiter 2025-09-16: 11834 pairs (9741 in 2020) in 624 sets, all resolving to PAF; no set repeats a raw value or an alias text; the longest alias text is 16 characters, i.e. still within the Char(16) of earlier ICD issues, and the longest raw value 10 digits.

## In the Solar Orbiter MIB

The 2025-09-16 release has **11,834** rows in `pas.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.6.4, PDF p. 210.
