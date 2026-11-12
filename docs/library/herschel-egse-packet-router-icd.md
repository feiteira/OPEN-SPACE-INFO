---
title: "Herschel EGSE Packet Router ICD (HIFI, 2001)"
description: "A 14-page interface control document prepared by Albrecht de Jonge for the HIFI instrument team and addressed to the three Herschel instrument EGSE and ICC teams (HIFI, PACS, SPIRE) and the ESA Hersch"
tags: ["Interface Control Document", "Tools, MIB editors and related standards"]
sources: [herschel-egse-packet-router-icd]
---

# Herschel EGSE Packet Router ICD

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-G/HIFI/ICD/2001-001</dd><dt>Issue / version</dt><dd>1.1</dd><dt>Date</dt><dd>2001-10-23</dd><dt>Organisation</dt><dd>SRON, HIFI instrument team (Groningen; from the document number SRON-G/HIFI/ICD/2001-001 and the 'HIFI' header field)</dd><dt>Authors</dt><dd>Albrecht de Jonge</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1.1 of Oct 23, 2001 (PDF p. 1). Change record (PDF p. 3): Draft 2 (February 8, 2001, rewrite to standard table of contents), Version 1.0 (July 30, 2001, first official release, recovery procedures added), Version 1.1 (October 23, 2001, refers to interface requirements). The 'Agreed by' block lists the HIFI, PACS and SPIRE EGSE and ICC managers, the ESA HSC manager and an ESA AIV manager (TBS) without dates or signatures (PDF p. 1). Several values are still TBC or TBS.</dd><dt>Pages</dt><dd>14</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/Herschel+EGSE+Packet+Router+ICD" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/Herschel+EGSE+Packet+Router+ICD</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:45Z</dd><dt>SHA-256</dt><dd><code>f5a749a2abdc2531ee89f784d80059da3980304de7401c049c71548c778755f5</code></dd><dt>Size</dt><dd>67.6 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/herschel-egse-packet-router-icd.pdf">herschel-egse-packet-router-icd.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 14-page interface control document prepared by Albrecht de Jonge for the HIFI instrument team and addressed to the three Herschel instrument EGSE and ICC teams (HIFI, PACS, SPIRE) and the ESA Herschel Science Centre. It defines the TCP/IP protocol of the Herschel EGSE packet router, a Java program that distributes telemetry and telecommand packets in the Packet Structure ICD format between the components of an instrument-level test set-up: a SCOS-2000 system, test-equipment interface computers, the HCSS telemetry ingester and the CDMS simulator. The same protocol was intended for HCSS ingestion of raw telemetry in later mission phases; the document is ICD #4 of the ground segment ICD list.

Every message has a 5-octet header (a 1-octet messageType and a 4-octet contentLength, most significant octet first) followed by at most 1100 octets of content (TBC). Twelve message types (USER_DATA; ADD_, DEL_, ASK_, SHOW_ and NAME_CLIENT; ADD_, DEL_, ASK_ and SHOW_BLOCK; ASK_ and SHOW_TRAFFIC) use three content structures: data-packet, client-info and route-info. Routing uses a 'packet address': the 11-bit APID for telemetry, 4096 plus the APID for telecommands, and 8192 as a reserved wildcard. Clients name themselves, subscribe to packet addresses and receive forwarded copies; block rules filter routes by source client, destination client and address, and the router reports clients, blocks and traffic counts on request. The document also gives crash-recovery rules, a network bit-rate budget, the absence of security and of error checking beyond TCP, and an example call sequence. It is a compact, real example of the packet distribution layer of a SCOS-2000-based instrument EGSE.


## Key points

