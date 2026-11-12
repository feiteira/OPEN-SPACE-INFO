---
title: "OPEN: community preparation environment for EGS-CC"
description: "A five-page ESOC paper presenting OPEN (the 'OPEN Preparation Environment'), ESA's software framework for preparing the tailoring data of systems built on the European Ground Systems Common Core (EGS-"
tags: ["Paper", "MIB / Database Import ICD"]
sources: [open-a-community-based-preparation-environment-for-egs-cc-based-system]
---

# OPEN: A community based preparation environment for EGS-CC based systems

<dl class="osi-meta"><dt>Date</dt><dd>2019-03</dd><dt>Organisation</dt><dd>European Space Agency, European Space Operations Centre (ESOC)</dd><dt>Authors</dt><dd>François Trifin, Anthony Walsh</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Paper for the Workshop on Simulation and EGSE for Space Programmes (SESP), 26-28 March 2019, ESA-ESTEC, Noordwijk (PDF p. 1). The implementation status is given as of February 2019 (PDF p. 4).</dd><dt>Pages</dt><dd>5</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://airdrive.eventsair.com/eventsairwesteuprod/production-atpi-public/9b8b0b7055934fe0b6c90f1f7aa8a1d9" rel="noopener">https://airdrive.eventsair.com/eventsairwesteuprod/production-atpi-public/9b8b0b7055934fe0b6c90f1f7aa8a1d9</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:16Z</dd><dt>SHA-256</dt><dd><code>34f13c2f1d63a32f6f84c3618c87829699ee8ac781a18462b7a84092329265d6</code></dd><dt>Size</dt><dd>64.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/open-a-community-based-preparation-environment-for-egs-cc-based-system.pdf">open-a-community-based-preparation-environment-for-egs-cc-based-system.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A five-page ESOC paper presenting OPEN (the 'OPEN Preparation Environment'), ESA's software framework for preparing the tailoring data of systems built on the European Ground Systems Common Core (EGS-CC). It is the third in a series by the same authors, after their SESP 2017 and SpaceOps 2018 papers, and focuses on the community and licensing model rather than on functions.

OPEN has two layers. The OPEN layer provides generic data-management services (access control, version control, reporting, consistency checking, scripting, compare and merge, and model visualisation) on the Eclipse Rich Client Platform and the Eclipse Modeling Framework, and knows nothing of EGS-CC except the Configuration Item concept. The OPEN-CC layer adds EGS-CC-aware functions on top of the EGS-CC Conceptual Data Model (CDM). Products built on it are OPEN-M (mission operations preparation for ESOC flight control teams, part of MICONYS-CC), OPEN-S (ground station M&C preparation for GSMC-CC), OPEN-D (EGS-CC system configuration data) and ESTEC's Mission Model Editor (MME) for AIT engineers.

For MIB readers, the key point is that OPEN-M includes a converter from the SCOS-2000 MIB (ICD 6.9) to the EGS-CC CDM. The paper calls the EGS-CC model semantically richer, and the converter was being validated with data from BepiColombo, ExoMars TGO, Gaia, JUICE and the Sentinels. The paper also explains the ESA Community License with weak copyleft, which allows proprietary extensions, the restriction of redistribution to ESA Member States, the start of development in 2017 with several contractors, and the plan to be fit for operational use by 2020.


## Key points

- OPEN was already used at ESTEC and ESOC on three ESA projects and is the backbone of the MME (AIT engineers), OPEN-M (ESOC flight control teams on EGS-CC based mission control systems) and OPEN-S (ESOC ground station operators). *(PDF p. 1)*
- Generic OPEN services include access control, version control, reporting, consistency checking, scripting, data compare and merging, plus editors and browsers tailored to the EGS-CC monitoring and control models. *(PDF p. 1)*
- The OPEN layer is built on the Eclipse Rich Client Platform and Eclipse Modeling Framework, has no dependency on OPEN-CC or EGS-CC and, apart from the Configuration Item concept, is agnostic to EGS-CC concepts. *(PDF p. 2)*
- OPEN's source code does not include the EGS-CC Conceptual Data Model; the CDM is defined by the EGS-CC LDM library supplied with the EGS-CC binaries, and any EMF-compatible model or CDM extension can be loaded. *(PDF p. 2)*
- OPEN's non-graphical model visualisation fully replaces the HTML EGS-CC Reference Manual for Data Model. *(PDF p. 3)*
- OPEN-M is the preparation environment product of MICONYS-CC; OPEN-S prepares the GSMC-CC adaptation layer to ground station subsystems; OPEN-D manages EGS-CC system configuration data. *(PDF p. 3)*
- OPEN-M includes a converter from SCOS-2000 MIB 6.9 to the EGS-CC Conceptual Data Model, validated with BepiColombo, ExoMars Trace Gas Orbiter, Gaia, JUICE and Sentinel data. *(PDF p. 3)*
- OPEN and OPEN-M are licensed under the ESA Community License with Weak Copyleft; extensions may be proprietary, and redistribution outside ESA Member States requires authorisation by ESA's Technology Transfer Board. *(PDF p. 4)*
- Implementation of OPEN, OPEN-M and OPEN-S started in 2017 with more than six companies under ESA lead; JUICE and Sentinel flight control engineers were the first OPEN-M users, and OPEN-M was to be fit for operational use by 2020. *(PDF p. 4)*
- Next extensions foreseen: User Defined Display editors, management of constellations and management of the EGS-CC System Configuration. *(PDF p. 5)*


