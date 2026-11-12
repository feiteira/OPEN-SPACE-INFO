---
title: "FIRST/Planck SCOS-2000 meeting slides, complete set (2000)"
description: "Complete slide set from the SCOS-2000 meeting with the FIRST/Planck instrument PI groups at ESOC on 18-19 April 2000, compiled into one PDF."
tags: ["Presentation", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [scos2000-complete-presentation-2000]
---

# FIRST/PLANCK – SCOS-2000

<dl class="osi-meta"><dt>Date</dt><dd>2000-04-18</dd><dt>Organisation</dt><dd>European Space Agency, ESOC TOS-GC; FIRST/Planck Project</dd><dt>Authors</dt><dd>Jean-François Kaufeler, P. Estaria</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Slides presented at ESOC on 18-19 April 2000; footers dated 18.04.2000 (PDF pp. 1-37). The appended licence note is marked 'JFK draft-1', 19.04.2000 (PDF pp. 45-46).</dd><dt>Pages</dt><dd>46</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000397/SCOS2000complete_presentation.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000397/SCOS2000complete_presentation.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:09:42Z</dd><dt>SHA-256</dt><dd><code>6174e401e56f90819137779fd1d29d33da608776a68f74a2a77f115ee73eb9e8</code></dd><dt>Size</dt><dd>666.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/scos2000-complete-presentation-2000.pdf">scos2000-complete-presentation-2000.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Complete slide set from the SCOS-2000 meeting with the FIRST/Planck instrument PI groups at ESOC on 18-19 April 2000, compiled into one PDF. Slides 1-37 are the ESOC TOS-GC presentation, led by J-F. Kaufeler (H/TOS-GC). They summarise who used [SCOS-2000](../scos2000/index.md): SOHO (telemetry only, 1995), Huygens, TeamSat and MTP (1997), and at the time Integral, MSG, Rosetta, ERS and PROBA, with Smart-1, Envisat, XMM, Mars Express, FIRST/Planck, CryoSat and GOCE to follow. They explain the change of name from SCOS-2 (up to R1.4) to SCOS-2000 (from R2.0, 1999): a new telemetry chain, an ILOG-based MMI, ObjectStore and CORBA. They also give the release plan through R3.0 (PC and Linux, ObjectStore replaced, mid 2001) and R4.0 (1Q 2002).

The EGSE part draws the parallel between SCOEs, router and SCOS-2000 EGSE on one side and ground station, [NCTRS](../scos2000/nctrs-nis.md) and SCOS-2000 MCS on the other. It reuses PROBA elements: the EGSE router (1 Mbps TM and 4 kbps TC on a Windows NT PC), the SCOS TCP/IP gateway, a TM/TC front end that extracts CCSDS packets and needs a COTS TC encoder for the ground-space protocol and [COP-1](../ccsds/cop-1.md), a Tcl/Tk test procedure environment, and ORACLE or MS-Access database editors.

The remaining TOS slides set out the offer. The software is free under licence, while the PIs buy hardware and COTS (ILOG Views, Ctree+, Orbix, ObjectStore, STL); indicative prices are given for support and a 35 Keur/year/user service. Slides 38-44 are P. Estaria's 'SCOS - 2000 EVALUATION' (PT - 07671) with the FIRST/Planck project position. The last two pages are the TOS licence, support and service note. See [SCOS-2000 as EGSE](../scos2000/egse.md).


## Key points

- SCOS-2000 utilisation: past 1995 SOHO (TLM only) and 1997 Huygens, TeamSat, MTP (Eumetsat); present Integral and MSG (successful SVTs), Rosetta, ERS, migration from SCOS-1 and PROBA (MCS + EGSE). *(PDF p. 6)*
- Planned users: Smart-1, Envisat and XMM (migrations from SCOS-1), Mars-Express, First/Planck MOC and the Earth Core Explorers (Cryosat, GOCE); First/Planck EGSE and PIs marked '??'. *(PDF p. 7)*
- Naming: SCOS-2 until 1998 (up to release R1.4) and SCOS-2000 from 1999 (from R2.0), an evolution with a new TLC chain, architectural consolidation, an MMI fully based on ILOG, systematic use of Object-Store and CORBA-based distribution and external interfaces. *(PDF p. 8)*
- Release status: R2.0 Sep. 1999 (Integral SVTs), R2.1 Mar. 2000 (MSG SVTs), R2.2 Sep. 2000 (end of nominal project). *(PDF p. 9)*
- Evolution: Release 3.0 (mid 2001) ports SCOS-2000 to PC with an OS shell, replaces Object Store and ports first to Linux; Release 4.0 (1Q 2002) allows multiple SCOS-2000 versions on one machine to support constellation missions. *(PDF p. 10)*
- Commonality: SCOEs connect through the ROUTER to a SCOS-2000 EGSE, just as a ground station connects through NCTRS to a SCOS-2000 MCS. *(PDF p. 13)*
- PROBA checkout facility elements: EMCS, a router (TM reception, TC transmission, SCOS gateway), a Tcl/Tk procedure automation tool used for AIV and operations, and ORACLE-based database editors. *(PDF p. 14)*
- Router performance on a Windows NT PC: 1 Mbps TM input and recording via a DMA parallel card, 4 kbps TC via an RS422 card, CPU load below 15 %, and about 2 % CPU per distributed virtual channel. *(PDF p. 18)*
- The TM/TC front end extracts and distributes CCSDS telemetry packets from a digital stream and turns command-packet requests into a CCSDS data stream; with the ground-space protocol the TC part needs a COTS 'TC ENCODER SHELL' (about 10 Keur). *(PDF p. 20)*
- SCOS-2000 COTS: ILOG Views, Ctree+, Orbix, ObjectStore and the STL library; run-time licences cost 2200 EUR per client plus 300 EUR per client per year. *(PDF p. 31)*
- The TC transmission software shell (10 Keur per PC) is required only if the CCSDS COP1 protocol is used. *(PDF p. 32)*
- Indicative service prices: SCOS-2000 installation 10 Keur per site, a developer course 4 Keur, consultancy 14 Keur per man-month per user, and the maintenance service 35 Keur per year per user (including membership of the SCOS-2000 Board). *(PDF p. 36)*
- Evaluation history: SCOS-2000 version 0.2 was evaluated on 3-5 November 1999 by the RTA CWG; PACS captured extra requirements in a Delta URD (04/04/00), not yet consolidated. *(PDF p. 39)*
- Project position: EGSEs are provided by industry (ESA/IPC(89)126); selecting SCOS-2000 as instrument EGSE kernel is entirely a PI decision, and the project provides no technical support, hardware, software or funding. *(PDF p. 41)*


## Cited by these wiki pages (9)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Missions](../missions/index.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (37 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title: FIRST/PLANCK – SCOS-2000, ESOC Darmstadt, 18th/19th April 2000 (TOS-GC) | 1 |
    |  | Agenda | 2 |
    |  | Welcome (H/TOS-G Carlo Mazza) | 3 |
    |  | Introduction (Project, Pierre Estaria) | 4 |
    |  | SCOS-2000 Status (H/TOS-GC Jean-François Kaufeler) | 5 |
    |  | Utilisation | 6 |
    |  | Name? | 8 |
    |  | Status of Releases | 9 |
    |  | SCOS-2000 Evolution | 10 |
    |  | EGSE and Elements | 12 |
    |  | Commonality | 13 |
    |  | Main Elements | 14 |
    |  | System Level Testing | 15 |
    |  | EGSE ROUTER | 16 |
    |  | Performance | 18 |
    |  | SCOS TCP/IP Gateway | 19 |
    |  | TM/TC front end | 20 |
    |  | Test Procedure Environment | 21 |
    |  | TCL/TK | 22 |
    |  | PROBA Status & Plan | 24 |
    |  | Options for SCOS-2000 | 25 |
    |  | TOS Offer (SW Only) | 26 |
    |  | TOS Support | 27 |
    |  | License Agreement / COTS | 28 |
    |  | License | 29 |
    |  | Cost Core HW | 30 |
    |  | Cost COTS's | 31 |
    |  | Support and Service | 33 |
    |  | Approach | 34 |
    |  | SCOS-2000 Support | 36 |
    |  | SCOS-2000 Service | 37 |
    |  | SCOS - 2000 EVALUATION (P. Estaria, PT - 07671): title | 38 |
    |  | SCOS 2000 Evaluation: Introduction, History | 39 |
    |  | SCOS 2000 Evaluation: Meeting objectives | 40 |
    |  | SCOS 2000 Evaluation: FIRST/Planck Project Position | 41 |
    |  | FIRST / PLANCK Software License (TOS, JFK draft-1, 19.04.2000) | 45 |
    |  | Support and Service | 46 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-scos-2000-delta-urd-pis) | SCOS-2000 Delta URD (PIs) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-telemetry-packets-and-command-packet-data-stream-tm-tc-front-end) | CCSDS telemetry packets and command packet data stream (TM/TC front end) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-cop1-protocol) | CCSDS COP1 protocol |  | mentioned |
