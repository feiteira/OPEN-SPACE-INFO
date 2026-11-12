---
title: "OMG XTCE 1.3 specification (formal/26-06-09)"
description: "The Object Management Group specification document for XTCE version 1.3, the XML information model and exchange format for spacecraft telemetry and telecommand databases."
tags: ["Standard", "CCSDS standards and reports"]
sources: [omg-xtce-1-3-specification]
---

# XML Telemetric and Command Exchange, Version 1.3

<dl class="osi-meta"><dt>Document ID</dt><dd>formal/26-06-09</dd><dt>Issue / version</dt><dd>Version 1.3</dd><dt>Date</dt><dd>March 2026</dd><dt>Organisation</dt><dd>Object Management Group (OMG)</dd><dt>Type</dt><dd>Standard</dd><dt>Status</dt><dd>An OMG formal specification of XTCE version 1.3, dated March 2026 (PDF p. 1). The status of earlier versions is not stated in the document. The library's CCSDS adoption, CCSDS 660.0-B-2, carries XTCE 1.2.</dd><dt>Pages</dt><dd>31</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://www.omg.org/spec/XTCE/1.3/PDF" rel="noopener">https://www.omg.org/spec/XTCE/1.3/PDF</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:27Z</dd><dt>SHA-256</dt><dd><code>5ae04d0bb0dee51eb5c170c4685d2986d3c29e7d515533c1d845110120cacd67</code></dd><dt>Size</dt><dd>628.4 KB</dd><dt>Our copy</dt><dd><a href="../third-party/ccsds/omg-xtce-1.3-specification.pdf">omg-xtce-1.3-specification.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Object Management Group specification document for **XTCE version 1.3**, the XML information model and exchange format for spacecraft telemetry and telecommand databases. It is short (31 pages), because the normative content is the W3C XML schema 'SpaceSystem.xsd', which is published separately and only referenced from Annex A (schema revision 20250214). The prose is an architectural overview. It is a newer version than the XTCE 1.2 carried by [CCSDS 660.0-B-2](../library/ccsds-660-0-660x0b2.md), and the CCSDS Green Books [660.1-G-2](../library/ccsds-660-1-660x1g2.md) and [660.2-G-2](../library/ccsds-660-2-660x2g2.md) explain it in more depth. The wiki page is [XTCE](../ccsds/xtce.md).

The foreword and introduction give the motivation: spacecraft makers and operators each define TM/TC data in their own formats, which forces repeated translation and revalidation. XTCE also deliberately avoids packet or TDM vocabulary. Clauses 1-5 give the scope (structure of CCSDS packets and TDM frames, encodings, command definitions, but not distribution protocols, RF, displays or flight software), conformance (a compliant database validates against the schema), normative W3C references and terms. Clause 6 walks through the model. It covers the SpaceSystem hierarchy and its naming rules, TelemetryMetaData (ParameterTypeSet with the four DataEncodings, ParameterSet, ContainerSet with BaseContainer and RestrictionCriteria, MessageSet, StreamSet, AlgorithmSet), CommandMetaData (ArgumentTypeSet, MetaCommandSet with constraints, significance, alarm suspension, interlocks, eight verifier stages and parameters to set), ServiceSet, and the common MatchCriteria, Polynomial and Unit types. Annex B lists the schema style rules, and Annex C is a bibliography that includes the SCOS-2000 Database Import ICD 5.0 and the ESA PUS. This makes it a direct link to the [MIB](../mib/index.md) world: compare the [MIB data model](../mib/data-model.md).


## Key points

