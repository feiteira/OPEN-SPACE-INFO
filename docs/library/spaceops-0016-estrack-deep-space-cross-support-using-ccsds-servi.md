---
title: "ESTRACK deep-space cross support with CCSDS SM (SpaceOps25)"
description: "A SpaceOps 2025 paper from the ESTRACK Scheduling Office (ESO) at ESOC on cross support: booking ground station passes from other networks for ESA missions, and selling ESTRACK deep-space capacity to "
tags: ["Paper", "Ground stations, NCTRS/NIS and SLE"]
sources: [spaceops-0016-estrack-deep-space-cross-support-using-ccsds-servi]
---

# ESTRACK Deep Space Cross support using CCSDS Service Management

<dl class="osi-meta"><dt>Document ID</dt><dd>SpaceOps-2025, ID # 16</dd><dt>Date</dt><dd>2025-05</dd><dt>Organisation</dt><dd>ESA/ESOC (with SERCO and Scotty Consulting); presented at the 18th International Conference on Space Operations (SpaceOps 2025), Montreal, Canada, 26 - 30 May 2025</dd><dt>Authors</dt><dd>Martin UNAL, Matthew REED, Szymon STUGLIK, Colin Haddow</dd><dt>Type</dt><dd>Paper</dd><dt>Status</dt><dd>Conference paper. 'Copyright ©2025 by European Space Agency', published by the Canadian Space Agency on behalf of SpaceOps (PDF p. 1).</dd><dt>Pages</dt><dd>9</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://publications.spaceops.org/2025/download_by_id.php?id=0016" rel="noopener">https://publications.spaceops.org/2025/download_by_id.php?id=0016</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:52:56Z</dd><dt>SHA-256</dt><dd><code>31c4b03286d5f53ee5203df93b604cb465e81c3ab37aee4ed40a9c37384d832e</code></dd><dt>Size</dt><dd>445.1 KB</dd><dt>Our copy</dt><dd><a href="../third-party/nis/spaceops-0016-estrack-deep-space-cross-support-using-ccsds-servi.pdf">spaceops-0016-estrack-deep-space-cross-support-using-ccsds-servi.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A SpaceOps 2025 paper from the ESTRACK Scheduling Office (ESO) at ESOC on cross support: booking ground station passes from other networks for ESA missions, and selling ESTRACK deep-space capacity to other agencies and commercial users. ESTRACK interfaces with 6 providers and serves 5 external partners, using CCSDS Service Management (SM) formats wherever possible. These are the Simple Schedule Format (SSF) and the then-draft Service Management Utilization Request Formats (SMURF).

The paper describes the internal tools. The ESTRACK Planning System (EPS) solves the users' standing orders into a baseline booking, covering 4 weeks for low Earth orbit and up to 12 months for deep space. The ESTRACK Management System web Portal (EMSP) handles change requests as a state machine, as user or provider, through the web or system to system over REST and files. External formats are mapped onto a stable core by XSL transforms ('XSL shielding'), so that each bilateral interface can change independently.

It identifies the minimal common data set of every cross-support interface (spacecraft, ground station, beginning and end of track, service definition, service parameters, user and provider IDs). It contrasts 'replace all' bulk requests with SMURF add/modify/delete requests. It explains why ESTRACK closes the loop with the provider's SSF support list rather than per-request confirmation (SPDF), and why named service bundles such as 'TTC' worked better than layered CCSDS functional services. The lessons learned favour minimal exchanged information, files as well as REST, and XML with XSD validation. The way forward and conclusion discuss standing orders, flexible requests and other CCSDS SM topics (SMAC, SACP, SMASH), against the risk of proprietary commercial APIs. It is a practical companion to [SLE service management](../ccsds/sle/service-management.md).


## Key points

