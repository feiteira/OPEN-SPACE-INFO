---
title: "ECSS-E-ST-70-01C: On-board control procedures (2010)"
description: "The ECSS standard for on-board control procedures (OBCPs): small programs that an OBCP engine in the on-board software executes and that can be loaded, run and replaced without changing the rest of th"
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-70-01c16april2010]
---

# Space engineering
Spacecraft on-board control procedures

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70-01C</dd><dt>Issue / version</dt><dd>First issue</dd><dt>Date</dt><dd>2010-04-16</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-70-01 Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-70-01 Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>First issue, 16 April 2010; ECSS-E-ST-70-01A and -01B were never issued (change log, p. 3). The document does not state that it is superseded, and no later issue is in the library.</dd><dt>Pages</dt><dd>42</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-70-01C16April2010.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-70-01C16April2010.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:20Z</dd><dt>SHA-256</dt><dd><code>f4992c6902cbf380aa10a31b20bfd47307594905d48f9c1942fdd0863d3407ac</code></dd><dt>Size</dt><dd>952.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-70-01C16April2010.pdf">ECSS-E-ST-70-01C16April2010.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The ECSS standard for **on-board control procedures (OBCPs)**: small programs that an *OBCP engine* in the on-board software executes and that can be loaded, run and replaced without changing the rest of the flight software. It sets out a mission-independent OBCP concept that serves system, software, AIT and operations engineers. It gives OBCPs a lifecycle independent of the main OBSW, and it builds on the PUS (ECSS-E-70-41, especially **service 18**, the on-board operations procedure service) and on ECSS-E-ST-70-31 monitoring and control data.

What it contains:

* **Concept** (clause 4): stakeholders and uses, such as platform and payload functions, late FDIR tuning, one-shot deployments, test automation, fault injection in AIT and on-board execution of operations procedures for autonomy. It distinguishes **OBAPs** (on-board application procedures, part of the qualified spacecraft design) from **OBOPs** (on-board operations procedures, used to operate it). It also describes the OBCP system: a ground preparation environment, a ground execution environment and the on-board engines.
* **Capabilities** (clause 5): OBCP structure (identifier, arguments, declaration, preconditions, main, confirmation and contingency bodies, steps, local functions), the required **language features** (formal EBNF syntax, data types, engineering units, waits, parameter and activity access with verification stages, events), preparation tools (editor, checkers, reports, step-by-step debugging, flight-representative validation, worst-case memory and timing), the **state model** (in store, inactive, running, held) with Load/Activate/Suspend/Resume/Stop/Abort/Delete mapped to service 18 subtypes, a code checksum, and on-board housekeeping, loading policy and scheduling.
* **Engineering processes** (clause 6): OBAP versus OBSW and OBOP versus ground trade-offs, management milestones (SRR, software PDR, qualification), and ECSS-E-ST-40 or ECSS-E-ST-70 processes for OBAPs and OBOPs respectively.


## Key points

- OBCPs had been implemented ad hoc on several European missions over the previous 25 years; the standard defines a mission-independent concept that conforms with and extends ECSS-E-70-41 and ECSS-E-ST-70-31. *(PDF p. 6)*
- Missions implementing OBCPs are assumed to be compliant with ECSS-E-70-41, whose services support OBCP operation and ground interaction. *(PDF p. 7)*
- An OBCP is a software program executed by an OBCP engine that can easily be loaded, executed and replaced on board; OBCP code is the loadable form (historically token code, executable code or bytecode), called procedure code in service 18 of ECSS-E-70-41A. *(PDF p. 9)*
- OBCP operations are initiated by ECSS-E-70-41 Service 18 telecommands. *(PDF p. 10)*
- Two types: On-board Application Procedures (OBAP), part of the basic spacecraft functionality and qualified with it (historically 'Application Program' or 'Flight Application Program'), and On-Board Operations Procedures (OBOP), used to operate the spacecraft and not part of its qualification. *(PDF p. 14)*
- The OBCP system has a ground preparation environment, a ground execution environment and on-board OBCP engines (optionally with OBCP stores); OBCPs live in the engineering data repository defined by ECSS-E-ST-70-31. *(PDF p. 17)*
- Each OBCP has a unique OBCP Identifier assigned by the ground and may have arguments; it consists of optional declaration, preconditions, confirmation and contingency handling bodies and a mandatory main body, executed in the order declaration, preconditions, main, confirmation. *(PDF p. 18)*
- The OBCP language syntax shall be formally specified, for example with ISO EBNF (ISO/IEC 14977). *(PDF p. 19)*
- The ground system uplinks OBCPs by telecommand as OBCP code; OBCP management and operation telecommands are based on the ECSS-E-70-41 on-board operations procedure service, while the memory management service is reserved for anomaly investigation and exceptional cases. *(PDF p. 26)*
- OBCP execution states: in store; in engine, either inactive or active (running or held). *(PDF p. 27)*
- Engine operations map to service 18 subtypes: Load (1), Delete (2), Activate (3), Stop (4), Suspend (5), Resume (6), Communicate Parameters (7), Abort (12); a stopped OBCP cannot be resumed from that point. *(PDF p. 28)*
- A ground-generated checksum is loaded with the OBCP code and verified at load time; on failure the engine fails the Load request with a telecommand verification failure. Runtime errors and on-board-commanded OBCP requests are reported by event reports. *(PDF p. 29)*
- A given on-board application process shall implement at most one OBCP engine. *(PDF p. 29)*
- The OBCP management process output is reviewed at the system requirements review (SRR); OBCP engine and preparation environment capabilities are frozen at the software PDR; OBAP validation is completed before system qualification. *(PDF p. 36)*
- OBAPs follow the ECSS-E-ST-40 software lifecycle; OBOPs follow the ECSS-E-ST-70 operations procedure engineering process. *(PDF p. 41)*


