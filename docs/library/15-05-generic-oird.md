---
title: "Generic OIRD (GOIRD), ADCSS 2019"
description: "A talk on ESA's Generic Operations Interface Requirements Document (GOIRD)."
tags: ["Presentation", "ECSS standards"]
sources: [15-05-generic-oird]
---

# Generic Operations Interface Requirements Document (GOIRD)

<dl class="osi-meta"><dt>Date</dt><dd>12/11/2019</dd><dt>Organisation</dt><dd>European Space Agency (ESA)</dd><dt>Authors</dt><dd>Ignacio Clerigo</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Workshop presentation given at the 13th ESA Workshop on Avionics, Data, Control and Software Systems, dated 12/11/2019 on the title slide. It reports Generic OIRD 1.0 as formally released in July 2019 and already used by several projects (PDF p. 12).</dd><dt>Pages</dt><dd>32</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://indico.esa.int/event/323/contributions/5027/attachments/3732/5186/15.05_-_Generic_OIRD.pdf" rel="noopener">https://indico.esa.int/event/323/contributions/5027/attachments/3732/5186/15.05_-_Generic_OIRD.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:49:13Z</dd><dt>SHA-256</dt><dd><code>75dd11ab885265f40c67187f95fbf3bfae569592b2d5f7f34a0d40c0db9969ca</code></dd><dt>Size</dt><dd>552.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ecss/15.05_-_Generic_OIRD.pdf">15.05_-_Generic_OIRD.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A talk on ESA's **Generic Operations Interface Requirements Document (GOIRD)**. An OIRD is the ESA-prepared document that sets the space segment's operability requirements, the functions the spacecraft and payload must offer so that the mission can be operated, as an early input to spacecraft development. Mission OIRDs used to be derived from earlier ones, so lessons learnt were not always propagated, differences between missions were not always justified, the OIRDs had evolved independently of PUS-C and the OBCP standard, and this variability hampered product-oriented on-board software and mission control systems.

In June 2016 SAVOIR asked ESOC to create a Generic OIRD as the baseline for future missions and for compatible OBSW libraries. Mission OIRDs are then produced from the GOIRD, with only mission-specific deltas, mission constants, PUS-C service sizing and de-scoping. GOIRD 1.0 was released in July 2019 and was already used for the Copernicus high-priority candidate missions, ERO/Mars Sample Return and HERA.

The GOIRD is a PDF document with Excel/DOORS content in two parts:

* **Part I, functional requirements**: architecture-independent and PUS-agnostic operability requirements traced to ECSS-E-ST-70-11C, grouped by topic (modes, telecommands, telemetry, timing, autonomy, FDIR, safe mode, subsystems);
* **Part II, a PUS-C tailoring** of ECSS-E-ST-70-41C: one common set of services, subservices and capabilities for all ESA missions. The talk quantifies the full standard (20 services, 33 subservices, 316 TC/TM types of which 88 are mandatory, and 382 'shall be declared' options). It describes added observables, new capabilities (critical event/system log, parameter extraction from HK, backup MTL, file-based operations), architecture rules (service 11 centralized; services 1, 3, 5, 6 and 17 in every packetized unit) and minimal changes to the standard.

OBCPs (ECSS-E-ST-70-01C) are not tailored. The talk notes that PUS-C leaves low-level encoding choices open, hurting interoperability, and calls for PUS-C library developers to coordinate.


## Key points

