---
title: "ECSS Telemetry Transfer Frame Protocol (2008)"
description: "The 2008 ECSS standard for the Telemetry (TM) Transfer Frame, the fixed-length data link layer container in which spacecraft downlink packets."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-50-03c-31july2008]
---

# Space engineering
Space data links - Telemetry transfer frame protocol

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-50-03C</dd><dt>Issue / version</dt><dd>Second issue</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-50-03C Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-50-03C Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue (31 July 2008), following ECSS-E-50-03A (6 November 2007); ECSS-E-50-03B was never issued (change log, p. 3). The document itself does not state that it is superseded. The library's later ECSS adoption notices (e.g. ECSS-E-AS-50-25C Rev.1, p. 6) list ECSS-E-ST-50-03C as superseded by ECSS-E-AS-50-22 (CCSDS 132.0-B-x) and ECSS-E-AS-50-23 (CCSDS 732.0-B-x).</dd><dt>Pages</dt><dd>43</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-03C31July2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-50-03C31July2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:06Z</dd><dt>SHA-256</dt><dd><code>80d4e50731465b8f23dc878304e71f871b326bc9bfef7904e95047a9e52fbcf7</code></dd><dt>Size</dt><dd>567.0 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-50-03C-31July2008.pdf">ECSS-E-ST-50-03C-31July2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The 2008 ECSS standard for the **Telemetry (TM) Transfer Frame**, the fixed-length data link layer container in which spacecraft downlink packets. It is essentially the ECSS version of CCSDS 132.0-B-1 (TM Space Data Link Protocol), written in ECSS 'shall' requirement form, and it replaces the frame part of the older ESA-PSS-04-106 Packet Telemetry Standard. ECSS later superseded it with adoption notices of the CCSDS TM and AOS books.

Clause 4 explains physical channels, master channels (Transfer Frame Version Number plus Spacecraft Identifier) and up to eight virtual channels. Clause 5 specifies the frame field by field:

* the 48-bit **Primary Header**: 2-bit version '00', 10-bit SCID, 3-bit VCID, OCF flag, 8-bit master and virtual channel frame counts, and the 16-bit Data Field Status with secondary header flag, synchronization flag, packet order flag, segment length identifier '11' and the 11-bit **First Header Pointer** (all ones = no packet start, '11111111110' = idle data only);
* the optional **Secondary Header** (2 to 64 octets), including an ECSS-specific 24-bit *extended virtual channel frame count*;
* the **Data Field** with packet processing and extraction functions, idle packets and asynchronously inserted data;
* the 4-octet **Operational Control Field** (Type-1 report = CLCW);
* the 16-bit CRC **Frame Error Control Field**, mandatory unless the frame is Reed-Solomon encoded. Annex A shows shift-register encoder and decoder sketches.

Informative annexes compare the standard with ESA-PSS-04-106 (Annex B) and with CCSDS 132.0-B-1 (Annex C), and list every mission configuration parameter of physical, master and virtual channels (Annex D). This is a good map for configuring a TM frame decoder or a mission TM profile.


## Key points

