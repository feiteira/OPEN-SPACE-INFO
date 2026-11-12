---
title: "SCOSII: the user's perspective (SpaceOps 94 paper)"
description: "Conference paper by P."
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [ntrs-scos2-new-generation]
---

# SCOSII: ESA's New Generation of Mission Control Systems – The User's Perspective

<dl class="osi-meta"><dt>Document ID</dt><dd>N95-17537</dd><dt>Organisation</dt><dd>European Space Agency, ESOC Mission Operations Department (MOD); VEGA Group PLC</dd><dt>Authors</dt><dd>P. Kaufeler, M. Pecchioli, I. Shurmer</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Historical conference paper. It describes SCOSII as under development: Release 1 'at an advanced stage of implementation' with a preliminary delivery expected in November 1994, and Releases 2 and 3 planned for 1995-6 and 1996-7 (PDF p. 7).</dd><dt>Pages</dt><dd>7</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ntrs.nasa.gov/api/citations/19950011122/downloads/19950011122.pdf" rel="noopener">https://ntrs.nasa.gov/api/citations/19950011122/downloads/19950011122.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:05Z</dd><dt>SHA-256</dt><dd><code>998298653d8f2f7aba20845054d84ae14af2e38b31f898545f7c1411f243e6b3</code></dd><dt>Size</dt><dd>732.0 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/ntrs-scos2-new-generation.pdf">ntrs-scos2-new-generation.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Conference paper by P. Kaufeler and M. Pecchioli (ESOC Mission Operations Department) and I. Shurmer (VEGA) that presents **SCOSII**, ESOC's third-generation generic mission control system, from the flight control team's point of view. It places SCOSII after MSSS (in service 1977) and SCOS-I (1989; Hipparcos, ERS-1, EURECA). It requires SCOSII to follow the CCSDS and ESA packet telemetry and telecommand standards and the guidelines of the ESA Committee for Operations and EGSE Standards (COES).

The paper describes a distributed client-server network of Unix workstations. Its performance goals are 2 Mbps of telemetry and 4 kbps of telecommand with up to 50 workstations, and the whole system is meant to be driven by its database. The **Mission Database** goes beyond earlier TM/TC characteristics databases. It holds a hierarchical model of 'System Elements' with operational modes and roles, planning data, memory images, procedures and system configuration. It is managed as Operational, Active and Draft databases under version and change control.

For monitoring, the paper introduces raw, engineering, functional and status representations of a parameter. It defines parameter validity from several factors and propagates invalidity to [synthetic parameters](../mib/synthetic-parameters.md), and it defines three classes of [checks](../mib/monitoring-checks.md). Commanding treats procedures, command sequences and commands alike as 'Activities'. These are released through a scheduler, a manual stack or an event-driven commander after pre-execution validation, and [verification](../mib/command-verification.md) supports multi-stage criteria with computed windows. The paper ends with historical replay, analysis and report generation and the release plan, naming Huygens, Artemis and Envisat as the first client missions. For this wiki it records the design ideas that came before [SCOS-2000](../scos2000/index.md) and its [MIB](../mib/index.md).


## Key points

- ESOC's generic mission control system line runs from MSSS (in service 1977, still used by MARECS and ECS) to SCOS-I (1989; Hipparcos, ERS-1, EURECA) and then SCOSII. *(PDF p. 1)*
- SCOSII must be compatible with CCSDS and the related ESA standards for telemetry and telecommand packets, and with the standards and guidelines of the ESA Committee for Operations and EGSE Standards (COES). *(PDF p. 1)*
- Architecture: a decentralised client-server network of Unix workstations, with central servers providing system-level services such as the interface to the ground stations. *(PDF p. 1)*
- Performance goals: concurrent real-time telemetry and telecommand rates of 2 Mbps and 4 kbps, display updates faster than 10 per second, and retrieval in 5 s (data a few weeks old) to 30 s (data several years old) with up to 50 workstations in use. *(PDF p. 2)*
- The system can be descoped to a mini-system on a single SUN workstation and, thanks to portability, even on a PC. *(PDF p. 2)*
- The mission is modelled as a whole-part hierarchy of 'System Elements' (mission down to devices hosting measurements and command items) with associated 'Operational Modes' and 'Roles'; modelling is initially limited to data routing, power control and redundancy. *(PDF p. 3)*
- The SCOSII Operations Language provides mini-languages for procedural knowledge, events and actions, and selection strategies. *(PDF p. 3)*
- Three database types: Operational (any number of versions), Active (the Operational database currently supporting real-time operations) and a single Draft database used to build a new Operational one. *(PDF p. 4)*
- Source databases from spacecraft or payload manufacturers (typically several thousand telemetry parameters) are imported in electronic form, e.g. ORACLE or ASCII, with consistency checking that the user can switch off during preparation. *(PDF p. 4)*
- Parameter representations: Raw (uncalibrated), Engineering (calibrated), Functional (e.g. derivative, integral, mean, max) and Status (state of the applicable checking). *(PDF p. 5)*
- Parameter validity depends on power, data unit quality, data routing, age, stability (transients after commanding) and user-defined status; invalidity propagates, e.g. to synthetic parameters using an invalid parameter. *(PDF p. 5)*
- Checking categories: Operational Status Checks, Operational Constraints Checks (never to be violated or disabled) and Behaviour Checks based on predicted on-board status. *(PDF p. 5)*
- An 'Activity' is a Procedure, a Command Sequence or a Command, all treated in the same way; execution facilities are the Scheduler (with Sub-Schedules), the Manual Stack and the Event Driven Commander (EDCRs). *(PDF p. 6)*
- Pre-Execution Validation (PEV) checks have three components: feasibility, safety and dynamic (e.g. time window and interlock) checks. *(PDF p. 6)*
- Command verification supports multi-stage criteria (e.g. reception on-board, reception by application, execution stages); SCOSII computes a verification window per stage from expected execution times and user margins. *(PDF p. 6)*
- History is viewed in 'Replay as Live' mode (interactive technical analysis) or 'Video Replay' mode (same data and workstation layout as at reception). *(PDF p. 7)*
- Release 1 preliminary delivery expected November 1994; Release 2 (1995-6) and Release 3 (1996-7) add modelling, mission planning and data distribution; first client missions HUYGENS, ARTEMIS and ENVISAT, to be launched in 1997-1998. *(PDF p. 7)*


