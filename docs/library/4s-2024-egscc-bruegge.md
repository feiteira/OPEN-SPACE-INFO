---
title: "Integrating small satellites at GSOC with EGS-CC (4S 2024)"
description: "A conference paper from DLR's German Space Operations Center (GSOC) on how to operate New Space small satellites inside a multi-mission environment built on CCSDS and ECSS standards."
tags: ["Paper", "Ground stations, NCTRS/NIS and SLE"]
sources: [4s-2024-egscc-bruegge]
---

# Integrating Small Satellite Missions into a Multi-Mission Operations Environment: A Consolidated Approach with EGS-CC

<dl class="osi-meta"><dt>Date</dt><dd>2024</dd><dt>Organisation</dt><dd>German Space Operations Center (GSOC), Deutsches Zentrum für Luft- und Raumfahrt (DLR); presented at The 4S Symposium 2024</dd><dt>Authors</dt><dd>Tobias Brügge, Gary Morfill, Markus Hobsch, Christian Stangl, Pierre-Alexis Lagadrilliere</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper for The 4S Symposium 2024 (page footers, e.g. PDF p. 1). No version or status information is printed.</dd><dt>Pages</dt><dd>17</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://elib.dlr.de/210417/1/Paper_4S-2024_Integrating-Small-Satellite-Missions-with-EGSCC_Bruegge-4.pdf" rel="noopener">https://elib.dlr.de/210417/1/Paper_4S-2024_Integrating-Small-Satellite-Missions-with-EGSCC_Bruegge-4.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:41Z</dd><dt>SHA-256</dt><dd><code>6c6f9d414862400a05358b409f3e8675a62c98de0e3a493f5fa5c904c0f6183a</code></dd><dt>Size</dt><dd>4.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/4s-2024-egscc-bruegge.pdf">4s-2024-egscc-bruegge.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A conference paper from DLR's German Space Operations Center (GSOC) on how to operate New Space small satellites inside a multi-mission environment built on CCSDS and ECSS standards. It first describes the GSOC set-up: **GECCOS**, a [SCOS-2000](../scos2000/index.md)-based mission control system, connects through the NCTRS protocol to an SLE Switch Board and from there to a worldwide ground station network over [SLE](../ccsds/sle/index.md). Procedures are prepared and run with ProToS, and telemetry is monitored with SATMON. Under this approach the spacecraft manufacturer has to deliver a [MIB](../mib/index.md) and operations procedures.

The case study is **CubeL**, a 3U CubeSat launched in early 2021 that uses the CubeSat Space Protocol (CSP) rather than CCSDS packets and [PUS](../ecss/pus/index.md), and came without a MIB. Integrating it took custom work on both the space and ground segments: a patched modem firmware, a new S-band commanding tool, an auxiliary MIB and a new offline-processing tool.

The proposed alternative uses **EGS-CC**, the planned replacement for GECCOS. Its domain-agnostic kernel is adapted to a mission by an exchangeable Reference Implementation (RI) and by the Tailoring Data Model (TDM). The authors define a CSP RI in which an EGS-CC activity processor calls the manufacturer's CSP C API through SWIG-generated Java/JNI bindings packaged as Karaf bundles. A prototype commanded CubeL in January 2024. The paper ends with an outlook on multiple RIs side by side, a project-specific software modem at the ground-station interface, and how requirements on manufacturers might change (exposing an API instead of delivering a MIB).


## Key points

