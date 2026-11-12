---
title: "HCSS MIB Clarification and Tailoring Note"
description: "A Herschel Science Centre note that completes the definition of how MIB ASCII datasets enter the Herschel Common Science System (HCSS)."
tags: ["Interface Control Document", "MIB / Database Import ICD"]
sources: [hcss-mib-clarification-tailoring-note]
---

# HCSS MIB Clarification and Tailoring Note

<dl class="osi-meta"><dt>Document ID</dt><dd>HSC/DOC/0300</dd><dt>Issue / version</dt><dd>1.5</dd><dt>Date</dt><dd>2004-12-21</dd><dt>Organisation</dt><dd>Herschel Science Centre (HSC), ESA</dd><dt>Authors</dt><dd>Hassan Siddiqui, Johannes Riedinger, Otto Bauer, Peter Roelfsema, Ken King</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1.5 of 21 December 2004, the latest entry of its change record (p. 2). It updated the applicable SCOS Database Import ICD issue to 5.2 and the H/P Naming Convention to 2.1. The note says it will be updated as ESOC rewords the external interface documents (section 1.2, p. 4). Later issues are not in the library.</dd><dt>Pages</dt><dd>29</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002273_ESA_DOC_HCSS%20MIB%20Clarification%20and%20Tailoring%20Note/ICD-01c_HCSS_MIB_Clarification_and_Tailoring_Note.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002273_ESA_DOC_HCSS%20MIB%20Clarification%20and%20Tailoring%20Note/ICD-01c_HCSS_MIB_Clarification_and_Tailoring_Note.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:21Z</dd><dt>SHA-256</dt><dd><code>ed9df9dcde405fe7cf970cfec58e718057310113ac1702f66197f3225cf8b25f</code></dd><dt>Size</dt><dd>239.5 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/hcss-mib-clarification-tailoring-note.pdf">hcss-mib-clarification-tailoring-note.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A Herschel Science Centre note that completes the definition of how MIB ASCII datasets enter the Herschel Common Science System (HCSS). The HCSS used the instrument MIBs to build instrument commands and to interpret downlinked data for Quick Look Assessment and Interactive Analysis. The interface is nominally defined by two external documents: the SCOS-2000 Database Import ICD (issue 5.2, RD-1) and the Herschel/Planck Naming Convention Specification (issue 2.1, RD-2). This note clarifies their ambiguous passages and adds Herschel-specific constraints.

Section 4 settles basic file-format questions: what a line is, how many tab-separated fields a record needs, default values for empty optional fields, strict limit semantics, and the reference point and bit order of `PLF_OFFBY`/`PLF_OFFBI`. Sections 5 and 6 list the tables the HCSS needs and the ones it ignores (VDF, command sequences, parameter sets), an extra command-duration table, and rules on SPIDs, PID/PIC SID consistency, PCDF header rows, TXP ranges and description character sets. They also give the reduced field set that software release 0.2 actually interprets. Section 7 catalogues the 34 ingestion checks with their error or warning actions.

The appendices reproduce the 2002 correspondence behind the rules: HSC comments on the Alcatel naming convention, ESOC's point-by-point answers with the DCRs they raised (286, 308, 309), and a PACS/ESOC exchange on why all PUS service 1 packets then shared one SPID. For an engineer it is a rare first-hand account of how an ICD was read in practice and of the edge cases that matter when you write a MIB parser.


## Key points

