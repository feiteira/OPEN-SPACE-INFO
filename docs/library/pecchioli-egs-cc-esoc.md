---
title: "The EGS-CC based Mission Control Infrastructure at ESOC"
description: "An ESOC paper on adopting the European Ground Systems Common Core (EGS-CC) as the basis for ESA's next generation of mission control and ground station monitoring and control systems (ancillary system"
tags: ["Paper", "ESOC evolution and context"]
sources: [pecchioli-egs-cc-esoc]
---

# The EGS-CC based Mission Control Infrastructure at ESOC

<dl class="osi-meta"><dt>Organisation</dt><dd>European Space Agency, ESA/ESOC, Darmstadt</dd><dt>Authors</dt><dd>Mauro Pecchioli, Anthony Walsh</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>No date, version or conference name is printed. The text says EGOS-CC Phase B is complete and extension development is 'planned to start in the second quarter of 2017' (PDF p. 10), so the paper dates from before Q2 2017. It was downloaded from an ESA Indico event attachment (event 180).</dd><dt>Pages</dt><dd>12</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/180/contributions/1367/attachments/1248/1473/0930_Pecchioli_-_Paper.pdf" rel="noopener">https://indico.esa.int/event/180/contributions/1367/attachments/1248/1473/0930_Pecchioli_-_Paper.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:27Z</dd><dt>SHA-256</dt><dd><code>46aed518c4dbb5f95418c32347656d642188492c2252a1fb88a88211d1aa1072</code></dd><dt>Size</dt><dd>110.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/pecchioli-egs-cc-esoc.pdf">pecchioli-egs-cc-esoc.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ESOC paper on adopting the European Ground Systems Common Core (EGS-CC) as the basis for ESA's next generation of mission control and ground station monitoring and control systems ([ancillary systems and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)). It is the earlier, more conceptual companion of the 2019 SESP paper in library item airdrive-b8b986f.

The paper explains why ESOC is moving on from [SCOS-2000](../scos2000/index.md): the current generation faces obsolescence and was designed around one kind of controlled system, PUS spacecraft. EGS-CC offers a kernel with no assumptions about the controlled system. The objectives include supporting heterogeneous and 'system of systems' controlled systems, off-the-shelf black-box reuse, and simpler model-based operations. The paper lists the disruptive changes this brings. Terminology changes, and there is a new engineering culture with prescribed SDE processes. The technology stack drops C++, CORBA and SQL. Users must learn the EGS-CC **Conceptual Data Model** instead of the familiar 'SCOS-2000 [MIB](../mib/index.md) ICD'. Operations move to model-based control of elements with parameters, events and activities.

The infrastructure decomposition (development environment, preparation environment, Linux/Windows platform baseline, EGS-CC, extension and adapter components, ancillary applications) is followed by the design drivers for mission control and ground station M&C systems. The products are MICONYS-CC, GSMC-CC and the OPEN preparation environment. The functional extensions planned for mission control fall into two groups. Operations services cover file-based operations (transfer, file store and file utilisation services), on-board software management built on [PUS service 6](../ecss/pus/st06-memory-management.md), and automated schedule execution alongside [service 11](../ecss/pus/st11-time-based-scheduling.md). M&C adaptation covers file-based reception of TM frames, a [CFDP](../ccsds/cfdp.md) wrapper, CSTS monitoring data (the successor of [SLE](../ccsds/sle/index.md)), the CORBA ground station M&C ICD and ground system M&C adapters. The paper closes with the programmatics of the EGOS-CC Project.


## Key points

