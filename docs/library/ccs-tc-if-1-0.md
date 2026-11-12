---
title: "CCS – IEGSE telecommand interface approach"
description: "A three-page technical note dated 12 February 2003 by Erich Wiezorrek, archived by SPIRE as SPIRE-PAC-NOT-001542, proposing how the Herschel/Planck Central Checkout System (CCS) could execute a predef"
tags: ["Technical Note", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [ccs-tc-if-1-0]
---

# A Possible Approach For The CCS – IEGSE Telecommand Interface

<dl class="osi-meta"><dt>Document ID</dt><dd>SPIRE-PAC-NOT-001542</dd><dt>Date</dt><dd>2003-02-12</dd><dt>Organisation</dt><dd>Herschel PACS instrument team (organisation not printed; archive stamp SPIRE-PAC-NOT)</dd><dt>Authors</dt><dd>Erich Wiezorrek</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Not stated; a proposal note with a list of open points (PDF p. 2).</dd><dt>Pages</dt><dd>3</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/001542_NOT_CCS-IEGSE_Telecommand/CCS-Tc-IF_1.0.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/001542_NOT_CCS-IEGSE_Telecommand/CCS-Tc-IF_1.0.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:44Z</dd><dt>SHA-256</dt><dd><code>1a5128cacf50d15dc57be885e7b33ffc6dc5afe09505420d3a0c496bbf9ca200</code></dd><dt>Size</dt><dd>32.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/ccs-tc-if-1.0.pdf">ccs-tc-if-1.0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A three-page technical note dated 12 February 2003 by Erich Wiezorrek, archived by SPIRE as SPIRE-PAC-NOT-001542, proposing how the Herschel/Planck Central Checkout System (CCS) could execute a predefined test script holding the complete telecommand sequence during system tests, while letting an instrument EGSE (IEGSE) provide the actual telecommand parameter values, telecommand IDs and waiting times.

The concept is a request/response exchange over the PIPE protocol. The CCS sends a TC packet to the IEGSE requesting the parameters for a named observation; the IEGSE uses the HCSS (in particular its CUS) to instantiate the observation and returns the delta times, telecommand IDs and parameter values coded in IEGSE housekeeping (HK) telemetry packets. The delivered test script contains the request, a wait for all HK packets, the retrieval of the values from those packets, and a final sequence that sends each telecommand with its external request ID and waits the specified time. The approach was prototyped on the PACS instrument-level-test EGSE built on SCOS-2000: MIB files describing the IEGSE TC and TM packets were ingested, the script ran in TOPE, and the result was checked in the SCOS-2000 telecommand history.

The note lists the deliveries (one common IEGSE MIB for all three instrument teams and a test script per test) and open points: conversion from TOPE syntax to the CCS format, support of the TCrequestID argument of TCsend (known since SCOS 2000 version 2.3e), naming conventions not yet followed by the prototype MIB, a 242-character limit on the observation request, and how parameters are passed to scripts. Page 3 holds an example TOPE (Tcl) test script.


## Key points

- The CCS sends a TC packet via the PIPE protocol to the IEGSE requesting the TC parameters for a named observation; the IEGSE instantiates the observation with the HCSS (CUS) and returns delta times, TC IDs and parameter values in IEGSE HK TM packets. *(PDF p. 1)*
- All CCS-IEGSE communication steps are part of the delivered test script: the TC request, a wait for all IEGSE HK packets, and retrieval of the TC parameters, IDs and delta times. *(PDF p. 1)*
- Prototype: MIB files describing the IEGSE TC and TM packets were ingested into the PACS ILT EGSE SCOS 2000 system; the test script ran in the TOPE subsystem and the resulting TC sequence was checked with the SCOS 2000 telecommand history application. *(PDF p. 2)*
- The instrument teams deliver a MIB describing the IEGSE TC and TM packets, identical for all three instrument teams, plus a test script per test containing the TC sequence and all TOPE commands for CCS-IEGSE communication. *(PDF p. 2)*
- The TCrequestID argument of TCsend transfers the external TC ID to SCOS 2000 (known since SCOS 2000 version 2.3e). *(PDF p. 2)*
- The prototype MIB does not yet follow the naming conventions, and the observation-requesting IEGSE TC is limited to 242 characters by the Herschel telecommand length limitation. *(PDF p. 2)*
- The example script uses TOPE statements such as TCsend, Subscribe ... ReferBy ... Whenever UPDATE_raw, vwait, Fetch ... into and WaitTime, with MIB names prefixed ZC (commands) and ZM (parameters). *(PDF p. 3)*


## Cited by these wiki pages (2)

- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (6 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Scope | 1 |
    |  | Concept | 1 |
    |  | Prototyping | 2 |
    |  | Deliveries by the instrument teams | 2 |
    |  | Open points | 2 |
    |  | Test script example | 3 |


## Documents this one references (1)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-pipe-protocol) | PIPE protocol |  | mentioned |

!!! note "Notes"
    Short Ghostscript-produced PDF; the text layer of the test-script page (PDF p. 3) is garbled by a font-encoding problem, but the rendered page is legible. The title page prints an en dash between 'CCS' and 'IEGSE' that the text layer drops. The file name (CCS-Tc-IF_1.0) suggests version 1.0, but no issue is printed. The concept diagram shows CCS, MIB, IEGSE, CCS-TC and HCSS CUS. No reference list; SCOS 2000 (version 2.3e), TOPE, the PIPE protocol and the HCSS are mentioned without document identifiers.

