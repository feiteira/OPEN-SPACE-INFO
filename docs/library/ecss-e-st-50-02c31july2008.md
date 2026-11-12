---
title: "ECSS Ranging and Doppler Tracking (2008)"
description: "The 2008 ECSS standard for ranging and Doppler tracking: how a ground station measures the distance (range) and radial velocity (range rate) of a spacecraft through its transponder, and what the trans"
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50-02c31july2008]
---

# Space engineering
Ranging and Doppler tracking

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50-02C</dd><dt>Issue / version</dt><dd>Second issue</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS E-ST-50-02C Working Group)</dd><dt>Authors</dt><dd>ECSS E-ST-50-02C Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue (31 July 2008), following ECSS-E-50-02A (first issue, 24 November 2005); ECSS-E-50-02B was never issued (change log, p. 3). The document does not state that it is superseded, and no later issue is in the library.</dd><dt>Pages</dt><dd>43</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-02C31July2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-02C31July2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:53:01Z</dd><dt>SHA-256</dt><dd><code>e0b4e23d1f5298aa036a05906fc60ded3eefe84c2363044cebb10bfd10f50665</code></dd><dt>Size</dt><dd>583.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50-02C31July2008.pdf">ECSS-E-ST-50-02C31July2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The 2008 ECSS standard for **ranging and Doppler tracking**: how a ground station measures the distance (range) and radial velocity (range rate) of a spacecraft through its transponder, and what the transponder and the station must do so that the measurements are accurate. It covers direct Earth-station links for the Space Operation, Space Research and Earth Exploration Satellite services, for unprocessed ranging accuracies of 2.5 to 30 ns and Doppler accuracies of 0.1 to 1 mm/s. Data-relay and meteorological missions are out of scope.

Clause 4 sets out the requirements:

* the five functions of the system (Earth-to-Space link, transponder, Space-to-Earth link, link control and data acquisition, which includes integrated Doppler, ranging and meteo);
* frequency assignment and phase modulation. The ranging signal is a sine **tone** (100 kHz to 1.5 MHz) phase-modulated by a series of square-wave **ambiguity-resolution codes** Cn = Q1 xor Q2 xor ... Qn. Rules cover sharing the carrier with telecommand and telemetry and choosing the tone to avoid interference;
* carrier frequency stability, given as Allan variance curves;
* Earth-station uplink and downlink parameters such as modulation indices, phase noise and group-delay stability (category A versus category B, that is, closer or farther than 2 million km);
* the **spacecraft transponder**: coherent turn-around for two-way Doppler, coherent and ranging on/off modes selected by telecommand, group-delay constancy and calibration, telemetered monitoring and technological loss;
* end-to-end error budgets for Doppler and ranging, and meteo and station-location measurements.

Clause 5 lists the RF compatibility tests between transponder and station. The annexes compare the standard with CCSDS 401.0-B tone-ranging assumptions, define the ranging technological loss and explain integrated Doppler measurement. It is the ECSS reference for the radiometric tracking side of the TT&C link.


## Key points

- Scope: spacecraft ranged or Doppler-tracked over direct links to Earth stations (not via data relay satellites) in the Space Operation, Space Research and Earth Exploration Satellite services, with unprocessed ranging accuracies of 2,5 ns to 30 ns and Doppler accuracies of 0,1 mm/s to 1 mm/s. *(PDF p. 7)*
- Category A spacecraft are less than 2 × 10^6 km above the Earth's surface; category B are at or beyond that altitude. *(PDF p. 9)*
- The transponder is assumed to carry telecommand and telemetry on the same RF carriers as ranging; the system has five functions: Earth-to-Space link, transponder, Space-to-Earth link, link control and data acquisition. *(PDF p. 11)*
- Ranging modulation on both links shall be phase modulation (PM); the baseband ranging signal is a sine tone phase-modulated by codes Cn = Q1 ⊕ Q2 ⊕ ... ⊕ Qn, where Qi are square waves at 2^-i × ft, with code transitions at tone phase 90°. *(PDF p. 17)*
- Suppressed-carrier telemetry is not compatible with simultaneous ranging; orbit determination then uses time sharing between telemetry and ranging or a separate ranging transponder. *(PDF p. 17)*
- Code acquisition sequence: tone alone, then tone modulated with the sequence of codes, then tone with the final code; deep-space missions may restart the code sequence continuously for faster re-acquisition at reduced accuracy. *(PDF p. 15)*
- Earth-to-Space link: tone frequency selectable 100 kHz – 1,5 MHz, code period 2^n/ft with n = 0 to 20, tone modulation index 45° or 22,5°, group delay variation 20 ns/12 h pp (category A) or 2 ns/12 h pp (category B). *(PDF p. 25)*
- For deep space and two-way Doppler the transponder shall be coherent (downlink carrier derived from the uplink carrier by the turn-around ratio); coherent/non-coherent and ranging on/off shall be selectable by telecommand. *(PDF p. 28)*
- With on-board digital synthesis, the deviation from the ideal turn-around ratio shall not cause a Doppler bias above 0,1 mm/s averaged over 1 s. *(PDF p. 29)*
- For ambiguity resolution the ranging channel group delay shall be constant within ± 1/(5 ft) over 0,3 ft to 1,7 ft; for the measurement itself, constant within ± 30 ns at the tone frequency, as seen from the diplexer interface. *(PDF p. 29)*
- Typical on-board delay calibration accuracies are ± 5 ns for category A and ± 2,5 ns for category B missions. *(PDF p. 30)*
- Ranging measurement quantization shall be at most 1/65536 of the tone period, and station ranging accuracy 1 ns or 1/1000 of the tone period, whichever is larger; Doppler quantization shall be below 1/1000 of the carrier period. *(PDF p. 34)*
- For tropospheric correction the station measures pressure (± 1 hPa), temperature (± 1 °C) and relative humidity (±1%); the antenna phase centre location shall be known better than 0,5 m. *(PDF p. 34)*
- Compatibility tests use at least engineering qualification models of spacecraft equipment, often in a portable compatibility test unit ('suitcase'). *(PDF p. 36)*
- Integrated Doppler measures the continuous carrier phase rather than independent velocity samples, giving a high-resolution change in range up to an unknown constant; it can be two-way (coherent) or one-way (non-coherent). *(PDF p. 41)*


