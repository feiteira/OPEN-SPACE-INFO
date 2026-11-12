---
title: "Solar Orbiter EID-A (issue 1.0, 2007)"
description: "The first issue of Part A of the Solar Orbiter Experiment Interface Document (EID-A), released by ESA/ESTEC with the instrument Announcement of Opportunity in 2007."
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [12-3-solarorbiter-eid-a-issue-1-0-2007-10-09]
---

# Solar Orbiter Experiment Interface Document Part A

<dl class="osi-meta"><dt>Document ID</dt><dd>SOL-EST-IF-0050</dd><dt>Issue / version</dt><dd>Issue 1, Revision 0</dd><dt>Date</dt><dd>2007-10-09</dd><dt>Organisation</dt><dd>European Space Agency (ESTEC), Solar Orbiter Team</dd><dt>Authors</dt><dd>Solar Orbiter Team, Danielle Renton, Philippe Kletzkine</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1 Revision 0 of 9 October 2007, prepared by the Solar Orbiter Team (book captain Danielle Renton) and approved by Philippe Kletzkine (PDF pp. 1-2); the change log and change record are empty and the status field is blank. Section 1.2 says the EID is first released with the instrument Announcement of Opportunity and placed under configuration control once signed. This is a pre-selection (study phase) issue: many subsections, especially operations and data interfaces, are 'TBD' or 'TBW', and the reference payload and resources were later superseded.</dd><dt>Pages</dt><dd>200</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://explorers.larc.nasa.gov/PDF_FILES/12_3-SolarOrbiter_EID-A_Issue_1-0_2007-10-09.pdf" rel="noopener">https://explorers.larc.nasa.gov/PDF_FILES/12_3-SolarOrbiter_EID-A_Issue_1-0_2007-10-09.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:05Z</dd><dt>SHA-256</dt><dd><code>1b654610c282f217acb80ff846fbf19036dce1008731beabc58239fa051bfbf1</code></dd><dt>Size</dt><dd>1.3 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/12_3-SolarOrbiter_EID-A_Issue_1-0_2007-10-09.pdf">12_3-SolarOrbiter_EID-A_Issue_1-0_2007-10-09.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The first issue of Part A of the Solar Orbiter Experiment Interface Document (EID-A), released by ESA/ESTEC with the instrument Announcement of Opportunity in 2007. EID-A states the technical and programmatic requirements that every Principal Investigator's instrument must meet. Part B, written by each PI, answers it and becomes the binding agreement, and both parts become applicable to the prime contractor.

