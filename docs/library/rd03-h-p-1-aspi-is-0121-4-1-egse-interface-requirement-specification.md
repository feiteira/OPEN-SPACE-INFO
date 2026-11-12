---
title: "Herschel/Planck EGSE Interface Requirements Spec (PIPE)"
description: "The interface requirements specification for the Herschel and Planck system-level EGSE (Electrical Ground Support Equipment)."
tags: ["Requirements Specification", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification]
---

# EGSE INTERFACE Requirements Specification

<dl class="osi-meta"><dt>Document ID</dt><dd>H-P-1-ASPI-IS-0121</dd><dt>Issue / version</dt><dd>4.1</dd><dt>Date</dt><dd>2004-12-14</dd><dt>Organisation</dt><dd>Herschel/Planck prime contractor (ASPI document series, i.e. Alcatel Space; the cover page is not in the text layer); distributed to ESA, Astrium and Alenia</dd><dt>Authors</dt><dd>B.DUBOIS</dd><dt>Type</dt><dd>Requirements Specification</dd><dt>Status</dt><dd>Issue 4.1 of 14/12/04 (change record, PDF p. 3). Earlier issues: 01 (07/Nov/01), 02 (04/June/02), 03 and 3.1 (18/June/02) and 4.0 (10/April/03). No later issue is in the library. The file name labels it RD03 of the SPIRE IIDA applicable/reference document set.</dd><dt>Pages</dt><dd>107</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/003055_DOC_ESA_IIDA_Applicable_Reference_Documents/IIDA_Applicable_Ref_Docs/RD03%20-%20H-P-1-ASPI-IS-0121_4_1%20-%20EGSE%20Interface%20Requirement%20Specification.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/003055_DOC_ESA_IIDA_Applicable_Reference_Documents/IIDA_Applicable_Ref_Docs/RD03%20-%20H-P-1-ASPI-IS-0121_4_1%20-%20EGSE%20Interface%20Requirement%20Specification.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:52Z</dd><dt>SHA-256</dt><dd><code>1ad370fe2994416267d3e40365e069e67fc8be81a706109dafe26e6c44781cbb</code></dd><dt>Size</dt><dd>534.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/RD03---H-P-1-ASPI-IS-0121_4_1---EGSE-Interface-Requirement-Specification.pdf">RD03---H-P-1-ASPI-IS-0121_4_1---EGSE-Interface-Requirement-Specification.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The interface requirements specification for the Herschel and Planck system-level **EGSE** (Electrical Ground Support Equipment). It covers how the Central Checkout System (CCS) talks to every SCOE (Specific Check-Out Equipment), the TM/TC and CDMU front ends (DFE) and the instrument EGSEs (Instrument Stations, IS). It also covers the electrical interfaces between the EGSE, the units under test (SVM, PLM, spacecraft) and other EGSE items. Section 3 shows the Planck and Herschel EGSE architectures (CCS, packet router, SCOE/DFE LAN, IS LAN, NDIU links to ESOC) and the PLM, spacecraft and launch configurations.

Section 4 is the core: the **PIPE** protocol (Packet Interface Protocol for EGSE) over TCP/IP on 100 Mb/s Ethernet. Each message is a 10-byte PIPE header (message ID, VCID, remaining length, request ID, synchronisation word 0xFADE) followed by an unchanged Herschel/Planck source packet. Message IDs separate spacecraft TCs (0x80), SCOE remote commands (RC, 0x44, PUS-style packets of type (8,4)), telemetry (0x20), SCOE remote monitoring (RM, 0x10: periodic (3,25) housekeeping and (5,x) events), alive packets (0x11), acknowledgements, TC echo (0xA0) and TC report (0x57). The document defines the RC and RM packet headers and the CCS client / SCOE server connection rules. It also defines the TC hand-shake with 5-second acknowledgement time-outs and AD/BD-mode TC reports derived from the CLCW. Finally, it gives the APID and host table for every EGSE item, NTP time synchronisation, data rates, and how RC and RM definitions enter the HPSDB (the Herschel/Planck [MIB](../mib/index.md)) with naming conventions.

