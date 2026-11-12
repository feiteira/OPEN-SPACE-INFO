---
title: "Rosetta/Mars Express DDID, issue B5 (2003)"
description: "Issue B5 (27 March 2003) of the Data Delivery Interface Document (DDID) shared by the Rosetta and Mars Express mission control systems (RMCS/MEMCS) at ESOC, RO-ESC-IF-5003 / MEX-ESC-IF-5003."
tags: ["Data Delivery Interface Document", "Mission data delivery documents"]
sources: [mex-esc-if-5003-b5]
---

# Rosetta/Mars Express Mission Control System (RMCS/MEMCS) Data Delivery Interface Document DDID

<dl class="osi-meta"><dt>Document ID</dt><dd>RO-ESC-IF-5003 / MEX-ESC-IF-5003</dd><dt>Issue / version</dt><dd>Issue B5</dd><dt>Date</dt><dd>2003-03-27</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (Rosetta / MEX Ground Segment Teams)</dd><dt>Authors</dt><dd>Rosetta / MEX Ground Segment Teams</dd><dt>Type</dt><dd>Data Delivery Interface Document</dd><dt>Status</dt><dd>Issue B5, 2003/03/27 (PDF p. 1), updated according to the DDID review of 18 December 2002. The approval pages (PDF pp. 3-4) list ESOC, ESTEC and contractor (Anite) approvers and the Rosetta and Mars Express PIs, with blank signature lines. Superseded by later issues (B6 to C2; see library item ro-esc-if-5003-ddid-c2), which also added Venus Express.</dd><dt>Pages</dt><dd>153</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/psa/ftp/MARS-EXPRESS/MRS/MEX-M-MRS-1-2-3-PRM-0227-V1.0/DOCUMENT/ESA_DOC/MEX-ESC-IF-5003.PDF" rel="noopener">https://archives.esac.esa.int/psa/ftp/MARS-EXPRESS/MRS/MEX-M-MRS-1-2-3-PRM-0227-V1.0/DOCUMENT/ESA_DOC/MEX-ESC-IF-5003.PDF</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:08Z</dd><dt>SHA-256</dt><dd><code>015eccedab1553231dc98dc77f0ea7feade4856581f8c0ef7ff37fa51fad7c95</code></dd><dt>Size</dt><dd>1.1 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/mex-esc-if-5003-B5.pdf">mex-esc-if-5003-B5.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue B5 (27 March 2003) of the Data Delivery Interface Document (DDID) shared by the Rosetta and Mars Express mission control systems (RMCS/MEMCS) at ESOC, RO-ESC-IF-5003 / MEX-ESC-IF-5003. This copy was distributed inside the Mars Express Radio Science (MRS) archive in ESA's Planetary Science Archive. The DDID is the ICD between the SCOS-2000-based mission control systems and the science communities; with the Command Request Interface Document it defines the complete PI interface. The text says this is the twelfth update and the sixth issue, re-integrating Mars Express with Rosetta.

The structure and most content match the later issue C2. It covers the Data Disposition System (DDS) requirements (FTP or web requests, 15-minute response, quotas, sampling every Nth packet, automatic forwarding), interface characteristics, access and security, and generation from the MCS Data Archive System. The data definition chapter specifies the XML on-line request, responses, acknowledgements and catalogue entries in SFDU packaging; telemetry delivered as reconstituted source packets with an 18-octet DDS packet header (SCET, length, ground station ID, VC, SLE type, time quality); command history with a DDS command header carrying CUV, CAV and CEV verification flags; auxiliary data, catalogues, error messages and RDM (CD-ROM) layouts. Appendices cover data streams and ADIDs, error handling, the MEX RDM listing, auxiliary data types, an SFDU tutorial, nomenclature conventions, MCS products (APID 1966/type 190 internal packets, time correlation, lander TC verification file, detailed agenda file) and the science network implementation.

