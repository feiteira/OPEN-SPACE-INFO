---
title: "ECSS-E-ST-70-41C status (ADCSS 2015)"
description: "A 35-slide talk by Serge Valera (ESA ESTEC/TEC-SWM, convenor of the PUS-C working group) at ADCSS-2015, reporting the status of ECSS-E-ST-70-41C (PUS-C) shortly before its final draft."
tags: ["Presentation", "ECSS standards"]
sources: [valera-2015-adcss-ecss-e-st-70-41c-status]
---

# Telemetry and Telecommand Packet Utilization
The ECSS-E-ST-70-41

<dl class="osi-meta"><dt>Date</dt><dd>2015-10-22</dd><dt>Organisation</dt><dd>ESA ESTEC/TEC-SWM (presented at the Avionics Data, Control and Software Systems workshop, ADCSS-2015)</dd><dt>Authors</dt><dd>Serge Valera</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Status of the PUS-C draft in October 2015, after the 2014 public review and before the final draft was delivered to ECSS (planned for 12/2015, slide 2). The final standard was published on 15 April 2016 (library item ecss-e-st-70-41c-15april2016).</dd><dt>Pages</dt><dd>35</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/85/contributions/3351/attachments/2713/3137/1225-ADCSS_2015_-_ECSS-E-ST-70-41C_status_-_S._Valera_-_Issue_1.pdf" rel="noopener">https://indico.esa.int/event/85/contributions/3351/attachments/2713/3137/1225-ADCSS_2015_-_ECSS-E-ST-70-41C_status_-_S._Valera_-_Issue_1.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T14:11:18Z</dd><dt>SHA-256</dt><dd><code>da32d8016a2da3518cce3bf4cd3be637939d8f166117c652a4579e0e6480e758</code></dd><dt>Size</dt><dd>2.2 MB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/valera-2015-ADCSS-ECSS-E-ST-70-41C-status.pdf">valera-2015-ADCSS-ECSS-E-ST-70-41C-status.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 35-slide talk by Serge Valera (ESA ESTEC/TEC-SWM, convenor of the PUS-C working group) at **ADCSS-2015**, reporting the status of **ECSS-E-ST-70-41C (PUS-C)** shortly before its final draft. The timeline runs from 190 change requests in 01/2011, through over 600 discrepancy reports from the four-month public review of draft DIR1 in 12/2014, to delivery of the final draft to ECSS planned for 12/2015.

The slides set out:

* the document structure: foundation model, service type system requirements, space/ground interface and service type interface requirements, Annexes A-D, with about 150 generic, 2300 system, 750 interface and 500 tailoring requirements;
* what differs from PUS-A;
* the standardized service types ST 1-23, with per-service highlights. ST2 gains register acquisition and low-level commands; ST3 gains functional reporting configuration; ST6 has four subservices; ST11 is re-assessed into ST11, ST21 and ST22; ST13 becomes a simplified large packet transfer for packets up to 65 KB without retransmission; ST20 defines parameters by memory address plus PTC/PFC; ST23 has file handling and remote file copy, e.g. over CFDP;
* the public review statistics per service, and the main review outcomes.

The second half explains *why* PUS-C is built on a formal **PUS Foundation Model**. It uses fact-based modelling (ORM/NORMA) to remove ambiguity and ease tailoring, with an example rule: standard service type IDs are 1-127 and mission-specific IDs 128-255. It also shows ASN.1/ACN code generation (ASN1SCC, TASTE, PROBA-3 ASPIICS), an ESA TRP invitation to tender for PUS-C tooling, and the PUS-FDB prototype database that generated parts of clauses 6 and 8 and Annex D.


## Key points

