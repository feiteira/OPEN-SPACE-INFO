---
title: "XTCE 1.1 Tutorial (NASA GSFC / Harris, 2009)"
description: "A 90-slide NASA tutorial on XTCE 1.1, the OMG/CCSDS XML schema for describing telemetry and telecommand databases."
tags: ["Presentation", "CCSDS standards and reports"]
sources: [ntrs-20090017706-xtce-tutorial]
---

# XTCE: XML Telemetry &amp; Command Exchange. Tutorial, XTCE Version 1.1

<dl class="osi-meta"><dt>Date</dt><dd>2009-03-23</dd><dt>Organisation</dt><dd>National Aeronautics and Space Administration (NASA GSFC) and Harris Corp.</dd><dt>Authors</dt><dd>Kevin Rice (NASA GSFC, GST Inc.), Brad Kizzort (Harris Corp.)</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Tutorial slides for XTCE 1.1, given at Torrance, California (slide footers). It describes XTCE 1.1, which XTCE 1.2 (CCSDS 660.0-B-2, 2019/2020) and XTCE 1.3 (OMG) later superseded. At the time, XTCE 1.2 existed only as 'early drafts' (PDF p. 3).</dd><dt>Pages</dt><dd>90</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://ntrs.nasa.gov/api/citations/20090017706/downloads/20090017706.pdf" rel="noopener">https://ntrs.nasa.gov/api/citations/20090017706/downloads/20090017706.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:53:00Z</dd><dt>SHA-256</dt><dd><code>96900ed3667d4b3c1da6c24ca116bfcc67503a68158aad77502a1a30ae0c40e1</code></dd><dt>Size</dt><dd>782.1 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ccsds/ntrs-20090017706-xtce-tutorial.pdf">ntrs-20090017706-xtce-tutorial.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A 90-slide NASA tutorial on **XTCE 1.1**, the OMG/CCSDS XML schema for describing telemetry and telecommand databases. It was written by implementers at NASA Goddard (GST Inc.) and Harris and archived on the NASA Technical Reports Server. It is a hands-on introduction for engineers who need to read or write XTCE files, and it complements the formal CCSDS books: [CCSDS 660.0-B-2](../library/ccsds-660-0-660x0b2.md), the element description [660.1-G-2](../library/ccsds-660-1-660x1g2.md) and the overview [660.2-G-2](../library/ccsds-660-2-660x2g2.md). The wiki page is [XTCE](../ccsds/xtce.md).

The preface gives the history: XTCE 1.0 from the OMG Space Domain Task Force in 2005, and XTCE 1.1 published by CCSDS as a Blue Book in October 2007. It also covers XML Schema and UML basics. Chapter 1 surveys SpaceSystem trees, TelemetryMetaData, CommandMetaData and NameReference path rules. Chapter 2 describes a telemetry item: the ParameterType pattern, the four DataEncodings, ValidRange, linear and polynomial calibrators, accepted type/encoding combinations, and alarms (static ranges, conditions, change-rate alarms). Chapter 3 covers SequenceContainers, entry addressing, and container inheritance with RestrictionCriteria to identify CCSDS packets by APID and length. Chapter 4 covers commanding: Arguments versus command Parameters, MetaCommand inheritance, the local CommandContainer with FixedValueEntry and ArgumentRefEntry, constraints, significance, verifiers and CommandContainerSet. Chapter 5 covers the 'forgotten' MessageSet, StreamSet, AlgorithmSet and ServiceSet. Chapter 6 discusses implementation: JAXB data binding, hard features (NameReferences, dynamic container match), native versus exchange use, and the need for agreed XTCE 'flavours', citing a NASA CCSDS mission and an ESA PUS mission exchanging most telemetry metadata. For SCOS-2000 readers, compare the [MIB data model](../mib/data-model.md).


## Key points

