---
title: "Next-generation ops preparation environment OPEN (SESP17)"
description: "A short SESP 2017 workshop paper introducing OPEN (Operations Preparation Environment), ESOC's planned single framework for preparing the tailoring data of mission operations data systems."
tags: ["Paper", "ESOC evolution and context"]
sources: [1400-trifin-paper]
---

# The Next Generation Mission Operations Preparation Environment at ESOC

<dl class="osi-meta"><dt>Date</dt><dd>2017-03</dd><dt>Organisation</dt><dd>European Space Agency, European Space Operations Centre (ESOC), Darmstadt; presented at the Workshop on Simulation and EGSE for Space Programmes (SESP), 28-30 March 2017, ESA-ESTEC, Noordwijk</dd><dt>Authors</dt><dd>Francois Trifin, Anthony Walsh</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Workshop paper for SESP 2017 (PDF p. 1). No version or status information is printed.</dd><dt>Pages</dt><dd>5</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/180/contributions/1369/attachments/1263/1488/1400_Trifin_-_Paper.pdf" rel="noopener">https://indico.esa.int/event/180/contributions/1369/attachments/1263/1488/1400_Trifin_-_Paper.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:38Z</dd><dt>SHA-256</dt><dd><code>9f416e252d0e20df81ed7b3eea54361f13c7c1187f80c5ce588d8a12058052d0</code></dd><dt>Size</dt><dd>84.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/1400_Trifin_-_Paper.pdf">1400_Trifin_-_Paper.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short SESP 2017 workshop paper introducing **OPEN** (Operations Preparation Environment), ESOC's planned single framework for preparing the tailoring data of mission operations data systems. Examples of such data are monitoring and control definitions, procedures and display definitions. The authors observe that each data system and mission has its own preparation tool, with no coherent overall solution and no synergy between spacecraft and ground-station operators. OPEN is therefore a light, data-type-agnostic framework of generic services (access and version control, reporting, comparison and merging, consistency checking, import/export, baselines), extended by plug-ins for specific data types.

**OPEN-CC** is the variant that is aware of EGS-CC data types. It is the basis for three preparation environments: MICONYS-CC (spacecraft operations, including a re-engineered MOIS Writer as the FOP editor), GSMC-CC (ground station monitoring and control) and the operational simulators (SIMULUS). A secondary objective is the transition from [SCOS-2000](../scos2000/index.md) to [EGS-CC](../scos2000/ancillary-and-egs-cc.md). OPEN-CC will import tailoring data in the legacy SCOS-2000 [MIB](../mib/index.md) format, both to migrate missions and to let external organisations keep delivering MIBs for MICONYS-CC-controlled systems. Table 1 maps the planned data definitions (M&C model, TM/TC packets, PUS services, user-defined displays, synthetic parameters, scripts, automation procedures, mission planning rules, etc.) to the three environments.

OPEN is implemented in Java on OSGi and the Eclipse Rich Client Platform. Data is held as EMF models in a distributed version control system, and editing works offline or online. See [operations preparation](../scos2000/operations-preparation.md).


## Key points

- ESOC data systems need a wide variety of tailoring data (M&C data definitions, procedures, user-defined displays) prepared by the Phase E operations teams. EGSE and AIT teams prepare equivalent products in phases C/D. *(PDF p. 1)*
- OPEN's objectives are to streamline operations tailoring and reduce operator effort, host all preparation applications in one consistent environment, harmonise spacecraft and ground-station operations tools, and extend configuration management to all operations artefacts. *(PDF p. 1)*
- A secondary objective is supporting the transition from SCOS-2000 to the EGS-CC based infrastructure. The framework and some extensions are foreseen to be released under an ESA open source or community licence. *(PDF p. 2)*
- OPEN is mostly agnostic to EGS-CC data types. OPEN-CC adds EGS-CC-aware framework extensions, and EGS-CC-specific extensions can only extend OPEN-CC. *(PDF p. 2)*
- The MICONYS-CC preparation environment will import tailoring data in the legacy SCOS MIB format, to migrate missions from SCOS-2000 to EGS-CC and to let external organisations deliver SCOS-2000 MIBs for systems controlled by MICONYS-CC. *(PDF p. 2)*
- The foreseen FOP editor is a re-engineering of the current FOP editor, MOIS Writer, as an OPEN-CC extension. *(PDF p. 2)*
- GSMC-CC will import ground station sub-system databases and ground station MIBs to configure the EGS-CC monitoring and control model and to generate displays and low-level automation procedures. *(PDF p. 2)*
- Table 1 lists the planned data definitions with their target environments (MICONYS-CC, GSMC-CC, SIMULUS). Examples are the M&C Model, TM/TC packets for the EGS-CC packet encoder/decoder, PUS-based on-board M&C services, user-defined displays, synthetic (derived) parameters, scripts, Java and DSL automation procedures and mission planning rules. *(PDF p. 3)*
- OPEN functions fall into Managed Data, Data Management Services and Data Editors and Browsers. Data models follow the EGS-CC Conceptual Data Model (CDM). Imports such as an S2K MIB are provided by dedicated extensions. *(PDF p. 4)*
- OPEN is built in Java on OSGi and the Eclipse Rich Client Platform. It runs on desktop operating systems including Windows, offline or online, and stores managed data as Eclipse Modelling Framework (EMF) models in a distributed version control system. *(PDF p. 5)*
- OPEN is intended to ultimately become the preparation environment of all ESA missions operated at ESOC. *(PDF p. 5)*


## Cited by these wiki pages (5)

- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (7 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Introduction | Introduction | 1 |
    | OPEN-CC | OPEN-CC Based Environments | 2 |
    | Data Definitions | Data Definitions | 3 |
    | OPEN Functionality | OPEN Functionality | 4 |
    | Implementation | Implementation | 4 |
    | Summary | Summary | 5 |
    | References | References | 5 |


## Documents this one references (1)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [catalogue](../references/index.md#ref-m-pecchioli-a-walsh-the-egs-cc-based-mission-control-infrastructure-at-esoc-sesp) | M. Pecchioli, A. Walsh, "The EGS-CC based Mission Control Infrastructure at ESOC" SESP 2017, Noordwijk | 2017 | bibliography |

!!! note "Notes"
    The extraction reports 6 PDF pages against 5 in the registry, and the last page is empty. The author block prints e-mail addresses, which are omitted here. Table 1's 'x' marks lose their column alignment in the text layer, so check the PDF before attributing a data definition to a specific environment. Typos as printed: 'EGC-CC' for EGS-CC and 'Bowsers' for Browsers (PDF pp. 2, 4). Reference [1] appears to be the library item pecchioli-egs-cc-esoc (same title, authors and SESP 2017 event). The later community paper on OPEN is open-a-community-based-preparation-environment-for-egs-cc-based-system.

