---
title: "Rosetta/MEX/VEX Data Delivery Interface Document (DDID)"
description: "The Data Delivery Interface Document (DDID) shared by the Rosetta, Mars Express and Venus Express mission control systems at ESOC (RO-ESC-IF-5003 / MEX-ESC-IF-5003 / VEX-ESC-IF-5003, issue C2, 21 Febr"
tags: ["Data Delivery Interface Document", "Mission data delivery documents"]
sources: [ro-esc-if-5003-ddid-c2]
---

# Rosetta/Mars Express/Venus Express Mission Control System (RMCS/MMCS/VMCS) Data Delivery Interface Document DDID

<dl class="osi-meta"><dt>Document ID</dt><dd>RO-ESC-IF-5003, MEX-ESC-IF-5003, VEX-ESC-IF-5003</dd><dt>Issue / version</dt><dd>Issue C2</dd><dt>Date</dt><dd>2006-02-21</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (Rosetta / MEX / VEX Ground Segment Teams)</dd><dt>Authors</dt><dd>Rosetta / MEX / VEX Ground Segment Teams</dd><dt>Type</dt><dd>Data Delivery Interface Document</dd><dt>Status</dt><dd>Issue C2, 21/02/2006 (PDF p. 1). The approval page (PDF p. 3) lists approvers at ESA/ESOC, ESA/ESTEC, RAL and the contractor VEGA IT GmbH, with blank signature lines. The change record runs from Draft A0 (30/04/99) to Issue C2, whose only change is fixing document corruption (DCR 386, PDF p. 16). A later issue C3 exists for Appendix I (library item ro-esc-if-5003-appendix-i-c3).</dd><dt>Pages</dt><dd>162</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://pdssbn.astro.umd.edu/holdings/rl-cal-sd2-3-phc-v1.0/document/ro_esc_if_5003_ddid.pdf" rel="noopener">https://pdssbn.astro.umd.edu/holdings/rl-cal-sd2-3-phc-v1.0/document/ro_esc_if_5003_ddid.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:01Z</dd><dt>SHA-256</dt><dd><code>7ad3cdbbadc6ad834c3da9dae2ce00bb50a98e81db915fc2b0cc15e1fa0a02e1</code></dd><dt>Size</dt><dd>798.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/ro-esc-if-5003-ddid-C2.pdf">ro-esc-if-5003-ddid-C2.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Data Delivery Interface Document (DDID) shared by the Rosetta, Mars Express and Venus Express mission control systems at ESOC (RO-ESC-IF-5003 / MEX-ESC-IF-5003 / VEX-ESC-IF-5003, issue C2, 21 February 2006). It is the ICD between these SCOS-2000-based control systems and the science communities, and covers three kinds of data: on-line data requests from the Principal Investigators to the Data Disposition System (DDS), the on-line data sent back, and off-line full data sets on Raw Data Media (RDM, CD-ROM for Mars and Venus Express). Together with the Command Request Interface Document it defines the complete interface to the PIs.

The early chapters list the DDS requirements (FTP or web requests, delivery within 15 minutes, 3 months on-line for Mars Express, quotas, at least 1000 Mbytes per day, sampling every Nth packet, automatic forwarding), the interface characteristics, access, security and error handling. Chapter 7 defines each data item: the XML on-line request (OnlineRequestType, delivery, format and filter keywords), responses, acknowledgements and catalogue entries packaged as CCSDS SFDUs; telemetry data delivered as reconstituted source packets, each preceded by an 18-octet DDS packet header (SCET in seconds and microseconds since 1970, packet length, ground station ID, virtual channel, SLE service type, time quality); command history as raw TC packets with a 30-octet header (uplink and execution times and the CUV, CAV and CEV verification stages per virtual channel) or as printouts; auxiliary data, catalogues, error messages and the RDM SFDU and file views.

Twelve appendices cover data streams and ADIDs (including Super APIDs), error handling, accounts, the MEX RDM listing, auxiliary file types, an SFDU tutorial, bit and octet numbering, flight-dynamics and planning products, the XML schema, MCS-generated packets (APID 1966, type 190), the time-correlation procedure and packet, the lander TC verification and detailed agenda files, and the science network implementation.


## Key points

