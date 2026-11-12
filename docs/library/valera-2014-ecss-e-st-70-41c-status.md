---
title: "ECSS-E-ST-70-41C status (SAVOIR Mass Memory Day 2014)"
description: "A 25-slide status presentation on the PUS-C revision of the ECSS Packet Utilization Standard (ECSS-E-ST-70-41C), given by ESA's working-group convenor Serge Valera, with co-authors from Spacebel and T"
tags: ["Presentation", "ECSS standards"]
sources: [valera-2014-ecss-e-st-70-41c-status]
---

# Telemetry and Telecommand Packet Utilization
The ECSS-E-ST-70-41C
Feb 2014 ECSS WG Draft

<dl class="osi-meta"><dt>Date</dt><dd>2014-02-13</dd><dt>Organisation</dt><dd>ESA, with Spacebel and TAS (presented at the SAVOIR On-board Mass Memory Day)</dd><dt>Authors</dt><dd>Serge Valera, Arnaud Bourdoux, Sante Candia</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>A snapshot of the PUS-C (ECSS-E-ST-70-41C) working-group draft of February 2014, before publication. Slides 12-14 mark the large-data and large-packet transfer services as 'TBC'. The final standard was published on 15 April 2016 (see the library item ecss-e-st-70-41c-15april2016).</dd><dt>Pages</dt><dd>25</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/40/contributions/2424/attachments/1932/2241/02_Session_2_-_SAVOIR_-_Mass_Memory_Day_2014_-__ECSS-E-ST-70-41C_status_-_S._Valera_-_Issue_1.pdf" rel="noopener">https://indico.esa.int/event/40/contributions/2424/attachments/1932/2241/02_Session_2_-_SAVOIR_-_Mass_Memory_Day_2014_-__ECSS-E-ST-70-41C_status_-_S._Valera_-_Issue_1.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:16Z</dd><dt>SHA-256</dt><dd><code>9248a8b20faa22c103e3660d2067c3af49acc28495a3ea61c222fe46b1e89d8a</code></dd><dt>Size</dt><dd>1.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/valera-2014-ECSS-E-ST-70-41C-status.pdf">valera-2014-ECSS-E-ST-70-41C-status.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 25-slide status presentation on the **PUS-C** revision of the ECSS Packet Utilization Standard (ECSS-E-ST-70-41C), given by ESA's working-group convenor Serge Valera, with co-authors from Spacebel and Thales Alenia Space, at the SAVOIR On-board Mass Memory Day on 13 February 2014. It explains why PUS-A was upgraded: 190 change requests, removing PUS-A deficiencies, meeting future mission needs, consistency with newer ECSS and CCSDS standards, ECSS drafting rules with named requirements, and backward compatibility where possible. It lists the working-group members from ESA, Astrium, CNES, DLR, EUMETSAT, Spacebel and TAS.

The slides present the **new document structure** of about 630 pages: the PUS foundation model, the service type system specification and the service type interface specification, plus Annexes A-D. They explain the foundation model's generic type and generic deployment abstraction levels, and how the standard service type model, the mission-specific service type model and the space-system service model relate. A table lists the standard service types (ST 1-23), with ST 20-23 new and ST 13 and ST 24 'TBC'.

The mass-memory-related topics are:

* the open options for transferring **large data and large packets** (keep PUS-A service 13, add a new service 24, or leave segmentation to the lower layers);
* the three subservices of the reworked **ST[06] memory management** (raw, structured and common);
* the new **ST[23] file management** service and its file-handling and file-copy subservices, which is independent of any file delivery protocol such as CFDP, and how ST18, ST21, ST6 and ST20 interact with files.

Backup slides illustrate request/instruction and report/notification slots, using a [11,4] schedule insertion as the example.


## Key points