- The latest ESTRACK Deep Space Terminal loading forecast shows ESTRACK deep-space capacity being exhausted, so access to external resources is needed at peak periods. *(PDF p. 1)*
- In two decades the number of ESA flying spacecraft tripled while ESTRACK capacity stayed stable. ESTRACK now interfaces with 6 providers and serves 5 external partners, and uses CCSDS Service Management [1] for its interfaces whenever possible. *(PDF p. 2)*
- The EPS solver turns mission agreements and standing orders into a baseline booking covering typically 4 weeks for the LEO network and up to 12 months for deep-space assets. Change requests are checked for validity, conflict, technical feasibility and, for external providers, availability. *(PDF p. 2)*
- The SSF data format [2] proved a good way to 'close the loop' in all circumstances, such as provider-initiated changes, pending negotiations and disputed cancellations. Immediate confirmation alone does not cover every case. *(PDF p. 3)*
- EMSP supports both REST and file-based exchange, and treats manual and machine-generated requests identically. Gaia's MPS used standing orders to specify tracking time for every day of its 10-year mission (daily downlink needs of 6 to 24 hours). *(PDF p. 4)*
- All exchanges are XML files. XSL transforms ('User-Provider translators') map each third party's format onto a stable core, so that each point-to-point interface is independent and transforms can be edited without stopping the application. *(PDF p. 5)*
- Every cross-support interface contains five items: user (spacecraft codename), resource (site or terminal), beginning of track, end of track, and service definition. Service parameters, user ID and provider ID complete the minimal set. With it, ESTRACK interfaces with 6 agencies and 5 commercial entities. *(PDF p. 6)*
- Since 2017 ESTRACK has used the published SSF and the draft SMURF (White Book 0.06) for all new interfaces. SMURF's add/modify/delete requests allow per-request change tracking, at the cost of more complexity in the booking system than legacy 'replace all' requests. *(PDF p. 6)*
- ESTRACK network operations are fully automated: each service type maps to a scheduling template. A published catalogue of 'user scheduled events' (e.g. start/stop uplink or recording at absolute times) has become a de facto standard for ESTRACK users and providers. *(PDF p. 7)*
- File-based interfaces proved more robust than REST alone, because cybersecurity changes can block ports with little notice. The CCSDS layered functional service list (online telemetry, uplink, ranging, DDOR...) was awkward in practice, and bundled service names such as 'TTC' worked better. *(PDF p. 7)*
- Individual request confirmation (CCSDS SPDF) was rated essential during EPS design but never used. ESTRACK relies on the passes listed in the SSF reply, and only one provider supports SPDF. *(PDF p. 8)*
- SMURF proposes flexible requests (earliest start, latest end, minimum and maximum track duration), but no implementation supports them yet. *(PDF p. 9)*


## Cited by these wiki pages (4)

- [Ancillary systems, MICONYS and the move to EGS-CC](../scos2000/ancillary-and-egs-cc.md)
- [NCTRS, NIS and the ground station interface](../scos2000/nctrs-nis.md)
- [SLE cross support reference model and service management](../ccsds/sle/service-management.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (22 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | Abstract | Abstract | 1 |
    | Acronyms | Acronyms/Abbreviations | 2 |
    | 1 | Introduction | 2 |
    | 2 | Inside the box – ESTRACK Scheduling Office tools & processes | 2 |
    | 3 | Interfacing the world | 3 |
    | 3.1 | Overall process | 3 |
    | 3.2 | Interfacing with Users | 4 |
    | 3.3 | Interfacing with provider | 4 |
    | 4 | Cross Support Interface Commonality | 5 |
    | 4.1 | Data | 5 |
    | 4.2 | Format | 6 |
    | 4.3 | Process | 6 |
    | 4.4 | Service Definition | 6 |
    | 4.5 | Support execution | 7 |
    | 5 | Lessons Learned | 7 |
    | 5.1 | Things that worked well | 7 |
    | 5.2 | It looked like a good idea… | 7 |
    | 6 | Way forward | 8 |
    | 6.1 | Service definition | 8 |
    | 6.2 | Planning | 8 |
    | 7 | Conclusion | 9 |
    | References | References | 9 |


## Documents this one references (5)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [1] | [CCSDS 910.11-B-1](../references/index.md#ref-ccsds-910-11-b-1) | "Space Communication Cross Support— Service Management—Service Specification", Recommended Standard, Blue Book Issue 1 | Issue 1 August 2009 | bibliography |
| [2] | [CCSDS 902.1-B-1](../references/index.md#ref-ccsds-902-1-b-1) | "Simple Schedule Format Specification", Draft Recommended Standard, Blue | May 2018 | bibliography |
| [3] | [CCSDS 902.9-W-0.06](../references/index.md#ref-ccsds-902-9-w-0-06) | "Service Management Utilization Request Formats", Proposed Draft Recommended Standard, White Book Draft | 0.06 July 2018 | bibliography |
| [4] | [catalogue](../references/index.md#ref-h-dreihahn-c-haddow-and-m-unal-ccsds-compliant-ground-network-schedule-interface) | H. Dreihahn, C. Haddow and M. Unal, "CCSDS compliant Ground Network Schedule Interfaces from an ESA perspective", Spaceops, Daejeon, Republic of Korea | 2016 | bibliography |
| [5] | [DHSO-ESOC-EMSP-SUM-1001-HSO-GIB](../references/index.md#ref-dhso-esoc-emsp-sum-1001-hso-gib) | "EMS Portal - Software User Manual" |  | bibliography |

!!! note "Notes"
    The extraction reports 10 PDF pages against 9 printed pages, and the last PDF page is empty. Figure 1 (EMSP request state machine, PDF p. 3) and Figure 2 (XSL shielding, PDF p. 5) are images. The author block prints e-mail addresses, which are omitted here. The design list on PDF p. 5 calls the portal 'EMPS', a typo for EMSP. Reference [2] is printed as a 'Draft Recommended Standard' with a Blue Book number (902.1-B-1). The paper is about scheduling and booking (service management), not the SLE transfer services, and does not mention SCOS-2000 or NCTRS/NIS. Related library items: ccsds-902-0-902x0g1 (extensible service management concept, Green Book) and ccsds-902-4-902x4b1 (service package data formats); CCSDS 910.11-B-1 and the SSF/SMURF books are not in the library.

