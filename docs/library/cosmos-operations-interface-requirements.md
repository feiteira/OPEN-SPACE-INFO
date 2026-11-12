---
title: "Herschel/Planck Operations Interface Requirements (OIRD)"
description: "The Herschel/Planck Operations Interface Requirements Document (OIRD), issue 2.2 of 2003, prepared at ESOC by S."
tags: ["Requirements Specification", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [cosmos-operations-interface-requirements]
---

# Herschel/Planck Operations Interface Requirements Document

<dl class="osi-meta"><dt>Document ID</dt><dd>SCI-PT-RS-07360</dd><dt>Issue / version</dt><dd>Issue 2.2</dd><dt>Date</dt><dd>31 September 2003</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (with the ESTEC Herschel/Planck Project Office)</dd><dt>Authors</dt><dd>S. J. Dodsworth, S. Matussi, T. Paßvogel, J_J. Juillet, G. Pilbrat, J. Tauber, T. de Graauw, M. Griffin, A. Poglitsch, J-L. Puget, N. Mandolesi</dd><dt>Type</dt><dd>Requirements Specification</dd><dt>Status</dt><dd>Issue 2.2. Change record: issue 1.0 31-8-2000, 2.0 12-7-2001, 2.1 31-12-2001, 2.2 22-05-2003 (PDF p. 4). To be approved by ESOC and the ESTEC Project Office and controlled by the ESTEC Project Office (PDF p. 10). The signature fields of the approval page are empty in this copy (PDF p. 2).</dd><dt>Pages</dt><dd>72</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/Operations+Interface+Requirements+Document" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/Operations+Interface+Requirements+Document</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:11:42Z</dd><dt>SHA-256</dt><dd><code>607baa14d93800884c83486410fcc41714c529058cec3df002ef14f3ce927510</code></dd><dt>Size</dt><dd>2.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/core/cosmos-operations-interface-requirements.pdf">cosmos-operations-interface-requirements.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Herschel/Planck Operations Interface Requirements Document (OIRD), issue 2.2 of 2003, prepared at ESOC by S. J. Dodsworth and S. Matussi. It identifies the requirements on the Herschel and Planck spacecraft and their payloads that are needed to conduct mission operations, and the operational data and documentation that industry and the instrument teams must deliver to the Mission Operations Centre (MOC).

Section 2 gives operability and autonomy requirements: no need for ground reactions faster than 3 minutes, two independent telecommands for hazardous functions, self-contained telemetry values in contiguous bits, contributing parameters of synthetic parameters in the same packet, one on-board central time reference with on-ground correlation to UTC, and 48 hours of operation without ground contact. Section 3, derived from the draft ECSS Packet Utilisation Standard, begins with a table of PUS services mandatory, optional or not applicable to the instruments and then states requirements per service: APID and SID allocation rules, telecommand verification, device commanding, housekeeping, event reporting with a critical events log, memory management, function and time management, the on-board mission timeline, on-board monitoring, packet transmission control, packet stores, test, OBCP management and science data transfer. Requirements marked P apply to spacecraft and payloads, PO to the spacecraft with possible relevance to payloads.

Section 4 and the annexes define the Satellite Users Manual, the Satellite Database (complying with the SCOS-2000 Database Import ICD issue 5.1, with configuration-control and spacecraft-configuration files and versioned deliveries up to launch), the Flight Dynamics Database, on-board software deliveries, and naming conventions for procedures and timelines.

For this wiki it links PUS, the SCOS-2000 MIB and the Herschel/Planck operations concept.


## Key points

- Section 3 is derived from the ECSS Packet Utilisation Standard [AD-1]; the Space/Ground ICD [AD-2] and the Packet Structure ICD (PSICD) [AD-5] contain the full TM/TC frame and packet details. *(PDF p. 10)*
- Requirements marked 'P' apply to the spacecraft and the payloads, 'PO' to the spacecraft with possible (non-mandatory) relevance to payloads; unmarked requirements apply to the spacecraft only. *(PDF p. 10)*
- In routine science operations ground contact lasts a few hours per day, during which about 24 hours of stored telemetry are downlinked and the next schedule uplinked; operations use the same TM/TC database as the EGSE. *(PDF p. 11)*
- A specific telecommand instance is identified by the application ID and sequence control fields; its meaning by type and subtype in the data field header; an acknowledgement field selects the verification reports required. *(PDF p. 11)*
- On-board monitoring reports limit or expected-status transitions with event packets, which the document notes is not in accordance with the PUS transition reporting list. *(PDF p. 13)*
- CTRL-1: in no mission phase shall the MOC need to send telecommands with a response time of less than 3 minutes. *(PDF p. 15)*
- TC-1: execution of hazardous functions is implemented by means of two independent telecommands. *(PDF p. 15)*
- TC-4: a telecommand packet contains one and only one telecommand function; TC-9/TC-10: on-board data changes and readouts use dedicated telecommands, not multi-purpose software load/dump commands. *(PDF p. 16)*
- TM-12: a parameter value is transmitted in contiguous bits within one packet; TM-16: all contributing parameters of a synthetic parameter should be in the same packet; TM-17: all packets include the time field in the data field header. *(PDF p. 18)*
- TIM-1: all on-board timing (TC time-tagging, application software, TM time-stamping) is synchronised with a single on-board Central Time Reference. *(PDF p. 18)*
- TIM-2/TIM-4: telemetry timing allows on-ground correlation of on-board time with UTC, and after switch-on or reset a unit flags in each timed packet that its time is not yet synchronised. *(PDF p. 19)*
- AUT-1: the spacecraft operates 48 hours without ground contact without interrupting mission product generation, and survives 7 days in safe mode without ground intervention. *(PDF p. 19)*
- Applicable PUS services for instruments: mandatory 1, 3, 5, 6, 9, 14, 17, 21; optional 8 and 18; not applicable 2, 11, 12, 15, 16, 19; 4, 7, 10, 13, 20 and 22 not used. *(PDF p. 24)*
- PACK-3/4/6/7: the location of an HK parameter is derivable from APID, type/subtype and SID; SIDs are unique within an APID; subcommutation is not used; supercommutation is allowed under regular sampling conditions. *(PDF p. 25)*
- TCV-6: telecommand verification packets indicate the TC source (ground, mission timeline, OBCP), encoded in the packet sequence control field per the PSICD. *(PDF p. 26)*
- EVRP-1 defines three event report types (normal/progress, exceptions needing on-board action, errors needing ground action); EVRP-9 stores types 2 and 3 in a Critical Events Log accessible regardless of SSMM state. *(PDF p. 28)*
- MTL-12: mission timeline execution accuracy is 1 s; MTL-13: commands with the same execution time execute in uplink order. *(PDF p. 33)*
- OBSR-2.1/3/4: telemetry storage uses packet stores selectable by APID and packet type, circular or linear, sized for at least 48 hours of packets. *(PDF p. 34)*
- SDBC-1/2: the prime contractor and instrument developers deliver one common Satellite Database for system engineering, AIV and operations; SDBC-4: its content complies with AD-8 (SCOS-2000 Database Import ICD). *(PDF p. 40)*
- SDBD-1/5: SDB deliveries are versions 0 to 4 plus a pre-launch update at L-1 month, delivered as a set of ORACLE data files with field-level configuration control files. *(PDF p. 41)*
- Annex A2: the spacecraft database is delivered according to AD-8 with a Configuration Control File and a Spacecraft Configuration File. *(PDF p. 60)*
- Annex A4: database naming follows RD 1 (H-P-1-ASPI-SP-0141); flight control procedures are named FCP_&lt;subsystem&gt;_nnnn (e.g. FCP_AOC_0001) and timelines TDoyFfNn. *(PDF p. 70)*


## Cited by these wiki pages (23)

- [Display definitions in the MIB](../mib/displays.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Missions](../missions/index.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [ST[04] Parameter statistics reporting](../ecss/pus/st04-parameter-statistics.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [ST[12] On-board monitoring](../ecss/pus/st12-onboard-monitoring.md)
- [ST[14] Real-time forwarding control](../ecss/pus/st14-real-time-forwarding-control.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [ST[17] Test](../ecss/pus/st17-test.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [ST[19] Event-action](../ecss/pus/st19-event-action.md)
- [ST[20] On-board parameter management](../ecss/pus/st20-onboard-parameter-management.md)
- [ST[21] Request sequencing](../ecss/pus/st21-request-sequencing.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (63 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | DOCUMENT APPROVAL | 2 |
    |  | CHANGE RECORD | 4 |
    |  | CONTENTS | 7 |
    | 1 | INTRODUCTION | 10 |
    | 1.1 | Purpose and Scope | 10 |
    | 1.2 | Structure of the Document | 10 |
    | 1.3 | Applicable Documents | 10 |
    | 1.4 | Reference Documents | 10 |
    | 1.5 | General Operations Concepts | 11 |
    | 1.5.1 | Packet Telecommand Delivery | 11 |
    | 1.5.2 | Telemetry Collection and Storage | 12 |
    | 1.5.3 | Solid State Mass Memory Resources | 12 |
    | 1.5.4 | Telemetry Packetisation by the CDMS | 13 |
    | 1.5.5 | On-Board Monitoring and Response to Events | 13 |
    | 1.5.6 | On-Board Procedures | 13 |
    | 1.5.7 | Functions | 13 |
    | 1.5.8 | Synchronisation with Spacecraft Time | 14 |
    | 2 | SATELLITE OPERATIONS AND FUNCTIONAL REQUIREMENTS | 15 |
    | 2.1 | Spacecraft Control | 15 |
    | 2.1.1 | General | 15 |
    | 2.1.2 | Telecommands | 15 |
    | 2.1.3 | Telemetry | 17 |
    | 2.1.4 | Timing | 18 |
    | 2.2 | Spacecraft Autonomy | 19 |
    | 2.2.1 | General | 19 |
    | 2.2.2 | Attitude and Orbit Control | 21 |
    | 2.2.3 | Payload | 21 |
    | 2.2.4 | In-Flight Testing | 22 |
    | 2.2.5 | On-board Control Procedures | 22 |
    | 3 | PACKET FUNCTIONAL REQUIREMENTS | 24 |
    | 3.1 | General | 25 |
    | 3.2 | Telecommand Verification (Service 1) | 26 |
    | 3.3 | Device Commanding (Service 2) | 27 |
    | 3.4 | Spacecraft Status Reporting | 27 |
    | 3.4.1 | Periodic Reporting (Service 3) | 27 |
    | 3.4.2 | Statistics Reporting (Service 4) | 28 |
    | 3.4.3 | Event Reporting (Service 5) | 28 |
    | 3.5 | Memory Management (Service 6) | 29 |
    | 3.6 | On-Board Software Management | 30 |
    | 3.6.1 | Task Management (Service 7) | 30 |
    | 3.7 | Function Management (Service 8) | 31 |
    | 3.8 | Time Management (Services 9) | 31 |
    | 3.9 | On-Board Mission Time line (Service 11) | 32 |
    | 3.10 | On-Board Monitoring (Service 12) | 33 |
    | 3.11 | Packet Transmission Control (Service 14) | 34 |
    | 3.12 | On-Board Storage and Retrieval (Service 15) | 34 |
    | 3.13 | On-Board Traffic Management (Service 16) | 35 |
    | 3.14 | In-Flight Testing (Service 17) | 36 |
    | 3.15 | OBCP Management (Service18) | 36 |
    | 3.16 | Event/Action Service (Service 19) | 37 |
    | 3.17 | Information Distribution CDMS - User (Service 20) | 37 |
    | 3.18 | Science Data Transfer (Service 21) | 37 |
    | 3.19 | Context Saving (Service 22) | 37 |
    | 4 | OPERATIONS DATA | 39 |
    | 4.1 | Satellite Users Manual | 39 |
    | 4.2 | Satellite Database | 40 |
    | 4.3 | Flight Dynamics Database | 42 |
    | 4.4 | On-Board Software | 43 |
    | A1 | ANNEX A1 : SATELLITE USERS MANUAL CONTENTS | 45 |
    | A2 | ANNEX A2: SATELLITE DATABASE CONTENTS | 60 |
    | A3 | ANNEX A3: FLIGHT DYNAMICS DATABASE CONTENTS | 62 |
    | A4 | ANNEX A4: OPERATIONAL DATABASE NAMING CONVENTIONS | 70 |
    | A5 | ANNEX A5 : LIST OF ACRONYMS | 71 |


## Documents this one references (10)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-1 | [ECSS-E-70/41](../references/index.md#ref-ecss-e-70-41) | Telemetry and Telecommand Packet Utilisation Standard | Draft 5.3 April 2001 | applicable |
| AD-2 | [SCI-PT-ICD-07418](../references/index.md#ref-sci-pt-icd-07418) | Herschel/Planck Space / Ground Interface Control Document (SG-ICD) |  | applicable |
| AD-3 | [SCI-PT-IIDA-04624](../references/index.md#ref-sci-pt-iida-04624) | FIRST/Planck Instrument Interface Document (IID-A) |  | applicable |
| AD-4 | [SCI-PT-RS-05991](../references/index.md#ref-sci-pt-rs-05991) | FIRST/Planck System Requirements Specification(SRS) |  | applicable |
| AD-5 | [SCI-PT-IF-07527](../references/index.md#ref-sci-pt-if-07527) | Herschel/Planck Packet Structure Interface Control Document (PS-ICD) |  | applicable |
| AD-6 | [ESA PSS/04-106](../references/index.md#ref-esa-pss-04-106) | Packet Telemetry Standard | Issue 1 1988 | applicable |
| AD-7 | [ESA PSS-04-107](../references/index.md#ref-esa-pss-04-107) | Packet Telecommand Standard | Issue 2 1992 | applicable |
| AD-8 | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database Import ICD | Issue 5.1 Oct. 2001 | applicable |
| AD-9 | [FIRST-FSC-DOC-0200](../references/index.md#ref-first-fsc-doc-0200) | Herschel Science Ground Segment to Instruments ICD | issue 1.0 July 2001 | applicable |
| RD 1 | [H-P-1-ASPI-SP-0141](../references/index.md#ref-h-p-1-aspi-sp-0141) | Naming Convention Specification |  | reference |

!!! note "Notes"
    The issue date is printed '31 September 2003' on the cover and '31 Sept 2003' in the page headers, a non-existent calendar date; the latest change-record entry is 22-05-2003. The cover also carries 'Copyright: © 1999 European Space Agency'. Names in 'authors' are all those on the approval page: prepared by S. J. Dodsworth and S. Matussi; approved by T. Paßvogel (SCI-PT) and S. J. Dodsworth (TOS-OGH); agreed by J_J. Juillet (ASPI), G. Pilbrat (as printed), J. Tauber (SCI-SA), T. de Graauw (SRON), M. Griffin (U. Cardiff), A. Poglitsch (MPE), J-L. Puget (IAS) and N. Mandolesi (TESRE-CNR). PDF p. 3 is blank; the change-record table header is garbled by a font-encoding problem (PDF p. 4). Printed pages: roman i-vii on PDF pp. 2-9 and arabic page N on PDF p. N+9. Annex A1 is adapted from the XMM users manual (PDF p. 45). Many requirements are marked 'deleted'. AD-8 is available in this library as icd-5-1-tos-gci; RD 1 is applied to SPIRE in spire-mib-naming-convention-1-2. AD-6 is printed 'ESA PSS/04-106' (slash) while AD-7 uses 'PSS-04-107'.

