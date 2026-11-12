---
title: "Terma CCS5, SCS5 & TSC data sheet"
description: "A two-page commercial data sheet from Terma for three related spacecraft control and checkout products: SCS5 (multi-user operations version, used for all mission phases from operations preparation and"
tags: ["Other", "Tools, MIB editors and related standards"]
sources: [terma-ccs5-datasheet]
---

# Data sheet - CCS5, SCS5 &amp; TSC

<dl class="osi-meta"><dt>Organisation</dt><dd>Terma</dd><dt>Type</dt><dd>Other</dd><dt>Status</dt><dd>Commercial product data sheet; no issue or date printed. The PDF metadata gives a creation date of 18 May 2018, which is not printed on the sheet.</dd><dt>Pages</dt><dd>2</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://tgss.terma.com/wp-content/uploads/datasheet-CCS5.pdf" rel="noopener">https://tgss.terma.com/wp-content/uploads/datasheet-CCS5.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:15Z</dd><dt>SHA-256</dt><dd><code>d988372d9f87c2038c46a106e38b1a5871a89ad1df21d2721ea802b767e39a50</code></dd><dt>Size</dt><dd>224.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/terma-ccs5-datasheet.pdf">terma-ccs5-datasheet.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A two-page commercial data sheet from Terma for three related spacecraft control and checkout products: SCS5 (multi-user operations version, used for all mission phases from operations preparation and launch to routine operations), CCS5 (multi-user checkout version, used within an EGSE for spacecraft assembly, integration and test) and TSC (a lightweight single-user version, for example for instrument or payload testing).

The sheet lists the functional scope: telemetry reception and frame processing (virtual channel filtering, gap detection, authentication, decryption), parameter monitoring and alphanumeric, graphic and synoptic displays, commanding with a manual stack, CLTU generation and COP-1 flow control, command verification history, archiving and retrieval, session management, reporting and hot redundancy. Automation uses the TOPE procedure language, which includes Tcl/Tk 8.6.

Of direct interest to MIB readers, the TM/TC database is described as the SCOS-2000 MIB ICD 6.9 'extended' (for example unlimited field lengths, multiple databases, deduced parameters in TM and TC, big- and little-endian parameters, VPD_CHOICE and dynamic housekeeping definitions); the command sequence tables are not supported. The archive is an open format of raw binary segmented files indexed in MySQL or PostgreSQL. Supported standards include ECSS-E-ST-50-01C/03C/04C, ESA PSS-04-106/107/151, several CCSDS Blue Books and PUS ECSS-E-70-41A; protocol drivers cover EDEN, C&C, ZDS Cortex, ESA NIS and SLE RAF and F-CLTU. It also describes a Qt-based user interface, an SVF mode, TM simulation and TC modelling, and the Windows and Linux platforms.

It is useful as evidence of how commercial EGSE products reuse the SCOS-2000 MIB as their database format.


## Key points

- SCS5 and CCS5 are multi-user products and TSC is the much lighter single-user version; CCS5 is used in EGSE for spacecraft assembly and integration testing, SCS5 for all phases of spacecraft operations. *(PDF p. 1)*
- Commanding features include a manual stack, CLTU generation, COP-1 handling and flow control, and command verification history; TM processing includes VC filtering, gap detection, authentication and decryption. *(PDF p. 1)*
- The TM/TC database is the SCOS2000 MIB ICD 6.9 'extended', for example with unlimited field lengths, deduced parameters in TM and TC, big- and little-endian parameters, VPD_CHOICE and dynamic HK definition. *(PDF p. 1)*
- TC sequence tables of the MIB are not supported; TOPE or command stack files are to be used instead. An online MIB table browser exists and all tables are accessible from TOPE. *(PDF p. 2)*
- Automation uses the TOPE language, which includes Tcl/Tk 8.6 and extension packages such as [incr Tcl]. *(PDF p. 2)*
- Archive format: raw binary segmented files with header and content, with an index stored in an RDBMS (MySQL or PostgreSQL). *(PDF p. 2)*
- Listed PUS support is ECSS-E-70-41A; frame/packet coding standards listed are ECSS-E-ST-50-01C, 03C, 04C, ESA PSS-04-106, 107, 151 and CCSDS 102.0-B-5, 201.0-B-3, 202.0-B-3, 202.1-B-2 and 301.0-B-3. *(PDF p. 2)*
- Main protocols: EDEN and C&C for checkout/EGSE, ZDS Cortex and ESA NIS for ground stations, and SLE (RAF and F-CLTU) with the uNIS option. *(PDF p. 2)*
- Software platform is C++ on Qt 5.7 (commercial); runs on Windows (tested on Windows 7) and Linux (tested on RHEL7, installed as RPM). *(PDF p. 2)*