- A TM Transfer Frame is fixed-length: Primary Header 48 bits, optional Secondary Header 16 to 512 bits, Data Field, optional trailer 16, 32 or 48 bits; maximum frame length 2048 octets, constant per mission phase and sent at a constant rate. *(PDF p. 12)*
- A master channel consists of one to eight virtual channels; all frames on a physical channel share the same Transfer Frame Version Number. *(PDF p. 13)*
- Primary Header fields: Master Channel Identifier 12 bits, Virtual Channel Identifier 3 bits, OCF Flag 1 bit, Master Channel Frame Count 8 bits, Virtual Channel Frame Count 8 bits, Transfer Frame Data Field Status 16 bits. *(PDF p. 14)*
- The Master Channel Identifier is the 2-bit Transfer Frame Version Number (set to '00') plus the 10-bit Spacecraft Identifier (bits 2-11), which is assigned by the CCSDS Secretariat per CCSDS 320.0-B-4 and is static through all mission phases. *(PDF p. 15)*
- With Synchronization Flag '0', the Packet Order Flag is '0' and the Segment Length Identifier is '11' (an obsolete feature marked as not used). *(PDF p. 19)*
- First Header Pointer (bits 37-47): offset of the first packet starting in the data field; '11111111111' if no packet starts in the frame; '11111111110' if the data field contains only idle data. *(PDF p. 20)*
- The Secondary Header is 2 to 64 octets: 8-bit identification (2-bit version '00' and 6-bit length = total length minus one) followed by 8 to 504 bits of mission data. *(PDF p. 21)*
- Extended virtual channel frame count: a 32-bit secondary header (length field = 3) whose 24-bit data field counts roll-overs of the 8-bit VC frame count, giving a 32-bit count. This is not in the CCSDS recommendations. *(PDF p. 22)*
- The Operational Control Field is 4 octets after the data field; Type Flag '0' = Type-1-Report containing a CLCW per ECSS-E-ST-50-04 clause 6.3; Type Flag '1' = Type-2-Report (bit 1 '0' project-specific, '1' reserved). *(PDF p. 28)*
- The Frame Error Control Field (2 octets) is mandatory unless the frame is Reed-Solomon encoded; it uses G(X) = X^16 + X^12 + X^5 + 1 with the shift register preset to all ones. *(PDF p. 30)*
- Compared with ESA-PSS-04-106: PSS allowed 892, 1115 or 1784 octets with RS coding or 128 to 2040 octets without, fixed for the whole mission; this standard allows up to 2048 octets, constant per mission phase. *(PDF p. 34)*
- ESA-PSS-04-106 defined only a 32-bit secondary header and reserved all Type-2 reports; this standard allows 16 to 512 bits and project-specific Type-2 reports. *(PDF p. 35)*
- CCSDS 132.0-B-1 calls a frame with First Header Pointer '11111111110' an OID (Only Idle Data) Transfer Frame; ECSS keeps the meaning but not the term. *(PDF p. 37)*
- Annex D lists the mission configuration parameters: frame length, version number, SCID list, FECF presence, error-frame handling, idle pattern, VCIDs, secondary header and OCF association, synchronization flag, valid packet version numbers, maximum packet length and incomplete-packet handling. *(PDF p. 38)*


## Cited by these wiki pages (7)

