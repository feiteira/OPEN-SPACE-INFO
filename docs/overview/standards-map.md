---
title: The standards landscape
description: Who publishes the documents behind spacecraft telemetry and telecommand (CCSDS, ECSS, ISO, ESA PSS, ESA and ESOC, OMG, SANA), how their numbers, colours, issues, editorial changes, corrigenda, historical status and adoption notices work, how PUS-A, PUS-C and the 2024 draft relate, and a version matrix of every CCSDS, ECSS and ESA PSS standard and of the main ESA, ESOC and mission interface documents this wiki holds, with issue, date, status, copy time and links.
tags: [Overview, Standards, CCSDS, ECSS, ISO, ESA, PUS, Document control]
sources: [ccsds-130-0-130x0g4e1, ccsds-130-1-130x1g3e1, ccsds-130-2-130x2g3, ccsds-131-0-131x0b5, ccsds-132-0-132x0b3, ccsds-133-0-133x0b2e2, ccsds-133-1-133x1b3e1, ccsds-230-1-230x1g3e1, ccsds-231-0-231x0b4e1, ccsds-232-0-232x0b4e1c1, ccsds-232-1-232x1b2e2c1, ccsds-301-0-301x0b4e1, ccsds-355-0-355x0b2, ccsds-660-0-660x0b2, ccsds-660-1-660x1g2, ccsds-727-0-727x0b5e1, ccsds-732-0-732x0b4, ccsds-732-1-732x1b3e1, ccsds-910x3g3-sle-cross-support, ccsds-911-1-911x1b5e1, ccsds-911x1b5e1-sle-raf, ccsds-911-2-911x2b4e1, ccsds-911-5-911x5b4e1, ccsds-912-1-912x1b5e1, ccsds-913-1-913x1b2, ccsds-914-0-914x0m2c1, ecss-e-st-50c-rev-1-1march2021, ecss-e-as-50-25c-rev-1-13january2023, ecss-e-as-50-26c-1march2021, ecss-e-st-50-03c-31july2008, ecss-e-hb-50a-15november2008, ecss-e-st-70-11c-rev-1-15october2025, ecss-e-st-70-31c, ecss-e-70-41a-30jan2003-pus, ecss-e-st-70-41c-15april2016, ecss-e-st-70-41c-rev1-dir1, valera-2015-adcss-ecss-e-st-70-41c-status, icd-5-1-tos-gci, icd-6-7-drafta, icd-6-9-archive-org, icd-7-0-final, icd-0017-tdrs-5-1, tn-1030-time-correlation, sdd, sdd-v24, srs, sum, sum-v22, euicd-unversioned, euicd-v13, euicd-i15r0, euicd-v25, cig-i14r0, cig-v24, eug, glo, srn, solo-ddid-i1r2, sol-s-astr-tn-00079-07, sol-sgs-icd-0006-efecs-icd-3-0, sol-sgs-tn-0007-s20-2-0, ro-esc-if-5003-ddid-c2, mex-esc-if-5003-b5, mex-esc-id-5003-fds-icd, ifms-occ-icd-mex, esa-bulletin-108-ch8, cosmos-operations-interface-requirements, mib-20250916m25925pfms001-sol, mib-20200416m10720pfms001-sol, ccsds-130-3-130x3g1, ccsds-131-0-131x0b6ec1, ccsds-135-0-135x0b4s, ccsds-211-0-211x0b6e1, ccsds-231-0-231x0b4e1c1, ccsds-320-0-320x0m7c1, ccsds-350-0-350x0g3, ccsds-350-5-350x5g2, ccsds-352-0-352x0b2, ccsds-355-1-355x1b1, ccsds-401-0-401x0b32, ccsds-660-2-660x2g2, ccsds-732-0-732x0b5ec1, ccsds-902-0-902x0g1, ccsds-902-4-902x4b1, ccsds-910-4-910x4b2e1s, ccsds-912-3-912x3b3s, ccsds-915-1-915x1m2, ccsds-916-3-916x3m2, ccsds-922-1-922x1b2, omg-xtce-1-3-specification, ntrs-20090017706-xtce-tutorial, ecss-e-st-50c-rev-2-5december2024, ecss-e-st-50-01c31july2008, ecss-e-st-50-02c31july2008, ecss-e-st-50-04c31july2008, ecss-e-st-50-05c-rev24october2011, ecss-e-as-50-21c-rev-2-5december2024, ecss-e-as-50-22c-rev-1-13january2023, ecss-e-as-50-23c-rev-1-13january2023, ecss-e-as-50-24c-rev-1-13january2023, ecss-e-st-70c31july2008, ecss-e-st-70-01c16april2010, ecss-e-st-70-32c31july2008, ecss-trees-nov2025, esa-pss-04-106-issue1-january1988, esa-pss-04-107-issue2-april1992, esa-pss-04-151-issue1-september1992, esa-pss-07-101-issue1-may1994, valera-2014-ecss-e-st-70-41c-status, presentation-deployment-of-the-pus-c-standard, 15-05-generic-oird, ntrs-19950011180-esa-pus-paper, 12-3-solarorbiter-eid-a-issue-1-0-2007-10-09, so-swa-dpu-cd-ic-003-dpu-communications-interface-control-document-issue8-2, swa-idb-ascii, swa-idb-v6-5-0, stix-idb-v2-26-38-raw, ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d, herschel-planck-space-ground-interface-control-document-sgicd]
---

# The standards landscape

The chain described in [How it all fits together](index.md) is specified by documents from
several publishers. The space agencies' **CCSDS** writes the space link and ground cross-support
protocols. **ECSS** writes the European engineering standards, adopts CCSDS books into its own
system and owns the [Packet Utilization Standard](../ecss/pus/index.md). **ISO** publishes many
CCSDS Recommended Standards as ISO standards. **ESA and ESOC** write the interface documents
of their own ground software, such as the SCOS-2000 Database Import ICD that defines the
[MIB](../mib/index.md), and every mission adds its own interface control documents on
top.[^hb-ccsds][^sle-iso][^hb-rel][^icd-scope]

Each family has its own numbering, its own way of issuing revisions and its own idea of what is
binding. This matters in practice because a document names the editions it was written against,
and those editions stay in force for whoever applies it. The Solar Orbiter packet ICD applies the
PUS of 2003; the SCOS-2000 ICD issue of 2017 still points at the ESA PUS of 1994 and at the
CCSDS time code issue of 1990.[^solo-docs][^icd-rd] This page explains how to read each family's document numbers,
how the families depend on each other, and which edition of every document this wiki holds.

## Who publishes what

| Publisher | What it is | Status of its documents | Documents in this wiki's library |
|---|---|---|---|
| **CCSDS** (Consultative Committee for Space Data Systems) | A committee established by the space agencies to solve shared data-system problems; at the April 2023 overview it had 11 member agencies, ESA among them, and 33 observer agencies | "Recommended Standards" are not binding on any agency; endorsement is voluntary | 46 copies of 44 issues of 42 books: protocols, coding, RF, identifiers, security, SLE and service management, XTCE, time codes, CFDP |
| **ECSS** (European Cooperation for Space Standardization) | A cooperative effort of ESA, national space agencies and European industry associations; the publisher blocks name the ESA Publications Division (2003), the ESA Requirements and Standards Division at ESTEC (2008 to 2016), the Requirements and Standards Section (2021 to 2024) and the ESA Standards Section (2025) | Standards may be tailored to each project; handbooks are informative | 22 documents of the E-50 communications and E-70 ground systems and operations disciplines, and the ECSS Trees chart of November 2025 |
| **ISO** (International Organization for Standardization) | Publishes many CCSDS Recommended Standards as ISO standards | International standards | None; see [below](#iso-adoption-of-ccsds-books) |
| **ESA PSS** (Procedures, Specifications and Standards) | ESA's own series that adapted CCSDS books for European missions; the packet standards were prepared by ESA boards (STAB, COES) and approved by the ESA Inspector General | All withdrawn in favour of ECSS or CCSDS | 4 scanned standards of 1988 to 1994: packet telemetry, packet telecommand, telecommand decoder, packet utilisation |
| **ESA / ESOC infrastructure** | Interface, design and user documents of SCOS-2000, EDDS, NCTRS/NIS and other EGOS software | Binding for missions that use the software | MIB ICD issues 5.1 to 7.0, TDRS ICD, time-correlation note, the EDDS document set |
| **Missions and their contractors** | Space-to-ground ICDs, data delivery ICDs, packet structure ICDs, MIB deliveries | Binding within the mission | Solar Orbiter (spacecraft and instrument), Herschel/Planck, Rosetta, Mars Express and Venus Express documents; two Solar Orbiter MIB releases and the SWA and STIX instrument databases |
| **OMG** (Object Management Group) | Industry consortium that publishes the XTCE specification | CCSDS republishes it as a Blue Book | XTCE 1.2 inside CCSDS 660.0-B-2; XTCE 1.3 (OMG formal/26-06-09, March 2026) |
| **SANA** (Space Assigned Numbers Authority) | Registrar for all protocol registries created under CCSDS | Holds identifier values such as spacecraft IDs | None (web registries) |

Sources for the rows: CCSDS statement of intent and agency list; ECSS forewords; the SLE concept
and the ECSS handbook on ISO; the handbook on PSS; XTCE title pages; the CCSDS overview on
SANA; the PSS covers.[^spp-intent][^g4-agencies][^fw-50][^pub-blocks][^pusc-scope][^sle-iso][^hb-ccsds][^hb-pss][^xtce-omg][^xtce13][^g4-sana][^pss-covers] The
library counts are this wiki's own, from its [reference catalogue](../references/index.md); the
RAF book is held twice, as `ccsds-911-1-911x1b5e1` and `ccsds-911x1b5e1-sle-raf`, two copies with
the same checksum, and CCSDS 231.0-B-4 twice, once with Editorial Change 1 and once also with
Technical Corrigendum 1; CCSDS 131.0 and 732.0 are each held in two issues.[^copies] The ECSS handbook of 2008 described CCSDS as ten member agencies,
more than 20 observers and over 100 industrial associates; the 2023 count above is this wiki's
count of the lists printed in CCSDS 130.0-G-4.[^hb-ccsds][^g4-agencies]

```mermaid
flowchart LR
  subgraph CC["CCSDS"]
    BB["Blue Books<br/>Recommended Standards"]
    GB["Green Books<br/>Informational Reports"]
    MB["Magenta Books<br/>Recommended Practices"]
  end
  subgraph EC["ECSS"]
    AS["E-AS adoption notices<br/>(E-AS-50-21 ... -26)"]
    ST50["E-ST-50 communications"]
    ST70["E-ST-70 family: -01 / -11 / -31 / -32 / -41<br/>OBCP, operability, M and C data, PLUTO, PUS"]
    HB["E-HB-50 handbook"]
  end
  PSS["ESA PSS (withdrawn)<br/>PSS-04-106, -04-107,<br/>-04-151, PSS-07-101"]
  ISO["ISO standards"]
  OMG["OMG XTCE"]
  SANA["SANA registries"]
  ESOC["ESOC infrastructure ICDs<br/>SCOS-2000 MIB ICD, EDDS, NIS"]
  MIS["Mission ICDs and MIB deliveries"]
  GB -.->|"rationale for"| BB
  BB -->|"adopted by"| ISO
  BB -->|"applied with modifications"| AS
  AS --> ST50
  PSS -->|"lineage"| ST50
  PSS -->|"lineage"| ST70
  OMG -->|"republished as 660.0-B-2"| BB
  BB -->|"identifier values"| SANA
  HB -.->|"guidance on"| ST50
  ST70 --> MIS
  BB --> MIS
  ESOC --> MIS
```

*How the families feed each other, after the ECSS communications handbook, ECSS-E-ST-50C Rev.1,
the SLE concept, the XTCE Blue Book and the CCSDS overview.*[^hb-rel][^as-table][^sle-iso][^xtce-omg][^g4-sana][^g4-scope]

## CCSDS: colours, numbers and editions

### Book colours

CCSDS publishes in coloured "books". The colour is also a letter inside the document number.

| Colour | Letter | Category | Wording on the cover or in citations | Example in this wiki |
|---|---|---|---|---|
| Blue | B | Recommended Standard: prescriptive interfaces, protocols and encodings | "Recommendation for Space Data System Standards" | [CCSDS 133.0-B-2](../library/ccsds-133-0-133x0b2e2.md) Space Packet Protocol |
| Magenta | M | Recommended Practice: consensus "best" or "state of the art" ways to apply standards | "Recommendation for Space Data System Practices" | [CCSDS 914.0-M-2](../library/ccsds-914-0-914x0m2c1.md) SLE API core; [CCSDS 320.0-M-7](../library/ccsds-320-0-320x0m7c1.md), which was a Blue Book until issue 6 |
| Green | G | Informational Report: overviews, rationale, performance data, tutorials | "Report Concerning Space Data System Standards" | [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md) overview of the protocols |
| Orange | not shown in the sources | Experimental Specification: research results, not a standard | not in the library | none |
| Yellow | Y | CCSDS Record: charters and procedures | "CCSDS Record" | CCSDS A02.1-Y-4 *Organization and Processes*, cited in the forewords |
| Silver | `-S` suffix | Historical: superseded or obsolete documents | "(Historical)"; the cover of a historical copy says it is "no longer current" | SCPS-NP 713.0-B-1-S; Forward Space Packet 912.3-B-3-S (September 2022); held as historical copies: [910.4-B-2](../library/ccsds-910-4-910x4b2e1s.md), [912.3-B-3](../library/ccsds-912-3-912x3b3s.md), [135.0-B-4](../library/ccsds-135-0-135x0b4s.md) |
| Red | R | Draft Recommendation, circulated before approval | "Draft Recommendation" | CCSDS 910.11-R-1 (SLE service management, 2006) and 727.0-R-5 (CFDP, 2001), both cited as drafts; the library's [902.4-B-1](../library/ccsds-902-4-902x4b1.md) is a "proposed draft" whose cover is already laid out as a Blue Book dated September 2026 |

*Sources: the ECSS communications handbook §3.1.2, the reference lists of CCSDS 130.0-G-4 and
910.3-G-3, the normative references of ECSS-E-70-41A and the covers and document control pages of
the books themselves.*[^hb-ccsds][^hb-ccsds2][^g4-refs][^sle-refs][^pusa-refs][^api-cover][^dc-320][^hist-covers][^dc-9024]

A book can change colour between issues: the spacecraft identifier procedures were Blue Books
320.0-B-1 to -B-6 (1993 to 2013) and became the Recommended Practice 320.0-M-7 in November 2017,
which also introduced the frequency band as a qualifier of the identifier and moved the request form
to the SANA web site.[^dc-320] A book can also change number: the XTCE Green Book 660.2-G-2 (February
2021) lists as its own first issue a 660.0-G-1 of July 2006.[^dc-6602]

A Green Book usually accompanies a Blue Book: the specification of a protocol is in the Blue
Book and its rationale in the Green Book.[^g4-scope] In this library, CCSDS 130.1-G-3 and
230.1-G-3 summarise the concept and rationale of TM and TC synchronization and channel coding,
130.2-G-3 does the same for the TM, TC and AOS data link protocols, 660.1-G-2 describes the XTCE
elements, and 910.3-G-3 describes the SLE services.[^g4-refs][^g4-coding-refs][^g2-scope][^sle-concept]
The Green Books added to the library in November 2026 follow the same pattern: 350.5-G-2 is the summary of concept and
rationale of the Space Data Link Security protocol, 130.3-G-1 an informational report on the Space
Packet Protocols, 350.0-G-3 a report on the application of security to CCSDS protocols, 660.2-G-2 an
informational report on XTCE and 902.0-G-1 the concept of extensible cross support service
management.[^dc-r2]

### Anatomy of a document number

```text
CCSDS 232.0-B-4 Cor. 1
      │     │ │  └── Technical Corrigendum 1 (October 2023), incorporated in the copy
      │     │ └───── Issue 4 (October 2021)
      │     └─────── B = Blue Book, a Recommended Standard
      └───────────── 232.0 = the book's number (here TC Space Data Link Protocol)
```

The ECSS handbook spells out the rule: a Blue Book number contains the letter B, a Green Book
number the letter G, and the last number is the issue.[^hb-ccsds][^hb-ccsds2] The book numbers cluster by
subject, as the reference lists and the books held show:[^g4-refs][^g4-sana][^dc-r2]

| Number range | Subjects in the library and in the CCSDS 130.0-G-4 references |
|---|---|
| 120–135 | Data compression (120.0-G, 121.0 to 123.0), overview reports (130.x, including the Space Packet Protocols report 130.3-G), TM coding including SCCC and DVB-S2 (131.x), TM SDLP (132.0), packets (133.x), space link identifiers (135.0, historical) |
| 210–211, 230–232 | Proximity-1 (210.0-G, 211.x); TC coding (230.1, 231.0); TC SDLP (232.0); COP-1 (232.1) |
| 301–355 | Time codes (301.0); spacecraft ID assignment (320.0-M); security (350.0-G and 350.5-G reports, 351.0-M, cryptographic algorithms 352.0, SDLS 355.0 and its extended procedures 355.1) |
| 401 | RF and modulation |
| 524, 660 | Mission operations services (524.1); XTCE (660.0-B, 660.1-G, 660.2-G) |
| 700–735 | USLP overview (700.1-G); IP over CCSDS (702.1); SCPS (713–717); CFDP (720.1, 727.0); AOS (732.0) and USLP (732.1); DTN, LTP and BP (734.x); AMS (735.1) |
| 901–922 | Cross support: architecture (901.1-M), service management (902.0-G concept, 902.4-B service package data formats), SLE concept and reference model (910.3-G, 910.4-B), return services (911.x), forward services (912.x, including the historical Forward Space Packet 912.3), ISP1 (913.1), APIs (914.0-M core, 915.1-M return all frames, 916.3-M forward space packet), Cross Support Transfer Services (922.1, monitored data) |

!!! warning "Inference"
    CCSDS does not publish this range table in the available sources; it is this wiki's
    grouping of the numbers that appear in the reference lists and on the books held. The
    retired Space Link Identifiers Blue Book, whose registries SANA replaced, is named in CCSDS
    130.0-G-4 without its number; the library's historical copy shows that it is 135.0
    (issue 4, October 2009).[^g4-sana][^hist-covers] The second part after the dot (`133.0`,
    `133.1`) separates sibling books on the same subject, for example the Space Packet and
    Encapsulation Packet protocols.

### Issues, editorial changes and corrigenda

Every CCSDS book in this library opens with a **Document Control** table that lists each issue and its status
("Original issue, superseded", "Current issue"), followed by two kinds of later amendment:[^dc-133][^dc-232]

* An **Editorial Change** (EC) corrects presentation without touching the technical content.
  CCSDS 133.0-B-2 has two: EC 1 (October 2020) adds a missing arrowhead to figure 2-1 and makes
  clear that a link uses either the Encapsulation Packet or the Space Packet protocol; EC 2
  (September 2024) removes duplicated table-of-contents entries and changes the page size to
  A4.[^dc-133] The same A4 change appears in several other editorial changes of 2024, for
  example those of 231.0-B-4, 727.0-B-5 and 232.0-B-4.[^dc-231][^dc-727][^dc-232]
* A **Technical Corrigendum** (Cor.) changes technical text within an issue. CCSDS 232.0-B-4
  Cor. 1 (October 2023) expands the discussion of the order of processing between the TC data
  link protocol, COP-1 and SDLS. CCSDS 232.1-B-2 Cor. 1 (April 2019) adds support for USLP and
  clarifies the FARM-1 window widths. CCSDS 914.0-M-2 Cor. 1 (August 2016) moves the hash
  algorithm reference to CCSDS 913.1-B.[^dc-232][^dc-2321][^dc-914] The cover of 232.0-B-4 then
  states that the "current issue includes all updates through Technical Corrigendum 1".[^cover-232]
  The cover of CCSDS 320.0-M-7 carries the same kind of note for its Cor. 1 (July 2019), which adds
  USLP frames and redefines the frequency bins with ITU frequency ranges; CCSDS 231.0-B-4 Cor. 1
  (July 2026) revises the CLTU tail sequence of 5.2.4.2 and adds a note and probability details
  to it.[^dc-320][^dc-231c1]
* Not every amendment called editorial is purely presentational: the Editorial Change 1 of
  CCSDS 732.0-B-5 (October 2025) corrects a note and the issue year but also, in the words of
  its document control, "upgrades section 4.1.2.6 to Reed-Solomon (15,11) code".[^dc-7325] The
  first amendment of CCSDS 131.0-B-6 (May 2026) is called an "Editorial Correction" and fixes
  numbering in the table of contents, a table and four figures.[^dc-1316]

Each new issue lists its substantive changes. CCSDS 131.0-B-5 (September 2023) revises the
pseudo-randomiser to avoid spectral spikes on high-rate links; CCSDS 133.0-B-2 (June 2020)
removes network-type terminology from the Space Packet Protocol; CCSDS 133.1-B-3 renames the
"Encapsulation Service" to the "Encapsulation Packet Protocol" and drops the Space Packet from
its formats; CCSDS 732.1-B-3 (June 2024) adds VC Packet and VC Access services to USLP and allows
more than one frame per CLTU; the 2023 SLE issues add support for USLP frames.[^dc-131][^dc-133][^dc-1331][^dc-7321][^dc-911]
For two books the library also holds a newer issue: CCSDS 732.0-B-5 (October 2025)
extends the AOS Spacecraft Identifier to 10 bits and the M_PDU First Header Pointer to 16 bits for
frames of up to 65 536 octets, and CCSDS 131.0-B-6 (April 2026) adds an interleaver for turbo
codewords, allows slicing for all block codes and makes the pseudo-randomizer mandatory.[^dc-7325][^dc-1316]
The [TM coding](../ccsds/tm-coding.md) and [AOS](../ccsds/aos.md) pages describe what changed.

### File names on ccsds.org

Most of the library's CCSDS copies come from `ccsds.org/Pubs/`; four recent ones (131.0-B-6,
732.0-B-5, 231.0-B-4 with Cor. 1 and the 902.4-B-1 draft) were served from an upload directory of
the same site. In both places each file name compresses the number, the colour, the issue and the
later amendments:[^copies][^dc-r2]