- GSOC's core mission operations systems and ground station equipment are stated to rely on CCSDS 132.0-B-3, CCSDS 232.0-B-4, CCSDS 133.0-B-2 and ECSS E-ST-70-41C. *(PDF p. 1)*
- GECCOS, the SCOS-2000-based MCS at GSOC, uses the NCTRS protocol to connect to an SLE Switch Board (SSB), which gives access to a worldwide ground station network via SLE. *(PDF p. 3)*
- The two elements described as central to TM/TC communications are the MIB, in which each TM/TC is precisely defined, and the procedures that fix the order in which TCs are sent. *(PDF p. 3)*
- Procedures are prepared and executed with GSOC's ProToS tool suite through the GECCOS API; telemetry is monitored with SATMON, also accessible outside the control centre as SATMON@home. *(PDF p. 4)*
- The paper calls it an 'industry standard' that the manufacturer provides a MIB and the procedures so that SCOS-2000-based systems such as GECCOS can operate the spacecraft. *(PDF p. 4)*
- CubeL (3U CubeSat, launched early 2021) was the first small satellite operated at GSOC; its manufacturer toolkit uses CSP packets over ZMQ with a command-line tool, CSP-Term. *(PDF p. 5)*
- CubeL had no MIB; integrating it required patching the on-board modem firmware, a new S-band commanding tool, an auxiliary MIB for telemetry parsing, a new offline-processing tool and mission-planning changes. *(PDF p. 6)*
- EGS-CC is set to replace GECCOS as the central MCS component at GSOC; its kernel is domain-agnostic and is adapted to an application by a Reference Implementation (RI). *(PDF p. 7)*
- The Tailoring Data Model (TDM) tailors the kernel's abstract Monitoring and Control Model (MCM) into a hierarchy of monitoring and control elements with parameters, events and activities. *(PDF p. 8)*
- In the CSP RI, an activity is routed through the MCA and MCM kernel components to an activity processor that calls the manufacturer's CSP API; the API's return value is mapped to the activity result. *(PDF p. 8)*
- The CSP component is an Apache Maven project with three modules (csp-library, csp-terminal, csp-feature); SWIG generates Java bindings and JNI glue code for the C CSP libraries, deployed in EGS-CC's Apache Karaf OSGi runtime. *(PDF p. 9)*
- A prototype EGS-CC system with a CSP RI commanded CubeL in an experimental pass in January 2024 (pings to the on-board computer and requested housekeeping TM). *(PDF p. 11)*
- For non-CCSDS links the paper proposes routing the RF signal to a project-specific software modem at the operations centre, since the SLE-based ground-station interface and CORTEX hardware rely on CCSDS 401.0, 131.0 and 231.0. *(PDF p. 13)*


## Cited by these wiki pages (6)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)


??? abstract "Contents (19 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract | 1 |
    | 1 | Introduction | 2 |
    | 2 | GSOC Multi-Mission vs. Small Satellites | 2 |
    | 2.1 | Established Systems and Standardization | 2 |
    | 2.2 | The Problem of Custom Protocols in Small Satellites | 4 |
    | 2.3 | Case Study: Integration of CubeL into GSOC MUM | 5 |
    | 3 | Alternative Approach: Integration with EGS-CC | 7 |
    | 3.1 | An Overview of EGS-CC | 7 |
    | 3.2 | Defining a Reference Implementation for CSP | 8 |
    | 3.3 | CSP Component Design | 9 |
    | 4 | Current Status and Outlook | 11 |
    | 4.1 | Commanding CubeL with EGS-CC | 11 |
    | 4.2 | Continued Development of the CSP RI | 12 |
    | 4.3 | General Solution for Multi-Mission Support | 12 |
    | 4.4 | Interface to the Ground Station | 13 |
    | 5 | Conclusion | 14 |
    | References | References | 15 |
    | Abbreviations | List of Abbreviations | 16 |
    | Figures | List of Figures | 17 |


