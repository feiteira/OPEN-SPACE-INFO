---
title: "SCOSII OL: a dedicated language for mission operations"
description: "Conference paper by A."
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [ntrs-scosii-ol]
---

# SCOSII OL: A Dedicated Language for Mission Operations

<dl class="osi-meta"><dt>Document ID</dt><dd>N95-17533</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (Flight Control Systems Department and Mission Operations Department); Computer Resources International (CRI)</dd><dt>Authors</dt><dd>Andrea Baldi, Dennis Elgaard, Steen Lynenskjold, Mauro Pecchioli</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Historical conference paper. It reports a delivered SCOSII Basic System with a reduced OL facility (expressive knowledge only) and plans releases 1 (1Q95), 2 (1Q96) and 3 (1Q97) (PDF p. 7).</dd><dt>Pages</dt><dd>8</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ntrs.nasa.gov/api/citations/19950011118/downloads/19950011118.pdf" rel="noopener">https://ntrs.nasa.gov/api/citations/19950011118/downloads/19950011118.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:01Z</dd><dt>SHA-256</dt><dd><code>2e3de6ab53cbafe2198afc495cc051886f31cc46592fe6728a080c8decdb7d29</code></dd><dt>Size</dt><dd>741.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/ntrs-scosii-ol.pdf">ntrs-scosii-ol.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Conference paper by A. Baldi (ESOC Flight Control Systems Department), D. Elgaard and S. Lynenskjold (Computer Resources International) and M. Pecchioli (ESOC Mission Operations Department) on the **Operations Language (OL)** of SCOSII, the generic mission control system then in development at ESOC. It explains why a dedicated language was needed. In MSSS, operations engineers specified derived-value algorithms on paper and software engineers coded them. In SCOS-I the algorithms were written in extended FORTRAN and linked into the control system, so errors showed up only as run-time crashes. Checkout languages (ETOL, ELISA) and ESOC studies (Expert Operator's Associate, Meteosat Workstation, User Language Study) shaped the requirements.

The paper sorts mission knowledge into four kinds. Declarative knowledge, such as calibration curves, is entered through forms. Expressive knowledge (derived parameters, command validation conditions) and procedural knowledge (operations procedures) are written in the OL. Special knowledge needs new software. The OL sits in a three-layer model of interaction, logical and physical layers, joined by an explicit object-oriented data model that acts as a 'contract'. Parameters, limits, values and system elements such as heaters are objects with attributes and services. Default attributes let `P112` stand for its engineering value, and values computed from invalid inputs are themselves invalid.

The language is strongly typed and interpreted. A script has a declaration part and an executable part with the usual imperative constructs, and the paper includes a worked derived-parameter example. It was implemented in C++ with lex and yacc, and parse trees are built at database preparation time. The status section covers the release plan, the FOPGEN procedure editor and the related COES standardisation. Readers of [synthetic parameters](../mib/synthetic-parameters.md) will recognise the name OL; whether SCOS-2000's OL derives from this design is not stated here.


## Key points

- SCOSII is a generic system configured through databases holding the mission-specific knowledge; the OL lets operations engineers edit, test, validate and install scripts (e.g. derived-parameter expressions and flight procedures) without software support engineers. *(PDF p. 1)*
- In MSSS derived-value algorithms were coded by software engineers from paper specifications; in SCOS-I they were written in FORTRAN with a few extra constructs, compiled and linked with the control system, so errors surfaced only as run-time crashes and neither system offered version or configuration control. *(PDF p. 2)*
- ESA checkout languages cited as precedents: ETOL (ESA Test Operations Language, ref. [10]) and ELISA (Extended Language for Instrument and Spacecraft AIV, ref. [9]). *(PDF p. 2)*
- First SCOSII client missions: Huygens (97), Artemis (97) and Envisat (98). *(PDF p. 2)*
- Mission knowledge categories: declarative (forms-based, e.g. calibration curves), expressive (OL, e.g. derived parameters, command validation conditions), procedural (OL, e.g. operation and report procedures) and special (requires software expansion). *(PDF p. 3)*
- Layered model: interaction layer (user interface), logical layer (centred on the OL) and physical layer (generic control-system services); the object-oriented data model is the contract between logical and physical layers and cannot be changed through the OL. *(PDF p. 3)*
- The OL is interpreted and strongly typed; the data model is part of the type system, so wrong access to physical-layer objects is detected at preparation time; all OL definitions are part of the database configuration under version control. *(PDF p. 4)*
- Worked example: derived parameter P117 is set to the upper limit of P112 when P112 is above limits, otherwise to P112's engineering value. *(PDF p. 4)*
- Default attributes: the expression 'P112' evaluates as 'P112.eng.value'; a Parameter offers a 'delta' service for historical samples; a Value carries a validity. *(PDF p. 5)*
- Statements offered: assignment, wait, function invocation, goto-label, if-then-else, select-case, while-do, repeat-until, for-in-list-do and for-to-step-next, with numeric, boolean, string, time, list, set, matrix, vector and map expressions. *(PDF p. 5)*
- Implementation: specified with OMT, programmed in C++, scanner and parser generated with lex and yacc; the parse tree is built at preparation time and used directly by the interpreter. *(PDF p. 5)*
- A Value computed from non-valid Values is itself non-valid, which propagates invalidity through expression evaluation. *(PDF p. 6)*
- No language constructs for parallelism or synchronisation: conditions such as interlocks between procedure executions are handled by the physical layer. *(PDF p. 7)*
- FOPGEN, a WYSIWYG tool for operational documentation, was to generate operation procedures in the SCOSII OL. *(PDF p. 7)*
- Conclusion: the language is deliberately 'kept simple and stupid', leaving intelligent behaviour to physical-layer objects; porting scripts between missions can be hard because each mission may have its own data model. *(PDF p. 8)*


## Cited by these wiki pages (5)

- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)


