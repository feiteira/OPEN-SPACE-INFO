---
title: "Advanced Telecommand Verification (Terma CCS5)"
description: "An eight-page conference paper by two Terma B.V."
tags: ["Paper", "Tools, MIB editors and related standards"]
sources: [1530-armitage]
---

# Advanced Telecommand Verification

<dl class="osi-meta"><dt>Organisation</dt><dd>Terma B.V. (Leiden, The Netherlands)</dd><dt>Authors</dt><dd>Andrew Armitage, Vidjaikumar Kalicharan</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper; no event name, date or status is printed. It was posted on ESA Indico event 93, which also hosts SESP 2015 material (library item 02-sesp-2015-from-hpsdb-to-egs-cc-presentation); the PDF metadata creation date is 2 March 2015. The text says EGS-CC development 'is due to begin' (PDF p. 7).</dd><dt>Pages</dt><dd>8</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/93/contributions/3576/attachments/2798/3255/1530_Armitage.pdf" rel="noopener">https://indico.esa.int/event/93/contributions/3576/attachments/2798/3255/1530_Armitage.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:38Z</dd><dt>SHA-256</dt><dd><code>6abac3c01fdda0db4733dce7b39ce339b2cfdf7973d7765de551979ad0c91b44</code></dd><dt>Size</dt><dd>387.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/1530_Armitage.pdf">1530_Armitage.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An eight-page conference paper by two Terma B.V. engineers on how a ground system should verify telecommands when the spacecraft itself stores, repeats or generates commands. It first summarises how SCOS-2000 verifies commands from the MIB: by an expected telemetry parameter value inside a time window, by PUS service 1 reports (TM(1,x)) and by status consistency checks, with a 'superseded' state for overlapping commands. It then lists the limitations seen in missions: only one verification type per stage (missions borrow the last progress stage to combine a TM(1,7)/TM(1,8) report with a parameter check), a verifier hard-coded in C++ and CORBA that is expensive to customise, and on-board time-line manipulations (PUS service 11) that every mission implements differently.

The core of the paper describes Terma's CCS5 checkout system. CCS5 keeps most of the SCOS-2000 verifier behaviour in C++ but exposes its in-memory telecommand cache to the Tcl-based TOPE procedure language. Each command carries properties (id, raw, apid, executionTime, subscheduleId, timeTagged, cyclicRepeats, isModelled) that scripts read and change with commands such as tcprop, tcsubscribe, updatecommand and the mtl* time-line helpers. This supports ground tracking of time-line edits, cyclic commands (for example triggered by orbit position) and 'modelled' commands sent by another party, which helps in system validation tests, hot-redundant CCS servers and EGSE front ends; options for modelling OBCP and event-action behaviour are tabulated. The paper ends with cautions about imperfect ground models and accumulated timer drift, and with critical remarks on PUS tailoring, CCSDS MO and the EGS-CC.


## Key points

- SCOS2000 TC verification is defined in the MIB; global settings and environment variables add space-link propagation delay and permitted time jitter on top of the verification windows. *(PDF p. 1)*
- Verification by TM parameter expected value checks the first parameter sample after the time window opens; it works even for non-PUS spacecraft but has no explicit reference to the command. *(PDF p. 1)*
- Verification by PUS service 1 reports (TM1,x) is practically unambiguous, but the Source Sequence Counter wraps round to zero; the paper reports that this caused ambiguous reports on one major science mission with a reduced SSC range. *(PDF p. 1)*
- SCOS2000 also offers status consistency checks (SCC, called 'change on command only' or COCOMO elsewhere) and a 'superseded' status when a second command expecting a different value is sent while the first is still pending. *(PDF p. 2)*
- The MIB data model allows only one verification type per stage; several missions borrow the last progress stage to check a TM parameter in addition to TM(1,7)/TM(1,8) completion reports. *(PDF p. 2)*
- Customising the SCOS2000 verifier requires C++ and CORBA changes, recompilation and reinstallation, which makes mission adaptation costly; for PUS service 11 time-tagged commands SCOS2000 moves the verification timeouts to the execution time given in the MTL loading command. *(PDF p. 2)*
- The authors state they know of no ESA mission that has followed the PUS standard exactly for on-board time-line modification. *(PDF p. 2)*
- TOPE, the TCL-based test procedure language previously used in SCOS2000-based CCS, was re-implemented for CCS5; mission-specific verification behaviour is scripted in TOPE rather than coded in C++. *(PDF p. 2)*
- Required TC cache size is (verification timeout + propagation delay) x commanding rate, e.g. (30 + 10) . 100 = 4000 commands; the cache grows with a warning rather than dropping incomplete commands. *(PDF p. 3)*
- CCS5 command IDs are unique across the system, with the workstation ID in the upper 4 bits; all properties of all commands are archived at every verification stage, and a subset is indexed for SQL queries. *(PDF p. 3)*
- Time-line commands from TOPE: tcsubscribe filters sent commands by properties (e.g. {type 11}); ::utope::mtldelete, mtldisablerelease, mtlenablerelease, mtlreset and timeshift update the ground model of the mission time line, and the TC verifier follows the modified execution times. *(PDF p. 4)*
- Cyclic commands use the cyclicRepeats property (a count, or -1 for infinite) decremented on each repetition; updatecommand &lt;id&gt; &lt;stage&gt; &lt;state&gt; set to IDLE and then PENDING re-opens a verification window. *(PDF p. 4)*
- A modelled command (isModelled = true) is verified and archived like a real one but discarded at the point of transmission; use cases are system validation tests (MCS commanding while CCS listens), hot redundancy and command tracking within the EGSE. *(PDF p. 5)*
- Table 2 weighs options for modelling command sequencing, on-board control procedures (generic XML representation, external tools such as MOIS or APEX, or an operational simulator) and the event-action service. *(PDF p. 6)*
- Ground models must avoid timers whose drift accumulates over repeated cycles (for example a TC sequence modelled with a fixed inter-command delay). *(PDF p. 7)*
- The authors call PUS too loosely defined and over-tailorable, and warn that an EGS-CC primarily supporting PUS may prolong its use; with hindsight they would have implemented the verifier fully in scripts. *(PDF p. 7)*


