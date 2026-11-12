---
title: Herschel and Planck
description: The data systems of ESA's Herschel and Planck missions as the public documents describe them - the operations interface requirements, the Herschel/Planck System Database (HPSDB) and its MIB releases, the HCSS MIB tailoring note, the Planck LFI Level 1 telemetry chain, the ACMS database experience and the SCOS-2000 based instrument EGSE.
tags: [Mission, Herschel, Planck, SCOS-2000, MIB, HPSDB, EGSE, PUS]
sources: [cosmos-operations-interface-requirements, nlr-report-e0d9e9a5, h-p-1-asp-tn-1060-mib-processing-hpsdb, hcss-mib-clarification-tailoring-note, arxiv-1001-4730-planck-lfi-tm, cosmos-tei-tmtc-packet-icd, scos2000-and-first-planck-mom, scos2000-complete-presentation-2000, cosmos-herschel-egse-integration-plan, h-p-1-aspi-sp-0045-egse-general-req, emcs-sum-4-0, spire-mib-naming-convention-1-2, icd-7-0-final, ecss-e-70-41a-30jan2003-pus, gsaw2003-peccia, bul130-merri-happy-families, mib-20250916m25925pfms001-sol]
---

# Herschel and Planck

Herschel and Planck are two very different ESA science satellites that were developed
together: ESA commissioned them jointly under the Horizon 2000 scientific programme, and
commonality between the two missions and between their mission phases was a key design
driver for cost reasons.[^nlr-intro] Herschel is an infrared observatory; Planck measures the
Cosmic Microwave Background with receivers cooled to very low temperatures. Both were to fly
to Lissajous orbits around the second Lagrange point (L2), separate soon after launch and then
operate independently.[^nlr-bg]

For this wiki the pair matters because it is a well-documented example of a project that put
[SCOS-2000](../scos2000/index.md) everywhere: in the ESOC Mission Operations Centre, in the
spacecraft Central Checkout System used for system tests, and in the instrument teams' own
electrical ground support equipment (EGSE) and real-time assessment systems.[^egse-req-common][^lfi-scos]
One system database, the Herschel/Planck System Database (HPSDB), collected the
[MIB](../mib/index.md) data and generated the SCOS-2000 and checkout files for
them.[^nlr-hpsdb][^tn-scope] This page follows the data: the operations
requirements that shaped the packets, the packet structures, the HPSDB and its rules for
reading and writing MIB files, the Herschel science ground segment's tailoring of the MIB, the
Planck LFI telemetry chain, and the EGSE history. The SCOS-2000-centred case study, including
the April 2000 decision meeting and the HCSS telecommand-history interfaces, is on
[Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md).

!!! info "What this wiki has, and what it does not have"
    Every document cited on this page is in the [library](../references/index.md), with its
    original URL, the UTC time of copy and a SHA-256 checksum; most were copied on
    2026-11-05 from the Herschel Science Archive (SPIRE internal documents), the ESA Cosmos
    site, arXiv, the NLR report server and the University of Lethbridge SPIRE pages (see
    [Sources and copies](../about/sources-and-copies.md)). The Herschel/Planck MIB itself was
    **not** copied: the HPSDB release zips listed by the Herschel Science Archive refused the
    download with HTTP 403, so this page contains no data-driven analysis of the Herschel
    MIB. Where it shows numbers from SQL queries, they come from the
    [Solar Orbiter MIB](solar-orbiter/mib.md) and are used only for comparison.

## The missions at a glance

| Item | What the sources say | Source |
|---|---|---|
| Programme | Joint development of two satellites under ESA's Horizon 2000 scientific programme; commonality between missions and phases is a key driver | [^nlr-intro] |
| Orbit | Lissajous orbits about L2; the two spacecraft separate soon after launch and operate independently | [^nlr-bg] |
| Launch (as planned in 2006) | Ariane 5 ECA, then foreseen for February 2008 (the actual date is not stated in the available sources) | [^nlr-bg] |
| Attitude control | Herschel: highly accurate pointing; Planck: highly stable spinning attitude; many common ACMS units and most of the basic software in common | [^nlr-acms] |
| Daily operations | Ground contact and real-time control for a few hours per day; the telemetry stored during the previous ~24 h is dumped while the next schedule is uplinked | [^oird-concept] |
| Planck LFI telemetry budget | At most 53.5 kbps, because a whole day of packets is stored on board and dumped in the Daily Tele-Communication Period (DTCP) | [^lfi-proc] |
| Telemetry/telecommand standard | ESA Packet Utilisation Standard (PUS); the operations requirements were derived from ECSS-E-70-41 Draft 5.3 (April 2001) | [^oird-scope][^nlr-obsw] |
| Database format | SCOS-2000 Database Import ICD issue 5.1 (applicable to the spacecraft database); the HCSS note cites issue 5.2 | [^oird-scope][^hcss-refs] |
| Early name | Documents of 2000 call the programme "FIRST/Planck"; from 2001 they say "Herschel/Planck" | [^mom-1][^oird-chg] |

### Who built what

The industrial organisation explains why so many database interfaces existed. Alcatel Alenia
Space France (AAS-F) was prime contractor for both satellites and managed the scientific
instrument interfaces; Alcatel Alenia Space Italia (AAS-I) was responsible for the service
module; a team led by Dutch Space (with Sener and Analyticon) built the Attitude Control and
Measurement System (ACMS) of both satellites. Terma (Denmark) developed the ACMS Application
Software, Saab Ericsson Space the Basic Software, Terma (the Netherlands) the
Herschel/Planck Central Checkout System (HPCCS) and GMV (Spain) the HPSDB.[^nlr-bg]

```mermaid
flowchart TB
  ESA["ESA"] --> AASF["AAS-F<br/>prime contractor,<br/>instrument interfaces"]
  AASF -.-|overall service module responsibility| AASI["AAS-I<br/>service module"]
  AASF -- "responsibility" --> GMV["GMV<br/>HPSDB"]
  AASI -- "subcontract" --> TERMA_NL["Terma NL<br/>HPCCS (central checkout)"]
  AASI -- "subcontract" --> SAAB["Saab Ericsson Space<br/>Basic Software"]
  DS["Dutch Space (+ Sener, Analyticon)<br/>ACMS of both satellites"] -.-|ACMS software| TERMA_DK["Terma DK<br/>ACMS Application Software"]
  ESA -.-|instrument interfaces<br/>managed by AAS-F| PI["Instruments<br/>HIFI, PACS, SPIRE (Herschel)<br/>LFI, HFI (Planck)"]
```

