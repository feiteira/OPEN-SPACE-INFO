---
title: "PUS-C Gen: automatic generation toolset (2020)"
description: "Final presentation of an ESA study, PUSCGen, that built tools for deploying PUS-C (ECSS-E-ST-70-41C) in projects."
tags: ["Presentation", "ECSS standards"]
sources: [presentation-deployment-of-the-pus-c-standard]
---

# Deployment of the PUS-C Standard in Projects supported by an Automatic Generation Toolset
Final Presentation

<dl class="osi-meta"><dt>Issue / version</dt><dd>Final Presentation</dd><dt>Date</dt><dd>2020-05-15</dd><dt>Organisation</dt><dd>SPACEBEL</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Final presentation of the 'PUS C Gen' (PUSCGen) study, dated 15 May 2020 in the slide footer. It reports the CoreSight deployment as 'nearing completion' and the MSP430 'DemoSat' as 'in progress' (PDF pp. 34, 37).</dd><dt>Pages</dt><dd>42</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/345/contributions/5444/attachments/3830/5405/Presentation_-_Deployment_of_the_PUS-C_Standard.pdf" rel="noopener">https://indico.esa.int/event/345/contributions/5444/attachments/3830/5405/Presentation_-_Deployment_of_the_PUS-C_Standard.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:24Z</dd><dt>SHA-256</dt><dd><code>a05dfc4080ca173b25997463701223f72b83b436c9e3a1719863b178825fea3d</code></dd><dt>Size</dt><dd>3.1 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/Presentation_-_Deployment_of_the_PUS-C_Standard.pdf">Presentation_-_Deployment_of_the_PUS-C_Standard.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Final presentation of an ESA study, **PUSCGen**, that built tools for deploying **PUS-C (ECSS-E-ST-70-41C)** in projects. The motivation is the size of the PUS-C document: the study wanted to check its internal consistency by generating its content systematically from the **PUS foundation model** (clause 5 of the standard), and to make tailoring easier.

Part I: the foundation model is captured in **Object Role Modelling (ORM)** with the NORMA tool. The specification of clauses 6 and 8 is treated as a population of that model. The review produced **21 change requests** to PUS-C (7 major, 7 minor and 7 editorial) and a relational database generated from the ORM model. One limitation is that the 'system objects' accessed by subservices are modelled only generically.

Part II: the **toolset** has three applications. A Population Tool defines and tailors service, subservice, capability, message, instruction and notification types. DOC-GEN regenerates ECSS-E-ST-70-41C-style chapters 6 and 8 and annexes C and D, and a full population can reproduce the standard closely. ASN1-GEN produces **ASN.1/ACN** definitions of the TC/TM, which ESA's ASN1SCC compiler turns into data structures, C encoders and decoders, Python bindings and ICDs.

Part III: **SDL and MSC** models of services 1, 6, 9, 12 and a generic service template show that most services are nearly stateless, and that some service 1 notifications are not properly defined.

Part IV: deployments. **Proba-3** added a housekeeping-compression subservice to service 3 and a mission-specific reaction-wheel service 8. A **CoreSight** tracing R&D project used services 1, 6 and custom 192. An **MSP430** TASTE CubeSat demo used services 1, 2, 3 and custom 222. A Spacebel initiative aims to link the ASN.1 output to its SRDB tooling, whose SRDB components can be integrated in SCOS2000, for example.


## Key points

