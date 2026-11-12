---
title: "Old and new generation control systems at ESA (ICALEPCS19)"
description: "A conference paper from ESOC on how ESA's mission control system (MCS) infrastructure has evolved."
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [icalepcs2019-weapp01-esa-control-systems]
---

# Old and New Generation Control Systems at ESA

<dl class="osi-meta"><dt>Document ID</dt><dd>doi:10.18429/JACoW-ICALEPCS2019-WEAPP01 (paper WEAPP01)</dd><dt>Date</dt><dd>2019</dd><dt>Organisation</dt><dd>ESA/ESOC, Darmstadt, Germany; published in the proceedings of the 17th Int. Conf. on Accelerator and Large Experimental Physics Control Systems (ICALEPCS2019, New York, NY, USA), JACoW Publishing</dd><dt>Authors</dt><dd>M. Pecchioli</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper, published under CC BY 3.0 (© 2019), ISBN 978-3-95450-209-7, ISSN 2226-0358, proceedings pages 859-865 (PDF pp. 1-7).</dd><dt>Pages</dt><dd>7</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://jacow.org/icalepcs2019/papers/weapp01.pdf" rel="noopener">https://jacow.org/icalepcs2019/papers/weapp01.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:01Z</dd><dt>SHA-256</dt><dd><code>8aa8b3b11f892ae3e26418f5ece7b918a38b1e4ee3a43709c0424e1d747d8c7f</code></dd><dt>Size</dt><dd>437.0 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/icalepcs2019-weapp01-esa-control-systems.pdf">icalepcs2019-weapp01-esa-control-systems.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A conference paper from ESOC on how ESA's mission control system (MCS) infrastructure has evolved. ESOC builds its MCSs on domain-specific (not mission-specific) infrastructure: configurable, generic implementations reused across missions. The stated reasons are stable costs, shorter mission preparation, lower risk and less familiarisation effort for staff. The paper lists the design drivers this approach imposes: heterogeneous space systems, the [PUS](../ecss/pus/index.md), multiple mission types, standardised interfaces, modular and layered architecture, data-driven tailoring through a TM/TC 'database' (i.e. the [MIB](../mib/index.md)), automation, performance, longevity, portability and scalability.

It then compares four generations: the **Multi-Satellite Support System (MSSS, 1970s to late 1990s)**, **SCOS 1** (from the early 1990s), **SCOS II, renamed [SCOS-2000](../scos2000/index.md)** (in use since the early 2000s and still the basis of most ESOC control systems), and **M4C** (Mission Control Core based on Common Core), which offers equivalent features on the [EGS-CC](../scos2000/ancillary-and-egs-cc.md) framework. The comparison covers the MCS's role in preparation (up to the Eclipse-based OPEN environment), planning, critical operations (display types), routine operations (from time-separated command release in MSSS to M4C activities with ground and on-board triggers, and file-based operations), and evaluation. It also covers system design: modularity, deployment (mainframe, then distributed client-server, then 'conceptually centralised' with thin clients), scalability, tailoring, extensibility, interoperability ([SLE](../ccsds/sle/index.md), PUS), performance, technology stacks and maintainability.

It is useful for the [history](../overview/history.md) of ESA control systems and for placing SCOS-2000 between MSSS and EGS-CC.


## Key points