- The MIB interface to the HCSS is defined by [RD-1] (SCOS-2000 Database Import ICD) and [RD-2] (Herschel/Planck Naming Convention), with [RD-2] taking precedence in case of conflict; this note clarifies and tailors both. *(PDF p. 4)*
- The HCSS uses MIB data to define instrument-related commands and to interpret downlink data for the Quick Look Assessment (QLA) and Interactive Analysis (IA) subsystems; the raw MIB is produced by a MIB Editor outside the HCSS and delivered as ASCII files. *(PDF p. 4)*
- Each line of a MIB file is one record; a table with T fields of which the last G are unused by SCOS-2000 (grey in the ICD) needs at least N = T-G fields, separated by N-1 tab characters. Line ends are LF on Unix and CR+LF on Windows. *(PDF p. 9)*
- For non-mandatory fields without an explicit default, the default is 0 for integers, 0.0 for floating point and an empty string for strings. *(PDF p. 10)*
- An out-of-limits condition is raised only when the value is strictly below the low limit or strictly above the high limit, for both hard and soft limits. *(PDF p. 10)*
- PLF_OFFBY/PLF_OFFBI are counted from the end of the SCOS-2000 packet header, which coincides with the start of the TM source packet header when the generic SCOS-2000 packetiser is used (DCR 309); PLF_OFFBI bit 0 is the most significant bit (DCR 308). *(PDF p. 10)*
- Floating-point (NUMBER) values must use the decimal point '.', not a comma. *(PDF p. 10)*
- Besides the SCOS-2000 tables, HCSS ingestion requires a two-field command durations table (command short name, duration) used by the Common Uplink System (CUS). *(PDF p. 12)*
- The VDF table is ignored and monitoring parameters with PCF_NATUR='C' (constants) are ignored by the HCSS final interface. *(PDF p. 13)*
- The HCSS assumes a unique SPID for each packet type; Herschel packets are identified by PUS type, subtype, APID and, where appropriate, the SID. *(PDF p. 13)*
- Except for pseudo commands whose names begin with 'Z', every CCF_PKTID must appear in PCDF with at least 4 rows (VERSION, TYPE, DHFLAG, APID); the note points out this contradicts the ICD statement that PCDF_TCNAME is unique. *(PDF p. 13)*
- Command sequence tables (CSF, CSS, SDF, CSP) and parameter-set tables (PST, PSV, CPS, PVS) are ignored by the HCSS MIB ingestion software. *(PDF p. 14)*
- Short description fields must match the regular expression [a-zA-Z0-9_]+ (no plus, minus or space), and the first character of the name plus the full description must be unique for CCF, CPC and PCF; PID_APID plus PID_DESCR must be unique. *(PDF p. 14)*
- HCSS release 0.2 considers only raw parameters (PCF_NATUR='R'), supports only OCF_CODIN values 'R' and 'I', and ignores the VPD table. *(PDF p. 19)*
- Section 7 lists 34 ingestion checks (7.0.1 to 7.0.34) with the action taken (error, warning or informative message), e.g. validation of input file names, uniqueness of key field combinations and field counts per line. *(PDF p. 20)*
- Checks 7.0.18 to 7.0.21 require PCF_NAME, OCF_NAME, CPC_PNAME and CCF_CNAME to be unique. *(PDF p. 21)*
- CPC_RADIX must be 'D', 'H' or 'O' (check 7.0.33), and PID_INTER must be null except for periodic packets with PID_TYPE=3 and PID_STYPE=25 (check 7.0.34). *(PDF p. 22)*
- Requirement NMCVT-0100-C disallows I, O and Q as leading characters of mnemonics; these were reserved by the instrument control centres for HIFI, PACS and SPIRE EGSE-ILT parameters. *(PDF p. 23)*
- ESOC (5 December 2002) confirmed that non-mandatory fields without default are implicitly null and that the field separator must always be present even for empty fields (DCR 286). *(PDF p. 25)*
- In the PACS MIB all TC verification packets had SPID 10006, because the SCOS-2000 version of the time required all type 1 TM packets to share one SPID (the Verifier listened to a predefined SPID list). *(PDF p. 28)*
- ESOC stated that Rosetta allowed any SPID and CryoSat a range of SPIDs for service 1 packets, and planned to integrate these changes into S2K R3.1. *(PDF p. 29)*


## Cited by these wiki pages (13)

- [Calibration in the MIB](../mib/calibration.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Missions](../missions/index.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Monitoring in the MIB: parameters and packets](../mib/monitoring.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)


??? abstract "Contents (27 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 4 |
    | 1.1 | Overview | 4 |
    | 1.2 | Purpose | 4 |
    | 1.3 | Background | 4 |
    | 2 | Referenced Documents | 6 |
    | 3 | Definitions | 7 |
    | 4 | Clarification | 8 |
    | 4.1 | Clarification of [RD-1] | 9 |
    | 4.2 | Clarification of [RD-2] | 10 |
    | 5 | Constraints for the FINAL interface | 12 |
    | 5.1 | Required Tables for HCSS | 12 |
    | 5.1.1 | Additional table - Command durations table | 12 |
    | 5.2 | Tailoring of [RD-1] | 12 |
    | 5.2.2 | Detailed Table Structure Points | 13 |
    | 5.3 | Tailoring of [RD-2] | 14 |
    | 6 | Constraints for version 0.2 of the HCSS | 15 |
    | 6.1 | Required Tables for HCSS | 15 |
    | 6.2 | Fields interpreted by the software | 15 |
    | 6.3 | Tailoring of [RD-1] | 19 |
    | 6.3.1 | Detailed Table Structure Points | 19 |
    | 6.4 | Tailoring of [RD-2] | 19 |
    | 7 | Checks performed by the HCSS MIB software | 20 |
    | 8 | Comments on [RD-2] | 23 |
    | 9 | ESOC response to comments by HS | 25 |
    | 10 | Discussions on SPID Uniqueness | 28 |
    | 10.1 | Email from BV to KG | 28 |
    | 10.2 | Email from NP to BV | 28 |