|  | [PT - 07671](../references/index.md#ref-pt-07671) · [library](spire-000397-07671.md) | SCOS - 2000 EVALUATION (P. Estaria) | 18-19 April 2000 | mentioned |
|  | [catalogue](../references/index.md#ref-delta-urd-pacs-consolidated-04-04-00) | Delta URD (PACS, "consolidated" 04/04/00) | 04/04/00 | mentioned |
|  | [catalogue](../references/index.md#ref-draft-scos-2000-s-w-licence-agreement-proposal) | Draft SCOS-2000 S/W licence agreement proposal |  | mentioned |
|  | [catalogue](../references/index.md#ref-scos-2000-service-and-support-proposal) | SCOS-2000 Service and Support proposal |  | mentioned |
|  | [ESA/IPC(89)126](../references/index.md#ref-esa-ipc89126) | ESA (D/SCI) policy: EGSEs provided by industry as part of the spacecraft procurement contract |  | mentioned |
|  | [catalogue](../references/index.md#ref-aiv-specifications-part-of-the-itt) | AIV specifications (part of the ITT) |  | mentioned |

!!! note "Notes"
    Duplicate. The text extraction is identical to tos-gc-first-planck-presentation-2000: both are 46-page Acrobat Distiller 3.01 files with the metadata title 'Microsoft PowerPoint - TOS-GC_FIRST_Presentation+PIs_20000418', created 8 May 2000, and they differ only in modification time and file size. The PDF is a compilation. PDF pp. 1-37 are the TOS-GC slides, pp. 38-44 repeat spire-000397-07671 (P. Estaria, PT - 07671), and pp. 45-46 repeat spire-sw-licence-application. Slide titles and the 'FIRST/Planck' headers use a font whose text layer is shifted by 29 code points (e.g. '$JHQGD' = 'Agenda', '726*&' = 'TOS-GC'); the titles have been decoded for this entry. Tick marks in the PROBA status table extract as '9'. Diagrams survive only as scattered labels. The text extraction has a trailing empty page 47.