Sections 5 and 6 give the electrical harness interfaces and the verification matrix. This is one of the clearest public descriptions of how a [SCOS-2000](../scos2000/egse.md)-era checkout system wrapped CCSDS/PUS packets for ground equipment.


## Key points

- The document has two parts. §4 covers the communication protocol between the CCS and all EGSE items. Remote Commanding/Remote Monitoring (RC/RM) of SCOEs and front ends is distinct from satellite TC and TM. §5 covers the electrical interfaces between EGSE and the units under test and between EGSE items. *(PDF p. 9)*
- The CCS alone sends telecommands and commands the SCOEs, and it archives all low-rate telemetry, telecommand data and other CCS/SCOE traffic. *(PDF p. 23)*
- PIPE embeds TM/TC packets unchanged behind an information header. For Herschel/Planck the maximum complete TC (and RC) packet is 248 bytes and the maximum TM (and RM) packet is 1024 bytes, per the PS-ICD [S4]. *(PDF p. 24)*
- IFRQT-0010: EGSE communication uses 100 Mb/s Ethernet with TCP/IP and class B addressing. CCS-SCOE traffic uses the SCOE/DFE LAN and CCS-instrument station traffic uses the IS LAN. *(PDF p. 25)*
- The CCS is the client and each SCOE/DFE/IS a server that accepts connections automatically. The CCS expects at least one message from each server every 60 seconds (no keep-alive in the other direction), and it drops the connection on header length or synchronisation errors, 5-second read/write time-outs or 60 s of silence. *(PDF p. 27)*
- The bit numbering is CCSDS style (bit 0 is the first transmitted bit and the MSB), and the byte order is big-endian. *(PDF p. 28)*
- The PIPE header is 10 bytes: Message ID (1), VCID (1, TM only), Remaining length (2, body length + 6), Request ID (4, echoed in ACKTC/ACKRC and TC Report) and Synchronisation Word (2, always 0xFADE). *(PDF p. 29)*
- RM packets are TM source packets with a 10-byte data field header (PUS version 0, type, subtype, spare, 6-byte CUC time with 4 bytes coarse and 2 bytes fine, TAI epoch 1958-01-01). The packet error control field is not used. *(PDF p. 32)*
- RC packets are TC packets of type 8, subtype 4, with the acknowledge field set to 0b0001. The application data is Function ID (1 byte), Activity ID (1 byte), SID (2 bytes) and optional parameters, and the source part of the sequence count is 0b000. *(PDF p. 35)*
- Message IDs: 0x80 TC, 0x44 RC (8,4), 0x20 TM acquisition and distribution, 0x10 RM periodic (3,25) or asynchronous (5,1), 0x11 alive, 0x50/0x51 ACKRC (1,1)/(1,2), 0x55/0x56 ACKTC (1,1)/(1,2), 0xA0 TC Echo, and 0x57 TC Report (5,1) success or (5,4) transmission failure. *(PDF p. 37)*
- TC hand-shake (IFRQT-0161): the DFE checks and queues each TC and returns ACKTC, encodes it into a CLTU, decodes the CLTU back into a TC Echo, and always sends one TC Report as final confirmation. In AD mode the report follows the CLCW check; in BD mode it follows DFE acceptance. The CCS waits up to 5 s for each ACK before sending the next TC. *(PDF p. 39)*
- The CCS routes incoming packets to their destinations by SPID (APID + type + subtype + SID), using a distribution table defined in the HPSDB. *(PDF p. 50)*
- Periodic RM packets are sent at 1 packet/s for the POWER and PLM SCOEs and 1 packet/10 s for all other items. Every SCOE reports common parameters: local/remote mode, software activity, on-line/off-line status, self-test status and SCOE set (AVM, Herschel, Planck). *(PDF p. 52)*
- EGSE APIDs: CCS 2016 (0x7E0), CDMU SCOE 2017, ACMS SCOE 2018, TT&C SCOE 2019, TM/TC DFE 2020, CDMU DFE 2028, 1553 bus monitor 2029, and instrument EGSEs HFI 2040, LFI 2041, HIFI 2042, PACS 2043, SPIRE 2044 (0x7FC). *(PDF p. 78)*
- SCOE subcontractors supply all RM and RC parameter definitions for the HPSDB in a prescribed format, with mnemonics such as YC/YP (commands and parameters) and YM (monitoring), and PTC/PFC types. *(PDF p. 79)*
- EGSE items synchronise time with NTP, using the CCS as server. Two TM/TC DFE interfaces connect to the ESA NDIU for TM frames and TC CLTUs to the MOC. The TM link from DFE to CCS carries up to 150 kbps and the TC link up to 4 kbps. *(PDF p. 82)*