The diagram is drawn from the NLR paper's industrial team section and the instruments named
in the HPSDB note's distribution list. Solid arrows are the contract or responsibility
relationships the paper states (ESA commissioning, "under AAS-I subcontract", "under AAS-F
responsibility"); dotted lines are roles without a stated contract, because the paper does not
say who contracted AAS-I, Dutch Space or Terma Denmark.[^nlr-bg][^tn-scope]

## Operations requirements: the OIRD

The *Herschel/Planck Operations Interface Requirements Document* (SCI-PT-RS-07360, issue 2.2,
printed date "31 September 2003", prepared at ESOC by S. J. Dodsworth and S. Matussi) states
what the spacecraft and payloads must provide so that ESOC can operate them, and what must be
delivered to the MOC to prepare operations.[^oird-scope] Its packet chapter is derived from the
PUS (applicable document AD-1, ECSS-E-70/41 Draft 5.3, April 2001); the Space/Ground ICD
(SCI-PT-ICD-07418) and the Packet Structure ICD (PS-ICD, SCI-PT-IF-07527) hold the detailed
frame and packet layouts, which are not in this wiki's library.[^oird-scope] Requirements
marked "P" apply to spacecraft and payloads, "PO" apply to the spacecraft and may be relevant
to payloads, and unmarked ones apply to the spacecraft only.[^oird-scope] The 2001 revision made
the SCOS-2000 Database Import ICD an applicable document.[^oird-chg]

### Operations concept

Science operations run from an on-board schedule outside ground contact, so the spacecraft
and instruments need on-board monitoring and autonomy; packet telemetry is expected to help
order the daily dump (status first, then events and command verification reports, then
observation data).[^oird-concept] The document insists that operations use the same
telemetry and telecommand database as the EGSE, delivered to the operations implementers in
time.[^oird-concept] The general concepts it fixes are:[^oird-pkt][^oird-obm]

* **Telecommand delivery.** Every command is a telecommand packet sent via the Command and
  Data Management System (CDMS), from ground, the mission timeline or an on-board procedure.
  The APID names the destination; APID plus sequence control identify one command instance;
  type and subtype give its meaning; the acknowledgement field selects the verification
  reports ([ST[01]](../ecss/pus/st01-request-verification.md)).
* **Telemetry collection.** Data are polled from units by the CDMS and kept in mass memory
  until erased by ground command. Packet kinds are housekeeping, science (not processed by the
  CDMS), telecommand reports, event reports and memory dumps.
* **Packetisation by the CDMS** for units that only deliver discrete signals.
* **On-board monitoring** by tables, with an event packet at each transition. The document
  notes this deviates from the PUS, which offers a transition reporting list
  ([ST[12]](../ecss/pus/st12-onboard-monitoring.md)); events can trigger a telecommand
  ([ST[19]](../ecss/pus/st19-event-action.md)).
* **On-board control procedures** (OBCPs) written in a Spacecraft Control Language running in
  the CDMS ([ST[18]](../ecss/pus/st18-onboard-operations-procedure.md)).
* **Functions** as permanently available "black boxes" that can be started, stopped or given
  instructions ([ST[08]](../ecss/pus/st08-function-management.md)).
* **One spacecraft time reference** that time-stamps all TM packets, distributed to the
  instruments at power-on and then updated at agreed intervals
  ([ST[09]](../ecss/pus/st09-time-management.md)).

### Which PUS services the instruments had to implement

The OIRD table "Applicable PUS Services" fixes the service set for instruments; the PS-ICD
defines the capability sets, and a mandatory service may in practice need only its minimum
capability set.[^oird-pus]

| Type | Service name (as printed) | For instruments | Wiki page |
|---|---|---|---|
| 1 | Telecommand Verification | Mandatory | [ST[01]](../ecss/pus/st01-request-verification.md) |
| 2 | Device Command Distribution Service | Not applicable | [ST[02]](../ecss/pus/st02-device-access.md) |
| 3 | Housekeeping and Diagnostic Data Reporting | Mandatory | [ST[03]](../ecss/pus/st03-housekeeping.md) |
| 4, 7, 10, 13, 20, 22 | Not used | Not applicable | - |
| 5 | Event Reporting | Mandatory | [ST[05]](../ecss/pus/st05-event-reporting.md) |
| 6 | Memory Management | Mandatory | [ST[06]](../ecss/pus/st06-memory-management.md) |
| 8 | Function Management | Optional | [ST[08]](../ecss/pus/st08-function-management.md) |
| 9 | Time Management Service | Mandatory | [ST[09]](../ecss/pus/st09-time-management.md) |
| 11 | On-board Operations Scheduling Service | Not applicable | [ST[11]](../ecss/pus/st11-time-based-scheduling.md) |
| 12 | On-board Monitoring Service | Not applicable | [ST[12]](../ecss/pus/st12-onboard-monitoring.md) |
| 14 | Packet Transmission Control Service | Mandatory | [ST[14]](../ecss/pus/st14-real-time-forwarding-control.md) |
| 15 | On-board Storage and Retrieval Service | Not applicable | [ST[15]](../ecss/pus/st15-onboard-storage-retrieval.md) |
| 16 | On-board Traffic Management Service | Not applicable | - |
| 17 | Test | Mandatory | [ST[17]](../ecss/pus/st17-test.md) |
| 18 | OBCP Management | Optional | [ST[18]](../ecss/pus/st18-onboard-operations-procedure.md) |
| 19 | Event/Action Service | Not applicable | [ST[19]](../ecss/pus/st19-event-action.md) |
| 21 | Science Data Transfer | Mandatory | - |

Note that the 2001 draft numbering differs from today's PUS-C: service 14 was "Packet
Transmission Control", 16 "On-board Traffic Management", 20 was not used for instruments and
21 "Science Data Transfer"; the section headings elsewhere in the OIRD also list service 20 as
"Information Distribution CDMS - User" and 22 as "Context Saving".[^oird-pus][^oird-toc] The
differences between PUS generations are explained on
[PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md).

### Packet rules that a database must express

The general packet requirements PACK-0 to PACK-15 translate directly into
[MIB](../mib/monitoring.md) structures; the right-hand column is this wiki's mapping, not part
of the OIRD:[^oird-pack]

| Rule | Requirement (paraphrased) | Where it shows in the MIB |
|---|---|---|
| PACK-0, PACK-13 | APIDs are allocated by the ESA project in the PS-ICD | `PID_APID`, `CCF_APID` |
| PACK-1, PACK-2 | Different APIDs per subsystem/instrument for TCs; TM uses the same APID as the TCs to that unit where possible | [pid](../mib/tables/pid.md), [ccf](../mib/tables/ccf.md) |
| PACK-3, PACK-4, PACK-5 | A housekeeping parameter's location follows from APID, type/subtype and Structure ID (SID); SIDs unique within an APID; few SIDs per APID | [pic](../mib/tables/pic.md) / [pid](../mib/tables/pid.md) / [plf](../mib/tables/plf.md) |
| PACK-6, PACK-7 | No sub-commutation; super-commutation only with regular sampling and a known time offset of the first sample | `PLF_NBOCC`, `PLF_LGOCC`, `PLF_TIME`, `PLF_TDOCC` |
| PACK-8 | A parameter has the same structure and interpretation in every packet | one [pcf](../mib/tables/pcf.md) row per parameter |
| PACK-10, PACK-11, PACK-12 | Sampling time implied by APID and SID; the packet time is the start of acquisition; every packet except time and idle packets has a time field | `PID_TIME`, `PLF_TIME` |
| PACK-14 | TCs are validated by the destination at acceptance | [ST[01]](../ecss/pus/st01-request-verification.md) |
| PACK-15 | Herschel instrument data packets carry an Observation Identifier | (instrument-specific) |

Telecommand verification (TCV-0 to TCV-9) asks for a success report for every properly received
command, a failure report with reason for every rejected one, execution reports as requested
by the acknowledgement field, the command source (ground, mission timeline, OBCP) encoded in
the source sequence counter, and execution delays that depend only on the command, so that
ground time-outs can be configured.[^oird-tcv] Compare the stages and time windows that the
MIB's [command verification tables](../mib/command-verification.md) define.

### The Satellite Database requirements

Section 4.2 of the OIRD defines the database that became the HPSDB:[^oird-sdb]

* The prime contractor and the instrument teams deliver a **Satellite Database (SDB)** with
  all telemetry and telecommand data, command sequences, software parameters and commands;
  it is a single common database for system engineering, AIV and operations (SDBC-1, SDBC-2).
* Its content follows the SCOS-2000 Database Import ICD (AD-8, issue 5.1) and Annex 2, is
  internally consistent, consistent with the Flight Dynamics Database and with all on-board
  software, has no duplications and no irrelevant data, and records every update down to
  field level (SDBC-4 to SDBC-12).
* Deliveries: version 0 for the instrument AVM, version 1 at launch minus 36 months, version
  2 at L-24 months, version 3 one month before SVT 1 (complete,
  with flight values), version 4 one month before SVT 2, and a pre-launch update at L-1
  month (SDBD-1). Each delivery carries a configuration control file with field-level
  changes, the spacecraft build standard and the on-board software versions; the database is
  delivered as ORACLE data files (SDBD-2 to SDBD-5).

Annex A2 adds that the SDB is delivered "according to AD-8" together with a Configuration
Control File (version, release date, per-file versions and change tables listing old and new
values, date and initials) and a Spacecraft Configuration File (model EQM or PFM, build
standard, on-board software versions).[^oird-a2] Annex A4 delegates item names to the
Herschel/Planck Naming Convention (H-P-1-ASPI-SP-0141) and names flight procedures
`FCP_<subsystem>_nnnn`, contingency procedures `CRP_<subsystem>_nnnn` and timelines
`TDoyFfNn`.[^oird-a4]

```mermaid
timeline
  title Satellite Database deliveries required by the OIRD (SDBD-1)
  Instrument AVM : Version 0
  L-36 months : Version 1
  L-24 months : Version 2
  SVT 1 minus 1 month : Version 3 (complete, flight values)
  SVT 2 minus 1 month : Version 4
  L-1 month : Pre-launch update
```

## The packets as seen by instrument test equipment

The PS-ICD is not public, but the HIFI team's *TEI TMTC packet ICD* (SRON-U/HIFI/SP/2001-011,
issue 1.0, 19 December 2001) restates the headers for the packets exchanged with HIFI's test
equipment interfaces (TEI), citing the PS-ICD issue 2.0 draft 2 as applicable
document.[^tei-hdr] It is the most detailed public view of a Herschel-era packet layout.

**Telecommand source packet.** The primary header is the usual 48-bit
[Space Packet](../ccsds/space-packet.md) header, but the 14-bit sequence count is split into
a 3-bit **source** field (always `0b000` for these test equipment commands) and an 11-bit
counter, which each source maintains per APID and which wraps to 0.[^tei-hdr] This matches the note
to the OIRD's requirement TCV-6, which places the command source in the source sequence
counter of the packet header.[^oird-tcv]

