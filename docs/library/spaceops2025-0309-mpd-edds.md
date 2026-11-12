---
title: "CCSDS Mission Product Distribution vs EDDS (SpaceOps 2025)"
description: "A SpaceOps 2025 paper by ESA/ESOC, CGI and NASA JPL presenting the CCSDS Mission Product Distribution (MPD) services."
tags: ["Paper", "ESOC evolution and context"]
sources: [spaceops2025-0309-mpd-edds]
---

# CCSDS Mission Product Distribution Services - New interoperability standard for exchanging mission data products

<dl class="osi-meta"><dt>Document ID</dt><dd>SpaceOps-2025, ID # 309</dd><dt>Date</dt><dd>2025</dd><dt>Organisation</dt><dd>European Space Agency, European Space Operations Centre (ESOC), with CGI Deutschland and NASA Jet Propulsion Laboratory (California Institute of Technology)</dd><dt>Authors</dt><dd>Dominik Marszk, Daniel Fischer, Mehran Sarkarati, Cesar Coelho, Rob Tapella, Wai Phyo, Paul Ramirez</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>SpaceOps 2025 paper, ID # 309. It describes MPD as being 'in the final stages of CCSDS Agency Review', with the draft cited as CCSDS 522.2-R-2 (Red Book, July 2024), a Prototype Report (Yellow Book) in preparation and Blue Book publication expected in Q3–Q4 2025 (PDF p. 11). Whether the Blue Book has since been published is not stated in the source.</dd><dt>Pages</dt><dd>11</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://publications.spaceops.org/2025/download_by_id.php?id=0309" rel="noopener">https://publications.spaceops.org/2025/download_by_id.php?id=0309</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:07:07Z</dd><dt>SHA-256</dt><dd><code>ebde588f5060888d5101be8339acbdb5124944d0ba3527b5b69cee033e79cb26</code></dd><dt>Size</dt><dd>836.6 KB</dd><dt>Our copy</dt><dd><a href="../third-party/context/spaceops2025-0309-mpd-edds.pdf">spaceops2025-0309-mpd-edds.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A SpaceOps 2025 paper by ESA/ESOC, CGI and NASA JPL presenting the CCSDS **Mission Product Distribution (MPD)** services. MPD is a draft CCSDS Mission Operations (MO) standard from the Spacecraft Monitoring and Control working group for querying, retrieving and subscribing to mission data products across agencies. It is specified with the MO Message Abstraction Layer (MAL), and consumer and provider interfaces can be auto-generated for Java, C, C++ and Go.

The information model separates ProductType (with attribute definitions) from Product instances (creation and content dates, source, attributes, body). StandingOrder captures a subscription, with ProductFilter, TimeWindow and AttributeFilter (value range, value set, string pattern) for selection. There are three services. **Product Retrieval** offers listProducts, getProducts and deliverProductFiles. **Order Management** offers list, submit and cancel for standing orders. **Product Order Delivery** offers notifyProductDelivery and deliverProducts. Use cases cover on-demand retrieval, scripted pulling, subscriptions, and delivery by service message or file transfer to a URI.

For this wiki the main interest is section 3.1, which maps ESA's [EDDS](../scos2000/edds.md) onto MPD (see [EDDS request and data formats](../scos2000/edds-formats.md)). The EDDS interface is a SOAP/WSDL service with XML schema plus a REST service. Its batch and stream requests correspond to standing orders, getResponse to delivery notifications, getJobs and getStatus to listStandingOrders, and getCatalogue to listProducts. The paper notes that EDDS lacks advanced metadata filtering and live delivery notifications, and that EDDS product types such as PktTm, PktTc and PktEv are specific to the SCOS and EGS-CC data models. NASA AMMOS DataDrive is mapped in the same way. An ESA/JPL prototype built during 2024 on ESA's Java MO stack validated the draft and found naming, nullability and field-type issues. The paper closes with future applications and enhancements.


## Key points

