---
title: "CHEOPS ground segment systems and automation (2025)"
description: "A journal-style preprint describing the whole ground segment of CHEOPS, ESA's first small-class (S-class) mission, launched 18 December 2019 into a 690 km Sun-synchronous orbit."
tags: ["Paper", "ESOC evolution and context"]
sources: [cheops-ground-segment-systems-and-automation-for-mission-and-science-o]
---

# CHEOPS Ground Segment: Systems and Automation for Mission and Science Operations

<dl class="osi-meta"><dt>Document ID</dt><dd>arXiv:2505.08352v1 [astro-ph.IM]</dd><dt>Issue / version</dt><dd>v1</dd><dt>Date</dt><dd>2025-05-13</dd><dt>Organisation</dt><dd>CHEOPS Consortium: University of Geneva, INTA (CEIT), ESA/ESOC, University of Bern, ETH Zurich, ISDEFE, Procesia</dd><dt>Authors</dt><dd>Alexis Heitzmann, Anthony G. Maldonado, Anja Bekkelien, Babatunde Akinsanmi, Nuria Alfaro Llorente, Mathias O. W. Beck, Nicolas Billot, Christopher Broeg, Adrien Deline, David Ehrenreich, Naiara Fernández de Bobadilla Vallano, Andrea Fortier, María Fuentes Tabas, María J. González Bonilla, Marcus G. F. Kirsch, Monika Lendl, David Modrego Contreras, Eva M. Vega Carrasco</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>arXiv preprint v1 of 13 May 2025, marked 'Preprint submitted to Elsevier' (page footers). No journal publication details are printed.</dd><dt>Pages</dt><dd>15</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://arxiv.org/pdf/2505.08352" rel="noopener">https://arxiv.org/pdf/2505.08352</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:36Z</dd><dt>SHA-256</dt><dd><code>47f94db08073210ace62888063c638cc832fd8a75335b828a52099a18a0cbb6b</code></dd><dt>Size</dt><dd>4.2 MB</dd><dt>Our copy</dt><dd><a href="../third-party/context/cheops-ground-segment-systems-and-automation-for-mission-and-science-o.pdf">cheops-ground-segment-systems-and-automation-for-mission-and-science-o.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A journal-style preprint describing the whole ground segment of **CHEOPS**, ESA's first small-class (S-class) mission, launched 18 December 2019 into a 690 km Sun-synchronous orbit. Unusually for ESA, all operations are the responsibility of the consortium. The Mission Operations Center (MOC) at INTA's CEIT near Madrid and the Science Operations Center (SOC) at the University of Geneva were built from scratch to ECSS standards or by reusing existing systems, on a 50 M€ ESA budget and a 4-year development.

The paper follows the weekly operational chain. Users submit observation requests through PHT2. Flight dynamics (GMV Focus/Autofocus) produces orbits and ground-station contacts. A Deimos-built MPS with a genetic-algorithm Schedule Solver produces the XML Activity Plan. At the MOC the Activity Plan is checked against constraints such as the Sun Exclusion Angle and converted into telecommands. The **mission control system is [SCOS-2000](../scos2000/index.md) version 5.4.2**, configured through its [MIB](../mib/index.md) and driven by a Python automation library under GMV's Flyplan. Its CommandBuilder maps activities to TCs in SSF stack files. During the 4-6 daily passes, Auto Stacks uplink TCs in AD mode. SMON retrieves parameters from the packet archive (PARC, MySQL), and the external interface supports automatic commanding. SCOS-2000 [time correlation](../scos2000/time-correlation.md) handles the free-running on-board oscillator. Post-pass tools (TM Processor, TM Replayer, RGTgenerator, HKTMreporter) split virtual channels, detect frame-counter gaps and produce TC, event and out-of-limits reports.

The SOC pipeline (monitor4cheops, Preprocessing using the MIB, Quick Look, Data Reduction), the archive, MUST/WebMUST trending from RAPID files, the Simulus/SIMSAT simulator with SLE, and the hardware architecture complete the picture. The automation keeps staffing at 3-4 people for the SOC and 5 for the MOC.


## Key points