## Documents this one references (15)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [catalogue](../references/index.md#ref-german-space-operations-center-https-www-dlr-de-en-research-and-transfer-project) | German Space Operations Center (https://www.dlr.de/en/research-and-transfer/projects-and-missions/iss/the-german-space-operations-center) | Accessed: 26.03.2024 | bibliography |
| [2] | [doi: 10.2514/6.2016-2599](../references/index.md#ref-doi-10-2514-6-2016-2599) | B. Eilertsen, M. Krynitz, and K. Olafsson, Newspace - forcing a rethink of ground networks, in SpaceOps 2016 Conference | 2016 | bibliography |
| [3] | [isbn: 9781634398343](../references/index.md#ref-isbn-9781634398343) | C. Stangl, B. Lotko, M. P. Geyer, M. Oswald, and A. Braun, GECCOS - The New Monitoring and Control System at DLR-GSOC for Space Operations, based on SCOS-2000, in 13th International Conference on Space Operations (SpaceOps 2014) | 2014 | bibliography |
| [4] | [catalogue](../references/index.md#ref-a-johnstone-cubesat-design-specification-rev-14-1-cal-poly-slo) | A. Johnstone, CubeSat Design Specification Rev 14.1. Cal Poly SLO | Rev 14.1 2022 | bibliography |
| [5] | [catalogue](../references/index.md#ref-satnogs-open-source-global-network-of-satellite-ground-operations-https-satnogs-) | SatNOGS - Open-Source Global Network of Satellite Ground Operations (https://satnogs.org/about) | Accessed: 28.03.2024 | bibliography |
| [6] | [catalogue](../references/index.md#ref-cubesat-space-protocol-https-github-com-libcsp-libcsp) | CubeSat Space Protocol (https://github.com/libcsp/libcsp) | Accessed: 28.03.2024 | bibliography |
| [7] | [catalogue](../references/index.md#ref-t-br-gge-p-a-lagadrilliere-a-geda-and-a-balan-tt-c-over-s-band-with-cubel-findin) | T. Brügge, P.-A. Lagadrilliere, A. Geda, and A. Balan, TT&C over S-Band with CubeL: Finding a Middle Way Between CSP, CCSDS and ECSS, in SpaceOps 2023 Proceedings, Mohammed Bin Rashid Space Centre | 2023 | bibliography |
| [8] | [catalogue](../references/index.md#ref-egs-cc-the-european-infrastructure-for-monitoring-and-control-of-space-systems-h) | EGS-CC - The European Infrastructure for Monitoring and Control of Space Systems (http://www.egscc.esa.int/index.html) | Accessed: 02.04.2024 | bibliography |
| CCSDS 132.0-B-3 | [CCSDS 132.0-B-3](../references/index.md#ref-ccsds-132-0-b-3) · [library](ccsds-132-0-132x0b3.md) | TM Space Data Link | B-3 | mentioned |
| CCSDS 232.0-B-4 | [CCSDS 232.0-B-4](../references/index.md#ref-ccsds-232-0-b-4) · [library](ccsds-232-0-232x0b4e1c1.md) | TC Space Data Link | B-4 | mentioned |
| CCSDS 133.0-B-2 | [CCSDS 133.0-B-2](../references/index.md#ref-ccsds-133-0-b-2) · [library](ccsds-133-0-133x0b2e2.md) | CCSDS 133.0-B-2 | B-2 | mentioned |
| ECSS E-ST-70-41C | [ECSS E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | ECSS E-ST-70-41C | C | mentioned |
| CCSDS 401.0-B-32 | [CCSDS 401.0-B-32](../references/index.md#ref-ccsds-401-0-b-32) | Radio Frequency and Modulation Systems | B-32 | mentioned |
| CCSDS 131.0-B-4 | [CCSDS 131.0-B-4](../references/index.md#ref-ccsds-131-0-b-4) | TM Synchronization and Channel Coding | B-4 | mentioned |
| CCSDS 231.0-B-4 | [CCSDS 231.0-B-4](../references/index.md#ref-ccsds-231-0-b-4) · [library](ccsds-231-0-231x0b4e1.md) | TC Synchronization and Channel Coding | B-4 | mentioned |

!!! note "Notes"
    The extraction reports 18 PDF pages while the registry lists 17; the last page appears to be blank. Figures (GSOC mission operations segment, EGS-CC architecture, CSP component design) are images, and only some of their labels survive in the text. The paper cites CCSDS 131.0-B-4, but the current TM coding issue is B-5; this is only a citation in the paper. GECCOS is spelled out as 'GSOC Enhanced Command and Control System for Operating Spacecrafts' in the abbreviation list (PDF p. 16).

