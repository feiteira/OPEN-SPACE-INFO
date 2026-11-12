---
title: "SCOS-2000 Database Import ICD, issue 5.1"
description: "Issue 5.1 (October 2001) of ESOC's SCOS-2000 Database Import ICD, the specification of the Mission Information Base (MIB) as a set of tab-separated ASCII tables that a mission's off-line database expo"
tags: ["Interface Control Document", "MIB / Database Import ICD"]
sources: [icd-5-1-tos-gci]
---

# SCOS-2000 Database Import ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>S2K-MCS-ICD-0001-TOS-GCI</dd><dt>Issue / version</dt><dd>5.1</dd><dt>Date</dt><dd>2001-10-26</dd><dt>Organisation</dt><dd>ESA/TOS-GCI (ESOC), SCOS-2000 Team</dd><dt>Authors</dt><dd>SCOS-2000 Team, M. Schick, S. Haag, M. Pecchioli, M. Jones</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 5.1 of 26/10/2001 (cover and change log, pp. 1-3). Superseded by issue 5.2 (2/07/03) and the 6.x and 7.0 issues, as recorded in the change logs of later issues (e.g. icd-6-7-drafta, p. 4). Herschel/Planck documents in the library cite it as applicable (H-P-1-ASP-TN-1060 AD2).</dd><dt>Pages</dt><dd>120</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002339_ESA_DOC_SCOS2000Database%20Import%20ICD/AD11%20-%20s2k-mcs-icd-0001-tos-gci_51%20-%20SCOS-2000%20Import%20ICD.PDF" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002339_ESA_DOC_SCOS2000Database%20Import%20ICD/AD11%20-%20s2k-mcs-icd-0001-tos-gci_51%20-%20SCOS-2000%20Import%20ICD.PDF</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:02Z</dd><dt>SHA-256</dt><dd><code>9128dd5b5b9f0de2de9587917279ff8c7de797d6b0b472dbc62e23f77062fe41</code></dd><dt>Size</dt><dd>1.1 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/icd-5.1-tos-gci.pdf">icd-5.1-tos-gci.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 5.1 (October 2001) of ESOC's SCOS-2000 Database Import ICD, the specification of the Mission Information Base (MIB) as a set of tab-separated ASCII tables that a mission's off-line database exports and the SCOS-2000 importer loads into its run-time database. This copy comes from the Herschel SPIRE archive, where it was an applicable document for the SCOS-2000-based instrument EGSE. Its change log describes it as covering SCOS-2000 R2.3 (to be implemented in R3.0) plus specific additions for EGSE systems.

Chapter 2 fixes the file conventions: one `<table>.dat` file per table, one file per OL synthetic parameter, tab separators, the import-time checks with their fallback values, and the import options. Chapter 3 first maps database items to tables, then summarises 46 tables and defines every field (position, name, type, length, mandatory flag or default). The tables cover monitoring (pcf, caf/cap, txf/txp, mcf, ocf/ocp, pid, pic, tpcf, plf, vpd), displays (dpf/dpc, gpf/gpc, spf/spc, ppf/ppc) and commanding: packet headers (tcp, pcpc, pcdf), commands (ccf, the EGSE-only routing table dst, cpc, cdf, ptv), sequences (csf, css, sdf, csp), verification (cvs, cve, cvp), parameter sets (pst, psv, cps, pvs, psm), de-calibrations (cca/ccs, paf/pas) and range checks (prf/prv).

Appendix A gives the PTC/PFC parameter type codes SCOS-2000 supports, mapped to the ESA PUS (PSS-07-101), with raw value formats. Appendix B draws the table relationships, and Annex 1 lists the DCRs implemented since issue 4.x. Read it alongside later issues to see how the MIB evolved: here curve identifiers are still 4-digit numbers, descriptions are 16 characters, and there are no conditional calibrations, logarithmic curves or groups.


## Key points

