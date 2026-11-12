---
title: "SCOS-2000 TDRS External Interfaces ICD (issue 5.1)"
description: "The interface control document for the file-based and internal interfaces of the SCOS-2000 TDRS (TM Data Retrieval Services) application."
tags: ["Interface Control Document", "TDRS"]
sources: [icd-0017-tdrs-5-1]
---

# SCOS-2000 TDRS-External Interfaces Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-MCS-S2K-ICD-0017</dd><dt>Issue / version</dt><dd>5.1</dd><dt>Date</dt><dd>2008-08-22</dd><dt>Organisation</dt><dd>ESA/OPS-GIC (ESOC); prepared by the TDRS Team, LogicaCMG</dd><dt>Authors</dt><dd>TDRS LogicaCMG Release Team, P. Donnelly, F. Cuadrado, S. Moulin</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 5.1 of 22/08/2008, 'Included updates provided by mission for DCR-4996' (Document Status Sheet, PDF p. 3). The Document Status Sheet runs from issue 1.0 (Feb 21, 2000) to 5.1, with 5.0 'Updates for TDRS Release 3.1'. Section 1.5 says the document 'May be updated after implementation'. The approval sheet lists P. Donnelly (LogicaCMG project management) as checker, F. Cuadrado (ESOC, OPS-GIM Management) as approver and S. Moulin (ESOC, H/OPS-GIM) as authoriser.</dd><dt>Pages</dt><dd>71</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/21071442/21527382/egos-mcs-s2k-icd-0017-version51+tdrs.pdf/57a0a02f-2796-bf76-e2f6-c7ac55df4a8a" rel="noopener">https://www.cosmos.esa.int/documents/21071442/21527382/egos-mcs-s2k-icd-0017-version51+tdrs.pdf/57a0a02f-2796-bf76-e2f6-c7ac55df4a8a</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:39Z</dd><dt>SHA-256</dt><dd><code>03e4084175fe7274827954e6a1e513cc69ad23ea5d34b31cf605c8e566e20fcf</code></dd><dt>Size</dt><dd>528.3 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tdrs/icd-0017-tdrs-5.1.pdf">icd-0017-tdrs-5.1.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The interface control document for the file-based and internal interfaces of the SCOS-2000 **TDRS** (TM Data Retrieval Services) application. TDRS is a web-based service that lets external users retrieve archived telemetry parameter samples from a [SCOS-2000](../scos2000/index.md) mission control system ([TDRS page](../scos2000/tdrs.md)).

The core of the document is the **retrieval request file** (`.req`). It is an ASCII file of `Field:value` lines that specifies the retrieval type (FAST raw only, FAST_ENG with engineering values, or COMPLETE with validity and status), output format (MVDA, spreadsheet, column-mode spreadsheet), time format (ASD `yyyy.ddd.hh.mm.ss` or CCSDS ASCII A), MIB database version, optional e-mail and FTP delivery, up to 4 data streams, a single, repeated or irregular time window, and per-parameter blocks. Each parameter block gives the parameter name, optional SPID, a change-based or occurrence-based filter for supercommutated samples, every-Nth-packet sampling, validity and OOL filters, min/max thresholds and packet-by-packet or interval retrieval mode.

The ICD then specifies the outputs: the MVDA format (ASCII header plus binary `Data####.dat` and `Time####.dat` files with 8-byte Unix-epoch timestamps), the tab-separated spreadsheet files (`.fst`, `.fen`, `.cmp`) with raw value, validity, engineering unit and engineering value, the column-organised file (`.col`) with per-parameter statistics, and the user log file. The last chapters describe the internal chain: web server, PCGI CGI executables and their HTML state machine, the CORBA interface to the request manager PRQM (newRequest, getStatus, cancelRequest, getDBInfo, getParameters), and the TCP/IP protocol between PRQM and the PSRV back-end, which spawns fast or complete child processes against the SCOS-2000 kernel. Appendices give the ASCII value formats per data type and the threshold matching rules. Useful background for [mission archives](../scos2000/archives.md) and [MIB monitoring parameters](../mib/monitoring.md).


## Key points