- The router distributes TM and TC in the standard format of the Packet Structure ICD [AD 1] among EGSE components during instrument level tests; the same interface is to be used by the HCSS for ingesting raw telemetry later in the mission. *(PDF p. 6)*
- This document is ICD #4 in the Ground Segment List of ICDs [RD 1] and covers the requirements of [AD 3] section 4.2.1. *(PDF p. 6)*
- During instrument level tests the router connects a SCOS-2000 system, test equipment interface computers, the HCSS telemetry ingester and the CDMS simulator over a TCP/IP LAN; all clients open a TCP connection to the router, and forwarding is based on the packet APID plus the TM/TC distinction. *(PDF p. 6)*
- The router runs on any platform supporting Java; the TCP port and the client names must be agreed for each set-up. *(PDF p. 7)*
- Exceptions to [AD 3] 4.2.1: FSG-IR-4.2-21 (association of telemetry with observation context) must be met by the test equipment, and the performance requirements FSG-IR-4.2-40 and FSG-IR-4.2-50 may not be met on an overloaded platform or network. *(PDF p. 7)*
- A LAN capacity of 5 Mbit/s (TBC) is assumed free for router traffic; total network bitrate is the sum of all client send and receive rates minus those of clients running on the router machine, so it pays to run the router on a major data source or sink. *(PDF p. 8)*
- Recovery: after a router crash clients reconnect with the same name and repeat their forwarding requests; packets in transit or addressed to a dead client are lost; a network failure is treated as a failure of the other side. *(PDF p. 8)*
- The router provides no security (access must be restricted externally) and no explicit handshake, error checking or flow control beyond TCP/IP. *(PDF p. 9)*
- Message format: octet 0 messageType (1 octet), octets 1-4 contentLength (4 octets), then the content; a message is contentLength + 5 octets long, contentLength is limited to 1100 octets (TBC), and integers are stored most significant octet first. *(PDF p. 9)*
- Twelve message types share three structures: type 1 USER_DATA (data-packet), types 2-6 ADD_CLIENT, DEL_CLIENT, ASK_CLIENT, SHOW_CLIENT, NAME_CLIENT (client-info) and types 7-12 ADD_BLOCK, DEL_BLOCK, ASK_BLOCK, SHOW_BLOCK, ASK_TRAFFIC, SHOW_TRAFFIC (route-info). *(PDF p. 10)*
- For USER_DATA the content is a complete PS-ICD packet and contentLength = packet_length_field + 7. *(PDF p. 10)*
- Packet address: for TM source packets the 11-bit APID; for TC source packets 4096 + APID (equivalent to masking out the Type and APID fields of the header); the value 8192 is reserved for special purposes. *(PDF p. 10)*
- Client-info content: packetAddress (4 octets), clientAddress (4), clientPortNumber (4), messageSequenceNumber (4), then the ASCII clientName, so contentLength is at least 16 octets. *(PDF p. 10)*
- Route-info content: packetAddress, sourceNameLength, destinationNameLength, messageSequenceNumber and packetCount (4 octets each) followed by the source and destination names; sourceNameLength + destinationNameLength + 20 = contentLength. *(PDF p. 11)*
- The router never checks USER_DATA content; it forwards a copy to every client that has sent ADD_CLIENT for that packet address unless an ADD_BLOCK rule blocks that source-destination route. *(PDF p. 11)*
- NAME_CLIENT must be the first message after connecting and the name must be unique; a client re-using the name of a disconnected client is treated as the same client for route-info messages. *(PDF p. 12)*
- A block entry matches when the source name, destination name and packet address match, where a zero name length or the address 8192 acts as a wildcard; the all-wildcard combination is not allowed. *(PDF p. 12)*
- Multi-message replies (SHOW_CLIENT, SHOW_BLOCK, SHOW_TRAFFIC) count messageSequenceNumber down to zero for the last message; SHOW_TRAFFIC gives packets forwarded since router start per address, source and destination. *(PDF p. 13)*
- The data rate per client shall not exceed 500 kbit per second, averaged over one second (TBC). *(PDF p. 13)*
- Appendix A example: client A sends TM of APID 77; client B names itself, asks for packet address 77, receives the forwarded packets and finally revokes its request. *(PDF p. 14)*


