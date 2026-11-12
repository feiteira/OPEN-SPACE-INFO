---
title: "EDDS / DDID presentation and demo (Solar Orbiter)"
description: "An 80-slide ESOC training presentation, 'EDDS / DDID – Presentation & Demo', first given on 28 September 2017 by Daniel Werner (Mission Data Systems Manager for BepiColombo) and Rui Santos (Technical "
tags: ["Presentation", "Mission data delivery documents"]
sources: [sol-esc-prs-22100-edds-ddid-demo]
---

# EDDS / DDID – Presentation &amp; Demo

<dl class="osi-meta"><dt>Date</dt><dd>2017-09-28</dd><dt>Organisation</dt><dd>European Space Agency, ESOC</dd><dt>Authors</dt><dd>Daniel Werner, Rui Santos, Paula Margarido</dd><dt>Type</dt><dd>Presentation</dd><dt>Status</dt><dd>Title slide dated 28/09/2017; slide 2 states it was updated by Paula Margarido for Solar Orbiter (January 2019). The file name gives 'SOL-ESC-PRS-22100, Is.1, Rev.0, 20190130', which is not printed on the slides.</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/EDDS/SOL-ESC-PRS-22100,%20Is.1,%20Rev.0,%2020190130,%20(EDDS%20-%20DDID%20Presentation%20&amp;%20Demo).pptx" rel="noopener">https://solarorbiter.irap.omp.eu/documents/EDDS/SOL-ESC-PRS-22100,%20Is.1,%20Rev.0,%2020190130,%20(EDDS%20-%20DDID%20Presentation%20&amp;%20Demo).pptx</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:18:24Z</dd><dt>SHA-256</dt><dd><code>12db84e163daba0f4d97ac1cb37235e3506fab60c00ecffc503bb9dc50e0d7e0</code></dd><dt>Size</dt><dd>5.5 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/sol-esc-prs-22100-edds-ddid-demo.pptx">sol-esc-prs-22100-edds-ddid-demo.pptx</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An 80-slide ESOC training presentation, 'EDDS / DDID – Presentation & Demo', first given on 28 September 2017 by Daniel Werner (Mission Data Systems Manager for BepiColombo) and Rui Santos (Technical Officer for EDDS), and updated by Paula Margarido for Solar Orbiter in January 2019. It introduces external users (instrument teams and the Science Ground Segment) to the Solar Orbiter Data Delivery Interface Control Document (DDID) and to the EGOS Data Dissemination System (EDDS).

The DDID part gives the document status (issue 1.0 of 2013, issue 1.2 expected in mid 2019), its relation to the generic EDDS External User ICD (issue 15.0, February 2018), how change records and attached XML schema files are provided, and the relevant chapters. The EDDS part explains its purpose (controlled access to mission data for users without MCS access), the archives it reads (PARC, DARC, FARC and file system), what it is not (a data warehouse or analysis tool), client baselines, the web, Java Web Start and standalone clients, security (LDAP users, roles, data access and quota sets, HTTPS, SFTP, AES encryption), batch and stream services and delivery options, and the architecture (EUD-based client, Tomcat web server, EDDS server, delivery manager).

A long section walks through the client user interface with example requests, then lists every batch request type (PARC TM/TC/event raw, report, gap and statistics requests, out-of-limits reports, DARC parameter requests, FARC and file-system requests) and the response formats (ProtoBuf binary, EDDS Raw, GDDS Binary, XML, XSLT transform, ASCII), together with the SCOS-2000 packet header concept. It ends with good practice (compression, file-split naming), recommendations (packet reports with raw data, ProtoBuf), and a questionnaire on network and SFTP/GFTS set-up.


## Key points

- The Solar Orbiter DDID complements the generic EDDS External User ICD (EGOS-GEN-EDDS-ICD-1001, issue 15.0 of 2018/02/16); at the time, DDID issue 1.0 (2013/09/10) was current and issue 1.2 was expected in mid 2019, issue 1.1 having been internal only. *(PDF p. 5)*
- XML schema files are attached to the DDID PDF as a ZIP file with a dummy '.removeThisExtension' suffix to by-pass PDF reader security. *(PDF p. 7)*
- EDDS provides controlled access to mission data for users without access to the MCS, by retrieving data from PARC (packets), DARC (parameters), FARC (files) and the file system; it keeps backward-compatible interfaces of its predecessors GDDS and TDRS. *(PDF p. 10)*
- EDDS is not a data warehouse (response files are stored only for a limited time) and not a post-processing or analysis tool. *(PDF p. 11)*
- EDDS users are authenticated against an LDAP server; access is based on user roles, data access sets, operation data sets and quota sets; HTTPS and SFTP are used and AES encryption of data is supported. *(PDF p. 15)*
- EDDS components: an EUD-based client, an Apache Tomcat web server (HTTPS/SOAP portal and authentication), the EDDS server (authorisation, quota, retrieval, filtering, formatting, compression, encryption) and a delivery manager. *(PDF p. 19)*
- 'Packet TM' returns raw source packets without extra headers, while 'Packet TM Raw PARC data' returns the full SCOS-2000 packet with common and TM headers; 'Packet TC Report' is the TC history. *(PDF p. 46)*
- The out-of-limits record report shows only raw values, not engineering values. *(PDF p. 49)*
- Response formats are Binary (Google ProtoBuf or physical files), EDDS Raw (ASCII hex string), GDDS Binary, XML (with XSLT transform) and ASCII; ProtoBuf is described as the best-performing format, and framed messages are length-prefixed. *(PDF p. 60)*
- Recommendations: use 'Pkt Reports' including raw data, and the Binary (ProtoBuf) response format whenever possible; request zip or tar.gz compression. *(PDF p. 72)*


