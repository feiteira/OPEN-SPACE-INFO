---
title: "Right-Sizing Test Tools (CMDVS, SESP 2010)"
description: "A five-page SESP 2010 conference paper by Andy Armitage of Terma BV describing CMDVS (Commanding Monitoring Data-handling & Visualization System), a 'small' monitoring and control system that Terma de"
tags: ["Paper", "Tools, MIB editors and related standards"]
sources: [indico-109-armitage-2011926]
---

# Right-Sizing Test Tools: A low cost alternative to full-scall system checkout equipment for Instrument &amp; Payload Applications

<dl class="osi-meta"><dt>Document ID</dt><dd>SESP 2010</dd><dt>Date</dt><dd>2010</dd><dt>Organisation</dt><dd>Terma BV (Leiden, The Netherlands)</dd><dt>Authors</dt><dd>Andy Armitage</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper for SESP 2010 (PDF p. 1), posted on ESA Indico event 109; no status stated.</dd><dt>Pages</dt><dd>5</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/109/contributions/191/attachments/293/331/2011926_armitage.pdf" rel="noopener">https://indico.esa.int/event/109/contributions/191/attachments/293/331/2011926_armitage.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:16Z</dd><dt>SHA-256</dt><dd><code>6660d7e13f177fbd62effe5082bd93bd54249a2cd2b06e1d92db79be00747287</code></dd><dt>Size</dt><dd>123.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/indico-109-armitage-2011926.pdf">indico-109-armitage-2011926.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A five-page SESP 2010 conference paper by Andy Armitage of Terma BV describing CMDVS (Commanding Monitoring Data-handling & Visualization System), a 'small' monitoring and control system that Terma developed with Satellite Services BV (SSBV) for instrument- and payload-level EGSE, with features equivalent or compatible to SCOS-2000-based central checkout systems (CCS).

The motivation section explains why SCOS-2000-based EGSE was felt to be too heavy at instrument level: complex to develop, configure and use; front ends had to be described in a separate EGSE TM/TC database; the SCOS-2000 telecommand chain was limited to 2 packets per second with checking (20 without); and maintenance on modern platforms was getting more expensive. Terma's answer was a new Qt-based system that keeps the same test language (TOPE/Tcl) and the SCOS-2000 MIB database interface, so that users and database producers need not change. At the start of 2010 all SCOS-2000 telemetry and commanding model features had been implemented.

The key idea is front-end interfacing through plugins generated from SSBV's API headers, introspected at runtime, instead of TM/TC packets, which removes the need for an EGSE database and ICDs. The paper lists improvements over SCOS-2000: variable-packet contents calibrated and limit-checked like fixed packets, variable-length parameters in TM and TC, database-driven TC headers, 64-bit PUS type codes, configurable source sequence counts and up to 64 configurable verification stages. It describes use as an intelligent SCOE (Galileo FOC SMS), subsystem simulation, reuse of the plugin approach in SCOS-2000-based CCS, and a proposal to standardise front-end API descriptions (for example CORBA IDL or WSDL). Missions named include BepiColombo, Sentinel-1 and -2, EarthCARE, Galileo FOC and SGEO.


## Key points

- At the start of 2010 the Terma/SSBV 'small' monitoring and control system implemented all monitoring and control features of SCOS2000; it had been used at payload or instrument level on BepiColombo, Sentinel1, Sentinel2, EarthCare, Galileo FOC and SGEO. *(PDF p. 1)*
- The paper states that the SCOS2000 telecommand chain is limited to 2 packets per second with checking or 20 with no checking, which is insufficient for some modern front ends. *(PDF p. 1)*
- Previous monitoring and control systems are said to have cost of the order of 30 MEURO to develop; the new system kept the CCS test language and the SCOS2000 MIB database interface to preserve continuity for users and database developers. *(PDF p. 2)*
- The SCOS2000 MIB database interface is described as not perfectly normalized but well known, relatively well described and well understood in industry. *(PDF p. 2)*
- Front ends are interfaced through runtime-introspected Qt C++ plugins built from the SSBV API headers instead of TM/TC packets; the system was named CMDVS ('Commanding Monitoring Data-handling & Visualization System'). *(PDF p. 2)*
- CMDVS makes variable-packet contents available to test sequences, calibrated and limit-checked like fixed-packet parameters, supports variable-length parameters in TM and TC, and generates TC headers entirely from the database without assuming CCSDS headers. *(PDF p. 3)*
- CMDVS supports all SCOS2000 TC verification stages plus a finalisation stage, and up to 64 verification stages configurable by a mask; source sequence count strategies are configurable without touching the generic verification code. *(PDF p. 3)*
- The dynamic plugin approach was reused in the SCOS2000-based CCS, where the external interface manager became a generic process with a project-specific plugin whose API is loaded automatically into test sequences. *(PDF p. 5)*
- The author proposes standardising only the format in which front-end suppliers describe their APIs (for example CORBA IDL or WSDL) rather than the front-end interfaces themselves. *(PDF p. 5)*


## Cited by these wiki pages (7)

- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Missions](../missions/index.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (12 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Introduction | 1 |
    |  | Motivations | 1 |
    |  | Front end interfacing | 2 |
    |  | Fully featured | 3 |
    |  | Compatible | 3 |
    |  | Adaptable | 3 |
    |  | Portable | 3 |
    |  | Benefits for both developer and end-user | 4 |
    |  | Possibilities for SCOE and instrument EGSE | 4 |
    |  | Possibilities for subsystem simulation | 4 |
    |  | Benefits for system level EGSE | 5 |
    |  | Future potential | 5 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-cmdvs-web-site-http-projects-nl-terma-com-cmdvs) | CMDVS web site (http://projects.nl.terma.com/CMDVS) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ssbv-cms-product) | SSBV CMS product |  | mentioned |
|  | [catalogue](../references/index.md#ref-scos2000-mib-database-interface) | SCOS2000 MIB database interface |  | mentioned |
|  | [catalogue](../references/index.md#ref-packet-utilisation-standard-type-codes-function-codes) | Packet utilisation standard type codes/function codes |  | mentioned |
|  | [catalogue](../references/index.md#ref-corba-idl) | CORBA IDL |  | mentioned |
|  | [catalogue](../references/index.md#ref-wsdl-xml-format) | WSDL (XML format) |  | mentioned |

!!! note "Notes"
    The title page prints the subtitle with the typo 'full-scall' (for full-scale); it is kept as printed. The event is named only as 'SESP 2010'; no precise date is printed (the file was posted on ESA Indico event 109). The author's e-mail address on the title page is omitted here. No reference list. The extracted text has an empty sixth page after a trailing form feed. The product described (CMDVS) is a predecessor of Terma's TSC/CCS5 line documented in terma-ccs5-tsc-presentation (this relationship is inferred, not stated in this paper).