- For most ESA missions the operability requirements are captured in a mission-specific OIRD (Operations Interface Requirements Document), prepared by ESA, standalone or integrated in the System Requirements Document, and tightly coupled with CCSDS and ECSS standards. *(PDF p. 3)*
- Problems with per-mission OIRDs: derived from previous OIRDs, lessons learnt not propagated, differences not always justified, evolution independent of PUS-C and OBCP standards, and partial overlap between OIRD and PUS requirements. *(PDF p. 4)*
- SAVOIR entrusted ESOC in June 2016 with establishing a Generic OIRD, to be the baseline specification for future missions and to allow compatible OBSW libraries. *(PDF p. 5)*
- The GOIRD has Part I, on-board functional requirements (space segment operability, ECSS-E-ST-70-11C), and Part II, PUS-C requirements (ECSS-E-ST-70-41C) and OBCP (ECSS-E-ST-70-01C). *(PDF p. 7)*
- The GOIRD is delivered as a PDF with three attached Excel files (functional requirements, PUS-C requirements, changelog); its scope is limited to robotic missions with an avionics-like subsystem in mind. *(PDF p. 8)*
- The GOIRD does not replace mission OIRDs: missions start from all GOIRD requirements and trace only truly mission-specific changes (mission constants, PUS-C service sizing, de-scoping), with no copy and paste from previous mission OIRDs. *(PDF p. 10)*
- Generic OIRD 1.0 was formally released in July 2019 and used to build the OIRDs of the Copernicus high-priority candidate missions, ERO / Mars Sample Return and HERA. *(PDF p. 12)*
- Functional requirements are kept in DOORS with ID, text and notes, relationship to ECSS-E-ST-70-11C (unchanged, new or modified) and clause, justification, and a mission-family flag (interplanetary, astronomy, Earth Observation); TC authentication requirements apply only to Earth Observation missions. *(PDF p. 16)*
- PUS-C is described as a major step forward from PUS-A: a solid foundation model, clear system requirements, interface definition separated from requirements, and new service types (e.g. file management). *(PDF p. 19)*
- PUS-C as is defines 20 services with 33 subservices, 316 TCs and TM reports if all subservices are implemented (only 88 mandatory) and 382 'shall be declared when specifying' statements, so two untailored implementations would have very different interfaces. *(PDF p. 20)*
- The GOIRD PUS-C tailoring fixes a common set of services, subservices, TC/TM types and capabilities for all future ESA missions (about 60% of the GOIRD PUS-C requirements). *(PDF p. 23)*
- New capabilities not in PUS-C (critical event log/system log, parameter extraction from HK, backup MTL, file-based operations) are added as high-level requirements without defined TC/TM interfaces (about 19%), to be raised as change requests. *(PDF p. 25)*
- Architecture rules: some services must be centralized, e.g. service 11 (Mission Timeline); services 1, 3, 5, 6 (if applicable) and 17 must be implemented in all packetized units. *(PDF p. 26)*
- Changes to PUS-C behaviour are kept to under 1% of the requirements, with no modification of defined TC and TM interfaces; clarifications from lessons learnt make up about 12%. *(PDF p. 27)*
- PUS-C leaves key low-level aspects unstandardized, such as the number of bytes used to encode certain packet fields, which matters for interoperability of PUS-C units. *(PDF p. 28)*
- The ECSS OBCP standard is not tailored in the GOIRD; a few extra requirements are added to PUS-C service 18. *(PDF p. 29)*


## Cited by these wiki pages (7)

- [ECSS-E-ST-70-01C: on-board control procedures](../ecss/e-st-70-01c.md)
- [ECSS-E-ST-70C: ground systems and operations](../ecss/e-st-70c.md)
- [Operations preparation: databases, procedures and tools](../scos2000/operations-preparation.md)
- [PUS-A vs PUS-C (and the 2024 Rev.1 draft)](../ecss/pus/pus-a-vs-pus-c.md)
- [PUS: the Packet Utilization Standard](../ecss/pus/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (15 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Agenda | 2 |
    |  | Introduction | 3 |
    |  | Generic OIRD - Structure | 7 |
    |  | Generic OIRD - Format | 8 |
    |  | Generic OIRD - Content | 9 |
    |  | Mission OIRD generation | 10 |
    |  | Generic OIRD - Status | 12 |
    |  | Functional requirements - Content | 14 |
    |  | Functional requirements - Format | 16 |
    |  | PUS-C requirements | 19 |
    |  | PUS-C requirements - Format | 21 |
    |  | PUS-C requirements – Classification | 23 |
    |  | PUS-C requirements - Problems | 28 |
    |  | OBCP requirements | 29 |
    |  | Conclusions | 31 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [ECSS-E-ST-70-11C](../references/index.md#ref-ecss-e-st-70-11c) | Space segment operability (ECSS Space Segment Operability Standard) |  | mentioned |
|  | [ECSS-E-ST-70-41C](../references/index.md#ref-ecss-e-st-70-41c) · [library](ecss-e-st-70-41c-15april2016.md) | PUS-C |  | mentioned |
|  | [ECSS-E-ST-70-01C](../references/index.md#ref-ecss-e-st-70-01c) · [library](ecss-e-st-70-01c16april2010.md) | OBCP |  | mentioned |
|  | [catalogue](../references/index.md#ref-pus-a) | PUS-A |  | mentioned |
|  | [catalogue](../references/index.md#ref-generic-oird-1-0-released-july-2019) | Generic OIRD 1.0 (released July 2019) | 1.0 July 2019 | mentioned |

!!! note "Notes"
    Slide deck with no reference list; the 'mentioned' entries come from the slides. The title-slide date is printed '12/11/2019' and is kept as printed; read in day/month order it would be 12 November 2019, but that reading is this catalogue's inference. Every slide carries the marking 'ESA UNCLASSIFIED - For Official Use'. The author's affiliation is not printed beyond the ESA marking. Slides 17 and 22 (format examples) are images with no extractable text, and the structure diagram on p. 7 is extracted as loose labels. 'drives', 'standardize' and 'Fix set' are as printed (pp. 4, 23, 28). The GOIRD itself is not in the library; the standards it tailors are (ecss-e-st-70-11c-rev-1-15october2025, ecss-e-st-70-41c-15april2016, ecss-e-st-70-01c16april2010). Other ADCSS talks in the library: valera-2015-adcss-ecss-e-st-70-41c-status. The PDF has 32 slides plus a trailing empty page 33 in the extraction.

