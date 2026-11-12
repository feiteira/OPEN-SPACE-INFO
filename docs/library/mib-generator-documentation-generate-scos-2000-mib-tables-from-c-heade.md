---
title: "MIB Generator 0.1: SCOS-2000 MIB tables from C headers"
description: "The Read the Docs PDF export (release 0.1, 15 September 2023) of MIB Generator by Josef Vácha, a set of Python scripts that generate SCOS-2000 MIB ASCII tables from the C header and source files that "
tags: ["User Manual", "Tools, MIB editors and related standards"]
sources: [mib-generator-documentation-generate-scos-2000-mib-tables-from-c-heade]
---

# MIB Generator

<dl class="osi-meta"><dt>Issue / version</dt><dd>Release 0.1</dd><dt>Date</dt><dd>2023-09-15</dd><dt>Organisation</dt><dd>Josef Vácha (open-source project documentation published on Read the Docs; no organisation printed)</dd><dt>Authors</dt><dd>Josef Vácha</dd><dt>Type</dt><dd>User Manual</dd><dt>Status</dt><dd>Release 0.1, Sep 15, 2023 (PDF p. 1). The documentation states that the project is under active development (PDF p. 5). This is the PDF export of the 'latest' documentation build, so later builds may differ.</dd><dt>Pages</dt><dd>106</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://mib-generator.readthedocs.io/_/downloads/en/latest/pdf/" rel="noopener">https://mib-generator.readthedocs.io/_/downloads/en/latest/pdf/</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:26Z</dd><dt>SHA-256</dt><dd><code>1b543200851bf28efce82f41f9e2163f3cf37095557316c0f17c595bf42d5037</code></dd><dt>Size</dt><dd>420.3 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/mib-generator-documentation-generate-scos-2000-mib-tables-from-c-heade.pdf">mib-generator-documentation-generate-scos-2000-mib-tables-from-c-heade.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Read the Docs PDF export (release 0.1, 15 September 2023) of MIB Generator by Josef Vácha, a set of Python scripts that generate SCOS-2000 MIB ASCII tables from the C header and source files that define an instrument's TM packets and TC commands. The first chapters form a short user guide. The tool expects four C inputs: a TM .h file with packet structures and calibrations, a TM .c file with the APID array and the list of packet types with service type and subtype, a TC .h file with command structures, the TC header, decalibrations and verifications, and a common TcTm .h file. It can be installed from PyPI or GitHub and is run as the mib-gen command or the mib-gen-gui interface; a 'what to edit' chapter maps typical changes to modules.

Chapter 5 matters most to an engineer. It shows the json5 annotations written inside C comments: pack_type, spid, text_id, base_par_index and prefix (for generated parameter names), sid, vpd (fixed, count, data), cal and type for TM; service, sub, cvs, cdf, min, max, default, const_value and enum for TC. It also shows the calibration notations: mcf polynomial, lgf logarithmic, text_cal or enum textual, num_cal numerical, dec_ident decalibration and cvs_def verification stages. The remaining chapters are API reference generated from docstrings for the main, parsing, construction, generation, data, temp, utilities and gui packages. They show which tables are built (pid, pic, tpcf, pcf, plf, vpd, cur, caf/cap, txf, mcf, lgf, paf, ccf, cdf, cpc, prf, cvp, cvs, tcp, pcpc, pcdf), the type, length, uniqueness and mandatory checks driven by a table-format module, a pic de-duplication filter, an OHB Italia mnemonic check and an optional .docx summary laid out like an ICD.


## Key points

