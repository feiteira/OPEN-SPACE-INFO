---
title: "EDDS Configuration and Installation Guide (i14r0)"
description: "The EDDS Configuration and Installation Guide (CIG) tells ESOC system administrators and EDDS developers how to build, deploy, configure and run the EGOS Data Dissemination System(../scos2000/edds.md)"
tags: ["User Manual", "EDDS (EGOS Data Dissemination System)"]
sources: [cig-i14r0]
---

# Configuration and Installation Guide — EGOS Data Dissemination System

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-CIG-1001</dd><dt>Issue / version</dt><dd>Version 14.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Operations and Infrastructure, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, Michael Hawkshaw, Rauno Ots, Merlin Lobjakas, Kamill Panitzek</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Issue 14.0 'Issue for EDDS v2.3.0i1' (Document Change Log, PDF p. 3). Superseded: the library also holds issue 25.0 of 2025-03-07 for EDDS v3.6.1 (cig-v24).</dd><dt>Pages</dt><dd>108</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-CIG-1001-i14r0_2.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-CIG-1001-i14r0_2.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:09:15Z</dd><dt>SHA-256</dt><dd><code>bdbf2953e499d446869fc5723790fcbee6722dccfb91f3454d879c90a76f683e</code></dd><dt>Size</dt><dd>1.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/CIG-i14r0.pdf">CIG-i14r0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The **EDDS Configuration and Installation Guide (CIG)** tells ESOC system administrators and EDDS developers how to build, deploy, configure and run the [EGOS Data Dissemination System](../scos2000/edds.md) release v2.3.0. EDDS gives external users web-service and MMI access to data held by the [SCOS-2000](../scos2000/index.md) packet archive (PARC), the DARC data archive and the FARC file archive ([archives](../scos2000/archives.md)).

Section 3 lists the platform (SLES 12, Java 8, Tomcat, MariaDB, ActiveMQ, OpenLDAP, Pure-FTPd), explains the Ant/Maven build and the long `edds-deploy.properties` file, and describes deploying the separate components: Archiver, Delivery Manager, Web Service, MMI (standalone or web), EDDS Server, Request Submitter, Stream Client, Performance Processor and Migrator. It also covers firewall ports, HTTPS, logging, SFTP and SFT transfer of response files, and serving several missions from one Delivery Manager.

Section 4 is the most useful part for understanding data handling. It gives the full EDDS Server property table and explains how to enable services per mission, XSL transformations of results, and which **SCOS-2000 MIB files** each mission domain must supply: `pid.dat` (SPID to APID conversion), `tpcf.dat` (packet descriptions), command subsystem and host files, `MISCbase.ids` and `MISCcontext_SHARED.sta`, plus mapping files for command source types and on-board-queue request status. Appendix A explains how EDDS decodes raw packet headers and the hexadecimal TC history records it receives over CORBA from the PARC, using XML structure files with field offsets, lengths, verification-stage positions and mission custom fields. The remaining appendices cover the SMON server, ActiveMQ, FARC subscriptions, RSA keys, backups and LDAP.


## Key points