| File name | Document control in the copy | Reading |
|---|---|---|
| `130x0g4e1.pdf` | 130.0-G-4, EC 1 (February 2024) | 130.0, Green, issue 4, EC 1 |
| `133x0b2e2.pdf` | 133.0-B-2, EC 1 and EC 2 | 133.0, Blue, issue 2, EC 2 |
| `232x0b4e1c1.pdf` | 232.0-B-4, Cor. 1 (October 2023), EC 1 (October 2024) | 232.0, Blue, issue 4, EC 1, Cor. 1 |
| `232x1b2e2c1.pdf` | 232.1-B-2, EC 1, EC 2, Cor. 1 (April 2019) | 232.1, Blue, issue 2, EC 2, Cor. 1 |
| `914x0m2c1.pdf` | 914.0-M-2, Cor. 1 (August 2016) | 914.0, Magenta, issue 2, Cor. 1 |
| `910x3g3.pdf` | 910.3-G-3, no amendments | 910.3, Green, issue 3 |
| `401x0b32.pdf` | 401.0-B-32 | 401.0, Blue, issue 32 (the issue number may have two digits) |
| `320x0m7c1.pdf` | 320.0-M-7, Cor. 1 (July 2019) | 320.0, Magenta, issue 7, Cor. 1 |
| `231x0b4e1c1.pdf` | 231.0-B-4, EC 1 (October 2024), Cor. 1 (July 2026) | 231.0, Blue, issue 4, EC 1, Cor. 1 |
| `131x0b6ec1.pdf` | 131.0-B-6, Editorial Correction 1 (May 2026) | 131.0, Blue, issue 6, `ec1` instead of `e1` |
| `732x0b5ec1.pdf` | 732.0-B-5, EC 1 (October 2025) | 732.0, Blue, issue 5, `ec1` |
| `910x4b2e1s.pdf` | 910.4-B-2, EC 1 (July 2007); cover "CCSDS Historical Document" | 910.4, Blue, issue 2, EC 1, historical |
| `912x3b3s.pdf`, `135x0b4s.pdf` | 912.3-B-3 and 135.0-B-4; historical covers | historical, no amendments |

