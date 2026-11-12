---
title: "Managing TM Definitions on the Fly (CCS5 dynamic HK)"
description: "A six-page conference paper by Petro Kazmirchuk of Terma B.V."
tags: ["Paper", "Tools, MIB editors and related standards"]
sources: [1530-kazmirchuk-paper]
---

# Managing Telemetry Definitions on the Fly

<dl class="osi-meta"><dt>Organisation</dt><dd>Terma B.V. (Leiden, The Netherlands)</dd><dt>Authors</dt><dd>Petro Kazmirchuk</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper; no event name, date or status is printed. The text says the new PUS standard ECSS-E-ST-70-41C (2016) 'has been published last year' (PDF p. 6), so it was written in 2017; the PDF metadata creation date is 27 February 2017. It was posted on ESA Indico event 180, which also hosts pecchioli-egs-cc-esoc and 1400-trifin-paper.</dd><dt>Pages</dt><dd>6</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/180/contributions/1337/attachments/1247/1472/1530_Kazmirchuk_-_Paper.pdf" rel="noopener">https://indico.esa.int/event/180/contributions/1337/attachments/1247/1472/1530_Kazmirchuk_-_Paper.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:37Z</dd><dt>SHA-256</dt><dd><code>f6389fc956b4d2da6e77ac987cb4252e6f8a3f3fa0313f5950f1b4f5266b02c8</code></dd><dt>Size</dt><dd>183.5 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/1530_Kazmirchuk_-_Paper.pdf">1530_Kazmirchuk_-_Paper.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A six-page conference paper by Petro Kazmirchuk of Terma B.V. describing DYNHK, the 'dynamic housekeeping' feature of Terma's CCS5 central checkout software. On-board software can define new housekeeping or diagnostic report packets at run time through PUS service 3 telecommands, but a checkout system only recognises packets already described in its spacecraft reference database, so AIT engineers have had to hand-craft static definitions. DYNHK instead watches the uplinked TC(3,1)/TC(3,2) definition requests and TC(3,3)/TC(3,4) clear requests and creates or disables the matching SCOS-2000 MIB entries in memory, without interrupting the running test session.

The paper summarises the PUS-A service 3 sub-services and the content of their application data (SID, collection interval, parameter identifiers, NFA and supercommutated groups), and explains the CCS5 architecture: server and client consoles, the interface manager IFMGR, Tcl-based TOPE scripts, and in-memory MIBs that can be merged from several suppliers with a 'Source' column. It walks through the packet identification chain shared with SCOS-2000 (APID, type and subtype, PIC, PID, then PLF/VPD) and lists exactly which PID and VPD columns are filled for a new definition: PID_TPSD equal to the allocated SPID, PID_INTER from the collection interval, VPD positions from the parameter list and a REPEATER row for supercommutated groups. It also names the configuration that generic PUS leaves open (a scheduling rate in milliseconds, a TC-to-TM APID mapping and predefined PIC rows). For an engineer it is a concise worked mapping of PUS service 3 onto MIB tables.


## Key points

