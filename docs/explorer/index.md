---
title: MIB Explorer
description: Browse every telemetry parameter, packet, calibration, limit, telecommand and sequence of the public Solar Orbiter MIB and the SWA and STIX instrument databases, with ICD field definitions.
hide:
  - navigation
  - toc
sources: [mib-20250916m25925pfms001-sol, mib-20200416m10720pfms001-sol, swa-idb-ascii, swa-idb-v6-5-0, stix-idb-v2-26-38-raw, icd-7-0-final]
---

# MIB Explorer

Browse the real **Solar Orbiter Mission Information Base**, the SCOS-2000 database that tells the
ground segment how to decode every telemetry packet and encode every telecommand. Every
parameter, packet, APID, calibration curve, limit set, telecommand, verification stage and command
sequence has its own shareable address. Use the selector to switch between the Solar Orbiter spacecraft MIB (releases of
2025-09-16 and 2020-04-16) and two instrument databases: [SWA](../missions/solar-orbiter/swa.md) (2021 set and v6.5.0) and
[STIX](../missions/solar-orbiter/stix.md) (v2.26.38). Field names link to the [MIB table reference](../mib/tables/index.md),
and the concepts are explained in [The MIB](../mib/index.md).

<div id="osi-mib-explorer" data-base="data/" data-wiki="../"><noscript>The explorer needs JavaScript. The underlying data are plain JSON files under <code>explorer/data/</code>.</noscript></div>

<link rel="stylesheet" href="../assets/stylesheets/explorer.css">
<script src="../assets/javascripts/explorer.js" defer></script>

!!! info "Where these data come from"
    The spacecraft MIB and SWA tables come from releases posted publicly by the Solar Orbiter SWA/PAS team at IRAP
    (<https://solarorbiter.irap.omp.eu/MIB/>), copied on 2026-11-05 (SWA v6.5.0 on 2026-11-12). The STIX tables come from
    the STIX team's open directory at FHNW (<https://pub099.cs.technik.fhnw.ch/data/idb/>), copied on 2026-11-12. The banner above the results
    shows the exact release, original URL and copy time. See [Sources & copies](../about/sources-and-copies.md)
    and the library entries for the [2025-09-16 release](../library/mib-20250916m25925pfms001-sol.md),
    the [2020-04-16 release](../library/mib-20200416m10720pfms001-sol.md), the
    [SWA instrument database](../library/swa-idb-ascii.md), [SWA v6.5.0](../library/swa-idb-v6-5-0.md) and
    [STIX v2.26.38](../library/stix-idb-v2-26-38-raw.md). The data are presented as published.
    This wiki is not affiliated with ESA, the Solar Orbiter project, IRAP or FHNW.