- Contributors named in the foreword are Lockheed Martin, ESA, Boeing, NASA GSFC, USAF SMC, L-3 Harris, Peraton, Raytheon, SciSys, Kratos S1, CSC and GST. *(PDF p. 7)*
- The normative part is a single XML schema compliant with the W3C recommendation of 2 May 2001. All elements belong to one root object, the SpaceSystem. *(PDF p. 8)*
- XTCE deliberately avoids TDM and packet nomenclature ('minor frame', 'major frame', 'packet' appear only in examples). It does not itself use CCSDS or IRIG-106 formats, but it can build container libraries for systems that implement them. *(PDF p. 8)*
- Out of scope are data distribution, command and data protocols, RF and analog streams, data grouping, visualisation, scheduling, orbital properties, displays and flight software. XTCE is a metadata specification, not a specification for transferring live or historical TM/TC data. *(PDF p. 11)*
- A compliant database is an XML file that complies with the schema. Fully compliant software interprets and/or generates any compliant database. *(PDF p. 11)*
- Names may contain digits, a-z letters, underscores, hyphens or backslashes and are case sensitive. '/' separates SpaceSystems, '.' selects aggregate members, '[ ]' index arrays, and ':' is reserved for alias namespaces. *(PDF p. 15)*
- IntegerDataEncoding supports unsigned, signMagnitude, twosCompliment, onesCompliment, BCD and packedBCD. FloatDataEncoding supports IEEE754_1985 and MILSTD_1750A. String encodings are UTF-8 or UTF-16 with fixed, terminated or leading-size length. All four DataEncodings can carry CRC or parity checks. *(PDF p. 17)*
- A DataEncoding describes how a Parameter is transmitted, not how it is stored. The ParameterType size attributes are only precision hints, and ground systems may use larger native formats. *(PDF p. 18)*
- SequenceContainer inheritance through BaseContainer and RestrictionCriteria (a MatchCriteria) both minimises description effort and identifies containers, for example minorFrame 20. Inheritance may be arbitrarily deep. *(PDF p. 19)*
- The StreamSet offers three stream types: FixedFrameStream, VariableFrameStream and a custom stream processed by named custom algorithms. *(PDF p. 20)*
- Parameters are scoped per SpaceSystem, so telemetry-side definitions can be reused on the command side and vice versa. *(PDF p. 22)*
- Significance levels are none, watch, warning, distress, critical and severe. The verifier stages are TransferredToRange, TransferredFromRange, Received, Accepted, Queued, Execution, Complete and Failed. 'Complete' verifiers add to the base MetaCommand's list, while the others override it. *(PDF p. 25)*
- The normative schema is published at https://www.omg.org/spec/XTCE/20250214/SpaceSystem.xsd. The URL encodes the year, month and revision of the schema at adoption. *(PDF p. 27)*
- Schema style rules: types end in 'Type', attributes are camelCase starting lowercase, unit hints go in names (for example dataRateInBPS), collections go in 'List' (ordered) or 'Set' (unordered), and non-schema validity checks are given as appinfo annotations. *(PDF p. 29)*


## Cited by these wiki pages (3)

- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)
- [XTCE: XML Telemetric and Command Exchange (CCSDS 660)](../ccsds/xtce.md)


??? abstract "Contents (26 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Foreword | Foreword | 7 |
    | Introduction | Introduction (Purpose, Overview, Philosophy) | 7 |
    | 1 | Scope | 11 |
    | 2 | Conformance | 11 |
    | 3 | References | 11 |
    | 4 | Terms and Definitions | 12 |
    | 5 | Symbols (and abbreviated terms) | 12 |
    | 6 | The Specification | 15 |
    | 6.1 | The Root Object – The SpaceSystem | 15 |
    | 6.1.1 | The Header Record | 16 |
    | 6.1.2 | TelemetryMetadata | 16 |
    | 6.1.2.1 | ParameterTypeSet | 17 |
    | 6.1.2.2 | ParameterSet | 18 |
    | 6.1.2.3 | ContainerSet | 19 |
    | 6.1.2.4 | MessageSet | 20 |
    | 6.1.2.5 | StreamSet | 20 |
    | 6.1.2.6 | AlgorithmSet | 21 |
    | 6.1.3 | CommandMetaData | 22 |
    | 6.1.3.1 | ArgumentTypeSet | 23 |
    | 6.1.3.2 | MetaCommandSet | 24 |
    | 6.1.4 | ServiceSet | 26 |
    | 6.2 | Common Types | 26 |
    | 6.3 | The Schema | 26 |
    | Annex A | The SpaceSystem Schema | 27 |
    | Annex B | Schema Style Notes | 29 |
    | Annex C | Bibliography | 31 |


