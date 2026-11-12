---
title: "Solar Orbiter Data Delivery ICD (DDID)"
description: "The Solar Orbiter Data Delivery Interface Control Document (DDID), SOL-ESC-IF-05011 issue 1 revision 2 (26 June 2019), prepared at ESOC by L."
tags: ["Data Delivery Interface Document", "Mission data delivery documents"]
sources: [solo-ddid-i1r2]
---

# Solar Orbiter Data Delivery Interface Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>SOL-ESC-IF-05011</dd><dt>Issue / version</dt><dd>Issue 1, Revision 2</dd><dt>Date</dt><dd>2019-06-26</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (OPS-GDS, Solar Orbiter Data Systems)</dd><dt>Authors</dt><dd>L. Michienzi, P. Margarido</dd><dt>Type</dt><dd>Data Delivery Interface Document</dd><dt>Status</dt><dd>Status 'Final', Issue 1 Revision 2, date of issue 26/06/2019 (PDF p. 1); digitally signed by P. Margarido on 2019-06-26 (PDF p. 2). Classified 'ESA UNCLASSIFIED – For Official Use'. Revision 2 is described as 'Tidy up and alignment with BepiColombo DDID' (PDF p. 3).</dd><dt>Pages</dt><dd>35</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/SOL-ESC-IF-05011%2CIs.1%2CRev.2.20190626%20%28SOL%20DDID%29_signed_PM.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/SOL-ESC-IF-05011%2CIs.1%2CRev.2.20190626%20%28SOL%20DDID%29_signed_PM.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:11:58Z</dd><dt>SHA-256</dt><dd><code>022566858f72f40ba0de2e9a5d8021dba1a2d09db89e3d935a502d13e6eee89a</code></dd><dt>Size</dt><dd>3.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/solo-ddid-i1r2.pdf">solo-ddid-i1r2.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Solar Orbiter Data Delivery Interface Control Document (DDID), SOL-ESC-IF-05011 issue 1 revision 2 (26 June 2019), prepared at ESOC by L. Michienzi and P. Margarido and approved by the Solar Orbiter operations, ground segment and science managers. It is the mission-specific complement to the generic EDDS External User ICD and describes how the Science Ground Segment (SGS) and Principal Investigators obtain Solar Orbiter data from the MOC's Data Dissemination System (DDS), which is based on the ESOC EGOS Data Dissemination System (EDDS).

The document covers the data exchange concept (HTTPS web interface, EDDS client, XML batch and stream requests, SFTP delivery, scheduled requests and file subscriptions), operational assumptions, quotas and access restrictions by APID, SPID, parameter, file and time range, server set-up (cold-redundant prime and backup), security, backup and availability (at least 95% over a month), and the mapping of each data type onto the MCS long-term archive (PARC for packets and reports, DARC for parameters, FARC for files).

Its most technical part, chapter 7, documents the SCOS-2000 packet (TDEV) format as delivered: the common header fields (filing and creation times, simulation flag, ground station IDs, packet type, structure version 5, time-stamp policy and time quality, stream IDs mapped to virtual channels, filing key = SPID, mission ID 650, MIB release and issue), the TM header (TPSD, RouteID data unit type and qualifier, APID, SSC, PUS type and subtype), the TC header (uplink, execution and last-update times, PTV flag) and the handling of missing frames. Chapter 8 lists the data products, including the MCS-internal packets on APID 1966 and the time-correlation packets, command history, auxiliary file types, and service-13 TM files with their metadata event packets. Chapter 10 specifies RAPID files, the nominal OGS-to-SGS packet transfer via GFTS, with their naming and record format.


## Key points