## Cited by these wiki pages (4)

- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (33 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 1 |
    | 1 | Introduction | 1 |
    | 2 | System Characteristics and Concepts | 1 |
    | 2.1 | Architecture | 1 |
    | 2.2 | Overview of Functionality & Utilisation | 1 |
    | 2.3 | Configurability | 2 |
    | 2.4 | Performance | 2 |
    | 2.5 | System Level Tools | 2 |
    | 2.5.1 | Modelling Tool | 2 |
    | 2.5.2 | Operations Language | 3 |
    | 2.5.3 | Mission Database Test Function | 3 |
    | 2.6 | Human Computer Interface (HCI) | 4 |
    | 3 | Mission Database | 4 |
    | 3.1 | Mission Database Structure | 4 |
    | 3.2 | Database Management | 4 |
    | 3.3 | Database Maintenance | 4 |
    | 4 | Monitoring | 5 |
    | 4.1 | Monitoring Parameters | 5 |
    | 4.2 | Parameter Validity | 5 |
    | 4.3 | Parameter Checking | 5 |
    | 5 | Commanding | 5 |
    | 5.1 | Activities | 5 |
    | 5.2 | Preparation | 6 |
    | 5.3 | Activity Execution | 6 |
    | 5.4 | Activity Execution Monitoring | 6 |
    | 6 | Control of SCOSII System | 6 |
    | 7 | Mission Evaluation | 6 |
    | 7.1 | Historical Data Access | 7 |
    | 7.2 | Viewing Historical Data | 7 |
    | 7.3 | Historical Data Analysis | 7 |
    | 7.4 | Report Generation | 7 |
    | 8 | Conclusion | 7 |
    |  | References | 7 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| 1 | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) | Packet Utilisation Standard | issue 1 May 1994 | reference |
| 2 | [catalogue](../references/index.md#ref-n-head-j-f-kaufeler-evolution-of-the-agency-s-software-infrastructure-for-spacec) | N.Head & J.F.Kaufeler, Evolution of the Agency's Software Infrastructure for Spacecraft and Mission Control, ESA Bulletin no.67 | August 1991 | reference |
| 3 | [catalogue](../references/index.md#ref-m-jones-et-al-scosii-esa-s-new-generation-of-mission-control-system-esa-bulletin) | M.Jones et al., SCOSII: ESA's New Generation of Mission Control System, ESA Bulletin no.75 | August 1993 | reference |
| 4 | [catalogue](../references/index.md#ref-a-baldi-et-al-scosii-ol-a-dedicated-language-for-mission-operations-spaceops-94) | A.Baldi et al., SCOSII OL: A Dedicated Language for Mission Operations, SpaceOps 94 |  | reference |
| 5 | [catalogue](../references/index.md#ref-m-jones-n-head-et-al-scosii-esa-s-new-generation-control-system-spaceops-94) | M.Jones, N.Head et al., SCOSII: ESA's New Generation Control System, SpaceOps 94 |  | reference |

!!! note "Notes"
    Scanned NASA NTRS copy (Pdf.Capture OCR); accession number N95-17537 is stamped on PDF p. 1. The OCR text layer has many errors (e.g. 'SCOSI]' and 'eL' for SCOSII and OL) and interleaves the two-column layout. Printed page numbers 719-725 map to PDF pp. 1-7, and the text extraction has a trailing empty page 8. Figures 1-5 survive only as caption fragments. No date or venue is printed. The companion paper ntrs-scosii-ol (printed pp. 689-696) lists this paper as its reference [1] 'these proceedings', and both papers cite SpaceOps 94. That the volume is the SpaceOps 94 proceedings is this catalogue's inference from those citations and the NTRS record number 19950011122. Reference 1 (PUS, ESA PSS-07-101) is marked 'to be published'. The abstract's '1974' start date for ESOC's reusable MCS infrastructure is as printed (OCR).

