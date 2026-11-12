---
title: "Herschel Ground Segment IRD (FIRST/HSC/DOC/0117)"
description: "The Interface Requirements Document (IRD) for the Herschel Ground Segment (HGS)."
tags: ["Requirements Specification", "ESOC evolution and context"]
sources: [herschel-ground-segment-interface-requirements-document]
---

# Herschel Ground Segment Interface Requirements Document

<dl class="osi-meta"><dt>Document ID</dt><dd>FIRST/HSC/DOC/0117</dd><dt>Issue / version</dt><dd>Issue 2, Revision 6</dd><dt>Date</dt><dd>2006-12-15</dd><dt>Organisation</dt><dd>ESA (ESTEC Herschel Science Centre / Herschel-Planck Project, with ESOC MOC and the instrument ICCs), prepared by the HGSSE group</dd><dt>Authors</dt><dd>HGSSE group: L. Aloy, K. Galloway, G. De Girolamo, A. Heras, P. Roelfsema, M. Schmidt, S. Sidher, B. Vandenbussche</dd><dt>Type</dt><dd>Requirements Specification</dd><dt>Status</dt><dd>Status 'Approved/Applicable', issue 2 revision 6 of 15/12/2006 (cover, PDF p. 1). This is the last entry of a change log that starts with draft 0 in October 1999 (PDF p. 4). It supersedes the earlier issues, e.g. issue 2.0 cited by the TC History ICD.</dd><dt>Pages</dt><dd>74</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/Herschel+Ground+Segment+Interface+Requirements+Document" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/Herschel+Ground+Segment+Interface+Requirements+Document</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:07Z</dd><dt>SHA-256</dt><dd><code>bf46a78f858880a4c7f6d634d780464315fb7e80cf4badb3f5df24427feac2d2</code></dd><dt>Size</dt><dd>378.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/herschel-ground-segment-interface-requirements-document.pdf">herschel-ground-segment-interface-requirements-document.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Interface Requirements Document (IRD) for the **Herschel Ground Segment (HGS)**. It numbers every interface between the HGS centres (the MOC at ESOC, the Herschel Science Centre HSC, and the HIFI, PACS and SPIRE Instrument Control Centres, both at home and at the MOC) and the HGS systems: the Herschel Common Science System (HCSS), Real-Time Analysis (RTA), on-board software maintenance (OBSM), EGSE-ILT, EGSE-IST, the Central Checkout System (CCS), the mission control system (MCS) and the MIB editor. Each interface subsection states its requirements (FGS-IR-x.y-nnn) in three groups: information flow, control flow (push, pull, notify or poll) and performance, with the source and comments in italics.

Section 3 covers the in-orbit and post-operations phases. It includes consolidated telemetry per APID and category, the telecommand history, out-of-limits information, time correlation (better than 500 ms), orbit and attitude products, planning skeleton and schedules, the spacecraft and instrument reference databases maintained by the MOC, and instrument database updates, derived-parameter definitions and procedures that flow from the ICCs via the HSC to the MOC. Section 4 covers instrument-level and system tests (ILT and IST). Here the SCOS-2000 based EGSE-ILT and the CCS stand in for the MCS, instrument databases must be in a SCOS-2000-compatible form, and the HCSS exchanges command mnemonic sequences, telemetry, test procedures and telecommand history with them.

For an engineer, the document shows the Herschel data flows end to end, and why the [MIB](../mib/index.md), the TC history file and the source-packet formats had to stay identical from ILT through operations (the 'smooth transition' concept). See [Herschel/Planck interface documents](../scos2000/herschel-planck-interfaces.md).


## Key points

