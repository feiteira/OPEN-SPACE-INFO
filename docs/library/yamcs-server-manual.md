---
title: "Yamcs Server Manual (5.14.1-SNAPSHOT)"
description: "The Yamcs Server Manual, release 5.14.1-SNAPSHOT (240 pages), published by Space Applications Services, documents Yamcs, a monitoring and control server written in Java (with RocksDB storage) for spac"
tags: ["User Manual", "Tools, MIB editors and related standards"]
sources: [yamcs-server-manual]
---

# Yamcs Server Manual

<dl class="osi-meta"><dt>Issue / version</dt><dd>Release 5.14.1-SNAPSHOT</dd><dt>Date</dt><dd>2026</dd><dt>Organisation</dt><dd>Space Applications Services NV/SA (Sint-Stevens-Woluwe, Belgium), with Aerospace Applications North America, Inc. (Houston, USA)</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Development snapshot 'Release 5.14.1-SNAPSHOT' of the continuously rebuilt manual (PDF p. 1), copyright 2026 Space Applications Services NV/SA (PDF p. 2). The PDF metadata creation date is 2026-11-12, the day it was retrieved from dl.yamcs.org; it is not a frozen release and its content changes with each build.</dd><dt>Pages</dt><dd>240</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://dl.yamcs.org/docs/yamcs-server-manual.pdf" rel="noopener">https://dl.yamcs.org/docs/yamcs-server-manual.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:47:45Z</dd><dt>SHA-256</dt><dd><code>2570c89abae82a9a9e6b6e76ea6875754f639f1a582fabbe13e05a3c06fd8eab</code></dd><dt>Size</dt><dd>1.6 MB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/yamcs-server-manual.pdf">yamcs-server-manual.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Yamcs Server Manual, release 5.14.1-SNAPSHOT (240 pages), published by Space Applications Services, documents Yamcs, a monitoring and control server written in Java (with RocksDB storage) for spacecraft, payloads, instruments and test equipment. It explains the monitoring and control model: XTCE-style telemetered, derived, local and constant parameters plus system parameters, limits and alarms, command transmission constraints, significance levels and user-defined verification stages. It then covers the server architecture (instances, data links, streams, processors, services, plugins, stream and parameter archives, buckets) and time handling (milliseconds since 1970 TAI including leap seconds; mission, reception, generation and earth reception times).

For a TM/TC engineer the central chapters are the Mission Database and Data Links. The first covers data types and encodings, containers with inheritance, algorithms in JavaScript, Python or Java, command definitions, and the XTCE and Excel spreadsheet loaders, with an explicit list of unsupported XTCE features. The second covers packet input streams, packet preprocessors (generic, ISS, cFS, CSP and a PUS preprocessor for ECSS-E-ST-70-41C with CUC time decoding), command postprocessors (including wrapping of time-tagged commands into PUS TC[11,4]) and CCSDS frame processing. Frame processing handles TM, AOS and USLP downlink and TC uplink with CLTU encoding (BCH or LDPC), Reed-Solomon decoding, COP-1 and SDLS authenticated encryption. Later chapters describe processors and the command processing chain step by step, command queues and transmission constraints, activities and the timeline, services (parameter archive, time correlation, CFDP classes 1 and 2, replication), security and authentication modules, the web interface, the yamcsadmin and yamcsd programs, plugins and the internal SQL language. Because it names the CCSDS Blue Book behind each feature, the manual is a practical cross-reference between the standards and a working implementation.


## Key points

