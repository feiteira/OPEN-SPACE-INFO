---
title: "HIFI Telecommand Packet Structure ICD (issue 1.10)"
description: "The telecommand interface control document for HIFI, the Heterodyne Instrument for the Far Infrared on ESA's Herschel space observatory."
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [hifi-telecommand-packet-structure-icd]
---

# HIFI Telecommand packet structure ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-U/HIFI/SP/2001-001</dd><dt>Issue / version</dt><dd>1.10</dd><dt>Date</dt><dd>2009-11-23</dd><dt>Organisation</dt><dd>SRON (HIFI instrument consortium)</dd><dt>Authors</dt><dd>Luc Dubbeldam, Anna Di Giorgio, Peter Roelfsema, Pieter Dieleman</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1.10 dated 23 Nov 2009 (short title 'HIFI TC ICD'). The document change record (PDF pp. 2-4) runs from issue 1.0 through 1.10; it notes that issue 1.8 'is in line with HIFI MIB 141', and issue 1.10 adds LCU communication-lock and LCU check telecommands. Prepared by L. Dubbeldam and agreed by IFSI, the ICC, HIFI AIV and HIFI System.</dd><dt>Pages</dt><dd>157</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/996743/HIFI+Telecommand+packet+structure+ICD+document" rel="noopener">https://www.cosmos.esa.int/documents/12133/996743/HIFI+Telecommand+packet+structure+ICD+document</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:01Z</dd><dt>SHA-256</dt><dd><code>5a08591630db4c0dd57bcc71b7b6335cff7db0ca0aeb23693aa53d480be35dd5</code></dd><dt>Size</dt><dd>1.9 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/hifi-telecommand-packet-structure-icd.pdf">hifi-telecommand-packet-structure-icd.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The telecommand interface control document for HIFI, the Heterodyne Instrument for the Far Infrared on ESA's Herschel space observatory. It specifies the structure of every telecommand packet that controls the HIFI on-board software (OBS), down to the byte position, length and fixed value of each field.

Chapter 1 opens with a catalogue of all HIFI TCs, grouped by PUS service. It gives each command's name, type and subtype, function ID (FID), activity ID (AID), structure ID (SID) and total packet length. Chapter 3 gives the generic packet format. The CCSDS source packet header uses the single HIFI APID 1024, three bits of the sequence count identify the command source (ground, mission timeline, CDMS, AOCS), and the 4-octet data field header carries a 4-bit acknowledgement field, the type and subtype, and a spare octet. The packet error control field closes the packet.

Chapter 4 then details the application data of each telecommand. It covers memory management (service 6 load, dump and check of DRAM, PRAM and LCU memory), function management stop and perform activity (service 8 subtypes 2 and 4), and time management (service 9). Packet transmission control (service 14) and the connection test (service 17) follow. The bulk is service 8,4: housekeeping and autonomous checks, configuration of the FCU, HRS, WBS and LCU subsystems (FID 12), parameter scans, local oscillator vector loads and tuning, calibration, spectroscopy modes (total power, fast and slow chop, frequency switch), data simulation, goto-safe, program control (reset, boot, EEPROM, memory copy), peak-up and no-op. For an engineer it is a complete worked example of how an instrument maps its commanding onto PUS function management, and it cross-checks against the HIFI MIB command definitions.


## Key points

