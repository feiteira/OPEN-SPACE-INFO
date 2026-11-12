---
title: "Herschel/Planck EGSE General Requirements Specification"
description: "Issue 03 (10 June 2002) of Alcatel Space's top-level requirements specification for all Electrical Ground Support Equipment (EGSE) used in the electrical and functional integration, environmental test"
tags: ["Requirements Specification", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [h-p-1-aspi-sp-0045-egse-general-req]
---

# EGSE General Requirements Specification

<dl class="osi-meta"><dt>Document ID</dt><dd>H-P-1-ASPI-SP-0045</dd><dt>Issue / version</dt><dd>03</dd><dt>Date</dt><dd>2002-06-10</dd><dt>Organisation</dt><dd>Alcatel Space - Cannes</dd><dt>Authors</dt><dd>B. DUBOIS, J.Y. CHARNIER, D. MONTET, C. MASSE, J.J. JUILLET</dd><dt>Type</dt><dd>Requirements Specification</dd><dt>Status</dt><dd>Issue 03 dated 10/06/02 (change record: '10/June/02'); earlier issues 01 of 02/10/01 (first issue) and 02 of 12/10/01 (PDF p. 3). Signature fields are empty in this copy (PDF p. 2).</dd><dt>Pages</dt><dd>74</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://research.uleth.ca/spire/documents/pdf/H-P-1-ASPI-SP-0045_3.0_-_EGSE_General_Requirements_Specification.pdf" rel="noopener">https://research.uleth.ca/spire/documents/pdf/H-P-1-ASPI-SP-0045_3.0_-_EGSE_General_Requirements_Specification.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:52Z</dd><dt>SHA-256</dt><dd><code>5b2ef5793e5dab0ce3b7c6372069d480e55ca199e8dd890b5af32b7e605f19ef</code></dd><dt>Size</dt><dd>648.5 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/h-p-1-aspi-sp-0045-egse-general-req.pdf">h-p-1-aspi-sp-0045-egse-general-req.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 03 (10 June 2002) of Alcatel Space's top-level requirements specification for all Electrical Ground Support Equipment (EGSE) used in the electrical and functional integration, environmental testing and launch operations of the Herschel and Planck satellites. It is the parent of the specifications of the individual EGSE items (CCS, TM/TC DFE, TT&C, power, CDMU and ACMS SCOEs, PLM SCOE, CDMU DFE, Herschel cryo SCOE and the EGSE interface specification), shown in a specification tree. The RF suitcase and the SVF are excluded.

After the document lists and definitions (requirements labelled GRQT-xxxx, each with an analysis, review or test check method), section 3.2 sets the functional rules: a modular EGSE, test control centralised in the Central Checkout System (CCS) with backup MMIs in all SCOEs, and commonality between instruments, between checkout and flight control, and between test levels, with both the instrument EGSEs and ESOC's flight control system based on SCOS-2000. It describes each system EGSE item: the CCS (test sequences, satellite database, pre-transmission checks, housekeeping processing, test result archive, HPSDB mirror site), the TM/TC data front end (telemetry up to 3.5 Mbps reconstructed from transfer frames, telecommands up to 4 Kbps encapsulated in CLTUs, hazardous-command filtering, CLCW evaluation, NDIU link to the MOC), the TT&C, power, 1553-bus (CDMU) and AOCS (ACMS) SCOEs, and the launch-pad equipment (COTE, spacecraft simulator).

Sections 3.3 to 3.5 give requirements common to every SCOE: archiving and logging, cold and hot start-up with self-test, local and remote modes, safety, maintainability, three 100 Mb/s Ethernet LANs, power, grounding, cable marking, transport and storage. Section 4 defines three acceptance-test levels with a verification matrix, and Annex 1 counts EGSE units per spacecraft model.

It shows where SCOS-2000-based tools sit in the Herschel/Planck checkout chain.


## Key points

- Scope: top-level, implementation and interface requirements for the EGSE used during the whole electrical and functional integration, environmental testing and launch operations of Herschel and Planck; the RF suitcase and SVF are not covered. *(PDF p. 7)*
- Each requirement is labelled GRQT-xxxx and has a check method: Analysis, Review or Test. *(PDF p. 14)*
- GRQT-0000c: the MMIs controlling test execution are centralised in the CCS, with backup MMIs in all SCOEs. *(PDF p. 16)*
- Commonality areas between flight control and checkout systems include the Mission Information Base (spacecraft and instrument databases), MMIs, data archiving and distribution, on-board software management and maintenance, and the user language. *(PDF p. 18)*
- Baseline: the Instrument EGSEs will be based on ESOC's SCOS-2000, and the Flight Control System provided by ESOC will be based on SCOS-2000; ILT test procedures and OBCPs should be reusable in the CCS and in operations. *(PDF p. 19)*
- The CCS shall be compatible with [S2] and [S3]; telecommands are pre-transmission checked against the Satellite Database, and during SVTs commanded from the MOC a facility shall block or veto dangerous commands from ESOC. *(PDF p. 28)*
- 'CCS lite' differs from the nominal CCS only in having one server instead of two. *(PDF p. 28)*
- GRQT-0002b: the CCS shall support an HPSDB (Herschel/Planck System DataBase) mirror site; all archived data shall be time-correlated to 1 second (TBC). *(PDF p. 30)*
- GRQT-0003 TM/TC DFE: TM acquisition up to 3.5 Mbps with packet reconstruction from transfer frames and frame-level validation; TC sending up to 4 Kbps with encapsulation into transfer frames (CLTU), hazardous TC filtering and CLCW evaluation; TM/TC exchange with the NDIU. *(PDF p. 31)*
- The CDMU SCOE acts as MIL STD 1553B bus monitor and remote-terminal simulator, including injection of predefined bus errors and quick loading of mass memories. *(PDF p. 36)*
- GRQT-0150: at every start-up each SCOE checks local disk free space, creates a dated directory and opens its archive and log files. *(PDF p. 44)*
- GRQT-0642/0644: TCCs and CCS peripherals on the 'Main CCS LAN', SCOEs and DFE on the 'SCOE/DFE LAN', experiment EGSEs on a separate 'Instrument Station LAN', all 100 Mb/s Ethernet with TCP/IP class B addressing. *(PDF p. 54)*
- GRQT-0650: an EGSE interface compatible with the ESA-provided NDIU carries TM and TC between the satellites and the MOC. *(PDF p. 54)*
- GRQT-0740: EGSE equipment is designed for 230 V (+5%, -10%), 50 Hz mains power. *(PDF p. 55)*
- Acceptance testing has three levels: equipment, system EGSE, and the complete H/P EGSE with the satellite. *(PDF p. 66)*
- Annex 1: three CCS (two servers) and two 'CCS light' units, three TM/TC DFEs and other system SCOEs, all provided by Alenia. *(PDF p. 72)*


## Cited by these wiki pages (6)

- [ECSS: the European space standards system](../ecss/index.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Missions](../missions/index.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (60 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title and approval page | 2 |
    |  | Change records | 3 |
    |  | Table of contents and list of figures | 4 |
    | 1 | SCOPE | 7 |
    | 2 | DOCUMENTS | 8 |
    | 2.1 | Standards | 8 |
    | 2.2 | Reference Documents | 8 |
    | 2.3 | Applicable Documents | 9 |
    | 2.4 | Acronyms | 10 |
    | 3 | REQUIREMENTS | 11 |
    | 3.1 | General description | 11 |
    | 3.1.1 | FUNCTIONAL DESCRIPTION | 11 |
    | 3.1.2 | USE AND MISSION | 11 |
    | 3.1.3 | EGSE Specification Tree | 12 |
    | 3.1.4 | SPECIFIC TERMS AND DEFINITION | 13 |
    | 3.2 | FUNCTIONAL REQUIREMENTS | 16 |
    | 3.2.1 | BASIC RULES AND CONCEPTS | 16 |
    | 3.2.2 | COMMONALITY REQUIREMENTS | 18 |
    | 3.2.3 | GENERALITIES | 20 |
    | 3.2.4 | SYSTEM EGSE | 28 |
    | 3.2.4.1 | CCS (Central Checkout System) | 28 |
    | 3.2.4.2 | TM/TC DFE | 31 |
    | 3.2.4.3 | TT&C SCOE | 33 |
    | 3.2.4.4 | POWER SCOE | 34 |
    | 3.2.4.5 | CDMU SCOE | 36 |
    | 3.2.4.6 | ACMS SCOE | 37 |
    | 3.2.5 | PLM EGSE | 38 |
    | 3.2.6 | Spacecraft Interface Simulator (SIS) | 39 |
    | 3.2.7 | EGSE SPECIFIC Herschel | 39 |
    | 3.2.8 | EGSE SPECIFIC Planck | 39 |
    | 3.2.9 | LAUNCHER INTERFACE | 40 |
    | 3.2.10 | AUXILIARY EQUIPMENT | 42 |
    | 3.3 | OPERATIONAL REQUIREMENTS | 43 |
    | 3.3.1 | GENERAL | 43 |
    | 3.3.2 | OPERATING MODES | 45 |
    | 3.3.3 | CREATED ENVIRONMENT | 45 |
    | 3.3.4 | LIFE TIME REQUIREMENTS | 46 |
    | 3.3.5 | FUNCTIONAL SAFETY REQUIREMENTS | 47 |
    | 3.3.6 | INTERCHANGEABILITY REQUIREMENTS | 51 |
    | 3.4 | INTERFACES REQUIREMENTS | 52 |
    | 3.4.1 | EGSE to/from SPACECRAFT INTERFACES | 52 |
    | 3.4.2 | EGSE EXTERNAL INTERFACES | 53 |
    | 3.4.3 | EGSE INTERNAL INTERFACES | 54 |
    | 3.5 | DESIGN AND CONSTRUCTION REQUIREMENTS | 55 |
    | 3.5.1 | GENERAL REQUIREMENTS | 55 |
    | 3.5.2 | SPECIFIC REQUIREMENTS | 55 |
    | 3.5.3 | IMPOSED DESIGN | 60 |
    | 3.5.4 | IMPOSED MATERIAL PROCESS AND COMPONENTS | 60 |
    | 3.5.5 | PRODUCT IDENTIFICATION | 64 |
    | 4 | VERIFICATION REQUIREMENTS | 66 |
    | 4.1 | GENERAL REQUIREMENTS | 66 |
    | 4.2 | GENERAL TEST CONDITION | 67 |
    | 4.3 | ACCEPTANCE TESTS | 67 |
    | 5 | ANNEX 1 : EGSE LIST | 72 |
    | 5.1 | System EGSE | 72 |
    | 5.2 | PLM EGSE | 73 |
    | 5.3 | SIS | 73 |
    | 5.4 | EGSE Specific Herschel | 73 |
    | 5.5 | EGSE Specific Planck | 73 |
    | 5.6 | Launcher interface | 73 |


## Documents this one references (30)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| S1 | [ECSS-E-40B draft](../references/index.md#ref-ecss-e-40b-draft) | Space Engineering : Software | 28 July 2000 | normative |
| S2 | [ESA-PSS-04-105](../references/index.md#ref-esa-pss-04-105) | TM Packet Standard |  | normative |
| S3 | [ESA-PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | TC Packet Standard |  | normative |
| S4 | [ECSS-Q-80B](../references/index.md#ref-ecss-q-80b) | Software Product Assurance | Issue draft 3 April 2000 | normative |
| RD1 | [catalogue](../references/index.md#ref-rf-suitcase-specification) | RF suitcase Specification | To be issued | reference |
| RD2 | [catalogue](../references/index.md#ref-svf-specification) | SVF Specification | To be issued | reference |
| RD3 | [H-P-1-ASPI-TN-0100](../references/index.md#ref-h-p-1-aspi-tn-0100) | SCOS 2000 Evaluation |  | reference |
| AD1 | [CSG-RS-10A-CN](../references/index.md#ref-csg-rs-10a-cn) | CSG Safety regulations Volume 1 - General rules (Volume 1 taken precedence) | 5/1 03.03.99 | applicable |
| AD2 | [CSG-RS-21A-CN](../references/index.md#ref-csg-rs-21a-cn) | CSG Safety regulations Specific rules Volume 2 Part 1 - Ground Installations | 5/0 15.12.97 | applicable |
| AD3 | [CSG-RS-22A-CN](../references/index.md#ref-csg-rs-22a-cn) | CSG Safety regulations Specific rules Volume 2 Part 1 - Spacecraft | 5/1 03/03.97 | applicable |
| AD4 | [SCI-TP-RS-07430](../references/index.md#ref-sci-tp-rs-07430) | System AIV REQUIREMENTS |  | applicable |
| AD5 | [H-P-1-ASPI-SP-0029](../references/index.md#ref-h-p-1-aspi-sp-0029) | Safety Requirements |  | applicable |
| AD6 | [SCI-PT-IF-07527](../references/index.md#ref-sci-pt-if-07527) | Herschel/Planck Packet Structure Interface Control Document (PS-ICD) |  | applicable |
| AD7 | [H-P-1-ASPI-SP-0037](../references/index.md#ref-h-p-1-aspi-sp-0037) | EMC Specification |  | applicable |
| AD8 | [SCI-PT-RS-07360](../references/index.md#ref-sci-pt-rs-07360) · [library](cosmos-operations-interface-requirements.md) | Operations Interface Requirements Document |  | applicable |
| AD9 | [H-P-1-ASPI-IS-0121](../references/index.md#ref-h-p-1-aspi-is-0121) · [library](rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md) | EGSE INTERFACE REQUIREMENTS SPECIFICATIONS |  | applicable |
| AD11 | [H-P-1-ASPI-SP-0110](../references/index.md#ref-h-p-1-aspi-sp-0110) | Ground Support Equipment Applicability Matrix of ECSS-E-40B |  | applicable |
| AD12 | [H-P-1-ASPI-SP-0018](../references/index.md#ref-h-p-1-aspi-sp-0018) | PA Requirements for Subcontractors |  | applicable |
|  | [HP-2-ASED-PS-0013](../references/index.md#ref-hp-2-ased-ps-0013) | Herschel Cryo SCOE Requirements Specification |  | mentioned |
|  | [H-P-SP-AI-0010](../references/index.md#ref-h-p-sp-ai-0010) | CCS Requirement Specification |  | mentioned |
|  | [H-P-1-ASPI-IS-0121](../references/index.md#ref-h-p-1-aspi-is-0121) · [library](rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md) | EGSE INTERFACE Requirement Specification |  | mentioned |
|  | [H-P-SP-AI-0030](../references/index.md#ref-h-p-sp-ai-0030) | TM/TC DFE Requirement Specification |  | mentioned |
|  | [H-P-SP-AI-0028](../references/index.md#ref-h-p-sp-ai-0028) | POWER SCOE Requirement Specification |  | mentioned |
|  | [H-P-SP-AI-0029](../references/index.md#ref-h-p-sp-ai-0029) | TT&C SCOE Requirement Specification |  | mentioned |
|  | [H-P-SP-AI-0013](../references/index.md#ref-h-p-sp-ai-0013) | ACMS SCOE Requirement Specification |  | mentioned |
|  | [H-P-SP-AI-0027](../references/index.md#ref-h-p-sp-ai-0027) | CDMU SCOE Requirements Specification |  | mentioned |
|  | [H-P-SP-AI-0019](../references/index.md#ref-h-p-sp-ai-0019) | PLM SCOE Requirement Specification |  | mentioned |
|  | [H-P-SP-AI-0020](../references/index.md#ref-h-p-sp-ai-0020) | CDMU DFE Requirement Specification |  | mentioned |
|  | [H-P-1-ASPI-SP-xxxx](../references/index.md#ref-h-p-1-aspi-sp-xxxx) | THCT SCOE (TBC) Requirement Specification |  | mentioned |
|  | [H-P-1-ASPI-SP-xxxx](../references/index.md#ref-h-p-1-aspi-sp-xxxx) | DISSIP SCOE (TBC) Requirement Specification |  | mentioned |

!!! note "Notes"
    PDF p. 1 is blank; printed page N/73 is PDF p. N+1; PDF p. 75 is blank. The cover logo is garbled in the text layer. 'authors' lists all names on the approval page: written by B. DUBOIS (EGSE Engineer); verified by J.Y. CHARNIER (RAIT), D. MONTET (AIV Manager), C. MASSE (PA Manager); approved by J.J. JUILLET (Project Manager). Applicable-document issue/date strings are printed as 'Issue/Rev/Date : 5/1/03.03.99' etc. and split here into issue and date. Inconsistencies as printed: [S2] ESA-PSS-04-105 is titled 'TM Packet Standard' and [S3] ESA-PSS-04-106 'TC Packet Standard', whereas the OIRD (cosmos-operations-interface-requirements) lists PSS-04-106 as the Packet Telemetry Standard and PSS-04-107 as the Packet Telecommand Standard; AD10 is absent; the body cites RD-1 to RD-4 and RD-7 with meanings (commonality rationale, phased implementation, CCS requirements versus SCOS 2000) that do not match the RD list (RD1 RF suitcase, RD2 SVF, RD3 SCOS 2000 Evaluation), apparently text inherited from an ESA document; '[AD09]' is written for AD9. Section 3.2.6 (SIS) and 5.3 are 'Deleted'. Footnotes say the THCT and DISSIP SCOEs are neither specified, procured nor used by Alenia. Requirements carry AIVE-/AICO- cross-references to an unnamed higher-level requirement set. AD8 is library item cosmos-operations-interface-requirements.