## Cited by these wiki pages (4)

- [EDDS request and data formats](../scos2000/edds-formats.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (41 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Presenters | 2 |
    |  | Outline | 3 |
    |  | DDID Overview | 4 |
    |  | DDID – Track-changes with each future version | 6 |
    |  | DDID – attached EDDS Schema files | 7 |
    |  | DDID – ToC and Relevant Chapters | 8 |
    |  | EDDS Overview | 9 |
    |  | EDDS Introduction | 10 |
    |  | EDDS is not… | 11 |
    |  | EDDS Client Application | 12 |
    |  | Supported EDDS Client baselines | 13 |
    |  | EDDS – some security aspects | 15 |
    |  | EDDS Services | 16 |
    |  | EDDS data delivery types (details) | 17 |
    |  | EDDS Architecture | 18 |
    |  | EDDS design and architecture (1) | 19 |
    |  | EDDS design and architecture (2) | 20 |
    |  | EDDS Client User Interface | 21 |
    |  | EDDS Client UI – Example 1: Request Building | 32 |
    |  | EDDS Client UI – Example 2: Request Filter | 35 |
    |  | EDDS Client UI – Example 3: Delivery Options | 38 |
    |  | EDDS Client UI – Request Status Options | 39 |
    |  | EDDS Client UI – Opening Response Files | 40 |
    |  | EDDS Request Types | 42 |
    |  | EDDS Services – batch data delivery request types | 44 |
    |  | EDDS Services – DATA_PROVISION Request Type | 45 |
    |  | Batch Request Types – PARC TM Requests | 46 |
    |  | Batch Request Types – PARC TC Requests | 47 |
    |  | Batch Request Types – PARC OOL Report Request | 49 |
    |  | Batch Request Types – DARC Requests | 50 |
    |  | Batch Request Types – FARC Requests | 51 |
    |  | Batch Request Types – File System Requests | 52 |
    |  | EDDS Data Definition Details | 53 |
    |  | EDDS Services – available data formats | 55 |
    |  | EDDS Data Format Definition (Binary, ProtoBuf, EDDS Raw, GDDS Binary, XML, XML Transform, ASCII) | 56 |
    |  | SCOS-2000 Packet Format Definition | 67 |
    |  | Good Practice | 68 |
    |  | Recommendations | 71 |
    |  | In case of problems | 73 |
    |  | User Questionnaire | 74 |
    |  | Questions? | 80 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [BC-ESC-IF-05011](../references/index.md#ref-bc-esc-if-05011) | Solar Orbiter DDID (Data Delivery Interface Control Document) | 1.0 2013/09/10 | mentioned |
|  | [EGOS-GEN-EDDS-ICD-1001](../references/index.md#ref-egos-gen-edds-icd-1001) · [library](euicd-unversioned.md), [library](euicd-i15r0.md), [library](euicd-v25.md), [library](euicd-v13.md) | EDDS EUICD (External User ICD) | 15.0 2018/02/16 | mentioned |
|  | [catalogue](../references/index.md#ref-solar-orbiter-planning-icd-plid) | Solar Orbiter Planning ICD (PLID) |  | mentioned |
|  | [catalogue](../references/index.md#ref-google-protocol-buffers-https-developers-google-com-protocol-buffers) | Google Protocol Buffers (https://developers.google.com/protocol-buffers/) |  | mentioned |
|  | [catalogue](../references/index.md#ref-advanced-encryption-standard-aes) | Advanced Encryption Standard (AES) |  | mentioned |

!!! note "Notes"
    Source is a PowerPoint (.pptx) file, so there are no PDF pages: srcgrep reports every match as p.1. In this record every pdf_page value is the slide number (slides 1 to 80, in presentation order, verified against the slide list in the file). Many slides are screenshots of the EDDS client with little text (slides 22-41). Slide 5 prints the DDID reference as 'BC-ESC-IF-05011', whereas the DDID itself (library item solo-ddid-i1r2) prints 'SOL-ESC-IF-05011'. Slide 48 lists Solar Orbiter custom field names in a table that the text extraction reduces to '0'. Slide 59 is a hex dump of an example ProtoBuf response. The document ID and date in the file name (SOL-ESC-PRS-22100, Is.1, Rev.0, 2019-01-30) are not printed on the slides. Presenter e-mail addresses on slide 80 and server URLs on slide 23 are not reproduced here.

