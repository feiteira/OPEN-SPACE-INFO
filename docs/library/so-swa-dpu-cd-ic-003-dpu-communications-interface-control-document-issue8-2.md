---
title: "Solar Orbiter SWA DPU Communications ICD (issue 8.2)"
description: "The communications interface control document for the Data Processing Unit (DPU) of the Solar Wind Analyser (SWA) on ESA's Solar Orbiter."
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [so-swa-dpu-cd-ic-003-dpu-communications-interface-control-document-issue8-2]
---

# Solar Orbiter Mission SWA DPU DPU Communications Interface Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>SO-SWA-DPU_CD-IC-003</dd><dt>Issue / version</dt><dd>Issue 8.2</dd><dt>Date</dt><dd>2019-08-07</dd><dt>Organisation</dt><dd>SWA DPU Team (ASI contract 2013-055-1.0; Leonardo, TSD, SITAEL, Planetek)</dd><dt>Authors</dt><dd>DPU Team, C. Caso, G. Capuano</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 8.2 of 07/08/2019 ('Minor editorial fixing'). The document change record (PDF pp. 3-10) runs from issue 1 (27/06/2014) through 2 (31/07/2015, ICDR RIDs), 3 (11/12/2015, HK optimisation), 4 to 4.6 (2016-2017), 6.0 (27/11/2017), 6.1, 6.2, 7.0 (08/03/2019), 7.1, 8.0 (30/04/2019) and 8.1 (17/06/2019); there is no issue 5. The list of open points (PDF p. 403) shows 0 TBCs, 0 TBDs and 0 TBWs. Deliverable EN-019 under the ASI contract, with the DRD given as Annex E to ECSS-E-ST-40C.</dd><dt>Pages</dt><dd>403</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/ICD/SO-SWA-DPU_CD-IC-003%20%28DPU%20Communications%20Interface%20Control%20Document%29_Issue8_2.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/ICD/SO-SWA-DPU_CD-IC-003%20%28DPU%20Communications%20Interface%20Control%20Document%29_Issue8_2.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:43Z</dd><dt>SHA-256</dt><dd><code>c99f05966f2f6d8e218371163fb94e4fa500406c9f51d63bc0ea09b8e9a35661</code></dd><dt>Size</dt><dd>8.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/SO-SWA-DPU_CD-IC-003-DPU-Communications-Interface-Control-Document-_Issue8_2.pdf">SO-SWA-DPU_CD-IC-003-DPU-Communications-Interface-Control-Document-_Issue8_2.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The communications interface control document for the Data Processing Unit (DPU) of the Solar Wind Analyser (SWA) on ESA's Solar Orbiter. It is the definitive description of every telecommand the SWA DPU flight software accepts and every telemetry packet it produces, at bit level, and is the companion to the SWA instrument database (IDB/MIB).

The first chapters describe SWA's four sensors: two Electron Analyser Systems (EAS1, EAS2), the Proton Alpha Sensor (PAS) and the Heavy Ion Sensor (HIS), all connected to the DPU over 10 Mb/s SpaceWire. They also cover the DPU hardware and the software layers: a PROM boot software, an application layer (PCMSW for TC handling, modes, FDIR and time, and SDPSW for moment calculation and compression), a PUS services library, ExOS and drivers on VxWorks and a LEON2 CPU. Chapter 5 shows the common packet headers and the APID scheme (process IDs 95 to 99 combined with packet categories) and maps each TM type to its PID, packet category and SIDs.

Chapter 6 specifies the telecommands by handling component, each with description, allowed DPU states, word-by-word TC format and acceptance (TARF) and execution (TECF) error codes. These are the PUS manager (services 3, 5, 6, 9, 17, 20 and private service 200 monitoring and event handling), the DPU manager, the sensor manager, the EAS1/EAS2 managers (private services 201/202), the PAS manager (203) and the HIS manager, including HIS internal commands (204). Chapters 7 to 10 define the cyclic HK and diagnostic TM(3,25)/(3,26) parameters, the asynchronous reports, the service 20 inter-instrument contribution and the TM(21,x) science packets of each sensor. Chapters 11 to 16 cover internal sensor protocols, macros, the event catalogue, TARF/TECF codes and configuration parameters. For MIB readers it explains what the SWA packets and parameters mean.


## Key points

