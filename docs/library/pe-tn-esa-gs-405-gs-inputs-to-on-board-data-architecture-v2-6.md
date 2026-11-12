---
title: "ESA EO ground segment inputs to on-board data architecture"
description: "An ESA Earth Observation (EO) technical note that states, as numbered requirements (R-001 to R-720), what the payload data ground segment needs from a satellite's on-board data architecture."
tags: ["Technical Note", "ESOC evolution and context"]
sources: [pe-tn-esa-gs-405-gs-inputs-to-on-board-data-architecture-v2-6]
---

# GS inputs to on-board data architecture

<dl class="osi-meta"><dt>Document ID</dt><dd>PE-TN-ESA-GS-405</dd><dt>Issue / version</dt><dd>Issue 2 Rev 6</dd><dt>Date</dt><dd>2026-03-26</dd><dt>Organisation</dt><dd>European Space Agency, ESTEC (Earth Observation Programmes, EOP-PEP / EOP-PE)</dd><dt>Authors</dt><dd>Michele Zundo</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Issue 2 Revision 6 of 26-03-2026, approved by Pierre Viau (EOP-PE), classified 'ESA UNCLASSIFIED - Public Distribution' (PDF pp. 1-2). The change record runs from issue 1.1 (06-Nov-2014) through revisions for BIOMASS, TRUTHS, FORUM, Harmony and NGGM. Issue 2.3 was internal and not distributed.</dd><dt>Pages</dt><dd>19</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://eop-cfi.esa.int/Repo/PUBLIC/DOCUMENTATION/SYSTEM_SUPPORT_DOCS/PE-TN-ESA-GS-405%20GS%20inputs%20to%20on-board%20data%20architecture%20v2_6.pdf" rel="noopener">https://eop-cfi.esa.int/Repo/PUBLIC/DOCUMENTATION/SYSTEM_SUPPORT_DOCS/PE-TN-ESA-GS-405%20GS%20inputs%20to%20on-board%20data%20architecture%20v2_6.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:06Z</dd><dt>SHA-256</dt><dd><code>0468f527f710ab20613f44721e0a75ab53f847ea09ecc3edd730fed85c269957</code></dd><dt>Size</dt><dd>650.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/PE-TN-ESA-GS-405-GS-inputs-to-on-board-data-architecture-v2_6.pdf">PE-TN-ESA-GS-405-GS-inputs-to-on-board-data-architecture-v2_6.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ESA Earth Observation (EO) technical note that states, as numbered requirements (R-001 to R-720), what the payload data ground segment needs from a satellite's on-board data architecture. The aim is efficient, standardised payload data processing, simulation and algorithm development. It is explicitly not about TT&C/S-band links: housekeeping TM and telecommands remain under separate rules and may follow [PUS](../ecss/pus/index.md). It also covers missions that use [CFDP](../ccsds/cfdp.md) as well as the [Space Packet Protocol](../ccsds/space-packet.md) for payload downlink, a new departure for EO, where downlink happens over multiple short passes through commercially procured ground stations.

The main rules follow from APID-based routing. Payload data falls into observation, internal calibration, external calibration and instrument ancillary categories. Every stream needing distinct ground processing gets its own APID, and routing from instrument to Level-1 processor relies solely on the APID (or, for CFDP, on the file name). Platform and instrument ancillary data go in dedicated packets, and navigation goes in a NAVATT packet carrying Earth-fixed PVT, inertial quaternions and time-correlation data. All payload packets carry a common CCSDS-compliant secondary header with a PUS-C time field. The PUS-C header format is allowed, but the service type and subtype must not discriminate data types. Packets must be self-contained, with no sub-commutation, no SID usage and no padding.

Further rules cover link-layer aspects (no AOS insertion zone, VC packet service, payload VCs separate from TT&C, one physical channel per packet store), file operations (segregated files named per the RAW/L0 specification, configurable destination and priority, repeat and complete re-download, open-loop CFDP Class 1 sizing), time- and position-based scheduling, and complete-sequence downlink. The note gives a mission-level rationale for [APID allocation](../ccsds/space-link-identifiers.md) that contrasts with PUS-style SID multiplexing.