!!! warning "Inference"
    CCSDS does not explain its file naming in the available sources. The reading in the last
    column is this wiki's, and it matches the document control table of every copy listed in
    the [version matrix](#version-matrix): `x` replaces the dot, the colour letter and issue
    follow, then `e<n>` for the latest editorial change and `c<n>` for the latest corrigendum,
    and a final `s` marks a historical (silver) copy. The two copies of 2025 and 2026 issues
    were served from a different directory of the CCSDS site and write the editorial amendment
    as `ec1`; whether that is a new convention is not stated in the available sources.

### Review cycle, status and binding force

The Blue Books carry a standard statement of intent, quoted here from the Space Packet Protocol.
Participation in CCSDS is voluntary and its
recommendations bind no agency. An agency that endorses one agrees to keep its own related
standards in accord with it and to tell the other members about them. Each Recommended Standard
is reviewed within five years of issue to decide whether it stays, changes or is retired; a new
issue does not make existing implementations non-compliant, although members are encouraged to
plan new work against the newer issue.[^spp-intent] Books are approved by the CCSDS Management
Council under the procedures of CCSDS A02.1-Y-4.[^spp-authority][^g4-authority] Retired books keep
their number with an `-S` suffix, for example the historical SLE Forward Space Packet book
912.3-B-3-S of September 2022.[^hb-ccsds2][^g4-refs]

## ECSS: standards, adoption notices, handbooks and drafts

The [ECSS page](../ecss/index.md) describes the ECSS system in full; this section covers what
is needed to read the version matrix.

| Element | Meaning | Example |
|---|---|---|
| `ECSS-E-` | Space engineering branch (the others are `M` management, `Q` product assurance, `U` sustainability, `I` industrialization, production and maintenance, and `S` for the system documents) | ECSS-E-ST-70-41C |
| `-50`, `-70` | Discipline within the branch: E-50 communications, E-70 ground systems and operations | ECSS-E-ST-50-04C, ECSS-E-ST-70-01C |
| `-ST-` | Standard (normative, numbered requirements) | ECSS-E-ST-50C Rev.2 |
| `-AS-` | Adoption notice: applies another body's standard (in E-50 a CCSDS book) "with the following modifications" | ECSS-E-AS-50-25C Rev.1 |
| `-HB-` | Handbook: informative, not part of the standards, which prevail in any conflict | ECSS-E-HB-50A |
| `-TM-` | Technical memorandum, listed with the handbooks and "made available" rather than published | ECSS-E-TM-10-20A (not in the library) |
| Letter after the number | Issue letter. For the standards in the library first issued before 2008 the sequence is A, then C, and issue B was "never issued"; those first issued later start directly at C: ECSS-E-ST-70-01C of 2010 (A and B "never issued") and the adoption notices of 2021, whose change logs call issue C the "First issue" | ECSS-E-70-41A, ECSS-E-ST-70-41C, ECSS-E-ST-70-01C, ECSS-E-AS-50-26C |
| `Rev.1`, `Rev.2` | Revision of an issue | ECSS-E-ST-50C Rev.2, ECSS-E-AS-50-21C Rev.2 |
| `DIR1` | Draft distributed for public review | ECSS-E-ST-70-41C Rev.1 DIR1 |

*Sources: the change logs, scopes and title pages of the documents listed, and the ECSS
Trees.*[^cl-50][^cl-50r2][^cl-pusc][^cl-7001][^hb-scope][^as25-req][^as25-cl][^as26-scope][^as21-cl][^dir-cover][^cl-7011][^trees-1][^trees-hb]

### Adoption notices in practice

An adoption notice is a short document that lists, clause by clause, what ECSS changes in a
CCSDS book; everything else applies unchanged.[^as25-ctx] ECSS-E-AS-50-25C Rev.1 (13 January
2023) adopts CCSDS 232.0-B-4 and, among other changes, makes the TC frame's Frame Error Control
Field mandatory instead of optional and keeps only the 1,017-octet maximum for the frame data
field.[^as25-req] ECSS-E-AS-50-26C (1 March 2021) adopts COP-1 (CCSDS 232.1-B-2) and adds an
"FDU aborted indication" that FARM-1 sets when it accepts a Type-BD frame but has no buffer for
it.[^as26-req] It notes that the CCSDS corrigendum published in the meantime does not affect the
adoption.[^as26-scope] The other four notices are summarised on the
[ECSS-E-ST-50C page](../ecss/e-st-50-communications.md#the-adoption-notices): for example
ECSS-E-AS-50-24C Rev.1 allows only one TC frame per CLTU and always decodes BCH in
single-error-correction mode, and ECSS-E-AS-50-23C Rev.1 forbids the AOS Replay Flag value '1'.[^as24-mod][^as23-mod]
Six notices together replace the three 2008 ECSS link standards:[^as-table][^as26-ctx]

| Superseded ECSS standard (31 July 2008) | Adoption notice | CCSDS book adopted (per ECSS-E-ST-50C Rev.1, 2021) | Latest revision in the library and the issue it adopts | Wiki page |
|---|---|---|---|---|
| [ECSS-E-ST-50-01C](../library/ecss-e-st-50-01c31july2008.md) TM synchronization and channel coding | ECSS-E-AS-50-21 | 131.0-B-3 (Sept. 2017) | -21C Rev.2 (5 Dec. 2024): 131.0-B-5 (Sept. 2023) | [TM coding](../ccsds/tm-coding.md) |
| [ECSS-E-ST-50-03C](../library/ecss-e-st-50-03c-31july2008.md) TM transfer frame protocol | ECSS-E-AS-50-22 | 132.0-B-2 (Sept. 2015) | -22C Rev.1 (13 Jan. 2023): 132.0-B-3 (Oct. 2021) | [TM SDLP](../ccsds/tm-sdlp.md) |
| (ECSS-E-ST-50-03 covered only the TM frame) | ECSS-E-AS-50-23 | 732.0-B-3 (Aug. 2016 per ECSS; Sept. 2015 per the CCSDS document control, see [AOS](../ccsds/aos.md)) | -23C Rev.1 (13 Jan. 2023): 732.0-B-4 (Oct. 2021) | [AOS](../ccsds/aos.md) |
| [ECSS-E-ST-50-04C](../library/ecss-e-st-50-04c31july2008.md) clauses 8 and 9 | ECSS-E-AS-50-24 | 231.0-B-3 (Sept. 2017) | -24C Rev.1 (13 Jan. 2023): 231.0-B-4 (July 2021) | [CLTU](../ccsds/tc-coding-cltu.md) |
| ECSS-E-ST-50-04C clauses 5 and 6 | ECSS-E-AS-50-25 | 232.0-B-3 (Sept. 2015) | -25C Rev.1 (13 Jan. 2023): 232.0-B-4 (Oct. 2021) | [TC SDLP](../ccsds/tc-sdlp.md) |
| ECSS-E-ST-50-04C clause 7 | ECSS-E-AS-50-26 | 232.1-B-2 (Sept. 2010) | -26C (1 March 2021): 232.1-B-2 (Sept. 2010) | [COP-1](../ccsds/cop-1.md) |

*Fourth column: the scope clause of each notice.*[^as-scopes]

The adoption notices themselves warn that the CCSDS book that applies is the one named in the
latest version of each notice.[^as25-ctx] ECSS-E-ST-50C Rev.2 (5 December 2024) took the logical
step of no longer naming any CCSDS issue in its own table, so that it need not be revised each time
CCSDS updates a book; only the notices are.[^cl-50r2] Two adopted issues have meanwhile been
superseded by CCSDS: the library holds 131.0-B-6 (April 2026) and 732.0-B-5 (October 2025), and
whether ECSS has revised -21 or -23 to follow them is not stated in the available
sources.[^dc-1316][^dc-7325] The pattern goes back further: before ECSS, ESA republished CCSDS books
in its PSS series with European options, and ECSS-E-ST-50-03C and -04C still carry annexes of
differences from ESA PSS-04-106 (the Packet Telemetry Standard of January 1988) and ESA PSS-04-107
(the Packet Telecommand Standard, issue 2, April 1992).[^hb-pss][^b-pss][^b-pss107]

## ISO adoption of CCSDS books

CCSDS describes its own process as producing recommendations that are "subsequently adopted by
the International Organization for Standardization (ISO) for use by any space
organization".[^sle-iso] The ECSS handbook adds that many CCSDS Recommended Standards are
published as ISO standards.[^hb-ccsds] This wiki's library holds the CCSDS editions only. The ISO
numbers that correspond to the books on this page, and which CCSDS issue each ISO edition
reproduces, are not stated in the available sources. The traffic also runs the other way into
ECSS: the ECSS Trees list adoption notices of ISO and IEC standards outside the E-50 discipline,
such as ECSS-E-AS-11C (ISO 16290, technology readiness levels), ECSS-U-AS-10C Rev.2 (ISO 24113,
space debris mitigation) and ECSS-Q-ST-40-12C (fault tree analysis, an adoption of IEC
61025).[^trees-e][^trees-u][^trees-q]

## ESA and ESOC documents

### The withdrawn ESA PSS series

ESA's PSS documents adapted CCSDS books to European missions by including or excluding options,
and all of them have been withdrawn in favour of ECSS standards or CCSDS
books.[^hb-pss] The four packet standards are now in the library as scans (their text is OCR and is
not quoted here); they also survive in the reference lists of later documents:

| PSS document | Title and issue | Prepared by | Cited by |
|---|---|---|---|
| [ESA PSS-04-106](../library/esa-pss-04-106-issue1-january1988.md) | Packet Telemetry Standard, issue 1, January 1988; derived from CCSDS 102.0-B-2 (January 1987), superseding an ESA document TTC-A-06 of February 1986 | Standards Approval Board (STAB) for Space Data Communications | TDRS ICD; ECSS-E-ST-50-03C Annex B; PSS-04-107[^pss106-cr][^tdrs-refs][^b-pss][^pss107-refs] |
| [ESA PSS-04-107](../library/esa-pss-04-107-issue2-april1992.md) | Packet Telecommand Standard, issue 2, April 1992 (issue 1 of June 1990, derived from the CCSDS Telecommand recommendations; issue 2 only editorial) | STAB | Herschel/Planck operations interface requirements; SCOS-2000 Database Import ICD 5.1 to 7.0 (printed "PSS-074-107"); ECSS-E-ST-50-04C Annex B[^pss107-cr][^hp-ad][^icd-rd][^icd-rd-old][^b-pss107] |
| [ESA PSS-04-151](../library/esa-pss-04-151-issue1-september1992.md) | Telecommand Decoder Specification, issue 1, September 1992 | STAB | PSS-04-107 (as "to be issued in 1991/92"); ECSS-E-HB-50A, which notes that ECSS has no equivalent; the bibliography of ECSS-E-ST-70-41C, which dates it "September 1993"[^pss-covers][^pss107-refs][^hb-decoder][^pusc-bib] |
| [ESA PSS-07-101](../library/esa-pss-07-101-issue1-may1994.md) | Packet Utilisation Standard, issue 1, May 1994 | Committee for Operations and EGSE Standards (COES) | PSS-04-107 (as "to be issued in 1991/92"); SCOS-2000 Database Import ICD 5.1 to 7.0; ECSS-E-ST-70-41C, which calls it PUS version 0 and lists it in its bibliography[^pss-covers][^pss107-refs][^icd-rd][^icd-rd-old][^pusc-tmsh][^pusc-bib] |
| ESA PSS-05 | ESA Software Engineering Standard, issue 2, February 1991 (not in the library) | not stated | TDRS ICD[^tdrs-refs] |

The PSS reference lists name further members of the series that the library does not hold: the
Telemetry Channel Coding Standard PSS-04-103, the Radio Frequency and Modulation Standard
PSS-04-105 and the Time Code Formats and Procedures Standard PSS-04-202.[^pss106-refs][^pss107-refs]
The copy of PSS-04-106, although its cover and change record say January 1988, lists PSS-04-103
and PSS-04-105 as issue 1 of 1989; whether it is a later reprint is not stated in the available
sources.[^pss106-refs][^pss106-cr]
How the PSS standards defined the packets and frames, and how they map onto today's books, is on
the [history](history.md) page.

### ESOC infrastructure documents

ESOC's ground software is documented under structured references. The covers give the
reference, the issue or version and the date, and usually the responsible ESOC unit.

| Reference pattern | Examples in the library | Unit on the cover |
|---|---|---|
| `S2K-MCS-<type>-<nnnn>-TOS-<unit>` | S2K-MCS-ICD-0001-TOS-GCI, Database Import ICD issue 5.1, 26 October 2001; S2K-MCS-SRD-0004-TOS-GIC (TDRS requirements) and S2K-MCS-GLO-0001-TOS-GIC (glossary), cited | ESA/TOS-GCI[^icd51-cover][^tdrs-refs] |
| `EGOS-MCS-S2K-<type>-<nnnn>` | EGOS-MCS-S2K-ICD-0001 (Database Import ICD 6.7 Draft A, 6.9, 7.0); EGOS-MCS-S2K-ICD-0017 (TDRS external interfaces); EGOS-MCS-S2K-TN-1030 (time correlation); EGOS-MCS-S2K-ICD-1005 (RAPID ICD, cited) | ESA/OPS-GIC; ESA/OPS-GDI on the 2018 note[^icd70-cover][^tdrs-cover][^tco-cover][^ddid-refs] |
| `EGOS-GEN-EDDS-<type>-<nnnn>` | SDD-1001, SRS-1001, SUM-1001, ICD-1001 (the EUICD), CIG-1001, EUG-1001, GLO-0001 | OPS-GI (Directorate of Operations and Infrastructure); HSO-GI (Directorate of Human Spaceflight and Operations) on the covers of EUICD 7.0 (December 2014) and glossary 7.0 (April 2017)[^sdd-cover][^euicd7-cover][^euicd13-cover][^glo-cover] |
| `EGOS-MDW-EDDS-<type>-<nnnn>` | Alternative references to EDDS documents: the issue 1 SDD of 2007 and the EUICD in the SRS 18.0 reference lists, the SRS in the Solar Orbiter DDID | cited only[^srs-refs][^ddid-refs] |
| `EGOS-NIS-<item>-ICD-<nnnn>` | EGOS-NIS-NCTR-ICD-0002, NIS/NCTRS volume 2 MCS interface, issue 4.0.2 (November 2009); EGOS-NIS-NIS-ICD-0003, NIS throw events, issue 1.3 (November 2007) | cited only[^icd-rd] |
| `TYPE-NUMBER` short form | Inside SCOS-2000 documents: SRD-0003 (Monitoring SRD), ADD-0007 (Operations Language ADD), SUM-0018 (MIB Applications SUM), CG-0003 (configuration variables), GLO-0001 (glossary), CIDL-0001 (document control list) | —[^icd-ad] |

The document types are the usual software life-cycle set: ICD (interface control document), SRD
(software requirements document) and SRS (software requirements specification), ADD
(architectural design document) and SDD (software design document), SUM (software user manual),
CIG (configuration and installation guide), EUG (update guide), TN (technical note), GLO
(glossary) and SRN (software release note).[^icd-ad][^tdrs-refs][^sdd-cover][^srs-cover][^cig-cover][^eug-cover][^srn-cover] The applicable issue of each
SCOS-2000 document for a given software release is fixed by the SCOS-2000 document control
list.[^icd-ad]

!!! warning "Inference"
    The middle segments of the references (`MCS`, `GEN`, `MDW`, `NIS`, `S2K`, `EDDS`) look
    like a domain and a product code, and the unit codes track ESOC's organisation at the time
    of issue: `TOS` appears in 2001, when the SCOS-2000 team's department belonged to the ESA
    Directorate of Technical and Operational Support, and `OPS` and `HSO` appear later.[^bul108]
    The sources do not define the segments. The same EDDS documents are cited under both
    `EGOS-MDW-EDDS-...` and `EGOS-GEN-EDDS-...` references, and the Solar Orbiter DDID also
    names the EUICD as `MDS-MCS-SW-ICD-1001-OPS-GD`.[^ddid-refs][^srs-refs]

### Mission documents and MIB deliveries

| Kind | Reference | Issue and date | Issued by (as printed) |
|---|---|---|---|
| Data delivery interface document | RO-ESC-IF-5003 / MEX-ESC-IF-5003 | Issue B5, 2003-03-27 | Rosetta/Mars Express MCS[^roddid-b5] |
| Data delivery interface document | RO-ESC-IF-5003 / MEX-ESC-IF-5003 / VEX-ESC-IF-5003 | Issue C2, 2006-02-21 | Rosetta/Mars Express/Venus Express MCS[^roddid-c2] |
| Flight dynamics interface | RO-ESC-ID-5003 (FDS ICD) | Issue B1, 2003-03-07 | ESA/ESOC[^fds-cover] |
| Data delivery interface document | SOL-ESC-IF-05011 (Solar Orbiter DDID) | Issue 1, revision 2, 2019-06-26 | ESA[^ddid-cover] |
| Science ground segment ICD | SOL-SGS-ICD-0006 (E-FECS ICD) | Issue 3, revision 0, 2021-10-05 | ESAC[^efecs-cover] |
| Science ground segment note | SOL-SGS-TN-0007 (services 3 and 20) | Issue 2, revision 0, 2016-10-07 | ESAC[^s20-cover] |
| Industrial packet ICD | SOL.S.ASTR.TN.00079 (TM-TC and packet structure ICD) | Issue 7; the handwritten approval dates are not legible in the extracted text, and the cover copyright line reads 2014 | Airbus Defence and Space Ltd (Stevenage)[^solo-cover] |
| Ground station interface | /MakaluMedia/MR/IFMS/ICD/FTP-OCC (IFMS-OCC ICD) | Issue 11.4.0, 2006-08-09 | MakaluMedia Internet & Engineering Services GmbH, Darmstadt, with an ESOC approval signature[^ifms-cover] |
| MIB delivery | MIB__20250916M25925PFMS001_SOL | `vdf`: name `25925PFM`, comment `20250916-CSW3.1.2_MAS7.33`, release 25925, issue 733 | Solar Orbiter[^mib25] |
| MIB delivery | MIB__20200416M10720PFMS001_SOL | `vdf`: name `10720PFM`, comment `20200416-CSW3.0.3p1_MAS6.51`, release 10720, issue 651 | Solar Orbiter[^mib20] |
| Experiment interface document | SOL-EST-IF-0050 (Solar Orbiter EID-A) | Issue 1, revision 0, 2007-10-09 | Solar Orbiter Team, ESTEC[^eida-cover] |
| Instrument communications ICD | SO-SWA-DPU-CD-IC-003 (SWA DPU Communications ICD) | Issue 8.2, 2019-08-07 | SWA DPU team[^swaicd-cover] |
| Instrument databases | SWA IDB (files `ASCII.zip`, version 6.3.4, and `SWA_IDB_v6.5.0.zip`); STIX IDB v2.26.38 | STIX `vdf`: name `STX_226`, comment `PFM_applicable`, release 2, issue 26 | Posted by the SWA/PAS team at IRAP and on a separate STIX server; see [SWA](../missions/solar-orbiter/swa.md), [STIX](../missions/solar-orbiter/stix.md)[^idb-src] |
| Packet structure ICD | SCI-PT-ICD-07527 (Herschel/Planck PS-ICD) | Issue 6.0, 2008-01-25 | Herschel/Planck project[^psicd-cover] |
| Space/ground ICD | SCI-PT-ICD-07418 (Herschel/Planck SGICD) | Issue 3.2, 2004-12-01 | Herschel/Planck project[^sgicd-cover] |
| Further Herschel/Planck interface documents | Fourteen more, from the CDMU front-end services note to the HPSDB manuals, the HIFI ICDs and two FOP procedures | 2001 to 2011 | Listed with their references and issues on [Herschel/Planck interface documents](../scos2000/herschel-planck-interfaces.md#the-document-set) |

!!! warning "Inference"
    The MIB file names appear to combine the delivery date, an `M` plus the `VDF_RELEASE`
    number, `PFM` for the proto-flight model (an expansion found in a Herschel/Planck
    document[^pfm]) and a mission code. `CSW` and `MAS` in the comment field look like
    on-board software and database version labels. None of this is defined in the available
    sources. ESOC-issued mission documents carry `ESC` in the reference, industrial ones the
    contractor's code (`ASTR`), but no source defines these codes either.

??? example "SQL used"
    ```sql
    -- solo-2025-09-16.sqlite and solo-2020-04-16.sqlite
    SELECT VDF_NAME, VDF_COMMENT, VDF_DOMAIN, VDF_RELEASE, VDF_ISSUE FROM vdf;
    ```

## PUS-A, PUS-C and the 2024 Rev.1 draft

The Packet Utilization Standard has three generations, and the version field in every PUS
packet header says which one a packet follows: 0 for ESA PSS-07-101, 1 for ECSS-E-70-41A,
2 for ECSS-E-ST-70-41C.[^pusc-tmsh][^pusc-tcsh]

```mermaid
timeline
  title The Packet Utilization Standard (dates from the documents)
  May 1994 : ESA PSS-07-101 issue 1 : PUS version 0
  30 Jan 2003 : ECSS-E-70-41A (PUS-A) : version 1
  Jan 2011 : 190 change requests define the issue C work
  Dec 2014 : 620 discrepancy reports from the 4-month public review of the issue C draft
  15 Apr 2016 : ECSS-E-ST-70-41C (PUS-C) : version 2
  11 Dec 2024 : ECSS-E-ST-70-41C Rev.1 DIR1 : public review to 28 Feb 2025
  Oct 2025 : ECSS Trees mark Rev.1 as an ongoing update
```

*Sources: the PSS-07-101 cover and ICD 7.0 references, the change logs of ECSS-E-ST-70-41C and its
Rev.1 draft, an ESA status presentation of 2015, and the ECSS Trees.*[^pss-covers][^icd-rd][^cl-pusc][^dir-cover][^valera][^trees-e]

| Aspect | PUS-A: ECSS-E-70-41A | PUS-C: ECSS-E-ST-70-41C | Rev.1 DIR1 (draft) |
|---|---|---|---|
| Date and status | 30 January 2003; superseded | 15 April 2016; current | 11 December 2024; public review 12 December 2024 to 28 February 2025; still an ongoing update in the ECSS Trees of October 2025; outcome not stated in the available sources |
| PUS version in headers | 1 | 2 | 2 |
| CCSDS references | Packet Telemetry 102.0-B-5; Telecommand Parts 1 to 3 (201.0-B-3, 202.0-B-3, 202.1-B-2, 203.0-B-2); Time Code Formats 301.0-B-2; CFDP Red Book 727.0-R-5 | Space Packet Protocol 133.0-B-1; Time Code Formats 301.0-B-4 | Space Packet Protocol 133.0-B-2; 301.0-B-4; CFDP 727.0-B-5 and Green Book 720.1-G-4 |
| TC secondary header | CCSDS secondary header flag (1 bit), version (3), Ack (4), service type (8), subtype (8), optional source ID of mission-defined size, spare | Version (4), Ack flags (4), service type (8), message subtype (8), source ID (16), optional spare | Same layout; the 16-bit field is named "source APID" |
| TM secondary header | Spare (1), version (3), spare (4), type (8), subtype (8), optional packet subcounter, destination ID and time, spare | Version (4), time reference status (4), type (8), subtype (8), message type counter (16), destination ID (16), time, optional spare | Same layout; "destination APID" |
| Standard services | 16 (types 1–6, 8, 9, 11–15, 17–19) | 20 (adds 20–23; 7, 10, 16 reserved) | Adds 24 file transfer, 25 file data storage, 26 parameter extraction, 27 critical packet log management; deletes 8 function management |
| Requirements | Requirements not individually named | Named requirements (ECSS drafting rules), the PUS foundation model, system and interface requirements separated | Configuration policy formalised as requirements; consistency with the foundation model |

*Sources for the rows: the normative references, header clauses, service tables and change
logs of the three documents; the ECSS Trees for the status of Rev.1.*[^pusa-refs][^pusc-refs][^dir-refs][^pusa-tc][^pusa-tm][^pusc-tcsh][^pusc-tmsh][^dir-hdr][^pusa-svc][^pusc-types][^cl-pusc][^dir-cl][^trees-e]

Solar Orbiter applies PUS-A: ECSS-E-70-41A is the first applicable document of its TM/TC ICD, and the PUS version field is set to 1 in both directions. The public
MIB shows the same thing from the ground side: its standard TC header template `NOM_TC` fixes the
PUS version field to 1.[^solo-docs][^solo-pus][^mib25] The
[PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md) page compares the two issues service by service,
and [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md) shows the tailoring.

## Version matrix

"Status" below is the status the copy gives itself in its document control or change log at the
time it was copied. Where the library also holds a later edition (CCSDS 131.0, CCSDS 732.0,
ECSS-E-ST-50C), the older row says so. Otherwise, whether a publisher has issued a newer edition
since the copy was taken is not stated in the available sources; the copy date is in the last column
and on each library page.[^copies] The matrix lists every CCSDS, ECSS and ESA PSS standard in the
library; papers and presentations that the registry files with them are listed
[at the end](#other-documents-filed-with-the-standards).

### CCSDS

| Topic | Document | Issue held | Later amendments in the copy | Status | Library | Wiki page | Copied (UTC) |
|---|---|---|---|---|---|---|---|
| Protocol overview | CCSDS 130.0-G-4 | Green, Apr. 2023 | EC 1, Feb. 2024 | Current issue | [copy](../library/ccsds-130-0-130x0g4e1.md) | [CCSDS stack](../ccsds/index.md) | 2026-11-12 14:10 |
| TM coding rationale | CCSDS 130.1-G-3 | Green, June 2020 | EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-130-1-130x1g3e1.md) | [TM coding](../ccsds/tm-coding.md) | 2026-11-12 14:10 |
| Data link rationale | CCSDS 130.2-G-3 | Green, Sept. 2015 | none | Current issue | [copy](../library/ccsds-130-2-130x2g3.md) | [CCSDS stack](../ccsds/index.md) | 2026-11-12 14:10 |
| Space packet protocols report | CCSDS 130.3-G-1 | Green, Apr. 2023 | none | Original issue | [copy](../library/ccsds-130-3-130x3g1.md) | [Space Packet](../ccsds/space-packet.md) | 2026-11-12 17:48 |
| TM sync and channel coding | CCSDS 131.0-B-5 | Blue, Sept. 2023 | none | Current issue in the copy; superseded by 131.0-B-6 | [copy](../library/ccsds-131-0-131x0b5.md) | [TM coding](../ccsds/tm-coding.md) | 2026-11-12 14:10 |
| TM sync and channel coding | CCSDS 131.0-B-6 | Blue, Apr. 2026 | Editorial Correction 1, May 2026 | Current issue | [copy](../library/ccsds-131-0-131x0b6ec1.md) | [TM coding](../ccsds/tm-coding.md) | 2026-11-12 17:48 |
| TM Space Data Link Protocol | CCSDS 132.0-B-3 | Blue, Oct. 2021 | none | Current issue | [copy](../library/ccsds-132-0-132x0b3.md) | [TM SDLP](../ccsds/tm-sdlp.md) | 2026-11-12 14:10 |
| Space Packet Protocol | CCSDS 133.0-B-2 | Blue, June 2020 | EC 1, Oct. 2020; EC 2, Sept. 2024 | Current issue | [copy](../library/ccsds-133-0-133x0b2e2.md) | [Space Packet](../ccsds/space-packet.md) | 2026-11-12 14:10 |
| Encapsulation Packet Protocol | CCSDS 133.1-B-3 | Blue, May 2020 | EC 1, Nov. 2020 | Current issue | [copy](../library/ccsds-133-1-133x1b3e1.md) | [Encapsulation](../ccsds/encapsulation.md) | 2026-11-12 14:10 |
| Space link identifiers | CCSDS 135.0-B-4 | Blue, Oct. 2009 | none | "Current issue" in its document control; the copy is stamped Historical | [copy](../library/ccsds-135-0-135x0b4s.md) | [Space link identifiers](../ccsds/space-link-identifiers.md) | 2026-11-12 17:52 |
| Proximity-1 data link layer | CCSDS 211.0-B-6 | Blue, July 2020 | EC 1, Sept. 2024 | Current issue | [copy](../library/ccsds-211-0-211x0b6e1.md) | [Proximity-1](../ccsds/proximity-1.md) | 2026-11-12 17:52 |
| TC coding rationale | CCSDS 230.1-G-3 | Green, Oct. 2021 | EC 1, Jan. 2023 | Current issue | [copy](../library/ccsds-230-1-230x1g3e1.md) | [CLTU](../ccsds/tc-coding-cltu.md) | 2026-11-12 14:10 |
| TC sync and channel coding | CCSDS 231.0-B-4 | Blue, July 2021 | EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-231-0-231x0b4e1.md) | [CLTU](../ccsds/tc-coding-cltu.md) | 2026-11-12 14:10 |
| TC sync and channel coding | CCSDS 231.0-B-4 | Blue, July 2021 | EC 1, Oct. 2024; Cor. 1, July 2026 | Current issue | [copy with Cor. 1](../library/ccsds-231-0-231x0b4e1c1.md) | [CLTU](../ccsds/tc-coding-cltu.md) | 2026-11-12 17:48 |
| TC Space Data Link Protocol | CCSDS 232.0-B-4 | Blue, Oct. 2021 | Cor. 1, Oct. 2023; EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-232-0-232x0b4e1c1.md) | [TC SDLP](../ccsds/tc-sdlp.md) | 2026-11-12 14:10 |
| COP-1 | CCSDS 232.1-B-2 | Blue, Sept. 2010 | EC 1, Dec. 2018; EC 2 and Cor. 1, Apr. 2019 | Current issue | [copy](../library/ccsds-232-1-232x1b2e2c1.md) | [COP-1](../ccsds/cop-1.md) | 2026-11-12 14:10 |
| Time code formats | CCSDS 301.0-B-4 | Blue, Nov. 2010 | EC 1, Feb. 2014 | Current issue | [copy](../library/ccsds-301-0-301x0b4e1.md) | [Time codes](../ccsds/time-codes.md) | 2026-11-12 14:10 |
| Spacecraft identifier assignment | CCSDS 320.0-M-7 | Magenta, Nov. 2017 (issues 1 to 6 were Blue) | Cor. 1, July 2019 | Current issue | [copy](../library/ccsds-320-0-320x0m7c1.md) | [Space link identifiers](../ccsds/space-link-identifiers.md) | 2026-11-12 17:48 |
| Security of CCSDS protocols | CCSDS 350.0-G-3 | Green, Mar. 2019 | none | Current issue | [copy](../library/ccsds-350-0-350x0g3.md) | [Security](../ccsds/security.md) | 2026-11-12 17:52 |
| SDLS concept and rationale | CCSDS 350.5-G-2 | Green, Jan. 2024 | none | "Current draft" (as printed) | [copy](../library/ccsds-350-5-350x5g2.md) | [Security](../ccsds/security.md), [SDLS](../ccsds/sdls.md) | 2026-11-12 17:48 |
| Cryptographic algorithms | CCSDS 352.0-B-2 | Blue, Aug. 2019 | none | Current issue | [copy](../library/ccsds-352-0-352x0b2.md) | [Security](../ccsds/security.md) | 2026-11-12 17:52 |
| Space Data Link Security | CCSDS 355.0-B-2 | Blue, July 2022 | none | Current issue | [copy](../library/ccsds-355-0-355x0b2.md) | [SDLS](../ccsds/sdls.md) | 2026-11-12 14:10 |
| SDLS Extended Procedures | CCSDS 355.1-B-1 | Blue, Feb. 2020 | none | Original issue | [copy](../library/ccsds-355-1-355x1b1.md) | [Security](../ccsds/security.md) | 2026-11-12 17:48 |
| RF and modulation, Part 1 | CCSDS 401.0-B-32 | Blue, Oct. 2021 | none | "Current draft update"; issue 31 (Jan. 2021) is labelled "Current issue" | [copy](../library/ccsds-401-0-401x0b32.md) | [RF and ranging](../ccsds/rf-and-ranging.md) | 2026-11-12 17:48 |
| XTCE 1.2 | CCSDS 660.0-B-2 (OMG formal/18-10-04) | Blue, Feb. 2020 | none | Current issue | [copy](../library/ccsds-660-0-660x0b2.md) | [XTCE](../ccsds/xtce.md) | 2026-11-12 14:10 |
| XTCE element description | CCSDS 660.1-G-2 | Green, Aug. 2021 | none | Current issue | [copy](../library/ccsds-660-1-660x1g2.md) | [XTCE](../ccsds/xtce.md) | 2026-11-12 14:10 |
| XTCE report | CCSDS 660.2-G-2 | Green, Feb. 2021 | none | Current issue (issue 1 was numbered 660.0-G-1, July 2006) | [copy](../library/ccsds-660-2-660x2g2.md) | [XTCE](../ccsds/xtce.md) | 2026-11-12 17:48 |
| CFDP | CCSDS 727.0-B-5 | Blue, July 2020 | EC 1, Sept. 2024 | Current issue | [copy](../library/ccsds-727-0-727x0b5e1.md) | [CFDP](../ccsds/cfdp.md) | 2026-11-12 14:10 |
| AOS Space Data Link Protocol | CCSDS 732.0-B-4 | Blue, Oct. 2021 | none | Current issue in the copy; superseded by 732.0-B-5 | [copy](../library/ccsds-732-0-732x0b4.md) | [AOS](../ccsds/aos.md) | 2026-11-12 14:10 |
| AOS Space Data Link Protocol | CCSDS 732.0-B-5 | Blue, Oct. 2025 | EC 1, Oct. 2025 | Latest issue in its document control (no status label) | [copy](../library/ccsds-732-0-732x0b5ec1.md) | [AOS](../ccsds/aos.md) | 2026-11-12 17:48 |
| USLP | CCSDS 732.1-B-3 | Blue, June 2024 | EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-732-1-732x1b3e1.md) | [USLP](../ccsds/uslp.md) | 2026-11-12 14:10 |
| Service management concept | CCSDS 902.0-G-1 | Green, Sept. 2014 | none | Original issue | [copy](../library/ccsds-902-0-902x0g1.md) | [Service management](../ccsds/sle/service-management.md) | 2026-11-12 17:52 |
| Service package data formats | CCSDS 902.4-B-1 | Blue Book cover dated Sept. 2026 | none | "Current proposed draft" (Dec. 2025) | [copy](../library/ccsds-902-4-902x4b1.md) | [Service management](../ccsds/sle/service-management.md) | 2026-11-12 17:53 |
| SLE concept | CCSDS 910.3-G-3 | Green, Mar. 2006 | none | Current issue | [copy](../library/ccsds-910x3g3-sle-cross-support.md) | [SLE](../ccsds/sle/index.md), [service management](../ccsds/sle/service-management.md) | 2026-11-05 14:12 |
| Cross support reference model, SLE | CCSDS 910.4-B-2 | Blue, Oct. 2005 | EC 1, July 2007 | "Current Issue" in its document control; stamped Historical | [copy](../library/ccsds-910-4-910x4b2e1s.md) | [Service management](../ccsds/sle/service-management.md) | 2026-11-12 17:48 |
| SLE Return All Frames | CCSDS 911.1-B-5 | Blue, July 2023 | EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-911-1-911x1b5e1.md), [second copy](../library/ccsds-911x1b5e1-sle-raf.md) | [Return services](../ccsds/sle/return-services.md) | 2026-11-12 14:10; 2026-11-05 14:12 |
| SLE Return Channel Frames | CCSDS 911.2-B-4 | Blue, July 2023 | EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-911-2-911x2b4e1.md) | [Return services](../ccsds/sle/return-services.md) | 2026-11-12 14:10 |
| SLE Return Operational Control Fields | CCSDS 911.5-B-4 | Blue, July 2023 | EC 1, Oct. 2024 | "Current update" | [copy](../library/ccsds-911-5-911x5b4e1.md) | [Return services](../ccsds/sle/return-services.md) | 2026-11-12 14:10 |
| SLE Forward CLTU | CCSDS 912.1-B-5 | Blue, July 2023 | EC 1, Oct. 2024 | Current issue | [copy](../library/ccsds-912-1-912x1b5e1.md) | [FCLTU](../ccsds/sle/fcltu.md) | 2026-11-12 14:10 |
| SLE Forward Space Packet | CCSDS 912.3-B-3 | Blue, Aug. 2016 | none | "Current issue" in its document control; stamped Historical | [copy](../library/ccsds-912-3-912x3b3s.md) | [FSP](../ccsds/sle/fsp.md) | 2026-11-12 17:48 |
| SLE Internet Protocol (ISP1) | CCSDS 913.1-B-2 | Blue, Sept. 2015 | none | Current issue | [copy](../library/ccsds-913-1-913x1b2.md) | [ISP1 and API](../ccsds/sle/isp1-and-api.md) | 2026-11-12 14:10 |
| SLE API core | CCSDS 914.0-M-2 | Magenta, Sept. 2015 | Cor. 1, Aug. 2016 | Current issue | [copy](../library/ccsds-914-0-914x0m2c1.md) | [ISP1 and API](../ccsds/sle/isp1-and-api.md) | 2026-11-12 14:10 |
| SLE API, Return All Frames | CCSDS 915.1-M-2 | Magenta, Sept. 2015 | none | Current issue | [copy](../library/ccsds-915-1-915x1m2.md) | [ISP1 and API](../ccsds/sle/isp1-and-api.md) | 2026-11-12 17:49 |
| SLE API, Forward Space Packet | CCSDS 916.3-M-2 | Magenta, Sept. 2015 | none | Current issue | [copy](../library/ccsds-916-3-916x3m2.md) | [FSP](../ccsds/sle/fsp.md) | 2026-11-12 17:53 |
| CSTS Monitored Data | CCSDS 922.1-B-2 | Blue, Sept. 2022 | none | Current issue | [copy](../library/ccsds-922-1-922x1b2.md) | [Service management](../ccsds/sle/service-management.md) | 2026-11-12 17:53 |