## Cited by these wiki pages (2)

- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (14 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Introduction | 1 |
    |  | Current state of the art | 1 |
    |  | Current limitations | 2 |
    |  | Terma CCS5 general approach | 2 |
    |  | Terma CCS5 implementation | 3 |
    |  | Telecommand properties | 3 |
    |  | Scheduled telecommands | 3 |
    |  | Cyclic telecommands & more | 4 |
    |  | Modelling telecommands | 5 |
    |  | Modelling spacecraft behaviour | 5 |
    |  | Notes of caution | 6 |
    |  | Lessons learned & future applications | 7 |
    |  | Conclusions | 7 |
    |  | References | 8 |


## Documents this one references (7)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [EGOS-MCS-S2K-ICD-0001](../references/index.md#ref-egos-mcs-s2k-icd-0001) · [library](icd-7-0-final.md), [library](icd-6-7-drafta.md), [library](icd-6-9-archive-org.md) | SCOS-2000 Database Import ICD | version 6.9 2010-07-06 | reference |
| [2] | [ECSS-E-70-41A](../references/index.md#ref-ecss-e-70-41a) · [library](ecss-e-70-41a-30jan2003-pus.md) | Ground systems and operations — Telemetry and telecommand packet utilization | 2003-01 | reference |
|  | [catalogue](../references/index.md#ref-packet-utilisation-standard-pus-service-type-1-and-service-type-11-on-board-tc-s) | Packet Utilisation Standard (PUS) service type 1 and service type 11 (on board TC scheduling / Mission Time Line) |  | mentioned |
|  | [catalogue](../references/index.md#ref-file-transfer-protocol-cdfp-implemented-in-a-tmtc-front-end) | File transfer protocol 'CDFP' implemented in a TMTC front end |  | mentioned |
|  | [catalogue](../references/index.md#ref-mois-and-apex-external-obcp-management-tools) | MOIS and APEX (external OBCP management tools) |  | mentioned |
|  | [catalogue](../references/index.md#ref-egs-cc-european-ground-system-common-core) | EGS-CC (European Ground System Common Core) |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-mo) | CCSDS-MO |  | mentioned |

!!! note "Notes"
    No date, event or document number is printed; the author e-mail addresses on the title page are omitted here. The PDF metadata title 'Electronic format submission for AP2000' is a leftover of the conference template. The extraction reports 9 PDF pages (registry: 8); the last is empty. Figures 1 (Orbit Position Scheduling, PDF p. 5) and 2 (On Board Application Monitoring, PDF p. 6) have no text layer. Typos kept as printed: 'CDFP' (presumably CFDP, PDF p. 5) and 'our own produce CCS5' (PDF p. 7). Reference [1] is the ICD issue in library item icd-6-9-archive-org; [2] is ecss-e-70-41a-30jan2003-pus. Related Terma material in the library: companion paper 1530-kazmirchuk-paper (CCS5 dynamic housekeeping), indico-109-armitage-2011926 (SESP 2010, CMDVS), terma-ccs5-tsc-presentation and terma-ccs5-datasheet. An 'A. Armitage' of Terma also authorised the Herschel/Planck CCS External ICD (rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd); that this is the same person is an inference.

