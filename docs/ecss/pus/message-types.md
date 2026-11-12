---
title: PUS message type catalogue
description: Every standard PUS-C message type TC[x,y] and TM[x,y] of ECSS-E-ST-70-41C in one sortable table (name, request or report, subservice, Annex C applicability, clauses and pages), followed by a count of the TM packet and TC definitions per type and subtype in the Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL, with mission-specific types marked.
tags: [ECSS, PUS, Telecommand, Telemetry, Services, Solar Orbiter, MIB]
sources: [ecss-e-st-70-41c-15april2016, ecss-e-70-41a-30jan2003-pus, sol-s-astr-tn-00079-07, icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# PUS message type catalogue

This page is a reference card for the [Packet Utilization Standard](index.md). The first part lists
**all 318 standard message types** of ECSS-E-ST-70-41C (PUS-C, 15 April 2016): 240 requests (TC)
and 78 reports (TM) in 20 service types. It was compiled from the clause 8 interface headings, which
name each message type and give its layout, and from Annex C, which summarises every message type
with its applicability constraint.[^c-annexc1][^c-clause8] The second part shows how one real
mission database uses the type and subtype numbers: the
[Solar Orbiter MIB](../../missions/solar-orbiter/mib.md) release **MIB__20250916M25925PFMS001_SOL**
(16 September 2025), a PUS-A mission database.[^mib25][^solo-ad1]

!!! info "At a glance"
    | Item | PUS-C (ECSS-E-ST-70-41C) | Solar Orbiter MIB, 2025-09-16 release |
    |---|---|---|
    | Service types | 20 standard types (1-23 without 7, 10 and 16)[^c-table41] | type 0 and types 1 to 22 except 4, 7 and 10, plus 70 types from 128 to 255[^mib25] |
    | Message types | 318 (240 TC, 78 TM) in 33 subservice types[^c-annexc1] | 1 395 distinct (type, subtype) pairs: 227 below type 128, 1 168 from 128 up[^mib25] |
    | Definitions | - | 11 150 TM packet definitions (pid), 5 318 nominal TC definitions (ccf)[^mib25] |
    | Highest subtype | 44, TC[3,44][^c-clause8] | 255, used once: TC (234,255) "forwardTCthroughSIIS", APID 1164, in the PHI range 231-235; the highest TM subtype is 253[^mib25][^solo-list] |

## How a message type is identified

A message type is identified by the pair (service type ID, message subtype ID) and carried in the
secondary header of every TC and TM packet (see [PUS packet structures](packets.md)). Both IDs
range from 1 to 255. Standard service types use IDs up to 127 and mission-specific types 128 or
above; within a standard service type, the standard subtypes are at most 127 and a mission may add
its own from 128 up.[^c-531][^c-5331] PUS-A used the same split: types and subtypes 0 to 127 reserved
for the standard, 128 to 255 for missions.[^a-ranges] This wiki writes requests as **TC[x,y]** and
reports as **TM[x,y]**, following the standard's own notation.[^c-annexc1]

## Applicability constraints

Each message type inherits the applicability constraint of its capability type, which tells a
mission whether it must provide it, may provide it, or may provide it only together with another
capability.[^c-annexc1][^c-534] Annex C uses these labels:

| Label in Annex C | Meaning | Count in PUS-C |
|---|---|---|
| minimum | always provided by every subservice of that type | 81 |
| by declaration | provided if the mission says so when specifying the subservice | 100 |
| implied by X | provided automatically whenever capability X is provided | 53 |
| requires X | may be declared only if capability X is provided | 28 |
| X response | the report sent in answer to request X | 58 (2 of them also "minimum") |

The counts are this wiki's tally of the catalogue below. TM[3,25] and TM[3,26] are counted twice:
both are minimum periodic reports and also the responses to the one-shot requests TC[3,27] and
TC[3,28].[^c-annexc-3]

## Summary per service type

| Service type | Name | Subservice types (Annex C) | TC | TM | Total | Highest subtype | Unused subtypes below the highest | Message types with "minimum" applicability |
|---|---|---|---|---|---|---|---|---|
| [ST[01]](st01-request-verification.md) | request verification | Acceptance and reporting; Execution reporting; Routing and reporting | 0 | 9 | 9 | 10 | 9 | TM[1,1], TM[1,2], TM[1,3], TM[1,4], TM[1,5], TM[1,6], TM[1,7], TM[1,8], TM[1,10] |
| [ST[02]](st02-device-access.md) | device access | Device access | 8 | 3 | 11 | 12 | 3 | - |
| [ST[03]](st03-housekeeping.md) | housekeeping | Housekeeping reporting; Diagnostic reporting; Parameter functional reporting configuration | 25 | 7 | 32 | 44 | 13-24 | TC[3,2], TC[3,4], TC[3,7], TC[3,8], TM[3,25], TM[3,26], TC[3,37] |
| [ST[04]](st04-parameter-statistics.md) | parameter statistics reporting | Parameter statistics reporting | 7 | 2 | 9 | 9 | none | TC[4,1], TC[4,3] |
| [ST[05]](st05-event-reporting.md) | event reporting | Event reporting | 3 | 5 | 8 | 8 | none | TM[5,1], TM[5,2], TM[5,3], TM[5,4] |
| [ST[06]](st06-memory-management.md) | memory management | Structured data memory management; Raw data memory management; Common memory management; Memory configuration | 17 | 5 | 22 | 22 | none | TC[6,1], TC[6,2], TC[6,3], TC[6,5], TC[6,12] |
| [ST[08]](st08-function-management.md) | function management | Function management | 1 | 0 | 1 | 1 | none | TC[8,1] |
| [ST[09]](st09-time-management.md) | time management | Time reporting control; Time reporting | 1 | 2 | 3 | 3 | none | TC[9,1] |
| [ST[11]](st11-time-based-scheduling.md) | time-based scheduling | Time-based scheduling | 23 | 4 | 27 | 27 | none | TC[11,1], TC[11,2], TC[11,3], TC[11,4] |
| [ST[12]](st12-onboard-monitoring.md) | on-board monitoring | Parameter monitoring; Functional monitoring | 22 | 6 | 28 | 28 | none | TC[12,1], TC[12,2], TM[12,12], TC[12,15], TC[12,16], TC[12,17], TC[12,18], TC[12,19], TC[12,20] |
| [ST[13]](st13-large-packet-transfer.md) | large packet transfer | Large packet downlink; Large packet uplink | 3 | 4 | 7 | 16 | 4-8, 12-15 | TM[13,1], TM[13,2], TM[13,3], TC[13,9], TC[13,10], TC[13,11], TM[13,16] |
| [ST[14]](st14-real-time-forwarding-control.md) | real-time forwarding control | Real-time forwarding control | 12 | 4 | 16 | 16 | none | TC[14,1], TC[14,2] |
| [ST[15]](st15-onboard-storage-retrieval.md) | on-board storage and retrieval | Storage and retrieval; Packet selection | 30 | 7 | 37 | 40 | 7-8, 10 | TC[15,1], TC[15,2], TC[15,3], TC[15,4], TC[15,14], TC[15,15] |
| [ST[17]](st17-test.md) | test | Test | 2 | 2 | 4 | 4 | none | TC[17,1], TC[17,3] |
| [ST[18]](st18-onboard-operations-procedure.md) | on-board control procedure (Annex C heading: on-board operations procedure) | OBCP management; OBCP engine management | 18 | 2 | 20 | 22 | 10-11 | TC[18,3], TC[18,4], TC[18,8], TC[18,12], TC[18,21], TC[18,22] |
| [ST[19]](st19-event-action.md) | event-action | Event-action | 9 | 2 | 11 | 11 | none | TC[19,1], TC[19,4], TC[19,5], TC[19,8], TC[19,9] |
| [ST[20]](st20-onboard-parameter-management.md) | parameter management | Parameter management | 5 | 2 | 7 | 7 | none | TC[20,1] |
| [ST[21]](st21-request-sequencing.md) | request sequencing | Request sequencing | 10 | 4 | 14 | 14 | none | TC[21,4], TC[21,5] |
| [ST[22]](st22-position-based-scheduling.md) | position-based scheduling | Position-based scheduling | 24 | 4 | 28 | 28 | none | TC[22,1], TC[22,2], TC[22,3], TC[22,4] |
| [ST[23]](st23-file-management.md) | file management | File handling; File copy | 20 | 4 | 24 | 24 | none | TC[23,1], TC[23,2], TC[23,3], TC[23,14] |

Service types 7, 10 and 16 are reserved in PUS-C. The names in the table follow Table 4-1.[^c-table41][^c-annexc1] The gaps in the subtype numbering
mostly mark PUS-A message types that PUS-C dropped. For example, ST[03] skips 13 to 24, which in
PUS-A held the sampling-time offset, generation-mode selection and unfiltered-parameter messages,
and ST[13] skips 4 to 8 and 12 to 15, PUS-A's acknowledgement, retransmission and abort messages.[^c-annexc-3][^a-table43] See
[PUS-A vs PUS-C](pus-a-vs-pus-c.md) for the full comparison.

## Rules that span several message types

Some Annex C rows constrain a set of capabilities rather than one message type:[^c-annexc-groups]

| Clause | Rule | Annex C applicability |
|---|---|---|
| 6.2.3a | at least one of TC[2,1], TC[2,2], TC[2,4], TC[2,7] | minimum |
| 6.4.6.1a | support for periodic statistics reporting (implies TC[4,4] and TC[4,5]) | by declaration |
| 6.6.6.1.1a | memory scrubbing support (implies TC[6,13] and TC[6,14]) | by declaration |
| 6.6.6.2.1a | memory write-protection support (implies TC[6,15] and TC[6,16]) | by declaration |
| 6.9.4.1a | exactly one of TM[9,2] (CUC) and TM[9,3] (CDS) | minimum |
| 6.12.3.9.1b | if TC[12,5] is provided, at least one of the two delete capabilities | implied by TC[12,5] |
| 6.14.3.2.1a / b / c | forwarding control per housekeeping structure, per diagnostic structure, per event definition | by declaration |
| 6.15.3.5.1a | by-time-range retrieval (implies TC[15,9] and TC[15,17]) | by declaration |
| 6.15.4.2.1a / b / c | storage control per housekeeping structure, per diagnostic structure, per event definition | by declaration |
| 6.18.4.4.1a | at least one of TC[18,1], TC[18,13], TC[18,19] | minimum |
| 6.19.8.2a | at least one of TC[19,2], TC[19,3] | implied by TC[19,1] |
| 6.21.5.1a | at least one of TC[21,1], TC[21,2], TC[21,8] | minimum |

!!! note "Printed slips found while compiling"
    Annex C is informative, and a few of its cells disagree with the normative clauses. Annex C
    lists the 6.12.3.9.1b alternatives as "TC[12,4], TC[12,5]", while the requirement itself names
    the delete-all and delete capabilities, TC[12,4] and TC[12,6].[^c-annexc-12][^c-61239]
    It gives the third response row of TM[11,10] as "TC[11,10] response" where TC[11,16] is
    meant. For TM[15,36] it prints "TC[15,36] response" and "6.15.4.5.3" as the interface clause,
    for TC[15,35] and 8.15.2.33. For TM[17,4] it prints "TC[17,4] response" for TC[17,3], and
    "TC[15.25]" with a dot.[^c-annexc-slips] The catalogue below uses the corrected values. It
    also writes the name of TM[5,4] in lower case, as Annex C does; the clause 8.5.2.4 heading
    capitalises it.[^c-clause8]

## The catalogue

The table has one row per message type. **System** is the clause 6 requirement and **Interface**
the clause 8 layout, with its PDF page. **Annex C** gives the page of the summary row. Message type
links lead to the service pages. Click a column heading to sort.[^c-annexc1][^c-clause8]

<div class="sortable-table" markdown>

| ST | Sub | Message type | Name | Kind | Subservice | Applicability (Annex C) | System | Interface | Annex C |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | [TM[1,1]](st01-request-verification.md) | successful acceptance verification report | report | Acceptance and reporting | minimum | 6.1.4.2 | 8.1.2.1 (p. 445) | p. 628 |
| 1 | 2 | [TM[1,2]](st01-request-verification.md) | failed acceptance verification report | report | Acceptance and reporting | minimum | 6.1.4.3 | 8.1.2.2 (p. 446) | p. 628 |
| 1 | 3 | [TM[1,3]](st01-request-verification.md) | successful start of execution verification report | report | Execution reporting | minimum | 6.1.5.1.1 | 8.1.2.3 (p. 446) | p. 628 |
| 1 | 4 | [TM[1,4]](st01-request-verification.md) | failed start of execution verification report | report | Execution reporting | minimum | 6.1.5.1.2 | 8.1.2.4 (p. 447) | p. 629 |
| 1 | 5 | [TM[1,5]](st01-request-verification.md) | successful progress of execution verification report | report | Execution reporting | minimum | 6.1.5.2.1 | 8.1.2.5 (p. 447) | p. 629 |
| 1 | 6 | [TM[1,6]](st01-request-verification.md) | failed progress of execution verification report | report | Execution reporting | minimum | 6.1.5.2.2 | 8.1.2.6 (p. 448) | p. 629 |
| 1 | 7 | [TM[1,7]](st01-request-verification.md) | successful completion of execution verification report | report | Execution reporting | minimum | 6.1.5.3.1 | 8.1.2.7 (p. 448) | p. 629 |
| 1 | 8 | [TM[1,8]](st01-request-verification.md) | failed completion of execution verification report | report | Execution reporting | minimum | 6.1.5.3.2 | 8.1.2.8 (p. 449) | p. 629 |
| 1 | 10 | [TM[1,10]](st01-request-verification.md) | failed routing verification report | report | Routing and reporting | minimum | 6.1.3.3 | 8.1.2.9 (p. 450) | p. 629 |
| 2 | 1 | [TC[2,1]](st02-device-access.md) | distribute on/off device commands | request | Device access | by declaration | 6.2.4.2 | 8.2.2.1 (p. 451) | p. 629 |
| 2 | 2 | [TC[2,2]](st02-device-access.md) | distribute register load commands | request | Device access | by declaration | 6.2.5.2 | 8.2.2.2 (p. 451) | p. 629 |
| 2 | 4 | [TC[2,4]](st02-device-access.md) | distribute CPDU commands | request | Device access | by declaration | 6.2.6.2 | 8.2.2.3 (p. 451) | p. 630 |
| 2 | 5 | [TC[2,5]](st02-device-access.md) | distribute register dump commands | request | Device access | requires TC[2,2] | 6.2.5.3 | 8.2.2.4 (p. 452) | p. 629 |
| 2 | 6 | [TM[2,6]](st02-device-access.md) | register dump report | report | Device access | response to TC[2,5] | 6.2.5.3 | 8.2.2.5 (p. 452) | p. 630 |
| 2 | 7 | [TC[2,7]](st02-device-access.md) | distribute physical device commands | request | Device access | by declaration | 6.2.7.1.2 | 8.2.2.6 (p. 453) | p. 630 |
| 2 | 8 | [TC[2,8]](st02-device-access.md) | acquire data from physical devices | request | Device access | implied by TC[2,7] | 6.2.7.1.3 | 8.2.2.7 (p. 453) | p. 630 |
| 2 | 9 | [TM[2,9]](st02-device-access.md) | physical device data report | report | Device access | response to TC[2,8] | 6.2.7.1.3 | 8.2.2.8 (p. 453) | p. 630 |
| 2 | 10 | [TC[2,10]](st02-device-access.md) | distribute logical device commands | request | Device access | requires TC[2,7] | 6.2.7.2.2 | 8.2.2.9 (p. 454) | p. 630 |
| 2 | 11 | [TC[2,11]](st02-device-access.md) | acquire data from logical devices | request | Device access | implied by TC[2,10] | 6.2.7.2.3 | 8.2.2.10 (p. 454) | p. 630 |
| 2 | 12 | [TM[2,12]](st02-device-access.md) | logical device data report | report | Device access | response to TC[2,11] | 6.2.7.2.3 | 8.2.2.11 (p. 455) | p. 630 |
| 3 | 1 | [TC[3,1]](st03-housekeeping.md) | create a housekeeping parameter report structure | request | Housekeeping reporting | by declaration | 6.3.3.5.1 | 8.3.2.1 (p. 456) | p. 630 |
| 3 | 2 | [TC[3,2]](st03-housekeeping.md) | create a diagnostic parameter report structure | request | Diagnostic reporting | minimum | 6.3.4.6 | 8.3.2.2 (p. 456) | p. 631 |
| 3 | 3 | [TC[3,3]](st03-housekeeping.md) | delete housekeeping parameter report structures | request | Housekeeping reporting | implied by TC[3,1] | 6.3.3.5.2 | 8.3.2.3 (p. 457) | p. 630 |
| 3 | 4 | [TC[3,4]](st03-housekeeping.md) | delete diagnostic parameter report structures | request | Diagnostic reporting | minimum | 6.3.4.7 | 8.3.2.4 (p. 457) | p. 631 |
| 3 | 5 | [TC[3,5]](st03-housekeeping.md) | enable the periodic generation of housekeeping parameter reports | request | Housekeeping reporting | by declaration | 6.3.3.4.1 | 8.3.2.5 (p. 458) | p. 630 |
| 3 | 6 | [TC[3,6]](st03-housekeeping.md) | disable the periodic generation of housekeeping parameter reports | request | Housekeeping reporting | implied by TC[3,5] | 6.3.3.4.2 | 8.3.2.6 (p. 458) | p. 630 |
| 3 | 7 | [TC[3,7]](st03-housekeeping.md) | enable the periodic generation of diagnostic parameter reports | request | Diagnostic reporting | minimum | 6.3.4.4 | 8.3.2.7 (p. 459) | p. 631 |
| 3 | 8 | [TC[3,8]](st03-housekeeping.md) | disable the periodic generation of diagnostic parameter reports | request | Diagnostic reporting | minimum | 6.3.4.5 | 8.3.2.8 (p. 459) | p. 631 |
| 3 | 9 | [TC[3,9]](st03-housekeeping.md) | report housekeeping parameter report structures | request | Housekeeping reporting | requires TC[3,1] | 6.3.3.6 | 8.3.2.9 (p. 460) | p. 630 |
| 3 | 10 | [TM[3,10]](st03-housekeeping.md) | housekeeping parameter report structure report | report | Housekeeping reporting | response to TC[3,9] | 6.3.3.6 | 8.3.2.10 (p. 460) | p. 630 |
| 3 | 11 | [TC[3,11]](st03-housekeeping.md) | report diagnostic parameter report structures | request | Diagnostic reporting | requires TC[3,2] | 6.3.4.8 | 8.3.2.11 (p. 461) | p. 631 |
| 3 | 12 | [TM[3,12]](st03-housekeeping.md) | diagnostic parameter report structure report | report | Diagnostic reporting | response to TC[3,11] | 6.3.4.8 | 8.3.2.12 (p. 461) | p. 631 |
| 3 | 25 | [TM[3,25]](st03-housekeeping.md) | housekeeping parameter report | report | Housekeeping reporting | minimum; response to TC[3,27] | 6.3.3.3 | 8.3.2.13 (p. 462) | p. 630, p. 631 |
| 3 | 26 | [TM[3,26]](st03-housekeeping.md) | diagnostic parameter report | report | Diagnostic reporting | minimum; response to TC[3,28] | 6.3.4.3 | 8.3.2.14 (p. 462) | p. 631, p. 632 |
| 3 | 27 | [TC[3,27]](st03-housekeeping.md) | generate a one shot report for housekeeping parameter report structures | request | Housekeeping reporting | by declaration | 6.3.3.7 | 8.3.2.15 (p. 463) | p. 631 |
| 3 | 28 | [TC[3,28]](st03-housekeeping.md) | generate a one shot report for diagnostic parameter report structures | request | Diagnostic reporting | by declaration | 6.3.4.9 | 8.3.2.16 (p. 463) | p. 632 |
| 3 | 29 | [TC[3,29]](st03-housekeeping.md) | append parameters to a housekeeping parameter report structure | request | Housekeeping reporting | requires TC[3,1] | 6.3.3.8 | 8.3.2.17 (p. 463) | p. 631 |
| 3 | 30 | [TC[3,30]](st03-housekeeping.md) | append parameters to a diagnostic parameter report structure | request | Diagnostic reporting | requires TC[3,2] | 6.3.4.10 | 8.3.2.18 (p. 464) | p. 631 |
| 3 | 31 | [TC[3,31]](st03-housekeeping.md) | modify the collection interval of housekeeping parameter report structures | request | Housekeeping reporting | by declaration | 6.3.3.9 | 8.3.2.19 (p. 464) | p. 631 |
| 3 | 32 | [TC[3,32]](st03-housekeeping.md) | modify the collection interval of diagnostic parameter report structures | request | Diagnostic reporting | by declaration | 6.3.4.11 | 8.3.2.20 (p. 465) | p. 632 |
| 3 | 33 | [TC[3,33]](st03-housekeeping.md) | report the periodic generation properties of housekeeping parameter report structures | request | Housekeeping reporting | by declaration | 6.3.3.10 | 8.3.2.21 (p. 465) | p. 631 |
| 3 | 34 | [TC[3,34]](st03-housekeeping.md) | report the periodic generation properties of diagnostic parameter report structures | request | Diagnostic reporting | by declaration | 6.3.4.12 | 8.3.2.22 (p. 466) | p. 632 |
| 3 | 35 | [TM[3,35]](st03-housekeeping.md) | housekeeping parameter report periodic generation properties report | report | Housekeeping reporting | response to TC[3,33] | 6.3.3.10 | 8.3.2.23 (p. 466) | p. 631 |
| 3 | 36 | [TM[3,36]](st03-housekeeping.md) | diagnostic parameter report periodic generation properties report | report | Diagnostic reporting | response to TC[3,34] | 6.3.4.12 | 8.3.2.24 (p. 467) | p. 632 |
| 3 | 37 | [TC[3,37]](st03-housekeeping.md) | apply parameter functional reporting configurations | request | Parameter functional reporting configuration | minimum | 6.3.5.3 | 8.3.2.25 (p. 467) | p. 632 |
| 3 | 38 | [TC[3,38]](st03-housekeeping.md) | create a parameter functional reporting definition | request | Parameter functional reporting configuration | by declaration | 6.3.5.4.1 | 8.3.2.26 (p. 468) | p. 632 |
| 3 | 39 | [TC[3,39]](st03-housekeeping.md) | delete parameter functional reporting definitions | request | Parameter functional reporting configuration | implied by TC[3,38] | 6.3.5.4.2 | 8.3.2.27 (p. 468) | p. 632 |
| 3 | 40 | [TC[3,40]](st03-housekeeping.md) | report parameter functional reporting definitions | request | Parameter functional reporting configuration | requires TC[3,38] | 6.3.5.5 | 8.3.2.28 (p. 469) | p. 632 |
| 3 | 41 | [TM[3,41]](st03-housekeeping.md) | parameter functional reporting definition report | report | Parameter functional reporting configuration | response to TC[3,40] | 6.3.5.5 | 8.3.2.29 (p. 469) | p. 632 |
| 3 | 42 | [TC[3,42]](st03-housekeeping.md) | add parameter report definitions to a parameter functional reporting definition | request | Parameter functional reporting configuration | requires TC[3,38] | 6.3.5.6.1 | 8.3.2.30 (p. 470) | p. 632 |
| 3 | 43 | [TC[3,43]](st03-housekeeping.md) | remove parameter report definitions from a parameter functional reporting definition | request | Parameter functional reporting configuration | implied by TC[3,42] | 6.3.5.6.2 | 8.3.2.31 (p. 471) | p. 632 |
| 3 | 44 | [TC[3,44]](st03-housekeeping.md) | modify the periodic generation properties of parameter report definitions of a parameter functional reporting definition | request | Parameter functional reporting configuration | by declaration | 6.3.5.6.3 | 8.3.2.32 (p. 471) | p. 632 |
| 4 | 1 | [TC[4,1]](st04-parameter-statistics.md) | report the parameter statistics | request | Parameter statistics reporting | minimum | 6.4.5.2 | 8.4.2.1 (p. 473) | p. 633 |
| 4 | 2 | [TM[4,2]](st04-parameter-statistics.md) | parameter statistics report | report | Parameter statistics reporting | response to TC[4,1] | 6.4.5.3 | 8.4.2.2 (p. 473) | p. 633 |
| 4 | 3 | [TC[4,3]](st04-parameter-statistics.md) | reset the parameter statistics | request | Parameter statistics reporting | minimum | 6.4.4 | 8.4.2.3 (p. 474) | p. 633 |
| 4 | 4 | [TC[4,4]](st04-parameter-statistics.md) | enable the periodic parameter statistics reporting | request | Parameter statistics reporting | implied by 6.4.6.1a | 6.4.6.2 | 8.4.2.4 (p. 474) | p. 633 |
| 4 | 5 | [TC[4,5]](st04-parameter-statistics.md) | disable the periodic parameter statistics reporting | request | Parameter statistics reporting | implied by 6.4.6.1a | 6.4.6.3 | 8.4.2.5 (p. 474) | p. 633 |
| 4 | 6 | [TC[4,6]](st04-parameter-statistics.md) | add or update parameter statistics definitions | request | Parameter statistics reporting | by declaration | 6.4.7.1 | 8.4.2.6 (p. 474) | p. 633 |
| 4 | 7 | [TC[4,7]](st04-parameter-statistics.md) | delete parameter statistics definitions | request | Parameter statistics reporting | implied by TC[4,6] | 6.4.7.2 | 8.4.2.7 (p. 475) | p. 633 |
| 4 | 8 | [TC[4,8]](st04-parameter-statistics.md) | report the parameter statistics definitions | request | Parameter statistics reporting | requires TC[4,6] | 6.4.7.3 | 8.4.2.8 (p. 475) | p. 633 |
| 4 | 9 | [TM[4,9]](st04-parameter-statistics.md) | parameter statistics definition report | report | Parameter statistics reporting | response to TC[4,8] | 6.4.7.3 | 8.4.2.9 (p. 475) | p. 633 |
| 5 | 1 | [TM[5,1]](st05-event-reporting.md) | informative event report | report | Event reporting | minimum | 6.5.4 | 8.5.2.1 (p. 477) | p. 633 |
| 5 | 2 | [TM[5,2]](st05-event-reporting.md) | low severity anomaly report | report | Event reporting | minimum | 6.5.4 | 8.5.2.2 (p. 477) | p. 633 |
| 5 | 3 | [TM[5,3]](st05-event-reporting.md) | medium severity anomaly report | report | Event reporting | minimum | 6.5.4 | 8.5.2.3 (p. 478) | p. 633 |
| 5 | 4 | [TM[5,4]](st05-event-reporting.md) | high severity anomaly report | report | Event reporting | minimum | 6.5.4 | 8.5.2.4 (p. 478) | p. 634 |
| 5 | 5 | [TC[5,5]](st05-event-reporting.md) | enable the report generation of event definitions | request | Event reporting | by declaration | 6.5.5.2 | 8.5.2.5 (p. 478) | p. 634 |
| 5 | 6 | [TC[5,6]](st05-event-reporting.md) | disable the report generation of event definitions | request | Event reporting | implied by TC[5,5] | 6.5.5.3 | 8.5.2.6 (p. 479) | p. 634 |
| 5 | 7 | [TC[5,7]](st05-event-reporting.md) | report the list of disabled event definitions | request | Event reporting | requires TC[5,5] | 6.5.5.4 | 8.5.2.7 (p. 479) | p. 634 |
| 5 | 8 | [TM[5,8]](st05-event-reporting.md) | disabled event definitions list report | report | Event reporting | response to TC[5,7] | 6.5.5.4 | 8.5.2.8 (p. 479) | p. 634 |
| 6 | 1 | [TC[6,1]](st06-memory-management.md) | load object memory data | request | Structured data memory management | minimum | 6.6.4.4 | 8.6.2.1 (p. 481) | p. 635 |
| 6 | 2 | [TC[6,2]](st06-memory-management.md) | load raw memory data areas | request | Raw data memory management | minimum | 6.6.3.3.1 | 8.6.2.2 (p. 481) | p. 634 |
| 6 | 3 | [TC[6,3]](st06-memory-management.md) | dump object memory data | request | Structured data memory management | minimum | 6.6.4.5 | 8.6.2.3 (p. 482) | p. 635 |
| 6 | 4 | [TM[6,4]](st06-memory-management.md) | dumped object memory data report | report | Structured data memory management | response to TC[6,3] | 6.6.4.5 | 8.6.2.4 (p. 482) | p. 635 |
| 6 | 5 | [TC[6,5]](st06-memory-management.md) | dump raw memory data | request | Raw data memory management | minimum | 6.6.3.4 | 8.6.2.5 (p. 483) | p. 634 |
| 6 | 6 | [TM[6,6]](st06-memory-management.md) | dumped raw memory data report | report | Raw data memory management | response to TC[6,5] | 6.6.3.4 | 8.6.2.6 (p. 483) | p. 634 |
| 6 | 7 | [TC[6,7]](st06-memory-management.md) | check object memory data | request | Structured data memory management | by declaration | 6.6.4.6 | 8.6.2.7 (p. 484) | p. 635 |
| 6 | 8 | [TM[6,8]](st06-memory-management.md) | checked object memory data report | report | Structured data memory management | response to TC[6,7] | 6.6.4.6 | 8.6.2.8 (p. 484) | p. 635 |
| 6 | 9 | [TC[6,9]](st06-memory-management.md) | check raw memory data | request | Raw data memory management | by declaration | 6.6.3.5 | 8.6.2.9 (p. 485) | p. 634 |
| 6 | 10 | [TM[6,10]](st06-memory-management.md) | checked raw memory data report | report | Raw data memory management | response to TC[6,9] | 6.6.3.5 | 8.6.2.10 (p. 485) | p. 634 |
| 6 | 11 | [TC[6,11]](st06-memory-management.md) | load a raw memory atomic data area in a non-interruptible transaction | request | Raw data memory management | by declaration | 6.6.3.3.2 | 8.6.2.11 (p. 486) | p. 634 |
| 6 | 12 | [TC[6,12]](st06-memory-management.md) | abort all memory dumps | request | Common memory management | minimum | 6.6.5.1 | 8.6.2.12 (p. 486) | p. 635 |
| 6 | 13 | [TC[6,13]](st06-memory-management.md) | enable the scrubbing of a memory | request | Memory configuration | implied by 6.6.6.1.1a | 6.6.6.1.4 | 8.6.2.13 (p. 486) | p. 636 |
| 6 | 14 | [TC[6,14]](st06-memory-management.md) | disable the scrubbing of a memory | request | Memory configuration | implied by 6.6.6.1.1a | 6.6.6.1.5 | 8.6.2.14 (p. 487) | p. 636 |
| 6 | 15 | [TC[6,15]](st06-memory-management.md) | enable the write protection of a memory | request | Memory configuration | implied by 6.6.6.2.1a | 6.6.6.2.4 | 8.6.2.15 (p. 487) | p. 636 |
| 6 | 16 | [TC[6,16]](st06-memory-management.md) | disable the write protection of a memory | request | Memory configuration | implied by 6.6.6.2.1a | 6.6.6.2.5 | 8.6.2.16 (p. 487) | p. 636 |
| 6 | 17 | [TC[6,17]](st06-memory-management.md) | check an object memory object | request | Structured data memory management | by declaration | 6.6.4.7 | 8.6.2.17 (p. 488) | p. 635 |
| 6 | 18 | [TM[6,18]](st06-memory-management.md) | checked object memory object report | report | Structured data memory management | response to TC[6,17] | 6.6.4.7 | 8.6.2.18 (p. 488) | p. 635 |
| 6 | 19 | [TC[6,19]](st06-memory-management.md) | load raw memory data areas by reference | request | Raw data memory management | by declaration | 6.6.3.6 | 8.6.2.19 (p. 488) | p. 634 |
| 6 | 20 | [TC[6,20]](st06-memory-management.md) | dump raw memory data areas to file | request | Raw data memory management | by declaration | 6.6.3.7 | 8.6.2.20 (p. 489) | p. 634 |
| 6 | 21 | [TC[6,21]](st06-memory-management.md) | load object memory data areas by reference | request | Structured data memory management | by declaration | 6.6.4.8 | 8.6.2.21 (p. 490) | p. 635 |
| 6 | 22 | [TC[6,22]](st06-memory-management.md) | dump object memory data areas to file | request | Structured data memory management | by declaration | 6.6.4.9 | 8.6.2.22 (p. 490) | p. 635 |
| 8 | 1 | [TC[8,1]](st08-function-management.md) | perform a function | request | Function management | minimum | 6.8.4 | 8.8.2.1 (p. 492) | p. 636 |
| 9 | 1 | [TC[9,1]](st09-time-management.md) | set the time report generation rate | request | Time reporting control | minimum | 6.9.5.1.1 | 8.9.2.1 (p. 493) | p. 637 |
| 9 | 2 | [TM[9,2]](st09-time-management.md) | CUC time report | report | Time reporting | by declaration | 6.9.4.2 | 8.9.2.2 (p. 494) | p. 636 |
| 9 | 3 | [TM[9,3]](st09-time-management.md) | CDS time report | report | Time reporting | by declaration | 6.9.4.3 | 8.9.2.3 (p. 494) | p. 636 |
| 11 | 1 | [TC[11,1]](st11-time-based-scheduling.md) | enable the time-based schedule execution function | request | Time-based scheduling | minimum | 6.11.4.3.2 | 8.11.2.1 (p. 496) | p. 637 |
| 11 | 2 | [TC[11,2]](st11-time-based-scheduling.md) | disable the time-based schedule execution function | request | Time-based scheduling | minimum | 6.11.4.3.3 | 8.11.2.2 (p. 496) | p. 637 |
| 11 | 3 | [TC[11,3]](st11-time-based-scheduling.md) | reset the time-based schedule | request | Time-based scheduling | minimum | 6.11.4.4 | 8.11.2.3 (p. 496) | p. 637 |
| 11 | 4 | [TC[11,4]](st11-time-based-scheduling.md) | insert activities into the time-based schedule | request | Time-based scheduling | minimum | 6.11.4.5 | 8.11.2.4 (p. 496) | p. 637 |
| 11 | 5 | [TC[11,5]](st11-time-based-scheduling.md) | delete time-based scheduled activities identified by request identifier | request | Time-based scheduling | by declaration | 6.11.9.2 | 8.11.2.5 (p. 497) | p. 638 |
| 11 | 6 | [TC[11,6]](st11-time-based-scheduling.md) | delete the time-based scheduled activities identified by a filter | request | Time-based scheduling | by declaration | 6.11.10.3 | 8.11.2.6 (p. 497) | p. 638 |
| 11 | 7 | [TC[11,7]](st11-time-based-scheduling.md) | time-shift scheduled activities identified by request identifier | request | Time-based scheduling | by declaration | 6.11.9.3 | 8.11.2.7 (p. 498) | p. 638 |
| 11 | 8 | [TC[11,8]](st11-time-based-scheduling.md) | time-shift the scheduled activities identified by a filter | request | Time-based scheduling | by declaration | 6.11.10.4 | 8.11.2.8 (p. 498) | p. 638 |
| 11 | 9 | [TC[11,9]](st11-time-based-scheduling.md) | detail-report time-based scheduled activities identified by request identifier | request | Time-based scheduling | by declaration | 6.11.9.5 | 8.11.2.9 (p. 499) | p. 638 |
| 11 | 10 | [TM[11,10]](st11-time-based-scheduling.md) | time-based schedule detail report | report | Time-based scheduling | response to TC[11,16]; response to TC[11,9]; response to TC[11,11] | 6.11.7.2 | 8.11.2.10 (p. 499) | p. 638, p. 639 |
| 11 | 11 | [TC[11,11]](st11-time-based-scheduling.md) | detail-report the time-based scheduled activities identified by a filter | request | Time-based scheduling | by declaration | 6.11.10.6 | 8.11.2.11 (p. 500) | p. 639 |
| 11 | 12 | [TC[11,12]](st11-time-based-scheduling.md) | summary-report time-based scheduled activities identified by request identifier | request | Time-based scheduling | by declaration | 6.11.9.4 | 8.11.2.12 (p. 500) | p. 638 |
| 11 | 13 | [TM[11,13]](st11-time-based-scheduling.md) | time-based schedule summary report | report | Time-based scheduling | response to TC[11,17]; response to TC[11,12]; response to TC[11,14] | 6.11.7.1 | 8.11.2.13 (p. 501) | p. 638 |
| 11 | 14 | [TC[11,14]](st11-time-based-scheduling.md) | summary-report the time-based scheduled activities identified by a filter | request | Time-based scheduling | by declaration | 6.11.10.5 | 8.11.2.14 (p. 501) | p. 638 |
| 11 | 15 | [TC[11,15]](st11-time-based-scheduling.md) | time-shift all scheduled activities | request | Time-based scheduling | by declaration | 6.11.8.1 | 8.11.2.15 (p. 502) | p. 638 |
| 11 | 16 | [TC[11,16]](st11-time-based-scheduling.md) | detail-report all time-based scheduled activities | request | Time-based scheduling | by declaration | 6.11.8.3 | 8.11.2.16 (p. 502) | p. 638 |
| 11 | 17 | [TC[11,17]](st11-time-based-scheduling.md) | summary-report all time-based scheduled activities | request | Time-based scheduling | by declaration | 6.11.8.2 | 8.11.2.17 (p. 503) | p. 638 |
| 11 | 18 | [TC[11,18]](st11-time-based-scheduling.md) | report the status of each time-based sub-schedule | request | Time-based scheduling | requires TC[11,20] | 6.11.5.2.3 | 8.11.2.18 (p. 503) | p. 637 |
| 11 | 19 | [TM[11,19]](st11-time-based-scheduling.md) | time-based sub-schedule status report | report | Time-based scheduling | response to TC[11,18] | 6.11.5.2.3 | 8.11.2.19 (p. 503) | p. 637 |
| 11 | 20 | [TC[11,20]](st11-time-based-scheduling.md) | enable time-based sub-schedules | request | Time-based scheduling | by declaration | 6.11.5.2.1 | 8.11.2.20 (p. 503) | p. 637 |
| 11 | 21 | [TC[11,21]](st11-time-based-scheduling.md) | disable time-based sub-schedules | request | Time-based scheduling | implied by TC[11,20] | 6.11.5.2.2 | 8.11.2.21 (p. 504) | p. 637 |
| 11 | 22 | [TC[11,22]](st11-time-based-scheduling.md) | create time-based scheduling groups | request | Time-based scheduling | by declaration | 6.11.6.2.1 | 8.11.2.22 (p. 504) | p. 637 |
| 11 | 23 | [TC[11,23]](st11-time-based-scheduling.md) | delete time-based scheduling groups | request | Time-based scheduling | implied by TC[11,22] | 6.11.6.2.2 | 8.11.2.23 (p. 505) | p. 637 |
| 11 | 24 | [TC[11,24]](st11-time-based-scheduling.md) | enable time-based scheduling groups | request | Time-based scheduling | implied by TC[11,22] | 6.11.6.3.1 | 8.11.2.24 (p. 505) | p. 637 |
| 11 | 25 | [TC[11,25]](st11-time-based-scheduling.md) | disable time-based scheduling groups | request | Time-based scheduling | implied by TC[11,24] | 6.11.6.3.2 | 8.11.2.25 (p. 505) | p. 638 |
| 11 | 26 | [TC[11,26]](st11-time-based-scheduling.md) | report the status of each time-based scheduling group | request | Time-based scheduling | requires TC[11,22] | 6.11.6.3.3 | 8.11.2.26 (p. 506) | p. 638 |
| 11 | 27 | [TM[11,27]](st11-time-based-scheduling.md) | time-based scheduling group status report | report | Time-based scheduling | response to TC[11,26] | 6.11.6.3.3 | 8.11.2.27 (p. 506) | p. 638 |
| 12 | 1 | [TC[12,1]](st12-onboard-monitoring.md) | enable parameter monitoring definitions | request | Parameter monitoring | minimum | 6.12.3.6.1 | 8.12.2.1 (p. 508) | p. 639 |
| 12 | 2 | [TC[12,2]](st12-onboard-monitoring.md) | disable parameter monitoring definitions | request | Parameter monitoring | minimum | 6.12.3.6.2 | 8.12.2.2 (p. 508) | p. 639 |
| 12 | 3 | [TC[12,3]](st12-onboard-monitoring.md) | change the maximum transition reporting delay | request | Parameter monitoring | by declaration | 6.12.3.8 | 8.12.2.3 (p. 508) | p. 639 |
| 12 | 4 | [TC[12,4]](st12-onboard-monitoring.md) | delete all parameter monitoring definitions | request | Parameter monitoring | by declaration | 6.12.3.9.2 | 8.12.2.4 (p. 509) | p. 639 |
| 12 | 5 | [TC[12,5]](st12-onboard-monitoring.md) | add parameter monitoring definitions | request | Parameter monitoring | by declaration | 6.12.3.9.1 | 8.12.2.5 (p. 509) | p. 639 |
| 12 | 6 | [TC[12,6]](st12-onboard-monitoring.md) | delete parameter monitoring definitions | request | Parameter monitoring | by declaration | 6.12.3.9.3 | 8.12.2.6 (p. 511) | p. 639 |
| 12 | 7 | [TC[12,7]](st12-onboard-monitoring.md) | modify parameter monitoring definitions | request | Parameter monitoring | by declaration | 6.12.3.9.4 | 8.12.2.7 (p. 511) | p. 639 |
| 12 | 8 | [TC[12,8]](st12-onboard-monitoring.md) | report parameter monitoring definitions | request | Parameter monitoring | requires TC[12,5] or TC[12,7] | 6.12.3.10 | 8.12.2.8 (p. 513) | p. 639 |
| 12 | 9 | [TM[12,9]](st12-onboard-monitoring.md) | parameter monitoring definition report | report | Parameter monitoring | response to TC[12,8] | 6.12.3.10 | 8.12.2.9 (p. 514) | p. 639 |
| 12 | 10 | [TC[12,10]](st12-onboard-monitoring.md) | report the out-of-limits | request | Parameter monitoring | by declaration | 6.12.3.12 | 8.12.2.10 (p. 516) | p. 640 |
| 12 | 11 | [TM[12,11]](st12-onboard-monitoring.md) | out-of-limits report | report | Parameter monitoring | response to TC[12,10] | 6.12.3.12 | 8.12.2.11 (p. 516) | p. 640 |
| 12 | 12 | [TM[12,12]](st12-onboard-monitoring.md) | check transition report | report | Parameter monitoring | minimum | 6.12.3.7 | 8.12.2.12 (p. 517) | p. 639 |
| 12 | 13 | [TC[12,13]](st12-onboard-monitoring.md) | report the status of each parameter monitoring definition | request | Parameter monitoring | requires TC[12,1] | 6.12.3.11 | 8.12.2.13 (p. 518) | p. 639 |
| 12 | 14 | [TM[12,14]](st12-onboard-monitoring.md) | parameter monitoring definition status report | report | Parameter monitoring | response to TC[12,13] | 6.12.3.11 | 8.12.2.14 (p. 518) | p. 640 |
| 12 | 15 | [TC[12,15]](st12-onboard-monitoring.md) | enable the parameter monitoring function | request | Parameter monitoring | minimum | 6.12.3.5.1 | 8.12.2.15 (p. 518) | p. 639 |
| 12 | 16 | [TC[12,16]](st12-onboard-monitoring.md) | disable the parameter monitoring function | request | Parameter monitoring | minimum | 6.12.3.5.2 | 8.12.2.16 (p. 518) | p. 639 |
| 12 | 17 | [TC[12,17]](st12-onboard-monitoring.md) | enable the functional monitoring function | request | Functional monitoring | minimum | 6.12.4.4.1 | 8.12.2.17 (p. 519) | p. 640 |
| 12 | 18 | [TC[12,18]](st12-onboard-monitoring.md) | disable the functional monitoring function | request | Functional monitoring | minimum | 6.12.4.4.2 | 8.12.2.18 (p. 519) | p. 640 |
| 12 | 19 | [TC[12,19]](st12-onboard-monitoring.md) | enable functional monitoring definitions | request | Functional monitoring | minimum | 6.12.4.5.2 | 8.12.2.19 (p. 519) | p. 640 |
| 12 | 20 | [TC[12,20]](st12-onboard-monitoring.md) | disable functional monitoring definitions | request | Functional monitoring | minimum | 6.12.4.5.3 | 8.12.2.20 (p. 519) | p. 640 |
| 12 | 21 | [TC[12,21]](st12-onboard-monitoring.md) | protect functional monitoring definitions | request | Functional monitoring | by declaration | 6.12.4.6.1 | 8.12.2.21 (p. 520) | p. 640 |
| 12 | 22 | [TC[12,22]](st12-onboard-monitoring.md) | unprotect functional monitoring definitions | request | Functional monitoring | implied by TC[12,21] | 6.12.4.6.2 | 8.12.2.22 (p. 520) | p. 640 |
| 12 | 23 | [TC[12,23]](st12-onboard-monitoring.md) | add functional monitoring definitions | request | Functional monitoring | by declaration | 6.12.4.7.1 | 8.12.2.23 (p. 521) | p. 640 |
| 12 | 24 | [TC[12,24]](st12-onboard-monitoring.md) | delete functional monitoring definitions | request | Functional monitoring | implied by TC[12,23] | 6.12.4.7.2 | 8.12.2.24 (p. 521) | p. 640 |
| 12 | 25 | [TC[12,25]](st12-onboard-monitoring.md) | report functional monitoring definitions | request | Functional monitoring | requires TC[12,23] | 6.12.4.8 | 8.12.2.25 (p. 521) | p. 640 |
| 12 | 26 | [TM[12,26]](st12-onboard-monitoring.md) | functional monitoring definition report | report | Functional monitoring | response to TC[12,25] | 6.12.4.8 | 8.12.2.26 (p. 522) | p. 640 |
| 12 | 27 | [TC[12,27]](st12-onboard-monitoring.md) | report the status of each functional monitoring definition | request | Functional monitoring | by declaration | 6.12.4.9 | 8.12.2.27 (p. 522) | p. 640 |
| 12 | 28 | [TM[12,28]](st12-onboard-monitoring.md) | functional monitoring definition status report | report | Functional monitoring | response to TC[12,27] | 6.12.4.9 | 8.12.2.28 (p. 523) | p. 640 |
| 13 | 1 | [TM[13,1]](st13-large-packet-transfer.md) | first downlink part report | report | Large packet downlink | minimum | 6.13.3.3.1 | 8.13.2.1 (p. 526) | p. 641 |
| 13 | 2 | [TM[13,2]](st13-large-packet-transfer.md) | intermediate downlink part report | report | Large packet downlink | minimum | 6.13.3.3.1 | 8.13.2.2 (p. 526) | p. 641 |
| 13 | 3 | [TM[13,3]](st13-large-packet-transfer.md) | last downlink part report | report | Large packet downlink | minimum | 6.13.3.3.1 | 8.13.2.3 (p. 526) | p. 641 |
| 13 | 9 | [TC[13,9]](st13-large-packet-transfer.md) | uplink the first part | request | Large packet uplink | minimum | 6.13.4.3.1 | 8.13.2.4 (p. 527) | p. 641 |
| 13 | 10 | [TC[13,10]](st13-large-packet-transfer.md) | uplink an intermediate part | request | Large packet uplink | minimum | 6.13.4.3.1 | 8.13.2.5 (p. 527) | p. 641 |
| 13 | 11 | [TC[13,11]](st13-large-packet-transfer.md) | uplink the last part | request | Large packet uplink | minimum | 6.13.4.3.1 | 8.13.2.6 (p. 528) | p. 641 |
| 13 | 16 | [TM[13,16]](st13-large-packet-transfer.md) | large packet uplink abortion report | report | Large packet uplink | minimum | 6.13.4.3.3 | 8.13.2.7 (p. 528) | p. 641 |
| 14 | 1 | [TC[14,1]](st14-real-time-forwarding-control.md) | add report types to the application process forward-control configuration | request | Real-time forwarding control | minimum | 6.14.3.4.1 | 8.14.2.1 (p. 529) | p. 641 |
| 14 | 2 | [TC[14,2]](st14-real-time-forwarding-control.md) | delete report types from the application process forward-control configuration | request | Real-time forwarding control | minimum | 6.14.3.4.2 | 8.14.2.2 (p. 529) | p. 641 |
| 14 | 3 | [TC[14,3]](st14-real-time-forwarding-control.md) | report the content of the application process forward-control configuration | request | Real-time forwarding control | requires TC[14,1] | 6.14.3.4.3 | 8.14.2.3 (p. 530) | p. 641 |
| 14 | 4 | [TM[14,4]](st14-real-time-forwarding-control.md) | application process forward-control configuration content report | report | Real-time forwarding control | response to TC[14,3] | 6.14.3.4.3 | 8.14.2.4 (p. 530) | p. 641 |
| 14 | 5 | [TC[14,5]](st14-real-time-forwarding-control.md) | add structure identifiers to the housekeeping parameter report forward-control configuration | request | Real-time forwarding control | implied by 6.14.3.2.1a | 6.14.3.5.1 | 8.14.2.5 (p. 531) | p. 642 |
| 14 | 6 | [TC[14,6]](st14-real-time-forwarding-control.md) | delete structure identifiers from the housekeeping parameter report forward-control configuration | request | Real-time forwarding control | implied by 6.14.3.2.1a | 6.14.3.5.2 | 8.14.2.6 (p. 532) | p. 642 |
| 14 | 7 | [TC[14,7]](st14-real-time-forwarding-control.md) | report the content of the housekeeping parameter report forward-control configuration | request | Real-time forwarding control | requires TC[14,5] | 6.14.3.5.3 | 8.14.2.7 (p. 532) | p. 642 |
| 14 | 8 | [TM[14,8]](st14-real-time-forwarding-control.md) | housekeeping parameter report forward-control configuration content report | report | Real-time forwarding control | response to TC[14,7] | 6.14.3.5.3 | 8.14.2.8 (p. 533) | p. 642 |
| 14 | 9 | [TC[14,9]](st14-real-time-forwarding-control.md) | add structure identifiers to the diagnostic parameter report forward-control configuration | request | Real-time forwarding control | implied by 6.14.3.2.1b | 6.14.3.6.1 | 8.14.2.9 (p. 533) | p. 642 |
| 14 | 10 | [TC[14,10]](st14-real-time-forwarding-control.md) | delete structure identifiers from the diagnostic parameter report forward-control configuration | request | Real-time forwarding control | implied by 6.14.3.2.1b | 6.14.3.6.2 | 8.14.2.10 (p. 534) | p. 642 |
| 14 | 11 | [TC[14,11]](st14-real-time-forwarding-control.md) | report the content of the diagnostic parameter report forward-control configuration | request | Real-time forwarding control | requires TC[14,9] | 6.14.3.6.3 | 8.14.2.11 (p. 535) | p. 642 |
| 14 | 12 | [TM[14,12]](st14-real-time-forwarding-control.md) | diagnostic parameter report forward-control configuration content report | report | Real-time forwarding control | response to TC[14,11] | 6.14.3.6.3 | 8.14.2.12 (p. 535) | p. 642 |
| 14 | 13 | [TC[14,13]](st14-real-time-forwarding-control.md) | delete event definition identifiers from the event report blocking forward-control configuration | request | Real-time forwarding control | implied by 6.14.3.2.1c | 6.14.3.7.1 | 8.14.2.13 (p. 535) | p. 642 |
| 14 | 14 | [TC[14,14]](st14-real-time-forwarding-control.md) | add event definition identifiers to the event report blocking forward-control configuration | request | Real-time forwarding control | implied by 6.14.3.2.1c | 6.14.3.7.2 | 8.14.2.14 (p. 536) | p. 642 |
| 14 | 15 | [TC[14,15]](st14-real-time-forwarding-control.md) | report the content of the event report blocking forward-control configuration | request | Real-time forwarding control | requires TC[14,14] | 6.14.3.7.3 | 8.14.2.15 (p. 537) | p. 642 |
| 14 | 16 | [TM[14,16]](st14-real-time-forwarding-control.md) | event report blocking forward-control configuration content report | report | Real-time forwarding control | response to TC[14,15] | 6.14.3.7.3 | 8.14.2.16 (p. 537) | p. 642 |
| 15 | 1 | [TC[15,1]](st15-onboard-storage-retrieval.md) | enable the storage function of packet stores | request | Storage and retrieval | minimum | 6.15.3.3.2 | 8.15.2.1 (p. 538) | p. 643 |
| 15 | 2 | [TC[15,2]](st15-onboard-storage-retrieval.md) | disable the storage function of packet stores | request | Storage and retrieval | minimum | 6.15.3.3.3 | 8.15.2.2 (p. 538) | p. 643 |
| 15 | 3 | [TC[15,3]](st15-onboard-storage-retrieval.md) | add report types to the application process storage-control configuration | request | Packet selection | minimum | 6.15.4.4.1 | 8.15.2.3 (p. 539) | p. 644 |
| 15 | 4 | [TC[15,4]](st15-onboard-storage-retrieval.md) | delete report types from the application process storage-control configuration | request | Packet selection | minimum | 6.15.4.4.2 | 8.15.2.4 (p. 539) | p. 644 |
| 15 | 5 | [TC[15,5]](st15-onboard-storage-retrieval.md) | report the content of the application process storage-control configuration | request | Packet selection | requires TC[15,3] | 6.15.4.4.3 | 8.15.2.5 (p. 540) | p. 644 |
| 15 | 6 | [TM[15,6]](st15-onboard-storage-retrieval.md) | application process storage-control configuration content report | report | Packet selection | response to TC[15,5] | 6.15.4.4.3 | 8.15.2.6 (p. 541) | p. 644 |
| 15 | 9 | [TC[15,9]](st15-onboard-storage-retrieval.md) | start the by-time-range retrieval of packet stores | request | Storage and retrieval | implied by 6.15.3.5.1a | 6.15.3.5.2 | 8.15.2.7 (p. 541) | p. 643 |
| 15 | 11 | [TC[15,11]](st15-onboard-storage-retrieval.md) | delete the content of packet stores up to the specified time | request | Storage and retrieval | by declaration | 6.15.3.7.1 | 8.15.2.8 (p. 542) | p. 643 |
| 15 | 12 | [TC[15,12]](st15-onboard-storage-retrieval.md) | summary-report the content of packet stores | request | Storage and retrieval | by declaration | 6.15.3.10.1 | 8.15.2.9 (p. 542) | p. 644 |
| 15 | 13 | [TM[15,13]](st15-onboard-storage-retrieval.md) | packet store content summary report | report | Storage and retrieval | response to TC[15,12] | 6.15.3.10.1 | 8.15.2.10 (p. 542) | p. 644 |
| 15 | 14 | [TC[15,14]](st15-onboard-storage-retrieval.md) | change the open retrieval start time tag of packet stores | request | Storage and retrieval | minimum | 6.15.3.4.2 | 8.15.2.11 (p. 543) | p. 643 |
| 15 | 15 | [TC[15,15]](st15-onboard-storage-retrieval.md) | resume the open retrieval of packet stores | request | Storage and retrieval | minimum | 6.15.3.4.3 | 8.15.2.12 (p. 543) | p. 643 |
| 15 | 16 | [TC[15,16]](st15-onboard-storage-retrieval.md) | suspend the open retrieval of packet stores | request | Storage and retrieval | implied by TC[15,15] | 6.15.3.4.4 | 8.15.2.13 (p. 544) | p. 643 |
| 15 | 17 | [TC[15,17]](st15-onboard-storage-retrieval.md) | abort the by-time-range retrieval of packet stores | request | Storage and retrieval | implied by 6.15.3.5.1a | 6.15.3.5.3 | 8.15.2.14 (p. 544) | p. 643 |
| 15 | 18 | [TC[15,18]](st15-onboard-storage-retrieval.md) | report the status of each packet store | request | Storage and retrieval | by declaration | 6.15.3.6 | 8.15.2.15 (p. 545) | p. 643 |
| 15 | 19 | [TM[15,19]](st15-onboard-storage-retrieval.md) | packet store status report | report | Storage and retrieval | response to TC[15,18] | 6.15.3.6 | 8.15.2.16 (p. 545) | p. 643 |
| 15 | 20 | [TC[15,20]](st15-onboard-storage-retrieval.md) | create packet stores | request | Storage and retrieval | by declaration | 6.15.3.8.1 | 8.15.2.17 (p. 545) | p. 643 |
| 15 | 21 | [TC[15,21]](st15-onboard-storage-retrieval.md) | delete packet stores | request | Storage and retrieval | implied by TC[15,20] | 6.15.3.8.2 | 8.15.2.18 (p. 546) | p. 643 |
| 15 | 22 | [TC[15,22]](st15-onboard-storage-retrieval.md) | report the configuration of each packet store | request | Storage and retrieval | requires TC[15,20] | 6.15.3.8.3 | 8.15.2.19 (p. 546) | p. 643 |
| 15 | 23 | [TM[15,23]](st15-onboard-storage-retrieval.md) | packet store configuration report | report | Storage and retrieval | response to TC[15,22] | 6.15.3.8.3 | 8.15.2.20 (p. 547) | p. 643 |
| 15 | 24 | [TC[15,24]](st15-onboard-storage-retrieval.md) | copy the packets contained in a packet store selected by time window | request | Storage and retrieval | requires TC[15,20] | 6.15.3.8.4 | 8.15.2.21 (p. 547) | p. 643 |
| 15 | 25 | [TC[15,25]](st15-onboard-storage-retrieval.md) | resize packet stores | request | Storage and retrieval | by declaration | 6.15.3.9.1 | 8.15.2.22 (p. 547) | p. 643 |
| 15 | 26 | [TC[15,26]](st15-onboard-storage-retrieval.md) | change a packet store type to circular | request | Storage and retrieval | implied by TC[15,25] | 6.15.3.9.2 | 8.15.2.23 (p. 548) | p. 644 |
| 15 | 27 | [TC[15,27]](st15-onboard-storage-retrieval.md) | change a packet store type to bounded | request | Storage and retrieval | implied by TC[15,25] | 6.15.3.9.3 | 8.15.2.24 (p. 548) | p. 644 |
| 15 | 28 | [TC[15,28]](st15-onboard-storage-retrieval.md) | change the virtual channel used by a packet store | request | Storage and retrieval | implied by TC[15,25] | 6.15.3.9.4 | 8.15.2.25 (p. 548) | p. 644 |
| 15 | 29 | [TC[15,29]](st15-onboard-storage-retrieval.md) | add structure identifiers to the housekeeping parameter report storage-control configuration | request | Packet selection | implied by 6.15.4.2.1a | 6.15.4.5.1 | 8.15.2.26 (p. 549) | p. 644 |
| 15 | 30 | [TC[15,30]](st15-onboard-storage-retrieval.md) | delete structure identifiers from the housekeeping parameter report storage-control configuration | request | Packet selection | implied by 6.15.4.2.1a | 6.15.4.5.2 | 8.15.2.27 (p. 549) | p. 644 |
| 15 | 31 | [TC[15,31]](st15-onboard-storage-retrieval.md) | add structure identifiers to the diagnostic parameter report storage-control configuration | request | Packet selection | implied by 6.15.4.2.1b | 6.15.4.6.1 | 8.15.2.28 (p. 550) | p. 645 |
| 15 | 32 | [TC[15,32]](st15-onboard-storage-retrieval.md) | delete structure identifiers from the diagnostic parameter report storage-control configuration | request | Packet selection | implied by 6.15.4.2.1b | 6.15.4.6.2 | 8.15.2.29 (p. 551) | p. 645 |
| 15 | 33 | [TC[15,33]](st15-onboard-storage-retrieval.md) | delete event definition identifiers from the event report blocking storage-control configuration | request | Packet selection | implied by 6.15.4.2.1c | 6.15.4.7.2 | 8.15.2.30 (p. 551) | p. 645 |
| 15 | 34 | [TC[15,34]](st15-onboard-storage-retrieval.md) | add event definition identifiers to the event report blocking storage-control configuration | request | Packet selection | implied by 6.15.4.2.1c | 6.15.4.7.1 | 8.15.2.31 (p. 552) | p. 645 |
| 15 | 35 | [TC[15,35]](st15-onboard-storage-retrieval.md) | report the content of the housekeeping parameter report storage-control configuration | request | Packet selection | requires TC[15,29] | 6.15.4.5.3 | 8.15.2.32 (p. 553) | p. 644 |
| 15 | 36 | [TM[15,36]](st15-onboard-storage-retrieval.md) | housekeeping parameter report storage-control configuration content report | report | Packet selection | response to TC[15,35] | 6.15.4.5.3 | 8.15.2.33 (p. 553) | p. 644 |
| 15 | 37 | [TC[15,37]](st15-onboard-storage-retrieval.md) | report the content of the diagnostic parameter report storage-control configuration | request | Packet selection | requires TC[15,31] | 6.15.4.6.3 | 8.15.2.34 (p. 554) | p. 645 |
| 15 | 38 | [TM[15,38]](st15-onboard-storage-retrieval.md) | diagnostic parameter report storage-control configuration content report | report | Packet selection | response to TC[15,37] | 6.15.4.6.3 | 8.15.2.35 (p. 554) | p. 645 |
| 15 | 39 | [TC[15,39]](st15-onboard-storage-retrieval.md) | report the content of the event report blocking storage-control configuration | request | Packet selection | requires TC[15,33] | 6.15.4.7.3 | 8.15.2.36 (p. 555) | p. 645 |
| 15 | 40 | [TM[15,40]](st15-onboard-storage-retrieval.md) | event report blocking storage-control configuration content report | report | Packet selection | response to TC[15,39] | 6.15.4.7.3 | 8.15.2.37 (p. 555) | p. 645 |
| 17 | 1 | [TC[17,1]](st17-test.md) | perform an are-you-alive connection test | request | Test | minimum | 6.17.3 | 8.17.2.1 (p. 558) | p. 646 |
| 17 | 2 | [TM[17,2]](st17-test.md) | are-you-alive connection test report | report | Test | response to TC[17,1] | 6.17.3 | 8.17.2.2 (p. 558) | p. 646 |
| 17 | 3 | [TC[17,3]](st17-test.md) | perform an on-board connection test | request | Test | minimum | 6.17.4.2 | 8.17.2.3 (p. 558) | p. 646 |
| 17 | 4 | [TM[17,4]](st17-test.md) | on-board connection test report | report | Test | response to TC[17,3] | 6.17.4.2 | 8.17.2.4 (p. 559) | p. 646 |
| 18 | 1 | [TC[18,1]](st18-onboard-operations-procedure.md) | direct-load an OBCP | request | OBCP management | by declaration | 6.18.4.4.2 | 8.18.2.1 (p. 560) | p. 646 |
| 18 | 2 | [TC[18,2]](st18-onboard-operations-procedure.md) | unload an OBCP | request | OBCP management | implied by TC[18,1] or TC[18,13] | 6.18.4.4.4 | 8.18.2.2 (p. 560) | p. 646 |
| 18 | 3 | [TC[18,3]](st18-onboard-operations-procedure.md) | activate an OBCP | request | OBCP management | minimum | 6.18.4.4.5 | 8.18.2.3 (p. 561) | p. 646 |
| 18 | 4 | [TC[18,4]](st18-onboard-operations-procedure.md) | stop an OBCP | request | OBCP management | minimum | 6.18.4.4.7 | 8.18.2.4 (p. 561) | p. 646 |
| 18 | 5 | [TC[18,5]](st18-onboard-operations-procedure.md) | suspend an OBCP | request | OBCP management | by declaration | 6.18.4.6.1 | 8.18.2.5 (p. 561) | p. 647 |
| 18 | 6 | [TC[18,6]](st18-onboard-operations-procedure.md) | resume an OBCP | request | OBCP management | implied by TC[18,5] | 6.18.4.6.2 | 8.18.2.6 (p. 562) | p. 647 |
| 18 | 7 | [TC[18,7]](st18-onboard-operations-procedure.md) | communicate parameters to an OBCP | request | OBCP management | by declaration | 6.18.4.7.1 | 8.18.2.7 (p. 562) | p. 647 |
| 18 | 8 | [TC[18,8]](st18-onboard-operations-procedure.md) | report the execution status of each OBCP | request | OBCP management | minimum | 6.18.4.5.1 | 8.18.2.8 (p. 563) | p. 647 |
| 18 | 9 | [TM[18,9]](st18-onboard-operations-procedure.md) | OBCP execution status report | report | OBCP management | response to TC[18,8] | 6.18.4.5.1 | 8.18.2.9 (p. 563) | p. 647 |
| 18 | 12 | [TC[18,12]](st18-onboard-operations-procedure.md) | abort an OBCP | request | OBCP management | minimum | 6.18.4.4.9 | 8.18.2.10 (p. 563) | p. 647 |
| 18 | 13 | [TC[18,13]](st18-onboard-operations-procedure.md) | load an OBCP by reference | request | OBCP management | by declaration | 6.18.4.4.3 | 8.18.2.11 (p. 564) | p. 646 |
| 18 | 14 | [TC[18,14]](st18-onboard-operations-procedure.md) | activate and execute one OBCP step | request | OBCP management | by declaration | 6.18.4.6.3 | 8.18.2.12 (p. 564) | p. 647 |
| 18 | 15 | [TC[18,15]](st18-onboard-operations-procedure.md) | resume and execute one OBCP step | request | OBCP management | implied by TC[18,14] | 6.18.4.6.4 | 8.18.2.13 (p. 564) | p. 647 |
| 18 | 16 | [TC[18,16]](st18-onboard-operations-procedure.md) | set the observability level of OBCPs | request | OBCP management | by declaration | 6.18.4.8.1 | 8.18.2.14 (p. 565) | p. 647 |
| 18 | 17 | [TC[18,17]](st18-onboard-operations-procedure.md) | abort all OBCPs and report | request | OBCP management | by declaration | 6.18.4.4.10 | 8.18.2.15 (p. 565) | p. 647 |
| 18 | 18 | [TM[18,18]](st18-onboard-operations-procedure.md) | aborted OBCP report | report | OBCP management | response to TC[18,17] | 6.18.4.4.10 | 8.18.2.16 (p. 565) | p. 647 |
| 18 | 19 | [TC[18,19]](st18-onboard-operations-procedure.md) | load by reference and activate an OBCP | request | OBCP management | by declaration | 6.18.4.4.6 | 8.18.2.17 (p. 566) | p. 646 |
| 18 | 20 | [TC[18,20]](st18-onboard-operations-procedure.md) | stop and unload an OBCP | request | OBCP management | by declaration | 6.18.4.4.8 | 8.18.2.18 (p. 566) | p. 646 |
| 18 | 21 | [TC[18,21]](st18-onboard-operations-procedure.md) | start the OBCP engine | request | OBCP engine management | minimum | 6.18.5.1.1 | 8.18.2.19 (p. 567) | p. 647 |
| 18 | 22 | [TC[18,22]](st18-onboard-operations-procedure.md) | stop the OBCP engine | request | OBCP engine management | minimum | 6.18.5.1.2 | 8.18.2.20 (p. 567) | p. 647 |
| 19 | 1 | [TC[19,1]](st19-event-action.md) | add event-action definitions | request | Event-action | minimum | 6.19.8.1 | 8.19.2.1 (p. 568) | p. 648 |
| 19 | 2 | [TC[19,2]](st19-event-action.md) | delete event-action definitions | request | Event-action | by declaration | 6.19.8.3 | 8.19.2.2 (p. 568) | p. 648 |
| 19 | 3 | [TC[19,3]](st19-event-action.md) | delete all event-action definitions | request | Event-action | by declaration | 6.19.8.4 | 8.19.2.3 (p. 569) | p. 648 |
| 19 | 4 | [TC[19,4]](st19-event-action.md) | enable event-action definitions | request | Event-action | minimum | 6.19.7.1 | 8.19.2.4 (p. 569) | p. 648 |
| 19 | 5 | [TC[19,5]](st19-event-action.md) | disable event-action definitions | request | Event-action | minimum | 6.19.7.2 | 8.19.2.5 (p. 569) | p. 648 |
| 19 | 6 | [TC[19,6]](st19-event-action.md) | report the status of each event-action definition | request | Event-action | by declaration | 6.19.8.5 | 8.19.2.6 (p. 570) | p. 648 |
| 19 | 7 | [TM[19,7]](st19-event-action.md) | event-action status report | report | Event-action | response to TC[19,6] | 6.19.8.5 | 8.19.2.7 (p. 570) | p. 648 |
| 19 | 8 | [TC[19,8]](st19-event-action.md) | enable the event-action function | request | Event-action | minimum | 6.19.6.1 | 8.19.2.8 (p. 571) | p. 648 |
| 19 | 9 | [TC[19,9]](st19-event-action.md) | disable the event-action function | request | Event-action | minimum | 6.19.6.2 | 8.19.2.9 (p. 571) | p. 648 |
| 19 | 10 | [TC[19,10]](st19-event-action.md) | report event-action definitions | request | Event-action | requires TC[19,1] | 6.19.8.6 | 8.19.2.10 (p. 571) | p. 648 |
| 19 | 11 | [TM[19,11]](st19-event-action.md) | event-action definition report | report | Event-action | response to TC[19,10] | 6.19.8.6 | 8.19.2.11 (p. 571) | p. 648 |
| 20 | 1 | [TC[20,1]](st20-onboard-parameter-management.md) | report parameter values | request | Parameter management | minimum | 6.20.4.1 | 8.20.2.1 (p. 573) | p. 649 |
| 20 | 2 | [TM[20,2]](st20-onboard-parameter-management.md) | parameter value report | report | Parameter management | response to TC[20,1] | 6.20.4.1 | 8.20.2.2 (p. 573) | p. 649 |
| 20 | 3 | [TC[20,3]](st20-onboard-parameter-management.md) | set parameter values | request | Parameter management | by declaration | 6.20.4.2 | 8.20.2.3 (p. 574) | p. 649 |
| 20 | 4 | [TC[20,4]](st20-onboard-parameter-management.md) | change raw memory parameter definitions | request | Parameter management | by declaration | 6.20.5.2 | 8.20.2.4 (p. 574) | p. 649 |
| 20 | 5 | [TC[20,5]](st20-onboard-parameter-management.md) | change object memory parameter definitions | request | Parameter management | by declaration | 6.20.5.3 | 8.20.2.5 (p. 574) | p. 649 |
| 20 | 6 | [TC[20,6]](st20-onboard-parameter-management.md) | report parameter definitions | request | Parameter management | requires TC[20,4] or TC[20,5] | 6.20.5.4 | 8.20.2.6 (p. 575) | p. 649 |
| 20 | 7 | [TM[20,7]](st20-onboard-parameter-management.md) | parameter definition report | report | Parameter management | response to TC[20,6] | 6.20.5.4 | 8.20.2.7 (p. 575) | p. 649 |
| 21 | 1 | [TC[21,1]](st21-request-sequencing.md) | direct-load a request sequence | request | Request sequencing | by declaration | 6.21.5.2 | 8.21.2.1 (p. 577) | p. 649 |
| 21 | 2 | [TC[21,2]](st21-request-sequencing.md) | load a request sequence by reference | request | Request sequencing | by declaration | 6.21.5.3 | 8.21.2.2 (p. 577) | p. 649 |
| 21 | 3 | [TC[21,3]](st21-request-sequencing.md) | unload a request sequence | request | Request sequencing | implied by TC[21,1] or TC[21,2] | 6.21.5.4 | 8.21.2.3 (p. 578) | p. 650 |
| 21 | 4 | [TC[21,4]](st21-request-sequencing.md) | activate a request sequence | request | Request sequencing | minimum | 6.21.5.5 | 8.21.2.4 (p. 578) | p. 650 |
| 21 | 5 | [TC[21,5]](st21-request-sequencing.md) | abort a request sequence | request | Request sequencing | minimum | 6.21.5.7 | 8.21.2.5 (p. 578) | p. 650 |
| 21 | 6 | [TC[21,6]](st21-request-sequencing.md) | report the execution status of each request sequence | request | Request sequencing | by declaration | 6.21.6 | 8.21.2.6 (p. 579) | p. 650 |
| 21 | 7 | [TM[21,7]](st21-request-sequencing.md) | request sequence execution status report | report | Request sequencing | response to TC[21,6] | 6.21.6 | 8.21.2.7 (p. 579) | p. 650 |
| 21 | 8 | [TC[21,8]](st21-request-sequencing.md) | load by reference and activate a request sequence | request | Request sequencing | by declaration | 6.21.5.6 | 8.21.2.8 (p. 579) | p. 650 |
| 21 | 9 | [TC[21,9]](st21-request-sequencing.md) | checksum a request sequence | request | Request sequencing | by declaration | 6.21.7 | 8.21.2.9 (p. 580) | p. 650 |
| 21 | 10 | [TM[21,10]](st21-request-sequencing.md) | request sequence checksum report | report | Request sequencing | response to TC[21,9] | 6.21.7 | 8.21.2.10 (p. 580) | p. 650 |
| 21 | 11 | [TC[21,11]](st21-request-sequencing.md) | report the content of a request sequence | request | Request sequencing | by declaration | 6.21.8 | 8.21.2.11 (p. 580) | p. 650 |
| 21 | 12 | [TM[21,12]](st21-request-sequencing.md) | request sequence content report | report | Request sequencing | response to TC[21,11] | 6.21.8 | 8.21.2.12 (p. 581) | p. 650 |
| 21 | 13 | [TC[21,13]](st21-request-sequencing.md) | abort all request sequences and report | request | Request sequencing | by declaration | 6.21.5.8 | 8.21.2.13 (p. 581) | p. 650 |
| 21 | 14 | [TM[21,14]](st21-request-sequencing.md) | aborted request sequence report | report | Request sequencing | response to TC[21,13] | 6.21.5.8 | 8.21.2.14 (p. 581) | p. 650 |
| 22 | 1 | [TC[22,1]](st22-position-based-scheduling.md) | enable the position-based schedule execution function | request | Position-based scheduling | minimum | 6.22.6.3.2 | 8.22.2.1 (p. 583) | p. 651 |
| 22 | 2 | [TC[22,2]](st22-position-based-scheduling.md) | disable the position-based schedule execution function | request | Position-based scheduling | minimum | 6.22.6.3.3 | 8.22.2.2 (p. 583) | p. 651 |
| 22 | 3 | [TC[22,3]](st22-position-based-scheduling.md) | reset the position-based schedule | request | Position-based scheduling | minimum | 6.22.6.5 | 8.22.2.3 (p. 583) | p. 651 |
| 22 | 4 | [TC[22,4]](st22-position-based-scheduling.md) | insert activities into the position-based schedule | request | Position-based scheduling | minimum | 6.22.6.6 | 8.22.2.4 (p. 584) | p. 651 |
| 22 | 5 | [TC[22,5]](st22-position-based-scheduling.md) | delete position-based scheduled activities identified by request identifier | request | Position-based scheduling | by declaration | 6.22.11.2 | 8.22.2.5 (p. 584) | p. 652 |
| 22 | 6 | [TC[22,6]](st22-position-based-scheduling.md) | delete the position-based scheduled activities identified by a filter | request | Position-based scheduling | by declaration | 6.22.12.3 | 8.22.2.6 (p. 585) | p. 652 |
| 22 | 7 | [TC[22,7]](st22-position-based-scheduling.md) | position-shift scheduled activities identified by request identifier | request | Position-based scheduling | by declaration | 6.22.11.3 | 8.22.2.7 (p. 585) | p. 652 |
| 22 | 8 | [TC[22,8]](st22-position-based-scheduling.md) | position-shift the scheduled activities identified by a filter | request | Position-based scheduling | by declaration | 6.22.12.4 | 8.22.2.8 (p. 586) | p. 652 |
| 22 | 9 | [TC[22,9]](st22-position-based-scheduling.md) | detail-report position-based scheduled activities identified by request identifier | request | Position-based scheduling | by declaration | 6.22.11.5 | 8.22.2.9 (p. 586) | p. 652 |
| 22 | 10 | [TM[22,10]](st22-position-based-scheduling.md) | position-based schedule detail report | report | Position-based scheduling | response to TC[22,16]; response to TC[22,9]; response to TC[22,11] | 6.22.9.2 | 8.22.2.10 (p. 587) | p. 652 |
| 22 | 11 | [TC[22,11]](st22-position-based-scheduling.md) | detail-report the position-based scheduled activities identified by a filter | request | Position-based scheduling | by declaration | 6.22.12.6 | 8.22.2.11 (p. 587) | p. 652 |
| 22 | 12 | [TC[22,12]](st22-position-based-scheduling.md) | summary-report position-based scheduled activities identified by request identifier | request | Position-based scheduling | by declaration | 6.22.11.4 | 8.22.2.12 (p. 588) | p. 652 |
| 22 | 13 | [TM[22,13]](st22-position-based-scheduling.md) | position-based schedule summary report | report | Position-based scheduling | response to TC[22,17]; response to TC[22,12]; response to TC[22,14] | 6.22.9.1 | 8.22.2.13 (p. 588) | p. 652 |
| 22 | 14 | [TC[22,14]](st22-position-based-scheduling.md) | summary-report the position-based scheduled activities identified by a filter | request | Position-based scheduling | by declaration | 6.22.12.5 | 8.22.2.14 (p. 589) | p. 652 |
| 22 | 15 | [TC[22,15]](st22-position-based-scheduling.md) | position-shift all scheduled activities | request | Position-based scheduling | by declaration | 6.22.10.2 | 8.22.2.15 (p. 590) | p. 652 |
| 22 | 16 | [TC[22,16]](st22-position-based-scheduling.md) | detail-report all position-based scheduled activities | request | Position-based scheduling | by declaration | 6.22.10.4 | 8.22.2.16 (p. 590) | p. 652 |
| 22 | 17 | [TC[22,17]](st22-position-based-scheduling.md) | summary-report all position-based scheduled activities | request | Position-based scheduling | by declaration | 6.22.10.3 | 8.22.2.17 (p. 590) | p. 652 |
| 22 | 18 | [TC[22,18]](st22-position-based-scheduling.md) | report the status of each position-based sub-schedule | request | Position-based scheduling | by declaration | 6.22.7.2.3 | 8.22.2.18 (p. 590) | p. 651 |
| 22 | 19 | [TM[22,19]](st22-position-based-scheduling.md) | position-based sub-schedule status report | report | Position-based scheduling | response to TC[22,18] | 6.22.7.2.3 | 8.22.2.19 (p. 591) | p. 651 |
| 22 | 20 | [TC[22,20]](st22-position-based-scheduling.md) | enable position-based sub-schedules | request | Position-based scheduling | by declaration | 6.22.7.2.1 | 8.22.2.20 (p. 591) | p. 651 |
| 22 | 21 | [TC[22,21]](st22-position-based-scheduling.md) | disable position-based sub-schedules | request | Position-based scheduling | implied by TC[22,20] | 6.22.7.2.2 | 8.22.2.21 (p. 591) | p. 651 |
| 22 | 22 | [TC[22,22]](st22-position-based-scheduling.md) | create position-based scheduling groups | request | Position-based scheduling | by declaration | 6.22.8.2.1 | 8.22.2.22 (p. 592) | p. 651 |
| 22 | 23 | [TC[22,23]](st22-position-based-scheduling.md) | delete position-based scheduling groups | request | Position-based scheduling | implied by TC[22,22] | 6.22.8.2.2 | 8.22.2.23 (p. 592) | p. 651 |
| 22 | 24 | [TC[22,24]](st22-position-based-scheduling.md) | enable position-based scheduling groups | request | Position-based scheduling | implied by TC[22,22] | 6.22.8.3.1 | 8.22.2.24 (p. 593) | p. 651 |
| 22 | 25 | [TC[22,25]](st22-position-based-scheduling.md) | disable position-based scheduling groups | request | Position-based scheduling | implied by TC[22,24] | 6.22.8.3.2 | 8.22.2.25 (p. 593) | p. 651 |
| 22 | 26 | [TC[22,26]](st22-position-based-scheduling.md) | report the status of each position-based scheduling group | request | Position-based scheduling | requires TC[22,22] | 6.22.8.3.3 | 8.22.2.26 (p. 593) | p. 651 |
| 22 | 27 | [TM[22,27]](st22-position-based-scheduling.md) | position-based scheduling group status report | report | Position-based scheduling | response to TC[22,26] | 6.22.8.3.3 | 8.22.2.27 (p. 594) | p. 651 |
| 22 | 28 | [TC[22,28]](st22-position-based-scheduling.md) | set the orbit number | request | Position-based scheduling | by declaration | 6.22.6.4 | 8.22.2.28 (p. 594) | p. 651 |
| 23 | 1 | [TC[23,1]](st23-file-management.md) | create a file | request | File handling | minimum | 6.23.4.1.1 | 8.23.2.1 (p. 596) | p. 653 |
| 23 | 2 | [TC[23,2]](st23-file-management.md) | delete a file | request | File handling | minimum | 6.23.4.1.2 | 8.23.2.2 (p. 596) | p. 653 |
| 23 | 3 | [TC[23,3]](st23-file-management.md) | report the attributes of a file | request | File handling | minimum | 6.23.4.2 | 8.23.2.3 (p. 597) | p. 653 |
| 23 | 4 | [TM[23,4]](st23-file-management.md) | file attribute report | report | File handling | response to TC[23,3] | 6.23.4.2 | 8.23.2.4 (p. 597) | p. 653 |
| 23 | 5 | [TC[23,5]](st23-file-management.md) | lock a file | request | File handling | by declaration | 6.23.4.3.1 | 8.23.2.5 (p. 598) | p. 653 |
| 23 | 6 | [TC[23,6]](st23-file-management.md) | unlock a file | request | File handling | implied by TC[23,5] | 6.23.4.3.2 | 8.23.2.6 (p. 598) | p. 653 |
| 23 | 7 | [TC[23,7]](st23-file-management.md) | find files | request | File handling | by declaration | 6.23.4.4 | 8.23.2.7 (p. 598) | p. 653 |
| 23 | 8 | [TM[23,8]](st23-file-management.md) | found files report | report | File handling | response to TC[23,7] | 6.23.4.4 | 8.23.2.8 (p. 599) | p. 653 |
| 23 | 9 | [TC[23,9]](st23-file-management.md) | create a directory | request | File handling | by declaration | 6.23.4.5.1 | 8.23.2.9 (p. 599) | p. 653 |
| 23 | 10 | [TC[23,10]](st23-file-management.md) | delete a directory | request | File handling | implied by TC[23,9] | 6.23.4.5.2 | 8.23.2.10 (p. 599) | p. 653 |
| 23 | 11 | [TC[23,11]](st23-file-management.md) | rename a directory | request | File handling | implied by TC[23,9] | 6.23.4.5.3 | 8.23.2.11 (p. 600) | p. 653 |
| 23 | 12 | [TC[23,12]](st23-file-management.md) | summary-report the content of a repository | request | File handling | by declaration | 6.23.4.6 | 8.23.2.12 (p. 600) | p. 653 |
| 23 | 13 | [TM[23,13]](st23-file-management.md) | repository content summary report | report | File handling | response to TC[23,12] | 6.23.4.6 | 8.23.2.13 (p. 600) | p. 653 |
| 23 | 14 | [TC[23,14]](st23-file-management.md) | copy a file | request | File copy | minimum | 6.23.5.2.2 | 8.23.2.14 (p. 601) | p. 654 |
| 23 | 15 | [TC[23,15]](st23-file-management.md) | move a file | request | File copy | by declaration | 6.23.5.2.3 | 8.23.2.15 (p. 601) | p. 654 |
| 23 | 16 | [TC[23,16]](st23-file-management.md) | suspend file copy operations | request | File copy | by declaration | 6.23.5.3.1 | 8.23.2.16 (p. 602) | p. 654 |
| 23 | 17 | [TC[23,17]](st23-file-management.md) | resume file copy operations | request | File copy | implied by TC[23,16] | 6.23.5.3.2 | 8.23.2.17 (p. 602) | p. 654 |
| 23 | 18 | [TC[23,18]](st23-file-management.md) | abort file copy operations | request | File copy | by declaration | 6.23.5.4.1 | 8.23.2.18 (p. 602) | p. 654 |
| 23 | 19 | [TC[23,19]](st23-file-management.md) | suspend all file copy operations involving a repository path | request | File copy | by declaration | 6.23.5.3.3 | 8.23.2.19 (p. 603) | p. 654 |
| 23 | 20 | [TC[23,20]](st23-file-management.md) | resume all file copy operations involving a repository path | request | File copy | implied by TC[23,19] | 6.23.5.3.4 | 8.23.2.20 (p. 603) | p. 654 |
| 23 | 21 | [TC[23,21]](st23-file-management.md) | abort all file copy operations involving a repository path | request | File copy | by declaration | 6.23.5.4.2 | 8.23.2.21 (p. 603) | p. 654 |
| 23 | 22 | [TC[23,22]](st23-file-management.md) | enable the periodic reporting of the file copy status | request | File copy | by declaration | 6.23.5.5.2 | 8.23.2.22 (p. 604) | p. 654 |
| 23 | 23 | [TM[23,23]](st23-file-management.md) | file copy status report | report | File copy | response to TC[23,22] | 6.23.5.5.4 | 8.23.2.23 (p. 604) | p. 654 |
| 23 | 24 | [TC[23,24]](st23-file-management.md) | disable the periodic reporting of the file copy status | request | File copy | implied by TC[23,22] | 6.23.5.5.3 | 8.23.2.24 (p. 605) | p. 654 |

</div>

## Solar Orbiter: type and subtype usage in the MIB

### The release and how it was counted

The figures below come from this wiki's own queries on release **MIB__20250916M25925PFMS001_SOL**.
Its version description record ([vdf](../../mib/tables/vdf.md)) has the name `25925PFM`, the
comment `20250916-CSW3.1.2_MAS7.33`, release 25925 and issue 733.[^mib25] For each (type, subtype)
the page counts:

* **TM definitions**: rows of [pid](../../mib/tables/pid.md) with that PID_TYPE and PID_STYPE.
  SCOS-2000 keys a packet definition on type, subtype, APID and the extra identification fields,
  so one PUS report type can map to many rows.[^icd-pid]
* **TC definitions**: rows of [ccf](../../mib/tables/ccf.md) with that CCF_TYPE and CCF_STYPE and
  the nominal packet header `NOM_TC`. Left out are 125 `HPC1_TC` high-priority commands and 5
  `NO_HDR` entries, none of which has a type, and 6 `NOS2KHDR` ground commands of type 251 (open
  or close TM and TC links and sessions).[^mib25]

Solar Orbiter follows PUS-A. Its TM/TC ICD tailors the services from the ESA PUS (applicable
document AD1, ECSS-E-70-41A) and allows other TM and TC than the standard ones of each capability set only if
agreed with ESA and Astrium.[^solo-ad1] The comparison therefore uses both
editions:

| Status | Meaning | Pairs below type 128 |
|---|---|---|
| **A+C** | the number is a standard message type of the same kind (TC or TM) in PUS-A Table 43 *and* in PUS-C | 103 |
| **A** | standard in PUS-A only | 5 |
| **C** | standard in PUS-C only (the number coincides) | 1 |
| **M** | mission-specific subtype (always 128 or above here) in a standard PUS-A service | 97 |
| **M (own service)** | a mission service in the standard range that PUS-A does not define (16, 20, 21, 22); any PUS-C name shown belongs to a different service | 20 |
| **-** | type 0, packets without a data field header | 1 |

The status compares **numbers**, not meanings: the PUS-A and PUS-C names are shown so that the
reader can judge how close they are. PUS-A Table 43, as transcribed for this page, defines 163
message types (111 TC, 52 TM), and the 2025 MIB uses 108 of them.[^a-table43][^mib25]

### Observations

* **Unused services.** Types 4, 7 and 10 do not occur, as the ICD states ("not used at all").[^solo-svc4][^mib25]
* **Verification.** Only TM(1,1), (1,2), (1,7) and (1,8) appear; there are no start or progress
  reports (1,3) to (1,6), matching the ICD's service 1 list.[^solo-list1][^mib25]
* **CPDU numbering.** CPDU commands use (2,3), the PUS-A number; PUS-C moved "distribute CPDU
  commands" to TC[2,4].[^a-table43][^c-clause8][^mib25]
* **Memory management.** Only the absolute-address variants (6,2), (6,5), (6,6), (6,9) and (6,10)
  are used; PUS-A's base-plus-offset messages (6,1), (6,3), (6,4), (6,7) and (6,8) are absent.[^a-table43][^mib25]
* **Large data transfer.** Uplink uses PUS-A subtypes (13,9) to (13,11) and (13,13) to (13,16).
  Of these, (13,13) "Abort Reception of Uplinked Data" and the reports (13,14) and (13,15) exist
  only in PUS-A, while (13,16) keeps its number in PUS-C as TM[13,16] large packet uplink abortion
  report. Downlink uses private subtypes from
  129 up rather than (13,1) to (13,8). See [CFDP](../../ccsds/cfdp.md#solar-orbiter-file-transfer-without-cfdp)
  and [ST[23]](st23-file-management.md#ssmm-packet-stores-as-files-service-15-and-file-transfer-service-13).[^mib25][^a-table43]
* **OBCPs.** (18,1) to (18,4) are absent; the mission loads and starts OBCPs with (18,140) and stops
  and deletes them with (18,141).[^mib25][^solo-list18]
* **The one "C".** (17,3) "Request Connection Test" is not in PUS-A Table 43 but has the number
  of the PUS-C TC[17,3] "perform an on-board connection test". Whether this is deliberate is not
  stated in the available sources.[^a-table43][^c-clause8][^mib25]
* **Own services in the standard range.** Type 16 is Solar Orbiter's "On-Board Traffic Management"
  (MilBus commands), 20 "Information Distribution", 21 "Science Data Transfer" and 22 "Context
  Saving". PUS-C later gave 20, 21 and 22 different meanings: parameter management,
  request sequencing and [position-based scheduling](st22-position-based-scheduling.md).[^solo-list][^c-table41][^mib25]
* **Extensions.** Every mission-specific subtype inside a standard PUS-A service is numbered 128 or
  higher, as both editions require.[^a-ranges][^c-5331][^mib25]

### Types 0 to 127, per (type, subtype)

**PID** counts TM packet definitions and **CCF** counts nominal TC definitions. The example is the
lowest SPID or alphabetically first command name for that pair, linked to the
[MIB explorer](../../explorer/index.md#/solo/search/TM); its description is copied from the MIB
and shortened. Click a heading to sort.[^mib25][^a-table43][^c-clause8]

<div class="sortable-table" markdown>

| Type | Sub | PID | CCF | Example in the MIB | PUS-A name (Table 43) | PUS-C name | Status |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 11 | 0 | [36997](../../explorer/index.md#/solo/packet/36997) OBC\_HPTM\_packet | - | - | - |
| 1 | 1 | 29 | 0 | [10105](../../explorer/index.md#/solo/packet/10105) Telecommand Acceptance Report - Success | Telecommand Acceptance Report - Success | successful acceptance verification report | A+C |
| 1 | 2 | 274 | 0 | [10019](../../explorer/index.md#/solo/packet/10019) Calculated checksum not equal to received... | Telecommand Acceptance Report - Failure | failed acceptance verification report | A+C |
| 1 | 7 | 29 | 0 | [10106](../../explorer/index.md#/solo/packet/10106) Telecommand Execution Completed Report - S... | Telecommand Execution Completed Report - Success | successful completion of execution verification report | A+C |
| 1 | 8 | 1477 | 0 | [10017](../../explorer/index.md#/solo/packet/10017) Attempt to modify or delete an enabled det... | Telecommand Execution Completed Report - Failure | failed completion of execution verification report | A+C |
| 2 | 3 | 0 | 105 | [ZCD00203](../../explorer/index.md#/solo/command/ZCD00203) Distribute CPDU commands | Distribute CPDU Commands | - | A |
| 2 | 128 | 0 | 1257 | [ZAHG0000](../../explorer/index.md#/solo/command/ZAHG0000) H-APME\_A Go To Az-El | - | - | M |
| 2 | 129 | 1 | 0 | [14002](../../explorer/index.md#/solo/packet/14002) 1553 Command Report | - | - | M |
| 2 | 130 | 0 | 1 | [ZCD00282](../../explorer/index.md#/solo/command/ZCD00282) Distribute SpaceWire Commands | - | - | M |
| 3 | 1 | 0 | 82 | [ZCA00301](../../explorer/index.md#/solo/command/ZCA00301) Define New Housekeeping Parameter Report | Define New Housekeeping Parameter Report | create a housekeeping parameter report structure | A+C |
| 3 | 2 | 0 | 77 | [ZCA00302](../../explorer/index.md#/solo/command/ZCA00302) Define New Diagnostic Parameter Report | Define New Diagnostic Parameter Report | create a diagnostic parameter report structure | A+C |
| 3 | 3 | 0 | 7 | [ZCA00303](../../explorer/index.md#/solo/command/ZCA00303) Clear HK Para Rpt | Clear Housekeeping Parameter Report Definitions | delete housekeeping parameter report structures | A+C |
| 3 | 4 | 0 | 6 | [ZCA00304](../../explorer/index.md#/solo/command/ZCA00304) Clear Diagnostic Parameter Rpt | Clear Diagnostic Parameter Report Definitions | delete diagnostic parameter report structures | A+C |
| 3 | 5 | 0 | 24 | [ZCA00305](../../explorer/index.md#/solo/command/ZCA00305) Enable HK Para Rpt Gen | Enable Housekeeping Parameter Report Generation | enable the periodic generation of housekeeping parameter reports | A+C |
| 3 | 6 | 0 | 24 | [ZCA00306](../../explorer/index.md#/solo/command/ZCA00306) Disable HK Para Rpt Gen | Disable Housekeeping Parameter Report Generation | disable the periodic generation of housekeeping parameter reports | A+C |
| 3 | 7 | 0 | 6 | [ZCA00307](../../explorer/index.md#/solo/command/ZCA00307) Enable Diagnostic Parameter Rpt Gen | Enable Diagnostic Parameter Report Generation | enable the periodic generation of diagnostic parameter reports | A+C |
| 3 | 8 | 0 | 6 | [ZCA00308](../../explorer/index.md#/solo/command/ZCA00308) Disable Diagnostic Parameter Rpt Gen | Disable Diagnostic Parameter Report Generation | disable the periodic generation of diagnostic parameter reports | A+C |
| 3 | 9 | 0 | 7 | [ZCA00309](../../explorer/index.md#/solo/command/ZCA00309) Get Housekeeping Parameter Report Defns | Report Housekeeping Parameter Report Definitions | report housekeeping parameter report structures | A+C |
| 3 | 10 | 7 | 0 | [10100](../../explorer/index.md#/solo/packet/10100) Housekeeping Parameter Report Definitions... | Housekeeping Parameter Report Definitions Report | housekeeping parameter report structure report | A+C |
| 3 | 11 | 0 | 6 | [ZCA0030B](../../explorer/index.md#/solo/command/ZCA0030B) Rpt Diagnostic Parameter Rpt | Report Diagnostic Parameter Report Definitions | report diagnostic parameter report structures | A+C |
| 3 | 12 | 6 | 0 | [10099](../../explorer/index.md#/solo/packet/10099) Diagnostic Parameter Report Definitions Re... | Diagnostic Parameter Report Definitions Report | diagnostic parameter report structure report | A+C |
| 3 | 25 | 288 | 0 | [19500](../../explorer/index.md#/solo/packet/19500) DMS OBC Status Fast | Housekeeping Parameter Report | housekeeping parameter report | A+C |
| 3 | 26 | 89 | 0 | [19556](../../explorer/index.md#/solo/packet/19556) DMS 1553 Bus Manager Investigation | Diagnostic Parameter Report | diagnostic parameter report | A+C |
| 3 | 128 | 0 | 7 | [ZCA00380](../../explorer/index.md#/solo/command/ZCA00380) Rpt HK/Diag Parameter Rpt in Sum Form | - | - | M |
| 3 | 129 | 0 | 19 | [ZIA58052](../../explorer/index.md#/solo/command/ZIA58052) SWA\_TC\_HK\_RATE | - | - | M |
| 3 | 130 | 0 | 14 | [ZCA00382](../../explorer/index.md#/solo/command/ZCA00382) Define HK Para Rpt Collection Interval | - | - | M |
| 3 | 131 | 0 | 6 | [ZCA00383](../../explorer/index.md#/solo/command/ZCA00383) Define Diagnostic Parameter Report Colle | - | - | M |
| 3 | 134 | 7 | 0 | [10101](../../explorer/index.md#/solo/packet/10101) HK/Diag Parameter Report Definitions Repor... | - | - | M |
| 3 | 136 | 0 | 8 | [ZCA00388](../../explorer/index.md#/solo/command/ZCA00388) Request housekeeping Parameter Report | - | - | M |
| 3 | 138 | 0 | 40 | [ZCA0038A](../../explorer/index.md#/solo/command/ZCA0038A) Add HK Paras to Existing HK Def | - | - | M |
| 3 | 139 | 0 | 6 | [ZCA0038B](../../explorer/index.md#/solo/command/ZCA0038B) Request Snapshot HK Para Anomaly Rpt | - | - | M |
| 5 | 1 | 1374 | 0 | [10116](../../explorer/index.md#/solo/packet/10116) SSMM\_Activate\_Ended | Normal/Progress Report | informative event report | A+C |
| 5 | 2 | 1159 | 0 | [10004](../../explorer/index.md#/solo/packet/10004) MON\_LIB\_Param\_Transitioned\_Ok\_Value\_(Syste... | Error/Anomaly Report - Low Severity | low severity anomaly report | A+C |
| 5 | 3 | 2911 | 0 | [10002](../../explorer/index.md#/solo/packet/10002) An\_Event\_Action\_is\_triggered | Error/Anomaly Report - Medium Severity | medium severity anomaly report | A+C |
| 5 | 4 | 1698 | 0 | [10003](../../explorer/index.md#/solo/packet/10003) Cyclic\_Task\_Overrun\_(SystemControl) | Error/Anomaly Report - High Severity | high severity anomaly report | A+C |
| 5 | 5 | 0 | 10 | [ZCA00505](../../explorer/index.md#/solo/command/ZCA00505) Enable Event Report Generation | Enable Event Report Generation | enable the report generation of event definitions | A+C |
| 5 | 6 | 0 | 10 | [ZCA00506](../../explorer/index.md#/solo/command/ZCA00506) Disable Event Report Generation | Disable Event Report Generation | disable the report generation of event definitions | A+C |
| 5 | 128 | 0 | 1 | [ZCD00580](../../explorer/index.md#/solo/command/ZCD00580) Clear Critical Event Log | - | - | M |
| 5 | 129 | 0 | 1 | [ZCD00581](../../explorer/index.md#/solo/command/ZCD00581) Downlink Crit. Event Log | - | - | M |
| 5 | 130 | 1 | 0 | [14278](../../explorer/index.md#/solo/packet/14278) Critical\_Event\_Table\_of\_Occurrence\_(TC\_5-1... | - | - | M |
| 5 | 131 | 0 | 6 | [ZCA00583](../../explorer/index.md#/solo/command/ZCA00583) Report Enabled Event Packets | - | - | M |
| 5 | 132 | 6 | 0 | [10016](../../explorer/index.md#/solo/packet/10016) Enabled\_Event\_packets-(Resp\_TC\_5-131)\_(Sys... | - | - | M |
| 5 | 133 | 0 | 7 | [ZCA00585](../../explorer/index.md#/solo/command/ZCA00585) Report Disabled Event Packets | - | - | M |
| 5 | 134 | 7 | 0 | [10015](../../explorer/index.md#/solo/packet/10015) Disabled\_Event\_packets-(Resp\_TC\_5-134)\_(Sy... | - | - | M |
| 6 | 2 | 0 | 91 | [ZCAX0002](../../explorer/index.md#/solo/command/ZCAX0002) NOP WSM Strob STR Activate 3.1.2 | Load Memory using Absolute Addresses | load raw memory data areas | A+C |
| 6 | 5 | 0 | 82 | [ZCAX0001](../../explorer/index.md#/solo/command/ZCAX0001) Dump WSM Strob STR Activate 3.1.2 | Dump Memory using Absolute Addresses | dump raw memory data | A+C |
| 6 | 6 | 289 | 0 | [19501](../../explorer/index.md#/solo/packet/19501) Memory Dump A\_PM\_PROM | Memory Dump using Absolute Addresses Report | dumped raw memory data report | A+C |
| 6 | 9 | 0 | 29 | [ZCD00609](../../explorer/index.md#/solo/command/ZCD00609) Check Memory Using Absolute Address | Check Memory using Absolute Addresses | check raw memory data | A+C |
| 6 | 10 | 20 | 0 | [14170](../../explorer/index.md#/solo/packet/14170) Memory Check Using Absolute Address Report | Memory Check using Absolute Addresses Report | checked raw memory data report | A+C |
| 6 | 128 | 0 | 2 | [ZCD00680](../../explorer/index.md#/solo/command/ZCD00680) Apply Pre-loaded Set of RAM Patches | - | - | M |
| 6 | 129 | 0 | 5 | [ZIA58056](../../explorer/index.md#/solo/command/ZIA58056) SWA\_TC\_MEM\_DUMP\_ABORT | - | - | M |
| 6 | 130 | 0 | 3 | [ZSM00014](../../explorer/index.md#/solo/command/ZSM00014) SSMM Enable EEPROM Patch | - | - | M |
| 6 | 131 | 0 | 3 | [ZSM00017](../../explorer/index.md#/solo/command/ZSM00017) SSMM Disable EEPROM Patch | - | - | M |
| 6 | 140 | 0 | 6 | [ZCD0068C](../../explorer/index.md#/solo/command/ZCD0068C) Load Memory With Mask | - | - | M |
| 8 | 1 | 0 | 64 | [ZCSF0002](../../explorer/index.md#/solo/command/ZCSF0002) Spacewire Failure Recovery | Perform Function | perform a function | A+C |
| 8 | 140 | 0 | 1 | [ZCS0088C](../../explorer/index.md#/solo/command/ZCS0088C) Enable Function Execution | - | - | M |
| 8 | 141 | 0 | 1 | [ZCS0088D](../../explorer/index.md#/solo/command/ZCS0088D) Disable Function Execution | - | - | M |
| 8 | 142 | 0 | 1 | [ZCS0088E](../../explorer/index.md#/solo/command/ZCS0088E) Enable Autoreset Execution Enable Flag | - | - | M |
| 8 | 143 | 0 | 1 | [ZCS0088F](../../explorer/index.md#/solo/command/ZCS0088F) Disable Autoreset Execution Enable Flag | - | - | M |
| 8 | 144 | 0 | 1 | [ZCS00890](../../explorer/index.md#/solo/command/ZCS00890) Report Function Status | - | - | M |
| 8 | 145 | 1 | 0 | [10096](../../explorer/index.md#/solo/packet/10096) Function Status Report | - | - | M |
| 9 | 1 | 0 | 1 | [ZCD00901](../../explorer/index.md#/solo/command/ZCD00901) Change Time Report Generation Rate | Change Time Report Generation Rate | set the time report generation rate | A+C |
| 9 | 2 | 1 | 0 | [9999](../../explorer/index.md#/solo/packet/9999) Time Report | Time Report | CUC time report | A+C |
| 9 | 130 | 0 | 2 | [ZCD00982](../../explorer/index.md#/solo/command/ZCD00982) Start Time Synchronisation to User | - | - | M |
| 9 | 131 | 0 | 1 | [ZCD00983](../../explorer/index.md#/solo/command/ZCD00983) Stop Time Synchronisation to User | - | - | M |
| 11 | 1 | 0 | 1 | [ZCD00B01](../../explorer/index.md#/solo/command/ZCD00B01) Enable Release of Telecommands | Enable Release of Telecommands | enable the time-based schedule execution function | A+C |
| 11 | 2 | 0 | 15 | [ZCD00B02](../../explorer/index.md#/solo/command/ZCD00B02) Disable Release of Telecommands | Disable Release of Telecommands | disable the time-based schedule execution function | A+C |
| 11 | 3 | 0 | 1 | [ZCD00B03](../../explorer/index.md#/solo/command/ZCD00B03) Reset Command Schedule | Reset Command Schedule | reset the time-based schedule | A+C |
| 11 | 4 | 0 | 2 | [INSERTTT](../../explorer/index.md#/solo/command/INSERTTT) Insert Telecommands in Command Schedule | Insert Telecommands in Command Schedule | insert activities into the time-based schedule | A+C |
| 11 | 5 | 0 | 1 | [ZCD00B05](../../explorer/index.md#/solo/command/ZCD00B05) Delete Telecommands | Delete Telecommands | delete time-based scheduled activities identified by request identifier | A+C |
| 11 | 6 | 0 | 1 | [ZCD00B06](../../explorer/index.md#/solo/command/ZCD00B06) Delete Telecommands over Time Period | Delete Telecommands over Time Period | delete the time-based scheduled activities identified by a filter | A+C |
| 11 | 7 | 0 | 1 | [ZCD00B07](../../explorer/index.md#/solo/command/ZCD00B07) Time-Shift Selected Telecommands | Time-Shift Selected Telecommands | time-shift scheduled activities identified by request identifier | A+C |
| 11 | 8 | 0 | 1 | [ZCD00B08](../../explorer/index.md#/solo/command/ZCD00B08) TimeShift Selected TCs over Time Period | Time-Shift Telecommands over Time Period | time-shift the scheduled activities identified by a filter | A+C |
| 11 | 9 | 0 | 1 | [ZCD00B09](../../explorer/index.md#/solo/command/ZCD00B09) Rpt subset TC schedule in detailed form | Report Subset of Command Schedule in Detailed Form | detail-report time-based scheduled activities identified by request identifier | A+C |
| 11 | 10 | 1 | 0 | [14175](../../explorer/index.md#/solo/packet/14175) Detailed Schedule Report | Detailed Schedule Report | time-based schedule detail report | A+C |
| 11 | 11 | 0 | 1 | [ZCD00B0B](../../explorer/index.md#/solo/command/ZCD00B0B) Rpt Subset TC Schd Detail Form over Time | Report Subset of Command Schedule in Detailed Form over Time Period | detail-report the time-based scheduled activities identified by a filter | A+C |
| 11 | 12 | 0 | 1 | [ZCD00B0C](../../explorer/index.md#/solo/command/ZCD00B0C) Rpt subset command schedule in Sum form | Report Subset of Command Schedule in Summary Form | summary-report time-based scheduled activities identified by request identifier | A+C |
| 11 | 13 | 1 | 0 | [14176](../../explorer/index.md#/solo/packet/14176) Summary Schedule Report | Summary Schedule Report | time-based schedule summary report | A+C |
| 11 | 14 | 0 | 1 | [ZCD00B0E](../../explorer/index.md#/solo/command/ZCD00B0E) Rpt Subset TC Sched in Summary over Time | Report Subset of Command Schedule in Summary Form over Time Period | summary-report the time-based scheduled activities identified by a filter | A+C |
| 11 | 15 | 0 | 1 | [ZCD00B0F](../../explorer/index.md#/solo/command/ZCD00B0F) Time-Shift all Time-Tagged Telecommands | Time-Shift All Telecommands | time-shift all scheduled activities | A+C |
| 11 | 16 | 0 | 1 | [ZCD00B10](../../explorer/index.md#/solo/command/ZCD00B10) Report Command Schedule in Detailed Form | Report Command Schedule in Detailed Form | detail-report all time-based scheduled activities | A+C |
| 11 | 17 | 0 | 1 | [ZCD00B11](../../explorer/index.md#/solo/command/ZCD00B11) Report Command Schedule in Summary Form | Report Command Schedule in Summary Form | summary-report all time-based scheduled activities | A+C |
| 11 | 18 | 0 | 1 | [ZCD00B12](../../explorer/index.md#/solo/command/ZCD00B12) Report Status of Command Schedule | Report Status of Command Schedule | report the status of each time-based sub-schedule | A+C |
| 11 | 19 | 1 | 0 | [14174](../../explorer/index.md#/solo/packet/14174) Command Schedule Status Report | Command Schedule Status Report | time-based sub-schedule status report | A+C |
| 11 | 132 | 0 | 2 | [INSERTBU](../../explorer/index.md#/solo/command/INSERTBU) Insert Backup MTL Telecommands in Comman | - | - | M |
| 12 | 1 | 0 | 13 | [ZCA00C01](../../explorer/index.md#/solo/command/ZCA00C01) Enable Monitoring of Parameters | Enable Monitoring of Parameters | enable parameter monitoring definitions | A+C |
| 12 | 2 | 0 | 13 | [ZCA00C02](../../explorer/index.md#/solo/command/ZCA00C02) Disable Monitoring of Parameters | Disable Monitoring of Parameters | disable parameter monitoring definitions | A+C |
| 12 | 3 | 0 | 7 | [ZCA00C03](../../explorer/index.md#/solo/command/ZCA00C03) Change Max Delay | Change Maximum Reporting Delay | change the maximum transition reporting delay | A+C |
| 12 | 4 | 0 | 6 | [ZCA00C04](../../explorer/index.md#/solo/command/ZCA00C04) Clear Monitoring List | Clear Monitoring List | delete all parameter monitoring definitions | A+C |
| 12 | 5 | 0 | 114 | [ZCA00C05](../../explorer/index.md#/solo/command/ZCA00C05) Add parameters to Monitoring list | Add Parameters to Monitoring List | add parameter monitoring definitions | A+C |
| 12 | 6 | 0 | 6 | [ZCA00C06](../../explorer/index.md#/solo/command/ZCA00C06) Delete Parameters from Monitoring List | Delete Parameters from Monitoring List | delete parameter monitoring definitions | A+C |
| 12 | 7 | 0 | 83 | [ZCA00C07](../../explorer/index.md#/solo/command/ZCA00C07) Modify Parameter Checking Information | Modify Parameter Checking Information | modify parameter monitoring definitions | A+C |
| 12 | 8 | 0 | 6 | [ZCA00C08](../../explorer/index.md#/solo/command/ZCA00C08) Report Current Monitoring List | Report Current Monitoring List | report parameter monitoring definitions | A+C |
| 12 | 9 | 19 | 0 | [10103](../../explorer/index.md#/solo/packet/10103) Monitoring List Report | Current Monitoring List Report | parameter monitoring definition report | A+C |
| 12 | 10 | 0 | 6 | [ZCA00C0A](../../explorer/index.md#/solo/command/ZCA00C0A) Report Parameters Out-Of-Limit | Report Current Parameters Out-of-limit List | report the out-of-limits | A+C |
| 12 | 11 | 6 | 0 | [10104](../../explorer/index.md#/solo/packet/10104) Parameters Out-of-limit List Report | Current Parameters Out-of-limit List Report | out-of-limits report | A+C |
| 12 | 12 | 7 | 0 | [10102](../../explorer/index.md#/solo/packet/10102) Check Transition Report | Check Transition Report | check transition report | A+C |
| 13 | 9 | 0 | 1 | [ZCD00D09](../../explorer/index.md#/solo/command/ZCD00D09) Accept First Uplink Part | Accept First Uplink Part | uplink the first part | A+C |
| 13 | 10 | 0 | 1 | [ZCD00D0A](../../explorer/index.md#/solo/command/ZCD00D0A) Accept Intermediate Uplink Part | Accept Intermediate Uplink Part | uplink an intermediate part | A+C |
| 13 | 11 | 0 | 1 | [ZCD00D0B](../../explorer/index.md#/solo/command/ZCD00D0B) Accept Last Uplink Part | Accept Last Uplink Part | uplink the last part | A+C |
| 13 | 13 | 0 | 1 | [ZCD00D0D](../../explorer/index.md#/solo/command/ZCD00D0D) Abort Reception of Uplinked Data | Abort Reception of Uplinked Data | - | A |
| 13 | 14 | 1 | 0 | [14166](../../explorer/index.md#/solo/packet/14166) Uplink Reception Acknowledgement Report | Uplink Reception Acknowledgement Report | - | A |
| 13 | 15 | 1 | 0 | [14167](../../explorer/index.md#/solo/packet/14167) Unsuccessfully Received Parts Report | Unsuccessfully Received Parts Report | - | A |
| 13 | 16 | 1 | 0 | [14168](../../explorer/index.md#/solo/packet/14168) Reception Abort Report | Reception Abort Report | large packet uplink abortion report | A+C |
| 13 | 128 | 0 | 1 | [ZCD00D80](../../explorer/index.md#/solo/command/ZCD00D80) Change File Transfer Time-out Value | - | - | M |
| 13 | 129 | 0 | 1 | [ZSM00050](../../explorer/index.md#/solo/command/ZSM00050) SSMM Start FTS | - | - | M |
| 13 | 130 | 1 | 0 | [80012](../../explorer/index.md#/solo/packet/80012) SSMM LLFT Start Report | - | - | M |
| 13 | 131 | 0 | 1 | [ZSM00055](../../explorer/index.md#/solo/command/ZSM00055) SSMM Suspend FTS | - | - | M |
| 13 | 132 | 0 | 1 | [ZSM00060](../../explorer/index.md#/solo/command/ZSM00060) SSMM Resume FTS | - | - | M |
| 13 | 133 | 0 | 1 | [ZSM00065](../../explorer/index.md#/solo/command/ZSM00065) SSMM Terminate FTS | - | - | M |
| 13 | 134 | 0 | 1 | [ZSM00070](../../explorer/index.md#/solo/command/ZSM00070) SSMM Abort FTS | - | - | M |
| 13 | 135 | 0 | 3 | [ZSM00075](../../explorer/index.md#/solo/command/ZSM00075) SSMM Append LLFT | - | - | M |
| 13 | 136 | 0 | 1 | [ZSM00080](../../explorer/index.md#/solo/command/ZSM00080) SSMM Change FTS EOFT Timeout | - | - | M |
| 13 | 137 | 0 | 1 | [ZSM00085](../../explorer/index.md#/solo/command/ZSM00085) SSMM Change FTS Down Link VC | - | - | M |
| 13 | 138 | 0 | 1 | [ZSM00090](../../explorer/index.md#/solo/command/ZSM00090) SSMM Change FTS Retransmit Limit | - | - | M |
| 13 | 139 | 0 | 1 | [ZSM00095](../../explorer/index.md#/solo/command/ZSM00095) SSMM Request FTS Parameters Report | - | - | M |
| 13 | 140 | 1 | 0 | [80013](../../explorer/index.md#/solo/packet/80013) SSMM FTS Parameters Report | - | - | M |
| 13 | 141 | 0 | 1 | [ZSM00100](../../explorer/index.md#/solo/command/ZSM00100) SSMM En Dis LLFT | - | - | M |
| 13 | 142 | 0 | 3 | [ZSM00105](../../explorer/index.md#/solo/command/ZSM00105) SSMM Replace LLFT | - | - | M |
| 13 | 143 | 0 | 1 | [ZSM00110](../../explorer/index.md#/solo/command/ZSM00110) SSMM Suspend LLFT | - | - | M |
| 13 | 144 | 0 | 1 | [ZSM00115](../../explorer/index.md#/solo/command/ZSM00115) SSMM Resume LLFT | - | - | M |
| 13 | 145 | 0 | 1 | [ZSM00120](../../explorer/index.md#/solo/command/ZSM00120) SSMM Abort LLFT | - | - | M |
| 13 | 146 | 0 | 1 | [ZSM00125](../../explorer/index.md#/solo/command/ZSM00125) SSMM Repeat LLFT Parts | - | - | M |
| 13 | 147 | 0 | 1 | [ZSM00130](../../explorer/index.md#/solo/command/ZSM00130) SSMM Confirm Correct FDUs Reception | - | - | M |
| 13 | 148 | 0 | 1 | [ZSM00135](../../explorer/index.md#/solo/command/ZSM00135) SSMM Request LLFT EOFT Report | - | - | M |
| 13 | 149 | 1 | 0 | [80014](../../explorer/index.md#/solo/packet/80014) SSMM LLFT EOFT Report | - | - | M |
| 13 | 150 | 1 | 0 | [80015](../../explorer/index.md#/solo/packet/80015) SSMM Retrasmission OOL | - | - | M |
| 13 | 151 | 1 | 0 | [80016](../../explorer/index.md#/solo/packet/80016) SSMM EOFT timeout | - | - | M |
| 13 | 152 | 1 | 0 | [80018](../../explorer/index.md#/solo/packet/80018) SSMM FDU Layout | - | - | M |
| 13 | 153 | 0 | 1 | [ZSM00051](../../explorer/index.md#/solo/command/ZSM00051) SSMM Reset FTS Queue | - | - | M |
| 14 | 1 | 0 | 1 | [ZCD00E01](../../explorer/index.md#/solo/command/ZCD00E01) Enable Forwarding TM Source Pkts | Enable Forwarding of Telemetry Source Packets | add report types to the application process forward-control configuration | A+C |
| 14 | 2 | 0 | 1 | [ZCD00E02](../../explorer/index.md#/solo/command/ZCD00E02) Disable Forwarding TM Source Pkts | Disable Forwarding of Telemetry Source Packets | delete report types from the application process forward-control configuration | A+C |
| 14 | 5 | 0 | 1 | [ZCD00E05](../../explorer/index.md#/solo/command/ZCD00E05) Enable Forwarding HK Pkts | Enable Forwarding of Housekeeping Packets | add structure identifiers to the housekeeping parameter report forward-control configuration | A+C |
| 14 | 6 | 0 | 1 | [ZCD00E06](../../explorer/index.md#/solo/command/ZCD00E06) Disable Forwarding HK Pkts | Disable Forwarding of Housekeeping Packets | delete structure identifiers from the housekeeping parameter report forward-control configuration | A+C |
| 14 | 7 | 0 | 1 | [ZCD00E07](../../explorer/index.md#/solo/command/ZCD00E07) Report Housekeeping Packets Forwarding S | Report Enabled Housekeeping Packets | report the content of the housekeeping parameter report forward-control configuration | A+C |
| 14 | 8 | 1 | 0 | [14158](../../explorer/index.md#/solo/packet/14158) Housekeeping Packets Forwarding Status Rep... | Enabled Housekeeping Packets Report | housekeeping parameter report forward-control configuration content report | A+C |
| 14 | 9 | 0 | 1 | [ZCD00E09](../../explorer/index.md#/solo/command/ZCD00E09) Enable Forwarding of Diagnostic Packets | Enable Forwarding of Diagnostic Packets | add structure identifiers to the diagnostic parameter report forward-control configuration | A+C |
| 14 | 10 | 0 | 1 | [ZCD00E0A](../../explorer/index.md#/solo/command/ZCD00E0A) Disable Forwarding of Diagnostic Packets | Disable Forwarding of Diagnostic Packets | delete structure identifiers from the diagnostic parameter report forward-control configuration | A+C |
| 14 | 11 | 0 | 1 | [ZCD00E0B](../../explorer/index.md#/solo/command/ZCD00E0B) Report Diagnostic Packets Forwarding Sta | Report Enabled Diagnostic Packets | report the content of the diagnostic parameter report forward-control configuration | A+C |
| 14 | 12 | 1 | 0 | [14157](../../explorer/index.md#/solo/packet/14157) Diagnostic Packets Forwarding Status Repor... | Enabled Diagnostic Packets Report | diagnostic parameter report forward-control configuration content report | A+C |
| 14 | 13 | 0 | 1 | [ZCD00E0D](../../explorer/index.md#/solo/command/ZCD00E0D) Enable Forwarding RID Pkts | Enable Forwarding of Event Report Packets | delete event definition identifiers from the event report blocking forward-control configuration | A+C |
| 14 | 14 | 0 | 1 | [ZCD00E0E](../../explorer/index.md#/solo/command/ZCD00E0E) Disable Forwarding RID Pkts | Disable Forwarding of Event Report Packets | add event definition identifiers to the event report blocking forward-control configuration | A+C |
| 14 | 128 | 0 | 1 | [ZCD00E80](../../explorer/index.md#/solo/command/ZCD00E80) Rpt TM Source Pkt Forwarding Status | - | - | M |
| 14 | 129 | 1 | 0 | [14160](../../explorer/index.md#/solo/packet/14160) Telemetry Source Packet Forwarding Status... | - | - | M |
| 14 | 130 | 0 | 1 | [ZCD00E82](../../explorer/index.md#/solo/command/ZCD00E82) Rpt RID Pkt Forwarding Status | - | - | M |
| 14 | 131 | 1 | 0 | [14159](../../explorer/index.md#/solo/packet/14159) Event Report Packet Forwarding Status Repo... | - | - | M |
| 15 | 1 | 0 | 2 | [ZCD00F01](../../explorer/index.md#/solo/command/ZCD00F01) Enable Storage in Packet Stores | Enable Storage in Packet Stores | enable the storage function of packet stores | A+C |
| 15 | 2 | 0 | 2 | [ZCD00F02](../../explorer/index.md#/solo/command/ZCD00F02) Disable Storage in Packet Stores | Disable Storage in Packet Stores | disable the storage function of packet stores | A+C |
| 15 | 3 | 0 | 2 | [ZCD00F03](../../explorer/index.md#/solo/command/ZCD00F03) Add Pkts to Storage Selection Def | Add Packets to Storage Selection Definition | add report types to the application process storage-control configuration | A+C |
| 15 | 4 | 0 | 2 | [ZCD00F04](../../explorer/index.md#/solo/command/ZCD00F04) Remove Pkts from Storage Selection Def | Remove Packets from Storage Selection Definition | delete report types from the application process storage-control configuration | A+C |
| 15 | 5 | 0 | 1 | [ZSM00165](../../explorer/index.md#/solo/command/ZSM00165) SSMM Report Storage Selection Definition | Report Storage Selection Definition | report the content of the application process storage-control configuration | A+C |
| 15 | 6 | 1 | 0 | [80019](../../explorer/index.md#/solo/packet/80019) SSMM Stor Sel Def Report | Storage Selection Definition Report | application process storage-control configuration content report | A+C |
| 15 | 9 | 0 | 2 | [ZCD00F09](../../explorer/index.md#/solo/command/ZCD00F09) Downlink Packet Store Contents for Time | Downlink Packet Store Contents for Time Period | start the by-time-range retrieval of packet stores | A+C |
| 15 | 10 | 0 | 2 | [ZCD00F0A](../../explorer/index.md#/solo/command/ZCD00F0A) Delete Packet Store contents | Delete Packet Stores Contents up to Specified Packets | - | A |
| 15 | 11 | 0 | 2 | [ZCD00F0B](../../explorer/index.md#/solo/command/ZCD00F0B) Delete Content of Packet Store up to Spe | Delete Packet Stores Contents up to Specified Storage Time | delete the content of packet stores up to the specified time | A+C |
| 15 | 12 | 0 | 1 | [ZSM00185](../../explorer/index.md#/solo/command/ZSM00185) SSMM Rep Catalogues Select Pkt Store | Report Catalogues for Selected Packet Stores | summary-report the content of packet stores | A+C |
| 15 | 13 | 1 | 0 | [80020](../../explorer/index.md#/solo/packet/80020) SSMM Pkt Stor Cat Report | Packet Store Catalogue Report | packet store content summary report | A+C |
| 15 | 128 | 0 | 1 | [ZCD00F80](../../explorer/index.md#/solo/command/ZCD00F80) Stop Playback of Packet Store Contents | - | - | M |
| 15 | 129 | 0 | 2 | [ZCD00F81](../../explorer/index.md#/solo/command/ZCD00F81) Start Playback PS Cont | - | - | M |
| 15 | 130 | 0 | 1 | [ZSM00195](../../explorer/index.md#/solo/command/ZSM00195) SSMM Resize File | - | - | M |
| 15 | 131 | 0 | 1 | [ZSM00200](../../explorer/index.md#/solo/command/ZSM00200) SSMM Delete File | - | - | M |
| 15 | 132 | 0 | 1 | [ZSM00205](../../explorer/index.md#/solo/command/ZSM00205) SSMM Rename File | - | - | M |
| 15 | 133 | 0 | 1 | [ZSM00210](../../explorer/index.md#/solo/command/ZSM00210) SSMM List Files | - | - | M |
| 15 | 134 | 1 | 0 | [80021](../../explorer/index.md#/solo/packet/80021) SSMM List File Report | - | - | M |
| 15 | 135 | 0 | 1 | [ZSM00215](../../explorer/index.md#/solo/command/ZSM00215) SSMM Stop Downln Pkt Store | - | - | M |
| 15 | 136 | 0 | 1 | [ZSM00220](../../explorer/index.md#/solo/command/ZSM00220) SSMM Set File to Cyclic | - | - | M |
| 15 | 137 | 0 | 1 | [ZSM00225](../../explorer/index.md#/solo/command/ZSM00225) SSMM Set File to No Cyclic | - | - | M |
| 15 | 138 | 0 | 1 | [ZSM00230](../../explorer/index.md#/solo/command/ZSM00230) SSMM Change PS Default VC | - | - | M |
| 15 | 139 | 0 | 1 | [ZSM00235](../../explorer/index.md#/solo/command/ZSM00235) SSMM Change PS Default Priority | - | - | M |
| 15 | 140 | 0 | 3 | [ZCD00F8C](../../explorer/index.md#/solo/command/ZCD00F8C) Add SIDs to Storage Selection Definition | - | - | M |
| 15 | 141 | 1 | 0 | [80022](../../explorer/index.md#/solo/packet/80022) SSMM Pkt Pos Report | - | - | M |
| 15 | 142 | 0 | 4 | [ZCD00F8E](../../explorer/index.md#/solo/command/ZCD00F8E) Report SID Storage Selection Definition | - | - | M |
| 15 | 143 | 0 | 1 | [ZSM00250](../../explorer/index.md#/solo/command/ZSM00250) SSMM Abort Copy | - | - | M |
| 15 | 144 | 0 | 1 | [ZSM00255](../../explorer/index.md#/solo/command/ZSM00255) SSMM Reset Copy TC Queue | - | - | M |
| 15 | 145 | 0 | 2 | [ZCD00F91](../../explorer/index.md#/solo/command/ZCD00F91) Report Storage Routing Definition Table | - | - | M |
| 15 | 146 | 0 | 1 | [ZSM00257](../../explorer/index.md#/solo/command/ZSM00257) SSMM Delete Pkt Store cont notcyclic PS | - | - | M |
| 15 | 147 | 0 | 2 | [ZCD00F8D](../../explorer/index.md#/solo/command/ZCD00F8D) Remove SIDs from Storage Selection Def | - | - | M |
| 15 | 148 | 0 | 1 | [ZSM00259](../../explorer/index.md#/solo/command/ZSM00259) SSMM Resynchronise Pkt Store RP Pos | - | - | M |
| 15 | 150 | 0 | 1 | [ZCD00F96](../../explorer/index.md#/solo/command/ZCD00F96) Format PS Memory on OMM | - | - | M |
| 15 | 151 | 0 | 1 | [ZCD00F97](../../explorer/index.md#/solo/command/ZCD00F97) Get Format of Packet Store Memory | - | - | M |
| 15 | 152 | 1 | 0 | [14354](../../explorer/index.md#/solo/packet/14354) Packet Store Format Report | - | - | M |
| 15 | 153 | 0 | 1 | [ZCD00F99](../../explorer/index.md#/solo/command/ZCD00F99) Set Packet Store Playback Pointer | - | - | M |
| 15 | 154 | 0 | 1 | [ZCD00F9A](../../explorer/index.md#/solo/command/ZCD00F9A) Change Packet Store Attributes | - | - | M |
| 15 | 155 | 1 | 0 | [14180](../../explorer/index.md#/solo/packet/14180) SID Storage Selection Definition Report | - | - | M |
| 15 | 156 | 1 | 0 | [14179](../../explorer/index.md#/solo/packet/14179) Storage Routing Definition Table Report | - | - | M |
| 16 | 1 | 0 | 1 | [ZCD01001](../../explorer/index.md#/solo/command/ZCD01001) Set MilBus Configuration | - | - | M (own service) |
| 16 | 2 | 0 | 1 | [ZCD01002](../../explorer/index.md#/solo/command/ZCD01002) Switch MilBus to Nominal | - | - | M (own service) |
| 16 | 3 | 0 | 1 | [ZCD01003](../../explorer/index.md#/solo/command/ZCD01003) Reconfigure MilBus | - | - | M (own service) |
| 16 | 4 | 0 | 1 | [ZCD01004](../../explorer/index.md#/solo/command/ZCD01004) Switch MilBus RT Channel to Nominal | - | - | M (own service) |
| 16 | 5 | 0 | 1 | [ZCD01005](../../explorer/index.md#/solo/command/ZCD01005) Reconfigure MilBus RT Channel | - | - | M (own service) |
| 17 | 1 | 0 | 18 | [ZCD01101](../../explorer/index.md#/solo/command/ZCD01101) Perform Connection Test | Perform Connection Test | perform an are-you-alive connection test | A+C |
| 17 | 2 | 17 | 0 | [14178](../../explorer/index.md#/solo/packet/14178) Connection Test Response Report | Connection Test Report | are-you-alive connection test report | A+C |
| 17 | 3 | 0 | 1 | [ZCD01103](../../explorer/index.md#/solo/command/ZCD01103) Request Connection Test | - | perform an on-board connection test | C |
| 17 | 128 | 0 | 8 | [ZSM00265](../../explorer/index.md#/solo/command/ZSM00265) SSMM Test TC Max Len | - | - | M |
| 18 | 5 | 0 | 1 | [ZCD01205](../../explorer/index.md#/solo/command/ZCD01205) Suspend an OBCP | Suspend Procedure | suspend an OBCP | A+C |
| 18 | 6 | 0 | 1 | [ZCD01206](../../explorer/index.md#/solo/command/ZCD01206) Resume an OBCP | Resume Procedure | resume an OBCP | A+C |
| 18 | 7 | 0 | 3 | [ZCD2Z00F](../../explorer/index.md#/solo/command/ZCD2Z00F) Communicate (1-byte) parameters to OBCP | Communicate Parameters to a Procedure | communicate parameters to an OBCP | A+C |
| 18 | 8 | 0 | 1 | [ZCD01208](../../explorer/index.md#/solo/command/ZCD01208) Report list of on-board operation proced | Report List of On-board Operations Procedures | report the execution status of each OBCP | A+C |
| 18 | 9 | 1 | 0 | [14405](../../explorer/index.md#/solo/packet/14405) OBCP List Report | On-board Operations Procedures List Report | OBCP execution status report | A+C |
| 18 | 140 | 0 | 38 | [ZCD2Z00R](../../explorer/index.md#/solo/command/ZCD2Z00R) Load and start OBCP (1-byte parameters) | - | - | M |
| 18 | 141 | 0 | 1 | [ZCD0128D](../../explorer/index.md#/solo/command/ZCD0128D) Stop and delete an OBCP | - | - | M |
| 18 | 142 | 0 | 1 | [ZCD0128E](../../explorer/index.md#/solo/command/ZCD0128E) Set OBCP HK TM | - | - | M |
| 18 | 144 | 1 | 0 | [14406](../../explorer/index.md#/solo/packet/14406) OBCP telemetry | - | - | M |
| 19 | 1 | 0 | 25 | [ZCS01301](../../explorer/index.md#/solo/command/ZCS01301) Add Event to the Detection List | Add Events to the Detection List | add event-action definitions | A+C |
| 19 | 2 | 0 | 2 | [ZCS01302](../../explorer/index.md#/solo/command/ZCS01302) Delete an Event from the Detection List | Delete Events from the Detection List | delete event-action definitions | A+C |
| 19 | 3 | 0 | 1 | [ZCS01303](../../explorer/index.md#/solo/command/ZCS01303) Clear the Event Detection List | Clear the Event Detection List | delete all event-action definitions | A+C |
| 19 | 4 | 0 | 9 | [ZCS01304](../../explorer/index.md#/solo/command/ZCS01304) Enable Actions | Enable Actions | enable event-action definitions | A+C |
| 19 | 5 | 0 | 9 | [ZCS01305](../../explorer/index.md#/solo/command/ZCS01305) Disable Actions | Disable Actions | disable event-action definitions | A+C |
| 19 | 6 | 0 | 1 | [ZCS01306](../../explorer/index.md#/solo/command/ZCS01306) Report the Event Detection List | Report the Event Detection List | report the status of each event-action definition | A+C |
| 19 | 7 | 1 | 0 | [10001](../../explorer/index.md#/solo/packet/10001) Event Detection List Report | Event Detection List Report | event-action status report | A+C |
| 19 | 130 | 0 | 1 | [ZCS01382](../../explorer/index.md#/solo/command/ZCS01382) Report Single Event Detection Entry | - | - | M |
| 19 | 131 | 1 | 0 | [10000](../../explorer/index.md#/solo/packet/10000) Single Event Detection Entry Report | - | - | M |
| 20 | 1 | 0 | 11 | [ZCD01401](../../explorer/index.md#/solo/command/ZCD01401) Start Information Distribution for User | - | report parameter values | M (own service) |
| 20 | 2 | 0 | 1 | [ZCD01402](../../explorer/index.md#/solo/command/ZCD01402) Stop Information Distribution for User | - | - | M (own service) |
| 20 | 128 | 0 | 5 | [ZID52530](../../explorer/index.md#/solo/command/ZID52530) TC 20,128 | - | - | M (own service) |
| 21 | 1 | 0 | 14 | [ZIA58002](../../explorer/index.md#/solo/command/ZIA58002) SWA\_TC\_SCI\_EN | - | direct-load a request sequence | M (own service) |
| 21 | 2 | 0 | 14 | [ZIA58003](../../explorer/index.md#/solo/command/ZIA58003) SWA\_TC\_SCI\_DS | - | load a request sequence by reference | M (own service) |
| 21 | 3 | 105 | 0 | [50213](../../explorer/index.md#/solo/packet/50213) LowLatency Science Science Report | - | - | M (own service) |
| 21 | 5 | 72 | 0 | [51200](../../explorer/index.md#/solo/packet/51200) EUI\_SciReport\_57 | - | - | M (own service) |
| 21 | 6 | 151 | 0 | [52864](../../explorer/index.md#/solo/packet/52864) 21,6 A TOFxE Rates, Fast | - | - | M (own service) |
| 21 | 7 | 6 | 0 | [57400](../../explorer/index.md#/solo/packet/57400) SPICE Detector Science Uncompressed | - | request sequence execution status report | M (own service) |
| 21 | 128 | 0 | 5 | [ZID52519](../../explorer/index.md#/solo/command/ZID52519) TC 21,128 reset out buf | - | - | M (own service) |
| 22 | 1 | 0 | 2 | [ZIP16010](../../explorer/index.md#/solo/command/ZIP16010) requestContextReport | - | enable the position-based schedule execution function | M (own service) |
| 22 | 2 | 1 | 0 | [54331](../../explorer/index.md#/solo/packet/54331) STIX Context Report from User | - | - | M (own service) |
| 22 | 3 | 0 | 2 | [ZIP16030](../../explorer/index.md#/solo/command/ZIP16030) acceptContextReport | - | reset the position-based schedule | M (own service) |
| 22 | 4 | 0 | 1 | [ZCD01604](../../explorer/index.md#/solo/command/ZCD01604) Request CSW to restore context. | - | insert activities into the position-based schedule | M (own service) |
| 22 | 5 | 0 | 1 | [ZCD01605](../../explorer/index.md#/solo/command/ZCD01605) Request CSW to perform context saving fr | - | delete position-based scheduled activities identified by request identifier | M (own service) |

</div>

### Types 128 to 255 (mission-specific), per type

These 70 service types hold 1 168 (type, subtype) pairs, 1 054 TM packet definitions and 2 725 TC
definitions. The service names come from the ICD's service table, which reserves each listed type
for one on-board user.[^solo-list][^mib25]

<div class="sortable-table" markdown>

| Type | Service in the ICD (Table 5.1-1) | Subtypes | PID | CCF | Examples in the MIB |
|---|---|---|---|---|---|
| 128 | EPD private services (128-129) | 25 | 2 | 23 | [ZID52520](../../explorer/index.md#/solo/command/ZID52520) TC 128,1 Trigger trans<br>[52014](../../explorer/index.md#/solo/packet/52014) TM 128,6 Get data pool rep |
| 129 | EPD private services (128-129) | 73 | 7 | 69 | [ZID52311](../../explorer/index.md#/solo/command/ZID52311) 129,128 SIS\_CMD\_NULL<br>[52856](../../explorer/index.md#/solo/packet/52856) 129,224 Command Echo BOOT |
| 130 | TM Extraction Service | 4 | 1 | 3 | [ZCD08201](../../explorer/index.md#/solo/command/ZCD08201) Define TM Extraction Descriptors<br>[14414](../../explorer/index.md#/solo/packet/14414) TM Extraction Descriptors Report |
| 131 | Device Management | 4 | 693 | 875 | [ZCAD12C1](../../explorer/index.md#/solo/command/ZCAD12C1) RWL Direct Command<br>[27262](../../explorer/index.md#/solo/packet/27262) PCDU snapshot data |
| 132 | SGM Management Service | 3 | 71 | 246 | [ZCD08401](../../explorer/index.md#/solo/command/ZCD08401) Report SGM Parameters<br>[14293](../../explorer/index.md#/solo/packet/14293) SGM Parameters Report |
| 133 | File Management Service | 8 | 2 | 6 | [ZCD08506](../../explorer/index.md#/solo/command/ZCD08506) Copy File<br>[14319](../../explorer/index.md#/solo/packet/14319) File Information Report |
| 134 | TC Sequencer Service | 6 | 0 | 13 | [ZCD08601](../../explorer/index.md#/solo/command/ZCD08601) Start TC Sequence |
| 139 | Datapool Management Service | 4 | 26 | 234 | [ZCA2Z004](../../explorer/index.md#/solo/command/ZCA2Z004) Set value of (1-byte integer) para...<br>[10114](../../explorer/index.md#/solo/packet/10114) On-board Parameters Value Report |
| 140 | SSMM SW Mode Transition | 6 | 1 | 5 | [ZSM00270](../../explorer/index.md#/solo/command/ZSM00270) SSMM Enter BIT Mode<br>[80026](../../explorer/index.md#/solo/packet/80026) SSMM Operational BIT Test Report |
| 141 | Direct Commanding | 3 | 94 | 90 | [ZSM00285](../../explorer/index.md#/solo/command/ZSM00285) SSMM Direct Command Write<br>[65839](../../explorer/index.md#/solo/packet/65839) SSMM DirRead Host\_IF |
| 142 | CSW: Functional Monitoring / SSMM SW: Redundancies Management | 14 | 18 | 59 | [ZCA08E01](../../explorer/index.md#/solo/command/ZCA08E01) Enable Functional Monitoring<br>[80028](../../explorer/index.md#/solo/packet/80028) SSMM Router Configuration Report |
| 143 | Memory Array Management | 8 | 1 | 7 | [ZSM00296](../../explorer/index.md#/solo/command/ZSM00296) SSMM Test Memory Module<br>[80029](../../explorer/index.md#/solo/packet/80029) SSMM Memory Test Report |
| 144 | Reboot | 1 | 0 | 3 | [ZSM00330](../../explorer/index.md#/solo/command/ZSM00330) SSMM Reboot |
| 145 | BIT Report Management | 2 | 3 | 3 | [ZSM00335](../../explorer/index.md#/solo/command/ZSM00335) SSMM Request Start-up BIT Tests Re...<br>[80030](../../explorer/index.md#/solo/packet/80030) SSMM Start up BIT Test Report |
| 150 | STR private services (150-157) | 7 | 0 | 14 | [ZST15001](../../explorer/index.md#/solo/command/ZST15001) STR1 SWM Mode |
| 151 | STR private services (150-157) | 1 | 0 | 2 | [ZST15101](../../explorer/index.md#/solo/command/ZST15101) STR1 Reset |
| 152 | STR private services (150-157) | 11 | 0 | 22 | [ZST15201](../../explorer/index.md#/solo/command/ZST15201) STR1 En Dis DefectiPixels Acq |
| 153 | STR private services (150-157) | 13 | 0 | 26 | [ZST15301](../../explorer/index.md#/solo/command/ZST15301) STR1 PixRamBank Swap |
| 154 | STR private services (150-157) | 1 | 0 | 2 | [ZST15401](../../explorer/index.md#/solo/command/ZST15401) STR1 Select ASP Channel |
| 155 | STR private services (150-157) | 2 | 0 | 4 | [ZST15501](../../explorer/index.md#/solo/command/ZST15501) STR1 Set One Parameter |
| 156 | STR private services (150-157) | 7 | 14 | 0 | [91561](../../explorer/index.md#/solo/packet/91561) STR1 Attitude Data |
| 157 | STR private services (150-157) | 2 | 4 | 0 | [91571](../../explorer/index.md#/solo/packet/91571) STR1 Boot Report |
| 160 | not in the ICD service list | 5 | 5 | 0 | [66810](../../explorer/index.md#/solo/packet/66810) File Transfer Model, modelled tran... |
| 161 | not in the ICD service list | 3 | 3 | 0 | [66982](../../explorer/index.md#/solo/packet/66982) Idle mini-transfer frame |
| 162 | not in the ICD service list | 2 | 2 | 0 | [66983](../../explorer/index.md#/solo/packet/66983) Bad Telemetry Packets |
| 164 | not in the ICD service list | 3 | 3 | 0 | [66840](../../explorer/index.md#/solo/packet/66840) Time Correlation Report |
| 165 | not in the ICD service list | 1 | 1 | 0 | [66850](../../explorer/index.md#/solo/packet/66850) TM Packet used by the Releaser G/S... |
| 166 | not in the ICD service list | 3 | 3 | 0 | [101](../../explorer/index.md#/solo/packet/101) MATIS BASIC HKTM OK |
| 170 | not in the ICD service list | 5 | 0 | 5 | [ZYP66997](../../explorer/index.md#/solo/command/ZYP66997) PSS Set HK Parameter ON |
| 180 | RPW private services (180-184) | 58 | 2 | 56 | [ZIW00034](../../explorer/index.md#/solo/command/ZIW00034) DPU\_SWITCH\_OFF\_EQUIPMENT<br>[55029](../../explorer/index.md#/solo/packet/55029) A dump of all the DPU Boot Softwar... |
| 181 | RPW private services (180-184) | 26 | 5 | 37 | [ZIW00076](../../explorer/index.md#/solo/command/ZIW00076) LFR\_RESET<br>[55174](../../explorer/index.md#/solo/packet/55174) LFR mode parameter dump. |
| 200 | SWA private services (200-205) | 51 | 12 | 46 | [ZIA58701](../../explorer/index.md#/solo/command/ZIA58701) SWA\_TC\_DPU\_DIAG<br>[58199](../../explorer/index.md#/solo/packet/58199) SWA\_TM\_DEBUG\_CMD\_REPORT |
| 201 | SWA private services (200-205) | 45 | 2 | 44 | [ZIA58753](../../explorer/index.md#/solo/command/ZIA58753) SWA\_TC\_EAS1\_IDLE\_MODE<br>[58196](../../explorer/index.md#/solo/packet/58196) SWA\_TM\_EAS1\_PARAM\_REPORT |
| 202 | SWA private services (200-205) | 45 | 2 | 44 | [ZIA58801](../../explorer/index.md#/solo/command/ZIA58801) SWA\_TC\_EAS2\_IDLE\_MODE<br>[58197](../../explorer/index.md#/solo/packet/58197) SWA\_TM\_EAS2\_PARAM\_REPORT |
| 203 | SWA private services (200-205) | 34 | 2 | 33 | [ZIA58850](../../explorer/index.md#/solo/command/ZIA58850) SWA\_TC\_PAS\_CALIBRATION\_MODE<br>[58198](../../explorer/index.md#/solo/packet/58198) SWA\_TM\_PAS\_PARAM\_REPORT |
| 204 | SWA private services (200-205) | 21 | 0 | 21 | [ZIA58900](../../explorer/index.md#/solo/command/ZIA58900) SWA\_TC\_HIS\_MRAM\_WR |
| 206 | EUI private services (206-218) | 12 | 3 | 14 | [ZIU51700](../../explorer/index.md#/solo/command/ZIU51700) EUI\_ChangeModeBasic<br>[51290](../../explorer/index.md#/solo/packet/51290) EUI\_TraceDumpReportHK |
| 207 | EUI private services (206-218) | 6 | 1 | 5 | [ZIU51703](../../explorer/index.md#/solo/command/ZIU51703) EUI\_EnLimitCheck<br>[51120](../../explorer/index.md#/solo/packet/51120) EUI\_LimitCheckingListReport |
| 208 | EUI private services (206-218) | 6 | 0 | 6 | [ZIU51716](../../explorer/index.md#/solo/command/ZIU51716) EUI\_EnErrorActions |
| 209 | EUI private services (206-218) | 9 | 1 | 8 | [ZIU51766](../../explorer/index.md#/solo/command/ZIU51766) EUI\_CompareFlash<br>[51150](../../explorer/index.md#/solo/packet/51150) EUI\_FlashBadBlockReport |
| 210 | EUI private services (206-218) | 31 | 6 | 25 | [ZIU51813](../../explorer/index.md#/solo/command/ZIU51813) EUI\_StartParallelProgram<br>[51160](../../explorer/index.md#/solo/packet/51160) EUI\_ResourceNeutralTableDumpReport |
| 211 | EUI private services (206-218) | 6 | 2 | 5 | [ZIU51729](../../explorer/index.md#/solo/command/ZIU51729) EUI\_FullnessLimit<br>[51286](../../explorer/index.md#/solo/packet/51286) EUI\_FilesystemListReportHK |
| 212 | EUI private services (206-218) | 9 | 3 | 6 | [ZIU51735](../../explorer/index.md#/solo/command/ZIU51735) EUI\_MakeCalMap<br>[51172](../../explorer/index.md#/solo/packet/51172) EUI\_OffsetGainMapDumpReport |
| 213 | EUI private services (206-218) | 9 | 2 | 8 | [ZIU51736](../../explorer/index.md#/solo/command/ZIU51736) EUI\_EnEventDet<br>[51288](../../explorer/index.md#/solo/packet/51288) EUI\_Service20EchoReportHK |
| 214 | EUI private services (206-218) | 17 | 0 | 17 | [ZIU51739](../../explorer/index.md#/solo/command/ZIU51739) EUI\_EnHV\_Safe |
| 215 | EUI private services (206-218) | 13 | 0 | 13 | [ZIU51744](../../explorer/index.md#/solo/command/ZIU51744) EUI\_SetupFWheelToPos |
| 216 | EUI private services (206-218) | 3 | 0 | 3 | [ZIU51755](../../explorer/index.md#/solo/command/ZIU51755) EUI\_EnSimImgInj |
| 226 | MAG private services (226-230) | 15 | 0 | 27 | [ZIM22601](../../explorer/index.md#/solo/command/ZIM22601) Transition to AppSW |
| 227 | MAG private services (226-230) | 54 | 0 | 54 | [ZIM22701](../../explorer/index.md#/solo/command/ZIM22701) Set OBS Range (FM) |
| 228 | MAG private services (226-230) | 17 | 2 | 15 | [ZIM22801](../../explorer/index.md#/solo/command/ZIM22801) Perform Copy<br>[50815](../../explorer/index.md#/solo/packet/50815) Read EEPROM Table of Content Segme... |
| 229 | MAG private services (226-230) | 10 | 0 | 10 | [ZIM22901](../../explorer/index.md#/solo/command/ZIM22901) Reset ICU |
| 230 | MAG private services (226-230) | 11 | 0 | 11 | [ZIM23001](../../explorer/index.md#/solo/command/ZIM23001) Send FIB Command |
| 231 | PHI private services (231-235) | 17 | 8 | 9 | [ZIPE7010](../../explorer/index.md#/solo/command/ZIPE7010) resetUDPManager<br>[53102](../../explorer/index.md#/solo/packet/53102) PHI\_UDP\_symbolTable |
| 232 | PHI private services (231-235) | 77 | 6 | 101 | [ZIPE8011](../../explorer/index.md#/solo/command/ZIPE8011) gotoSafe<br>[53225](../../explorer/index.md#/solo/packet/53225) PHI\_configurationReport |
| 233 | PHI private services (231-235) | 46 | 12 | 46 | [ZIPE9010](../../explorer/index.md#/solo/command/ZIPE9010) formatFileSystem<br>[53304](../../explorer/index.md#/solo/packet/53304) PHI\_fileSystemListing |
| 234 | PHI private services (231-235) | 7 | 2 | 5 | [ZIPEA030](../../explorer/index.md#/solo/command/ZIPEA030) getVersionInformation<br>[53401](../../explorer/index.md#/solo/packet/53401) PHI\_console |
| 236 | STIX private services (236-240) | 20 | 2 | 25 | [ZIX36001](../../explorer/index.md#/solo/command/ZIX36001) STIX Mode transition<br>[54140](../../explorer/index.md#/solo/packet/54140) STIX Subsysystem configuration rep... |
| 237 | STIX private services (236-240) | 20 | 2 | 41 | [ZIX37001](../../explorer/index.md#/solo/command/ZIX37001) STIX Load SuSW parameter<br>[54128](../../explorer/index.md#/solo/packet/54128) STIX SuSW Parameter report |
| 238 | STIX private services (236-240) | 9 | 2 | 7 | [ZIX38001](../../explorer/index.md#/solo/command/ZIX38001) STIX Select data for download<br>[54126](../../explorer/index.md#/solo/packet/54126) STIX Archive Memory Mgmt - User da... |
| 239 | STIX private services (236-240) | 20 | 8 | 12 | [ZIX39001](../../explorer/index.md#/solo/command/ZIX39001) STIX Reset ASIC<br>[54131](../../explorer/index.md#/solo/packet/54131) STIX ASIC temperature report |
| 241 | METIS private services (241-245) | 4 | 0 | 4 | [ZIT24101](../../explorer/index.md#/solo/command/ZIT24101) CONFIGURE SW IMAGE |
| 242 | METIS private services (241-245) | 13 | 0 | 24 | [ZIT24201](../../explorer/index.md#/solo/command/ZIT24201) Op. Mode Transition |
| 243 | METIS private services (241-245) | 15 | 2 | 32 | [ZIT24301](../../explorer/index.md#/solo/command/ZIT24301) Enable Thermal Control<br>[59550](../../explorer/index.md#/solo/packet/59550) TM(243,14) - VLDA CMD Response |
| 244 | METIS private services (241-245) | 3 | 1 | 12 | [ZIT24401](../../explorer/index.md#/solo/command/ZIT24401) Load Adjustable Par.<br>[59600](../../explorer/index.md#/solo/packet/59600) TM(244,3) - Adjustable Par. Report |
| 245 | METIS private services (241-245) | 4 | 0 | 8 | [ZIT24501](../../explorer/index.md#/solo/command/ZIT24501) Create Rad. MAPS |
| 246 | SolO-Hi private services (246-250) | 98 | 0 | 98 | [ZIHFCOPY](../../explorer/index.md#/solo/command/ZIHFCOPY) FMCOPY |
| 247 | SolO-Hi private services (246-250) | 6 | 6 | 0 | [56318](../../explorer/index.md#/solo/packet/56318) OBC SM\_TABLE\_INFO |
| 248 | SolO-Hi private services (246-250) | 1 | 1 | 0 | [56333](../../explorer/index.md#/solo/packet/56333) SSMM XF Engineering Files |
| 251 | SPICE private services (251-255) | 1 | 1 | 0 | [66838](../../explorer/index.md#/solo/packet/66838) Saved Synthetics |
| 255 | SPICE private services (251-255) | 72 | 2 | 82 | [ZIC00000](../../explorer/index.md#/solo/command/ZIC00000) No Op Command<br>[57450](../../explorer/index.md#/solo/packet/57450) SPICE Table Report |

</div>

!!! warning "Inference"
    Types 160 to 166 and 170 are not in the ICD's service list. Their MIB entries describe
    ground-side packets and commands, for example "Time Correlation Report" (164,1), "Bad Telemetry
    Packets" (162,1) or "PSS Set TC Bit Rate" (170,7), on APIDs 1966 and 1948. They therefore look
    like ground system definitions rather than spacecraft services. Similarly, types 247, 248 and 251
    fall in the SolO-Hi and SPICE ranges, yet their descriptions mention the OBC, the SSMM and "Saved
    Synthetics". The MIB does not document either point.

??? example "SQL used"
    ```sql
    -- solo-2025-09-16.sqlite (MIB__20250916M25925PFMS001_SOL)
    SELECT * FROM vdf;                                            -- release identification
    SELECT CCF_PKTID, COUNT(*) FROM ccf GROUP BY CCF_PKTID;       -- NOM_TC 5318, HPC1_TC 125, NOS2KHDR 6, NO_HDR 5
    -- TM definitions per (type, subtype), with the lowest SPID as example
    SELECT CAST(PID_TYPE AS INT) t, CAST(PID_STYPE AS INT) s, COUNT(*), MIN(CAST(PID_SPID AS INT))
      FROM pid GROUP BY 1, 2 ORDER BY 1, 2;
    -- nominal TC definitions per (type, subtype), with the first command name as example
    SELECT CAST(CCF_TYPE AS INT) t, CAST(CCF_STYPE AS INT) s, COUNT(*), MIN(CCF_CNAME)
      FROM ccf WHERE CCF_PKTID = 'NOM_TC' GROUP BY 1, 2 ORDER BY 1, 2;
    -- totals below and above type 128
    SELECT CASE WHEN t < 128 THEN 'std' ELSE 'mission' END, COUNT(*), SUM(tm), SUM(tc) FROM (
      SELECT t, s, SUM(tm) tm, SUM(tc) tc FROM (
        SELECT CAST(PID_TYPE AS INT) t, CAST(PID_STYPE AS INT) s, 1 tm, 0 tc FROM pid
        UNION ALL
        SELECT CAST(CCF_TYPE AS INT), CAST(CCF_STYPE AS INT), 0, 1 FROM ccf WHERE CCF_PKTID = 'NOM_TC')
      GROUP BY t, s) GROUP BY 1;
    ```
    The PUS-A and PUS-C columns were then added by matching (kind, type, subtype) against the
    catalogue above and against PUS-A Table 43.

## Related pages

* [PUS: the Packet Utilization Standard](index.md), [PUS packet structures](packets.md), [PUS parameter types](parameter-types.md) and [PUS-A vs PUS-C](pus-a-vs-pus-c.md).
* The service pages, from [ST[01] Request verification](st01-request-verification.md) to [ST[23] File management](st23-file-management.md).
* [How Solar Orbiter uses PUS](../../missions/solar-orbiter/pus-usage.md), [the Solar Orbiter MIB](../../missions/solar-orbiter/mib.md) and the [MIB explorer](../../explorer/index.md#/solo/search/TM).
* [Commanding in the MIB](../../mib/commanding.md) and [Monitoring in the MIB](../../mib/monitoring.md) for how ccf and pid entries are built.
* Instrument databases that use the instrument ranges of mission-specific types: [STIX](../../missions/solar-orbiter/stix.md#packet-catalogue-by-pus-type-and-subtype), [SWA](../../missions/solar-orbiter/swa.md) and the [SWA DPU communications ICD](../../missions/solar-orbiter/instrument-interfaces.md#telecommands-by-manager).
* Library: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), [ECSS-E-70-41A](../../library/ecss-e-70-41a-30jan2003-pus.md), [SOL.S.ASTR.TN.00079](../../library/sol-s-astr-tn-00079-07.md).

<script>
(function () {
  function cellText(row, i) { return (row.cells[i] ? row.cells[i].textContent : "").trim(); }
  function init() {
    var tables = document.querySelectorAll("div.sortable-table table");
    Array.prototype.forEach.call(tables, function (table) {
      var heads = table.querySelectorAll("thead th");
      Array.prototype.forEach.call(heads, function (th, idx) {
        th.style.cursor = "pointer";
        th.title = "Click to sort";
        th.addEventListener("click", function () {
          var body = table.tBodies[0];
          var rows = Array.prototype.slice.call(body.rows);
          var asc = th.getAttribute("data-order") !== "asc";
          Array.prototype.forEach.call(heads, function (h) { h.removeAttribute("data-order"); });
          th.setAttribute("data-order", asc ? "asc" : "desc");
          rows.sort(function (a, b) {
            var r = cellText(a, idx).localeCompare(cellText(b, idx), undefined, { numeric: true, sensitivity: "base" });
            return asc ? r : -r;
          });
          rows.forEach(function (r) { body.appendChild(r); });
        });
      });
    });
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
</script>

[^c-annexc1]: [ECSS-E-ST-70-41C, Telemetry and telecommand packet utilization](../../library/ecss-e-st-70-41c-15april2016.md), Annex C, §C.1-C.2, Tables C-1 to C-33, PDF pp. 628-654.
[^c-clause8]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), clause 8, §8.1.2 to §8.23.2 (message type headings and layouts), PDF pp. 445-605.
[^c-table41]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), §4.2.3.2, Table 4-1, PDF pp. 22-23.
[^c-531]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), §5.3.1, PDF pp. 26-27.
[^c-5331]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), §5.3.3.1, PDF p. 28.
[^c-534]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), §5.3.4, PDF pp. 32-33.
[^c-annexc-3]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), Annex C, §C.2.3, Tables C-5 to C-7, PDF pp. 630-632.
[^c-annexc-groups]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), Annex C, Tables C-4, C-8, C-13, C-15, C-18, C-22 to C-24, C-26, C-28 and C-30, PDF pp. 629, 633, 635-636, 639, 642-646, 648 and 649.
[^c-annexc-12]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), Annex C, Table C-18, PDF p. 639.
[^c-61239]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), §6.12.3.9.1b, PDF p. 210.
[^c-annexc-slips]: [ECSS-E-ST-70-41C](../../library/ecss-e-st-70-41c-15april2016.md), Annex C, Tables C-17 (PDF p. 638), C-23 (PDF p. 644), C-24 (PDF p. 644) and C-25 (PDF p. 646).
[^a-ranges]: [ECSS-E-70-41A, Ground systems and operations - Telemetry and telecommand packet utilization](../../library/ecss-e-70-41a-30jan2003-pus.md), §5.3 (telecommand and telemetry data field headers), PDF pp. 45 and 48.
[^a-table43]: [ECSS-E-70-41A](../../library/ecss-e-70-41a-30jan2003-pus.md), clause 22, Table 43, PDF pp. 183-187.
[^icd-pid]: [SCOS-2000 Database Import ICD, issue 7.0](../../library/icd-7-0-final.md), §3.3.2.4 (identification of TM packets with pid and pic), PDF p. 82.
[^solo-ad1]: [Solar Orbiter TM/TC ICD, SOL.S.ASTR.TN.00079 issue 7](../../library/sol-s-astr-tn-00079-07.md), §5.1, PDF p. 31.
[^solo-list1]: [SOL.S.ASTR.TN.00079 issue 7](../../library/sol-s-astr-tn-00079-07.md), §5.1, Table 5.1-1 (service 1), PDF p. 31.
[^solo-list18]: [SOL.S.ASTR.TN.00079 issue 7](../../library/sol-s-astr-tn-00079-07.md), §5.1, Table 5.1-1 (service 18), PDF pp. 36-37.
[^solo-list]: [SOL.S.ASTR.TN.00079 issue 7](../../library/sol-s-astr-tn-00079-07.md), §5.1, Table 5.1-1, PDF pp. 31-39.
[^solo-svc4]: [SOL.S.ASTR.TN.00079 issue 7](../../library/sol-s-astr-tn-00079-07.md), §5.1, note after Table 5.1-1, PDF p. 40.
[^mib25]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../../library/mib-20250916m25925pfms001-sol.md), tables vdf, pid and ccf (queries on this page).