- The Solar Orbiter DDID is a mission-specific complement to the generic EDDS External User ICD [A-1]; the two are meant to be read together, and the DDID only gives Solar Orbiter specifics. *(PDF p. 7)*
- The primary distribution mechanism is the EDDS (HTTPS web interface, EDDS client, XML batch or stream requests, SFTP delivery); the nominal OGS-to-SGS distribution uses GFTS to forward RAPID binary files containing all packets processed and archived by the MCS. *(PDF p. 11)*
- DDS responses come from the MCS long-term archive: packets, events and TC data from PARC, auxiliary and TM files from FARC, and TM parameters from DARC; spacecraft TM is normally available within seconds of ground-station reception. *(PDF p. 16)*
- All DDS data are big-endian; times are 4 bytes of seconds since 1 January 1970 (not counting leap seconds) followed by 4 bytes of microseconds. *(PDF p. 18)*
- Each SCOS-2000 (TDEV) packet has a common header followed by a TM, TC or event specific header; for TM the packet data is the full un-stripped source packet starting with the CCSDS primary header version number. *(PDF p. 19)*
- The MCS stores an extra TC packet per command with SPID 200 holding the static MIB PTV/CEV details; external users should ignore it. TC packets use SPIDs 100 and 200. *(PDF p. 19)*
- Common header: packet type 1 TM, 2 TC, 3 Event; structure version 5 for Solar Orbiter; ground station IDs include 21 Kourou, 22 Perth, 23 New Norcia, 24 Cebreros, 25 Malargüe and 30 Maspalomas. *(PDF p. 20)*
- Time-stamp policy values are 0 creation time, 1 frame transmission time (ERT minus propagation delay) and 2 correlated SCET, with time quality 0 good, 1 inaccurate, 2 bad; stream IDs 1000-1003 map to online VC0-VC3 (real-time, playback, science, file transfer). *(PDF p. 21)*
- The filing key is the SCOS-2000 SPID that maps to the MIB packet definition; the mission ID is 650, and the DB Rel and DB Iss fields record the MIB VDF_RELEASE and VDF_ISSUE used when the packet was archived. *(PDF p. 21)*
- The TM header's RouteID low byte gives the data unit type (0 transfer frame, 1 source packet, 2 internal MCS packet) and a qualifier (for example 1 bad, 2 idle, 4 service 9 time packet). *(PDF p. 23)*
- The TC command details data are produced by overlaying a C++ class on memory of a 32-bit platform, so fields are 32-bit aligned with padding. *(PDF p. 25)*
- MCS-internal packets use APID 1966 (SPIDs 66810-66999) and should be filtered out, except the time-correlation packets: report SPID 66840 (TM 164,1), time couple 66841 (164,2) and coefficients 66842 (164,3). Spacecraft time packets have APID 0. *(PDF p. 26)*
- Service-13 TM files are stored in FARC as 'DLPP Files' named &lt;PS_ID&gt;_&lt;file_reconstruction_timestamp&gt;, with metadata in event packets of SPID 4000. *(PDF p. 31)*
- RAPID files are named PARC_&lt;Type&gt;_&lt;FirstPacketTime&gt;__&lt;LastPacketTime&gt;, close every 50 seconds, and contain length-prefixed records with an action type (0 insert, 1 update, 2 delete) and a sync marker 0x1ACFFC1D before each SCOS-2000 packet. *(PDF p. 35)*


## Cited by these wiki pages (25)

- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [ST[13] Large packet transfer](../ecss/pus/st13-large-packet-transfer.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md)
- [The standards landscape](../overview/standards-map.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)
- [Worked example: decoding a real Solar Orbiter telemetry packet](../overview/worked-example-tm.md)


??? abstract "Contents (48 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 7 |
    | 1.1 | Objective | 7 |
    | 1.2 | Scope | 7 |
    | 1.3 | Applicable and Reference Documents | 7 |
    | 1.4 | Acronyms | 9 |
    | 1.5 | Roles | 10 |
    | 2 | Data Exchange Summary | 11 |
    | 2.1 | DDS Requests from DDS User | 11 |
    | 2.2 | DDS Data Response to DDS User | 11 |
    | 3 | Operational Assumptions and Constraints | 12 |
    | 4 | DDS Interface Characteristics | 13 |
    | 5 | DDS Access | 14 |
    | 5.1 | Interface Utility Software | 14 |
    | 5.4 | File Naming Convention | 14 |
    | 5.6 | Security Requirements | 15 |
    | 5.8 | Backup Requirements | 15 |
    | 6 | Detailed DDS interface specifications | 16 |
    | 6.1 | Generation Method | 16 |
    | 6.2 | Data passed through the Interface | 16 |
    | 6.2.1 | Batch Service | 17 |
    | 6.2.2 | Stream Service | 17 |
    | 6.3 | Size and Frequency of Transfers | 17 |
    | 7 | Data Definition | 18 |
    | 7.1 | SCOS-2000 Packet Format Definition | 18 |
    | 7.1.1 | SCOS-2000 Common Packet Header Structure | 20 |
    | 7.1.2 | SCOS-2000 TM Packet Header Structure | 23 |
    | 7.1.3 | SCOS-2000 TC Packet Header Structure | 24 |
    | 7.1.4 | Command Details Data | 25 |
    | 7.2 | SCOS-2000 Event Header Packet Structure | 25 |
    | 7.3 | Missing Frames and Bad Packets | 25 |
    | 8 | Data Products | 26 |
    | 8.1 | Packetised Data | 26 |
    | 8.1.1 | Time Correlation Coefficient Packet | 27 |
    | 8.1.2 | Time Couple Packet | 27 |
    | 8.1.3 | Time Correlation Report Packet | 27 |
    | 8.2 | Parameters | 27 |
    | 8.3 | Reports | 28 |
    | 8.3.1 | Command History Report | 28 |
    | 8.4 | Archived Files | 29 |
    | 8.4.1 | Auxiliary File Types | 29 |
    | 8.4.2 | TM Files | 29 |
    | 8.5 | Statistics and Data Volume | 31 |
    | 9 | DDS User Information | 32 |
    | 10 | RAPID File Exchange | 33 |
    | 10.1 | Packet Data forwarded from OGS to SGS | 33 |
    | 10.2 | RAPID Size and Frequency of Transfers | 33 |
    | 10.4 | RAPID File Naming Convention | 34 |
    | 10.5 | RAPID File Format Definition | 34 |