- Sub-services used: TC(3,1) Define New Housekeeping Parameter Report, TC(3,2) Define New Diagnostic Parameter Report, TC(3,3)/TC(3,4) Clear HK/Diagnostic Parameter Report Definitions, and the reports TM(3,25) and TM(3,26). *(PDF p. 1)*
- TC(3,1)/(3,2) application data hold the SID, a collection interval in units of the default HK scheduling rate (DIAG_MIN_INTERV) and the list of on-board parameter IDs with counters; SID together with APID and sub-service uniquely identifies a TM packet definition. *(PDF p. 2)*
- CCS5 loads MIB tables into memory where TOPE can read all tables and write some; multiple MIBs (e.g. from different suppliers) can be merged, with a special field 'Source' recording each MIB's origin. *(PDF p. 2)*
- DYNHK runs as the TOPE script DynHkMonitor.tcl on the CCS Server Console; after a TC(3,1)/(3,2) is verified it derives a definition, assigns a unique SPID and publishes it atomically to the server, all client consoles and IFMGR with CCS5::remote. *(PDF p. 2)*
- Redefining an existing SID disables the old definition and adds a new one with a new SPID, so SPID and TPSD are never reused within a session; packets for a cleared definition are archived as unknown. *(PDF p. 3)*
- Dynamic entries are tagged Source = 'DYNHK' and can optionally be saved as separate MIB files and reloaded in a later session, depending on whether the on-board software keeps its definitions across reboots. *(PDF p. 3)*
- Identification follows SCOS2000: APID from the CCSDS header, service type/subtype from the data field header, PI1/PI2 locations from PIC, SPID from PID, then packet contents from PLF and/or VPD. *(PDF p. 4)*
- VPD rather than PLF is used because TC(3,x) lists parameter IDs without offsets; VPD also allows variable-length strings, and CCS5 archives all VPD samples so retrieval does not depend on when a packet was (re-)defined. *(PDF p. 4)*
- Users must configure a 'schedulingRate' (to convert the collection interval to milliseconds for parameter expiry) and a TC-APID-to-TM-APID mapping, and must predefine PIC records because the SID is not directly referenced in the MIB ICD. *(PDF p. 4)*
- PID rows created: PID_TYPE 3, PID_STYPE 25 or 26, PID_APID from settings, PID_PI1_VAL/PID_PI2_VAL from the SID, PID_SPID from a user-configurable offset, PID_TPSD = SPID, PID_TIME = Y, PID_INTER from the collection interval, PID_CHECK = 1; clearing sets PID_VALID to false. *(PDF p. 5)*
- VPD rows: VPD_TPSD = PID_TPSD, VPD_POS 1..NPAR, VPD_NAME = the PCF_NAME whose PCF_PID equals the parameter ID; if NFA = 1 a REPEATER row is added with VPD_GRPSIZE = NPAR2 and VPD_FIXREP = NREP. *(PDF p. 5)*
- Planned next steps: a dedicated MMI to pick parameters and send TC(3,1)/(3,2) and TC(3,5), and support for the new service 3 sub-services of ECSS-E-ST-70-41C. *(PDF p. 6)*


## Cited by these wiki pages (3)

- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (10 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 1 |
    |  | Introduction | 1 |
    |  | Housekeeping and diagnostic data reporting service | 1 |
    |  | Overview of the dynamic housekeeping implementation in CCS5 | 2 |
    |  | Matching PUS to MIB tables | 4 |
    |  | PIC Table | 4 |
    |  | PID Table | 5 |
    |  | VPD Table | 5 |
    |  | Conclusions and future directions | 5 |
    |  | References | 6 |


## Documents this one references (3)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [EGOS-MCS-S2K-ICD-0001](../references/index.md#ref-egos-mcs-s2k-icd-0001) · [library](icd-7-0-final.md), [library](icd-6-7-drafta.md), [library](icd-6-9-archive-org.md) | SCOS-2000 Database Import ICD | version 6.9 2010 | reference |
| [2] | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Ground systems and operations – Telemetry and telecommand packet utilization | 2003 | reference |
| [3] | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | Telemetry and telecommand packet utilization | 2016 | reference |

!!! note "Notes"
    Undated paper (see status_notes); the author's e-mail address is omitted here. The extraction reports 7 PDF pages (registry: 6); the last is empty. Fig. 1 (dynamic housekeeping workflow, PDF p. 3) and Fig. 2 (location of SID in a TM packet, PDF p. 5) have no text layer. The text cites the references as [2], [3], [PUS] and [MIB] although the list is numbered [1]-[3]. Typo kept as printed: 'writing statements to send a TC will a long list' (PDF p. 6). Reference [1] corresponds to library item icd-6-9-archive-org, [2] to ecss-e-70-41a-30jan2003-pus and [3] to ecss-e-st-70-41c-15april2016. Companion Terma paper on CCS5 and TOPE: 1530-armitage; see also terma-ccs5-tsc-presentation.

