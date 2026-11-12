---
title: "Checking whether SCOS is up to SPEC (certification)"
description: "A three-page ESA Bulletin article (August 2003) by F."
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [esa-bulletin-115-ch8]
---

# Checking Whether SCOS is up to SPEC

<dl class="osi-meta"><dt>Document ID</dt><dd>esa bulletin 115</dd><dt>Date</dt><dd>2003-08</dd><dt>Organisation</dt><dd>European Space Agency, Directorate of Technical and Operational Support (ESTEC and ESOC), with TÜV InterTraffic</dd><dt>Authors</dt><dd>Fernando Aldea, Michael Jones, Eduardo Gomez, Hendrik Schäbe</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Published magazine article (esa bulletin 115, august 2003, printed pages 58-60); running head 'Certification of SCOS-2000'.</dd><dt>Pages</dt><dd>3</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.esa.int/esapub/bulletin/bullet115/chapter8_bul115.pdf" rel="noopener">https://www.esa.int/esapub/bulletin/bullet115/chapter8_bul115.pdf</a></dd><dt>Retrieved via</dt><dd><a href="http://web.archive.org/web/20220419150721id_/https://www.esa.int/esapub/bulletin/bullet115/chapter8_bul115.pdf" rel="noopener">Internet Archive snapshot</a> (the original URL no longer served the file)</dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:10:07Z</dd><dt>SHA-256</dt><dd><code>645d5b0d24c498c1744b1c34961d3d291046dc855c8262735bcdc347ac99566a</code></dd><dt>Size</dt><dd>140.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/esa-bulletin-115-ch8.pdf">esa-bulletin-115-ch8.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A three-page ESA Bulletin article (August 2003) by F. Aldea (ESTEC), M. Jones and E. Gomez (ESOC) and H. Schäbe (TÜV InterTraffic) on the independent evaluation and certification of SCOS-2000 with SPEC (Software Product Evaluation and Certification), a method developed under ESA contract and based on several international standards. SCOS-2000 was the largest product evaluated with SPEC to date.

It explains the SPEC quality model: goal properties (such as functionality) split into second-level properties (completeness, correctness, efficiency), each quantified by metrics measured with defined evaluation methods. The model covers product properties (functionality, reliability, maintainability, re-usability, operability, documentation quality) and process properties (suitability for safety, software development effectiveness, system engineering effectiveness), including space practices from ECSS-E-40 and ECSS-Q-80. A sidebar summarises SCOS-2000: a generic, distributed and scalable mission control system (down to a single-workstation 'SCOS-2000 in-a-box'), with telemetry processing, telecommanding, online database and archive, general services, the Operation Language, roles and privileges, events and actions and on-board software maintenance, configured per mission through its database and configuration files. More than 40 customer licences had been granted.

The Phase I baseline evaluation of version 2.1e found that, of 85 SPEC metrics, 10 were inapplicable, 3 were replaced and 5 of 72 missed their target, so improvement was needed before certification as Class-B (mission-critical) software. Recommendations covered documentation quality, traceability, architecture simplification and coding standards; a Phase II delta evaluation and certification were to follow, and SPEC was also being applied to RTEMS.

It is a short primary source on SCOS-2000's software quality status around 2003.


## Key points

- SCOS-2000, originally operational software for ESA missions, was being promoted as an ESA product and more than 40 customer licences had been granted. *(PDF p. 1)*
- Certification benchmarks the product against an agreed quality model, performed by an independent organisation (TÜV InterTraffic) using the SPEC method. *(PDF p. 1)*
- SPEC goal properties are split into properties quantified by metrics; efficiency, for example, is measured by timing margins, memory margins, throughput and resource utilisation. *(PDF p. 2)*
- SPEC product-related goal properties: functionality, reliability, maintainability, re-usability, operability, documentation quality; process-related: suitability for safety, software development effectiveness, system engineering effectiveness; it covers practices such as those of ECSS-E-40 and ECSS-Q-80. *(PDF p. 2)*
- SCOS-2000 functions listed: TM, TC, online database, online archive, general services and utilities, Operation Language (OL), roles and privileges (USER), events and actions (EVAC) and OBSM; the typical configuration is distributed but can be scaled down to 'SCOS-2000 in-a-box'. *(PDF p. 2)*
- Phase I evaluated baseline version 2.1e; Phase II is a delta evaluation and certification agreed between ESTEC, ESOC and TÜV. *(PDF p. 3)*
- Of the 85 metrics defined by SPEC, 10 were inapplicable, 3 were not measured and were replaced, and 5 out of 72 failed to reach the target value. *(PDF p. 3)*
- SCOS-2000 still needed improvement before it could be certified as Class-B (mission-critical) software. *(PDF p. 3)*
- Phase I was preceded by a Software Criticality Analysis based on a software FMECA, performed by Critical Software (Portugal). *(PDF p. 3)*
- New coding standards were to cover state-of-the-art methods such as Model Driven Architecture and the languages used to develop SCOS-2000, primarily C++ and Java. *(PDF p. 3)*


## Cited by these wiki pages (5)

- [SCOS-2000 architecture](../scos2000/architecture.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [ST[05] Event reporting](../ecss/pus/st05-event-reporting.md)
- [ST[06] Memory management](../ecss/pus/st06-memory-management.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (6 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Introduction | 1 |
    |  | What exactly is SPEC? | 1 |
    |  | What exactly is SCOS-2000? | 2 |
    |  | Evaluating SCOS-2000 with SPEC | 3 |
    |  | The Next Steps | 3 |
    |  | Acknowledgement | 3 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-E-40](../references/index.md#ref-ecss-e-40) | ECSS-E-40 European Standard |  | mentioned |
|  | [ECSS-Q-80](../references/index.md#ref-ecss-q-80) | ECSS-Q-80 European Standard |  | mentioned |

!!! note "Notes"
    Printed pages 58-60 map to PDF pp. 1-3 (PDF p. 4 empty); running header 'JONES2 9/2/03 3:18 PM'. The SPEC quality-model figure and the SCOS-2000 functional diagram survive only as text fragments. 'SCOS-200' is a typo in the acknowledgement. The same authors presented a DASIA 2003 paper on the evaluation, cited as reference [11] in library item arxiv-1001-4730-planck-lfi-tm. No reference list.

