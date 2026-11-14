---
title: "Solar Orbiter TM-TC and Packet Structure ICD"
description: "The Solar Orbiter TM-TC and Packet Structure Interface Control Document (SOL.S.ASTR.TN.00079, issue 7), written by Airbus Defence and Space for ESA and generated from its DOORS requirements database."
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [sol-s-astr-tn-00079-07]
---

# Solar Orbiter TM-TC and Packet Structure ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>SOL.S.ASTR.TN.00079</dd><dt>Issue / version</dt><dd>Issue 7</dd><dt>Organisation</dt><dd>Airbus Defence and Space Ltd (Stevenage), Solar Orbiter prime contractor, under ESA contract</dd><dt>Authors</dt><dd>OPS team</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 7 (PDF p. 1); a signed scan of the cover with handwritten, largely illegible names and dates. The cover states the current issue is the electronic copy in SPRINT and paper copies are for information only. Copyright Airbus Defence and Space Ltd 2014. Issue 7 is newer than the 'Issue 6' cited by SOL-SGS-TN-0007.</dd><dt>Pages</dt><dd>396</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/MOC/SOL.S.ASTR.TN.00079_07_00-1.PDF" rel="noopener">https://solarorbiter.irap.omp.eu/documents/MOC/SOL.S.ASTR.TN.00079_07_00-1.PDF</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:15:48Z</dd><dt>SHA-256</dt><dd><code>60f6d8975cd0f410bcd625bc71b06bc9435900193317a3fe8d56702fd1bf2e50</code></dd><dt>Size</dt><dd>4.8 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/sol-s-astr-tn-00079-07.pdf">sol-s-astr-tn-00079-07.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Solar Orbiter TM-TC and Packet Structure Interface Control Document (SOL.S.ASTR.TN.00079, issue 7), written by Airbus Defence and Space for ESA and generated from its DOORS requirements database. It is the baseline definition of the structure and syntax of all application-level TM/TC traffic between the on-board computer, the solid-state mass memory, the ten payload instruments and the star trackers, based on PUS-A (ECSS-E-70-41A).

Chapters 3 and 4 define the packet and frame layers as used on the spacecraft: the TC source packet (7-bit process ID plus category 12, at most 242 octets of data field, PUS version 1 header, CRC), TC segments (MAP ID 0 for CPDU high-priority commands and 1 for normal commands, packet aggregation without segmentation), the TC transfer frame (spacecraft ID 0x28A = 650, VC 1 and 2 for the two decoders, a maximum frame length of 256 octets, AD/BD/BC frame types); the TM source packet (up to 4112 octets, 10-octet data field header with CUC 4+2 time) and the TM transfer frame (1115 octets, VC usage and priority, CLCW in every frame, a 3-octet secondary header extending the VC frame count).

Chapter 5, the bulk of the document, lists every service and subservice tailored for Solar Orbiter (standard services 1 to 22 and private services such as 130 TM extraction, 133 file management, 134 TC sequencer, 139 parameter management and 142 functional monitoring), with packet layouts and parameter definitions, and which unit must implement each. Annexes define bit numbering, field alignment, the time and idle packets, the CRC algorithm with test vectors, the APID/category/process ID allocation, source and destination IDs, failure and event IDs and service 3 SIDs. It is the primary reference for decoding real Solar Orbiter packets against the MIB.


## Key points

