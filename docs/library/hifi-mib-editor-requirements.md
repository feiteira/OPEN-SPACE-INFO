---
title: "HIFI MIB editor requirements specification"
description: "A short user requirements document (issue 1.0, 23 August 2000) written by L."
tags: ["Requirements Specification", "Tools, MIB editors and related standards"]
sources: [hifi-mib-editor-requirements]
---

# MIB editor Requirements specification document

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-U/HIFI-SP-2000-2.</dd><dt>Issue / version</dt><dd>1.0</dd><dt>Date</dt><dd>2000-08-23</dd><dt>Organisation</dt><dd>SRON Utrecht (HIFI instrument team)</dd><dt>Authors</dt><dd>L. Dubbeldam</dd><dt>Type</dt><dd>Requirements Specification</dd><dt>Status</dt><dd>Issue 1.0, Aug 23, 2000 (PDF p. 1); category printed as '-'; no approval or status stated.</dd><dt>Pages</dt><dd>9</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://cosmos.esa.int/documents/12133/1028864/MIB+editor+Requirements+specification+document" rel="noopener">https://cosmos.esa.int/documents/12133/1028864/MIB+editor+Requirements+specification+document</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:31Z</dd><dt>SHA-256</dt><dd><code>04e06b6f755ca3bacbe11f4655e8176f2794c4fba2d48f839cab1b89c9e7a14c</code></dd><dt>Size</dt><dd>26.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/hifi-mib-editor-requirements.pdf">hifi-mib-editor-requirements.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short user requirements document (issue 1.0, 23 August 2000) written by L. Dubbeldam for the HIFI instrument of the FIRST (later Herschel) mission, specifying an editor for the SCOS-2000 Mission Information Base. It explains that SCOS-2000 is configured by the MIB, a set of more than 30 ASCII files of mission-specific data, and that during instrument integration and test the MIB holds the instrument configuration, so a flexible and reliable editor is needed. Because the editor may be a relational database, the document also calls it 'the database'.

The requirements (numbered RQ 3.x.y) cover: data content (one table per SCOS-2000 file, holding everything needed to configure SCOS-2000); the user interface (datasheets labelled with the ICD field names, tool tips derived from the ICD descriptions, and forms that follow the MIB structure, for example PCF with OCF/OCP, CAF/CAP, TXF/TXP and MCF subforms, CPC with PRF/PRV, CCA/CCS and PAF/PAS, PID with VPD and PLF, CCF with CDF, PTV and verification, CSF with CSS, SDF and CSP, packet headers TCP/PCPC/PCDF, parameter sets and displays); data checking (unique keys, update cascades without delete cascades, validation of enumerated values, mandatory fields and ICD default values, configurable whole-database checks, record counters); grouping of data by instrument subsystem and model (QM/FM swaps) so that subsystem engineers can supply data without SCOS-2000 knowledge; and tools to import, append, export and delete sets of SCOS-2000 files.

Annex A lists 41 MIB tables grouped as operator (display), packet, packet header, parameter and parameter-set tables, each with the section and page of the SCOS-2000 database import ICD that defines it, which is a useful snapshot of the early (2000) MIB table set.


## Key points

- SCOS-2000 is configured by the Mission Information Base (MIB), described as a set of more than 30 ASCII files containing mission-specific data; during FIRST instrument integration and test it holds the instrument configuration. *(PDF p. 3)*
- RQ 3.1.2 requires one database table per SCOS-2000 file, and RQ 3.2.2/3.2.3 require datasheet columns to use the field names of the SCOS-2000 database import ICD, with tool tips derived from its descriptions. *(PDF p. 3)*
- Required forms follow the MIB structure, e.g. PCF with monitoring checks (OCF, OCP), numerical (CAF, CAP), textual (TXF, TXP) and polynomial (MCF) calibration, and CCF with CDF, PTV and verification (CVP, CVE) subforms. *(PDF p. 4)*
- Data checking requires enforcement of unique keys, update cascades but no delete cascades, enumerated-value validation, mandatory fields and use of the ICD default values; exported default-valued fields must not be left blank. *(PDF p. 5)*
- Data must be groupable by instrument subsystem and model so that, for example, Subsys1 QM data can be replaced by Subsys1 FM data, and subsystem engineers can supply data without detailed SCOS-2000 knowledge. *(PDF p. 6)*
- Tools are required to import, append, output and delete sets of SCOS-2000 files and to enter parameter-value sets in a column-per-set layout. *(PDF p. 6)*
- Annex A groups the MIB tables as Operator (dpc, dpf, gpc, gpf, spc, spf), Packet (ccf, cdf, csf, csp, css, cve, cvp, cvs, pid, plf, ptv, sdf, vpd), Packet header (pcdf, pcpc, tcp), Parameter (caf, cap, cca, ccs, cpc, mcf, ocf, ocp, paf, pas, pcf, prf, prv, txf, txp) and Parameter set (cps, psm, pst, psv, pvs), with the AD-#1 section defining each. *(PDF p. 8)*


## Cited by these wiki pages (5)

- [Display definitions in the MIB](../mib/displays.md)
- [History of the Database Import ICD (issues 5.1 to 7.2)](../mib/icd-history.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The MIB: Mission Information Base](../mib/index.md)


??? abstract "Contents (9 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 3 |
    | 2 | Applicable documents | 3 |
    | 3 | Requirements | 3 |
    | 3.1 | Data content | 3 |
    | 3.2 | User interface | 3 |
    | 3.3 | Data checking | 5 |
    | 3.4 | Groups of data | 5 |
    | 3.5 | Tools | 6 |
    | Annex A | File overview | 8 |


## Documents this one references (1)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-#1 | [S2K-MCS-ICD-1-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-1-tos-gci) | SCOS-2000 database import ICD |  | applicable |

!!! note "Notes"
    Word document printed via Acrobat PDFWriter; every page footer shows the local file path 'mib urd.doc'. The document number is printed as 'SRON-U/HIFI-SP-2000-2.' with a trailing full stop (possibly truncated in the header box); 'Inst.no.: n' and 'Category: -' are printed as placeholders. PDF p. 7 holds only the end of RQ 3.5.5. Annex A cites section and page numbers of the import ICD (for example PCF at 3.3.2.1.1 p 14), which correspond to an early ICD issue not stated here. Annex A lists cvs, cve and cvp under 'Packet' and the command-parameter tables under 'Parameter'. Companion to hifi-mib-editor-evaluation.

