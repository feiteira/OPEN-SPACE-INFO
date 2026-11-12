---
title: "IFMS-OCC Interface ICD (IF and Modem System)"
description: "The interface control document for the file-based data interface of the IFMS (Intermediate Frequency and Modem System), the ranging, Doppler and receiver equipment in ESA's ESTRACK ground stations."
tags: ["Interface Control Document", "Ground stations, NCTRS/NIS and SLE"]
sources: [ifms-occ-icd-mex]
---

# IFMS IF and Modem System — IFMS-OCC interface — Interface Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>/MakaluMedia/MR/IFMS/ICD/FTP-OCC</dd><dt>Issue / version</dt><dd>11.4.0</dd><dt>Date</dt><dd>2006-08-09</dd><dt>Organisation</dt><dd>MakaluMedia Internet &amp; Engineering Services GmbH, Darmstadt (for ESA/ESOC)</dd><dt>Authors</dt><dd>Michel RICART, Yves DOAT</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 11.4.0 of 2006-08-09 'For MM11.4.0: No change' (Change History, PDF p. 2). The change history shown runs from 9.3.1 (2003-04-09) to 11.4.0; older entries were removed. Approvals list Michel RICART as author and project manager and Yves DOAT for ESOC.</dd><dt>Pages</dt><dd>27</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/psa/ftp/MARS-EXPRESS/MRS/MEX-M-MRS-1-2-3-EXT5-3829-V1.0/DOCUMENT/ESA_DOC/IFMS_OCCFTP.PDF" rel="noopener">https://archives.esac.esa.int/psa/ftp/MARS-EXPRESS/MRS/MEX-M-MRS-1-2-3-EXT5-3829-V1.0/DOCUMENT/ESA_DOC/IFMS_OCCFTP.PDF</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:13:43Z</dd><dt>SHA-256</dt><dd><code>21d082a7c0a8d66e6d5c3cc22f793c2c1ca55f025b6478cd74758b8a76b6918e</code></dd><dt>Size</dt><dd>483.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/ifms-occ-icd-mex.pdf">ifms-occ-icd-mex.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The interface control document for the file-based data interface of the **IFMS** (Intermediate Frequency and Modem System), the ranging, Doppler and receiver equipment in ESA's ESTRACK ground stations. The interface serves data clients such as [NCTRS](../scos2000/nctrs-nis.md) and, for historical reasons, is called the IFMS-to-OCC (Operations Control Centre) interface. It carries radiometric and station measurement data, not TM/TC frames.

The IFMS acts as a read-only FTP server over TCP/IP. The document lists the supported FTP commands and profile (stream mode, file structure, ASCII and image types only). Clients get catalogue access through directory listings, off-line access by retrieval, and 'pseudo-on-line' access through small data-sets that cover short measurement durations. Data-sets sit under `<data_set_root>/station/spacecraft/`, and their file names encode station, spacecraft, year, day of year, data-set kind, DAP (data acquisition process) type, DAP start time and a sequence number. DAP types are D1/D2 (Doppler), G1/G2 (AGC), ME (meteo), RG (ranging) and OL (open loop). Gzip copies and '.raw' uncorrected ranging files are also covered.

Section 6 defines the content of each data-set. The header holds station, spacecraft, time tags, requestor (DCP or STC), why the file was opened, sample period, carrier and tone indicators and a dump of the active configuration table. The measurement records are: Doppler (NCO count, unwrapped phase and the derived one-way delta delay, with the full algorithm for coherent and non-coherent transponders), AGC (carrier level, polarisation, channel powers, lock status), meteo (humidity, pressure, temperature), ranging (delay, code number, ambiguity flag, DSP status) and binary open-loop records (a 44-byte header with magic number 0xA3C725B6 and 136 six-byte blocks of packed I/Q samples). Section 7 covers the Support-Log files and section 8 the user access rules. The annexes give the BNF syntax and example files. The copy comes from the Mars Express radio science archive.


## Key points

