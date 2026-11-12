---
title: "Herschel/Planck Space/Ground ICD (SGICD)"
description: "The Space/Ground Interface Control Document (SGICD) for ESA's Herschel and Planck spacecraft."
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [herschel-planck-space-ground-interface-control-document-sgicd]
---

# Herschel/Planck Space / Ground Interface Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>SCI-PT-ICD-07418</dd><dt>Issue / version</dt><dd>3.2</dd><dt>Date</dt><dd>2004-12-01</dd><dt>Organisation</dt><dd>ESA Herschel/Planck Project</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 3.2 dated 1 December 2004. The change record (PDF pp. 2-4) lists issues 2/0 (11 July 2001, renaming FIRST to Herschel and Perth to New Norcia), 2/1 (8 May 2002), 3/0 (29 Nov 2002, requirement identifiers introduced), 3/1 (1 Dec 2003) and 3/2 (1 Dec 2004). Per section 1.1 the document is agreed between the ESA Herschel/Planck Project Manager, ESOC and the Prime Contractor, and is controlled by the ESA Project Manager.</dd><dt>Pages</dt><dd>51</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/HERSCHEL-PLANCK+SPACE+-+GROUND+INTERFACE+CONTROL+DOCUMENT" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/HERSCHEL-PLANCK+SPACE+-+GROUND+INTERFACE+CONTROL+DOCUMENT</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:45:16Z</dd><dt>SHA-256</dt><dd><code>3f6c437ca9252e131b7b69a556d420a1ad70eaf0dd19a21fd98aed8d872d147d</code></dd><dt>Size</dt><dd>1.0 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/herschel-planck-space-ground-interface-control-document-sgicd.pdf">herschel-planck-space-ground-interface-control-document-sgicd.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Space/Ground Interface Control Document (SGICD) for ESA's Herschel and Planck spacecraft. It defines the RF and data-link interface between the two spacecraft and the ESA ground stations, and is the source document for the link budget tables. It complements the ESA PSS packet telemetry and telecommand standards with all mission-specific choices, as numbered requirements (HP-SGICD-COM-..., -STR-...).

Sections 2 to 4 cover the telecommunication system. Both links are X-band, with separate downlink and uplink frequencies for Herschel and Planck. Telemetry has four rates (Low-1 500 bps and Low-2 5 kbps on a 45884 Hz subcarrier, medium 150 kbps PCM(SP-L)/PM, high 1.5 Mbps GMSK) and concatenated Reed-Solomon (255,223, I=5) plus rate-1/2 convolutional coding, the 0x1ACFFC1D attached sync marker and pseudo-randomisation. Telecommands run at 125 bps and 4 kbps on a 16 kHz subcarrier. The sections also give ranging, transponder modes, antenna switching, COP-1 with AD and BD services, spacecraft and ground station parameters (Kourou, Vilspa, New Norcia), link margins and the RF suitcase compatibility test.

Sections 5 and 6 are the most useful for data engineers. They fix the TM transfer frame at 1115 octets with a secondary header (24 extra bits of VC frame count), a CLCW in every frame and a frame error control word. They assign spacecraft IDs (Herschel 0x1E6, Planck 0x1E9, avionics model 0x1EA) and the use and downlink priority of virtual channels VC0 to VC7. On the TC side they give segment MAP IDs (CPDU, active and non-active processor, CROME reinitialise, TC-only mode), packet aggregation without segmentation, two TC virtual channels for decoders A and B, and a maximum TC frame length of 256 octets. Appendices give bit numbering and field alignment conventions, acronyms, the link budget format, the bit/symbol rate definitions and the SFCG spectral emission masks.


## Key points

