---
title: "MIB Files Processing by HPSDB"
description: "An Alcatel Alenia Space technical note for Herschel/Planck."
tags: ["Technical Note", "MIB / Database Import ICD"]
sources: [h-p-1-asp-tn-1060-mib-processing-hpsdb]
---

# MIB files processing by HPSDB

<dl class="osi-meta"><dt>Document ID</dt><dd>H-P-1-ASP-TN-1060</dd><dt>Issue / version</dt><dd>1</dd><dt>Date</dt><dd>2006-02-07</dd><dt>Organisation</dt><dd>Alcatel Alenia Space - France</dd><dt>Authors</dt><dd>F. Chatte, S. Valera, T. Grassin, J.J. Juillet</dd><dt>Type</dt><dd>Technical Note</dd><dt>Status</dt><dd>The headers show Issue 1, dated 07022006. The change record (p. 3) lists only draft 1D1 (02/02/2006), sent to ESA to close action AI#69-13-04 and to be issued officially 'as soon as ESA agreed'. The title page (p. 1, scanned fax) carries signatures dated 7/3/06 (ESA verification, S. Valera) and 07-03-06 (approval).</dd><dt>Pages</dt><dd>45</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002697_DOC_ALC_RD54-H-P-1-ASP--TN-1060_01_MIB/RD54%20-%20H-P-1-ASP-TN-1060_01%20-%20MIB%20files%20processing%20by%20HPSDB.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/002697_DOC_ALC_RD54-H-P-1-ASP--TN-1060_01_MIB/RD54%20-%20H-P-1-ASP-TN-1060_01%20-%20MIB%20files%20processing%20by%20HPSDB.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:30Z</dd><dt>SHA-256</dt><dd><code>aa2c72678549f0c4594a69d7a3f60062164dbfc7163258007f8e98518bfa04ac</code></dd><dt>Size</dt><dd>1.7 MB</dd><dt>Our copy</dt><dd><a href="../third-party/mib-icd/h-p-1-asp-tn-1060-mib-processing-hpsdb.pdf">h-p-1-asp-tn-1060-mib-processing-hpsdb.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

An Alcatel Alenia Space technical note for Herschel/Planck. It describes how the Herschel/Planck System Database (HPSDB) ingests and regenerates MIB 'bridge files' in two flavours: the S2K flavour used by the SCOS-2000-based instrument EGSE (SCOS-2000 Database Import ICD issue 5.1) and the flavour used by the spacecraft Central Checkout System (CCS). Its goal is round-trip fidelity: it lists the constraints instrument teams must respect so that files loaded into HPSDB come back out identical. Constraints in bold cannot be checked by HPSDB and remain the user's responsibility.

Chapter 4 sets out 20 general rules, G1 to G20: the object data model, HPSDB identifier instantiation (subsystem letters, positions, generic items), special numbering for S2K curves, verification stages and parameter range sets, enumerated values, the different modelling of packet commutation, defaults, TM/TC sharing of curves, the 8-bit user category flag, generic TC packet headers, XML-reserved characters, the ban on octal radix, range allocation, automatic instantiation of APIDs and descriptions, mandatory descriptions, orphan items, sorting and derived-parameter files.

Chapter 5 then works through every MIB table field by field. For each field it gives input processing, the HPSDB attribute, output processing and the constraint to respect, from VDF through the monitoring, display and commanding tables to CCS-only tables (CUR, GRP, GRPA, GRPK, SCO, TCD, TMD, LGF). It notes which tables are ignored or generated from generic data, such as PIC, TCP, PCPC and PCDF, and which are not supported, such as command sequences and parameter sets. For an engineer it shows concretely how an industrial system database mapped onto the SCOS-2000 MIB, and where the two data models disagree, for example over TM-packet-to-SPID cardinality.


## Key points

