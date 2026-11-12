---
title: "DLR V3C mobile compact control center (SpaceOps 2021)"
description: "A DLR/GSOC conference paper on V3C ('Verlegefähiges' Compact Control Center)."
tags: ["Paper", "Ground stations, NCTRS/NIS and SLE"]
sources: [spaceops2021-dlr-mobile-mcs]
---

# A Mobile and Compact Control Center for Quick Decentral Satellite Access

<dl class="osi-meta"><dt>Document ID</dt><dd>SpaceOps-2021,4,x1288</dd><dt>Issue / version</dt><dd>Author Accepted Manuscript</dd><dt>Date</dt><dd>2021</dd><dt>Organisation</dt><dd>German Space Operations Center (GSOC), DLR Oberpfaffenhofen; published in Space Operations (Springer, 2022)</dd><dt>Authors</dt><dd>Stefan A. Gärtner, Norbert Harder, Jens H. Hartung, Markus Hobsch, Martin Weigel</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Author Accepted Manuscript of a SpaceOps 2021 paper (identifier 'SpaceOps-2021,4,x1288', PDF p. 1). The header notes the final version was published as a chapter in Space Operations, edited by C. Cruzen, M. Schmidhuber and Y. H. Lee, Springer 2022, doi 10.1007/978-3-030-94628-9_19. Re-publication is restricted: per the header, it may be used for academic research only, not republished verbatim.</dd><dt>Pages</dt><dd>19</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://elib.dlr.de/185809/1/SpaceOps2021_Paper.pdf" rel="noopener">https://elib.dlr.de/185809/1/SpaceOps2021_Paper.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:28Z</dd><dt>SHA-256</dt><dd><code>cb1b32daf9d09a45d2b15e370fcf5a576fed1e39841a9ebe4fb924ee5cb9c870</code></dd><dt>Size</dt><dd>3.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/spaceops2021-dlr-mobile-mcs.pdf">spaceops2021-dlr-mobile-mcs.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A DLR/GSOC conference paper on **V3C** ('Verlegefähiges' Compact Control Center). V3C is a complete mission operations system for small, single-purpose LEO Earth-observation satellites that runs on a single COTS laptop and can be set up away from a control centre, for 'Responsive Space' use cases such as disaster response, security, science and education. It is demonstrated with DLR's BIROS satellite.

The monitoring and control system is built from GSOC multi-mission tools. **GECCOS** is GSOC's branch of ESA's [SCOS-2000](../scos2000/index.md) and serves as both real-time MCS and offline TM processor. Satmon provides displays, ProToS handles procedures and automation, and an XML2SSF Merger turns flight procedure templates into GECCOS Saved Stack Files. The [MIB](../mib/index.md) is the central source of TM/TC definitions for all these tools. GECCOS speaks the bespoke [NCTRS](../scos2000/nctrs-nis.md) protocol. An SLE Switch Board (SSB) bridges NCTRS to standard [SLE](../ccsds/sle/index.md) for ground stations, and is to be moved inside V3C for the remote demonstration. The paper also describes the mission planning tools (SPOT for swath preview and ordering, Pinta/Plato for timelines). It analyses orbit-determination errors when solar-flux and Earth-rotation auxiliary data cannot be updated offline: about 60 km maximum error after three days at 500 km from missing solar flux, and 7.6 km per missed leap second.

Deployment is fully 'infrastructure as code'. Packer, Vagrant and Ansible build six VMs (SLES 11/15 and Windows Server 2019 hosting GECCOS, GECCOS offline, Satmon, flight dynamics and an Ansible control node) on a Dell laptop, with GitLab CI/CD environments for operations and simulation. The first demonstration replaced the regular BIROS system at GSOC. It used NCTRS, NTP and synchronisation products (TC history, on-board queue model, TM check results) so that the regular system could take over at any time. The paper ends with the COVID-19 constraints and an outlook.


## Key points