- The EGS-CC kernel was designed without implementation or interface assumptions about the controlled system; at ESOC, SCOS-2000 is the basis of mission control systems and more recently also ground station network operations. *(PDF p. 1)*
- SCOS-2000 was designed for spacecraft exchanging TM/TC with the M&C system on the basis of the ECSS Packet Utilisation Standard; EGS-CC adds an abstraction layer to operate any type of system, including ground segment systems. *(PDF p. 2)*
- The current infrastructure specification contains thousands of user and software requirements, so a top-down hierarchical functional model and a 'functional gap analysis' of EGS-CC were used instead of a flat specification. *(PDF p. 3)*
- The EGS-CC technology stack drops technologies used in current ground data systems (no C++, no CORBA, no SQL). *(PDF p. 4)*
- Teams familiar with the 'SCOS-2000 MIB ICD' must learn the EGS-CC Conceptual Data Model (CDM), which defines similar data types with a largely different approach and data semantics. *(PDF p. 4)*
- EGS-CC uses 'model based operations': the controlled system is a hierarchy of elements with M&C aspects (state parameters, events, control activities); this is standard practice for ESA ground station network operations but a significant change for spacecraft operations. *(PDF p. 4)*
- The platform baseline supports two Linux distributions for the back-end and Windows for the front-end. *(PDF p. 5)*
- EGOS (European Ground Operation System) is ESOC's brand name; the EGS-CC based products are MICONYS-CC (mission control system infrastructure) and GSMC-CC (ground station M&C), each with the OPEN preparation environment. *(PDF p. 7)*
- File based operations will offer file transfer management, file store management (including a ground image of the on-board file store) and file utilisation services (e.g. executing loaded TC files). *(PDF p. 9)*
- On-board software management assumes on-board memories are managed through PUS Service 6; automated schedule execution complements the basic time-tagging in EGS-CC for Mission Planning schedules (PUS Service 11 or MCS). *(PDF p. 9)*
- The EGS-CC Reference Implementation provides components to interface a PUS-based spacecraft via SLE and some SCOE adapters; ESA adds file-based TM frame reception (for EO missions with short passes, and AIT replay) with manifest metadata. *(PDF p. 9)*
- File exchange with the spacecraft will be based on CCSDS CFDP; CSTS, described as the new generation of SLE, also provides monitoring data from ground station equipment; ESA ground station equipment is controlled through the CORBA M&C ICD. *(PDF p. 10)*
- EGOS-CC Phase B is complete; development of the EGS-CC extensions (EGOS-CC Components) is planned to start in Q2 2017. *(PDF p. 10)*


## Cited by these wiki pages (5)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [CCSDS File Delivery Protocol (CCSDS 727.0-B-5)](../ccsds/cfdp.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)


??? abstract "Contents (17 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Introduction | Introduction | 1 |
    | Introduction | Background | 1 |
    | Introduction | The Objectives of the EGS-CC Adoption at ESOC | 1 |
    | Introduction | The Engineering Approach | 2 |
    | Introduction | A Disruptive Change | 3 |
    | The new generation M&C infrastructure at ESOC | The New Generation M&C Infrastructure at ESOC | 5 |
    | The new generation M&C infrastructure at ESOC | High Level Decomposition | 5 |
    | The new generation M&C infrastructure at ESOC | EGOS-CC Products | 7 |
    | The new generation M&C infrastructure at ESOC | EGS-CC Functional Extensions | 8 |
    | The new generation M&C infrastructure at ESOC | Operations Services | 8 |
    | The new generation M&C infrastructure at ESOC | M&C Adaptation | 9 |
    | Programmatics | Programmatics | 10 |
    | Conclusions | Conclusions | 10 |
    | Summary | Summary | 11 |
    | Acknowledgments | Acknowledgments | 11 |
    | Acronym list | Acronym List | 12 |
    | References | References | 12 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [catalogue](../references/index.md#ref-m-pecchioli-j-m-carranza-a-walsh-the-highlights-of-the-european-ground-systems-c) | M. Pecchioli, J. M. Carranza, A. Walsh, "The Highlights of the European Ground Systems - Common Core Initiative," SpaceOps 2014, Pasadena | 2014 | bibliography |
| SCOS-2000 MIB ICD | [catalogue](../references/index.md#ref-scos-2000-mib-icd) | SCOS-2000 MIB ICD |  | mentioned |
| PUS | [catalogue](../references/index.md#ref-ecss-packet-utilisation-standard) | ECSS Packet Utilisation Standard |  | mentioned |
| CFDP | [catalogue](../references/index.md#ref-ccsds-file-delivery-protocol-cfdp) | CCSDS File Delivery Protocol (CFDP) |  | mentioned |
| CSTS | [catalogue](../references/index.md#ref-cross-support-transfer-services-csts) | Cross-Support Transfer Services (CSTS) |  | mentioned |
| CORBA M&C ICD | [catalogue](../references/index.md#ref-esa-ground-stations-m-c-interface-corba-m-c-icd) | ESA Ground Stations M&C Interface (CORBA M&C ICD) |  | mentioned |

!!! note "Notes"
    Undated paper; the date is inferred only from the text's planning statements (see status_notes). Author e-mail addresses printed under the title are omitted here. The library slug suggests an Indico attachment labelled '0930_Pecchioli - Paper'. The extraction reports 13 PDF pages (registry: 12); the last is empty. The acronym list expands EGOS as 'ESA Ground Operations System', while the body says 'European Ground Operation System', and expands SCOS as 'Spacecraft Control System'. Figure 3 (EGS-CC extensions) survives only as scattered labels (+FbO, +OBSM, +CFDP, +CSTS, +TM Files). Large parts of the text recur almost verbatim in library item airdrive-b8b986f (SESP 2019, Walsh et al.), which names the MCS product M4C instead of MICONYS-CC.

