---
title: "Mars Express spacecraft and payload data handling"
description: "A chapter of ESA SP-1291, 'Mars Express: The Scientific Investigations' (June 2009), by J."
tags: ["Paper", "Mission data delivery documents"]
sources: [sp-1291-data-handling]
---

# Spacecraft and Payload Data Handling

<dl class="osi-meta"><dt>Document ID</dt><dd>SP-1291</dd><dt>Date</dt><dd>2009-06</dd><dt>Organisation</dt><dd>European Space Agency (ESA Publications; authors from ESA/ESTEC, ESA/ESOC, ESA/ESAC and instrument institutes)</dd><dt>Authors</dt><dd>J. Zender, F. Delhaise, C. Arviset, D. Heather, J. Diaz del Rio, N. Manaud, J. Vazquez Garcia, J. Hernandez, I. Ortiz, J. Dowson, S. Jeffers, T. Roatsch, K-D. Matz, G. Poulleau, Y. Langevin, B. Gondet, A. Reberac, J.F. Daloze, E. Dimarellis, L. Carone, C. Stanzel, M. D'Amore, R. Orosei, R. Noschese, M. Cartacci, S. Giuppi, R. Huff, R. Johnson, C. Acton, B. Semenov, E. Guinness, S. Slavney</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Published book chapter in ESA SP-1291 'Mars Express: The Scientific Investigations', June 2009 (PDF p. 1), part 'Operations and Archiving' (PDF p. 2), printed pages 257-276.</dd><dt>Pages</dt><dd>22</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://sci.esa.int/documents/33745/35957/1567257877455-SP-1291_Data-Handling.pdf" rel="noopener">https://sci.esa.int/documents/33745/35957/1567257877455-SP-1291_Data-Handling.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:11Z</dd><dt>SHA-256</dt><dd><code>c79aae8275371a6e453371a43cfba77c8e0f4204bc74083a335e0bf13b9a6326</code></dd><dt>Size</dt><dd>1.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/sp-1291-data-handling.pdf">sp-1291-data-handling.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A chapter of ESA SP-1291, 'Mars Express: The Scientific Investigations' (June 2009), by J. Zender (ESTEC), F. Delhaise (ESOC), C. Arviset (ESAC) and some thirty co-authors from ESA and the instrument teams. It traces Mars Express data from the spacecraft through the ground segment and the instrument teams to the Planetary Science Archive (PSA).

The ground-segment sections are the most relevant to this wiki. They define the processing levels (level 0 raw telemetry, level 1 cleaned, merged and time-ordered packets, level 1a separated by instrument, up to level 3) and their CODMAC and PDS equivalents. They describe the ESOC Operations Control Centre shared by Rosetta, Mars Express and Venus Express: the SCOS-2000-based Mission Control System (real-time housekeeping processing, command verification, out-of-limit checks, calibration, UTC time stamping with an accuracy below 2 ms, command history), the Data Distribution System (DDS) built on the Generic Data Disposition System (GDDS), the Mission Planning System and the Flight Operations Procedure system. They explain how NCTRS receives Earth-reception-time-stamped telemetry from the ground stations and forwards telecommands, and how the DDS handles XML requests (standing orders, web or FTP), retrieves data from the SCOS-2000 packet and file archives over CORBA, and delivers by web, FTP or CD-ROM, with SFDU-based formats and a ten-year archive of level 1 data.

The later sections cover the PDS standard (ODL keyword=value labels, data dictionary, catalogue files, EAICDs), the archive process and peer review, the PSA user interfaces, and the datasets of each instrument (ASPERA-3, HRSC, MaRS, OMEGA, PFS, SPICAM, MARSIS) and SPICE kernels.


## Key points