- The ICD covers only the 'generic' part of the static database relevant to SCOS-2000 functions; mission-specific extensions are possible. MIB data are exported from the off-line database (e.g. ORACLE, MS-Access) into ASCII files, transferred to the importer directory, imported, and used when applications restart. *(PDF p. 9)*
- The SCOS-2000 Mission Information Base is split into a static part (the 'database') and a dynamic part (the 'history files'). The raw value differs from the encoded value except for unsigned integers; e.g. raw -1 of a 16-bit signed integer is encoded as FFFF hex. *(PDF p. 10)*
- Each table is one ASCII file named after the table in lower case with extension .dat (e.g. pcf.dat); each dynamic OL synthetic parameter is a separate file named after its PCF_NAME, without extension, in a dedicated sub-directory. Fields are tab-separated and mission-specific fields are appended at the end of a record. *(PDF p. 12)*
- Import-time checks truncate over-long fields with a warning, replace null mandatory fields with 0 or an empty string, drop records that break relational integrity, and reset invalid command parameter values to 0, "" or 1970.001.00.00.00; messages go to /home/sops1/Import.log. *(PDF p. 13)*
- Import options are full import (default), monitoring tables only, commanding tables only, selected tables only, and 'check only'. *(PDF p. 13)*
- Key fields are marked with '*' after the field position; grey rows are not used by SCOS-2000; italics mark options not yet supported; 'M' marks mandatory fields; name uniqueness is case-insensitive (A1000 and a1000 clash). *(PDF p. 20)*
- Section 3.2 summarises 46 ASCII tables: vdf; 13 monitoring tables; 6 display tables; and 26 commanding tables including the new dst routing table. *(PDF p. 17)*
- The VDF table is mandatory; if it holds several records the last imported one defines the database version name (VDF_NAME, Char(8)). *(PDF p. 22)*
- PCF is the central monitoring table. PCF_NAME is Char(8) and may not start with 'VAR', 'GVAR' or '$' (reserved by the OL syntax); PCF_DESCR is Char(16); PCF_PID (Number(10)) links a parameter to its on-board parameter ID for PUS variable packets. *(PDF p. 23)*
- PCF_PTC takes values 1 to 13; saved synthetic parameters (PCF_NATUR='S') must use PTC=13. The PCF table has 19 fields in this issue. *(PDF p. 24)*
- A TM packet is identified by the PID key TYPE, STYPE, APID, PI1_VAL and PI2_VAL; several keys may map to one SPID, and PID_VALID selects among records with the same key. The APID/type/subtype-to-SPID allocation should not change once telemetry archiving starts, for the GDDS retrieval services. *(PDF p. 39)*
- The optional DST table (EGSE systems only) gives, per APID, a destination ID of up to 3 dot-separated fields ('NCTRS' by default, or 'EGSE' for spacecraft and non-spacecraft commands, e.g. 'EGSE.TC.0x8800'). *(PDF p. 66)*
- Command parameter calibration and range-set references (CPC_PRFREF, CPC_CCAREF, CPC_PAFREF) are Number(4) in this issue. *(PDF p. 69)*
- Appendix A maps SCOS-2000 PTC/PFC pairs to the PUS; 48- and 64-bit integers (PTC 3/4, PFC 15/16) are not supported. *(PDF p. 105)*
- PTC=5 PFC=3 is a 32-bit MIL-STD-1750A real (normally called PTC=5, PFC=2 in ESA missions) and PTC=5 PFC=4 a 48-bit MIL-STD-1750A real; PTC=6 PFC&gt;0 bit strings are treated as unsigned integers on the monitoring side only. *(PDF p. 106)*
- PTC=11 denotes deduced parameters and PTC=13 saved synthetic parameters. *(PDF p. 110)*
- Absolute times are entered as yyyy.ddd.hh.mm.ss (e.g. 2001.159.23.59.59) and relative times as +/-[ddd.]hh.mm.ss[.mmm]; neither can be associated with a calibration curve. *(PDF p. 112)*
- DCR-266 (EGSE) widens CCF_APID, CCF_RAPID and PID_APID from num(4) to num(5): 0 to 2047 identify on-board APIDs and 2048 to 65535 ground process IDs. DCR-241 adds a command category (CCF_TYPE='S') for which the Releaser appends no CRC. *(PDF p. 120)*


## Cited by these wiki pages (18)

