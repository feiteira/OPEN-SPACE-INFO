---
title: "Rosetta/Mars Express FDS-MCS Interface Control Document"
description: "The interface control document between the Rosetta and Mars Express mission control systems (RMCS/MEMCS, both SCOS-2000(../scos2000/index.md) based and developed by Anite) and the ESOC Flight Dynamics"
tags: ["Interface Control Document", "Ground stations, NCTRS/NIS and SLE"]
sources: [mex-esc-id-5003-fds-icd]
---

# Rosetta and Mars Express Mission Control System - R(ME)MCS; Flight Dynamics System - Mission Control System Interface Control Document (FDS ICD)

<dl class="osi-meta"><dt>Document ID</dt><dd>RO-ESC-ID-5003</dd><dt>Issue / version</dt><dd>Issue B1</dd><dt>Date</dt><dd>2003-03-07</dd><dt>Organisation</dt><dd>ESA/ESOC; prepared by Anite Systems GmbH</dd><dt>Authors</dt><dd>A. Ercolani, F. Delhaise, P. Ferri, M. Denis, M. Warhaut, M. McKay, J. Fertig, R. Corkill</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>The title page gives Issue B1, 2003-03-07. The Document Change Record (PDF p. 5) ends at Draft B0 (07/02/03, DCRs 173 to 207) and has no B1 entry. Section 1.4 still says 'This document is a draft issue of the ICD and updates are expected after initial review'. Change bars with DCR numbers (090, 173, 175, 198, 207, ...) are printed in the margins.</dd><dt>Pages</dt><dd>31</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/psa/ftp/MARS-EXPRESS/MRS/MEX-X-MRS-1-2-3-EXT2-2705-V1.0/DOCUMENT/ESA_DOC/MEX_ESC_ID_5003_FDSICD.PDF" rel="noopener">https://archives.esac.esa.int/psa/ftp/MARS-EXPRESS/MRS/MEX-X-MRS-1-2-3-EXT2-2705-V1.0/DOCUMENT/ESA_DOC/MEX_ESC_ID_5003_FDSICD.PDF</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:19Z</dd><dt>SHA-256</dt><dd><code>5ceeeebcd048801c3d702b051941b05bed7fbd18f0c033d0a5ca3dc8308fbe0c</code></dd><dt>Size</dt><dd>241.3 KB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/mex-esc-id-5003-fds-icd.pdf">mex-esc-id-5003-fds-icd.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The interface control document between the Rosetta and Mars Express mission control systems (RMCS/MEMCS, both [SCOS-2000](../scos2000/index.md) based and developed by Anite) and the ESOC Flight Dynamics System (FDS) on the ORATOS platforms. It lists every data flow in both directions, explains how each one travels, and records the MIB tailoring these missions used.

From the MCS to the FDS go [MIB](../mib/index.md) files, packetised data and tracking data files. The packetised data are TM source packets, TC history and time coefficient packets, which flight dynamics extracts from the MCS data archive with its own SCOS-2000/ORATOS Data Access (SoDA) software. The tracking data are ESA IFMS ranging, Doppler, meteo and AGC files fetched through the NIS (see [NCTRS/NIS](../scos2000/nctrs-nis.md)) and stored in the FARC, plus NASA/DSN ODF and media calibration files obtained via the RACSO gateway. From the FDS to the MCS go auxiliary data files for experimenters (orbit, attitude, events, comet models, FORTRAN access software), command request files (FDR for the scheduler, DOR for the manual stack), trajectory data (STDMs for ESA stations, CCSDS Orbit Data Message EPMs for the DSN), the interplanetary WIMPY and the One-Way Light Time file used by MCS [time correlation](../scos2000/time-correlation.md).

All file exchanges except Rosetta MPTS files use the MCS File Transfer System (FTS) with the naming convention `TTTT_SSSDDD_t<14 chars>_vvvvv.ROS|MEX`. The document lists high-priority operational files, the manual SFTP procedure across the RACSO/OSCAR security boundary, node addresses, and complete per-mission file-type tables. Section 7.7 is valuable for [MIB tailoring](../mib/tailoring.md): `ccf.dat` gains a 40-character description and a `CCF_SUBSCH` on-board sub-schedule field, and `pcf.dat` gains a 24-character description and the fields `PCF_WDLEN`, `PCF_GRPID`, `PCF_OFFSET` and `PCF_GLOBAL` used to build [PUS service 3](../ecss/pus/st03-housekeeping.md) telecommands. The section also lists the utility hash files that map source-database names to SPIDs and calibration numbers.


## Key points