- Given the size of the PUS-C document, the project targeted internal consistency (content produced systematically from the foundation model) and usability (a toolset easing tailoring of the PUS). *(PDF p. 3)*
- Objectives: verify and validate the PUS foundation model (clause 5), extend it to cover the functional specification (clause 6), build a PUS foundation database with an ORM tool, generate the full or tailored standard and ASN.1 code, and verify system requirements with SDL and MSC. *(PDF p. 4)*
- The foundation model is expressed in Object Role Modelling (ORM) using the NORMA tool; the PUS specification (clauses 6 and 8) is a population of this model. *(PDF p. 7)*
- Subservice 'system objects' (e.g. Function, Memory) are modelled only generically; specific modelling was performed in the scope of ATOP. *(PDF p. 10)*
- The modelling produced 21 change requests against PUS-C: 7 major (functional problem), 7 minor (internal consistency or not covered by the foundation) and 7 editorial. *(PDF p. 11)*
- The toolset has three applications: a Population Tool (definition and tailoring), DOC-GEN (ECSS-E-ST-70-41C compatible document generation) and ASN1-GEN (tailoring and ASN.1/ACN generation). *(PDF p. 12)*
- A population of the entire PUS-C was created, from which chapters 6 and 8 and annexes C and D of ECSS-E-ST-70-41C can be regenerated with good fidelity; discrepancies found were reported to ESA. *(PDF p. 16)*
- Mission tailoring selects service, subservice and capability types and defines the abstract types, subject to dependency and exclusion constraints between capabilities; abstract types and arguments are tailored by editing ASN.1/ACN. *(PDF p. 18)*
- ASN.1/ACN generation needs 'implicit knowledge' definitions such as the CCSDS packet encapsulation of ECSS-E-ST-70-41C chapter 7; ESA's ASN1SCC compiler then generates data structures, C encoders/decoders with optional Python bindings, and ICDs. *(PDF p. 19)*
- Almost all PUS-C services follow a simple, practically stateless template; services 1, 6, 9, 12 and a generic service template were modelled in SDL. *(PDF p. 22)*
- MSC modelling found issues in the SDL models; the generation of certain Service 1 notifications is not properly defined in the standard. *(PDF p. 28)*
- Proba-3 use case: service 3 extended with a housekeeping compression subservice (Pocket), and a mission-specific reaction wheels management service (S8 in Proba-3) with commanding, FDIR, rate sensor and direct commanding subservices. *(PDF p. 30)*
- CoreSight R&D project (not flight software) used PUS-C services 1, 6 and custom 192; two engineers built most of the population after a 2-hour training, and ESA's ASN1SCC v4 and DMT produced the ICD, C TC/TM transcoders and Python bindings. *(PDF p. 33)*
- The MSP430 TASTE demo uses services 1, 2, 3 and custom 222 with bare-bone encapsulation instead of CCSDS; the first iteration from concept to ASN.1/ACN took about 5 hours. *(PDF p. 37)*
- Generated requirement sample: subservice requirements with message type 'TC[222,1] switch mode' and a failed start of execution notification on rejection. *(PDF p. 38)*
- A Spacebel initiative links the ASN.1/ACN output to its SRDB tooling (for integration in SCOS2000, for example), so that on-board software and SRDB are consistent by construction; the method also applies to older PUS versions. *(PDF p. 39)*


## Cited by these wiki pages (4)

- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (21 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Agenda | 2 |
    |  | Project Context | 3 |
    |  | Project Overview | 4 |
    | Part I | PUS foundation model | 6 |
    |  | Modelling activity outcomes | 11 |
    | Part II | PUS-C Toolset | 12 |
    |  | PUS-C Toolset workflow (part 1) | 13 |
    |  | PUS-C population | 14 |
    |  | Document generation | 16 |
    |  | PUS-C Toolset workflow (part 2) | 18 |
    |  | ASN.1/ACN generation | 19 |
    |  | PUS-C demonstration ICD | 20 |
    | Part III | SDL modelling | 22 |
    |  | Parameter monitoring (in PUS 12) | 23 |
    |  | MSC modelling | 27 |
    |  | SDL and MSC modelling | 28 |
    | Part IV | Toolset deployment – Proba 3 | 29 |
    |  | Toolset deployment - CoreSight | 33 |
    |  | Toolset deployment - MSP | 36 |
    |  | Latest activities and way forward | 39 |
    |  | Conclusions | 40 |


## Documents this one references (7)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | ECSS-E-ST-70-41C (PUS-C), clauses 5, 6, 7 and 8 and annexes C and D |  | mentioned |
|  | [catalogue](../references/index.md#ref-norma-object-role-modelling-tool) | NORMA (Object Role Modelling tool) |  | mentioned |
|  | [catalogue](../references/index.md#ref-atop-activity-in-which-pus-system-objects-were-modelled-specifically) | ATOP (activity in which PUS system objects were modelled specifically) |  | mentioned |
|  | [catalogue](../references/index.md#ref-esa-asn1scc-compiler-v4-and-dmt) | ESA ASN1SCC compiler (v4) and DMT |  | mentioned |
|  | [catalogue](../references/index.md#ref-taste-esa-toolchain-msp430-target-support-project) | TASTE (ESA toolchain; MSP430 target support project) |  | mentioned |
|  | [catalogue](../references/index.md#ref-pocket-housekeeping-compression-used-on-proba-3) | Pocket (housekeeping compression used on Proba 3) |  | mentioned |
|  | [catalogue](../references/index.md#ref-scos2000-target-of-srdb-component-integration) | SCOS2000 (target of SRDB component integration) |  | mentioned |

!!! note "Notes"
    Slide deck with no reference list; the 'mentioned' entries come from the slides. No author names are printed; the footer reads 'Copyright © 2016 by SPACEBEL – All rights reserved' although the deck is dated 15 May 2020, and p. 39 refers to a 'Spacebel initiative'. Several slides are screenshots or diagrams with no extractable text (pp. 14-15, 17, 20-21, 24-26, 35). The deck mixes 'PUS-C Gen', 'PUSCGen' and 'PUS C Gen'; 'ASN.1/ACN generation+' (p. 19) and 'feasability' (p. 42) are as printed. The library also holds ECSS-E-ST-70-41C (ecss-e-st-70-41c-15april2016) and its 2024 Rev.1 draft (ecss-e-st-70-41c-rev1-dir1). The PDF has 42 slides plus a trailing empty page 43 in the extraction.