Compared with issue C2, this issue still speaks of on-line 'quick-look' data, gives a 3-week (TBC) RDM delivery target, splits RDM days by SCOS-2000 packet generation time, has fewer ground station IDs (NASA Madrid TBD), and leaves Appendices C (accounts) and I (XML schema) to separate documents. It is useful for tracing how the ESOC data delivery interface evolved.


## Key points

- The DDID defines the data delivery interface between the Rosetta and Mars Express mission control systems (RMCS and MEMCS) at ESOC and their science communities, through the Data Disposition System (DDS); in this issue the on-line data are called 'quick-look' data. *(PDF p. 23)*
- Section 1.4 states this is the twelfth update of the DDID and the sixth issue, and section 1.5 that it re-integrates Mars Express with the Rosetta interface requirements and design. *(PDF p. 23)*
- RDMs are to be delivered within 3 weeks (TBC) of reception at the OCC, and the split by day uses the SCOS-2000 packet generation time (equivalent to the archive time). *(PDF p. 29)*
- Each delivered telemetry packet carries an 18-octet DDS packet header: SCET (two 32-bit integers, seconds and microseconds since 1970), packet length, ground station ID (e.g. 0x15 Kourou, 0x17 New Norcia, 0x22 Goldstone, 0x23 Canberra, NASA Madrid TBD), virtual channel, SLE service type and time quality. *(PDF p. 62)*
- For on-line data the DDS shall provide access for 3 months (TBC) after acquisition from the spacecraft. *(PDF p. 34)*
- Appendix C (accounts) and Appendix I (request dialogue XML schema) are provided as separate documents (A-8 and A-7). *(PDF p. 107)*
- MCS-internal telemetry packets that carry no identification of their own are identified by APID 1966 and type 190. *(PDF p. 126)*


## Cited by these wiki pages (10)