- Change history highlights: Open-Loop data-sets added in 10.2.0 (2004-03-29), a 'freqplan' configuration table added to the header in 10.3.0, IP/X.25 mentions removed and new AGC measurements added in 10.5.0, 'gmdemod' header parameters added in 10.6.0. *(PDF p. 2)*
- The ICD describes the interface between the IFMS and data clients such as NCTRS; for historical reasons it is known as the IFMS-to-OCC (Operations Control Centre) interface. *(PDF p. 5)*
- The interface is entirely standard FTP over TCP/IP with read-only files; the IFMS FTP server supports USER, PASS, QUIT, PORT, MODE (S only), TYPE (A and I only), STRU (F only), CWD, PWD, LIST and RETR. *(PDF p. 6)*
- Pseudo-on-line delivery uses small data files of short measurement duration, set by configuration parameters (D1MaxDs, D2MaxDs, G1MaxDs, G2MaxDs, MeMaxDs, RgMaxDs); technically it is identical to off-line access. *(PDF p. 8)*
- File names such as PER1_CLU3_2002_108_OP_RG_145513_0001 encode station ID, spacecraft ID, year, day of year, data-set kind, DAP type (D1, D2, G1, G2, ME, OL, RG), DAP start time hhmmss and a 4-digit sequence ID; nominal length 31 characters. *(PDF p. 9)*
- Maximum DAP duration is 20 hours (72000 s); uncorrected ranging data are kept as '.raw' files in a 'raw/' subdirectory, and in this issue the IFMS software does not yet correct ranging data, so only raw files exist. *(PDF p. 10)*
- Field types are B (Boolean), F (Float), I (Integer), S (String) and T (Time, 'YYYYMMDD.hhmmss.mmm'), with units in &lt; &gt; and accuracy in [ ]. *(PDF p. 11)*
- The data-set header includes requestor_id (DCP or STC), why_opened (DAP_Started, Conf_Change, Max_Size_Reached, Tone_Lost), sample_period, carrier and tone indicators, epd_source, rg_data_corrected and the active configuration (modulator, freqplan, tracking, rcdemod, scdemod, gmdemod). *(PDF p. 12)*
- Doppler records hold sample number and time, a 17.5 MHz NCO interval count, unwrapped carrier phase (turns), a spurious-carrier flag and the one-way delta delay; the ICD gives the delta-delay derivation for coherent and non-coherent transponders. *(PDF p. 13)*
- Ranging records hold the round-trip delay modulo the code ambiguity, the current code number (1 to 24), ambiguity-resolution and spurious flags, estimated Doppler (KD-1) and DSP status values. *(PDF p. 15)*
- Open-loop records come from the GDSP 17.5 Msps complex baseband stream; each record has a 44-byte big-endian header (magic 0xA3C725B6) and 136 blocks of 6 bytes holding 12, 6, 3 or 1 samples for 1, 2, 4 or 12-bit quantisation; a new data-set opens every minute. *(PDF p. 16)*
- Six Support-Log files (D1, D2, G1, G2, ME, RG) in ~ifmsdset/support_logs/ log data-set open, close and delete events; they are intended only as a backup monitoring mechanism. *(PDF p. 17)*
- External FTP users can never create, modify or delete files; data-set deletion is controlled only through the DCP and STC interfaces. *(PDF p. 18)*


## Cited by these wiki pages (7)