- Yamcs is implemented entirely in Java and uses RocksDB as its storage engine; the preferred platform is Linux x64, and functionality is exposed through an embedded web server and an HTTP-based API. *(PDF p. 14)*
- Following XTCE, Yamcs distinguishes telemetered, derived, local and constant parameters, and adds system parameters and command/command history parameters for use in verifiers; XTCE's predefined execution stages are not enforced and users may define any number of stages, each with a verifier. *(PDF p. 15)*
- Data links carry three kinds of data: telemetry packets, telecommands and (from the ISS ground segment heritage) processed parameters; built-in links exist for UDP and TCP, and SLE links are provided by a plugin. *(PDF p. 16)*
- All CCSDS frame processing is done in data links: a frame link demultiplexes frames into sub-links for realtime and dump data, each applying a packet preprocessor before the streams. *(PDF p. 17)*
- Yamcs time is a signed 8-byte count of milliseconds since 1970-01-01 00:00:00 TAI including leap seconds, using the IERS UTC-TAI.history leap-second table; a high-resolution Instant adds picoseconds. *(PDF p. 19)*
- Generation time is set by the preprocessor from the packet (or local time with useLocalGenerationTime); free-running on-board clocks are converted with the Time Correlation Service. *(PDF p. 20)*
- The XTCE loader is deliberately tolerant and backward compatible with XTCE 1.0 and 1.1; unsupported concepts include Stream, Message, ParameterSegmentRefEntry, ContainerSegmentRefEntry, DiscreteLookupList, ErrorDetectCorrectType, ContextSignificanceList, ParameterToSetList, ParameterToSuspendAlarmsOnSet and RestrictionCriteria/NextContainer. *(PDF p. 44)*
- For command arguments Yamcs allows sizeInBitsOfSizeTag = 0 (no size tag) for compatibility with systems such as SCOS-2k, although XTCE requires a size tag greater than 0; float encodings IEEE754_1985, MILSTD_1750A and STRING are supported. *(PDF p. 44)*
- If several CompleteVerifiers are declared, the first one to succeed completes the command, whereas XTCE requires all to succeed; command arrays and ArgumentRefEntry IncludeCondition/RepeatEntry are not supported. *(PDF p. 45)*
- The spreadsheet loader only accepts Excel 97-2003 (.xls) files; .xlsx is not supported. *(PDF p. 45)*
- Spreadsheet sheets recognised: General (required), ChangeLog, DataTypes, Parameters, DerivedParameters, LocalParameters, Containers, Algorithms, Alarms, Commands, CommandOptions, CommandVerification and Calibration; sheet-name prefixes such as SYSTEM1|SYSTEM2|Containers describe sub-systems. *(PDF p. 46)*
- Archived packets use (generation time, sequence count) as primary key, so a packet with an existing pair is discarded as a duplicate; Yamcs originated in the ISS world where packets carry reliable GPS-synchronised timestamps. *(PDF p. 80)*
- Three time synchronisation strategies are described: no synchronisation (local time), on-board resync at reset (as in cFS) and a ground-maintained correlation, the method specified by the ESA PUS standard. *(PDF p. 80)*
- The CUC time decoder follows CCSDS 301.0-B-4 chapter 3.2; time decoders return relative milliseconds that are converted with an epoch, or treated as raw counts for the Time Correlation Service when no epoch is given. *(PDF p. 81)*
- The PUS packet preprocessor verifies and identifies ECSS PUS packets according to ECSS-E-ST-70-41C and uses the first 4 bytes of the CCSDS primary header as the archive sequence count. *(PDF p. 84)*
- The PUS command postprocessor can embed a command issued with the pus11ScheduleAt option into a TC[11,4] request (optional sub-schedule and group IDs; implicit CUC P-field 0x2e by default) and fills in length, sequence count and CRC of embedded TC packets. *(PDF p. 89)*
- The SCOS-2000 MIB loader (yamcs-scos2k) annotates command parameters with (PTC, PFC) = (12, 1) as embedded TC packets; error detection options are 16-SUM (Columbus/ISS), CRC-16-CCIIT, ISO-16 and NONE. *(PDF p. 90)*
- CCSDS frame processing supports parts of CCSDS 132.0 (TM SDLP), 732.0 (AOS), 232.0 (TC SDLP), 732.1 (USLP), 231.0 and 131.0 (synchronisation and channel coding), 232.1 (COP-1), 133.0 (Space Packet), 133.1 (Encapsulation) and 355.0 (SDLS). *(PDF p. 99)*
- Downlink frame types are AOS, TM and USLP, received by the built-in UdpTmFrameLink or SLE; the MAP service is supported only for TC frames, not USLP. *(PDF p. 100)*
- Frames with a version number other than 0 (TM), 1 (AOS) or 12 (USLP), a wrong spacecraft ID, length or CRC are discarded; AOS spacecraft IDs may use 10 bits via the signalling-field SCID extension. *(PDF p. 101)*
- Reed-Solomon is the only raw-frame codec: errorCorrectionCapability 8 or 16 selects RS(255,239) or RS(255,223), with interleaving depth default 5. *(PDF p. 103)*
- In a PACKET virtual channel the first 3 bits distinguish CCSDS space packets (000) from encapsulation packets (111); idle space packets (APID 0x7FF) and idle encapsulation packets (first byte 0x1C) are discarded, and TM idle frames use first header pointer 0x7FE. *(PDF p. 103)*
- Uplink packs TC packets into TC transfer frames and optionally CLTUs (BCH, LDPC64, LDPC256 or CUSTOM); Yamcs does not segment TC packets, so maxFrameLength limits the TC packet size. *(PDF p. 104)*
- Since Yamcs 5.5.4 CLTU randomisation follows issue 4 of CCSDS 231.0: before encoding for BCH, after encoding for LDPC (versions up to 5.5.3 always randomised before encoding, as in issue 3). *(PDF p. 105)*
- COP-1 options: cop1T1 retransmission timeout (default 3 s), cop1TxLimit, slidingWindowWidth (FOP_SLIDING_WINDOW_WIDTH K, default 10) and bdAbsolutePriority; without COP-1 a TC queue of default 10 commands is used. *(PDF p. 106)*
- If initialClcwWait is positive, Yamcs waits that many seconds at link start-up for a CLCW and sets its ground counter vS to the on-board nR; otherwise synchronisation must be initiated manually. *(PDF p. 107)*
- Commands with the cop1Bypass attribute are sent in BD frames, bypassing COP-1; BC frames are generated only by the COP-1 state machine; unsynchronised commands wait in a queue or are rejected with a NACK on the Sent acknowledgment. *(PDF p. 108)*
- Built-in SDLS security association AES-256-GCM-128: authenticated encryption, GVCID context, 12-octet IV, 4-octet sequence number, no padding, 16-octet MAC, 256-bit key shared for authentication and encryption. *(PDF p. 108)*
- The Time Correlation Service fits ob_time = m * obt + c from (obt, ert) samples, using ob_time = ert - (tof + onboardDelay). *(PDF p. 169)*
- The CFDP service implements CCSDS 727.0-B-5 class 1 (unacknowledged) and class 2 (acknowledged) transfers between the spacecraft and Yamcs buckets; classes 3 and 4 are not supported. *(PDF p. 175)*
- CFDP limitations: Keep Alive and Prompt PDUs are not used, filestore requests are not supported, only proxy put and directory listing user operations are supported, and remote suspend/resume is not supported. *(PDF p. 176)*