- The ICD is the baseline definition of all application-level TM/TC data structures on board Solar Orbiter (OBC, SSMM, 10 payload instruments, star tracker), based on ECSS-E-70-41A; non-standard use of standardised PUS services is forbidden and user-specific packets must be private services. *(PDF p. 11)*
- TC APID = 7-bit Process ID plus 4-bit Packet Category fixed to decimal 12; sequence flags are always 11 (stand-alone); the sequence count is kept per APID and Source ID and is not checked on board. *(PDF p. 15)*
- The maximum TC packet data field is 242 octets: 4 octets data field header, 236 octets application data and 2 octets packet error control. *(PDF p. 16)*
- In the TC data field header the PUS version is 1; only the acceptance (bit 3) and completion (bit 0) acknowledgement flags are used, with start and progress set to zero. *(PDF p. 17)*
- TC segments are never segmented (sequence flags 11); MAP ID 0 is for CPDU commands TC(2,3) and MAP ID 1 for normal commands, and several packets may be aggregated in one segment. *(PDF p. 18)*
- The CCSDS spacecraft ID is 0x28A (650) for TM and TC; TC virtual channels 1 and 2 address the two on-board decoders, and the maximum TC frame length is 256 octets. *(PDF p. 21)*
- The maximum TM source packet is 4112 octets; packets longer than the 1099-octet frame data field are spread over frames. APID 0 is reserved for the time packet and all ones for idle packets. *(PDF p. 23)*
- The TM source sequence count is maintained per APID and Destination ID, and the TM data field is at most 4106 octets (10 octets header plus 4096 source data); packet time uses CUC with 4 coarse and 2 fine octets. *(PDF p. 25)*
- The only allowed TM frame length is 1115 octets; every frame carries a CLCW in the OCF and a secondary header with a 3-octet extension of the VC frame count (secondary header ID 0b00000011). *(PDF p. 27)*
- Downlink priority is VC4 real-time high priority, VC5 critical event log, VC0 real time, VC1 OBC mass memory playback, VC2 and VC3 SSMM playback, and VC7 idle frames; only VC2 and VC3 may contain compressed packets. *(PDF p. 28)*
- The standard spacecraft time packet has APID 0, no data field header, 8 octets of data (C=7) with P-field 0b00101110 (4+2 CUC), and its time refers to the leading edge of the ASM of VC0 frame count 0. *(PDF p. 265)*
- The packet error control CRC uses G(x) = x^16 + x^12 + x^5 + 1 with the register initialised to all ones; test vectors include 00 00 -&gt; 1D0F and AB CD EF 01 -&gt; 04A2. *(PDF p. 268)*
- Packet categories: 0 time, 1 TC verification, 2 high-priority TM, 3 tables, 4 routine HK, 5 functional cyclic, 6 functional non-cyclic, 7 events, 8 diagnostic, 9 dump, 10 file transfer, 11 context, 12 science or TC, 15 idle. *(PDF p. 272)*
- Process IDs: 10 to 16 OBC CSW applications (DMS, AOCS, payload, platform, system control, OBCP, thermal), 30 to 32 SSMM, 40/41 star trackers, 49 payload broadcast, 50 to 104 instruments (for example SWA 95 to 99), 112 to 127 EGSE. *(PDF p. 273)*
- Ground source IDs are 110 mission timeline, 111 TC sequences, 112 recovery actions, 113 backup mission timeline and 120 direct commands; on-board sources are 15 OBCP, 14 system control and 11 AOCS. *(PDF p. 275)*


## Cited by these wiki pages (71)

