---
title: "lgf.dat: Logarithmic calibrations definitions"
description: "lgf defines logarithmic calibrations, one record per definition, by giving up to five coefficients. SCOS-2000 computes the engineering value Y of a raw value X as Y = 1 / [A0 + A1*ln(X) + A2*ln^2(X) +"
tags: [MIB, "Monitoring"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# lgf.dat: Logarithmic calibrations definitions

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.2.7</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

lgf defines logarithmic calibrations, one record per definition, by giving up to five coefficients. SCOS-2000 computes the engineering value Y of a raw value X as Y = 1 / [A0 + A1*ln(X) + A2*ln^2(X) + A3*ln^3(X) + A4*ln^4(X)], where A0 is LGF_POL1 and A4 is LGF_POL5. Unspecified coefficients default to 0. According to the ICD change annex, this curve type was introduced to compute temperatures from resistance readings of platinum thermistors. It was built to resemble the polynomial mcf calibrations, which is why it also accepts up to five coefficients. Parameters use a logarithmic calibration by naming it in PCF_CURTX or CUR_SELECT (numerical parameters); the result is real. Logarithmic identifiers share the name space of the other non-textual calibrations, so an LGF_IDENT may not equal any CAF_NUMBR or MCF_IDENT.[^icd]

**Key:** `LGF_IDENT`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="lgf_ident"><td>1</td><td><code>LGF_IDENT</code></td><td>Char(10)</td><td>M</td><td>Alphanumeric identifier that uniquely names the logarithmic calibration; used in PCF_CURTX and CUR_SELECT. It must not overlap with CAF_NUMBR or MCF_IDENT values.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
<tr id="lgf_descr"><td>2</td><td><code>LGF_DESCR</code></td><td>Char(32)</td><td>O</td><td>Free textual description of the logarithmic calibration.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
<tr id="lgf_pol1"><td>3</td><td><code>LGF_POL1</code></td><td>Char(14)</td><td>M</td><td>Coefficient A0, a numerical value in real format (Appendix A).<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
<tr id="lgf_pol2"><td>4</td><td><code>LGF_POL2</code></td><td>Char(14)</td><td>O</td><td>Coefficient A1 of the first-order logarithmic term ln(X), in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
<tr id="lgf_pol3"><td>5</td><td><code>LGF_POL3</code></td><td>Char(14)</td><td>O</td><td>Coefficient A2 of the second-order term ln^2(X), in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
<tr id="lgf_pol4"><td>6</td><td><code>LGF_POL4</code></td><td>Char(14)</td><td>O</td><td>Coefficient A3 of the third-order term ln^3(X), in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
<tr id="lgf_pol5"><td>7</td><td><code>LGF_POL5</code></td><td>Char(14)</td><td>O</td><td>Coefficient A4 of the fourth-order term ln^4(X), in real format; defaults to 0.<div class="osi-extra">Default <code>0</code>. <span class="osi-pg">ICD PDF p. 72</span></div></td></tr>
</tbody></table></div>

## Relationships

- `LGF_IDENT` → [pcf.PCF_CURTX](pcf.md#pcf_curtx), [cur.CUR_SELECT](cur.md#cur_select): Shareable among parameters; must be unique across caf.CAF_NUMBR and mcf.MCF_IDENT.

## History across ICD issues

Not present in ICD 5.1. The logarithmic curve type was added in ICD 6.0 with the repatriation of Herschel/Planck CCS functions (ICD 7.0 Annex 1, p. 248), which also notes that the H-P CCS project explicitly excluded patching of the curve definition. ICD 6.7 Draft A (p. 67-68), 6.9 (p. 70-71) and 7.0 (p. 71-72) give the same seven fields. pyscos2000 (ICD 7.2) matches, including the '0' defaults for LGF_POL2 to LGF_POL5.

!!! note "Notes from the extraction"
    No discrepancy between ICD 7.0 and pyscos2000. ICD 7.0 p. 72 prints 'Logarithmic Logarithmic coefficient' for LGF_POL4 (editorial duplication). The formula takes ln(X), so it is only defined for positive raw values; the ICD does not say what SCOS-2000 returns for X &lt;= 0 (not stated in the available sources). Solar Orbiter 2025-09-16: lgf.dat is present but empty (0 records), so Solar Orbiter uses no logarithmic calibrations; the 2020 release and the SWA instrument database are also empty.

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `lgf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.2.7, PDF p. 71.
