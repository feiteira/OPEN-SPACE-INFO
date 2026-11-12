---
title: "Solar Orbiter inter-instrument communication (S3/S20)"
description: "A technical note from the Solar Orbiter Science Ground Segment at ESAC (SOL-SGS-TN-0007, issue 2.0, 7 October 2016, prepared by Luis Sanchez) recording the agreements reached by the instrument teams i"
tags: ["Technical Note", "Mission data delivery documents"]
sources: [sol-sgs-tn-0007-s20-2-0]
---

# Solar Orbiter On board Inter-instrument Communication Via Services 3 and 20

<dl class="osi-meta"><dt>Document ID</dt><dd>SOL-SGS-TN-0007</dd><dt>Issue / version</dt><dd>Issue 2, Revision 0</dd><dt>Date</dt><dd>2016-10-07</dd><dt>Organisation</dt><dd>European Space Agency, ESAC (Solar Orbiter Science Ground Segment)</dd><dt>Authors</dt><dd>Luis Sanchez</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Status 'Issued', Issue 2 Revision 0, date of issue 2016-10-07 (PDF p. 1); the 'Approved by' field is blank (PDF p. 2). Chapter 7 is 'To be written' (PDF p. 32). Classified 'ESA UNCLASSIFIED - For Official Use'.</dd><dt>Pages</dt><dd>33</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/MOC/SOL-SGS-TN-0007-S20-2.0.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/MOC/SOL-SGS-TN-0007-S20-2.0.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:56Z</dd><dt>SHA-256</dt><dd><code>afdf185e78b25d110ff389f6f95c29f60f48cccaa12c6e7f82e1a33c45e5e4be</code></dd><dt>Size</dt><dd>336.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/sol-sgs-tn-0007-s20-2.0.pdf">sol-sgs-tn-0007-s20-2.0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A technical note from the Solar Orbiter Science Ground Segment at ESAC (SOL-SGS-TN-0007, issue 2.0, 7 October 2016, prepared by Luis Sanchez) recording the agreements reached by the instrument teams in the Science Operations Working Group on exchanging real-time information on board, so that instruments can react autonomously to solar events and synchronise observations (for example coordinated burst-mode triggering).

The mechanism uses two PUS services. Instruments never talk to each other directly: each participating instrument sends an inter-instrument communication (IIC) housekeeping packet TM(3,25), with its own PID, category CAT 5 and a SID, to the on-board computer, which extracts the parameters into its data pool. Up to 8 times per second the OBC assembles a TC(20,128) packet (service 20, on-board parameter management, mission-specific subtype 128) carrying 36 octets of platform data and up to 200 octets of instrument data, and distributes it to the instruments, with distribution enabled, disabled and timed per instrument by TC(20,1) and TC(20,2). The same TC(20,128) also acts as an OBC heartbeat that lets instruments go safe if the spacecraft enters Survival Mode.

The note gives the agreed generation and distribution cadences, a common 4-byte heartbeat copied from the OBT coarse time, spare-allocation rules, and the platform parameters offered (thruster-firing and solar-array flags, AOCS mode and convergence, roll rate and angle, reaction-wheel speeds and validities). It then specifies byte by byte the IIC TM(3,25) data field of EPD, EUI, MAG, METIS, PHI, RPW, SOLOHI, STIX, SWA and SPICE, the allocation summary, and the complete 236-byte TC(20,128) data field. It is a worked example of a mission-specific PUS service extension and of parameter definitions that end up in the MIB.


## Key points

- Instruments communicate only with the OBC: each sends Service 3 TM(3,25) packets to the OBC, and the OBC returns Service 20 TC(20,128) packets carrying parameter data from all participating instruments; TC(20,128) also serves as an OBC heartbeat for autonomous safing if the spacecraft enters Survival Mode. *(PDF p. 6)*
- The nominal maximum delay from TM(3,25) generation to parameter extraction into the OBC datapool is 250 ms. *(PDF p. 6)*
- MOC requests that IIC TM(3,25) packets use CAT 5, and the IIC packets need a PID different from other TM(3,25) packets because they are not downlinked; PID+CAT+SID identifies the packet to the OBC, and the SID is not put into the datapool. Bit 0 is the MSB in all packet tables. *(PDF p. 6)*
- The OBC assembles TC(20,128) up to 8 times per second (8 Hz), with 36 octets of platform data and up to 200 octets of instrument data; TC(20,1) and TC(20,2) enable or disable distribution per instrument, with a period from 1 CSW cycle (125 ms) to 65535 cycles, and 0 meaning one-shot. *(PDF p. 7)*
- The total nominal maximum delay for data distribution between instruments is 500 ms (250 ms to extraction plus 250 ms to distribution). *(PDF p. 7)*
- Agreed TM(3,25) generation cadences: MAG 8 Hz, SWA 0.25 Hz, EPD, RPW, EUI, METIS, PHI, SOLOHI and STIX 1 Hz; SPICE does not participate. All instruments receive TC(20,128) at 1 Hz except SWA at 8 Hz. *(PDF p. 8)*
- Each instrument puts at the start of its IIC TM(3,25) data a 4-byte heartbeat copied from the OBT coarse time field (1 s resolution), so stale data can be identified. *(PDF p. 9)*
- IIC packet identifiers: EPD PID 100/SID 100 (30 bytes), EUI PID 57/SID 10, MAG PID 65/SID 20, METIS PID 69/SID 20, PHI PID 74/SID 6, RPW PID 81/SID 6, SOLOHI PID 84/SID 5, STIX PID 94/SID 4, SWA PID 95/SID 255 and SPICE PID 88/SID 7, all CAT 5. *(PDF p. 12)*
- The TC(20,128) data field totals 236 bytes: spacecraft 1-36, EPD 37-66, EUI 67-89, MAG 90-109, METIS 110-129, PHI 130-143, RPW 144-176, SOLOHI 177-190, STIX 191-206, SWA 207-222 and SPICE 223-236 (all SPICE bytes spare). *(PDF p. 25)*
- Platform data offered in TC(20,128) include a thruster-firing-expected flag, a solar-array steering flag, the current AOCS mode (enumerated SASM, WSM, NCM and OCM sub-modes), an AOCS convergence flag, roll rate and roll angle, and the four reaction-wheel speeds with validity flags. *(PDF p. 10)*


