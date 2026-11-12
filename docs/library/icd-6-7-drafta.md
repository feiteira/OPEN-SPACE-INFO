---
title: "SCOS-2000 Database Import ICD, version 6.7 Draft A"
description: "Draft A of version 6.7 (December 2009) of the SCOS-2000 Database Import ICD, now numbered EGOS-MCS-S2K-ICD-0001 under ESA/OPS-GIC."
tags: ["Interface Control Document", "MIB / Database Import ICD"]
sources: [icd-6-7-drafta]
---

# SCOS-2000 Database Import ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-MCS-S2K-ICD-0001</dd><dt>Issue / version</dt><dd>Version 6.7DraftA</dd><dt>Date</dt><dd>2009-12-01</dd><dt>Organisation</dt><dd>ESA/OPS-GIC (ESOC), SCOS-2000 Team</dd><dt>Authors</dt><dd>SCOS-2000 R5.2 Team, R. Southworth, T. Zimmer, M.Pecchioli</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Draft (version 6.7 Draft A, 01/12/09: updates for R4.5 and R5.2.0i1, change log p. 5). Superseded by 6.7 Draft B (20/02/2010), Draft C (24/05/2010) and the final 6.9 (06/07/2010), per the change log of icd-6-9-archive-org (pp. 5-6), and later by 7.0.</dd><dt>Pages</dt><dd>244</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://redmine.oas.inaf.it/attachments/download/595/egos-mcs-s2k-icd-0001-version67DraftA%20mib.pdf" rel="noopener">https://redmine.oas.inaf.it/attachments/download/595/egos-mcs-s2k-icd-0001-version67DraftA%20mib.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:53:58Z</dd><dt>SHA-256</dt><dd><code>1365a089508d4ead1b2f4dd1565c11385a5dd30e059291580aa51a68291f6d9d</code></dd><dt>Size</dt><dd>2.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/icd-6.7-draftA.pdf">icd-6.7-draftA.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Draft A of version 6.7 (December 2009) of the SCOS-2000 Database Import ICD, now numbered EGOS-MCS-S2K-ICD-0001 under ESA/OPS-GIC. It specifies the MIB ASCII tables imported into the SCOS-2000 run-time database and documents SCOS-2000 releases R4.5 and R5.2. The copy was found on an INAF-OAS Redmine project server.

Compared with issue 5.1 it adds multi-domain installations, in which each domain has its own database and a General Domain holds multi-domain synthetic parameters. From R5.0, command sequence and TM display definitions are converted to XML and stored in the FARC instead of the run-time database, with a delta import. The table set grows to 51 with conditional calibration selection (cur), logarithmic calibrations (lgf) and parameter/packet groups (grp, grpa, grpk), all repatriated from the Herschel/Planck CCS. Calibration and range-set identifiers become 10-character strings, PCF descriptions grow to 24 characters, and PCF gains time-correlation and archive fields (PCF_CORR, PCF_OBTID, PCF_DARC, PCF_ENDIAN). Unix-format absolute time (PTC 9, PFC 30) and NIS/SLE throw-event command types also appear.

A new Appendix C explains how SCOS-2000 supports the PUS service by service (1 to 19): data-type restrictions, the ban on using variable packets for regular housekeeping, service 1 report-based verification, the on-board schedule model for service 11, time correlation for service 9, and services that need mission-specific code. Annex 1 lists document changes by release from R4.0 to R5.2. This draft is useful for dating when each MIB feature appeared.


## Key points