- Issue history runs from 1.0 (Feb 21, 2000) through 4.3 (updates for SCOS Release 3.1, March 2004), 4.4 (R_TDRS-2.1), 5.0 (TDRS Release 3.1, June 4, 2007) to 5.1 (August 22, 2008, DCR-4996). *(PDF p. 3)*
- The ICD covers the retrieval request file, the MVDA fast-retrieval result files, the spreadsheet result files (complete and fast), the column-organised result file and the user log file. *(PDF p. 11)*
- File types: .req retrieval request; Header.dat, Timexxxx.dat and Dataxxxx.dat MVDA files; .fst, .fen and .cmp spreadsheet files for fast, fast-with-engineering and complete retrievals; .col column-organised file. *(PDF p. 15)*
- Generated file names contain retrieval ID, execution ID, user ID and an expiration day count (ddd), e.g. 0_1_SMITH_038.req. *(PDF p. 16)*
- Security checks: user authentication with SSL certificates at the web interface, plus configurable maxima for parallel retrieval requests, archive requests and result-file size. *(PDF p. 16)*
- Binary MVDA files are Solaris format; transfer to Linux is not supported because the MVDA format is deprecated for future TDRS installations. *(PDF p. 18)*
- RetrievalType 0 = FAST (no engineering values), 1 = FAST_ENG, 2 = COMPLETE; OutputFormat 0 = MVDA, 1 = SPREADSHEET, 2 = COLUMNMODE_SPREADSHEET (default). *(PDF p. 21)*
- TimeFormat 0 = ASD (yyyy.ddd.hh.mm.ss[.mmm]), 1 = CCSDS ASCII A (yyyy-mm-ddThh:mm:ss.mmm), 2 = BOTH; the Dbversion (MIB database version) field is mandatory. *(PDF p. 22)*
- Datastream values range 1-65535 and at most 4 data streams may be requested; time windows are SINGLE, REPEATED (overall start/stop, window length, repeat period) or IRREGULAR. *(PDF p. 23)*
- Per-parameter block: ParamName (Char(8)), optional SPID (1 to 2^31-1, ignored for synthetic parameters), RetrievalFilter VALUE_AFTER/VALUE_BEFORE/VALUE_BEFORE_AFTER/ON_OCCURRENCE/NO_FILTERING; ON_OCCURRENCE uses OccurrenceStart and OccurrenceInterval for supercommutated samples. *(PDF p. 24)*
- Further per-parameter options: SamplingN (every Nth packet, COMPLETE only), OnlyWhenValidityOK, OnlyWhenNotNominal (OOL state) and Min/Max threshold values (raw view for FAST, default view otherwise). *(PDF p. 25)*
- In MVDA output each time sample is 8 bytes: 4-byte integer seconds since 1970 and 4-byte integer microseconds; the header DataFormat codes include S8 to S64, U8 to U64, F, D, Q, A#####, RIEEE and RMIL (MIL-STD-1750A). *(PDF p. 29)*
- Spreadsheet result rows hold Time1 (ASD), Time2 (CCSDS ASCII A), Parameter, Raw, RawValidity (same texts as the SCOS-2000 telemetry desktop), EngineeringUnit (from the MCS DB) and Engineering value, tab separated. *(PDF p. 32)*
- The column-organised file gives per-parameter statistics: first/last sample times, minimum and maximum (with time stamps), average and standard deviation. *(PDF p. 38)*
- The PRQM CORBA interface offers newRequest, getStatus, cancelRequest, getDBInfo (available MIB databases), getParameterCount and getParameters. *(PDF p. 48)*
- PRQM talks to PSRV over TCP/IP: PSRV_IF_INITREQUEST sends a PSRVretrRequest to PSRVserver, which starts a PSRVfastChild or PSRVcompleteChild; the child opens its own TCP/IP connection back to PRQM for the request's parameters. *(PDF p. 55)*
- Appendix A maps SCOS-2000 internal encodings to ASCII value formats (unsigned/signed integer, boolean, logical bit string with 'b', natural, real, string, absolute time in ASD/ASCII A/ASCII B, delta time up to 365.23.59.59.999). *(PDF p. 68)*


## Cited by these wiki pages (6)

