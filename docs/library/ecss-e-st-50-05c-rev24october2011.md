---
title: "ECSS Radio Frequency and Modulation (Rev. 2, 2011)"
description: "The ECSS standard for the radio-frequency and modulation layer of the TT&C link."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50-05c-rev24october2011]
---

# Space engineering
Radio frequency and modulation

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50-05C Rev. 2</dd><dt>Issue / version</dt><dd>Second issue revision 2</dd><dt>Date</dt><dd>2011-10-04</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-50-05C Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-50-05C Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Rev. 2 of 4 October 2011 ('Second issue revision 2'), following ECSS-E-50-05A (14 November 2007), ECSS-E-50-05B (never issued), ECSS-E-ST-50-05C (31 July 2008) and ECSS-E-ST-50-05C Rev. 1 (6 March 2009); the Rev. 2 changes are marked with revision tracking (change log, p. 3). The document does not state that it is superseded, and no later issue is in the library.</dd><dt>Pages</dt><dd>80</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-05C_Rev24October2011.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-05C_Rev24October2011.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:14Z</dd><dt>SHA-256</dt><dd><code>1a9e86aa81cce5146d21a1ff91c89f1cebde8a6a4fa9f04dccb0a91e36327db7</code></dd><dt>Size</dt><dd>648.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50-05C_Rev24October2011.pdf">ECSS-E-ST-50-05C_Rev24October2011.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The ECSS standard for the **radio-frequency and modulation layer** of the TT&C link. It covers the radio techniques used for telemetry, telecommand and tracking between spacecraft and Earth stations in the Space Operation, Space Research and Earth Exploration-Satellite services (including meteorological satellites, but not data-relay links), and it aligns them with the ITU Radio Regulations and with CCSDS 401.0-B-20.

What an engineer finds in it:

* **frequency allocations** (Table 4-1) from S-band (2025-2110 MHz up, 2200-2290 MHz down) to X, K and Ka bands, with deep-space sub-bands, special conditions per band, and the assignment and ITU coordination procedure;
* **transmitted signal** rules: coherent **turnaround ratios** such as 221/240 (S/S) and 749/880 (X/X), frequency stability, polarization, **occupied bandwidth** limits, spurious emissions, power-flux-density limits and radio-astronomy protection;
* **residual-carrier phase modulation** (clause 6.1): NRZ-L/NRZ-M/SP-L waveforms and symbol rates (telecommand 4000/2^n sps), 8 or 16 kHz telecommand subcarriers, telemetry subcarriers, a minimum **data transition density** (with the ECSS-E-ST-50-01 randomizer as fallback), modulation index limits and phase noise;
* **suppressed-carrier modulation** (clause 6.2): BPSK, QPSK, UQPSK, OQPSK, filtered OQPSK, GMSK and 8PSK TCM, mandatory above 1 Msps and restricted to the bandwidth-efficient schemes above 2 Msps;
* **link acquisition** (clause 7): downlink switched on by on-board automation, uplink carrier sweep values (for example ±150 kHz at 32 kHz/s), and transponder lock reported in the CLCW;
* the **RF interface control** process (spacecraft-Earth station ICD, link budget tables, compatibility tests), and the GMSK and 4D-8PSK-TCM formats in detail (clause 9).

Annexes give the ICD DRD, cross-support notes (NASA DSN), Ariane-5 RF constraints, the differences from CCSDS 401 and tailoring guidance.


## Key points

