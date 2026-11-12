---
title: "Venus Express data handling (ESA SP-1295)"
description: "A chapter from ESA SP-1295 that follows Venus Express data from the ground station to the scientific archive."
tags: ["Paper", "TDRS"]
sources: [vex-delhaise-web]
---

# Spacecraft and Payload Data Handling

<dl class="osi-meta"><dt>Document ID</dt><dd>SP-1295</dd><dt>Organisation</dt><dd>European Space Agency (ESOC Ground Systems Engineering Department; ESTEC and ESAC Research and Scientific Support Department)</dd><dt>Authors</dt><dd>F. Delhaise, A. Ercolani, J. Zender, M. Barthelemy, R. Trautner, C. Arviset</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>A chapter printed in the ESA Special Publication volume SP-1295 (running header on even pages, e.g. PDF p. 2); the publication date is not printed. The text says the first scientific data from Venus Express were distributed in May 2007 (PDF p. 12), and the newest reference is from 2006, so it was written in or after 2007.</dd><dt>Pages</dt><dd>13</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://sci.esa.int/documents/34571/36233/1567256613834-DelhaiseWeb.pdf" rel="noopener">https://sci.esa.int/documents/34571/36233/1567256613834-DelhaiseWeb.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T13:54:41Z</dd><dt>SHA-256</dt><dd><code>6f35baa6af364dda149bf1ecaf5ac35ce47eefc00e5164e49180fa57d024a82c</code></dd><dt>Size</dt><dd>685.1 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tdrs/vex-delhaise-web.pdf">vex-delhaise-web.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A chapter from ESA SP-1295 that follows Venus Express data from the ground station to the scientific archive. It defines processing levels 0 to 3: Level-1 is cleaned, merged, time-ordered frame data from NCTRS, and Level-1a is Level-1 separated per instrument for the DDS. It then describes the ESOC data processing systems, a delta development of the joint Rosetta and Mars Express systems. The **Venus Express Mission Control System** (VMCS), based on [SCOS-2000](../scos2000/index.md), handles TM/TC, command verification, out-of-limit detection, calibration and a full command history, and converts on-board time to UTC to better than 2 ms ([time correlation](../scos2000/time-correlation.md)). Other parts are the Mission Planning System, the offline FOP system that imports procedures and sequences into the operational database, and [NCTRS](../scos2000/nctrs-nis.md), which receives ERT-stamped telemetry from the ground stations, forwards telecommands and collects tracking data.

The core of the chapter for this wiki is raw-data dissemination. The **VDDS**, based on the [GDDS](../scos2000/gdds-and-ddids.md), takes XML requests (standing orders, web interface or FTP request files) in a recursive query language. It retrieves from the SCOS-2000 packet archive and file archive ([archives](../scos2000/archives.md)) through a CORBA interface and delivers results over the web, by FTP or on DVD. The VDDS also produces DVDs in the CCSDS Standard Formatted Data Unit format. **TDRS** ([TDRS](../scos2000/tdrs.md)) extracts parameters from fixed-length packets in the history archive, with optional calibration and validity/OOL evaluation, and delivers spreadsheets. The second half covers the science side: PDS standard concepts (ODL keyword = value labels, catalogue files, VOLDESC.CAT), the archive process (Archive Plan, EAICD, DAWG, a validation tool, three-month data-collection and six-month preparation phases, peer review), conversion of auxiliary data to NAIF SPICE kernels by Perl scripts polling the DDS, Level-1b quicklook with QBTool, and the Planetary Science Archive online services.


## Key points

- Each instrument team retrieves spacecraft, ancillary and instrument data from the Data Distribution System (DDS) at ESOC; ESOC removes errors arising in the space-to-ground transmission. *(PDF p. 1)*
- Processing levels: Level-0 raw TM; Level-1 cleaned, merged, time-ordered frame data created by NCTRS; Level-1a separated by instrument as requested by the DDS; Level-1b sorted by data type and mode (uncalibrated); Level-2 calibrated; Level-3 higher-level products. *(PDF p. 2)*
- The Venus Express control concept was inherited from Rosetta and Mars Express, with a single control centre and the ESA deep space antennas at New Norcia and Cebreros; the VEX data systems are a delta development of the shared Rosetta/Mars Express systems. *(PDF p. 3)*
- The VMCS, based on SCOS-2000, performs command verification and out-of-limit detection, timestamps TM by converting on-board time to UTC with better than 2 ms accuracy, and also manages the operational database and on-board software maintenance. *(PDF p. 3)*
- The Venus Express Data Disposition System (VDDS) is based on the GDDS and produces daily Raw Data Media and instrument DVDs sent to VSOC. *(PDF p. 3)*
- The MCS receives TM via NCTRS after the ground station has time-stamped it with Earth Reception Time; NCTRS also stores tracking data (antenna angles, range, Doppler) for FDS via FTS and for PIs via the DDS, and forwards files such as station schedules to the station. *(PDF p. 4)*
- DVDs are formatted using the CCSDS Standard Formatted Data Unit concept; the OCC archives all Level-1 data for 10 years after end of mission; external access is only via the VDDS and TDRS. *(PDF p. 4)*
- The SCOS-2000 mission archive has a packet archive (historical TM, TC and derived data) and a file archive (flight dynamics and planning data); DDS requests come as standing orders, via the web or as FTP request files in a recursive XML query language, and are served through a CORBA interface to the VMCS. *(PDF p. 5)*
- DDS online retrieval is for previewing small amounts of data, embedded as a byte stream in the XML response; full deliveries go via FTP, http or DVD. *(PDF p. 6)*
- TDRS is a SCOS-2000 external interface retrieving parameters from the History File Archive, with optional calibration, validity and out-of-limit evaluation; it supports only fixed-length packets. *(PDF p. 6)*
- PDS labels use the Object Description Language with keyword = value pairs defined in the Planetary Science Data Dictionary; datasets need catalogue files under CATALOG and a top-level VOLDESC.CAT. *(PDF p. 7)*
- The Auxiliary Data Conversion System (Perl scripts) polls the ESOC DDS several times a day for orbit, attitude and time-correlation data and converts them into SPICE SPK, CK and SCLK kernels and ORBNUM files. *(PDF p. 11)*
- The first scientific data from Venus Express were distributed in May 2007. *(PDF p. 12)*


