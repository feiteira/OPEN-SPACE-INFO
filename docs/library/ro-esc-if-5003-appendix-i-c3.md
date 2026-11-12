---
title: "Rosetta/MEX/VEX DDID Appendix I: GDDS XML schema"
description: "Appendix I of the Data Delivery Interface Document (DDID) shared by the Rosetta, Mars Express and Venus Express Mission Control System (RMCS), issue C3 of 21 August 2007, published by ESOC."
tags: ["Data Delivery Interface Document", "Mission data delivery documents"]
sources: [ro-esc-if-5003-appendix-i-c3]
---

# Rosetta/Mars Express/Venus Express Mission Control System (RMCS) Data Delivery Interface Document (Appendix I) XML Schema

<dl class="osi-meta"><dt>Document ID</dt><dd>RO-ESC-IF-5003, MEX-ESC-IF-5003, VEX-ESC-IF-5003</dd><dt>Issue / version</dt><dd>Issue C3</dd><dt>Date</dt><dd>2007-08-21</dd><dt>Organisation</dt><dd>European Space Agency, ESOC</dd><dt>Type</dt><dd>Data Delivery Interface Document</dd><dt>Status</dt><dd>Issue C3, 21/08/2007 (PDF p. 1). Approval and distribution are 'As per main DDID document' (PDF p. 3). The change record shows issues B1 (20/07/01) to C3, the C3 re-issue adding event keywords under DCR 417 (PDF p. 5).</dd><dt>Pages</dt><dd>25</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://pds-smallbodies.astro.umd.edu/holdings/ro-c-rsi-1_2_3-prl-0374-v1.0/document/esa_doc/ro_esc_if_5003_appendix_i.pdf" rel="noopener">https://pds-smallbodies.astro.umd.edu/holdings/ro-c-rsi-1_2_3-prl-0374-v1.0/document/esa_doc/ro_esc_if_5003_appendix_i.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:03Z</dd><dt>SHA-256</dt><dd><code>a90a135a44bd6028f40d40b36cb61cec570c1ab5eed235d8aed0ddf147bffe7d</code></dd><dt>Size</dt><dd>110.0 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/ro-esc-if-5003-appendix-i-C3.pdf">ro-esc-if-5003-appendix-i-C3.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Appendix I of the Data Delivery Interface Document (DDID) shared by the Rosetta, Mars Express and Venus Express Mission Control System (RMCS), issue C3 of 21 August 2007, published by ESOC. The main DDID is the ICD that governs delivery of mission data from the control centre to the Principal Investigators; this appendix defines the XML schema for the file-based request mechanism of the data delivery system, which is based on ESOC's Generic Data Disposition System (GDDS). Its stated scope is the format of on-line data requests, acknowledgements and catalogue entries, and it notes that XML might one day replace SFDU for the data themselves.

The appendix reproduces six XSD files, each with a description, include list, table of types and full definition. GDDSCommon.xsd holds the basic types: a non-empty string, a date-time or duration time choice, delivery methods (RDM raw data media, FTP, Online with hex-binary inline response), compression (NONE or ZIP), user, format (including an SFDU-required flag), data and request information. GDDSMission.xsd holds the mission-specific keyword types: request keywords (sample rate, maximum volume, time type, application, event type, severity, workstation, message filter), filter keywords (source and SCOS-2000 packet generation time, PUS type and subtype, P1/P2 identification values, name, creation, uplink, execution and event times, MIB release and issue, validity, volume) and catalogue keywords, plus event types (LOG, MIB, SOFTWARE, SYSTEM) and severities. MissionDataDef.xsd lists the high-level data types TLM, CMH, EVT and AUX and the format option RMCS_SPECIAL. GDDSCatalogue.xsd, GDDSRequest.xsd (a recursive filter-expression tree with leaf comparisons and AND, OR and NOT nodes) and GDDSAcknowledgement.xsd define the catalogue, request and acknowledgement documents.

It is the concrete schema behind the GDDS 'recursive query language defined in XML' and the predecessor of the EDDS request formats.


## Key points