- MPD is being standardised by the CCSDS Spacecraft Monitoring and Control (SM&C) Working Group on top of the CCSDS Mission Operations (MO) framework, whose core is the Message Abstraction Layer (MAL); machine-readable service specifications are published in the SANA registry. *(PDF p. 2)*
- MPD defines three services: Product Retrieval, Order Management and Product Order Delivery; use of MO MAL is the default but not mandatory. *(PDF p. 3)*
- Information model: ProductType (name, description, AttributeDef list), Product (type, creationDate, contentDate, source, attributes, file metadata, body) and StandingOrder (filter, delivery method, validity window, target). *(PDF p. 4)*
- Filtering uses ProductFilter (type, domain, sources, attribute filters), TimeWindow and AttributeFilter variants ValueRange, ValueSet and StringPattern. *(PDF p. 5)*
- Product Retrieval operations: listProducts, getProducts (progress interaction) and deliverProductFiles (transfer to a URI with per-file status); Order Management: listStandingOrders, submitStandingOrder, cancelStandingOrder. *(PDF p. 5)*
- Product Order Delivery publishes notifyProductDelivery for file-transfer deliveries and deliverProducts for full product instances via publish-subscribe. *(PDF p. 6)*
- The EDDS interface is a SOAP-based WSDL service with XML schema (data requests, job submission and tracking, catalogue queries, user account management); EDDS also offers a REST-based service. *(PDF p. 6)*
- EDDS-to-MPD mapping: batchRequest()/streamRequest() to submitStandingOrder(); getResponse() to notifyProductDelivery()/deliverProducts(); getJobs()/getStatus() to listStandingOrders(); getCatalogue() to listProducts() + ProductFilter; FileServerDelivery/ServerDelivery to FILETRANSFER/SERVICE_COMPLETE. *(PDF p. 6)*
- EDDS has no advanced filtering and metadata search, does not typically forward live delivery notifications (job status is polled) and uses login credentials yielding authorisation tokens; EDDS product types PktEv, PktTc and PktTm are specific to SCOS and EGS-CC data models. *(PDF p. 7)*
- ESA and NASA/JPL each built an independent MPD provider prototype during 2024 (completing in 2025) against a shared Java MO test harness with file:// transfers only, a mandatory step before Blue Book publication. *(PDF p. 8)*
- Prototyping found structural naming inconsistencies, misapplied nullable attributes and inappropriate field types, which were fixed in the data model. *(PDF p. 9)*
- MPD was expected to be published as a CCSDS Blue Book in Q3–Q4 2025, with a Prototype Report (Yellow Book) in preparation. *(PDF p. 11)*


## Cited by these wiki pages (3)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [EDDS: EGOS Data Dissemination System](../scos2000/edds.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (22 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract and Acronyms/Abbreviations | 1 |
    | 1 | Introduction | 2 |
    | 2 | Overview of the CCSDS Mission Product Distribution (MPD) Standard | 3 |
    | 2.1 | MPD Information Model Overview | 4 |
    | 2.2 | MPD Service Specifications | 5 |
    | 2.2.1 | Product Retrieval Service | 5 |
    | 2.2.2 | Order Management Service | 5 |
    | 2.2.3 | Product Order Delivery Service | 6 |
    | 2.3 | Use Cases | 6 |
    | 3 | Comparison with Existing Interfaces | 6 |
    | 3.1 | EGOS Data Disposition System (EDDS) | 6 |
    | 3.1.1 | Key Differences and Observations | 6 |
    | 3.2 | NASA AMMOS DataDrive | 7 |
    | 3.2.1 | Key Differences and Observations | 7 |
    | 3.3 | Summary of Comparison | 8 |
    | 4 | Inter-Agency Prototyping and Validation | 8 |
    | 5 | Potential Future Applications and Integrations | 9 |
    | 5.1 | Application Scenarios | 9 |
    | 5.2 | Benefits of MPD for New Missions | 10 |
    | 5.3 | Future Enhancements and Considerations | 10 |
    | 6 | Conclusions | 10 |
    | References | References | 11 |