- MIB Generator is a set of Python scripts that generate MIB databases, as used in ESA's MCS SCOS 2000, from C header (and other) files defining TM and TC packet structures; the current implementation assumes one specific formatting of the C files. *(PDF p. 5)*
- Processing steps: user interaction and configuration (main, utilities), parsing of the C files (parsing), construction of Python objects for TM packets, TC commands and calibrations (construction), and generation, checking and saving of MIB tables (generation). *(PDF p. 7)*
- Four C inputs are expected: a TM .h file (packet structures, entries, calibrations), a TM .c file (list of TM packet types), a TC .h file (commands, TC headers, decalibrations, verifications) and a TcTm .h file (common id structures and enums). *(PDF p. 7)*
- Installation: 'pip install mib-generator' from PyPI or a clone of the GitHub repository vachaj11/MIB-Generator; prerequisites are json5, python-docx and PySide6 (GUI only). *(PDF p. 9)*
- The CLI is started with mib-gen (mib-gen -p sets the input/output paths on first use, --help lists options); a simple GUI is started with mib-gen-gui. *(PDF p. 11)*
- The TM .c file must hold an apidNum array mapping APID names to numbers and a tmProperties array giving each packet type its apid, serviceType and serviceSubType. *(PDF p. 15)*
- Enums and #define macros are collected into one evaluation dictionary; comments of the form /*{ ... }*/ are parsed as json5, while ordinary // comments are ignored. *(PDF p. 16)*
- Packet annotations: pack_type (matched to the .c table), base_par_index and prefix for unique parameter names (e.g. the entry 'compression' becomes LWT59202), text_id (packet name in the MIB), spid, desc and use_structure. *(PDF p. 16)*
- Entry annotations: sid (identification field with const_value), type, desc, vpd ('fixed', 'count' or 'data' for variable packet definitions) and cal; nested structs are unpacked and C bit-field widths are honoured. *(PDF p. 17)*
- Calibrations are declared with an mcf key (polynomial coefficients), an lgf key (logarithmic coefficients), text_cal or an annotated enum (textual) and num_cal (numerical X-Y pairs). *(PDF p. 17)*
- The sample TC header comments the 4-bit version field as 1 for ECSS-E-70-41A and 2 for ECSS-E-ST-70-41C, followed by acknowledgement flags, service type, subtype and source ID. *(PDF p. 18)*
- TC annotations: service and sub, cvs (verification stages; defaults apply if absent); parameter keys cdf (count/data repetition), min and max (range check), default, const_value (fixed area) and enum (decalibration). *(PDF p. 19)*
- Decalibrations are enums with a dec_ident key (adding cal_ident also defines a TM textual calibration); verification stages are isolated comments with cvs_def, cvs_type, cvs_interval and default, and the sample notes that CVS_SOURCE is always R and the CVS start is 0. *(PDF p. 19)*
- Tables built per TC header: tcp, pcpc and pcdf. *(PDF p. 44)*
- Tables built per TC command: ccf, cpc, cdf, prf and cvp. *(PDF p. 47)*
- Tables built per TM packet: pid, pic, tpcf, pcf and plf, plus cur and vpd. *(PDF p. 53)*
- Calibration classes produce caf/cap (numerical), paf, lgf, mcf, txf and cvs rows; the numerical calibration syntax 'hasn't been fully decided yet'. *(PDF p. 59)*
- Generation runs final checks so that the output tables adhere to the requirements on type, length, uniqueness and 'mandatoriness'. *(PDF p. 69)*
- Which tables are generated is set in the data/config.json5 config file or overridden with the cfg argument of generation_hub. *(PDF p. 71)*
- A .docx document listing the entries of each TM and TC packet can be generated with python-docx, in a layout that follows a standard ICD scheme. *(PDF p. 72)*
- mnemon_check follows additional MIB specifications by OHB Italia, which require a unique mnemonic in the description field of some tables; tables are written as tab-separated .dat files. *(PDF p. 74)*
- pic_filter reduces the packet list to one pic entry per type/subtype and warns if packets sharing a type/subtype declare their additional identification fields at different positions. *(PDF p. 75)*
- Column names, types, lengths and mandatory flags of every MIB table are stored in mib_generator.data.longdata (tables_format, unique_entries, uint_pfc, time_pfc). *(PDF p. 77)*


## Cited by these wiki pages (2)

- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (53 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title page | 1 |
    |  | Documentation contents | 3 |
    |  | Introduction (what MIB Generator is) | 5 |
    | 1 | About the script | 7 |
    | 2 | Installation and building | 9 |
    | 2.1 | Installation | 9 |
    | 2.2 | Building from source | 9 |
    | 2.3 | Running without building | 10 |
    | 3 | Usage | 11 |
    | 3.1 | With the package installed | 11 |
    | 3.2 | Running without building | 11 |
    | 3.3 | First time | 11 |
    | 3.4 | Flags and options | 12 |
    | 3.5 | GUI | 12 |
    | 4 | I need to change. . . | 13 |
    | 5 | C-code samples | 15 |
    | 5.1 | TM packets | 15 |
    | 5.2 | TC packets | 18 |
    | 6 | mib_generator.main package | 21 |
    | 6.2 | mib_generator.main.cli module | 21 |
    | 6.3 | mib_generator.main.main module | 22 |
    | 7 | mib_generator.parsing package | 23 |
    | 7.2 | mib_generator.parsing.load module | 23 |
    | 7.3 | mib_generator.parsing.par_cfile module | 25 |
    | 7.4 | mib_generator.parsing.par_header module | 30 |
    | 7.5 | mib_generator.parsing.par_methods module | 37 |
    | 7.6 | mib_generator.parsing.parser_main module | 40 |
    | 8 | mib_generator.construction package | 43 |
    | 8.2 | mib_generator.construction.TC_packet module | 43 |
    | 8.3 | mib_generator.construction.TC_packet_methods module | 49 |
    | 8.4 | mib_generator.construction.TM_packet module | 51 |
    | 8.5 | mib_generator.construction.TM_packet_methods module | 56 |
    | 8.6 | mib_generator.construction.calib module | 59 |
    | 9 | mib_generator.generation package | 69 |
    | 9.2 | mib_generator.generation.gener module | 69 |
    | 9.3 | mib_generator.generation.gener_doc module | 72 |
    | 9.4 | mib_generator.generation.gener_methods module | 73 |
    | 10 | mib_generator.data package | 77 |
    | 10.2 | mib_generator.data.longdata module | 77 |
    | 10.3 | mib_generator.data.warn module | 78 |
    | 11 | mib_generator.temp package | 81 |
    | 11.2 | mib_generator.temp.temp module | 81 |
    | 12 | mib_generator.utilities package | 83 |
    | 12.2 | mib_generator.utilities.data_gen module | 83 |
    | 12.3 | mib_generator.utilities.update module | 83 |
    | 12.4 | mib_generator.utilities.visualiser module | 85 |
    | 13 | mib_generator.gui package | 89 |
    | 13.2 | mib_generator.gui.gui module | 89 |
    | 13.3 | mib_generator.gui.gui_methods module | 93 |
    | 13.4 | mib_generator.gui.ui_form module | 93 |
    | 14 | Indices | 95 |
    |  | Python Module Index | 97 |
    |  | Index | 99 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-scos-2000-esa-mission-control-system-mib-databases) | SCOS 2000 (ESA mission control system) MIB databases |  | mentioned |
|  | [catalogue](../references/index.md#ref-mib-generator-package-on-pypi-source-repository-https-github-com-vachaj11-mib-ge) | mib-generator package on PyPI; source repository https://github.com/vachaj11/MIB-Generator.git |  | mentioned |
|  | [catalogue](../references/index.md#ref-python-libraries-json5-python-docx-and-pyside6) | Python libraries json5, python-docx and PySide6 |  | mentioned |
|  | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | PUS version value 1 in the sample TC header |  | mentioned |
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | PUS version value 2 in the sample TC header |  | mentioned |
|  | [catalogue](../references/index.md#ref-additional-mib-specifications-by-ohb-italia-mnemonic-in-description-field) | Additional MIB specifications by OHB Italia (mnemonic in description field) |  | mentioned |

!!! note "Notes"
    PDF export of the Read the Docs 'latest' build (title page and metadata date 15 Sep 2023). The extraction reports 107 PDF pages (registry: 106); many verso pages are blank (e.g. PDF pp. 2, 4, 6, 8) and the last is empty. The document does not state which issue of the SCOS-2000 Database Import ICD the table formats follow. The TC sample contains a common SpaceWire header to be ignored for the MIB ('struct SpwHead spwHead', PDF p. 19), which suggests (inference) that the tool was written for a SpaceWire-connected instrument. The sample APID names (DAPU, FGM, DISC, COMPLIMENT, LEES, SCIENA) appear to match an instrument suite such as the Comet Interceptor DFP package; this is an inference, not stated in the document. Typos kept as printed include 'puspose', 'concieved', 'generatlly' and 'Numeber'; the chapter 7 introduction lists par_header twice where the second should be par_methods (PDF p. 23). The registry slug is truncated from the Read the Docs project title.

