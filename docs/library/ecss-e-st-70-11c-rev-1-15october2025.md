---
title: "ECSS-E-ST-70-11C Rev.1 Space segment operability"
description: "ECSS-E-ST-70-11C Rev.1 is the ECSS space segment operability standard."
tags: ["Standard", "ECSS standards"]
sources: [ecss-e-st-70-11c-rev-1-15october2025]
---

# Space engineering
Space segment operability

<dl class="osi-meta"><dt>Document ID</dt><dd>ECSS-E-ST-70-11C Rev.1</dd><dt>Issue / version</dt><dd>Second issue, Revision 1</dd><dt>Date</dt><dd>2025-10-15</dd><dt>Organisation</dt><dd>ECSS Secretariat, ESA-ESTEC Standards Section (prepared by the ECSS-E-ST-70-11C Rev.1 Working Group)</dd><dt>Authors</dt><dd>ECSS-E-ST-70-11C Rev.1 Working Group</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>Second issue, Revision 1, dated 15 October 2025, the newest ECSS standard in the library. It revises ECSS-E-ST-70-11C (31 July 2008), which followed ECSS-E-70-11A (5 August 2005); ECSS-E-70-11B was never issued (change log, p. 3). The change log notes that a new DOORS module, not linked to the previous version, was created because of the number of changes.</dd><dt>Pages</dt><dd>84</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ecss.nl/wp-content/uploads/2025/10/ECSS-E-ST-70-11C-Rev.1-(15October2025).pdf" rel="noopener">https://ecss.nl/wp-content/uploads/2025/10/ECSS-E-ST-70-11C-Rev.1-(15October2025).pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:10Z</dd><dt>SHA-256</dt><dd><code>6d957991230614a6eddd34405eadb62f931212f0fe6c3518df8242de9655b728</code></dd><dt>Size</dt><dd>775.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/ECSS-E-ST-70-11C-Rev.1-15October2025.pdf">ECSS-E-ST-70-11C-Rev.1-15October2025.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

ECSS-E-ST-70-11C Rev.1 is the ECSS **space segment operability** standard. It lists the on-board functions an unmanned spacecraft must provide so that it can be operated safely and cost-effectively from the ground in any nominal or predefined contingency situation. Each mission tailors it by selecting requirements and adding its own, and mission-specific values are left as **mission constants** in angle brackets (e.g. `<TC_VERIF_DELAY>`, summarised in Annex A). The 2025 revision updates the 2008 text with modern operations experience and ESA's generic operations interface requirements. It also aligns the standard with ECSS-E-ST-70-41 (PUS) to remove overlap, and it drops the old tailoring annex.

Clause 3 defines the six operability categories (observability, commandability, compatibility, deactivation, flexibility, testability) and the criticality terms: essential and critical telecommands, high priority command and telemetry, mission-critical function. Clause 4 states one-line general requirements per category. Clause 5 gives the detailed requirements, grouped by function:

* virtual channel allocation;
* telemetry design rules: self-contained values, no sub-commutation in HK packets, same APID order within a VC, HPTM, a dedicated VC for idle frames;
* diagnostic mode;
* datation, including OBT/UTC correlation, no clock wrap-around and GNSS time;
* telecommand rules: one function per TC, arm/fire for critical functions, verification of every stage, COP-1 windows;
* modes and reconfiguration;
* autonomy levels E1-E4 and D1-D2, and FDIR/safe mode;
* PUS-specific operability (APIDs, memory management, scheduling, monitoring, large packets, storage, OBCPs, event-action, files);
* subsystem rules for processors, power, TT&C, AOCS, mechanisms, thermal, payload and file systems.

This is the requirements baseline behind many PUS and MIB design choices.


## Key points

