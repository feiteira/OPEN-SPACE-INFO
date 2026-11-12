---
title: "SLE Cross Support Concept, Part 1 (CCSDS 910.3-G-3)"
description: "CCSDS Green Book (informational report) that explains the concept behind the Space Link Extension (SLE)(../ccsds/sle/index.md) services."
tags: ["Informational Report", "Ground stations, NCTRS/NIS and SLE"]
sources: [ccsds-910x3g3-sle-cross-support]
---

# Cross Support Concept—Part 1: Space Link Extension Services

<dl class="osi-meta"><dt>Document ID</dt><dd>CCSDS 910.3-G-3</dd><dt>Issue / version</dt><dd>Informational Report, Issue 3 (Green Book)</dd><dt>Date</dt><dd>March 2006</dd><dt>Organisation</dt><dd>Consultative Committee for Space Data Systems (CCSDS)</dd><dt>Type</dt><dd>Informational Report</dd><dt>Status</dt><dd>The Document Control table (PDF p. 5) lists 910.3-G-1 (May 1995) as 'Original issue, superseded', 910.3-G-2 (April 2002) as 'First revision, superseded' and 910.3-G-3 (March 2006) as 'Current issue'. Whether CCSDS has since revised or retired the report is not stated in the document.</dd><dt>Pages</dt><dd>100</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ccsds.org/Pubs/910x3g3.pdf" rel="noopener">https://ccsds.org/Pubs/910x3g3.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:23Z</dd><dt>SHA-256</dt><dd><code>2e82705bc7ab322065597284c9d09324954637383335c8b7f47bbf2cf015a660</code></dd><dt>Size</dt><dd>977.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/ccsds-910x3g3-sle-cross-support.pdf">ccsds-910x3g3-sle-cross-support.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

CCSDS Green Book (informational report) that explains the concept behind the [Space Link Extension (SLE)](../ccsds/sle/index.md) services. Cross support means one organisation provides part of its space data system to serve another organisation's mission. SLE services make this possible by extending the CCSDS space link services ([TM](../ccsds/tm-sdlp.md), [TC](../ccsds/tc-sdlp.md), [AOS](../ccsds/aos.md)) across the ground between ground stations, control centres and users. The report summarises the Cross Support Reference Model (910.4-B-2), the draft Service Management specification (910.11-R-1) and the transfer service specifications. It assumes a single mission and spacecraft that use CCSDS TM/TC or AOS.

The report describes extension of the space link in **distance** (processing at remote sites), **information** (annotation such as reception time) and **time** (offline delivery). It then lists the transfer services and maps them to SLE Functional Groups. Return services are RAF, RCF, RFSH, ROCF and RSP ([return services](../ccsds/sle/return-services.md)); forward TC services are FSP, FTCVCA, FTCF and [CLTU](../ccsds/sle/fcltu.md); forward AOS services were still undefined at the time. Functional Groups are grouped into SLE Complexes. The report also covers the operations common to all services (BIND, UNBIND, PEER-ABORT, START, STOP, TRANSFER-DATA, notifications, status reports, GET-PARAMETER, plus THROW-EVENT and INVOKE-DIRECTIVE), a simplified state diagram, an RCF-START example table with ASN.1, and the two-layer [SLE API](../ccsds/sle/isp1-and-api.md) (API Proxy and API Service Element).

Section 5 introduces SLE Service Management: Utilization Management in the MDOS and Complex Management in the provider negotiate Service Agreements, Configuration Profiles, Trajectory Predictions and Service Packages across definition and utilization phases. The annexes give a glossary, cross-support scenarios, antenna-pointing management scenarios and the SLE security mechanisms (credentials with 'all', 'bind' or 'none' authentication levels, and access control).


## Key points

