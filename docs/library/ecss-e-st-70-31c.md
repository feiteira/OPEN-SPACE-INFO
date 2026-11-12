---
title: "ECSS-E-ST-70-31C Monitoring and control data definition"
description: "ECSS-E-ST-70-31C (31 July 2008) is the ECSS standard that defines the monitoring and control data a supplier delivers with a product (a unit, subsystem, instrument or whole spacecraft) so that the cus"
tags: ["Standard", "Tools, MIB editors and related standards"]
sources: [ecss-e-st-70-31c]
---

# Space engineering - Ground systems and operations - Monitoring and control data definition

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70-31C</dd><dt>Issue / version</dt><dd>C</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division</dd><dt>Authors</dt><dd>ECSS-E-ST-70-31 Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Published ECSS Standard dated 31 July 2008 (PDF p. 1), prepared by the ECSS-E-ST-70-31 Working Group and approved by the ECSS Technical Authority (PDF p. 2). Change log: ECSS-E-70-31A first issue (9 October 2007), ECSS-E-70-31B never issued, ECSS-E-ST-70-31C with the new ECSS template (PDF p. 3). Whether it has since been superseded is not stated in this copy.</dd><dt>Pages</dt><dd>240</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/CCSDS/ECSS-E-ST-70-31C(31July2008).pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/CCSDS/ECSS-E-ST-70-31C(31July2008).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:20:49Z</dd><dt>SHA-256</dt><dd><code>d70f1b8c2c1647f08ad45848bd089a15f1fdffe4f35255e50f5c513c6741aa5b</code></dd><dt>Size</dt><dd>1.6 MB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/ecss-e-st-70-31c.pdf">ecss-e-st-70-31c.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

ECSS-E-ST-70-31C (31 July 2008) is the ECSS standard that defines the monitoring and control data a supplier delivers with a product (a unit, subsystem, instrument or whole spacecraft) so that the customer can integrate, test and operate it. It defines what data is delivered, not how (spreadsheets, XML or databases are out of scope), and assumes missions follow ECSS-E-ST-50, ECSS-E-ST-70, the PUS (ECSS-E-ST-70-41) and PLUTO (ECSS-E-ST-70-32). In ESA practice it is the standard-level counterpart of mission databases such as the SCOS-2000 MIB.

The standard introduces the space system model (SSM): a hierarchy of system elements, each with activities (telecommands and procedures), reporting data (parameters and compound parameters) and events. Chapter 5 sets conventions: railroad diagrams, naming, and simple data types, including the conventional types and the PUS PTC/PFC types, enumerations, value-type sets and complex types defined by languages. Chapter 6 gives the requirements as data tables (Table 6-1 to 6-111): exchange and configuration control of the electronic database, complex types (activity calls, expressions, interpretation functions, procedures, synthetic parameters, value sets), product configuration, system element data (system, application processes, the PUS service tailoring variables, MAPs, VCs, functions, memories, stores, CPDU and devices), reporting data (parameter numbers, raw PTC/PFC, interpretation/calibration, compound parameters, synthetic reporting data, limit, status and delta checks), activities (arguments, execution and verification data, telecommands with service type and subtype, MAP and priority, procedures) and events.

Annex A (informative) summarises, for each PUS-A-era standard service from TC verification to event/action, the service model, a tailoring flowchart and packet structures. Annex B gives EBNF grammars for the data types and the languages EXPL (expressions), IFL (interpretation functions), SPEL (synthetic parameters, with trigger, declaration and main bodies), PLUTO and VAL.


## Key points

