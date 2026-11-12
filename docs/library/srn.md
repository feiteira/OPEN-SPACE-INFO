---
title: "EDDS Software Release Note (v2.3.0)"
description: "This Software Release Note (SRN) accompanies delivery EDDS-R2.3.0i1 of the EGOS Data Dissemination System(../scos2000/edds.md), ESOC's service for giving external users access to telemetry, telecomman"
tags: ["Technical Note", "EDDS (EGOS Data Dissemination System)"]
sources: [srn]
---

# Software Release Note — EGOS Data Dissemination System (EDDS)

<dl class="osi-meta"><dt>Document ID</dt><dd>EGOS-GEN-EDDS-SRN-1001</dd><dt>Issue / version</dt><dd>Version 14.0</dd><dt>Date</dt><dd>2018-02-16</dd><dt>Organisation</dt><dd>European Space Agency, OPS-GI (ESOC); prepared by the EDDS Team</dd><dt>Authors</dt><dd>Rokibul Uddin, Delphine Thomas, Rui Santos, Michael Hawkshaw, Rauno Ots, Kamill Panitzek</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>Issue 14.0 'Update for EDDS v2.3.0i1' (Document Change Log, PDF p. 3). It describes delivery EDDS-R2.3.0i1 only; later EDDS releases (v2.4.0 to v3.6.1, per the 2025 CIG change log) have their own release notes, which are not in the library.</dd><dt>Pages</dt><dd>13</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SRN.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/docs/EGOS-GEN-EDDS-SRN.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:10:20Z</dd><dt>SHA-256</dt><dd><code>b419ea51f6d748a757541b0f19a8d31b95e5e95cee3e763d13d754daa0af4f50</code></dd><dt>Size</dt><dd>383.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/edds/SRN.pdf">SRN.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

This **Software Release Note (SRN)** accompanies delivery EDDS-R2.3.0i1 of the [EGOS Data Dissemination System](../scos2000/edds.md), ESOC's service for giving external users access to telemetry, telecommand and event packets, parameters and reports from the [SCOS-2000](../scos2000/index.md) mission control system and its archives.

It records what was delivered and what it depends on. Section 2.2 lists the systems the release was verified against: SCOS 6.0.1 with its integrated packet archive (PARC), the DARC data archive 3.0.0, the FARC file archive 3.1.0, the EGOS User Desktop (EUD) 3.1.8 on which the EDDS MMI is built, and the ESOC SLES 12 platform baseline. Section 2.3 describes a known limitation in the file-system view when thousands of files are handled at once (ticket EDDS-938). Section 2.4 tabulates 43 problem reports and change requests fixed in v2.3.0; several concern packet decoding, for example command-parameter decoding for SCOS-2000 6.2.0 and later, TM header decoding for non-standard headers, a request for pure spacecraft packets, and a packet TM stream client.

Sections 2.5 and 2.6 give the inventory of the three delivery CDs and the issue of every EDDS document in the baseline (CIG, glossary, EUICD, SDD, SRS, SUM, upgrade guide and five technical notes). Section 2.9 lists requirements de-scoped in earlier releases, for example duplicate-packet filtering by APID with SSC, SCET or OBT, calibration choices, RDM media production, and several SMF-based report filters. Use it to date a given EDDS document set and to see which SCOS-2000 and archive versions it matches.


## Key points

