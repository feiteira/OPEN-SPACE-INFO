---
title: "HPSDB Software User Manual (v2.6, GMV)"
description: "The GMV software user manual for HPSDB, the Herschel/Planck System Data Base."
tags: ["User Manual", "MIB / Database Import ICD"]
sources: [h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual]
---

# Software User Manual HPSDB

<dl class="osi-meta"><dt>Document ID</dt><dd>H-P-1-GMV-MA-20487</dd><dt>Issue / version</dt><dd>Version 2.6 (internal code GMVSA 20487/03 V9/05)</dd><dt>Date</dt><dd>2005-09-15</dd><dt>Organisation</dt><dd>GMV, S.A.</dd><dt>Authors</dt><dd>Ricardo Moyano, Jorge Pacios, Héctor Pérez, Almudena Sánchez</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Version 2.6 of 15/09/05 (202 pages), whose main addition is logical instantiation and the 'Where is referenced' tool. The document status sheet (PDF pp. 2-4) lists versions 1.0 (18/07/03, 77 pages), 1.1 (15/08/03, after the CDR of 29-31 July 2003), 2.0 (20/01/04, real data, input file processing and the XML format in Annex E), 2.1 (29/03/04, training at Alenia), 2.2 (15/09/04, CDR2 RIDs), 2.3 (22/09/04), 2.4 (27/10/04) and 2.5 (03/12/04). Annexes A and B are still 'To be prepared in accordance with ASP' and some examples are TBD.</dd><dt>Pages</dt><dd>202</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002696_DOC_ALC_H-P-1-GMV-MA-20487/H-P-1-GMV-MA-20487_2.6%20-%20HPSDB%20user%20manual.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002696_DOC_ALC_H-P-1-GMV-MA-20487/H-P-1-GMV-MA-20487_2.6%20-%20HPSDB%20user%20manual.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:45:06Z</dd><dt>SHA-256</dt><dd><code>e9c0f0c55b70e40da9ad98aa95af2d1b5e59805a2cf5ab10b70979473e82d843</code></dd><dt>Size</dt><dd>3.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/H-P-1-GMV-MA-20487_2.6---HPSDB-user-manual.pdf">H-P-1-GMV-MA-20487_2.6---HPSDB-user-manual.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The GMV software user manual for HPSDB, the Herschel/Planck System Data Base. HPSDB is the web-based Oracle application in which industry and the instrument teams kept the spacecraft and payload monitoring and control definitions, and from which SCOS-2000 and CCS MIB 'bridge files' were generated. The manual follows a functional-description, example, cautions, probable-errors pattern for every MMI operation.

Chapter 2 covers pre-execution: the central-site and mirror-site hardware, Windows 2000 with Oracle 9i Release 2 and Oracle9iAS, installation of the RDBMS and application server, creation of the HPSDB database and deployment and removal of the application. Chapter 3 explains the data organisation. Objects pass through a working area, a reference area (only the manager can change it, by validation) and an archive area. Box objects (elements, subsystems, models and one generic box) contain item objects (TM packets, TC packets, parameters, curves and so on). Objects are classified physically as theoretical or real and logically by level. One central site holds the valid data, and mirror sites exchange XML transfer files with it.

Chapter 3 then describes the administrator, manager and user views. Topics include session, site and schema control, user management, file management, box types, reasons for change, validation, generic data and central/mirror operations. The bridge file section is the most useful to MIB users. It explains loading SCOS-2000 or CCS bridge files with configuration files (S2K_EL, S2K_SUB, S2K_TM with a naming-convention column prepended to the PID file, S2K_CUR, S2K_CVS, S2K_PRF) and generating SCOS or CCS bridge files per box. Further sections cover XML ingestion, printing, TM/TC verification data, real element on/off status and logical instantiation. Annexes give the XML schema and the verification and on/off file formats.


## Key points

- HPSDB runs on Windows 2000 with Oracle 9i Release 2 (9.2.0.1.0) Standard Edition and Oracle9iAS Release 2 (9.0.3), accessed through web browsers; the central site and mirror sites have the same software environment. *(PDF p. 13)*
- Objects live in three areas: the working area (modifiable by all normal users), the reference area (validated objects, changed only by the manager through validation) and the archive area (old validated data); operations are creation, checkout, deletion, validation and discard. *(PDF p. 29)*
- Box objects are elements, subsystems, models or the unique generic box and contain item objects such as TM packets, TC packets, parameters and curves; objects are also classified as theoretical or real (physical instantiation) and by logical level. *(PDF p. 30)*
- There is one central site holding all valid objects and several mirror sites where only real objects can be modified; sites exchange XML transfer and log files manually, with no direct synchronisation. *(PDF p. 32)*
- Only SCOS-2000 and CCS bridge files can be loaded; configuration files bridge the difference between the SCOS and HPSDB data models by defining the subsystem, elements and positions for the loaded items. *(PDF p. 69)*
- S2K_TM.txt is a copy of the MIB PID file with a naming-convention TM packet identifier prepended, so its fields 2 to 17 are PID fields 1 to 16 of the SCOS-2000 Database Import ICD; HPSDB reads TM packets from it instead of the PID file. *(PDF p. 71)*
- S2K_CVS.txt and S2K_PRF.txt map SCOS-2000 command verification stage and parameter range set identifiers (limited to 09999) to HPSDB generic identifiers, for example verification stage 9000 to generic 079000000. *(PDF p. 73)*
- Bridge file loading creates no box types or generic items and is not a SCOS bridge file validator; OL expression files must be included in the zip when derived parameters are present. *(PDF p. 75)*
- Bridge files are generated per box object as SCOS or CCS file sets, with user category, version, descriptions and reason for change entered on the generation page. *(PDF p. 76)*
- TM parameter and TC verification data from test campaigns can be attached manually or from files; unlike normal updates they are written directly into the reference area, and they are reset when the parameter, its curves or its packet structures change. *(PDF p. 130)*
- The XML ingestion schema (Annex E) has a root element HPSDB with generic types such as TC_GN, CVS_GN, CURVE_GN, TM_GN, SCOS_TM_GN, PAR_GN, DISPLAY_GN, TC_STR_GN and TM_STR_GN. *(PDF p. 145)*
- Verification files are tab-separated lines of date-time (SCOS Julian format YYYY.DDD.HH.MM.SS.mmm), type c (telecommand) or p (parameter), item name, test sequence name and issue, and site. *(PDF p. 201)*