## Documents this one references (23)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| A-1 | [EGOS-GEN-EDDS-ICD-1001](../references/index.md#ref-egos-gen-edds-icd-1001) · [library](euicd-unversioned.md), [library](euicd-i15r0.md), [library](euicd-v25.md), [library](euicd-v13.md) | (EDDS) External User ICD |  | applicable |
| A-2 | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | (EDDS) Software User Manual |  | applicable |
| A-3 | [BC-ESC-IF-22002](../references/index.md#ref-bc-esc-if-22002) | (Solar Orbiter/BepiColombo) Packetiser ICD |  | applicable |
| A-4 | [SOL-ESC-IF-05010](../references/index.md#ref-sol-esc-if-05010) | Solar Orbiter Planning ICD (PLID) |  | applicable |
| A-5 | [N/A](../references/index.md#ref-ddid-external-user-details) | DDID External User Details |  | applicable |
| A-6 | [BC-ESC-DD-22001](../references/index.md#ref-bc-esc-dd-22001) | BepiColombo MCS S/W Design Document (SDD) |  | applicable |
| A-7 | [GAIA-ESC-ICD-0015.03](../references/index.md#ref-gaia-esc-icd-0015-03) | Command Source Handler ICD |  | applicable |
| A-8 | [BC-ESC-TN-05004](../references/index.md#ref-bc-esc-tn-05004) | BepiColombo Time Correlation Approach and Accuracy |  | applicable |
| R-1 | [EGOS-GEN-EDDS-TN-1003](../references/index.md#ref-egos-gen-edds-tn-1003) | (EDDS) XFDU Formatting TN |  | reference |
| R-2 | [EGOS-MDW-EDDS-SRS-1001](../references/index.md#ref-egos-mdw-edds-srs-1001) | EDDS Software Requirements Specification |  | reference |
| R-3 | [EGOS-NIS-NCTR-ICD-0002](../references/index.md#ref-egos-nis-nctr-icd-0002) | NIS/NCTRS Vol2 ICD for MCS |  | reference |
| R-4 | [SOL-A-TAS-ICD-00001](../references/index.md#ref-sol-a-tas-icd-00001) | SSMM TMTC ICD |  | reference |
| R-5 | [SOL.S.ASTR.ICD.00030](../references/index.md#ref-sol-s-astr-icd-00030) | CSW TMTC ICD |  | reference |
| R-6 | [SOL-ESC-IF-05002](../references/index.md#ref-sol-esc-if-05002) | Space-Ground ICD |  | reference |
| R-7 | [SOL-ESC-IF-50001](../references/index.md#ref-sol-esc-if-50001) | SOL PLID Annex A - Flight Dynamics ICD (PLID Annex A FD Interfaces) |  | reference |
| R-8 | [SOL-ESC-IF-05012](../references/index.md#ref-sol-esc-if-05012) | SOL PLID Annex B - Mission Planning System Outputs ICD (PLID Annex B-MOC SOC ICD) |  | reference |
| R-9 | [EGOS-MDS-S2K-ADD-0024](../references/index.md#ref-egos-mds-s2k-add-0024) | SCOS-2000 Packet Management ADD |  | reference |
| R-10 | [EGOS-MCS-S2K-ICD-0001](../references/index.md#ref-egos-mcs-s2k-icd-0001) · [library](icd-7-0-final.md), [library](icd-6-7-drafta.md), [library](icd-6-9-archive-org.md) | SCOS-2000 MIB ICD |  | reference |
| R-11 | [EGOS-MCS-S2K-ADD-0002](../references/index.md#ref-egos-mcs-s2k-add-0002) | SCOS-2000 Commanding ADD |  | reference |
| R-12 | [BC-ESC-IF-23002](../references/index.md#ref-bc-esc-if-23002) | MPS Planning Database ICD |  | reference |
| R-13 | [BC-SGS-TN-063](../references/index.md#ref-bc-sgs-tn-063) | End User Needs for Spacecraft Telemetry Parameters |  | reference |
| R-14 | [BC-ESC-RS-22002](../references/index.md#ref-bc-esc-rs-22002) | BepiColombo and Solar-Orbiter MCS SRS |  | reference |
| R-15 | [EGOS-MCS-S2K-ICD-1005](../references/index.md#ref-egos-mcs-s2k-icd-1005) | RAPID ICD |  | reference |

!!! note "Notes"
    The PDF has 35 pages; the extracted text has an empty 36th page. Printed page numbers are one lower than PDF page indices (PDF p. 7 is printed 'Page 6/35'), and the table of contents uses printed numbers. The change record prints the first issue as 'Issue 11, Revision 00' in the first table but 'Issue 1, Rev 0' in the second (PDF p. 3). Several cross-references in the text are broken: empty '[]' where a document ID should be, and 'Error! Reference source not found.' (PDF pp. 16, 19); a reference to 'section 0' for time correlation remains (PDF p. 27). The RAPID size is still 'approximately TBC MB' (PDF p. 33) although the change record says TBCs were removed. The section 7.1.3 heading lacks its number in the text layer (PDF p. 24). The file is the signed version ('_signed_PM'); footnote 2 says EDDS 2.3 schema definitions are attached to the PDF, but attachments were not extracted. The distribution list (PDF p. 4) and server host names/IP addresses (PDF pp. 11-14) are operational details not reproduced here.

