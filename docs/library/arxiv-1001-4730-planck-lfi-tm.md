---
title: "Planck LFI Level 1 telemetry handling (JINST 2009)"
description: "A peer-reviewed paper (JINST, December 2009; arXiv preprint January 2010) by the Planck Low Frequency Instrument (LFI) Data Processing Centre team describing the 'Level 1' ground software that receive"
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [arxiv-1001-4730-planck-lfi-tm]
---

# Level 1 on-ground telemetry handling in Planck LFI

<dl class="osi-meta"><dt>Document ID</dt><dd>arXiv:1001.4730v1</dd><dt>Issue / version</dt><dd>v1</dd><dt>Date</dt><dd>2010-01-26</dd><dt>Organisation</dt><dd>Planck LFI Data Processing Centre (INAF-Osservatorio Astronomico di Trieste, University of Geneva/ISDC, INAF-IASF Bologna and partner institutes)</dd><dt>Authors</dt><dd>A. Zacchei, M. Frailis, M. Maris, N. Morisset, R. Rohlfs, M. Meharga, P. Binko, M. Türler, S. Galeotta, F. Gasparo, E. Franceschi, R. C. Butler, F. Cuttaia, O. D’Arcangelo, S. Fogliani, A. Gregorio, R. Leonardi, S.R. Lowe, D. Maino, G. Maggio, M. Malaspina, N. Mandolesi, P. Manzato, P. Meinhold, L. Mendes, A. Mennella, G. Morgante, F. Pasian, F. Perrotta, M. Sandri, L. Stringhetti, L. Terenzi, M. Tomasi, A. Zonca</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Preprint (arXiv v1, 26 Jan 2010) of the paper published in JINST: submitted 24 June 2009, accepted 28 August 2009, published 29 December 2009, reference 2009 JINST 4 T12019, DOI 10.1088/1748-0221/4/12/T12019 (title-page footnote, PDF p. 2).</dd><dt>Pages</dt><dd>19</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://arxiv.org/pdf/1001.4730" rel="noopener">https://arxiv.org/pdf/1001.4730</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:56Z</dd><dt>SHA-256</dt><dd><code>68442bd2e3c1a14b13580b2fdba8d6ec7198464d09673d0fc6cae0e261bb26d6</code></dd><dt>Size</dt><dd>535.5 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/arxiv-1001.4730-planck-lfi-tm.pdf">arxiv-1001.4730-planck-lfi-tm.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A peer-reviewed paper (JINST, December 2009; arXiv preprint January 2010) by the Planck Low Frequency Instrument (LFI) Data Processing Centre team describing the 'Level 1' ground software that receives and first processes LFI telemetry. It first explains the on-board chain: 22 radiometers, the 14-bit ADC of the data acquisition electronics, and the seven processing types (raw, co-added, mixed and requantised, and losslessly compressed variants) that keep LFI within a 53.5 kbit/s telemetry budget. It then describes the packets: ESA packet telemetry and CCSDS packets with a PUS data field header, a structure identifier (SID) after the headers, a 16-bit CRC, a 48-bit CUC on-board time, an extra tertiary header in science packets, and essential, fast (supercommutated) and slow housekeeping packets.

The second half covers the three Level 1 subsystems. A Real-Time Assessment system based on SCOS-2000 monitors housekeeping, sends telecommands and acts as a telemetry gateway; the paper explains how the instrument was described in the SCOS Mission Information Base (PID keyed by APID, type, subtype and SID; PCF; PLF with offsets and occurrences for supercommutation) and how SCOS 2.3e, and later the HPCCS with its PIPE protocol, were used. A Telemetry Handler reused from INTEGRAL/ISDC software archives raw packets as FITS files, unscrambles them and produces calibrated Time Ordered Information (TOI). A ROOT-based Quick-Look system displays the data. The last section gives the ground formulas for decompression, dequantisation, demixing, conversion to volts and on-board-time reconstruction.

For this wiki it is a real, citable example of PUS packet design, MIB population and SCOS-2000 used as instrument EGSE and real-time assessment tool.


## Key points

