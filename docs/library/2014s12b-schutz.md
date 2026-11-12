---
title: "EGOS User Desktop (EUD) GUI framework (GSAW 2014)"
description: "A 22-slide GSAW 2014 presentation on the EGOS User Desktop (EUD)."
tags: ["Presentation", "ESOC evolution and context"]
sources: [2014s12b-schutz]
---

# EGOS User Desktop A Generic User Interface Framework for Ground Segment Software

<dl class="osi-meta"><dt>Date</dt><dd>2014-02-26</dd><dt>Organisation</dt><dd>European Space Agency (ESA/ESOC); presented at GSAW 2014</dd><dt>Authors</dt><dd>Jean Schütz</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Slides marked 'ESA UNCLASSIFIED – For Official Use', GSAW 2014, 26/02/2014 (PDF p. 1).</dd><dt>Pages</dt><dd>22</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://gsaw.org/wp-content/uploads/2014/03/2014s12b_schutz.pdf" rel="noopener">https://gsaw.org/wp-content/uploads/2014/03/2014s12b_schutz.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:54Z</dd><dt>SHA-256</dt><dd><code>c22ad08be63d032a4c3af3c31822a74b4ec19d0eefcf68d8e7a541ceabd82ffb</code></dd><dt>Size</dt><dd>2.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/context/2014s12b_schutz.pdf">2014s12b_schutz.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 22-slide GSAW 2014 presentation on the **EGOS User Desktop (EUD)**. EUD is ESA's Java and Eclipse RCP framework for building rich-client graphical user interfaces for ground data systems, and the basis for the new generation of GUIs at ESOC. It was in mission operations from 2013. The presentation frames EUD as part of ESA's modernisation of its ground data systems infrastructure, driven by obsolescence, removal of COTS dependencies, re-use, open-source technology, Linux/Windows independence and a harmonised look and feel.

The slides describe EUD as a pluggable integration platform. A 'Display' is an Eclipse RCP view or editor plug-in, so standard RCP views run unchanged. EUD provides 11 generic displays, among them the familiar [SCOS-2000](../scos2000/architecture.md) types AND (alphanumeric), GRD (graphic), mimic and matrix displays, scrolling parameter, XY graph, live and history message displays. It also offers an extended widget library and standard data-provision interfaces (parameter, message, scripting, system control, persistent storage and session services), connected to each back-end system through adapters.

The status slides list systems with EUD-based GUIs: SCOS-2000, SIMSAT, NIS and FARC as replacement GUIs; ARES, GSMC, FIDES, GSSC and MPSF as new developments; MATIS and SPMON ongoing; GFTS, DARC and DABYS planned. They also show screenshots of the EUD Telemetry Desktop in operation for Gaia, ARES and the Offline Display Development Environment (ODDE). The listed benefits include display definition files that work across ODDE, the MCS, SIMSAT, ARES and GSMC, and no licence cost. Future plans are Web-EUD on Eclipse RAP, more display types and use in EGS-CC. It is useful context for [ancillary systems](../scos2000/ancillary-and-egs-cc.md) and [displays](../mib/displays.md).


## Key points