- [How it all fits together](../overview/index.md)
- [Missions](../missions/index.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Radio frequency, modulation and ranging](../ccsds/rf-and-ranging.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (38 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 5 |
    | 2 | Network access | 5 |
    | 3 | Protocols supporting the interface | 6 |
    | 3.1 | FTP: File Transfer Protocol | 6 |
    | 3.2 | IP | 7 |
    | 4 | Services supported on the interface | 7 |
    | 4.1 | Data-set catalogue access | 7 |
    | 4.2 | Off-line data-set access | 7 |
    | 4.3 | Pseudo-On-line data-set access | 8 |
    | 4.4 | File management | 8 |
    | 5 | IFMS data-set storage | 8 |
    | 5.1 | File-system structure | 8 |
    | 5.2 | File naming | 9 |
    | 5.3 | File format | 10 |
    | 6 | Data-sets content | 11 |
    | 6.1 | Overview & administration | 11 |
    | 6.2 | Header information | 12 |
    | 6.3 | Doppler data (1 & 2) | 13 |
    | 6.4 | Gain (AGC) data (1 & 2) | 14 |
    | 6.5 | Meteorological data | 14 |
    | 6.6 | Ranging data | 15 |
    | 6.7 | Open-Loop data | 15 |
    | 7 | IFMS Support-Log files | 17 |
    | 8 | IFMS user access | 18 |
    | 8.1 | User accounts and access rights | 18 |
    | 8.2 | User access | 18 |
    | 8.3 | File deletion and modification | 18 |
    | 9 | Annex 1: Files syntax specification | 19 |
    | 9.1 | Annex 1.1: Common syntax elements | 19 |
    | 9.2 | Annex 1.2: Support-Log file specification | 20 |
    | 9.3 | Annex 1.3: Data-set file specification | 21 |
    | 10 | Annex 2: Examples | 24 |
    | 10.1 | Support-Log file | 24 |
    | 10.2 | Header information | 24 |
    | 10.3 | Doppler data (1 & 2) | 27 |
    | 10.4 | Gain data (1 & 2) | 27 |
    | 10.5 | Meteorological data | 27 |
    | 10.6 | Ranging data | 27 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [DOCS] | [Y/DA/980222/D1850](../references/index.md#ref-y-da-980222-d1850) | IFMS Documentation Index |  | reference |
| [FTP] | [RFC 959](../references/index.md#ref-rfc-959) | File Transfer Protocol (FTP), ARPA Request For Comment (RFC) 959 |  | reference |
| [IFMS-SUM] | [/MakaluMedia/MR/IFMS/SUM](../references/index.md#ref-makalumedia-mr-ifms-sum) | IFMS Software User Manual | Issue 11.4.x | reference |
| [TERMS] | [Y/DA/980234/D1850](../references/index.md#ref-y-da-980234-d1850) | IFMS Abbreviations and Acronyms |  | reference |
| others | [catalogue](../references/index.md#ref-others-see-docs) | others: see [DOCS] |  | reference |
| [FTP-HostReqs] | [catalogue](../references/index.md#ref-ftp-hostreqs-cited-for-experimental-ftp-commands-4-1-3-1) | [FTP-HostReqs] (cited for experimental FTP commands, §4.1.3.1) |  | mentioned |
| [DCP-OPER] | [catalogue](../references/index.md#ref-dcp-oper-dcp-interface-controls-data-set-deletion) | [DCP-OPER] (DCP interface, controls data-set deletion) |  | mentioned |
| [ICD-STC] | [catalogue](../references/index.md#ref-icd-stc-stc-interface-controls-data-set-deletion) | [ICD-STC] (STC interface, controls data-set deletion) |  | mentioned |
| IFMS ITT | [catalogue](../references/index.md#ref-ifms-itt-extended-spacecraft-identifier) | IFMS ITT (extended spacecraft identifier) |  | mentioned |

!!! note "Notes"
    The file comes from the Mars Express radio-science (MRS) dataset in ESA's Planetary Science Archive (IFMS_OCCFTP.PDF), but the document is generic ESTRACK IFMS documentation, not specific to Mars Express. Section 8.1 prints a default FTP account name and password; they are deliberately not reproduced here. The change history entries for 10.3.0 refer to '[SUM]' and '[ADD]', and §5.2 to '[IFMS_SUM]', while the reference list names '[IFMS-SUM]'. Table 2 is numbered twice (Doppler and AGC). The worked file-name example says the DAP started on 1999-04-18 at 14:55:13, but the file name shows 2002 and 145513. The extraction reports 28 PDF pages (registry: 27); the last is empty. STC and DCP are not expanded in this document.