- Rev.1 aligns the scope of ECSS-E-ST-70-11 with ECSS-E-ST-70-41 to avoid overlap, rewrites clause 5.8 as complementary PUS operability requirements, updates the Annex A mission constants and removes the former Annex B tailoring guide. *(PDF p. 3)*
- Six operability categories are defined: commandability, compatibility, deactivation, flexibility, observability and testability. *(PDF p. 10)*
- An essential telecommand is distributed without on-board software; a high priority command is a pulse command routed to hardware by a CPDU; high priority telemetry reports mission-critical equipment status under all circumstances. *(PDF p. 11)*
- Mission-dependent quantities are 'mission constants' written in angle brackets, e.g. &lt;TC_VERIF_DELAY&gt;, and summarised in Annex A. *(PDF p. 16)*
- No telecommand executed at the wrong time or configuration may lead to loss of the mission; mission-critical functions can be protected with two independent telecommands (e.g. ARM and FIRE). *(PDF p. 19)*
- Security: implementing CCSDS 355.0-B SDLS (Baseline Mode for TC Authentication) and CCSDS 355.1-B Extended Procedures is recommended. *(PDF p. 24)*
- Different data classes get different downlink bandwidth through physical and virtual channels; the VC-to-data-class assignment does not change during the mission, but the bandwidth allocation can. *(PDF p. 25)*
- Telemetered values must be self-contained (no delta or change-only telemetry), and fast-changing critical parameters such as pyro currents must be latched and the latched value telemetered. *(PDF p. 26)*
- A telemetry parameter keeps the same structure and interpretation in every packet; super-commutated parameters are sampled regularly; housekeeping packets do not use sub-commutation; packets of one APID on one VC are delivered in generation order. *(PDF p. 28)*
- Idle frames go on a dedicated virtual channel; idle packets only complete a frame that already holds a meaningful packet; all packets except idle, time and HPTM packets are available for on-board storage. *(PDF p. 30)*
- On-board time must be settable by TC, monotonically increasing in all modes and never wrap around; all telemetry source packets should carry an on-board generation time in their header. *(PDF p. 32)*
- The sampling time of a parameter in a non-variable packet must be derivable from the packet generation time by an implicitly known offset; GNSS-based OBT must report the GNSS/OBT correlation and handle leap seconds autonomously. *(PDF p. 33)*
- A telecommand contains one and only one on-board function, keeps the same action definition for the whole mission (no flip/flop commands) and must not cause permanent loss of commanding. *(PDF p. 35)*
- With COP-1 and the AD service, the sliding window must be configured for in-orbit conditions so as not to limit the uplink rate artificially. *(PDF p. 38)*
- Mission-critical functions need at least two separate command actions (arm/enable then execute); critical register loads need a separate execute command. *(PDF p. 38)*
- Every TC except pure hardware (CPDU) commands gets acceptance-stage verification; invalid TCs (wrong length, CRC or APID) fail at acceptance; success reports can be disabled; register loads are echoed by dedicated telemetry parameters. *(PDF p. 40)*
- Autonomy levels: E1 (ground control) to E4 (goal-oriented on-board re-planning) for mission execution, and D1 (essential data storage) to D2 (all mission data) for data management. *(PDF p. 49)*
- PUS operability: one or more application processes per subsystem; APID assignment fixed for the mission; APID + type + subtype (plus further fields) uniquely identify packet structure; HK packets have fixed content and fixed sample-time offsets; parameter IDs are unique across the spacecraft. *(PDF p. 60)*
- Time-tagged TCs with equal release times are not rejected but released one after the other; TCs that 'elapsed' while a schedule was disabled are not released when it is re-enabled. *(PDF p. 62)*
- A mission must be able to define maximum TC and TM packet lengths below the CCSDS maxima, and must support large-packet uplink and downlink by splitting. *(PDF p. 63)*
- TT&C: at least two receivers on different antennas are always active; TCs with repetitive bit patterns must be processed without error (CCSDS 231.0-B randomisation is suggested); a ground-configurable &lt;NO_TC_TIMEOUT&gt; triggers on-board contingency recovery. *(PDF p. 71)*
- Annex A defines 23 mission constants, e.g. &lt;TIME_CORREL_ACCUR&gt;, &lt;TC_VERIF_DELAY&gt;, &lt;SAFE_TIME&gt;, &lt;NO_TC_TIMEOUT&gt;, &lt;MIN_DATA_RATE_SM&gt; and &lt;CEL_DUMP_TIME&gt;. *(PDF p. 82)*


