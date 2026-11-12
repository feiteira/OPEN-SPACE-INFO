---
title: "HIFI TEI TM/TC packet ICD"
description: "A 20-page interface control document (issue 1.0, 19 December 2001) by Luc Dubbeldam of the HIFI instrument team that defines the PUS-style telecommand and telemetry packets exchanged with the HIFI tes"
tags: ["Interface Control Document", "Tools, MIB editors and related standards"]
sources: [cosmos-tei-tmtc-packet-icd]
---

# TEI TMTC packet ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-U/HIFI/SP/2001-011</dd><dt>Issue / version</dt><dd>Issue 1.0</dd><dt>Date</dt><dd>2001-12-19</dd><dt>Organisation</dt><dd>SRON Utrecht (HIFI instrument team)</dd><dt>Authors</dt><dd>Luc Dubbeldam</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1.0, Dec 19, 2001 (PDF p. 1); the 'Checked by', 'Agreed by' and 'Authorised by' fields are blank, and some sections are marked 'To be done' or end in '...' (PDF pp. 14, 20), so it reads as a working draft.</dd><dt>Pages</dt><dd>20</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/TEI+TMTC+PACKET+ICD" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/TEI+TMTC+PACKET+ICD</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:20Z</dd><dt>SHA-256</dt><dd><code>4dc2d004104fc3cf4b255e2ef153c83be5cf712a71e1e53510b6ab9e2e209f05</code></dd><dt>Size</dt><dd>160.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/cosmos-tei-tmtc-packet-icd.pdf">cosmos-tei-tmtc-packet-icd.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 20-page interface control document (issue 1.0, 19 December 2001) by Luc Dubbeldam of the HIFI instrument team that defines the PUS-style telecommand and telemetry packets exchanged with the HIFI test equipment interfaces (TEIs) used in instrument-level testing. Its stated purpose is to describe the packet structure of the telecommand packets; it also defines the telemetry.

Section 3 defines the packet headers with byte positions: the TC source packet (version 000, type 1, secondary header flag 1, 11-bit APID, sequence flags 11, a sequence count split into a 3-bit source field (always 000) and an 11-bit counter, packet length = data field octets minus 1) followed by a 4-octet data field header (CCSDS secondary header flag 0, PUS version 0, 4-bit acknowledge flags for acceptance, start, progress and completion, type, subtype, spare); and the TM source packet with a 10-octet data field header (PUS version, type, subtype, spare, 32-bit coarse and 16-bit fine on-board time). Both packets end with a 16-bit packet error control field.

Section 4 lists services per TEI on APIDs 2016 to 2023: commands accepted by all TEIs (function management type 8,4 'Set OBS-ID' and 'Set BB-ID', connection test 17,1), common telemetry (acceptance reports 1,1 and 1,2 with error codes, error/alarm 5,4, link connection report 17,2), and device-specific command and housekeeping (3,25), event (5,x) and science (21,1) packets for the power distribution unit (PDU, APID 2016), focal-plane unit test equipment (FPU, 2017), scanner (2019), sources (SRC, 2020) and vector network analyser (VNA, 2021); the LOU section is still to be done. It is a compact, real example of a PUS-A-era instrument EGSE packet ICD of the kind that is turned into MIB tables.


## Key points

- The TC source packet header has version 000, type 1, header flag 1 and an 11-bit APID; sequence flags are 11 and the 14-bit sequence count is split into a 3-bit source (always 000) and an 11-bit counter maintained per source and APID. *(PDF p. 4)*
- The TC data field header is 4 octets: CCSDS secondary header flag (0), PUS version (0), a 4-bit ACK field (bit 3 acceptance, bit 2 start of execution, bit 1 progress, bit 0 completion), packet type, packet subtype and a spare octet. *(PDF p. 4)*
- The TM data field header is 10 octets: spare bit, PUS version (0), spare, type, subtype, spare octet, a 32-bit coarse on-board time in seconds and a 16-bit fine time in sub-seconds; the packet length C is always odd. *(PDF p. 5)*
- Commands accepted by all TEIs (APIDs 2016-2023) include 'Set OBS-ID' and 'Set BB-ID' as function-management TC(8,4) with Function ID 1 and Activity IDs 1 and 2, and the connection test TC(17,1). *(PDF p. 6)*
- Acceptance failure reports TM(1,2) carry error codes 0 illegal APID, 1 incomplete or illegal length, 2 incorrect checksum, 3 illegal type, 4 illegal subtype and 5 illegal or inconsistent application data. *(PDF p. 7)*
- TEI-specific APIDs: PDU 2016, FPU 2017, scanner 2019, SRC 2020 and VNA 2021; housekeeping uses TM(3,25), and scanner and VNA measurement reports use TM(21,1). *(PDF p. 8)*
- The TEI-SRC safety report defines 1-bit flags telling SCOS when it must not release a command that increases a bias. *(PDF p. 17)*


## Cited by these wiki pages (5)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Missions](../missions/index.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (24 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 3 |
    | 2 | Document references | 3 |
    | 2.1 | Applicable Documents | 3 |
    | 2.2 | Reference Documents | 3 |
    | 3 | Header definition | 4 |
    | 3.1 | TC source packet | 4 |
    | 3.2 | TM source packet | 5 |
    | 4 | TM-TC definition | 6 |
    | 4.1 | All TEI | 6 |
    | 4.1.1 | Telecommands accepted by all TEI's | 6 |
    | 4.1.2 | Telemetry generated by all TEI's | 6 |
    | 4.2 | TEI-PDU | 8 |
    | 4.2.1 | Telecommands to TEI-PDU | 8 |
    | 4.2.2 | Telemetry interface | 8 |
    | 4.3 | TEI-FPU | 11 |
    | 4.3.1 | Telecommands to TEI-FPU | 11 |
    | 4.3.2 | Telemetry interface | 12 |
    | 4.4 | TEI LOU | 14 |
    | 4.5 | TEI-scanner | 14 |
    | 4.5.1 | Telecommands to TEI-scanner | 14 |
    | 4.6 | TEI-SRC | 14 |
    | 4.6.1 | Telecommands to TEI-SRC | 14 |
    | 4.7 | TEI-VNA | 19 |
    | 4.7.1 | Telecommands to TEI-VNA | 19 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD 1 | [SCI-PT-ICD-7527](../references/index.md#ref-sci-pt-icd-7527) | Packet Structure ICD | issue 2.0 draft 2 | applicable |
| RD 1 | [SRON-U/HIFI/SP/2001-009](../references/index.md#ref-sron-u-hifi-sp-2001-009) | Test-equipment interface URD |  | reference |

!!! note "Notes"
    Word document printed via Acrobat PDFWriter (metadata title '1.0.doc'). Downloaded from cosmos.esa.int as 'TEI TMTC PACKET ICD'. The acronym TEI is not expanded in the document; RD 1 ('Test-equipment interface URD') suggests it means test-equipment interface. The 'Prepared by' date is blank. Several tables in the text layer have the two-byte positions printed as separate columns (e.g. '12 13'). Section 4.4 (TEI LOU) is 'To be done' and the scanner and VNA measurement reports end with 'Maximum number of points: ...'. The header table prints 'Course On-board Time' (sic). The extracted text has an empty 21st page after a trailing form feed.

