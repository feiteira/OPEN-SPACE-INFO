---
title: "SCOS-2000: ESA's Spacecraft Control for the 21st Century"
description: "A 30-slide presentation by Nestor Peccia (ESA) at GSAW 2003 (4-6 March 2003) giving an overview of SCOS-2000, ESA's generic spacecraft control system."
tags: ["Presentation", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [gsaw2003-peccia]
---

# SCOS-2000 ESA’s Spacecraft Control for the 21st Century

<dl class="osi-meta"><dt>Date</dt><dd>4th – 6th March 2003</dd><dt>Organisation</dt><dd>European Space Agency (ESA)</dd><dt>Authors</dt><dd>Nestor Peccia</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Presentation to GSAW 2003, 4th – 6th March 2003 (title slide, PDF p. 1).</dd><dt>Pages</dt><dd>30</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://gsaw.org/wp-content/uploads/2020/06/2003s02peccia.pdf" rel="noopener">https://gsaw.org/wp-content/uploads/2020/06/2003s02peccia.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:32Z</dd><dt>SHA-256</dt><dd><code>9dd35715ee59ce976ffad8848dd8113f25904ec4f45abded21acb8fc2ce33d8d</code></dd><dt>Size</dt><dd>1.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/core/gsaw2003-peccia.pdf">gsaw2003-peccia.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 30-slide presentation by Nestor Peccia (ESA) at GSAW 2003 (4-6 March 2003) giving an overview of SCOS-2000, ESA's generic spacecraft control system. It opens with ESA's objectives (reusable infrastructure for any class of orbit or mission, reused for MCS, EGSE and station control), its working methodology linking studies, prototypes, products and ECSS/CCSDS standards, and its product-line licensing model (free, non-exclusive licences for European companies; 54 SCOS-2000 licences in 3 years). It characterises geostationary, low-Earth-orbit and deep-space missions and traces ESA control systems from MSSS (frame telemetry) through SCOS-I (packet telemetry) and SCOS-II to SCOS-2000.

Further slides place SCOS-2000 in the ground segment (NCTRS, ESA ground stations, SLE, flight dynamics, mission planning, a LEOP room layout and the INTEGRAL MCS as an example), list ESA and external client missions, including the Herschel/Planck central checkout system and instrument EGSE, and give the version roadmap: Classic (Solaris, ObjectStore, Orbix, up to 2.4.1), Evolution 2.1.e/2.3.e (Linux SUSE 7.3, POST, OmniOrb), 3.0 (January 2003), 3.1 and 4.0 (multi-mission, full EGSE compliance). Architecture slides cover the object-oriented component design, enabling technology and standards (CCSDS packet TM/TC, ECSS PUS, SLE), client and server processes, software layers, system interfaces and top-level components.

The functional slides are the most useful for this wiki: manual stack and autostack commanding, static and dynamic PTV, release dependencies, interlocking, the on-board queue model and multi-stage verification; the packetiser, CLCW extraction, synthetic parameters, calibration, limit and status checks and display types (AND, GRD, mimics, scrolling); and SPID-based packet filing. It ends with lessons learned and the EGOS product family.


## Key points

- ESA's operational-software licence is free of charge for any ESA member state company, non-exclusive, not resaleable and for peaceful purposes only; SCOS-2000 had 54 licences in 3 years. *(PDF p. 7)*
- History: MSSS 1984-1996 (centralised, frame TM/TC, FORTRAN/Assembler); SCOS-I since 1989 (packet telemetry, no generic TC chain, FORTRAN/VMS); SCOS-II 1995-1999 (distributed, C++/UNIX), superseded by SCOS-2000. *(PDF p. 9)*
- SCOS-2000 interfaces NCTRS over OPSNET/ESANET to the ESA ground stations, with SLE and a planned migration to TCP/IP. *(PDF p. 11)*
- A LEOP configuration has prime and backup S2K servers and NCTRS, with 15 client workstations in the Main Control Room. *(PDF p. 12)*
- Client missions in development included Rosetta, Mars Express, SMART-1, Venus Express, CryoSat (first ESA mission on the evolution platform), GOCE, ADM, Herschel/Planck MCS and the Herschel/Planck Central Checkout System (Red Hat 7.2); external users included 20 European scientific institutes using Herschel/Planck instrument EGSE (SUSE 7.3). *(PDF p. 14)*
- Versions: Classic (Sun, Solaris 2.6, ObjectStore, Orbix, culminating in 2.4.1); Evolution 2.1.e/2.3.e (PC, Linux SUSE 7.3 or Solaris 2.6, POST and OmniOrb); 3.0 January 2003 (lines merged, Solaris 8); 3.1 September 2003; 4.0 June 2004 (multi-mission, full EGSE compliant). *(PDF p. 16)*
- Enabling standards: CCSDS packet telemetry and telecommand, the ECSS Packet Utilisation Standard and CCSDS SLE; COTS include ILOG Views, Ctree+ for the packet archive; Flex/Bison parse the OL and zlib compresses packets. *(PDF p. 18)*
- Server processes include the TM packetiser, limits checker, synthetic parameter packet generator, TC multiplexer, releaser, verifier and OBQM, archive, and events and actions servers. *(PDF p. 19)*
- NCTRS ground-station interfaces listed: TMP4, TCE, MKII, MPTS MKIII and STC II; FOP production tool command sequences are imported into the MIB. *(PDF p. 23)*
- Commanding: manual stack (encoding, de-calibration, time-tagging, release dependencies, interlocking, static/dynamic PTV, sequences), autostack, multiplexer, releaser to NCTRS, on-board queue model and multi-stage command verifier. *(PDF p. 25)*
- Monitoring: packet reconstruction from frames, CLCW extraction, quality and sequence checks, supercommutated parameter extraction, OL/compiled/hard-coded synthetic parameters, calibration, limits, expected status and status consistency checks. *(PDF p. 26)*
- Displays: alphanumeric (AND) with 32 or 64 parameters, graphics (GRD) with 1-8 parameters, mimics, scrolling (SCD), telemetry query display and packet history displays. *(PDF p. 27)*
- All received packets are filed centrally with C-Tree+ by type (TM, TC, event), SPID, datastream and time, with retrievals independent of real-time handling and hot switch to the backup server. *(PDF p. 28)*
- EGOS product family includes NCTRS/SLE, SIMSAT, GFTS, GDDS (Generic Data Disposition System), ADAS, APES, EVA, EGSE, MPS and FDS. *(PDF p. 30)*


## Cited by these wiki pages (19)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [Display definitions in the MIB](../mib/displays.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [How it all fits together](../overview/index.md)
- [Missions](../missions/index.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [ST[11] Time-based scheduling](../ecss/pus/st11-time-based-scheduling.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (29 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title slide | 1 |
    |  | Overview | 2 |
    |  | ESA Objectives | 3 |
    |  | ESA working methodology | 4 |
    |  | The challenges | 5 |
    |  | Product Line | 6 |
    |  | ESA Missions Characteristics | 8 |
    |  | History of ESA control systems | 9 |
    |  | Characteristics of a good MCS : ESA's view | 10 |
    |  | Complete system overview | 11 |
    |  | Spacecraft control systems - LEOP system | 12 |
    |  | An S2K based MCS in a GS Context | 13 |
    |  | S2K Client missions (ESA) | 14 |
    |  | S2K Client missions (External Users) | 15 |
    |  | SCOS-2000 Versions | 16 |
    |  | SCOS-2000 Architecture concepts | 17 |
    |  | SCOS-2000 Enabling Technology | 18 |
    |  | SCOS-2000 Client / Server | 19 |
    |  | SCOS-2000 Architecture Context | 20 |
    |  | SCOS-2000 Software Layers | 21 |
    |  | SCOS-2000 System Overview | 22 |
    |  | System interfaces | 23 |
    |  | Top level components | 24 |
    |  | Commanding functions | 25 |
    |  | Monitoring functions | 26 |
    |  | Monitoring functions (displays, TM processing control) | 27 |
    |  | Distribution and filing | 28 |
    |  | Lessons learned | 29 |
    |  | A vision for the future | 30 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-european-and-international-standards-ecss-ccsds) | European and International standards (ECSS, CCSDS) |  | mentioned |
|  | [ECSS-E40](../references/index.md#ref-ecss-e40) | Project control and documentation (ECSS-E40) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-standards-for-packet-telemetry-and-telecommands) | CCSDS standards for Packet Telemetry and Telecommands |  | mentioned |
|  | [catalogue](../references/index.md#ref-ecss-packet-utilisation-standards) | ECSS Packet Utilisation Standards |  | mentioned |
|  | [catalogue](../references/index.md#ref-space-link-extension-sle-standard-an-ccsds-standard) | Space Link Extension (SLE) standard, an CCSDS standard |  | mentioned |

!!! note "Notes"
    Slide deck; one slide per PDF page (30 slides, plus an empty trailing page in the text). Diagram slides (system overview, LEOP rooms, INTEGRAL ground segment, layers, components) extract as scattered labels, and slide 4 duplicates words from shadow text. 'GSAW' is not expanded in the slides. Slide 16 prints 'POST' and slide 18 'POST++'. 'superceded' and 'Itallian' are as printed. No reference list.