- HPSDB both ingests S2K MIB files (instrument EGSE, MIB ICD 5.1, delivered by ESTEC) or CCS MIB files and generates them; the note lists the constraints on input bridge files needed to get identical output files. *(PDF p. 7)*
- Constraints printed in bold cannot be filtered by HPSDB and are the user's responsibility; non-bold constraints are checked by HPSDB at bridge-file loading time. *(PDF p. 7)*
- HPSDB allows an N-to-1 relation between TM packets and SPIDs, whereas the MIB ICD allows N-to-N (with only one relation valid at any time). *(PDF p. 7)*
- 'S2K' in this note means the instrument EGSE version 2.3eP5, based on SCOS 2000 2.3e. *(PDF p. 8)*
- At subsystem/model level an HPSDB CHAR identifier gets the subsystem letter in front ('Z' for a pseudo subsystem) and a 3-digit position appended (system pseudo position '999'); NUMBER identifiers get the subsystem number (A=00 ... Y=25, pseudo subsystem 26) in front. *(PDF p. 9)*
- Generic items use subsystem letter 'G', subsystem number '07', position '000' and element number '000'; all generic items are always extracted when MIB files are produced. *(PDF p. 10)*
- S2K curves referring to specific curves are coded as NUMBER(3); generic curves are coded as NUMBER(4) '1xxx', mapping to HPSDB generic curve 'G000xxx000'. *(PDF p. 10)*
- S2K command verification stages are coded NUMBER(4) for specific stages and NUMBER(5) '1xxxx' for generic stages (HPSDB '07xxxx000'); parameter range sets use NUMBER(3) and '1xxx' (HPSDB 'GRxxx000'). *(PDF p. 11)*
- HPSDB models packet commutation differently from SCOS: a packet or structure is a list of parameters, structures and (TC only) fixed areas with offsets, repetition counts and super-commutation attributes; it flags each TM packet as fixed (PLF only), variable (VPD only) or both. *(PDF p. 12)*
- Each HPSDB item has an 8-bit category flag, one bit per user type (AIT, operations, software, flight dynamics); MIB items are loaded as 'all except FDD' and output files are filtered by user type. *(PDF p. 13)*
- TC packet header types are defined generically in HPSDB; the TCP, PCPC and PCDF tables are ignored on loading, and CCF_PKTID must reference a generic HPSDB TC header. *(PDF p. 14)*
- Because HPSDB uses XML, the characters &gt; &lt; ' " and & must never be used; short descriptions are restricted to letters, digits, blank, plus, minus and underscore. *(PDF p. 14)*
- Octal radix ('O') is not allowed for unsigned integer values; only 'D' and 'H' are allowed. *(PDF p. 15)*
- When an element is instantiated in a subsystem, APID, PID and UDC/MISC parameter positions are computed automatically from element-level values plus position-dependent offsets, and the last character of the short description is overwritten. *(PDF p. 15)*
- Descriptions (xxx_DESCR), optional in the MIB ICD, are mandatory in HPSDB; empty ones are filled with the item identifier. Orphan items are not loaded. *(PDF p. 16)*
- For PID, HPSDB keeps the TM packet definition and the SCOS packet definition in two separate tables with an n-1 relation (one TM packet references only one SCOS packet), and forces a 1-1 link between PID and VPD where the ICD allows n-1. *(PDF p. 24)*
- PID_DFHSIZE defaults to 16 and must be the same for all TM source packets addressing the same SPID; PID_TIME is forced to 'Y' and only valid PID definitions (PID_VALID='Y') may be delivered. *(PDF p. 25)*
- The PIC table is defined in the generic part of HPSDB and must be identical on all Herschel/Planck SCOS and CCS systems to support 'smooth transition'; it is not loaded from bridge files. *(PDF p. 26)*
- CCF_HIPRI is not loaded but calculated: 'Y' if CCF_PKTID = 'GX002000', otherwise 'N'; CCF_SUBSYS is forced from the subsystem letter ('01' for A ... '26' for Z). *(PDF p. 33)*
- Command sequence tables (CSF, CSS, SDF) are not supported by CCS and must not be used; HPSDB supports loading them only to interface with MOIS for operations. *(PDF p. 36)*
- Parameter-set tables (PST, PSV, CPS, PVS, PSM) are likewise not supported by CCS and must not be used, although HPSDB supports loading them. *(PDF p. 39)*
- Chapter 5.4 covers CCS-specific tables absent from the S2K MIB ICD 5.1: CUR (conditional calibration), GRP/GRPA/GRPK (groups), SCO (SCOE definition), TCD/TMD (TC/TM distribution) and LGF (logarithmic curves). *(PDF p. 42)*