- CHEOPS launched on 18 December 2019 on Soyuz VS23 into a nadir-locked Sun-synchronous orbit at 690 km, with a 98.7 min period, and is visible from the ground station about 4-6 times a day. All mission operations are the responsibility of the consortium rather than ESA. *(PDF p. 1)*
- The S-class status capped ESA's contribution at 50 M€ (including launch) with a 4-year development. The consortium matched it, for a total of 105 M€ covering the nominal mission, which ended in 2023. *(PDF p. 2)*
- The SOC's MPS (Java, Eclipse RCP client, RESTful services, PostgreSQL) builds a weekly Activity Plan starting on Saturday. A genetic-algorithm 'Schedule Solver' written in C optimises a merit function of guaranteed-time to guest-observer ratio, priority and fill factor. *(PDF p. 4)*
- At the MOC, GFTS (Generic File Transfer System) receives the Activity Plan and StarMaps. Flyplan (GMV) orchestrates the automation, and its monitorCHEOPS activity watches configured paths to trigger processing, making operations data-driven as well as time-driven. *(PDF p. 5)*
- CONCHECK verifies that every slew respects the Sun Exclusion Angle, initially 120 degrees and relaxed to 117 degrees from February 2025. *(PDF p. 6)*
- The CHEOPS MCS is based on SCOS-2000 version 5.4.2, configured through environment variables and the MIB. The CommandBuilder maps each Activity Plan activity to one or more TCs using a rule file, and writes them to an SSF file, an ASCII file readable by any standard SCOS-2000 using the MIB. *(PDF p. 6)*
- Received TM is converted into packets and stored in the SCOS-2000 packet archive (PARC), which archives TM, TC and event data in a MySQL database. *(PDF p. 6)*
- Two Auto Stack instances are reserved for automated operations. SMON provides TM parameter values from the PARC (latest, past, or next sample). TCs are uplinked in AD mode with acknowledgement stages for ground station and on-board reception and execution. *(PDF p. 7)*
- CHEOPS time comes from a free-running local oscillator rather than GPS. A SCOS-2000 time correlation feature uses a linear approximation and updates the coefficients whenever the monitored accuracy falls below the requirement. *(PDF p. 7)*
- Post-pass: the SCOS-2000 TM Processor splits ground-station files into one TM file per virtual channel (real-time HK, recorded HK, science). TM Replayer ingests recorded HK into the PARC. Gaps are detected from jumps in the transfer frame virtual channel frame counter, and RGTgenerator produces the TCReport for the MPS. *(PDF p. 8)*
- The SOC Preprocessing chain decodes and reformats the TM according to the spacecraft's MIB, checks for missing packets, time-tags data with the OBT-UTC correlation and converts packets to FITS. *(PDF p. 10)*
- ESA's MUST and WebMUST are used for TM visualisation and trend analysis as alternatives to SCOS-2000. The MUST database is updated with RAPID files generated by SCOS-2000, and the Python MUSTLink API serves periodic trending. *(PDF p. 12)*
- The spacecraft simulator is based on ESA's Simulus 5.4 and SIMSAT, and communicates with ground stations via the Space Link Extension protocol. Automation keeps routine staffing at 3-4 people for the SOC and 5 for the MOC. *(PDF p. 12)*


## Cited by these wiki pages (5)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (32 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract | 1 |
    | 1 | Introduction | 1 |
    | 2 | Mission Planning | 2 |
    | 2.1 | Observing Requests from Users | 2 |
    | 2.2 | Predicted orbit and G/S contacts from MOC | 3 |
    | 2.3 | Activity Plan creation at SOC | 4 |
    | 3 | Activity Plan processing | 5 |
    | 3.1 | Operational Constraints Check | 5 |
    | 3.2 | TC Conversion and Pass Assignment | 6 |
    | 4 | CHEOPS passes: TC uplink and TM downlink | 6 |
    | 4.1 | Pre-pass activities | 6 |
    | 4.2 | Pass activities | 7 |
    | 4.3 | Post-pass activities | 8 |
    | 5 | Data processing at SOC | 8 |
    | 5.1 | Design decisions | 9 |
    | 5.2 | Internal file transfer | 9 |
    | 5.3 | Core libraries | 9 |
    | 5.4 | Data processing pipeline | 10 |
    | 5.5 | Monitoring Dashboard | 10 |
    | 5.6 | Mission Archive | 11 |
    | 5.7 | Outlook | 11 |
    | 6 | Additional tools | 11 |
    | 6.1 | Parameter Archive and Plotting tool | 12 |
    | 6.2 | CHEOPS Spacecraft Simulator | 12 |
    | 6.3 | CHEOPSim | 12 |
    | 6.4 | CHEOPS Visibility Tool | 12 |
    | 7 | Conclusions | 12 |
    | A | Hardware Architecture | 13 |
    | A.1 | Mission Operations Center | 13 |
    | A.2 | Science Operations Center | 13 |
    | Acknowledgments | Acknowledgments; CRediT authorship contribution statement | 14 |
    | References | References | 15 |


