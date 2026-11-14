---
title: "Solar Orbiter Definition Study Report (Red Book, 2011)"
description: "ESA's definition study report for Solar Orbiter, written before mission adoption, when launch was planned for January 2017."
tags: ["Definition study report", "Mission design and trajectory data"]
sources: [solar-orbiter-definition-study-report-2011]
---

# Solar Orbiter: Exploring the Sun-heliosphere connection. Definition Study Report

<dl class="osi-meta"><dt>Document ID</dt><dd>ESA/SRE(2011)14</dd><dt>Issue / version</dt><dd>Issue 1</dd><dt>Date</dt><dd>2011-07</dd><dt>Organisation</dt><dd>European Space Agency (Solar Orbiter Study Science Team, Project Team and industrial study team led by Astrium UK)</dd><dt>Authors</dt><dd>Richard G. Marsden (Study Scientist, ESA), Solar Orbiter Science Working Team</dd><dt>Type</dt><dd>Definition study report</dd><dt>Status</dt><dd>The 'Red Book' prepared for mission adoption, dated July 2011 on the cover (PDF p. 1). It describes the January 2017 launch scenario; Solar Orbiter actually launched on 10 February 2020, so trajectory dates and some design values differ from the flown mission.</dd><dt>Pages</dt><dd>118</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://sci.esa.int/documents/34903/36699/1567255601145-Solar-Orbiter_RB_Issue_1_2011-07-22.pdf" rel="noopener">https://sci.esa.int/documents/34903/36699/1567255601145-Solar-Orbiter_RB_Issue_1_2011-07-22.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-13T16:50:11Z</dd><dt>SHA-256</dt><dd><code>289a115b482159331bac2b4e79ac823d198f5f46e70667c2192799e98ee4a9a4</code></dd><dt>Size</dt><dd>18.1 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission/1567255601145-Solar-Orbiter_RB_Issue_1_2011-07-22.pdf">1567255601145-Solar-Orbiter_RB_Issue_1_2011-07-22.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

ESA's definition study report for Solar Orbiter, written before mission adoption, when launch was planned for January 2017. Chapters 2 to 4 set out the science questions, the measurement requirements and the ten-instrument payload. Chapter 5 covers the baseline trajectory with Venus resonances, the spacecraft design, configuration, system budgets, technical challenges and the radiation environment. Chapter 7 describes the ground segment and science operations, and chapter 8 the management.

For the OPEN-SPACE-INFO simulator the report is the source of the engineering anchors. The solar array is sized to deliver 974 W at a worst-case aphelion of 1.47 au, against a 919 W hibernation demand at 630 W/m2. The payload receives 180 W at a regulated 28 V. The downlink requirement is 150 kbit/s at 1 au to the 35 m Malargüe antenna, with daily 9-hour passes in the nominal phase. The solid-state mass memory stores up to 549 Gbit. Four reaction wheels are off-loaded with 10 N thrusters, and the solar arrays tilt about their long axis to limit cell temperature at perihelion, where the flux reaches about 13 times its 1 au value. Remote sensing is planned in three 10-day windows per orbit, centred on perihelion and on the latitude extremes.


## Key points

- Mission summary: three-axis stabilised platform, heat shield, two adjustable two-sided solar arrays; 150 kbit/s downlink at 1 au spacecraft-Earth distance; Malargüe 35 m antenna, 4 to 8 hours per day effective. *(PDF p. 5)*
- The solid-state mass memory stores up to 549 Gbit (823 Gbit with the redundant bank); four reaction wheels are complemented by 10 N thrusters used for safe mode, wheel off-loading and manoeuvres (§5.3.6). *(PDF p. 83)*
- The solar array, based on the BepiColombo MPO design, supplies 974 W at the worst-case aphelion of 1.47 au; the PCDU uses a maximum power point tracker and a regulated 28 V main bus; a lithium-ion battery (§5.3.6). *(PDF p. 83)*
- The solar-radiation-pressure torque profile, influenced by the solar-array tilt direction, determines the frequency of wheel off-loading (§5.4.1). *(PDF p. 84)*
- The HGA may need to be stowed in the shadow of the heat shield during close perihelion passages (§5.4.1). *(PDF p. 85)*
- Power budget: the sizing case is hibernation at 1.468 au, 919 W at 630 W/m2; 180 W at a regulated 28 V go to the payload in the science phase (§5.5.2). *(PDF p. 92)*
- Link and storage budgets: 150 kbit/s at 1 au via the HGA to Malargüe; in-situ instruments produce data continuously, remote-sensing instruments during three 10-day windows per orbit (§5.5.3-5.5.4). *(PDF p. 93)*
- Solar flux reaches up to 12.7 Earth solar constants at perihelion; the solar array is tilted about its longitudinal axis to keep cell temperature manageable (§5.6). *(PDF p. 94)*
- For thermal reasons the HTHGA may have to be folded several times during the mission; maximum flux 17424 W/m2 at 0.28 au, minimum 784 W/m2 at 1.32 au (§5.6, §5.7). *(PDF p. 95)*
- Ground stations: ESA deep-space antennas at New Norcia, Cebreros and Malargüe; in the nominal phase Malargüe takes daily 9-hour passes, 8 hours of which are for science telemetry (§7.1.1). *(PDF p. 101)*
- An encounter typically consists of a 10-day window centred on perihelion and two 10-day windows centred on the highest latitudes (§7.2.3). *(PDF p. 103)*


## Cited by these wiki pages (1)

- [Solar Orbiter simulator](../simulator/index.md)


??? abstract "Contents (21 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Solar Orbiter Mission Summary (table) | 5 |
    | 1 | Executive Summary | 9 |
    | 2.1 | How and where do the solar wind plasma and magnetic field originate in the corona? | 15 |
    | 2.3 | How do solar eruptions produce energetic particle radiation that fills the heliosphere? | 29 |
    | 2.4 | How does the solar dynamo work and drive connections between the Sun and the heliosphere? | 36 |
    | 3.1 | Observations, Measurements, and Orbital Characteristics | 43 |
    | 4.1 | In-Situ Instruments | 60 |
    | 4.2 | Remote-Sensing Instruments | 67 |
    | 5.1 | Mission and Spacecraft Requirements | 75 |
    | 5.2 | Baseline Orbit Design | 76 |
    | 5.3 | Spacecraft Design Overview | 81 |
    | 5.4 | Solar Orbiter Configuration | 83 |
    | 5.5 | System Budgets | 92 |
    | 5.6 | Technical Challenges | 94 |
    | 5.7 | Mission Environment | 95 |
    | 6.1 | Space-Based Observations Supporting Solar Orbiter Science | 97 |
    | 7.1 | Ground Segment Facilities and Services | 101 |
    | 7.2 | Science Operations | 102 |
    | 7.3 | Mission Operations Concept | 104 |
    | 8.1 | Project Background Within the Cosmic Vision Programme | 109 |
    | 8.4 | Summary Master Schedule | 111 |


## Documents this one references (0)

*This document has no reference list.*

!!! note "Notes"
    Copied from ESA's Solar Orbiter document archive at sci.esa.int. Section numbers are as printed; page numbers in this wiki are PDF page indices (the printed page number is 8 lower in chapter 5).