- The standard defines the monitoring and control data that a supplier delivers with a product so that the customer can perform integration, testing and mission operations; how the data is provided (e.g. spreadsheets or XML) is outside its scope. *(PDF p. 10)*
- It assumes missions conform to ECSS-E-ST-50, ECSS-E-ST-70, ECSS-E-ST-70-41 (PUS) and ECSS-E-ST-70-32 (PLUTO). *(PDF p. 10)*
- A parameter is defined as the lowest level of elementary information that has a meaning for monitoring the space system; a synthetic parameter is reporting data generated within the monitoring and control system by an expression. *(PDF p. 13)*
- The space system model (SSM) is a hierarchy of system elements mirroring the functional breakdown (system, subsystem, set, equipment, assembly, part or module), each carrying activities, reporting data and events. *(PDF p. 15)*
- Simple data types include Boolean, integer, unsigned integer, real, bit, octet and character strings, absolute and relative time, and the PUS types identified by PTC and PFC (e.g. PTC 1 PFC 0 is Boolean with TRUE = 1). *(PDF p. 24)*
- The product data schema must be computer-processable and lossless on re-import, the electronic database must be under configuration management with identification data (ID, version, date, supplier, files and checksums), and each digital file must be compressed with a standard tool. *(PDF p. 38)*
- Synthetic parameter evaluations return engineering values directly, can be triggered on update of reporting data or on events, and support conditional branching, typed local variables and persistent variables. *(PDF p. 41)*
- For packet parameters, the 'Parameter Number' (PUS Parameter#) is delivered, with value 0 not used and numbers assigned system-wide; raw values are described by PTC and PFC and translated by an interpretation function. *(PDF p. 101)*
- Limit-check data consist of an ordered list of limit sets, each with a validity condition (the first TRUE one applies), upper and lower danger and warning limits, and an activity call as corrective action for each limit. *(PDF p. 108)*
- Telecommand data include the PUS service type and subtype, the default application process, and a priority flag that forces a MAP ID for high-priority (e.g. CPDU) commands. *(PDF p. 119)*
- Annex A presents, for each standard PUS service, the service model, a yes/no tailoring flowchart with Boolean tailoring variables, and the packet structures with field data types. *(PDF p. 127)*
- SPEL definitions have the form 'synthetic parameter [Trigger Body] [Declaration Body] Main Body end synthetic parameter', with triggers 'on event' or 'on update of'. *(PDF p. 236)*


## Cited by these wiki pages (22)

- [Calibration in the MIB](../mib/calibration.md)
- [Downlink: from on-board parameter to operator display](../overview/downlink.md)
- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS-E-ST-70-31C: monitoring and control data definition](../ecss/e-st-70-31c.md)
- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [How it all fits together](../overview/index.md)
- [Monitoring checks: limits and out-of-limits](../mib/monitoring-checks.md)
- [Monitoring in the MIB: parameters and packets](../mib/monitoring.md)
- [ST[04] Parameter statistics reporting](../ecss/pus/st04-parameter-statistics.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [ST[17] Test](../ecss/pus/st17-test.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The MIB: Mission Information Base](../mib/index.md)
- [The standards landscape](../overview/standards-map.md)
- [Worked example: decoding a real Solar Orbiter telemetry packet](../overview/worked-example-tm.md)
- [XTCE: XML Telemetric and Command Exchange (CCSDS 660)](../ccsds/xtce.md)


??? abstract "Contents (56 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Introduction | 9 |
    | 1 | Scope | 10 |
    | 2 | Normative references | 11 |
    | 3 | Terms, definitions and abbreviated terms | 12 |
    | 4 | Background and context | 15 |
    | 4.1 | The space system model | 15 |
    | 4.2 | Monitoring and control view of the SSM | 16 |
    | 5 | Conventions | 20 |
    | 5.1 | Data definition | 20 |
    | 5.2 | Railroad diagrams | 21 |
    | 5.3 | Case sensitivity | 22 |
    | 5.4 | Names | 22 |
    | 5.5 | Data types | 24 |
    | 5.5.2.2 | PUS Data Types | 30 |
    | 6 | Monitoring and control data requirements | 38 |
    | 6.1 | Data exchange | 38 |
    | 6.2 | Specification of complex data types | 39 |
    | 6.3 | Product data | 42 |
    | 6.4 | Data population | 47 |
    | 6.5 | System element data | 49 |
    | 6.5.4 | Application process data | 53 |
    | 6.5.5 | Service data | 55 |
    | 6.6 | Reporting data | 99 |
    | 6.6.3 | Parameters | 101 |
    | 6.6.4 | Compound parameters | 104 |
    | 6.6.5 | Synthetic reporting data | 106 |
    | 6.6.6 | Checking data | 107 |
    | 6.7 | Activities | 112 |
    | 6.7.3 | Activity execution data | 115 |
    | 6.7.4 | Telecommands | 119 |
    | 6.7.5 | Procedures | 124 |
    | 6.8 | Events | 126 |
    | Annex A | PUS service tailoring (informative) | 127 |
    | A.2 | Telecommand verification service | 128 |
    | A.3 | Device command distribution service | 132 |
    | A.4 | Housekeeping and diagnostic data reporting service | 135 |
    | A.5 | Parameter statistics reporting service | 149 |
    | A.6 | Event reporting service | 152 |
    | A.7 | Memory management service | 154 |
    | A.8 | Function management service | 159 |
    | A.9 | Time management service | 160 |
    | A.10 | On-board operations scheduling service | 163 |
    | A.11 | On-board monitoring service | 171 |
    | A.12 | Large data transfer service | 181 |
    | A.13 | Packet forwarding control service | 186 |
    | A.14 | On-board storage and retrieval service | 191 |
    | A.15 | Test service | 199 |
    | A.16 | On-board operations procedure service | 200 |
    | A.17 | Event/action service | 204 |
    | Annex B | Data type definitions (informative) | 208 |
    | B.5 | EXPL - Expression Language | 218 |
    | B.6 | IFL - Interpretation Function Language | 222 |
    | B.7 | SPEL - Synthetic Parameter Expression Language | 226 |
    | B.8 | PLUTO – Procedure Language | 236 |
    | B.9 | VAL – Value Language | 237 |
    |  | Bibliography | 240 |


## Documents this one references (25)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering - Communications |  | normative |
|  | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering - Ground systems and operations - |  | normative |
|  | [ECSS-E-ST-70-01](../references/index.md#ref-ecss-e-st-70-01) | Space engineering - On board control procedures |  | normative |
|  | [ECSS-E-ST-70-11](../references/index.md#ref-ecss-e-st-70-11) | Space engineering - Space segment operability |  | normative |
|  | [ECSS-E-ST-70-32](../references/index.md#ref-ecss-e-st-70-32) | Space engineering - Test and operations procedure language |  | normative |
|  | [ECSS-E-ST-70-41](../references/index.md#ref-ecss-e-st-70-41) | Space engineering - Telemetry and telecommand packet utilization |  | normative |
|  | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
|  | [ECSS-E-ST-10](../references/index.md#ref-ecss-e-st-10) | Space engineering – System engineering – general requirements |  | bibliography |
|  | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering – Communications |  | bibliography |
|  | [ECSS-E-ST-50-03](../references/index.md#ref-ecss-e-st-50-03) | Space engineering – Space data links – Telemetry transfer frame protocol |  | bibliography |
|  | [ECSS-M-ST-40](../references/index.md#ref-ecss-m-st-40) | Space project management - Configuration and information management |  | bibliography |
|  | [CCSDS 102.0-B-5](../references/index.md#ref-ccsds-102-0-b-5) | Packet Telemetry | Blue Book, Issue 5 November 2000 | bibliography |
|  | [CCSDS 201.0-B-3](../references/index.md#ref-ccsds-201-0-b-3) | Telecommand Part 1 - Channel Service | Blue Book June 2000 | bibliography |
|  | [CCSDS 202.0-B-3](../references/index.md#ref-ccsds-202-0-b-3) | Telecommand Part 2 - Data Routing Service | Blue Book June 2001 | bibliography |
|  | [CCSDS 202.1-B-2](../references/index.md#ref-ccsds-202-1-b-2) | Telecommand Part 2.1 - Command Operation Procedures | Blue Book June 2001 | bibliography |
|  | [CCSDS 203.0-B-2](../references/index.md#ref-ccsds-203-0-b-2) | Telecommand Part 3 - Data Management Service | Blue Book June 2001 | bibliography |
|  | [CCSDS 301.0-B-3](../references/index.md#ref-ccsds-301-0-b-3) | Time Code Formats | Blue Book January 2002 | bibliography |
|  | [CCSDS 727.0-b-2](../references/index.md#ref-ccsds-727-0-b-2) | CCSDS File Delivery Protocol (CFDP) | Blue Book, Issue 2 October 2002 | bibliography |
|  | [CCSDS 100.0-G-1](../references/index.md#ref-ccsds-100-0-g-1) | Telemetry: Summary of Concept and Rationale | Green Book December 1987 | bibliography |
|  | [CCSDS 200.0-G-6](../references/index.md#ref-ccsds-200-0-g-6) | Telecommand: Summary of Concept and Rationale | Green Book January 1987 | bibliography |
|  | [CCSDS A30.0-G-3](../references/index.md#ref-ccsds-a30-0-g-3) | CCSDS Glossary | Green Book July 1997 | bibliography |
|  | [ESA-PSS-04-151](../references/index.md#ref-esa-pss-04-151) · [library](esa-pss-04-151-issue1-september1992.md) | Telecommand decoder specification | Issue 1 September 1993 | bibliography |
|  | [ISO/IEC 14977](../references/index.md#ref-iso-iec-14977) | Information technology - Syntactic metalanguage - Extended BNF |  | bibliography |
|  | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS terms and definitions (terms used per clause 3.1) |  | mentioned |
|  | [ECSS-M-ST-00-03C](../references/index.md#ref-ecss-m-st-00-03c) | Tailoring process (cited in Annex A.1) |  | mentioned |

!!! note "Notes"
    Copy obtained from the IRAP Solar Orbiter document server (file name 'ECSS-E-ST-70-31C(31July2008).pdf'), not directly from ecss.nl; content matches the ECSS publication format. PDF page indices equal printed page numbers; the extracted text has an empty 241st page. The text layer uses non-ASCII hyphens (U+2010) in identifiers (e.g. 'ECSS‐E‐ST‐70‐31C'); ASCII hyphens are used in this record. The normative reference to ECSS-E-ST-70 prints a truncated title ('Space engineering - Ground systems and operations -'). The bibliography prints 'CCSDS 727.0-b-2' with a lower-case b. Railroad diagrams and tailoring flowcharts are figures with fragmentary text. Annex A tailoring is based on the PUS as it stood in 2008 (ECSS-E-70-41A service set), not on the 2016 ECSS-E-ST-70-41C.