- The appendix defines the XML schema for the data delivery interfaces, covering on-line data requests, acknowledgements and catalogue entries, for use by external users. *(PDF p. 9)*
- It was introduced together with a file-based request mechanism based on XML; the change forecast notes that XML may replace SFDU 'in the distant future'. *(PDF p. 9)*
- Delivery methods are RDM, FTP and Online; Online delivery returns the data inline as xsd:hexBinary with a displayAsHex flag, and compression is NONE or ZIP. *(PDF p. 11)*
- Filter keywords include SourcePktsGenTime, S2KPktsGenTime, Type, SubType, P1Val and P2Val, Name, CreationTime, UplinkTime, ExecutionTime, EventTime, Release, Issue and Validity. *(PDF p. 15)*
- Event types for filtering are LOG, MIB, SOFTWARE and SYSTEM, and severities are INFORMATION, WARNING, ERROR and FATAL ERROR. *(PDF p. 16)*
- High-level data types are TLM, CMH, EVT and AUX, with the mission-specific format option RMCS_SPECIAL. *(PDF p. 17)*
- Requests are an onlineRequest with general request information and one or more data items, each with a data type, data source, catalogue-request flag, keywords, optional onEvent trigger and a recursive filter expression. *(PDF p. 23)*
- Filter expressions are trees of leaf nodes (OP_GT, OP_LT, OP_EQ, OP_GTE, OP_LTE on a keyword value pair), unary nodes (OP_NOT) and binary nodes (OP_AND, OP_OR). *(PDF p. 22)*
- Acknowledgements report the actual start time, operating hardware and software, DDS version, error message and, per item, the actual volume. *(PDF p. 25)*


## Cited by these wiki pages (4)

- [GDDS and mission data delivery interface documents](../scos2000/gdds-and-ddids.md)
- [Missions](../missions/index.md)
- [Rosetta, Mars Express and Venus Express](../missions/rosetta-mex-vex.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (15 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 9 |
    | 1.1 | Purpose | 9 |
    | 1.2 | Scope | 9 |
    | 1.3 | Summary | 9 |
    | 1.4 | Amendment History | 9 |
    | 1.5 | Change Forecast | 9 |
    | 1.6 | Applicable and Reference Documents | 9 |
    | 1.7 | Abbreviation | 9 |
    | 2 | Schema | 10 |
    | 2.1 | GDDSCommon.xsd | 10 |
    | 2.2 | GDDSMission.xsd | 14 |
    | 2.3 | MissionDataDef.xsd | 17 |
    | 2.4 | GDDSCatalogue.xsd | 19 |
    | 2.5 | GDDSRequest.xsd | 21 |
    | 2.6 | GDDSAcknowledgement.xsd | 24 |


## Documents this one references (3)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [RO-ESC-IF-5003/MEX-ESC-IF-5003/VEX-ESC-IF-5003](../references/index.md#ref-ro-esc-if-5003-mex-esc-if-5003-vex-esc-if-5003) | Rosetta / Mars Express / Venus Express Data Delivery Interface Document | Issue C3 21st August 2007 | applicable |
| A-1 | [catalogue](../references/index.md#ref-main-ddid-document-applicable-document-a-1) | Main DDID document (Applicable Document A-1) |  | applicable |
| A-5 | [catalogue](../references/index.md#ref-applicable-document-a-5-abbreviations-and-acronyms) | Applicable Document A-5 (abbreviations and acronyms) |  | applicable |

!!! note "Notes"
    The PDF has roman-numbered front matter: printed page 1 is PDF p. 9, so PDF page = printed page + 8 in the body. PDF pp. 4, 6, 18 and 20 are blank or nearly blank. The text layer contains Word track-change marginalia ('Deleted: 1', 'Deleted: July', 'Deleted: 5') next to the parent-document reference (PDF p. 9). The section 1.4 text still says 'This is the first issue of this appendix' although the change record lists issues B1 to C3. Some schema definitions use '&lt;include ...&gt;' without the xsd: prefix (PDF pp. 19, 21, 24), and 'Ernumeration' is misspelled (PDF p. 17). GDDSCommon.xsd lists the type 'DeliveryType' twice in its type table, once with description 'TBD'. Downloaded from the PDS Small Bodies Node (Rosetta RSI archive volume); the parent DDID is the library item ro-esc-if-5003-ddid-c2 (issue C2) and its MEX copy is mex-esc-if-5003-b5. The issue of this appendix (C3) is newer than the registered main DDID issue C2.

