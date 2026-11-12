---
title: "Terma CCS5 & TSC presentation"
description: "A 56-slide public product presentation by Terma, dated 13 March 2024, on CCS5 (multi-user checkout and operations system) and TSC (single-user version for instruments, payloads and SCOE AIT), part of "
tags: ["Presentation", "Tools, MIB editors and related standards"]
sources: [terma-ccs5-tsc-presentation]
---

# CCS5 &amp; TSC: Spacecraft Monitoring &amp; Control Systems

<dl class="osi-meta"><dt>Date</dt><dd>2024-03-13</dd><dt>Organisation</dt><dd>Terma (The Terma Group)</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Marked PUBLIC, dated 13 March 2024 on the title slide (PDF p. 1); slide footers carry '(c) The Terma Group 2022'.</dd><dt>Pages</dt><dd>56</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://tgss-static.terma.com/public/PresentationCcs5andTsc.pdf" rel="noopener">https://tgss-static.terma.com/public/PresentationCcs5andTsc.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:13Z</dd><dt>SHA-256</dt><dd><code>ab1ddf4443fa681f71264086e1f516eaf7d003edf00966be0d55b37d7273aa3a</code></dd><dt>Size</dt><dd>8.1 MB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/terma-ccs5-tsc-presentation.pdf">terma-ccs5-tsc-presentation.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 56-slide public product presentation by Terma, dated 13 March 2024, on CCS5 (multi-user checkout and operations system) and TSC (single-user version for instruments, payloads and SCOE AIT), part of the Terma Ground Segment Suite (TGSS).

It explains the motivation: legacy European systems such as SCOS-2000, OC and CGS were judged hard and costly to maintain, so Terma wrote a completely new implementation that stays compatible with the SCOS-2000 MIB data model (ICD 6.9 to 7.2) and with SCOS-2000 TOPE scripting, so that users need little retraining. Slides list the supported standards (PUS-A and PUS-C, CCSDS packets and CFDP, TM frames, TC CLTU and COP-1, CCSDS 355.0/355.1 SDLS and ESA PSS-04-151 authentication, CubeSat Space Protocol), the MIB extensions (unlimited field lengths, variable packets, deduced parameters in TM and TC, configurable length indicators, endianness, several synthetic-parameter languages), and the EGSE packet-level plugins (EDEN, C&C, serial, CAN, ZMQ, NATS) and MCS frame-level drivers (NIS with optional SLE, Cortex, NDIU LITE, KSAT LITE).

Further slides cover performance figures, Qt/QML displays and mimics, TOPE (Tcl/Tk) automation and debugger, the archive (RDBMS index plus segmented raw binary files with nanosecond time stamps), history browsers and retrieval tools, merging MIBs from several suppliers, SVF mode, TM simulation from the MIB, TC modelling, AutoPilot and fleet views, constellation and Kubernetes cloud deployment, related tools (TRACK, PLAN, STAT), instrument and payload EGSE use cases, user roles, quality process and licensing.

It shows how the SCOS-2000 MIB has become a de facto exchange format beyond ESOC's own software.


## Key points

- Terma decided on a fully new implementation of compatible products using the SCOS2000 MIB data model, because legacy European systems (e.g. SCOS2000, OC, CGS) were becoming difficult and uneconomic to maintain; TSC is single user (instruments, payloads, SCOE AIT) and CCS5 multi-user (satellite-level AIT and operations). *(PDF p. 3)*
- The TM/TC features follow and enhance those of the SCOS2000 MIB (ICD 6.9 to 7.2) and support ECSS PUS-A and PUS-C, while PUS is not mandatory. *(PDF p. 7)*
- MIB enhancements include unlimited field lengths, global variable packets and parameters, deduced parameters in TM and TC, configurable length indicators for variable-length parameters, endianness support, automatic TC header time stamps and several synthetic-parameter languages. *(PDF p. 7)*
- EGSE packet-level plugins (EDEN, C&C, serial, CAN, ZMQ, NATS) cannot be mixed in one program, while MCS frame-level protocols (NIS with optional SLE, Cortex, NDIU LITE, KSAT LITE) can be combined in any combination. *(PDF p. 8)*
- Quoted maximum performance: about 150,000 TM parameter updates/s, about 1500 TM packets/s, about 5 Mbit/s monitored housekeeping and 80 Mbit/s unmonitored data, and about 500 TC/s (TSC) or 100 TC/s (CCS) with verification. *(PDF p. 12)*
- TOPE (Test & Operations Procedure Executive) is Tcl/Tk based, with syntax and basic commands derived from SCOS2000 TOPE; it adds session control, TM packet simulation, TC modelling, COP-1 control and frame-level coding and decoding. *(PDF p. 31)*
- Archive indexes are stored in an RDBMS (MySQL, MariaDB or PostgreSQL; TSC uses SQLite), TM parameters are stored on change, raw data is kept in segmented binary files with nanosecond time stamps, and every TC verification stage is recorded. *(PDF p. 35)*
- MIBs from different suppliers (platform, payloads, instruments, EGSE) can be merged, dropped and loaded without restart, with online viewing, search, filter and patch features. *(PDF p. 40)*
- TM packets can be simulated from the MIB definition by inverting TM processing, for example to simulate a platform or act as a SCOE controller. *(PDF p. 42)*
- Built-in security support covers CCSDS 355.0-B-1 and 355.1-B-1 extended procedures (CMAC, HMAC, GMAC, CBC-MAC; ECB, GCM, CCM) and ESA PSS-04-151 hard-knapsack authentication with a 'Sentinel1' CMAC enhancement. *(PDF p. 44)*
- AutoPilot uses NATS publish/subscribe messages carrying JSON or CBOR, supports constellations of up to 9999 spacecraft and is also accessible from Python. *(PDF p. 25)*