- [ECSS-E-ST-50C communications and the CCSDS adoption notices](../ecss/e-st-50-communications.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Encapsulation Packet Protocol (CCSDS 133.1-B-3)](../ccsds/encapsulation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [TM Space Data Link Protocol (CCSDS 132.0-B-3)](../ccsds/tm-sdlp.md)
- [TM synchronization and channel coding (CCSDS 131.0-B-5)](../ccsds/tm-coding.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (47 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    | 1 | Scope | 6 |
    | 2 | Normative references | 7 |
    | 3 | Terms, definitions and abbreviated terms | 8 |
    | 3.1 | Terms from other standards | 8 |
    | 3.2 | Terms specific to the present standard | 8 |
    | 3.3 | Abbreviated terms | 9 |
    | 3.4 | Conventions | 9 |
    | 4 | Overview | 10 |
    | 4.1 | General | 10 |
    | 4.2 | Physical channel | 10 |
    | 4.3 | Master channels and virtual channels | 11 |
    | 4.4 | Sharing transmission resources | 11 |
    | 4.5 | Data fields in the frame | 11 |
    | 5 | TM Transfer Frame | 12 |
    | 5.1 | General | 12 |
    | 5.2 | Transfer Frame Primary Header | 14 |
    | 5.2.2 | Master Channel Identifier | 15 |
    | 5.2.3 | Virtual Channel Identifier | 16 |
    | 5.2.4 | Operational Control Field Flag | 16 |
    | 5.2.5 | Master Channel Frame Count | 16 |
    | 5.2.6 | Virtual Channel Frame Count | 17 |
    | 5.2.7 | Transfer Frame Data Field Status | 17 |
    | 5.3 | Transfer Frame Secondary Header | 20 |
    | 5.3.2 | Transfer Frame Secondary Header Identification | 21 |
    | 5.3.3 | Transfer Frame Secondary Header Data Field | 22 |
    | 5.3.4 | Extended virtual channel frame count | 22 |
    | 5.4 | Transfer Frame Data Field | 23 |
    | 5.4.3 | Packet processing and extraction functions | 24 |
    | 5.4.4 | Asynchronously inserted data | 27 |
    | 5.5 | Operational Control Field | 28 |
    | 5.5.3 | Type-1-Report | 28 |
    | 5.5.4 | Type-2-Report | 29 |
    | 5.6 | Frame Error Control Field | 29 |
    | 5.6.2 | Frame Error Control Field encoding procedure | 30 |
    | 5.6.3 | Frame Error Control Field decoding procedure | 31 |
    | Annex A | Frame error control (informative) | 32 |
    | Annex B | Changes from ESA-PSS-04-106 (informative) | 34 |
    | B.2 | Technical changes | 34 |
    | Annex C | Differences from CCSDS recommendations (informative) | 37 |
    | C.2 | Differences | 37 |
    | Annex D | Mission configuration parameters (informative) | 38 |
    | D.2 | Parameters of a physical channel | 38 |
    | D.3 | Parameters of a master channel | 39 |
    | D.4 | Parameters of a virtual channel | 41 |
    | D.5 | Additional parameters when Synchronization Flag is '0' | 42 |
    |  | Bibliography | 43 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ECSS-E-ST-50-01 | [ECSS-E-ST-50-01](../references/index.md#ref-ecss-e-st-50-01) | Space engineering – Space data links – Telemetry synchronization and channel coding |  | normative |
| ECSS-E-ST-50-04 | [ECSS-E-ST-50-04](../references/index.md#ref-ecss-e-st-50-04) | Space engineering – Space data links – Telecommand protocols, synchronization and channel coding |  | normative |
| CCSDS 133.0-B-1 | [CCSDS 133.0-B-1](../references/index.md#ref-ccsds-133-0-b-1) | Space Packet Protocol – Blue Book | Issue 1 September 2003 | normative |
| CCSDS 135.0-B-3 | [CCSDS 135.0-B-3](../references/index.md#ref-ccsds-135-0-b-3) | Space Link Identifiers – Blue Book | Issue 3 October 2006 | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering – Communications |  | bibliography |
| ECSS-E-HB-50 | [ECSS-E-HB-50](../references/index.md#ref-ecss-e-hb-50) | Space engineering – Communication guidelines |  | bibliography |
| CCSDS 132.0-B-1 | [CCSDS 132.0-B-1](../references/index.md#ref-ccsds-132-0-b-1) | TM Space Data Link Protocol – Blue Book | Issue 1 September 2003 | bibliography |
| CCSDS 320.0-B-4 | [CCSDS 320.0-B-4](../references/index.md#ref-ccsds-320-0-b-4) | CCSDS Global Spacecraft Identification Field Code Assignment Control Procedures – Blue Book | Issue 4 January 2006 | bibliography |
| CCSDS 350.0-G-2 | [CCSDS 350.0-G-2](../references/index.md#ref-ccsds-350-0-g-2) | The Application of CCSDS Protocols to Secure Systems – Green Book | Issue 2 January 2006 | bibliography |
| ESA-PSS-04-106 | [ESA-PSS-04-106](../references/index.md#ref-esa-pss-04-106) | ESA Packet Telemetry Standard | Issue 1 January 1988 | bibliography |

!!! note "Notes"
    The text extraction uses Unicode non-breaking hyphens (U+2011) in document IDs ('ECSS‐E‐ST‐50‐03C'), so plain-hyphen regex searches can miss them. Figures (frame format, header format, bit numbering) are images and are not in the extracted text. The table of contents lists 'Table B-1' twice (p. 5). Clause 3.1 refers to 'ECSS-ST-00-01' (p. 8), which looks like a typo for the normative reference ECSS-S-ST-00-01. Requirements 5.4.2c/d (p. 24) are truncated in the source ('the Transfer Frame Secondary.'). Clause 5.3.4.1 has the typo 'apply in when' (p. 22). Printed page numbers equal PDF page numbers. PDF page 44 is blank, so srcgrep shows 44 pages while the registry gives 43.