## Cited by these wiki pages (14)

- [Calibration in the MIB](../mib/calibration.md)
- [Command sequences and parameter sets](../mib/sequences.md)
- [Command verification in the MIB](../mib/command-verification.md)
- [Commanding in the MIB: commands and their parameters](../mib/commanding.md)
- [Display definitions in the MIB](../mib/displays.md)
- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [History of the Database Import ICD (issues 5.1 to 7.2)](../mib/icd-history.md)
- [MIB tooling and open-source libraries](../mib/tooling.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [Missions](../missions/index.md)
- [Sources &amp; copies](../about/sources-and-copies.md)
- [Synthetic parameters and the OL language](../mib/synthetic-parameters.md)
- [The MIB: Mission Information Base](../mib/index.md)


??? abstract "Contents (75 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    | 1. | SCOPE | 7 |
    | 2. | DOCUMENTS | 8 |
    | 2.1 | Applicable documents | 8 |
    | 2.2 | Reference documents | 8 |
    | 3. | ACRONYMS | 8 |
    | 4. | GENERALITIES | 9 |
    | 4.1 | G1 – Object data model | 9 |
    | 4.2 | G2 – Naming convention | 9 |
    | 4.2.1 | G3 – Naming convention for S2K curves | 10 |
    | 4.2.2 | G4 – Naming convention for S2K command verification stages | 11 |
    | 4.2.3 | G5– Naming convention for S2K parameter range set | 11 |
    | 4.3 | G6- Enumerated fields | 11 |
    | 4.4 | G7- Commutation | 11 |
    | 4.5 | G8– default value | 13 |
    | 4.6 | G9– Commonality | 13 |
    | 4.7 | G10 Category flag | 13 |
    | 4.8 | G11– HPSDB common fields | 14 |
    | 4.9 | G12– TC packet header | 14 |
    | 4.10 | G13– Reserved characters | 14 |
    | 4.11 | G14– Radix | 15 |
    | 4.12 | G15– Range allocation | 15 |
    | 4.13 | G16– Automatic instantiation (TBC) | 15 |
    | 4.14 | G17– short description | 16 |
    | 4.15 | G18– Orphan items | 16 |
    | 4.16 | G19– MIB file sorting | 16 |
    | 4.17 | G20– Derived parameter | 16 |
    | 5. | FIELD BY FIELD PRESENTATION | 17 |
    | 5.1 | General | 18 |
    | 5.1.1 | Data base version: VDF | 18 |
    | 5.2 | Monitoring data | 18 |
    | 5.2.1 | Monitoring parameters characteristics: PCF | 18 |
    | 5.2.2 | Numerical calibration curves: CAF | 21 |
    | 5.2.3 | Numerical calibration definition: CAP | 22 |
    | 5.2.4 | Textual calibration curves: TXF | 22 |
    | 5.2.5 | Textual calibration definition: TXP | 22 |
    | 5.2.6 | Polynomial calibration curves: MCF | 23 |
    | 5.2.7 | Monitoring checks: OCF | 23 |
    | 5.2.8 | Monitoring checks definition: OCP | 23 |
    | 5.2.9 | Telemetry packet definition: PID | 24 |
    | 5.2.10 | Packet identification criteria: PIC | 26 |
    | 5.2.11 | Telemetry packets characteristics: TPCF | 26 |
    | 5.2.12 | Parameter location in fixed packets: PLF | 26 |
    | 5.2.13 | Variable packet definition: VPD | 27 |
    | 5.2.14 | Alphanumeric displays: DPF | 28 |
    | 5.2.16 | Graphic displays: GPF | 29 |
    | 5.2.18 | Scrolling displays: SPF | 30 |
    | 5.2.20 | Printout proforma: PPF | 31 |
    | 5.3 | Commanding data | 31 |
    | 5.3.1 | Packet header characteristics: TCP | 31 |
    | 5.3.3 | Packet headers definition: PCDF | 32 |
    | 5.3.4 | Command characteristics: CCF | 32 |
    | 5.3.5 | Command routing: DST | 34 |
    | 5.3.6 | Command parameters: CPC | 34 |
    | 5.3.7 | Command definition: CDF | 35 |
    | 5.3.8 | Command pre-transmission validation: PTV | 36 |
    | 5.3.9 | Command sequence characteristics: CSF | 36 |
    | 5.3.13 | Verification stage file: CVS | 37 |
    | 5.3.14 | Verification expressions: CVE | 38 |
    | 5.3.15 | Verification profiles: CVP | 38 |
    | 5.3.16 | Parameter sets: PST | 39 |
    | 5.3.21 | Numerical (de-)calibration curves: CCA | 40 |
    | 5.3.22 | Numerical (de-)calibration curves definition: CCS | 41 |
    | 5.3.23 | Textual (de-)calibration: PAF | 41 |
    | 5.3.24 | textual (de-)calibration definition: PAS | 41 |
    | 5.3.25 | Parameter range sets: PRF | 41 |
    | 5.3.26 | Parameter range values: PRV | 42 |
    | 5.4 | Specific CCS data | 42 |
    | 5.4.1 | Conditional calibration curve: CUR | 42 |
    | 5.4.2 | Group: GRP | 43 |
    | 5.4.3 | Parameter Group: GRPA | 43 |
    | 5.4.4 | SCOS packet Group: GRPK | 43 |
    | 5.4.5 | SCOE definition: SCO | 44 |
    | 5.4.6 | TC distribution: TCD | 44 |
    | 5.4.7 | TM distribution: TMD | 44 |
    | 5.4.8 | Logarithmic curve: LGF | 44 |


## Documents this one references (7)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| AD1 | [H-P-1-ASP-SP-0141](../references/index.md#ref-h-p-1-asp-sp-0141) | Naming convention |  | applicable |
| AD2 | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Data base import ICD | 5.1 | applicable |
| AD3 | [H-P-4-TE-ID-8020](../references/index.md#ref-h-p-4-te-id-8020) | CCS External Interface Control Document |  | applicable |
| RD1 | [SCI-PT-ICD-07527](../references/index.md#ref-sci-pt-icd-07527) | Packet Structure Interface Control Document (PSICD) |  | reference |
|  | [H-P-ASP-MN-6913](../references/index.md#ref-h-p-asp-mn-6913) | MOM: Herschel Instruments – data base meeting on 29 and 30/09/05 in ASED Munchen | 29 and 30/09/05 | mentioned |
|  | [H-P-ASP-MN-7063](../references/index.md#ref-h-p-asp-mn-7063) | MOM: Herschel / Planck – PM#32 – HPSDB splinter | 30/11/05 and 01/12/05 | mentioned |
|  | [catalogue](../references/index.md#ref-psicd) | PSICD | 5.0 | mentioned |

!!! note "Notes"
    PDF page 1 (title page) is a scanned fax image whose text layer only contains the SPIRE archive stamp SPIRE-ALC-DOC-002697; title, product code (460000), entity and signature names were read from the rendered page image. The fax header and footer include a phone number, which is omitted. Pages are landscape (rotated 90 degrees). The page headers count 45 pages, while the faxed title page says 'Page: 1/46' and 'TOTAL PAGES: 46'. Printed page numbers match PDF page indexes. The applicable naming convention is cited as H-P-1-ASP-SP-0141 here, but as H-P-1-ASPI-SP-0141 in the SPIRE MIB naming convention and as H-P-ASPI-SP-0141 in the HCSS tailoring note. Several sections are TBC, TBW or 'To be written' (for example CSP and DST), and there are typos such as 'HPDSB' (p. 7). The title-page date is printed '0702/2006', read as 7 February 2006. The source URL labels the file 'RD54' in SPIRE's internal documentation archive.