<div class="bitfield" data-title="Herschel/Planck TC packet primary header as used by the HIFI TEI (48 bits)" data-width="16"
     data-fields='[{"n":"Version","b":3,"v":"000"},{"n":"Type","b":1,"v":"1","d":"1 = telecommand"},{"n":"Header flag","b":1,"v":"1"},{"n":"APID","b":11,"d":"TEI APIDs 2016-2023"},{"n":"Seq. flags","b":2,"v":"11"},{"n":"Source","b":3,"v":"000","d":"Command source; always 000 for the TEI"},{"n":"Sequence counter","b":11,"d":"Per source and APID; wraps to 0"},{"n":"Packet length","b":16,"d":"Octets in the packet data field minus 1"}]'></div>

<div class="bitfield" data-title="TEI TC data field header (32 bits)" data-width="16"
     data-fields='[{"n":"CCSDS sec. hdr flag","b":1,"v":"0"},{"n":"PUS version","b":3,"v":"000","d":"Printed as 0 in the TEI ICD"},{"n":"ACK","b":4,"d":"bit 3 acceptance, bit 2 start, bit 1 progress, bit 0 completion"},{"n":"Packet type","b":8},{"n":"Packet subtype","b":8},{"n":"Spare","b":8,"v":"00000000"}]'></div>

**Telemetry source packet.** The TM primary header has the 2-bit segmentation flags and a
14-bit source sequence counter; its packet length is always odd. The 80-bit data field header
holds a spare bit, a 3-bit PUS version (0), 4 spare bits, type, subtype, a spare octet, and a
48-bit on-board time of 32 bits of coarse seconds and 16 bits of fine sub-seconds; the packet
ends with a 16-bit packet error control field.[^tei-tm]

<div class="bitfield" data-title="TEI TM data field header (80 bits)" data-width="16"
     data-fields='[{"n":"Spare","b":1,"v":"0"},{"n":"PUS version","b":3,"v":"000"},{"n":"Spare","b":4,"v":"0000"},{"n":"Packet type","b":8},{"n":"Packet subtype","b":8},{"n":"Spare","b":8,"v":"00000000"},{"n":"Coarse on-board time (s)","b":32},{"n":"Fine on-board time (sub-seconds)","b":16}]'></div>

The PUS version value 0 is printed in both headers of the TEI ICD, whereas ECSS-E-70-41A
(2003) tells users to set the TC and the TM PUS version to 1, noting in footnotes that version
0 was used by the earlier ESA PUS.[^tei-hdr][^pus-a-dfh] The TEI ICD predates that issue and
follows a PS-ICD draft, so its value 0 matches the earlier ESA PUS convention; which value the
flight packets used is not stated in the available sources. Every TEI accepts a *Set OBS-ID* command TC(8,4) (function 1, activity
1, a 16-bit structure ID and a 32-bit observation identifier, matching PACK-15) and a
connection test TC(17,1), and reports acceptance with TM(1,1) or TM(1,2); the failure report
carries an 8-bit code (0 illegal APID, 1 bad length, 2 bad checksum, 3 illegal type, 4 illegal
subtype, 5 illegal or inconsistent application data) and an 8-bit parameter.[^tei-tc]

## The Herschel/Planck System Database (HPSDB)

### Why a system database

The HPSDB was procured by AAS-F to keep data consistent between engineering, on-board
software, AIT and flight operations, and to support the commonality between the two
satellites; GMV developed it.[^nlr-hpsdb] It is operated at a central site where final data are
stored and consistency is maintained, with several mirror sites; the system EGSE requirement
GRQT-0002b asks the Central Checkout System to support an HPSDB mirror site.[^nlr-hpsdb][^egse-req-ccs]
Export files from the HPSDB are used to build the on-board software and to produce the
TM/TC definitions in SCOS-2000 format for AIT and operations.[^nlr-hpsdb]

The data model has four levels:[^nlr-hpsdb]

* **Element** - building blocks such as a star tracker or the ASW elements for common,
  Herschel and Planck data;
* **Subsystem** - for example the ACMS or the Central Data Management Subsystem (ground
  support equipment is also modelled as a subsystem), built from element data plus
  subsystem-specific data;
* **Model** - for example the Herschel and Planck service modules or the protoflight models,
  built from subsystems;
* **Generic** - data usable by any other definition, such as ON/OFF curves and TM/TC packet
  headers.

Consistency is enforced by **instantiation** of "boxes": every box exists at least as a
*theoretical* box (design data, e.g. a default reaction-wheel friction coefficient) and as
*real* boxes (measured data for one unit). Logical instantiation builds subsystems from
elements and models from subsystems; physical instantiation creates several real copies of a
theoretical box, for example two real star trackers.[^nlr-hpsdb]

```mermaid
flowchart LR
  G["Generic level<br/>curves, TM/TC headers<br/>(subsystem letter G, position 000)"]
  E["Element level<br/>theoretical boxes"] -- "physical instantiation" --> R["Real boxes<br/>(e.g. STR #1, STR #2)"]
  E -- "logical instantiation" --> S["Subsystem level<br/>e.g. ACMS, CDMS, EGSE"]
  S -- "logical instantiation" --> M["Model level<br/>Herschel SVM, Planck SVM, PFM"]
  G -.-> S
  G -.-> M
  M --> X1["S2K bridge files<br/>(instrument EGSE, ICD 5.1)"]
  M --> X2["CCS bridge files<br/>(HPCCS)"]
  M --> X3["On-board software inputs"]
```

The diagram combines the levels described in the NLR paper with the export targets and the
generic-item naming rules of the HPSDB technical note.[^nlr-hpsdb][^tn-g2]

### How HPSDB reads and writes MIB files (H-P-1-ASP-TN-1060)

The Alcatel Alenia Space note *MIB files processing by HPSDB* (H-P-1-ASP-TN-1060, issue 1,
dated 07/02/2006; draft 1D1 of 02/02/2006 was sent to ESA to close an action from an
instrument database meeting in September 2005) documents how HPSDB ingests and generates two
flavours of [MIB](../mib/index.md) "bridge files": **S2K** files for the instrument EGSE,
which used MIB ICD issue 5.1 and was "version 2.3eP5 based on SCOS 2000 2.3e", and **CCS**
files for the HPCCS central checkout, which had its own external ICD
(H-P-4-TE-ID-8020).[^tn-scope] It lists the constraints that an input file must satisfy so that
HPSDB writes back an identical file. Constraints printed in bold cannot be checked by HPSDB
and remain the user's responsibility; the others are checked at load time.[^tn-scope]

Full round-trip compatibility was not always possible. The note's first example is the
packet-to-SPID relation: HPSDB allows several TM packets to map to one SCOS packet (SPID),
while the MIB ICD allows any-to-any mappings provided that only one is valid at a
time.[^tn-scope] The CCS also had functions that SCOS-2000 then lacked, for example selection
of a calibration by condition, event limits and critical telecommands, and SCOS
configuration files such as `MISCconfig` differed between installations.[^tn-scope]

The note's twenty general rules (G1-G20) are the clearest public statement of what a
system database needs on top of the MIB ICD:[^tn-g2][^tn-g6][^tn-g10][^tn-g13]

| Rule | Topic | What HPSDB does or requires |
|---|---|---|
| G1 | Object data model | Bridge files are extracted per object together with **all** items of the generic object; MIB files must be wrapped in an object identified by its position, defined in configuration files before loading |
| G2-G5 | Naming convention | Identifier structure (see below), with special numeric schemes for S2K curves, verification stages and parameter range sets, whose MIB fields were too short for instantiation |
| G6 | Enumerated fields | Values must be in the ICD set, possibly reduced by the PS-ICD (allowed type/subtype pairs) or by HPSDB (no octal radix) |
| G7 | Commutation | Packets and structures are lists of parameters, structures and (TC only) fixed areas with offsets, start bits, repetition counters and super-commutation attributes; a flag says whether PLF, VPD or both are generated |
| G8 | Default values | ICD defaults are forced even where irrelevant; some are replaced by HPSDB defaults (e.g. `PID_CHECK`, `CAF_RADIX`, `CCA_RADIX`) |
| G9 | Commonality | Discrete and status curves may be shared by TM and TC, so TM and TC curves must not reuse the same identifier |
| G10 | Category flag | Each item has an 8-bit flag, one bit per user type (AIT, operations, software, flight dynamics); loaded MIB items get "all except FDD" |
| G11 | Common fields | 64-character mnemonic, short description (32 characters by default), 256-character long description and configuration data (action, user, date, reason, area, source, site, validation and archive dates) |
| G12 | TC packet header | TC headers are defined generically; `TCP`, `PCPC` and `PCDF` are ignored on input and commands must reference one generic header via `CCF_PKTID` |
| G13 | Reserved characters | Because of XML, `>`, `<`, `'`, `"` and `&` are forbidden; descriptions use letters, digits, space, `+`, `-` and `_` |
| G14 | Radix | No octal (`O`) for unsigned integers; only `D` or `H` |
| G15 | Range allocation | Value ranges (PID numbers, UDC packet locations, ...) are allocated in the naming convention because SCOS did not support "smooth transition" easily |
| G16 | Automatic instantiation | Short description gets a position character appended; APID = element offset + position base; PID, UDC and MISC positions get deltas |
| G17 | Short description | Mandatory in HPSDB; if empty, it is set to the identifier |
| G18 | Orphan items | Not loaded |
| G19 | Sorting | Output sorted by the ICD primary key; inputs must be sorted too |
| G20 | Derived parameters | Expression files must be delivered with the MIB files |