- [Command sequences and parameter sets](../mib/sequences.md)
- [Display definitions in the MIB](../mib/displays.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [History of the Database Import ICD (issues 5.1 to 7.2)](../mib/icd-history.md)
- [How it all fits together](../overview/index.md)
- [MIB data model: how the tables relate](../mib/data-model.md)
- [MIB parameter types: PTC/PFC in SCOS-2000](../mib/parameter-types.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [PUS packet structures: TC and TM headers](../ecss/pus/packets.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [Solar Orbiter STIX instrument database](../missions/solar-orbiter/stix.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)
- [The MIB: Mission Information Base](../mib/index.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (68 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | INTRODUCTION | 9 |
    | 1.5 | REFERENCES | 10 |
    | 2 | INTERFACE OVERVIEW | 12 |
    | 2.1 | ASSUMPTIONS AND CONSTRAINTS | 12 |
    | 2.2 | LOCATION AND NAMING CONVENTION OF THE ASCII FILES | 12 |
    | 2.3 | STRUCTURE OF THE ASCII FILES | 12 |
    | 2.4 | CHECKS APPLIED AT IMPORT TIME | 13 |
    | 2.5 | IMPORT OPTIONS | 13 |
    | 3 | DETAILED INTERFACE SPECIFICATION | 14 |
    | 3.1 | RELATIONSHIP BETWEEN THE ASCII TABLES AND THE DATABASE ITEMS | 14 |
    | 3.2 | SUMMARY OF THE ASCII TABLES | 17 |
    | 3.3 | DETAILED DEFINITION OF THE ASCII TABLES STRUCTURE | 20 |
    | 3.3.1.1 | Database version: vdf | 22 |
    | 3.3.2 | Monitoring Data | 22 |
    | 3.3.2.1.1 | Monitoring parameters characteristics: pcf | 23 |
    | 3.3.2.1.2 | Synthetic parameters | 28 |
    | 3.3.2.1.3 | User Defined Constants | 29 |
    | 3.3.2.1.4 | Dynamic Configuration Variables | 31 |
    | 3.3.2.2.1 | Numerical calibration curves: caf | 32 |
    | 3.3.2.2.2 | Numerical calibration curves definition: cap | 33 |
    | 3.3.2.2.3 | Textual calibrations: txf | 33 |
    | 3.3.2.2.4 | Textual calibrations definition: txp | 34 |
    | 3.3.2.2.5 | Polynomial calibration curves: mcf | 34 |
    | 3.3.2.3.1 | Monitoring checks: ocf | 35 |
    | 3.3.2.3.2 | Monitoring checks definition: ocp | 36 |
    | 3.3.2.4.1 | Packets identification: pid | 38 |
    | 3.3.2.4.2 | Packets identification criteria: pic | 42 |
    | 3.3.2.4.3 | Telemetry packets characteristics: tpcf | 43 |
    | 3.3.2.5.1 | Parameters location in fixed packets: plf | 44 |
    | 3.3.2.5.2 | Variable packet definition: vpd | 45 |
    | 3.3.2.6.1 | Alphanumeric displays: dpf | 50 |
    | 3.3.2.6.2 | Alphanumeric displays definition: dpc | 51 |
    | 3.3.2.6.3 | Graphic displays: gpf | 52 |
    | 3.3.2.6.4 | Graphic displays definition: gpc | 54 |
    | 3.3.2.6.5 | Scrolling displays: spf | 55 |
    | 3.3.2.6.6 | Scrolling displays definition: spc | 56 |
    | 3.3.2.6.7 | Printout proforma: ppf | 57 |
    | 3.3.2.6.8 | Printout proforma definition: ppc | 58 |
    | 3.3.3 | Commanding data | 59 |
    | 3.3.3.1.1 | Packet headers characteristics: tcp | 60 |
    | 3.3.3.1.2 | Packet headers parameters: pcpc | 60 |
    | 3.3.3.1.3 | Packet headers definition: pcdf | 61 |
    | 3.3.3.2.1 | Command characteristics: ccf | 62 |
    | 3.3.3.2.1.1 | Command routing: DST | 66 |
    | 3.3.3.2.2 | Command parameters: cpc | 67 |
    | 3.3.3.2.3 | Commands definition: cdf | 70 |
    | 3.3.3.2.4 | Commands pre-transmission validation: ptv | 73 |
    | 3.3.3.3.1 | Command sequence characteristics: csf | 77 |
    | 3.3.3.3.2 | Command sequences definition: css | 78 |
    | 3.3.3.3.3 | Command sequence element parameters: sdf | 87 |
    | 3.3.3.3.4 | Command sequence formal parameters: csp | 89 |
    | 3.3.3.4.1 | Verification stages file: cvs | 93 |
    | 3.3.3.4.2 | Verification expressions: cve | 94 |
    | 3.3.3.4.3 | Verification profiles: cvp | 96 |
    | 3.3.3.5.1 | Parameter sets: pst | 97 |
    | 3.3.3.5.2 | Parameter value sets: psv | 97 |
    | 3.3.3.5.3 | Parameter sets definition: cps | 97 |
    | 3.3.3.5.4 | Parameter value sets definition: pvs | 98 |
    | 3.3.3.5.5 | Parameter sets mapping to commands/sequences: psm | 99 |
    | 3.3.3.6.1 | Numerical (de-)calibration curves: cca | 99 |
    | 3.3.3.6.2 | Numerical (de-)calibration curves definition: ccs | 100 |
    | 3.3.3.6.3 | Textual (de-)calibrations: paf | 101 |
    | 3.3.3.6.4 | Textual (de-)calibrations definitions: pas | 101 |
    | 3.3.3.7.1 | Parameter range sets: prf | 102 |
    | 3.3.3.7.2 | Parameter range values: prv | 103 |
    | Appendix A | SCOS-2000 Parameter Types | 105 |
    | Appendix B | SCOS-2000 Database Import Tables Overview | 113 |
    | Annex 1 | List of implemented Document Changes | 119 |


## Documents this one references (20)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-1 | [S2K-MCS-SRD-0003-TOS-GCI](../references/index.md#ref-s2k-mcs-srd-0003-tos-gci) | SCOS-2000 Monitoring SRD |  | applicable |
| AD-2 | [S2K-MCS-SRD-0002-TOS-GCI](../references/index.md#ref-s2k-mcs-srd-0002-tos-gci) | SCOS-2000 Commanding SRD |  | applicable |
| AD-3 | [S2K-MCS-SRD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-srd-0001-tos-gci) | SCOS-2000 System Level SRD |  | applicable |
| RD-1 | [S2K-MCS-SUM-0002-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0002-tos-gci) | SCOS-2000 Configuration and Installation Guide |  | reference |
| RD-2 | [S2K-MCS-ADD-0007-TOS-GCI](../references/index.md#ref-s2k-mcs-add-0007-tos-gci) | SCOS-2000 Operations Language ADD |  | reference |
| RD-3 | [S2K-MCS-GLO-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-glo-0001-tos-gci) | SCOS-2000 Glossary, Definitions and Acronyms |  | reference |
| RD-4 | [TERMA/SSSL/IMCS/MAN/0002](../references/index.md#ref-terma-sssl-imcs-man-0002) | Integral Mission Control System Database Subsystem SUM | Issue 1.0 | reference |
| RD-5 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |
| RD-6 | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) · [library](esa-pss-07-101-issue1-may1994.md) | Packet Utilisation Standard | Issue 1 May 1994 | reference |
| RD-7 | [RO-ESC-IF-5002](../references/index.md#ref-ro-esc-if-5002) | Rosetta Space/Ground ICD | Issue 1 August 1998 | reference |
| RD-8 | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | CCSDS Time Code Formats | Issue 2 April 1990 | reference |
| RD-9 | [S2K-MCS-SUM-0019-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0019-tos-gci) | SCOS-2000 Synthetic Parameters SUM |  | reference |
| RD-10 | [S2K-MCS-SUM-0026-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0026-tos-gci) | SCOS-2000 Events & Actions SUM |  | reference |
| RD-11 | [S2K-MCS-SUM-0018-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0018-tos-gci) | SCOS-2000 MIB Applications SUM |  | reference |
| RD-12 | [S2K-MCS-ICD-0002-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0002-tos-gci) | SCOS-2000 Stack Import ICD |  | reference |
| RD-13 | [S2K-MCS-ICD-0003-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0003-tos-gci) | SCOS-2000 Task Parameter File ICD |  | reference |
| RD-14 | [ESA PSS-074-107](../references/index.md#ref-esa-pss-074-107) | ESA Packet Telecommand Standard | Issue 2.0 April 1992 | reference |
| RD-15 | [S2K-MCS-SUM-2210-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2210-tos-gci) | SCOS-2000 Telemetry Desktop Operator User Manual |  | reference |
|  | [MIL STD 1750A](../references/index.md#ref-mil-std-1750a) | MIL-STD-1750A floating point formats (32-bit and 48-bit reals, PTC=5 PFC=3/4) |  | mentioned |
|  | [IEEE Std 754-1985](../references/index.md#ref-ieee-std-754-1985) | IEEE floating point standard (encoding of PTC=5 PFC=1/2 reals) |  | mentioned |

!!! note "Notes"
    This copy comes from the Herschel SPIRE document archive: the cover carries the stamp SPIRE-ESA-DOC-002339, and the file name labels it 'AD11 - s2k-mcs-icd-0001-tos-gci_51'. Printed page 1 is PDF page 9 (offset +8). The copyright line reads 1998. The text extraction inserts spaces into document numbers (e.g. 'S2K-MCS -SRD-0003-TOS-GCI' and the running header 'S2K-MCS -ICD-0001-TOS-GCI'); these are normalised here to the cover form without spaces. RD-14 is printed 'ESA PSS-074-107' (the ESA Packet Telecommand Standard is usually numbered PSS-04-107). The table of contents lists 'Annex 1 – List of implemented Document Changes' twice. The PID table numbers both PID_EVENT and PID_EVID as field 15 (p. 42). The 3.2 summary omits the ppf/ppc printout tables, which are nevertheless defined in sections 3.3.2.6.7-8. Appendix B figures are diagrams; their extracted text is fragmentary. Related library items: later issues icd-6-7-drafta, icd-6-9-archive-org and icd-7-0-final; Herschel tailoring documents h-p-1-asp-tn-1060-mib-processing-hpsdb (which cites this issue as AD2) and hcss-mib-clarification-tailoring-note (which cites issue 5.2). RD-8 CCSDS 301.0-B-2 is an older issue of library item ccsds-301-0-301x0b4e1.