## Cited by these wiki pages (11)

- [ECSS-E-ST-70-11C: space segment operability](../ecss/e-st-70-11c.md)
- [ECSS-E-ST-70-31C: monitoring and control data definition](../ecss/e-st-70-31c.md)
- [ECSS: the European space standards system](../ecss/index.md)
- [ST[09] Time management](../ecss/pus/st09-time-management.md)
- [ST[11] Time-based scheduling](../ecss/pus/st11-time-based-scheduling.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [ST[17] Test](../ecss/pus/st17-test.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [Time correlation in SCOS-2000](../scos2000/time-correlation.md)


??? abstract "Contents (65 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Change log | 3 |
    |  | Introduction | 7 |
    | 1 | Scope | 8 |
    | 2 | Normative references | 9 |
    | 3 | Terms, definitions and abbreviated terms | 10 |
    | 3.1 | Terms from other standards | 10 |
    | 3.2 | Terms specific to the present standard | 10 |
    | 3.3 | Abbreviated terms | 15 |
    | 3.4 | Conventions | 16 |
    | 3.5 | Nomenclature | 16 |
    | 4 | General requirements | 18 |
    | 4.1 | Introduction | 18 |
    | 4.2 | Observability | 18 |
    | 4.3 | Commandability | 18 |
    | 4.4 | Compatibility | 19 |
    | 4.5 | Safety and fault tolerance | 19 |
    | 4.6 | Flexibility | 20 |
    | 4.7 | Testability | 22 |
    | 4.8 | Deactivation | 23 |
    | 5 | Detailed requirements | 24 |
    | 5.1 | Introduction | 24 |
    | 5.2 | Mission-level | 24 |
    | 5.2.1 | Security | 24 |
    | 5.2.2 | Uplink and downlink | 25 |
    | 5.3 | Telemetry | 25 |
    | 5.3.1 | Telemetry data | 25 |
    | 5.3.2 | Diagnostic mode | 31 |
    | 5.3.3 | Data compression | 31 |
    | 5.4 | Datation and synchronization | 32 |
    | 5.5 | Telecommanding | 35 |
    | 5.5.1 | Telecommand function | 35 |
    | 5.5.2 | Critical telecommands | 38 |
    | 5.5.3 | Telecommand transmission and distribution | 39 |
    | 5.5.4 | Telecommand verification | 40 |
    | 5.6 | Configuration management | 42 |
    | 5.6.1 | Modes | 42 |
    | 5.6.2 | On-board configuration handling | 44 |
    | 5.7 | On-board autonomy | 46 |
    | 5.7.2 | General autonomy | 46 |
    | 5.7.3 | Autonomy for execution of nominal mission operations | 48 |
    | 5.7.4 | Autonomy for mission data management | 49 |
    | 5.7.5 | On-board fault management | 50 |
    | 5.8 | The ECSS-E-ST-70-41 Telemetry and telecommand packet utilization standard | 59 |
    | 5.8.2 | General service design | 59 |
    | 5.8.3 | Memory management | 60 |
    | 5.8.4 | Time management | 61 |
    | 5.8.5 | On-board operations scheduling | 62 |
    | 5.8.6 | On-board parameter and functional monitoring | 63 |
    | 5.8.7 | Large packet transfer | 63 |
    | 5.8.8 | On-board storage and retrieval | 64 |
    | 5.8.9 | On-board control procedures | 65 |
    | 5.8.10 | Event action | 65 |
    | 5.8.11 | File based operations | 65 |
    | 5.9 | Equipment and subsystem specific | 66 |
    | 5.9.1 | On-board processors and software | 66 |
    | 5.9.2 | Power supply and consumption | 70 |
    | 5.9.3 | Telemetry, tracking and command (TT&C) | 71 |
    | 5.9.4 | Attitude and orbit control | 73 |
    | 5.9.5 | Mechanisms | 76 |
    | 5.9.6 | Thermal control | 77 |
    | 5.9.7 | Payload | 78 |
    | 5.9.8 | On-board storage and file system | 79 |
    | 5.10 | File based operations (General) | 81 |
    | Annex A | Mission constants (informative) | 82 |
    |  | Bibliography | 84 |


## Documents this one references (13)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| ECSS-S-ST-00-01 | [ECSS-S-ST-00-01](../references/index.md#ref-ecss-s-st-00-01) | ECSS system – Glossary of terms |  | normative |
| ECSS-E-AS-50-24 | [ECSS-E-AS-50-24](../references/index.md#ref-ecss-e-as-50-24) | Space engineering – Adoption Notice of CCSDS 231.0-B, TC Synchronization and Channel Coding |  | normative |
| ECSS-E-AS-50-25 | [ECSS-E-AS-50-25](../references/index.md#ref-ecss-e-as-50-25) | Space engineering – Adoption Notice of CCSDS 232.0-B, TC Space Data Link Protocol |  | normative |
| ECSS-E-AS-50-26 | [ECSS-E-AS-50-26](../references/index.md#ref-ecss-e-as-50-26) | Space engineering – Adoption Notice of CCSDS 232.1-B, Communications Operation Procedure-1 |  | normative |
| ECSS-E-ST-70-41 | [ECSS-E-ST-70-41](../references/index.md#ref-ecss-e-st-70-41) | Space engineering – Telemetry and telecommand packet utilization |  | normative |
| CCSDS 133.0-B-2 | [CCSDS 133.0-B-2](../references/index.md#ref-ccsds-133-0-b-2) · [library](ccsds-133-0-133x0b2e2.md) | Space packet protocol |  | normative |
| ECSS-S-ST-00 | [ECSS-S-ST-00](../references/index.md#ref-ecss-s-st-00) | ECSS system — Description and implementation and general requirements |  | bibliography |
| CCSDS 350.5-G | [CCSDS 350.5-G](../references/index.md#ref-ccsds-350-5-g) | Space Data Link Security Protocol-Summary of Concept and Rationale |  | bibliography |
| CCSDS 232.1-B | [CCSDS 232.1-B](../references/index.md#ref-ccsds-232-1-b) | Communications Operation Procedure-1 |  | bibliography |
| CCSDS 355.0-B | [CCSDS 355.0-B](../references/index.md#ref-ccsds-355-0-b) | Space Data Link Security Protocol |  | bibliography |
| CCSDS 355.1-B | [CCSDS 355.1-B](../references/index.md#ref-ccsds-355-1-b) | Space Data Link Security Protocol - Extended Procedures |  | bibliography |
|  | [CCSDS 232.0-B](../references/index.md#ref-ccsds-232-0-b) | CCSDS 232.0-B (maximum TC packet length) |  | mentioned |
|  | [CCSDS 231.0-B](../references/index.md#ref-ccsds-231-0-b) | CCSDS 231.0-B (command randomisation) |  | mentioned |

!!! note "Notes"
    Printed page numbers equal PDF page numbers, and PDF page 85 is blank (the registry gives 84 pages). Requirement identifiers run from ECSS-E-ST-70-11_1670001 upwards (e.g. _1670399 on p. 81). The change log uses the short forms 'ECSS-E-70-11C' and 'ECSS-E-70-41C' and has the typo 'standardarised' (p. 3). Definition 3.2.3.35 refers to 'ECSS-S-ST-70-41', an apparent typo for ECSS-E-ST-70-41 (p. 15). The normative references cite the adoption notices and CCSDS books without issue numbers (p. 9). Requirement 5.5.1t prints 'ECSS-E-AS-50-26and' (p. 38). The bibliography is short and omits several standards cited in the text, such as CCSDS 232.0-B and 231.0-B (pp. 63, 71).

