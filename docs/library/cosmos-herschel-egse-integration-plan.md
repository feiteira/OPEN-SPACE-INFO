---
title: "Herschel EGSE integration plan"
description: "Issue 1 (identical to draft 4) of the plan, dated 6 November 2001 and prepared by Luc Dubbeldam and Erich Wiezorrek, that specifies the activities and responsibilities for integrating the EGSE for Ins"
tags: ["Other", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [cosmos-herschel-egse-integration-plan]
---

# Herschel EGSE integration plan

<dl class="osi-meta"><dt>Document ID</dt><dd>SRON-U/HIFI/PL/2001-1</dd><dt>Issue / version</dt><dd>Issue 1 (= draft 4)</dd><dt>Date</dt><dd>2001-11-06</dd><dt>Organisation</dt><dd>SRON, for the HIFI instrument (per document number); Herschel EGSE working group</dd><dt>Authors</dt><dd>Luc Dubbeldam, Erich Wiezorrek</dd><dt>Type</dt><dd>Other</dd><dt>Status</dt><dd>Issue 1 of 6 November 2001, with no changes with respect to Draft 4 of 1 July 2001 (change record, PDF p. 2). The Checked, Agreed and Authorised fields are blank (PDF p. 1).</dd><dt>Pages</dt><dd>13</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/HERSCHEL+EGSE+INTEGRATION+PLAN" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/HERSCHEL+EGSE+INTEGRATION+PLAN</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:11:39Z</dd><dt>SHA-256</dt><dd><code>be98136d6e30d8c4e257bd7d48bd9182f4937bab56b7af527d07b1e7612db958</code></dd><dt>Size</dt><dd>64.1 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/cosmos-herschel-egse-integration-plan.pdf">cosmos-herschel-egse-integration-plan.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 1 (identical to draft 4) of the plan, dated 6 November 2001 and prepared by Luc Dubbeldam and Erich Wiezorrek, that specifies the activities and responsibilities for integrating the EGSE for Instrument Level Tests (EGSE-ILT) of the three Herschel instruments. It lists the EGSE-ILT building blocks and who delivers each: SCOS-2000 (ESA), the SCOS gateway (ESTeC), the test-equipment interface and the TM-TC router (HIFI), test control (PACS), the CDMS simulator (SPIRE), and OBSM and the MIB editor (ESA). A block diagram shows the instrument, the 1553B CDMS simulator, the router, a test client, the TEI, the EGSE and SCOS gateways, the HCSS, test control, SCOS-2000 and the MIB.

The plan is a sequence of incremental integration tests, each with a configuration figure, the functions to be demonstrated, test prerequisites and numbered steps: the router (TM packets from a test client to SCOS 2000 and TC packets back, plus throughput), the test-equipment interface, the CDMS simulator (routing, its command interface and a time packet protocol still to be confirmed), test control (retrieving housekeeping values from SCOS 2000, uplinking telecommands, test procedures, command mnemonic sequences and autonomy procedures), and the interface between test control and the HCSS. Every SCOS-based test starts by importing or loading a test MIB that describes the TM and TC packets used; the router test also starts ESA's TTA-2000. On-board software maintenance (OBSM) is left as an open item.

It is short, but it shows how SCOS-2000 and its MIB sat at the centre of the Herschel instrument EGSE from 2001. The EGSE version of SCOS-2000 later supplied to the instrument teams is described in the EMCS user manual (library item `emcs-sum-4-0`).


## Key points

- Purpose: specify the activities and responsibilities required for the integration of the EGSE-ILT for the three Herschel instruments. *(PDF p. 3)*
- Deliveries: SCOS-2000 by ESA, SCOS gateway by ESTeC, test-equipment interface and TM-TC router by HIFI, test control by PACS, CDMS-simulator by SPIRE, OBSM and MIB editor by ESA. *(PDF p. 3)*
- Router test: demonstrate routing of TM packets from a test client to SCOS 2000, routing of TC packets from SCOS 2000 to the test client, and throughput; steps include importing the test MIB into SCOS 2000 and starting TTA-2000, the router, the EGSE gateway and the SCOS gateway. *(PDF p. 5)*
- Each test configuration requires a MIB describing the TM and TC packets used. *(PDF p. 5)*
- The TEI is very likely a LabView interface, so a PC running LabView may suffice as test equipment. *(PDF p. 8)*
- CDMS-simulator tests follow RD.1 (section 4.8); handling of the time packet protocol is TBC and how to test it is an open question. *(PDF p. 9)*
- Test-control test: retrieve actual HK parameter values from SCOS 2000, uplink TCs from test control, and exercise test procedures, command mnemonic sequences and autonomy procedures defined in RD.2 sections 3.3.1-3.3.3. *(PDF p. 11)*
- Section 4 (OPEN ITEM: OBSM) has a heading but no content. *(PDF p. 13)*


## Cited by these wiki pages (5)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Missions](../missions/index.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (12 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Title and signature page | 1 |
    |  | Document Change Record and Table of contents | 2 |
    | 1 | INTRODUCTION | 3 |
    | 2 | DOCUMENT REFERENCES | 3 |
    | 2.1 | Reference documents | 3 |
    | 3 | INTEGRATION FLOW | 3 |
    | 3.1 | Test of the Router | 5 |
    | 3.2 | Test of Test-equipment interface | 7 |
    | 3.3 | Test of the CDMS-simulator | 9 |
    | 3.4 | Test of Test-Control | 11 |
    | 3.5 | Test-Control and HCSS | 13 |
    | 4 | OPEN ITEM: OBSM | 13 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| RD.1 | [SRON-U-HIFI-SP-2000-5](../references/index.md#ref-sron-u-hifi-sp-2000-5) | FIRST-PLANCK CDMS interface test-requirements specifications |  | reference |
| RD.2 | [FIRST-SPI-DOC-000127](../references/index.md#ref-first-spi-doc-000127) | EGSE-ILT Users Requirements Document |  | reference |

!!! note "Notes"
    Printed page numbers equal PDF page indexes (13 pages). The configuration figures repeat the same block diagram with the subsystem under test highlighted; only labels survive in the text layer. The plan is listed in library item cosmos-common-egse-document-overview as SRON-U/HIFI/PL/2001-001 (status D4). RD.1 and RD.2 correspond to rows of that overview printed as SRON-U/HIFI/SP/2000-005 and FIRST-SPI-DOC-0000127. 'ESTeC' and 'SCOS-gatway' are as printed.