- XTCE 1.0 was first published in 2005 by the OMG Space Domain Task Force, active since 2000. The original submitters were ESA, Boeing Comm. Sat. and US AF SMC Det 12/VO – Lockheed Martin, joined by NASA/GSFC and Harris. CCSDS published XTCE 1.1 as a Blue Book in October 2007. *(PDF p. 3)*
- XTCE is designed for bit-packed, non-self-describing streams. Its focus is the packet or minor-frame level, and CCSDS frame, Reed-Solomon and CADU handling (front-end processing) is probably outside XTCE. *(PDF p. 4)*
- NameReferences are XTCE's string 'pointers'. They can be absolute or relative Unix-like paths, or path-less names resolved in the local SpaceSystem first and then up the tree. They sit outside XML parsing, so tools must implement them. *(PDF p. 14)*
- There are four DataEncodings. String is UTF-8 or UTF-16. Integer is unsigned or twos complement (spelled 'Compliment' in the 1.1 schema), with calibrators. Float is IEEE or MIL-1750A, with calibrators. Binary has no calibrators. *(PDF p. 19)*
- The accepted combinations include Float with IntegerDataEncoding (integer counts converted to units), Enumerated with IntegerDataEncoding (label/value pairs), and Integer/Float with BinaryDataEncoding for formats not in the XTCE list. *(PDF p. 28)*
- The alarm ranges shown are WatchRange, WarningRange, CriticalRange and SevereRange around a normal range, and more severe ranges clip the lower ones. Alarms can be static ranges, conditions or change alarms (rate or delta). *(PDF p. 30)*
- Entry locations in a container can be referenced from the previous entry (default), container start, container end or next entry. *(PDF p. 40)*
- Container inheritance identifies packets through RestrictionCriteria on parent fields, for example APID and packet length. The example also uses SCID and VCID as session variables supplied by the system. *(PDF p. 45)*
- Command Parameters are set by the system (for example a checksum), and Arguments are set by the user. Arguments are local to a MetaCommand. *(PDF p. 51)*
- The MetaCommand's local CommandContainer differs from SequenceContainer. It has FixedValueEntry (for example opcodes) and ArgumentRefEntry, its RestrictionCriteria is optional, and it has no abstract attribute. *(PDF p. 58)*
- MessageSet is described as deprecated. StreamSet lacks elements to fully describe the CCSDS stack from frame sync to packets, for example Reed-Solomon encoding. *(PDF p. 68)*
- The hardest features to implement are NameReferences and instance references, multi-level container inheritance and include conditions, type inheritance, and dynamic container match / NextContainer. The authors knew of no implementation of the last. *(PDF p. 77)*
- Full exchange needs prior agreement on an XTCE 'flavour'. A NASA CCSDS mission and an ESA PUS mission exchanged most telemetry metadata despite different packet formats. Named implementations are the GSFC JWST translator, the CNES 'Best' suite and ESA Cryosat. *(PDF p. 79)*


## Cited by these wiki pages (3)

- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [XTCE: XML Telemetric and Command Exchange (CCSDS 660)](../ccsds/xtce.md)


??? abstract "Contents (23 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Contents | Contents | 2 |
    | Preface | Brief History and Background; Applicability; Quick XML; Quick UML | 3 |
    | Chapter 1 | XTCE Overview (SpaceSystem trees, TelemetryMetaData, CommandMetaData, NameReferences) | 7 |
    | Chapter 2 | Describing Telemetry Items | 15 |
    | Chapter 2 | DataEncodings | 19 |
    | Chapter 2 | Calibrators | 24 |
    | Chapter 2 | Accepted ParameterType/DataEncoding Combinations | 28 |
    | Chapter 2 | Alarms | 30 |
    | Chapter 3 | TelemetryMetaData – Context; XTCE Containers | 38 |
    | Chapter 3 | Container Inheritance | 43 |
    | Chapter 4 | CommandMetaData | 46 |
    | Chapter 4 | Command Inheritance | 56 |
    | Chapter 4 | MetaCommand's CommandContainer | 58 |
    | Chapter 4 | Commanding: Other Items | 64 |
    | Chapter 4 | CommandContainerSet | 65 |
    | Chapter 5 | The Forgotten Elements (MessageSet, StreamSet, AlgorithmSet, Services) | 67 |
    | Chapter 6 | Implementing XTCE | 72 |
    | Chapter 6 | A Quick Look at JAXB | 73 |
    | Chapter 6 | Harder XTCE Items to Implement | 77 |
    | Chapter 6 | Native Implementation | 78 |
    | Chapter 6 | Exchange Implementations | 79 |
    | Summary | Summary | 82 |
    | Backup | Backup Slides (command packet pattern and MetaCommand inheritance examples) | 83 |


