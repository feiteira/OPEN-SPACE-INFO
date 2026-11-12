---
title: "ECSS-E-ST-70C: Ground systems and operations (2008)"
description: "The top-level ECSS standard for the ground segment and mission operations."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-70c31july2008]
---

# Space engineering
Ground systems and operations

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70C</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-70C Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-70C Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Issue of 31 July 2008. It is the evolution of ECSS-E-70 Part 1A (25 April 2000, principles and requirements) and Part 2A (2 April 2001, document requirements definitions), now published together; ECSS-E-70B was never issued (change log, p. 3). The change log does not give an issue name for the C version. The document does not state that it is superseded, and no later issue is in the library.</dd><dt>Pages</dt><dd>128</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-70C31July2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-70C31July2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:21Z</dd><dt>SHA-256</dt><dd><code>dd4d562bd3ac4898cb5bee7d10a2dd7b79f8c5d3017231eee9a0cd4756514186</code></dd><dt>Size</dt><dd>1.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-70C31July2008.pdf">ECSS-E-ST-70C31July2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The top-level ECSS standard for the **ground segment and mission operations**. It gives the rules, principles and requirements for engineering the ground segment and for preparing and carrying out operations. It also covers the customer relationships with the ground segment supplier (GSS) and with the operations supplier (OS). EGSE for spacecraft verification and the launch segment are excluded.

Clause 4 defines the domain. Operations organizations (teams of operations managers, spacecraft controllers, flight dynamics engineers and others) together with ground systems form *entities*. The ground segment consists of the mission operations system (monitoring and control, flight dynamics, planning, simulation, OBSW maintenance, archiving), the payload operations and data system, the ground station system and the ground communications system.

Clauses 5 and 6 are written as process chains with inputs, requirements and outputs:

* **operations engineering**: requirements analysis and concept (MOCD, SSORD tailored from ECSS-E-ST-70-11, on-board services selected from ECSS-E-ST-70-41), mission operations data production (MOP, procedures, and **monitoring and control databases** populated with TM/TC, display and OBCP definitions), data validation against an operational simulator (System Validation Tests), team training, operational validation, configuration management, execution and disposal;
* **ground segment engineering**: definition, production, AIT and verification, maintenance and disposal.

Clause 7 maps these processes onto phases A to F and their reviews (GSSRR, GSPDR, GSCDR, GSQR, ORR, FRR, IOOR, ELR, MCR). Normative Annexes A to J give the DRDs: CRD, MAR, MOCD, OEP, SSUM, OVP, MOP, OAR, operations procedures and CFISRD. Annex K discusses reuse (common M&C databases between AIT and operations), and Annex L lists the Level-3 standards ECSS-E-ST-70-01, -11, -31, -32 and -41.


## Key points

- Main changes from ECSS-E-70A: a process approach separating operations engineering from ground segment engineering, separate customer-supplier relationships for each, harmonization with ECSS-E-ST-10C, no assumed reference architecture, DRDs as normative annexes, and new DRDs MAR, MOP, CFISRD, OEP and SEP. *(PDF p. 3)*
- Scope excludes ground systems (e.g. EGSE) and operations supporting space segment verification, covered by ECSS-E-ST-10-02, and the launch segment and its operations. *(PDF p. 11)*
- A synthetic parameter is a parameter derived from telemetry and other data via an algorithm; mission operations data are the subset of mission information used to execute in-orbit operations (e.g. procedures, operations rules, monitoring and control databases). *(PDF p. 14)*
- The ground segment typically comprises the mission operations system, the payload operations and data system, the ground station system and the ground communications system. *(PDF p. 20)*
- The mission operations system supports mission analysis, operations preparation, simulation, planning and scheduling, monitoring and control, flight dynamics, on-board software maintenance, data archiving, user services, data product delivery, performance analysis, configuration management and system maintenance. *(PDF p. 21)*
- The ground station system provides TM reception, storage and distribution, TC transmission, tracking/ranging/Doppler/meteo data acquisition, station monitoring and control, time management, network management and data distribution. *(PDF p. 22)*
- Critical areas include reuse of space segment operations knowledge and data (e.g. telemetry and telecommand definitions, procedures) between space segment design, AIT and mission operations. *(PDF p. 23)*
- Space segment operability requirements are compiled in the SSORD, a tailored version of ECSS-E-ST-70-11; the on-board mission operations services, their capability sets and the corresponding telecommands and telemetry are defined with the operations customer, tailoring ECSS-E-ST-70-41. *(PDF p. 29)*
- Inputs to mission operations data production include the SSUM and the space segment monitoring and control database (from the operations customer) and the ground segment monitoring and control database (from the ground segment supplier). *(PDF p. 33)*
- Ground system monitoring and control databases shall be populated with mission-specific data, including mission planning data, OBCPs, telemetry and telecommand definitions, display definitions, on-board software images and patches. *(PDF p. 34)*
- Table 7-8 lists the key ground segment and operations documents and the reviews at which each is deliverable. *(PDF p. 79)*
- Mission operations data are validated with tools representative of the space segment, mainly an operational simulator, and on a flight-representative space segment exercising all procedures, telecommands, modes and redundancies (System Validation Tests). *(PDF p. 36)*
- Table 7-9 defines the ground segment and operations reviews with their purpose, timing and owner, e.g. GSSRR (phase B), GSPDR (end of phase B), GSCDR (end of phase C), GSQR (phase D), ORR (end of phase D, operations customer), ELR (end of phase E2) and MCR (end of phase F). *(PDF p. 81)*
- Annex K recommends reuse of monitoring and control databases and displays between spacecraft manufacturer, check-out and operations, and commonality between EGSE and ground station space link functions (downlink reception, uplink radiation, downlink and uplink data processing). *(PDF p. 124)*
- Annex L lists the level 3 standards: ECSS-E-ST-70-01 (OBCPs), -11 (space segment operability), -31 (monitoring and control data definition, Space System Model), -32 (procedure language, PLUTO) and -41 (PUS). *(PDF p. 127)*


