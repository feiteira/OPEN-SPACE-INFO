---
title: "SCOS-2000 Time Correlation Technical Note"
description: "Version 1.0 (cover date 31 October 2018) of the ESA/ESOC technical note, prepared by the SCOS-2000 GIMUS team, that explains time correlation(../scos2000/time-correlation.md) (TCO) in SCOS-2000."
tags: ["Technical Note", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [tn-1030-time-correlation]
---

# SCOS-2000 Time Correlation Technical Note

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-MCS-S2K-TN-1030</dd><dt>Issue / version</dt><dd>Version 1.0</dd><dt>Date</dt><dd>2018-10-31</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (ESA/OPS-GDI); prepared by the SCOS-2000 GIMUS Team</dd><dt>Authors</dt><dd>SCOS-2000 GIMUS Team</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Version 1.0, cover date 2018-10-31 (PDF p. 1). The change log entry dated 10/08/2018 reads 'Creation of the document for S2K-7699' (PDF p. 2), and DCR 1.0 dated 12/17/2018 records editorial changes only (PDF p. 3).</dd><dt>Pages</dt><dd>43</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/egos-mcs-s2k-tn-1030-version10%2BTCO.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/egos-mcs-s2k-tn-1030-version10%2BTCO.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:29Z</dd><dt>SHA-256</dt><dd><code>068fbd7b45d90a1812f90cce288389ce91463d79793080d7f528d025093a99ce</code></dd><dt>Size</dt><dd>1.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/core/tn-1030-time-correlation.pdf">tn-1030-time-correlation.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Version 1.0 (cover date 31 October 2018) of the ESA/ESOC technical note, prepared by the SCOS-2000 GIMUS team, that explains [time correlation](../scos2000/time-correlation.md) (TCO) in SCOS-2000. Time correlation relates the on-board time (OBT) of a spacecraft clock to ground UTC. The Packetiser needs it to time-stamp packets and the Releaser to encode time-tagged telecommands.

The mechanism works as follows. The spacecraft latches its clock when it transmits a frame whose counter is a multiple of N (a power of 2 up to 256) and reports the value in a later time packet. SCOS-2000 takes the earth reception time (ERT) of that frame and subtracts the ground, propagation and on-board radiation delays to get the frame transmission time. Adding the latching delay gives the OBT latching time, and the result is an OBT/UTC time couple. The couple is accepted only if the time packet arrives within a plausibility window. Coefficients come from a least-squares fit for a free-running clock, or from a single-couple difference (gradient 1) for a clock synchronised to e.g. GPS, and are expressed relative to the last couple used. The deviation of each new couple classifies the coefficients as accurate, valid or invalid and drives automatic recalculation and reset. A separate check confirms synchronisation against the expected TAI/UTC offset.

The note gives the byte layouts of the ground-generated Time Couple and Time Correlation (coefficient) packets, the SPIDs used for testing, and definitions of every time and delay involved (FTT, OLT, frame radiation and reception times, OWLT, ground delay). It then describes the TCO engine in the packetiser, the client library with its CUC and CDS [time formats](../ccsds/time-codes.md), and the CORBA TCO server with its MISC configuration variables. See also [downlink](../overview/downlink.md).


## Key points

- Time correlation relates the OBT of an event to its time as seen by SCOS-2000; it is mainly needed by the Packetiser for time-stamping packets and by the Releaser for encoding time-tagged commands. *(PDF p. 10)*
- The TCO server stores the gradient and offset (a1, a0) of a linear OBT-to-UTC function in Coefficient Packets; a1 = 1 for a synchronised (e.g. GPS) clock, otherwise a least-squares fit over a set of time couples is used. *(PDF p. 10)*
- Correlation status from the deviation and two configurable limits (accuracy &lt;= validity): ACCURATE and VALID, INACCURATE and VALID, or INACCURATE and INVALID. *(PDF p. 11)*
- Testing without real TCO data: packets are injected through the TM-TC Test Tool; the packet chain is Time Report (SPID 1000005), Time Couple (SPID 1000098) and Time Coefficients (SPID 1000099). *(PDF p. 11)*
- On-board sampling is triggered by transmission of a frame whose frame counter is a multiple of N, N a power of 2 between 1 and 256; the latched OBT is downlinked in a later frame's time packet. *(PDF p. 13)*
- FTT = ERT - ground delay - propagation delay - on-board processing delay; the OBT latching time is FTT + on-board latching delay, and with the reported OBT it forms a time couple. *(PDF p. 13)*
- A time packet creates a time couple only if it arrives within a configured interval after the triggering frame (plausibility check); otherwise it is ignored. *(PDF p. 14)*
- In automatic mode coefficients are recalculated whenever the deviation exceeds half the accuracy limit; invalid couples are first discarded as rogues, and after a configurable number a new correlation is started. *(PDF p. 15)*
- Algorithms: 'free running clock' (least squares, UTC(OBT) = UTC_N + Gradient * (OBT - OBT_N) + Offset) and 'synchronised on board clock' (difference of the last time couple); the conversion is relative to the last couple used, for higher time resolution. *(PDF p. 16)*
- The Packetiser supports three time-stamping options: archive filing time, frame transmission time (ERT minus delays), or on-board generation time from the OBT in the packet data field. *(PDF p. 17)*
- Time Couple Packet: OBT (64 bits, TDSsunTime), OLT, FTT and ERT (96 bits each: seconds, microseconds, picoseconds), light time delay, on-board frame radiation delay, OBT latching delay and ground station delay (doubles), ground station ID (32 bits) and deviation. *(PDF p. 21)*
- Time Correlation Packet: version (1), algorithm (1 = DIFFERENCE, 2 = LEAST SQUARE), synchronisation-check flag, validity, accuracy and synchronisation status bytes, spare, then gradient, offset (now obsolete), OBT_N, UTC_N and display offset as IEEE 64-bit doubles. *(PDF p. 23)*
- Frame Radiation and Frame Reception Time are defined at the leading edge of the first bit of the Attached Sync Marker; for SLE service providers ERT equals the Frame Reception Time and the ground delay is 0. *(PDF p. 26)*
- Example frame rule: real-time VC0 data with VCFC % 32 = 0. *(PDF p. 31)*
- Plausibility check: FTTreport - FarLimit &lt;= FTTobt &lt;= FTTreport - CloseLimit, with MISC variables TCO_FAR_FTT_PLAUSIBILITY_LIMIT and TCO_CLOSE_FTT_PLAUSIBILITY_LIMIT. *(PDF p. 32)*
- Auto-reset: after TCO_AUTORESET_INVALID_DEVIATIONS consecutive deviations beyond the validity interval, the time-couple buffer is emptied and recalculation waits for two new time couples. *(PDF p. 33)*
- Time formats: TCOtimeFormatCUC is parameterised by the PFC from which the CUC variants are derived; TCOtimeFormatCDS handles CDS; missions may subclass TCOtimeFormat for other formats. *(PDF p. 38)*
- The TCO server is a resident process with a CORBA interface and one TCOserverImpl per on-board clock; it produces and stores time-couple and coefficient packets and converts historical times using archived coefficients. *(PDF p. 39)*
- To avoid ambiguity after OBT resets, creating a new coefficient packet deletes archived coefficient packets for OBTs within the validity period of the last generated coefficients. *(PDF p. 41)*
- MISC variables are duplicated per on-board clock using the suffix '_n' for the nth OBT. *(PDF p. 42)*
- Synchronisation check: the expected TAI/UTC difference (TCO_TAI_UTC_DIFFERENCE) minus the current correction must be within the accuracy interval (TCO_ACCURACY_INTERVAL). *(PDF p. 43)*


## Cited by these wiki pages (13)

- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [How it all fits together](../overview/index.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SLE return services: RAF, RCF and ROCF](../ccsds/sle/return-services.md)
- [ST[09] Time management](../ecss/pus/st09-time-management.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)
- [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)


??? abstract "Contents (41 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Document Change Log | 2 |
    | 1 | Abstract | 4 |
    | 1.1 | Table Of Contents | 5 |
    | 1.2 | List Of Figures | 7 |
    | 1.3 | List Of Tables | 8 |
    | 2 | Introduction | 9 |
    | 2.1 | Purpose | 9 |
    | 2.2 | Scope | 9 |
    | 2.3 | Acronyms and Abbreviations | 9 |
    | 2.4 | References | 9 |
    | 2.4.1 | Applicable Documents | 9 |
    | 2.5 | Reference Documents | 9 |
    | 3 | Overview | 10 |
    | 3.1 | General Context | 10 |
    | 3.2 | General Structure | 11 |
    | 4 | Time Correlation Mechanisms | 13 |
    | 4.1 | Algorithm | 16 |
    | 5 | Time Correlation Packetizer | 17 |
    | 5.1 | Time Correlation Access Classes | 17 |
    | 5.2 | Time Correlation Packets | 20 |
    | 5.2.1 | Time Couple Packet | 21 |
    | 5.2.2 | Time Correlation Packet | 23 |
    | 6 | Time Correlation System & Architectural Design | 26 |
    | 6.1 | Times And Delays Used in Time Correlation | 26 |
    | 6.2 | Methods of Time Correlation | 27 |
    | 6.3 | TCO Engine | 29 |
    | 6.3.1 | System Design | 30 |
    | 6.3.2 | Component Description | 31 |
    | 6.4 | Time Correlation Client (Library) | 35 |
    | 6.4.1 | System Design | 35 |
    | 6.4.2 | Component Description | 37 |
    | 6.4.2.5 | TCOtimeFormatCUC | 38 |
    | 6.4.2.6 | TCOtimeFormatCDS | 38 |
    | 6.5 | Time Correlation Server | 39 |
    | 6.5.1 | System Design | 39 |
    | 6.5.2 | Component Description | 39 |
    | 6.5.2.1 | TCOserverInterface | 40 |
    | 6.5.2.2 | TCOserverImpl | 40 |
    | 6.5.2.3 | TCOtmPktIF | 43 |
    | 6.5.2.4 | TCOcalculation | 43 |
    | 6.5.2.5 | TCODifferenceCalculation & TCOleastSquaresCalculation | 43 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD1 | [EGOS-EUD-S2K-SUM-1001](../references/index.md#ref-egos-eud-s2k-sum-1001) | EUD4S2K Software User Manual |  | applicable |
| AD2 | [EGOS-MCS-S2K-ADD-0017](../references/index.md#ref-egos-mcs-s2k-add-0017) | TM Packetiser and Packet Displays ADD |  | applicable |
| CNF-01 | [CIDL-0001](../references/index.md#ref-cidl-0001) | SCOS-2000 Document Control List |  | reference |
| CNF-02 | [DCL-1001](../references/index.md#ref-dcl-1001) | EUD4S2K Document control List |  | reference |
| RD1 | [GLO-0001](../references/index.md#ref-glo-0001) | SCOS-2000 Glossary, Definitions and Acronyms |  | reference |
| RD2 | [ICD-0001](../references/index.md#ref-icd-0001) | SCOS-2000 Database Import Interface Control Document |  | reference |
| RD3 | [SUM-0007](../references/index.md#ref-sum-0007) | SCOS-2000 MSG Software User Manual |  | reference |
|  | [catalogue](../references/index.md#ref-gaia-tco-document-source-of-section-5-2) | GAIA TCO document (source of section 5.2) |  | mentioned |
|  | [S2K-7699](../references/index.md#ref-s2k-7699) | SCOS-2000 change request for which the document was created |  | mentioned |

!!! note "Notes"
    The table of contents is numbered one lower than the body headings (TOC '1 Introduction' against body '2 Introduction'), because the Abstract is numbered 1; this entry uses the body numbering. The change log's statement that chapter 4 comes from the EUD4S2K SUM and section 5.2 from a GAIA TCO document probably uses the TOC numbering. Printed page 1 is PDF p. 8 (front matter ii-vii), and the text extraction has a trailing empty page 44. Several cross-references are broken ('Error! Reference source not found.', PDF pp. 10 and 39). Section 6.3.1.1 (TPKTM) has no text. The display-offset formula on PDF p. 25 has a minus sign before 'Gradient' where PDF pp. 16 and 24 use a plus sign. Typos include 'Shema' and 'Plausability'. The dates are written in several ways (2018-10-31, 10/08/2018, 12/17/2018). The file name 'egos-mcs-s2k-tn-1030-version10+TCO' is hosted in the EDDS folder of the Solar Orbiter IRAP document site.