## Cited by these wiki pages (8)

- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [ST[20] On-board parameter management](../ecss/pus/st20-onboard-parameter-management.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Solar Orbiter STIX instrument database](../missions/solar-orbiter/stix.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Solar Orbiter instrument interfaces: SWA DPU ICD and EID-A](../missions/solar-orbiter/instrument-interfaces.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (34 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 5 |
    | 1.1 | Scope | 5 |
    | 1.2 | Documentation | 5 |
    | 1.3 | Acronyms | 5 |
    | 2 | Overview | 6 |
    | 2.1 | Packet TM(3,25) generation | 6 |
    | 2.2 | Packet TM(3,25) structure | 6 |
    | 2.3 | Packet TC(20,128) distribution | 7 |
    | 2.4 | Packet TC(20,128) structure | 7 |
    | 3 | Payload agreements | 8 |
    | 3.1 | Generation cadence | 8 |
    | 3.2 | Distribution cadence | 8 |
    | 3.3 | Heartbeat/data validity indicator | 9 |
    | 3.4 | Spare fields | 9 |
    | 4 | Parameters requested from the platform | 10 |
    | 5 | Service 3: IIC TM(3,25) packet contents | 12 |
    | 5.1 | EPD | 12 |
    | 5.2 | EUI | 13 |
    | 5.3 | MAG | 14 |
    | 5.4 | METIS | 16 |
    | 5.5 | PHI | 18 |
    | 5.6 | RPW | 19 |
    | 5.7 | SOLOHI | 20 |
    | 5.8 | STIX | 21 |
    | 5.9 | SWA | 22 |
    | 5.10 | SPICE | 23 |
    | 6 | Service 20: TC(20,128) packet contents | 25 |
    | 6.1 | Summary of data field allocations | 25 |
    | 6.2 | TC(20,128) data field overview | 25 |
    | 6.3 | TC(20,128) data field structure | 26 |
    | 7 | Instrument reactions upon reception of service 20 packets | 32 |
    | 7.1 | Event reporting | 32 |
    | 7.2 | Overview of instrument dependencies | 32 |
    | 7.3 | Downloading consistent datasets | 32 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [RD 01] | [SOL.S.ASTR.TN.00079](../references/index.md#ref-sol-s-astr-tn-00079) · [library](sol-s-astr-tn-00079-07.md) | Solar Orbiter TM-TC and Packet Structure ICD | Issue 6 | reference |
| [RD 02] | [SOL.S.ASTR.TN.00088](../references/index.md#ref-sol-s-astr-tn-00088) | Solar Orbiter Instrument Data Management Overview for PIs | Issue 3 | reference |
| [RD 03] | [catalogue](../references/index.md#ref-solar-orbiter-in-situ-coordination-requirements) | Solar Orbiter in-situ coordination: requirements | Issue 6 15 March 2014 | reference |
| [RD 04] | [catalogue](../references/index.md#ref-remote-sensing-working-group-summary-of-rs-instruments-use-of-service-20) | Remote Sensing Working Group Summary of RS Instruments' use of Service 20 | Issue 1, Revision 0 23 June 2014 | reference |
|  | [catalogue](../references/index.md#ref-iic-test-meeting-response-to-actions-11-and-12-by-ads-email-of-23-sep-2016) | IIC Test Meeting Response to Actions 11 and 12 by ADS (Email of 23 Sep 2016) | 23 Sep 2016 | mentioned |

!!! note "Notes"
    The title on the cover (PDF p. 1) and in the page footers reads 'Solar Orbiter On board Inter-instrument Communication Via Services 3 and 20', while the document information table on PDF p. 2 reads 'Solar Orbiter On-board Inter-instrument Communication Via Service 20'; the cover title is used here. The file name (S20-2.0) matches issue 2.0. PDF page indices equal the printed page numbers (Page N/33); the extracted text has an empty 34th page. Several platform fields are still TBC (commandable flags, AOCS mode content, roll angle units), and the platform-parameter table cites an e-mail from ADS of 23 Sep 2016 as its source. Chapter 7 contains only headings and 'To be written'. [RD 01] is the Solar Orbiter TM-TC and Packet Structure ICD; issue 7 of that document is the library item sol-s-astr-tn-00079-07.

