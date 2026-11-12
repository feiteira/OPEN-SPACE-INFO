---
title: "HPMCS science ground segment real-time TM ICD (RTSI)"
description: "The interface control document for the Real-Time Science Interface (RTSI) of the Herschel/Planck mission control system (HPMCS)."
tags: ["Interface Control Document", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [hpmcs-science-ground-segment-real-time-telemetry-icd]
---

# HPMCS Science Ground Segment Real-Time Telemetry ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>PT-CMOC-MDS-ICD-3101-OPS-GDS (Planck SGS ref: PGS-ICD-016; Herschel SGS ref: HGS-ICD-004; TERMA ref: TERMA/SPD/63/HPMCS/TS/ICD/RTSI)</dd><dt>Issue / version</dt><dd>Issue 1, Revision 5</dd><dt>Date</dt><dd>2008-06-24</dd><dt>Organisation</dt><dd>ESA/ESOC Herschel/Planck MOC, prepared by the HPMCS Development Team (Terma, Siemens)</dd><dt>Authors</dt><dd>HPMCS Development Team</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Status: Final (cover, PDF p. 1). The change forecast says no further updates were planned after the HPMCS delivery 2 AD phase and PDR (§1.5, PDF p. 9). The approval sheet still names issue 1 revision 4 of 2007-11-30, with digital signatures dated December 2008 (PDF p. 3).</dd><dt>Pages</dt><dd>25</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/HPMCS+Science+Ground+Segment+Real-Time+Telemetry+ICD" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/HPMCS+Science+Ground+Segment+Real-Time+Telemetry+ICD</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:58Z</dd><dt>SHA-256</dt><dd><code>28b3044a96092a413f865624377a246586cffcdafbca8209519806964f778ddf</code></dd><dt>Size</dt><dd>169.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/hpmcs-science-ground-segment-real-time-telemetry-icd.pdf">hpmcs-science-ground-segment-real-time-telemetry-icd.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The interface control document for the **Real-Time Science Interface (RTSI)** of the Herschel/Planck mission control system (HPMCS). The RTSI delivers real-time telemetry source packets from the HP MOC to the instrument teams' workstations at ESOC: IW@MOC for the Planck instruments and ICC@MOC for the Herschel instruments. The RTSI runs as a single node on the HP Security Data Server (HPSDS), outside the ESOC operational network (OPSLAN) firewall. It receives packets from the HP MCS TM Packetiser and serves up to 10 PI clients. It handles only real-time telemetry from virtual channels VC-0, VC-4 and VC-1: there is no playback, no archiving, no quality checks and no time correlation.

The RTSI is simply the [SCOS-2000](../scos2000/index.md) External Interface (EXIF) **TM Packet Data Provision** service over CORBA (TMP_PRO). Clients find it through the CORBA Naming Service, register filters with registerTMpackets() (lists of APIDs or SPIDs), and receive TMpacketNotifyData callbacks that carry the raw packet header and body. The document gives the CosNaming path of the service and version differences in the filter structure (APID-only before SCOS-2000 3.1; new type and subtype fields from 4.2). It also sizes the link: a worst case of 87 packets per second, or about 1.2 Mbit/s per unfiltered client. Gap detection is left to the clients, using the [Space Packet](../ccsds/space-packet.md) sequence counter.

An appendix describes the RTSI template client (C++, omniORB): its source files, algorithm, build options inside and outside the SCOS environment, environment variables, the mission-specific ports, and example output. It belongs with the other [Herschel/Planck interface documents](../scos2000/herschel-planck-interfaces.md).


## Key points

- The ICD covers real-time telemetry source packets passed from the HP MCS TM Packetiser to the HPSDS and on to the PI client workstations IW@MOC (Planck) and ICC@MOC (Herschel). Only real-time telemetry from VC-0, VC-4 and VC-1 is covered, and playback is not foreseen. *(PDF p. 9)*
- Assumptions: point-to-point transfer using CORBA, a single RTSI node on the HPSDS outside the MOC firewall, and no time or quality checks, time correlation, replay or archiving by the RTSI. *(PDF p. 11)*
- The TM Packetiser is the client of the RTSI link to the HPSDS, and the PI workstation applications are clients of the RTSI. In both cases the RTSI acts as the server. *(PDF p. 11)*
- The consolidated maximum rate, taken from the HP MCS SRS [A-7], is 87 packets per second. This means 87 CORBA requests per second for each client. *(PDF p. 12)*
- Transfer is CORBA over TCP/IP, and up to 10 PI client workstation connections are supported. The CORBA Naming Service runs on the RTSI workstation (HPSDS) on a configurable port. *(PDF p. 15)*
- The RTSI interface is the CORBA-level interface of the SCOS-2000 TM Packet Data Provision Service, defined in EGOS-MCS-S2K-ICD-0022 [A-3] and S2K-MCS-ICD-0020 [A-4]. *(PDF p. 16)*
- The RTSI does not check completeness. Clients detect gaps from the Source Sequence Counter, which increments by 1 per source packet for each on-board application (APID). *(PDF p. 17)*
- Each delivered packet is a TMpacketNotifyData structure with packet attributes, the raw packet header and body byte strings, and lists of VPD parameter names and values. Clients register filters with registerTMpackets() and receive packets as CORBA callbacks. *(PDF p. 19)*
- Mean source packet sizes and rates: VC0 22 bytes at under 28 per second, VC4 300 bytes at under 10 per second, VC1 800 bytes at under 49 per second. With up to 1000 bytes of overhead assumed, the worst case is 1800 x 87 x 8 = 1 252 800 bit/s (about 1.2 Mbit/s) per unfiltered client, and 12 Mbit/s for 10 clients. *(PDF p. 20)*
- The CosNaming name of the EXIF TM Packet Provision service is &lt;DOMAIN_ID&gt;/&lt;S2K_LOCAL_SRV_FAMILY&gt;/"TMP_PRO_002", where 002 is the SCOS EXIF IDL version. Clients should use the constant ITMP::ServiceName from ITMP_PRO.idl. *(PDF p. 21)*
- ITMP::TMpacketFilter filters on a list of SPIDs or, alternatively, APIDs. SCOS-2000 versions before 3.1 support only APID filtering. From S2K 4.2, the fields m_types, m_subTypes and m_variablePackets must also be set. The example filters LFI scientific packets on APID 0x604. *(PDF p. 22)*
- The template client registers for SPID 100001000 (used for user-defined constants). It needs a C++ compiler, omniORB 4.0x and the HPMCS EXIF IDL files, and it runs on port 32000 for Herschel and 22000 for Planck. *(PDF p. 23)*


## Cited by these wiki pages (2)

- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (41 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 9 |
    | 1.1 | Purpose | 9 |
    | 1.2 | Scope | 9 |
    | 1.3 | Summary | 9 |
    | 1.4 | Amendment History | 9 |
    | 1.5 | Change Forecast | 9 |
    | 1.6 | Applicable Documents | 9 |
    | 1.7 | Reference Documents | 10 |
    | 1.8 | Abbreviations | 10 |
    | 2 | Operational Assumptions and Constraints | 11 |
    | 2.1 | Assumptions | 11 |
    | 2.2 | Constraints | 11 |
    | 3 | Requirements | 13 |
    | 3.1 | Functional Requirements | 13 |
    | 3.2 | On-line Data Delivery Requirements | 13 |
    | 3.3 | Off-line Data Delivery Requirements | 13 |
    | 4 | Interface Characteristics | 14 |
    | 4.1 | Interface Location and Medium | 14 |
    | 4.2 | Hardware Characteristics and Limitations | 15 |
    | 4.3 | Data Source, Destination and Transfer Mechanism | 15 |
    | 4.4 | Node and Device Addressing | 15 |
    | 4.5 | Relationships with other Interfaces | 16 |
    | 5 | Access | 17 |
    | 5.1 | Interface Utility Software | 17 |
    | 5.2 | Failure Protection, Detection and Recovery Procedures | 17 |
    | 5.3 | File Naming Convention | 17 |
    | 5.4 | Storage and File Detection Requirements | 17 |
    | 5.5 | Security Requirements | 17 |
    | 5.6 | Data Integrity Checks | 17 |
    | 5.7 | Backup Requirements | 17 |
    | 5.8 | Error Handling | 18 |
    | 6 | Detailed Interface Specifications | 19 |
    | 6.1 | Transport Level | 19 |
    | 6.2 | Application Level | 19 |
    | 7 | Data Definition | 21 |
    | 7.1 | Connection and Filter Data Messages | 21 |
    | 7.2 | Telemetry Data Message | 22 |
    | 8 | Appendix: RTSI Template Client | 23 |
    | 8.1 | Source Code | 23 |
    | 8.2 | Compiling and Linking | 24 |
    | 8.3 | Running | 24 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| A-1 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | applicable |
| A-2 | [TERMA/SPD/63/HPMCS/TS/GLOS](../references/index.md#ref-terma-spd-63-hpmcs-ts-glos) | HPMCS Glossary, Definitions and Acronyms | Issue 2.0 31 October | applicable |
| A-3 | [EGOS-MCS-S2K-ICD-0022-TOS-GIC](../references/index.md#ref-egos-mcs-s2k-icd-0022-tos-gic) | SCOS-2000 TM Packet Data Provision Services Interface Control Document | Issue 1.6 2007-11-26 | applicable |
| A-4 | [S2K-MCS-ICD-0020-TOS-GIC](../references/index.md#ref-s2k-mcs-icd-0020-tos-gic) | CORBA based External I/F Services for SCOS-2000 Data Provision Interface Control Document | Issue 1.6 02 March 2004 | applicable |
| A-5 | [SCI-PT-ICD-07527](../references/index.md#ref-sci-pt-icd-07527) · [library](ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md) | HERSCHEL-PLANCK Packet Structure ICD | Issue 5.0 20 July 2004 | applicable |
| A-6 | [INT–MOC-SYS-ICD-0001-OGI](../references/index.md#ref-int-moc-sys-icd-0001-ogi) | HERSCHEL-PLANCK OGS-SGS ICD Chapter 4.1: Real-Time Telemetry Data (MOC-HPSDS) | May 26th 1998 | applicable |
| A-7 | [PT-CMOC-MCS-SRS-3201-OPS-GDS](../references/index.md#ref-pt-cmoc-mcs-srs-3201-ops-gds) | HERSCHEL-PLANCK MCS SRS | Issue 2.3 April 2005 | applicable |
| A-8 | [TERMA/SPD/63/HPMCS/DDF/SAD/SYS](../references/index.md#ref-terma-spd-63-hpmcs-ddf-sad-sys) | HPMCS SAD System Level Architecture | Issue 2.0 31 October 2005 | applicable |
| R-1 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |

!!! note "Notes"
    The cover title is garbled by the extraction (small-caps letters lost); the full title is taken from the running header. There are 25 numbered pages and the extraction reports 26 PDF pages. The change log names the editors Henrik Pedersen (Terma), Gerfried Krames (Siemens), Yi Tan (Terma) and G. Di Girolamo (ESA/ESOC) (PDF pp. 3-4). §6.2.4 says its size figures come from [R-1], but R-1 is marked 'Deleted' (PDF pp. 10, 20). The year of A-2 is missing as printed. The approval page still shows revision 4. Figure 1 (PDF p. 14) survives only as scattered labels. Related library items: the Packet Structure ICD it cites as A-5 is in the library at a later issue (ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d, issue 6.0).

