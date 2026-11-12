---
title: "EDDS Configuration and Installation Guide (issue 25.0)"
description: "This is issue 25.0 (2025) of the EDDS Configuration and Installation Guide, covering release v3.6.1 of the EGOS Data Dissemination System(../scos2000/edds.md)."
tags: ["User Manual", "EDDS (EGOS Data Dissemination System)"]
sources: [cig-v24]
---

# Configuration and Installation Guide — EGOS Data Dissemination System

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-CIG-1001</dd><dt>Issue / version</dt><dd>Version 25.0</dd><dt>Date</dt><dd>2025-03-07</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Manu Mohan, Florian Cleyssac, Rui Santos, Michael Hawkshaw, Rauno Ots, Merlin Lobjakas, Kamill Panitzek, Rokibul Uddin, Abhishek Annadanappa Chandrashekar, Teresa Noviello, Alessandro Afloarei, Diwakar Kushwaha</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Title page: Version 25.0, 2025-03-07, 'Issue for EDDS v3.6.1i1' (Document Change Log, PDF p. 3). Page footers still read 'ISSUE:24.0 2025-01-10' (and 'ISSUE: 25.0 2024-03-08' on PDF p. 2). Latest CIG issue in the library; it supersedes cig-i14r0.</dd><dt>Pages</dt><dd>119</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-CIG.v24.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-CIG.v24.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:10:02Z</dd><dt>SHA-256</dt><dd><code>8b347d960c604f3a50021d72b5093c3abff59fbbb284ac5b124cf1c45494c2d2</code></dd><dt>Size</dt><dd>1.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/CIG-v24.pdf">CIG-v24.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

This is issue 25.0 (2025) of the **EDDS Configuration and Installation Guide**, covering release v3.6.1 of the [EGOS Data Dissemination System](../scos2000/edds.md). It keeps the structure of the 2018 issue (library item cig-i14r0) but documents the modernised platform and the integration with the European Ground Systems Common Core ([EGS-CC](../scos2000/ancillary-and-egs-cc.md)).

Section 3 describes prerequisites (SLES 15, OpenJDK/JRE 11, Tomcat 9, MariaDB, ActiveMQ, OpenLDAP, Pure-FTPd), the build and the large `edds-deploy.properties` table, and deploying the Archiver, Delivery Manager, Web Service, MMI, EDDS Server and optional tools. The property tables now include EGS-CC settings: a REST data-access endpoint, an HTTP or Kafka retrieval mode and a batch size. They also add `Egscc*` request types (parameters, parameter definitions, TM and TC packet reports, raw TM, activity reports) next to the classic SCOS-2000 ones, and a list of data sources ('DARC', 'PARC', 'HARC').

Section 4 adds a short subsection on EGS-CC missions, which only need an EDDS domain named after the mission's dataspace in the HBase cluster. It keeps the SCOS-2000 mission configuration: server properties, enabling services, retrying failed requests, XSL transformations and the **MIB files** each domain must supply (`pid.dat`, `tpcf.dat`, command subsystem and host files, `MISCbase.ids`, `MISCcontext_SHARED.sta`, source-type and OBQ-status mappings). Appendix A explains how raw packet headers and PARC TC history records are decoded, and adds XML custom-field definitions for TC records obtained from the SCOS-2000 data provision service. A new Appendix L describes the GitLab DevOps pipeline and the per-mission configuration directories.


## Key points