- V3C design drivers: movable between places of operation, independent of facilities and permanent Internet access, standards-compliant external interfaces, quick roll-out of copies, operated by one operator, and able to demonstrate BIROS optical imaging. *(PDF p. 3)*
- The ground segment assumes a standardised antenna interface such as CCSDS SLE so that it can be plugged into any ground station network implementing the standard; BIROS is in a 510 km sun-synchronous orbit with a mass of about 130 kg. *(PDF p. 3)*
- For the first demonstration the bespoke NCTRS protocol is used for ground station connectivity; it is to be replaced by SLE by integrating the SSB component into V3C. *(PDF p. 5)*
- The MCS consists of GECCOS (real-time M&C and offline TM processing), Satmon (displays), ProToS (procedures and automation), the XML2SSF Merger and the Mission Information Base as common source of TM and TC definitions. *(PDF p. 5)*
- GECCOS is GSOC's M&C software branched off ESA's SCOS-2000; it uses the bespoke NCTRS interface or ingests TM from files, and the SLE Switch Board translates NCTRS to the standard SLE protocol. *(PDF p. 6)*
- Saved Stack Files (SSF) are the native GECCOS format and cannot express branching procedures in an automated way; the ProToS execution engine connects directly to GECCOS to supervise branching procedures. *(PDF p. 8)*
- The MIB is used by all MCS tools as the central source for TM and TC definitions; the XML2SSF Merger fills flight procedure XML templates with parameter values from operators, the mission planning timeline or flight dynamics. *(PDF p. 8)*
- Missing leap seconds cause coordinate-transformation errors; at 500 km orbit height the position error is 7.6 km per leap second. *(PDF p. 13)*
- Missing solar flux auxiliary data have the largest impact, accumulating to 60 km in three days at 500 km in a maximum error estimation; laptop clocks need NTP or GNSS/DCF77 synchronisation to at least 1 s. *(PDF p. 13)*
- Hardware: a COTS laptop (128 GiB RAM, 8-core CPU, 4 TB SSD) running Ubuntu and VirtualBox; all components run in VMs, without redundancy. *(PDF p. 14)*
- VM layout: ctl01 (SLES 15, Ansible control node), dpc01 (Windows Server 2019, Satmon client, ProToS, Pinta/Plato, SPOT), mcs01 (SLES 11, GECCOS server, XML2SSF Merger, SSB), dps01 (SLES 15, Satmon server, RGB processor), olp01 (SLES 11, GECCOS offline), fds01 (SLES 15, FD services). *(PDF p. 15)*
- During the first campaign BIROS was commanded with real-time and time-tagged telecommands, including blind acquisitions; sync products to the regular BIROS system comprise sent-TC lists and acknowledgements, the on-board queue model and TM check results. *(PDF p. 17)*
- The project officially started in October 2020 (preliminary work from April 2020) and was developed largely from home because of the pandemic. *(PDF p. 18)*


## Cited by these wiki pages (6)

- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (31 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract and Abbreviations | 1 |
    | 1 | Introduction | 2 |
    | 1.1 | Use Cases | 2 |
    | 1.2 | Design Drivers | 3 |
    | 1.3 | Compactness and Mobility | 3 |
    | 1.4 | Demonstration Campaigns | 3 |
    | 2 | Ground Segment Overview | 4 |
    | 2.1 | System Overview | 4 |
    | 2.2 | Monitoring and Control System | 5 |
    | 2.2.1 | GECCOS | 6 |
    | 2.2.2 | Satmon | 6 |
    | 2.2.3 | ProToS | 6 |
    | 2.2.4 | Other Components | 8 |
    | 2.3 | Mission Planning System | 8 |
    | 2.3.1 | Swath Preview and Ordering Tool (SPOT) | 9 |
    | 2.3.2 | Pinta/Plato | 9 |
    | 2.4 | Flight Dynamics System | 10 |
    | 2.4.1 | Solar Activity | 10 |
    | 2.4.2 | Earth Rotation Parameters and Leap Seconds | 12 |
    | 2.5 | External Interfaces | 13 |
    | 3 | Deployment Concept | 14 |
    | 3.1 | Hardware | 14 |
    | 3.2 | Infrastructure as Code | 14 |
    | 3.3 | Virtual Infrastructure Deployment | 16 |
    | 3.4 | Development Environment | 16 |
    | 4 | BIROS Demonstration Operations | 17 |
    | 4.1 | Integration Concept | 18 |
    | 4.1.1 | Safety of BIROS and the Existing Mission Operations System | 18 |
    | 5 | SARS-CoV-2 Challenges | 18 |
    | 6 | Conclusion and Outlook | 19 |
    | References | References | 19 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [doi:10.2514/6.2016-2454](../references/index.md#ref-doi-10-2514-6-2016-2454) | Singer, T., "Implementation of the True Multi-mission Control Room at GSOC," SpaceOps Conferences, American Institute of Aeronautics and Astronautics | 2016 | bibliography |
| [2] | [910.3-G-3](../references/index.md#ref-910-3-g-3) | CCSDS, "Cross Support Concept - Part 1: Space Link Extension," Green Book (https://public.ccsds.org/Pubs/910x3g3.pdf) | Green Book Mar. 2006 | bibliography |
| [3] | [catalogue](../references/index.md#ref-reile-h-lorenz-e-and-terzibaschian-t-the-firebird-mission-a-scientific-mission-f) | Reile, H., Lorenz, E., and Terzibaschian, T., "The FireBird Mission – A Scientific Mission for Earth Observation and Hot SpotDetection," Digest of the 9th International Symposium of the International Academy of Astronautics, Wissenschaft und Technik Verlag (https://elib.dlr.de/83866/) | 2013 | bibliography |
| [4] | [doi:10.2514/6.2014-1602](../references/index.md#ref-doi-10-2514-6-2014-1602) | Stangl, C., Lotko, B., Geyer, M. P., Oswald, M., and Braun, A., "GECCOS – the new Monitoring and Control System at DLR-GSOC for Space Operations, based on SCOS-2000," SpaceOps Conferences, American Institute of Aeronautics and Astronautics | 2014 | bibliography |
| [5] | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | ECSS, "Ground systems and operations – Telemetry and telecommand packet utilization" | A Jan. 2003 | bibliography |
| [6] | [doi:10.2514/6.2004-316-163](../references/index.md#ref-doi-10-2514-6-2004-316-163) | Peat, C., and Hofmann, H., "SATMON - A Generic User Interface for Satellite Control," SpaceOps Conferences, American Institute of Aeronautics and Astronautics | 2004 | bibliography |
| [7] | [doi:10.2514/6.2016-2374](../references/index.md#ref-doi-10-2514-6-2016-2374) | Beck, T., Schlag, L., and Hamacher, J. P., "ProToS: Next Generation Procedure Tool Suite for Creation, Execution and Automation of Flight Control Procedures," SpaceOps Conferences, American Institute of Aeronautics and Astronautics | 2016 | bibliography |
| [8] | [doi:10.2514/6.2018-2541](../references/index.md#ref-doi-10-2514-6-2018-2541) | Hamacher, J. P., and Beck, T., "ProToS: Automation of Flight Control Procedures for the European Data Relay System," SpaceOps Conferences, American Institute of Aeronautics and Astronautics | 2018 | bibliography |
| [9] | [doi:10.2514/6.2016-2621](../references/index.md#ref-doi-10-2514-6-2016-2621) | Wörle, M. T., Spörl, A. K., Hartung, J. H., Lenzen, C., and Mrowka, F., "The Mission Planning System for the Firebird Spacecraft Constellation," SpaceOps Conferences, American Institute of Aeronautics and Astronautics | 2016 | bibliography |

!!! note "Notes"
    Author Accepted Manuscript, not the Springer version of record. Every page carries a long Springer reuse notice in its header and footer, which is omitted here. The date '2021' is the conference year implied by the identifier SpaceOps-2021; the manuscript itself is not dated. The extraction reports 20 PDF pages (registry: 19); the last is empty. Figures 3-5 and 7-9 are screenshots without extracted text. Reference [2] is the library item ccsds-910x3g3-sle-cross-support. Reference [5] cites the PUS as ECSS-E-70-41A (2003), while the abbreviation list expands SCOS as 'Satellite Control and Operation System'. Related library item: 4s-2024-egscc-bruegge (same GSOC department; GECCOS/SSB set-up).

