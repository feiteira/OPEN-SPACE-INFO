---
title: "Operations preparation when moving to EGS-CC (SpaceOps 2023)"
description: "A SpaceOps 2023 paper from RHEA Group on how operations-preparation tooling can ease a mission's move from SCOS-2000(../scos2000/index.md) to EGS-CC(../scos2000/ancillary-and-egs-cc.md)."
tags: ["Paper", "ESOC evolution and context"]
sources: [spaceops-0415-challenges-in-operations-preparations-when-transit]
---

# Challenges in Operations Preparations when transitioning to EGS-CC based systems

<dl class="osi-meta"><dt>Document ID</dt><dd>SpaceOps-2023, ID # 415</dd><dt>Date</dt><dd>2023-03</dd><dt>Organisation</dt><dd>RHEA Group, Darmstadt; presented at the 17th International Conference on Space Operations (SpaceOps 2023), Dubai, United Arab Emirates, 6 - 10 March 2023</dd><dt>Authors</dt><dd>Wolfgang Heinen, Steve Pearson, Pablo Beltrami, Alastair Pidgeon</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper, 'Copyright ©2023 by RHEA Group', published by MBRSC on behalf of SpaceOps (PDF p. 1).</dd><dt>Pages</dt><dd>13</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://publications.spaceops.org/2023/download_by_id.php?id=0415" rel="noopener">https://publications.spaceops.org/2023/download_by_id.php?id=0415</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:18Z</dd><dt>SHA-256</dt><dd><code>247df93f9ce3fe66766e192453c5325b4b7499cc7783c59edbdc64cfa25d7fe0</code></dd><dt>Size</dt><dd>1.3 MB</dd><dt>Our copy</dt><dd><a href="../third-party/context/spaceops-0415-challenges-in-operations-preparations-when-transit.pdf">spaceops-0415-challenges-in-operations-preparations-when-transit.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A SpaceOps 2023 paper from RHEA Group on how operations-preparation tooling can ease a mission's move from [SCOS-2000](../scos2000/index.md) to [EGS-CC](../scos2000/ancillary-and-egs-cc.md). It starts from the observation that migrating control systems means retesting, a learning curve and loss of knowledge. It introduces RHEA's component-based ASTRAL ground segment offering (Prepare, Plan, Schedule, Automate, Control, Orbit, etc.), in which ASTRAL-Control runs on either SCOS-2000 or EGS-CC and ASTRAL-Prepare is the successor of RHEA's MOIS.

The technical core covers three parts. First, the ASTRAL-Prepare plug-in data model (data types, common and specific properties, consistency checks, product generation and publication). Second, the **Mission Model Editor (MME)**, now part of EGS-CC, which presents the EGS-CC Technical Data Model (TDM) as a tree of packets, parameters and procedures with one M&C element per configuration item. MME extends ESA's OPEN framework and so inherits its SCOS-2000 [MIB](../mib/index.md) importer. Third, the **Procedure Model Editor (PME)**, built on an Extensible Procedure Model (XPM) of steps, statements and branching. The XPM is exposed through an Xtext DSL (PDSL), with Groovy expressions and a Sirius flowchart view, and can be exported to EGS-CC activity lists, SCOS-2000 MIB [command sequences](../mib/sequences.md) or other operations languages, or executed directly. Client-server data and automation servers use EGS-CC (and possibly SCOS-2000) adapters, and ASTRAL-Schedule can run legacy MOIS Writer and PME procedures in the same plan.

The transition scenarios are: convert Writer procedures to PDSL, phase PME in alongside Writer on SCOS-2000, then convert the MIB to the TDM with the MME's MIB importer and check the whole procedure set in an SVN-backed sandbox. See [operations preparation](../scos2000/operations-preparation.md).


## Key points

