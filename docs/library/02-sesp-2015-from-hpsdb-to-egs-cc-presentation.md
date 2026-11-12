---
title: "SRDB: from Herschel/Planck HPSDB to EGS-CC (SESP 2015)"
description: "A 16-slide Thales Alenia Space presentation on the lineage of its industrial system reference database."
tags: ["Presentation", "MIB / Database Import ICD"]
sources: [02-sesp-2015-from-hpsdb-to-egs-cc-presentation]
---

# System Reference Data Base: From H/P to EGS-CC

<dl class="osi-meta"><dt>Document ID</dt><dd>83230919-DOC-TAS-FR-003</dd><dt>Date</dt><dd>2015-03</dd><dt>Organisation</dt><dd>Thales Alenia Space</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Slides for SESP 2015 (Workshop on Simulation and EGSE for Space Programmes), dated 24-26/03/2015 on every slide. No issue number is printed.</dd><dt>Pages</dt><dd>16</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/93/contributions/3555/attachments/2828/3285/02.SESP_2015-From_HPSDB_to_EGS-CC_Presentation.pdf" rel="noopener">https://indico.esa.int/event/93/contributions/3555/attachments/2828/3285/02.SESP_2015-From_HPSDB_to_EGS-CC_Presentation.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:15Z</dd><dt>SHA-256</dt><dd><code>863636f8f3040e4cba98de2c7f9be7525fefa106ac14c54c8350ab2be722d765</code></dd><dt>Size</dt><dd>370.8 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/02.SESP_2015-From_HPSDB_to_EGS-CC_Presentation.pdf">02.SESP_2015-From_HPSDB_to_EGS-CC_Presentation.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 16-slide Thales Alenia Space presentation on the lineage of its industrial system reference database. HPSDB (Herschel/Planck System Data Base) became SRDB for Meteosat Third Generation (MTG), and the slides look ahead to adapting SRDB to EGS-CC based systems. HPSDB was specified around two ESA requirements: 'commonality' between the two spacecraft and between database users, met by physical instantiation and category flags, and 'smooth transition' of validated data from AIT to operations, met by logical instantiation and category flags.

Most slides explain the data model with a reaction-wheel example. Objects (equipment, subsystem, model) contain items (TM packets, TM parameters, curves, synthetic parameters, groups, constants), and identifiers are built from a core part (Axxx packets, Cxxxx curves, Dxxx synthetics, Gxxx groups, Kxxx constants, Mxxx TM parameters) prefixed by a position code such as A101. Category flags (AIT, OPS, SW) give each user a consistent view of an object. Physical instantiation separates the 'defined' from the 'realized' part, for example a serial-numbered unit with modified curves. Logical instantiation attaches lower-level objects at positions inside higher-level objects. Further slides cover generic objects, working, reference and archive areas with check-out and check-in, object versioning by environment counter or label, a configurable number of levels, resource parameters that make one parameter's validity depend on another's state, groups, and full versus flat XML export views.

The mapping slide and the conclusion state that the SRDB high-level model should map onto the EGS-CC product structure, while the low-level items and pseudo-items still need conversion algorithms. For an engineer, it explains the identifier scheme seen in Herschel/Planck MIB exports.


## Key points

- HPSDB was specified for two ESA requirements: 'commonality' (between the two spacecraft and between database users), achieved via physical instantiation and category flags, and 'smooth transition' (re-use of validated data up to operations), achieved via logical instantiation and category flags. *(PDF p. 2)*
- SRDB is an adaptation of HPSDB for MTG; the one major concept change is the ability to attach a former version of an object, whereas HPSDB can attach only the most recent version. *(PDF p. 2)*
- Item core identifiers: Axxx TM packet, Cxxxx curve, Dxxx synthetic parameter, Gxxx group, Kxxx constant, Mxxx TM parameter; an instantiation part such as a position code (A101) is prefixed, giving identifiers like A101M001. *(PDF p. 3)*
- Category flags (for example AIT, OPS, SW) select per-user views of an object, with the main constraint that every object view is consistent. *(PDF p. 4)*
- Physical instantiation distinguishes the defined part (object type) from realized parts (serial-numbered units) that may physically delete, modify or add items such as a unit-specific curve. *(PDF p. 5)*
- Logical instantiation attaches lower-level objects at positions (for example two reaction wheels at A101 and A102, a gyro at A200) and lets the higher-level object add synthetic parameters such as D001 = A101M002 + A102M002 in a pseudo-position (AZZZ). *(PDF p. 6)*
- Data live in a working area, a reference area and an archive area, with check-out, modification, check-in and archive steps. *(PDF p. 9)*
- A 'resource' parameter lets a parameter's validity depend on another parameter's state, for example A101M001 valid only if the PCDU relay status A200M001 is 'closed' in the exported operations files. *(PDF p. 12)*
- The SRDB high-level data model is expected to map to the EGS-CC product structure package; the low-level items and pseudo-items need conversion algorithms to EGS-CC aspects. *(PDF p. 13)*
- SRDB exports full XML views (generic, element and subsystem objects with attachment lists) and flat XML views (fully instantiated identifiers per object). *(PDF p. 15)*
- Conclusion: the Herschel/Planck experience validated the HPSDB concept; MTG integrated that feedback plus new requirements (resource, owner flag, list of aliases); EGS-CC compatibility was still to be implemented. *(PDF p. 16)*


## Cited by these wiki pages (6)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (16 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | System Reference Data Base - From H/P to EGS-CC (title) | 1 |
    | 2 | Introduction | 2 |
    | 3 | Rules (to understand the next viewgraphs) | 3 |
    | 4 | Definitions: Object / item / pseudo-item | 4 |
    | 5 | Physical instantiation | 5 |
    | 6 | Logical instantiation | 6 |
    | 7 | Physical and Logical instantiations | 7 |
    | 8 | Generic object | 8 |
    | 9 | Areas | 9 |
    | 10 | Object versionning | 10 |
    | 11 | Configurable number of levels | 11 |
    | 12 | Resource | 12 |
    | 13 | EGS-CC mapping | 13 |
    | 14 | Groups | 14 |
    | 15 | Full and flat XML views | 15 |
    | 16 | Conclusion | 16 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [HPSDB](../references/index.md#ref-hpsdb) | Herschel / Planck System Data Base |  | mentioned |
|  | [EGS-CC](../references/index.md#ref-egs-cc) | European Ground Systems Common Core (product structure package) |  | mentioned |

!!! note "Notes"
    Slide deck exported to PDF (16 slides; the text extraction shows a seventeenth, empty page). Diagrams are flattened into text, so object/item boxes and their colour coding (blue, green, violet, red borders) cannot be seen in the text layer. No authors are named. Typos as printed include 'fior', 'versionning' and 'EGSE-CC'. Related library items: the HPSDB user manual h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual, the HPSDB release note h-p-2-asp-li-1441-09-herschel-hpsdb-release-note and the HPSDB MIB processing note h-p-1-asp-tn-1060-mib-processing-hpsdb.