- Intended readers are ESOC system administrators and EDDS developers; the guide covers build, deployment and mission-specific configuration of EDDS v2.3.0. *(PDF p. 8)*
- Prerequisites start with SLES 12, JDK 8 (1.8.0_72) for compiling and JRE 8 for running, Apache Tomcat with the manager application, and MariaDB, versions per the SLES 12 baseline. *(PDF p. 10)*
- Further prerequisites: MariaDB max_allowed_packet raised to 50M, Maven, Ant, ActiveMQ, OpenLDAP and Pure-FTPd; GFTS is recommended when the EDDS Server and Delivery Manager run on different machines. *(PDF p. 11)*
- When the EDDS Server and Delivery Manager are on separate machines, SFT 'Sender' and 'Receiver' instances move response files into the 'edds-server-completed' folder; one Delivery Manager can serve multiple missions. *(PDF p. 57)*
- Each EDDS Server is configured for one SCOS-2000 mission; missing properties fall back to defaults with a warning in the log. *(PDF p. 58)*
- The services offered per mission are set with SUPPORTED_BATCH_REQUESTS and SUPPORTED_STREAM_REQUESTS, listing request types from the DataAccessDataElement type in common.xsd; batch and stream requests are routed through ActiveMQ queues with a MISSION_NAME selector. *(PDF p. 69)*
- EDDS needs MIB files per mission domain under MIB_FILES_LOCATION: pid.dat converts SPIDs into APIDs and tpcf.dat gives TM packet descriptions; without them filters such as an APID search for TM packets fail. *(PDF p. 72)*
- CMD_SUBSYSTEM_FILE, CMD_HOST_FILE and MISCbase.ids map subsystem, source and domain IDs in TC history packets to names for the TC report; MISCcontext_SHARED.sta maps domains and data streams for the data provision services. *(PDF p. 72)*
- CMDsourceTypeMapping.properties maps the command source type number (MANUAL_STACK, AUTO_STACK, EXT_SOURCE, TC_SPACON, OBQM_DISP, SMF_SOURCE) to long and short descriptions in the Packet TC report. *(PDF p. 73)*
- CMD_ttRqstObqStatusMapping.properties maps 16 on-board-queue request status values (TT_EXECUTED to TT_UNKNOWN) and must exist under config/MIB/0 or TC packet decoding may fail. *(PDF p. 74)*
- Raw TM, TC and EV header layouts written to raw output files are defined by XML files based on RawPktHeaders.xsd (for example fields 'Apid' and 'Type', or 'ServiceType' and 'ServiceSubType'). *(PDF p. 79)*
- Because the PARC returns TC history records hex-encoded over CORBA, EDDS decodes them with a TCPacketStructure XML file giving offset, length, type and occurrence of each field, the verification-stage positions (verStates sized by CMD_NUM_VER_STAGES) and optional mission CustomFields. *(PDF p. 80)*
- TC_PKT_CMD_LEN_PAR_INFO, the length of the INFO field in bytes, must be 3 for SCOS-2000 6.2.0 and later and 2 for earlier versions. *(PDF p. 80)*


## Cited by these wiki pages (3)

- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (67 headings)"

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
    | 3.3 | Deployment | 36 |
    | 3.4 | Firewall Configuration | 43 |
    | 3.5 | Request Attributes label - “Alias” configuration | 44 |
    | 3.6 | Running the EDDS Components | 45 |
    | 3.7 | EDDS MMI | 49 |
    | 3.8 | Pure-FTP Configuration | 52 |
    | 3.9 | Configuration for SFTP usage | 52 |
    | 3.10 | Configuring EDDS web services for SSL (HTTPS) | 52 |
    | 3.11 | Logging | 55 |
    | 3.12 | Installing Secure File Transfer (SFT) for use in EDDS | 57 |
    | 3.13 | Handling Multiple Missions | 57 |
    | 4 | Mission Specific Configuration | 58 |
    | 4.1 | EDDS Server Configuration Properties | 58 |
    | 4.2 | Using mission specific configuration (MSC) files: | 68 |
    | 4.3 | Enabling or Disabling EDDS Services for a Mission | 69 |
    | 4.4 | Configuring the EDDS server to retry to process failed requests | 69 |
    | 4.5 | XSL Transformations | 70 |
    | 4.6 | SCOS 2000 MIB Required Files | 72 |
    | 5 | Setting up the development environment | 75 |
    | 5.1 | Installing the required software | 75 |
    | 5.2 | Configuring Ant | 75 |
    | 5.3 | Configuring Eclipse | 75 |
    | 5.4 | Now read JAutodoc templates | 77 |
    | 5.5 | Checking out the source code | 77 |
    | 5.6 | Formatting | 77 |
    | 5.7 | Code Templates | 77 |
    | 5.8 | Running MMI from development environment | 77 |
    | 5.9 | Issuing an EDDS release | 78 |
    | APPENDIX A | Packet Data | 79 |
    | A.1 | Creating the header structure information files for TM | 79 |
    | A.2 | Creating the header structure information files for TC | 79 |
    | A.3 | Defining the TC packet structure | 80 |
    | A.4 | Creating the header structure information files for EV | 82 |
    | APPENDIX B | Configuring SMON Server for use with EDDS | 84 |
    | APPENDIX C | Pure-FTP Installation | 85 |
    | C.1 | Prerequisites | 85 |
    | C.2 | Installation | 85 |
    | APPENDIX D | Apache ActiveMQ Configuration | 86 |
    | D.1 | Configuring ActiveMQ | 86 |
    | D.2 | Enabling password protection on ActiveMQ | 86 |
    | D.3 | Configuring EDDS to use ActiveMQ password | 88 |
    | D.4 | Debugging ActiveMQ database contents and connections | 88 |
    | D.5 | Important note on clock synchronisation | 88 |
    | APPENDIX E | FARC Subscriptions | 89 |
    | APPENDIX F | Creating RSA Public/Private Key | 90 |
    | APPENDIX G | Cold Backups | 91 |
    | APPENDIX H | LDAP Configuration | 92 |
    | H.1 | Creating a backup of LDAP data | 92 |
    | H.2 | Importing a previous backup into LDAP | 92 |
    | H.3 | Deploying multiple master and slave LDAP servers | 92 |
    | APPENDIX I | Using EDDS with an Existing Central LDAP Installation | 95 |
    | APPENDIX J | Example Requests for the Request Submitter | 96 |
    | J.1 | Cancel Requests | 96 |
    | J.2 | Suspend Requests | 96 |
    | J.3 | Resume Requests | 97 |
    | APPENDIX K | Development Environment Resources | 98 |
    | K.1 | Formatting.xml | 98 |
    | K.2 | Codetemplate.xml | 104 |
    | K.3 | JAutodoc | 107 |


