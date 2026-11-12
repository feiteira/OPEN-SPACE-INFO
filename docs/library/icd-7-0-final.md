---
title: "SCOS-2000 Database Import ICD, version 7.0"
description: "Version 7.0 (August 2017) of ESOC's SCOS-2000 Database Import ICD (EGOS-MCS-S2K-ICD-0001), the reference definition of the SCOS-2000 Mission Information Base (MIB) as tab-separated ASCII tables."
tags: ["Interface Control Document", "MIB / Database Import ICD"]
sources: [icd-7-0-final]
---

# SCOS-2000 Database Import ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-MCS-S2K-ICD-0001</dd><dt>Issue / version</dt><dd>Version 7.0 - FINAL</dd><dt>Date</dt><dd>2017-08-11</dd><dt>Organisation</dt><dd>ESA/OPS-GIC (ESOC), SCOS-2000 GIMUS Team</dd><dt>Authors</dt><dd>SCOS-2000 GIMUS Team, Sylvie Haag, Peter Collins</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Final version 7.0 of 11/08/2017 (cover and change log, pp. 1 and 6); verified 2017-08-18 and approved 2017-08-22 by digital signature (p. 2). It is the newest ICD issue in the library. The source site files it as the MOC-applicable MIB ICD for Solar Orbiter (source URL). Later issues are not stated in the document; the wiki's MIB schema (tools/pyscos2000_schema_icd72.json) follows ICD 7.2, which is not in the library.</dd><dt>Pages</dt><dd>263</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/MOC/MOC-applicable%20MIB%20egos-mcs-s2k-icd-0001-version7.0-FINAL.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/MOC/MOC-applicable%20MIB%20egos-mcs-s2k-icd-0001-version7.0-FINAL.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:53:46Z</dd><dt>SHA-256</dt><dd><code>519a77e30a8123782ec75e97d6c574c10e9aea1e36bd2507e94f4f78f7f95513</code></dd><dt>Size</dt><dd>1.9 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/icd-7.0-final.pdf">icd-7.0-final.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Version 7.0 (August 2017) of ESOC's SCOS-2000 Database Import ICD (EGOS-MCS-S2K-ICD-0001), the reference definition of the SCOS-2000 Mission Information Base (MIB) as tab-separated ASCII tables. This copy was published on the Solar Orbiter instrument-team site as the MIB ICD applicable to the Solar Orbiter MOC, so it is the closest available specification for reading the public Solar Orbiter MIB.

Chapter 2 sets the rules: Unix-format files with one table per `<table>.dat`, tab separators with every field present, synthetic parameter expression files, per-domain databases, import checks with their fallback values, and the R5 handling of sequences and displays as XML in the FARC. Chapter 3 maps database items to tables, summarises the 51 tables and defines every field with type, length, key and mandatory/default markers. It covers monitoring parameters (PCF with 23 fields), synthetic parameters, user-defined constants, dynamic configuration variables, system-control parameters, the calibrations (cur, caf/cap, txf/txp, mcf, lgf), limit checks (ocf/ocp), packet identification and decoding (pid, pic, tpcf, plf, vpd), groups and displays, and on the commanding side TC headers, commands (ccf, dst, cpc, cdf, ptv), sequences, verification, parameter sets, de-calibrations and range checks.

Appendix A lists every supported PTC/PFC pair, including Unix time (9,30), and the raw value formats. Appendix B shows the table relationships, and Appendix C describes PUS support and limitations per service. Annex 1 repeats the change history, and the new Annex 2 lists the 7.0 changes by S2K ticket. Among them: Unix file format, reserved ground-station parameter names, PIC_APID as a key, maximum TC parameter sizes, the TC(11,4) time-tag wrapper, and future CPC_ENDIAN and VPD_FIXREP=-1 extensions.


## Key points

