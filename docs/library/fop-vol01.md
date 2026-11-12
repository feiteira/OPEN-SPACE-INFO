---
title: "INTEGRAL Flight Operations Plan Vol. 1: Mission Management"
description: "Volume 1 (Mission Management) of the ESOC Flight Operations Plan (FOP) for ESA's INTEGRAL gamma-ray observatory, launched on a Proton on 17 October 2002 into a 72-hour highly eccentric orbit."
tags: ["Other", "ESOC evolution and context"]
sources: [fop-vol01]
---

# INTEGRAL Flight Operations Plan Volume 1 Mission Management

<dl class="osi-meta"><dt>Document ID</dt><dd>INT-MOC-FOP-FOP-1001-TOS-OGI</dd><dt>Issue / version</dt><dd>Issue 2, Rev. 0</dd><dt>Date</dt><dd>2003-02-21</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Technical &amp; Operational Support, Mission Operations Department, ESOC (European Space Operations Centre)</dd><dt>Type</dt><dd>Other</dd><dt>Status</dt><dd>Issue 2/0 of 21/02/03, 'General clean-up post Launch', approved by the SOM, M. Schmidt (change record, PDF p. 2). Earlier versions: Draft/0 27/11/98, Draft/1 04/11/00, 1/0 21/12/01 (version for review and approval), 1/1 28/02/02, 1/2 06/09/02.</dd><dt>Pages</dt><dd>45</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://sigma2.irap.omp.eu/integral/documents/procedures/fop/fop_vol01.pdf" rel="noopener">https://sigma2.irap.omp.eu/integral/documents/procedures/fop/fop_vol01.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:52Z</dd><dt>SHA-256</dt><dd><code>714169b8bde9c661329db5430854cd4bd8f55bb97f7bc5dca9fee8389d271d0b</code></dd><dt>Size</dt><dd>403.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/fop_vol01.pdf">fop_vol01.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Volume 1 (Mission Management) of the ESOC **Flight Operations Plan (FOP)** for ESA's INTEGRAL gamma-ray observatory, launched on a Proton on 17 October 2002 into a 72-hour highly eccentric orbit. It is the management volume of the FOP, not a procedure book, and consists of five 'books'.

Book 1 (Mission Summary) gives the orbit, mission phases, payload (SPI, IBIS, JEM-X, OMC), satellite modes, and ground segment. The ground segment is the Operational Ground Segment (Redu, Goldstone and Villafranca stations, MOC at ESOC) plus the Science Ground Segment (ISOC at ESTEC, ISDC at Versoix). Book 1 also lists the MOC elements: the INTEGRAL Monitoring and Control System (IMCS) with its timeline generation (MPS) and archive/distribution (MADDS), the FDS, PAS, OBSMS, the simulator (IOS) and ISDS. Book 2 (Management Set-Up) describes the split of tasks, the roles of the Project Scientist, the Spacecraft Operations Manager (SOM) and the operations managers, the CCB, and the Flight Control Team (5 engineers, 2 analysts for database maintenance and tools, 6 SPACONs, 1 mission planner). Book 3 (Mission Rules) gives the rules on responsibility, launch hold criteria, emergencies, redefinition of mission goals and termination.

Book 4 (Configuration Management & Change Control) is the most relevant to this wiki. It covers who may change the FOP, the procedure validation chain (procedures generated with FOPGEN against the live database, tested on the simulator), and the **Operational Database (ODB)**, derived from the manufacturer's Satellite Database and then maintained by the FCT analysts. It also lists which TM/TC definition fields (calibration curves, aliases, out-of-limits, packet structures, TC defaults) need CCB approval. Book 5 defines shift, revolution, weekly, monthly and annual reports and anomaly reporting. See [operations preparation](../scos2000/operations-preparation.md) and the [MIB](../mib/index.md).


## Key points

- INTEGRAL was launched by a Proton on 17 October 2002 into an orbit with 153,600 km apogee, 9,000 km perigee, 51.6° inclination and a 72 h period. Routine ground stations are Redu, Goldstone and Villafranca (backup). *(PDF p. 8)*
- The Operational Ground Segment comprises the ground stations (Redu, Goldstone, Villafranca as backup, and Perth for LEOP), the MOC at ESOC and communications. The Science Ground Segment comprises ISOC at ESTEC and ISDC at Versoix. *(PDF p. 10)*
- The MOC elements are the INTEGRAL Monitoring and Control System (IMCS), the Timeline Generation System (MPS, part of IMCS), the FDS, the Mission Archive & Data Distribution System (MADDS, part of IMCS), PAS, OBSMS, the INTEGRAL Overall Simulator (IOS) and the INTEGRAL Security Distribution System (ISDS). *(PDF p. 11)*
- The Flight Control Team under the SOM has 5 engineers, 2 analysts (database maintenance, operations tools maintenance, mission planning support), 6 spacecraft controllers (SPACONs) and 1 mission planning engineer. *(PDF p. 19)*
- Mission Rule 2.2: the countdown is stopped if MOC essential functions are not available in hot redundancy, namely the IMCS (TM reception and processing, TC generation and release), the FDS and communications (OPSLAN), or if the MOC cannot exchange TCs and data with Redu or Villafranca. *(PDF p. 25)*
- Mission Rule 3.1: a spacecraft emergency covers loss of attitude, fuel problems, critical power or thermal situations, loss of on-board TM/TC functions, or loss of contact with a ground station for more than 24 hours. *(PDF p. 25)*
- Only flight procedures in the approved FOP may be applied. FOP and Operational Database (ODB) changes must follow the configuration control concepts and be approved by the SOM. The MOC tracks the on-board software with the OBSMS and on-board parameters with the ODB. *(PDF p. 31)*
- The MOC items under configuration control include control-room and office hardware, the IMCS, the FDS and the NCTRS, following standard ESOC rules, with all modifications approved by the SOM. *(PDF p. 33)*
- Procedure validation chain: manufacturer inputs in the user manual, visual check by the SOE, an implicit parameter check because procedures are generated with FOPGEN against the actual database, optional simulator tests, and SPACON runs on the control system with the simulator. A verification matrix is kept. *(PDF p. 35)*
- The ODB was derived from the Satellite Database (SDB) supplied by the satellite manufacturer before launch. The SDB is no longer maintained, and the S/C Analysts maintain the ODB and propagate approved changes to the IMCS, the FOP generation tool and the OBSMS. *(PDF p. 35)*
- Instrument TM parameter fields that need CCB approval are calibration curves, aliases, out-of-limits, packet structure and new parameters. For instrument TC parameters they are default values and calibration curves. *(PDF p. 39)*
- An anomaly notification is issued within one hour of an anomaly to the Project Scientist, ISOC and ISDC, followed by a full anomaly report after assessment. *(PDF p. 45)*


