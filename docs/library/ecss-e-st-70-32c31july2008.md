---
title: "ECSS-E-ST-70-32C: PLUTO procedure language (2008)"
description: "The ECSS standard for automated test and operations procedures."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-70-32c31july2008]
---

# Space engineering
Test and operations procedure language

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70-32C</dd><dt>Issue / version</dt><dd>Second issue</dd><dt>Date</dt><dd>2008-07-31</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Requirements &amp; Standards Division (prepared by the ECSS-E-ST-70-32 Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-70-32 Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue (31 July 2008, editorial changes), following ECSS-E-70-32A (first issue, 24 April 2006); ECSS-E-70-32B was never issued (change log, p. 3). The document does not state that it is superseded, and no later issue is in the library.</dd><dt>Pages</dt><dd>139</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-70-32C31July2008.pdf" rel="noopener">https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-70-32C31July2008.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:18Z</dd><dt>SHA-256</dt><dd><code>96fa8029c6c91cc51f4f3a319e7f90031b1f6c32299937ed24ea6a2b2ce8f4fa</code></dd><dt>Size</dt><dd>1.4 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-70-32C31July2008.pdf">ECSS-E-ST-70-32C31July2008.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The ECSS standard for **automated test and operations procedures**. It does two things. First, it sets the requirements that any language for writing spacecraft test procedures (EGSE, AIV) and flight control procedures (mission control) must meet. Second, it defines a reference language that meets them, **PLUTO** (Procedure Language for Users in Test and Operations). The aim is to reuse procedures from functional testing in mission operations, and to use one common procedure language across missions.

Clause 4 places procedures in the **EMCS** (EGSE and mission control system). They refer to, but never define, the objects of the ECSS-E-ST-70-31 **space system model**: system elements, reporting data (parameters and compound parameters), activities (procedures, telecommands, operating-system calls) and events. Clause 5 holds the normative requirements: goal-oriented procedures built from steps, run in series or in parallel, with preconditions, confirmation and contingency actions; initiating activities with or without waiting for confirmation; reading execution and confirmation status, parameter values, validity and monitoring status; overriding missing functions in early tests; local copies of reporting data; flow control and waits; engineering units; user interaction and logging. Any compliant language must be formally specified in ISO EBNF.

The informative but extensive **Annex A** specifies PLUTO itself. A procedure has declaration, preconditions, main, **watchdog** and confirmation bodies, and steps have the same structure. Execution and confirmation status models apply to procedures, steps and activities, with continuation tests after 'initiate and confirm' statements. The annex then defines the lexical rules, constants and types and every language construct with railroad diagrams, a full EBNF grammar and an index. Annex B lists the SI-based engineering units and their syntax, and Annex C the mathematical, time and string functions. Many constructs come with a short worked PLUTO example script, for instance an 'Activate Freon Loop' procedure.


## Key points

- The procedure is the principal mechanism used to control the space system in pre-launch functional testing and in-orbit operations; the standard sets requirements for any procedure language and defines the reference language PLUTO (procedure language for users in test and operations). *(PDF p. 7)*
- ECSS-E-ST-70 defines two types of flight control procedure (FCP): nominal procedures, the building blocks of the flight operations plan timelines, and contingency procedures for recovery after pre-identified anomalies. *(PDF p. 15)*
- EMCS is the joint term for the EGSE and the mission control system; the procedure language and its development and execution environments are an integral part of any EMCS. *(PDF p. 15)*
- Procedures refer to the space system model of ECSS-E-ST-70-31 (system elements, reporting data, activities, events) but do not define these objects; an activity is a procedure, a telecommand or any EMCS function such as a file transfer. *(PDF p. 16)*
- For procedures the SSM also holds the default execution mode (manual or automatic), the activation mode (permanently active or explicitly initiated) and the procedural script. *(PDF p. 18)*
- Procedure sub-goals can run in series or in parallel; preconditions and confirmation conditions may be specified for procedures and steps, and contingency actions should be taken at the level where the failure occurs. *(PDF p. 19)*
- If an anomaly cannot be rectified, the procedure (or step) raises an event to a higher level, achieves the goal by other means and terminates, or aborts; the body is suspended while a contingency action runs. *(PDF p. 20)*
- Procedures must be able to read an activity's execution or confirmation status and times, reporting data values and sampling time, parameter validity and monitoring status (limit, delta, expected status, status consistency), and the last occurrence time of an event. *(PDF p. 20)*
- When a space system function is unavailable (e.g. in an early test phase), a procedure must be able to replace it by setting an activity's confirmation status or a parameter's value, validity, monitoring status or sampling time; local copies of reporting data avoid inconsistent samples. *(PDF p. 21)*
- Any compliant language shall be formally specified in ISO EBNF (ISO/IEC 14977); PLUTO, its engineering units and functions should be used for automating procedures in development and exploitation phases. *(PDF p. 23)*
- A PLUTO procedure has an optional declaration body (local events), optional preconditions body, mandatory main body, optional watchdog body (watchdog steps all initiated in parallel) and optional confirmation body; arguments are defined externally and cannot be changed in the procedure. *(PDF p. 24)*
- Main body statements: set procedure context, initiate in parallel, initiate and confirm step, initiate and confirm activity, initiate activity, inform user and log; a parallel set ends when any one or when all of its members have ended. *(PDF p. 26)*
- Execution status of a procedure goes through 'preconditions', 'executing', 'confirmation' and 'completed'; confirmation status ends as 'confirmed', 'not confirmed' or 'aborted' and is 'not available' before completion. *(PDF p. 29)*
- Only engineering units are case sensitive in PLUTO; all other words, including keywords, are not. *(PDF p. 39)*
- Table A-1 lists the predefined PLUTO types; Tables A-2 to A-7 list the operation and property requests available on activities, steps, reporting data, variables, arguments and events, and Table A-4 the predefined operators. *(PDF p. 6)*


## Cited by these wiki pages (6)

- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70-32C: PLUTO test and operations procedure language](../ecss/e-st-70-32c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (44 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 7 |
    | 1 | Scope | 8 |
    | 2 | Normative references | 9 |
    | 3 | Terms, definitions and abbreviated terms | 10 |
    | 3.1 | Terms from other standards | 10 |
    | 3.2 | Terms specific to the present standard | 10 |
    | 3.3 | Abbreviated terms | 12 |
    | 4 | Context of the procedure language | 13 |
    | 4.1 | Introduction | 13 |
    | 4.2 | EGSE and mission control system (EMCS) | 15 |
    | 5 | Requirements to be satisfied by procedures | 19 |
    | 5.1 | Procedure structure | 19 |
    | 5.2 | Language constructs | 20 |
    | 5.3 | Language specification | 23 |
    | Annex A | The PLUTO language (informative) | 24 |
    | A.1 | The structure of a procedure | 24 |
    | A.1.5 | Procedure watchdog body | 26 |
    | A.1.7 | Structure of a step | 27 |
    | A.2 | The behaviour of a procedure | 29 |
    | A.2.1 | Procedure execution flow | 29 |
    | A.2.2 | Step execution flow | 32 |
    | A.2.3 | Activity execution flow | 34 |
    | A.2.4 | Execution in parallel | 36 |
    | A.2.5 | Continuation following an 'initiate and confirm' statement | 36 |
    | A.3 | PLUTO language definition | 38 |
    | A.3.2 | Language case sensitivity | 39 |
    | A.3.4 | Keywords | 39 |
    | A.3.5 | Identifiers | 40 |
    | A.3.6 | Constants | 41 |
    | A.3.7 | Types | 45 |
    | A.3.8 | System interfaces | 46 |
    | A.3.9 | Language constructs | 47 |
    | A.4 | Extended Backus-Naur form (EBNF) representation of PLUTO language constructs | 105 |
    | A.5 | Index of PLUTO language constructs | 119 |
    | Annex B | Engineering units (informative) | 122 |
    | B.2 | Engineering units and symbols | 122 |
    | B.3 | Engineering units railroad diagrams | 128 |
    | B.4 | EBNF representation of the engineering units | 131 |
    | Annex C | Functions (informative) | 133 |
    | C.2 | Mathematical functions | 133 |
    | C.3 | Time functions | 135 |
    | C.4 | String functions | 136 |
    |  | Bibliography | 139 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ISO/IEC 14977 | [ISO/IEC 14977](../references/index.md#ref-iso-iec-14977) | Information technology - Syntactic metalanguage – Extended BNF |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system – Description, implementation and general requirements |  | bibliography |
| ECSS-E-ST-10 | [ECSS-E-ST-10](../references/index.md#ref-ecss-e-st-10) | Space engineering – System engineering general requirements |  | bibliography |
| ECSS-E-ST-10-02 | [ECSS-E-ST-10-02](../references/index.md#ref-ecss-e-st-10-02) | Space engineering – Verification |  | bibliography |
| ECSS-E-ST-10-03 | [ECSS-E-ST-10-03](../references/index.md#ref-ecss-e-st-10-03) | Space engineering – Testing |  | bibliography |
| ECSS-E-ST-50 | [ECSS-E-ST-50](../references/index.md#ref-ecss-e-st-50) | Space engineering – Communications |  | bibliography |
| ECSS-E-ST-70 | [ECSS-E-ST-70](../references/index.md#ref-ecss-e-st-70) | Space engineering – Ground systems and operations |  | bibliography |
| ECSS-E-ST-70-31 | [ECSS-E-ST-70-31](../references/index.md#ref-ecss-e-st-70-31) | Space engineering – Ground systems and operations – Monitoring and control data definition |  | bibliography |
| ECSS-E-ST-70-41 | [ECSS-E-ST-70-41](../references/index.md#ref-ecss-e-st-70-41) | Space engineering – Telemetry and telecommand packet utilization |  | bibliography |
| ISO/IEC 14977 | [ISO/IEC 14977](../references/index.md#ref-iso-iec-14977) | Information technology – Syntactic metalanguage – Extended BNF |  | bibliography |
| Voluntocracy 2003 | [catalogue](../references/index.md#ref-representation-of-numerical-values-and-si-units-in-character-strings-for-informa) | Representation of numerical values and SI units in character strings for information interchange (http://swiss.csail.mit.edu/~jaffer/MIXF) | 2003 | bibliography |

!!! note "Notes"
    Annex A is labelled informative but is the PLUTO specification that requirement 5.3b recommends. Railroad (syntax) diagrams in A.3 and B.3 are graphics; the EBNF grammar in A.4 (pp. 105-118) and the many worked PLUTO script examples are extracted as text. Clause 4.2.2 says 'An example of a space system model is shown in Figure 4-1' (p. 16) where Figure 4-2 (p. 17) is meant. Figure 4-1 labels are truncated in the extraction ('Platfor', 'Payloa', p. 14). The abbreviation table splits 'PLUTO' from its meaning (p. 12). The extraction uses Unicode non-breaking hyphens (U+2011) in document IDs. Related library items: ECSS-E-ST-70-31C (ecss-e-st-70-31c) defines the space system model that PLUTO refers to; ECSS-E-ST-70C (ecss-e-st-70c31july2008) the flight control procedures. Printed page numbers equal PDF page numbers; srcgrep shows 140 PDF pages (the last one blank) while the registry gives 139.

