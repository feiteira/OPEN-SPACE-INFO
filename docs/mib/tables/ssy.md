---
title: "ssy.dat: ssy (empty in the SWA database; purpose unknown)"
description: "Not documented in any available ICD and delivered as an empty (0-byte) file in the SWA instrument database, so neither its columns nor its purpose can be inferred from data. The SQLite table has a sin"
tags: [MIB, "Solar Orbiter mission-specific tables (not in the ICD)"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# ssy.dat: ssy (empty in the SWA database; purpose unknown)

<div class="osi-chips"><span class="osi-chip warn">not defined in the ICD</span><span class="osi-chip">0 rows in Solar Orbiter 2025-09-16</span></div>

!!! warning "Inference"
    This table is not defined by the SCOS-2000 Database Import ICD. Its column meanings below were inferred from the data and are this wiki's interpretation.

Not documented in any available ICD and delivered as an empty (0-byte) file in the SWA instrument database, so neither its columns nor its purpose can be inferred from data. The SQLite table has a single placeholder column COL1 only because the file is empty; the real number of fields is unknown. It is not present in the Solar Orbiter spacecraft MIB releases examined (2020-04-16 and 2025-09-16). Any statement about its meaning would be speculation; the name could relate to synthetic or subsystem definitions, but this is not supported by any source.

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="col1"><td>1</td><td><code>COL1</code></td><td>unknown (empty file)</td><td>O</td><td>Placeholder column created for an empty file; no data, so no meaning can be inferred.<div class="osi-extra"></div></td></tr>
</tbody></table></div>

## History across ICD issues

Not part of any ICD issue nor of pyscos2000. SWA database only (empty file dated 2021-12-03).

!!! note "Notes from the extraction"
    Empty file; the solo_stats block describes the SWA instrument database (swa-idb.sqlite).

## In the Solar Orbiter MIB

The 2025-09-16 release has **0** rows in `ssy.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