??? abstract "Contents (9 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 1 |
    |  | Introduction | 1 |
    |  | Background and Context | 2 |
    |  | Concepts | 3 |
    |  | Language Facilities | 4 |
    |  | Implementation | 5 |
    |  | Status | 7 |
    |  | Conclusions | 8 |
    |  | References | 8 |


## Documents this one references (15)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [catalogue](../references/index.md#ref-scosii-esa-s-new-generation-of-mission-control-systems-the-user-s-perspective-p-) | SCOSII: ESA's New Generation of Mission Control Systems - The User's Perspective, P Kaufeler, M Pecchioli, I Shurmer, ESOC - these proceedings |  | reference |
| [2] | [catalogue](../references/index.md#ref-a-new-communication-protocol-family-for-a-distributed-spacecraft-control-system-) | A New Communication Protocol Family for a Distributed Spacecraft Control System, A Baldi, M Pace, ESOC - these proceedings |  | reference |
| [3] | [catalogue](../references/index.md#ref-scosii-esa-s-new-generation-of-control-systems-m-jones-n-head-k-keyte-p-howard-s) | SCOSII: ESA's New Generation of Control Systems, M Jones, N Head, K Keyte, P Howard, S Lynenskjold - these proceedings |  | reference |
| [4] | [catalogue](../references/index.md#ref-scosii-an-object-oriented-software-development-approach-m-symonds-s-lynenskjold-) | SCOSII - An Object Oriented Software Development Approach, M Symonds, S Lynenskjold, C Müller - these proceedings |  | reference |
| [5] | [DOPS-SYS-URD-001-AMD](../references/index.md#ref-dops-sys-urd-001-amd) | SCOSII User Requirements Document, ESOC | Issue 3 February 1994 | reference |
| [6] | [SCOSII-SYS-SRD](../references/index.md#ref-scosii-sys-srd) | SCOSII Software Requirements Document, ESOC | Issue 0.6 June 1994 | reference |
| [7] | [ULS.RST.RER005](../references/index.md#ref-uls-rst-rer005) | User Language Study, VEGA (ESOC) | Issue 1.0 October 1992 | reference |
| [8] | [catalogue](../references/index.md#ref-object-oriented-user-language-for-satellite-check-out-spacebel-informatique-este) | Object-Oriented User Language for Satellite Check-out, Spacebel Informatique (ESTEC) | 1992 | reference |
| [9] | [CL-CRI-ID-0006](../references/index.md#ref-cl-cri-id-0006) | Control File Language for Cluster AIT, CRI (ESTEC) | Issue 3 February 1993 | reference |
| [10] | [ER-MA-CRI-AV-065](../references/index.md#ref-er-ma-cri-av-065) | User Reference Guide for ERS-1 Check-out Activities, CRI, Volume 1 | Issue 1 April 1987 | reference |
| [11] | [catalogue](../references/index.md#ref-object-oriented-modelling-and-design-rumbaugh-et-al-prentice-hall) | Object-Oriented Modelling and Design, Rumbaugh et.al., Prentice-Hall | 1991 | reference |
| [12] | [EOA-CRI-FINAL-0001-1991](../references/index.md#ref-eoa-cri-final-0001-1991) | Expert Systems for Automated Spacecraft Operations. CRI/Matra (ESOC) | March 1993 | reference |
| [13] | [MWS.RST.REE002](../references/index.md#ref-mws-rst-ree002) | Definition Study for a Meteosat Workstation, VEGA (ESOC) | March 1989 | reference |
| [14] | [catalogue](../references/index.md#ref-scosii-a-distributed-architecture-for-ground-system-control-vitrociset-keyte-int) | SCOSII - A Distributed Architecture for Ground System Control, Vitrociset Keyte, International Symposium on Spacecraft Ground Control and Flight Dynamics, Brazil | February 1994 | reference |
| [15] | [catalogue](../references/index.md#ref-a-description-of-the-model-view-controller-user-interface-paradigm-in-the-smallt) | A Description of the Model-View-Controller User Interface Paradigm in the Smalltalk-80 System, ParcPlace Systems | August 1988 | reference |

!!! note "Notes"
    Scanned NASA NTRS copy (Pdf.Capture OCR); accession number N95-17533 is stamped on PDF p. 1. Printed page numbers 689-696 map to PDF pp. 1-8, and the text extraction has a trailing empty page 9. The two-column layout is interleaved and OCR errors are frequent (reference [4] author 'C Müller' is OCR'd as 'Mt_ller'). The author footnote on PDF p. 1 gives the authors' e-mail addresses and postal addresses, which are not reproduced here. Figures 1-6 (layered model, OL example, logical-layer data model, heater system element, physical-layer interface class diagram, script class model) survive only in fragments. No date or venue is printed. References [1]-[4] are 'these proceedings', and [1] is the library item ntrs-scos2-new-generation.

