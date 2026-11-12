---
title: "Herschel/Planck Packet Structure ICD (PS-ICD 6.0)"
description: "The Herschel/Planck Packet Structure Interface Control Document (PS-ICD) is the mission-specific application-layer definition of every telemetry and telecommand packet exchanged between ground and the"
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d]
---

# Packet Structure Interface Control Document (PSICD)

<dl class="osi-meta"><dt>Document ID</dt><dd>SCI-PT-ICD-07527</dd><dt>Issue / version</dt><dd>6.0</dd><dt>Date</dt><dd>2008-01-25</dd><dt>Organisation</dt><dd>ESA Herschel/Planck Project; maintained by Thales Alenia Space (formerly Alcatel Space)</dd><dt>Authors</dt><dd>F. Sauvage, R. Sghedoni, I. Bénilan, Christiane Giacometti</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 6.0 of 25 Jan. 2008, 'Formal release for application' (change record, PDF p. 32). Earlier issues: 1 (1-9-2000), 2 (12-7-2001), 3 Draft 2 (12-11-2002), 3.0 (2-04-2003), 4 Draft 0 (25-07-2003, the first after hand-over of the document to Alcatel Space), 4 Draft 1 (04-11-2003), 4.0 (07-Nov-2003), 5.0 (20-Jul-2004) and 6.draftA (17 Dec. 2007). Section 1.1 says the document is agreed between the ESA Project Manager, ESOC and the Prime Contractor and is controlled by the Prime Contractor after approval.</dd><dt>Pages</dt><dd>243</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/003055_DOC_ESA_IIDA_Applicable_Reference_Documents/IIDA_Applicable_Ref_Docs/AD05%20-%20SCI-PT-ICD-07527_6_0%20-%20PSICD%20-%20Herschel-Planck%20Packet%20Structure%20Interface%20Control%20Document.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/003055_DOC_ESA_IIDA_Applicable_Reference_Documents/IIDA_Applicable_Ref_Docs/AD05%20-%20SCI-PT-ICD-07527_6_0%20-%20PSICD%20-%20Herschel-Planck%20Packet%20Structure%20Interface%20Control%20Document.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:45:14Z</dd><dt>SHA-256</dt><dd><code>5f00fef6ba23ee1ed00333d131658997f8750375e765a0de0c06c799fd7a9fa9</code></dd><dt>Size</dt><dd>1.6 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/AD05---SCI-PT-ICD-07527_6_0---PSICD---Herschel-Planck-Packet-Structure-Interface-Control-D.pdf">AD05---SCI-PT-ICD-07527_6_0---PSICD---Herschel-Planck-Packet-Structure-Interface-Control-D.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Herschel/Planck Packet Structure Interface Control Document (PS-ICD) is the mission-specific application-layer definition of every telemetry and telecommand packet exchanged between ground and the Herschel and Planck on-board units, subsystems and instruments. It complements ESA PSS-04-106/107. Being tailored for the mission, it states that it supersedes the Packet Utilisation Standard (ECSS-E-70-41A), and requirement 1000-GEN allows only the type/subtype combinations and data field layouts it defines.

After the operations scenario, Table 2-1 lists which of the 22 service types are used by the CDMS, the ACMS and the instruments. Chapters 3 and 4 fix the TC and TM packet headers: 3-bit command source codes in the TC sequence count, the Ack flags, a maximum TC packet of 248 octets (228 usable inside an MTL command), a maximum TM packet of 1024 octets, a 48-bit CUC time in the TM data field header, and on-board consistency checks of TM packets. Chapter 5 specifies the packet data fields of each service: verification, device commands, housekeeping and diagnostic reporting, events, memory management, function management, time, on-board scheduling (mission timeline with sub-schedules), monitoring, packet transmission control, storage and retrieval, test, OBCPs, event/action and science data transfer.

Appendices cover bit and field conventions, the type/subtype usage matrix per unit, the APID allocation with base address and offset per packet category, the virtual channel mapping, the CRC-16 checksum with test vectors, parameter types (PTC/PFC), and the time and idle packets. Appendix 9 is a self-contained MIL-STD-1553B Satellite Data Bus Protocol specification. It is the key reference for anyone reading Herschel or Planck MIBs or raw packets.


## Key points

