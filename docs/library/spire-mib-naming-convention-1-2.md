---
title: "SPIRE MIB Naming Convention"
description: "A five-page SPIRE technical note that turns the Herschel/Planck system-level naming convention (H-P-1-ASPI-SP-0141, AD01) into concrete identifier patterns for the SPIRE instrument's MIB, the set of S"
tags: ["Technical Note", "MIB / Database Import ICD"]
sources: [spire-mib-naming-convention-1-2]
---

# SPIRE MIB Naming Convention

<dl class="osi-meta"><dt>Document ID</dt><dd>SPIRE-RAL-NOT-001155</dd><dt>Issue / version</dt><dd>1.2</dd><dt>Date</dt><dd>2002-03-11</dd><dt>Organisation</dt><dd>SPIRE instrument team, Rutherford Appleton Laboratory (RAL)</dd><dt>Authors</dt><dd>K.J. King</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Issue 1.2 dated 11th March 2002 (header of every page). The note does not state whether later issues exist; it was written against SCOS2000 Database Import ICD issue 5.0 (RD01, p. 1), which later ICD issues supersede.</dd><dt>Pages</dt><dd>5</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/001155_NOT_Naming_Convention/NOT001155%20SPIRE%20MIB%20Naming%20Convention_1-2.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/001155_NOT_Naming_Convention/NOT001155%20SPIRE%20MIB%20Naming%20Convention_1-2.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:09:59Z</dd><dt>SHA-256</dt><dd><code>231295c605ac8feed4ab7c8eb48dbb6283a5ddd217cb54f3377eadeea291031d</code></dd><dt>Size</dt><dd>26.3 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/spire-mib-naming-convention-1.2.pdf">spire-mib-naming-convention-1.2.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A five-page SPIRE technical note that turns the Herschel/Planck system-level naming convention (H-P-1-ASPI-SP-0141, AD01) into concrete identifier patterns for the SPIRE instrument's MIB, the set of SCOS-2000 ASCII tables defined by the SCOS2000 Database Import ICD (issue 5.0, RD01). SPIRE delivered its MIB to the Herschel/Planck system database, so every key field had to follow a shared scheme.

Section 2 gives one pattern per MIB key field: command names (`CCF_CNAME`, `SCiiippp`), command parameters (`CPC_PNAME`, `SPiiippp`), monitoring parameters (`PCF_NAME`, `SMiiippp`), monitoring packets (`PID_SPID`, `tttnnnnppp`), numerical, textual and polynomial calibration identifiers (`tttnnnrrr`) and the alphanumeric, graphic and scrolling display identifiers (`SA`, `SG`, `SL` prefixes). Each pattern also cites the matching AD01 convention number. Section 3 defines the building blocks: system-element type numbers (OBS 480, DPU 490, DCU 500, MCU 510, SCU 520, EGSE 528, TFCS 529) with their subsystem letters, position identifiers per instrument model (AVM, QM, FM, FS), real-element numbers per configuration, fallback numeric 'alternative IDs' for calibration curves in case SCOS-2000 could not handle 8-character names, and one-letter parameter-unit codes such as K for temperature and V for voltage.

An engineer can use it as a decoder ring for SPIRE mnemonics in Herschel databases, and as a compact real example of how an instrument team tailored generic MIB naming to its own hardware tree. It also covers ground-only EGSE and test-facility (TFCS) parameters.


## Key points