- The PUS-A to PUS-C upgrade processed 190 change requests, aiming to remove PUS-A deficiencies, meet future mission needs, align with new ECSS/CCSDS standards, apply ECSS drafting rules (named requirements) and keep backward compatibility when possible. *(PDF p. 2)*
- The working group included ESA (S. Valera convenor, M. de Lande Long book captain), Astrium, CNES, DLR, EUMETSAT, Spacebel and TAS. *(PDF p. 3)*
- The PUS-C draft is about 630 pages: foundation model about 30 pages, service type system specification about 320 pages, service type interface specification about 180 pages; Annexes cover CPDU (normative), IEEE/MILBUS real formats, CRC and ISO checksum, and a summary of requests and reports. *(PDF p. 4)*
- The foundation model has a generic type abstraction level (service, subservice and message types; request, instruction, report and notification types; transactions) and a generic deployment abstraction level (the space-system service model obtained by instantiation). *(PDF p. 8)*
- The service type interface requirements specify how requests travel in CCSDS SPP and PUS telecommand packets, and how reports travel in CCSDS SPP and PUS telemetry packets. *(PDF p. 11)*
- Standard service types in the Feb 2014 draft: ST 1-6, 8, 9, 11, 12, 14, 15, 17, 18, 19, plus new ST 20 parameter management, 21 request sequencing, 22 position-based scheduling and 23 file management; ST 13 large data transfer and ST 24 large packet transfer were TBC. *(PDF p. 12)*
- Large transfers raise two issues: packets up to 65 KB (CCSDS packets) and memory areas larger than 65 KB. One option is to keep PUS at the application layer, require support for any CCSDS packet up to 65 KB, and leave segmentation to ECSS-E-50/CCSDS data-link mechanisms. *(PDF p. 15)*
- ST[06] is split into raw data memory, structured data memory (memory objects such as files and tables) and common memory management subservices, supporting 'flat' and 'structured' file systems. *(PDF p. 17)*
- ST[23] has file handling and file copy subservices, and the standard does not impose a file delivery protocol such as CFDP. *(PDF p. 19)*
- ST18 can load an OBCP by reference and ST21 a request sequence by reference; ST6 base-plus-offset addressing is extended to files; ST20 allows dynamic creation of parameters. *(PDF p. 21)*
- Example: an on/off device command instruction is inserted into a time-based schedule by a request carried in a [11,4] TC packet. *(PDF p. 23)*


## Cited by these wiki pages (9)

- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [ST[13] Large packet transfer](../ecss/pus/st13-large-packet-transfer.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [ST[20] On-board parameter management](../ecss/pus/st20-onboard-parameter-management.md)
- [ST[21] Request sequencing](../ecss/pus/st21-request-sequencing.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (15 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Slide 1 | Telemetry and Telecommand Packet Utilization - The ECSS-E-ST-70-41C (title) | 1 |
    | Slide 2 | ECSS-E-ST-70-41C WG – Main Purpose | 2 |
    | Slide 3 | ECSS-E-ST-70-41C WG Members | 3 |
    | Slide 4 | PUS C – A new document structure | 4 |
    | Slides 5-9 | The PUS Foundation Model | 5 |
    | Slide 10 | The Service Type System Requirements | 10 |
    | Slide 11 | The Service Type Interface Requirements | 11 |
    | Slide 12 | The Standard Service Type Model | 12 |
    | Slides 13-15 | Transfer of large data, "large" packets | 13 |
    | Slides 16-17 | Service Type 6 Memory Management | 16 |
    | Slides 18-21 | Service Type 23 File Management | 18 |
    | Slide 22 | Any questions? | 22 |
    | Slide 23 | A time-based scheduling service interacting with other services | 23 |
    | Slide 24 | A specification view of a request | 24 |
    | Slide 25 | A specification view of a report | 25 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | Telemetry and Telecommand Packet Utilization (Feb 2014 ECSS WG Draft) | Feb 2014 ECSS WG Draft | mentioned |
|  | [catalogue](../references/index.md#ref-pus-a-ecss-e-70-41a) | PUS-A (ECSS-E-70-41A) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-space-packet-spp) | CCSDS Space Packet (SPP) |  | mentioned |
|  | [ECSS-E-50](../references/index.md#ref-ecss-e-50) | ECSS-E-50 (lower-level transfer and reconstruction of source packets) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-space-data-link-protocol-standards) | CCSDS Space Data Link protocol standards |  | mentioned |
|  | [catalogue](../references/index.md#ref-cfdp-ccsds-file-delivery-protocol) | CFDP (CCSDS File Delivery Protocol) |  | mentioned |

!!! note "Notes"
    The slides carry no document number or issue. The source file name and URL say 'Issue 1' (registry source_url), but the slides do not print it. Slides 13, 16 and 18 repeat the service-type table of slide 12, labelled 'new services' rather than 'new service types'. Diagram slides (5-9 and 23-25) extract as interleaved text. PDF page 26 is blank, so srcgrep shows 26 pages while the registry gives 25. Every slide carries an 'ESA UNCLASSIFIED – For Official Use' marking. The source is the ESA Indico page of the SAVOIR Mass Memory Day 2014 (Session 2). The ADCSS 2015 talk by the same author (valera-2015-adcss-ecss-e-st-70-41c-status) is a later status of the same work.