- The release described is EDDS v2.3.0 (delivery EDDS-R2.3.0i1), organised on three CDs (documentation, COTS and source code). *(PDF p. 5)*
- EDDS interfaces with the DARC, FARC and PARC systems, and its MMI is based on the EGOS EUD software. *(PDF p. 7)*
- Verified against SCOS 6.0.1 (PARC integrated with 6.0), DARC 3.0.0, FARC 3.1.0, EUD 3.1.8 and SLES 12 platform baseline SLES12-064-ESOCL01-I1R0; EDDS needs the DARC-dataprovision-3.0.0.jar library even with older DARC versions. *(PDF p. 7)*
- Known limitation EDDS-938: processing a large number of files together (for example erasing thousands) causes a file-system error attributed to LDAP connections that Tomcat fails to handle. *(PDF p. 7)*
- Fixes in v2.3.0 include EDDS-970 'Decode of command parameters fail for S2K 6.2.0+', EDDS-979 'Incorrect decoding of TM header when it's not the vanilla one' and EDDS-934 'EDDS Packet TM stream client'. *(PDF p. 7)*
- Further changes include EDDS-958 'Request to provide pure spacecraft packet', EDDS-966 on BIT parameters in Protobuf response files and EDDS-935 on request status when an SPID is not in pid.dat. *(PDF p. 8)*
- The baseline document set at this release: CIG i14r0, Glossary i7r0, EUICD i15r0, SDD i13r0, SRN i14r0, SRS i18r0, SUM i14r0, EDDS Upgrade Guide i12r0, plus FAT report, SVTD and technical notes TN-1001 to TN-1006. *(PDF p. 9)*
- De-scoped requirement EDDS-SR-07690 would have let a mission choose the duplicate-packet key (APID and SSC, APID and SCET, or APID and OBT). *(PDF p. 10)*
- De-scoped requirements on calibration (EDDS-SR-00720, -05550) note that data retrieved from the DARC are processed as received, with no calibration required or possible. *(PDF p. 10)*
- RDM (Raw Data Media) delivery requirements for TM, TC and EV packets, MCS reports, archived files and TM parameters were de-scoped. *(PDF p. 11)*


## Cited by these wiki pages (4)

- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (23 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 5 |
    | 1.1 | Purpose | 5 |
    | 1.2 | Scope | 5 |
    | 1.3 | Glossary | 5 |
    | 1.3.1 | Acronyms | 5 |
    | 1.3.2 | Definition of Terms | 6 |
    | 1.4 | References | 6 |
    | 1.4.1 | Applicable documents | 6 |
    | 1.4.2 | Reference documents | 6 |
    | 1.5 | Document Overview | 6 |
    | 2 | Software Release Information | 7 |
    | 2.1 | Upgrade Notes | 7 |
    | 2.2 | Software Dependencies | 7 |
    | 2.3 | Known Limitations | 7 |
    | 2.4 | Delivered SPRs/SCRs/DCRs | 7 |
    | 2.4.1 | SPRs/SCRs/DCRs for 2.3.0 | 7 |
    | 2.5 | Inventory of Software Contents | 8 |
    | 2.6 | Software Baseline Description | 8 |
    | 2.6.1 | Software Documentation | 9 |
    | 2.7 | Software Test Report | 9 |
    | 2.8 | Delivery Information | 10 |
    | 2.9 | Historical Information | 10 |
    | 2.9.1 | De-Scoped Requirements | 10 |


## Documents this one references (20)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD-1 | [EGOS-GEN-GEN-CMP-1001](../references/index.md#ref-egos-gen-gen-cmp-1001) | EGOS-GEN-GEN-CMP-1001 | v1.2 2009-09-11 | applicable |
| RD-1 | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | EDDS Configuration and Installation Guide | Issue 14.0 2018-02-16 | reference |
| RD-2 | [SLES12-064-ESOCL01-i1r0](../references/index.md#ref-sles12-064-esocl01) | ESOC Generic Ground Systems: System Configuration Baselines: Part 3- Baseline Definitions | Version 1.0 | reference |
| RD-3 | [EGOS-GEN-EDDS-EUG-1001](../references/index.md#ref-egos-gen-edds-eug-1001) · [library](eug.md) | EDDS Upgrade Guide | Issue 12.0 2018-02-16 | reference |
|  | [EGOS-GEN-EDDS-CIG-1001](../references/index.md#ref-egos-gen-edds-cig-1001) · [library](cig-v24.md), [library](cig-i14r0.md) | Configuration and Installation Guide | I14r0 2018-02-16 | mentioned |
|  | [EGOS-GEN-EDDS-FAT-1001](../references/index.md#ref-egos-gen-edds-fat-1001) | Factory Acceptance Test Report | i2r3 2013-03-21 | mentioned |
|  | [EGOS-GEN-EDDS-GLO-0001](../references/index.md#ref-egos-gen-edds-glo-0001) · [library](glo.md) | Glossary | I7r0 2017-05-05 | mentioned |
|  | [EGOS-GEN-EDDS-ICD-1001_EUICD](../references/index.md#ref-egos-gen-edds-icd-1001-euicd) | EDDS Interface Control Document | I15r0 2018-02-16 | mentioned |
|  | [EGOS-GEN-EDDS-SDD-1001](../references/index.md#ref-egos-gen-edds-sdd-1001) · [library](sdd.md), [library](sdd-v24.md) | System Design Document | I13r0 2017-05-05 | mentioned |
|  | [EGOS-GEN-EDDS-SRN-1001](../references/index.md#ref-egos-gen-edds-srn-1001) ·  | Software Release Notes | I14r0 2018-02-16 | mentioned |
|  | [EGOS-GEN-EDDS-SRS-1001](../references/index.md#ref-egos-gen-edds-srs-1001) · [library](srs.md) | System Requirements Specification | i18r0 2018-02-16 | mentioned |
|  | [EGOS-GEN-EDDS-SUM-1001](../references/index.md#ref-egos-gen-edds-sum-1001) · [library](sum.md), [library](sum-v22.md) | Software User Manual | I14r0 2018-02-16 | mentioned |
|  | [EGOS-GEN-EDDS-EUG-1001](../references/index.md#ref-egos-gen-edds-eug-1001) · [library](eug.md) | EDDS Upgrade Guide | I12r0 2018-02-16 | mentioned |
|  | [EGOS-GEN-EDDS-SVTD-1001](../references/index.md#ref-egos-gen-edds-svtd-1001) | Software Validation Test Document | i1r0 2010-10-11 | mentioned |
|  | [EGOS-GEN-EDDS-TN-1001](../references/index.md#ref-egos-gen-edds-tn-1001) | EDDS LDAP Configuration Technical Note | i1r0 2010-10-11 | mentioned |
|  | [EGOS-GEN-EDDS-TN-1002](../references/index.md#ref-egos-gen-edds-tn-1002) | EDDS MCS Report Technical Note | i1r0 2010-10-11 | mentioned |
|  | [EGOS-GEN-EDDS-TN-1003](../references/index.md#ref-egos-gen-edds-tn-1003) | EDDS XFDU Packet Formatting Technical Note | i1r0 2010-10-11 | mentioned |
|  | [EGOS-GEN-EDDS-TN-1004](../references/index.md#ref-egos-gen-edds-tn-1004) | EDDS Streaming Technical Note | i1r0 2011-09-12 | mentioned |
|  | [EGOS-GEN-EDDS-TN-1005](../references/index.md#ref-egos-gen-edds-tn-1005) | EDDS Security Technical Note | i1r0 2011-09-12 | mentioned |
|  | [EGOS-GEN-EDDS-TN-1006](../references/index.md#ref-egos-gen-edds-tn-1006) | EDDS Central LDAP Technical Note | i1r0 2014-05-13 | mentioned |

!!! note "Notes"
    The title page and approval table print 'Software Release Note' in the Reference field instead of a document number; the number EGOS-GEN-EDDS-SRN-1001 is taken from the document's own software documentation table (PDF p. 9). The change log dates issue 14.0 as 2017-02-16, which conflicts with the 2018-02-16 date on the title page and footers (apparent typo). Section 2.3 heading is duplicated ('2.3' printed alone on PDF p. 7), as is '2.5'. Issue 9.0, 11.0 and 13.0 are absent from the change log. Mentioned documents in the 2.6.1 table are recorded with kind 'mentioned'. This SRN matches the 2018 document set of library items cig-i14r0, eug and euicd-i15r0.