- Change record: Draft A0 (15/05/99), Draft A1 (31/03/00), Issue A0 (28/03/01) and Draft B0 (07/02/03, DCRs 173 to 207); the title page says Issue B1, 2003-03-07. *(PDF p. 5)*
- The MCS converts packet definitions extracted from the Source Database into MIB files; packetised data (TM source packets, TC history packets (TBC), time coefficient history packets) are extracted from the DAS by FDS using SoDA. *(PDF p. 9)*
- ESA tracking data files are stored on the IFMS at the ESA stations; the MCS obtains them via the Network Interface Subsystem (NIS) and stores them in the MCS FARC. NASA/DSN tracking files come from the FD computer RACSO. *(PDF p. 10)*
- FD command request files are Flight Dynamics Requests (FDR), used by the MCS scheduler subsystem, and Direct Operations Requests (DOR), used by the TC subsystem manual stack; their format is in the CRID. *(PDF p. 11)*
- STDMs for ESA tracking go from FDS to the MCS, are archived in the DAS and pass via the NIS to the station computer; EPMs (CCSDS 502) for NASA/DSN go via RACSO to JPL. *(PDF p. 12)*
- FDS supplies a propagation-delay routine that uses One-Way Light Time (OWLT) files per ground station; the FD ground station ID does not correspond to the NCTRS ground station ID. *(PDF p. 13)*
- All MCS-FDS file transfer except Rosetta MPTS files uses the File Transfer System (FTS); the only delivery acknowledgement is the FTS log, and FTS version numbers wrap from 99999 to 00000. *(PDF p. 16)*
- The FTS is point-to-point: a file needed at two destinations (e.g. NIA and NIB) must be injected twice with different destination codes in its name. *(PDF p. 17)*
- RMCS, MEMCS and FDS all run on SUN/Solaris with 100 Mbps network connections; node names include ROMCA/ROMCB, RONCTRA/RONCTRB, MEMCA/MEMCB, MENCTRA/MENCTRB and RACSO (gateway to OSCAR at JPL). *(PDF p. 19)*
- FTS file naming: TTTT_SSSDDD_txxxxxxxxxxxxxx_vvvvv.yyy (type, source, destination, 'D', 14-character free text, version, ROS or MEX), all upper case; external files are encapsulated with 'tar c'. *(PDF p. 21)*
- The SODA server extracts source packets and SCOS header information through the SCOS-2000 FDIF interface; ORATOS client processes pass packets to the Generic Telemetry Processor (GTP). *(PDF p. 28)*
- MIB tailoring: ccf.dat CCF_DESCR is enlarged from 24 to 40 characters and a new CCF_SUBSCH field (Number(3)) identifies the on-board sub-schedule. *(PDF p. 29)*
- MIB tailoring: pcf.dat PCF_DESCR is enlarged from 16 to 24 characters and PCF_WDLEN ('O' 8-bit or 'W' 16-bit), PCF_GRPID, PCF_OFFSET and PCF_GLOBAL ('G' global or 'D' detailed) are added to build service 3 telecommands; only global parameters are named in service 3 TCs. *(PDF p. 30)*
- The MIB tar file includes utility files spid_hash.txt (RSDB packet name to SPID), calib_hash.txt (RSDB calibration name to calibration number), synparhash.txt (auto-generated synthetic parameter expressions) and list_of_packet_types_not_in_vpd.txt. *(PDF p. 30)*


## Cited by these wiki pages (8)

- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)


