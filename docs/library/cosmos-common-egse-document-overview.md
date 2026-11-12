---
title: "Herschel common EGSE document overview"
description: "A one-page table, published on ESA's Cosmos web site, that lists the documents of the common Herschel EGSE effort: the shared electrical ground support equipment for the Herschel instruments' tests."
tags: ["Other", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [cosmos-common-egse-document-overview]
---

# Common EGSE document overview

<dl class="osi-meta"><dt>Organisation</dt><dd>Herschel instrument EGSE working group (document owners listed: HIFI, PACS, SPIRE, ESA); published on ESA's Cosmos web site</dd><dt>Type</dt><dd>Other</dd><dt>Status</dt><dd>Not stated. The 'Status' column gives each listed document's issue or draft (D0.1 to D4, 1, 1.1, 2), apparently as of 2001-2002 (inferred from the document numbers).</dd><dt>Pages</dt><dd>1</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.cosmos.esa.int/documents/12133/1028864/Common_EGSE_document_overview" rel="noopener">https://www.cosmos.esa.int/documents/12133/1028864/Common_EGSE_document_overview</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:11:38Z</dd><dt>SHA-256</dt><dd><code>aa4e85d741f0fe07d923558b9029f46bef2dc13515591d2d98e11ce6deefa1a3</code></dd><dt>Size</dt><dd>12.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/cosmos-common-egse-document-overview.pdf">cosmos-common-egse-document-overview.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A one-page table, published on ESA's Cosmos web site, that lists the documents of the common Herschel EGSE effort: the shared electrical ground support equipment for the Herschel instruments' tests. The page carries no title, date or author; the title used here comes from the file name, and the PDF metadata name Luc Dubbeldam as author of a file converted from an Excel sheet in November 2014.

Each row gives a category (EGSE, CDMS simulator, router, test-equipment interface (TEI), test control, MIB, on-board software maintenance facility), a document type (terms of reference, URD, plan, specification, SSD, SOW, ICD, SUM, report), the title, the document identifier, an issue or draft status and the responsible party (HIFI, PACS, SPIRE or ESA). Nineteen documents are listed, twelve of them under HIFI. They include the Herschel EGSE integration plan, the EGSE-ILT user requirements document, the real-time analysis URD, the CDMS simulator requirements and interface test specification, the router SOW and packet router ICD, ESA's EGSE Gateway ICD, the TEI specification, SOW and URD, the test-control SOW, the TTA-2000 test-technology SUM, the MIB-editor requirements and evaluation report, and the on-board software maintenance facility URD.

For this wiki it is a map of the early Herschel instrument EGSE document tree, useful to trace documents cited elsewhere: the integration plan (library item `cosmos-herschel-egse-integration-plan`), its reference documents, and the EGSE Gateway ICD that the EMCS user manual (`emcs-sum-4-0`) lists as applicable document [A1].


## Key points

- 19 documents are listed in 7 categories: EGSE (5), CDMSsim (3), Router (3), TEI (3), Test control (2), MIB (2) and OBSMF (1). *(PDF p. 1)*
- HIFI is responsible for 12 of the 19 documents, PACS for 2, SPIRE for 1 and ESA for 2; two rows name no owner. *(PDF p. 1)*
- The MIB category contains the MIB-editor requirements (SRON-U/HIFI/SP/2000-002) and the MIB-editor evaluation report (SRON-U/HIFI/RP/2001-001, status 2). *(PDF p. 1)*
- ESA supplies the EGSEGateway ICD (TOS-GCE/98.015/PSH) and the test technology activities TTA-2000 SUM (SCO-TTA-SUM-0001). *(PDF p. 1)*
- Three documents have no identifier ('none'): the EGSE working group terms of reference, the CDMS simulator software specification and the on-board SW maintenance facility URD. *(PDF p. 1)*


## Cited by these wiki pages (3)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (1 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Document table (columns: Category, Type, title, Doc ID, Status, responsible party) | 1 |


## Documents this one references (19)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| EGSE TOR [PACS] | [catalogue](../references/index.md#ref-herschel-egse-working-group-terms-of-reference) | Herschel EGSE working group Terms of reference | D4 | reference |
| EGSE URD [SPIRE] | [FIRST-SPI-DOC-0000127](../references/index.md#ref-first-spi-doc-0000127) | EGSE-ILT URD |  | reference |
| EGSE Plan [HIFI] | [SRON-U/HIFI/PL/2001-001](../references/index.md#ref-sron-u-hifi-pl-2001-001) | Herschel EGSE integration plan | D4 | reference |
| EGSE URD [HIFI] | [HICC-2000-011](../references/index.md#ref-hicc-2000-011) | Real Time analysis URD | D2 | reference |
| EGSE URD [HIFI] | [SRON-U/HIFI/TN/2000](../references/index.md#ref-sron-u-hifi-tn-2000) | EGSE Interface unit, functional description | 1 | reference |
| CDMSsim URD [HIFI] | [SRON-U/HIFI/SP/2000-004](../references/index.md#ref-sron-u-hifi-sp-2000-004) | FIRST-Planck CDMS simulator requirements | 1.1 | reference |
| CDMSsim Spec [HIFI] | [SRON-U/HIFI/SP/2000-005](../references/index.md#ref-sron-u-hifi-sp-2000-005) | CDMS interface test requirements specifications | 1 | reference |
| CDMSsim SSD | [catalogue](../references/index.md#ref-cdms-simulator-software-specification) | CDMS simulator software specification | D2 | reference |
| Router SOW [HIFI] | [SRON-U/HIFI/SP/2001-005](../references/index.md#ref-sron-u-hifi-sp-2001-005) | Herschel EGSE Router SOW | D1 | reference |
| Router ICD [HIFI] | [SRON-G/2001](../references/index.md#ref-sron-g-2001) | Herschel EGSE packet router ICD | 1 | reference |
| Router ICD [ESA] | [TOS-GCE/98.015/PSH](../references/index.md#ref-tos-gce-98-015-psh) | EGSEGateway ICD |  | reference |
| TEI Spec [HIFI] | [SRON-G/EGSE/SP/2001-001](../references/index.md#ref-sron-g-egse-sp-2001-001) | TEI specification | D0.1 | reference |
| TEI SOW | [SRON-U/HIFI/SP/2001-008](../references/index.md#ref-sron-u-hifi-sp-2001-008) | Test equipment interface SOW | D1.2 | reference |
| TEI URD [HIFI] | [SRON-U/HIFI/SP/2001-009](../references/index.md#ref-sron-u-hifi-sp-2001-009) | Test equipment interface URD | D3 | reference |
| Test control SOW [PACS] | [PACS-ME-SW-001](../references/index.md#ref-pacs-me-sw-001) | EGSE test-control SOW | D2 | reference |
| Test control SUM [ESA] | [SCO-TTA-SUM-0001](../references/index.md#ref-sco-tta-sum-0001) | Test technology activities TTA-2000 |  | reference |
| MIB URD [HIFI] | [SRON-U/HIFI/SP/2000-002](../references/index.md#ref-sron-u-hifi-sp-2000-002) | MIB-editor requirements |  | reference |
| MIB Rep [HIFI] | [SRON-U/HIFI/RP/2001-001](../references/index.md#ref-sron-u-hifi-rp-2001-001) | MIB-editor evaluation report | 2 | reference |
| OBSMF URD [HIFI] | [catalogue](../references/index.md#ref-on-board-sw-maintenance-facility-urd) | On-Board SW maintenance facility URD | D1 | reference |

!!! note "Notes"
    Single landscape page exported from Excel (PDF metadata: author Luc Dubbeldam, created 2014-11-11); the title is taken from the file name in the source URL, as none is printed. In 'references', the label combines category and type with the responsible party in brackets, and 'issue' holds the Status column. Cross-check with other library items: the integration plan is printed there as SRON-U/HIFI/PL/2001-1 (here SRON-U/HIFI/PL/2001-001); the EGSE-ILT URD is printed there as FIRST-SPI-DOC-000127 (here FIRST-SPI-DOC-0000127); the EGSE Gateway ICD appears in the EMCS user manual as ESTEC/TOS-EMG/98.015/PSH (here TOS-GCE/98.015/PSH).