- The paper names four factors behind the evolution of MCS implementations: spacecraft orbits (pass frequency and delays), space asset design (TM/TC protocols, on-board monitoring and control services, data volumes, autonomy), operations concepts, and software and IT technologies. *(PDF p. 1)*
- ESA ground segments rely on domain-specific (not mission-specific) infrastructure, for strategic and programmatic reasons: shared development and maintenance costs, shorter preparation of new missions, lower risk and less familiarisation effort for staff. *(PDF p. 2)*
- Control functions are tailored through a data-driven approach: TM/TC characteristics are defined in a 'database' that converts human-readable artefacts into data units for uplink and downlink. *(PDF p. 3)*
- Four MCS infrastructure generations: MSSS (Multi-Satellite Support System, 1970s to late 1990s); SCOS 1 (from the early 1990s, still in some legacy missions); SCOS II, renamed SCOS-2000 (from the start of this century, the basis of most ESOC control systems); and M4C (Mission Control Core based on Common Core, equivalent features on EGS-CC). *(PDF p. 3)*
- Operations preparation tools evolved from basic text editors, through stand-alone Windows tools, to OPEN, the Eclipse-based Operations Preparation Environment. *(PDF p. 4)*
- MSSS could only open full-screen displays, up to three. MSSS could only authorise the release of consecutive commands at specified time intervals, whereas M4C natively executes any control action ('Activities') from ground or on-board triggers based on times, events or procedures. *(PDF p. 4)*
- Both SCOS-2000 and M4C support file-based operations concepts. *(PDF p. 5)*
- Deployment evolved from MSSS (two redundant mainframe instances serving all missions via hard-wired workstations), to SCOS-2000 (distributed client-server, first with 'very fat' clients, later re-engineered for remote access), to M4C ('conceptually centralised', with thin clients and options up to multi-mission virtual data centres). *(PDF p. 5)*
- Ground station interfaces are standardised through CCSDS SLE. Both SCOS-2000 and M4C natively support PUS 'service level' operations. Standardisation between ground systems such as planning, flight dynamics and payload data processing is described as still lagging behind. *(PDF p. 6)*
- MSSS processed TM at a few kbit/s. The SCOS-2000 based Gaia MCS sustains more than 10 Mbit/s incoming and about 1 Mbit/s of full TM processing. MSSS supported up to 20 workstations for the whole centre, while more than 50 users on one MCS are now common during LEOP. *(PDF p. 6)*
- The paper concludes that the infrastructure kept up with mission demands through continuous improvement within generations and step-wise change across them. *(PDF p. 7)*


## Cited by these wiki pages (5)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (10 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract | 1 |
    | Introduction | Introduction | 1 |
    | Introduction | Background | 1 |
    | Introduction | Mission Control Systems Infrastructure Design | 2 |
    | Infrastructure Evolution | Infrastructure Evolution | 3 |
    | Infrastructure Evolution | System Context | 3 |
    | Infrastructure Evolution | System Design | 5 |
    | Conclusion | Conclusion | 7 |
    | Acronyms | Acronyms List | 7 |
    | References | References | 7 |


## Documents this one references (4)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [doi:10.18429/JACoW-ICALEPCS2017-THCPL02](../references/index.md#ref-doi-10-18429-jacow-icalepcs2017-thcpl02) | M. Pecchioli, J.M. Carranza, "Highlights of the European Ground Systems - Common Core Initiative", in Proc. 16th Int. Conf. on Accelerator and Large Experimental Physics Control Systems (ICALEPCS'17), Barcelona, Spain, paper THCPL02, pp. 1175-1181 | October 2017 | bibliography |
| [2] | [doi.org/10.2514/6.2010-2190](../references/index.md#ref-doi-org-10-2514-6-2010-2190) | M. Pecchioli et al. "Towards File based Operations", in SpaceOps 2010 Conference, Huntsville, Alabama, USA | April 2010 | bibliography |
| [3] | [catalogue](../references/index.md#ref-space-link-extension-consultative-committee-for-space-data-standardisation-https) | Space Link Extension, Consultative Committee for Space Data Standardisation, https://public.ccsds.org/Publications/default.aspx |  | bibliography |
| [4] | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | ECSS-E-70-41A Packet Utilisation Standard, European Co-operation for Space Standardisation, http://ecss.nl/standards/ |  | bibliography |

!!! note "Notes"
    Two-column layout; the extracted text interleaves the columns line by line, so read it carefully. The extraction reports 8 PDF pages against 7 in the registry, and the last page is empty. Figure 1 (Operational Ground Segment, conceptual; PDF p. 1) is an image. The acronym list expands PUS as 'Packet Utilization Standard', while the body and [4] use 'Utilisation'. Reference [3] expands CCSDS as 'Consultative Committee for Space Data Standardisation', which is not the official name. Reference [4] cites ECSS-E-70-41A (2003; library item ecss-e-70-41a-30jan2003-pus) rather than the current ECSS-E-ST-70-41C. Same author as the library item pecchioli-egs-cc-esoc (EGS-CC adoption at ESOC).