- Version 7.0 Final (11/08/2017) is updated for S2K-6680, S2K-8073, S2K-8325, S2K-8137, S2K-8353, S2K-8560, S2K-8528, S2K-7551, S2K-7749, S2K-7750, S2K-6884, S2K-8572, S2K-8063, S2K-8681, S2K-8782, S2K-8226 and S2K-8778, detailed in Annex 2. *(PDF p. 6)*
- RD-1 is now CG-0003 'SCOS-2000 Configuration Variables' and RD-15 is EGOS-EUD-S2K-SUM-1001 'EUD4S2K Software User Manual'. *(PDF p. 19)*
- The ASCII files are in Unix format (S2K-7551); the example off-line database is now only MS ACCESS, the ORACLE reference having been removed (S2K-8137). *(PDF p. 21)*
- Each record must contain every field, at least as a separator; null fields contain only the tab character. *(PDF p. 22)*
- Section 3.2 summarises 51 ASCII tables, from vdf to prv, including cur, lgf, grp, grpa, grpk and the optional dst routing table. *(PDF p. 30)*
- PCF_NAME (Char(8)) may not start with 'VAR', 'GVAR' or '$', and the names NNOiiii, CEBiiii, KRUiiii, MSPiiii, VL2iiii, PERiiii, REDiiii and MLGiiii (iiii = 0000-9999) are reserved for ground-station telemetry. *(PDF p. 41)*
- The PCF table has 23 fields (PCF_NAME ... PCF_ENDIAN); PCF_DESCR is Char(24) and PCF_CURTX Char(10). *(PDF p. 41)*
- System Control parameters: the SCTL application stores the status of monitored SCOS-2000 server families as TM packets, and SCTLgenerateMIB generates the corresponding MIB entries before SCTL first runs. *(PDF p. 62)*
- The PID table has 16 fields; PID_TYPE, PID_STYPE, PID_APID, PID_PI1_VAL, PID_PI2_VAL and PID_SPID are marked as key fields, and PID_APID is Number(5). *(PDF p. 84)*
- The maximum command size comes from MISC variable CMDP_MAX_BLOCK_SIZE (default 248 bytes), reduced by the header (sum of PCDF_LEN), the CRC (CMD_CRC_SIZE, default 2 bytes) and, for time-tagged commands, the TC(11,4) wrapper (CMD_LOAD_TT_NAME, default 20 bytes). *(PDF p. 132)*
- Commands can be destined to the spacecraft or to other control domains such as ground equipment; throw-event commands (from R5.0) are encoded per [RD-18] for SLE and [RD-19] for NIS throw events and cannot be blocked with other entries. *(PDF p. 132)*
- The CCF table has 21 fields, the last being CCF_SUBSCHED (Number(5)). *(PDF p. 140)*
- CPC has 16 fields; CPC_CORR and CPC_OBTID support time-correlated encoding of time parameters, and CPC_ENDIAN (default 'B') is a future extension (S2K-7749). *(PDF p. 150)*
- CVS has 7 fields; the optional CVS_UNCERTAINTY gives a stage-specific verification window that overrides the default in the TM Spacon. *(PDF p. 194)*
- Absolute time PTC=9 PFC=30 (Unix format, 8 octets: 4 bytes of seconds since 1 January 1970 followed by 4 bytes of microseconds) is supported although it is not defined in the PUS. *(PDF p. 221)*
- Appendix C: SCOS-2000 encodes and decodes all PUS packet types within the data-type limits, and describes service-specific processing such as service 1 report-based verification and the service 11 ground image of the on-board schedule. *(PDF p. 237)*
- Annex 2 lists the 7.0 changes with the applicable SCOS releases, e.g. S2K-8073 (maximum TC parameter sizes, 5.5.3/6.0.0 or higher), S2K-8528 (PIC_APID part of the key, 4.2 or higher) and S2K-8226 (TC(11,4) encoding according to CDF, 5.5.4 and higher). *(PDF p. 261)*
- S2K-6884 lists reserved parameter names, S2K-8572 and S2K-8778 forbid PCF_CORR/CPC_CORR='Y' for relative-time parameters, and S2K-7750 adds the future VPD_FIXREP value '-1'. *(PDF p. 262)*