### The naming convention, with a real example

HPSDB identifiers are built hierarchically. At element level, the first letter of a character
identifier gives the item type and the remaining characters are free. At subsystem or model
level, a subsystem letter is put in front (`Z` for a pseudo subsystem) and a three-digit
position is appended (`999` for the system pseudo position); numeric identifiers get a
two-digit subsystem number in front instead (A = 00 ... Y = 25, 26 for the pseudo subsystem).
Generic items use subsystem letter `G`, subsystem number `07`, position `000` and element
number `000`.[^tn-g2]

Curves are `NUMBER(6)` in HPSDB (three digits of theoretical element number and three free
digits) and unique across curve types. Because the S2K MIB fields were too short, an
instrument S2K file codes a specific curve as a three-digit number matching the three free
digits, and a generic curve as `1xxx`, which stands for the HPSDB generic curve
`G000xxx000`; verification stages and parameter range sets use the same trick (`1xxxx` for
`07xxxx000`, `1xxx` for `GRxxx000`).[^tn-g3]

!!! example "Worked example (real identifiers): `AESMG002` and `AESMG003`"
    The NLR paper gives one pair of real operational identifiers: the ACMS mode telemetry
    parameters in the Herschel and Planck mode status words start with `AESMG`, and the
    Herschel and Planck ASW boxes have numbers `002` and `003`, so the same parameter is
    `AESMG002` on Herschel and `AESMG003` on Planck.[^nlr-arch] Read with the HPSDB rule:
    a five-character subsystem-level name followed by the three-digit position of the box in
    which the element is instantiated.[^tn-g2]

!!! warning "Inference"
    That the leading `A` is the subsystem letter of the ACMS and that `E` is the item-type
    letter of the element identifier is this wiki's reading of the G2 rule; neither source
    spells out the letters of this example.

The SPIRE instrument applied the same naming convention to its own MIB in technical note
SPIRE-RAL-NOT-001155 (issue 1.2, March 2002). Command names follow `SCiiippp`, command
parameters `SPiiippp`, monitoring parameters `SMiiippp`, packets (SPIDs) `tttnnnnppp`,
calibrations `tttnnnrrr`, alphanumeric displays `SAiiippp`, graphic displays `SGiiippp` and
scrolling displays `SLiiippp`, where `iii` is a theoretical parameter identifier, `ttt` a
system element number (for example 480 for `OBS`, 490 for the DPU), `nnn` a
running number, `rrr` a real element number and `ppp` a position.[^spire-nc] The general rules
for project naming conventions are discussed on [Mission tailoring of the MIB](../mib/tailoring.md).

### Table by table: examples of HPSDB processing

Chapter 5 of the note goes through every MIB table field by field, stating the input
processing, the HPSDB field, the output processing and the constraint.[^tn-5] Some examples
show how much a system database rewrites:

* **VDF** is not loaded; on output HPSDB computes the version name from the selected date
  (by default the last validation date) and creates several records.[^tn-vdf]
* **PCF** holds all kinds of parameter in one table - TC, TC software, TC header, TM, TM
  software, dynamic and static UDC, saved synthetic, MISC and (CCS only) system
  parameters.[^tn-vdf]
* **PID**: HPSDB splits the MIB table into a TM packet definition and a SCOS packet
  definition, allows only many-to-one links from TM packets to SPIDs (AIT wanted one-to-one),
  forces `PID_TPSD` to the SPID or -1, `PID_TIME` and `PID_VALID` to `Y`, and requires one
  `PID_DFHSIZE` (default 16) per SPID.[^tn-pid]
* **PIC** is never loaded: to support smooth transition it is defined once in the generic
  part of HPSDB, every Herschel/Planck SCOS and CCS user had to implement the same table, and
  it is regenerated from generic data on output.[^tn-pid]
* **Parameter sets** (`PST`, `PSV`, `CPS`, `PVS`, `PSM`): "Not supported by CCS", constraint
  "do not use", although HPSDB can load them.[^tn-ps]
* **Specific CCS data**: the note also processes tables that existed only in the CCS ICD -
  conditional calibration `CUR`, groups `GRP`, `GRPA`, `GRPK`, SCOE definitions `SCO`, TC and
  TM distribution `TCD` and `TMD`, and logarithmic curves `LGF`.[^tn-ccs]

### From CCS-only tables to the standard MIB

