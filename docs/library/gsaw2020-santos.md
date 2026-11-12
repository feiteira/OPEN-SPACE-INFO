---
title: "Data analytics infrastructure at ESOC (GSAW 2020)"
description: "A short ESOC slide deck from GSAW 2020 on the off-line data analytics infrastructure that sits beside the mission control systems."
tags: ["Presentation", "ESOC evolution and context"]
sources: [gsaw2020-santos]
---

# State and evolution of data analytics infrastructure at ESOC

<dl class="osi-meta"><dt>Date</dt><dd>2020-03-03</dd><dt>Organisation</dt><dd>European Space Agency, European Space Operations Centre (ESOC); published by The Aerospace Corporation with permission (GSAW 2020)</dd><dt>Authors</dt><dd>Rui Santos</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Slide deck dated 03/03/2020 (title slide, PDF p. 1). Marked 'ESA UNCLASSIFIED - For Official Use' on every slide and '© 2020 by European Space Agency. Published by The Aerospace Corporation with permission'.</dd><dt>Pages</dt><dd>16</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://gsaw.org/wp-content/uploads/2020/03/2020s04_santos.pdf" rel="noopener">https://gsaw.org/wp-content/uploads/2020/03/2020s04_santos.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:12:26Z</dd><dt>SHA-256</dt><dd><code>03955c935226799e7ab0fef81b1b122c5eb6f42af339346a64c3e0b9d14ce75f</code></dd><dt>Size</dt><dd>5.1 MB</dd><dt>Our copy</dt><dd><a href="../third-party/context/gsaw2020-santos.pdf">gsaw2020-santos.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A short ESOC slide deck from GSAW 2020 on the off-line data analytics infrastructure that sits beside the mission control systems. It sets out a generic big-data layering (raw, processing, optimised and speed layers) and maps ESOC's tools onto it. **ARES** (Analysis and Reporting System) provides storage and infrastructure. PyARES, the (deep) novelty detection system, the Dependency Finder and long-term data preservation (LTDP) products and collections provide data accessibility.

ARES is an off-line analysis system that evolved from ESA's MUST (Mission Utility Support tools) and is built on the EGOS User Desktop framework. It mainly stores spacecraft housekeeping data in engineering format, and also files, parameters and events, optimised for fast retrieval. The architecture slide shows ARES importing [EDDS](../scos2000/edds.md) response files on its own LAN. EDDS in turn draws on the MCS [archives](../scos2000/archives.md) (DARC, PARC) on the OPS-LAN. The deck motivates a multi-mission shared big-data store with Gaia's volume (around 150 million unique HKTM samples per day). It describes PyARES as a Python library for retrieval and user-defined or machine-learning processing on Spark/HBase/Protobuf. Novelty Detection and the Dependency Finder are AI tools for spotting unusual telemetry behaviour and statistical dependencies between parameters; the Dependency Finder was validated by the Mars Express flight control team. The LTDP prototype combines ARES, Elasticsearch and a REST API. Future work listed includes processing live TM streams, migrating legacy missions to Hadoop and building a curated anomaly-detection dataset.


## Key points

- The big-data architecture has a raw layer (full fidelity, file/folder structures), a processing layer (distributed computation), an optimised layer (structured, organised by consumer use case) and a speed layer (low latency). *(PDF p. 3)*
- At ESOC, ARES provides storage/infrastructure, while PyARES, the Novelty Detection system, Dependency Finder and LTDP products and collections provide data accessibility. *(PDF p. 4)*
- ARES (Analysis and Reporting System) is an off-line data analysis system that evolved from ESA's Mission Utility Support tools (MUST) and is built on the EGOS User Desktop framework (EUD). *(PDF p. 5)*
- ARES mainly stores spacecraft housekeeping data in engineering format, supports generic storage of files, parameters and events, and imports EDDS response files; the diagram shows EDDS reaching the MCS archives (DARC, PARC) on the OPS-LAN. *(PDF p. 5)*
- Gaia receives around 150 million unique HKTM samples per day, which is used to motivate a multi-mission shared big-data storage. *(PDF p. 9)*
- PyARES is a Python library for ARES metadata and data retrieval, user-defined-function processing and machine-learning jobs (Random Forest), bringing processing to the data with PySpark over Spark, HBase and Protobuf. *(PDF p. 10)*
- The Dependency Finder prototype was developed by the Artificial Intelligence & Operations Innovation Team and validated by the Mars Express Flight Control Team. *(PDF p. 12)*
- The LTDP products and collections platform was prototyped with ARES (Hadoop database cluster), Elasticsearch and a RESTful API. *(PDF p. 13)*


## Cited by these wiki pages (4)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Mission archives: PARC, DARC and FARC](../scos2000/archives.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (16 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Slide 1 | State and evolution of data analytics infrastructure at ESOC | 1 |
    | Slide 2 | European Space Operations Centre (ESOC) | 2 |
    | Slide 3 | Architecture – Big Data Layers | 3 |
    | Slide 4 | Architecture – Big Data Layers @ESOC | 4 |
    | Slide 5 | Infrastructure: Introduction to ARES | 5 |
    | Slide 6 | Displays: Graphical display | 6 |
    | Slide 7 | Displays: Alphanumeric display | 7 |
    | Slide 8 | Displays: Table displays | 8 |
    | Slide 9 | Infrastructure: (Big Data) Multi mission shared storage | 9 |
    | Slide 10 | Processing and Retrieval: PyARES | 10 |
    | Slide 11 | Processing: (Deep) Novelty Detection | 11 |
    | Slide 12 | Processing: Dependency Finder | 12 |
    | Slide 13 | Enhancement: LTDP products and collections | 13 |
    | Slide 14 | Examples of potential future work | 14 |
    | Slide 15 | Conclusions | 15 |
    | Slide 16 | Thank you for your attention! | 16 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| SpaceOps2018 (novelty detection) | [catalogue](../references/index.md#ref-novelty-detection-with-deep-learning-by-jose-martinez-and-alessandro-donati-spac) | Novelty Detection with Deep Learning, by Jose Martinez and Alessandro Donati (SpaceOps2018 paper) | 2018 | mentioned |
| SpaceOps2018 (dependency finder) | [catalogue](../references/index.md#ref-dependency-finder-surprising-relationships-in-telemetry-by-jose-martinez-luke-lu) | Dependency Finder: Surprising Relationships in Telemetry, by Jose Martinez, Luke Lucas and Alessandro Donati (SpaceOps2018 paper) | 2018 | mentioned |

!!! note "Notes"
    Slide deck; PDF page n is slide n. Slides 2 and 6-8 are mostly images, so little or no text was extracted from them. The title slide credits James Eggleston and Jose Martinez Heras ('Thanks to'), who are not authors. The 'ESA UNCLASSIFIED - For Official Use' marking appears on a deck that was published by The Aerospace Corporation (GSAW proceedings). The extraction reports 17 PDF pages (registry: 16); the last is empty. Rui Santos is also listed among the authors of the EDDS documents (for example cig-v24).