- SWA consists of two Electron Analyser Systems (EAS1, EAS2), a Proton Alpha Sensor (PAS) and a Heavy Ion Sensor (HIS), all connected to the DPU through 10 Mb/s SpaceWire links. *(PDF p. 23)*
- The DPU hardware has a rigid-flex backplane with six SpaceWire splitters, two Data Processing Modules (each a CSP board plus a CPU board) and two Power Conditioning and Distribution Modules. *(PDF p. 24)*
- The DPU software buffers 5 minutes of EAS1, EAS2 and PAS high time resolution data for transmission when an event trigger is received, and uses PUS service 20 to exchange event conditions and data with other Solar Orbiter instruments. *(PDF p. 25)*
- Software layers: application software (PCMSW and SDPSW), a PUS and mission services library, and machine services (VxWorks RTOS, ExOS and BSP) running on a LEON2 CPU. *(PDF p. 26)*
- The boot software is a self-standing image resident and executed in PROM that cannot be patched; it checks RAM, MRAM and EDAC and loads the application from MRAM to RAM. *(PDF p. 29)*
- The CCSDS packet transfer protocol over SpaceWire is defined in the spacecraft SpaceWire Application Protocol Specification (RD[4]), and TC/TM packet formats in the Solar Orbiter TM-TC and Packet Structure ICD (RD[3]). *(PDF p. 32)*
- APID characterisation (Table 1) uses process IDs 95 to 99 with packet categories: for example PID 95 PKC 5 for S20 HK and PKC 12 for low-latency TM(21,x); PID 96 PKC 4 normal HK TM(3,25), PKC 8 diagnostic TM(3,26), PKC 12 normal science; PID 97 PKC 12 optional burst/trigger; PID 98 PKC 4 ground monitoring HK and PKC 12 core burst; PID 99 PKC 1 verification, PKC 4 HK for OBC action, PKC 7 events, PKC 9 dumps and private reports. *(PDF p. 33)*
- Private report packets include TM(200,249) monitoring configuration, TM(200,250) configuration parameters, TM(200,251) macro contents, TM(200,252) boot report, TM(200,253) error/log, and TM(201,200), TM(202,200) and TM(203,200) for EAS1, EAS2 and PAS parameter reports. *(PDF p. 34)*
- PUS manager TCs include TC(3,5)/(3,6) enable/disable HK, TC(3,129) modify HK rate, TC(5,5)/(5,6), TC(6,2), (6,5), (6,9) and (6,129) abort dump, TC(9,129) accept time update, TC(17,1), and private TC(200,170-176) for monitoring and error/event handler control. *(PDF p. 35)*
- EAS1 and EAS2 are commanded with private service types 201 and 202 (for example subtype 129 enter IDLE mode, 131/132 switch on/off, 134 enter RUN mode). *(PDF p. 105)*
- HIS power is commanded by the DPU with TC(200,153) switch on and TC(200,154) switch off (low-level, no macro), and TC(200,155) starts a HIS macro. *(PDF p. 188)*
- HIS internal telecommands use service type 204, for example TC(204,128) SWA_TC_HIS_MRAM_WR and TC(204,129) SWA_TC_HIS_MEM_COPY. *(PDF p. 191)*
- TC formats are given word by word: the SWA DPU TCs carry PID 95 in the APID, PUS version number 1, the Ack flags, service type and subtype and a source ID, followed by application data and the PEC. *(PDF p. 189)*
- Each TC lists its allowed DPU states and its TARF (acceptance failure) and TECF (execution failure) error codes, for example DpuNotPlausibleTcError 0xA7FF. *(PDF p. 188)*
- Chapter 13 catalogues the DPU events with event ID, code, severity level and auxiliary data words, for example TcAcqError 0xA9ED when a TC cannot be de-queued from ExOS. *(PDF p. 368)*


## Cited by these wiki pages (7)

