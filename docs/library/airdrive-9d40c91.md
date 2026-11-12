---
title: "Integrating TOPE with EGS-CC (SESP 2019)"
description: "A short GMV paper from the 2019 SESP workshop."
tags: ["Paper", "ESOC evolution and context"]
sources: [airdrive-9d40c91]
---

# Integrating TOPE with EGS-CC

<dl class="osi-meta"><dt>Date</dt><dd>2019-03-26</dd><dt>Organisation</dt><dd>GMV; presented at the Workshop on Simulation and EGSE for Space Programmes (SESP), 26 - 28 March 2019, ESA-ESTEC, Noordwijk</dd><dt>Authors</dt><dd>Rui Barradas Pereira, Daniel Santos, Isabel del Rey</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Workshop paper for SESP, 26 - 28 March 2019 (title block, PDF p. 1). The date given here is the first day of the workshop; the paper itself carries no separate date or version.</dd><dt>Pages</dt><dd>7</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://airdrive.eventsair.com/eventsairwesteuprod/production-atpi-public/9d40c91e6e2448b58e8cb38e087e2168" rel="noopener">https://airdrive.eventsair.com/eventsairwesteuprod/production-atpi-public/9d40c91e6e2448b58e8cb38e087e2168</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:11:44Z</dd><dt>SHA-256</dt><dd><code>0714f0ceb487c591db501519fb7aebf1de6e8eaea91b3930c1888b12044f1c17</code></dd><dt>Size</dt><dd>625.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/airdrive-9d40c91.pdf">airdrive-9d40c91.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short GMV paper from the 2019 SESP workshop. It describes how legacy **TOPE** test procedures were kept running when ESTEC's Avionics Test Bench Real-Time Bench (ATB-RTB) moved from SCOS-2000 to the [EGS-CC](../scos2000/ancillary-and-egs-cc.md) monitoring and control infrastructure. TOPE (Test procedure, preparation and execution) is a Tcl extension with AIV commands such as parameter fetch, packet and parameter subscription and `tcsend`. It runs inside the TSEQ subsystem (TOPE interpreter, TSVR server, TEXEC execution tools and TPREP preparation tools) and talks to the SCOS-2000 kernel through **EXIF**, its CORBA-based external interface. EXIF offers injection services (events, parameters, commands) and provision services (telemetry, packets, events, command history) as separate CORBA servers.

The paper outlines EGS-CC's Monitoring and Control Model (MCM): a hierarchy of monitoring and control elements holding activities, events and parameters. It then presents the **TOPE Adaptation Layer (TAL)**, developed in the ERFEC activity. TAL replaces EXIF by implementing CORBA servers (JacORB) that conform to the existing TSEQ/SCOS-2000 IDL, so TSEQ needs no changes. TAL consumes EGS-CC M&C Access, M&C Definition Management, Messaging and System Configuration services. It also contains a MIB-to-MCM conversion: TAL loads the ASCII [MIB](../mib/index.md) files (the EagleEye mission MIB in the ATB) and a mapping file, generates the EGS-CC configuration data, and translates TOPE commands, parameters and events into MCM activities, parameters and events. Definitions created only in the MCM cannot be written back to the ASCII MIB. TAL is delivered as OSGi bundles that run inside an EGS-CC session.


## Key points

- ESA used two flavours of SCOS: SCOS-2000 for operations at ESOC and SCOS-EGSE for EGSE applications at ESTEC; the latter includes TOPE for automation procedures. *(PDF p. 1)*
- GMV's adapters allow existing MIB databases to be migrated to EGS-CC and existing TOPE scripts to run on EGS-CC; they were deployed with a development version of EGS-CC in ESTEC's Avionics Test Bench (ATB). *(PDF p. 1)*
- TOPE extends Tcl with AIV commands grouped by interaction pattern: synchronous (fetch, syslog, database patch commands), asynchronous subscription (TM packets and parameters), synchronous with asynchronous progress (tcsend, callasync) and local helper commands. *(PDF p. 2)*
- In ATB-RTB, TOPE runs in the TSEQ subsystem, made of the TOPE interpreter (one instance per sequence), TSVR (coordination server), TEXEC (execution GUI and debugger) and TPREP (editor and consistency checker). *(PDF p. 2)*
- EXIF is the CORBA-based external interface extension module of SCOS-2000; it allows telemetry acquisition, command sending, raising events or alarms and retrieving historical data, and is internally several CORBA servers reached via the CORBA naming service. *(PDF p. 3)*
- The EGS-CC Monitoring and Control Model separates the abstract M&C view from processing specific to the data units exchanged with controlled systems, so one kernel can control spacecraft, EGSE and ground station equipment. *(PDF p. 4)*
- TAL (TOPE Adaptation Layer), developed in the ERFEC activity, replaces the SCOS-2000 EXIF and implements CORBA servers compliant with the existing TSEQ/SCOS-2000 IDL files. *(PDF p. 4)*
- TAL loads ASCII MIB files and a MIB-to-MCM mapping file, generates the EGS-CC CDM from the MIB, and creates or extracts MCM parameters, activities and events upon CORBA requests. *(PDF p. 6)*
- ASCII MIB files must always be provided (the EagleEye mission was used in the ATB), and new TM/TC defined only in MCM definitions cannot be converted back into ASCII MIB definitions. *(PDF p. 6)*
- TAL is written in Java using JacORB, delivered as OSGi bundles running as a single instance inside an EGS-CC system session, and validated with the EGS-CC Component Test Framework and Test Management System. *(PDF p. 7)*


## Cited by these wiki pages (4)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (8 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Introduction | Introduction | 1 |
    | Overview | Overview | 2 |
    | TOPE in ATB-RTB | TOPE in ATB-RTB | 2 |
    | Monitoring and Control Model | Monitoring and Control Model | 4 |
    | Integrating TOPE with EGS-CC | Integrating TOPE with EGS-CC | 4 |
    | Developing for EGS-CC | Developing for EGS-CC | 6 |
    | Conclusions | Conclusions | 7 |
    | References | References | 7 |


## Documents this one references (3)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [GAL-REQ-SIA-CRE-A-0004](../references/index.md#ref-gal-req-sia-cre-a-0004) | TSEQ Technical Specification | v1.2 February 23rd 2007 | bibliography |
| [2] | [GMV-ERF-DD-01104](../references/index.md#ref-gmv-erf-dd-01104) | SSDD TAL | v2.1 July 28th 2017 | bibliography |
| [3] | [EGSCC-SYS-TN-1022](../references/index.md#ref-egscc-sys-tn-1022) | EGS-CC Modelling and Documentation Guidelines | v3.08 February 9th 2016 | bibliography |

!!! note "Notes"
    The file name (an EventsAir 'airdrive' hash) says nothing about the content; the PDF is the SESP 2019 workshop paper 'Integrating TOPE with EGS-CC'. Author e-mail addresses printed on the title page are omitted here. Figures 1-4 are images. The UML diagrams in Figs. 5-6 come out of the extraction as scattered labels, including the misspelling 'McmDefinitionRetriaval'. The acronym CDM (configuration data model) is used without being expanded. The extraction reports 8 PDF pages while the registry lists 7; the extra page appears empty. In the introduction, the 'SCOS-2000 for operations at ESOC / SCOS-EGSE at ESTEC' split is the authors' framing.