- [AOS Space Data Link Protocol (CCSDS 732.0-B-4)](../ccsds/aos.md)
- [CCSDS File Delivery Protocol (CCSDS 727.0-B-5)](../ccsds/cfdp.md)
- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [Command sequences and parameter sets](../mib/sequences.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Commanding in the MIB: commands and their parameters](../mib/commanding.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [Encapsulation Packet Protocol (CCSDS 133.1-B-3)](../ccsds/encapsulation.md)
- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [How it all fits together](../overview/index.md)
- [Missions](../missions/index.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Monitoring in the MIB: parameters and packets](../mib/monitoring.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [PUS message type catalogue](../ecss/pus/message-types.md)
- [PUS packet structures: TC and TM headers](../ecss/pus/packets.md)
- [PUS parameter types (PTC/PFC)](../ecss/pus/parameter-types.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [SLE forward service: FCLTU](../ccsds/sle/fcltu.md)
- [SLE return services: RAF, RCF and ROCF](../ccsds/sle/return-services.md)
- [ST[01] Request verification](../ecss/pus/st01-request-verification.md)
- [ST[02] Device access](../ecss/pus/st02-device-access.md)
- [ST[03] Housekeeping](../ecss/pus/st03-housekeeping.md)
- [ST[04] Parameter statistics reporting](../ecss/pus/st04-parameter-statistics.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [ST[08] Function management](../ecss/pus/st08-function-management.md)
- [ST[09] Time management](../ecss/pus/st09-time-management.md)
- [ST[11] Time-based scheduling](../ecss/pus/st11-time-based-scheduling.md)
- [ST[12] On-board monitoring](../ecss/pus/st12-onboard-monitoring.md)
- [ST[13] Large packet transfer](../ecss/pus/st13-large-packet-transfer.md)
- [ST[14] Real-time forwarding control](../ecss/pus/st14-real-time-forwarding-control.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [ST[17] Test](../ecss/pus/st17-test.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [ST[19] Event-action](../ecss/pus/st19-event-action.md)
- [ST[20] On-board parameter management](../ecss/pus/st20-onboard-parameter-management.md)
- [ST[21] Request sequencing](../ecss/pus/st21-request-sequencing.md)
- [ST[22] Position-based scheduling](../ecss/pus/st22-position-based-scheduling.md)
- [ST[23] File management](../ecss/pus/st23-file-management.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Solar Orbiter STIX instrument database](../missions/solar-orbiter/stix.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Solar Orbiter instrument interfaces: SWA DPU ICD and EID-A](../missions/solar-orbiter/instrument-interfaces.md)
- [Solar Orbiter simulator](../simulator/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [Space Packet Protocol (CCSDS 133.0-B-2)](../ccsds/space-packet.md)
- [Space link identifiers: SCIDs, VCIDs, APIDs and SANA](../ccsds/space-link-identifiers.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TC synchronization and channel coding: the CLTU (CCSDS 231.0-B-4)](../ccsds/tc-coding-cltu.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The MIB: Mission Information Base](../mib/index.md)
- [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md)
- [The standards landscape](../overview/standards-map.md)
- [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Unified Space Data Link Protocol (CCSDS 732.1-B-3)](../ccsds/uslp.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)
- [Worked example: decoding a real Solar Orbiter telemetry packet](../overview/worked-example-tm.md)


??? abstract "Contents (58 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 11 |
    | 1.1 | Scope and Purpose | 11 |
    | 2 | Documents | 13 |
    | 3 | Telecommand Structure | 14 |
    | 3.2 | Telecommand Source Packet | 14 |
    | 3.3 | Telecommand Segments | 18 |
    | 3.4 | Telecommand Frame | 20 |
    | 4 | Telemetry Structure | 23 |
    | 4.2 | Telemetry Source Packet | 23 |
    | 4.3 | Telemetry Frame | 27 |
    | 5 | Solar Orbiter TM / TC Services | 31 |
    | 5.1 | Summary | 31 |
    | 5.2 | Service 1: Telecommand Verification | 40 |
    | 5.3 | Service 2: Device Command Distribution | 44 |
    | 5.4 | Service 3: Housekeeping and Diagnostic Data Reporting | 48 |
    | 5.6 | Service 5: Event Reporting | 66 |
    | 5.7 | Service 6: Memory Management | 77 |
    | 5.9 | Service 8: Function Management | 89 |
    | 5.10 | Service 9: Time Management | 95 |
    | 5.12 | Service 11: Onboard Operations Scheduling | 100 |
    | 5.13 | Service 12: Onboard Parameter Monitoring | 117 |
    | 5.14 | Service 13: Large Data Transfer | 132 |
    | 5.15 | Service 14: Packet Forwarding Control | 151 |
    | 5.16 | Service 15: Onboard Storage and Retrieval | 163 |
    | 5.17 | Service 16: Onboard Traffic Management | 196 |
    | 5.18 | Service 17: Connection Test | 200 |
    | 5.19 | Service 18: Onboard Control Procedures | 202 |
    | 5.20 | Service 19: Event-Action | 210 |
    | 5.21 | Service 20: Information Distribution | 216 |
    | 5.22 | Service 21: Science Data Transfer | 220 |
    | 5.23 | Service 22: Context Saving | 224 |
    | 5.24 | Service 130: TM Extraction | 229 |
    | 5.25 | Service 131: Private Function Management | 232 |
    | 5.26 | Service 132: SGM Management | 233 |
    | 5.27 | Service 133: File Management | 236 |
    | 5.28 | Service 134: TC Sequencer | 242 |
    | 5.29 | Service 139: Parameter Management service | 245 |
    | 5.30 | Service 140: SSMM SW Mode Transition | 249 |
    | 5.31 | Service 141: Direct Commanding | 249 |
    | 5.32 | Service 142: Functional Monitoring | 249 |
    | 5.33 | Service 143: Memory Array Management | 261 |
    | 5.34 | Service 144: Reboot | 261 |
    | 5.35 | Service 145: BIT Report Management | 261 |
    | 6 | Annex 1 Bit Numbering Convention | 262 |
    | 7 | Annex 2 Field Alignment Convention | 263 |
    | 8 | Annex 3 Packet Numbering Convention | 264 |
    | 9 | Annex 4 Standard Spacecraft Time Source Packet | 265 |
    | 10 | Annex 5 Idle Packet Structure | 267 |
    | 11 | Annex 6 CRC Checksum Algorithms | 268 |
    | 12 | Annex 7 Acronyms and Glossary of Terms | 270 |
    | 13 | Annex 8 Application Process ID Assignment | 272 |
    | 13.2 | Source ID | 275 |
    | 13.3 | Destination ID | 276 |
    | 14 | Annex 9 Failure and Event ID Assignment | 278 |
    | 15 | Annex 10 Service 3 SID Assignment | 281 |
    | 16 | Annex 11 Common Structure of Parameter ID | 282 |
    |  | Change record and distribution list | 283 |
    |  | Change Log (autogenerated from DOORS) | 295 |


## Documents this one references (16)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD1 | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Telemetry and telecommand packet utilization | 30 January 2003 | applicable |
| AD2 | [SO-ESC-RS-05002](../references/index.md#ref-so-esc-rs-05002) | Solar Orbiter Generic Frame and Packet Structure | March 2010 | applicable |
| AD3 | [SOL.S.ASTR.RS.00037](../references/index.md#ref-sol-s-astr-rs-00037) | MIL-STD-1553B Bus Protocol Specification |  | applicable |
| AD4 | [SOL.S.ASTR.RS.00038](../references/index.md#ref-sol-s-astr-rs-00038) | SpaceWire Protocol Specification |  | applicable |
| RD1 | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | TM Transfer Frame Protocol | July 2008 | reference |
| RD2 | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | TC Synchronisation and Channel coding | July 2008 | reference |
| RD3 | [SO-ESC-RS-05001](../references/index.md#ref-so-esc-rs-05001) | Solar Orbiter OIRD |  | reference |
| RD4 | [SOL.S.ASTR.TN.00011](../references/index.md#ref-sol-s-astr-tn-00011) | Mission Operations Concept Document |  | reference |
| RD5 | [SOL.S.ASTR.ICD.00017](../references/index.md#ref-sol-s-astr-icd-00017) | System-SW ICD |  | reference |
| RD6 | [BC-TAM-IF-00003](../references/index.md#ref-bc-tam-if-00003) | BepiColombo SSMM - SW TM/TC ICD | May 2011 | reference |
| RD7 | [P-SOLO-ICD-10131-RSE](../references/index.md#ref-p-solo-icd-10131-rse) | Solar Orbiter OBC Hardware Software Interface |  | reference |
| RD8 | [SOL.S.ASTR.ICD.00030](../references/index.md#ref-sol-s-astr-icd-00030) | Solar Orbiter CSW TM/TC Interface Control Document |  | reference |
| RD9 | [SOL.A.TAS.ICD.00001](../references/index.md#ref-sol-a-tas-icd-00001) | Solar Orbiter SSMM SW TMTCICD |  | reference |
| RD10 | [SOL.ASTR.TN.00169](../references/index.md#ref-sol-astr-tn-00169) | OBC Resource Allocations |  | reference |
|  | [SOL.S.ASTR.TN.00088](../references/index.md#ref-sol-s-astr-tn-00088) | Solar Orbiter Instrument Data Management Overview for PIs (CATs for packets routed to the OBC) |  | mentioned |
|  | [CCITT V.41](../references/index.md#ref-ccitt-v-41) | CCITT Recommendation V.41 generating polynomial |  | mentioned |

!!! note "Notes"
    The cover (PDF p. 1) is a scanned signature page; its OCR text is garbled ('lCD' for 'ICD', handwritten names and dates unreadable), so the issue date is not legible and is recorded as null. Legible fragments name the checkers K. Smith (SW Architect) and S. Brady (DB Architect) and the PA manager T. Hunt; the PDF metadata creation date is 28 November 2014 and the copyright year 2014. PDF page indices equal printed page numbers (Page N of 396); the extracted text has an empty 397th page. Numbers at the right margin of the text (e.g. 'PUS-31//', '13902') are DOORS object identifiers, not page numbers. Many packet layout figures are images and have no text. PDF pp. 283-294 hold the issue change record and distribution list; PDF pp. 295-395 are an auto-generated DOORS change log, which states that the main body takes precedence. The file was retrieved from the IRAP Solar Orbiter document server; it is marked as supplied in confidence by Airbus, so only facts are paraphrased here. Issue 6 of this ICD is the [RD 01] of sol-sgs-tn-0007-s20-2-0.