## Key points

- The note gives inputs for an on-board data architecture that enables standardised payload CCSDS data analysis, generation, simulation, algorithm development and ground processing. It does not apply to TT&C/S-band data links. *(PDF p. 7)*
- End-to-end routing from on-board source to ground sink uses the Primary Space Packet Header or the CFDP file type identified by file name. Unmodified commercial CCSDS ground equipment (demodulators and FEPs) is assumed, and open-loop payload downlink is preferred. *(PDF p. 7)*
- R-001: payload data is categorised as Observation, Internal Calibration, External Calibration and Instrument Ancillary. Instrument HKTM and platform ancillary data are excluded. *(PDF p. 12)*
- R-010/R-020: the APID is the logical stream identifier, and routing to ground processes is based exclusively on it. Each packet type requiring distinct processing gets a dedicated APID (e.g. separate APIDs per calibration type, observation mode and test mode), unique on the satellite even across RF channels, VCs or files. *(PDF p. 12)*
- R-050: ancillary packets from different on-board sources use different APIDs, e.g. platform versus instrument ancillary, navigation versus thermal. A single aggregated NAVATT packet built from the data pool uses one APID. *(PDF p. 13)*
- R-110 to R-130: all payload packets carry a common secondary header compliant with CCSDS 133.0-B-2 §4.1.4.2, with a time stamp formatted per PUS-C (PTC 9 or PTC 10). The PUS-C secondary header is permitted but not mandated, and its service type and subtype are not used to discriminate data types. *(PDF p. 13)*
- R-140 to R-160: each payload packet must be decodable on its own (no round-robin or slice-based sub-commutation), PUS Structure IDs (SIDs) must be avoided for payload data, and no padding is allowed. *(PDF p. 14)*
- R-200 to R-260: PVT goes in the platform NAVATT packet in an Earth-fixed frame consistent with GNSS (default 1 Hz), attitude quaternions in an inertial frame consistent with the AOCS, and time-correlation parameters (e.g. OBT latched at the GNSS PPS) in NAVATT as well. *(PDF p. 15)*
- R-300/R-320: platform ancillary packets are always generated and available for downlink whatever the instrument state, and the allocation of any payload data type to any packet store must be configurable from ground. *(PDF p. 16)*
- R-400 to R-450: the AOS insertion zone is avoided, recorded payload packets go through the VC Packet Service, payload data and platform ancillary data use VCs separate from TT&C, and each packet store is downlinked over a single physical channel. *(PDF p. 17)*
- R-510 to R-565: payload files carry unique names that identify type and instance for routing without inspecting content. Downlink destination (CFDP destination ID) and priority are configurable, and files can be downlinked more than once or fully re-downloaded after an interrupted pass. *(PDF p. 17)*
- R-590/R-595: with unreliable links and CFDP Class 1, the file size is chosen small enough to minimise unrecovered data. The system should meet performance with an open-loop CFDP Class-1 approach (goal). *(PDF p. 19)*
- R-600 to R-720: operations can be planned with time-tagged and position-tagged on-board schedules. Downlinks use only complete Space Packet sequences (via the segmentation flag), and downlink control is autonomous, with configurable margins around ground-station visibility. *(PDF p. 19)*


## Cited by these wiki pages (2)

- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (18 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Change record | Document change record | 2 |
    | Contents | Table of contents | 6 |
    | 1 | Purpose and Scope | 7 |
    | 2 | Reference documents | 9 |
    | 3 | Acronyms & Glossary | 9 |
    | 3.1 | Acronyms | 9 |
    | 3.2 | Glossary | 10 |
    | 4 | Inputs | 12 |
    | 4.1 | Data Categories | 12 |
    | 4.2 | Data Layers | 12 |
    | 4.2.1 | CCSDS Space Packets | 12 |
    | 4.2.1.1 | Application Data Definition and Identification | 12 |
    | 4.2.1.2 | Structure and format | 13 |
    | 4.2.1.3 | Navigation Data | 15 |
    | 4.2.1.4 | Data availability and storage | 16 |
    | 4.2.2 | Space Data Link (Transfer Frames) and Physical Link | 17 |
    | 4.3 | File Operation | 17 |
    | 4.4 | Others | 19 |


## Documents this one references (13)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [CCSDLP] | [CCSDS 132x0b3](../references/index.md#ref-ccsds-132x0b3) | TM Space Data Link Protocol |  | reference |
| [CCSADL] | [CCSDS 732x0b5](../references/index.md#ref-ccsds-732x0b5) | AOS Space Data Link Protocol |  | reference |
| [CCSFDP] | [CCSDS 727x0b5](../references/index.md#ref-ccsds-727x0b5) | CCSDS File Delivery Protocol (CFDP) |  | reference |
| [CCSUDL] | [CCSDS 732x1b3](../references/index.md#ref-ccsds-732x1b3) | Unified Space data Link Protocol |  | reference |
| [PUS] | [catalogue](../references/index.md#ref-ecss-packet-utilisation-service) | ECSS Packet Utilisation Service |  | reference |
| [L0RAW] | [PE-TN-ESA-GS-586](../references/index.md#ref-pe-tn-esa-gs-586) | EO generic RAW and L0 specification |  | reference |
|  | [CCSDS 133.0-B-2](../references/index.md#ref-ccsds-133-0-b-2) · [library](ccsds-133-0-133x0b2e2.md) | Space Packet Protocol, Section 4.1.4.2 (secondary header) |  | mentioned |
|  | [CCSDS 732.0-B-4](../references/index.md#ref-ccsds-732-0-b-4) · [library](ccsds-732-0-732x0b4.md) | AOS (as cited in R-410 note) |  | mentioned |
|  | [CCSDS 732.1-B-3](../references/index.md#ref-ccsds-732-1-b-3) · [library](ccsds-732-1-732x1b3e1.md) | USLP (as cited in R-410 note) |  | mentioned |
| [CCDBTN] | [catalogue](../references/index.md#ref-cited-for-the-launch-ccdb-value-not-in-the-reference-list) | (cited for the launch CCDB value; not in the reference list) |  | mentioned |
| [RAWL0] | [catalogue](../references/index.md#ref-cited-in-r-510-r-520-for-file-naming-apparently-the-l0raw-entry) | (cited in R-510/R-520 for file naming; apparently the [L0RAW] entry) |  | mentioned |
| [PE-TN-ESA-SY-0305] | [PE-TN-ESA-SY-0305](../references/index.md#ref-pe-tn-esa-sy-0305) | (position-based schedule angle definition, cited in R-610) |  | mentioned |
| [PE-TN-ESA-SY-0338] | [PE-TN-ESA-SY-0338](../references/index.md#ref-pe-tn-esa-sy-0338) | (position-based schedule angle definition, cited in R-610) |  | mentioned |

!!! note "Notes"
    There are 19 numbered pages; the extraction reports 20 PDF pages, the last one empty. Figure 1 (end-to-end data flow, PDF p. 8) is an image. Inconsistencies as printed: the title block says 'GS input' while the cover says 'GS inputs'; the reference list labels the RAW/L0 spec [L0RAW] but R-510/R-520 cite [RAWL0]; [CCDBTN] and the two PE-TN-ESA-SY documents are cited but not listed; §4.2 cites [CCSDLP] (the TM SDLP) for the Space Packet format; R-410 cites AOS as 732.0-B-4 while the reference list gives 732x0b5; 'Noordwik' on the cover and 'Spacer Packet' in R-120 are typos. The change record mentions 'NGGN' (likely NGGM) and an Issue 2.1 table headed without its own revision label. The cover prints an ESTEC telephone number (omitted here). Related library items: ccsds-133-0-133x0b2e2, ccsds-727-0-727x0b5e1, ccsds-732-0-732x0b5ec1, ccsds-732-1-732x1b3e1, ccsds-132-0-132x0b3, ecss-e-st-70-41c-15april2016.