- Version 6.4 moved TC sequence and TM display definitions out of the POST MIB database into the FARC as XML files and added the SLE throw-event (TE) command type; 6.7 Draft A adds updates for R4.5 and R5.2.0i1. *(PDF p. 5)*
- The dynamic part of the MIB is now called the 'packet archive' (it was the 'history files' in earlier issues). *(PDF p. 16)*
- SCOS-2000 manages multiple 'domains', each with its own database ASCII files; the General Domain also needs a multi-domain database that only defines multi-domain synthetic parameters. *(PDF p. 19)*
- Every field of a record must contain at least the separator, so null fields hold only the tab character. *(PDF p. 20)*
- An off-line database consistency checker is delivered with the main SCOS-2000 release test environment from R4.0. *(PDF p. 21)*
- From SCOS-2000 R5.0, sequence and display ASCII tables are converted on request into XML files imported into the FARC (not the POST run-time database), using a 'delta' approach that only updates the definitions supplied. *(PDF p. 22)*
- PCF_DESCR is Char(24) (S2K-SPR-3797) and PCF_CURTX is Char(10). *(PDF p. 38)*
- The PCF table has 23 fields; new fields 20-23 are PCF_CORR and PCF_OBTID (time correlation per on-board time ID), PCF_DARC (DARC integration) and PCF_ENDIAN (little-endian support). *(PDF p. 50)*
- The cur table associates calibration definitions with monitoring parameters, one record per parameter/calibration couple, so a parameter can have multiple calibrations; static PTV checks may then not use its engineering value. *(PDF p. 58)*
- Absolute time in Unix format, PTC=9 PFC=30 (8 octets), is listed as a SCOS-2000 extension not defined in the PUS. *(PDF p. 207)*
- Appendix C lists PUS data-type exceptions: integers limited to 32 bits, (5,4) only for TC encoding, no variable bit strings (6,0), variable octet/character strings only for TC encoding, and no p-field absolute time (9,0). *(PDF p. 220)*
- SCOS-2000 adds two special TC parameter types: 'Parameter ID' (encoded as the on-board PID of a named TM parameter, e.g. for TC(4,6) or TC(12,1)) and 'Command ID' (encoded as the raw bytes of a named command, e.g. for TC(19,1)). *(PDF p. 220)*
- Variable TM packets cannot take part in full TM processing (validity, monitoring checks, verification, synthetic parameters), so they should not carry regular housekeeping data. *(PDF p. 221)*
- For PUS service 1, the Verifier extracts the 4 bytes echoing the TC packet ID and sequence control, which must sit at the same position in all type 1 packets; progress reports can only map to progress stage 0, and failure codes are ignored. *(PDF p. 222)*
- New service 3 housekeeping packets must be defined in the TM/TC database before they are enabled on board; parameter time offsets and packet generation intervals are static database values. *(PDF p. 223)*
- SCOS-2000 time correlation using service 9 time reports, for free-running and synchronised clocks, is only available from R5.2; earlier it was mission-specific. *(PDF p. 225)*
- DCR-2421 raises the maximum PCF_PID and PID_SPID values from 2^31-1 to 2^32-1. *(PDF p. 231)*
- Functions repatriated from the Herschel & Planck Check Out System include calibration curve selection, delta limits (a change of engineering value above a threshold is out of limit) and enable/inhibit of parameters. *(PDF p. 231)*
- Further repatriated changes: enable/inhibit of packets, named parameter and packet groups, calibration curve identifiers changed from NUM(4) to CHAR(10), verification stage IDs from NUM(5) to NUM(8) and range set IDs from NUM(4) to CHAR(10). *(PDF p. 232)*
- The logarithmic calibration (LGF), designed for platinum thermistor temperatures, computes Y = 1 / [A0 + A1 ln(X) + A2 ln^2(X) + A3 ln^3(X) + A4 ln^4(X)]. *(PDF p. 233)*
- From R5.0, mapping different TM packets to the same SPID is deprecated, because packets are now stored in a database. *(PDF p. 241)*


## Cited by these wiki pages (8)