## Cited by these wiki pages (8)

- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [How it all fits together](../overview/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (53 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 10 |
    | 1 | Scope | 11 |
    | 2 | Normative references | 12 |
    | 3 | Terms, definitions and abbreviated terms | 13 |
    | 3.1 | Terms defined in other standards | 13 |
    | 3.2 | Terms specific to the present standard | 13 |
    | 3.3 | Abbreviated terms | 15 |
    | 4 | Ground segment and operations domain | 19 |
    | 4.1 | Overview | 19 |
    | 4.2 | Operations organization | 19 |
    | 4.3 | Ground systems | 20 |
    | 4.4 | Engineering processes | 22 |
    | 4.5 | Critical areas | 23 |
    | 5 | Operations engineering | 24 |
    | 5.1 | Overview | 24 |
    | 5.2 | Requirements analysis and concept development | 26 |
    | 5.3 | Mission operations data production | 33 |
    | 5.4 | Mission operations data validation | 35 |
    | 5.5 | Operations teams build-up and training | 36 |
    | 5.6 | Operational validation | 38 |
    | 5.7 | Operational configuration management | 40 |
    | 5.8 | Operations execution | 42 |
    | 5.9 | Space segment disposal operations | 45 |
    | 6 | Ground segment engineering | 47 |
    | 6.1 | Overview | 47 |
    | 6.2 | Ground segment definition | 49 |
    | 6.3 | Ground segment production | 54 |
    | 6.4 | Ground segment AIT and verification | 56 |
    | 6.5 | Ground segment maintenance | 61 |
    | 6.6 | Ground segment disposal | 63 |
    | 7 | Ground segment and operations lifecycle | 65 |
    | 7.1 | General | 65 |
    | 7.2 | Phase A: Mission and operational analysis, feasibility studies and conceptual design | 67 |
    | 7.3 | Phase B: Preliminary design | 68 |
    | 7.4 | Phase C: Detailed design | 70 |
    | 7.5 | Phase D: Production, AIT and verification | 72 |
    | 7.6 | Phase E: Mission operations | 75 |
    | 7.7 | Phase F: Disposal | 77 |
    | 7.8 | Summary of key documents and reviews | 78 |
    | Annex A | Customer requirements document (CRD) - DRD (normative) | 83 |
    | Annex B | Mission analysis report (MAR) - DRD (normative) | 86 |
    | Annex C | Mission operations concept document (MOCD) - DRD (normative) | 89 |
    | Annex D | Operations engineering plan (OEP) - DRD (normative) | 94 |
    | Annex E | Space segment user manual (SSUM) - DRD (normative) | 97 |
    | Annex F | Operational validation plan (OVP) - DRD (normative) | 105 |
    | Annex G | Mission operations plan (MOP) - DRD (normative) | 108 |
    | Annex H | Operations anomaly report (OAR) - DRD (normative) | 111 |
    | Annex I | Operations procedures - DRD (normative) | 114 |
    | Annex J | Customer furnished items and services requirements document (CFISRD) - DRD (normative) | 118 |
    | Annex K | Commonality considerations (informative) | 123 |
    | Annex L | ECSS-E-ST-70 level 3 standards (informative) | 126 |
    |  | Bibliography | 128 |


## Documents this one references (18)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ECSS-E-ST-10 | [ECSS-E-ST-10](../references/index.md#ref-ecss-e-st-10) | Space engineering – System engineering general requirements |  | normative |
| ECSS-E-ST-10-02 | [ECSS-E-ST-10-02](../references/index.md#ref-ecss-e-st-10-02) | Space engineering – Verification |  | normative |
| ECSS-E-ST-10-06 | [ECSS-E-ST-10-06](../references/index.md#ref-ecss-e-st-10-06) | Space engineering - Technical specification |  | normative |
| ECSS-E-ST-40 | [ECSS-E-ST-40](../references/index.md#ref-ecss-e-st-40) | Space engineering – Software general requirements |  | normative |
| ECSS-M-ST-40 | [ECSS-M-ST-40](../references/index.md#ref-ecss-m-st-40) | Space project management – Configuration and information management |  | normative |
| ECSS-M-ST-70 | [ECSS-M-ST-70](../references/index.md#ref-ecss-m-st-70) | Space project management - Integrated logistic support |  | normative |
| ECSS-Q-ST-10-09 | [ECSS-Q-ST-10-09](../references/index.md#ref-ecss-q-st-10-09) | Space product assurance - Nonconformance control system |  | normative |
| ECSS-Q-ST-80 | [ECSS-Q-ST-80](../references/index.md#ref-ecss-q-st-80) | Space product assurance - Software product assurance |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-10-02 | [ECSS-E-ST-10-02](../references/index.md#ref-ecss-e-st-10-02) | Space engineering – Verification |  | bibliography |
| ECSS-E-ST-70-01 | [ECSS-E-ST-70-01](../references/index.md#ref-ecss-e-st-70-01) | Space engineering – On-board control procedures |  | bibliography |
| ECSS-E-ST-70-11 | [ECSS-E-ST-70-11](../references/index.md#ref-ecss-e-st-70-11) | Space engineering – Space segment operability |  | bibliography |
| ECSS-E-ST-70-31 | [ECSS-E-ST-70-31](../references/index.md#ref-ecss-e-st-70-31) | Space engineering – Ground systems and operations – Monitoring and control data definition |  | bibliography |
| ECSS-E-ST-70-32 | [ECSS-E-ST-70-32](../references/index.md#ref-ecss-e-st-70-32) | Space engineering – Test and operations procedure language |  | bibliography |
| ECSS-E-ST-70-41 | [ECSS-E-ST-70-41](../references/index.md#ref-ecss-e-st-70-41) | Space engineering – Telemetry and telecommand packet utilization |  | bibliography |
| ECSS-M-ST-10 | [ECSS-M-ST-10](../references/index.md#ref-ecss-m-st-10) | Space project management – Project planning and implementation |  | bibliography |
| CCSDS 701.0-B-2 | [CCSDS 701.0-B-2](../references/index.md#ref-ccsds-701-0-b-2) | Advanced Orbiting Systems, Networks and Data Links: Architectural Specification |  | bibliography |

!!! note "Notes"
    The abbreviation table (pp. 15-18) lists the review acronyms (e.g. GSSRR, GSQR, OQR, ORR, IOOR, MCR). Figures 4-2 (ground segment systems) and 7-1 (phases) are graphics. The normative references end with 'do not apply, However' (p. 12), and a MOP requirement ends ';.' (p. 34). The change log sentence 'Like ECSS-E-70A is based on the Customer – Supplier concept' is ungrammatical (p. 3). Related library items: ECSS-E-ST-70-01C (ecss-e-st-70-01c16april2010), ECSS-E-ST-70-11C Rev.1 (ecss-e-st-70-11c-rev-1-15october2025), ECSS-E-ST-70-31C (ecss-e-st-70-31c), ECSS-E-ST-70-32C (ecss-e-st-70-32c31july2008) and ECSS-E-ST-70-41C (ecss-e-st-70-41c-15april2016). Printed page numbers equal PDF page numbers; srcgrep shows 129 PDF pages (the last one blank) while the registry gives 128.