## Cited by these wiki pages (3)

- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [XTCE: XML Telemetric and Command Exchange (CCSDS 660)](../ccsds/xtce.md)


??? abstract "Contents (67 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | General Information | 14 |
    | 1.1 | Monitoring and Control Model | 15 |
    | 1.2 | Server Architecture | 16 |
    | 1.3 | Time in Yamcs | 19 |
    | 2 | Server Administration | 22 |
    | 2.1 | Configuration | 22 |
    | 2.2 | Logging | 25 |
    | 3 | Mission Database | 28 |
    | 3.1 | Data Types | 28 |
    | 3.2 | Parameter Definitions | 37 |
    | 3.3 | Container Definitions | 37 |
    | 3.4 | Alarm Definitions | 38 |
    | 3.5 | Algorithm Definitions | 39 |
    | 3.6 | Command Definitions | 42 |
    | 3.7 | Loading TM/TC Definitions | 43 |
    | 3.7.1 | XTCE Loader | 43 |
    | 3.7.2 | Spreadsheet Loader | 45 |
    | 4 | Data Management | 64 |
    | 4.1 | Streams | 64 |
    | 4.2 | Generic Archive | 65 |
    | 4.3 | Parameter Archive | 68 |
    | 4.4 | Object Archive (buckets) | 72 |
    | 5 | Data Links | 76 |
    | 5.1 | Packet Input Stream | 77 |
    | 5.2 | Packet Preprocessor | 79 |
    | 5.2.4 | PUS Packet Preprocessor | 84 |
    | 5.3 | Command Postprocessor | 87 |
    | 5.3.3 | PUS Command Postprocessor | 88 |
    | 5.4 | File Polling TM Data Link | 91 |
    | 5.5 | TCP TC Data Link (5.6 TCP TM, 5.7 TCP TC/TM follow) | 92 |
    | 5.8 | TSE Data Link | 95 |
    | 5.9 | UDP Parameter Data Link (5.10-5.12 UDP TC, TM and TC/TM follow) | 95 |
    | 5.13 | CCSDS Frame Processing | 99 |
    | 5.13.1 | Telemetry Frame Processing | 100 |
    | 5.13.2 | Telecommand Frame Processing | 104 |
    | 5.13.2.2 | COP-1 Support | 107 |
    | 5.13.2.3 | SDLS Support | 108 |
    | 5.14 | Yamcs Cascading Link | 109 |
    | 6 | Processors | 112 |
    | 6.1 | TM Packet Processing | 112 |
    | 6.2 | Command Processing | 115 |
    | 6.3 | Alarms | 119 |
    | 6.4 | Processor Configuration | 121 |
    | 7 | Commanding | 128 |
    | 7.1 | Command Significance | 128 |
    | 7.2 | Command Queues | 128 |
    | 7.3 | Transmission Constraints | 129 |
    | 8 | Activities | 132 |
    | 8.1 | Command Activities | 133 |
    | 8.2 | Stack Activities | 134 |
    | 8.3 | Script Activities | 135 |
    | 9 | Timeline | 140 |
    | 9.2 | Bands | 141 |
    | 10 | Services | 150 |
    | 10.1 | Global Services | 150 |
    | 10.2 | Instance Services | 158 |
    | 10.2.13 | Time Correlation Service | 169 |
    | 10.2.17 | CCSDS File Delivery Protocol (CFDP) | 175 |
    | 11 | Security | 186 |
    | 11.5 | AuthModules | 189 |
    | 12 | Web Interface | 200 |
    | 13 | Programs | 214 |
    | 14 | Configuration Sections | 226 |
    | 15 | Command Options | 228 |
    | 16 | Yamcs Plugin Format | 230 |
    | A | SQL Language | 232 |
    |  | Index | 238 |


