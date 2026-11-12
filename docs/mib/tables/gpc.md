---
title: "gpc.dat: Graphic displays definition"
description: "The gpc table defines the parameters plotted on each Graphic Display (GRD) declared in gpf: one record per plotted parameter. Each record gives the entry's order in the display, the plot area where th"
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# gpc.dat: Graphic displays definition

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.4</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

The gpc table defines the parameters plotted on each Graphic Display (GRD) declared in gpf: one record per plotted parameter. Each record gives the entry's order in the display, the plot area where the parameter is drawn (or, for full-screen displays, whether it is the X-axis parameter of a parameter-against-parameter plot), the monitoring parameter name, whether raw or calibrated values are plotted, the minimum and maximum values mapped to the ends of the axis, and the colour, symbol and line style of the trace. An optional domain identifier allows a single graphic display to combine parameters from different SCOS-2000 domains. The file is expected to be sorted by display name and then by position. Like gpf, the ICD says this file is read directly by SCOS-2000 applications rather than imported, and from R5.0 display definitions are converted into XML files in the FARC.[^icd]

**Key:** `GPC_NUMBE`, `GPC_POS`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="gpc_numbe"><td>1</td><td><code>GPC_NUMBE</code></td><td>Char(8)</td><td>M</td><td>Name of the GRD; must match GPF_NUMBE of the corresponding display. Part of the key.<div class="osi-extra">Refers to <a href="../gpf/">gpf.GPF_NUMBE</a>. <span class="osi-pg">ICD PDF p. 117</span></div></td></tr>
<tr id="gpc_pos"><td>2</td><td><code>GPC_POS</code></td><td>Number(1)</td><td>M</td><td>Order of the parameter entry within the GRD (single digit). Part of the key; the file is expected to be sorted by GPC_NUMBE then GPC_POS (the ICD remark misspells the first as 'GCP_NUMBE').<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 117</span></div></td></tr>
<tr id="gpc_where"><td>3</td><td><code>GPC_WHERE</code></td><td>Char(1)</td><td>M</td><td>Plot area where the parameter is drawn. The valid codes depend on the display type GPF_TYPE: for 'F' (full screen) '1' marks a plotted parameter and 'P' the X-axis parameter; for 'H' (half screen) '1' is the top graph and '2' the bottom graph; for 'Q' (quarter screen) areas are numbered 1-4 clockwise starting top-left; for 'S' (sliced screen) areas are numbered 1-8 from the top.<ul class="osi-vals"><li><code>1</code> F: parameter to be plotted; H: top graph; Q/S: area 1</li><li><code>P</code> F only: X-axis parameter (parameter-against-parameter plot)</li><li><code>2</code> H: bottom graph; Q/S: area 2</li><li><code>3-4</code> Q/S: areas 3-4 (Q clockwise from top-left, S top-down)</li><li><code>5-8</code> S only: areas 5-8 top-down</li></ul><div class="osi-extra">Refers to <a href="../gpf/">gpf.GPF_TYPE</a>. <span class="osi-pg">ICD PDF p. 117</span></div></td></tr>
<tr id="gpc_name"><td>4</td><td><code>GPC_NAME</code></td><td>Char(8)</td><td>M</td><td>Name of the monitoring parameter (PCF_NAME) plotted. Must be processed by the TM model (plf parameter or synthetic parameter, §3.3.2.7).<div class="osi-extra">Refers to <a href="../pcf/">pcf.PCF_NAME</a>. <span class="osi-pg">ICD PDF p. 117</span></div></td></tr>
<tr id="gpc_raw"><td>5</td><td><code>GPC_RAW</code></td><td>Char(1)</td><td>O</td><td>Selects whether calibrated or raw values are plotted. It also fixes the representation used for GPC_MINIM and GPC_MAXIM.<ul class="osi-vals"><li><code>C</code> Calibrated (engineering) value plotted; a space has the same meaning</li><li><code>U</code> Uncalibrated (raw) value plotted</li></ul><div class="osi-extra">Default <code>U</code>. <span class="osi-pg">ICD PDF p. 118</span></div></td></tr>
<tr id="gpc_minim"><td>6</td><td><code>GPC_MINIM</code></td><td>Char(14)</td><td>M</td><td>Minimum value of the parameter, mapped to the start of the axis on which the value is projected. Expressed in raw or engineering form according to GPC_RAW, in a format compatible with the parameter type (Appendix A).<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 118</span></div></td></tr>
<tr id="gpc_maxim"><td>7</td><td><code>GPC_MAXIM</code></td><td>Char(14)</td><td>M</td><td>Maximum value of the parameter, mapped to the end of the axis. Raw or engineering form according to GPC_RAW, format per Appendix A.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 118</span></div></td></tr>
<tr id="gpc_prclr"><td>8</td><td><code>GPC_PRCLR</code></td><td>Char(1)</td><td>M</td><td>Colour of the plot symbol and of the connecting lines.<ul class="osi-vals"><li><code>1</code> Green</li><li><code>2</code> Blue</li><li><code>3</code> Cyan</li><li><code>4</code> Red</li><li><code>5</code> Yellow</li><li><code>6</code> Magenta</li><li><code>7</code> White</li></ul><div class="osi-extra"> <span class="osi-pg">ICD PDF p. 118</span></div></td></tr>
<tr id="gpc_symb0"><td>9</td><td><code>GPC_SYMB0</code></td><td>Char(1)</td><td>O</td><td>Symbol drawn at each parameter value. The field name is printed with a final digit zero ('SYMB0') in the ICD text; the HPSDB note writes 'SYMBO'.<ul class="osi-vals"><li><code>0</code> No symbol</li><li><code>1</code> X</li><li><code>2</code> +</li><li><code>3</code> 0</li><li><code>4</code> *</li><li><code>5</code> &lt;&gt;</li><li><code>6</code> []</li></ul><div class="osi-extra">Default <code>0</code>. <span class="osi-pg">ICD PDF p. 119</span></div></td></tr>
<tr id="gpc_line"><td>10</td><td><code>GPC_LINE</code></td><td>Char(1)</td><td>O</td><td>Line style connecting two consecutive values (two symbols).<ul class="osi-vals"><li><code>0</code> No line</li><li><code>1</code> Solid line</li><li><code>2</code> Long dash</li><li><code>3</code> Dash</li><li><code>4</code> Short dash</li><li><code>5</code> Dash alternating with short dash</li></ul><div class="osi-extra">Default <code>0</code>. <span class="osi-pg">ICD PDF p. 119</span></div></td></tr>
<tr id="gpc_domain"><td>11</td><td><code>GPC_DOMAIN</code></td><td>Number(5)</td><td>O</td><td>Identifier of the SCOS-2000 domain to which the plotted parameter (GPC_NAME) belongs, unsigned integer 0 to 2^16-1. It lets one graphic display combine parameters from different domains. To stay compatible with single-domain definitions the field is optional and the column may be omitted.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 120</span></div></td></tr>
</tbody></table></div>

