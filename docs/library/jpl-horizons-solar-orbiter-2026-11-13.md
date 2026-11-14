---
title: "JPL Horizons: Solar Orbiter trajectory data (copied 2026-11-13)"
description: "Fourteen unchanged text responses from the JPL Horizons API, packed in one zip file with a MANIFEST.txt that gives each file's exact query URL, download time (UTC), size and SHA-256."
tags: ["Dataset (API responses)", "Mission design and trajectory data"]
sources: [jpl-horizons-solar-orbiter-2026-11-13]
---

# JPL Horizons ephemeris responses for Solar Orbiter, Earth, Venus and Mercury (2020-2030)

<dl class="osi-meta"><dt>Document ID</dt><dd>Horizons target -144 (Solar Orbiter)</dd><dt>Issue / version</dt><dd>Trajectory file solo_ANC_soc-orbit-stp_20200210-20301120_435_V1_00592</dd><dt>Date</dt><dd>2026-11-13</dd><dt>Organisation</dt><dd>NASA/JPL Solar System Dynamics group (Horizons system); trajectory provided by ESA</dd><dt>Type</dt><dd>Dataset (API responses)</dd><dt>Status</dt><dd>Horizons notes that its Solar Orbiter trajectory comes from ESA and is fitted to tracking data up to 2026-11-03, with predictions after that date. The ephemeris covers 2020-02-10 to 2030-11-20.</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ssd.jpl.nasa.gov/api/horizons.api" rel="noopener">https://ssd.jpl.nasa.gov/api/horizons.api</a></dd><dt>Copied (UTC)</dt><dd>2026-11-13T16:48:58Z</dd><dt>SHA-256</dt><dd><code>5077c1c375198ca93c2128d723ba077c76a863a847413d4a76a9a6983feb6329</code></dd><dt>Size</dt><dd>1.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission/jpl-horizons-solar-orbiter-2026-11-13.zip">jpl-horizons-solar-orbiter-2026-11-13.zip</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Fourteen unchanged text responses from the JPL Horizons API, packed in one zip file with a MANIFEST.txt that gives each file's exact query URL, download time (UTC), size and SHA-256. Four files hold daily heliocentric state vectors (position and velocity, ecliptic of J2000, TDB) for Solar Orbiter (target -144), Earth, Venus and Mercury from 2020-02-11 to 2030-11-19. One file holds the daily sub-observer latitude and longitude of the Sun seen from Solar Orbiter, which is the spacecraft's heliographic latitude. Nine files hold 5-minute planet-centred vectors around each Earth and Venus gravity assist. The last file is Horizons' object description for Solar Orbiter, including its flyby list.

The Solar Orbiter simulator in this wiki is built from these files. tools/build_simulator.py turns them into docs/simulator/data/ephem.json and derives perihelia, aphelia, latitude extremes, solar conjunctions and gravity-assist closest approaches.


## Key points

- Reference frame: ecliptic of J2000.0 (IAU76 obliquity of 84381.448 arcseconds with respect to the ICRF X-Y plane); time tags in TDB.
- Trajectory source named by Horizons: solo_ANC_soc-orbit-stp_20200210-20301120_435_V1_00592, fitted to tracking data up to 2026-11-03.
- Gravity assists listed by Horizons: Venus 2020-12-26, 2021-08-08, 2022-09-04, 2025-02-18, 2026-12-24, 2028-03-17, 2029-06-10, 2030-09-02; Earth 2021-11-27 at about 454 km altitude.


## Cited by these wiki pages (1)

- [Solar Orbiter simulator](../simulator/index.md)


## Documents this one references (0)

*This document has no reference list.*

!!! note "Notes"
    Horizons is a public service of the JPL Solar System Dynamics group. These are copies of query results, made for reproducibility; repeat the queries in the manifest to obtain current data.