## Cited by these wiki pages (4)

- [MIB tooling and open-source libraries](../mib/tooling.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)


??? abstract "Contents (50 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Software Tools for Spacecraft Monitoring | 2 |
    |  | Motivations & History | 3 |
    |  | Satellite Checkout & Operations | 4 |
    |  | Easy to Install & Set Up | 5 |
    |  | Configuring CCS | 6 |
    |  | Standards Support | 7 |
    |  | External Interfaces | 8 |
    |  | Mixed Interface Protocols | 9 |
    |  | Example GSFE Configuration | 10 |
    |  | Performance | 11 |
    |  | Maximum Performance | 12 |
    |  | User Interfaces | 13 |
    |  | Default User Interface | 14 |
    |  | Alphanumeric Displays | 16 |
    |  | Mimic Displays | 17 |
    |  | AutoPilot (AP) Fleet Viewer | 18 |
    |  | Custom QML Displays | 19 |
    |  | TGSS: Terma Ground Segment Suite | 20 |
    |  | TRACK: Orbit Visualisation | 21 |
    |  | PLAN: Mission Planning & Scheduling | 22 |
    |  | STAT: Long-term Archiving & Visualisation | 23 |
    |  | Constellation & Fleet Support | 24 |
    |  | CCS5 AutoPilot | 25 |
    |  | Constellation Configuration | 26 |
    |  | Constellation Deployment - Native VM's | 27 |
    |  | Large Constellation Example | 28 |
    |  | Cloud Deployment | 29 |
    |  | Automation (TOPE) | 30 |
    |  | TOPE Detailed Features | 31 |
    |  | TOPE in CCS | 32 |
    |  | TOPE Debugger | 33 |
    |  | Archive Access & Retrieval | 34 |
    |  | Archive Technical Details | 35 |
    |  | CCS History Browsers | 36 |
    |  | CCS5 Archive Retrieval Tools | 37 |
    |  | CCS Archive Session Management | 38 |
    |  | Special Features | 39 |
    |  | Merging TMTC Databases | 40 |
    |  | SVF Mode | 41 |
    |  | TM Simulation | 42 |
    |  | Advanced TC Modelling & Cyclic TC | 43 |
    |  | Authentication & Encryption | 44 |
    |  | Test Coverage Reporting | 45 |
    |  | CCS Web Services | 46 |
    |  | Complex Use Cases: Advanced Applications for AIT | 47 |
    |  | Instrument EGSE & Science Data Processing | 48 |
    |  | Payload EGSE & Platform Simulation | 50 |
    |  | User Roles & Deployment | 52 |
    |  | Quality & Testing | 54 |
    |  | Legal, Licensing & Purchasing | 55 |


## Documents this one references (16)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-scos2000-mib-icd-6-9-to-7-2) | SCOS2000 MIB (ICD 6.9 to 7.2) | 6.9+...7.2 | mentioned |
|  | [catalogue](../references/index.md#ref-ecss-pus-a-and-pus-c) | ECSS PUS-A and PUS-C |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-tmtc-packets-cfdp) | CCSDS TMTC Packets & CFDP |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-tm-frames-tc-cltu-cop1) | CCSDS TM Frames & TC CLTU, COP1 |  | mentioned |
|  | [catalogue](../references/index.md#ref-esa-ccsds-authentication-encryption) | ESA & CCSDS Authentication & Encryption |  | mentioned |
|  | [catalogue](../references/index.md#ref-cubesat-space-protocol-v1-v2-csp) | CubeSat Space Protocol v1 & v2 (CSP) |  | mentioned |
|  | [catalogue](../references/index.md#ref-eden-protocol) | EDEN Protocol |  | mentioned |
|  | [catalogue](../references/index.md#ref-c-c-protocol) | C&C Protocol |  | mentioned |
|  | [catalogue](../references/index.md#ref-nis-optional-sle) | NIS (+ optional SLE) |  | mentioned |
|  | [catalogue](../references/index.md#ref-cortex) | Cortex |  | mentioned |
|  | [catalogue](../references/index.md#ref-ndiu-lite) | NDIU LITE |  | mentioned |
|  | [catalogue](../references/index.md#ref-ksat-lite) | KSAT LITE |  | mentioned |
|  | [CCSDS 355-0-B1](../references/index.md#ref-ccsds-355-0-b1) | CCSDS 355-0-B1 (Space Data Link Security) extended procedures |  | mentioned |
|  | [CCSDS 355-1-B1](../references/index.md#ref-ccsds-355-1-b1) | CCSDS 355-1-B1 (SDLS extended procedures) |  | mentioned |
|  | [ESA PSS-04-151](../references/index.md#ref-esa-pss-04-151) | ESA PSS-04-151 hard knapsack authentication |  | mentioned |
|  | [NIST FIPS-140](../references/index.md#ref-nist-fips-140) | NIST FIPS-140 compliance |  | mentioned |

!!! note "Notes"
    Exported from PowerPoint; several slides are mostly screenshots or diagrams whose text layer is fragmentary (for example PDF pp. 4, 22, 23, 25, 28, 29). The title slide prints 'CCS5 & TSC' with the subtitle 'SPACECRAFT MONITORING & CONTROL SYSTEMS' in capitals; the title above combines them. No speaker is named on the slides. The extracted text has an empty 57th page after a trailing form feed. Companion to the Terma data sheet terma-ccs5-datasheet (which names SCS5 as the operations product).

