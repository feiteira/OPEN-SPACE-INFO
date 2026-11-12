---
title: "dst.dat: Command routing"
description: "The optional dst table defines where the SCOS-2000 releaser delivers commands, keyed by command APID: at most one record per APID, applying to all commands whose CCF_APID has that value. Commands whos"
tags: [MIB, "Commanding"]
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# dst.dat: Command routing

<div class="osi-chips"><span class="osi-chip">ICD 7.0 §3.3.3.2.1.1</span><span class="osi-chip">1 rows in Solar Orbiter 2025-09-16</span></div>

The optional dst table defines where the SCOS-2000 releaser delivers commands, keyed by command APID: at most one record per APID, applying to all commands whose CCF_APID has that value. Commands whose APID is not listed are sent to the default destination, the NCTRS. ICD 7.0 states that the table is currently used only by SCOS-2000 based EGSE systems, where commands may have to be delivered to ground equipment rather than to the NCTRS: either non-spacecraft commands addressed to a SCOE, or spacecraft commands issued to the spacecraft through a TC front end of the EGSE. The routing is written as a destination identifier string of up to three dot-separated fields: the receiving system (NCTRS or EGSE), then for EGSE the request type (SCOE for non-spacecraft commands or TC for spacecraft commands), then for spacecraft commands routed to EGSE the address of the ground equipment that uplinks the command.[^icd]

**Key:** `DST_APID`

## Fields

<div class="osi-fields"><table class="osi-ftable"><colgroup><col style="width:3.2em"><col style="width:11em"><col style="width:7em"><col style="width:3.4em"><col></colgroup><thead><tr><th>#</th><th>Field</th><th>Type</th><th>M/O</th><th>Description</th></tr></thead><tbody>
<tr id="dst_apid"><td>1</td><td><code>DST_APID</code></td><td>Number(5)</td><td>M</td><td>Command APID to which the routing applies, an integer 0 to 65535 (so it covers both spacecraft APIDs 0 to 2047 and non-spacecraft APIDs 2048 to 65535). All commands with this CCF_APID use the route.<div class="osi-extra">Refers to <a href="../ccf/">ccf.CCF_APID</a>. <span class="osi-fstat">Solar Orbiter: filled in 1 of 1 rows; e.g. <code>1372</code></span> <span class="osi-pg">ICD PDF p. 141</span></div></td></tr>
<tr id="dst_route"><td>2</td><td><code>DST_ROUTE</code></td><td>Char(30)</td><td>M</td><td>Destination identifier: a string of up to three fields separated by dots. The first field is the system to which the SCOS-2000 releaser delivers the command: NCTRS (spacecraft commands only; the default for APIDs absent from the table) or EGSE (spacecraft or non-spacecraft commands). The second and third fields apply only to EGSE routing. The second gives the request type and layout: SCOE for non-spacecraft commands or TC for spacecraft commands. The third applies only to spacecraft commands not routed via the NCTRS and is the address of the ground equipment that sends the command to the spacecraft. Examples given by the ICD: NCTRS, EGSE.SCOE and EGSE.TC.0x8800 (spacecraft command routed via the SCOE and the TC front end 0x8800).<ul class="osi-vals"><li><code>NCTRS</code> Spacecraft command routed via the NCTRS (default).</li><li><code>EGSE.SCOE</code> Non-spacecraft command delivered to the EGSE as a SCOE request.</li><li><code>EGSE.TC.&lt;address&gt;</code> Spacecraft command delivered to the EGSE and uplinked by the ground equipment with the given address, e.g. 0x8800.</li></ul><div class="osi-extra"><span class="osi-fstat">Solar Orbiter: filled in 1 of 1 rows; e.g. <code>EGSE.TC.0x8800</code></span> <span class="osi-pg">ICD PDF p. 141</span></div></td></tr>
</tbody></table></div>

## Relationships

- `DST_APID` → [ccf.CCF_APID](ccf.md#ccf_apid): Routing applies to every command with this APID; commands whose APID is not in DST go to the NCTRS.

## History across ICD issues

The table has the same two fields (DST_APID Number(5) key, DST_ROUTE Char(30), both mandatory) in ICD 5.1 (section 3.3.3.2.1.1, PDF p.66-67), ICD 6.7 Draft A (PDF p.132), ICD 6.9 (PDF p.136) and ICD 7.0 (PDF p.141-142). pyscos2000 (ICD 7.2) has the same two mandatory columns with DST_APID as key.

!!! note "Notes from the extraction"
    No discrepancy in columns between ICD 7.0, pyscos2000 and the Solar Orbiter dst.dat (2 columns). Both Solar Orbiter releases (2020-04-16 and 2025-09-16) contain a single record routing APID 1372 to 'EGSE.TC.0x8800', which is literally the ICD example route. In the 2025-09-16 ccf, 91 commands use APID 1372 (92 in 2020), all with header NOM_TC and subsystem 108 and mnemonics starting with ZIC (for example ZIC0C000 'CONNECTION_TEST', service types 3, 6, 17, 21 and 255); all other APIDs fall back to the NCTRS default. Why this APID is routed to an EGSE front end in a flight-operations MIB is not stated in the available sources. Note also that ICD 7.0 calls the table 'DST' in upper case in its heading, while the file is dst.dat.

## In the Solar Orbiter MIB

The 2025-09-16 release has **1** rows in `dst.dat`. Browse them through the [MIB Explorer](../../explorer/index.md#/solo/search/) or read about the [Solar Orbiter MIB](../../missions/solar-orbiter/mib.md).

[^icd]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../../library/icd-7-0-final.md), §3.3.3.2.1.1, PDF p. 141.