- EGS-CC consists of a core and a reference implementation, and one concrete system is the EGSE Reference Facility (ERF), maintained by ESTEC. The paper states that EGS-CC is replacing the legacy SCOS-2000 mission control system. *(PDF p. 1)*
- For ESA mission operations, EGOS-CC tailors EGS-CC by integrating existing ESOC tools. Operators may have legacy procedures and spacecraft databases based on the SCOS-MIB that they want to reuse with EGS-CC. *(PDF p. 1)*
- ASTRAL-Prepare is the latest evolution of RHEA's MOIS, which has supported over 100 spacecraft. ASTRAL-Control has been deployed with ESA's Community Source SCOS-2000 and also supports EGS-CC. *(PDF p. 2)*
- Data types already implemented in ASTRAL-Prepare include OBCPs, mission planning rules, PLUTO scripts, Writer procedures and Word documents, and Synthetic-S2K scripts. *(PDF p. 4)*
- The MME is an editor for EGS-CC Technical Data Model (TDM) data. It enforces one M&C element per configuration item file so that sub-trees can be maintained independently. It extends ESA's OPEN framework and thereby benefits from its SCOS-2000 MIB importer. *(PDF p. 4)*
- PME procedures can generate EGS-CC activity lists and SCOS-MIB sequences (linear command sequences without logic), and executable artefacts such as OBCPs in OL, Tcl/TOPE automation and SPELL. *(PDF p. 5)*
- The minimal XPM has Procedure, Steps (with optional precondition and confirmation) and Statements for branching (SelectCase, ForEach, For, While, If), control (synchronise, set variable, prompt, log) and execution (execute activity/TC, check state, wait for state or event, expect packet, set monitoring). *(PDF p. 6)*
- PDSL is an Xtext grammar over an EMF model. Boolean and arithmetic expressions are delegated to Groovy (Python also possible), and procedures can be debugged step by step in the editor. The PME currently supports two DSLs: one for AIT test procedures and one for ESOC flight control procedures. *(PDF p. 7)*
- For SCOS-2000 automation with PME, no SCOS-2000 adapter is needed in the procedure data server: the MME handles MIB import and the SCOS-2000 automation server needs no MIB access. *(PDF p. 9)*
- The Scheduler has been used at ESOC for many years to run Writer procedures with SCOS-2000 via the Writer Automation Server, and now also controls PME procedures, so both can run in one plan. *(PDF p. 10)*
- The SCOS-2000 baseline procedure format is stored in a per-procedure database, edited in the forms-based Writer (using MS Excel for visualisation) and a flowchart editor. Some ESOC missions automate routine pass operations with Writer procedures and the MOIS Scheduler, and an event monitor starts contingency recovery procedures on known events. *(PDF p. 12)*
- When moving to EGS-CC, the SCOS MIB is replaced by the EGS-CC TDM. MIB data is converted with the MME's MIB importer, import problems are flagged in the MME, and PME procedures need no conversion. *(PDF p. 13)*


## Cited by these wiki pages (3)

- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (18 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract | 1 |
    | 1 | Introduction | 1 |
    | 2 | ASTRAL Overview | 2 |
    | 3 | Technical Overview for the new generation editors in ASTRAL-Prepare | 3 |
    | 3.1 | The ASTRAL-Prepare Framework | 3 |
    | 3.2 | The Mission Model Editor (MME) | 4 |
    | 3.3 | The Procedure Model Editor (PME) – the new ASTRAL-Prepare Procedure Editor | 5 |
    | 3.3.1 | The Extensible Procedure Model | 6 |
    | 3.4 | The ASTRAL Procedure Data and Automation Servers | 8 |
    | 3.4.1 | Client server architecture for the data access – the ASTRAL Procedure Data Server | 8 |
    | 3.4.2 | Client server architecture for automation – the ASTRAL Procedure Automation Server | 9 |
    | 3.5 | The ASTRAL-Schedule application | 10 |
    | 4 | The Transitioning Scenarios | 12 |
    | 4.1 | Data Conversion | 12 |
    | 4.2 | Phasing-in PME procedures for SCOS | 12 |
    | 4.3 | Moving from SCOS to EGS-CC | 13 |
    | 5 | Conclusion | 13 |
    | 6 | References | 13 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [SpaceOps-2021,4,x1341](../references/index.md#ref-spaceops-2021-4-x1341) | FAVOUR – A new generation of editors for the EGS-CC, Wolfgang Heinen, Steve Pearson, Francesco Sgaramella | 2021 | bibliography |
| [2] | [SpaceOps-2023, ID #292](../references/index.md#ref-spaceops-2023-id-292) | Multi-Mission Spacecraft Operations by a single operator with minimal impact on science return, M. Edirimanne, E. Coe, M. Kirsch, D. Webert, I. Benson, T. Godard, U. Weissmann | 2023 | bibliography |
| [3] | [ESAW-2021, B5](../references/index.md#ref-esaw-2021-b5) | PME – A New Lightweight Procedure Management Environment for future Ground Segments, W. Heinen, S. Pearson | 2021 | bibliography |
| [4] | [catalogue](../references/index.md#ref-spaceops-2018-the-new-generation-toolset-providing-comprehensive-support-for-mis) | SpaceOps-2018, The New-Generation Toolset Providing Comprehensive Support for Mission Operations Preparation and Validation, S. Reid, W. Heinen, S. Pearson | 2018 | bibliography |
| [5] | [catalogue](../references/index.md#ref-spaceops-2016-new-generation-mission-operations-preparation-framework-w-heinen-s) | SpaceOps-2016, New Generation Mission Operations Preparation Framework, W. Heinen, S. Reid, S. Pearson | 2016 | bibliography |

!!! note "Notes"
    There are 13 numbered pages; the extraction reports 14 PDF pages, the last one empty. Figures 1-11 (ASTRAL components, editors, supervisor, server components, scheduler) are images or diagrams, and only their labels and captions survive. The author block prints e-mail addresses, which are omitted here. The abstract expands EGS-CC as 'European Ground Segment Common Core', whereas other library sources use 'European Ground Systems Common Core'. Typos as printed: 'under-friendly' (for user-friendly, PDF p. 1), 'ExcuteActivity', 'SetMontoring' (PDF p. 6), and 'less “clicky” then' (PDF p. 13). The paper is written by a vendor about its own product (ASTRAL). Related library items: 1400-trifin-paper (the OPEN framework that MME extends) and open-a-community-based-preparation-environment-for-egs-cc-based-system. The ESA PLUTO language it mentions is ECSS-E-ST-70-32C (library item ecss-e-st-70-32c31july2008).