- Processing levels in the Mars Express archive plan: level 0 raw telemetry as received at the ground station; level 1 cleaned, merged, time-ordered data in packet format; level 1a separated by instrument; level 1b sorted by data type and mode; level 2 calibrated; level 3 higher-level products. *(PDF p. 5)*
- Rosetta, Mars Express and Venus Express share nearly identical data management systems at the ESOC Operations Control Centre, to reduce cost, risk and development time. *(PDF p. 5)*
- The SCOS-2000-based MCS processes housekeeping data in real time (command verification, out-of-limit detection, calibration) and time-stamps telemetry by converting on-board time to UTC with an accuracy below 2 ms. *(PDF p. 5)*
- The DDS is based on the Generic Data Disposition System (GDDS) and also produces raw data media for permanent archiving; the MCS itself has no remote access, so external users reach mission data only via the DDS. *(PDF p. 6)*
- NCTRS is the ground-station interface of the MCS: it receives telemetry already time-stamped with Earth Reception Time, forwards telecommands to the stations, and stores tracking data (antenna angles, range, Doppler). *(PDF p. 6)*
- Mission products include payload science data, all platform and payload housekeeping and auxiliary data (TC history, station visibility, orbit, attitude); a common SFDU-based interchange standard is used, and all level 1 data are archived for ten years after the end of the mission. *(PDF p. 7)*
- The SCOS-2000 mission archive has a packet archive (historical TM, TC and derived data) and a file archive (flight dynamics and planning data); GDDS requests come as standing orders, via the web interface or as FTP request files, expressed in a recursive XML query language. *(PDF p. 7)*
- The DDS server initiates archive retrievals on the MCS via a CORBA-based interface and delivers data online, by FTP or on CD-ROM; online retrieval embeds the data as a byte stream in the XML response and is meant only for previews. *(PDF p. 8)*
- The PDS standard was chosen early for Rosetta, Mars Express and SMART-1; it uses the Object Description Language (keyword = value labels) with keywords defined in the Planetary Science Data Dictionary. *(PDF p. 9)*


## Cited by these wiki pages (10)

- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)


??? abstract "Contents (24 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 3 |
    | 2 | The Ground Segment | 5 |
    | 2.1 | Overview | 5 |
    | 2.2 | Collection of Telemetry Data | 6 |
    | 2.3 | Dissemination of Raw Data | 7 |
    | 2.3.1 | Dissemination of Mission Raw Data via the Mars Express DDS | 7 |
    | 3 | Scientific Processing and Data Archive Preparation | 9 |
    | 3.1 | Overview | 9 |
    | 3.2 | The Planetary Data System (PDS) Standard | 9 |
    | 3.3 | The Scientific Archive Process | 12 |
    | 4 | Planetary Science Archive | 14 |
    | 5 | Available Mars Express Datasets | 16 |
    | 5.1 | General Dataset Characteristics | 16 |
    | 5.2 | ASPERA-3 (Analyser of Space Plasmas and Energetic Neutral Atoms) | 16 |
    | 5.3 | HRSC (High Resolution Stereo Camera) | 17 |
    | 5.4 | MaRS (Mars Express Radio Science) Experiment | 18 |
    | 5.5 | OMEGA (Observatoire pour la Minéralogie, l'Eau, les Glaces et l'Activité) | 18 |
    | 5.6 | PFS (Planetary Fourier Spectrometer) | 18 |
    | 5.7 | SPICAM (Spectroscopy for Investigation of Characteristics of the Atmosphere of Mars) | 19 |
    | 5.8 | MARSIS (Mars Advanced Radar for Subsurface and Ionosphere Sounding) | 19 |
    | 5.9 | SPICE (Navigational and Ancillary Information) | 20 |
    | 6 | Conclusions | 20 |
    |  | Acknowledgements | 21 |
    |  | References | 21 |