- The PS-ICD complements PSS-04-106/107 with all mission-specific details of data transfer between ground and on-board applications and, being tailored for Herschel/Planck, supersedes the PUS (ECSS-E-70-41A); requirement 1000-GEN allows only the services and data structures it defines. *(PDF p. 39)*
- Service usage (Table 2-1): services 4, 7, 10, 13, 20 and 22 are not used; service 11 (scheduling), 15 (storage) and 16 (traffic management) are CDMS-only; service 21 (science data transfer) is instruments-only; 8, 12 and 18 are optional for instruments. *(PDF p. 45)*
- TC sequence count source codes (3 MSBs): 0b000 ground high priority, 0b001 CDMU FDIR, 0b010 mission time line, 0b011 OBCPs, 0b100 ground low priority, 0b101 ACC FDIR, 0b110 other CDMU sources, 0b111 other ACMS sources; applications must not check sequence count monotony. *(PDF p. 47)*
- Maximum TC packet data field is 242 octets (maximum TC packet 248 octets), but TCs encapsulated in MTL commands are limited to an overall 228 octets; packet length must be an integer number of 16-bit words. *(PDF p. 47)*
- TC data field header: CCSDS secondary header flag 0, PUS version 0 only, 4-bit Ack (acceptance, start, progress, completion), type, subtype and a spare octet; failure reports are always generated, and Ack bit 3 = 0 suppresses only TM(1,1). *(PDF p. 48)*
- All commands except the 'Standard Distribute CPDU command' TC(2,3) carry a data field header; because the type and subtype sit in that header, (2,3) is not indicated in the CPDU command packet itself. *(PDF p. 46)*
- The mandatory 16-bit Packet Error Control field lets the receiving application verify the whole TC packet; its type is fixed for the mission and defined in Appendix 4. *(PDF p. 49)*
- Maximum TM packet is 1024 octets (data field at most 1018 octets); segmentation flags are 0b11, except that TM(21,x) science packets may use them for packet grouping, which neither the on-board system nor the ESA ground system supports specially. *(PDF p. 51)*
- The TM data field header holds spare bits, PUS version 0, type, subtype, a spare octet and a 48-bit CUC time; a user unable to provide time synchronised with the central time reference sets the MSB of the time field to 1. *(PDF p. 52)*
- TM packets used on board by the CDMU or ACC are checked for APID, length, PEC, type and subtype (failure codes 0 to 4); on failure an event report TM(5,x) is raised, and unidentifiable packets go to ground on VC4. *(PDF p. 53)*
- APID structure: the upper bits are a base address per unit and the 4 LSBs encode packet category and prime/redundant unit, for example CDMS 16 (0x10), ACMS 512 (0x200), HIFI 1024 (0x400), PACS 1152 (0x480), SPIRE 1280 (0x500), HFI 1408 (0x580), LFI 1536 (0x600), SCS 1664 (0x680); APIDs 2016-2046 are reserved for SCOE/EGSE and 2047 for idle packets. *(PDF p. 158)*
- Packet category mapping: verification, events, essential HK TM(3,25) and most reports use base address + 0 (or + 1 for a redundant instrument) on VC0; non-essential HK TM(3,25) and diagnostic TM(3,26) use base + 2 (+ 3) on VC4; science TM(21,x) uses VC1; stored packets go out on the VC of their packet store (VC3 recommended for science, VC2 for others). *(PDF p. 164)*
- The PEC is a CRC-16 with generator polynomial X^16 + X^12 + X^5 + 1, initialised to all ones; test vectors include 00 00 -&gt; 0x1D0F and AB CD EF 01 -&gt; 0x04A2. *(PDF p. 166)*
- Parameter types: PTC 1 Boolean, 2 Enumerated, 3 Unsigned, 4 Signed, 5 Real, 6 Bit-string, 7 Octet-string, 8 Character-string (on-board use limited to software version identification), 9 Absolute time, 10 Relative time (not used), 11 Deduced. *(PDF p. 172)*
- Absolute time is PTC 9, PFC 17: 6 octets CUC (4 coarse, 2 fine) of spacecraft elapsed time without P-field, synchronised to TAI after the on-board time is set. *(PDF p. 178)*
- The Standard Spacecraft Time Source Packet uses APID 0 (all zeros) and carries spacecraft elapsed time for ground time correlation with UTC. *(PDF p. 180)*
- The time packet's P-field is 0b00101110, meaning 4 coarse and 2 fine time octets. *(PDF p. 181)*
- Idle packets, which fill transfer frames when no data is ready, use APID 0x7FF (all ones). *(PDF p. 182)*
- Appendix 9 specifies the MIL-STD-1553B Satellite Data Bus Protocol (physical, data link and transfer layers) for units connected to the data management subsystem; its transfer layer uses a 1-second frame divided into 64 subframes, and instrument TM packets must fit subframe boundaries. *(PDF p. 217)*


## Cited by these wiki pages (8)

