---
title: "Towards EGS-CC at ESOC (SpaceOps 2025)"
description: "A short ESOC status paper (SpaceOps 2025) on replacing SCOS-2000(../scos2000/index.md) and the rest of the MICONYS suite with an MCS based on the European Ground Systems Common Core (EGS-CC), called M"
tags: ["Paper", "ESOC evolution and context"]
sources: [spaceops2025-egs-cc]
---

# Towards EGS-CC at ESOC — A New Era for Satellite Monitoring and Control

<dl class="osi-meta"><dt>Document ID</dt><dd>SpaceOps-2025, ID # 477</dd><dt>Date</dt><dd>2025-05-26</dd><dt>Organisation</dt><dd>European Space Operations Centre, European Space Agency; 18th International Conference on Space Operations (SpaceOps 2025), Montreal, Canada, 26 - 30 May 2025</dd><dt>Authors</dt><dd>Vemund Reggestad, Klara Widegård</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>SpaceOps 2025 conference paper, ID # 477, 'Copyright 2025 by European Space Agency', published by the Canadian Space Agency on behalf of SpaceOps (PDF p. 1). The date given here is the first day of the conference. It reports the April 2024 reconfirmation that ESOC's next-generation MCS will be based on EGS-CC.</dd><dt>Pages</dt><dd>7</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://publications.spaceops.org/2025/download_by_id.php?id=0477" rel="noopener">https://publications.spaceops.org/2025/download_by_id.php?id=0477</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:29Z</dd><dt>SHA-256</dt><dd><code>23e8db0102441cfc6fa8d3bd6059f76c4424642f7d07b462163561c06f408376</code></dd><dt>Size</dt><dd>378.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/spaceops2025-egs-cc.pdf">spaceops2025-egs-cc.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short ESOC status paper (SpaceOps 2025) on replacing [SCOS-2000](../scos2000/index.md) and the rest of the MICONYS suite with an MCS based on the European Ground Systems Common Core (EGS-CC), called MCS-CC ([ancillary systems and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)). The authors give the timeline: EGS-CC is first expected to enter operations in 2026, the migration of more than 40 ESOC missions will take at least seven years, and SCOS-2000 therefore reaches end of life no earlier than 2033. In April 2024 ESOC reconfirmed that the next MCS will be EGS-CC based. Swarm (three satellites, launched 2013) was chosen as the pilot migration of a flying mission, followed by Ariel (first SVTs in 2027, launch in 2029) as the first mission to launch on EGS-CC, and later a fully TDM-native ground segment.

The most useful part for MIB readers is the **tailoring-data migration path**. Category 1 missions, such as Swarm, keep their SCOS-2000 [MIB](../mib/index.md) and the existing tools (MOIS, ProToS, MATIS, DABYS, FOPPER). OPEN-M sits in between, and an S2K-MIB-to-EGS-CC-TDM converter imports the data into the MCS. Category 2 missions (Ariel expected) migrate all tailoring data to OPEN-M with converters and drop the MIB-based tools. Category 3 missions receive data from industry directly in the EGS-CC Tailoring Data Model. The paper also discusses the challenges: a new archive that must hold frames, packets, parameters, events, logs, alarm states and activities efficiently, an extensive test campaign, and user-interface issues in a large community. Recent Swarm-driven work covers pre-release checks in the commanding chain, playback TM, a user interface for SLE links, historical retrieval, a refurbished [time correlation](../scos2000/time-correlation.md) and on-board queue modelling. The next features are file-based operations, on-board software maintenance, security and [PUS-C](../ecss/pus/pus-a-vs-pus-c.md), with an operational solution targeted for 2027.


## Key points

