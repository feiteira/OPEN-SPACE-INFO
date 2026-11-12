---
title: "SPIRE Database Management and CUS Configuration Control"
description: "Issue 1.0 (19 February 2007) of a RAL technical note by Asier Abreu Aramburu for the Herschel SPIRE instrument."
tags: ["Technical Note", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [spire-db-management-1-0]
---

# SPIRE Database Management and CUS Configuration Control

<dl class="osi-meta"><dt>Document ID</dt><dd>SPIRE-RAL-NOT-002829</dd><dt>Issue / version</dt><dd>Issue 1.0</dd><dt>Date</dt><dd>2007-02-19</dd><dt>Organisation</dt><dd>RAL, Herschel SPIRE instrument team (reference prefix SPIRE-RAL-NOT)</dd><dt>Authors</dt><dd>Asier Abreu Aramburu</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Issue 1.0 of 19/02/07 follows Draft 0.1 of 12/02/07 and adds a section on the TestSetup.txt calibration table (Document Change Record, PDF p. 5). The 'Checked by' and 'Approval' fields on the title page are blank (PDF p. 1).</dd><dt>Pages</dt><dd>23</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002829_NOT_RAL_SPIRE%20Database%20Management%20and%20Configuration%20Control/SPIRE_DB_Management_And_Configuration_Control_002829_Issue1.0.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002829_NOT_RAL_SPIRE%20Database%20Management%20and%20Configuration%20Control/SPIRE_DB_Management_And_Configuration_Control_002829_Issue1.0.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:49Z</dd><dt>SHA-256</dt><dd><code>e58316d503f9d097169958b39812826c7f39622413f505d572543aae2a4f9977</code></dd><dt>Size</dt><dd>189.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/spire-db-management-1.0.pdf">spire-db-management-1.0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 1.0 (19 February 2007) of a RAL technical note by Asier Abreu Aramburu for the Herschel **SPIRE** instrument. It is a step-by-step procedure for building and maintaining the Versant databases used with the Herschel Common Science System (HCSS) in the SPIRE test environments (ILT, AVM, IST, HSC). It also explains how the uplink definitions are kept under configuration control.

Section 2 starts with the prerequisites: Versant ODBMS 7.0.1.1, Java 1.5 and SPIRE build #478 or later. It then gives each database creation step with its expected console output. The database is allocated, public access is granted, telemetry source packets are indexed by time, and mission configuration `config1` is created. Next the [MIB](../mib/index.md) is ingested with `ingestmib`, which reads the MIB files from the directory in the `hcss.mib.datadir` property and runs semantic checks. Serious problems abort the ingestion; minor ones are only written to `mibchecker.log`. The remaining steps load calibration tables and Common Uplink System (CUS) definitions, set the initial observation identifier (OBSID) in hexadecimal, and bind MIB and CUS definitions into an instrument model with `cus -createinsmodel`. Further procedures cover adding a configuration to an existing database, deletion, and backup and restore with `vbackup`.

Section 3 covers configuration control. CUS definitions, TestControl scripts and CCS templates are kept per campaign in the ESA CVS repository and tagged `LABEL_CONFIGN` (for example `AVM_TEST_CONFIG6`). Once ingested, the database versions them automatically, so CVS version 1.2 becomes 1.2.1. The note also documents the `TestSetup.txt` calibration table. Its keys (configuration, env, test_type, instrument, condition, dbg_level) let the same definitions run in every environment. See [MIB tooling](../mib/tooling.md) and [Herschel/Planck ground segment](../scos2000/herschel-planck-ground.md).


## Key points

- Applicable to all SPIRE test environments (ILT, AVM, IST, HSC); the test setup is the system that operates the instrument in real or semi-real time, monitors it and archives its telemetry. *(PDF p. 4)*
- Required software: Versant ODBMS v7.0.1.1 or higher, Java Run Time Environment v1.5.0 or higher, and a SPIRE build #478 or higher containing the corresponding HCSS release. *(PDF p. 5)*
- HCSS key parameters for database creation are kept in the user.props file under the user's .hcss directory. *(PDF p. 5)*
- Database creation sequence: db_admin -i (allocate), dbuser -add -P (public access), a btree index on herschel.versant.ccm.TmSourcePacketImpl _time, and missetup -addconfig config1. *(PDF p. 6)*
- A new database starts with configuration config1; later changes to definitions or calibration tables need a new configuration to take effect. *(PDF p. 7)*
- MIB ingestion reads the MIB from the directory named by property hcss.mib.datadir; other settings include hcss.mib.instrument=SPIRE, hcss.mib.cus_file=cus.script and a TC command list under the MIB's auxil/tcmds. *(PDF p. 8)*
- ingestmib MIB_LABEL runs semantic checks: serious problems raise ValidationProblemsFoundMibException and stop the ingestion; non-serious problems are logged in mibchecker.log and the MIB is still ingested (example label SPIRE_MIB_2.2.G1). *(PDF p. 9)*
- Calibration tables are loaded with UploadCaltables.csh, and CUS definitions (building blocks, procedures and modes in one CUS_Definitions.file) through cusgui or IngestCUSDefinitions.csh. *(PDF p. 10)*
- The initial OBSID is set in hexadecimal without the '0x' prefix, e.g. 0x30012001 is given as 30012001. *(PDF p. 11)*
- 'cus -createinsmodel config1' associates the MIB and CUS definitions in an instrument model for the configuration; missetup -listmodels lists the models (e.g. SPIRE PFM5). *(PDF p. 11)*
- Configuration control exists so that it is later known which version of which script produced a given set of SPIRE telemetry. *(PDF p. 15)*
- Tags follow TAG NAME = LABEL_CONFIGN, e.g. AVM_TEST_CONFIG6. *(PDF p. 18)*
- Every definition or calibration table ingested into the database gets an extra automatic version number: a CVS version 1.2 becomes 1.2.1; during a test, changes are tracked only through database versions. *(PDF p. 18)*
- A new mission configuration is a snapshot that freezes the ingested script and calibration table versions. *(PDF p. 19)*
- TestSetup.txt keys: configuration, env (moc, ilt, hsc, ist, par per ICD FIRST-FSC-DOC-0200), test_type (ft or pr), instrument (prime or redundant), condition (warm above 100 K, cool, cold below 10 K) and dbg_level (0 or 1). *(PDF p. 20)*


## Cited by these wiki pages (4)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (33 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 4 |
    | 1.1 | Intended Audience | 4 |
    | 1.2 | Scope | 4 |
    | 1.3 | Assumptions | 4 |
    | 1.4 | Reference Documents | 4 |
    | 1.5 | Applicable Documents | 4 |
    | 1.6 | Document Change Record | 5 |
    | 2 | Database Management | 5 |
    | 2.1 | Database Creation | 5 |
    | 2.1.1 | System/Software Requirements | 5 |
    | 2.1.2 | Creating a database | 6 |
    | 2.1.2.1 | Allocating the physical space | 6 |
    | 2.1.2.4 | Creating a new configuration for this database | 7 |
    | 2.1.2.5 | Ingesting the MIB into the database | 8 |
    | 2.1.2.7 | Ingesting required calibration tables onto the database | 10 |
    | 2.1.2.8 | Ingesting the CUS definitions | 11 |
    | 2.1.2.9 | Setting the initial obsid for this database | 11 |
    | 2.1.2.10 | Associating ALL of the previous (MIB + CUS definitions) by creating and instrument model on this configuration | 11 |
    | 2.1.3 | Creating a new configuration on an existing database | 12 |
    | 2.2 | Database Deletion | 13 |
    | 2.2.1 | Stopping database transactions | 13 |
    | 2.2.2 | Removing the database | 13 |
    | 2.3 | Database backup and restore process | 13 |
    | 2.3.1 | Backing up an existing database | 13 |
    | 2.3.2 | Restoring a database from a backup file | 14 |
    | 3 | Configuration Control | 15 |
    | 3.1 | Configuration Control Rationale | 15 |
    | 3.2 | Configuration Control Approach | 15 |
    | 3.2.1 | The CVS SPIRE repository structure | 15 |
    | 3.2.2 | Versioning of CUS definitions | 16 |
    | 3.3 | Structure and dependencies of the CUS definitions | 20 |
    | 3.3.1 | How this table is used by the different definitions | 22 |
    | 3.3.2 | Keys explained | 22 |


## Documents this one references (3)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| RD01 | [HSC-HERSCHEL-DOC-0833](../references/index.md#ref-hsc-herschel-doc-0833) | Database Administration Procedures | 0.4 07/11/06 | reference |
| RD02 | [HSC-HERSCHEL-DOC-0427](../references/index.md#ref-hsc-herschel-doc-0427) | HCSS Installation Instructions | 1.18 12/10/06 | reference |
|  | [FIRST-FSC-DOC-0200](../references/index.md#ref-first-fsc-doc-0200) | Herschel Ground Segment to Instruments ICD | Issue 2 Rev 3 18/11/04 | mentioned |

!!! note "Notes"
    The Applicable Documents table (section 1.5) has headings but no entries. The text refers to a 'section 3.1.3' that does not exist (PDF p. 7). Section 3.3.1 says the table uses '5 keys' and then lists six (PDF p. 22). The 'cool' range is printed inverted as '100K &lt; T_mechanism &lt; 10K' (PDF p. 21). The value 'redudant' is misspelt. The env key is also called the 'setup' key. Figures 1-2 (CVS tree, WinCVS dialog) are screenshots and survive only as captions. The archive folder title ('Database Management and Configuration Control') omits 'CUS'. The note names site host names, user directories, password-protected ESA URLs and a contact e-mail address, which are not reproduced here. The text extraction has a trailing empty page 24.