??? abstract "Contents (57 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 9 |
    | 1.1 | Purpose | 9 |
    | 1.2 | Scope | 9 |
    | 1.3 | Summary | 9 |
    | 1.3.1 | Data from MCS to FDS | 9 |
    | 1.3.2 | Data from FDS to MCS | 11 |
    | 1.3.3 | Installed Software | 13 |
    | 1.4 | Change Forecast | 13 |
    | 1.5 | Applicable Documents | 13 |
    | 1.6 | Reference Documents | 14 |
    | 1.7 | Abbreviation | 15 |
    | 2 | Operational Assumptions and Constraints | 16 |
    | 2.1 | Assumptions | 16 |
    | 2.2 | Constraints | 16 |
    | 2.2.1 | High Priority Operational Files | 16 |
    | 2.2.2 | File Transfer Between OSCARX (OSCARY) and RACSO | 17 |
    | 2.2.3 | File Transfer Between RACSO and OSCARX (OSCARY) | 17 |
    | 2.2.4 | File Delivery to Multiple Destinations | 17 |
    | 3 | Requirements - deleted | 18 |
    | 4 | Interface Characteristics | 19 |
    | 4.1 | Interface Location and Medium | 19 |
    | 4.2 | Hardware Characteristics and Limitations | 19 |
    | 4.3 | Data Source, Destination and Transfer Mechanism | 19 |
    | 4.4 | Node and Device Addressing | 19 |
    | 4.5 | Relationships with other Interfaces | 20 |
    | 5 | Access | 21 |
    | 5.1 | Interface Utility Software | 21 |
    | 5.2 | Failure Protection, Detection and Recovery Procedures | 21 |
    | 5.3 | File Naming Convention | 21 |
    | 5.4 | Storage and File Detection Requirements | 22 |
    | 5.5 | Security Requirements | 22 |
    | 5.6 | Data Integrity Checks | 22 |
    | 5.7 | Backup Requirements | 22 |
    | 5.8 | Error Handling | 23 |
    | 6 | Detailed Interface Specifications | 24 |
    | 6.3 | Data Passed Across the Interface and their Direction | 24 |
    | 6.3.1 | Rosetta Packetised Data | 24 |
    | 6.3.2 | Rosetta Files | 24 |
    | 6.3.2.1 | Rosetta MPTS Files | 26 |
    | 6.3.3 | Mars Express Packetised Data | 26 |
    | 6.3.4 | Mars Express Files | 26 |
    | 6.4 | Size and Frequency of Transfers | 27 |
    | 6.5 | Timing and Synchronisation Requirements | 27 |
    | 7 | Data Definition | 28 |
    | 7.1 | Flight Dynamics Request Files (FDRs) | 28 |
    | 7.2 | Direct Operation Request Files (DORs) | 28 |
    | 7.3 | Tracking Data Files | 28 |
    | 7.4 | Spacecraft Trajectory Data Files | 28 |
    | 7.5 | Packetised Data | 28 |
    | 7.6 | Auxiliary Data Files | 28 |
    | 7.7 | Mission Information Base (MIB) | 29 |
    | 7.7.1 | ccf.dat | 29 |
    | 7.7.2 | pcf.dat | 29 |
    | 7.7.3 | Utility Files | 30 |
    | 7.8 | One-Way Light Time File (OWLT) | 30 |
    | 7.9 | Payload Auxiliary Data | 30 |
    | 7.10 | Interplanetary WIMPY | 31 |