## Documents this one references (13)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| Acton 1996 | [doi:10.1016/0032-0633(95)00107-7](../references/index.md#ref-doi-10-1016-0032-06339500107-7) | Acton, C.H., Ancillary data services of nasa's navigation and ancillary information facility. Planetary and Space Science 44, 65–70 | 1996 | bibliography |
| Benz 2021 | [doi:10.1007/s10686-020-09679-4](../references/index.md#ref-doi-10-1007-s10686-020-09679-4) | Benz, W., Broeg, C., Fortier, A. et al., The CHEOPS mission. Experimental Astronomy 51, 109–151 | 2021 | bibliography |
| Fortier 2024 | [doi:10.1051/0004-6361/202348576](../references/index.md#ref-doi-10-1051-0004-6361-202348576) | Fortier, A., Simon, A.E., Broeg, C. et al., CHEOPS in-flight performance. A comprehensive look at the first 3.5 yr of operations. A&A 687, A302 | 2024 | bibliography |
| Futyan 2020 | [doi:10.1051/0004-6361/201936616](../references/index.md#ref-doi-10-1051-0004-6361-201936616) | Futyan, D., Fortier, A., Beck, M. et al., Expected performances of the Characterising Exoplanet Satellite (CHEOPS). II. The CHEOPS simulator. A&A 635, A23 | 2020 | bibliography |
| Gardner 2006 | [doi:10.1007/s11214-006-8315-7](../references/index.md#ref-doi-10-1007-s11214-006-8315-7) | Gardner, J.P., Mather, J.C., Clampin, M. et al., The James Webb Space Telescope. Space Science Reviews 123, 485–606 | 2006 | bibliography |
| Hoyer 2020 | [doi:10.1051/0004-6361/201936325](../references/index.md#ref-doi-10-1051-0004-6361-201936325) | Hoyer, S., Guterman, P., Demangeon, O. et al., Expected performances of the characterising exoplanet satellite (cheops) - iii. data reduction pipeline: architecture and simulated performances. A&A 635, A24 | 2020 | bibliography |
| Peccia 2003 | [catalogue](../references/index.md#ref-peccia-n-scos-2000-esa-s-spacecraft-control-for-the-21st-century-in-2003-ground-) | Peccia, N., Scos-2000 esa's spacecraft control for the 21st century, in: 2003 Ground System Architectures Workshop | 2003 | bibliography |
| Pence 1999 | [catalogue](../references/index.md#ref-pence-w-cfitsio-v2-0-a-new-full-featured-data-interface-in-mehringer-d-m-plante-) | Pence, W., CFITSIO, v2.0: A New Full-Featured Data Interface, in: Mehringer, D.M., Plante, R.L., Roberts, D.A. (Eds.), Astronomical Data Analysis Software and Systems VIII, p. 487 | 1999 | bibliography |
| Pence 2010 | [doi:10.1051/0004-6361/201015362](../references/index.md#ref-doi-10-1051-0004-6361-201015362) | Pence, W. D., Chiappetti, L., Page, C. G. et al., Definition of the flexible image transport system (fits), version 3.0. A&A 524, A42 | 2010 | bibliography |
| Rauer 2014 | [doi:10.1007/s10686-014-9383-4](../references/index.md#ref-doi-10-1007-s10686-014-9383-4) | Rauer, H., Catala, C., Aerts, C. et al., The PLATO 2.0 mission. Experimental Astronomy 38, 249–330 | 2014 | bibliography |
| Winn 2010 | [doi:10.48550/arXiv.1001.2010](../references/index.md#ref-doi-10-48550-arxiv-1001-2010) | Winn, J.N., Exoplanet Transits and Occultations, in: Seager, S. (Ed.), Exoplanets, pp. 55–77 | 2010 | bibliography |
|  | [catalogue](../references/index.md#ref-ccsds-space-packet-protocol-footnote-23) | CCSDS space packet protocol (footnote 23) |  | mentioned |
|  | [catalogue](../references/index.md#ref-cheops-data-products-definition-document-footnote-19) | CHEOPS Data Products Definition Document (footnote 19) |  | mentioned |

!!! note "Notes"
    There are 15 numbered pages; the extraction reports 16 PDF pages, and the last one is empty. The two-column layout interleaves in places. Figures 1-10 are images or diagrams, and only their captions and labels survive. The author block prints e-mail addresses, which are omitted here. The paper does not expand 'SSF' for the CommandBuilder output (PDF p. 6). The library item spaceops2021-dlr-mobile-mcs expands it as 'Saved Stack File' in a SCOS-2000 (GECCOS) context. It should not be confused with the CCSDS Simple Schedule Format (SSF) in spaceops-0016-estrack-deep-space-cross-support-using-ccsds-servi. The OBT-UTC report is described as converting 'from UTC to OBT', apparently the reverse of what is meant (PDF p. 8). The Peccia 2003 GSAW reference is the library item gsaw2003-peccia. The paper states that ChatGPT was used to rephrase some paragraphs (PDF pp. 14-15).