- Rev. 2 removes filtered-OQPSK from the 8 400 MHz - 8 450 MHz band and aligns Annex D.2.2 and the bibliography with CCSDS 401.0-B-20 (April 2009) instead of 401.0-B-17. *(PDF p. 3)*
- Scope: radio communication techniques for spacecraft-Earth station links in both directions and for tracking; applicable to spacecraft supported by Earth stations (not by data relay satellites) in the Space Operation, Space Research and Earth Exploration-Satellite services, the latter including Meteorological Satellite. *(PDF p. 9)*
- Category A: altitude less than 2 × 10^6 km; category B and 'deep space': 2 × 10^6 km or more [ITU/RR/1.177]. *(PDF p. 11)*
- Primary allocations include 2 025–2 110 MHz (SR, SO, EES, Earth-space), 2 200–2 290 MHz (SR, SO, EES, space-Earth), 7 145–7 190 MHz and 8 400–8 450 MHz (deep space), 8 025–8 400 MHz (EES space-Earth) and 31 800–32 300 / 34 200–34 700 MHz (deep space). *(PDF p. 17)*
- Coherent turnaround ratios (fup/fdown) include 221/240 for S-band up/S-band down and 749/880 for X-band up/X-band down; band pairs should come from Table 5-1, otherwise Table 5-2 shall be used. The ratios derive from CCSDS 401.0-B-20. *(PDF p. 24)*
- Telecommand PCM symbol rates are 4 000/2^n sps (n = 0..9, NRZ-L or NRZ-M on a subcarrier) or 4 000 × 2^n sps (n = 1..6, SP-L); NRZ-M is not used for category B, and 4 ksps only with the 16 kHz subcarrier. *(PDF p. 38)*
- SP-L shall only be used for direct modulation of the RF carrier (no subcarrier), and NRZ waveforms only on a subcarrier; SP-L is also known as bi-phase or Manchester encoding. *(PDF p. 39)*
- Telecommand subcarriers are 8 or 16 kHz sine waves; above 4 ksps telecommand symbols are SP-L encoded directly on the carrier. *(PDF p. 40)*
- For NRZ telemetry above 60 ksps no subcarrier is used: SP-L direct modulation up to 1 Msps at S and X band, or suppressed-carrier modulation per clause 6.2. *(PDF p. 41)*
- Data transition density shall be at least 125 (category A) or 275 (category B) per 1 000 consecutive symbols, with runs of ones or zeros limited to 64 symbols; otherwise the ECSS-E-ST-50-01 clause 9 pseudo-randomizer shall be used. *(PDF p. 42)*
- Peak modulation index limits: telecommand NRZ 0,2-1,4 rad, telecommand SP-L 0,2-1,0 rad, telemetry sine subcarrier max 1,5 rad, ranging Earth-space 0,1-1,4 rad, ranging space-Earth 0,01-0,7 rad; combined Earth-space index should not exceed 1,75 rad. *(PDF p. 43)*
- Residual carrier power shall exceed -15 dBc (space-Earth) and -10 dBc (Earth-space). *(PDF p. 44)*
- Suppressed-carrier modulation shall be used for telemetry above 1 Msps; above 2 Msps (bands below 8 500 MHz) or 20 Msps (31,8-32,3 GHz) only TCM 8PSK, filtered OQPSK or GMSK shall be used. *(PDF p. 45)*
- If the ground network can resolve phase ambiguity from the sync marker, no differential encoding is used for BPSK/QPSK/OQPSK/UQPSK; otherwise differential encoding shall be performed. *(PDF p. 46)*
- Uplink acquisition at 2 025-2 110 MHz (category A): unmodulated carrier swept with a symmetrical triangular waveform; recommended max sweep rate 32 kHz/s, max discontinuity 10 Hz, max sweep range ±150 kHz for a 2BL = 800 Hz transponder PLL; transponder lock reported in telemetry (CLCW). *(PDF p. 55)*
- The spacecraft-Earth station ICD is drafted in Phase B and follows the normative DRD of Annex A (stations, equipment configuration, performances, applicable TT&C standards and waivers, link parameter choices, TT&C operational modes). *(PDF p. 72)*
- Annex D: unlike CCSDS 401 (2.2.3), only NRZ-L is recommended for category B telecommand; filtered OQPSK is restricted to specific filters, and SRRC-4D 8PSK TCM only to 2,0 and 2,5 b/s/Hz. *(PDF p. 77)*
- ITU Radio Regulations cannot be tailored; tailoring should be supported by the frequency coordinator. *(PDF p. 79)*


## Cited by these wiki pages (8)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [How it all fits together](../overview/index.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [Uplink: from operator command to on-board execution](../overview/uplink.md)


??? abstract "Contents (39 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 8 |
    | 1 | Scope | 9 |
    | 2 | Normative references | 10 |
    | 3 | Terms, definitions and abbreviated terms | 11 |
    | 3.1 | Terms from other standards | 11 |
    | 3.2 | Terms specific to the present standard | 11 |
    | 3.3 | Abbreviated terms | 13 |
    | 4 | Frequency allocations, assignment and use | 16 |
    | 4.1 | Frequency allocations to the Space Operation, Space Research and Earth Exploration-Satellite services | 16 |
    | 4.2 | Specific conditions for the use of certain frequency bands | 18 |
    | 4.3 | Frequency assignment procedure | 21 |
    | 5 | Transmitted signals | 23 |
    | 5.1 | Turnaround frequency ratio for coherent transponders | 23 |
    | 5.2 | Carrier frequency stability | 25 |
    | 5.3 | Polarization | 27 |
    | 5.4 | Occupied bandwidth considerations | 27 |
    | 5.5 | Emissions | 29 |
    | 6 | Modulation | 37 |
    | 6.1 | Phase modulation with residual carriers | 37 |
    | 6.2 | Suppressed carrier modulation | 45 |
    | 6.3 | Spectral roll-off | 53 |
    | 7 | Link acquisition procedures | 54 |
    | 7.1 | Space-Earth | 54 |
    | 7.2 | Earth-space | 55 |
    | 8 | RF interface control | 58 |
    | 8.1 | RF interface control documents | 58 |
    | 8.2 | Spacecraft-Earth station interface control document | 58 |
    | 8.3 | Link budget tables | 59 |
    | 8.4 | Spacecraft-ground network compatibility test | 62 |
    | 9 | GMSK and 8PSK TCM modulation formats | 64 |
    | 9.1 | GMSK modulation format | 64 |
    | 9.2 | 8PSK TCM modulation format | 65 |
    | Annex A | Spacecraft-Earth station interface control document - DRD (normative) | 72 |
    | Annex B | Cross-support from other networks (informative) | 73 |
    | Annex C | Protection of Ariane-5 RF system (informative) | 74 |
    | Annex D | Differences from CCSDS recommendations (informative) | 77 |
    | Annex E | Tailoring guidelines (informative) | 79 |
    |  | Bibliography | 80 |