## Documents this one references (21)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| Barabash et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | ASPERA-3: Analyser of Space Plasmas and Energetic Ions for Mars Express. In Mars Express: The Scientific Payload | 2004 | bibliography |
| Bertaux et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | SPICAM: Studying the Global Structure and Composition of the Martian Atmosphere. In Mars Express: The Scientific Payload | 2004 | bibliography |
| Bibring et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | OMEGA: Observatoire pour la Minéralogie, l'Eau, les Glaces et l'Activité. In Mars Express: The Scientific Payload | 2004 | bibliography |
| CCSDS (1999) | [CCSDS 650.0-R-1](../references/index.md#ref-ccsds-650-0-r-1) | Reference Model for an Open Archival Information System (OAIS): Red Book | 1999 | bibliography |
| DDID (2002) | [RO-ESC-IF-5003](../references/index.md#ref-ro-esc-if-5003) | Rosetta/Mars Express Data Delivery Interface Document | 2002 | bibliography |
| ESA Council (1989) | [ESA/C(89)95, rev.1](../references/index.md#ref-esa-c8995-rev-1) | Rules concerning Information and Data | rev.1 21 December 1989 | bibliography |
| ESA (1997) | [ESA/SPC(97)40](../references/index.md#ref-esa-spc9740) | Mars Express Science Management Plan | October 1997 | bibliography |
| ESA (2007) | [SOP-RSSD-TN-10](../references/index.md#ref-sop-rssd-tn-10) | Planetary Science Data Archive Technical Note: Geometry and Position Information | Issue 4.1 April 2007 | bibliography |
| ESA (2001) | [EST-MEX-TN-4009](../references/index.md#ref-est-mex-tn-4009) | Mars Express Data Generation, Validation and Transfer Plan | Issue 1 21 June 2001 | bibliography |
| Formisano et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | PFS: The Planetary Fourier Spectrometer for Mars Express. In Mars Express: The Scientific Payload | 2004 | bibliography |
| GDDS (2002) | [DTOS-INFR-UM-1001](../references/index.md#ref-dtos-infr-um-1001) | Operator User Manual | Issue 1.1 2002 | bibliography |
| Jaumann et al. (2007) | [Planet. Space Sci. 55](../references/index.md#ref-planet-space-sci-55) | The High-resolution Stereo Camera (HRSC) Experiment on Mars Express: Instrument Aspects and Experiment Conduct from Interplanetary Cruise through the Nominal Mission | 2007 | bibliography |
| JPL (2002) | [JPL D-7116](../references/index.md#ref-jpl-d-7116) | Planetary Science Data Dictionary Document | Rev. E 28 August 2002 | bibliography |
| JPL (2006) | [JPL D-7669, Part 2](../references/index.md#ref-jpl-d-7669-part-2) | Planetary Data System Data Standards Reference | Version 3.7 20 March 2006 | bibliography |
| Neukum et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | HRSC: The High Resolution Stereo Camera of Mars Express. In Mars Express: The Scientific Payload | 2004 | bibliography |
| Pätzold et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | MaRS: Mars Express Orbiter Radio Science Experiment. In Mars Express: The Scientific Payload | 2004 | bibliography |
| Picardi et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | MARSIS: Mars Advanced Radar for Subsurface and Ionospheric Sounding. In Mars Express: The Scientific Payload | 2004 | bibliography |
| PSA (2002) | [SOP-RSSD-RS-006](../references/index.md#ref-sop-rssd-rs-006) | PSA User Requirement Document | Issue 1 17 April 2002 | bibliography |
| Pullan et al. (2004) | [ESA SP-1240](../references/index.md#ref-esa-sp-1240) | Beagle 2: The Exobiological Lander of Mars Express. In Mars Express: The Scientific Payload | 2004 | bibliography |
| Semenov et al. (2005) | [ESA SP-601](../references/index.md#ref-esa-sp-601) | Reducing Costs of Managing and Accessing Navigation and Ancillary Data by Relying on the Extensive Capabilities of NASA's Spice System. In Proc. 6th Int. Symp. on Reducing the Costs of Spacecraft Ground Systems and Operations (RCSGSO) | 14–17 June 2005 | bibliography |
| Thompson et al. (2001) | [catalogue](../references/index.md#ref-application-of-xml-in-space-data-systems-science-systems-experience-science-syst) | Application of XML in Space Data Systems: Science Systems Experience, Science Systems (Space) Ltd, XML Workshop, ESA/ESOC | 2001 | bibliography |

!!! note "Notes"
    The PDF is an extract of the full SP-1291 volume: PDF p. 1 is the volume cover, PDF p. 2 the part divider 'Operations and Archiving', and the chapter itself runs from PDF p. 3 (printed page 257) to PDF p. 22 (printed page 276). Section headings in the side margin are interleaved with body text in the extraction (e.g. '2.1 Overview  2. The Ground Segment'). The section 4 heading prints only 'Planetary Science' in the text layer (the margin heading is truncated); 'Planetary Science Archive' is inferred from the content. The lead author's e-mail address on PDF p. 3 is omitted. The DDID reference (RO-ESC-IF-5003) corresponds to the library items ro-esc-if-5003-ddid-c2 and mex-esc-if-5003-b5. The extracted text has an empty 23rd page.