## Documents this one references (11)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [CCSDS 522.2-R-2](../references/index.md#ref-ccsds-522-2-r-2) | Mission Operations - Mission Data Product Distribution Services, CCSDS Red Book | R-2 July 2024 | bibliography |
| [2] | [CCSDS 520.0-G-3](../references/index.md#ref-ccsds-520-0-g-3) | Mission Operations Services Concept, CCSDS Green Book | G-3 December 2010 | bibliography |
| [3] | [catalogue](../references/index.md#ref-sana-registry-for-mo-schemas-http-sanaregistry-org-r-moschemas) | SANA Registry for MO Schemas: http://sanaregistry.org/r/moschemas/ |  | bibliography |
| [4] | [catalogue](../references/index.md#ref-sana-registry-link-for-mpd-xml-definition-https-beta-sanaregistry-org-r-moschema) | SANA Registry Link for MPD XML Definition: https://beta.sanaregistry.org/r/moschemas/area009-v001-MPD.xml |  | bibliography |
| [5] | [CCSDS 521.0-B-3](../references/index.md#ref-ccsds-521-0-b-3) | Mission Operations Message Abstraction Layer, CCSDS Blue Book | B-3 March 2024 | bibliography |
| [6] | [catalogue](../references/index.md#ref-ops-sat-preparing-for-the-operations-of-esa-s-first-nanosat-d-evans-at-lange-jl-) | OPS-SAT: Preparing for the Operations of ESA's First NanoSat, D Evans, AT Lange, JL Feiteirinha, J Nörtemann, C Coelho, 14th International Conference on Space Operations |  | bibliography |
| [7] | [catalogue](../references/index.md#ref-sat-2-onboard-ai-apps-for-earth-observation-a-marin-c-coelho-f-deconinck-i-babki) | Φ-Sat-2: Onboard AI Apps for Earth Observation, A Marin, C Coelho, F Deconinck, I Babkina, N Longepe, M Pastena, Space and Artificial Intelligence 2021 | 2021 | bibliography |
| [8] | [catalogue](../references/index.md#ref-ccsds-mission-operations-directory-service-paving-the-road-for-a-new-world-of-se) | CCSDS Mission Operations Directory service: Paving the road for a new world of services' discoverability, C Coelho, S Cooper, M Sarkarati, M Merri, O Koudelka, 4S Symposium |  | bibliography |
| [9] | [RFC 3986](../references/index.md#ref-rfc-3986) | T. Berners-Lee, R. Fielding, and L. Masinter, Uniform Resource Identifier (URI): Generic Syntax, RFC 3986, Reston, Virginia, ISOC | January 2005 | bibliography |
| [10] | [catalogue](../references/index.md#ref-ccsds-sm-c-wg-issue-tracker-https-github-com-ccsdsmo-smc-backlog-issues) | CCSDS SM&C WG Issue Tracker: https://github.com/ccsdsmo/smc-backlog/issues |  | bibliography |
| [11] | [CCSDS A02.1-Y-4](../references/index.md#ref-ccsds-a02-1-y-4) | Organization and Processes for the Consultative Committee for Space Data Systems, CCSDS Yellow Book | Y-4 April 2014 | bibliography |

!!! note "Notes"
    The corresponding author's e-mail address is omitted here. The paper expands EDDS as 'EGOS Data Disposition System' and EGOS as 'ESA Ground Operation System'; other library items use 'EGOS Data Dissemination System'. The standard's title is printed as 'Mission Data Product Distribution Services' in reference [1] and as 'Mission Product Distribution (MPD) Services' in the text. The year 2025 is the conference year (SpaceOps 2025, Montreal, 26-30 May 2025, from the page header that the extraction carries); no other date is printed. Figures 1-3 and 5 are reproduced from the CCSDS standard or are diagrams without extracted text. The extraction reports 12 PDF pages (registry: 11); the last is empty.