## Documents this one references (18)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ECSS-E-ST-10-03 | [ECSS-E-ST-10-03](../references/index.md#ref-ecss-e-st-10-03) | Space engineering – Testing |  | normative |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering – Communications |  | normative |
| ECSS-E-ST-50-01 | [ECSS-E-ST-50-01](../references/index.md#ref-ecss-e-st-50-01) | Space engineering – Space data links - Telemetry synchronization and channel coding |  | normative |
| ITU/RR:2004 | [ITU/RR:2004](../references/index.md#ref-itu-rr-2004) | ITU Radio Regulations | 2004 | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-10-02 | [ECSS-E-ST-10-02](../references/index.md#ref-ecss-e-st-10-02) | Space engineering – Verification |  | bibliography |
| ECSS-E-ST-50-02 | [ECSS-E-ST-50-02](../references/index.md#ref-ecss-e-st-50-02) | Space engineering – Ranging and Doppler tracking |  | bibliography |
| ECSS-E-ST-50-04 | [ECSS-E-ST-50-04](../references/index.md#ref-ecss-e-st-50-04) | Space engineering – Space data links – Telecommand protocols, synchronization and channel coding |  | bibliography |
| ECSS-E-HB-50A | [ECSS-E-HB-50A](../references/index.md#ref-ecss-e-hb-50a) · [library](ecss-e-hb-50a-15november2008.md) | Space engineering – Communications guidelines |  | bibliography |
| SFCG/HB 19, Edition 2007 | [SFCG/HB](../references/index.md#ref-sfcg-hb) | Space frequency coordination group, Hand book | Edition 2007 2007 | bibliography |
| SFCG Recommendation 14-1 | [SFCG Recommendation 14-1](../references/index.md#ref-sfcg-recommendation-14-1) | Protection of deep space research Earth Stations from line-of-sight interference in the bands 2290-2300 MHz, 8400-8450 MHz and 31.8-32.3 GHz |  | bibliography |
| SFCG Administrative Resolution A12-1R2 | [SFCG Administrative Resolution A12-1R2](../references/index.md#ref-sfcg-administrative-resolution-a12-1r2) | Establishment of procedures for inter-agency frequency coordination |  | bibliography |
| SFCG Recommendation 12-4R3 | [SFCG Recommendation 12-4R3](../references/index.md#ref-sfcg-recommendation-12-4r3) | Methods for reduction of potential interference between systems in the space science services in densely occupied bands |  | bibliography |
| CCSDS 401.0-B-20, Edition April 2009 | [CCSDS 401.0-B-20](../references/index.md#ref-ccsds-401-0-b-20) | CCSDS Radio Frequency and Modulation Systems, Part 1: Earth Stations and Spacecraft, Blue Book | Edition April 2009 April 2009 | bibliography |
| JPL document 810-005, Rev. E | [JPL 810-005](../references/index.md#ref-jpl-810-005) | JPL Deep Space Mission Systems Telecommunication Link Design Handbook | Rev. E | bibliography |
| A5-SG-1-X-35-ASAI Edition 4, Rev 1 | [A5-SG-1-X-35-ASAI](../references/index.md#ref-a5-sg-1-x-35-asai) | Specifications générales de compatibilité electromagnétique | Edition 4, Rev 1 | bibliography |
|  | [Recommendation ITU-R RA.769-2](../references/index.md#ref-recommendation-itu-r-ra-769-2) | Threshold levels of interference detrimental to radio astronomy (cited in Tables 5-7 and 5-8) |  | mentioned |

!!! note "Notes"
    Slug 'rev24october2011' means 'Rev. 2, 4 October 2011'. The extraction uses Unicode non-breaking hyphens (U+2011) in document IDs; many Greek letters and symbols (degrees, alpha, less-or-equal) are dropped from the text, e.g. '±5 of that of a perfect PSK signal' (p. 42) and the GMSK/TCM equations in clause 9 (p. 64) and Annex C (p. 74) are garbled. Footnote 16 still cites 'ECSS-E-50-02A' for ranging (p. 45), and the bibliography lists the companion standards ECSS-E-ST-50-02 and -50-04 undated; the bibliography footnote notes that SFCG/HB is in fact a normative publication (p. 80). Annex C reproduces a table numbered 'Table 1' inside Figure C-1 (p. 76). Companions in the library: ECSS-E-ST-50-02C (ecss-e-st-50-02c31july2008), ECSS-E-ST-50-01C (ecss-e-st-50-01c31july2008), ECSS-E-ST-50-04C (ecss-e-st-50-04c31july2008), ECSS-E-HB-50A (ecss-e-hb-50a-15november2008). CCSDS 401.0-B is in the library at a later issue (ccsds-401-0-401x0b32), not at the -20 issue cited here. Printed page numbers equal PDF page numbers; srcgrep shows 81 PDF pages (the last one blank) while the registry gives 80.

