---
title: "Minutes: SCOS 2000 and FIRST/Planck meeting (Apr 2000)"
description: "Minutes (reference TOS-OF/2000/318/SJD/HS, dated 20 April 2000) of the meeting at ESOC between ESA and the FIRST and Planck instrument principal-investigator (PI) groups."
tags: ["Minutes", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [scos2000-and-first-planck-mom]
---

# SCOS 2000 and FIRST/PLANCK

<dl class="osi-meta"><dt>Document ID</dt><dd>TOS-OF/2000/318/SJD/HS</dd><dt>Date</dt><dd>2000-04-20</dd><dt>Organisation</dt><dd>European Space Agency, ESOC (TOS-OF)</dd><dt>Type</dt><dd>Minutes</dd><dt>Status</dt><dd>Minutes dated 20 April 2000 of the meeting dated 19 April 2000 at ESOC H-I (form header, PDF p. 1). Open action items for J-F. Kaufeler are marked 'AI' (PDF p. 4).</dd><dt>Pages</dt><dd>5</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000396/SCOS%202000%20and%20FIRST_PLANCK%20MoM.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000396/SCOS%202000%20and%20FIRST_PLANCK%20MoM.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:09:47Z</dd><dt>SHA-256</dt><dd><code>b8222c9326ed410b7c5d9e2d5b1e30aa2929d4729a1875c96b423ea755a53f9c</code></dd><dt>Size</dt><dd>42.9 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/scos2000-and-first-planck-mom.pdf">scos2000-and-first-planck-mom.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Minutes (reference TOS-OF/2000/318/SJD/HS, dated 20 April 2000) of the meeting at ESOC between ESA and the FIRST and Planck instrument principal-investigator (PI) groups. The subject was adopting [SCOS-2000](../scos2000/index.md) for instrument EGSE and real-time assessment (RTA). ESOC was represented by J F Kaufeler, J Dodsworth and N Peccia, and ESTEC by B E Melton, J Riedinger and P Estaria. The other participants came from TESRE/CNR, OAT, MPE, RAL, LAL, LABEN, IAS, SRON and KUL.

The minutes follow the agenda. C Mazza (Head of TOS-G) stated that ESA/TOS would support SCOS 2000 for both flight operations and EGSE development. P Estaria confirmed SCOS 2000 as the baseline for MOC operations. ESOC reported that the Solaris COTS set would also be available on Linux and that ObjectStore would probably be replaced. B Melton's PROBA account covers several points. SCOS 2 was the basis of the system, and its ORACLE database was extended to the SCOE equipment. A Delphi-based router carries a TM processor that extracts virtual channels or packets from transfer frames. The TC COP protocol runs in the router through a COTS product. Messages to and from the SCOEs are routed by APID, using APIDs outside the spacecraft range. Test procedures were written in Tcl/Tk.

The minutes go on to record licence and service terms (help desk included in a 35 KEURO/year/user service price), the handling of the PIs' Delta URD (ESOC keeps one product line; changes are funded as ESA infrastructure or by the customer) and the PIs' need for a core option by May 2001 for DPU testing. All PI groups unanimously stated their intention to use SCOS 2000 as the basis for EGSE and RTA. Companions: the [agenda](scos2000-meeting-agenda-2000.md), the [slides](tos-gc-first-planck-presentation-2000.md) and the [licence note](spire-sw-licence-application.md); see [SCOS-2000 as EGSE](../scos2000/egse.md).


## Key points

- C Mazza: SCOS 2000 is a stable, mature, reliable product, and ESA/TOS will support it for both flight operations and EGSE development. *(PDF p. 1)*
- The baseline for MOC operations is SCOS 2000; ESOC was to ask for a comment in the ITT that SCOS 2000 is the baseline for the core of the Flight Control System. *(PDF p. 1)*
- ESOC confirmed that the COTS set available for Solaris would be available on Linux (Windows NT under investigation) and that ObjectStore would probably be replaced by a cheaper object database. *(PDF p. 2)*
- PROBA EGSE: SCOS 2 was the basis; its ORACLE database was extended to the SCOE equipment, addressed like a spacecraft subsystem; the router is Delphi based. *(PDF p. 2)*
- The PROBA TM processor takes transfer frames and extracts virtual channels or packets for onward routing; TM throughput depends on packet size, number of VCs and DMA characteristics. *(PDF p. 2)*
- The TC COP protocol is built into the PROBA router using a COTS product from De Lande Long; this is probably not needed for an instrument SCOE. *(PDF p. 2)*
- The test procedure environment (TPE) accesses the ORACLE database directly at compilation time; messages to SCOEs are routed by APID, using APIDs outside the spacecraft range. *(PDF p. 2)*
- A common project database is to be provided by the Prime; ESOC's options were ORACLE, MS Access or custom solutions, and the MS-Access-based Integral database tool is compatible with SCOS 2000. *(PDF p. 2)*
- A first-level help desk is included in the service option price of 35 KEURO/year/user. *(PDF p. 3)*
- ESOC keeps one SCOS 2000 product line; changes are either infrastructure enhancements (ESA funded) or project-specific (customer funded), possibly delivered as add-ons. *(PDF p. 3)*
- The PIs need a core option by May 2001 to support DPU testing; the three FIRST instruments agreed a common EGSE development with requirements frozen about June 2000. *(PDF p. 3)*
- The interface with FINDAS will use DDS in the mission; the ESOC infrastructure would be ready between the end of 2001 and mid 2002. *(PDF p. 4)*
- Conclusion: all PI groups unanimously stated their intention to use SCOS 2000 as a basis for EGSE and RTA, to be reflected in the ITT documentation (IID). *(PDF p. 4)*


## Cited by these wiki pages (6)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Other missions and SCOS-2000 users](../missions/other-missions.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [SCOS-2000: ESA's mission control system](../scos2000/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (12 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Header, participants and subject | 1 |
    | 1 | Welcome by C Mazza (Head of TOS-G) | 1 |
    | 2 | Introduction by P Estaria | 1 |
    | 3 | SCOS 2000 Status (J F Kaufeler H/TOS-GC) | 2 |
    | 4 | EGSE and Supporting Elements [B Melton] | 2 |
    |  | Licences, COTS and service (slides 31-37) | 3 |
    | 8 | SCOS 2000 Delta URD | 3 |
    |  | Delta URD + Evaluation by ESOC | 4 |
    |  | Practical Arrangements | 4 |
    |  | Support and Service | 4 |
    |  | Conclusion | 4 |
    |  | Participants | 5 |


## Documents this one references (6)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
|  | [catalogue](../references/index.md#ref-agenda-see-attached) | Agenda (see attached) |  | mentioned |
|  | [catalogue](../references/index.md#ref-delta-urd-to-scos-2000-pi-requirements-not-consolidated) | Delta URD to SCOS 2000 (PI requirements, not consolidated) |  | mentioned |
|  | [catalogue](../references/index.md#ref-itt-invitation-to-tender-for-the-spacecraft) | ITT (invitation to tender) for the spacecraft |  | mentioned |
|  | [catalogue](../references/index.md#ref-presentation-slides-17-37-egse-and-supporting-elements-licence-cost-and-service-) | Presentation slides 17-37 (EGSE and supporting elements; licence, cost and service options) |  | mentioned |
|  | [catalogue](../references/index.md#ref-scos-2000-license-agreement-and-template-for-license-application) | SCOS 2000 license agreement and template for license application |  | mentioned |
|  | [catalogue](../references/index.md#ref-itt-documentation-iid) | ITT documentation (IID) |  | mentioned |

!!! note "Notes"
    The bilingual (English/French) form labels in the header use a symbol font whose text layer is shifted by 29 code points ('PHHWLQJGDWH' = 'meeting date', 'VXEMHFWREMHW' = 'subject/objet'). The footer address is garbled the same way; it has been decoded for this entry. The Greek capital delta of 'Δ-URD' extracts as '&lt;'. The header gives the meeting date as 19 April 2000, but the agenda (scos2000-meeting-agenda-2000) covers 18-19 April, and the minutes note '19/04/2000 resumption at point 8 of the Agenda' (PDF p. 3). The conclusion has a typo, 'SCOS 200'. No author is printed; 'SJD/HS' in the reference are initials. The participant list on PDF p. 5 gives e-mail addresses, which are omitted here. The text extraction has a trailing empty page 6.