## Cited by these wiki pages (6)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (40 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Scope | 9 |
    | 2 | Documents | 10 |
    | 2.1 | Standard Documents | 10 |
    | 2.2 | Reference Documents | 11 |
    | 2.3 | Applicable Documents | 12 |
    | 2.4 | Acronyms | 13 |
    | 3 | General Description | 14 |
    | 3.1 | Functional Description | 14 |
    | 3.2 | Specific Terms and Definition | 23 |
    | 4 | EGSE Internal Interface Requirements | 24 |
    | 4.1 | Protocol Definition | 24 |
    | 4.1.2 | Communication Link | 27 |
    | 4.1.3 | Byte order | 28 |
    | 4.1.4 | Message Structure | 28 |
    | 4.1.5 | PIPE Message HEADER | 29 |
    | 4.1.6 | Body message | 31 |
    | 4.1.7 | Message ID List | 37 |
    | 4.1.8 | Message Control Flow description | 38 |
    | 4.2 | Control Flow – Telecommand Packets | 40 |
    | 4.3 | Control Flow – CCS Remote Commanding Packets | 41 |
    | 4.4 | Monitoring Flow - On-Board Telemetry Packets acquisition | 49 |
    | 4.5 | Monitoring Flow - Telemetry Packets Distribution | 50 |
    | 4.6 | Monitoring Flow – Remote Message Packets | 51 |
    | 4.7 | Monitoring Flow – Acknowledge Message Packets (ACKRC) | 67 |
    | 4.8 | Monitoring Flow – Acknowledge Message for TC (ACKTC) | 71 |
    | 4.9 | Monitoring Flow – TC Echo | 74 |
    | 4.10 | Monitoring Flow – TC Report | 75 |
    | 4.11 | Monitoring Flow – RM Alive Packet | 76 |
    | 4.12 | Interfaces Requirements | 77 |
    | 4.12.1 | Generic Interface Name | 78 |
    | 4.12.2 | Database | 79 |
    | 4.12.3 | Date/Time | 82 |
    | 4.12.5 | Interface TM/TC DFE↔ NDIU | 82 |
    | 4.12.8 | Performance | 82 |
    | 4.12.10 | Naming Convention Rules for EGSE items | 84 |
    | 5 | EGSE External Interface Requirements | 90 |
    | 5.1 | EGSE to S/C Interfaces | 93 |
    | 5.2 | EGSE to EGSE Interfaces | 100 |
    | 6 | Verification Matrix | 102 |
    | 6.1 | General Requirements | 102 |