- [From ESA PSS to CCSDS and ECSS: how the packet standards evolved](../overview/history.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (57 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1. | INTRODUCTION AND SCOPE | 39 |
    | 1.1 | Scope | 39 |
    | 1.2 | Operations Scenario | 40 |
    | 1.3 | APPLICABLE DOCUMENTS | 42 |
    | 1.4 | REFERENCE DOCUMENTS | 42 |
    | 2. | PACKET SERVICES | 44 |
    | 3. | TELECOMMAND STRUCTURE | 46 |
    | 3.1 | Telecommand Source Packets | 46 |
    | 4. | TELEMETRY STRUCTURE | 50 |
    | 4.1 | Telemetry Source Packet | 50 |
    | 4.2 | Telemetry Packet Verification | 53 |
    | 5. | PACKET DATA FIELD STRUCTURES | 54 |
    | 5.1 | Service Type 1 : Telecommand Verification Service | 54 |
    | 5.2 | Service Type 2 : Device Command Distribution | 59 |
    | 5.3 | Service Type 3 : Housekeeping & Diagnostic Data Reporting | 61 |
    | 5.4 | Service Type 4 : Not Used | 70 |
    | 5.5 | Service Type 5 : Event Reporting | 70 |
    | 5.6 | Service Type 6 : Memory Management | 72 |
    | 5.7 | Service Type 7 : Not Used | 78 |
    | 5.8 | Service Type 8 : Function Management | 78 |
    | 5.9 | Service Type 9 : Time Management | 84 |
    | 5.10 | Service Type 10 : Not Used | 88 |
    | 5.11 | Service Type 11 : On-board Scheduling | 88 |
    | 5.12 | Service Type 12 : On-board Monitoring | 101 |
    | 5.13 | Service Type 13 : Not Used | 111 |
    | 5.14 | Service Type 14 : Packet Transmission Control | 111 |
    | 5.15 | Service Type 15 : On-board Storage and Retrieval | 117 |
    | 5.16 | Service Type 16 : On-board Traffic Management | 128 |
    | 5.17 | Service Type 17 : Test Service | 128 |
    | 5.18 | Service Type 18 : On-board Control Procedures | 129 |
    | 5.19 | Service Type 19 : Event / Action Service | 142 |
    | 5.20 | Service Type 20 : Information Distribution Service | 148 |
    | 5.21 | Service Type 21 : Science Data Transfer | 149 |
    | 5.22 | Service Type 22 : Context Saving Service | 150 |
    | Appendix 1 | Conventions | 151 |
    | Appendix 2 | TM/TC Packet Types and Subtypes for Herschel/Planck | 153 |
    | Appendix 3 | Application Process ID Assignment | 158 |
    | Appendix 4 | The Checksum Algorithms | 166 |
    | Appendix 5 | Acronyms and Glossary of Terms | 168 |
    | Appendix 6 | Parameter Types and Structures | 172 |
    | Appendix 7 | Standard Spacecraft Time Source Packet | 180 |
    | Appendix 8 | Idle Packet Structure | 182 |
    | Appendix 9 | Satellite Data Bus Protocol Specification | 184 |
    | App9 1. | Introduction | 192 |
    | App9 2. | Physical Layer | 196 |
    | App9 3. | Data Link Layer | 198 |
    | App9 3.2 | Command Word | 202 |
    | App9 3.3 | RT Status Word | 208 |
    | App9 3.5 | Data Link Layer FDIR | 210 |
    | App9 4. | Transfer Layer | 215 |
    | App9 4.2 | Frame Synchronization by BC | 223 |
    | App9 4.3 | Time Synchronization | 224 |
    | App9 4.4 | Status Polling | 225 |
    | App9 4.5 | Telecommand Packet Delivery | 227 |
    | App9 4.6 | Telemetry Packet Retrieval | 232 |
    | App9 4.7 | Transfer Layer FDIR | 242 |
    | App9 4.8 | Data Rate Monitoring | 243 |


## Documents this one references (21)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-1 | [PSS-04-106](../references/index.md#ref-pss-04-106) | Packet Telemetry Standard | Issue 1 January 1988 | applicable |
| AD-2 | [PSS-04-107](../references/index.md#ref-pss-04-107) | Packet Telecommand Standard | Issue 2 April 1992 | applicable |
| AD-3 | [SCI-PT-RS-07360](../references/index.md#ref-sci-pt-rs-07360) · [library](cosmos-operations-interface-requirements.md) | Herschel / Planck Operations Interface Requirements Document (H/P-OIRD) |  | applicable |
| RD-1 | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Packet Utilisation Standard (PUS) | Issue 1 2002-11-06 | reference |
| RD-2 | [CCSDS 102.0-B-4](../references/index.md#ref-ccsds-102-0-b-4) | CCSDS Packet Telemetry | B-4 November 1995 | reference |
| RD-3 | [MIL-Std.-1553 B](../references/index.md#ref-mil-std-1553-b) | Digital Internal Time Division Command/Response Multiplex Data Bus | Issue Notice 2 1986-09-08 | reference |
| RD-4 | [H-P-4-ASPI-SP-0019](../references/index.md#ref-h-p-4-aspi-sp-0019) | SVM Requirements Specification |  | reference |
| RD-5 | [SCI-PT-IIDA-04624](../references/index.md#ref-sci-pt-iida-04624) | Herschel / Planck Instrument Interface Document Part A |  | reference |
| RD-6 | [H-P-SP-AI-0031](../references/index.md#ref-h-p-sp-ai-0031) | CDMU Application SW Requirements Specification |  | reference |
| RD-7 | [H-P-4-ASPI-IS-0042](../references/index.md#ref-h-p-4-aspi-is-0042) | SVM Interface Specification |  | reference |
| RD-8 | [H-P-1-ASPI-SP-0209](../references/index.md#ref-h-p-1-aspi-sp-0209) | System Operations & FDIR Requirements (SOFDIR) | issue 4.4 | reference |
| App9 AD-1 | [MIL-STD-1553B](../references/index.md#ref-mil-std-1553b) | Digital Time Division Command/Response Multiplex Data Bus | Notice 2 1986-09-08 | applicable |
| App9 AD-2 | [MIL-HDBK-1553A](../references/index.md#ref-mil-hdbk-1553a) | Multiplex Applications Handbook | 1988-11-01 | applicable |
| App9 RD-1 | [SCI-PT-IIDA-04624](../references/index.md#ref-sci-pt-iida-04624) | Herschel / Planck Instrument Interface Document – IID Part A |  | reference |
| App9 RD-2 | [SCI-PT-ICD-07527](../references/index.md#ref-sci-pt-icd-07527) ·  | Herschel / Planck Packet Structure Interface Control Document PS-ICD |  | reference |
| App9 RD-3 | [PSS-04-106](../references/index.md#ref-pss-04-106) | ESA Packet Telemetry Standard | Issue 1 1988 | reference |
| App9 RD-4 | [PSS-04-107](../references/index.md#ref-pss-04-107) | ESA Packet Telecommand Standard | Issue 2 1992 | reference |
| App9 RD-5 | [H-P-4-ASPI-SP-0019](../references/index.md#ref-h-p-4-aspi-sp-0019) | SVM Requirements Specification |  | reference |
| App9 RD-6 | [P-HPL-ICD-00001-SE](../references/index.md#ref-p-hpl-icd-00001-se) | CDMU HW / SW ICD | issue 1 | reference |
| App9 RD-7 | [H-P-1-ASPI-SP-0209](../references/index.md#ref-h-p-1-aspi-sp-0209) | System Operations & FDIR Requirements (SOFDIR) | issue 4.4 | reference |
| App9 RD-8 | [H-P-4-ASPI-IS-0042](../references/index.md#ref-h-p-4-aspi-is-0042) | SVM Interface Specification |  | reference |

!!! note "Notes"
    PDF page 1 (cover) has no text layer. The main body is paginated 'n/184' (a few pages print 'n/185') and these printed page numbers match the PDF page index up to page 184. Appendix 9 (PDF pp. 185-243) is a separate sub-document 'SCI-PT-ICD-07527 (App9)' with its own title page, change record (issues 4.0 of 07-Nov-2003, 5.0 of 20-Jul-2004 and later), pagination 1/59 to 59/59, paragraph numbers and reference list; some App9 headers print the date as 25-Jan-2005. The text extraction shows a 244th, empty page. The distribution list (PDF pp. 2-3) names many ESA, industry and instrument staff. The change record is long (PDF pp. 4-32) and lists requirement-level changes. Typos as printed include 'treceability' and 'MLT/MTI' for MTL (PDF p. 41). The SGICD (herschel-planck-space-ground-interface-control-document-sgicd) cites this document as SCI-PT-IF-07527, and TN-1072 (ad19-h-p-1-asp-tn-1072-06-payload-management-and-obcp) cites issue 5.0 as SCI-PT-ICD-7527. The OIRD (AD-3) is in the library as cosmos-operations-interface-requirements. AD-1 and AD-2 are esa-pss-04-106-issue1-january1988 and esa-pss-04-107-issue2-april1992; RD-1 PUS-A is ecss-e-70-41a-30jan2003-pus (the library holds a 30 Jan 2003 printing, while this document cites 6 November 2002). The source URL labels the file 'AD05' in SPIRE's IIDA applicable documents.