## Relationships

- `GPC_NUMBE` → [gpf.GPF_NUMBE](gpf.md#gpf_numbe): Many gpc records per GRD.
- `GPC_NAME` → [pcf.PCF_NAME](pcf.md#pcf_name): TM-model parameters only (plf or synthetic).
- `GPC_DOMAIN` → [vdf.VDF_DOMAINID](vdf.md#vdf_domainid): Inference: the ICD does not name a target table; the domain identifier has the same range as the database domain identifier VDF_DOMAINID (§3.3.1.1, PDF p.38).

## History across ICD issues

ICD 5.1 §3.3.2.6.4 (icd-5-1-tos-gci, PDF p.54-55) has 10 fields: there is no GPC_DOMAIN and GPC_POS, although a key field, is not marked mandatory. ICD 6.0 (S2K R4.0) added the optional GPC_DOMAIN so that graphic displays can mix parameters from several domains (ICD 7.0 Annex 1, PDF p.249). ICD 6.7 Draft A (icd-6-7-drafta PDF p.109-113) and ICD 6.9 (icd-6-9-archive-org PDF p.113-117) already show the 11-field layout, which ICD 7.0 keeps (PDF p.116-120). Since SCOS-2000 R5.0 (ICD issue 6.4) display definitions are no longer kept in the run-time (POST) MIB database: the ASCII tables are converted on request into XML files stored in the FARC, in a delta fashion that keeps previously imported displays and displays created at run time with the TM Desktop editor (ICD 7.0 §2.5, PDF p.24; §3.3.2.7, PDF p.110; Annex 1, PDF p.254). The XML format is in [AD-5], SCOS-2000 TM Displays and Printout definitions Service ICD (ICD-5001), which is not in the library. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    gpc.dat is empty (0 bytes) in both Solar Orbiter releases and in the SWA IDB; the database has only a placeholder COL1 and no rows. pyscos2000 has no gpc model. GPC_POS is Number(1), so at most 10 entries (0-9) per display are possible, although a GRD holds at most 8 plots plus, for type F, an X-axis parameter. The HPSDB note (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.29-30) constrains GPC_POS to 0-7, with an NCR to allow 0-9, and writes GPC_PRCLR as 'GPC_PLCLR'.

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `gpc.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.4, PDF p. 116.