## Cited by these wiki pages (8)

- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (31 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 6 |
    | 1 | Scope | 7 |
    | 2 | Normative references | 8 |
    | 3 | Terms, definitions and abbreviated terms | 9 |
    | 3.1 | Terms from other standards | 9 |
    | 3.2 | Terms specific to the present standard | 9 |
    | 3.3 | Abbreviated terms | 10 |
    | 4 | The OBCP concept | 12 |
    | 4.1 | Introduction | 12 |
    | 4.2 | Stakeholders and application areas for OBCPs | 12 |
    | 4.3 | Types of OBCP | 14 |
    | 4.4 | The OBCP system | 15 |
    | 5 | OBCP system capabilities | 18 |
    | 5.1 | OBCP structure | 18 |
    | 5.2 | OBCP language capabilities | 19 |
    | 5.3 | The OBCP preparation environment | 23 |
    | 5.4 | The OBCP execution environment | 26 |
    | 5.4.1 | Ground capabilities | 26 |
    | 5.4.2 | OBCP monitoring and control | 26 |
    | 5.4.3 | OBCP integrity | 29 |
    | 5.4.4 | On-board capabilities | 29 |
    | 6 | OBCP engineering processes | 34 |
    | 6.1 | Introduction | 34 |
    | 6.2 | Overall management process of the OBCP system | 35 |
    | 6.2.2 | OBAP vs. OBSW: criteria and trade-off analysis | 38 |
    | 6.2.3 | OBOP vs. ground-based operations | 39 |
    | 6.2.4 | Trade-off between OBCP engine capability and engineering effort | 40 |
    | 6.2.5 | Overall organization and management | 40 |
    | 6.3 | OBCP engineering | 41 |
    |  | Bibliography | 42 |


## Documents this one references (10)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system - Glossary of terms |  | normative |
| ECSS-E-ST-40 | [ECSS-E-ST-40](../references/index.md#ref-ecss-e-st-40) | Space engineering - Software |  | normative |
| ECSS-E-ST-70 | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering - Ground systems and operations |  | normative |
| ECSS-E-ST-70-31 | [ECSS-E-ST-70-31](../references/index.md#ref-ecss-e-st-70-31) | Space engineering - Ground systems and operations - Monitoring and control data definition |  | normative |
| ECSS-E-70-41 | [ECSS-E-70-41](../references/index.md#ref-ecss-e-70-41) | Space engineering - Ground systems and operations - Telemetry and telecommand packet utilization |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-10 | [ECSS-E-ST-10](../references/index.md#ref-ecss-e-st-10) | Space engineering – System engineering general requirements |  | bibliography |
| ECSS-Q-ST-80 | [ECSS-Q-ST-80](../references/index.md#ref-ecss-q-st-80) | Space product assurance – Software product assurance |  | bibliography |
| ISO/IEC 14977:1996 | [ISO/IEC 14977:1996](../references/index.md#ref-iso-iec-14977-1996) | Information Technology - Syntactic Metalanguage - Extended BNF - First Edition | First Edition 1996 | bibliography |
|  | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Service 18 of ECSS-E-70-41A (where OBCP code is called procedure code) |  | mentioned |

!!! note "Notes"
    Written before PUS-C: it cites the undated ECSS-E-70-41 (whose 2003 'A' issue is in the library as ecss-e-70-41a-30jan2003-pus; it names ECSS-E-70-41A explicitly on p. 10), not ECSS-E-ST-70-41C (2016, in the library as ecss-e-st-70-41c-15april2016), so the service 18 subtype numbers it quotes should be checked against the PUS issue in use. The extraction carries stray Word bookmark/cross-reference artefacts such as '0B', '1B', '23B' after headings and lone 'X  X' lines (e.g. pp. 3, 6, 13). The introduction bullet ends with ';.' (p. 6), and clause 6.3c reads 'ECSS-E-ST-40,,' (p. 41). Clause 3.1 cites 'ECSS-ST-00-01' (p. 9). Figures 4-1, 5-1 (OBCP state diagram) and 6-1 to 6-3 are graphics; only fragments of Figure 6-3 are extracted (p. 37). Printed page numbers equal PDF page numbers; srcgrep shows 43 PDF pages (the last one blank) while the registry gives 42.

