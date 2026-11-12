---
title: "Herschel/Planck FOP procedure: SCOS client setup"
description: "A one-procedure extract from the Herschel/Planck Flight Operations Plan (FOP), document PT-HMOC-OPS-FOP-6001-OPS-OAH, in the ground-segment procedure group (prefix CGSPMCS)."
tags: ["Procedure", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [c-gsp-mcs-scos]
---

# Herschel/Planck SCOS Client Setup

<dl class="osi-meta"><dt>Document ID</dt><dd>PT-HMOC-OPS-FOP-6001-OPS-OAH (procedure file C_GSP_MCS_SCOS.xls)</dd><dt>Issue / version</dt><dd>Fop Issue 3.0; procedure Version 4</dd><dt>Date</dt><dd>2010-04-13</dd><dt>Organisation</dt><dd>Herschel/Planck Mission Operations Centre (HMOC), ESA/ESOC (as indicated by the document number; no organisation name is printed)</dd><dt>Authors</dt><dd>F. Keck</dd><dt>Type</dt><dd>Procedure</dd><dt>Status</dt><dd>Printed status 'Version 4 - Unchanged', last check-in 09/04/09, inside FOP issue 3.0 dated 13/04/10 (PDF p. 1). No superseding issue is in the library.</dd><dt>Pages</dt><dd>5</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/operations/fop/procedures/C_GSP_MCS_SCOS.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/operations/fop/procedures/C_GSP_MCS_SCOS.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:42Z</dd><dt>SHA-256</dt><dd><code>11ab05285147722601fd22dca1d88d511ce805d09606927ae8b4bdc046009678</code></dd><dt>Size</dt><dd>116.7 KB</dd><dt>Our copy</dt><dd><strong>Not hosted here.</strong> The document prints operational login credentials, so this wiki does not republish it. Read it at its original location.</dd></dl>

## Summary

A one-procedure extract from the Herschel/Planck Flight Operations Plan (FOP), document PT-HMOC-OPS-FOP-6001-OPS-OAH, in the ground-segment procedure group (prefix C_GSP_MCS). It is the standard ESOC FOP procedure layout: a summary sheet (objectives, constraints, spacecraft configuration, reference files, referenced displays and a configuration-control table), a flowchart page whose graphic did not survive text extraction, and numbered steps with branch targets.

The procedure tells a Herschel or Planck operator how to use a [SCOS-2000](../scos2000/index.md) client workstation of the Herschel/Planck mission control system (HPMCS): log in to the workstation with the mission-specific operations account, start the SCOS client with a start script, log in to the client under one of the operational user roles, stop the client cleanly (close the task-launcher applications, log the user out, exit the desktop), switch the client to another MCS chain (A, B or C) with a switch script, and change mission by logging out and logging back in under the other mission's account.

For an engineer, it is a concrete example of how ESOC packages ground-segment operations as FOP procedures. It also shows that the Herschel and Planck MCS ran as redundant server chains, with clients bound to one chain at a time, on both Sun Unix and Linux workstations. The [architecture](../scos2000/architecture.md) and [Herschel/Planck interface](../scos2000/herschel-planck-interfaces.md) pages put it in context. It contains no telemetry or telecommand definitions.


## Key points

- The procedure has four objectives: log in and out on a H/P workstation, start and stop a H/P SCOS client, change the MCS chain, and change the mission between Herschel and Planck. Its only constraint is that the workstation is switched on. *(PDF p. 1)*
- Herschel and Planck use separate workstation operations accounts, with different password schemes for the Unix and Linux workstations. The credentials are printed in the source and are deliberately not reproduced here. *(PDF p. 3)*
- To stop a SCOS client, the operator closes all client applications from the task launcher (Telemetry, Commanding and Others tabs, Stop, Select all), logs the SCOS user out via the desktop Login button, then presses the red Exit button on the desktop. *(PDF p. 3)*
- A client is moved to another MCS chain by running the switch_client command in a terminal and choosing client type A, B or C. The choice is case sensitive, and the terminal must be closed afterwards. *(PDF p. 4)*
- The SCOS client is started with the hpmcs.start command. The user then logs in with the Login button on the top SCOS taskbar. *(PDF p. 4)*
- The client user accounts listed are FCT, OD, PST, PROJECT, PISA, OBSM, MPS, SIM and SWS. *(PDF p. 4)*
- To change a workstation from Herschel to Planck (or back), the operator logs out and restarts the procedure from step 1 with the other mission's login. *(PDF p. 4)*
- The configuration-control table runs from creation on 27/02/08 to version 4 on 09/04/09. The intermediate changes added Linux clients (04/12/08), client selection (10/02/09) and MCS-chain selection (16/02/09). *(PDF p. 1)*


## Cited by these wiki pages (3)

- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Methodology](../about/methodology.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (14 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Summary | Procedure Summary (Objectives, Summary of Constraints, Spacecraft Configuration, Reference File(s), Referenced Displays) | 1 |
    | CCI | Configuration Control Information | 1 |
    | Flowchart | Procedure Flowchart Overview | 2 |
    | Step 1 | Login Workstation ? | 3 |
    | Step 2 | Workstation Login | 3 |
    | Step 3 | Start SCOS Client ? | 3 |
    | Step 4 | Stop SCOS Client ? / Change MCS Chain ? / Logout Workstation ? / Change Mission ? | 3 |
    | Step 5 | Stop SCOS Client | 3 |
    | Step 6 | Change MCS Chain ? | 4 |
    | Step 7 | Logout Workstation ? / Change Mission ? | 4 |
    | Step 8 | Workstation Logout | 4 |
    | Step 9 | Change MCS Chain | 4 |
    | Step 10 | Start SCOS Client | 4 |
    | End | End of Procedure | 5 |


## Documents this one references (0)

*This document has no reference list.*

!!! note "Notes"
    Five numbered pages; the extraction reports 6 PDF pages, the last of which is empty. The flowchart on PDF p. 2 is an image with no extractable text. The 'Reference File(s)', command-sequence and referenced-display fields are all empty, and the procedure cites no documents. The source prints workstation account names and passwords (PDF p. 3); do not reproduce them. Companion procedure from the same FOP in the library: c-gsp-mcs-nctrs (Herschel/Planck NCTRS Setup).