- X-band downlink frequencies: Herschel 8468.5 MHz and Planck 8455.0 MHz (8450-8500 MHz band, Category A mission); emission bandwidths 340 kHz (low rate), 6.2 MHz (medium), 4.2 MHz (high) and 2.0 MHz (ranging). *(PDF p. 11)*
- Telemetry follows the ESA Packet Telemetry Standard (PSS-04-106) without source packet segmentation. *(PDF p. 12)*
- TM rates and modulation: Low-1 500 bps and Low-2 5 kbps PCM(NRZ-L)/PSK/PM on a 45884 Hz sine subcarrier, medium 150 kbps PCM(SP-L)/PM, high 1.5 Mbps GMSK (BTb = 0.25); ranging is not possible together with high-rate telemetry. *(PDF p. 12)*
- Baseline TM coding is concatenated Reed-Solomon (255,223) with interleaving depth 5 and rate-1/2, k = 7 convolutional coding; the sync marker 1ACFFC1D is inserted before each code block and an on-board pseudo-randomiser is required. *(PDF p. 13)*
- X-band uplink frequencies: Herschel 7207.8483 MHz and Planck 7196.3580 MHz, with a turnaround ratio of 749/880. *(PDF p. 14)*
- Telecommands follow PSS-04-107, use PCM(NRZ-L)/PSK/PM on a 16 kHz sinusoidal subcarrier at 125 bps or 4 kbps, and the ranging tone is 698260 Hz. *(PDF p. 15)*
- TC chain selection and bit-synchronisation requirements were added because of telecommand rejections observed in orbit on XMM; the rejection probability must stay below 10^-3. *(PDF p. 16)*
- COP-1 shall be supported, with the AD and BD packet telecommand services in parallel. *(PDF p. 18)*
- Link budget margins: nominal &gt; 3 dB, RSS worst case &gt; 0 dB and mean - 3 sigma &gt; 0 dB; the required Eb/No is 2.7 dB for a frame loss probability of 10^-5 with concatenated coding (I = 5). *(PDF p. 27)*
- Ground stations: Kourou 15 m and Vilspa 15 m support LEOP, while New Norcia 35 m supports all phases including routine science. *(PDF p. 27)*
- The RF suitcase shall be delivered to ESOC at the latest at L-24 months and be available for at least 1 month. *(PDF p. 29)*
- The only allowed TM transfer frame length is 1115 octets (8920 bits) before encoding, with a 1-octet secondary header ID, a 3-octet secondary header data field, 1099 octets of data field, a 4-octet OCF and a 2-octet FECW. *(PDF p. 30)*
- Spacecraft IDs (TM and TC): Herschel FM 0x1E6 (486), Planck FM 0x1E9 (489), Avionics Model 0x1EA (490). *(PDF p. 31)*
- TM virtual channels: VC0 real-time essential HK, VC1 real-time science, VC2 stored HK, VC3 stored science, VC4 real-time routine HK, VC5 and VC6 not required, VC7 idle frames. *(PDF p. 31)*
- Downlink VC priority is VC0, VC4, VC2, VC1, VC3, then VC7 idle frames; partially filled frames are completed with idle packets before idle frames are sent. *(PDF p. 32)*
- Every TM frame carries a CLCW in the OCF; CLCWs for the nominal decoder's VC go in frames with an even master channel frame count and those for the redundant decoder in odd ones (CLCW Standard Insertion Scheme No. 2). *(PDF p. 35)*
- The first header pointer is all ones (0b11111111111) when no packet header starts in the frame, and 0b11111111110 for idle frames on VC7; the secondary header ID is 0b00000011. *(PDF p. 34)*
- There is no TC packet segmentation (sequence flags 0b11); MAP IDs route to the CPDU (0), the active processor (1), the non-active processor (2), CROME reinitialise (5) and set TC-only mode (6). *(PDF p. 38)*
- Packet aggregation is used to maximise uplink throughput: each packet starts at the previous start plus its Packet Length + 7 octets. *(PDF p. 38)*
- TC virtual channel 0 addresses decoder A and VC 1 decoder B; the maximum TC frame length is 256 octets, so the top two bits of the 10-bit frame length field are always 0b00. *(PDF p. 39)*
- Bit 0 is the first transmitted bit and the MSB (except on the IEEE 1355 link, where the LSB goes first); parameters of 16 bits or more are word aligned, and shorter parameters may not span word boundaries and are right-adjusted. *(PDF p. 41)*


## Cited by these wiki pages (7)

- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (32 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1. | INTRODUCTION AND SCOPE | 8 |
    | 1.1 | Scope | 8 |
    | 1.2 | Operations Scenario | 8 |
    | 1.3 | Applicable Documents | 9 |
    | 1.4 | Reference Documents | 9 |
    | 2. | TELECOMMUNICATION SYSTEM | 11 |
    | 2.1 | Down Link | 11 |
    | 2.2 | Up-Link (On-Board Reception) | 14 |
    | 3. | OPERATIONAL UTILISATION | 17 |
    | 3.1 | Operational Modes | 17 |
    | 3.2 | Command Operations Procedure (COP-1) | 18 |
    | 4. | PERFORMANCE | 19 |
    | 4.1 | Spacecraft | 19 |
    | 4.2 | Ground Stations | 23 |
    | 4.3 | Required Links | 27 |
    | 4.4 | RF Compatibility Test | 29 |
    | 5. | TELEMETRY STRUCTURE | 30 |
    | 5.1 | Telemetry Source Packet | 30 |
    | 5.2 | Telemetry Transfer Frame | 30 |
    | 6. | TELECOMMAND STRUCTURE | 37 |
    | 6.1 | Telecommand Source Packets | 37 |
    | 6.2 | Telecommand Segments | 37 |
    | 6.3 | Telecommand Frame | 38 |
    | 6.4 | Telecommand Lower Layers | 40 |
    | 7. | APPENDIX 1 CONVENTIONS | 41 |
    | 7.1 | Bit Numbering Conventions | 41 |
    | 7.2 | Field Alignment Conventions | 41 |
    | 8. | APPENDIX 2 ACRONYMS AND GLOSSARY OF TERMS | 42 |
    | 9. | APPENDIX 3 LINK BUDGET FORMAT | 45 |
    | 10. | APPENDIX 4 TELEMETRY BIT/SYMBOL RATE DEFINITION | 49 |
    | 10.1 | Concatenated encoding | 49 |
    |  | APPENDIX 5 SPECTRAL EMISSION MASKS | 51 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD 1 | [PSS-04-106](../references/index.md#ref-pss-04-106) | Packet Telemetry Standard | Issue 1 January 1988 | applicable |
| AD 2 | [PSS-04-107](../references/index.md#ref-pss-04-107) | Packet Telecommand Standard | Issue 2 April 1992 | applicable |
| AD 3 | [PSS-04-103](../references/index.md#ref-pss-04-103) | Telemetry Channel Coding Standard | Issue 1 September 1989 | applicable |
| AD 4 | [PSS-04-104](../references/index.md#ref-pss-04-104) | Ranging Standard | Vol. I, Issue 2 March 1991 | applicable |
| AD 5 | [ECSS E-50-05](../references/index.md#ref-ecss-e-50-05) | ECSS Radio Frequency and Modulation Standard | Draft 9.4 April 2002 | applicable |
| RD 1 | [SCI-PT-RS-07360](../references/index.md#ref-sci-pt-rs-07360) · [library](cosmos-operations-interface-requirements.md) | Herschel/Planck Operations Interface Requirements Document (H/P-OIRD) | Issue 2.1 December 2001 | reference |
| RD 2 | [PSS-04-151](../references/index.md#ref-pss-04-151) | ESA Telecommand Decoder Specification |  | reference |
| RD 3 | [H-P-1-ASPI-SP-0252](../references/index.md#ref-h-p-1-aspi-sp-0252) | Herschel/Planck Suitcase Requirements Specification |  | reference |
| RD 4 | [CCSDS 102.0-B-4](../references/index.md#ref-ccsds-102-0-b-4) | CCSDS Packet Telemetry | B-4 November 1995 | reference |
| RD 5 | [ECSS-E-70/41](../references/index.md#ref-ecss-e-70-41) | ECSS Telemetry and Telecommand Packet Utilisation Standard | Draft 04 April 1999 | reference |
| RD 6 | [H-P-SP-AI-0012](../references/index.md#ref-h-p-sp-ai-0012) | Herschel/Planck Transponder Specifications |  | reference |
| RD 7 | [CCSDS 101.0-B-5](../references/index.md#ref-ccsds-101-0-b-5) | CCSDS Telemetry Channel Coding | blue book B-5 June 2001 | reference |
| RD 8 | [CCSDS 202.0-B-2](../references/index.md#ref-ccsds-202-0-b-2) | CCSDS Telecommand Part 2 Data Routing Service | B-2 November 1992 | reference |
| RD 9 | [SCI-PT-IF-07527](../references/index.md#ref-sci-pt-if-07527) | Herschel/Planck Packet Structure ICD (H/P PS-ICD) |  | reference |
| RD 10 | [catalogue](../references/index.md#ref-herschel-planck-radio-frequency-test-procedure-and-report) | Herschel/Planck Radio Frequency Test Procedure and Report | Issue TBD Date TBD | reference |
| RD 11 | [catalogue](../references/index.md#ref-deleted) | Deleted |  | reference |
| RD 12 | [IEEE Standard 149](../references/index.md#ref-ieee-standard-149) | IEEE Standard 149 | 1979 | reference |
| RD 13 | [FP-MA-RP-0010-TOS/GMA](../references/index.md#ref-fp-ma-rp-0010-tos-gma) | Consolidated Report on Mission Analysis |  | reference |
| RD 14 | [SCI-PT-RS-05991](../references/index.md#ref-sci-pt-rs-05991) | Herschel/Planck System Requirements Specification |  | reference |

!!! note "Notes"
    PDF page 1 (the cover) has no text layer; the title, reference, issue and date come from the running headers. Printed page numbers match PDF page indexes (page n/51). The PDF has 51 pages; the text extraction shows a fifty-second, empty page. The change record is partly bilingual (French/English headings). Reference RD 9 is printed as SCI-PT-IF-07527, while the Packet Structure ICD itself is SCI-PT-ICD-07527 (in the library as ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d). Section 4.3.1 refers to 'ESA PSS-04-105 [AD-5]' and '[AD-2]' for link budgets, which does not match the AD list (AD-5 is the ECSS RF standard). The 'TBC' sweep duration (section 2.2.6) remains open. The change record for issue 3/1 cites a tone frequency correction to give a 10 kHz offset, while the issue 3/0 entry quoted 687260 Hz with a 1 kHz offset; section 2.2.3 now gives 698260 Hz. AD 1 and AD 2 are in the library as esa-pss-04-106-issue1-january1988 and esa-pss-04-107-issue2-april1992, RD 2 as esa-pss-04-151-issue1-september1992, and RD 1 (OIRD SCI-PT-RS-07360) is in the library in a later issue 2.2 as cosmos-operations-interface-requirements.