## Cited by these wiki pages (7)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (28 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | CRS | Change Record Sheet (Vol. 1) | 2 |
    | Contents | List of Contents, Volume 1 | 4 |
    | 1.1 | Book 1: Mission Summary | 8 |
    | 1.1.1 | Mission Characteristics | 8 |
    | 1.1.2 | Mission Constraints | 9 |
    | 1.1.3 | Space Segment Set-Up | 9 |
    | 1.1.4 | Ground Segment Set-Up | 10 |
    | 1.1.5 | Mission Objectives | 11 |
    | 1.2 | Book 2: Management Set-Up | 16 |
    | 1.2.1 | Distribution of Tasks | 16 |
    | 1.2.2 | Operations Management | 17 |
    | 1.2.3 | MOC Team Structure | 19 |
    | 1.3 | Book 3: Mission Rules | 24 |
    | 1.3.1 | Operational Responsibility | 24 |
    | 1.3.2 | Launch Hold Criteria | 25 |
    | 1.3.3 | Satellite Emergency | 25 |
    | 1.3.4 | Redefinition of Mission Goals | 26 |
    | 1.3.5 | Mission Termination | 27 |
    | 1.4 | Book 4: Configuration Management & Change Control | 31 |
    | 1.4.1 | Overview | 31 |
    | 1.4.2 | Space Segment | 31 |
    | 1.4.3 | Ground Segment | 33 |
    | 1.4.3.2 | Operational Tools (Flight Operations Plan, Operational Database, OBSMS, Simulator, Mission Control System, Flight Dynamics System) | 34 |
    | 1.4.3.3 | Overall Ground Segment (CCB Set-Up, Configuration Items) | 36 |
    | 1.5 | Book 5: Mission Reporting | 43 |
    | 1.5.1 | Special Reports | 43 |
    | 1.5.2 | Routine Reports | 43 |
    | 1.5.3 | Anomaly Reporting | 45 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD 1 | [catalogue](../references/index.md#ref-integral-users-manual-ium-chapter-4-4-5-constraints-for-the-routine-mission) | INTEGRAL Users Manual (IUM), chapter 4.4.5 (constraints for the Routine Mission) |  | applicable |
| RD 26 | [catalogue](../references/index.md#ref-odb-configuration-control-concept) | ODB configuration control concept |  | reference |
| RD 27 | [catalogue](../references/index.md#ref-esoc-qm-manual) | ESOC QM Manual |  | reference |
| RD29 | [catalogue](../references/index.md#ref-overall-ground-segment-configuration-control-during-the-routine-mission-phase-ti) | (overall ground segment configuration control during the Routine Mission Phase; title not given) |  | reference |
|  | [catalogue](../references/index.md#ref-fop-vol-2-book-1-constraints-considered-at-planning) | FOP Vol. 2 Book 1 (constraints considered at planning) |  | mentioned |
|  | [catalogue](../references/index.md#ref-fop-vol-10-11-management-set-ups-for-leop-and-commissioning-phase) | FOP Vol 10 & 11 (management set-ups for LEOP and Commissioning Phase) |  | mentioned |

!!! note "Notes"
    This is Volume 1 only; the AD/RD list is not in this volume, so cited documents appear only by number (AD 1, RD 26, RD 27, RD29). The extraction reports 46 PDF pages against 45 in the registry. PDF p. 3 is blank and the last page is empty. Each book has its own cover, change record sheet and contents, and pages are numbered per book (e.g. 1.4-1). The Book 1 cover is dated '21 February 02', while all other covers and headers say 21 February 03 (PDF p. 5). Typos as printed: 'Mroject Manager' (PDF p. 24), 'Oganigram' (PDF p. 14), and the Book 2 figure list shows 'Error! Bookmark not defined.' (PDF p. 15). The volume does not name SCOS-2000; the control system is called IMCS throughout. The volume is relevant to SCOS-2000 practice through its description of the operational database (MIB-equivalent) maintenance, FOPGEN and NCTRS configuration control.

