---
title: "EDDS Update Guide (v2.2.0 to v2.3.0)"
description: "The EDDS Update Guide is a short (six-page) administrator's procedure that explains how to upgrade an existing installation of the EGOS Data Dissemination System (EDDS)(../scos2000/edds.md) from relea"
tags: ["User Manual", "EDDS (EGOS Data Dissemination System)"]
sources: [eug]
---

# EDDS Update Guide

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-EUG-1001</dd><dt>Issue / version</dt><dd>Version 12.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team (CS GmbH / CGI contributors)</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, Michael Hawkshaw, Rauno Ots, Merlin Lobjakas, Andrew Brook, Lauri Kimmel, Deiwin Sarjas, Kamill Panitzek</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Issue 12.0, 'Issue for EDDS v2.3.0' per the Document Change Log (PDF p. 2); the companion Software Release Note issue 14.0 lists EUG i12r0 as the current upgrade guide for EDDS 2.3.0 (srn, PDF p. 9). Later EUG issues exist (the CIG issue 25.0 cites EUG Version 16.0, 2021-12-03), so this issue is superseded.</dd><dt>Pages</dt><dd>6</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUG.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-EUG.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:10:09Z</dd><dt>SHA-256</dt><dd><code>c99a10194ce8b3271ef33f538bd720c00c404de2f08c99545dafa0e1b0d40147</code></dd><dt>Size</dt><dd>282.6 KB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/EUG.pdf">EUG.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The **EDDS Update Guide** is a short (six-page) administrator's procedure that explains how to upgrade an existing installation of the [EGOS Data Dissemination System (EDDS)](../scos2000/edds.md) from release v2.2.0 to v2.3.0. EDDS is the ESOC web-service front end through which external users retrieve telemetry, telecommand history, events and parameters from the [SCOS-2000](../scos2000/index.md) archives.

The guide is meant to be read together with the EDDS Configuration and Installation Guide (CIG), its only applicable document. It tells the administrator to stop all EDDS components except the MariaDB database, delete the previously generated runtime distribution and the old server components (Delivery Manager, Archiver and EDDS Server) while keeping the LDAP and EDDS home directories, and merge any new configuration properties into retained configuration files with a `diff` tool.

The only migration step specific to this release is an update of the internal EDDS databases, driven by two tickets: missing milliseconds in historical message display logs (Edds#558) and changed privileges in the MySQL creation script (Edds#911). The step uses the EDDS Migrator component: the administrator enters the database root credentials in `migrator.properties` and runs `migrate-db.sh`, which rewrites every stored request into the new database structure. The guide recommends a database backup first and quotes an observed migration rate of about 2000 requests per minute.

For the wiki it is mainly evidence of how EDDS is deployed and versioned (MariaDB, LDAP, separate Archiver, Delivery Manager and Server processes) rather than a source on data formats.


## Key points

- The guide covers a single upgrade path, from EDDS v2.2.0 to EDDS v2.3.0; Issue 12.0 is described in the change log as 'Issue for EDDS v2.3.0'. *(PDF p. 2)*
- Intended readers are EDDS system administrators and end users of EDDS. *(PDF p. 4)*
- Before upgrading, all EDDS components except MariaDB are stopped; the old EDDS_RUNTIME_DIST directory and the DELIVERY_MGR, EDDS_ARCHIVER and EDDS_SERVER components are deleted, while the LDAP and EDDS_HOME directories are kept. *(PDF p. 6)*
- Database changes for v2.3.0 are due to Edds#558 (historical message display logs missing time milliseconds) and Edds#911 (privileges in the EDDS MySQL creation script). *(PDF p. 6)*
- The database migration is run with the EDDS Migrator component: set the root credentials in migrator.properties and run ./migrate-db.sh; each stored request is converted to the new structure, at an observed rate of approximately 2000 requests per minute. *(PDF p. 6)*
- Glossary terms and acronyms are delegated to the separate EDDS Glossary [GLO]. *(PDF p. 5)*


## Cited by these wiki pages (3)

- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (11 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 4 |
    | 1.1 | Purpose | 4 |
    | 1.2 | Scope | 4 |
    | 1.3 | Document Overview | 4 |
    | 2 | Glossary & References | 5 |
    | 2.1.1 | Applicable documents | 5 |
    | 3 | Upgrading from EDDS v2.2.0 to EDDS v2.3.0 | 6 |
    | 3.1 | Introduction | 6 |
    | 3.2 | Migration Changes Needed | 6 |
    | 3.2.1 | Internal Changes to EDDS databases | 6 |
    | 3.2.1.1 | Run the migration tool | 6 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EGOS-GEN-EDDS-CIG-1001 | Issue 14 Release 0 2018-02-16 | applicable |
| [GLO] | [catalogue](../references/index.md#ref-edds-glossary-referred-to-as-glo) | EDDS Glossary (referred to as [GLO]) |  | mentioned |

!!! note "Notes"
    Very short document (3 body pages). The applicable-documents table gives only the document number of the CIG, not its title. The file name 'EUG.pdf' carries no version; the content is Version 12.0 of 2018-02-16 for EDDS v2.3.0, part of the same 2018-02-16 delivery as the library items cig-i14r0 (CIG 14.0), srn (SRN 14.0), sdd (SDD 15.0), sum (SUM 14.0), srs (SRS 18.0) and euicd-i15r0 (EUICD 15.0). Digital-signature blocks on the approval page are dated April-May 2018, after the nominal issue date.