- [Command verification in the MIB](../mib/command-verification.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [Missions](../missions/index.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SLE return services: RAF, RCF and ROCF](../ccsds/sle/return-services.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (42 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 23 |
    | 1.6 | Applicable Documents | 23 |
    | 1.7 | Reference Documents | 24 |
    | 2 | Operational Assumptions and Constraints | 26 |
    | 3 | Requirements | 27 |
    | 3.2 | On-line Data Delivery Requirements | 27 |
    | 3.3 | Off-line Data Delivery Requirements | 28 |
    | 3.4 | Introduction to Standard Formatted Data Units | 30 |
    | 4 | Interface Characteristics | 31 |
    | 5 | Access | 33 |
    | 5.5 | Security Requirements | 34 |
    | 6 | Detailed Interface Specifications | 36 |
    | 6.2 | Generation Method | 36 |
    | 6.5 | Timing and Synchronisation Requirements | 37 |
    | 7 | Data Definition | 39 |
    | 7.1 | On-line Data Request | 39 |
    | 7.2 | Response to On-line Data Request | 53 |
    | 7.3 | Acknowledgement | 55 |
    | 7.4 | Catalogue Entry | 58 |
    | 7.5 | On-line Data | 61 |
    | 7.6 | Telemetry Data | 62 |
    | 7.7 | Command History Data | 66 |
    | 7.8 | Auxiliary Data | 77 |
    | 7.9 | Catalogue Data | 79 |
    | 7.10 | Error Message | 81 |
    | 7.11 | Off-line Data Delivery | 83 |
    | 7.12 | RDM (SFDU View) | 85 |
    | 7.13 | RDM (File View) | 91 |
    | 8 | Appendix A: Data Streams Available and ADIDs | 99 |
    | 9 | Appendix B: DDS Error handling | 104 |
    | 10 | Appendix C: Accounts | 107 |
    | 11 | Appendix D: Full MEX RDM Directory and File Listing | 108 |
    | 12 | Appendix E: List of DDS Auxiliary Data | 109 |
    | 13 | Appendix F: Standard Formatted Data Units (SFDUs) | 112 |
    | 14 | Appendix G: Physical Data Nomenclature Conventions | 121 |
    | 16 | Appendix I: Request Dialogue XML Schema | 124 |
    | 17 | Appendix J: Data Delivery Mars Express MPS Products | 125 |
    | 18 | Appendix K: MCS Products | 126 |
    | 18.1 | MCS Telemetry Packets | 126 |
    | 18.2 | Lander Telecommand Verification File (LTVF) | 131 |
    | 18.3 | Detailed Agenda File (DAF) | 133 |
    | 19 | Appendix L: Network Implementation Document | 145 |


## Documents this one references (30)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| A-1 | [CCSDS 620.0-B-2.1](../references/index.md#ref-ccsds-620-0-b-2-1) | Recommendation for Space Data System Standards: Standard Formatted Data Units -- Structure and Construction Rules | Blue Book, Issue 2 November 1996 | applicable |
| A-2 | [ESA-PSS-04-106](../references/index.md#ref-esa-pss-04-106) | ESA Packet Telemetry Standard |  | applicable |
| A-3 | [MEX-MMT-IF-0936](../references/index.md#ref-mex-mmt-if-0936) | Rosetta/MEX Generic TM/TC ICD | Issue 2, Rev. 2 30th August 2001 | applicable |
| A-4 | [RO-ESC-IF-5003/MEX-ESC-IF-5003 Appendix H](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-appendix-h) | Data Delivery FD Products | Issue 1.2 13th Jun 2001 | applicable |
| A-5 | [RO-ESC-LI-5001](../references/index.md#ref-ro-esc-li-5001) | Rosetta Project Glossary | Issue A0 15th May 1999 | applicable |
| A-6 | [RO-ESC-IF-5003/MEX-ESC-IF-5003 Appendix C](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-appendix-c) | PI Account Details | Issue B5 27th March 2003 | applicable |
| A-7 | [RO-ESC-IF-5003/MEX-ESC-IF-5003 Appendix I](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-appendix-i) | Generic DDS request dialogue XML schema | Issue B4 26th June 2002 | applicable |
| R-1 | [RO-ESC-RS-5310](../references/index.md#ref-ro-esc-rs-5310) | R(ME)MCS User Requirements Document | Issue 2 19th June 1998 | reference |
| R-2 | [RO-ESC-RS-5320](../references/index.md#ref-ro-esc-rs-5320) | R(ME)MCS Software Requirements Document | Issue B3 15th Dec 2000 | reference |
| R-3 | [RO-ESC-IF-0004](../references/index.md#ref-ro-esc-if-0004) | RMCS/MEMCS Command Request Interface Document | Issue B3 8th March 2002 | reference |
| R-4 | [CCSDS 621.0-G-1](../references/index.md#ref-ccsds-621-0-g-1) | Report Concerning Space Data System Standards: Standard Formatted Data Units -- A Tutorial | Green Book, Issue 1 May 1992 | reference |
| R-5 | [CCSDS 630.0-B-1](../references/index.md#ref-ccsds-630-0-b-1) | Recommendation for Space Data System Standards: Standard Formatted Data Units -- Control Authority Procedures | Blue Book, Issue 1 June 1993 | reference |
| R-6 | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | Recommendation for Space Data System Standards: Time Code Formats | Blue Book, Issue 2 April 1990 | reference |
| R-7 | [CCSDS 641.0-B-1](../references/index.md#ref-ccsds-641-0-b-1) | Recommendation for Space Data System Standards: Parameter Value Language Specification (CCSD0006) | Blue Book, Issue 1 May 1992 | reference |
| R-8 | [CCSDS 641.0-G-1](../references/index.md#ref-ccsds-641-0-g-1) | Report Concerning Space Data System Standards: Parameter Value Language -- A Tutorial | Green Book, Issue 1 May 1992 | reference |
| R-9 | [CCSDS 643.0-B-1](../references/index.md#ref-ccsds-643-0-b-1) | Recommendation for Space Data System Standards: ASCII Encoded English (CCSD0002) | Blue Book, Issue 1 November 1992 | reference |
| R-10 | [MEX-ESC-RS-5310](../references/index.md#ref-mex-esc-rs-5310) | MARS Express MCS Delta User Requirements Document | Issue 1 11th September 2000 | reference |
| R-11 | [catalogue](../references/index.md#ref-w3c-recommendation-extensible-markup-language-xml-1-0-http-www-w3-org-tr-rec-xml) | W3C Recommendation - Extensible Markup Language (XML) 1.0 (http://www.w3.org/TR/REC-xml) | Second Edition 6 October 2000 | reference |
| R-12 | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-0-primer-http-www-w3-org-tr-xmlschema-0) | W3C Recommendation - XML Schema Part 0: Primer (http://www.w3.org/TR/xmlschema-0/) | 2 May 2001 | reference |
| R-13 | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-1-structures-http-www-w3-org-tr-xmlschema-1) | W3C Recommendation - XML Schema Part 1: Structures (http://www.w3.org/TR/xmlschema-1/) | 2 May 2001 | reference |
| R-14 | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-2-datatypes-http-www-w3-org-tr-xmlschema-2) | W3C Recommendation - XML Schema Part 2: Datatypes (http://www.w3.org/TR/xmlschema-2/) | 2 May 2001 | reference |
| R-15 | [MEX-ESC-RP-5500](../references/index.md#ref-mex-esc-rp-5500) | Consolidate Report on Mission ANALYSIS (CREMA) | Issue 2 | reference |
| R-16 | [ME-ESC-IF-5001](../references/index.md#ref-me-esc-if-5001) | MEX Space Ground ICD | Issue 4.1 16th December 2002 | reference |
| R-17 | [RO-SES-TN-2029](../references/index.md#ref-ro-ses-tn-2029) | Rosetta/MEX Software User manual for the PM firmware (Fimware TM/TC ICD) | Issue 7 25th October 2001 | reference |
| R-18 | [MEX.MMT.IF.0750](../references/index.md#ref-mex-mmt-if-0750) | Rosetta/MEX DMS-SW (and AOCMS-SW service layers) TM/TC ICD | Issue 3, Rev. 0 15th January 2003 | reference |
| R-19 | [MEX.MMT.IF.0365](../references/index.md#ref-mex-mmt-if-0365) | Mars Express SSMM TM/TC and Software ICD | Issue 2, Rev. 1 31st January 2002 | reference |
| R-20 | [MEX-MMT-IF-0861](../references/index.md#ref-mex-mmt-if-0861) | Mars Express AOCS Application Software TM/TC ICD | Issue 4, Rev. 0 4th March 2002 | reference |
| R-21 | [MEX-MMT-IF-0463](../references/index.md#ref-mex-mmt-if-0463) | Rosetta/Mars Express Star Tracker TM/TC and Software ICD | Issue 4, Rev. 0 19th November 2001 | reference |
| R-22 | [MEX-MMT-IF-1264](../references/index.md#ref-mex-mmt-if-1264) | Mars Express Payloads and Lander TM/TC and Software ICD | Issue 3, Rev. 0 24th January 2003 | reference |
| A-8 | [catalogue](../references/index.md#ref-accounts-appendix-c-provided-as-a-separate-document) | Accounts (Appendix C provided as a separate document) |  | mentioned |

!!! note "Notes"
    The file name says 'B5' and the content agrees (Issue B5, 2003/03/27); it was retrieved from the ESA PSA Mars Express Radio Science archive (MEX-ESC-IF-5003.PDF). Body page offset: printed page 1 is PDF p. 23 (PDF page = printed page + 22). The table of contents is out of step with the body for the appendices (for example it gives Appendix D at page 100 while the body prints it on page 86, because Appendices C and I are only placeholders here). The text layer shows ordinal suffixes ('th', 'st') on separate lines and change-tracking markers such as 'DCR218' and '039' inserted into the text. Appendix C refers to an applicable document A-8 that is not in the A-1 to A-7 list. Appendix J is marked TBW. Content largely duplicates the later issue C2 (library item ro-esc-if-5003-ddid-c2); key points here focus on differences.

