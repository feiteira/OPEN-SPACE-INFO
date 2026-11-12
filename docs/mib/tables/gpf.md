---
title: "gpf.dat: Graphic displays"
description: "The gpf table lists the Graphic Displays (GRDs), the SCOS-2000 telemetry plots, one record per graphical display. Each record gives the screen layout (full, half, quarter or sliced screen, with at mos"
tags: [MIB, "Displays"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# gpf.dat: Graphic displays

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.2.7.3</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

The gpf table lists the Graphic Displays (GRDs), the SCOS-2000 telemetry plots, one record per graphical display. Each record gives the screen layout (full, half, quarter or sliced screen, with at most 8 plots), the header line, whether the plot scrolls when it reaches the end of the plot area, whether a hardcopy is produced automatically at the end of the plot area, the time span of the X axis (days, hours, minutes; for parameter-against-parameter plots this sets the display duration), the colour of axes, ticks and grids, and the number of tick and grid intervals on each axis. The parameters plotted and their scaling are defined in gpc. The ICD remarks that gpf and gpc are not imported into the SCOS-2000 database but are read directly by SCOS-2000 applications, and from R5.0 display definitions are converted into XML files in the FARC. The update-rate field exists only for external applications and is not used by SCOS-2000.[^icd]

**Key:** `GPF_NUMBE`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="gpf_numbe"><td>1</td><td><code>GPF_NUMBE</code></td><td>Char(8)</td><td>M</td><td>Name of the Graphical Display (GRD): alphanumeric string that uniquely identifies it; referenced by gpc.GPC_NUMBE.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 114</span></div></td></tr>
<tr id="gpf_type"><td>2</td><td><code>GPF_TYPE</code></td><td>Char(1)</td><td>M</td><td>Screen layout of the graphic display. The number of plots per screen portion is a maximum, currently 8 in total. The type also determines the allowed plot-area codes in GPC_WHERE.<ul class="osi-vals"><li><code>F</code> Full screen: up to 8 plots against time or against another parameter</li><li><code>H</code> Half screen: 2 areas of 4 plots</li><li><code>Q</code> Quarter screen: 4 areas of 2 plots</li><li><code>S</code> Sliced screen: 8 areas of 1 plot</li></ul><div class="osi-extra"> <span class="osi-pg">ICD PDF p. 114</span></div></td></tr>
<tr id="gpf_head"><td>3</td><td><code>GPF_HEAD</code></td><td>Char(32)</td><td>O</td><td>Alphanumeric header shown on the top line of the display.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 114</span></div></td></tr>
<tr id="gpf_scrol"><td>4</td><td><code>GPF_SCROL</code></td><td>Char(1)</td><td>O</td><td>Controls whether the display scrolls when the plot reaches the end of the plot area(s). It has no meaning for parameters plotted against spin phase or against another parameter.<ul class="osi-vals"><li><code>Y</code> Scroll</li><li><code>N</code> Do not scroll</li></ul><div class="osi-extra">Default <code>N</code>. <span class="osi-pg">ICD PDF p. 115</span></div></td></tr>
<tr id="gpf_hcopy"><td>5</td><td><code>GPF_HCOPY</code></td><td>Char(1)</td><td>O</td><td>Controls the automatic hardcopy (print) when the end of the plot area is reached.<ul class="osi-vals"><li><code>Y</code> Automatic hardcopy</li><li><code>N</code> No automatic hardcopy</li></ul><div class="osi-extra">Default <code>N</code>. <span class="osi-pg">ICD PDF p. 115</span></div></td></tr>
<tr id="gpf_days"><td>6</td><td><code>GPF_DAYS</code></td><td>Number(2)</td><td>M</td><td>Number of days in the X-axis time span; for parameter-against-parameter displays it sets the duration of the display. Integer 0 to 99.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 115</span></div></td></tr>
<tr id="gpf_hours"><td>7</td><td><code>GPF_HOURS</code></td><td>Number(2)</td><td>M</td><td>Number of hours in the X-axis time span (or display duration for parameter-against-parameter plots). Integer 0 to 23.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 115</span></div></td></tr>
<tr id="gpf_minut"><td>8</td><td><code>GPF_MINUT</code></td><td>Number(2)</td><td>M</td><td>Number of minutes in the X-axis time span (or display duration for parameter-against-parameter plots). Integer 0 to 59.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 115</span></div></td></tr>
<tr id="gpf_axclr"><td>9</td><td><code>GPF_AXCLR</code></td><td>Char(1)</td><td>M</td><td>Colour of the axes, ticks and grids.<ul class="osi-vals"><li><code>1</code> Green</li><li><code>2</code> Blue</li><li><code>3</code> Cyan</li><li><code>4</code> Red</li><li><code>5</code> Yellow</li><li><code>6</code> Magenta</li><li><code>7</code> White</li></ul><div class="osi-extra"> <span class="osi-pg">ICD PDF p. 116</span></div></td></tr>
<tr id="gpf_xtick"><td>10</td><td><code>GPF_XTICK</code></td><td>Number(2)</td><td>M</td><td>Number of intervals between ticks on the X axis. Integer 1 to 99.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 116</span></div></td></tr>
<tr id="gpf_ytick"><td>11</td><td><code>GPF_YTICK</code></td><td>Number(2)</td><td>M</td><td>Number of intervals between ticks on the Y axis. Integer 1 to 99.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 116</span></div></td></tr>
<tr id="gpf_xgrid"><td>12</td><td><code>GPF_XGRID</code></td><td>Number(2)</td><td>M</td><td>Number of intervals between grid lines on the X axis. Integer 1 to 99.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 116</span></div></td></tr>
<tr id="gpf_ygrid"><td>13</td><td><code>GPF_YGRID</code></td><td>Number(2)</td><td>M</td><td>Number of intervals between grid lines on the Y axis. Integer 1 to 99.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 116</span></div></td></tr>
<tr id="gpf_upun"><td>14</td><td><code>GPF_UPUN</code></td><td>Number(2)</td><td>O</td><td>Display update rate in seconds, integer 1 to 99. Provided for external applications that read the database; not used by SCOS-2000.<div class="osi-extra"> <span class="osi-pg">ICD PDF p. 116</span></div></td></tr>
</tbody></table></div>

## Relationships

- `GPF_NUMBE` → [gpc.GPC_NUMBE](gpc.md#gpc_numbe): One GRD has many gpc records (one per plotted parameter).
- `GPF_TYPE` → [gpc.GPC_WHERE](gpc.md#gpc_where): The display type determines the valid plot-area identifiers in gpc.

## History across ICD issues

ICD 5.1 §3.3.2.6.3 (icd-5-1-tos-gci, PDF p.52-53) has the same 14 fields, but GPF_MINUT is a fractional number 0.0-59.9 (0.1 meaning a 6-second X axis when days and hours are 0) and GPF_UPUN is an update rate in milliseconds with no range. ICD 6.7 DCR S2K-DCR-5502 made GPF_MINUT an integer 0-59 and asked to clarify the unit and size of GPF_UPUN/SPF_UPUN (ICD 7.0 Annex 1, PDF p.258-259; the annex misspells the field as 'GFP_UPUN'). ICD 6.7 Draft A (icd-6-7-drafta PDF p.107-109), ICD 6.9 (icd-6-9-archive-org PDF p.111-113) and ICD 7.0 (PDF p.114-116) all print the integer GPF_MINUT and UPUN in seconds, range 1-99. Since SCOS-2000 R5.0 (ICD issue 6.4) display definitions are no longer kept in the run-time (POST) MIB database: the ASCII tables are converted on request into XML files stored in the FARC, in a delta fashion that keeps previously imported displays and displays created at run time with the TM Desktop editor (ICD 7.0 §2.5, PDF p.24; §3.3.2.7, PDF p.110; Annex 1, PDF p.254). The XML format is in [AD-5], SCOS-2000 TM Displays and Printout definitions Service ICD (ICD-5001), which is not in the library. Not modelled in pyscos2000 (7.2).

!!! note "Notes from the extraction"
    gpf.dat is present but empty (0 bytes) in the 2025-09-16 and 2020-04-16 Solar Orbiter releases and in the SWA IDB, so the database holds only a placeholder column COL1 and no rows. pyscos2000 has no gpf model. ICD 7.0 lists GPF_DAYS/HOURS/MINUT, axis colour and the tick/grid counts as mandatory even though most display tools could supply defaults. The HPSDB note (h-p-1-asp-tn-1060-mib-processing-hpsdb, PDF p.29) forbids real values in GPF_MINUT (range 00-59), ignores GPF_UPUN, and lists the header as 'DPF_HEAD' (a copy error).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `gpf.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.2.7.3, PDF p. 114.