- [Display definitions in the MIB](../mib/displays.md)
- [History of the Database Import ICD (issues 5.1 to 7.2)](../mib/icd-history.md)
- [How it all fits together](../overview/index.md)
- [MIB parameter types: PTC/PFC in SCOS-2000](../mib/parameter-types.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The MIB: Mission Information Base](../mib/index.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (77 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | INTRODUCTION | 14 |
    | 1.4 | REFERENCES | 17 |
    | 2 | INTERFACE OVERVIEW | 19 |
    | 2.1 | ASSUMPTIONS AND CONSTRAINTS | 19 |
    | 2.2 | LOCATION AND NAMING CONVENTION OF THE ASCII FILES | 19 |
    | 2.3 | STRUCTURE OF THE ASCII FILES | 20 |
    | 2.4 | CHECKS APPLIED AT IMPORT TIME | 20 |
    | 2.5 | IMPORT OPTIONS | 21 |
    | 3 | DETAILED INTERFACE SPECIFICATION | 23 |
    | 3.1 | RELATIONSHIP BETWEEN THE ASCII TABLES AND THE DATABASE ITEMS | 23 |
    | 3.2 | SUMMARY OF THE ASCII TABLES | 28 |
    | 3.3 | DETAILED DEFINITION OF THE ASCII TABLES STRUCTURE | 33 |
    | 3.3.1.1 | Database version: vdf | 35 |
    | 3.3.2 | Monitoring Data | 36 |
    | 3.3.2.1.1 | Monitoring parameters characteristics: pcf | 37 |
    | 3.3.2.1.2 | Synthetic parameters | 51 |
    | 3.3.2.1.3 | User Defined Constants | 55 |
    | 3.3.2.1.4 | Dynamic Configuration Variables | 57 |
    | 3.3.2.2.1 | Calibration conditional selection: cur | 58 |
    | 3.3.2.2.2 | Numerical calibrations: caf | 61 |
    | 3.3.2.2.3 | Numerical calibrations definition: cap | 63 |
    | 3.3.2.2.4 | Textual calibrations: txf | 64 |
    | 3.3.2.2.5 | Textual calibrations definition: txp | 65 |
    | 3.3.2.2.6 | Polynomial calibrations definitions: mcf | 66 |
    | 3.3.2.2.7 | Logarithmic calibrations definitions: lgf | 67 |
    | 3.3.2.3.1 | Monitoring checks: ocf | 68 |
    | 3.3.2.3.2 | Monitoring checks definition: ocp | 70 |
    | 3.3.2.4.1 | Packets identification: pid | 77 |
    | 3.3.2.4.2 | Packets identification criteria: pic | 85 |
    | 3.3.2.4.3 | Telemetry packets characteristics: tpcf | 87 |
    | 3.3.2.5.1 | Parameters location in fixed packets: plf | 91 |
    | 3.3.2.5.2 | Variable packet definition: vpd | 93 |
    | 3.3.2.6.1 | Monitoring groups definition: grp | 102 |
    | 3.3.2.6.2 | Parameters groups: grpa | 102 |
    | 3.3.2.6.3 | Telemetry packets groups: grpk | 103 |
    | 3.3.2.7.1 | Alphanumeric displays: dpf | 104 |
    | 3.3.2.7.2 | Alphanumeric displays definition: dpc | 104 |
    | 3.3.2.7.3 | Graphic displays: gpf | 107 |
    | 3.3.2.7.4 | Graphic displays definition: gpc | 109 |
    | 3.3.2.7.5 | Scrolling displays: spf | 113 |
    | 3.3.2.7.6 | Scrolling displays definition: spc | 114 |
    | 3.3.2.7.7 | Printout proforma: ppf | 116 |
    | 3.3.2.7.8 | Printout proforma definition: ppc | 117 |
    | 3.3.3 | Commanding data | 119 |
    | 3.3.3.1.1 | Packet headers characteristics: tcp | 121 |
    | 3.3.3.1.2 | Packet headers parameters: pcpc | 121 |
    | 3.3.3.1.3 | Packet headers definition: pcdf | 122 |
    | 3.3.3.2.1 | Command characteristics: ccf | 124 |
    | 3.3.3.2.1.1 | Command routing: DST | 132 |
    | 3.3.3.2.2 | Command parameters: cpc | 133 |
    | 3.3.3.2.3 | Commands definition: cdf | 141 |
    | 3.3.3.2.4 | Commands pre-transmission validation: ptv | 149 |
    | 3.3.3.3.1 | Command sequence characteristics: csf | 154 |
    | 3.3.3.3.2 | Command sequences definition: css | 157 |
    | 3.3.3.3.3 | Command sequence element parameters: sdf | 168 |
    | 3.3.3.3.4 | Command sequence formal parameters: csp | 173 |
    | 3.3.3.4.1 | Verification stages file: cvs | 180 |
    | 3.3.3.4.2 | Verification expressions: cve | 182 |
    | 3.3.3.4.3 | Verification profiles: cvp | 186 |
    | 3.3.3.5.1 | Parameter sets: pst | 188 |
    | 3.3.3.5.2 | Parameter value sets: psv | 188 |
    | 3.3.3.5.3 | Parameter sets definition: cps | 188 |
    | 3.3.3.5.4 | Parameter value sets definition: pvs | 189 |
    | 3.3.3.5.5 | Parameter sets mapping to commands/sequences: psm | 191 |
    | 3.3.3.6.1 | Numerical (de-)calibration curves: cca | 192 |
    | 3.3.3.6.2 | Numerical (de-)calibration curves definition: ccs | 194 |
    | 3.3.3.6.3 | Textual (de-)calibrations: paf | 195 |
    | 3.3.3.6.4 | Textual (de-)calibrations definitions: pas | 196 |
    | 3.3.3.7.1 | Parameter range sets: prf | 197 |
    | 3.3.3.7.2 | Parameter range values: prv | 199 |
    | Appendix A | SCOS-2000 Parameter Types | 200 |
    | Appendix B | SCOS-2000 Database Import Tables Overview | 214 |
    | Appendix C | SCOS-2000 Support of Packet Utilisation Standard (PUS) | 219 |
    | Appendix C, 1. | SUPPORT OF PUS DATA TYPES | 220 |
    | Appendix C, 2. | SUPPORT OF PUS DATA STRUCTURES | 221 |
    | Appendix C, 3. | SPECIFIC SUPPORT OF TM/TC SERVICES | 222 |
    | Annex 1 | List of implemented Document Changes | 229 |


## Documents this one references (28)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-1 | [SRD-0003](../references/index.md#ref-srd-0003) | SCOS-2000 Monitoring SRD |  | applicable |
| AD-2 | [SRD-0002](../references/index.md#ref-srd-0002) | SCOS-2000 Commanding SRD |  | applicable |
| AD-3 | [SRD-0001](../references/index.md#ref-srd-0001) | SCOS-2000 System Level SRD |  | applicable |
| AD-4 | [ICD-0051](../references/index.md#ref-icd-0051) | SCOS-2000 TC Sequences definitions ICD |  | applicable |
| AD-5 | [ICD-5001](../references/index.md#ref-icd-5001) | SCOS-2000 TM Displays and Printout definitions Service ICD |  | applicable |
| CNF-01 | [CIDL-0001](../references/index.md#ref-cidl-0001) | SCOS-2000 Document Control List |  | reference |
| RD-1 | [SUM-0002](../references/index.md#ref-sum-0002) | SCOS-2000 Configuration and Installation Guide |  | reference |
| RD-2 | [ADD-0007](../references/index.md#ref-add-0007) | SCOS-2000 Operations Language ADD |  | reference |
| RD-3 | [GLO-0001](../references/index.md#ref-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms |  | reference |
| RD-4 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |
| RD-5 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |
| RD-6 | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) · [library](esa-pss-07-101-issue1-may1994.md) | Packet Utilisation Standard | Issue 1 May 1994 | reference |
| RD-7 | [RO-ESC-IF-5002](../references/index.md#ref-ro-esc-if-5002) | Rosetta Space/Ground ICD | Issue 1 August 1998 | reference |
| RD-8 | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | CCSDS Time Code Formats | Issue 2 April 1990 | reference |
| RD-9 | [SUM-0019](../references/index.md#ref-sum-0019) | SCOS-2000 Synthetic Parameters SUM |  | reference |
| RD-10 | [SUM-0026](../references/index.md#ref-sum-0026) | SCOS-2000 Events & Actions SUM |  | reference |
| RD-11 | [SUM-0018](../references/index.md#ref-sum-0018) | SCOS-2000 MIB Applications SUM |  | reference |
| RD-12 | [ICD-0002](../references/index.md#ref-icd-0002) | SCOS-2000 Stack Import ICD |  | reference |
| RD-13 | [ICD-0003](../references/index.md#ref-icd-0003) | SCOS-2000 Task Parameter File ICD |  | reference |
| RD-14 | [ESA PSS-074-107](../references/index.md#ref-esa-pss-074-107) | ESA Packet Telecommand Standard | Issue 2.0 April 1992 | reference |
| RD-15 | [SUM-2210](../references/index.md#ref-sum-2210) | SCOS-2000 Telemetry Desktop Operator User Manual |  | reference |
| RD-16 | [ICD-0011](../references/index.md#ref-icd-0011) | SCOS-2000 Telemetry Parameter Injection ICD |  | reference |
| RD-17 | [ADD-0003](../references/index.md#ref-add-0003) | SCOS-2000 Telemetry Monitoring ADD |  | reference |
| RD-18 | [EGOS-NIS-NCTR-ICD-0002](../references/index.md#ref-egos-nis-nctr-icd-0002) | NCTRA-NIS/MCS ICD Volume 2 | Issue 3.1 July 2005 | reference |
| RD-19 | [EGOS-NIS-NIS-ICD-0003](../references/index.md#ref-egos-nis-nis-icd-0003) | NIS Throw Events ICD | Issue 1.3 November 2007 | reference |
| RD-20 | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Ground Systems And Operations – Telemetry And Telecommand Packet Utilisation Standard (PUS). This document will be replaced by ECSS- E-ST-70-41C |  | reference |
|  | [MIL STD 1750A](../references/index.md#ref-mil-std-1750a) | MIL-STD-1750A floating point formats (32-bit and 48-bit reals, PTC=5 PFC=3/4) |  | mentioned |
|  | [IEEE Std 754-1985](../references/index.md#ref-ieee-std-754-1985) | IEEE floating point standard (encoding of PTC=5 PFC=1/2 reals) |  | mentioned |

!!! note "Notes"
    Draft document obtained from an INAF-OAS Redmine attachment (file 'egos-mcs-s2k-icd-0001-version67DraftA mib.pdf'). The cover prints the status 'Version 6.7DraftA' and the running header 'Issue: 6. 7DraftA'. Printed page 1 is PDF page 14 (offset +13). Both PURPOSE and SCOPE are numbered 1.1 in chapter 1, so later chapter-1 numbers are shifted. The 6.6 change-log entry has no date. Appendix C cites PUS sections as 'Section 23.5 of [AD-2]' and 'Section 6 of [AD-5]', but AD-2 and AD-5 in this document are the Commanding SRD and the TM displays ICD; the intended target appears to be the PUS (RD-6 or RD-20). RD-14 is printed 'ESA PSS-074-107'. Annex 1 misspells 'Hershel & Planck'. Related library items: icd-5-1-tos-gci, icd-6-9-archive-org, icd-7-0-final; RD-20 corresponds to ecss-e-70-41a-30jan2003-pus.