- [Calibration in the MIB](../mib/calibration.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TDRS: Telemetry Data Retrieval Service](../scos2000/tdrs.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (51 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 0 | Approval Sheet | 2 |
    | 0.1 | Document Status Sheet | 3 |
    | 0.2 | Document Change Record | 3 |
    | 1 | Introduction | 11 |
    | 1.6 | References | 12 |
    | 2 | Operational Assumptions and Constraints | 13 |
    | 3 | Requirements | 14 |
    | 4 | Interface Characterictics | 15 |
    | 4.3 | Data Source, Destination and Transfer Mechanism | 15 |
    | 5 | Access | 16 |
    | 5.3 | File Naming Convention | 16 |
    | 5.5 | Security Requirements | 16 |
    | 5.6 | Data Integrity Check | 17 |
    | 5.8 | Error Handling | 17 |
    | 6 | Detailed Interface Specifications | 18 |
    | 7 | Data Definition | 19 |
    | 7.1 | Definition of the Table Record Structure | 19 |
    | 8 | Retrieval Request File Specification | 20 |
    | 8.5 | File Structure | 20 |
    | 8.6 | Retrieval Request File | 21 |
    | 8.7 | Example of a Retrieval Request File | 26 |
    | 9 | MVDA Result Data File Specification | 28 |
    | 9.5 | File Structure | 28 |
    | 9.6 | Header file | 29 |
    | 9.7 | Example of a Header File | 30 |
    | 10 | Spreadsheet Result Data File Specification | 31 |
    | 10.6 | Spreadsheet Result Data File | 32 |
    | 10.7 | Example of Fast Result Data File | 33 |
    | 10.8 | Example of Fast with engineering values Result Data File | 33 |
    | 10.9 | Example of Complete Result Data File | 34 |
    | 11 | Column Organised Result Data File Specification | 35 |
    | 11.6 | Retrieval Header Data | 36 |
    | 11.7 | Common Column | 36 |
    | 11.8 | Parameter Column | 37 |
    | 11.9 | Example of a Result Data File | 39 |
    | 12 | User Log File Specification | 40 |
    | 12.6 | User Log File | 40 |
    | 12.7 | Example of a User Log File | 41 |
    | 13 | Interface between Web Server and PCGI | 42 |
    | 13.1 | HTML pages | 42 |
    | 13.2 | PCGI Executables | 43 |
    | 13.3 | PCGI state machine | 44 |
    | 14 | Interface between PCGI and PRQM | 48 |
    | 14.1 | CORBA Interface from PCGI to PRQM | 48 |
    | 14.2 | File Interface from PCGI to PRQM | 53 |
    | 15 | Interface between PRQM and PSRV | 54 |
    | 15.1 | Communication from PRQM to PSRV | 54 |
    | 15.2 | Communication from PSRV back to PRQM | 61 |
    | 15.2.3 | PSRVstatus | 64 |
    | 16 | Appendix A: Value format in Output Files | 68 |
    | 17 | Appendix B: Threshold | 70 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-0 | [S2K-MCS-DOC-LIST+&lt;XXX&gt;](../references/index.md#ref-s2k-mcs-doc-list-xxx) | SCOS-2000 document list of the baseline release XXX. Where XXX is the baseline release name. |  | applicable |
| AD-1 | [S2K-MCS-SRD-0004-TOS-GIC](../references/index.md#ref-s2k-mcs-srd-0004-tos-gic) | SCOS-2000 TM Data Retrieval Services Software Requirements Document |  | applicable |
| AD-2 | [S2K-MCS-SRD-0001-TOS-GIC](../references/index.md#ref-s2k-mcs-srd-0001-tos-gic) | SCOS-2000 System Level Requirements Document |  | applicable |
| AD-3 | [S2K-MCS-SUM-2210-TOS-GIC](../references/index.md#ref-s2k-mcs-sum-2210-tos-gic) | SCOS-2000 Telemetry Desktop Operator User Manual |  | applicable |
| RD-1 | [S2K-MCS-GLO-0001-TOS-GIC](../references/index.md#ref-s2k-mcs-glo-0001-tos-gic) | SCOS-2000 Glossary, Definitions and Acronyms |  | reference |
| RD-2 | [MVDA](../references/index.md#ref-mvda) | MVDA Retrieval User's Guide |  | reference |
| RD-3 | [S2K-MCS-ADD-0015-TOS-GIC](../references/index.md#ref-s2k-mcs-add-0015-tos-gic) | TDRS Architectural Design Document |  | reference |
| RD-4 | [ESA PSS-05](../references/index.md#ref-esa-pss-05) | ESA Software Engineering Standard | Issue 2 February, 1991 | reference |
| RD-5 | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | ESA Packet Telemetry Standard | Issue 1 January, 1988 | reference |
| RD-6 | [S2K-MCS-ICD-0001-TOS-GIC](../references/index.md#ref-s2k-mcs-icd-0001-tos-gic) | SCOS-2000 Database Import ICD |  | reference |
| RD-7 | [MVDA](../references/index.md#ref-mvda) | MVDA Retriever Programmer's Guide |  | reference |

!!! note "Notes"
    Printed page numbers are PDF page minus 1. The Document Status Sheet gives the same date (June 4, 2007) for issues 4.5 and 5.0. The first heading is printed as 'SERVICES' followed by 'Approval sheet', and the extraction joins them as 'SERVICESAPPROVAL SHEET'. The Section 4 heading is misspelt 'Interface Characterictics' in the original. Field-number cross-references in the time-window fields point to 'field 12' where field 17 (StopTime) is meant. The retrieval request example contains an illustrative ESOC e-mail address and FTP password, which are omitted here. The 'authors' list gives the names and roles on the approval sheet; no other authors are named. The Database Import ICD [RD-6] corresponds to the MIB ICD family in the library (icd-5-1-tos-gci, icd-6-7-drafta, icd-7-0-final). The ICD describes the TDRS 'PAS' application storing request files without defining the acronym.