## Documents this one references (14)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-w3c-recommendation-extensible-markup-language-xml-1-0-second-edition-http-www-w3) | W3C Recommendation - Extensible Markup Language (XML) 1.0 (Second Edition) http://www.w3.org/TR/REC-xml | Second Edition 6 October 2000 | normative |
|  | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-0-primer-http-www-w3-org-tr-xmlschema-0) | W3C Recommendation - XML Schema Part 0: Primer http://www.w3.org/TR/xmlschema-0/ | 2 May 2001 | normative |
|  | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-1-structures-http-www-w3-org-tr-xmlschema-1) | W3C Recommendation - XML Schema Part 1: Structures http://www.w3.org/TR/xmlschema-1/ | 2 May 2001 | normative |
|  | [catalogue](../references/index.md#ref-w3c-recommendation-xml-schema-part-2-datatypes-http-www-w3-org-tr-xmlschema-2) | W3C Recommendation - XML Schema Part 2: Datatypes http://www.w3.org/TR/xmlschema-2/ | 2 May 2001 | normative |
|  | [IEEE Std 100-1996](../references/index.md#ref-ieee-std-100-1996) | IEEE Std 100-1996 (source of the definition of 'Telemetering') | 1996 | mentioned |
| 1) | [CCSDS 102.0-B-4](../references/index.md#ref-ccsds-102-0-b-4) | CCSDS Packet Telemetry |  | bibliography |
| 2) | [CCSDS 203.0-B-1](../references/index.md#ref-ccsds-203-0-b-1) | CCSDS Telecommand |  | bibliography |
| 3) | [ECSS-E-70-41](../references/index.md#ref-ecss-e-70-41) | Telemetry and Telecommand Packet Utilisation | Draft 5.3 5 Apr 2001 | bibliography |
| 4) | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database Import ICD | Issue 5.0 19 Jun 2001 | bibliography |
| 5) | [Space/01-04-01](../references/index.md#ref-space-01-04-01) | Telemetric and Command Data Specification, Space RFP-1 | 20 Aug 2001 | bibliography |
| 6) | [ESA PSS-07-101](../references/index.md#ref-esa-pss-07-101) · [library](esa-pss-07-101-issue1-may1994.md) | Packet Utilisation Standard | Issue 1 May 1994 | bibliography |
| 7) | [CCSDS 301.0-B-2](../references/index.md#ref-ccsds-301-0-b-2) | CCSDS Time Code Formats | Issue 2 April 1990 | bibliography |
| 8) | [S2K-MCS-SUM-0019-TOS-GCI](../references/index.md#ref-s2k-mcs-sum-0019-tos-gci) | SCOS-2000 Synthetic Parameters Software User Manual | Issue 3.1 September 2001 | bibliography |
| 9) | [IRIG-106](../references/index.md#ref-irig-106) | Telemetry Attributes Transfer Standard (TMATS) |  | bibliography |

!!! note "Notes"
    This is a newer XTCE version (1.3) than the 1.2 in the library's CCSDS adoption (ccsds-660-0-660x0b2), whose body is the OMG XTCE 1.2 text. Much of the clause 6 prose here is the same overview text. The cover date (March 2026) and the document number formal/26-06-09 do not obviously agree. PDF pages 10, 14, 28 and 30 are intentionally blank. The extracted text has 32 form-feed pages (registry: 31); the last one is empty. The UML class diagrams (Figures 2-10) are images and do not appear in the extraction, and Figure 1 comes out scrambled. The schema itself is not printed: Annex A only gives the URL, although the Overview says 'The schema is found in Annex A'. Oddities as printed: the table of contents calls Annex A 'The Space Schema' while the body says 'The SpaceSystem Schema'; 6.1.3 lists a 'ContainerSet' under CommandMetaData (the schema element is CommandContainerSet); 6.1.2.6.1 describes a MathAlgorithm as having 'two operands ... and an operand'; the encoding names are spelled 'twosCompliment' and 'onesCompliment'; and the scope list has 'including including'. The Annex C bibliography is the 2001 one, unchanged: it cites PUS draft ECSS-E-70-41 5.3, SCOS-2000 Database Import ICD 5.0 (the library has issue 5.1 as icd-5-1-tos-gci and later issues) and the SCOS-2000 synthetic parameters SUM 3.1. No individual authors are named. Copyright holders include ESOC (2018). The registry copy was taken from www.omg.org on 2026-11-12.