Several of those CCS-only features came back into SCOS-2000. The change annex of MIB ICD
issue 7.0 lists, for ICD version 6.0, the *Herschel & Planck Check Out System functionalities
repatriation*: curve selection (several calibrations per parameter selected by another
parameter's value), delta limits, enable/inhibit of parameters, packets and named groups,
character curve identifiers (from `NUM(4)` to `CHAR(10)`), wider verification stage
identifiers (`NUM(5)` to `NUM(8)`), character range-set identifiers, the logarithmic curve
`LGF` for platinum thermistors, editable string parameters and automatic length fields for
variable strings.[^icd70-a1] The [cur](../mib/tables/cur.md), [grp](../mib/tables/grp.md),
[grpa](../mib/tables/grpa.md), [grpk](../mib/tables/grpk.md) and [lgf](../mib/tables/lgf.md)
tables of the [ICD history](../mib/icd-history.md) are this heritage; `SCO`, `TCD` and `TMD`
do not appear in the ICD 7.0 text.[^icd70-a1][^icd70-tables]

The features are in active use on a later mission. In the September 2025 Solar Orbiter
release, 907 parameters have conditional calibrations (1 974 `cur` rows), 105 monitoring
checks are delta checks (`OCP_TYPE` = `D`), and 2 monitoring groups with 4 packet-group rows
exist, while `lgf` is empty.[^mib25][^icd70-ocp]

??? example "SQL used (Herschel/Planck heritage features in the Solar Orbiter MIB)"
    ```sql
    -- solo-2025-09-16.sqlite (MIB__20250916M25925PFMS001_SOL)
    SELECT count(*), count(DISTINCT CUR_PNAME) FROM cur;   -- 1974 | 907
    SELECT OCP_TYPE, count(*) FROM ocp GROUP BY 1;         -- C 15, D 105, H 4153, S 3096
    SELECT count(*) FROM grp;  SELECT count(*) FROM grpa;  SELECT count(*) FROM grpk;  -- 2, 0, 4
    SELECT count(*) FROM lgf;                              -- 0
    ```

## The HPSDB MIB releases at the Herschel Science Archive

The Herschel Science Archive keeps a legacy operations area for the spacecraft database. Its
description page (not in this wiki's library) presents the Herschel-Planck Spacecraft
Database as ASCII tables mirroring the SCOS-2000 relational database that define the
telecommand and telemetry packets of the spacecraft and instruments.[^web-hpsdb] According to
this wiki's source survey of 2026-11-05, the page says the MIB reached version 13 and that
changes were added as new structure-ID versions so that version 13 can reprocess all mission
telemetry; it gives as format references the Database Import ICD EGOS-MCS-S2K-ICD-0001 issue
6.6 (2008-08-25) and the HCSS MIB Clarification and Tailoring Note HSC/DOC/0300 issue 1.9
(2007-09-14).[^web-hpsdb]

The data directory lists 15 zips: MOC issues 2 to 13 from July 2009 to October 2011, about
9.5 to 12 MB each with issue 7 present three times, and one earlier and smaller zip from May
2009 (`HPSDB_R_TM_HERSCH_FM1_M_903062241`, 1.8 MB); the newest is
`HPSDB_MOC_HERSCH_CCS_issueMOC13_201110111030.zip`.[^web-hpsdb-data]

!!! warning "Not verified by this wiki"
    These release facts come from directory listings recorded during the source survey,
    not from library copies. The zip downloads were refused (HTTP 403), so the table list,
    row counts and ICD compliance of the Herschel/Planck MIB are not stated in the available
    sources. Neither issue 6.6 of the ICD nor issue 1.9 of the HCSS note is in the library;
    the library has ICD issues 5.1, 6.7 draft A, 6.9 and 7.0 and HCSS note issue 1.5.

## The HCSS MIB Clarification and Tailoring Note

The Herschel Common Science System (HCSS) is the common software of the Herschel science
ground segment. It uses MIB data to build instrument-related commands and to interpret
downlinked data for clients such as Quick Look Assessment (QLA) and Interactive Analysis (IA);
the MIB itself is produced by an external MIB editor and handed over as ASCII files that the
HCSS MIB ingestion software validates.[^hcss-intro] Note HSC/DOC/0300 defines that interface.
The library copy is issue 1.5 (21 December 2004, prepared by H. Siddiqui, approved by the
Herschel Science Centre and the PACS, HIFI and SPIRE teams); its change record runs from issue
0.1 (14 January 2003) and issue 1.5 moved the applicable ICD to 5.2 and the naming convention
to 2.1.[^hcss-cover] The note says that the ICD and the naming convention "are however found to
be ambiguous in places" and therefore clarifies them, tailors them for Herschel and lists
the checks.[^hcss-intro]

**Clarifications of the ICD** include: one line per record with OS line endings and exactly
N-1 tabs for N fields (trailing grey fields may be omitted); mandatory numeric fields must not
be blank; non-mandatory fields without default are empty (0, 0.0 or empty string); an
out-of-limits condition is raised only strictly below the low or above the high limit;
`PLF_OFFBY`/`PLF_OFFBI` count from the end of the SCOS-2000 packet header, which equals the
start of the source packet when the generic packetiser is used; bit 0 of `PLF_OFFBI` is the
most significant bit; and decimal numbers use a point.[^hcss-41] Three of these came with ESOC
Document Change Requests: DCR 286 (an optional field may be left empty but its separator must
be present), DCR 309 (the `PLF_OFFBY` reference point) and DCR 308 (bit 0 of `PLF_OFFBI` is the
most significant); the note reproduces their text with the e-mail exchange between the
Herschel Science Centre and the SCOS-2000 team of 5 December 2002. The note cites no DCR
for the decimal-point rule.[^hcss-41][^hcss-esoc]

**Herschel constraints** for the final interface include:[^hcss-51][^hcss-52][^hcss-53]

* all ICD tables in one directory, synthetic parameter definitions in `synthetic/`, plus an
  extra two-column **command durations table** used by the HCSS Common Uplink System (CUS);
* `VDF` ignored, constant parameters (`PCF_NATUR` = `C`) ignored;
* a packet is identified by type, subtype, APID and SID, and a unique SPID is assumed for
  every packet type;
* a `PID_PI1_VAL` greater than 0 is not allowed where `PIC_PI1_OFF` = -1;
* every non-`Z` command needs at least four `PCDF` rows (version, type, data field header flag
  and APID), which contradicts the ICD statement that `PCDF_TCNAME` is unique;
* `CDF_CNAME` plus `CDF_PNAME` unique (repeated groups instead of repeated names);
* command sequences (`CSF`, `CSS`, `SDF`, `CSP`) and parameter sets (`PST`, `PSV`, `CPS`,
  `PVS`) ignored;
* `TXP_FROM` not above `TXP_TO`, and no overlapping textual calibration ranges;
* short descriptions restricted to `[a-zA-Z0-9_]+`, and the first character of the name plus
  the description unique for commands, command parameters and parameters, as is APID plus
  `PID_DESCR`.

Section 7 lists the checks, numbered 7.0.1 to 7.0.34 (7.0.6 removed), with their actions, from
file names (7.0.1) to consistency of `CDF_VALUE` with de-calibration curves (7.0.32),
`CPC_RADIX` (7.0.33) and a `PID_INTER` that must be null for every packet other than the
periodic housekeeping report type 3, subtype 25 (7.0.34).[^hcss-checks] Check 7.0.27 is worded
as an error when `TXP_TO` is greater than `TXP_FROM`, the reverse of constraint 5.2.12 (the check itself cites
5.2.13); this wiki reads the constraint, not the check wording, as the intended
rule.

!!! example "Applying some HCSS checks to the Solar Orbiter MIB (illustrative)"
    The HCSS rules were Herschel-specific, so a later mission is not expected to satisfy
    them; running a few of them on the September 2025 Solar Orbiter release shows which are
    generic data-quality checks and which are project choices.[^mib25]

    | HCSS check | Solar Orbiter 2025 result |
    |---|---|
    | 7.0.18, 7.0.20, 7.0.21: `PCF_NAME`, `CPC_PNAME` (`CPC_NAME` in the database), `CCF_CNAME` unique | No duplicates |
    | 7.0.14: every `PLF_SPID` exists in `PID` | Yes |
    | 5.2.6 / 7.0.12: no `PID_PI1_VAL` > 0 where the applicable `PIC_PI1_OFF` is -1 | No violation (APID-specific `pic` rows taken first) |
    | 7.0.15: status parameters (`PCF_CATEG` = `S`) have a textual calibration | 5 of 26 538 do not (for example [NIM01028](../explorer/index.md#/solo/param/NIM01028)) |
    | 7.0.27/7.0.28: `TXP_FROM` ≤ `TXP_TO`, no overlaps | 0 inverted ranges; 1 overlap, a duplicated row of calibration `CYCT0002TM` |
    | 5.3.1: short descriptions match `[a-zA-Z0-9_]+` | 68 789 of 126 745 parameter descriptions contain other characters (52 620 contain a space) |

??? example "SQL used (HCSS-style checks)"
    ```sql
    SELECT count(*) FROM (SELECT PCF_NAME FROM pcf GROUP BY 1 HAVING count(*) > 1);
    SELECT count(*) FROM (SELECT DISTINCT PLF_SPID FROM plf WHERE PLF_SPID NOT IN (SELECT PID_SPID FROM pid));
    SELECT PCF_NAME FROM pcf WHERE PCF_CATEG = 'S' AND coalesce(PCF_CURTX, '') = '';
    SELECT count(*) FROM txp WHERE TXP_FROM + 0 > TXP_TO + 0;
    SELECT a.*, b.* FROM txp a JOIN txp b ON a.TXP_NUMBR = b.TXP_NUMBR AND a.rowid < b.rowid
       AND a.TXP_FROM + 0 <= b.TXP_TO + 0 AND b.TXP_FROM + 0 <= a.TXP_TO + 0;
    -- descriptions with a character outside A-Z, a-z, 0-9 and _ (trim leaves a non-empty rest)
    SELECT count(*) FROM pcf
     WHERE trim(PCF_DESCR, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_') <> '';   -- 68789
    SELECT count(*) FROM pcf WHERE PCF_DESCR LIKE '% %';   -- 52620
    -- PIC rule: per pid row, use the APID-specific pic row if present, else the generic one
    WITH eff AS (SELECT p.PID_PI1_VAL v, coalesce(
        (SELECT PIC_PI1_OFF FROM pic c WHERE c.PIC_TYPE = p.PID_TYPE AND c.PIC_STYPE = p.PID_STYPE AND c.PIC_APID = p.PID_APID),
        (SELECT PIC_PI1_OFF FROM pic c WHERE c.PIC_TYPE = p.PID_TYPE AND c.PIC_STYPE = p.PID_STYPE AND coalesce(c.PIC_APID, '') = '')) off
      FROM pid p)
    SELECT count(*) FROM eff WHERE v + 0 > 0 AND off + 0 = -1;   -- 0
    ```

### The SPID uniqueness discussion (2002)

Constraint 5.2.5 assumed one SPID per packet type, but the PACS MIB of 2002 gave every TC
verification packet SPID 10006, because the SCOS-2000 version of the time did not allow a
range of SPIDs for packet type 1. The PACS team argued that this broke the ICD (a SPID must
define the packet structure uniquely, and a parameter may have only one location per packet)
and that SCOS-2000 abused `PCF_VALID` to select the location.[^hcss-spid] ESOC's answer of 23
September 2002 confirmed the limitation - the verifier only "listens" to a predefined list of
SPIDs for report-based verification - and added that Rosetta had implemented any SPID for
service 1 packets and Cryosat a range of SPIDs, with integration of the useful Rosetta and
Cryosat changes planned for SCOS-2000 R3.1 (reading all service-1 SPIDs from `pid.dat`).[^hcss-spid]

The restriction has left no trace in the Solar Orbiter MIB of 2025: its 1 809 service-1
packet definitions on 31 APIDs (29 for each subtype) all have different SPIDs, one for each acceptance or
completion success report and one for each failure code of TM(1,2) and TM(1,8), selected by
a 16-bit identification field at offset 20.[^mib25] See
[command verification in the MIB](../mib/command-verification.md) for how those SPIDs are
used today.

??? example "SQL used (service 1 SPIDs in the Solar Orbiter MIB)"
    ```sql
    SELECT PID_STYPE, count(*), count(DISTINCT PID_SPID), count(DISTINCT PID_APID)
      FROM pid WHERE PID_TYPE = '1' GROUP BY 1;   -- 1: 29/29/29, 2: 274/274/29, 7: 29/29/29, 8: 1477/1477/29
    SELECT count(*), count(DISTINCT PID_SPID), count(DISTINCT PID_APID)
      FROM pid WHERE PID_TYPE = '1';               -- 1809 | 1809 | 31
    SELECT * FROM pic WHERE PIC_TYPE = '1';       -- subtypes 2 and 8: PI1 at offset 20, width 16
    ```

## The ACMS operations database (NLR-TP-2007-240)

The NLR report *Turning requirements into operations - Herschel/Planck ACMS Database
Experience* (April 2007, based on SpaceOps 2006 paper AIAA-2006-590) is a first-hand account
of how a subsystem team produced MIB data for both satellites.[^nlr-intro] The relevant PUS
services for ACMS operations were [service 3](../ecss/pus/st03-housekeeping.md) (generated
by the basic software from a datapool of ASW and BSW parameters),
[service 5](../ecss/pus/st05-event-reporting.md) and
[service 8](../ecss/pus/st08-function-management.md) (most ACMS-specific
commands).[^nlr-obsw] The ASW held an on-board database (OBDB) of more than 3 000 parameters.
Because service 3 can only report datapool parameters, every parameter of interest had to be
in the datapool; a later interface let the ASW define its own 16/32/64-bit datapool entries
and identifiers (DIDs).[^nlr-obsw]

A dedicated database was not planned at first. It became necessary in phase B because the
Word telemetry document could not be kept consistent by hand, the interface was larger than
for other Dutch Space subsystems, SCOS-2000 in the ACMS test equipment needed every TM/TC
detail including operational identifiers, and the HPSDB was not yet mature enough to rely
on.[^nlr-why] The team built it in the DOORS requirements tool, with formal modules for
parameters, parameter types (with their PTC/PFC), units (with HPSDB and SCOS-2000
representations of at most four characters), enumerations, conversions, command
characteristics, TC and TM packet structures, packet identification criteria, packet
identifiers, alphanumeric displays, HPSDB boxes and a change log.[^nlr-arch] The off-the-shelf
SCOS-2000 MS Access database was rejected because it served one mission only, had no
object-level configuration control and could not link ASW data to the ASW
specification.[^nlr-scos]

Each object carries spacecraft (Herschel, Planck or common), software (ASW or BSW) and
first/last version attributes, so that version-specific SCOS-2000 and HPSDB files are
generated from one CSV export; exports are kept under CVS instead of DOORS baselines, and a
`ccsdiff` script compares the `.dat` files generated by HPSDB with those used in ACMS AIT.
GMV provided the tool that converts the ACMS XML into HPSDB XML.[^nlr-ver] The report's five
recommendations - integrate the database with specifications and ICDs, use database
identifiers in tests, keep TM/TC identifiers independent between requirements, software,
test and operations but traceable, version every object, and use inheritance and
instantiation - end with a call to standardise the database design for all space
programmes.[^nlr-rec]

!!! warning "Inference"
    Relating that call to the standardised monitoring and control data definitions of
    [ECSS-E-ST-70-31C](../ecss/e-st-70-31c.md) and to the EGS-CC tailoring data model (see
    [Ancillary systems and EGS-CC](../scos2000/ancillary-and-egs-cc.md)) is this wiki's
    reading; the NLR report does not name either.

```mermaid
flowchart LR
  DOORS[("ACMS Operations Database<br/>(DOORS)")] -- "CSV/XML export<br/>per version" --> GEN["generation scripts"]
  GEN --> S2K["SCOS-2000 / HPCCS .dat files<br/>(ACMS AIT)"]
  GEN --> ASW["ASW datapool + OBDB<br/>(Terma)"]
  GEN --> TCL["Tcl code for test scripts"]
  GEN --> AX["ACMS XML"] --> GMV["GMV tool"] --> HP[("HPSDB")]
  HP -- "HPSDB export" --> S2K2["SCOS-2000 .dat files<br/>generated by HPSDB"]
  S2K2 -- "ccsdiff" --- S2K
```

## Planck LFI: SCOS-2000 inside an instrument ground segment

The paper *Level 1 on-ground telemetry handling in Planck LFI* (Zacchei et al., JINST 4
T12019, 2009; arXiv:1001.4730) describes the first processing level of the Low Frequency
Instrument's Data Processing Centre (DPC). The Planck science ground segment consists of the
LFI and HFI DPCs, the MOC and the Planck Science Office; Level 1 takes raw telemetry
compliant with the ESA packet telemetry standard and the PUS and produces Time Ordered
Information (TOI) per housekeeping and science parameter.[^lfi-intro]

### What the instrument sends

LFI has 22 radiometers behind 11 feed horns at 30, 44 and 70 GHz; each radiometer gives two
outputs, so there are 44 science channels. A 14-bit ADC in the Data Acquisition Electronics
digitises each output, and the Radiometer Electronics Box Assembly (REBA) runs the on-board
software, builds the HK and science packets and executes telecommands.[^lfi-proc] To stay within
53.5 kbps the REBA offers seven processing types: PType 0 raw samples, 1 co-added samples,
2 and 3 mixing with gain modulation factors and requantisation to 16-bit integers, and 4 to 6
lossless adaptive arithmetic compression of types 0, 2 and 3. Nominally all 44 detectors use
PType 5, and every 15 minutes one detector is additionally processed in PType 1 for
calibration.[^lfi-proc][^lfi-ptype]

Packets follow the ESA packet telemetry and telecommand standards, the CCSDS packet telemetry
recommendations and the PUS: a primary header (type, APID, sequence counter modulo 16384,
length), a fixed secondary header (service type, subtype and a 48-bit CUC on-board time), a
Structure ID, a data segment and a 16-bit CRC; science packets add a **tertiary header**
with detector, phase-switch status, processing type, REBA parameters and number of
samples.[^lfi-pkt] The four fields APID, type, subtype and SID identify the structure of a packet
for the ground software, and the mission defined custom services for science
telemetry.[^lfi-pkt]

| Part | Content | Source |
|---|---|---|
| Primary header | Packet type, APID, sequence count (modulo 16384), packet length | [^lfi-pkt] |
| Secondary header | Service type and subtype; on-board time as 48-bit CUC | [^lfi-pkt] |
| SID | Structure identifier; with APID, type and subtype it selects the layout | [^lfi-pkt] |
| Tertiary header (science only) | Detector ID, phase switch status, processing type, REBA parameters, number of samples | [^lfi-sci] |
| Data segment | Science: up to 980 bytes; HK: parameter fields per the PUS parameter types | [^lfi-sci][^lfi-hk] |
| CRC | 16 bits, specified in the PUS | [^lfi-pkt] |

Housekeeping is periodic (essential every 32 s, for low-gain-antenna periods; fast every 1 s,
with some packets super-commutated into four identical sub-fields so that a packet comes every
4 s; slow every 64 s) or non-periodic (command responses, events and alarms).[^lfi-hk] The
paper notes that the MIB's PLF table gives, besides the offset, the number of occurrences of a
parameter in super-commutated packets, the field `PLF_NBOCC`; that the sub-field spacing goes
into `PLF_LGOCC` follows from the ICD field definitions rather than from the paper.[^lfi-scos][^icd70-plf]

### The Level 1 architecture

Level 1 has three subsystems: a **Real-Time Assessment** system (RTA) based on SCOS-2000; a
**Telemetry Handler** (TMH) built largely by the ISDC team in Geneva by reusing software
from the INTEGRAL ground segment; and a **Telemetry Quick-Look** system (TQL) built on
ROOT.[^lfi-arch] SCOS-2000 receives the telemetry, maintains a local raw packet archive, checks
for missing, damaged or duplicated packets, displays calibrated HK, sends telecommands and
raises out-of-limits alarms; it could not process the compressed science telemetry, which is
why it served mainly as EGSE and HK monitor.[^lfi-scos]

Configuring SCOS-2000 for LFI meant writing the MIB: the paper names
[PID](../mib/tables/pid.md) (APID, type, subtype and SID as the packet's "primary key"),
[PCF](../mib/tables/pcf.md) (parameter ID, description, type and calibration reference) and
[PLF](../mib/tables/plf.md) (parameter offset and number of occurrences for super-commutated
packets), plus out-of-limits values with validity criteria for different test conditions
(e.g. warm or cryogenic), conditional calibrations and displays.[^lfi-scos] The TMH then
reads the same MIB files to extract and calibrate HK parameters, so one database serves both
the SCOS-2000 displays and the scientific pipeline.[^lfi-tmh]

```mermaid
flowchart LR
  REBA["LFI REBA<br/>HK + science packets"] --> S2K["SCOS-2000 (EGSE / RTA)<br/>PDS, HFA, displays, OOL"]
  S2K -- "FDIF client task (SCOS 2.3e)" --> TMH
  REBA -.->|integration tests - HPCCS| HPCCS["HPCCS"]
  HPCCS -- "PIPE protocol" --> GW["LFIGateway"]
  GW --> TMH["TMH pipeline<br/>Data Receive -> TMU -> TM2TOI"]
  GW --> HPCCS2["LFI HPCCS client"]
  TMH --> TQL["TQL quick-look<br/>(ROOT)"]
  TMH --> TOI[("TOI archive<br/>FITS, 1-hour chunks")]
  MIB[("MIB ASCII tables")] --> S2K
  MIB --> TMH
```

The tailoring followed the SCOS-2000 releases. For instrument-only tests the EGSE ran SCOS
2.3e; its telemetry receiver was modified to replay simulated LFI data, and a task using the
Flight Dynamics Interface (FDIF) let the TMH register as a SCOS client and receive live
packets. From the Planck integration tests onward the EGSE was the HPCCS, which talks to
external equipment through the **Packet Interface Protocol for EGSE (PIPE)**; a new
LFIGateway relayed telemetry from the HPCCS operated by the spacecraft team to the LFI team's
own HPCCS and TMH/TQL.[^lfi-scos] The PIPE message format itself is not stated in the
available sources.

The TMH pipeline has three parts: *Data Receive* stores raw packets in a FITS archive and
forwards them to TQL; the *TeleMetry Unscrambler* (TMU) groups HK packets by APID, type,
subtype and SID and science packets by detector and processing type, into hour-long FITS
files of an intermediate archive; and *TM2TOI* produces the final TOI archive, one FITS file
per HK parameter, with raw and calibrated values and quality flags.[^lfi-tmh] Science samples are
then decompressed, dequantised, demixed and converted from ADU to volts using parameters from
the tertiary header and from HK telemetry, and each sample's time is rebuilt from the packet
time, the sample index and the sampling frequency.[^lfi-l1]

## Instrument EGSE: from the 2000 decision to SCOS EGSE 2.3e P5

**The decision.** At an ESOC meeting on 19 April 2000 with all FIRST/Planck instrument teams,
ESA confirmed SCOS-2000 as the baseline for MOC operations and stated that it would support
the product for flight operations and EGSE; the minutes record that "All PI groups unanimously
stated their intention to use SCOS 200 as a basis for EGSE and RTA" (sic).[^mom-1][^mom-concl]
The PROBA experience (SCOS 2 with an ORACLE database, a Delphi router and Tcl/Tk procedures)
was presented as the model, and the database question was left to the prime contractor, with
ORACLE, MS Access (the Integral tool) or custom solutions as options.[^mom-1] The SCOS-2000
presentation of 18 April 2000 proposed reusing PROBA's router and Tcl/Tk procedure tool with
MS Access database editors from Integral.[^pres-offer] The full story is on
[Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
and [SCOS-2000 as EGSE](../scos2000/egse.md).

**The building blocks.** The Herschel EGSE integration plan (SRON-U/HIFI/PL/2001-1, issue 1,
6 November 2001) lists who delivered each block of the common instrument-level test EGSE
(EGSE-ILT) of HIFI, PACS and SPIRE: SCOS-2000, the OBSM and the MIB editor from ESA, the SCOS
gateway from ESTEC, the test-equipment interface and TM/TC router from HIFI, test control from
PACS and the CDMS simulator from SPIRE; each of the router, test-equipment interface,
CDMS-simulator and test-control tests loads a test MIB into SCOS-2000 as its second step,
right after connecting the subsystems.[^egse-int]

**The kernel.** ESA's *EGSE based on SCOS 2000 - The EGSE & Mission Control System*
(TOS-EMG/01-1029, issue 4.0, 2004-03-09) is the user manual of the "SCOS EGSE Release 2.3e P5"
delivered to the Herschel/Planck instrument developers. It explains that the EMCS follows the
PROBA approach with SCOS-2000 in place of SCOS 2, adds a Test and Operations Procedure
Environment (TOPE) in Tcl/Tk pending the ECSS PLUTO language, and introduces a Space System
Model in which every addressable system element has a 16-bit identifier: 0x0000-0x07FF are
on-board application processes (the APIDs), 0x0800 is the spacecraft identifier entry in the
MIB, and higher ranges are reserved for SCOS tasks, front ends and EGSE routers.[^emcs-1][^emcs-ssm]
Its change log records Herschel-specific additions such as the Herschel/Planck TC history/OOL
server, a configurable mission epoch and a time-tagging mode for the Herschel instrument OBT
scenario.[^emcs-chg] For Herschel, SRON developed a Linux-based EGSE router instead of the
Windows router used on PROBA.[^emcs-scoe]

**The system level.** Alcatel's *EGSE General Requirements Specification* (H-P-1-ASPI-SP-0045,
issue 03, 10/06/02) records the baseline that instrument EGSEs and the ESOC flight control
system are both based on SCOS-2000, so that instrument station software, test procedures and
OBCPs move from instrument tests through system tests to commissioning with minimal change.
It requires a Central Checkout System (with a one-server "CCS lite" for PLM and instrument
EGSE) with standard interfaces for on-line and off-line data distribution to instrument EGSE,
pre-transmission checks against the Satellite Database, and support of an HPSDB mirror
site.[^egse-req-common][^egse-req-ccs] ESA's 2003 list of SCOS-2000 clients counts both the
Herschel/Planck CCS (on Red Hat 7.2) and the Herschel/Planck instrument EGSE (on SUSE 7.3),
next to the Herschel/Planck MCS.[^peccia-clients] An ESA Bulletin article of 2007 notes that
common tools for spacecraft checkout and operations preparation, promoting a seamless
transition from manufacture to operations, "was exploited recently by Herschel and
Planck".[^merri-hp]

## Related pages

* [Missions](index.md), [Solar Orbiter](solar-orbiter/index.md),
  [Rosetta, Mars Express and Venus Express](rosetta-mex-vex.md),
  [Other missions and SCOS-2000 users](other-missions.md)
* [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md),
  [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
* [The MIB](../mib/index.md), [Mission tailoring of the MIB](../mib/tailoring.md),
  [History of the Database Import ICD](../mib/icd-history.md), [MIB tooling](../mib/tooling.md)
* [PUS packet structures](../ecss/pus/packets.md), [Glossary](../glossary.md)

[^nlr-intro]: [NLR-TP-2007-240, Herschel/Planck ACMS Database Experience](../library/nlr-report-e0d9e9a5.md), executive summary and §I Introduction, PDF pp. 1, 3 and 7.
[^nlr-bg]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §II Background: Missions, Industrial team, Programme status, PDF pp. 8-9.
[^nlr-acms]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §II Attitude Control and Measurement System, PDF p. 9.
[^nlr-obsw]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §II.E On-board Software, PDF pp. 10-11.
[^nlr-why]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §III ACMS Operations Database development (introduction), PDF p. 11.
[^nlr-hpsdb]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §III Herschel/Planck System Data Base, PDF pp. 11-12.
[^nlr-scos]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §III SCOS-2000 based ACMS Test Equipment, PDF p. 12.
[^nlr-arch]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §III ACMS Operations Database architecture, Fig. 2 and footnote 7, PDF pp. 12-14.
[^nlr-ver]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §IV Versions and baselines, ACMS Test and Verification activities, Generation of Herschel/Planck System DataBase files, PDF pp. 17-18.
[^nlr-rec]: [NLR-TP-2007-240](../library/nlr-report-e0d9e9a5.md), §V Recommendations and lessons learned, PDF p. 18.
[^oird-scope]: [SCI-PT-RS-07360 Herschel/Planck Operations Interface Requirements Document, issue 2.2](../library/cosmos-operations-interface-requirements.md), cover, approval page and §1.1-1.3, PDF pp. 1-2 and 10.
[^oird-chg]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), change record (issue 2.0 of 12-7-2001: project name, SCOS 2000 Database Import made applicable), PDF p. 4.
[^oird-toc]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), section headings §3.13 (Service 16) and §3.17-3.19 (Services 20-22), PDF pp. 35 and 37.
[^oird-concept]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §1.5 General Operations Concepts, PDF p. 11.
[^oird-pkt]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §1.5.1-1.5.2, PDF pp. 11-12.
[^oird-obm]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §1.5.3-1.5.8, PDF pp. 12-14.
[^oird-pus]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §3, table "Applicable PUS Services", PDF p. 24.
[^oird-pack]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §3.1 General, PACK-0 to PACK-15, PDF pp. 25-26.
[^oird-tcv]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §3.2 Telecommand Verification (Service 1), TCV-0 to TCV-9, PDF p. 26.
[^oird-sdb]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §4.2 Satellite Database, SDBC-1 to SDBD-6, PDF pp. 40-42.
[^oird-a2]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), Annex A2 Satellite Database Contents, PDF pp. 60-61.
[^oird-a4]: [SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), Annex A4 Operational Database Naming Conventions, PDF p. 70.
[^tei-hdr]: [SRON-U/HIFI/SP/2001-011 TEI TMTC packet ICD, issue 1.0](../library/cosmos-tei-tmtc-packet-icd.md), §2.1 and §3.1, Tables 3.1-1 to 3.1-4, PDF pp. 3-4.
[^tei-tm]: [SRON-U/HIFI/SP/2001-011](../library/cosmos-tei-tmtc-packet-icd.md), §3.2, Tables 3.2-1 and 3.2-2, PDF p. 5.
[^tei-tc]: [SRON-U/HIFI/SP/2001-011](../library/cosmos-tei-tmtc-packet-icd.md), §4.1, Tables 1-3, PDF pp. 6-7.
[^pus-a-dfh]: [ECSS-E-70-41A (PUS-A)](../library/ecss-e-70-41a-30jan2003-pus.md), §5.3.3 Packet data field, TC Packet PUS Version Number and footnote 3, PDF p. 44; §5.4.3, TM Source Packet PUS Version Number and footnote 4, PDF p. 48.
[^tn-scope]: [H-P-1-ASP-TN-1060 issue 1, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), distribution record, change record, §1 Scope, §2 Documents and §3 Acronyms, PDF pp. 2-3 and 7-8.
[^tn-g2]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.1 G1 Object data model and §4.2 G2 Naming convention, PDF pp. 9-10.
[^tn-g3]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.2.1-4.2.3 G3-G5, PDF pp. 10-11.
[^tn-g6]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.3-4.6 G6-G9, PDF pp. 11-13.
[^tn-g10]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.7-4.9 G10-G12, PDF pp. 13-14.
[^tn-g13]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.10-4.17 G13-G20, PDF pp. 14-16.
[^tn-5]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5 Field by field presentation (column definitions), PDF p. 17.
[^tn-vdf]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.1.1 VDF and §5.2.1 PCF, PDF p. 18.
[^tn-pid]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.2.9 PID and §5.2.10 PIC, PDF pp. 24-26.
[^tn-ps]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.3.16-5.3.20 PST, PSV, CPS, PVS, PSM, PDF pp. 39-40.
[^tn-ccs]: [H-P-1-ASP-TN-1060](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.4 Specific CCS data, §5.4.1-5.4.8, PDF pp. 42-45.
[^icd70-a1]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Annex 1, items for ICD version 6.0 "Implement modifications related to Hershel & Planck Check Out System functionalities repatriation", PDF pp. 246-248.
[^icd70-tables]: [ICD issue 7.0](../library/icd-7-0-final.md), table of contents §3.3.2.2.1 cur, §3.3.2.2.7 lgf and §3.3.2.6 Monitoring Groups (grp, grpa, grpk), PDF pp. 9-11.
[^icd70-plf]: [ICD issue 7.0](../library/icd-7-0-final.md), §3.3.2.5.1 Parameters location in fixed packets: plf, fields 5 `PLF_NBOCC` and 6 `PLF_LGOCC`, PDF p. 98.
[^icd70-ocp]: [ICD issue 7.0](../library/icd-7-0-final.md), §3.3.2.3.2 Monitoring checks definition: ocp, field `OCP_TYPE` ('D' = delta check), PDF p. 78.
[^mib25]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `cur`, `ocp`, `grp`, `grpa`, `grpk`, `lgf`, `pcf`, `cpc`, `ccf`, `plf`, `pid`, `pic` and `txp`, queried by this wiki (SQL above).
[^web-hpsdb]: Web page not in this wiki's library: Herschel Science Archive, "Herschel MIB / HPSDB" description page, <https://archives.esac.esa.int/hsa/legacy/operations/moc/sdb/>; content as recorded in this wiki's source survey (`scos2000-docs-index.md`, section 2.3) on 2026-11-05; not re-checked.
[^web-hpsdb-data]: Web directory not in this wiki's library: <https://archives.esac.esa.int/hsa/legacy/operations/moc/sdb/data/>; listing as recorded in this wiki's source survey on 2026-11-05; the zip downloads returned HTTP 403.
[^hcss-intro]: [HSC/DOC/0300 HCSS MIB Clarification and Tailoring Note, issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §1.1-1.3, PDF pp. 4-5.
[^hcss-cover]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), cover and Document Change Record, PDF pp. 1-2.
[^hcss-refs]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §2 Referenced Documents (RD-1 ICD issue 5.2, RD-2 naming convention issue 2.1, RD-3 OIRD issue 2.1), PDF p. 6.
[^hcss-41]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §4.1 Clarification of [RD-1], points 4.1.1-4.1.8, PDF pp. 9-10.
[^hcss-esoc]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §9 ESOC response to comments by HS (DCR 286, 308, 309), PDF pp. 25-27.
[^hcss-51]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §5.1 Required Tables and §5.1.1 Command durations table, PDF p. 12.
[^hcss-52]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §5.2 Tailoring of [RD-1], points 5.2.3-5.2.13, PDF pp. 13-14.
[^hcss-53]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §5.3 Tailoring of [RD-2], points 5.3.1-5.3.5, PDF p. 14.
[^hcss-checks]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §7 Checks performed by the HCSS MIB software, 7.0.1-7.0.34, PDF pp. 20-22.
[^hcss-spid]: [HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §10 Discussions on SPID Uniqueness, §10.1-10.2, PDF pp. 28-29.
[^lfi-intro]: [Zacchei et al., Level 1 on-ground telemetry handling in Planck LFI (arXiv:1001.4730)](../library/arxiv-1001-4730-planck-lfi-tm.md), abstract and §1 Introduction, PDF pp. 2-4.
[^lfi-proc]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §2.1 The on-board processing, PDF pp. 4-6.
[^lfi-ptype]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §2.1, processing types and nominal configuration, PDF pp. 6-7.
[^lfi-pkt]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §2.1.1 Telemetry Packet Structure, Fig. 2, PDF pp. 7-8.
[^lfi-sci]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §2.1.2 Mapping SCI data into packets, PDF pp. 8-9.
[^lfi-hk]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §2.1.3 Mapping HK data into packets, PDF pp. 9-10.
[^lfi-arch]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §3 The Level 1 software system overview, Fig. 4, PDF pp. 10-11.
[^lfi-scos]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §3.1 SCOS in the LFI Level 1, PDF pp. 11-12.
[^lfi-tmh]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §3.2 The Telemetry Handler System, PDF pp. 12-14.
[^lfi-l1]: [arXiv:1001.4730](../library/arxiv-1001-4730-planck-lfi-tm.md), §4 The Level 1 scientific data processing, PDF pp. 15-16.
[^mom-1]: [Minutes TOS-OF/2000/318/SJD/HS, SCOS 2000 and FIRST/PLANCK, 19 April 2000](../library/scos2000-and-first-planck-mom.md), points 1-4, PDF pp. 1-2.
[^mom-concl]: [Minutes TOS-OF/2000/318/SJD/HS](../library/scos2000-and-first-planck-mom.md), Conclusion, PDF p. 4.
[^pres-offer]: [SCOS-2000 presentation to FIRST/Planck, 18.04.2000](../library/scos2000-complete-presentation-2000.md), slides "Main elements" and "TOS offer (SW only)", PDF pp. 14 and 26.
[^egse-int]: [SRON-U/HIFI/PL/2001-1 Herschel EGSE integration plan, issue 1](../library/cosmos-herschel-egse-integration-plan.md), §1-3 and §3.1-3.4 (test steps), PDF pp. 3-11.
[^egse-req-common]: [H-P-1-ASPI-SP-0045 EGSE General Requirements Specification, issue 03](../library/h-p-1-aspi-sp-0045-egse-general-req.md), "Commonality/Compatibility between Mission phases" and GRQT-0001, PDF p. 19.
[^egse-req-ccs]: [H-P-1-ASPI-SP-0045 issue 03](../library/h-p-1-aspi-sp-0045-egse-general-req.md), §3.2.4.1 CCS, GRQT-0002a and GRQT-0002b, PDF pp. 28-30.
[^emcs-1]: [TOS-EMG/01-1029 EGSE based on SCOS 2000 (EMCS SUM), issue 4.0](../library/emcs-sum-4-0.md), §1.1 Scope, §1.4 Overview and §1.4.3 TOPE, PDF pp. 7, 9 and 13.
[^emcs-ssm]: [EMCS SUM issue 4.0](../library/emcs-sum-4-0.md), §1.4.1 The Space System Model, SE identifier table, PDF pp. 10-12.
[^emcs-chg]: [EMCS SUM issue 4.0](../library/emcs-sum-4-0.md), change log and change record (issues 1.0 to 4.0), PDF pp. 2-3.
[^emcs-scoe]: [EMCS SUM issue 4.0](../library/emcs-sum-4-0.md), §1.4.4 The SCOE (notes 1-4), PDF p. 14.
[^spire-nc]: [SPIRE-RAL-NOT-001155 SPIRE MIB Naming Convention, issue 1.2](../library/spire-mib-naming-convention-1-2.md), §1 and §2-3.1, PDF pp. 1-2.
[^peccia-clients]: [N. Peccia, SCOS-2000: ESA's Spacecraft Control for the 21st Century, GSAW 2003](../library/gsaw2003-peccia.md), slides "S2K Client missions", PDF pp. 14-15.
[^merri-hp]: [M. Merri et al., Happy Families, ESA Bulletin 130 (2007)](../library/bul130-merri-happy-families.md), PDF p. 7.