## Cited by these wiki pages (7)

- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TDRS: Telemetry Data Retrieval Service](../scos2000/tdrs.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)


??? abstract "Contents (18 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract | 1 |
    | 1 | Introduction | 1 |
    | 2 | The Ground Segment | 2 |
    | 2.1 | Overview | 2 |
    | 2.2 | Collection of telemetry | 4 |
    | 2.3 | Dissemination of raw data | 4 |
    | 2.3.1 | Dissemination of the mission raw data via the DDS | 5 |
    | 2.3.2 | Dissemination of the raw data via the TDRS | 6 |
    | 3 | Scientific Processing and Data Archiving | 7 |
    | 3.1 | Overview | 7 |
    | 3.2 | The Planetary Data System standard | 7 |
    | 3.3 | The scientific archive process | 10 |
    | 4 | The Auxiliary Data Conversion system | 11 |
    | 5 | Science Quicklook | 12 |
    | 6 | Online Archive Services | 12 |
    | 7 | Conclusion | 12 |
    | References | References | 12 |
    | Acknowledgements | Acknowledgements | 13 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| (2002) DDID | [RO-ESC-IF-5003](../references/index.md#ref-ro-esc-if-5003) | Venus Express, MEX, Rosetta Data Delivery Interface Document | June 2002 | bibliography |
| (2002) GDDS SUM | [DTOS-INFR-UM-1001](../references/index.md#ref-dtos-infr-um-1001) | Generic Data Disposition System Operator User Manual | Issue1.1 March 2002 | bibliography |
| (2000) TDRS SUM | [s2k-mcs-sum-2280-tos-gci](../references/index.md#ref-s2k-mcs-sum-2280-tos-gci) | Telemetry Data Retrieval System Operator User Manual | Issue 2.0 17 July 2000 | bibliography |
| (2004) VEX SRD | [VEX-RSSD-SP-002](../references/index.md#ref-vex-rssd-sp-002) | Venus Express, Science Requirements Document | March 2004 | bibliography |
| (1989) ESA Council | [ESA/C(89)95, rev 1](../references/index.md#ref-esa-c8995-rev-1) | ESA Council, Rules Concerning Information and Data | rev 1 21 December 1989 | bibliography |
| (1992) PSDD | [JPL D-7116](../references/index.md#ref-jpl-d-7116) | Planetary Science Data Dictionary Document | Rev C November 1992 | bibliography |
| (2006) PDS Standards Reference | [JPL D-7669, Part 2](../references/index.md#ref-jpl-d-7669-part-2) | Planetary Data System Data Standards Reference | Version 3.7 February 2006 | bibliography |
| (2002) PSA URD | [SOP-RSSD-RS-006](../references/index.md#ref-sop-rssd-rs-006) | ESA's Planetary Missions Science Data Archive, User Requirement Document | June 2002 | bibliography |
| (2002) PSA URD Issue 1 | [SOP-RSSD-RS-006](../references/index.md#ref-sop-rssd-rs-006) | PSA User Requirement Document | Issue 1 17 April 2002 | bibliography |
| (2004) Archive Plan | [VEX-RSSD-PL-001](../references/index.md#ref-vex-rssd-pl-001) | Venus Express Data Generation, Validation and Transfer Plan | Issue 1.1 7 June 2004 | bibliography |
| SFDU | [catalogue](../references/index.md#ref-standard-formatted-data-unit-concept-as-recommended-by-the-ccsds) | Standard Formatted Data Unit concept as recommended by the CCSDS |  | mentioned |

!!! note "Notes"
    The extraction interleaves the two-column layout (side headings and figure captions appear mid-sentence). The ODL and label examples ('the block on the opposite page') and Figures 1-5 are images or boxes that were not extracted; PDF p. 9 is effectively empty. The archive size is printed as 'of the order of 109 bytes', where the superscript of 10^9 is lost. NCTRS is expanded as 'Network Controller and Telemetry Receiver System', which differs from 'Network Control and TM/TC Router System' used elsewhere. The term 'Telemetry Data Retrieval System' is used for TDRS, and the DDS is described as 'based on the Generic Data Disposition System'. Fabienne Delhaise's e-mail address is omitted here. The extraction reports 14 PDF pages (registry: 13); the last is empty. Two references share the ID SOP-RSSD-RS-006 with different titles and dates. A. Ercolani and F. Delhaise also appear on the approval page of library item mex-esc-id-5003-fds-icd.