*Issue, date and amendments from the cover and Document Control page of each copy; copy times
from this wiki's source registry.*[^dc-all][^dc-r2][^copies] The ROCF book's own table labels issue 3
"Current issue" and issue 4 "Current update"; similar labels ("Current draft", "Current draft
update", "Current proposed draft") appear in the newer copies and are reproduced as printed.[^dc-911][^dc-r2]
The three historical copies still call their own issue current in the document control table;
their historical status is shown by a cover note saying the document is no longer current and by a
"CCSDS Historical Document" line on the pages. CCSDS 130.0-G-4 already cites the Forward Space
Packet book as 912.3-B-3-S of September 2022.[^hist-covers][^g4-refs]

### OMG

| Topic | Document | Issue held | Status | Library | Wiki page | Copied (UTC) |
|---|---|---|---|---|---|---|
| XTCE 1.3 | OMG formal/26-06-09, XML Telemetric and Command Exchange | Version 1.3, March 2026 | OMG specification; XTCE 1.2 is the version republished by CCSDS as 660.0-B-2 | [copy](../library/omg-xtce-1-3-specification.md) | [XTCE](../ccsds/xtce.md) | 2026-11-12 17:48 |

*Version, document number and date from the cover; XTCE 1.2 from the CCSDS 660.0-B-2 title
pages.*[^xtce13][^xtce-omg][^copies]

### ECSS

| Topic | Document | Issue held | Status | Library | Wiki page | Copied (UTC) |
|---|---|---|---|---|---|---|
| Communications | ECSS-E-ST-50C Rev.2 | 5 December 2024 | Second issue, revision 2; published (Trees, May 2025) | [copy](../library/ecss-e-st-50c-rev-2-5december2024.md) | [E-ST-50](../ecss/e-st-50-communications.md#what-rev2-changed) | 2026-11-12 17:48 |
| Communications | ECSS-E-ST-50C Rev.1 | 1 March 2021 | Second issue, revision 1; superseded by Rev.2 | [copy](../library/ecss-e-st-50c-rev-1-1march2021.md) | [E-ST-50](../ecss/e-st-50-communications.md) | 2026-11-12 14:11 |
| TM synchronization and channel coding | ECSS-E-ST-50-01C | 31 July 2008 | Second issue; superseded by ECSS-E-AS-50-21 | [copy](../library/ecss-e-st-50-01c31july2008.md) | [TM coding](../ccsds/tm-coding.md) | 2026-11-12 17:49 |
| Ranging and Doppler tracking | ECSS-E-ST-50-02C | 31 July 2008 | Second issue; published (Trees, May 2025) | [copy](../library/ecss-e-st-50-02c31july2008.md) | [RF and ranging](../ccsds/rf-and-ranging.md) | 2026-11-12 17:53 |
| TM transfer frame | ECSS-E-ST-50-03C | 31 July 2008 | Superseded by ECSS-E-AS-50-22 and -23 | [copy](../library/ecss-e-st-50-03c-31july2008.md) | [E-ST-50](../ecss/e-st-50-communications.md) | 2026-11-12 14:11 |
| TC protocols, synchronization and coding | ECSS-E-ST-50-04C | 31 July 2008 | Second issue; superseded by ECSS-E-AS-50-24, -25 and -26 | [copy](../library/ecss-e-st-50-04c31july2008.md) | [E-ST-50](../ecss/e-st-50-communications.md#the-superseded-telecommand-standard-ecss-e-st-50-04c) | 2026-11-12 17:47 |
| Radio frequency and modulation | ECSS-E-ST-50-05C Rev.2 | 4 October 2011 | Second issue, revision 2; published (Trees, May 2025) | [copy](../library/ecss-e-st-50-05c-rev24october2011.md) | [RF and ranging](../ccsds/rf-and-ranging.md) | 2026-11-12 17:52 |
| TM coding adoption | ECSS-E-AS-50-21C Rev.2 | 5 December 2024 (adopts 131.0-B-5) | First issue, revision 2 | [copy](../library/ecss-e-as-50-21c-rev-2-5december2024.md) | [TM coding](../ccsds/tm-coding.md) | 2026-11-12 17:52 |
| TM data link adoption | ECSS-E-AS-50-22C Rev.1 | 13 January 2023 (adopts 132.0-B-3) | First issue, revision 1 | [copy](../library/ecss-e-as-50-22c-rev-1-13january2023.md) | [TM SDLP](../ccsds/tm-sdlp.md) | 2026-11-12 17:52 |
| AOS data link adoption | ECSS-E-AS-50-23C Rev.1 | 13 January 2023 (adopts 732.0-B-4) | First issue, revision 1 | [copy](../library/ecss-e-as-50-23c-rev-1-13january2023.md) | [AOS](../ccsds/aos.md) | 2026-11-12 17:52 |
| TC coding adoption | ECSS-E-AS-50-24C Rev.1 | 13 January 2023 (adopts 231.0-B-4) | First issue, revision 1 | [copy](../library/ecss-e-as-50-24c-rev-1-13january2023.md) | [CLTU](../ccsds/tc-coding-cltu.md) | 2026-11-12 17:52 |
| TC data link adoption | ECSS-E-AS-50-25C Rev.1 | 13 January 2023 (adopts 232.0-B-4) | First issue, revision 1 | [copy](../library/ecss-e-as-50-25c-rev-1-13january2023.md) | [TC SDLP](../ccsds/tc-sdlp.md) | 2026-11-12 14:11 |
| COP-1 adoption | ECSS-E-AS-50-26C | 1 March 2021 (adopts 232.1-B-2) | First issue | [copy](../library/ecss-e-as-50-26c-1march2021.md) | [COP-1](../ccsds/cop-1.md) | 2026-11-12 14:11 |
| Communications guidelines | ECSS-E-HB-50A | 15 November 2008 | Handbook (informative); published (Trees, Nov. 2024) | [copy](../library/ecss-e-hb-50a-15november2008.md) | [E-ST-50](../ecss/e-st-50-communications.md) | 2026-11-12 14:11 |
| Ground systems and operations | ECSS-E-ST-70C | 31 July 2008 | Issue C, merging ECSS-E-70 Parts 1A (25 April 2000) and 2A (2 April 2001); B never issued; published (Trees, Oct. 2025) | [copy](../library/ecss-e-st-70c31july2008.md) | [E-ST-70C](../ecss/e-st-70c.md) | 2026-11-12 17:48 |
| On-board control procedures | ECSS-E-ST-70-01C | 16 April 2010 | First issue (A and B never issued) | [copy](../library/ecss-e-st-70-01c16april2010.md) | [E-ST-70-01C](../ecss/e-st-70-01c.md) | 2026-11-12 17:48 |
| Space segment operability | ECSS-E-ST-70-11C Rev.1 | 15 October 2025 | Second issue, revision 1 | [copy](../library/ecss-e-st-70-11c-rev-1-15october2025.md) | [E-ST-70-11C](../ecss/e-st-70-11c.md) | 2026-11-12 14:11 |
| M&C data definition | ECSS-E-ST-70-31C | 31 July 2008 | Issue C; ECSS-E-70-31A (9 Oct. 2007) was the first issue, B never issued | [copy](../library/ecss-e-st-70-31c.md) | [E-ST-70-31C](../ecss/e-st-70-31c.md) | 2026-11-05 14:20 |
| Test and operations procedure language | ECSS-E-ST-70-32C | 31 July 2008 | Second issue (editorial changes); ECSS-E-70-32A (24 April 2006) was the first, B never issued | [copy](../library/ecss-e-st-70-32c31july2008.md) | [E-ST-70-32C](../ecss/e-st-70-32c.md) | 2026-11-12 17:48 |
| PUS-A | ECSS-E-70-41A | 30 January 2003 | First issue; superseded by issue C | [copy](../library/ecss-e-70-41a-30jan2003-pus.md) | [PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md) | 2026-11-12 14:11 |
| PUS-C | ECSS-E-ST-70-41C | 15 April 2016 | Second issue; published (Trees, Oct. 2025) | [copy](../library/ecss-e-st-70-41c-15april2016.md) | [PUS](../ecss/pus/index.md) | 2026-11-12 14:11 |
| PUS Rev.1 draft | ECSS-E-ST-70-41C Rev.1 DIR1 | 11 December 2024 | Draft for public review (review period ending 28 Feb. 2025); Rev.1 marked as an ongoing update (Trees, Oct. 2025) | [copy](../library/ecss-e-st-70-41c-rev1-dir1.md) | [PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md) | 2026-11-05 14:12 |
| ECSS document map | ECSS Trees | November 2025 (charts dated June 2024 to November 2025) | Catalogue of ECSS documents and their status, not a standard | [copy](../library/ecss-trees-nov2025.md) | [ECSS](../ecss/index.md), [E-ST-70C](../ecss/e-st-70c.md) | 2026-11-12 17:53 |

*Status from the change log and title page of each copy, from the adoption table of
ECSS-E-ST-50C and from the ECSS Trees.*[^cl-50][^cl-50r2][^cl-5001][^cl-5002][^cl-5003][^cl-5004][^cl-5005][^as21-cl][^as24-cl][^as25-cl][^as26-scope][^hb-scope][^cl-7000][^cl-7001][^cl-7011][^cl-7031][^cl-7032][^cl-pusc][^dir-cover][^as-table][^trees-e][^trees-e50][^trees-hb][^trees-1]

### ESA PSS

| Topic | Document | Issue held | Status | Library | Wiki page | Copied (UTC) |
|---|---|---|---|---|---|---|
| Packet telemetry | ESA PSS-04-106 | Issue 1, January 1988 | Withdrawn; replaced in ECSS by ECSS-E-ST-50-03C, itself superseded | [copy](../library/esa-pss-04-106-issue1-january1988.md) | [History](history.md) | 2026-11-12 17:47 |
| Packet telecommand | ESA PSS-04-107 | Issue 2, April 1992 | Withdrawn; replaced in ECSS by ECSS-E-ST-50-04C, itself superseded | [copy](../library/esa-pss-04-107-issue2-april1992.md) | [History](history.md) | 2026-11-12 17:47 |
| Telecommand decoder | ESA PSS-04-151 | Issue 1, September 1992 | Withdrawn; no ECSS equivalent | [copy](../library/esa-pss-04-151-issue1-september1992.md) | [History](history.md) | 2026-11-12 17:49 |
| Packet utilisation | ESA PSS-07-101 | Issue 1, May 1994 | Withdrawn; PUS version 0, followed by ECSS-E-70-41A | [copy](../library/esa-pss-07-101-issue1-may1994.md) | [History](history.md), [PUS](../ecss/pus/index.md) | 2026-11-12 17:47 |

*Issues and dates from the scanned covers; withdrawal from the ECSS handbook; successors from the
annexes of the 2008 ECSS standards, the handbook and ECSS-E-ST-70-41C.*[^pss-covers][^hb-pss][^b-pss][^b-pss107][^hb-decoder][^pusc-tmsh]

### ESA and ESOC

| Topic | Reference | Issue held | Status in the library | Library | Wiki page | Copied (UTC) |
|---|---|---|---|---|---|---|
| MIB import ICD | S2K-MCS-ICD-0001-TOS-GCI | 5.1, 26 Oct. 2001 | Superseded by later issues | [copy](../library/icd-5-1-tos-gci.md) | [ICD history](../mib/icd-history.md) | 2026-11-05 13:54 |
| MIB import ICD | EGOS-MCS-S2K-ICD-0001 | 6.7 Draft A, 2009-12-01 | Superseded | [copy](../library/icd-6-7-drafta.md) | [ICD history](../mib/icd-history.md) | 2026-11-05 13:53 |
| MIB import ICD | EGOS-MCS-S2K-ICD-0001 | 6.9, 2010-07-06 | Superseded | [copy](../library/icd-6-9-archive-org.md) | [ICD history](../mib/icd-history.md) | 2026-11-05 13:53 |
| MIB import ICD | EGOS-MCS-S2K-ICD-0001 | 7.0 FINAL, 2017-08-11 | Latest issue in the library | [copy](../library/icd-7-0-final.md) | [MIB](../mib/index.md) | 2026-11-05 13:53 |
| TDRS external interfaces | EGOS-MCS-S2K-ICD-0017 | 5.1, 22 Aug. 2008 | Only issue in the library | [copy](../library/icd-0017-tdrs-5-1.md) | [TDRS](../scos2000/tdrs.md) | 2026-11-05 13:54 |
| Time correlation | EGOS-MCS-S2K-TN-1030 | 1.0, 2018-10-31 | Only issue in the library | [copy](../library/tn-1030-time-correlation.md) | [Time correlation](../scos2000/time-correlation.md) | 2026-11-05 13:54 |
| EDDS design | EGOS-GEN-EDDS-SDD-1001 | 15.0 (2018-02-16); 25.0 (2025-03-07) | 25.0 is the later | [15.0](../library/sdd.md), [25.0](../library/sdd-v24.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:00; 14:01 |
| EDDS requirements | EGOS-GEN-EDDS-SRS-1001 | 18.0, 2018-02-16 | Only issue in the library | [copy](../library/srs.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:02 |
| EDDS user manual | EGOS-GEN-EDDS-SUM-1001 | 14.0 (2018-02-16); 22.0 (2025-01-10) | 22.0 is the later | [14.0](../library/sum.md), [22.0](../library/sum-v22.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:05; 14:07 |
| EDDS external user ICD | EGOS-GEN-EDDS-ICD-1001 | 7.0 (2014-12-17); 13.0 (2017-05-05); 15.0 (2018-02-16); 24.0 (2025-01-10) | 24.0 is the latest in the library | [7.0](../library/euicd-unversioned.md), [13.0](../library/euicd-v13.md), [15.0](../library/euicd-i15r0.md), [24.0](../library/euicd-v25.md) | [EDDS formats](../scos2000/edds-formats.md) | 2026-11-05 14:19; 13:56; 13:57; 13:59 |
| EDDS installation guide | EGOS-GEN-EDDS-CIG-1001 | 14.0 (2018-02-16); 25.0 (2025-03-07) | 25.0 is the later | [14.0](../library/cig-i14r0.md), [25.0](../library/cig-v24.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:09; 14:10 |
| EDDS update guide | EGOS-GEN-EDDS-EUG-1001 | 12.0, 2018-02-16 | Only issue in the library | [copy](../library/eug.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:10 |
| EDDS glossary | EGOS-GEN-EDDS-GLO-0001 | 7.0, 2017-04-10 | Only issue in the library | [copy](../library/glo.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:03 |
| EDDS release note | Software Release Note | 14.0, 2018-02-16 | Only issue in the library | [copy](../library/srn.md) | [EDDS](../scos2000/edds.md) | 2026-11-05 14:10 |

*Issues and dates from the title pages; copy times from the source
registry.*[^icd51-cover][^icd67-cover][^icd69-cover][^icd70-cover][^tdrs-cover][^tco-cover][^sdd-cover][^sdd25-cover][^srs-cover][^sum-cover][^sum22-cover][^euicd7-cover][^euicd13-cover][^euicd15-cover][^euicd24-cover][^cig-cover][^cig25-cover][^eug-cover][^glo-cover][^srn-cover][^copies]

!!! note "Library names versus issue numbers"
    Some library slugs come from the file names on the hosting site and do not match the
    issue printed inside: `euicd-v25` holds EUICD version 24.0, and `sdd-v24` and `cig-v24`
    hold version 25.0 of the SDD and CIG.[^euicd24-cover][^sdd25-cover][^cig25-cover] Always cite
    the issue on the title page.

The mission documents (Solar Orbiter, Rosetta, Mars Express, Venus Express) and the two Solar
Orbiter MIB releases are listed with their issues [above](#mission-documents-and-mib-deliveries);
their copy dates are on their library pages and in the
[reference catalogue](../references/index.md).

### Other documents filed with the standards

The source registry files a few papers and presentations in its CCSDS and ECSS categories. They
are not standards, but they document how the standards were made and used:

| Document | Date as printed | What it is | Library | Wiki page |
|---|---|---|---|---|
| S. Valera et al., "The ECSS-E-ST-70-41C", SAVOIR On-board Mass Memory Day | 13 February 2014 | ESA presentation of the February 2014 working-group draft of PUS-C | [copy](../library/valera-2014-ecss-e-st-70-41c-status.md) | [PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md) |
| S. Valera, "The ECSS-E-ST-70-41", ADCSS-2015 | 22 October 2015 | ESA status presentation of the issue C review | [copy](../library/valera-2015-adcss-ecss-e-st-70-41c-status.md) | [PUS](../ecss/pus/index.md) |
| "Deployment of the PUS-C Standard in Projects supported by an Automatic Generation Toolset", final presentation (SPACEBEL) | 15 May 2020 | Industrial study of PUS-C tooling | [copy](../library/presentation-deployment-of-the-pus-c-standard.md) | [PUS](../ecss/pus/index.md) |
| I. Clerigo, "Generic Operations Interface Requirements Document (GOIRD)", 13th ADCSS workshop | 12 November 2019 | ESA presentation of generic operations interface requirements | [copy](../library/15-05-generic-oird.md) | [PUS](../ecss/pus/index.md) |
| J.-F. Kaufeler, "The ESA standard for telemetry & telecommand packet utilisation P.U.S." (NASA NTRS, N95-17595) | not printed in the extracted text | Early paper on the ESA PUS, citing PSS-07-101 issue 1 of May 1994 | [copy](../library/ntrs-19950011180-esa-pus-paper.md) | [History](history.md) |
| K. Rice and B. Kizzort, "XTCE Tutorial, XTCE Version 1.1" (NASA) | 23 March 2008 | Tutorial on XTCE 1.1 | [copy](../library/ntrs-20090017706-xtce-tutorial.md) | [XTCE](../ccsds/xtce.md) |

*Titles and dates from the first page of each document.*[^other-covers]

## How the documents cite each other

Because each family revises on its own schedule, a citing document often names an older edition
than the one in this library. The table records the editions named in the references of the
documents held here.

| Citing document | Edition it names | Edition in this library |
|---|---|---|
| ESA PSS-04-106 (1988) | CCSDS Packet Telemetry 102.0-B-2, Telemetry Channel Coding 101.0-B-2 and Time Code Formats 301.0-B-1, all of January 1987; PSS-04-107 issue 1 "to be issued in 1990" | 133.0-B-2, 132.0-B-3, 131.0-B-5 and -B-6, 301.0-B-4; PSS-04-107 issue 2[^pss106-refs] |
| ESA PSS-04-107 issue 2 (1992) | CCSDS Telecommand Green Book 200.0-G-6 and the Telecommand Parts 1 to 3 Blue Books of January 1987; PSS-07-101 and PSS-04-151 as "to be issued in 1991/92" | 232.0-B-4, 232.1-B-2, 231.0-B-4; PSS-04-151 (Sept. 1992), PSS-07-101 (May 1994)[^pss107-refs][^pss-covers] |
| ECSS-E-70-41A (2003) | CCSDS 102.0-B-5 Packet Telemetry, 201.0 to 203.0 Telecommand, 301.0-B-2 (1990), 727.0-R-5 (draft) | Packet Telemetry and Telecommand were later restructured into the Space Packet Protocol, the TM/TC/AOS data link protocols and the TM/TC coding books, held here as 133.0-B-2, 132.0-B-3, 232.0-B-4, 131.0-B-5 and 231.0-B-4; also 301.0-B-4, 727.0-B-5[^pusa-refs][^g4-history] |
| ECSS-E-ST-70-41C (2016) | CCSDS 133.0-B-1 (Sept. 2003), 301.0-B-4 (Nov. 2010) | 133.0-B-2, 301.0-B-4[^pusc-refs] |
| ECSS-E-ST-70-41C Rev.1 DIR1 (2024) | CCSDS 133.0-B-2, 301.0-B-4, 727.0-B-5, 720.1-G-4 | 133.0-B-2, 301.0-B-4, 727.0-B-5[^dir-refs] |
| ECSS-E-ST-50-03C (2008) | CCSDS 132.0-B-1 | 132.0-B-3[^b-pss] |
| ECSS-E-ST-50-04C (2008) | CCSDS 231.0-B-1, 232.0-B-1, 232.1-B-1 (Annex C); ESA PSS-04-107 issue 2 (Annex B) | 231.0-B-4, 232.0-B-4, 232.1-B-2; PSS-04-107 issue 2[^5004-c][^b-pss107] |
| ECSS-E-ST-50-05C Rev.2 (2011) | CCSDS 401.0-B-20 (April 2009) | 401.0-B-32 (October 2021)[^cl-5005][^dc-401] |
| ECSS-E-ST-50C Rev.1 (2021) | Adoption notices based on 131.0-B-3, 132.0-B-2, 732.0-B-3, 231.0-B-3, 232.0-B-3, 232.1-B-2 | 131.0-B-5 and -B-6, 132.0-B-3, 732.0-B-4 and -B-5, 231.0-B-4, 232.0-B-4, 232.1-B-2[^as-table] |
| ECSS-E-ST-50C Rev.2 (2024) | Adoption notices named without CCSDS issue | as above[^cl-50r2] |
| ECSS-E-AS-50-21C Rev.2 (2024) and -23C Rev.1 (2023) | CCSDS 131.0-B-5 (Sept. 2023) and 732.0-B-4 (Oct. 2021) | Also the newer 131.0-B-6 (April 2026) and 732.0-B-5 (October 2025)[^as-scopes][^dc-1316][^dc-7325] |
| CCSDS 910.3-G-3 (2006) | 132.0-B-1, 131.0-B-1, 732.0-B-1, 231.0-B-1, 232.0-B-1, 133.0-B-1; SLE books of 2004 | the 2015–2024 issues[^sle-refs] |
| CCSDS 130.0-G-4 (2023) | 131.0-B-4 (2022), 231.0-B-3 (2017, although 231.0-B-4 dates from July 2021), 911.1-B-4 and 912.1-B-4 (2016), 732.1-B-2 (2021) | 131.0-B-5, 231.0-B-4, 911.1-B-5, 912.1-B-5, 732.1-B-3[^g4-refs][^dc-231] |
| SCOS-2000 Database Import ICD 7.0 (2017) | ESA PSS-07-101 (1994), CCSDS 301.0-B-2 (1990), ESA Packet Telecommand Standard (1992), and ECSS-E-70-41A with a note that ECSS-E-ST-70-41C will replace it | PUS-C, 301.0-B-4[^icd-rd] |
| Solar Orbiter TM-TC ICD, issue 7 | ECSS-E-70-41A (applicable); ECSS-E-ST-50-03C and ECSS-E-ST-50-04C (reference) | PUS-C; adoption notices[^solo-docs] |

One consequence is visible in the Space Packet itself. PUS-A, written against CCSDS 102.0-B-5,
reserves APID 0 for the time packet and all ones for idle packets; Solar Orbiter's ICD repeats
both reservations. CCSDS 133.0-B-2 notes that the only reserved APID value is now the one for
idle packets.[^pusa-apid][^solo-apid][^spp-idle] A mission's ICD, not the latest Blue Book,
defines what its packets mean.

!!! tip "Reading a mission document"
    Start from its applicable-documents list. It names the editions the design was frozen
    against; read those editions, then use the later ones in this wiki to understand where the
    mission sits relative to current practice. The [library](../library/index.md) pages give
    the publisher URL and copy time of every edition held here.

[^hb-ccsds]: [ECSS-E-HB-50A, Communications guidelines](../library/ecss-e-hb-50a-15november2008.md), §3.1.2 "CCSDS standards", PDF p. 24.
[^hb-ccsds2]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §3.1.2 (continued: Green, Magenta, Orange, Yellow and Silver books), PDF p. 25.
[^hb-pss]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §3.1.3 "Relationship to PSS standards", PDF p. 25.
[^hb-rel]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §3.1.4 "Relationship of ECSS standards to CCSDS standards", PDF p. 26.
[^hb-scope]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §1.2 "Scope", PDF p. 17.
[^sle-iso]: [CCSDS 910.3-G-3, Cross Support Concept Part 1: SLE Services](../library/ccsds-910x3g3-sle-cross-support.md), §1.4 "Rationale", PDF p. 10.
[^sle-refs]: [CCSDS 910.3-G-3](../library/ccsds-910x3g3-sle-cross-support.md), §1.7 "References" (including Red Books 910.11-R-1 and 913.1-R-1), PDF pp. 12–13.
[^sle-concept]: [CCSDS 910.3-G-3](../library/ccsds-910x3g3-sle-cross-support.md), §2.1 "What are SLE services?", PDF p. 15.
[^icd-scope]: [SCOS-2000 Database Import ICD 7.0](../library/icd-7-0-final.md), §1.1 "Purpose" and "Scope", PDF p. 15.
[^icd-ad]: [Database Import ICD 7.0](../library/icd-7-0-final.md), §1.4 "References" and §1.4.1 "Applicable documents", PDF pp. 18–19.
[^icd-rd]: [Database Import ICD 7.0](../library/icd-7-0-final.md), §1.4.2 "Reference documents" (RD-6, RD-8, RD-14, RD-18, RD-19, RD-20), PDF pp. 19–20.
[^solo-docs]: [SOL.S.ASTR.TN.00079 issue 7, Solar Orbiter TM-TC and Packet Structure ICD](../library/sol-s-astr-tn-00079-07.md), §2 "Documents" (AD1, RD1, RD2), PDF p. 13.
[^solo-pus]: [SOL.S.ASTR.TN.00079 issue 7](../library/sol-s-astr-tn-00079-07.md), §3.2.2.1 "TC data field header" (PUS-53, PUS version 1), PDF p. 17, and §4.2.2.1 "TM data field header" (PUS-222, PUS version 1), PDF p. 26.
[^solo-apid]: [SOL.S.ASTR.TN.00079 issue 7](../library/sol-s-astr-tn-00079-07.md), §4.2.1.1 "TM packet ID" (PUS-188), PDF pp. 24–25.
[^solo-cover]: [SOL.S.ASTR.TN.00079 issue 7](../library/sol-s-astr-tn-00079-07.md), title page and running header, PDF p. 1.
[^spp-intent]: [CCSDS 133.0-B-2, Space Packet Protocol](../library/ccsds-133-0-133x0b2e2.md), "Statement of intent", PDF p. 4.
[^spp-authority]: [CCSDS 133.0-B-2](../library/ccsds-133-0-133x0b2e2.md), "Authority", PDF p. 3.
[^spp-idle]: [CCSDS 133.0-B-2](../library/ccsds-133-0-133x0b2e2.md), §4.1.3.3.4.4 and its notes, PDF p. 34.
[^g4-scope]: [CCSDS 130.0-G-4, Overview of Space Communications Protocols](../library/ccsds-130-0-130x0g4e1.md), §1.1 "Purpose and scope", PDF p. 9.
[^g4-authority]: [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md), "Authority" and "Foreword", PDF pp. 3–4.
[^g4-agencies]: [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md), list of member and observer agencies, PDF p. 5 (counted by this wiki: 11 members, 33 observers).
[^g4-refs]: [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md), §1.4 "References" [1] to [61], PDF pp. 11–15.
[^g4-sana]: [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md), §3.2.2 "Identifiers used by data link protocols", PDF p. 26.
[^g2-scope]: [CCSDS 130.2-G-3, Space Data Link Protocols: Summary of Concept and Rationale](../library/ccsds-130-2-130x2g3.md), §2.1 "Design goals", PDF p. 13.
[^xtce-omg]: [CCSDS 660.0-B-2, XML Telemetric and Command Exchange 1.2](../library/ccsds-660-0-660x0b2.md), OMG title page (formal/18-10-04) and copyright page, PDF pp. 9–10.
[^api-cover]: [CCSDS 914.0-M-2, SLE API for Transfer Services: Core Specification](../library/ccsds-914-0-914x0m2c1.md), cover ("Recommended Practice", "Magenta Book"), PDF p. 1.
[^cover-232]: [CCSDS 232.0-B-4](../library/ccsds-232-0-232x0b4e1c1.md), cover note, PDF p. 1.
[^dc-131]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), Document Control, PDF p. 7.
[^dc-133]: [CCSDS 133.0-B-2](../library/ccsds-133-0-133x0b2e2.md), Document Control, PDF p. 7.
[^dc-1331]: [CCSDS 133.1-B-3, Encapsulation Packet Protocol](../library/ccsds-133-1-133x1b3e1.md), Document Control, PDF p. 7.
[^dc-231]: [CCSDS 231.0-B-4](../library/ccsds-231-0-231x0b4e1.md), Document Control, PDF p. 7.
[^dc-232]: [CCSDS 232.0-B-4](../library/ccsds-232-0-232x0b4e1c1.md), Document Control, PDF p. 7.
[^dc-2321]: [CCSDS 232.1-B-2, COP-1](../library/ccsds-232-1-232x1b2e2c1.md), Document Control, PDF p. 7.
[^dc-727]: [CCSDS 727.0-B-5, CFDP](../library/ccsds-727-0-727x0b5e1.md), Document Control, PDF p. 7.
[^dc-7321]: [CCSDS 732.1-B-3, USLP](../library/ccsds-732-1-732x1b3e1.md), Document Control, PDF p. 7.
[^dc-911]: [CCSDS 911.1-B-5](../library/ccsds-911-1-911x1b5e1.md), [911.2-B-4](../library/ccsds-911-2-911x2b4e1.md) and [911.5-B-4](../library/ccsds-911-5-911x5b4e1.md), Document Control, PDF p. 6 of each.
[^dc-914]: [CCSDS 914.0-M-2](../library/ccsds-914-0-914x0m2c1.md), Document Control, PDF p. 7.
[^dc-all]: Document Control pages: [130.0-G-4](../library/ccsds-130-0-130x0g4e1.md) PDF p. 6; [130.1-G-3](../library/ccsds-130-1-130x1g3e1.md) p. 6; [130.2-G-3](../library/ccsds-130-2-130x2g3.md) p. 5; [131.0-B-5](../library/ccsds-131-0-131x0b5.md) p. 7; [132.0-B-3](../library/ccsds-132-0-132x0b3.md) p. 7; [133.0-B-2](../library/ccsds-133-0-133x0b2e2.md) p. 7; [133.1-B-3](../library/ccsds-133-1-133x1b3e1.md) p. 7; [230.1-G-3](../library/ccsds-230-1-230x1g3e1.md) p. 6; [231.0-B-4](../library/ccsds-231-0-231x0b4e1.md) p. 7; [232.0-B-4](../library/ccsds-232-0-232x0b4e1c1.md) p. 7; [232.1-B-2](../library/ccsds-232-1-232x1b2e2c1.md) p. 7; [301.0-B-4](../library/ccsds-301-0-301x0b4e1.md) p. 7; [355.0-B-2](../library/ccsds-355-0-355x0b2.md) p. 7; [660.0-B-2](../library/ccsds-660-0-660x0b2.md) p. 7; [660.1-G-2](../library/ccsds-660-1-660x1g2.md) p. 6; [727.0-B-5](../library/ccsds-727-0-727x0b5e1.md) p. 7; [732.0-B-4](../library/ccsds-732-0-732x0b4.md) p. 7; [732.1-B-3](../library/ccsds-732-1-732x1b3e1.md) p. 7; [910.3-G-3](../library/ccsds-910x3g3-sle-cross-support.md) p. 5; [911.1-B-5](../library/ccsds-911-1-911x1b5e1.md) p. 6 (identical copy [here](../library/ccsds-911x1b5e1-sle-raf.md)); [911.2-B-4](../library/ccsds-911-2-911x2b4e1.md) p. 6; [911.5-B-4](../library/ccsds-911-5-911x5b4e1.md) p. 6; [912.1-B-5](../library/ccsds-912-1-912x1b5e1.md) p. 6; [913.1-B-2](../library/ccsds-913-1-913x1b2.md) p. 7; [914.0-M-2](../library/ccsds-914-0-914x0m2c1.md) p. 7.
[^fw-50]: [ECSS-E-ST-50C Rev.1, Communications](../library/ecss-e-st-50c-rev-1-1march2021.md), Foreword and publisher block, PDF p. 2.
[^pub-blocks]: Publisher blocks ("Published by"), PDF p. 2 of each: [ECSS-E-70-41A](../library/ecss-e-70-41a-30jan2003-pus.md) (2003), [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md) (2008), [ECSS-E-ST-70-01C](../library/ecss-e-st-70-01c16april2010.md) (2010), [ECSS-E-ST-50-05C Rev.2](../library/ecss-e-st-50-05c-rev24october2011.md) (2011), [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md) (2016), [ECSS-E-ST-50C Rev.2](../library/ecss-e-st-50c-rev-2-5december2024.md) and [ECSS-E-ST-70-41C Rev.1 DIR1](../library/ecss-e-st-70-41c-rev1-dir1.md) (2024), [ECSS-E-ST-70-11C Rev.1](../library/ecss-e-st-70-11c-rev-1-15october2025.md) (2025).
[^pusc-scope]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), clause 1 "Scope" (tailoring in conformance with ECSS-S-ST-00), PDF p. 10.
[^cl-50]: [ECSS-E-ST-50C Rev.1](../library/ecss-e-st-50c-rev-1-1march2021.md), Change log, PDF p. 3.
[^as-table]: [ECSS-E-ST-50C Rev.1](../library/ecss-e-st-50c-rev-1-1march2021.md), §4.2, table of ECSS adoption notices and superseded ECSS standards, PDF pp. 19–20.
[^cl-5003]: [ECSS-E-ST-50-03C, Telemetry transfer frame protocol](../library/ecss-e-st-50-03c-31july2008.md), title page and Change log, PDF pp. 1–3.
[^b-pss]: [ECSS-E-ST-50-03C](../library/ecss-e-st-50-03c-31july2008.md), Annex B "Changes from ESA-PSS-04-106" and the bibliography (CCSDS 132.0-B-1), PDF pp. 34, 37 and 43.
[^as25-cl]: [ECSS-E-AS-50-25C Rev.1, Adoption Notice of CCSDS 232.0-B-4](../library/ecss-e-as-50-25c-rev-1-13january2023.md), title page and Change log, PDF pp. 1–3.
[^as25-ctx]: [ECSS-E-AS-50-25C Rev.1](../library/ecss-e-as-50-25c-rev-1-13january2023.md), clause 2 "Context information" and the overview of superseded standards, PDF p. 6.
[^as25-req]: [ECSS-E-AS-50-25C Rev.1](../library/ecss-e-as-50-25c-rev-1-13january2023.md), clause 4 "Application requirements" and Table 4-1 (4.1.1b, 4.1.1c, 4.1.4.1.1 to 4.1.4.1.3), PDF pp. 8–9.
[^as26-scope]: [ECSS-E-AS-50-26C, Adoption Notice of CCSDS 232.1-B-2](../library/ecss-e-as-50-26c-1march2021.md), Change log and clause 1 "Scope", PDF pp. 3 and 5.
[^as26-ctx]: [ECSS-E-AS-50-26C](../library/ecss-e-as-50-26c-1march2021.md), clause 2 "Context information", PDF p. 6.
[^as26-req]: [ECSS-E-AS-50-26C](../library/ecss-e-as-50-26c-1march2021.md), Table 4-1 (clause 3.3.2 and the new requirement), PDF p. 9.
[^cl-7011]: [ECSS-E-ST-70-11C Rev.1, Space segment operability](../library/ecss-e-st-70-11c-rev-1-15october2025.md), title page and Change log, PDF pp. 1–3.
[^cl-7031]: [ECSS-E-ST-70-31C, Monitoring and control data definition](../library/ecss-e-st-70-31c.md), title page and Change log, PDF pp. 1–3.
[^cl-pusc]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), Change log, PDF p. 3.
[^pusc-refs]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), clause 2 "Normative references", PDF p. 11.
[^pusc-types]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), §4.2.3.2 and Table 4-1, PDF pp. 22–23.
[^pusc-tmsh]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), §7.4.3.1, Figure 7-7 and requirement c (versions 0, 1 and 2), PDF pp. 439–440.
[^pusc-tcsh]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), §7.4.4.1, Figure 7-9 and requirement c, PDF p. 442.
[^pusa-refs]: [ECSS-E-70-41A](../library/ecss-e-70-41a-30jan2003-pus.md), clause 2 "Normative references", PDF p. 15.
[^pusa-tc]: [ECSS-E-70-41A](../library/ecss-e-70-41a-30jan2003-pus.md), §5.3.3 telecommand data field header, PDF pp. 44–45.
[^pusa-apid]: [ECSS-E-70-41A](../library/ecss-e-70-41a-30jan2003-pus.md), §5.4.2 telemetry packet header (APID reservations), PDF p. 47.
[^pusa-tm]: [ECSS-E-70-41A](../library/ecss-e-70-41a-30jan2003-pus.md), §5.4.3 telemetry data field header, PDF p. 48.
[^pusa-svc]: [ECSS-E-70-41A](../library/ecss-e-70-41a-30jan2003-pus.md), §5.5 "Standard services" and Table 2, PDF p. 50.
[^dir-cover]: [ECSS-E-ST-70-41C Rev.1 DIR1](../library/ecss-e-st-70-41c-rev1-dir1.md), title page (public review 12 December 2024 to 28 February 2025) and Change log for draft development, PDF pp. 1 and 3.
[^dir-cl]: [ECSS-E-ST-70-41C Rev.1 DIR1](../library/ecss-e-st-70-41c-rev1-dir1.md), Change log, main changes (ST[1], ST[3], ST[8] deleted, ST[24] to ST[27], configuration policy), PDF pp. 3–4.
[^dir-refs]: [ECSS-E-ST-70-41C Rev.1 DIR1](../library/ecss-e-st-70-41c-rev1-dir1.md), clause 2 "Normative references", PDF p. 12.
[^dir-hdr]: [ECSS-E-ST-70-41C Rev.1 DIR1](../library/ecss-e-st-70-41c-rev1-dir1.md), §7.4.3.1 Figure 7-7 and §7.4.4.1 Figure 7-9, PDF pp. 488–492.
[^valera]: [S. Valera, ECSS-E-ST-70-41C status (ADCSS 2015)](../library/valera-2015-adcss-ecss-e-st-70-41c-status.md), slide 2, PDF p. 2.
[^icd51-cover]: [SCOS-2000 Database Import ICD issue 5.1](../library/icd-5-1-tos-gci.md), title page and approval sheet, PDF pp. 1–2.
[^icd67-cover]: [Database Import ICD 6.7 Draft A](../library/icd-6-7-drafta.md), title page, PDF p. 1.
[^icd69-cover]: [Database Import ICD 6.9](../library/icd-6-9-archive-org.md), title page, PDF p. 1.
[^icd70-cover]: [Database Import ICD 7.0](../library/icd-7-0-final.md), title page, PDF p. 1.
[^tdrs-cover]: [SCOS-2000 TDRS External Interfaces ICD, EGOS-MCS-S2K-ICD-0017 issue 5.1](../library/icd-0017-tdrs-5-1.md), title page, PDF p. 1.
[^tdrs-refs]: [TDRS External Interfaces ICD 5.1](../library/icd-0017-tdrs-5-1.md), §1.6 "References" (AD-1, RD-1, RD-4, RD-5), PDF p. 12.
[^tco-cover]: [SCOS-2000 Time Correlation Technical Note, EGOS-MCS-S2K-TN-1030](../library/tn-1030-time-correlation.md), title page and change log, PDF pp. 1–2; unit code in the page footer, PDF p. 13.
[^sdd-cover]: [EDDS SDD version 15.0](../library/sdd.md), title page, PDF p. 1.
[^sdd25-cover]: [EDDS SDD version 25.0](../library/sdd-v24.md), title page, PDF p. 1.
[^srs-cover]: [EDDS SRS version 18.0](../library/srs.md), title page, PDF p. 1.
[^srs-refs]: [EDDS SRS version 18.0](../library/srs.md), §2.2 "Reference documents" (EGOS-MDW-EDDS-SDD-1001 issue 1, 2007-04-13), PDF pp. 8–9.
[^sum-cover]: [EDDS SUM version 14.0](../library/sum.md), title page, PDF p. 1.
[^sum22-cover]: [EDDS SUM version 22.0](../library/sum-v22.md), title page, PDF p. 1.
[^euicd7-cover]: [EDDS EUICD version 7.0](../library/euicd-unversioned.md), title page, PDF p. 1.
[^euicd13-cover]: [EDDS EUICD version 13.0](../library/euicd-v13.md), title page, PDF p. 1.
[^euicd15-cover]: [EDDS EUICD version 15.0](../library/euicd-i15r0.md), title page, PDF p. 1.
[^euicd24-cover]: [EDDS EUICD version 24.0](../library/euicd-v25.md), title page, PDF p. 1.
[^cig-cover]: [EDDS CIG version 14.0](../library/cig-i14r0.md), title page, PDF p. 1.
[^cig25-cover]: [EDDS CIG version 25.0](../library/cig-v24.md), title page, PDF p. 1.
[^eug-cover]: [EDDS Update Guide version 12.0](../library/eug.md), title page, PDF p. 1.
[^glo-cover]: [EDDS Glossary version 7.0](../library/glo.md), title page, PDF p. 1.
[^srn-cover]: [EDDS Software Release Note version 14.0](../library/srn.md), title page, PDF p. 1.
[^ddid-cover]: [Solar Orbiter Data Delivery ICD, SOL-ESC-IF-05011](../library/solo-ddid-i1r2.md), title page, PDF p. 1.
[^ddid-refs]: [Solar Orbiter DDID](../library/solo-ddid-i1r2.md), §1.1 "Objective" and §1.3 "Applicable and reference documents" (A-1, R-2, R-15), PDF pp. 7–9.
[^efecs-cover]: [Solar Orbiter E-FECS ICD, SOL-SGS-ICD-0006](../library/sol-sgs-icd-0006-efecs-icd-3-0.md), title page, PDF p. 1.
[^s20-cover]: [Solar Orbiter inter-instrument communication via services 3 and 20, SOL-SGS-TN-0007](../library/sol-sgs-tn-0007-s20-2-0.md), title page, PDF p. 1.
[^roddid-b5]: [Rosetta/Mars Express DDID, issue B5](../library/mex-esc-if-5003-b5.md), title page, PDF p. 1.
[^roddid-c2]: [Rosetta/Mars Express/Venus Express DDID, issue C2](../library/ro-esc-if-5003-ddid-c2.md), title page, PDF p. 1.
[^fds-cover]: [Rosetta and Mars Express FDS–MCS ICD, RO-ESC-ID-5003](../library/mex-esc-id-5003-fds-icd.md), title page, PDF p. 1.
[^ifms-cover]: [IFMS-OCC Interface Control Document](../library/ifms-occ-icd-mex.md), title page and approvals and change history page, PDF pp. 1–2.
[^bul108]: [J-F. Kaufeler et al., Promoting ESA software as a European product: the SCOS-2000 example, ESA Bulletin 108](../library/esa-bulletin-108-ch8.md), author affiliations, PDF p. 1.
[^pfm]: [Herschel/Planck Operations Interface Requirements Document](../library/cosmos-operations-interface-requirements.md), acronym list ("PFM Proto-Flight Model (of spacecraft)"), PDF p. 71.
[^mib25]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `vdf` and `pcdf` (header `NOM_TC`), queried by this wiki.
[^mib20]: [Solar Orbiter MIB release MIB__20200416M10720PFMS001_SOL](../library/mib-20200416m10720pfms001-sol.md), table `vdf`, queried by this wiki.
[^eida-cover]: [Solar Orbiter Experiment Interface Document Part A, SOL-EST-IF-0050](../library/12-3-solarorbiter-eid-a-issue-1-0-2007-10-09.md), title page (issue 1, revision 0, 9 October 2007, prepared by the Solar Orbiter Team, ESTEC), PDF p. 1.
[^swaicd-cover]: [SWA DPU Communications ICD, SO-SWA-DPU-CD-IC-003](../library/so-swa-dpu-cd-ic-003-dpu-communications-interface-control-document-issue8-2.md), title page (issue 8.2, 07/08/2019, prepared and approved by the DPU team), PDF p. 1.
[^idb-src]: Source registry entries and library pages of the [SWA IDB 6.3.4](../library/swa-idb-ascii.md), the [SWA IDB 6.5.0](../library/swa-idb-v6-5-0.md) and the [STIX IDB v2.26.38](../library/stix-idb-v2-26-38-raw.md) (original URLs on solarorbiter.irap.omp.eu and pub099.cs.technik.fhnw.ch); STIX table `vdf` queried by this wiki.
[^psicd-cover]: [Herschel/Planck Packet Structure ICD, SCI-PT-ICD-07527](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), page header and distribution record (issue 6.0, 25 January 2008), PDF p. 2.
[^sgicd-cover]: [Herschel/Planck Space/Ground ICD, SCI-PT-ICD-07418](../library/herschel-planck-space-ground-interface-control-document-sgicd.md), page header (issue 3.2, 1 December 2004), PDF p. 9.
[^copies]: This wiki's source registry (`data/sources.json`), summarised on [Sources and copies](../about/sources-and-copies.md): publisher URL, copy time (UTC), SHA-256 checksum and size of every library document.
[^g4-coding-refs]: [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md), §3.2.1 and §3.2.4 (references [31], [33], [34] as summaries of concept and rationale), PDF pp. 26 and 31.
[^g4-history]: [CCSDS 130.0-G-4](../library/ccsds-130-0-130x0g4e1.md), §2.1 "History of space communications protocols", PDF p. 16.
[^hp-ad]: [Herschel/Planck Operations Interface Requirements Document, SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), applicable document AD-7, PDF p. 10.
[^xtce13]: [OMG XML Telemetric and Command Exchange, version 1.3](../library/omg-xtce-1-3-specification.md), cover (formal/26-06-09, March 2026) and copyright page, PDF pp. 1–2.
[^pss-covers]: Covers, PDF p. 1 of each (OCR text of scans): [ESA PSS-04-106 Issue 1](../library/esa-pss-04-106-issue1-january1988.md), [ESA PSS-04-107 Issue 2](../library/esa-pss-04-107-issue2-april1992.md), [ESA PSS-04-151 Issue 1](../library/esa-pss-04-151-issue1-september1992.md), [ESA PSS-07-101 Issue 1](../library/esa-pss-07-101-issue1-may1994.md).
[^pss106-cr]: [ESA PSS-04-106 Issue 1, Packet Telemetry Standard](../library/esa-pss-04-106-issue1-january1988.md), Document change record (OCR of a scan), PDF p. 6.
[^pss106-refs]: [ESA PSS-04-106 Issue 1](../library/esa-pss-04-106-issue1-january1988.md), References [1] to [7] (checked against the page image), PDF p. 7.
[^pss107-cr]: [ESA PSS-04-107 Issue 2, Packet telecommand standard](../library/esa-pss-04-107-issue2-april1992.md), Document change record (OCR of a scan), PDF p. 6.
[^pss107-refs]: [ESA PSS-04-107 Issue 2](../library/esa-pss-04-107-issue2-april1992.md), References [1] to [8] (checked against the page image), PDF p. 7.
[^icd-rd-old]: Reference documents RD-6 (ESA PSS-07-101) and RD-14 ("ESA PSS-074-107") in the earlier Database Import ICD issues: [5.1](../library/icd-5-1-tos-gci.md), PDF p. 11; [6.7 Draft A](../library/icd-6-7-drafta.md), PDF p. 18; [6.9](../library/icd-6-9-archive-org.md), PDF p. 19.
[^pusc-bib]: [ECSS-E-ST-70-41C](../library/ecss-e-st-70-41c-15april2016.md), Bibliography (ESA PSS-04-151 "Issue 1, September 1993"; ESA PSS-07-101 "Issue 1, May 1994"), PDF p. 656.
[^hist-covers]: "CCSDS Historical Document" cover notes and Document Control pages: [CCSDS 910.4-B-2](../library/ccsds-910-4-910x4b2e1s.md), PDF pp. 1–2 and 7; [CCSDS 912.3-B-3](../library/ccsds-912-3-912x3b3s.md), PDF pp. 1–2 and 8; [CCSDS 135.0-B-4](../library/ccsds-135-0-135x0b4s.md), PDF pp. 1–2 and 8.
[^dc-320]: [CCSDS 320.0-M-7, Spacecraft Identification Field Code Assignment Control Procedures](../library/ccsds-320-0-320x0m7c1.md), cover and Document Control (issues 320.0-B-1 to -B-6, changes of issue 7, Cor. 1), PDF pp. 1 and 7–8.
[^dc-6602]: [CCSDS 660.2-G-2, XTCE Informational Report](../library/ccsds-660-2-660x2g2.md), Document Control, PDF p. 6.
[^dc-9024]: [CCSDS 902.4-B-1, Cross Support Service Management—Service Package Data Formats](../library/ccsds-902-4-902x4b1.md), cover, "Authority" page of the proposed draft and Document Control, PDF pp. 1, 3 and 7.
[^dc-231c1]: [CCSDS 231.0-B-4 with Cor. 1](../library/ccsds-231-0-231x0b4e1c1.md), Document Control (Technical Corrigendum 1, July 2026), PDF p. 7.
[^dc-1316]: [CCSDS 131.0-B-6, TM Synchronization and Channel Coding](../library/ccsds-131-0-131x0b6ec1.md), Document Control, PDF p. 7.
[^dc-7325]: [CCSDS 732.0-B-5, AOS Space Data Link Protocol](../library/ccsds-732-0-732x0b5ec1.md), Document Control, PDF p. 7.
[^dc-401]: [CCSDS 401.0-B-32, Radio Frequency and Modulation Systems—Part 1](../library/ccsds-401-0-401x0b32.md), cover and Document Control (issues 17 to 32), PDF pp. 1 and 7–11.
[^dc-r2]: Covers and Document Control pages of the CCSDS books added in 2026: [130.3-G-1](../library/ccsds-130-3-130x3g1.md) PDF pp. 1, 6; [131.0-B-6](../library/ccsds-131-0-131x0b6ec1.md) pp. 1, 7; [135.0-B-4](../library/ccsds-135-0-135x0b4s.md) pp. 1–2, 8; [211.0-B-6](../library/ccsds-211-0-211x0b6e1.md) pp. 1, 7; [231.0-B-4 Cor. 1](../library/ccsds-231-0-231x0b4e1c1.md) pp. 1, 7; [320.0-M-7](../library/ccsds-320-0-320x0m7c1.md) pp. 1, 7–8; [350.0-G-3](../library/ccsds-350-0-350x0g3.md) pp. 1, 6; [350.5-G-2](../library/ccsds-350-5-350x5g2.md) pp. 1, 6; [352.0-B-2](../library/ccsds-352-0-352x0b2.md) pp. 1, 7; [355.1-B-1](../library/ccsds-355-1-355x1b1.md) pp. 1, 7; [401.0-B-32](../library/ccsds-401-0-401x0b32.md) pp. 1, 7–11; [660.2-G-2](../library/ccsds-660-2-660x2g2.md) pp. 1, 6; [732.0-B-5](../library/ccsds-732-0-732x0b5ec1.md) pp. 1, 7; [902.0-G-1](../library/ccsds-902-0-902x0g1.md) pp. 1, 6; [902.4-B-1](../library/ccsds-902-4-902x4b1.md) pp. 1, 3, 7; [910.4-B-2](../library/ccsds-910-4-910x4b2e1s.md) pp. 1–2, 7; [912.3-B-3](../library/ccsds-912-3-912x3b3s.md) pp. 1–2, 8; [915.1-M-2](../library/ccsds-915-1-915x1m2.md) pp. 1, 7; [916.3-M-2](../library/ccsds-916-3-916x3m2.md) pp. 1, 7; [922.1-B-2](../library/ccsds-922-1-922x1b2.md) pp. 1, 7.
[^trees-1]: [ECSS Trees, November 2025](../library/ecss-trees-nov2025.md), chart "ECSS Disciplines" (as of November 2025), PDF p. 1.
[^trees-e]: [ECSS Trees, November 2025](../library/ecss-trees-nov2025.md), chart "Engineering branch" with its legend (as of October 2025), PDF p. 4; status markers read from the page image.
[^trees-e50]: [ECSS Trees, November 2025](../library/ecss-trees-nov2025.md), chart "E-50 discipline – Communications" (as of May 2025), PDF p. 6.
[^trees-q]: [ECSS Trees, November 2025](../library/ecss-trees-nov2025.md), chart "Product assurance branch" (as of May 2025), PDF p. 7.
[^trees-u]: [ECSS Trees, November 2025](../library/ecss-trees-nov2025.md), chart "Sustainability branch" (as of November 2025), PDF p. 9.
[^trees-hb]: [ECSS Trees, November 2025](../library/ecss-trees-nov2025.md), chart "Engineering branch HBs and TMs" (as of November 2024), PDF p. 11.
[^cl-50r2]: [ECSS-E-ST-50C Rev.2, Communications](../library/ecss-e-st-50c-rev-2-5december2024.md), title page and Change log, PDF pp. 1 and 3.
[^cl-5001]: [ECSS-E-ST-50-01C, Telemetry synchronization and channel coding](../library/ecss-e-st-50-01c31july2008.md), title page and Change log, PDF pp. 1 and 3.
[^cl-5002]: [ECSS-E-ST-50-02C, Ranging and Doppler tracking](../library/ecss-e-st-50-02c31july2008.md), title page and Change log, PDF pp. 1 and 3.
[^cl-5004]: [ECSS-E-ST-50-04C, Telecommand protocols synchronization and channel coding](../library/ecss-e-st-50-04c31july2008.md), title page and Change log, PDF pp. 1 and 3.
[^cl-5005]: [ECSS-E-ST-50-05C Rev.2, Radio frequency and modulation](../library/ecss-e-st-50-05c-rev24october2011.md), title page and Change log (alignment with CCSDS 401.0-B-20), PDF pp. 1 and 3.
[^cl-7000]: [ECSS-E-ST-70C, Ground systems and operations](../library/ecss-e-st-70c31july2008.md), title page and Change log, PDF pp. 1 and 3.
[^cl-7001]: [ECSS-E-ST-70-01C, Spacecraft on-board control procedures](../library/ecss-e-st-70-01c16april2010.md), title page and Change log, PDF pp. 1 and 3.
[^cl-7032]: [ECSS-E-ST-70-32C, Test and operations procedure language](../library/ecss-e-st-70-32c31july2008.md), title page and Change log, PDF pp. 1 and 3.
[^as21-cl]: [ECSS-E-AS-50-21C Rev.2, Adoption Notice of CCSDS 131.0-B-5](../library/ecss-e-as-50-21c-rev-2-5december2024.md), title page and Change log, PDF pp. 1 and 3.
[^as24-cl]: Title pages and Change logs, PDF pp. 1 and 3 of each: [ECSS-E-AS-50-22C Rev.1](../library/ecss-e-as-50-22c-rev-1-13january2023.md), [ECSS-E-AS-50-23C Rev.1](../library/ecss-e-as-50-23c-rev-1-13january2023.md), [ECSS-E-AS-50-24C Rev.1](../library/ecss-e-as-50-24c-rev-1-13january2023.md).
[^as-scopes]: Clause 1 "Scope", PDF p. 5 of each: [ECSS-E-AS-50-21C Rev.2](../library/ecss-e-as-50-21c-rev-2-5december2024.md), [-22C Rev.1](../library/ecss-e-as-50-22c-rev-1-13january2023.md), [-23C Rev.1](../library/ecss-e-as-50-23c-rev-1-13january2023.md), [-24C Rev.1](../library/ecss-e-as-50-24c-rev-1-13january2023.md), [-25C Rev.1](../library/ecss-e-as-50-25c-rev-1-13january2023.md), [-26C](../library/ecss-e-as-50-26c-1march2021.md).
[^as24-mod]: [ECSS-E-AS-50-24C Rev.1](../library/ecss-e-as-50-24c-rev-1-13january2023.md), table 4-1, rows for 1.6.1.3 and 3.5, PDF pp. 8 and 10.
[^as23-mod]: [ECSS-E-AS-50-23C Rev.1](../library/ecss-e-as-50-23c-rev-1-13january2023.md), table 4-1, row 4.1.2.5.2 and its new note, PDF pp. 8–9.
[^b-pss107]: [ECSS-E-ST-50-04C](../library/ecss-e-st-50-04c31july2008.md), Annex B "Changes from ESA-PSS-04-107", PDF pp. 131–133.
[^5004-c]: [ECSS-E-ST-50-04C](../library/ecss-e-st-50-04c31july2008.md), Annex C "Differences from CCSDS recommendations", PDF p. 134.
[^hb-decoder]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §4.7.7 "Telecommand decoder specification", PDF p. 76.
[^other-covers]: First pages: [Valera 2014](../library/valera-2014-ecss-e-st-70-41c-status.md), [Valera 2015](../library/valera-2015-adcss-ecss-e-st-70-41c-status.md), [PUS-C deployment presentation](../library/presentation-deployment-of-the-pus-c-standard.md), [GOIRD presentation](../library/15-05-generic-oird.md), [Kaufeler paper](../library/ntrs-19950011180-esa-pus-paper.md) and [XTCE tutorial](../library/ntrs-20090017706-xtce-tutorial.md), PDF p. 1 of each.