- Level 1 consists of a Real-Time Assessment system (RTA, based on SCOS 2000), a Telemetry Handler (TMH) and a Telemetry Quick-Look system (TQL). *(PDF p. 4)*
- LFI has 22 radiometers fed by 11 feedhorns at 30, 44 and 70 GHz; each radiometer output is digitised by a 14-bit ADC in the DAE and stored as a 16-bit unsigned integer (quantisation step 0.30518 mV). *(PDF p. 4)*
- The LFI telemetry budget must not exceed 53.5 Kbps because a whole day of packets is stored on board and downlinked during the Daily Tele-Communication Period; the REBA offers 7 processing types (PType 0-6) to reduce the data rate. *(PDF p. 6)*
- Nominally all 44 detectors use PType 5, and every 15 minutes one detector in turn is also processed with PType 1 to calibrate the gain modulation factors and second quantisation. *(PDF p. 7)*
- Packets follow the ESA Packet Telemetry and Telecommand standards, CCSDS packet telemetry and the ESA PUS: two fixed-length headers, a variable data segment and a 16-bit CRC whose specification and C reference implementation are in the PUS. *(PDF p. 7)*
- The packet sequence counter counts modulo 16384 per application process; the OBT is a 48-bit CUC field as specified in the PUS. *(PDF p. 8)*
- Most Planck TM packets carry a Structure ID (SID); the set (APID, Type, Subtype, SID) identifies the data segment structure, and Planck defined additional custom services for scientific telemetry. *(PDF p. 8)*
- The data segment of each SCI packet is filled up to a maximum of 980 bytes; the tertiary header holds detector, phase-switch status, processing type, REBA parameters and number of samples. *(PDF p. 9)*
- Essential HK packets are sent every 32 s, fast HK is sampled once per second (some packets supercommutated into four sub-fields and delivered every 4 s), and slow HK every 64 s. *(PDF p. 9)*
- SCOS 2000 cannot process the compressed scientific telemetry, so it is used mainly as EGSE during ground tests and for HK monitoring in flight; it also acts as a telemetry gateway via its TCP/IP and CORBA interfaces. *(PDF p. 11)*
- Configuring SCOS means defining the MIB: PID holds APID, Type, Subtype and SID as each packet's 'primary key', PCF describes each monitored parameter and its calibration curve, and PLF places parameters in packets by offset and number of occurrences. *(PDF p. 12)*
- For LFI-only tests the EGSE was SCOS 2.3e with a modified Telemetry Receiver (TMR) replaying simulated telemetry and a tailored Flight Dynamics Interface (FDIF) client; from the Planck integration tests the HPCCS with the PIPE protocol and an LFIGateway were used. *(PDF p. 12)*
- The TMU groups HK packets by APID, Type, Subtype and SID and stores unscrambled telemetry as FITS files in one-hour chunks; TM2TOI writes one FITS file per HK parameter with calibration applied. *(PDF p. 13)*
- Conversion to volts uses the DSA, BTI, DGI and DOI values, inverting Vout = GDAE(Vin + ODAE) + ZDAE; PType 2/5 data are dequantised and demixed with GMF1 and GMF2. *(PDF p. 15)*


## Cited by these wiki pages (7)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Missions](../missions/index.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (16 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Abstract | 2 |
    |  | Contents | 3 |
    | 1 | Introduction | 3 |
    | 2 | The LFI on-board data processing and telemetry structure | 4 |
    | 2.1 | The on-board processing | 4 |
    | 2.1.1 | Telemetry Packet Structure | 7 |
    | 2.1.2 | Mapping SCI data into packets | 8 |
    | 2.1.3 | Mapping HK data into packets | 9 |
    | 3 | The Level 1 software system overview | 10 |
    | 3.1 | SCOS in the LFI LEVEL 1 | 11 |
    | 3.2 | The Telemetry Handler System | 12 |
    | 3.3 | The Telemetry Quick-Look | 14 |
    | 4 | The Level 1 scientific data processing | 15 |
    | 5 | Conclusions | 16 |
    |  | Acknowledgments | 17 |
    |  | References | 17 |