- The note applies the Herschel/Planck System Database (HPSDB) naming convention (AD01) to the SPIRE MIB, which is delivered conforming to the SCOS2000 Database Import ICD (RD01). *(PDF p. 1)*
- The SPIRE MIB must also define parameters from the SPIRE EGSE and other test equipment such as the TFCS; these follow the same naming format as instrument parameters. *(PDF p. 1)*
- Command names (CCF_CNAME, also used in CDF_CNAME and PTV_CNAME) follow the pattern SCiiippp; command parameters (CPC_PNAME, CDF_PNAME) follow SPiiippp; monitoring parameters (PCF_NAME, OCF_NAME, OCP_NAME, PLF_NAME, PTV_PARNAM) follow SMiiippp. *(PDF p. 1)*
- Monitoring packets (PID_SPID, TPCF_SPID, PLF_SPID) use the numeric pattern tttnnnnppp; command and monitoring calibrations (CCA, PAF, CAF, TXF, MCF numbers) use tttnnnrrr, with an alternative identifier sss. *(PDF p. 1)*
- Display identifiers use SAiiippp for alphanumeric displays (DPF_NUMBE), SGiiippp for graphical displays (GPF_NUMBE) and SLiiippp for scrolling displays (SPF_NUMBE). *(PDF p. 2)*
- In the patterns, iii is the theoretical parameter identifier (first character = subsystem ID, third character = parameter unit ID), nnn/nnnn are running numbers, ttt is the system element number, rrr the real element number, ppp the position identifier and sss the alternative identifier. *(PDF p. 2)*
- SPIRE system element type numbers are OBS 480, DPU 490 and DCU 500, with subsystem letters such as T (Telemetry), D (Data), B (Bias), L (LIA), P (Photometer) and S (Spectrometer). *(PDF p. 2)*
- Further system element numbers are MCU 510, SCU 520, EGSE 528 and TFCS 529; EGSE subsystems include the CDMS and DRCU simulators, and TFCS subsystems include the black body, cryostat, FTS and laser. *(PDF p. 3)*
- Position identifiers are the unique System Element numbers per instrument model (AVM, QM, FM, FS); the DPU has distinct prime (4901) and redundant (4912) identifiers. *(PDF p. 3)*
- Real element numbers for the first configuration are 100 (AVM), 300 (QM), 500 (FM) and 700 (FS) for most elements, incremented by 1 for each new configuration; the DPU uses 1001/2002, 3001/4002, 5001/6002 and 7001/8002. *(PDF p. 4)*
- Alternative numeric IDs for calibration curves (used if SCOS2000 cannot handle 8-character field names) are allocated in blocks of 50: OBS 500-549, DPU 550-599, DCU 600-649, MCU 650-699, SCU 700-749. *(PDF p. 4)*
- Parameter unit IDs are single letters, e.g. A current, F status flag, H frequency, K temperature, M mode, N count, T time, V voltage and W power. *(PDF p. 4)*


## Cited by these wiki pages (8)

- [Calibration in the MIB](../mib/calibration.md)
- [Display definitions in the MIB](../mib/displays.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Missions](../missions/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md)


??? abstract "Contents (11 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | INTRODUCTION | 1 |
    | 1.1 | Documentation | 1 |
    | 1.1.1 | Applicable Documents | 1 |
    | 1.1.2 | Reference Documents | 1 |
    | 2 | NAMING CONVENTION | 1 |
    | 3 | IDENTIFIERS | 2 |
    | 3.1 | System Elements | 2 |
    | 3.2 | Position Identifiers | 3 |
    | 3.3 | Real Element Numbers | 3 |
    | 3.4 | Alternative IDs | 4 |
    | 3.5 | Parameter Unit IDs | 4 |


## Documents this one references (4)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD01 | [H-P-1-ASPI-SP-0141](../references/index.md#ref-h-p-1-aspi-sp-0141) | Herschel/Planck Naming Convention Specification | 01/00 | applicable |
| RD01 | [S2K-MKS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mks-icd-0001-tos-gci) | SCOS2000 Database Import ICD | 5.0 | reference |
| RD02 | [catalogue](../references/index.md#ref-aspi-comments-to-version-1-0-of-this-note-email-from-f-chatte-15th-february-2002) | ASPI comments to version 1.0 of this note (email from F. Chatte, 15th February 2002) | 15th February 2002 | reference |
| RD03 | [SPIRE-RAL-DOC-001172](../references/index.md#ref-spire-ral-doc-001172) | TFCS Requirements Document |  | reference |

!!! note "Notes"
    The introduction expands MIB as 'Mission Implementation Base' rather than the usual 'Mission Information Base' (p. 1). RD01's document number is printed 'S2K-MKS-ICD-0001-TOS-GCI' (MKS rather than MCS) and its issue as 'Issues 5.0'. AD01 is cited as H-P-1-ASPI-SP-0141 here, while the HCSS MIB Clarification and Tailoring Note cites H-P-ASPI-SP-0141 and H-P-1-ASP-TN-1060 cites H-P-1-ASP-SP-0141 for the same Herschel/Planck naming convention. EGSE- and TFCS-specific text is said to be in blue type, which the text extraction does not preserve. The registry counts 5 pages; PDF page 6 of the extraction is an empty trailing page.