## Documents this one references (25)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| A-1 [ROS-GLOSS] | [RO-ESC-LI-5001](../references/index.md#ref-ro-esc-li-5001) | Rosetta Project Glossary | Issue A0 15/05/99 | applicable |
| A-2 [CRID] | [RO-ESC-IF-5004 / MEX-ESC-IF-5004](../references/index.md#ref-ro-esc-if-5004-mex-esc-if-5004) | RMCS/MEMCS Command Request Interface Document | Issue B3 12/03/02 | applicable |
| A-3 [DDID] | [RO-ESC-IF-5003 / MEX-ESC-IF-5003](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003) · [library](mex-esc-if-5003-b5.md) | RMCS/MEMCS Data Delivery Interface Document | Issue B3 12/03/02 | applicable |
| A-4 [DDID-H] | [RO-ESC-IF-5003 / MEX-ESC-IF-5003](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003) · [library](mex-esc-if-5003-b5.md) | RMCS/MEMCS Data Delivery Interface Document - Appendix H FD Products | Issue 1.3 01/03/02 | applicable |
| A-5 [DDID-K] | [RO-ESC-IF-5003 / MEX-ESC-IF-5003](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003) · [library](mex-esc-if-5003-b5.md) | RMCS/MEMCS Data Delivery Interface Document - Appendix K MCS Products | Issue B3 12/03/02 | applicable |
| A-6 [JPL-FDS] | [RO-ESC-IF-5011](../references/index.md#ref-ro-esc-if-5011) | ROSETTA/MARS EXPRESS JPL/FDS Navigation Interface | Issue 3.1 23/08/02 | applicable |
| A-7 [MPS-POS] | [catalogue](../references/index.md#ref-mars-express-mps-pos-icd) | Mars Express MPS - POS ICD | Issue TBD TBD | applicable |
| A-8 [MOD-FDS-ICD] | [RO-ESC-ID-5008](../references/index.md#ref-ro-esc-id-5008) | Rosetta, MOD-FDS ICD | Issue 1.4 Nov/02 | applicable |
| A-9 [WIMPY] | [RO-ESC-TN-5521](../references/index.md#ref-ro-esc-tn-5521) | Description of WIMPY for interplanetary spacecraft. | Issue 1.2 16/08/02 | applicable |
| A-10 [TM/TC-ICD] | [RO-MMT-TN-2091/MEX-MMT-TN-0893](../references/index.md#ref-ro-mmt-tn-2091-mex-mmt-tn-0893) | TM/TC ICD Status Synthesis | Issue 1.3 30/08/01 | applicable |
| A-11 [IFMS-OCC] | [/MakulaMedia/MR/IFMS/ICD/FTP-OCC](../references/index.md#ref-makulamedia-mr-ifms-icd-ftp-occ) | IFMS-OCC Interface ICD | Issue 9.2.1 20/10/02 | applicable |
| A-12 [DSN-ODF] | [DSN 820-013: TRK-2-18](../references/index.md#ref-dsn-820-013-trk-2-18) | Tracking System Interface: Orbit Data File Interface | Change 3 15/06/00 | applicable |
| A-13 [DSN-MCI] | [DSN 820-013, TRK-2-23](../references/index.md#ref-dsn-820-013-trk-2-23) | Media Calibration Interface | 31/05/00 | applicable |
| A-14 [NCTRS-MCS] | [NCTRS-ICD-3, N2K-MCS-ICD-0003-TOS-GCI](../references/index.md#ref-nctrs-icd-3-n2k-mcs-icd-0003-tos-gci) | Interface Control Document - NCTRS - Volume 3 - Detailed interface definition: FDS | Issue 1.3 27/06/01 | applicable |
| A-15 [CCSDS-502] | [CCSDS 502.0-R-1](../references/index.md#ref-ccsds-502-0-r-1) | Orbit Data Messages (Red Book) | Issue 2 Jun/02 | applicable |
| A-16 [TIC-TN] | [RO-ESC-TN-5518](../references/index.md#ref-ro-esc-tn-5518) | ROSETTA - Description of the software for the support of the time correlation between the internal clock of ROSETTA and UTC | Issue 2.4 05/11/01 | applicable |
| A-17 [FTS-CONF] | [RO-ESC-IF-5014/ME-ESC-IF-5014](../references/index.md#ref-ro-esc-if-5014-me-esc-if-5014) | Rosetta/MEX Mission Control Systems Configuration Control Document; FTS Configuration | Issue A2 2003-03-07 | applicable |
| R-1 [MCS-SRD] | [RO-ESC-RS-5320](../references/index.md#ref-ro-esc-rs-5320) | R(ME)MCS Software Requirements Document | Issue A0 15/05/99 | reference |
| R-2 [FDS-SRD] | [RO-ESC-RS-5510](../references/index.md#ref-ro-esc-rs-5510) | FDS Support Requirements Compilation | Issue 1.0 08/01/01 | reference |
| R-3 [MIN-1] | [catalogue](../references/index.md#ref-minutes-to-fds-mcs-interface-meeting-on-04-02-00) | Minutes to FDS-MCS interface meeting on 04/02/00 | 14/02/00 | reference |
| R-4 [S2K-PKT-ICD] | [S2K-MCS-ICD-0004-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0004-tos-gci) | SCOS-2000 TM Packet ICD | Issue 1.1 02/03/01 | reference |
| R-5 [SODA-ICD] | [DTOS-FDOS-FDIS-ICD-1422-TOS-GFS](../references/index.md#ref-dtos-fdos-fdis-icd-1422-tos-gfs) | Flight Dynamics Infrastructure Software, ORATOS SODA ICD | Issue 1.1 Oct/01 | reference |
| R-6 [S2K-MIB-ICD] | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database Import ICD | Issue 4.3 16/10/01 | reference |
| [S2K-TM-ICD] | [catalogue](../references/index.md#ref-s2k-tm-icd-cited-for-the-scos-2000-fdif-interface-not-in-the-reference-list) | [S2K-TM-ICD] (cited for the SCOS-2000 FDIF interface; not in the reference list) |  | mentioned |
| [S2K-DATABASE-ICD] | [catalogue](../references/index.md#ref-s2k-database-icd-cited-for-the-mib-table-format-not-in-the-reference-list) | [S2K-DATABASE-ICD] (cited for the MIB table format; not in the reference list) |  | mentioned |

!!! note "Notes"
    The file name (MEX_ESC_ID_5003_FDSICD.PDF, from the Mars Express radio-science archive in the PSA) suggests a Mars Express document ID, but the title page prints RO-ESC-ID-5003, a joint Rosetta/Mars Express ICD. The title page says Issue B1 while the change record stops at Draft B0, and section 1.4 still calls it a draft. Margin change-bar DCR numbers leak into the extracted text, for example '090' next to headings. The 'authors' list gives the people on the approval page (A. Ercolani is listed as Rosetta Technical Officer, preparation by Anite Systems GmbH), not necessarily the writers. The IFMS-OCC reference spells the company 'MakulaMedia' (library item ifms-occ-icd-mex is a later issue, 11.4.0). Section 7.5 cites [S2K-TM-ICD] and section 7.7 cites [S2K-DATABASE-ICD]; neither label is in the reference lists, which have [S2K-PKT-ICD] and [S2K-MIB-ICD] instead. One node address is printed as 'rdsa.ops.esoc.esa.det' (typo). Comet and asteroid names appear as 'Otawara'/'Otwara', 'Siwa' and 'Wirtanen' (original Rosetta targets). Page 6 of the PDF is blank.

