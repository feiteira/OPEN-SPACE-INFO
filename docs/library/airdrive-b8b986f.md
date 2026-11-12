---
title: "Developing EGS-CC based applications at ESOC (SESP 2019)"
description: "An ESOC paper from SESP 2019 on EGOS-CC, the ESOC initiative to adopt the European Ground Systems Common Core (EGS-CC(../scos2000/ancillary-and-egs-cc.md)) as the base of its next generation of monito"
tags: ["Paper", "ESOC evolution and context"]
sources: [airdrive-b8b986f]
---

# Developing EGS-CC based applications; the EGOS-CC experience

<dl class="osi-meta"><dt>Date</dt><dd>2019-03-26</dd><dt>Organisation</dt><dd>European Space Agency, ESA/ESOC; presented at the Workshop on Simulation and EGSE for Space Programmes (SESP), 26-28 March 2019, ESA-ESTEC, Noordwijk</dd><dt>Authors</dt><dd>Anthony Walsh, Mauro Pecchioli, Klara Widegård, Catherine Lannes</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Workshop paper for SESP, 26-28 March 2019 (title block, PDF p. 1). The date given here is the first day of the workshop. The paper describes work in progress as of early 2019, for example the pilot Juice MCS decision planned for September 2019.</dd><dt>Pages</dt><dd>8</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://airdrive.eventsair.com/eventsairwesteuprod/production-atpi-public/b8b986f43fa149b4a4175abc31b0f098" rel="noopener">https://airdrive.eventsair.com/eventsairwesteuprod/production-atpi-public/b8b986f43fa149b4a4175abc31b0f098</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:11:45Z</dd><dt>SHA-256</dt><dd><code>ff760d61a8a377fe83410b72919fcf919d892a0f1940063ce1e288a19c37483a</code></dd><dt>Size</dt><dd>266.6 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/airdrive-b8b986f.pdf">airdrive-b8b986f.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ESOC paper from SESP 2019 on **EGOS-CC**, the ESOC initiative to adopt the European Ground Systems Common Core ([EGS-CC](../scos2000/ancillary-and-egs-cc.md)) as the base of its next generation of monitoring and control infrastructure. EGOS-CC replaces [SCOS-2000](../scos2000/index.md) for mission control and STC2 for ground station network operations, both expected to face obsolescence in the following decade. The paper lists the strategic objectives (lower cost of ownership, a modern operations environment, cross-fertilisation between mission and network operations). It then breaks the infrastructure down into a development environment (the EGS-CC SDE), a preparation environment based on the OPEN framework, the SLES12 platform baseline, EGS-CC itself used unmodified, extension components, adapter components and external ancillary applications.

The main products are **M4C** (Mission Control Core based on Common Core, the SCOS-2000 successor) and **GSMC-CC** (the STC2 successor), with OPEN-M and OPEN-S as the preparation tools for missions and ground stations. Legacy cross-domain applications such as data distribution and long-term archiving stay outside the EGS-CC runtime and are adapted to it. Three tables list the planned extension and adapter components, among them a CSTS Monitoring Data provider, an ESTRACK schedule interface, file-based operations, OBSW patch/dump management, TM file ingestion, command request file management, a mission propagation delay (OWLT) extension to time correlation, and a [PUS-C service 11](../ecss/pus/st11-time-based-scheduling.md) replacing the PUS-A reference implementation. The paper also covers the engineering approach (black-box use of EGS-CC, a top-down hierarchical functional model and gap analysis) and the programmatics: incremental delivery, a pilot Juice MCS as first target, a pilot GSMC-CC, and validation against the BepiColombo simulator.


## Key points