## Cited by these wiki pages (2)

- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (12 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Introduction | 1 |
    |  | Context | 1 |
    |  | OPEN - The Framework | 2 |
    |  | OPEN - The Tailoring Data Tool | 2 |
    |  | OPEN - The Model Visualisation Tool | 2 |
    |  | OPEN - The Basis for a Collection of Harmonised Tools | 3 |
    |  | OPEN-M - A Data Converter from SCOS-2000 to EGS-CC | 3 |
    |  | Raising the Software Stack - A Market Opportunity | 3 |
    |  | Community | 4 |
    |  | Implementation Status | 4 |
    |  | Call for Interest and Participation | 5 |
    |  | References | 5 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [catalogue](../references/index.md#ref-objectives-and-concepts-of-the-european-ground-systems-common-core-egs-cc) | Objectives and Concepts of the European Ground Systems Common Core (EGS-CC) | SESP 2012, Noordwijk (M. Pecchioli et al.) 2012 | bibliography |
| [2] | [catalogue](../references/index.md#ref-the-egs-cc-based-mission-control-infrastructure-at-esoc) · [library](pecchioli-egs-cc-esoc.md) | The EGS-CC based Mission Control Infrastructure at ESOC | SESP 2017, Noordwijk (M. Pecchioli, A. Walsh) 2017 | bibliography |
| [3] | [catalogue](../references/index.md#ref-the-next-generation-mission-operations-preparation-environment-at-esoc) · [library](1400-trifin-paper.md) | The Next Generation Mission Operations Preparation Environment at ESOC | SESP 2017, Noordwijk (F. Trifin, A. Walsh) 2017 | bibliography |
| [4] | [catalogue](../references/index.md#ref-monitoring-and-control-operations-preparation-framework-for-egs-cc-based-environ) | Monitoring and Control Operations Preparation Framework for EGS-CC Based Environments | SpaceOps 2018, Marseille (F. Trifin, A. Walsh) 2018 | bibliography |
| [5] | [catalogue](../references/index.md#ref-about-the-linux-foundation) | About The Linux Foundation | The Linux Foundation, retrieved 2019-02-01 2019-02-01 | bibliography |
| [6] | [catalogue](../references/index.md#ref-industry-leaders-announce-open-platform-for-mobile-devices) | Industry Leaders Announce Open Platform for Mobile Devices | Open Handset Alliance 2007-11-05 | bibliography |
| [7] | [catalogue](../references/index.md#ref-eclipse-forms-independent-organization) | Eclipse Forms Independent Organization | Press Release, archived 2004-04-07 2004-02-04 | bibliography |
|  | [ESA Community License v2.3 Type 3 (Weak Copyleft)](../references/index.md#ref-esa-community-license-v2-3-type-3-weak-copyleft) | ESA Community License with Weak Copyleft | v2.3 | mentioned |
|  | [SCOS-2000 MIB 6.9](../references/index.md#ref-scos-2000-mib-6-9) | SCOS-2000 MIB (Database Import ICD issue 6.9) | 6.9 | mentioned |

!!! note "Notes"
    Clean text-based PDF (5 pages; the text extraction shows a sixth, empty page). The authors' e-mail addresses on PDF p. 1 are omitted. Reference [3] is in the library as 1400-trifin-paper (SESP 2017) and reference [2] as pecchioli-egs-cc-esoc. A 2015 SESP presentation on HPSDB and EGS-CC is in the library as 02-sesp-2015-from-hpsdb-to-egs-cc-presentation. The MIB 6.9 converter refers to the SCOS-2000 Database Import ICD issue 6.9, held as icd-6-9-archive-org. The text contains typos ('cfoster', 'ModelingModelling', 'Rick Client Platform'). The source URL is an anonymous airdrive.eventsair.com object; the workshop name and date are printed on the first page.