- Chapter 1 catalogues every HIFI TC with name, PUS type/subtype, FID, AID, SID and packet length (including header and CRC); memory management uses service 6 (load 6,2, dump 6,5, check 6,9). *(PDF p. 10)*
- Most HIFI commanding is function management: TC(8,2) stops a function and TC(8,4) performs an activity, identified by Function ID and Activity ID (for example FID 12 configure subsystems, FID 7 scans, FID 8 local oscillator, FID 11 spectroscopy, FID 13 peak-up). *(PDF p. 11)*
- Other services: HIFI_enable_time_verify is TC(9,7); packet transmission control is TC(14,1), (14,2) and (14,3); the connection test is TC(17,1). *(PDF p. 14)*
- HIFI_goto_safe is TC(8,4) with FID 17, and HIFI_reset is TC(8,4) FID 16 AID 3. *(PDF p. 14)*
- TC source packet header: version 0, type 1, data field header flag, APID (the HIFI OBS can only use APID 1024), sequence flags 0b11, and a 14-bit sequence count of which 3 bits identify the source and 11 bits are the counter. *(PDF p. 15)*
- Command source codes in the sequence count: 0b000 ground, 0b001 mission time line, 0b010 CDMS, 0b011 AOCS; each source maintains its own 11-bit counter per APID, which wraps to 0. *(PDF p. 15)*
- All commands except CPDU commands (type, subtype) = (2,3) have a data field header. *(PDF p. 15)*
- Data field header: CCSDS secondary header flag 0, PUS version 0, a 4-bit ACK field (bit 3 acceptance, bit 2 start of execution, bit 1 progress, bit 0 completion), type, subtype and a spare octet; the PEC holds a checksum of all preceding fields. *(PDF p. 16)*
- In memory management the 32-bit memory ID plus start address field is used as an 8-bit MID and a 24-bit start address, expressed in smallest addressable units; MIDs include 0x00 PRAM, 0x01 DRAM, 0x04 LCU and 0x11 DRAM boot mode. *(PDF p. 17)*
- Time management accepts TC(9,4) enable time synchronisation, TC(9,5) time code with a 48-bit time field, and TC(9,7) enable time verification. *(PDF p. 156)*


## Cited by these wiki pages (2)

- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (30 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | INTRODUCTION | 10 |
    | 2 | DOCUMENT REFERENCES | 15 |
    | 2.1 | Applicable Documents | 15 |
    | 2.2 | Reference Documents | 15 |
    | 3 | TC PACKET DEFINITION | 15 |
    | 3.1 | source packet header | 15 |
    | 3.2 | data header field | 16 |
    | 3.3 | Packet Error Control | 16 |
    | 4 | TC PACKET SOURCE DATA | 17 |
    | 4.1 | Memory management | 17 |
    | 4.2 | Function management: stop a function | 19 |
    | 4.3 | Function management: Performing an activity | 21 |
    | 4.3.3 | Housekeeping | 22 |
    | 4.3.4 | Switch on autonomous functions | 24 |
    | 4.3.5 | Configure subsystem, FID=12 | 27 |
    | 4.3.6 | Parameter scans | 93 |
    | 4.3.7 | Local Oscillator functions | 98 |
    | 4.3.8 | Tuning functions | 141 |
    | 4.3.9 | Calibration functions | 143 |
    | 4.3.10 | Spectroscopy | 145 |
    | 4.3.11 | HIFI_measure_LCU_IV | 149 |
    | 4.3.12 | Data simulation | 150 |
    | 4.3.13 | HIFI_goto_safe | 150 |
    | 4.3.14 | Program control | 151 |
    | 4.3.15 | Peakup | 154 |
    | 4.3.16 | HIFI_noop | 155 |
    | 4.3.17 | HIFI_clear_LCU_comm_lock | 155 |
    | 4.4 | Time management | 156 |
    | 4.5 | Packet transmission control | 157 |
    | 4.6 | Test command | 157 |


## Documents this one references (3)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD 1. | [SCI-PT-ICD-7527](../references/index.md#ref-sci-pt-icd-7527) | Packet Structure ICD |  | applicable |
| RD 1. | [SRON-U/HIFI/SP/2001-004](../references/index.md#ref-sron-u-hifi-sp-2001-004) | HIFI Command specification |  | reference |
| RD 2. | [SRON-U/HIFI/SP/2001-003](../references/index.md#ref-sron-u-hifi-sp-2001-003) | HIFI Housekeeping packet structure ICD |  | reference |

!!! note "Notes"
    Clean text-based PDF with 157 pages (the text extraction shows a 158th, empty page). Printed page numbers ('Page: n of 157') match PDF page indexes. Printed page numbers in the table of contents are partly missing from the text layer. The first item in the TOC ('1 INTRODUCTION') points to page 10. Section 3's packet format table is labelled 'Table: 2.2-1'. Spelling as printed includes 'transmision', 'preceeding' and 'HIFI_LCUnonresp_chck_offf'. The applicable Packet Structure ICD (SCI-PT-ICD-7527) is in the library as ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d. An older issue (1.5) of this ICD is cited as AD4 in ad19-h-p-1-asp-tn-1072-06-payload-management-and-obcp. The HIFI MIB overview (MIB 139) is the library item hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.