## Documents this one references (8)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | EGOS-GEN-EDDS-SRS-1001 | Issue 18 Revision 0 2018-02-16 | applicable |
| [AD-2] | [EGGS-ESOC-GS-SCD-1002](../references/index.md#ref-eggs-esoc-gs-scd-1002) | ESOC Generic Ground Systems: System Configuration Baselines: Part 3- Baseline Definitions | Version 1.3 2011-08-04 | applicable |
| [AD-3] | [catalogue](../references/index.md#ref-apache-tomcat-8-0-ssl-configuration-how-to-https-tomcat-apache-org-tomcat-8-0-do) | Apache Tomcat 8.0 - SSL Configuration HOW-TO (https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html) | 2016-05-17 | applicable |
| [AD-4] | [catalogue](../references/index.md#ref-jautodoc-eclipse-plugin-http-jautodoc-sourceforge-net) | JAutodoc - Eclipse Plugin (http://jautodoc.sourceforge.net/) | 2011-01-21 | applicable |
| [AD-5] | [EGOS-GEN-FARC-ICD-1001_i4r5](../references/index.md#ref-egos-gen-farc-icd-1001) | FARC Client Services API | Issue 4 Revision 5 2012-10-31 | applicable |
| [AD-6] | [EGOS-GEN-EUD-CG-0001](../references/index.md#ref-egos-gen-eud-cg-0001) | EUD2 Configuration and Installation Guide | Version 1.5 2012-05-02 | applicable |
| [AD-7] | [EGOS-GEN-EDDS-EUG-1001](../references/index.md#ref-egos-gen-edds-eug-1001) · [library](eug.md) | EGOS-GEN-EDDS-EUG-1001 | Version 12.0 2018-02-16 | applicable |
| [AD-8] | [EGOS-GEN-EDDS-GLO-0001](../references/index.md#ref-egos-gen-edds-glo-0001) · [library](glo.md) | EGOS-GEN-EDDS-GLO-0001 | Version 7.0 2017-04-10 | applicable |

!!! note "Notes"
    The approval-page title is 'Configuration and Installation Guide'; the cover adds 'EGOS Data Dissemination System'. The source file name 'EGOS-GEN-EDDS-CIG-1001-i14r0_2.pdf' matches the content (issue 14.0). Section 4.6.8 (CMD_ttRqstObqStatusMapping.properties) is in the body but missing from the table of contents. Printed page numbers are PDF page minus 1. Contains example credentials and host names from a test configuration, which are not reproduced here. Same document as cig-v24 at a much earlier issue; part of the same 2018 delivery as srn, eug and euicd-i15r0.