- Timeline: 01/2011 190 change requests; 12/2014 620 discrepancy reports from the 4-month public review of ECSS-E-ST-70-41C DIR1; 12/2015 final draft delivery to ECSS. *(PDF p. 2)*
- Approximate requirement counts: clause 5 (generic) 150, clause 6 (system) 2300, clauses 7 and 8 (interface) 750, tailoring 500. *(PDF p. 3)*
- PUS-C standardized service types: 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23. *(PDF p. 5)*
- ST2 device access adds register contents acquisition, CPDU commands distributed by on-board software, and physical/logical low-level commands. *(PDF p. 6)*
- ST3 adds a 'functional parameter reporting configuration' subservice to operate on sets of HK or diagnostic packets with fewer requests. *(PDF p. 7)*
- ST6 defines four subservices: raw data memory management, structured data memory management, common memory management and memory configuration (e.g. scrubbing, write protection). *(PDF p. 8)*
- PUS-A time-based scheduling was re-assessed into three service types: ST11 time-based scheduling (with sub-schedules and groups), ST21 telecommand sequencing and ST22 orbit/position-based scheduling. *(PDF p. 9)*
- ST13 large packet transfer simplifies PUS-A large data transfer to uploading and downloading CCSDS packets of at most 65 KB, with no retransmission. *(PDF p. 10)*
- In ST20 a parameter is defined by its mapped on-board memory address, its PTC and its PFC. *(PDF p. 11)*
- ST23 supports flat and structured (directory) file systems, with a file handling subservice and a remote file copy subservice that interfaces to a file transfer layer such as CCSDS CFDP. *(PDF p. 14)*
- Public review totals: 464 reports by agencies, 156 by industry and 44 by the WG (664), of which 72 major, 413 minor and 179 editorial; 623 disposed and 41 open in October 2015. The foundation model (72) and ST12 (58) drew the most. *(PDF p. 15)*
- Review outcomes included CRC as an alternative to the ISO checksum, checksums longer than 16 bits, state machines and sequence diagrams, and a complete remodelling of real-time forwarding control. PUS-C mainly addresses on-board capabilities and assumes generic ground segments implement all standardized capabilities. *(PDF p. 17)*
- PUS-C was drafted with fact-based modelling (ORM) to remove PUS-A ambiguities, ensure consistency, ease tailoring and enable automatic generation of software and documentation. *(PDF p. 20)*
- Service type identifiers are unsigned integers 1-255: standard service types use 1-127 and mission-specific service types 128-255. *(PDF p. 22)*
- ESA uses ASN.1/ACN with the ASN1SCC compiler to generate PUS packet encoders and decoders, e.g. for the PROBA-3 ASPIICS payload and the TASTE toolkit. *(PDF p. 26)*
- ESA ITT 15.132.06 (TRP, open competition, publication foreseen December 2015) covers deploying PUS-C in projects with an automatic generation toolset. *(PDF p. 28)*
- The PUS-FDB prototype (conceptual model from clause 5, transformed by NORMA into a relational Oracle SQL model) was used to generate the message-type sub-clauses of clauses 6 and 8 and Annex D. *(PDF p. 32)*


## Cited by these wiki pages (16)

