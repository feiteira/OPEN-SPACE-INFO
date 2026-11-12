---
title: "HIFI evaluation of the SCOS-2000 MIB editor"
description: "An evaluation report (issue 2, 12 April 2001) by L."
tags: ["Technical Note", "Tools, MIB editors and related standards"]
sources: [hifi-mib-editor-evaluation]
---

# MIB editor evaluation report

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-U/HIFI/RP/2001-1.</dd><dt>Issue / version</dt><dd>2</dd><dt>Date</dt><dd>2001-04-12</dd><dt>Organisation</dt><dd>SRON Utrecht (HIFI instrument team)</dd><dt>Authors</dt><dd>L. Dubbeldam</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Issue 2, 12 April 2001 (PDF p. 1); the 'Checked by', 'Agreed by' and 'Authorized by' fields are blank. Issue 2 updates issue 1 of the report, with new remarks marked by change bars (PDF p. 3).</dd><dt>Pages</dt><dd>15</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://cosmos.esa.int/documents/12133/1028864/MIB+editor+evaluation+report" rel="noopener">https://cosmos.esa.int/documents/12133/1028864/MIB+editor+evaluation+report</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:33Z</dd><dt>SHA-256</dt><dd><code>6a49b5209271a00f14ad9366f11f3679e961f6b6817d2d9834abfe874004b74a</code></dd><dt>Size</dt><dd>92.0 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/hifi-mib-editor-evaluation.pdf">hifi-mib-editor-evaluation.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An evaluation report (issue 2, 12 April 2001) by L. Dubbeldam of the HIFI instrument team on the SCOS-2000 Database Editing Subsystem version 2.0, the MS Access-based MIB editor supplied by ESOC and originally written for INTEGRAL (also called the 'Integral MS Access editor'). It explains that the three FIRST (Herschel) instruments chose SCOS-2000 as the basis of their EGSE throughout integration, so they need a tool to create and maintain the MIB, and it distinguishes the MIB ASCII files, the database application, the editor forms and the data.

The report walks through the requirements of the HIFI MIB editor requirements specification (RD.3) one by one, records 30 numbered remarks, and includes replies from the editor's author (marked JH). Topics include the missing polynomial calibration (MCF) form and the rule that a numerical PCF_CURTX reference is looked up first in CAF and then in MCF; the automatic VDF version record at export; datasheet and tool-tip support; keys, cascades, validation rules, mandatory fields and default values; the PID primary key (six fields versus the ICD's five); record-count fields that SCOS-2000 does not use; CSF_NFPARS versus the task parameter file ICD; a silent conversion of (PTC,PFC)=(5,2) to (5,3); grouping of data by subsystem; import, append, export and delete tools; user-interface ergonomics; hexadecimal calibration curves; and field-length non-conformances with the import ICD (for example OCP and SPID fields).

The conclusions find version 2 much improved and a good tool. Annex A proposes report forms for numerical calibrations, command parameters, command definitions, fixed packets and variable packets, filled with example data. The document shows the state of MIB tooling at the start of the Herschel/Planck programme.


## Key points

