---
title: "Solar Orbiter E-FECS planning skeleton ICD"
description: "The Solar Orbiter E-FECS ICD (SOL-SGS-ICD-0006, issue 3.0, 5 October 2021, prepared by Christopher Watson at the Science Operations Centre, ESAC) defines the mission-planning interface through which t"
tags: ["Interface Control Document", "Mission data delivery documents"]
sources: [sol-sgs-icd-0006-efecs-icd-3-0]
---

# Solar Orbiter Enhanced Flight Events Communications Skeleton Interface Control Document (E-FECS ICD)

<dl class="osi-meta"><dt>Document ID</dt><dd>SOL-SGS-ICD-0006</dd><dt>Issue / version</dt><dd>Issue 3, Revision 0</dd><dt>Date</dt><dd>2021-10-05</dd><dt>Organisation</dt><dd>European Space Agency, ESAC (Solar Orbiter Science Operations Centre)</dd><dt>Authors</dt><dd>Christopher Watson</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Status 'Issue', Issue 3 Revision 0, date of issue 05/10/2021 (PDF p. 1); the approval block lists the SOC Development Manager and the ten instrument PIs but carries no signatures or dates (PDF p. 2). Classified 'ESA UNCLASSIFIED - For Official Use'.</dd><dt>Pages</dt><dd>51</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://solarorbiter.irap.omp.eu/documents/MOC/SOL-SGS-ICD-0006-EFECSICD-3.0.pdf" rel="noopener">https://solarorbiter.irap.omp.eu/documents/MOC/SOL-SGS-ICD-0006-EFECSICD-3.0.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:13:08Z</dd><dt>SHA-256</dt><dd><code>51c152e038330c32392ae6f3a65f627869bb2d7cae2e86704ce34102fa2346a3</code></dd><dt>Size</dt><dd>358.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/mission-ddid/sol-sgs-icd-0006-efecs-icd-3.0.pdf">sol-sgs-icd-0006-efecs-icd-3.0.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

The Solar Orbiter E-FECS ICD (SOL-SGS-ICD-0006, issue 3.0, 5 October 2021, prepared by Christopher Watson at the Science Operations Centre, ESAC) defines the mission-planning interface through which the SOC tells the instrument teams the global planning constraints before they prepare their Instrument Operations Requests (IORs) in short-term planning. The E-FECS (Enhanced Flight Events and Communications Skeleton, also called the planning skeleton) is an XML file produced by the SOC after long-term planning (LTP), based on the MOC's FECS and the flight-dynamics PTEL, to which the SOC adds science-planning windows.