## Documents this one references (16)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [Advances in Space Research 34 (2004) 491–496](../references/index.md#ref-advances-in-space-research-34-2004-491-496) | The Planck mission (J. A. Tauber) | 2004 | bibliography |
| [2] | [PSS-04-106](../references/index.md#ref-pss-04-106) | Packet Telemetry Standard (ESA Publications, Tech. Rep., ESA Procedures Standards and Specifications) | 1988 | bibliography |
| [3] | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Packet Utilization Standard (PUS) (ESA Publications, Tech. Rep., ESA Procedures Standards and Specifications) | Issue 1 2002 | bibliography |
| [4] | [Journal of Instrumentation 12 (Dec., 2009) 12021](../references/index.md#ref-journal-of-instrumentation-12-dec-2009-12021) | A systematic approach to the Planck LFI end-to-end test and its application to the DPC Level 1 pipeline (M. Frailis et al.) | Dec., 2009 | bibliography |
| [5] | [arXiv:1001.3321](../references/index.md#ref-arxiv-1001-3321) | Planck pre-launch status: Design and description of the Low Frequency Instrument (M. Bersanelli et al.) | Jan., 2010 | bibliography |
| [6] | [astro-ph/](../references/index.md#ref-astro-ph) | Advanced pseudo-correlation radiometers for the Planck-LFI instrument (A. Mennella et al.) | July, 2003 | bibliography |
| [7] | [Journal of Instrumentation 12 (Dec., 2009) 12018](../references/index.md#ref-journal-of-instrumentation-12-dec-2009-12018) | Optimization of Planck-LFI on-board data handling (M. Maris et al.) | Dec., 2009 | bibliography |
| [8] | [102.0-B-4](../references/index.md#ref-102-0-b-4) | Packet Telemetry (CCSDS, Tech. Rep., CCSDS Secretariat) | 1995 | bibliography |
| [9] | [PL-LFI-PST-MA-001](../references/index.md#ref-pl-lfi-pst-ma-001) | Planck LFI User Manual (A. Gregorio et al., University of Trieste) | 2008 | bibliography |
| [10] | [Journal of Instrumentation 12 (Dec., 2009) 12020](../references/index.md#ref-journal-of-instrumentation-12-dec-2009-12020) | Off-line radiometric analysis of Planck-LFI data (M. Tomasi et al.) | Dec., 2009 | bibliography |
| [11] | [DASIA 2003, vol. 532 of ESA Special Publication](../references/index.md#ref-dasia-2003-vol-532-of-esa-special-publication) | SCOS-2000: Evaluating a Generic Mission Control System According To SPEC (M. Jones, E. Gomez, F. Aldea, H. Schäbe) | 2003 | bibliography |
| [12] | [ADASS XIII, ASP Conference Series vol. 314, pp. 440](../references/index.md#ref-adass-xiii-asp-conference-series-vol-314-pp-440) | From INTEGRAL to Planck: Geneva’s contribution to the LFI data processing (M. Türler et al.) | July, 2004 | bibliography |
| [13] | [ADASS XV, ASP Conference Series vol. 351, pp. 287](../references/index.md#ref-adass-xv-asp-conference-series-vol-351-pp-287) | Planck LFI Data Processing During Instrument Calibration Tests (N. Morisset et al.) | July, 2006 | bibliography |
| [14] | [ADASS XIII, ASP Conference Series vol. 314, pp. 388](../references/index.md#ref-adass-xiii-asp-conference-series-vol-314-pp-388) | Pre-processing the INTEGRAL telemetry (N. Morisset et al.) | July, 2004 | bibliography |
| [15] | [ADASS XIII, ASP Conference Series vol. 314, pp. 384](../references/index.md#ref-adass-xiii-asp-conference-series-vol-314-pp-384) | The ROOT C++ Framework for Astronomy (R. Rohlfs) | July, 2004 | bibliography |
| [16] | [ADASS XVII, ASP Conference Series vol. 394, pp. 601](../references/index.md#ref-adass-xvii-asp-conference-series-vol-394-pp-601) | PLANCK LFI Level 1 Processing During Operations (N. Morisset et al.) | Aug., 2008 | bibliography |

!!! note "Notes"
    JINST-style preprint; printed page numbers (–1– to –17–) equal PDF page minus 2. Figures (packet structure, data-flow and class diagrams, displays) appear only as captions and fragments in the text layer. Reference [6] is printed with a truncated arXiv identifier ('astro-ph/'). Reference [3] attributes the ECSS PUS (ECSS-E-70-41A) to 'ESA Procedures Standards and Specifications'. Reference [11] is the DASIA 2003 paper by the same authors as the ESA Bulletin 115 article (library item esa-bulletin-115-ch8). In 'doc_id' of journal and conference references this catalogue records the publication locator as printed. The corresponding-author e-mail address on PDF p. 2 is omitted.