## Documents this one references (38)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| S1 | [H-P-1-ASPI-SP-0110](../references/index.md#ref-h-p-1-aspi-sp-0110) | Ground Support Equipment Applicability Matrix of ECSS-E-40B |  | normative |
| S2 | [ESA-PSS-04-105](../references/index.md#ref-esa-pss-04-105) | TM Packet Standard |  | normative |
| S3 | [ESA-PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | TC Packet Standard |  | normative |
| S4 | [SCI-PT-IF-07527](../references/index.md#ref-sci-pt-if-07527) | Herschel/Planck Packet Structure Interface Control Document (PS-ICD) |  | normative |
| RD1 | [HSCDT-TN-017](../references/index.md#ref-hscdt-tn-017) | Understanding of the Interfaces between the CCS and the Herschel Instrument EGSEs in the IST |  | reference |
| RD2 | [H-P-SP-AI-0014](../references/index.md#ref-h-p-sp-ai-0014) | PCDU REQUIREMENT SPECIFICATION |  | reference |
| RD3 | [H-P-SP-AI-0003](../references/index.md#ref-h-p-sp-ai-0003) | CDMU Hardware REQUIREMENT SPECIFICATION |  | reference |
| RD4 | [H-P-SP-AI-0011](../references/index.md#ref-h-p-sp-ai-0011) | ACMS REQUIREMENT SPECIFICATION |  | reference |
| RD5 | [H-P-1-SP-AI-0015](../references/index.md#ref-h-p-1-sp-ai-0015) | SAS REQUIREMENT SPECIFICATION |  | reference |
| RD6 | [H-P-1-SP-AI-0022](../references/index.md#ref-h-p-1-sp-ai-0022) | Batteries REQUIREMENT SPECIFICATION |  | reference |
| RD7 | [H-P-SP-AI-0012](../references/index.md#ref-h-p-sp-ai-0012) | X/X Band Transponder Specification |  | reference |
| RD8 | [H-P-SP-AI-0023](../references/index.md#ref-h-p-sp-ai-0023) | RFDN Specification |  | reference |
| RD9 | [H-P-SP-AI-0024](../references/index.md#ref-h-p-sp-ai-0024) | X Band LGA Specification |  | reference |
| RD10 | [H-P-SP-AI-0025](../references/index.md#ref-h-p-sp-ai-0025) | X Band MGA Specification |  | reference |
| RD11 | [HP-2-ASED-TN-0048](../references/index.md#ref-hp-2-ased-tn-0048) | Description of the PLM-FM Cryo Control Instrumentation |  | reference |
| RD12 | [catalogue](../references/index.md#ref-ariane-5-user-s-manual) | ARIANE 5 User's Manual |  | reference |
| RD13 | [S2K-MCS-ICD-0014-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0014-tos-gci) | SCOS-2000 OBSM External Interfaces Control Document |  | reference |
| RD14 | [H-P-SAT-IF-1003](../references/index.md#ref-h-p-sat-if-1003) | PLM SCOE CCS Command and Data ICD |  | reference |
| RD15 | [H-P-SAT-IF-1004](../references/index.md#ref-h-p-sat-if-1004) | CDMU DFE CCS Command and Data ICD |  | reference |
| RD16 | [H-P-SAT-IF-1008](../references/index.md#ref-h-p-sat-if-1008) | TM/TC DFE CCS Command and Data ICD |  | reference |
| RD17 | [H-P-SAT-IF-1009](../references/index.md#ref-h-p-sat-if-1009) | CDMU SCOE CCS Command and Data ICD |  | reference |
| RD18 | [H-P-4-DS-IC-005](../references/index.md#ref-h-p-4-ds-ic-005) | ACMS SCOE CCS ICD |  | reference |
| RD19 | [H-P-4-SIA-IC-2001](../references/index.md#ref-h-p-4-sia-ic-2001) | H P POWER SCOE ICD |  | reference |
| RD20 | [H-P-4-SIA-IC-1001](../references/index.md#ref-h-p-4-sia-ic-1001) | H P TT&C SCOE ICD |  | reference |
| RD21 | [HP-2-ABSP-IC-0002](../references/index.md#ref-hp-2-absp-ic-0002) | Cryo PFM SCOE Internal & External ICD |  | reference |
| RD22 | [PICC-ME-xx-yyy](../references/index.md#ref-picc-me-xx-yyy) | Validation Plan for CCS – IEGSE Test sequence Commanding Interface |  | reference |
| RD23 | [HP-4-TE-ID-8020](../references/index.md#ref-hp-4-te-id-8020) | CCS External ICD |  | reference |
| AD1 | [H-P-1-ASPI-SP-0045](../references/index.md#ref-h-p-1-aspi-sp-0045) · [library](h-p-1-aspi-sp-0045-egse-general-req.md) | EGSE General Requirements Specifications |  | applicable |
| AD2 | [H-P-1-ASPI-SP-0082](../references/index.md#ref-h-p-1-aspi-sp-0082) | H-P System Database Specification |  | applicable |
| AD3 | [H-P-4-TE-ID-8020](../references/index.md#ref-h-p-4-te-id-8020) · [library](rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md) | CCS External Interface Control Document |  | applicable |
| AD4 | [NDIU3-DR-0001-GSY](../references/index.md#ref-ndiu3-dr-0001-gsy) | NDIU3 for ROSETTA SVT's Design Report (NDIU full) |  | applicable |
| AD4 | [ROS-MOC-NDIU-0001-GSY](../references/index.md#ref-ros-moc-ndiu-0001-gsy) | NDIU3 for ROSETTA SVT's User Manual (NDIU full) |  | applicable |
| AD4 | [RO-ESC-RS-5002](../references/index.md#ref-ro-esc-rs-5002) | I/F ROSETTA Gateway – TM/TC FEE (NDIU lite) |  | applicable |
| AD6 | [H-P-1-ASPI-SP-0141](../references/index.md#ref-h-p-1-aspi-sp-0141) | Naming convention |  | applicable |
| AD7 | [H-P-1-ASPI-SP-0027](../references/index.md#ref-h-p-1-aspi-sp-0027) | General Design and Interface Requirements |  | applicable |
| AD8 | [SCI-PT-ICD-07418](../references/index.md#ref-sci-pt-icd-07418) · [library](herschel-planck-space-ground-interface-control-document-sgicd.md) | Space/Ground Interface Control Document |  | applicable |
| AD9 | [H-P-1-ASPI-TN-0127](../references/index.md#ref-h-p-1-aspi-tn-0127) | EGSE Quick Load/Dump Interfaces |  | applicable |
|  | [H-P-ASP-LT-5167](../references/index.md#ref-h-p-asp-lt-5167) | Fax H-P-ASP-LT-5167 (event packet and TC report source data alignment with the PS-ICD) |  | mentioned |

!!! note "Notes"
    PDF p. 1 is empty in the text layer, so the cover (and any organisation name) is missing. The table of contents pages (PDF pp. 5-7) and the lists of figures and tables (PDF p. 8) have no text. Printed page N/107 is PDF p. N, and the extraction reports 108 PDF pages. Architecture figures (PDF pp. 15-21) survive only as scattered labels. AD5 is cited in §5.2.3 (PDF p. 101) but is not in the applicable-document list, which jumps from AD4 to AD6. AD4 groups three NDIU documents. The PS-ICD is cited as SCI-PT-IF-07527 [S4], while the library item uses SCI-PT-ICD-07527. The CCS External ICD appears as both RD23 (HP-4-TE-ID-8020) and AD3 (H-P-4-TE-ID-8020). Related library items: AD1 = h-p-1-aspi-sp-0045-egse-general-req (issue 03); AD3/RD23 = rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd; AD8 = herschel-planck-space-ground-interface-control-document-sgicd; S4 = ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d. The PIPE protocol is also used in ccs-tc-if-1-0 and herschel-egse-packet-router-icd. Host and port values in Table 15 (PDF p. 78) are internal EGSE network data.