Chapter 2 describes every event type and what it implies for instrument planning. Time stamps use the CCSDS ASCII time code B day-of-year format (YYYY-DDDThh:mm:ssZ, no sub-seconds, mandatory Z), and the document notes that the legacy planning systems ignore leap seconds. MOC-originated events include thruster firings (TCM, WOL), NAV windows, HGA/MGA/solar-array movements, VSTP pointing update markers, calibration events, rolls, remote-sensing windows (RSWs), solar conjunctions, pass and dump events, PTR windows, power, STP/LTP boundaries, maintenance windows, Sun-distance and thermal-control events, and ENG_WIN windows during which instrument TM/TC routing over the SSMM/SpaceWire network is suspended. SOC-added events include attitude disturbances, a pointing-type enumeration, slews, EMC noisy/quiet windows, in-situ burst coordination, RS-extended windows, TAC windows (re-routing of an instrument's science APIDs to a small turn-around-calibration store), heat-shield door operations, backup-plan split points and PSP events.

Chapter 3 covers delivery by GFTS at T-20 weeks for each six-month period and the file naming EFECS_M&lt;nn&gt;_V&lt;vv&gt;.xml (B instead of V for backup plans); chapter 4 points to the XML schema; chapter 5 lists open and resolved issues, including packet-store resizing and EMC from power variability.


## Key points

- The E-FECS is the mission-planning interface by which the SOC gives the instrument teams the global planning constraints before they plan IORs at STP; it is also called the Planning Skeleton and is used only in Cruise Phase, NMP and EMP. *(PDF p. 8)*
- MOC provides the FECS (from MOC-FCT, specified in the PLID Annex B) and the PTEL (from MOC-FD); the SOC produces the E-FECS after LTP, mainly by adding windows to the MOC inputs. *(PDF p. 9)*
- All E-FECS event times use the CCSDS ASCII time code B day-of-year form YYYY-DDDThh:mm:ssZ, with sub-seconds excluded and the Z suffix mandatory; short windows carry an integer duration in seconds. *(PDF p. 13)*
- The legacy planning systems at MOC and SOC do not recognise leap seconds, so a window containing a leap second may last one second longer than indicated. *(PDF p. 14)*
- During ENG_WIN windows all TM and TC routing from and to an instrument is suspended or not guaranteed because of SSMM/SpaceWire routing maintenance, so no planned instrument TCs may be submitted. *(PDF p. 28)*
- Low-latency data written to SpaceWire before the start of a PASS event will be downlinked in that pass (excluding special cases such as post-conjunction catch-up). *(PDF p. 22)*
- TAC windows re-route all of an instrument's science APIDs (other than low-latency data) to a small shared turn-around-calibration store; the downlink always serves HK and low-latency data first. *(PDF p. 40)*
- E-FECSs are delivered by GFTS about T-20 weeks before each roughly six-month planning period and are named EFECS_M[mtp-cycle-number]_V[version].xml, with B instead of V for backup plans. *(PDF p. 45)*
- Resizing SSMM packet stores loses data unless the stores are empty and needs a brief window without SSMM memory operations; how to represent resizing opportunities in the E-FECS is still open. *(PDF p. 48)*


## Cited by these wiki pages (6)

- [How Solar Orbiter uses PUS](../missions/solar-orbiter/pus-usage.md)
- [Missions](../missions/index.md)
- [Solar Orbiter](../missions/solar-orbiter/index.md)
- [Solar Orbiter SWA instrument database](../missions/solar-orbiter/swa.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [The standards landscape](../overview/standards-map.md)


??? abstract "Contents (50 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1 | Introduction | 8 |
    | 1.1 | Relationship E-FECS to MOC inputs | 9 |
    | 1.2 | Overview of planning cycles wrt E-FECS | 10 |
    | 1.3 | Applicable Documents | 10 |
    | 1.4 | Reference Documents | 10 |
    | 1.5 | Acronyms | 11 |
    | 2 | Description E-FECS elements and planning consequences | 13 |
    | 2.1 | Time and duration formats | 13 |
    | 2.2 | Headers | 14 |
    | 2.3 | Elements coming from MOC | 14 |
    | 2.3.1 | Planned thruster firings (and sun-illumination of normally-shadowed surfaces) | 14 |
    | 2.3.2 | NAV windows | 15 |
    | 2.3.3 | HGA/MGA/SA movements | 16 |
    | 2.3.4 | VSTP pointing update markers | 17 |
    | 2.3.5 | CALIB events | 18 |
    | 2.3.6 | Rolls | 19 |
    | 2.3.7 | RSWs | 20 |
    | 2.3.8 | Solar conjunction | 20 |
    | 2.3.11 | Pass events | 21 |
    | 2.3.12 | PTR_START and PTR_END | 22 |
    | 2.3.13 | POWER | 23 |
    | 2.3.14 | STP boundaries | 23 |
    | 2.3.15 | LTP boundaries | 24 |
    | 2.3.16 | Attitude maintenance activity windows | 24 |
    | 2.3.17 | Sun distance events | 27 |
    | 2.3.18 | Sun distance-related thermal control events | 27 |
    | 2.3.19 | TMTC onboard routing maintenance windows | 28 |
    | 2.4 | Elements superimposed by SOC | 29 |
    | 2.4.1 | Platform-created Attitude Disturbances | 29 |
    | 2.4.2 | Pointing type enumeration | 30 |
    | 2.4.3 | Slews | 33 |
    | 2.4.4 | Summary of attitude-related events | 34 |
    | 2.4.5 | EMC noisy/quiet windows | 35 |
    | 2.4.6 | In-Situ Burst Coordination | 39 |
    | 2.4.7 | RS-Extended Windows | 39 |
    | 2.4.8 | TAC windows | 40 |
    | 2.4.9 | Spacecraft Heatshield Door Operations | 41 |
    | 2.4.10 | Split point for “backup” LTP plans | 42 |
    | 2.4.11 | PSP events | 42 |
    | 3 | Delivery aspects | 44 |
    | 3.1 | Delivery mechanism | 44 |
    | 3.2 | Delivery timing and time-span | 44 |
    | 3.3 | Filename | 44 |
    | 3.3.1 | Handling of backup plans | 45 |
    | 4 | Schema | 47 |
    | 5 | Open issues | 48 |
    | 5.5 | Implementation of packet store resizing opportunities | 48 |
    | 5.6 | Control of EMC noisiness arising from power variability | 49 |
    | 5.9 | Impact of RS-synoptics | 50 |
    | 5.11 | Distinguishing different flavour of ATT_DIST | 50 |


## Documents this one references (12)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [FECS] | [SOL-ESC-IF-05012](../references/index.md#ref-sol-esc-if-05012) | Solar Orbiter PLID Annex B – MOC-SOC ICD | v2_0 May 2020 | applicable |
| [GFTS] | [SOL-SGS-ICD-0009](../references/index.md#ref-sol-sgs-icd-0009) | File-Transfer SOC&lt;-&gt;Instrument Teams ICD | v1_2 April 2020 | applicable |
| [SGS FD] | [SOL-ESC-IF-50005](../references/index.md#ref-sol-esc-if-50005) | Solar Orbiter SGS-FD ICD | v2_3 Jan 2021 | applicable |
| [PLID] | [SOL-ESC-IF-05010](../references/index.md#ref-sol-esc-if-05010) | Solar Orbiter Planning Interface Control Document (PLID) | v1_4 Aug 2019 | reference |
| [META] | [SOL-SGS-TN-0009](../references/index.md#ref-sol-sgs-tn-0009) | Metadata Definition for Solar Orbiter Science | v1.0 Jan 2015 | reference |
| [OOF] | [catalogue](../references/index.md#ref-solar-orbiter-spice-out-of-field-straylight-calibration-tn) | Solar Orbiter SPICE Out-Of-Field Straylight Calibration TN | v0_2 Dec 2020 | reference |
| [FLAT] | [SOL-SGS-TN-0019](../references/index.md#ref-sol-sgs-tn-0019) | Solar Orbiter EUI/PHI flatfield TN | v0_4 Nov 2020 | reference |
| [ROLL] | [SOL-SGS-TN-0018](../references/index.md#ref-sol-sgs-tn-0018) | Solar Orbiter Roll Scheduling Strategy TN | v0_5 Dec 2020 | reference |
| [ALIGN] | [SOL-SGS-TN-0035](../references/index.md#ref-sol-sgs-tn-0035) | Solar Orbiter Limb-pointing Alignment Calibration Pattern TN | v0_2 Sept 2019 | reference |
| [STAR] | [SOL-SGS-TN-0037](../references/index.md#ref-sol-sgs-tn-0037) | Solar Orbiter Star Calibration TN | v0_4 April 2020 | reference |
| [STRAY] | [SOL-SGS-TN-0036](../references/index.md#ref-sol-sgs-tn-0036) | Solar Orbiter Cross-like Calibration TN | v0_3 April 2020 | reference |
|  | [EIDA R-139](../references/index.md#ref-eida-r-139) | EID-A requirement R-139 (illumination of normally-shadowed surfaces) |  | mentioned |

!!! note "Notes"
    A mission-planning ICD rather than a TM/TC document; its relevance to this wiki is limited to Solar Orbiter operations context (time format, TM/TC routing windows, APID re-routing for TAC, packet stores). The cover prints the title on two lines ('Solar Orbiter Enhanced Flight Events Communications' / 'Skeleton Interface Control Document (E-FECS ICD)'), while the acronym list expands E-FECS as 'Enhanced Flight Events and Communication Skeleton'. The 'Title' field on PDF p. 2 is blank. The change record contains apparently duplicated or out-of-order revision blocks (for example two 'Issue 2 Revision 2' and two 'Issue 2 Revision 0' blocks, PDF pp. 4-5). Chapter 4 only says the schema is 'Available in Confluence next to this ICD'; the XSD is not included. PDF page indices equal printed page numbers (Page N/51); the extracted text has an empty 52nd page.

