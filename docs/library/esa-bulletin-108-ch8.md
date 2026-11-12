---
title: "Promoting ESA software: the SCOS-2000 example"
description: "An ESA Bulletin article (November 2001) by J-F."
tags: ["Paper", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [esa-bulletin-108-ch8]
---

# Promoting ESA Software as a European Product: The SCOS-2000 Example

<dl class="osi-meta"><dt>Document ID</dt><dd>esa bulletin 108</dd><dt>Date</dt><dd>2001-11</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (Directorate of Technical and Operational Support; Directorate of Industrial Matters and Technology Programmes)</dd><dt>Authors</dt><dd>J-F. Kaufeler, M. Jones, H-U. Karl</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Published magazine article (bulletin 108, november 2001, printed pages 72-77).</dd><dt>Pages</dt><dd>6</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.esa.int/esapub/bulletin/bullet108/chapter8_bul108.pdf" rel="noopener">https://www.esa.int/esapub/bulletin/bullet108/chapter8_bul108.pdf</a></dd><dt>Retrieved via</dt><dd><a href="http://web.archive.org/web/20220419150741id_/https://www.esa.int/esapub/bulletin/bullet108/chapter8_bul108.pdf" rel="noopener">Internet Archive snapshot</a> (the original URL no longer served the file)</dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:10:03Z</dd><dt>SHA-256</dt><dd><code>9828d719bfaf6da121d78803c5ca8261d44978858537b0e467ae27e6b5c389bf</code></dd><dt>Size</dt><dd>100.6 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/esa-bulletin-108-ch8.pdf">esa-bulletin-108-ch8.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An ESA Bulletin article (November 2001) by J-F. Kaufeler and M. Jones of ESOC's Ground Segment Engineering Department and H-U. Karl of the ESOC Contracts Service on the initiative to promote SCOS-2000 as a supported ESA software product, not only as licensed in-house software.

It explains why ESOC bases every mission's control system on one generic system and lists the four strategic aims of SCOS-2000: ease of configuration, functional richness, scalability and vendor independence. It gives history and numbers: work started in about 1992, the first missions (Huygens, Meteosat MTP LEOP and Teamsat) were supported in 1997, the telecommanding chain was re-engineered in 1998-2000, about 15 MEuro had been invested, and control-system costs fell by a factor of two to three. It describes the port from Solaris to Linux and the replacement of the commercial ObjectStore and Orbix by the open-source POST++ and Omniorb, with ILOGViews kept for the user interface for now.

Much of the article is about licensing: ESA's 'operational software' IPR clause, free non-exclusive licences to Member State bodies, the three licence types (run-time, development, full), and a move towards open-source-style terms under which licensees hand back kernel improvements. It compares SCOS-2000 with US commercial products, lists the support set up (user organisation, FTP documentation server, help desk), and reports early results: the first users workshop (April 2001), adoption by DLR's German Space Operations Centre, use by the Herschel/Planck payload teams for instrument checkout (checkout changes pioneered on Proba), about 30 licences, and plans for certification and a Windows port.

It documents why and how SCOS-2000 spread beyond ESOC, including into EGSE.


## Key points

- ESOC has used a generic mission control system as the basis for each mission's control system for over 25 years; SCOS-2000 is its latest generic system. *(PDF p. 1)*
- SCOS-2000 strategic aims: ease of configuration/customisation, functional richness, scalability and vendor independence; all four were achieved and ESOC control-system costs came down by a factor of between two and three. *(PDF p. 2)*
- Work on SCOS started in about 1992; its first ESA missions, Huygens, Meteosat (MTP) LEOP and Teamsat, were supported in 1997; the telecommanding chain was re-engineered in 1998-2000; total investment was of the order of 15 MEuro. *(PDF p. 2)*
- SCOS-2000 originally ran on Sun Solaris; it was modified to run under Linux, and of its three COTS products (ObjectStore, Orbix, ILOGViews) the first two were replaced by POST++ and Omniorb. *(PDF p. 3)*
- SCOS-2000 was to be used for all future ESA missions, for example Rosetta, which extends up to 2013. *(PDF p. 3)*
- ESOC uses three licence types: run-time licences (temporary use and trial), development licences (upgrades of operational software under ESA contract) and full licences (developments based on the software). *(PDF p. 4)*
- The main competing products came from US suppliers such as Integral Systems, Storm and Braxton Technologies. *(PDF p. 4)*
- Nearly 100 people from outside ESA attended the first SCOS-2000 Users Workshop in April 2001. *(PDF p. 5)*
- DLR's German Space Operations Centre chose SCOS-2000 for its control centre infrastructure, and the Herschel Planck payload PIs chose it for their instrument checkout equipment; checkout support was pioneered for Proba and introduced into the evolution version. *(PDF p. 5)*
- Some 30 SCOS-2000 licences were granted in a little over two years, making it the best-selling product licensed through ESOC's Contracts Service. *(PDF p. 5)*
- A certification activity with the ESA Quality Department was starting, using a method customised from ISO 9126 and developed with TUV Cologne; a study showed a Windows port to be feasible. *(PDF p. 6)*
- From ESOC alone, 93 software products had been licensed in 94 Member State bodies, with more than 220 licences in total. *(PDF p. 6)*


## Cited by these wiki pages (6)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (10 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Introduction and ESOC software products and their marketing | 1 |
    |  | SCOS-2000 as a software product | 1 |
    |  | Pre-conditions | 2 |
    |  | Licensing aspects: the current ESA licensing scheme | 3 |
    |  | The future ESA licensing scheme | 4 |
    |  | Open-source licensing | 4 |
    |  | Market aspects | 4 |
    |  | Support requirements | 5 |
    |  | Experience so far | 5 |
    |  | Conclusion | 6 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-the-cathedral-and-the-bazaar-book-by-eric-s-raymond) | The Cathedral and the Bazaar (book by Eric S. Raymond) |  | mentioned |
|  | [ISO 9126](../references/index.md#ref-iso-9126) | Information Technology: Software Quality Characteristics and Metrics |  | mentioned |

!!! note "Notes"
    Printed pages 72-77 map to PDF pp. 1-6; PDF p. 6 also carries an unrelated Serco recruitment advertisement (the contact details are omitted here). Figures (ESOC Main Control Room, SCOS-2000 architecture, external interfaces, cumulative licences chart) survive only as captions. Two-column layout is interleaved in the text layer. No reference list.

