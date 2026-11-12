---
title: "Happy Families: mission families and the delta approach"
description: "An eight-page ESA Bulletin article (May 2007) by ESOC's Ground System Engineering and Mission Operations departments explaining how ESA reduced the cost and risk of mission control systems (MCS) and o"
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [bul130-merri-happy-families]
---

# Happy Families: Cutting the Cost of ESA Mission Ground Software

<dl class="osi-meta"><dt>Document ID</dt><dd>esa bulletin 130</dd><dt>Date</dt><dd>2007-05</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (Directorate of Operations and Infrastructure)</dd><dt>Authors</dt><dd>Mario Merri, Alessandro Ercolani, Damiano Guerrucci, Vemund Reggestad, David Verrier, Pier Paolo Emanuelli, Paolo Ferri</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Published magazine article (esa bulletin 130, May 2007, printed pages 62-69).</dd><dt>Pages</dt><dd>8</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.esa.int/esapub/bulletin/bulletin130/bul130g_merri.pdf" rel="noopener">https://www.esa.int/esapub/bulletin/bulletin130/bul130g_merri.pdf</a></dd><dt>Retrieved via</dt><dd><a href="http://web.archive.org/web/20250817093510id_/https://www.esa.int/esapub/bulletin/bulletin130/bul130g_merri.pdf" rel="noopener">Internet Archive snapshot</a> (the original URL no longer served the file)</dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:10:17Z</dd><dt>SHA-256</dt><dd><code>9779ffbdbc11e63f6f08d4bc1fcdccd4e30cff159cf0f4d75e0df4eee1eb06f0</code></dd><dt>Size</dt><dd>1.8 MB</dd><dt>Our copy</dt><dd><a href="../third-party/core/bul130-merri-happy-families.pdf">bul130-merri-happy-families.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An eight-page ESA Bulletin article (May 2007) by ESOC's Ground System Engineering and Mission Operations departments explaining how ESA reduced the cost and risk of mission control systems (MCS) and operational simulators. It summarises the lineage of ESOC infrastructure software, from the Multi-Satellite Support System (1970s) through the first SCOS (mid-1980s) to SCOS-2000 (late 1990s) and the SIMSAT simulator kernel, now gathered in the ESA Ground Operations Software (EGOS), and describes what an MCS and an operational simulator do.

The core idea is the 'mission family': missions with common platforms or operational profiles (interplanetary, Earth observation, observatory, navigation). Ground software is built in layers, each defined only by its differences ('deltas') from the layer below: generic infrastructure software, a family kernel, and a thin mission-specific layer. Requirements documents shrink to delta requirements. The interplanetary family (Rosetta, Mars Express, Venus Express, with BepiColombo and Solar Orbiter to join) used a two-layer MCS, one system reconfigured for the three missions; the Earth observation family (CryoSat, GOCE, Aeolus) added a self-standing Earth Observation Mission Kernel. The article reports quick migrations of the Rosetta and Mars Express systems to a new kernel, combined maintenance by one team, reuse of simulator models through the Simulator Model Portability (SMP) standard, and charts of falling development costs.

For an engineer it explains why SCOS-2000-based missions share so much configuration and code, and it places Solar Orbiter in the interplanetary family from the start.


## Key points

- ESOC's first reusable infrastructure software was the Multi-Satellite Support System (MSSS), developed in the 1970s and used for over 20 years; the first SCOS generation followed in the mid-1980s and SCOS-2000 in the late 1990s. *(PDF p. 3)*
- EGOS (ESA Ground Operations Software) covers mission control, simulator infrastructure and ground station back-end software, with SIMSAT and SCOS-2000 as cornerstones; Linux is the operating system of choice for simulators and MCS. *(PDF p. 3)*
- The MCS verification and validation extends to the operational data that configure it, including the database describing the spacecraft telemetry and command data. *(PDF p. 4)*
- Mission families in use at ESOC: interplanetary, Earth observation, observatory and navigation. *(PDF p. 4)*
- The interplanetary family comprises Rosetta, Mars Express and Venus Express; BepiColombo (launch in 2013) and Solar Orbiter (launch in 2015) were under preparation to join it. *(PDF p. 5)*
- Interplanetary operations need allowance for long signal delays in telecommand verification and telemetry time-stamping, file-transfer commanding protocols, and parallel real-time and playback telemetry streams. *(PDF p. 5)*
- Within the Earth observation family on-board time is managed differently: CryoSat uses DORIS beacons, GOCE a simple counter synchronised by ground, and Aeolus a GPS receiver in addition to its counter. *(PDF p. 5)*
- The delta approach uses three layers: infrastructure software reused across families, a family kernel reused within a family, and a mission-specific layer; requirements migrate downwards under a control board. *(PDF p. 6)*
- The interplanetary MCS used a two-layer approach, giving a single system usable for the three missions by reconfiguration; the Earth observation MCS used three layers with an Earth Observation Mission Kernel. *(PDF p. 7)*
- Venus Express was based on SCOS-2000 version 3.1 while Rosetta and Mars Express stayed on the previous version; Rosetta then migrated to the new interplanetary kernel in a few months and Mars Express in a few weeks. *(PDF p. 8)*
- Common tools for spacecraft checkout and operations preparation promote a seamless transition from manufacture to operations, as exploited by Herschel and Planck. *(PDF p. 7)*


## Cited by these wiki pages (9)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Missions](../missions/index.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (15 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title page | 1 |
    |  | Introduction | 2 |
    |  | The Mission Control System (MCS) | 3 |
    |  | The Operational Simulator | 4 |
    |  | The ESOC Infrastructure Software | 4 |
    |  | Mission Families | 4 |
    |  | The interplanetary mission family | 5 |
    |  | The Earth observation mission family | 5 |
    |  | The Delta Approach | 6 |
    |  | Requirements engineering | 6 |
    |  | The rest of the lifecycle | 6 |
    |  | The delta approach in practice | 7 |
    |  | Benefits for the infrastructure software | 7 |
    |  | Cost, schedule, quality and risk | 8 |
    |  | Conclusions | 8 |


## Documents this one references (1)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-simulator-model-portability-smp-standard) | Simulator Model Portability (SMP) standard |  | mentioned |

!!! note "Notes"
    PDF p. 1 is the title spread (printed p. 62); printed pages 62-69 map to PDF pp. 1-8 (PDF p. 9 empty). The text layer has letter-spacing artefacts ('O p e rating') and interleaved columns; figures (MCS diagram, layer diagrams, apportioned-requirement and cost charts) survive only as captions. Running header 'Merri 21-05-2007 15:35 Pagina 62'. No reference list.

