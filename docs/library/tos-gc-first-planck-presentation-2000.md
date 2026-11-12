---
title: "FIRST/Planck SCOS-2000 meeting slides (TOS-GC, 2000)"
description: "The ESOC TOS-GC presentation 'FIRST/PLANCK – SCOS-2000' given to the FIRST and Planck instrument PI groups at ESOC on 18-19 April 2000, as filed in the SPIRE archive with the speakers' other material "
tags: ["Presentation", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [tos-gc-first-planck-presentation-2000]
---

# FIRST/PLANCK – SCOS-2000

<dl class="osi-meta"><dt>Date</dt><dd>2000-04-18</dd><dt>Organisation</dt><dd>European Space Agency, ESOC TOS-GC; FIRST/Planck Project</dd><dt>Authors</dt><dd>Jean-François Kaufeler, P. Estaria</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Slides presented to the FIRST/Planck PIs at ESOC on 18-19 April 2000; footers dated 18.04.2000 (PDF pp. 1-37). The appended licence note is marked 'JFK draft-1', 19.04.2000 (PDF pp. 45-46).</dd><dt>Pages</dt><dd>46</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000397/tos-gc_first_planck%20-presentation+pis_20000418.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000397/tos-gc_first_planck%20-presentation+pis_20000418.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:09:45Z</dd><dt>SHA-256</dt><dd><code>edb5e51ae581d52b9afa738a857efe2bdec28cf61362034137abeaf27ac141c0</code></dd><dt>Size</dt><dd>678.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/tos-gc-first-planck-presentation-2000.pdf">tos-gc-first-planck-presentation-2000.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The ESOC TOS-GC presentation 'FIRST/PLANCK – SCOS-2000' given to the FIRST and Planck instrument PI groups at ESOC on 18-19 April 2000, as filed in the SPIRE archive with the speakers' other material appended. It is the main technical record of what ESA offered the instrument teams for their EGSE. J-F. Kaufeler (H/TOS-GC) reviewed the state of [SCOS-2000](../scos2000/index.md). It had been used for SOHO telemetry since 1995 and for Huygens, TeamSat and MTP since 1997, and at the time served Integral, MSG, Rosetta, ERS and PROBA. The rename from SCOS-2 to SCOS-2000 at R2.0 (1999) brought a new telemetry chain, an ILOG MMI, ObjectStore and CORBA. Releases ran from R2.0 (September 1999) to R4.0 (1Q 2002), with the port to PC and Linux in R3.0.

The EGSE section draws on PROBA. One kernel serves checkout (SCOEs, router, SCOS-2000 EGSE) and operations (ground station, [NCTRS](../scos2000/nctrs-nis.md), SCOS-2000 MCS). The router handled 1 Mbps TM and 4 kbps TC on a Windows NT PC. A TM/TC front end extracts CCSDS packets and needs a COTS encoder shell when the [COP-1](../ccsds/cop-1.md) protocol is used, and a Tcl/Tk test procedure environment drives procedures through parameter and command interface servers.

The commercial slides cover licences (software free, COTS and hardware bought by the user), hardware and COTS costs, installation, training and consultancy prices, and a maintenance service at 35 Keur per year per user. P. Estaria's project-position slides (PT - 07671) follow. They state that choosing SCOS-2000 was a PI decision and that the project could not fund it. The TOS licence and service note (draft-1) closes the set. See [SCOS-2000 as EGSE](../scos2000/egse.md) and [Herschel and Planck](../missions/herschel-planck.md).


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


## Cited by these wiki pages (2)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
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
    Duplicate of scos2000-complete-presentation-2000. The text extraction is identical, and both files carry the PDF metadata title 'Microsoft PowerPoint - TOS-GC_FIRST_Presentation+PIs_20000418' with creation date 8 May 2000; they differ only in modification time (two minutes apart) and file size. The file name suggests the TOS-GC slides alone, but PDF pp. 38-44 repeat spire-000397-07671 (Estaria, PT - 07671) and pp. 45-46 repeat spire-sw-licence-application. Slide titles use a font whose text layer is shifted by 29 code points; the titles have been decoded for this entry. Tick marks in the PROBA status table extract as '9'. The text extraction has a trailing empty page 47.

