---
title: "Mission Families: cost-effective MCS development (GSAW 2005)"
description: "An ESOC slide presentation from GSAW 2005 on how ESOC reuses software across mission control systems."
tags: ["Presentation", "Ground stations, NCTRS/NIS and SLE"]
sources: [gsaw2005-guerrucci]
---

# Mission Families: a cost effective approach to Mission Control System development

<dl class="osi-meta"><dt>Date</dt><dd>2005-03-01</dd><dt>Organisation</dt><dd>European Space Agency (ESA), European Space Operations Centre (ESOC), Darmstadt; presented at the Ground System Architectures Workshop (GSAW) 2005, 1 - 3 Mar. 2005</dd><dt>Authors</dt><dd>Damiano Guerrucci, Vemund Reggestad, Mario Merri, Pierpaolo Emanuelli</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Slide deck for GSAW 2005 ('Common Solutions' session), 1 - 3 Mar. 2005 (footer on every slide). The date given here is the first day of the workshop.</dd><dt>Pages</dt><dd>19</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://gsaw.org/wp-content/uploads/2019/10/2005s07guerrucci.pdf" rel="noopener">https://gsaw.org/wp-content/uploads/2019/10/2005s07guerrucci.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:20Z</dd><dt>SHA-256</dt><dd><code>29f7ec298e5c905230f1316d45456459fda5ecb031dbfed76a27bb52547f061e</code></dd><dt>Size</dt><dd>259.5 KB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/gsaw2005-guerrucci.pdf">gsaw2005-guerrucci.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ESOC slide presentation from GSAW 2005 on how ESOC reuses software across mission control systems. The software infrastructure it lists is [SCOS-2000](../scos2000/index.md) for TM processing, TC uplink and verification, archiving and displays, [NCTRS](../scos2000/nctrs-nis.md) as the interface to the ground station network (SLE for non-ESA stations), [GDDS](../scos2000/gdds-and-ddids.md), [TDRS](../scos2000/tdrs.md) and WebRM for web access by external users, and other reusable tools (the XMM file transfer system, the Envisat mission planning system, the CryoSat database editors). Reuse rests on software designed for it, on harmonised spacecraft design and on standards: CCSDS packet TM/TC, the ECSS [Packet Utilisation Standard](../ecss/pus/index.md), [SLE](../ccsds/sle/index.md) and XML.

The core idea is the **'delta' approach**: MCS requirements, design, tests and maintenance are written only as differences from SCOS-2000. The talk then introduces **mission families** (Earth Explorer, Planetary, Observatory), where a family kernel layer on top of SCOS-2000 collects features that similar missions need but that are too specific for SCOS-2000 itself. The worked example is the Earth Explorer family. CryoSat came first as a delta against SCOS-2000, GOCE was built as a delta against CryoSat, which defined the EE kernel, and Aeolus as a delta against that kernel. Requirement counts are given at definition phase (804 in total, 592 kernel and 212 mission-specific) and in the current heritage (680 kernel, 872 in total). The slides list the features each mission contributed, for example an offline database editor and consistency checker, playback TM processing with command verification, on-board queue dump processing, a time correlator, TM data gap identification and automatic schedule execution in NIS/NCTRS. The conclusions stress early involvement of ground teams in spacecraft TM/TC design.


## Key points

- ESOC's reuse rests on infrastructure components designed for reuse, harmonised spacecraft design, and standards: CCSDS packet TM/TC, the ECSS Packet Utilisation Standard, SLE and XML. *(PDF p. 4)*
- The ESOC software infrastructure is listed as SCOS-2000, NCTRS (interface to the ground station network, with SLE for non-ESA stations), GDDS, and TDRS with WebRM for external users such as payload owners. *(PDF p. 5)*
- The ground segment scenario shows NCTRS between ground station and MCS (SCOS-2000) on the Ops LAN, with an FTS and a Generic Data Distribution System behind firewalls on a relay LAN towards external users. *(PDF p. 6)*
- In the 'delta' approach MCS requirements are written only as deltas against the software infrastructure (typically SCOS-2000), and the approach extends to design, development, testing and maintenance. *(PDF p. 7)*
- ESOC mission families: Earth Explorer (low Earth orbit, short visibility), Planetary (long propagation delay, on-board autonomy) and Observatory (long visibility, proposal-based observations). *(PDF p. 10)*
- CryoSat was the first mission to apply the delta approach against SCOS-2000; GOCE was defined as a delta against CryoSat, making the EE Mission Family Kernel concrete; Aeolus was defined against the EE kernel. *(PDF p. 11)*
- At definition phase: CryoSat SRD 406 kernel + 35 specific (441), GOCE SRD 129 + 62 (191), Aeolus SRS 57 + 115 (172); in total 592 kernel and 212 mission-specific requirements (804). *(PDF p. 13)*
- EE requirements heritage: 680 kernel requirements, 35 CryoSat-specific, 42 GOCE-specific and 115 Aeolus-specific, 872 in total. *(PDF p. 14)*
- CryoSat contributions include an offline database editor and consistency check system, a command and parameter identifier extension to the command subsystem, playback TM processing with command verification, and on-board queue dump processing with automatic generation of delete commands. *(PDF p. 15)*
- GOCE contributed TM data gap identification, automatic TM replay and a time correlator; Aeolus contributed weekly consolidation of playback TM and automatic schedule execution in the Network Interface System (NCTRS). *(PDF p. 16)*