- At ESOC, SCOS-2000 is the basis for mission control systems and STC2 for ground station network operations; both are expected to face significant obsolescence problems in the next decade, which EGOS-CC addresses. *(PDF p. 1)*
- The EGOS-CC infrastructure is decomposed into Development Environment (EGS-CC SDE), Preparation Environment, Platform Baseline, EGS-CC, Extension Components, Adapter Components and External Ancillary Applications. *(PDF p. 2)*
- The Tailoring Environment at ESOC is to be based on the OPEN framework; the platform baseline is SLES12; EGS-CC is to be adopted without modifications. *(PDF p. 3)*
- Design drivers for mission control systems include many dozens of parallel users in LEOP, off-line operations with short passes or long propagation delays, and processing of real-time and deferred data. *(PDF p. 3)*
- M4C (Mission Control Core based on Common Core) and GSMC-CC have functional scopes very similar to SCOS-2000 and STC2 respectively; M4C can be extended per mission, GSMC-CC is not mission specific. *(PDF p. 4)*
- Cross domain applications such as data distribution and long-term archiving run outside the EGS-CC runtime and are being adapted to integrate with both M4C/GSMC-CC and the current S2K and GSMC infrastructure. *(PDF p. 4)*
- OPEN (Operations Preparation Environment for EGS-CC based systems) is extended by OPEN-M for mission operations and OPEN-S for ground stations, to be available under the ESA Software Community License. *(PDF p. 5)*
- Cross-domain components include a REALS alert adapter, a CSTS Monitoring Data provider/adapter and a Ground Schedule Increment loader; ground-station components include a Ground Station M&C interface, ESTRACK schedule interface and STDM interface. *(PDF p. 5)*
- Mission-operations components include File Based Operations, OBSW Management, TM Files Ingestion, Command Request Management (CRF files), a TM Packet Interface Adapter for flight dynamics, Mission Propagation Delay (OWLT) and PUS-C Service 11. *(PDF p. 6)*
- Engineering principles: black-box use of EGS-CC (no source-code modifications of kernel or reference implementation), adoption of the EGS-CC SDE and product requirements for all extensions, and a top-down hierarchical functional model used for a functional gap analysis. *(PDF p. 6)*
- Development of OPEN and EGOS-CC extensions started in 2017; the Juice MCS (J-MCS) is the first target MCS, with a pilot J-MCS before a commitment in September 2019, and a pilot GSMC-CC with a decision at the end of 2019. *(PDF p. 7)*
- Parallel EGS-CC sessions allow simultaneous connection to the EGS-CC RTF Simulator and the BepiColombo mission simulator for familiarisation and regression testing. *(PDF p. 7)*


## Cited by these wiki pages (5)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [Missions](../missions/index.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (11 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Introduction | Introduction | 1 |
    | Introduction | Background | 1 |
    | Introduction | EGOS-CC | 1 |
    | The new EGOS-CC infrastructure at ESOC | The new EGOS-CC infrastructure at ESOC | 2 |
    | The new EGOS-CC infrastructure at ESOC | High Level Decomposition | 2 |
    | The new EGOS-CC infrastructure at ESOC | EGOS-CC Products | 4 |
    | The new EGOS-CC infrastructure at ESOC | EGOS-CC Extensions and Adaptors | 5 |
    | Engineering approach | Engineering approach | 6 |
    | Programmatics | Programmatics | 7 |
    | Summary | Summary | 8 |
    | References | References | 8 |


## Documents this one references (4)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [catalogue](../references/index.md#ref-m-pecchioli-j-m-carranza-a-walsh-the-highlights-of-the-european-ground-systems-c) | M. Pecchioli, J. M. Carranza, A. Walsh, "The Highlights of the European Ground Systems - Common Core Initiative," SpaceOps 2014, Pasadena | 2014 | bibliography |
| [2] | [AIAA Paper 2016-2304](../references/index.md#ref-aiaa-paper-2016-2304) | M. Pecchioli, J. M. Carranza, A. Walsh, "The Operational Adoption of the EGS-CC at ESA" | June 2016 | bibliography |
| [3] | [catalogue](../references/index.md#ref-f-trifin-a-walsh-open-a-community-based-preparation-environment-for-egs-cc-based) | F. Trifin, A. Walsh "OPEN: A community based preparation environment for EGS-CC based systems", SESP 2019 | March 2019 | bibliography |
| [4] | [catalogue](../references/index.md#ref-k-wideg-rd-m-pecchioli-harmonisation-of-products-for-ground-segment-operations-a) | K. Widegård, M. Pecchioli, "Harmonisation of products for ground segment operations at ESA" SpaceOps 2018 | May 2019 | bibliography |

!!! note "Notes"
    The file name (an EventsAir 'airdrive' hash) says nothing about the content; the PDF is the SESP 2019 paper 'Developing EGS-CC based applications; the EGOS-CC experience'. Author e-mail addresses printed on the title block are omitted here. Reference [4] is printed as 'SpaceOps 2018, May 2019', which is probably a typo for May 2018. Figure 2 (the main EGOS-CC products) is an image with no extracted text. The extraction reports 9 PDF pages while the registry lists 8; the extra page appears empty. There are typos in the original ('Doman', 'CCSD Cross Support Transfer Services'). Mauro Pecchioli is also the author of library item pecchioli-egs-cc-esoc.