The document begins with programme background (Cosmic Vision, the joint mission with NASA's Inner Heliospheric Sentinels), the project document tree and the ESA contacts. Section 3 describes the spacecraft as then conceived: perihelion down to 0.22 AU, a heat shield, X-band and Ka-band communications through a steerable HGA, New Norcia as baseline ground station, payload allocations of 180 kg, 180 W and 100 kbps, and a table of candidate instruments (SWA, RPW, MAG, EPD, DPD, VIM, EUS, EUI, COR, STIX, HI/WFC) with their mass, power and data rate. It also covers thermal control and the data handling architecture, in which a data management system is the instruments' gateway to ground over dual cold-redundant SpaceWire links.

Section 4 holds the instrument interface requirements: labelling, lifetime, coordinates, alignment, mechanical, thermal, electrical, SpaceWire data handling (including reception of SpaceWire time codes), 18 software design rules (boot software in PROM, memory areas, event reports on resets and errors, single-TC enabling of uploaded software), EMC, handling and environment. Sections 5 to 8 cover operations (mostly TBW), verification and testing, product assurance and management. Section 9 lists normative ECSS/PSS and informative references. For telemetry and telecommand engineers its value is historical: it shows the Solar Orbiter instrument data interface before PUS and MIB details were defined.


## Key points

- The EID has two parts: EID-A gives the Solar Orbiter technical and programmatic requirements all PIs must comply with; EID-B is the PI's response and the sole binding agreement between the ESA project office and each PI. Both go under formal configuration control once signed and become applicable to the prime contractor. *(PDF p. 11)*
- In 2007 the mission was planned for a 2015 launch, with an ESA-NASA joint mission combining Solar Orbiter and NASA's Inner Heliospheric Sentinels; the Call for Letters of Intent drew 23 responses. *(PDF p. 10)*
- The near-Sun phase brings the spacecraft as close as 0.22 AU. *(PDF p. 14)*
- Communications assumption: X-band and Ka-band transponders with parallel telemetry downlink via a 2-degree-of-freedom steerable HGA, X-band LGA for LEOP, New Norcia as baseline ground station and Cebreros as backup. *(PDF p. 18)*
- Remote sensing instruments operate in three 10-day windows per orbit (around perihelion and at highest northern and southern latitudes), while in situ instruments operate continuously. *(PDF p. 18)*
- Payload allocations: 180 kg mass, 180 W power and 100 kbps data rate. *(PDF p. 20)*
- Candidate instrument data rates in the 2007 table include SWA 14 000 bps, RPW 5 000 bps, MAG 800 bps, EPD 3 100 bps, STIX 200 bps and EUI 20 000 bps, for a total of 106 100 bps that exceeds the allocation. *(PDF p. 21)*
- The data management system provides instrument command and control, command timeline management, packetised science data acquisition, mass memory storage and transmission to ground, and health monitoring of instruments that are off. *(PDF p. 30)*
- Instruments interface with the spacecraft data handling system through a dual cold-redundant SpaceWire interface (ECSS-E-50-12) for TM transmission and TC reception. *(PDF p. 30)*
- Instruments shall be able to receive SpaceWire time codes (ECSS-E-50-12), and each instrument shall support 2 independent SpaceWire lines routed separately to the spacecraft DHS. *(PDF p. 70)*
- On-board software shall comply with ECSS-E-40, keep a minimum boot software in PROM from which all functions are accessible, use separate memory areas for code, constants and variables, and allow uploaded software to be checked before it is enabled by a single telecommand. *(PDF p. 71)*
- Any communication between ground and an on-board software function shall use purpose-designed TC and TM source packets, and the software shall generate event reports before forced resets and on overload, arithmetic overflow, illegal instruction, data bus error, EDAC memory corruption and checksum error. *(PDF p. 71)*
- The MOC supplies PIs in near real time with raw instrument data plus spacecraft HK and auxiliary data, performs out-of-limit checks on a set of payload parameters and notifies anomalies to the SOC and PIs; inputs to the satellite database are still 'TBW'. *(PDF p. 88)*


## Cited by these wiki pages (9)

- [Missions](../missions/index.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Solar Orbiter STIX instrument database](../missions/solar-orbiter/stix.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Solar Orbiter instrument interfaces: SWA DPU ICD and EID-A](../missions/solar-orbiter/instrument-interfaces.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (63 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | GENERAL | 10 |
    | 1.1 | Background | 10 |
    | 1.2 | Scope | 10 |
    | 1.3 | Document Concept & Architecture | 12 |
    | 2 | KEY PERSONNEL AND RESPONSIBILITIES | 13 |
    | 2.1 | ESA Personnel | 13 |
    | 2.2 | Contractor Personnel | 13 |
    | 3 | SPACECRAFT DESCRIPTION | 14 |
    | 3.1 | Mission Objectives | 14 |
    | 3.2 | Mission Overview | 15 |
    | 3.3 | Spacecraft Main Characteristics | 17 |
    | 3.4 | Solar Orbiter Thermal Control System | 22 |
    | 3.5 | Satellite Data Handling Architecture | 30 |
    | 3.6 | Description of Spacecraft Dynamic Environment | 32 |
    | 4 | INSTRUMENT INTERFACES | 33 |
    | 4.1 | Identification and Labelling | 33 |
    | 4.2 | General Design Requirements | 34 |
    | 4.3 | Co-ordinate System | 37 |
    | 4.4 | Instrument Location and Alignment | 39 |
    | 4.5 | External Configuration Drawings | 47 |
    | 4.6 | Mechanical Interfaces | 48 |
    | 4.7 | Thermal Design Requirements | 53 |
    | 4.8 | Electrical Design Requirements | 67 |
    | 4.9 | Software Design and Interface Requirements | 71 |
    | 4.10 | Electromagnetic Design and Interface Requirements | 73 |
    | 4.11 | Instrument Handling | 79 |
    | 4.12 | Environment Requirements | 80 |
    | 5 | OPERATIONAL REQUIREMENTS | 87 |
    | 5.1 | Instrument Modes | 87 |
    | 5.2 | Ground Operations | 87 |
    | 5.3 | Flight Operations | 87 |
    | 6 | VERIFICATION REQUIREMENTS | 91 |
    | 6.1 | General | 91 |
    | 6.2 | Verification Concept | 95 |
    | 6.3 | Analysis | 96 |
    | 6.4 | Testing | 101 |
    | 6.5 | Inspections | 126 |
    | 6.6 | Calibration | 127 |
    | 6.7 | Final Acceptance | 127 |
    | 6.8 | System Level AIT | 128 |
    | 7 | PRODUCT ASSURANCE REQUIREMENTS | 132 |
    | 7.1 | General | 132 |
    | 7.2 | Product Assurance Management | 134 |
    | 7.3 | Quality Assurance Management | 138 |
    | 7.4 | Safety Assurance | 149 |
    | 7.5 | Dependability Assurance | 150 |
    | 7.6 | EEE Parts Selection and Control | 154 |
    | 7.7 | Materials and Process Selection and Control | 162 |
    | 7.8 | Software Product Assurance | 165 |
    | 7.9 | Cleanliness and Contamination Control | 167 |
    | 8 | MANAGEMENT REQUIREMENTS | 168 |
    | 8.1 | Introduction | 168 |
    | 8.2 | Organization and Responsibilities | 168 |
    | 8.3 | Communications within the Programme | 175 |
    | 8.4 | Project Phasing and Planning | 176 |
    | 8.5 | Meetings and Reviews | 179 |
    | 8.6 | Configuration Management | 183 |
    | 8.7 | Deliverable Items | 186 |
    | 8.8 | Schedules | 189 |
    | 9 | DOCUMENTS | 192 |
    | 9.1 | Normative References | 192 |
    | 9.2 | Informative References | 194 |
    | 10 | ACRONYMS | 195 |


## Documents this one references (36)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [NR1] | [Sol-EST-RS-0049](../references/index.md#ref-sol-est-rs-0049) | Mission Requirements Document for Solar Orbiter | Issue 3 June 2006 | normative |
| [NR2] | [ECSS-E-50-12](../references/index.md#ref-ecss-e-50-12) | SpaceWire - Links, nodes, routers and networks | Jan 2003 | normative |
| [NR3] | [ECSS-E-30 Part 1A](../references/index.md#ref-ecss-e-30-part-1a) | ECSS-E-30 Part 1A |  | normative |
| [NR4] | [ECSS-E-10-12](../references/index.md#ref-ecss-e-10-12) | ECSS-E-10-12 |  | normative |
| [NR5] | [ECSS-E-10-4](../references/index.md#ref-ecss-e-10-4) | ECSS-E-10-4 |  | normative |
| [NR6] | [ECSS-E-50-12](../references/index.md#ref-ecss-e-50-12) | ECSS-E-50-12 |  | normative |
| [NR7] | [ECSS-E-20A](../references/index.md#ref-ecss-e-20a) | ECSS-E-20A section 6.3.3.3d and par. 5.9 |  | normative |
| [NR8] | [ECSS-E-30-02](../references/index.md#ref-ecss-e-30-02) | ECSS-E-30-02 |  | normative |
| [NR9] | [ECSS-Q-00A](../references/index.md#ref-ecss-q-00a) | ECSS-Q-00A |  | normative |
| [NR10] | [ECSS-Q-20B](../references/index.md#ref-ecss-q-20b) | Quality Assurance |  | normative |
| [NR11] | [ECSS-Q-30-02 A](../references/index.md#ref-ecss-q-30-02-a) | ECSS-Q-30-02 A |  | normative |
| [NR12] | [ECSS-Q-30 B](../references/index.md#ref-ecss-q-30-b) | ECSS-Q-30 B |  | normative |
| [NR13] | [PSS-01-301](../references/index.md#ref-pss-01-301) | PSS-01-301 |  | normative |
| [NR14] | [ECSS-Q-60 A](../references/index.md#ref-ecss-q-60-a) | EEE Components Control |  | normative |
| [NR15] | [ECSS-Q-70 A](../references/index.md#ref-ecss-q-70-a) | Materials, Mechanical Parts and Processes |  | normative |
| [NR16] | [ECSS-10-04 A](../references/index.md#ref-ecss-10-04-a) | Space Environment |  | normative |
| [NR17] | [ECSS-Q-60-01 A](../references/index.md#ref-ecss-q-60-01-a) | European Preferred Parts List and its Management |  | normative |
| [NR18] | [ESA PSS-01-608](../references/index.md#ref-esa-pss-01-608) | Generic Specification for Hybrid Micro-circuits |  | normative |
| [NR19] | [ECSS-E-30-01a](../references/index.md#ref-ecss-e-30-01a) | ECSS-E-30-01a |  | normative |
| [NR20] | [ECSS-E-40](../references/index.md#ref-ecss-e-40) | Software |  | normative |
| [NR21] | [ECSS-Q-20-04A](../references/index.md#ref-ecss-q-20-04a) | ECSS-Q-20-04A |  | normative |
| [NR22] | [ECSS-Q-20-09](../references/index.md#ref-ecss-q-20-09) | ECSS-Q-20-09 |  | normative |
| [NR23] | [ESA PSS-01-606](../references/index.md#ref-esa-pss-01-606) | Capability Approval Programme for Hermetic Thick Film Hybrid Micro-Circuits |  | normative |
| [NR24] | [ESA PSS-01-605](../references/index.md#ref-esa-pss-01-605) | Capability Approval Programme for Hermetic Thin Film Hybrid Micro-Circuits |  | normative |
| [NR25] | [MIL-HDBK-5](../references/index.md#ref-mil-hdbk-5) | MIL-HDBK-5 |  | normative |
| [NR26] | [ECSS-Q-70-08 A](../references/index.md#ref-ecss-q-70-08-a) | The manual soldering of high-reliability electrical connections |  | normative |
| [NR27] | [ECSS-Q-70-28 A](../references/index.md#ref-ecss-q-70-28-a) | Repair and modification of printed circuit board assemblies for space use |  | normative |
| [NR28] | [ECSS-Q-80](../references/index.md#ref-ecss-q-80) | Software Product Assurance |  | normative |
| [NR29] | [ECSS-Q-70-01A](../references/index.md#ref-ecss-q-70-01a) | Contamination and cleanliness control |  | normative |
| [IR1] | [SOL-EST-SP-00705](../references/index.md#ref-sol-est-sp-00705) | Solar Orbiter Payload Definition Document | issue 6 October 2007 | informative |
| [IR2] | [TEC-EES-03-034/JS](../references/index.md#ref-tec-ees-03-034-js) | Solar Orbiter Environmental Specification | issue 1, revision 3 January 2006 | informative |
| [IR3] | [ST-GTD-SUM-01](../references/index.md#ref-st-gtd-sum-01) | Soyuz User's Manual | issue 3, revision 0 April 2001 | informative |
| [IR4] | [ESA Contract 12398](../references/index.md#ref-esa-contract-12398) | Study of the Interaction between the Rosetta Orbiter and the Cometary Plasma, Final Report of ESA Contract 12398 | 1999 | informative |
| [IR5] | [catalogue](../references/index.md#ref-solar-orbiter-science-requirements-document) | Solar Orbiter Science Requirements Document | issue 1, revision 0 December 2003 | informative |
| [IR6] | [MAO-WP-483](../references/index.md#ref-mao-wp-483) | Solar Orbiter Mission Analysis | issue 1, revision 1 November 2005 | informative |
| [IR7] | [CLSB-0409-1109](../references/index.md#ref-clsb-0409-1109) | Atlas Launch System Mission Planner's Guide | Revision 10a January 2007 | informative |

!!! note "Notes"
    Text-based PDF with 200 pages (the text extraction shows a 201st, empty page); printed page numbers ('page n of 200') match PDF page indexes. The title page text is garbled by a decorative font ('OLAR RBITER XPERIMENT NTERFACE OCUMENT ART'), and the title was read as 'Solar Orbiter Experiment Interface Document Part A'. Section 2.1 prints ESA staff telephone numbers and e-mail addresses, which are deliberately omitted here. NR2 and NR6 both cite ECSS-E-50-12. Section 4.10.1 points to a 'Section 3.6.3' for EMC performance requirements. Many operations and data-interface subsections (5.2.2, 5.3.2, 5.3.3 'Inputs to Satellite Database', 4.8.2.4 'Digital Telemetry') are TBW or TBD. It predates instrument selection; the operational SWA and STIX databases in the library (swa-idb-ascii, swa-idb-v6-5-0, stix-idb-v2-26-38-raw) and the SWA DPU ICD (so-swa-dpu-cd-ic-003-dpu-communications-interface-control-document-issue8-2) reflect the later, implemented interfaces. Hosted on a NASA explorers.larc.nasa.gov page (file name prefix '12_3').