## Cited by these wiki pages (6)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (46 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1. | INTRODUCTION | 11 |
    | 1.1 | INTENDED READERSHIP | 11 |
    | 1.2 | APPLICABILITY STATEMENT | 11 |
    | 1.3 | PURPOSE | 11 |
    | 1.4 | HOW TO USE THIS DOCUMENT | 11 |
    | 1.5 | RELATED DOCUMENTS | 11 |
    | 1.6 | CONVENTIONS | 12 |
    | 2. | HPSDB PRE-EXECUTION | 13 |
    | 2.1 | HW AND SW ENVIRONMENT | 13 |
    | 2.2 | INSTALLATION | 14 |
    | 2.3 | DE-INSTALLATION OF THE HPSDB APPLICATION | 27 |
    | 3. | HPSDB MAN MACHINE INTERFACE | 29 |
    | 3.1 | INTRODUCTION | 29 |
    | 3.1.1 | HPSDB Areas | 29 |
    | 3.1.2 | HPSDB objects classification | 30 |
    | 3.1.3 | HPSDB Central/Mirror Sites | 32 |
    | 3.2 | GENERAL CONSIDERATIONS | 34 |
    | 3.3 | ADMINISTRATION ACCESS | 40 |
    | 3.3.3 | Schema management | 44 |
    | 3.4 | MANAGER ACCESS | 54 |
    | 3.4.3 | User management | 58 |
    | 3.4.4 | File management | 65 |
    | 3.4.5 | Bridge files operations | 69 |
    | 3.4.6 | Box type management | 78 |
    | 3.4.7 | Reason of change management | 82 |
    | 3.4.8 | Validation | 86 |
    | 3.4.9 | Generic data management | 88 |
    | 3.4.10 | Central/Mirror site interface operations | 89 |
    | 3.5 | USER ACCESS | 97 |
    | 3.5.1 | Theoretical box object management | 98 |
    | 3.5.2 | Theoretical item object management | 110 |
    | 3.5.3 | Real box object management | 116 |
    | 3.5.4 | Real item object management | 123 |
    | 3.5.5 | XML file ingestion | 128 |
    | 3.5.6 | Printing facility | 129 |
    | 3.5.7 | TM parameter and TC items verification | 129 |
    | 3.5.8 | Real element ON/OFF status | 131 |
    | 3.5.9 | Logical item object management | 135 |
    | 3.5.10 | Reference Tool | 138 |
    | ANNEX A | BOX OBJECT DATA FIELD DESCRIPTIONS | 141 |
    | ANNEX B | ITEM OBJECT DATA FIELD DESCRIPTIONS | 142 |
    | ANNEX C | SOFTWARE PROBLEM REPORTING | 143 |
    | ANNEX D | LIST OF W2000 SERVICES | 144 |
    | ANNEX E | XML INPUT FILE FORMAT | 145 |
    | ANNEX F | DATA VERIFICATION FILE FORMAT | 201 |
    | ANNEX G | REAL ELEMENT ON/OFF FILE FORMAT | 202 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD.1.] | [PSS-05-05](../references/index.md#ref-pss-05-05) | Guide to the detailed design phase |  | applicable |
| [AD.2.] | [H-P-1-GMV-SR-2171](../references/index.md#ref-h-p-1-gmv-sr-2171) | HPSDB Software Requirement Document |  | applicable |
| [AD.3.] | [H-P-1-GMV-ADD-2732](../references/index.md#ref-h-p-1-gmv-add-2732) | HPSDB Architectural Design Document |  | applicable |
| [AD.4.] | [H-P-1-ASPI-SP-0141](../references/index.md#ref-h-p-1-aspi-sp-0141) | Naming Convention Specification |  | applicable |
| [AD.5.] | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database import ICD |  | applicable |
| [RD.1.] | [H-P-1-ASP-ID-0569](../references/index.md#ref-h-p-1-asp-id-0569) | CCS & SCOS 2000 TO HPSDB & MOIS ICD |  | reference |

!!! note "Notes"
    Text-based PDF of 202 pages (the text extraction shows a 203rd, empty page). The front matter is paginated i to viii 'of iv', and the body from '1 of 154' at PDF p. 11 to '192 of 154' at PDF p. 202, so PDF page = printed body page + 10. The status sheet says 202 pages for version 2.6. Many screenshots (figures) carry no text, and the figure numbering in the list of figures (odd numbers) does not match the captions in the body. The cover lists GMV's postal address and phone and fax numbers, which are omitted here. The PDF p. 1 archive stamp is SPIRE-ALC-DOC-002696. AD.5 (SCOS-2000 Database Import ICD, S2K-MCS-ICD-0001-TOS-GCI) is in the library as icd-5-1-tos-gci (issue 5.1). Related library items: h-p-1-asp-tn-1060-mib-processing-hpsdb (constraints for MIB round trips through HPSDB), h-p-2-asp-li-1441-09-herschel-hpsdb-release-note (an HPSDB delivery) and 02-sesp-2015-from-hpsdb-to-egs-cc-presentation (the later SRDB lineage).

