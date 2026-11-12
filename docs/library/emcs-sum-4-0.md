---
title: "EGSE based on SCOS 2000 (EMCS) User Manual"
description: "Issue 4.0 (9 March 2004) of the Software User Manual for the EGSE version of SCOS-2000 that ESTEC (TOS-EMG) prepared for the Herschel/Planck instrument developers, written by Serge Valera."
tags: ["User Manual", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [emcs-sum-4-0]
---

# EGSE based on SCOS 2000: The EGSE &amp; Mission Control System

<dl class="osi-meta"><dt>Document ID</dt><dd>TOS-EMG/01-1029/bm/sv</dd><dt>Issue / version</dt><dd>issue 4 revision 0</dd><dt>Date</dt><dd>2004-03-09</dd><dt>Organisation</dt><dd>European Space Agency, ESTEC (TOS-EMG)</dd><dt>Authors</dt><dd>Serge Valera</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Status 'Issue' (cover, PDF p. 1). Change log from issue 1.0 (8 June 2001, SCOS 2000 Release 2.1.1) through 3.5 (04 March 2004, final P5 updates) (PDF p. 2); covers the SCOS EGSE Release 2.3e P5 version delivered by ESTEC/TOS-EMG (PDF p. 7).</dd><dt>Pages</dt><dd>72</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002291_DOC_ESA_EGSE%20based%20on%20SCOS%202000%20The%20EGSE%20and%20Mission%20Control%20System/EMCS-SUM4_0.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002291_DOC_ESA_EGSE%20based%20on%20SCOS%202000%20The%20EGSE%20and%20Mission%20Control%20System/EMCS-SUM4_0.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:19Z</dd><dt>SHA-256</dt><dd><code>e65f7f457771c21eed50ded98be524692be4632c8fa54d0d99c3143d737a4cde</code></dd><dt>Size</dt><dd>699.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/emcs-sum-4.0.pdf">emcs-sum-4.0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 4.0 (9 March 2004) of the Software User Manual for the EGSE version of SCOS-2000 that ESTEC (TOS-EMG) prepared for the Herschel/Planck instrument developers, written by Serge Valera. The EGSE and Mission Control System (EMCS) follows the PROBA approach of one system for checkout and operations, using SCOS-2000 instead of SCOS-2. It consists of the SCOS-2000 kernel with its internal MIB, the SCOE system reached through an EGSE router and gateway, the Tcl/Tk-based Test and Operations Procedure Environment (TOPE), used while PLUTO (ECSS-E-70-32) tools were not available, and a Space System Model in which each addressable system element has a 16-bit identifier, with 0x0000-0x07FF reserved for on-board application processes (APIDs).

The manual covers installation of release 2.3e P5 on SuSE Linux 7.3, configuration and start-up. For MIB engineers the key part is section 4: the minimum EGSE data set (MIN_EGSE), whose files (tcp, pcdf, pcpc, ccf, cdf, cpc, dpc, pcf, plf, vdf) a mission adapts to its own packet headers; the 'Z' prefix of its names; SPIDs 1-100 reserved for generic packets; the mergeDATA and setSCOSdata tools; and the EGSE-specific MISCconfig variables (routing mode, binary command ZBINTC, time-stamping policy, mission epoch).

Section 6 is the TOPE language reference (tcsend with verification flags and time-tagging through PUS service 11,4; fetch, subscribe, waitfor, watchdog and logging). Section 7 defines the EGSE router message header and templates 1-7, an acknowledgement policy that extends PUS service 1 with ground-station, uplink and on-board acceptance reports (subtypes 9-14), and how SCOS files incoming messages by SPID, including unknown packets. Appendices cover conventions, known bugs and migration of procedures to the Herschel/Planck CCS.


## Key points

- The manual details the EGSE aspects of the EGSE version of SCOS 2000 prepared by the Agency and delivered to the Herschel/Planck instrument developers. *(PDF p. 7)*
- The EMCS follows the PROBA common EGSE and mission control system approach, with SCOS 2000 replacing SCOS2; it is made of the SCOS kernel with its internal MIB, the SCOE system, the test and operation procedure environment and the Space System Model. *(PDF p. 9)*
- System Element identifiers range over 0x0000-0xFFFF; 0x0000-0x07FF are reserved for on-board application processes and equal the APIDs, reflecting the 11-bit CCSDS APID field. *(PDF p. 10)*
- SE-ID allocation table: 0x0800 router (spacecraft identifier in MIB), EMCS clients 0x2000-0x2FFF, ground station processes 0x4000-0x4FFF, TC Front End 0x8800-0x880F, TM Front End VC0-VC7 0x8810-0x8817, EGSE gateway/router 0xF000-0xFFFF. *(PDF p. 11)*
- The Oracle-based SSM repository was not yet available, so users populate mission data through the SCOS 2000 ASCII (MIB) file interfaces, extended for EGSE command and control. *(PDF p. 12)*
- TOPE is a TCL/TK-based procedure environment provided because PLUTO (ECSS-E-70-32) compliant software was not yet available. *(PDF p. 13)*
- The MS-Windows EGSE Router (Delphi, DCOM/ActiveX, with a TCP/IP Gateway) and TM/TC Front Ends are not used in Herschel/Planck; SRON developed a Linux-based EGSE router for Herschel. *(PDF p. 14)*
- A mission adapts the MIN_EGSE data set (tcp, pcdf, pcpc, ccf, cdf, cpc, dpc, pcf, plf, vdf files) to its TM/TC packet headers; all MIN_EGSE parameter and command names start with 'Z'. *(PDF p. 21)*
- SPIDs 1 to 100 are reserved for the SCOS EGSE generic setup. *(PDF p. 22)*
- MISCconfig EGSE_MODE selects TC routing: 0 NCTRS only, 1 NCTRS and EGSE Router, 2 EGSE Router only (default 1); EGSE_BINCMD_NAME defaults to the binary command ZBINTC for commands not defined in the MIB. *(PDF p. 23)*
- EGSE_TM_FILING_TIME_TYPE time-stamps incoming TM by EMCS time (1), ground station/SCOE time (2) or uncorrelated OBT relative to TCO_MISSION_EPOCH (3), whose default is 1958-01-01T00:00:00.000000. *(PDF p. 24)*
- tcsend uses the MIB default acknowledgement flags (CCF_ACK and PCDF_VALUE where PCDF_TYPE='K') when no ack clause is given; executiontime builds an on-board schedule command (LOADTT, PUS service 11,4). *(PDF p. 29)*
- The EGSE router message header: DstID (2 octets), SrcID (2), Token (4), Time (8), Msg_Type (1), Spare (1), S/C id (2, 0x66 for PROBA), then application data. *(PDF p. 44)*
- Msg_Types: 1 SCOE command, 2 SCOE command verification report, 3 SCOE observation report, 4 sending TC packet request, 5 sending TC packet verification report, 6 TM packet report, 7 TM frame reports. *(PDF p. 45)*
- Besides the four PUS acknowledgements, the EMCS adds GS_Ack, UL_Ack and ONB_Ack, reported as service type 1 subtypes 9 to 14 (successful/failed GS, UL and on-board acceptance). *(PDF p. 46)*
- Incoming messages are filed in SCOS internal packets by SPID chosen from Msg_Type, APID, service type/subtype and the PI1/PI2 fields (per the Database Import ICD section 3.3.2.4.2). *(PDF p. 57)*
- TM packets with no matching pid.dat entry are filed under EGSE_WRAPPER_PKTID_6 and can be re-distributed into proper SPID archives with PDS_DISP after the MIB is updated. *(PDF p. 60)*
- Bit numbering convention: bit 0 is the first transmitted bit and the MSB of a binary value. *(PDF p. 63)*
- Known bug: time parameters before 1970 display wrongly; with a 1958 epoch a raw value of 0 shows as 2094. *(PDF p. 64)*
- On the H/P CCS each TOPE procedure runs as a separate process and must explicitly connect and attach to a SCOE before commanding it. *(PDF p. 70)*


## Cited by these wiki pages (20)

- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [Calibration in the MIB](../mib/calibration.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Commanding in the MIB: commands and their parameters](../mib/commanding.md)
- [Display definitions in the MIB](../mib/displays.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [History of the Database Import ICD (issues 5.1 to 7.2)](../mib/icd-history.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Monitoring in the MIB: parameters and packets](../mib/monitoring.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)
- [The MIB: Mission Information Base](../mib/index.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (58 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Approval and change log | 2 |
    |  | Change record | 3 |
    |  | Table of contents | 4 |
    | 1 | INTRODUCTION | 7 |
    | 1.1 | Scope | 7 |
    | 1.2 | Applicable and Reference Documents | 8 |
    | 1.3 | List of Acronyms | 8 |
    | 1.4 | Overview | 9 |
    | 1.4.1 | The Space System Model | 10 |
    | 1.4.2 | The EMCS kernel | 13 |
    | 1.4.3 | The Test and Operation Procedure Environment | 13 |
    | 1.4.4 | The SCOE | 14 |
    | 2 | INSTALLING THE SCOS EMCS OPERATIONAL ACCOUNT | 16 |
    | 2.1 | Pre-requisites | 16 |
    | 2.2 | Installation Procedure | 16 |
    | 2.3 | Known problems with the SCOS EGSE 2.3 P5 version | 18 |
    | 3 | INSTALLING THE SCOS EMCS DEVELOPMENT WORKSPACES | 20 |
    | 3.1 | Pre-requisites | 20 |
    | 3.2 | Installing the SCOS EMCS release 2.3e P5 sources | 20 |
    | 4 | CONFIGURING THE SCOS EMCS | 21 |
    | 4.1 | The Mission Information | 21 |
    | 4.1.1 | The minimum EGSE data set | 21 |
    | 4.1.2 | The mergeDATA facility | 22 |
    | 4.1.3 | The setSCOSdata facility | 22 |
    | 4.2 | MISCconfig EGSE specific variables | 23 |
    | 4.3 | Environment variables for the TCL scripts of TOPE | 25 |
    | 5 | STARTING THE EMCS | 26 |
    | 5.1 | Starting the SCOS EGSE tasks | 26 |
    | 5.2 | Starting the External Interfaces and TOPE procedure environment | 27 |
    | 6 | TOPE LANGUAGE DEFINITION | 28 |
    | 6.1 | Sending Commands to the Unit Under Test and/or SCOEs | 28 |
    | 6.2 | Fetch a parameter | 35 |
    | 6.3 | Subscribe to a parameter | 37 |
    | 6.4 | Subscribe to a set of parameters | 38 |
    | 6.5 | Unsubscribe to parameters | 39 |
    | 6.6 | Wait For a condition to become true | 39 |
    | 6.7 | Wait For Time Interval | 40 |
    | 6.8 | Watchdog | 40 |
    | 6.9 | Log a message | 41 |
    | 6.10 | Open log file | 41 |
    | 6.11 | Close log file | 42 |
    | 6.12 | Miscellaneous functions | 42 |
    | 7 | EGSE SPECIFIC FUNCTIONS / DATA STRUCTURES | 44 |
    | 7.1 | EGSE Message Format | 44 |
    | 7.2 | The EMCS Request acknowledgement Policy | 46 |
    | 7.3 | SCOE Request | 49 |
    | 7.4 | SCOE command Verification Report | 50 |
    | 7.5 | SCOE Observation Report | 52 |
    | 7.6 | Sending TC Packets | 53 |
    | 7.7 | Sending TC Packet Verification Report | 54 |
    | 7.8 | TM Packet Report | 56 |
    | 7.9 | Processing data messages coming from the EGSE Router | 57 |
    | App. A | MS-WINDOWS TM FRONT END USER MANUAL | 62 |
    | App. B | CONVENTIONS | 63 |
    | App. C | LIMITATIONS AND KNOWN BUGS | 64 |
    | App. D | HOW TO INSTALL SUSE FOR SCOS EMCS | 66 |
    | App. E | CCS MIGRATION GUIDELINE | 70 |
    | App. F | HOW TO UPDATE THE TOPE SYSTEM TO AVOID THE TUBA DEBUGGER TO STEP INTO CERTAIN PROCEDURES | 72 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-scos2000-r2-3e-documentation-all) | SCOS2000 R2.3e Documentation (all) |  | reference |
| [A1] | [ESTEC/TOS- EMG/98.015/PSH](../references/index.md#ref-estec-tos-emg-98-015-psh) | EGSE Gateway ICD. |  | applicable |
| [R1] | [ECSS- E70-31](../references/index.md#ref-ecss-e70-31) | ECSS - Ground Systems and Operations. Monitoring and Control Data Definition Standard. |  | reference |
| [R2] | [ECSS- E70-32](../references/index.md#ref-ecss-e70-32) | ECSS - Ground Systems and Operations. Procedure Definition Language. |  | reference |
| [R3] | [ECSS- E70-41](../references/index.md#ref-ecss-e70-41) | ECSS - Ground Systems and Operations. Telemetry and Telecommand Packet Utilization. |  | reference |
| [R4] | [SOE-EMCS-SUM-0001](../references/index.md#ref-soe-emcs-sum-0001) | SCOS-2000 2.3e EMCS SUM |  | reference |
| [R5] | [S2K-MCS- ICD-0001-TOS-GCI- Issue51+MIB](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database Import ICD Issue 5.1 | Issue 5.1 | reference |
| [R6] | [S2K-TER_TN-002](../references/index.md#ref-s2k-ter-tn-002) | S2K EGSE Extensions Technical Note | Draft 1B 15.02.2002 | reference |
| [R7] | [catalogue](../references/index.md#ref-tcl-tk-version-8-3-reference-manual) | TCL/TK version 8.3 Reference Manual |  | reference |
| [R8] | [S2K-MCS-SUM-0002-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0002-tos-gci) | Scos2000 Configuration and Installation Guide. |  | reference |
| [R9] | [S2K-MCS- ICD-0005-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0005-tos-gci) | Scos2000 Command Injection Service ICD. |  | reference |
|  | [ECSS-E-00](../references/index.md#ref-ecss-e-00) | ECSS-E-00 standard (Space System concept) |  | mentioned |

!!! note "Notes"
    Archive stamp SPIRE-ESA-DOC-002291; source file name EMCS-SUM4_0.doc. Printed page numbers equal PDF page indexes (page N of 72; the PDF has a trailing blank page). Inconsistencies as printed: the SE-ID table gives decimal 4099 for 0x1000 and 34816-36863 for 0x8000-0x8FFF (PDF p. 11); the MISCconfig defaults give 23 and 24 for EGSE_VER_TC_GS_PKTID and EGSE_VER_TC_REP_PKTID (PDF p. 24), whereas sections 7.7 and 7.8 cite SPIDs 10005 and 10006 (PDF pp. 54, 56); the EGSE_PIC_FILE_3/_6 variable names are repeated for the pid3.dat/pid.dat rows (PDF p. 25); section 5 refers to 'section 0' (broken cross-reference, PDF p. 26). Document IDs in the reference list are printed with stray spaces ('ECSS- E70-31', 'S2K-MCS- ICD-...'). Appendix D is an ESTEC-internal SuSE 7.3 installation recipe. [R5] is available in this library as icd-5-1-tos-gci; [A1] appears in cosmos-common-egse-document-overview as TOS-GCE/98.015/PSH.