- [Missions](../missions/index.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Solar Orbiter instrument interfaces: SWA DPU ICD and EID-A](../missions/solar-orbiter/instrument-interfaces.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (65 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1. | INTRODUCTION | 18 |
    | 1.1 | PURPOSE | 18 |
    | 1.2 | SCOPE | 18 |
    | 2. | DOCUMENTS | 19 |
    | 2.1 | APPLICABLE DOCUMENTS | 19 |
    | 2.2 | REFERENCE DOCUMENTS | 19 |
    | 2.3 | ACRONYMS | 19 |
    | 3. | SWA INSTRUMENT OVERVIEW | 23 |
    | 4. | DPU SOFTWARE OVERVIEW | 25 |
    | 4.1 | DPU SOFTWARE ARCHITECTURE | 27 |
    | 5. | SERVICE IMPLEMENTATION | 32 |
    | 6. | SWA DPU HANDLED TELECOMMANDS | 35 |
    | 6.1 | PUS MANAGER TCS | 35 |
    | 6.2 | DPU MANAGER TCS | 68 |
    | 6.3 | SENSOR MANAGER TCS | 99 |
    | 6.4 | EAS1/EAS2 MANAGER TCS | 105 |
    | 6.5 | PAS MANAGER TCS | 151 |
    | 6.6 | HIS MANAGER TCS | 188 |
    | 7. | SWA DPU HOUSEKEEPING/DIAGNOSTIC CYCLIC TM PACKET | 192 |
    | 7.1 | SWA H/K PARAMETERS FOR DPU | 193 |
    | 7.2 | SWA ACQUIRED H/K PARAMETERS FROM EAS 1/2 SENSOR | 206 |
    | 7.3 | SWA ACQUIRED H/K PARAMETERS FROM PAS SENSOR | 208 |
    | 7.4 | SWA RECEIVED TC RELATED H/K PARAMETERS | 209 |
    | 7.5 | SWA HK S/W VALIDITY PARAMETERS | 215 |
    | 7.6 | SWA DPU HW DIAGNOSTIC HK PARAMETERS | 217 |
    | 7.7 | SWA DPU MANAGERS MAX EXECUTION DURATIONS | 218 |
    | 7.8 | SWA FDIR STATUS HK PARAMETERS | 219 |
    | 7.9 | SWA FDIR MONITORING VALUES PARAMETERS | 229 |
    | 7.10 | SWA HK S/W DERIVED PARAMETERS | 238 |
    | 7.11 | SWA DPU TM COUNTERS H/K | 239 |
    | 7.12 | SWA DPU ERROR COUNTERS H/K | 240 |
    | 7.13 | SWA DPU H/K PARAMETERS FOR OBC FDIR | 242 |
    | 7.14 | IIC TM DATA | 243 |
    | 7.15 | SWA ACQUIRED H/K PARAMETERS FROM HIS SENSOR | 244 |
    | 7.16 | SWA ACQUIRED BOOT REPORT FROM HIS SENSOR | 263 |
    | 7.17 | BSW_HK | 270 |
    | 7.18 | SWA GROUND MONITORING TM | 272 |
    | 8. | SWA DPU ASYNCHRONOUS TM PACKET | 281 |
    | 8.1 | CONFIGURATION PARAMETERS REPORT DUMP TM | 281 |
    | 8.2 | MACRO REPORT | 284 |
    | 8.3 | FSW STARTUP REPORT | 285 |
    | 8.4 | ERROR LOG REPORT | 290 |
    | 8.5 | EAS PARAMETER DUMP REPORT | 292 |
    | 8.6 | PAS PARAMETER DUMP REPORT | 293 |
    | 8.7 | PUS SERVICE 6 DUMP REPORT | 295 |
    | 8.8 | PUS SERVICE 6 CHECKSUM REPORT | 296 |
    | 8.9 | MONITORING CONFIGURATION REPORT | 297 |
    | 8.10 | DEBUG CMD REPORT | 302 |
    | 9. | SWA DPU INTER PROCESS COMMUNICATION CONTRIBUTION (S20) | 303 |
    | 10. | SWA DPU SCIENTIFIC TM PACKET (S21) | 304 |
    | 10.1 | EAS SCIENTIFIC TM PACKETS | 304 |
    | 10.2 | PAS SCIENTIFIC TM PACKETS | 325 |
    | 10.3 | HIS SCIENTIFIC TM PACKETS | 343 |
    | 11. | INTERNAL COMMUNICATION PROTOCOL | 345 |
    | 11.1 | EAS INTERNAL COMMUNICATION | 345 |
    | 11.2 | PAS INTERNAL COMMUNICATION | 355 |
    | 11.3 | HIS INTERNAL COMMUNICATION | 364 |
    | 12. | MACRO DEFINITION | 365 |
    | 13. | EVENT DEFINITION | 368 |
    | 14. | TARF DEFINITION | 390 |
    | 15. | TECF DEFINITION | 391 |
    | 16. | CONFIGURATION PARAMETER | 402 |
    | 16.1 | ASW CONF PARAMETER | 402 |
    | 17. | APPENDIXES | 403 |
    | 17.1 | LIST OF OPEN POINTS | 403 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD[1] | [DC-EOS-2013-267](../references/index.md#ref-dc-eos-2013-267) | Allegato tecnico gestionale al contratto ASI Nr. 2013-055-I.O. del 16/09/2013 | 2013-09-16 | applicable |
| AD[2] | [SOL-EST-RCD-0050](../references/index.md#ref-sol-est-rcd-0050) | Solar Orbiter – Experiment Interface Document – Part A | 5 | applicable |
| AD[3] | [catalogue](../references/index.md#ref-deleted) | Deleted |  | applicable |
| AD[4] | [catalogue](../references/index.md#ref-deleted) | Deleted |  | applicable |
| AD[5] | [SO-SWA-MSSL-RQ-010](../references/index.md#ref-so-swa-mssl-rq-010) | Solar Orbiter SWA Scientific Operations, Algorithms and Processes Requirements Document. Issue 1 | 2RevB | applicable |
| AD[6] | [SO-SWA-DPU_CD-RQ-001](../references/index.md#ref-so-swa-dpu-cd-rq-001) | SWA DPU Flight SW Requirement Document | 2 | applicable |
| AD[7] | [SO-SWA-DPU_CD-AD-001](../references/index.md#ref-so-swa-dpu-cd-ad-001) | SWA DPU FLIGHT SW DESIGN DOCUMENT Volume 1 | 2 | applicable |
| AD[8] | [SO-SWA-DPU_CD-AD-001](../references/index.md#ref-so-swa-dpu-cd-ad-001) | SWA DPU FLIGHT SW DESIGN DOCUMENT Volume 2 | 2 | applicable |
| AD[9] | [SO-SWA-DPU_CD-AD-001](../references/index.md#ref-so-swa-dpu-cd-ad-001) | SWA DPU FLIGHT SW DESIGN DOCUMENT Volume 3 | 2 | applicable |
| RD[1] | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Ground systems and operations – Telemetry and Telecommand Packet Utilization Standard |  | reference |
| RD[2] | [ECSS-E-ST-40C](../references/index.md#ref-ecss-e-st-40c) | Software General Requirements |  | reference |
| RD[3] | [SOL.S.ASTR.TN.00079](../references/index.md#ref-sol-s-astr-tn-00079) · [library](sol-s-astr-tn-00079-07.md) | Solar Orbiter TM-TC and Packet Structure ICD | 7 | reference |
| RD[4] | [SOL.S.ASTR.RS.00038](../references/index.md#ref-sol-s-astr-rs-00038) | Spacewire Application Protocol Specification |  | reference |
| RD[5] | [15164-CMDDEF-01](../references/index.md#ref-15164-cmddef-01) | Heavy Ion Sensor Instrument Software Boot and Science Programs | 1 | reference |
| RD[6] | [15164-TELDEF-01](../references/index.md#ref-15164-teldef-01) | Heavy Ion Sensor Instrument Software Boot and Science Programs | 1 | reference |
| RD[7] | [SO-SWA-MSSL-RQ-001](../references/index.md#ref-so-swa-mssl-rq-001) | EAS Unit Specifications. | 4 | reference |
| RD[8] | [SO-SWA-MSSL-SP-012](../references/index.md#ref-so-swa-mssl-sp-012) | EAS-DPU Interface Specification | 1 | reference |
| RD[9] | [SWA-SP-22300-IRAP-059-GEN](../references/index.md#ref-swa-sp-22300-irap-059-gen) | PAS Unit Specifications | 3 | reference |
| RD[10] | [SWA-SP-22440-IRAP-590-GEN](../references/index.md#ref-swa-sp-22440-irap-590-gen) | PAS-DPU Interface Specification | 1 | reference |

!!! note "Notes"
    Large (403 pages) text-based PDF; printed page numbers ('Page n of 403') match PDF page indexes, and the text extraction shows a 404th, empty page. The distribution list (PDF p. 2) contains e-mail addresses, which are omitted here. Broken Word cross-references appear as 'Errore. L'origine riferimento non è stata trovata.' in the change record (PDF p. 3). Section 1.1's first sentence is missing in the text layer. Typos as printed include 'LENARDO', 'Scetions' and 'phisycally'. RD[3] (SOL.S.ASTR.TN.00079 issue 7) is in the library as sol-s-astr-tn-00079-07. AD[2] cites EID-A issue 5 as SOL-EST-RCD-0050; the library holds the 2007 issue 1 as 12-3-solarorbiter-eid-a-issue-1-0-2007-10-09 (SOL-EST-IF-0050). The corresponding SWA instrument databases are swa-idb-ascii and swa-idb-v6-5-0. A check of the v6.5.0 IDB pid table (this wiki's own query) finds APIDs consistent with Table 1 (for example 1540 = PID 96 x 16 + PKC 4). The IDB also has APIDs 1542 and 1545, which are not in Table 1.