## Cited by these wiki pages (5)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (61 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title page and approval ('Agreed by') | 1 |
    |  | Distribution list | 2 |
    |  | Document Change Record | 3 |
    |  | Table of contents | 4 |
    | 1 | Introduction | 6 |
    | 1.1 | Purpose | 6 |
    | 1.2 | Scope | 6 |
    | 1.3 | Applicable Documents | 6 |
    | 1.4 | Reference Documents | 6 |
    | 1.5 | Acronyms List | 6 |
    | 2 | Operational assumptions and constraints | 6 |
    | 2.1 | Communications | 7 |
    | 2.2 | Hardware | 7 |
    | 2.3 | Software | 7 |
    | 2.4 | User | 7 |
    | 2.5 | Timing | 7 |
    | 3 | Requirements | 7 |
    | 3.1 | Functional Requirements | 7 |
    | 3.2 | On-Line Delivery Requirements | 7 |
    | 3.3 | Off-Line Delivery Requirements | 7 |
    | 4 | Interface characteristics | 7 |
    | 4.1 | Interface Location and Medium | 7 |
    | 4.2 | Hardware Characteristics and Limitations | 7 |
    | 4.3 | Data Source, Destination and Transfer Mechanism | 8 |
    | 4.4 | Node and Device Addressing | 8 |
    | 4.5 | Relationship with other interfaces | 8 |
    | 5 | Access | 8 |
    | 5.1 | Programs generating or using the Interface Data | 8 |
    | 5.2 | Failure Protection, Detection and Recovery Procedures | 8 |
    | 5.3 | File Naming Conventions | 8 |
    | 5.4 | Storage and File Deletion Requirements | 8 |
    | 5.5 | Security Requirements | 9 |
    | 5.6 | Data Integrity Checks | 9 |
    | 5.7 | Backup Requirements | 9 |
    | 5.8 | Input / Output Protocols, Calling Sequences | 9 |
    | 5.9 | Synchronisation Requirements | 9 |
    | 5.10 | Error Handling | 9 |
    | 6 | Detailed interface specifications | 9 |
    | 6.1 | Data Structure | 9 |
    | 6.1.1 | Overall message structure | 9 |
    | 6.1.2 | Data-packet structure | 10 |
    | 6.1.3 | Client-info structure | 10 |
    | 6.1.4 | Route-info structure | 10 |
    | 6.2 | Generation Method | 11 |
    | 6.2.1 | USER_DATA message | 11 |
    | 6.2.2 | ADD_CLIENT message | 11 |
    | 6.2.3 | DEL_CLIENT message | 11 |
    | 6.2.4 | ASK_CLIENT message | 12 |
    | 6.2.5 | SHOW_CLIENT message | 12 |
    | 6.2.6 | NAME_CLIENT message | 12 |
    | 6.2.7 | ADD_BLOCK message | 12 |
    | 6.2.8 | DEL_BLOCK message | 12 |
    | 6.2.9 | ASK_BLOCK message | 12 |
    | 6.2.10 | SHOW_BLOCK message | 13 |
    | 6.2.11 | ASK_TRAFFIC message | 13 |
    | 6.2.12 | SHOW_TRAFFIC message | 13 |
    | 6.3 | Data passed across the interface - direction of transfer | 13 |
    | 6.4 | Size and Frequency of Transfers | 13 |
    | 7 | Data definition | 13 |
    | 8 | Figures/Tables | 13 |
    | Appendix A | Example call sequence | 14 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD 1] | [SCI-PT-ICD-7527](../references/index.md#ref-sci-pt-icd-7527) | Packet Structure ICD | Issue 1.0 2000-09-01 | applicable |
| [AD 2] | [FIRST/FSC/DOC/0146](../references/index.md#ref-first-fsc-doc-0146) | Ground System Design Description | v1.0 2000-11-03 | applicable |
| [AD 3] | [FIRST/FSC/DOC/0117](../references/index.md#ref-first-fsc-doc-0117) | FIRST ground segment Interface Requirements Document | Issue 1 rev 3 2000-11-03 | applicable |
| [RD 1] | [FIRST/FSC/DOC/0150](../references/index.md#ref-first-fsc-doc-0150) | Ground Segment List of ICDs | v1.0 2000-11-23 | reference |
|  | [FSG-IR-4.2-21, FSG-IR-4.2-40, FSG-IR-4.2-50](../references/index.md#ref-fsg-ir-4-2-21-fsg-ir-4-2-40-fsg-ir-4-2-50) | Requirements of [AD 3] section 4.2.1 not met by the router |  | mentioned |

!!! note "Notes"
    The leading 's' in the page header is probably a residue of the SRON logo; the issuing organisation is not spelled out and is inferred from the document number. The table of contents (PDF pp. 4-5) is out of step with the body: it omits 6.2.6 NAME_CLIENT, numbers the later messages one lower, lists 6.2.11 as 'SHOW_BLOCK' (for SHOW_TRAFFIC) and omits 6.2.12; this record follows the body numbering. Section 6.1.3 refers to 'table 4' for the client-info structure, which is labelled Table 3. Typos kept as printed: 'packet addresss', 'Not that'. Figure 1 (example call sequence, PDF p. 14) has no text layer. The extraction reports 15 PDF pages (registry: 14); the last is empty. [AD 1] is issue 1.0 of the Packet Structure ICD; issue 6.0 is library item ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d. [AD 3] FIRST/FSC/DOC/0117 issue 1 rev 3 is an early issue of the requirements document held in the library as issue 2.6 (herschel-ground-segment-interface-requirements-document, FIRST/HSC/DOC/0117, 15/12/2006, PDF p. 1). The Common EGSE document overview (cosmos-common-egse-document-overview, PDF p. 1) lists this ICD ('Herschel EGSE packet router ICD', SRON-G/2001) with a Router SOW and the EGSEGateway ICD. Related HIFI EGSE interface document: cosmos-tei-tmtc-packet-icd.