## Cited by these wiki pages (3)

- [MIB tooling and open-source libraries](../mib/tooling.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (12 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Usage | 1 |
    |  | Features | 1 |
    |  | TMTC data base | 1 |
    |  | Automation language | 2 |
    |  | Archive | 2 |
    |  | Graphical displays | 2 |
    |  | Special features | 2 |
    |  | Standards & protocols | 2 |
    |  | Operating systems | 2 |
    |  | Software platform | 2 |
    |  | Support | 2 |
    |  | Products | 2 |


## Documents this one references (18)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-scos2000-mib-icd-6-9-extended) | SCOS2000 MIB ICD 6.9 (extended) | 6.9 | mentioned |
|  | [ECSS-E-ST-50-01C](../references/index.md#ref-ecss-e-st-50-01c) · [library](ecss-e-st-50-01c31july2008.md) | ECSS-E-ST-50-01C (packet and frame coding and flow control) |  | mentioned |
|  | [ECSS-E-ST-50-03C](../references/index.md#ref-ecss-e-st-50-03c) · [library](ecss-e-st-50-03c-31july2008.md) | ECSS-E-ST-50-03C (packet and frame coding and flow control) |  | mentioned |
|  | [ECSS-E-ST-50-04C](../references/index.md#ref-ecss-e-st-50-04c) · [library](ecss-e-st-50-04c31july2008.md) | ECSS-E-ST-50-04C (packet and frame coding and flow control) |  | mentioned |
|  | [ESA PSS-04-106](../references/index.md#ref-esa-pss-04-106) · [library](esa-pss-04-106-issue1-january1988.md) | ESA PSS-04-106 |  | mentioned |
|  | [ESA PSS-04-107](../references/index.md#ref-esa-pss-04-107) · [library](esa-pss-04-107-issue2-april1992.md) | ESA PSS-04-107 |  | mentioned |
|  | [ESA PSS-04-151](../references/index.md#ref-esa-pss-04-151) · [library](esa-pss-04-151-issue1-september1992.md) | ESA PSS-04-151 |  | mentioned |
|  | [CCSDS 102.0-B-5](../references/index.md#ref-ccsds-102-0-b-5) | CCSDS 102.0-B-5 |  | mentioned |
|  | [CCSDS 201.0-B-3](../references/index.md#ref-ccsds-201-0-b-3) | CCSDS 201.0-B-3 |  | mentioned |
|  | [CCSDS 202.0-B-3](../references/index.md#ref-ccsds-202-0-b-3) | CCSDS 202.0-B-3 |  | mentioned |
|  | [CCSDS 202.1-B-2](../references/index.md#ref-ccsds-202-1-b-2) | CCSDS 202.1-B-2 |  | mentioned |
|  | [CCSDS 301.0-B-3](../references/index.md#ref-ccsds-301-0-b-3) | CCSDS 301.0-B-3 |  | mentioned |
|  | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Packet Utilization (PUS) |  | mentioned |
|  | [catalogue](../references/index.md#ref-eden-protocol-checkout-and-egse) | EDEN protocol (checkout and EGSE) |  | mentioned |
|  | [catalogue](../references/index.md#ref-c-c-protocol-checkout-and-egse) | C&C protocol (checkout and EGSE) |  | mentioned |
|  | [catalogue](../references/index.md#ref-zds-cortex-ground-station-protocol) | ZDS Cortex ground station protocol |  | mentioned |
|  | [catalogue](../references/index.md#ref-esa-nis-ground-station-protocol) | ESA NIS ground station protocol |  | mentioned |
|  | [catalogue](../references/index.md#ref-sle-raf-f-cltu-with-unis-option) | SLE (RAF & F-CLTU) with uNIS option |  | mentioned |

!!! note "Notes"
    Two-column marketing data sheet; the text layer interleaves the two columns, so headings and lists appear mixed in the extracted text. The extracted text has a third, empty page after a trailing form feed; the PDF has 2 pages. No author is printed (the PDF metadata names a Terma author, not recorded here). Companion to the Terma presentation terma-ccs5-tsc-presentation. CCSDS standard titles are not printed, only their numbers.