- The DDID defines the data delivery interface between the Rosetta, Mars Express and Venus Express mission control systems at ESOC and their science communities; the component supporting that interface is the Data Disposition System (DDS). *(PDF p. 25)*
- DDS requirements include FTP or web delivery on request, start of delivery within 15 minutes, 3 months of on-line data availability, up to 12 queued requests per user, at least 1000 Mbytes per day in total and a per-user quota. *(PDF p. 29)*
- RDM delivery to PIs is planned for Mars Express and Venus Express but not for Rosetta; the MEX RDM is a CD-ROM holding by default one day of data, split by on-board packet generation time. *(PDF p. 30)*
- Data packaging follows the CCSDS Standard Formatted Data Unit (SFDU) recommendation, applied simply enough that PIs can treat the extra header fields as spare bytes. *(PDF p. 32)*
- On-line responses are extracted from the MCS Data Archive System (DAS); VC0 telemetry is normally available within seconds of ground-station reception, and auxiliary files or periodic TM/TC sets can be sent automatically to registered PIs. *(PDF p. 38)*
- Each delivered telemetry packet is preceded by an 18-octet DDS packet header: SCET (8 octets), packet length (4), ground station ID (2), virtual channel ID (2), SLE service type (1) and time quality (1: 0 good, 1 inaccurate, 2 bad). *(PDF p. 64)*
- SCET is the calibrated generation time of the first bit of the packet, coded as two 32-bit integers (seconds since 1 January 1970 and microseconds); time correlation packets (APID 1966, type 190, subtype 40) carry ground station ID 0. *(PDF p. 65)*
- Raw TM is returned in chronological order of either the source packet generation time (OBT converted to UTC) or the SCOS-2000 packet generation time (reception by the MCS); the SPID is described as an ID internal to the MCS. *(PDF p. 66)*
- Command history raw packets carry a 30-octet DDS command header with uplink time, execution time and verification flags for the uplink (CUV, CLCW-based), acceptance (CAV) and execution (CEV) stages per virtual channel. *(PDF p. 68)*
- Telemetry ADIDs are derived from the APID: the 7-bit process ID as two hex digits plus the packet category as one hex digit, e.g. process ID 51 and category 4 give EROST334; Super APIDs are negative values standing for a predefined list of APIDs. *(PDF p. 107)*
- MCS-internal packets use APID 1966 and type 190 (for example bad transfer frames subtype 20, good frames 21, bad packets 30, time correlation coefficients 40), stored with a SCOS-2000 TM header but no source packet header. *(PDF p. 134)*
- Time correlation: the packetiser corrects the ERT of each VC0 'zeroth' frame for ground delay, one-way light time and on-board delay, creates time telemetry packets (type 190, subtype 0, APID 0), and the FCT computes a least-squares fit whose gradient should be nominally 1. *(PDF p. 136)*
- The time correlation coefficient packet data field is 240 bits: gradient, offset and standard deviation as 64-bit IEEE doubles and a 48-bit CCSDS CUC generation time, big-endian. *(PDF p. 137)*


## Cited by these wiki pages (11)

- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [ST[13] Large packet transfer](../ecss/pus/st13-large-packet-transfer.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (46 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 25 |
    | 1.6 | Applicable Documents | 25 |
    | 1.7 | Reference Documents | 26 |
    | 2 | Operational Assumptions and Constraints | 28 |
    | 3 | Requirements | 29 |
    | 3.2 | On-line Data Delivery Requirements | 29 |
    | 3.3 | Off-line Data Delivery Requirements | 30 |
    | 3.4 | Introduction to Standard Formatted Data Units | 32 |
    | 4 | Interface Characteristics | 33 |
    | 5 | Access | 35 |
    | 5.2 | Failure Protection, Detection and Recovery Procedures | 36 |
    | 5.5 | Security Requirements | 36 |
    | 6 | Detailed Interface Specifications | 38 |
    | 6.2 | Generation Method | 38 |
    | 6.3 | Data Passed Across the Interface and their Direction | 39 |
    | 6.4 | Size and Frequency of Transfers | 39 |
    | 6.5 | Timing and Synchronisation Requirements | 40 |
    | 7 | Data Definition | 41 |
    | 7.1 | On-line Data Request | 41 |
    | 7.2 | Response to On-line Data Request | 55 |
    | 7.3 | Acknowledgement | 57 |
    | 7.4 | Catalogue Entry | 60 |
    | 7.5 | On-line Data | 63 |
    | 7.6 | Telemetry Data | 64 |
    | 7.7 | Command History Data | 68 |
    | 7.8 | Auxiliary Data | 79 |
    | 7.9 | Catalogue Data | 81 |
    | 7.10 | Error Message | 83 |
    | 7.11 | Off-line Data Delivery | 85 |
    | 7.12 | RDM (SFDU View) | 87 |
    | 7.13 | RDM (File View) | 93 |
    | 8 | Appendix A: Data Streams Available and ADIDs | 101 |
    | 9 | Appendix B: DDS Error handling | 108 |
    | 10 | Appendix C: Accounts | 110 |
    | 11 | Appendix D: Full MEX RDM Directory and File Listing | 111 |
    | 12 | Appendix E: List of DDS Auxiliary Data | 115 |
    | 13 | Appendix F: Standard Formatted Data Units (SFDUs) | 120 |
    | 14 | Appendix G: Physical Data Nomenclature Conventions | 129 |
    | 15 | Appendix H: Data Delivery Flight Dynamics Products | 131 |
    | 16 | Appendix I: Request Dialogue XML Schema | 132 |
    | 17 | Appendix J: Data Delivery Mars/Venus Express MPS Products | 133 |
    | 18 | Appendix K: MCS Products | 134 |
    | 18.1 | MCS Telemetry Packets | 134 |
    | 18.2 | Lander Telecommand Verification File (LTVF) | 138 |
    | 18.3 | Detailed Agenda File (DAF) | 140 |
    | 19 | Appendix L: Network Implementation Document | 153 |


## Documents this one references (33)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| A-1 | [CCSDS 620.0-B-2.1](../references/index.md#ref-ccsds-620-0-b-2-1) | Recommendation for Space Data System Standards: Standard Formatted Data Units – Structure and Construction Rules | Blue Book, Issue 2 November 1996 | applicable |
| A-2 | [ESA-PSS-04-106](../references/index.md#ref-esa-pss-04-106) | ESA Packet Telemetry Standard |  | applicable |
| A-3 | [MEX-MMT-IF-0936](../references/index.md#ref-mex-mmt-if-0936) | Rosetta/MEX Generic TM/TC ICD | Issue 2, Rev. 2 30th August 2001 | applicable |
| A-4 | [RO-ESC-IF-5003/MEX-ESC-IF-5003/VEX-ESC-IF-5003 Appendix H](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-vex-esc-if-5003-appendix-h) | Data Delivery FD Products | Issue 3.2 1st July 2006 | applicable |
| A-5 | [RO-ESC-LI-5001](../references/index.md#ref-ro-esc-li-5001) | Rosetta Project Glossary | Issue A0 15th May 1999 | applicable |
| A-6 | [RO-ESC-IF-5003/MEX-ESC-IF-5003/VEX-IF-5003 Appendix C](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-vex-if-5003-appendix-c) | PI Account Details | Issue C2 21st February 2006 | applicable |
| A-7 | [RO-ESC-IF-5003/MEX-ESC-IF-5003/VEX-ESC-IF-5003 Appendix I](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-vex-esc-if-5003-appendix-i) | Generic DDS request dialogue XML schema | Issue C2 21st February 2006 | applicable |
| A-8 | [SOP-RSSD-SP-002](../references/index.md#ref-sop-rssd-sp-002) | SOP-RSSD Software Specification Document (SOP-RSSD-SP-002_2.0_PTR_Software_Specification_Document_2002Aug06.) | 2.0 06 Aug 2002 | applicable |
| A-9 | [/MakaluMedia/MR/IFMS/ICD/FTP-OCC](../references/index.md#ref-makalumedia-mr-ifms-icd-ftp-occ) · [library](ifms-occ-icd-mex.md) | IFMS-OCC Interface, Interface Control Document | Issue 9.3.1 09 April 2003 | applicable |
| A-10 | [VEX.T.ASTR.ICD.00326](../references/index.md#ref-vex-t-astr-icd-00326) | VEX Generic TM/TC ICD | Issue 2.0 3rd Feb 2004 | applicable |
| A-11 | [VEX-ESC-IF-5002](../references/index.md#ref-vex-esc-if-5002) | VEX Space Ground ICD | Issue 2.3 16th February 2004 | applicable |
| R-1 | [RO-ESC-RS-5310](../references/index.md#ref-ro-esc-rs-5310) | R(ME)MCS User Requirements Document | Issue 2 19th June 1998 | reference |
| R-2 | [RO-ESC-RS-5320](../references/index.md#ref-ro-esc-rs-5320) | R(ME)MCS Software Requirements Document | Issue B3 15th Dec 2000 | reference |
| R-3 | [RO-ESC-IF-0004](../references/index.md#ref-ro-esc-if-0004) | RMCS/MEMCS Command Request Interface Document | Issue C1 1 July 2005 | reference |
| R-4 | [CCSDS 621.0-G-1](../references/index.md#ref-ccsds-621-0-g-1) | Report Concerning Space Data System Standards: Standard Formatted Data Units – A Tutorial | Green Book, Issue 1 May 1992 | reference |
| R-5 | [CCSDS 630.0-B-1](../references/index.md#ref-ccsds-630-0-b-1) | Recommendation for Space Data System Standards: Standard Formatted Data Units – Control Authority Procedures | Blue Book, Issue 1 June 1993 | reference |
| R-6 | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | Recommendation for Space Data System Standards: Time Code Formats | Blue Book, Issue 2 April 1990 | reference |
| R-7 | [CCSDS 641.0-B-1](../references/index.md#ref-ccsds-641-0-b-1) | Recommendation for Space Data System Standards: Parameter Value Language Specification (CCSD0006) | Blue Book, Issue 1 May 1992 | reference |
| R-8 | [CCSDS 641.0-G-1](../references/index.md#ref-ccsds-641-0-g-1) | Report Concerning Space Data System Standards: Parameter Value Language – A Tutorial | Green Book, Issue 1 May 1992 | reference |
| R-9 | [CCSDS 643.0-B-1](../references/index.md#ref-ccsds-643-0-b-1) | Recommendation for Space Data System Standards: ASCII Encoded English (CCSD0002) | Blue Book, Issue 1 November 1992 | reference |
| R-10 | [MEX-ESC-RS-5310](../references/index.md#ref-mex-esc-rs-5310) | MARS Express MCS Delta User Requirements Document | Issue 1 11th September 2000 | reference |
| R-11 | [catalogue](../references/index.md#ref-w3c-recommendation-extensible-markup-language-xml-1-0-http-www-w3-org-tr-rec-xml) | W3C Recommendation – Extensible Markup Language (XML) 1.0 (http://www.w3.org/TR/REC-xml) | Second Edition 6 October 2000 | reference |
| R-12 | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-0-primer-http-www-w3-org-tr-xmlschema-0) | W3C Recommendation – XML Schema Part 0: Primer (http://www.w3.org/TR/xmlschema-0/) | 2 May 2001 | reference |
| R-13 | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-1-structures-http-www-w3-org-tr-xmlschema-1) | W3C Recommendation – XML Schema Part 1: Structures (http://www.w3.org/TR/xmlschema-1/) | 2 May 2001 | reference |
| R-14 | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-2-datatypes-http-www-w3-org-tr-xmlschema-2) | W3C Recommendation – XML Schema Part 2: Datatypes (http://www.w3.org/TR/xmlschema-2/) | 2 May 2001 | reference |
| R-15 | [MEX-ESC-RP-5500](../references/index.md#ref-mex-esc-rp-5500) | Consolidate Report on Mission ANALYSIS (CREMA) | Issue 2 | reference |
| R-16 | [ME-ESC-IF-5001](../references/index.md#ref-me-esc-if-5001) | MEX Space Ground ICD | Issue 4.1 16th December 2002 | reference |
| R-17 | [RO-SES-TN-2029](../references/index.md#ref-ro-ses-tn-2029) | Rosetta/MEX Software User manual for the PM firmware (Fimware TM/TC ICD) | Issue 7 25th October 2001 | reference |
| R-18 | [MEX.MMT.IF.0750](../references/index.md#ref-mex-mmt-if-0750) | Rosetta/MEX DMS-SW (and AOCMS-SW service layers) TM/TC ICD | Issue 3, Rev. 0 15th January 2003 | reference |
| R-19 | [MEX.MMT.IF.0365](../references/index.md#ref-mex-mmt-if-0365) | Mars Express SSMM TM/TC and Software ICD | Issue 2, Rev. 1 31st January 2002 | reference |
| R-20 | [MEX-MMT-IF-0861](../references/index.md#ref-mex-mmt-if-0861) | Mars Express AOCS Application Software TM/TC ICD | Issue 4, Rev. 0 4th March 2002 | reference |
| R-21 | [MEX-MMT-IF-0463](../references/index.md#ref-mex-mmt-if-0463) | Rosetta/Mars Express Star Tracker TM/TC and Software ICD | Issue 4, Rev. 0 19th November 2001 | reference |
| R-22 | [MEX-MMT-IF-1264](../references/index.md#ref-mex-mmt-if-1264) | Mars Express Payloads and Lander TM/TC and Software ICD | Issue 3, Rev. 0 24th January 2003 | reference |

!!! note "Notes"
    Body page numbers are offset: printed page 1 is PDF p. 25, so PDF page = printed page + 24 for the body; the front matter (approval, a long distribution list with PI postal addresses, and a change record of about 15 pages) uses roman numerals. The text layer is interspersed with change-tracking markers such as 'DCR129', '088' and 'DCR325' inserted into sentences and headings (e.g. 'Command History Data 037 039', 'Mars/VenusDCR210 Express'). Applicable document A-11 is printed after R-22 at the end of the reference list. A-4 is dated 1st July 2006, later than this issue's date of 21/02/2006, as printed. The change record for Issue C2 (DCR 386) says it fixed document corruption where characters had been replaced by quotation marks. E-mail addresses, IP addresses and web URLs on PDF p. 35 are not reproduced here. Downloaded from the PDS Small Bodies Node (a Rosetta Lander/CIVA archive volume). The same document family exists in the library as mex-esc-if-5003-b5 (an earlier issue B5 held in the ESA PSA Mars Express archive) and its Appendix I issue C3 as ro-esc-if-5003-appendix-i-c3.