- [ECSS: the European space standards system](../ecss/index.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [ST[04] Parameter statistics reporting](../ecss/pus/st04-parameter-statistics.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [ST[11] Time-based scheduling](../ecss/pus/st11-time-based-scheduling.md)
- [ST[13] Large packet transfer](../ecss/pus/st13-large-packet-transfer.md)
- [ST[14] Real-time forwarding control](../ecss/pus/st14-real-time-forwarding-control.md)
- [ST[15] On-board storage and retrieval](../ecss/pus/st15-onboard-storage-retrieval.md)
- [ST[17] Test](../ecss/pus/st17-test.md)
- [ST[18] On-board operations procedure](../ecss/pus/st18-onboard-operations-procedure.md)
- [ST[20] On-board parameter management](../ecss/pus/st20-onboard-parameter-management.md)
- [ST[21] Request sequencing](../ecss/pus/st21-request-sequencing.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (29 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Slide 1 | Telemetry and Telecommand Packet Utilization - The ECSS-E-ST-70-41 (title) | 1 |
    | Slide 2 | ECSS-E-ST-70-41C WG – Main Purpose | 2 |
    | Slide 3 | PUS C – A new document structure | 3 |
    | Slide 4 | PUS-C versus PUS-A | 4 |
    | Slide 5 | PUS- C standardized Service Types | 5 |
    | Slide 6 | ST2 – Device access | 6 |
    | Slide 7 | ST3 – Housekeeping | 7 |
    | Slide 8 | ST6 – memory management | 8 |
    | Slide 9 | ST11 – time-based scheduling | 9 |
    | Slide 10 | ST13 – large packet transfer | 10 |
    | Slide 11 | ST20 – parameter management | 11 |
    | Slide 12 | ST21 – telecommand sequencing | 12 |
    | Slide 13 | ST22 – position-based scheduling | 13 |
    | Slide 14 | ST23 – file management | 14 |
    | Slide 15 | 2015 – Processing public review output | 15 |
    | Slides 16-17 | 2014 Public Review main outputs | 16 |
    | Slide 18 | ECSS-E-ST-70-41C WG Members | 18 |
    | Slide 19 | WHY introducing the concept of a PUS Foundation Model | 19 |
    | Slide 20 | The PUS-C Standard | 20 |
    | Slide 21 | PUS Foundation Model - Requirement View | 21 |
    | Slides 22-24 | PUS Foundation Model – FBM View | 22 |
    | Slide 25 | PUS tailored for a mission | 25 |
    | Slide 26 | Using ASN.1 to automate SW production | 26 |
    | Slide 27 | ASN.1 & ACN data model generator | 27 |
    | Slide 28 | Using the PUS Foundation Model in support to PUS compliant Missions | 28 |
    | Slide 29 | The PUS Foundation Model in use… | 29 |
    | Slides 30-33 | The PUS-FDB proto | 30 |
    | Slide 34 | Any questions? | 34 |
    | Slide 35 | see also | 35 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | Telemetry and Telecommand Packet Utilization (PUS-C) | DIR1 (public review draft) | mentioned |
|  | [catalogue](../references/index.md#ref-pus-a) | PUS-A |  | mentioned |
|  | [E-70-01](../references/index.md#ref-e-70-01) | ECSS-E-ST-70-01 (OBCP steps) |  | mentioned |
|  | [E-70-11](../references/index.md#ref-e-70-11) | ECSS-E-ST-70-11 |  | mentioned |
|  | [E-70-31](../references/index.md#ref-e-70-31) | ECSS-E-ST-70-31 |  | mentioned |
|  | [catalogue](../references/index.md#ref-ccsds-cfdp-protocol) | CCSDS CFDP protocol |  | mentioned |
|  | [ITT 15.132.06](../references/index.md#ref-itt-15-132-06) | ESA Intended Invitation to Tender: deployment of PUS-C standard in projects supported by an automatic generation toolset | December 2015 (foreseen) | mentioned |
|  | [catalogue](../references/index.md#ref-http-www-factbasedmodeling-org) | http://www.factbasedmodeling.org |  | mentioned |
|  | [catalogue](../references/index.md#ref-http-www-orm-net) | http://www.orm.net |  | mentioned |
|  | [catalogue](../references/index.md#ref-http-www-ormfoundation-org) | http://www.ormfoundation.org |  | mentioned |
|  | [catalogue](../references/index.md#ref-https-en-wikipedia-org-wiki-abstract-syntax-notation-one) | https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One |  | mentioned |
|  | [catalogue](../references/index.md#ref-https-github-com-ttsiodras-asn1scc) | https://github.com/ttsiodras/asn1scc |  | mentioned |

!!! note "Notes"
    There is no document number or issue on the slides, although the source file name says 'Issue 1'. The title slide is dated 22 October 2015 but every footer reads 20/10/2015. Figures differ between slides: slide 2 gives 620 'Discrepancy Document Reports (DDR)', while slide 15 counts 664 'DRR' including 44 from the WG in 2015. ST21 is called 'telecommand sequencing' on slides 5 and 12 but 'request sequencing' on slides 15 and 23 (the published name is ST[21] request sequencing). ST22 is called 'orbit-based' on slide 9 and 'position-based' elsewhere. Slides 21, 24, 27, 29 and 33 are image-only, with no extractable content. PDF page 36 is blank, so srcgrep shows 36 pages while the registry gives 35. The ADCSS 2015 Indico page is the source. This talk is a later status than the 2014 SAVOIR talk by the same author (valera-2014-ecss-e-st-70-41c-status).