## Documents this one references (21)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| 37 | [CCSDS 301.0-B-4](../references/index.md#ref-ccsds-301-0-b-4) · [library](ccsds-301-0-301x0b4e1.md) | Time Code Formats (https://public.ccsds.org/Pubs/301x0b4e1.pdf) | B-4 | mentioned |
| 63 | [CCSDS 132.0-B-3](../references/index.md#ref-ccsds-132-0-b-3) · [library](ccsds-132-0-132x0b3.md) | TM Space Data Link Protocol | B-3 | mentioned |
| 64 | [CCSDS 732.0-B-5](../references/index.md#ref-ccsds-732-0-b-5) · [library](ccsds-732-0-732x0b5ec1.md) | AOS Space Data Link Protocol | B-5 | mentioned |
| 65 | [CCSDS 232.0-B-4](../references/index.md#ref-ccsds-232-0-b-4) · [library](ccsds-232-0-232x0b4e1c1.md) | TC Space Data Link Protocol | B-4 | mentioned |
| 66 | [CCSDS 732.1-B-2](../references/index.md#ref-ccsds-732-1-b-2) | Unified Space Data Link Protocol (footnote links 732x1b3e1.pdf) | B-2 | mentioned |
| 67 | [CCSDS 231.0-B-4](../references/index.md#ref-ccsds-231-0-b-4) · [library](ccsds-231-0-231x0b4e1.md), [library](ccsds-231-0-231x0b4e1c1.md) | TC Synchronization and Channel Coding (footnote links 232x0b4e1c1.pdf) | B-4 | mentioned |
| 68 | [CCSDS 131.0-B-4](../references/index.md#ref-ccsds-131-0-b-4) | TM Synchronization and Channel Coding (footnote links 131x0b5.pdf) | B-4 | mentioned |
| 69 | [CCSDS 232.1-B-2](../references/index.md#ref-ccsds-232-1-b-2) · [library](ccsds-232-1-232x1b2e2c1.md) | Communications Operation Procedure (COP-1) | B-2 | mentioned |
| 70 | [CCSDS 133.0-B-2](../references/index.md#ref-ccsds-133-0-b-2) · [library](ccsds-133-0-133x0b2e2.md) | Space Packet Protocol | B-2 | mentioned |
| 71 | [CCSDS 133.1-B-3](../references/index.md#ref-ccsds-133-1-b-3) · [library](ccsds-133-1-133x1b3e1.md) | Encapsulation Service | B-3 | mentioned |
| 72 | [CCSDS 355.0-B-2](../references/index.md#ref-ccsds-355-0-b-2) · [library](ccsds-355-0-355x0b2.md) | Space Data Link Security Protocol (footnote links 355x1b1.pdf) | B-2 | mentioned |
| 73 | [CCSDS 130.2-G-3](../references/index.md#ref-ccsds-130-2-g-3) · [library](ccsds-130-2-130x2g3.md) | Space Data Link Protocols — Summary of Concept and Rationale (130x2g3.pdf) | G-3 | mentioned |
| 115 | [CCSDS 727.0-B-5](../references/index.md#ref-ccsds-727-0-b-5) · [library](ccsds-727-0-727x0b5e1.md) | CCSDS File Delivery Protocol (https://public.ccsds.org/Pubs/727x0b5.pdf) | B-5 | mentioned |
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | ECSS PUS (packet preprocessor and command postprocessor) |  | mentioned |
|  | [catalogue](../references/index.md#ref-xtce-exchange-format-coordinated-by-omg-http-www-xtce-org-xtce-1-0-1-1-and-1-2) | XTCE exchange format coordinated by OMG (http://www.xtce.org); XTCE 1.0, 1.1 and 1.2 |  | mentioned |
| 27 | [catalogue](../references/index.md#ref-xtcetools-project-https-gitlab-com-dovereem-xtcetools) | xtcetools project (https://gitlab.com/dovereem/xtcetools) |  | mentioned |
| 80 | [catalogue](../references/index.md#ref-ccsds-green-book-xtce-example-yamcs-core-test-resource-ccsds-green-book-xml) | CCSDS green book XTCE example (yamcs-core test resource ccsds-green-book.xml) |  | mentioned |
|  | [catalogue](../references/index.md#ref-iers-utc-tai-history-leap-second-file-and-iers-bulletin-c) | IERS UTC-TAI.history leap second file and IERS Bulletin C |  | mentioned |
|  | [RFC 3164](../references/index.md#ref-rfc-3164) | BSD syslog message format (syslog logging handler) |  | mentioned |
|  | [catalogue](../references/index.md#ref-yamcs-sle-plugin-space-link-extension-links-earth-reception-time) | yamcs-sle plugin (Space Link Extension links, Earth Reception Time) |  | mentioned |
|  | [catalogue](../references/index.md#ref-yamcs-scos2k-scos-2000-mib-loader) | yamcs-scos2k (SCOS-2000 MIB loader) |  | mentioned |

!!! note "Notes"
    No author is named; the PDF metadata author is 'Space Applications Services'. Printed page n is PDF page n + 13. The extraction reports 241 PDF pages (registry: 240); the last is empty. Diagrams (server architecture, command processing flow, CFDP class 2 sequence) have no text layer, e.g. PDF pp. 16 and 116. Footnote numbers are glued to standard numbers in the text layer (e.g. 'CCSDS 132.0-B-363' is 132.0-B-3 with footnote 63). The list of standards on PDF p. 99 is internally inconsistent: USLP is cited as 732.1-B-2 but linked to 732x1b3e1 (B-3); TC synchronization and channel coding 231.0-B-4 is linked to the TC SDLP file 232x0b4e1c1; TM synchronization is cited as 131.0-B-4 but linked to 131x0b5; SDLS is cited as 355.0-B-2 but linked to 355x1b1 (SDLS Extended Procedures). 'CRC-16-CCIIT' (for CCITT) is printed as such. The SCOS-2000 MIB loader yamcs-scos2k is a separate plugin and is only mentioned in passing. Library items for the cited standards: ccsds-301-0-301x0b4e1, ccsds-132-0-132x0b3, ccsds-732-0-732x0b4 and ccsds-732-0-732x0b5ec1, ccsds-232-0-232x0b4e1c1, ccsds-732-1-732x1b3e1, ccsds-231-0-231x0b4e1, ccsds-131-0-131x0b5, ccsds-232-1-232x1b2e2c1, ccsds-133-0-133x0b2e2, ccsds-133-1-133x1b3e1, ccsds-355-0-355x0b2, ccsds-355-1-355x1b1, ccsds-130-2-130x2g3, ccsds-727-0-727x0b5e1, ecss-e-st-70-41c-15april2016 and, for XTCE, omg-xtce-1-3-specification and ccsds-660-0-660x0b2.