## Documents this one references (14)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| RD-1 | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database Import ICD | 5.2 | reference |
| RD-2 | [H-P-ASPI-SP-0141](../references/index.md#ref-h-p-aspi-sp-0141) | Herschel/Planck Naming Convention Specification Document | 2.1 | reference |
| RD-3 | [SCI-PT-RS-07360](../references/index.md#ref-sci-pt-rs-07360) · [library](cosmos-operations-interface-requirements.md) | Herschel/Planck Operations Interface Requirements Document | 2.1 | reference |
| RD-4 | [FIRST/FSC/DOC/0146](../references/index.md#ref-first-fsc-doc-0146) | Herschel Ground Segment Design Description | 1.1 | reference |
|  | [Herschel/HSC/DOC/0293](../references/index.md#ref-herschel-hsc-doc-0293) | Comments on Alcatel's Naming Convention Specification H-P-ASPI-SP-0141, Issue 1.2 | 6 December 2002 | mentioned |
|  | [H-P-ASPI-SP-0141](../references/index.md#ref-h-p-aspi-sp-0141) | Alcatel Naming Convention Specification | 1.2 | mentioned |
|  | [s2k-mcs-icd-0001-tos-gci](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS Database Import ICD ('SCOS-ICD') | v5.1 | mentioned |
|  | [SCI-PT-RS-07360](../references/index.md#ref-sci-pt-rs-07360) · [library](cosmos-operations-interface-requirements.md) | OIRD (Section A4.2) | v2.1 | mentioned |
|  | [DCR 286](../references/index.md#ref-dcr-286) | DCR 286 (ESOC document change request against the SCOS-2000 Database Import ICD: null fields and separators) |  | mentioned |
|  | [DCR 309](../references/index.md#ref-dcr-309) | DCR 309 (ESOC document change request against the SCOS-2000 Database Import ICD: PLF_OFFBY reference byte) |  | mentioned |
|  | [DCR 308](../references/index.md#ref-dcr-308) | DCR 308 (ESOC document change request against the SCOS-2000 Database Import ICD: PLF_OFFBI bit numbering) |  | mentioned |
|  | [SCR-0272](../references/index.md#ref-scr-0272) | SCR-0272 (cited in point 6.3.5 on CPC_CATEG, CPC_INTER and CDF_INTER) |  | mentioned |
|  | [catalogue](../references/index.md#ref-hcss-common-uplink-system-cus-documentation-ftp-astro-estec-esa-nl-pub-herschel-) | HCSS Common Uplink System (CUS) documentation (ftp://astro.estec.esa.nl/pub/HERSCHEL/csdt/releases/doc/index.html) |  | mentioned |
|  | [catalogue](../references/index.md#ref-hcss-mib-user-guide-long-names-ftp-astro-esa-int-pub-herschel-csdt-releases-doc-) | HCSS MIB user guide, long names (ftp://astro.esa.int/pub/HERSCHEL/csdt/releases/doc/mib/guide/user-guide.html#longnames) |  | mentioned |

!!! note "Notes"
    The title page carries the SPIRE archive number SPIRE-ESA-DOC-002273, and the file name in the source URL is 'ICD-01c_HCSS_MIB_Clarification_and_Tailoring_Note'. Printed page numbers in the table of contents (and in internal cross-references such as 'page 20') are offset: printed page 1 is PDF page 4. Approvers are listed by name only; the extraction shows no dates or signatures. Sections 8 to 10 reproduce e-mails, including sender and recipient e-mail addresses, which are not copied here. Internal inconsistencies: check 7.0.13 says 'more than 4 rows' while point 5.2.7 says 'at least 4 rows'; check 7.0.27 flags TXP_TO greater than TXP_FROM as an error, while point 5.2.12 says TXP_FROM should not exceed TXP_TO; check 7.0.15 names the field 'PCF_CURTIX'. Change record typos: 'Sectionss', 'changebards'. RD-3 (SCI-PT-RS-07360 issue 2.1) is a predecessor of library item cosmos-operations-interface-requirements (issue 2.2). RD-1 issue 5.2 is not in the library; issue 5.1 is (icd-5-1-tos-gci). The e-mail text reproduced in sections 8 to 10 contains extraction artefacts (spaces after punctuation such as 'CCF_ CNAME'), normalised in the references above.

