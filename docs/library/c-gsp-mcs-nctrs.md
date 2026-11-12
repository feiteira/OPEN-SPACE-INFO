---
title: "Herschel/Planck FOP procedure: NCTRS setup"
description: "A single ground-segment procedure from the Herschel/Planck Flight Operations Plan (FOP, PT-HMOC-OPS-FOP-6001-OPS-OAH)."
tags: ["Procedure", "Ground stations, NCTRS/NIS and SLE"]
sources: [c-gsp-mcs-nctrs]
---

# Herschel/Planck NCTRS Setup

<dl class="osi-meta"><dt>Document ID</dt><dd>PT-HMOC-OPS-FOP-6001-OPS-OAH (procedure file C_GSP_MCS_NCTRS.xls)</dd><dt>Issue / version</dt><dd>Fop Issue 3.1; procedure Version 1</dd><dt>Date</dt><dd>2011-09-05</dd><dt>Organisation</dt><dd>Herschel/Planck Mission Operations Centre (HMOC), ESA/ESOC (as indicated by the document number; no organisation name is printed)</dd><dt>Authors</dt><dd>F. Keck</dd><dt>Type</dt><dd>Procedure</dd><dt>Status</dt><dd>Printed status 'Version 1 - Updated', created and last checked in 11/08/2011, inside FOP issue 3.1 dated 05/09/11 (PDF p. 1). No other issue is in the library.</dd><dt>Pages</dt><dd>4</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/operations/fop/procedures/C_GSP_MCS_NCTRS.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/operations/fop/procedures/C_GSP_MCS_NCTRS.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:30Z</dd><dt>SHA-256</dt><dd><code>a6e6da6755cb4f6a27f38b7c5699fd3e3742f022d1cf9e56688bdcf19300d67b</code></dd><dt>Size</dt><dd>96.7 KB</dd><dt>Our copy</dt><dd><strong>Not hosted here.</strong> The document prints operational login credentials, so this wiki does not republish it. Read it at its original location.</dd></dl>

## Summary

A single ground-segment procedure from the Herschel/Planck Flight Operations Plan (FOP, PT-HMOC-OPS-FOP-6001-OPS-OAH). It uses the standard FOP layout: a summary sheet, a flowchart page (an image, not extracted) and six numbered steps. It covers starting and stopping the mission-specific instances of the **NCTRS** (Network Control and TM/TC Router System) on the two NCTRS machines of MCS chains A and B. NCTRS is the ESOC gateway between ground stations and the mission control system; see [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md).

The procedure is built around one constraint: only one NCTRS instance per mission may run on each chain, so at most one Herschel and one Planck NCTRS exist on NCTRS-A and NCTRS-B. For the same reason, the NCTRS OVERVIEW task must never be started there, because it would allow an instance to be started on a machine of the other mission. The operator opens a terminal on a DCR client, enables X display forwarding, and connects to the NCTRS host by telnet. The operator then runs the stop command for the mission (repeated, because clean-up is sometimes incomplete), checks the process list, and runs the start command, after which the NCTRS MMI appears on the client. A final step logs in to the NCTRS MMI. Troubleshooting notes cover an instance that is still running and the missing X display permission.

This is a rare public, concrete example of how NCTRS was operated at ESOC for a SCOS-2000 based mission. It gives no protocol or interface detail.


## Key points

- The objective is starting or stopping NCTRS-A and NCTRS-B. The procedure ensures there is only one NCTRS instance per mission, i.e. one Herschel and one Planck NCTRS per MCS chain (A and B). *(PDF p. 1)*
- The NCTRS OVERVIEW task is not started (and is stopped with 'NCTRSstop OVERVIEW') because it would allow another instance to be started on a machine of the other mission. *(PDF p. 3)*
- The operator works from a DCR client terminal, runs 'xhost +' and connects to the NCTRS host by telnet. The NCTRS MMI then appears on the DCR client's display. *(PDF p. 3)*
- The mission instance is stopped with NCTRSstop Herschel or NCTRSstop Planck. The procedure says to run the command three times because clean-up is sometimes incomplete, and to check with 'ps -ef' that no Herschel or Planck tasks remain. *(PDF p. 3)*
- The mission instance is started with NCTRSstart Herschel or NCTRSstart Planck, after which the NCTRS MMI should appear on the DCR client. *(PDF p. 4)*
- Troubleshooting: if NCTRS does not start, it is probably still running and must be stopped first. If it cannot create displays, the 'xhost +' was probably forgotten before the telnet session. *(PDF p. 4)*
- The last step is a login on the NCTRS MMI. The source prints the host and MMI credentials, which are deliberately not reproduced here. *(PDF p. 4)*


## Cited by these wiki pages (4)

- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Methodology](../about/methodology.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (10 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Summary | Procedure Summary (Objectives, Summary of Constraints, Spacecraft Configuration, Reference File(s), Referenced Displays) | 1 |
    | CCI | Configuration Control Information | 1 |
    | Flowchart | Procedure Flowchart Overview | 2 |
    | Step 1 | Open Terminal | 3 |
    | Step 2 | Connect to NCTRS | 3 |
    | Step 3 | Stop NCTRS | 3 |
    | Step 4 | Start NCTRS ? | 3 |
    | Step 5 | Start NCTRS | 3 |
    | Step 6 | NCTRS Login | 4 |
    | End | End of Procedure | 4 |


## Documents this one references (0)

*This document has no reference list.*

!!! note "Notes"
    Four numbered pages; the extraction reports 5 PDF pages, the last of which is empty. The flowchart on PDF p. 2 is an image. The procedure cites no documents, and its reference-file and display fields are empty. The source prints login names and passwords for the NCTRS host and MMI (PDF pp. 3-4); do not reproduce them. Companion procedure from the same FOP in the library: c-gsp-mcs-scos (FOP issue 3.0).