- EUD is a framework for rich-client GUIs and an integration platform for GUI components, aimed mainly at ground data systems. It is described as ESA's foundation for new-generation GUIs at ESOC and in mission operation since 2013. *(PDF p. 2)*
- The motivations for modernising ESA's ground data systems infrastructure are obsolescence of existing implementations, removing COTS dependencies and cost reduction through re-use. The objectives are open-source technology, Linux/Windows independence, shared implementations and a harmonised look and feel. *(PDF p. 3)*
- EUD is implemented in Java on Eclipse RCP, uses only open-source software and runs on multiple platforms. *(PDF p. 4)*
- The pluggable UI unit is a 'Display', technically an Eclipse RCP View or Editor plug-in. RCP-compliant views run in EUD without modification, and an extended EUD view base class can replace AbstractViewPart. *(PDF p. 5)*
- EUD provides 11 common displays, among them GRD, AND, MIMIC and MATRIX. *(PDF p. 6)*
- The architecture layers EUD generic displays (Alphanumeric, MIMIC, Graph, Scrolling Param, Matrix, XY Graph, Live and History Message) and EUD core services over interfaces such as IEudParameter, IEudMessage, IEudScriptEngine, IEudSystemControl, IPersistentStorage and ISessionManager. These are bound to back-end services through application-specific adapters, on top of Eclipse RCP, EMF, GEF, GMF and BIRT. *(PDF p. 10)*
- The framework was mature since 2011, and most ground system GUIs were EUD-based. It replaced the GUIs of SCOS-2000, SIMSAT, NIS and FARC, and was used for new developments ARES, GSMC, FIDES, GSSC and MPSF. *(PDF p. 11)*
- Ongoing EUD developments were MATIS and SPMON. GFTS, DARC and DABYS were planned. *(PDF p. 12)*
- The EUD Telemetry Desktop (EUD-TMD) was in operation for Gaia. *(PDF p. 13)*
- Display definition files are cross-compatible across ODDE, the MCS, SIMSAT, ARES and GSMC, and EUD has no licence cost. *(PDF p. 18)*
- Future plans: Web-EUD, running EUD in a browser via Eclipse RAP with minor code changes, more generic displays (density distribution, spectral analysis, 3D graphs) and use in more systems such as EGS-CC. *(PDF p. 19)*
- Lessons learned: consolidating functionality across domains took much initial effort, an agile approach was crucial, and adapters for legacy systems can be tedious. *(PDF p. 21)*


## Cited by these wiki pages (5)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (14 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Slide 1 | EGOS User Desktop: A Generic User Interface Framework for Ground Segment Software | 1 |
    | Slide 2 | What is EGOS User Desktop (EUD) | 2 |
    | Slide 3 | Background | 3 |
    | Slide 4 | EUD Overview | 4 |
    | Slides 5-7 | EUD Features | 5 |
    | Slides 8-10 | Architecture | 8 |
    | Slides 11-12 | Current Status | 11 |
    | Slides 13-14 | EUD Telemetry Desktop (EUD-TMD) in operation (GAIA) | 13 |
    | Slides 15-16 | ARES (Offline Mission Analysis) | 15 |
    | Slide 17 | Offline Display Development Env. | 17 |
    | Slide 18 | Benefits | 18 |
    | Slides 19-20 | Future Plans / Web-EUD | 19 |
    | Slide 21 | Lessons Learned | 21 |
    | Slide 22 | Thank you | 22 |


## Documents this one references (3)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-scos-2000-eud-used-as-replacement-gui) | SCOS-2000 (EUD used as replacement GUI) |  | mentioned |
|  | [catalogue](../references/index.md#ref-egs-cc-planned-eud-usage) | EGS-CC (planned EUD usage) |  | mentioned |
|  | [catalogue](../references/index.md#ref-eclipse-rcp-emf-gef-gmf-birt-and-eclipse-rap-eclipse-foundation-frameworks) | Eclipse RCP, EMF, GEF, GMF, BIRT and Eclipse RAP (Eclipse Foundation frameworks) |  | mentioned |

!!! note "Notes"
    The extraction reports 23 PDF pages against 22 in the registry; there are 22 slides, and the last PDF page is empty. Slides 8-9 and 13-17 are screenshots or diagrams with no extractable text beyond titles. Slide 20 (Web-EUD) is a screenshot overlaid on part of slide 19's text. The architecture on slide 10 is reconstructed from scattered labels. Acronyms such as ARES, GSMC, FIDES, GSSC, MPSF, MATIS, SPMON, GFTS, DARC, DABYS and ODDE are not expanded on the slides (only ARES as 'Offline Mission Analysis' and ODDE as 'Offline Display Development Env.'). The GUI listing is the only mention of NIS in this deck.