## Cited by these wiki pages (7)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [How it all fits together](../overview/index.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (41 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 6 |
    | 1 | Scope | 7 |
    | 2 | Normative references | 8 |
    | 3 | Terms, definitions and abbreviated terms | 9 |
    | 3.1 | Terms from other standards | 9 |
    | 3.2 | Terms specific to the present standard | 9 |
    | 3.3 | Abbreviated terms | 9 |
    | 4 | Requirements | 11 |
    | 4.1 | Functional | 11 |
    | 4.1.1 | Functional breakdown | 11 |
    | 4.1.2 | Earth-to-Space link function | 13 |
    | 4.1.3 | Transponder function | 13 |
    | 4.1.4 | Space-to-Earth link function | 14 |
    | 4.1.5 | Link control function | 15 |
    | 4.1.6 | Data acquisition function | 15 |
    | 4.2 | Frequency assignment, modulation and spectral sharing | 16 |
    | 4.2.1 | Frequency assignment | 16 |
    | 4.2.2 | Modulation | 17 |
    | 4.2.3 | Spectral sharing | 19 |
    | 4.3 | Carrier frequency stability | 23 |
    | 4.4 | Earth station | 25 |
    | 4.4.1 | Earth-to-Space link | 25 |
    | 4.4.2 | Space-to-Earth link | 26 |
    | 4.5 | Spacecraft transponder | 28 |
    | 4.5.2 | Range and range rate operations | 28 |
    | 4.5.3 | Range only operations | 29 |
    | 4.5.4 | Group delay | 29 |
    | 4.5.5 | Telemetered monitoring | 30 |
    | 4.5.10 | Ranging technological loss | 31 |
    | 4.6 | Performance | 32 |
    | 4.6.2 | Integrated Doppler performance | 32 |
    | 4.6.3 | Ranging performance | 33 |
    | 4.6.4 | Ancillary measurements | 34 |
    | 5 | Compatibility testing | 36 |
    | 5.1 | General | 36 |
    | 5.2 | Tests | 36 |
    | Annex A | Compatibility with other ground stations networks (informative) | 38 |
    | Annex B | Transponder ranging technological loss (informative) | 40 |
    | Annex C | Integrated Doppler measurement (informative) | 41 |
    |  | Bibliography | 43 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering – Communications |  | normative |
| ECSS-E-ST-50-05 | [ECSS-E-ST-50-05](../references/index.md#ref-ecss-e-st-50-05) | Space engineering – Radio frequency and modulation |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| CCSDS 401.0-B | [CCSDS 401.0-B](../references/index.md#ref-ccsds-401-0-b) | Radio Frequency and Modulation Systems – Part 1: Earth Stations and Spacecraft |  | bibliography |

!!! note "Notes"
    The extraction uses Unicode non-breaking hyphens (U+2011) in document IDs. Figures 4-1 (functional block diagram, p. 12, partly extracted as loose labels), 4-2 to 4-5 (ranging spectra) and 4-6 (Allan variance curves) are graphics; Annex C's equations (p. 42) are garbled in the text. Superscripts are flattened (for example '2 × 106 km', p. 9; 'code length = 212' for 2^12, p. 5). The introduction's last bullet is printed as a separate paragraph (p. 6). Clause 4.5.2 refers to turn-around ratios 'in Table 5-1 of' ECSS-E-ST-50-05 (p. 28). Telecommand and TM data link aspects are out of scope; the RF companion ECSS-E-ST-50-05C Rev. 2 is in the library as ecss-e-st-50-05c-rev24october2011, and a later issue of CCSDS 401.0-B as ccsds-401-0-401x0b32. Printed page numbers equal PDF page numbers; srcgrep shows 44 PDF pages (the last one blank) while the registry gives 43.