- Issue history: 910.3-G-1 (May 1995) and 910.3-G-2 (April 2002) are marked superseded; 910.3-G-3 (March 2006) is the current issue. *(PDF p. 5)*
- The report assumes a single mission and a single spacecraft whose TM/TC systems comply with the CCSDS TM recommendations and either the TC recommendations or the AOS recommendation, with all ground end-users affiliated to one mission manager. *(PDF p. 9)*
- Cross Support services are of three kinds: SLE services, Ground Communications services and Ground Domain services (for example tracking, exchanging spacecraft databases, mission planning). Only Part 1 (SLE) of the Cross Support Concept exists; Part 2 is not planned and Part 3 is under consideration. *(PDF p. 10)*
- SLE services comprise data transfer services and management services, and operate in a definition phase (management) and a utilization phase (data transfer, in real time or off-line). *(PDF p. 15)*
- The SLE system extends space link services in distance, in information (annotation, e.g. reception conditions) and in time; for example, the SCID from the frame must accompany packets processed remotely because APIDs are only unique within a spacecraft. *(PDF p. 20)*
- Return SLE services: Return All Frames (RAF), Return Channel Frames (RCF, master or virtual channel), Return Frame Secondary Header (RFSH), Return Operational Control Field (ROCF) and Return Space Packet (RSP, selected by APID from one VC); R-Insert and R-Bitstream were not yet defined. *(PDF p. 24)*
- Providing a return packet service requires three SLE Functional Groups: Return Space Link Processing, Return Frame Processing and Return Frame Data Extraction. *(PDF p. 27)*
- Forward TC SLE services: Forward Space Packet (FSP), Forward TC Virtual Channel Access (FTCVCA), Forward TC Frame (FTCF) and Forward CLTU; the ROCF service supplies the CLCW needed for link availability and COP-1 retransmission decisions. *(PDF p. 28)*
- Forward AOS SLE services (F-AOSSP, F-AOSVCA, F-Bitstream, F-pVCDU, F-cVCDU, F-VCDU, F-Insert) were not yet defined by CCSDS and are planned in two Functional Groups. *(PDF p. 31)*
- All functions of a Functional Group must be implemented within a single SLE Complex; one or more Functional Groups can be implemented in SLE Complexes operated by different organisations. *(PDF p. 32)*
- Operations common to all SLE transfer services: BIND, UNBIND, PEER-ABORT, START, STOP, TRANSFER-DATA, SYNC-NOTIFY/ASYNC-NOTIFY, SCHEDULE-STATUS-REPORT, STATUS-REPORT and GET-PARAMETER; some services add THROW-EVENT and INVOKE-DIRECTIVE. *(PDF p. 34)*
- The RCF-START operation table carries invoker-credentials, performer-credentials, invoke-ID, start-time, stop-time and global-VCID in the invocation, with result and a conditional diagnostic in the return; each operation has an ASN.1 definition. *(PDF p. 37)*
- The SLE API has two layers: the API Proxy (technology-independent interface to the communications system) and the API Service Element (enforces CCSDS state tables and checks operation parameters). *(PDF p. 38)*
- SLE Service Management exchanges Service Agreements, Configuration Profiles, Service Packages and Trajectory Predictions between Utilization Management (user/MDOS side) and Complex Management (provider side). *(PDF p. 39)*
- Of the five OSI management functional areas, SLE Service Management covers configuration, accounting, fault and security management, but not performance management. *(PDF p. 41)*
- SLE transfer service instances have one of three authentication levels: 'all' (every invocation and return carries credentials), 'bind' (only BIND and its return) or 'none'; access control allows only one specified user to initiate each service instance. *(PDF p. 75)*


## Cited by these wiki pages (8)