## Cited by these wiki pages (78)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [COP-1: FOP-1, FARM-1 and the CLCW (CCSDS 232.1-B-2)](../ccsds/cop-1.md)
- [Calibration in the MIB](../mib/calibration.md)
- [Command sequences and parameter sets](../mib/sequences.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Commanding in the MIB: commands and their parameters](../mib/commanding.md)
- [Display definitions in the MIB](../mib/displays.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS-E-ST-70-31C: monitoring and control data definition](../ecss/e-st-70-31c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [EDDS request and data formats](../scos2000/edds-formats.md)
- [Encapsulation Packet Protocol (CCSDS 133.1-B-3)](../ccsds/encapsulation.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [History of the Database Import ICD (issues 5.1 to 7.2)](../mib/icd-history.md)
- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [How it all fits together](../overview/index.md)
- [MIB Explorer](../explorer/index.md)
- [MIB data model: how the tables relate](../mib/data-model.md)
- [MIB parameter types: PTC/PFC in SCOS-2000](../mib/parameter-types.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Missions](../missions/index.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Monitoring in the MIB: parameters and packets](../mib/monitoring.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [PUS message type catalogue](../ecss/pus/message-types.md)
- [PUS packet structures: TC and TM headers](../ecss/pus/packets.md)
- [PUS parameter types (PTC/PFC)](../ecss/pus/parameter-types.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
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
- [ST[22] Position-based scheduling](../ecss/pus/st22-position-based-scheduling.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [Space Packet Protocol (CCSDS 133.0-B-2)](../ccsds/space-packet.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)
- [TC Space Data Link Protocol (CCSDS 232.0-B-4)](../ccsds/tc-sdlp.md)
- [TDRS: Telemetry Data Retrieval Service](../scos2000/tdrs.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [The MIB: Mission Information Base](../mib/index.md)
- [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md)
- [The standards landscape](../overview/standards-map.md)
- [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)
- [Unified Space Data Link Protocol (CCSDS 732.1-B-3)](../ccsds/uslp.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)
- [Worked example: building a real Solar Orbiter telecommand](../overview/worked-example-tc.md)
- [Worked example: decoding a real Solar Orbiter telemetry packet](../overview/worked-example-tm.md)
- [XTCE: XML Telemetric and Command Exchange (CCSDS 660)](../ccsds/xtce.md)


??? abstract "Contents (79 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | INTRODUCTION | 15 |
    | 1.4 | REFERENCES | 18 |
    | 2 | INTERFACE OVERVIEW | 21 |
    | 2.1 | ASSUMPTIONS AND CONSTRAINTS | 21 |
    | 2.2 | LOCATION AND NAMING CONVENTION OF THE ASCII FILES | 21 |
    | 2.3 | STRUCTURE OF THE ASCII FILES | 22 |
    | 2.4 | CHECKS APPLIED AT IMPORT TIME | 22 |
    | 2.5 | IMPORT OPTIONS | 23 |
    | 3 | DETAILED INTERFACE SPECIFICATION | 25 |
    | 3.1 | RELATIONSHIP BETWEEN THE ASCII TABLES AND THE DATABASE ITEMS | 25 |
    | 3.2 | SUMMARY OF THE ASCII TABLES | 30 |
    | 3.3 | DETAILED DEFINITION OF THE ASCII TABLES STRUCTURE | 35 |
    | 3.3.1.1 | Database version: vdf | 37 |
    | 3.3.2 | Monitoring Data | 38 |
    | 3.3.2.1.1 | Monitoring parameters characteristics: pcf | 40 |
    | 3.3.2.1.2 | Synthetic parameters | 55 |
    | 3.3.2.1.3 | User Defined Constants | 58 |
    | 3.3.2.1.4 | Dynamic Configuration Variables | 60 |
    | 3.3.2.1.5 | System Control Parameters | 62 |
    | 3.3.2.2.1 | Calibration conditional selection: cur | 63 |
    | 3.3.2.2.2 | Numerical calibrations: caf | 65 |
    | 3.3.2.2.3 | Numerical calibrations definition: cap | 68 |
    | 3.3.2.2.4 | Textual calibrations: txf | 69 |
    | 3.3.2.2.5 | Textual calibrations definition: txp | 69 |
    | 3.3.2.2.6 | Polynomial calibrations definitions: mcf | 70 |
    | 3.3.2.2.7 | Logarithmic calibrations definitions: lgf | 71 |
    | 3.3.2.3.1 | Monitoring checks: ocf | 72 |
    | 3.3.2.3.2 | Monitoring checks definition: ocp | 75 |
    | 3.3.2.4.1 | Packets identification: pid | 82 |
    | 3.3.2.4.2 | Packets identification criteria: pic | 91 |
    | 3.3.2.4.3 | Telemetry packets characteristics: tpcf | 93 |
    | 3.3.2.5.1 | Parameters location in fixed packets: plf | 97 |
    | 3.3.2.5.2 | Variable packet definition: vpd | 99 |
    | 3.3.2.6.1 | Monitoring groups definition: grp | 108 |
    | 3.3.2.6.2 | Parameters groups: grpa | 109 |
    | 3.3.2.6.3 | Telemetry packets groups: grpk | 109 |
    | 3.3.2.7.1 | Alphanumeric displays: dpf | 110 |
    | 3.3.2.7.2 | Alphanumeric displays definition: dpc | 111 |
    | 3.3.2.7.3 | Graphic displays: gpf | 114 |
    | 3.3.2.7.4 | Graphic displays definition: gpc | 116 |
    | 3.3.2.7.5 | Scrolling displays: spf | 120 |
    | 3.3.2.7.6 | Scrolling displays definition: spc | 121 |
    | 3.3.2.7.7 | Printout proforma: ppf | 123 |
    | 3.3.2.7.8 | Printout proforma definition: ppc | 124 |
    | 3.3.3 | Commanding data | 126 |
    | 3.3.3.1.1 | Packet headers characteristics: tcp | 128 |
    | 3.3.3.1.2 | Packet headers parameters: pcpc | 128 |
    | 3.3.3.1.3 | Packet headers definition: pcdf | 129 |
    | 3.3.3.2.1 | Command characteristics: ccf | 132 |
    | 3.3.3.2.1.1 | Command routing: DST | 141 |
    | 3.3.3.2.2 | Command parameters: cpc | 142 |
    | 3.3.3.2.3 | Commands definition: cdf | 151 |
    | 3.3.3.2.4 | Commands pre-transmission validation: ptv | 159 |
    | 3.3.3.3.1 | Command sequence characteristics: csf | 165 |
    | 3.3.3.3.2 | Command sequences definition: css | 168 |
    | 3.3.3.3.3 | Command sequence element parameters: sdf | 179 |
    | 3.3.3.3.4 | Command sequence formal parameters: csp | 184 |
    | 3.3.3.4.1 | Verification stages file: cvs | 192 |
    | 3.3.3.4.2 | Verification expressions: cve | 194 |
    | 3.3.3.4.3 | Verification profiles: cvp | 199 |
    | 3.3.3.5.1 | Parameter sets: pst | 201 |
    | 3.3.3.5.2 | Parameter value sets: psv | 201 |
    | 3.3.3.5.3 | Parameter sets definition: cps | 201 |
    | 3.3.3.5.4 | Parameter value sets definition: pvs | 202 |
    | 3.3.3.5.5 | Parameter sets mapping to commands/sequences: psm | 205 |
    | 3.3.3.6.1 | Numerical (de-)calibration curves: cca | 206 |
    | 3.3.3.6.2 | Numerical (de-)calibration curves definition: ccs | 207 |
    | 3.3.3.6.3 | Textual (de-)calibrations: paf | 208 |
    | 3.3.3.6.4 | Textual (de-)calibrations definitions: pas | 210 |
    | 3.3.3.7.1 | Parameter range sets: prf | 210 |
    | 3.3.3.7.2 | Parameter range values: prv | 213 |
    | Appendix A | SCOS-2000 Parameter Types | 214 |
    | Appendix B | SCOS-2000 Database Import Tables Overview | 229 |
    | Appendix C | SCOS-2000 Support of Packet Utilisation Standard (PUS) | 234 |
    | Appendix C, 1. | SUPPORT OF PUS DATA TYPES | 235 |
    | Appendix C, 2. | SUPPORT OF PUS DATA STRUCTURES | 236 |
    | Appendix C, 3. | SPECIFIC SUPPORT OF TM/TC SERVICES | 237 |
    | Annex 1 | List of implemented Document Changes | 244 |
    | Annex 2 | List of implemented Document Changes in ICD Version 7.0 | 261 |


## Documents this one references (29)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-1 | [SRD-0003](../references/index.md#ref-srd-0003) | SCOS-2000 Monitoring SRD |  | applicable |
| AD-2 | [SRD-0002](../references/index.md#ref-srd-0002) | SCOS-2000 Commanding SRD |  | applicable |
| AD-3 | [SRD-0001](../references/index.md#ref-srd-0001) | SCOS-2000 System Level SRD |  | applicable |
| AD-4 | [ICD-0051](../references/index.md#ref-icd-0051) | SCOS-2000 TC Sequences definitions ICD |  | applicable |
| AD-5 | [ICD-5001](../references/index.md#ref-icd-5001) | SCOS-2000 TM Displays and Printout definitions Service ICD |  | applicable |
| AD-6 | [ADD-0022](../references/index.md#ref-add-0022) | SCOS-2000 System Control ADD |  | applicable |
| CNF-01 | [CIDL-0001](../references/index.md#ref-cidl-0001) | SCOS-2000 Document Control List |  | reference |
| RD-1 | [CG-0003](../references/index.md#ref-cg-0003) | SCOS-2000 Configuration Variables |  | reference |
| RD-2 | [ADD-0007](../references/index.md#ref-add-0007) | SCOS-2000 Operations Language ADD |  | reference |
| RD-3 | [GLO-0001](../references/index.md#ref-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms |  | reference |
| RD-4 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |
| RD-5 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |
| RD-6 | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) | Packet Utilisation Standard | Issue 1 May 1994 | reference |
| RD-7 | [RO-ESC-IF-5002](../references/index.md#ref-ro-esc-if-5002) | Rosetta Space/Ground ICD | Issue 1 August 1998 | reference |
| RD-8 | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | CCSDS Time Code Formats | Issue 2 April 1990 | reference |
| RD-9 | [SUM-0019](../references/index.md#ref-sum-0019) | SCOS-2000 Synthetic Parameters SUM |  | reference |
| RD-10 | [SUM-0026](../references/index.md#ref-sum-0026) | SCOS-2000 Events & Actions SUM |  | reference |
| RD-11 | [SUM-0018](../references/index.md#ref-sum-0018) | SCOS-2000 MIB Applications SUM |  | reference |
| RD-12 | [ICD-0002](../references/index.md#ref-icd-0002) | SCOS-2000 Stack Import ICD |  | reference |
| RD-13 | [ICD-0003](../references/index.md#ref-icd-0003) | SCOS-2000 Task Parameter File ICD |  | reference |
| RD-14 | [ESA PSS-074-107](../references/index.md#ref-esa-pss-074-107) | ESA Packet Telecommand Standard | Issue 2.0 April 1992 | reference |
| RD-15 | [EGOS-EUD-S2K-SUM-1001](../references/index.md#ref-egos-eud-s2k-sum-1001) | EUD4S2K Software User Manual |  | reference |
| RD-16 | [ICD-0011](../references/index.md#ref-icd-0011) | SCOS-2000 Telemetry Parameter Injection ICD |  | reference |
| RD-17 | [ADD-0003](../references/index.md#ref-add-0003) | SCOS-2000 Telemetry Monitoring ADD |  | reference |
| RD-18 | [EGOS-NIS-NCTR-ICD-0002](../references/index.md#ref-egos-nis-nctr-icd-0002) | ICD NIS/NCTRS Volume 2 – MCS I/F | Issue 4.0.2 November 2009 | reference |
| RD-19 | [EGOS-NIS-NIS-ICD-0003](../references/index.md#ref-egos-nis-nis-icd-0003) | NIS Throw Events ICD | Issue 1.3 November 2007 | reference |
| RD-20 | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Ground Systems And Operations – Telemetry And Telecommand Packet Utilisation Standard (PUS). This document will be replaced by ECSS- E-ST-70-41C |  | reference |
|  | [MIL STD 1750A](../references/index.md#ref-mil-std-1750a) | MIL-STD-1750A floating point formats (32-bit and 48-bit reals, PTC=5 PFC=3/4) |  | mentioned |
|  | [IEEE Std 754-1985](../references/index.md#ref-ieee-std-754-1985) | IEEE floating point standard (encoding of PTC=5 PFC=1/2 reals) |  | mentioned |

!!! note "Notes"
    Source: solarorbiter.irap.omp.eu, the file 'MOC-applicable MIB egos-mcs-s2k-icd-0001-version7.0-FINAL.pdf'. Printed page 1 is PDF page 15 (offset +14); every page carries a 2017 ESA copyright footer. Broken cross-reference '(see Section f below)' on p. 18. Both PURPOSE and SCOPE are numbered 1.1. The page numbers given in the section 3.2 summary ('See page ...') do not match this issue's pagination. Section 3.3.3.2.1 (ccf) writes '[RD-18}' with a mismatched bracket. The digital-signature block on p. 2 includes an e-mail address, not reproduced here. Appendix C cites PUS sections via [AD-2]/[AD-5], as in earlier 6.x issues. Related library items: icd-6-9-archive-org (predecessor), icd-6-7-drafta, icd-5-1-tos-gci; the Solar Orbiter MIB releases mib-20250916m25925pfms001-sol and mib-20200416m10720pfms001-sol; RD-20 corresponds to ecss-e-70-41a-30jan2003-pus; RD-8 is an older issue of ccsds-301-0-301x0b4e1. Section 3.3.2.1.5 lists the SCTL-generated tables as 'PLF, PID, TPCF, OCF, OCP, TXT, TXP', where TXT presumably means TXF.