## Documents this one references (9)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-xtce-1-0-omg-space-domain-task-force-first-published-2005) | XTCE 1.0 (OMG Space Domain Task Force), first published 2005 | 1.0 2005 | mentioned |
|  | [catalogue](../references/index.md#ref-xtce-1-1-published-by-ccsds-as-blue-book) | XTCE 1.1 published by CCSDS as Blue Book | 1.1 October 2007 | mentioned |
|  | [catalogue](../references/index.md#ref-xtce-1-1-green-book-overview) | XTCE 1.1 Green Book (overview) | 2007 | mentioned |
|  | [catalogue](../references/index.md#ref-xtce-1-1-magenta-books-user-guide-ccsds-tailoring) | XTCE 1.1 Magenta Books (user guide / CCSDS tailoring) |  | mentioned |
|  | [catalogue](../references/index.md#ref-xtce-1-2-early-drafts) | XTCE 1.2 early drafts | 1.2 | mentioned |
|  | [catalogue](../references/index.md#ref-ieee-754-floating-point-written-ieee-745-and-ieee784-on-some-slides) | IEEE-754 floating point (written 'IEEE-745' and 'IEEE784' on some slides) |  | mentioned |
|  | [catalogue](../references/index.md#ref-mil-1750a-floating-point-format) | MIL-1750A floating point format |  | mentioned |
|  | [catalogue](../references/index.md#ref-esa-pus-packet-utilization-standard-mission-in-an-exchange-example) | ESA PUS (Packet Utilization Standard) mission, in an exchange example |  | mentioned |
|  | [catalogue](../references/index.md#ref-xtce-schema-namespace-http-www-omg-org-space-xtce-spacesystemv1-1-xsd-jaxb-examp) | XTCE schema namespace http://www.omg.org/space/xtce, SpaceSystemV1.1.xsd (JAXB example) | 1.1 | mentioned |

!!! note "Notes"
    This is a slide deck, not a standard. The title slide is dated 'March 23, 2008', while every slide footer reads 'XTCE Tutorial, Torrance, California, March 23, 2009'. The date field uses the footer date, which matches the 2009 NTRS record number. The extracted text has 91 form-feed pages (registry: 90); the last one is empty. The title slide carries the presenters' e-mail addresses, which are deliberately not reproduced here. The UML and box diagrams survive only as scattered labels, but the XML snippets are readable. Inconsistencies and typos as printed: XTCE 1.0 is dated 2005 here, while CCSDS 660.2-G-2 (ccsds-660-2-660x2g2) says 2006; 'IEEE-745' and 'IEEE784' are written for IEEE-754; slide 45's example uses 'ParameterEntryRef' (the schema element is ParameterRefEntry) and a BaseContainer ref 'MyFormatPacket' for a container named 'MyFormat'; slide 33 has 'spaceOfInterestInSeconds'. Slides 84-90 are backup slides on command packet patterns. The OMG XTCE 1.3 specification in the library (omg-xtce-1-3-specification) and the CCSDS 660 books describe later versions. The registry copy was taken from ntrs.nasa.gov on 2026-11-12.