## Cited by these wiki pages (16)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [TDRS: Telemetry Data Retrieval Service](../scos2000/tdrs.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (19 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Slide 1 | Title | 1 |
    | Slide 2 | Overview | 2 |
    | Slide 3 | Reuse Strategy at ESOC | 3 |
    | Slide 4 | Software Reuse Bases | 4 |
    | Slide 5 | ESOC Software Infrastructure | 5 |
    | Slide 6 | ESOC Ground Segment Scenario | 6 |
    | Slide 7 | The "Delta" Approach | 7 |
    | Slide 8 | Why Mission Families? | 8 |
    | Slide 9 | Delta Approach applied to Mission Families | 9 |
    | Slide 10 | Mission Families at ESOC | 10 |
    | Slide 11 | The Earth Explorer Mission Family Evolution | 11 |
    | Slide 12 | The EE Mission Family Requirements Sets | 12 |
    | Slide 13 | The EE Mission Family Requirements Definition | 13 |
    | Slide 14 | The EE Mission Family Heritage Today | 14 |
    | Slide 15 | Missions contribution to the EE Kernel (1) | 15 |
    | Slide 16 | Missions contribution to the EE Kernel (2) | 16 |
    | Slide 17 | The Development Workspace | 17 |
    | Slide 18 | Conclusions | 18 |
    | Slide 19 | Links | 19 |


## Documents this one references (7)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| Earth Explorer Missions | [catalogue](../references/index.md#ref-earth-explorer-missions-http-www-esa-int-export-esalp-earthexplorers-html) | Earth Explorer Missions (http://www.esa.int/export/esaLP/earthexplorers.html) |  | bibliography |
| Cryosat Mission | [catalogue](../references/index.md#ref-cryosat-mission-http-www-esa-int-export-esalp-cryosat-html) | Cryosat Mission (http://www.esa.int/export/esaLP/cryosat.html) |  | bibliography |
| Goce Mission | [catalogue](../references/index.md#ref-goce-mission-http-www-esa-int-export-esalp-goce-html) | Goce Mission (http://www.esa.int/export/esaLP/goce.html) |  | bibliography |
| Aeolus Mission | [catalogue](../references/index.md#ref-aeolus-mission-http-www-esa-int-export-esalp-aeolus-html) | Aeolus Mission (http://www.esa.int/export/esaLP/aeolus.html) |  | bibliography |
| PUS | [catalogue](../references/index.md#ref-packet-utilisation-standard-ecss) | Packet Utilisation Standard (ECSS) |  | mentioned |
| CCSDS packet TM/TC | [catalogue](../references/index.md#ref-packet-tm-tc-standards-from-ccsds) | Packet TM/TC standards (from CCSDS) |  | mentioned |
| SLE | [catalogue](../references/index.md#ref-space-link-extension-sle) | Space Link Extension (SLE) |  | mentioned |

!!! note "Notes"
    Slide deck with no document number; PDF page n is slide n. Slide 5 expands NCTRS as 'Network Control and TM/TC Router System', GDDS as 'Generic Data Disposition System' and TDRS as 'Telemetry Data Retrieval Services', while slide 6 labels the GDDS box 'Generic Data Distribution System'. The bar chart on slide 14 (cost in KEuro) is only partly legible in the extraction. The extraction reports 20 PDF pages (registry: 19); the last is empty. Related library item: bul130-merri-happy-families (ESA Bulletin article on the same mission-family theme, co-authored by Mario Merri).

