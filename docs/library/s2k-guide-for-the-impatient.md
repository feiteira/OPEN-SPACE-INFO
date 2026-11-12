---
title: "SCOS 2000 User Guide for the impatient (PACS)"
description: "A seven-page quick-start from the Herschel PACS instrument team (reference PICC-ME-MN-001, V 2.0, 20 April 2004) for running the SCOS-2000(../scos2000/index.md)-based instrument EGSE used during PACS "
tags: ["User Manual", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [s2k-guide-for-the-impatient]
---

# SCOS 2000 User Guide for the impatient

<dl class="osi-meta"><dt>Document ID</dt><dd>PICC-ME-MN-001</dd><dt>Issue / version</dt><dd>V 2.0</dd><dt>Date</dt><dd>2004-04-20</dd><dt>Organisation</dt><dd>Herschel PACS instrument team (organisation not printed; the running header shows 'Herschel' and 'PACS')</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Issue V 2.0 of 04/20/04, 'Update for SCOS 2000 V2.3e Patch 3'. It replaces V 1.0 of 22-Oct-03, the initial version (Document Change Record, PDF p. 2).</dd><dt>Pages</dt><dd>7</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002288_MOM_PAC_SCOS%202000%20User%20Guide%20for%20the%20impatient/s2k-guide-for-the-impatient.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002288_MOM_PAC_SCOS%202000%20User%20Guide%20for%20the%20impatient/s2k-guide-for-the-impatient.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:04Z</dd><dt>SHA-256</dt><dd><code>22bb967c72023d767272bd8c77309750e8bdda5bcfa5a481ff35ed32eb9ad968</code></dd><dt>Size</dt><dd>176.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/s2k-guide-for-the-impatient.pdf">s2k-guide-for-the-impatient.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A seven-page quick-start from the Herschel **PACS** instrument team (reference PICC-ME-MN-001, V 2.0, 20 April 2004) for running the [SCOS-2000](../scos2000/index.md)-based instrument EGSE used during PACS instrument level tests (ILT). Version 2.0 updates the October 2003 original for SCOS 2000 V2.3e Patch 3.

It gives the start-up order of the [EGSE](../scos2000/egse.md) software. First the operator starts the EGSE router and EGSE gateway together, then a single TeiGateway instance. Next comes the SCOS 2000 task launcher (`s2.start`, which must be run from a csh rather than a tcsh terminal). There the 'EGSEsrv' button selects all server applications and the 'Client' button the standard client applications used during PACS ILT. The operator then logs in through the 'Users' button of the desktop top bar. The Test and Operations Procedure Environment (TOPE) has its own launcher (`exif.start`), with the external-interface tasks EXIF_TMM, EXIF_TM1, EXIF_CHM, EXIF_CH1 and TOPE1.

A short table maps launcher names to SCOS-2000 applications: MON (telemetry desktop with alphanumeric, strip-chart, scrolling and mimic displays), VPD (variable packet display), MSTK (manual command stack), TCHIST (telecommand history), OOL (out-of-limits display) and EVLOG (message display). The guide also explains that starting a second TOPE procedure suspends the running one. To run procedures in parallel, the operator opens another TOPE window with its own EXIF_CHx task. The 'Useful Documents' list names the TOS-GCI user manual of each SCOS-2000 operator application, so the guide also serves as an index of the 2.3e manual set used on [Herschel/Planck](../missions/herschel-planck.md).


## Key points

- Acronyms defined: EXIF (SCOS External Interface services), ILT (Instrument Level Test), TCL (Tool Command Language) and TOPE (Test and Operations Procedure Environment). *(PDF p. 3)*
- SCOS 2000 and TOPE are not started at login; both are started manually. *(PDF p. 3)*
- The EGSErouter and EGSEgateway are started together with one command and log to two pop-up terminal windows; only one TeiGateway instance is allowed. *(PDF p. 4)*
- The SCOS 2000 task launcher must be started from a plain csh login terminal, not tcsh; the 'EGSEsrv' button selects all SCOS 2000 server applications, and start-up takes a few minutes. *(PDF p. 4)*
- The SCOS 2000 desktop has a top bar with the workstation settings and a bottom bar showing the three most recent log messages; the alarm tone can be switched off from the top bar. *(PDF p. 5)*
- The 'Client' button of the task launcher starts the standard SCOS 2000 client applications used during PACS ILT. *(PDF p. 6)*
- TOPE is started from its own launcher with the tasks EXIF_TMM, EXIF_TM1, EXIF_CHM, EXIF_CH1 and TOPE1. *(PDF p. 6)*
- Application names: MON telemetry desktop, VPD variable TM packet display, MSTK manual command stack, TCHIST telecommand history, OOL out-of-limit display, EVLOG message display; the digit after the name gives the screen. *(PDF p. 7)*
- A TOPE procedure started while another is running suspends the active one until it ends; parallel procedures need another TOPE window and another EXIF_CHx task. *(PDF p. 7)*


## Cited by these wiki pages (5)

- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (13 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 0 | Preface | 2 |
    | 0.1 | Document Change Record | 2 |
    | 0.2 | Table of Contents | 2 |
    | 1 | Introduction | 3 |
    | 1.1 | Useful Documents | 3 |
    | 1.2 | Acronyms | 3 |
    | 2 | Login | 3 |
    | 3 | Starting Up EGSE software | 4 |
    | 3.1 | Starting the Router, EGSEgateway and TeiGateway | 4 |
    | 3.2 | Starting SCOS 2000 | 4 |
    | 3.3 | Starting TOPE | 6 |
    | 4 | Using SCOS 2000 | 7 |
    | 5 | Using TOPE | 7 |


## Documents this one references (8)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [S2K-MCS-SUM-0100-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0100-tos-gci) | EXTERNAL INTERFACE & TOPE SOFTWARE USER MANUAL |  | reference |
|  | [S2K-MCS-SUM-2110-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2110-tos-gci) | SCOS-2000 Desktop Operator User Manual | V1.2 | reference |
|  | [S2K-MCS-SUM-2120-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2120-tos-gci) | SCOS-2000 Event Logger Software User Manual |  | reference |
|  | [S2K-MCS-SUM-2210-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2210-tos-gci) | SCOS-2000 Telemetry Desktop Software User Manual |  | reference |
|  | [S2K-MCS-SUM-2220-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2220-tos-gci) | SCOS-2000 Out of Limits Display Operator User Manual |  | reference |
|  | [S2K-MCS-SUM-2230-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2230-tos-gci) | SCOS-2000 Variable Packet Display Operator User Manual |  | reference |
|  | [S2K-MCS-SUM-2310-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2310-tos-gci) | SCOS-2000 Manual Stack Operator User Manual |  | reference |
|  | [S2K-MCS-SUM-2360-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-2360-tos-gci) | SCOS-2000 Command History Operator User Manual |  | reference |

!!! note "Notes"
    PDF p. 1 carries the SPIRE archive stamp SPIRE-PAC-DOC-002288. The archive folder is named '002288_MOM_PAC', although the document is a user guide, not minutes. No author is printed. The date is printed as 'April 20, 2004' in the header and '04/20/04' in the change record. The guide gives a local Unix account and the SCOS 2000 desktop user name and password used at the PACS test site, which this catalogue does not reproduce. Screenshots (Illustrations 1-6) survive only as captions. The text extraction has a trailing empty page 8.