- [CCSDS: overview of the protocol stack](../ccsds/index.md)
- [How it all fits together](../overview/index.md)
- [SLE forward service: FCLTU](../ccsds/sle/fcltu.md)
- [SLE over TCP/IP (ISP1) and the SLE API](../ccsds/sle/isp1-and-api.md)
- [SLE return services: RAF, RCF and ROCF](../ccsds/sle/return-services.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Space Link Extension (SLE): concept and architecture](../ccsds/sle/index.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (43 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 9 |
    | 1.1 | Purpose | 9 |
    | 1.2 | Scope | 9 |
    | 1.3 | Applicability | 9 |
    | 1.4 | Rationale | 10 |
    | 1.5 | Document Structure | 11 |
    | 1.6 | Definitions | 11 |
    | 1.7 | References | 12 |
    | 2 | Background to SLE Services | 15 |
    | 2.1 | What are SLE Services? | 15 |
    | 2.2 | Why do we need SLE Services? | 16 |
    | 2.3 | What are the Benefits of SLE Services? | 16 |
    | 3 | Cross Support Environment | 17 |
    | 3.1 | Context | 17 |
    | 3.2 | Space Data Systems | 18 |
    | 3.3 | Space Link Extension System Environment | 18 |
    | 3.4 | Space Link Extension Service Concept | 19 |
    | 3.4.2 | Extension over Distance | 20 |
    | 3.4.3 | Extension in Information | 21 |
    | 3.4.4 | Extension in Time | 22 |
    | 3.4.5 | Extension in Distance, Information and Time | 23 |
    | 4 | SLE Data Transfer | 24 |
    | 4.1 | Overview of SLE Data Transfer Services | 24 |
    | 4.2 | Return SLE Services | 24 |
    | 4.3 | Forward Telecommand SLE Services | 28 |
    | 4.4 | Forward AOS SLE Services | 31 |
    | 4.5 | SLE Complexes | 32 |
    | 4.6 | SLE Data Transfer Service Operations | 34 |
    | 4.7 | The SLE Application Program Interface (API) | 37 |
    | 4.8 | Future Data Transport Services | 38 |
    | 5 | SLE Service Management | 39 |
    | 5.1 | Overview of SLE Service Management Concepts | 39 |
    | 5.2 | Scope of SLE Service Management | 41 |
    | 5.3 | SLE Service Management Considerations | 41 |
    | 5.4 | SLE Service Management Environment | 42 |
    | 5.5 | Time Span of SLE Agreements and Packages | 45 |
    | 5.6 | Outline of SLE Service Management Services | 51 |
    | 5.7 | Service Management Concept Extensibility | 56 |
    | Annex A | Acronyms | 58 |
    | Annex B | Glossary | 60 |
    | Annex C | Cross Support Scenarios | 63 |
    | Annex D | SLE Service Management: Antenna Pointing Scenarios | 71 |
    | Annex E | SLE Security Mechanisms | 75 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [CCSDS A00.0-Y-9](../references/index.md#ref-ccsds-a00-0-y-9) | Procedures Manual for the Consultative Committee for Space Data Systems | Yellow Book. Issue 9 November 2003 | reference |
| [2] | [CCSDS 132.0-B-1](../references/index.md#ref-ccsds-132-0-b-1) | TM Space Data Link Protocol | Blue Book. Issue 1 September 2003 | reference |
| [3] | [CCSDS 131.0-B-1](../references/index.md#ref-ccsds-131-0-b-1) | TM Synchronization and Channel Coding | Blue Book. Issue 1 September 2003 | reference |
| [4] | [CCSDS 732.0-B-1](../references/index.md#ref-ccsds-732-0-b-1) | AOS Space Data Link Protocol | Blue Book. Issue 1 September 2003 | reference |
| [5] | [CCSDS 231.0-B-1](../references/index.md#ref-ccsds-231-0-b-1) | TC Synchronization and Channel Coding | Blue Book. Issue 1 September 2003 | reference |
| [6] | [CCSDS 232.0-B-1](../references/index.md#ref-ccsds-232-0-b-1) | TC Space Data Link Protocol | Blue Book. Issue 1 September 2003 | reference |
| [7] | [CCSDS 133.0-B-1](../references/index.md#ref-ccsds-133-0-b-1) | Space Packet Protocol | Blue Book. Issue 1 September 2003 | reference |
| [8] | [CCSDS 910.4-B-2](../references/index.md#ref-ccsds-910-4-b-2) | Cross Support Reference Model — Part 1: Space Link Extension Services | Blue Book. Issue 2 September 2005 | reference |
| [9] | [CCSDS 910.11-R-1](../references/index.md#ref-ccsds-910-11-r-1) | Space Link Extension—Service Management—Service Specification | Draft Recommendation, Red Book. Issue 1 March 2006 | reference |
| [10] | [CCSDS 911.5-B-1](../references/index.md#ref-ccsds-911-5-b-1) | Space Link Extension—Return Operational Control Fields Service Specification | Blue Book. Issue 1 December 2004 | reference |
| [11] | [CCSDS 911.2-B-1](../references/index.md#ref-ccsds-911-2-b-1) | Space Link Extension—Return Channel Frames Service Specification | Blue Book. Issue 1 December 2004 | reference |
| [12] | [CCSDS 911.1-B-2](../references/index.md#ref-ccsds-911-1-b-2) | Space Link Extension—Return All Frames Service Specification | Blue Book. Issue 2 December 2004 | reference |
| [13] | [CCSDS 912.1-B-2](../references/index.md#ref-ccsds-912-1-b-2) | Space Link Extension—Forward CLTU Service Specification | Blue Book. Issue 2 December 2004 | reference |
| [14] | [CCSDS 912.3-B-1](../references/index.md#ref-ccsds-912-3-b-1) | Space Link Extension—Forward Space Packet Service Specification | Blue Book. Issue 1 December 2004 | reference |
| [15] | [CCSDS 913.1-R-1](../references/index.md#ref-ccsds-913-1-r-1) | Space Link Extension—Internet Protocol for Transfer Services | Draft Recommendation, Red Book. Issue 1 October 2005 | reference |
| [16] | [ISO/IEC 8824-1:2002](../references/index.md#ref-iso-iec-8824-1-2002) | Information Technology—Abstract Syntax Notation One (ASN.1): Specification of Basic Notation | 3rd ed. 2002 | reference |
| [17] | [ISO/IEC 7498-4:1989](../references/index.md#ref-iso-iec-7498-4-1989) | Information Processing Systems—Open Systems Interconnection—Basic Reference Model—Part 4: Management Framework | 1989 | reference |
| [18] | [ISO/IEC 9594-8:2001](../references/index.md#ref-iso-iec-9594-8-2001) | Information Technology—Open Systems Interconnection—The Directory: Public-Key and Attribute Certificate Frameworks | 4th ed. 2001 | reference |
| [19] | [CCSDS 502.0-B-1](../references/index.md#ref-ccsds-502-0-b-1) | Orbit Data Messages | Blue Book. Issue 1 September 2004 | reference |

!!! note "Notes"
    The printed table of contents (PDF p. 6) numbers the Section 1 subsections 1.1, 1.2, 1.1, 1.2, 1.3, 1.4, 1.5, while the body uses 1.1 to 1.7. The body numbering is used here. The return frame and packet diagrams (Figs 4-2, 4-3, 4-6 to 4-8) only survive in the extraction as scattered field labels, and the service-package lifetime figures on PDF pp. 46-50 are garbled. The PDF has 101 pages in the extraction (registry: 100). No individual authors are named. The report predates CCSDS 913.1-B (ISP1) and the SLE API recommendations, which it cites only as a draft or as future work.