- SCOS-2000 and complementary systems form the MICONYS (MIssion CONtrol sYStem) suite at ESOC; in April 2024 ESOC re-confirmed that the next generation MCS will be based on EGS-CC. *(PDF p. 1)*
- The transition is predicted to take at least 7 years from EGS-CC first entering operations in 2026, putting the SCOS end of life no earlier than 2033; more than 40 missions at ESOC are involved. *(PDF p. 2)*
- Expected benefits include a common data model for TM/TC artefacts across pre- and post-launch phases, a common code base for ESOC missions, a common solution for MCS and ground station M&C, native automation and installation-free web access. *(PDF p. 3)*
- Swarm (three satellites launched in 2013 to study Earth's magnetic field) is the pilot mission, allowing a risk-free transition while the S2K system remains available. *(PDF p. 4)*
- Adoption phases: design and development (largely completed), testing and validation (migrate Swarm, prepare Ariel with first SVTs in 2027 and launch in 2029, then a TDM-native ground segment) and operational roll-out, expected to complete in the early 2030s. *(PDF p. 4)*
- Category 1 missions natively use an S2K MIB (e.g. Swarm) with S2K tools such as MOIS, ProToS, MATIS, DABYS and FOPPER; OPEN-M is the intermediate and an S2K MIB to EGS-CC TDM converter imports the tailoring data into the MCS. *(PDF p. 5)*
- Category 2 missions (Ariel expected, to be confirmed) migrate all tailoring data to OPEN-M using converters for the S2K MIB, MOIS and ProToS procedures and the FOPPER database; Category 3 missions receive tailoring data directly in EGS-CC TDM format from industry. *(PDF p. 5)*
- The EGS-CC archive must store telemetry frames, packets, parameters, events, log messages, alarm states and control activities while balancing storage speed and volume against retrieval performance. *(PDF p. 6)*
- Recent Swarm-driven enhancements: commanding chain pre-release checks, playback TM processing, a UI for SLE links, historical data retrieval, refurbished time correlation and on-board queue modelling, delivered partly in EGS-CC and partly in the MCS-CC layer. *(PDF p. 6)*
- Next features: file based operations, on-board software maintenance, security and PUS-C including support for the Generic Operational Interface Requirements; validation through most of 2026 towards a fully operational solution in 2027. *(PDF p. 6)*


## Cited by these wiki pages (6)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [Missions](../missions/index.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (13 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract and Acronyms/Abbreviations | 1 |
    | 1 | Introduction | 2 |
    | 1 | The Need for Transition | 2 |
    | 1 | Benefits of EGS-CC Integration | 2 |
    | 1 | Major Milestone: Confirmation of EGS-CC | 3 |
    | 1 | Focus on SWARM Mission | 4 |
    | 2 | Adoption at ESOC | 4 |
    | 2 | Path towards an EGS-CC TDM based operations | 4 |
    | 2 | Challenges and Solutions | 6 |
    | 2 | Recent activities | 6 |
    | 2 | Way Forward | 6 |
    | 3 | Conclusion | 7 |
    | Acknowledgements | Acknowledgements | 7 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| S2K MIB | [catalogue](../references/index.md#ref-scos-2000-mib-format-s2k-mib-database) | SCOS-2000 MIB format (S2K MIB database) |  | mentioned |
| EGS-CC TDM | [catalogue](../references/index.md#ref-tailoring-data-model-tdm-of-egs-cc) | Tailoring Data Model (TDM) of EGS-CC |  | mentioned |
| PUS-C | [catalogue](../references/index.md#ref-pus-c) | PUS-C |  | mentioned |
| GOIR | [catalogue](../references/index.md#ref-generic-operational-interface-requirements) | Generic Operational Interface Requirements |  | mentioned |
| SLE | [catalogue](../references/index.md#ref-space-link-extension-sle) | Space Link Extension (SLE) |  | mentioned |

!!! note "Notes"
    The paper has no reference list; the 'Acknowledgements' heading on PDF p. 7 is empty. Author e-mail addresses are omitted here. The acronym list expands the TDM as 'Tailoring Data Model (TMD)' (typo) and MIB as 'Mission Information Database'. The text refers to 'categories shown in Figure 2' where Figure 3 (data model categorisation) is meant. Figures 1-4 (transition simulation, common code base, data model categorisation, Swarm tailoring data process) are images without extracted text. The extraction reports 8 PDF pages (registry: 7); the last is empty. Vemund Reggestad is also a co-author of library item gsaw2005-guerrucci, and Klara Widegård of airdrive-b8b986f.