- The three FIRST instruments decided to use SCOS-2000 as the basis of their EGSE throughout integration, so a tool to generate and maintain the MIB was required. *(PDF p. 2)*
- The evaluated tool is the ESOC-supplied SCOS-2000 Database Editing Subsystem version 2.0, also called the Integral MS Access editor; its author's replies are included and marked JH. *(PDF p. 2)*
- Per the editor author, when a TM parameter has category 'N' and PCF_CURTX is not null, SCOS-2000 first looks up the reference in CAF and then in MCF; MCF numbers (0 to 9999) must not coincide with CAF numbers. *(PDF p. 3)*
- The VDF table is populated automatically at export time, and the local PC date had to be set to 'DD/MM/YY' for this to work. *(PDF p. 4)*
- The editor keys PID on its first six fields, whereas the import ICD (section 3.3.2.4.1) defines the first five fields as unique provided field #13 contains 'Y'; INTEGRAL needed the six-field key. *(PDF p. 6)*
- The INTEGRAL database is said to have more than 870,000 populated fields, and the editor code behind the forms more than 1300 pages; consistency checking was done by a separate checker application. *(PDF p. 7)*
- The record-count fields of the MIB are said to be unused by SCOS-2000 ('S2K currently does not use any of them'), yet CSF_NFPARS is checked against the number of parameters in a task parameter file per the task parameter file ICD. *(PDF p. 7)*
- An undocumented editor feature converted parameter code (PTC,PFC)=(5,2) into (5,3) on output; it was an INTEGRAL-specific processing to be removed. *(PDF p. 7)*
- Reported non-conformances with the import ICD: OCP_RLCHK limited to six characters instead of 8, OCP low/high values of length 10 instead of 14, and SPID-type fields unable to hold 10-digit numbers. *(PDF p. 10)*
- Conclusion: version 2 is greatly improved over the previous version and the SCOS-2000 database editor is a good tool to work with. *(PDF p. 11)*


## Cited by these wiki pages (6)

- [Display definitions in the MIB](../mib/displays.md)
- [MIB data model: how the tables relate](../mib/data-model.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The MIB: Mission Information Base](../mib/index.md)


??? abstract "Contents (18 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 2 |
    | 2 | Reference documents | 2 |
    | 3 | Report | 3 |
    | 3.1 | Review of requirements | 3 |
    | 3.1.1 | Data content | 3 |
    | 3.1.2 | User interface | 4 |
    | 3.1.3 | Data checking | 5 |
    | 3.1.4 | Groups of data | 8 |
    | 3.1.5 | Tools | 8 |
    | 3.2 | Appearance and user interface | 9 |
    | 3.3 | Miscellaneous observations | 9 |
    | 3.3.1 | The use of hexadecimal values in numerical calibration curves | 9 |
    | 3.3.2 | Use of units with engineering calibration | 10 |
    | 3.3.3 | Non-conformances with RD.2 | 10 |
    | 3.3.4 | Name of the editor | 10 |
    | 3.3.5 | Report forms | 10 |
    | 4 | Conclusions | 11 |
    | Annex A | Form suggestions | 12 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| RD.1 | [SCI-PT-RS-7360](../references/index.md#ref-sci-pt-rs-7360) | FIRST/PLANCK Operations Interface Requirements Document | Draft 5 | reference |
| RD.2 | [S2K-MCS-ICD-1-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-1-tos-gci) | Database Import ICD |  | reference |
| RD.3 | [SRON-U/HIFI-SP-2000-2.](../references/index.md#ref-sron-u-hifi-sp-2000-2) · [library](hifi-mib-editor-requirements.md) | MIB editor Requirements specification document |  | reference |
| RD.4 | [catalogue](../references/index.md#ref-scos-2000-database-editing-subsystem) | SCOS-2000 database editing subsystem |  | reference |
| RD.5 | [S2K-MCS-ICD-3-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-3-tos-gci) | SCOS-2000 Task parameter File ICD |  | reference |

!!! note "Notes"
    Word document printed via Acrobat PDFWriter; the title page shows the local file path 'MIB report V2.doc'. The title 'MIB editor evaluation report' is split across two lines of the header box. The document number is printed with a trailing full stop ('SRON-U/HIFI/RP/2001-1.'). Remark #27 ('The editor appears with three names:') is followed by nothing in the text layer, probably because the names were shown as images. Annex A (PDF pp. 12-15) contains example report layouts with sample data (for example CAF curve 222, command A1021, SPIDs 79 and 97) that appear to come from an example database; they are not HIFI flight data. RD.3 is the companion document hifi-mib-editor-requirements; RD.1 is probably the document registered as cosmos-operations-interface-requirements (not verified here).