- The HGS centres are the MOC, the HSC and the SPIRE, PACS and HIFI ICCs, with ICCs either at their home institutes (ICC@ICC) or at the MOC (ICC@MOC). The HGS systems include the HCSS, RTA, OBSM, EGSE-ILT, CCS with EGSE-IST, and the MCS. *(PDF p. 14)*
- The IRD places no formal requirements on the CCS, because it is not applicable to the industrial contractor supplying the CCS. *(PDF p. 15)*
- Design assumptions: guaranteed high-rate links (e.g. &gt;= 256 kbps) between MOC and HSC and between HSC and ICC@ICC in routine phase, real-time commanding only from the MOC, and a non-real-time MOC-HSC interface. *(PDF p. 20)*
- FGS-IR-3.1-30: the MOC delivers telemetry in a form from which the on-board source packets can be extracted. The MOC does not process science packets, which arrive as ESA standard packets, possibly with added header and trailer. Packets lost in space-ground transmission are not recovered. *(PDF p. 24)*
- FGS-IR-3.1-80: consolidated telemetry is made available per category (event, TC verification, housekeeping and science telemetry per APID, plus spacecraft telemetry), and the MOC pushes it to the HSC. *(PDF p. 25)*
- FGS-IR-3.1-110: any sequence of consolidated dump telemetry must be available no later than 10 minutes after its last bit reaches the MOC. The MOC is expected to need 16 hours to retrieve the dump telemetry of one operational day. *(PDF p. 25)*
- FGS-IR-3.1-300 to -340: the MOC makes the telecommand history (uplink and execution status of all TCs) available for any operational period, with enough information to associate each TC with schedule commanding requests. It pushes the history at the same time as the consolidated housekeeping telemetry. *(PDF p. 30)*
- FGS-IR-3.1-430: time correlation data must correlate spacecraft time with UTC to better than 500 ms at any time of the mission. *(PDF p. 32)*
- FGS-IR-3.1-500: the MOC maintains the spacecraft and instrument reference databases for the HGS. The instrument database includes at least TC, TM (housekeeping, and science header only), monitoring, calibration/de-calibration and command sequence definitions. *(PDF p. 35)*
- FGS-IR-3.3-40/-50: in commissioning and emergencies, the MOC delivers instrument telemetry to ICC@MOC within one minute of reception, at up to the maximum instrument on-board data rate of 300 kbps. *(PDF p. 40)*
- FGS-IR-3.5-20: an ICC@ICC accesses consolidated housekeeping telemetry within 20 minutes in all phases. Consolidated science telemetry is available within 2 hours in commissioning/PV and within 32 hours in routine phase, after the MOC receives the last bit of the period. *(PDF p. 46)*
- FGS-IR-4.1-70 and 4.3-50: in ILT and IST, instrument database updates are provided in the form appropriate for the SCOS-2000 based RTA system. *(PDF p. 63)*
- FGS-IR-4.2-50: the EGSE-ILT to HCSS telemetry interface must carry the maximum instrument on-board rate (300 kbps) plus the maximum TEI rate (400 kbps). Telemetry must be in the HCSS within 5 seconds (FGS-IR-4.2-40). *(PDF p. 65)*
- FGS-IR-4.7-40: RTA events used to trigger EGSE-ILT autonomy procedures must arrive within 0.5 s, against an expected 3-4 s end-to-end latency for triggering and executing an autonomy procedure. *(PDF p. 69)*
- FGS-IR-4.10-15: instrument databases stored from the MIB editor into the HCSS must be in a format compatible with what SCOS-2000 expects. *(PDF p. 71)*


## Cited by these wiki pages (2)

- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (60 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 14 |
    | 1.1 | Objective | 14 |
    | 1.2 | Scope | 14 |
    | 1.3 | Structure of the document | 17 |
    | 1.4 | Definitions, acronyms and abbreviations | 17 |
    | 1.5 | References | 17 |
    | 2 | General Description | 20 |
    | 2.1 | Assumptions | 20 |
    | 2.2 | Information flow general description | 20 |
    | 3 | Interface Requirements for In-Orbit and Post-Mission Phases | 24 |
    | 3.1 | MOC to HSC interfaces | 24 |
    | 3.1.1 | Consolidated telemetry | 24 |
    | 3.1.2 | Spacecraft predicted orbit data | 26 |
    | 3.1.5 | Planning skeleton data | 28 |
    | 3.1.7 | Mission timeline summary | 29 |
    | 3.1.8 | Telecommand history | 30 |
    | 3.1.9 | Spacecraft orbit data (reconstituted) | 31 |
    | 3.1.10 | Spacecraft attitude history | 31 |
    | 3.1.11 | Time correlation | 32 |
    | 3.1.12 | Derived parameters | 33 |
    | 3.1.13 | Out of limits information | 33 |
    | 3.1.14 | Instrument memory image | 34 |
    | 3.1.15 | Spacecraft and instruments databases | 35 |
    | 3.1.19 | Instruments malfunctions or operation problems information | 37 |
    | 3.1.20 | Orbit events | 38 |
    | 3.2 | MOC to ICC interfaces | 39 |
    | 3.3 | MOC to ICC@MOC interfaces | 40 |
    | 3.4 | HSC to MOC interfaces | 41 |
    | 3.4.1 | Observations schedule | 41 |
    | 3.4.2 | Instrument on-board software and on-board control procedures updates | 42 |
    | 3.4.4 | Instruments database updates | 43 |
    | 3.4.7 | Instrument derived parameter definitions | 44 |
    | 3.4.8 | Instrument procedures for manual commanding | 45 |
    | 3.5 | HSC to ICC interfaces | 46 |
    | 3.5.1 | Consolidated telemetry data | 46 |
    | 3.5.2 | MOC data | 47 |
    | 3.6 | ICC to MOC interfaces | 50 |
    | 3.7 | ICC to HSC interfaces | 50 |
    | 3.7.2 | Instrument health report | 51 |
    | 3.7.8 | Instruments database updates | 55 |
    | 3.7.13 | Instrument derived parameter definitions | 57 |
    | 3.8 | HCSS to RTA interfaces | 59 |
    | 3.9 | RTA to HCSS interfaces | 60 |
    | 3.10 | HCSS to OBS Maintenance interfaces | 60 |
    | 3.11 | OBS Maintenance to HCSS interfaces | 60 |
    | 4 | Interface Requirements for ILT and IST Phases | 62 |
    | 4.1 | HCSS to EGSE-ILT interfaces (ILT only) | 62 |
    | 4.2 | EGSE-ILT to HCSS interfaces (ILT only) | 64 |
    | 4.3 | HCSS to RTA interfaces (ILT and IST) | 66 |
    | 4.4 | RTA to HCSS interfaces | 67 |
    | 4.5 | OBS Maintenance to HCSS (ILT and IST) | 68 |
    | 4.6 | HCSS to OBS Maintenance (ILT and IST) | 69 |
    | 4.7 | RTA to EGSE-ILT interfaces (ILT only) | 69 |
    | 4.8 | HCSS to CCS interfaces (IST only) | 70 |
    | 4.9 | CCS to HCSS interfaces (IST only) | 70 |
    | 4.10 | MIB editor to HCSS (ILT and IST) | 71 |
    | 4.11 | HCSS to MIB editor (IST and ILT) | 71 |
    | 4.12 | EGSE-ILT to RTA interface (ILT only) | 71 |
    | 4.13 | HCSS to EGSE-IST interfaces (IST only) | 72 |
    | 4.14 | EGSE-IST to HCSS interfaces (IST only) | 73 |


## Documents this one references (42)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-1] | [ESA/SPC(97)22](../references/index.md#ref-esa-spc9722) | Herschel Science management plan (SMP) | 20 August 1997 | applicable |
| [AD-2] | [FIRST/FSC/DOC/0114](../references/index.md#ref-first-fsc-doc-0114) | Herschel Operation Scenario Document | Issue 1.2 17 March 2003 | applicable |
| [AD-3] | [FIRST/FSC/DOC/0146](../references/index.md#ref-first-fsc-doc-0146) | Herschel Ground Segment Design Document | Issue 1.2 xx August 2003 | applicable |
| [RD-1] | [catalogue](../references/index.md#ref-deleted) | Deleted. |  | reference |
| [RD-2] | [SCI-PT-03646](../references/index.md#ref-sci-pt-03646) | Herschel Science Implementation Requirements Document (SIRD) |  | reference |
| [RD-3] | [SC-PT-8818](../references/index.md#ref-sc-pt-8818) | Mission Implementation Requirements Document (MIRD) |  | reference |
| [RD-4] | [SCI-PT-RS-07360](../references/index.md#ref-sci-pt-rs-07360) · [library](cosmos-operations-interface-requirements.md) | Herschel Operations Interface Requirements Document (OIRD) |  | reference |
| [RD-5] | [FIRST/FSC/DOC/0115](../references/index.md#ref-first-fsc-doc-0115) | HCSS URD |  | reference |
| [RD-6] | [catalogue](../references/index.md#ref-deleted) | Deleted. |  | reference |
| [RD-7] | [PP-IS-F-07527](../references/index.md#ref-pp-is-f-07527) | Herschel-PLANCK Packet Structure ICD |  | reference |
| [RD-8] | [FIRST/FSC/DOC/0120](../references/index.md#ref-first-fsc-doc-0120) | Glossary document |  | reference |
| [RD-9] | [FIRST/FSC/DOC/0116](../references/index.md#ref-first-fsc-doc-0116) | HCSS SPMP | issue 2 | reference |
| [RD-10] | [catalogue](../references/index.md#ref-deleted) | Deleted. |  | reference |
| [RD-11] | [SCI-PT-IIDA/](../references/index.md#ref-sci-pt-iida) | Instrument Interface Document-Part A | issue 1.0 | reference |
| [RD-12] | [SCI-PT-IIDB/HIFI-02125](../references/index.md#ref-sci-pt-iidb-hifi-02125) | HIFI Instrument Interface Document-Part B | issue 1.0 | reference |
| [RD-13] | [SCI-PT-IIDB/PACS-02126](../references/index.md#ref-sci-pt-iidb-pacs-02126) | PACS Instrument Interface Document-Part B | issue 1.0 | reference |
| [RD-14] | [SCI-PT-IIDB/SPIRE-02124](../references/index.md#ref-sci-pt-iidb-spire-02124) | SPIRE Instrument Interface Document-Part B | issue 1.0 | reference |
| [RD-15] | [FIRST-SPI-DOC-000127](../references/index.md#ref-first-spi-doc-000127) | EGSE-ILT URD | draft 1 | reference |
| [RD-16] | [HICC-2000/01](../references/index.md#ref-hicc-2000-01) | RTA and MIB editor URD | draft 2 | reference |
| [RD-17] | [catalogue](../references/index.md#ref-obs-maintenance-urd-tbw) | OBS Maintenance URD, TBW |  | reference |
| [RD-18] | [PT-MP-TN-1001-TOS-OGH](../references/index.md#ref-pt-mp-tn-1001-tos-ogh) | Herschel mission planning concept | Issue 2.0 | reference |
| [HGSSE#1] | [FIRST/FSC/MOM/0097](../references/index.md#ref-first-fsc-mom-0097) | Herschel Ground Segment System Engineering Group meeting #1 |  | reference |
| [HGSSE#2] | [FIRST/FSC/MOM/0101](../references/index.md#ref-first-fsc-mom-0101) | Herschel Ground Segment System Engineering Group meeting #2 |  | reference |
| [HGSSE#3] | [FIRST/FSC/MOM/0104](../references/index.md#ref-first-fsc-mom-0104) | Herschel Ground Segment System Engineering Group meeting #3 |  | reference |
| [HGSSE#4] | [FIRST/FSC/MOM/0107](../references/index.md#ref-first-fsc-mom-0107) | Herschel Ground Segment System Engineering Group meeting #4 |  | reference |
| [HGSSE#5] | [FIRST/FSC/MOM/0129](../references/index.md#ref-first-fsc-mom-0129) | Herschel Ground Segment System Engineering Group meeting #5 |  | reference |
| [HGSSE#6] | [FIRST/FSC/MOM/0132](../references/index.md#ref-first-fsc-mom-0132) | Herschel Ground Segment System Engineering Group meeting #6 |  | reference |
| [HGSSE#7] | [FIRST/FSC/MOM/0142](../references/index.md#ref-first-fsc-mom-0142) | Herschel Ground Segment System Engineering Group meeting #7 |  | reference |
| [HGSSE#8] | [FIRST/FSC/MOM/0150](../references/index.md#ref-first-fsc-mom-0150) | Herschel Ground Segment System Engineering Group meeting #8 |  | reference |
| [HGSSE#9] | [PACS-KL-MM-010](../references/index.md#ref-pacs-kl-mm-010) | Herschel Ground Segment System Engineering Group meeting #9 |  | reference |
| [HGSSE#10] | [FIRST/FSC/MOM/0165](../references/index.md#ref-first-fsc-mom-0165) | Herschel Ground Segment System Engineering Group meeting #10 |  | reference |
| [HGSSE#11] | [FIRST/FSC/MOM/0171](../references/index.md#ref-first-fsc-mom-0171) | Herschel Ground Segment System Engineering Group meeting #11 |  | reference |
| [HGSSE#12] | [FIRST/FSC/MOM/0179](../references/index.md#ref-first-fsc-mom-0179) | Herschel Ground Segment System Engineering Group meeting #12 |  | reference |
| [HGSSE#13] | [FIRST/FSC/MOM/0190](../references/index.md#ref-first-fsc-mom-0190) | Herschel Ground Segment System Engineering Group meeting #13 |  | reference |
| [HGSSE#14] | [FIRST/FSC/MOM/0206](../references/index.md#ref-first-fsc-mom-0206) | Herschel Ground Segment System Engineering Group meeting #14 |  | reference |
| [HGSSE#15] | [Herschel/FSC/MOM/0213](../references/index.md#ref-herschel-fsc-mom-0213) | Herschel Ground Segment System Engineering Group meeting #13 |  | reference |
| [HGSSE#25] | [Herschel/HSC/MOM/0383](../references/index.md#ref-herschel-hsc-mom-0383) | Herschel Ground Segment System Engineering Group meeting #25 |  | reference |
| [HGSSE#26] | [Herschel/HSC/MOM/0404](../references/index.md#ref-herschel-hsc-mom-0404) | Herschel Ground Segment System Engineering Group meeting #26 |  | reference |
| [HGSSE#28] | [Herschel/HSC/MOM/0545](../references/index.md#ref-herschel-hsc-mom-0545) | Herschel Ground Segment System Engineering Group meeting #28 |  | reference |
| [FGSSW#2] | [catalogue](../references/index.md#ref-herschel-ground-segment-workshop-2-vilspa-13-15-october-1999) | Herschel Ground Segment Workshop#2, Vilspa 13-15 October 1999 | 13-15 October 1999 | reference |
| [HSC-FCT#1] | [HERSCHEL-HSC-MOM-0617](../references/index.md#ref-herschel-hsc-mom-0617) | FCT – HSC Teleconference #1 MoM |  | reference |
|  | [SCI-PT-RS-05991](../references/index.md#ref-sci-pt-rs-05991) | system requirements specification (top level requirement SINT-075 H/P) |  | mentioned |

!!! note "Notes"
    There are 74 numbered pages; the extraction reports 75 PDF pages, with printed page N at PDF p. N and the last PDF page empty. The cover title is garbled by the extraction (the initial capitals are lost). Figures 1-3 survive only as scattered labels. Many TOC page numbers are truncated in the text layer. The reference is printed FIRST/HSC/DOC/0117, but the TC History ICD (tc-history-icd) cites issue 2.0 as FIRST/FSC/DOC/0117, an earlier issue of this document. Oddities as printed: [HGSSE#15] is titled 'meeting #13'; AD-3 is dated 'xx August 2003'; RD-1, RD-6 and RD-10 are 'Deleted'; 'HSGSSE#5/#6' and 'HSGSSE#25' appear as typos for HGSSE; the first change-log dates use a US-style month/day format (10/29/99). The change record says section 3.1.17 was deleted, but the heading remains with its requirements marked deleted. Cited library items: [RD-4] OIRD = cosmos-operations-interface-requirements; [RD-7] Packet Structure ICD = ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d (cited here under the older number PP-IS-F-07527).