- Issue 25.0 corresponds to EDDS v3.6.1i1; the change log runs from issue 1.0 (2010-05-28) to 25.0 (2025-03-07), with issues 15.0 to 24.0 covering EDDS v2.4.0 to v3.6.0. *(PDF p. 3)*
- The only DCR entry for this issue is EDDS-1396, upgrading Tomcat to 9.0.100. *(PDF p. 3)*
- Prerequisites: SLES 15 (baseline SLES15-064-ESOCL01-i3r1), OpenJDK 11 (11.0.20+9) for compilation and JRE 11 for running, plus Tomcat and MariaDB from the SLES 15 baseline. *(PDF p. 10)*
- edds.server.supported.batch.requests lists request types such as Param, ParamStatistics, ParamDefinition, PktTm, PktTc, PktEvRaw, PktTmRaw, PktTmGapReport, ArchiveFile, OolRecordReport and EGS-CC variants (EgsccParam, EgsccPktTm, EgsccPktTmRaw, EgsccActivityReport); edds.server.supported_data_sources takes 'DARC','PARC','HARC'. *(PDF p. 17)*
- Stream request types are ParamStream, PktTmStream, PktTcStream, PktEvStream and OolStream; edds.server.enable.egscc turns on the EGS-CC integration. *(PDF p. 18)*
- EGS-CC data are retrieved from a REST data-access endpoint (edds.egscc.rest.dataaccess.url) using HTTP or Kafka retrieval modes, with a default batch size of 5000. *(PDF p. 34)*
- EGS-CC missions need no mission-specific configuration beyond a domain named after the mission dataspace in the HBase cluster; their configuration files are under config/HARC. *(PDF p. 61)*
- As in earlier issues, pid.dat (SPID to APID) and tpcf.dat (TM packet descriptions) from each SCOS-2000 domain must be copied to the EDDS MIB location. *(PDF p. 76)*
- TC records from the SCOS-2000 data provision service are decoded with DataProvisionCustomField XML files whose FieldPath follows the CHIScommandRecord.idl structure, for example command.record.releaseInf.subsystemName. *(PDF p. 86)*
- TC_PKT_CMD_LEN_PAR_INFO is 3 for SCOS-2000 6.2.0 and later and 2 for earlier versions. *(PDF p. 87)*
- Appendix L: EDDS DevOps pipelines run from the ESA GitLab project, and deployment is per mission, using a directory per mission under edds/edds-mission-config holding server and delivery-manager configuration. *(PDF p. 118)*


## Cited by these wiki pages (6)

- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (72 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 8 |
    | 1.1 | Purpose | 8 |
    | 1.2 | Scope | 8 |
    | 1.3 | Document Overview | 8 |
    | 2 | Glossary & References | 9 |
    | 3 | Installation Instructions | 10 |
    | 3.1 | Prerequisites | 10 |
    | 3.2 | Development Environment | 12 |
    | 3.3 | Deployment | 38 |
    | 3.4 | Firewall Configuration | 46 |
    | 3.5 | Request Attributes label - “Alias” configuration | 47 |
    | 3.6 | Running the EDDS Components | 48 |
    | 3.7 | EDDS MMI | 53 |
    | 3.8 | Pure-FTP Configuration | 55 |
    | 3.9 | Configuration for SFTP usage | 55 |
    | 3.10 | Configuring EDDS web services for SSL (HTTPS) | 55 |
    | 3.11 | Logging | 58 |
    | 3.12 | Installing Secure File Transfer (SFT) for use in EDDS | 60 |
    | 3.13 | Handling Multiple Missions | 60 |
    | 4 | Mission Specific Configuration | 61 |
    | 4.1 | EGSCC Missions | 61 |
    | 4.2 | EDDS Server Configuration Properties | 61 |
    | 4.3 | Using mission specific configuration (MSC) files: | 72 |
    | 4.4 | Enabling or Disabling EDDS Services for a Mission | 73 |
    | 4.5 | Configuring the EDDS server to retry to process failed requests | 74 |
    | 4.6 | XSL Transformations | 74 |
    | 4.7 | SCOS 2000 MIB Required Files | 76 |
    | 5 | Setting up the development environment | 79 |
    | 5.1 | Installing the required software | 79 |
    | 5.2 | Configuring Ant | 79 |
    | 5.3 | Configuring Eclipse | 79 |
    | 5.4 | Now read JAutodoc templates | 81 |
    | 5.5 | Checking out the source code | 81 |
    | 5.6 | Formatting | 82 |
    | 5.7 | Code Templates | 82 |
    | 5.8 | Running MMI from development environment | 83 |
    | 5.9 | Issuing an EDDS release | 83 |
    | APPENDIX A | Packet Data | 85 |
    | A.1 | Creating the header structure information files for TM | 85 |
    | A.2 | Creating the header structure information files for TC | 85 |
    | A.3 | Creating the header structure information files for DataProvision TC | 86 |
    | A.4 | Defining the TC packet structure | 86 |
    | A.5 | Defining DataProvision TC packet structure | 89 |
    | A.6 | Creating the header structure information files for EV | 89 |
    | APPENDIX B | Configuring SMON Server for use with EDDS | 90 |
    | APPENDIX C | Pure-FTP Installation | 91 |
    | C.1 | Prerequisites | 91 |
    | C.2 | Installation | 91 |
    | APPENDIX D | Apache ActiveMQ Configuration | 92 |
    | D.1 | Configuring ActiveMQ | 92 |
    | D.2 | Enabling password protection on ActiveMQ | 92 |
    | D.3 | Configuring EDDS to use ActiveMQ password | 94 |
    | D.4 | Debugging ActiveMQ database contents and connections | 94 |
    | D.5 | Important note on clock synchronisation | 94 |
    | APPENDIX E | FARC Subscriptions | 96 |
    | APPENDIX F | Creating RSA Public/Private Key | 98 |
    | APPENDIX G | Cold Backups | 100 |
    | APPENDIX H | LDAP Configuration | 101 |
    | H.1 | Creating a backup of LDAP data | 101 |
    | H.2 | Importing a previous backup into LDAP | 101 |
    | H.3 | Deploying multiple master and slave LDAP servers | 102 |
    | APPENDIX I | Using EDDS with an Existing Central LDAP Installation | 104 |
    | APPENDIX J | Example Requests for the Request Submitter | 105 |
    | J.1 | Cancel Requests | 105 |
    | J.2 | Suspend Requests | 105 |
    | J.3 | Resume Requests | 106 |
    | APPENDIX K | Development Environment Resources | 107 |
    | K.1 | Formatting.xml | 107 |
    | K.2 | Codetemplate.xml | 113 |
    | K.3 | JAutodoc | 116 |
    | APPENDIX L | EDDS DevOps Project Configuration | 118 |
    | L.1 | Configuring Mission for EDDS deployment | 118 |


## Documents this one references (8)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | EGOS-GEN-EDDS-SRS-1001 | Issue 23 Revision 0 2021-12-03 | applicable |
| [AD-2] | [EGGS-ESOC-GS-SCD-1002](../references/index.md#ref-eggs-esoc-gs-scd-1002) | ESOC Generic Ground Systems: System Configuration Baselines: Part 3- Baseline Definitions | Version 1.3 2011-08-04 | applicable |
| [AD-3] | [catalogue](../references/index.md#ref-apache-tomcat-9-0-ssl-configuration-how-to-https-tomcat-apache-org-tomcat-9-0-do) | Apache Tomcat 9.0 - SSL Configuration HOW-TO (https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html) | 2016-05-17 | applicable |
| [AD-4] | [catalogue](../references/index.md#ref-jautodoc-eclipse-plugin-http-jautodoc-sourceforge-net) | JAutodoc - Eclipse Plugin (http://jautodoc.sourceforge.net/) | 2011-01-21 | applicable |
| [AD-5] | [EGOS-GEN-FARC-ICD-1001_i4r5](../references/index.md#ref-egos-gen-farc-icd-1001) | FARC Client Services API | Issue 4 Revision 5 2012-10-31 | applicable |
| [AD-6] | [EGOS-GEN-EUD-CG-0001](../references/index.md#ref-egos-gen-eud-cg-0001) | EUD2 Configuration and Installation Guide | Version 1.5 2012-05-02 | applicable |
| [AD-7] | [EGOS-GEN-EDDS-EUG-1001](../references/index.md#ref-egos-gen-edds-eug-1001) · [library](eug.md) | EGOS-GEN-EDDS-EUG-1001 | Version 16.0 2021-12-03 | applicable |
| [AD-8] | [EGOS-GEN-EDDS-GLO-0001](../references/index.md#ref-egos-gen-edds-glo-0001) · [library](glo.md) | EGOS-GEN-EDDS-GLO-0001 | Version 10.0 2021-12-03 | applicable |

!!! note "Notes"
    File-name vs content mismatch: the file is published as 'EGOS-GEN-EDDS-CIG.v24.pdf' (slug cig-v24), but the title page and approval table say Version 25.0 dated 2025-03-07, while page footers say 'ISSUE:24.0 2025-01-10', the DCR is dated 2024-03-07, and the approval-page footer says 'ISSUE: 25.0 2024-03-08'. It looks like the issue 24.0 text re-issued as 25.0 with only the cover page updated. The author-table name 'Abhishek Annadanappa Chandrashekar' is split over three lines in the extraction. One property-table cell reads 'EGSSC' (typo for EGSCC). The section 1.3 overview does not list Appendix L. Printed page numbers are PDF page minus 1. Later issue of the same document as cig-i14r0.

