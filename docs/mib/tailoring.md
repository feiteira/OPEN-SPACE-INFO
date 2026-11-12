---
title: Mission tailoring of the MIB
description: How projects constrain and extend the generic SCOS-2000 Database Import ICD, from the Herschel/Planck packet rules, naming conventions, Alcatel faxes, HPSDB processing rules and configuration files, the checkout system's MIB extensions and EGSE naming rules and the HCSS MIB Clarification and Tailoring Note to SPIRE's configuration control, and what Solar Orbiter's extra MIB files (ASW_sw_para, pcf_glob_det, dup, s13a/s13p/s13t) contain.
tags: [MIB, SCOS-2000, Tailoring, Herschel, Planck, Solar Orbiter]
sources: [icd-7-0-final, icd-5-1-tos-gci, hcss-mib-clarification-tailoring-note, spire-mib-naming-convention-1-2, alc-scos-fax-2003-01-27, alc-scos-2003-03-27, h-p-1-asp-tn-1060-mib-processing-hpsdb, spire-db-management-1-0, cosmos-operations-interface-requirements, emcs-sum-4-0, mib-20250916m25925pfms001-sol, mib-20200416m10720pfms001-sol, swa-idb-ascii, ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d, rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd, rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification, h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual, h-p-2-asp-li-1441-09-herschel-hpsdb-release-note, hifi-user-manual-annex-3-mib-139-aspi-11-7-overview, 02-sesp-2015-from-hpsdb-to-egs-cc-presentation]
---

# Mission tailoring of the MIB

The SCOS-2000 Database Import ICD defines a generic [Mission Information Base](index.md) (MIB):
53 tab-separated tables that any mission can fill (51 in the summary of its §3.2, plus the two
printout tables PPF and PPC defined in §3.3.2.7.7–3.3.2.7.8).[^icd-sum][^icd-ppf] No real project uses it untouched. Projects
narrow it, by forbidding options, shortening identifiers and fixing naming rules, so that
databases from many suppliers can be merged. They also widen it with extra files for
information the ICD has no place for. This page collects the tailoring documents in this wiki's
library, most of them from the Herschel/Planck programme, and then examines the extra tables of
the public Solar Orbiter MIB.

## What the ICD itself allows

The ICD leaves three doors open on purpose:

* **Any off-line database.** The ICD imposes no constraint on how the ASCII files are produced.
  Typically a relational database is used, "e.g. MS ACCESS" in issue 7.0, and "ORACLE, MS
  ACCESS" in issue 5.1.[^icd-21][^i51-21]
* **Extra fields at the end.** Fields that a mission needs and that the ICD does not define
  "have to be added at the end of the table". Their length is limited only by the importing
  computer.[^icd-23]
* **Another separator.** A mission may replace the tab separator, provided the importer is
  adjusted.[^icd-23]

The ICD also makes the off-line system responsible for consistency. The importer catches only
the most dangerous problems, and an off-line consistency checker is delivered from release 4.0.[^icd-24]
Everything else, such as names, numbering ranges and which optional features are used, is left
to the mission. That is the space that tailoring documents fill.

## The Herschel/Planck tailoring stack

On Herschel and Planck, the five instrument teams (HIFI, PACS and SPIRE; HFI and LFI) worked
with instrument EGSEs based on SCOS-2000. Their MIBs then had to flow into Alcatel's
Herschel/Planck System Database (HPSDB) and the Central Checkout System (CCS), and, for
Herschel, into the Herschel Common Science System (HCSS). Each step
added rules.[^fax1-ref][^tn1060-scope][^hcss-bg]

```mermaid
flowchart TB
    ICD["SCOS-2000 Database Import ICD<br/>issue 5.1 (2001) / 5.2"] --> NC["Herschel/Planck Naming Convention<br/>H-P-1-ASPI-SP-0141 (not in library)"]
    OIRD["Operations Interface Requirements<br/>SCI-PT-RS-07360: one common satellite database"] --> NC
    OIRD --> PSICD["Packet Structure ICD SCI-PT-ICD-07527<br/>(2000-2008): APIDs, services,<br/>parameter types"]
    NC --> FAX["Alcatel faxes, Jan and Mar 2003:<br/>identifier limits, UDC ranges,<br/>SPID = TPSD, PCF_WIDTH"]
    NC --> SPIRE["SPIRE MIB naming convention<br/>(2002)"]
    NC --> IRS["EGSE Interface Requirement Spec.<br/>H-P-1-ASPI-IS-0121 (2001-2004):<br/>EGSE positions and names"]
    ICD --> CCSICD["CCS External ICD H-P-4-TE-ID-8020<br/>(2002-2006): extended ICD 5.1"]
    IRS --> CCSICD
    FAX --> HPSDB["HPSDB user manual (2005) and<br/>MIB files processing TN-1060 (2006)"]
    CCSICD --> HPSDB
    PSICD --> HPSDB
    NC --> HCSS["HCSS MIB Clarification and<br/>Tailoring Note HSC/DOC/0300 (2004)"]
    SPIRE --> CC["SPIRE database management and<br/>configuration control (2007)"]
    HCSS --> CC
```

Relationships from the reference lists of the documents.[^hcss-rd][^spire-nc-ad][^fax1-ref][^tn1060-ad][^ccs-scope][^irs-docs][^um-docs][^ps-scope]

```mermaid
timeline
    title Herschel/Planck MIB tailoring documents
    2001 : EGSE Interface Requirement Specification issue 01 (November)
    2002 : SPIRE MIB Naming Convention 1.2 (March)
         : CCS External ICD issue 1.0 for the PDR (May)
         : HCSS comments on the naming convention (December)
    2003 : Alcatel fax H-P-ASP-LT-2607 (January)
         : Alcatel fax H-P-ASP-LT-2905 (March)
         : CCS External ICD 1.4 and 1.5 - CAF_INTER, ECP 1 and ECP 3 (May, July)
         : OIRD issue 2.2 (September)
    2004 : EGSE Interface Requirement Specification issue 4.1 (December)
         : HCSS MIB Clarification and Tailoring Note issue 1.5 (December)
    2005 : HPSDB Software User Manual 2.6 (September)
    2006 : CCS External ICD issue 1.8 (January)
         : MIB files processing by HPSDB, H-P-1-ASP-TN-1060 issue 1 (February)
    2007 : SPIRE Database Management and CUS Configuration Control issue 1.0 (February)
    2008 : PS-ICD issue 6.0 (January) - HPSDB release note 9.0 (April)
```

Dates from the documents' title pages and change records.[^spire-nc-ad][^hcss-cr][^fax1-ref][^fax2][^oird-sdb][^tn1060-cr][^spire-db-cr][^irs-cr][^ccs-cr][^um-cover][^ps-cr60][^rn-cover]

### The project requirement: one common satellite database

The Herschel/Planck Operations Interface Requirements Document (OIRD) sets the frame. The prime
contractor and the instrument developers deliver a **Satellite Database** (SDB) that defines all
telemetry, telecommands, command sequences and software parameters, the instrument parts being
provided by the principal investigators. It must be a single common database for system
engineering, AIV and operations, comply with the SCOS-2000 Import ICD issue 5.1 (the OIRD's
AD-8),[^oird-ad8] be internally
consistent and consistent with the flight dynamics database and on-board software, contain no
irrelevant data and no duplications, and record every update down to field level.[^oird-sdb][^oird-sdb2]
Deliveries are scheduled from version 0 (instrument AVM) to a pre-launch update one month before
launch, as Oracle data files, each with a configuration control file and the on-board software
versions it matches.[^oird-sdb2] For naming, the OIRD defers to the project naming convention
H-P-1-ASPI-SP-0141.[^oird-a4]

### The packet rules: the PS-ICD narrows the parameter types

Before any MIB rule, the Packet Structure ICD (SCI-PT-ICD-07527, issue 6.0 of January 2008)
fixes what may appear in a packet at all: the space and ground segments support "all and only"
the structures and services it defines, and packets may use only the parameter types of its
Appendix 6.[^ps-scope][^ps-a6] That appendix is a subset of what the SCOS-2000 import ICD
accepts, so every packet field described in a Herschel/Planck MIB had to use a PTC/PFC pair
from this list (field
meanings as on [MIB parameter types](parameter-types.md)):[^ps-a6][^ps-a6b]

| PTC | Type | PFC allowed by the PS-ICD | Restriction compared with the MIB |
|---|---|---|---|
| 1 | Boolean | 0 | - |
| 2 | Enumerated | 1 to 8, 12, 16, 32 bits | Other widths up to 32 bits excluded |
| 3, 4 | Unsigned, signed integer | 0 to 14 (4 to 15 bits, 2, 3 or 4 octets) | No 48- or 64-bit integers |
| 5 | Real | 1 (IEEE single), 2 (IEEE double) | MIL-STD-1750A formats excluded; PFC 3 was removed in issue 6.0 |
| 6 | Bit string | 1, 2, 4, 8 bits | Other widths excluded |
| 7 | Octet string | 0 (variable) or n octets | Not editable by the operator when used in a TC |
| 8 | Character string | 0 or n characters | On board only for the PROM software version identifier (allowed since issue 6.draftA); free for SCOE/EGSE |
| 9 | Absolute time | 17 (CUC, 4 octets coarse, 2 fine) | Only one time format |
| 10 | Relative time | - | Not used |
| 11 | Deduced | 0 | Used for OBCP parameters in TM(18,13) |

The right-hand column is this wiki's comparison with the MIB ICD; the PS-ICD values are from
Appendix 6 and its change record.[^ps-a6][^ps-a6b][^ps-cr6a][^ps-cr60][^i70-appa] The PS-ICD
also reserves the APIDs 2016 to 2046 for SCOE and EGSE messages and 2047 for idle packets, and
gives every instrument a base APID whose four low bits separate packet categories and prime
from redundant units (HIFI: 1024 prime, 1025 redundant, 1026/1027 non-essential HK, 1028-1031
science).[^ps-a3][^ps-a3b] By this wiki's reading, a MIB built for these rules therefore has
many `pid` rows per instrument that differ only in the low bits of `PID_APID`; the PS-ICD does
not discuss the MIB.

!!! example "The PS-ICD type set against a later mission (real data, Solar Orbiter 2025)"
    Applied to the Solar Orbiter MIB of 16 September 2025, the Herschel/Planck type set would
    accept 124 203 of the 126 745 monitoring parameters. The other 2 542 use enumerations of
    other widths (250, for example 224 of 18 bits), bit strings of 3, 5, 6, 7, 11 or more bits
    (124), absolute times other than PFC 17 (2 119, of which 2 116 are PTC 9 PFC 15), relative
    times (47) and PTC 13 (2). All its reals are IEEE (PFC 1 or 2), and 120 parameters are
    character strings, among them software version strings such as `NIC0A000`
    (`FSW_VERSION_STR`). Of the 7 155 command parameters, 40 fall outside the set (4 enumerated,
    35 absolute time, 1 relative time).[^mib-ptc]

!!! warning "Inference"
    This is a comparison, not a judgement: Solar Orbiter has its own packet rules, and its
    choice of other PFC values is not an error. The comparison only shows how much narrower the
    Herschel/Planck packet rules were than the import ICD, and therefore than what a generic
    MIB tool must support.

### Alcatel faxes of 2003: identifier limits and reserved ranges

The Herschel Planck project office of Alcatel Space Industries (Cannes) sent two faxes to the
five instrument teams, copied to ESTEC and ESOC, under the subject "SCOS – Limitation to naming
convention". Their stated aim is to support a "smooth transition" from instrument-level to
module-level testing.[^fax1-ref][^fax2]

**H-P-ASP-LT-2607, 27 January 2003** sets five requirements:[^fax1-req][^fax1-just]

| # | Requirement | Justification given |
|---|---|---|
| 1 | Calibration curve identifiers limited to Number(3) | the ICD (issue 5.1) allows Number(4); the naming convention defines a curve identifier at theoretical element level as "IDIN03F" |
| 2 | Range set identifiers limited to Number(3) | same reasoning |
| 3 | Command verification stage identifiers limited to Number(4) | the ICD allows Number(5); the convention defines "IDIN04F" |
| 4 | Dynamic UDCs allocated in fixed ranges of the single "constant packet" in the PLF | the constant packet is unique, so allocations would overlap at integration |
| 5 | The SPID of the constant packet must support 1,024 octets | every level produces the same archive format, at the cost of disk space at instrument level |

The UDC allocation of requirement 4 partitions the constant packet as follows:[^fax1-just]

| Range | Herschel | Planck |
|---|---|---|
| 0000–0099 | System | System |
| 0100–0199 | SVM | SVM |
| 0200–0299 | PLM | PLM |
| 0300–0399 | HIFI | HFI |
| 0400–0499 | PACS | LFI |
| 0500–0599 | HIFI (sic; SPIRE expected) | not used ("Sorbtion cooler ?") |
| 0600–1023 | spare, allocated by ASP | spare, allocated by ASP |

!!! note "A typo in the source"
    The fax's text layer really assigns 0500–0599 on Herschel to "HIFI" a second time (PDF
    p. 2).[^fax1-just] Since HIFI already holds 0300–0399 and SPIRE is the only Herschel
    instrument without a range, the second entry probably means SPIRE. This is this wiki's
    reading; no corrected version of the fax is in the library.

**H-P-ASP-LT-2905, 27 March 2003** adds two requirements to those of the January fax. This fax
is a scan without a text layer; its content here is summarised from the manual reading recorded
in this wiki's library entry, which this review re-checked against the scanned page images. It
numbers its requirements 5 and 6, so both faxes have a requirement 5.[^fax2]

* **Requirement 5:** in the `pid` table, `PID_SPID` must equal `PID_TPSD`. The justification is
  "only to facilitate the mapping" between the Herschel/Planck System Database (HPSDB) and the
  SCOS "bridge" files:
  different SCOS packets will no longer be able to address the same variable packet structure
  definition.[^fax2]
* **Requirement 6:** in the `pcf` table, the field printed "PCF-WIDTH" "shall not be set to
  'Null'". The justification (where the field is printed "PCF_WIDFT") is that it is
  "(indirectly) redundant with VPD_OFFSET" and that HPSDB will only support `VPD_OFFSET`.[^fax2]

!!! warning "Inference"
    The scan does say "shall not be set to 'Null'"; the manual reading did not invert it. The
    rule nevertheless sits oddly with its own justification and with the HPSDB processing note
    of 2006, which ignores `PCF_WIDTH` on input, forces it to null on output and says only
    `VPD_OFFSET` is used.[^tn1060-pcf] Either the fax itself contains a slip (a rule that the
    field "shall be set to Null" would match its justification), or the project reversed the
    rule between 2003 and 2006. The available sources do not say which.

### SPIRE's MIB naming convention

SPIRE's technical note SPIRE-RAL-NOT-001155 (issue 1.2, 11 March 2002) applies the project
naming convention to the SPIRE MIB, including the parameters of the SPIRE EGSE and test
equipment, which are not delivered with the instrument. It calls the MIB the "Mission
Implementation Base".[^spire-nc-ad]

| Item | ICD fields | Pattern | Convention ref. |
|---|---|---|---|
| Command | `CCF_CNAME`, `CDF_CNAME`, `PTV_CNAME` | `SCiiippp` | 4580 |
| Command parameter | `CPC_PNAME`, `CDF_PNAME` | `SPiiippp` | 5130 |
| Command numerical / textual calibration | `CCA_NUMBR`, `CCS_NUMBR` / `PAF_NUMBR`, `PAS_NUMBR` | `tttnnnrrr` (alternative `sss`) | 5370 |
| Monitor packet | `PID_SPID`, `TPCF_SPID`, `PLF_SPID` | `tttnnnnppp` | 4380 |
| Monitor parameter | `PCF_NAME`, `OCF_NAME`, `OCP_NAME`, `PLF_NAME`, `PTV_PARNAM` | `SMiiippp` | 5130 |
| Numerical, textual, polynomial calibration | `CAF_NUMBR`, `TXF_NUMBR`, `MCF_IDENT` (and detail tables) | `tttnnnrrr` (`sss`) | 5370 |
| Alphanumeric, graphical, scrolling display | `DPF_NUMBE`, `GPF_NUMBE`, `SPF_NUMBE` | `SAiiippp`, `SGiiippp`, `SLiiippp` | 6100, 6110, 6130 |

Patterns from the note.[^spire-nc] The components are:[^spire-nc-id]

* `iii`, the theoretical parameter identifier: first character the subsystem ID, third
  character the parameter unit ID.
* `nnn`/`nnnn`, running numbers from zero; `ttt`, the system element number; `rrr`, the real
  element number; `ppp`, the position identifier; `sss`, an alternative identifier for
  calibration curves in case SCOS-2000 cannot handle 8-character names.
* System element numbers: OBS 480, DPU 490, DCU 500, MCU 510, SCU 520, EGSE 528, test facility
  (TFCS) 529, each with its subsystem letters (for example SCU: `C` calibrator, `H` heater, `K`
  sub-K, `T` temperature).[^spire-nc-id]
* Real element numbers start at 100 (AVM), 300 (QM), 500 (FM) and 700 (FS) and increase by
  one for each new configuration, so a data set records which hardware build it describes.[^spire-nc-real]
* Unit IDs: `A` current, `B` limit, `E` error, `F` status flag, `H` frequency, `K` temperature,
  `L` lower limit, `M` mode, `N` count, `P` position, `R` phase, `S` speed, `T` time, `U` upper
  limit, `V` voltage, `W` power.[^spire-nc-real][^spire-nc-w]

Note that the leading `S` identifies SPIRE. The HCSS comments explain that instrument-related
mnemonics start with `H`, `P` and `S`, and during instrument-level tests with `I`, `O` and `Q`.[^hcss-nc]

### The HCSS MIB Clarification and Tailoring Note

The Herschel Common Science System (HCSS) used the MIB to build instrument commands and to
interpret downlinked data for quick-look and interactive analysis. The HSC note HSC/DOC/0300
(issue 1.5, 21 December 2004), approved by the HSC and the three Herschel instrument teams,
specifies the MIB interface into the HCSS. It clarifies the ICD (issue 5.2) and the naming
convention (issue 2.1), adds Herschel constraints, and lists the checks of the HCSS MIB
ingestion software.[^hcss-cr][^hcss-intro][^hcss-rd]

**Clarifications of the ICD.** Three of them (4.1.4, 4.1.6 and 4.1.7) correspond to Document
Change Requests that ESOC raised against the ICD (DCR 286, 309 and 308):[^hcss-41][^hcss-esoc]

| Point | Clarification |
|---|---|
| 4.1.1 | A line is one record, ended by LF (Unix) or CR LF (Windows). A record has N−1 tabs for N fields. Trailing fields that SCOS-2000 ignores (grey in the ICD) may be left out. |
| 4.1.2 | Mandatory fields must hold a value of the right type, and numeric fields must not be empty or blank. |
| 4.1.3 | A non-mandatory field without a stated default defaults to 0, 0.0 or the empty string. |
| 4.1.4 | The separator must always be present even when the value is empty (DCR-286). |
| 4.1.5 | An out-of-limits condition is raised only strictly below the low or above the high limit, for hard and soft limits. |
| 4.1.6 | `PLF_OFFBY`/`PLF_OFFBI` count from the end of the SCOS-2000 packet header, which equals the start of the TM source packet header with the generic packetiser (DCR-309). |
| 4.1.7 | Bit 0 of `PLF_OFFBI` is the most significant bit (DCR-308). |
| 4.1.8 | Real numbers use the decimal point, not a comma. |

**Naming clarifications.** Of the naming convention, only NMCVT-0100-C (identifiers) and
NMCVT-7600-C (descriptions) affect ingestion. NMCVT-0100-C forbids `I`, `O` and `Q` as leading
characters. NMCVT-7600-C limits descriptions to letters, digits, space, `+`, `-` and `_`, asks for
meaningful text and understandable abbreviations, and forbids an empty short description.[^hcss-42]
For the HCSS the short description must match `[a-zA-Z0-9_]+`, because the scripting language
of the Common Uplink System (CUS) cannot use `+` or `-`. The combination of the first character
of the name and the full description must be unique for commands, command parameters and
monitoring parameters, and `PID_APID` with `PID_DESCR` must be unique for packets.[^hcss-53][^hcss-nc2]

**Constraints for the final interface:**[^hcss-51][^hcss-52]

| Point | Herschel constraint |
|---|---|
| 5.1 | All ICD tables in one directory; synthetic definitions accepted in subdirectory `synthetic`; everything else ignored. An extra two-field table gives each command's duration for the CUS. |
| 5.2.3 | VDF ignored. |
| 5.2.4 | Constants (`PCF_NATUR = C`) ignored; all other natures accepted. |
| 5.2.5 | The SPID is the only key to a parameter's location; a packet is identified by type, subtype, APID and, where relevant, SID; one SPID per packet type is assumed. |
| 5.2.6 | A PID row may not give a SID value greater than 0 when the matching PIC row says no SID (`PIC_PI1_OFF = -1`). |
| 5.2.7 | Except pseudo commands starting with `Z`, every `CCF_PKTID` must have at least 4 PCDF rows (version, type, data field header flag, APID). The note observes that this contradicts the ICD's statement that `PCDF_TCNAME` is unique. |
| 5.2.9 | `CDF_CNAME` + `CDF_PNAME` unique; repeated groups instead of repeated parameters. |
| 5.2.10–11 | Command sequences (CSF, CSS, SDF, CSP) and parameter sets (PST, PSV, CPS, PVS) ignored. |
| 5.2.12–13 | `TXP_FROM` ≤ `TXP_TO`, and textual calibration ranges must not overlap. |

Software version 0.2 was stricter: only `R` parameters, so no synthetics; only `OCF_CODIN`
values `R` and `I`; no variable packets; and for engineering command parameters no raw default
value.[^hcss-63]

**Checks.** Section 7 numbers the checks of the ingestion software from 7.0.1 to 7.0.34 (7.0.6 is
marked "check removed"), and marks those not yet in version 0.2 as "To be implemented", for
example the validation of synthetic and variable packet definitions. Examples: input file
names, field counts per line, field types (with a null value assigned on mismatch),
non-`R` natures flagged with an assumed length of −1, missing calibrations, uniqueness of
`PCF_NAME`, `OCF_NAME`, `CPC_PNAME` and `CCF_CNAME`, the description rules above, TXP range
order and overlap, consistency of numerical and textual de-calibrations, `CPC_RADIX` limited to
`D`, `H` and `O`, and `PID_INTER` allowed only for periodic (3,25) packets.[^hcss-7]

**SPID uniqueness.** Section 10 records an e-mail exchange of September 2002. PACS reported that
all its TC verification packets shared SPID 10006, because the SCOS-2000 version of the time did
not allow a range of SPIDs for packet type 1. ESOC confirmed that all TM packets of type 1 with
a given subtype had to share one SPID, because the Verifier listened only to a predefined list
of SPIDs. Rosetta had implemented a change allowing any SPID for service 1 and CryoSat one
allowing a range of SPIDs, and these were to be merged into release 3.1 by a function that reads
all type-1 SPIDs from `pid.dat`.[^hcss-10] See [Command verification in the MIB](command-verification.md).

### HPSDB: how the system database processed MIB files

Alcatel Alenia Space's note H-P-1-ASP-TN-1060 (issue 1, February 2006) documents how HPSDB
ingests SCOS-2000 (instrument EGSE, ICD 5.1) and CCS MIB files and regenerates them as "bridge
files". Constraints in bold in the note cannot be checked by HPSDB and are the user's
responsibility. The note warns that 100% round-trip compatibility cannot always be reached. For
example, HPSDB allows an N-to-1 relation between TM packets and SPIDs, while the ICD allows N-to-N.[^tn1060-scope]

| Rule | Content |
|---|---|
| G1 object data model | MIB data is wrapped in objects identified by identifier and position; every (object, generic object) pair must be consistent. |
| G2 naming | First letter of a character identifier gives the item type; curves are Number(6) (3 digits theoretical element + 3 free); subsystem letter prefixed and 3-digit position appended at instantiation; generic items use subsystem `G`, number `07`, position `000`. |
| G3–G5 short S2K identifiers | S2K curves Number(3) for specific and `1xxx` for generic curves (`G000xxx000`); verification stages Number(4)/`1xxxx`; range sets Number(3)/`1xxx`. |
| G6 enumerations | Enumerated values limited to the HPSDB sets, possibly narrower than the ICD (e.g. type/subtype pairs from the packet structure ICD, no octal radix). |
| G7 commutation | HPSDB models packets as structures with repetition and super-commutation attributes; a packet can be fixed (PLF), variable (VPD) or both; SPID-to-variable-packet must be one to one. |
| G8 defaults | Defaults are always forced, sometimes with HPSDB values instead of ICD ones (e.g. `PID_CHECK`). |
| G9 commonality | Curves may be shared by TM and TC inside HPSDB; do not use the same identifier for a TM and a TC curve. |
| G10 category flag | 8-bit user-category flag per item (AIT, operations, software, flight dynamics); set to "all except FDD" on loading. |
| G11 common fields | 64-character mnemonic, 256-character long description and configuration data (user, date, reason, source, site, validation dates) per item, not supported by S2K and CCS. |
| G12 TC header | TC packet headers are generic; TCP, PCPC and PCDF are ignored on loading. |
| G13 reserved characters | `<`, `>`, quote, double quote and `&` never used (XML); restricted character set for short descriptions. |
| G14 radix | No octal radix for unsigned integers. |
| G15 ranges | Respect the range allocations of the naming convention (PID numbers, UDC location). |
| G16 instantiation | Last character of the short description, APID, PID, UDC and MISC positions computed from the element's position; keep one character of description spare. |
| G17 descriptions | All descriptions mandatory; an empty one is replaced by the identifier. |
| G18 orphans | Orphan items are not loaded. |
| G19 sorting | Output sorted by the ICD primary key; inputs must be sorted too. |
| G20 derived parameters | Expression files delivered with the MIB files. |

Rules from §4 of the note.[^tn1060-g1][^tn1060-g7][^tn1060-g13] The field-by-field part (§5)
adds, among others: `PCF_WIDTH` ignored and forced to null; `PID_TPSD` forced to the SPID for
variable packets and to −1 otherwise; `PID_VALID` and `PID_TIME` forced to `Y`; the PIC table
taken from generic data, identical on every Herschel/Planck SCOS and CCS system; VPD choice
fields forced to `N`; printout tables not allowed; command sequences and parameter sets "not
supported by CCS"; and CCS-only tables for conditional curves (CUR), groups (GRP, GRPA, GRPK),
SCOE definitions (SCO) and TC/TM distribution (TCD, TMD).[^tn1060-pcf][^tn1060-pid][^tn1060-vpd][^tn1060-seq][^tn1060-ccs]

### Loading MIB files into HPSDB: the configuration files

GMV's HPSDB Software User Manual (version 2.6, September 2005) shows how a plain SCOS-2000 MIB
was fitted into that object model. The user zips the bridge files with six configuration
files, which supply what the import ICD has no field for:[^um-bridge][^um-cfg]

| File | Fields | What it adds to the MIB |
|---|---|---|
| `S2K_EL.txt` | Real element identifier (Char(14)), theoretical element number (Number(3)), SW or HW, description, product tree identifier | Which physical units the data belong to; two redundant real elements share one theoretical element |
| `S2K_SUB.txt` | First line: subsystem identifier (Char(7)), description, pseudo position, pseudo element number; then per position: ACC and CDMU bus-controller flags, real element, SCOE host and port | Where each element sits in the subsystem |
| `S2K_TM.txt` | A naming-convention TM packet identifier (Char(20)) followed by the 16 fields of `pid.dat` | A project name for every packet; HPSDB reads packets from this file instead of `pid.dat` |
| `S2K_CUR.txt`, `S2K_CVS.txt`, `S2K_PRF.txt` | SCOS number and naming-convention identifier | Maps short SCOS curve, verification stage and range set numbers (limited to 999, 9999 and 9999) to generic HPSDB items |

The manual's example lines map three HIFI elements to positions 190, 191 and 194 and two SPIRE
elements to positions 196 and 197 of subsystem `H001001` (pseudo position 289), and the curves 900, 901 and 905 to the generic curves
`000900`, `000901` and `000905`.[^um-ex] The loader creates neither box types nor generic items,
requires the OL expression files of derived parameters, and is explicitly "not a SCOS bridge
file validator".[^um-bridge] Each user has one category flag code (Operations, OB for on-board
software, AIT, or All), and bridge files can be generated for one category; the 2008 Herschel
delivery to ASED for the Herschel IRR was generated with the "AIT User" filter.[^um-roles][^um-gen][^rn-intro]

!!! note "Two descriptions of the generic items"
    The processing note of 2006 codes a generic S2K curve as `1xxx`, standing for the HPSDB
    curve `G000xxx000` (rule G3), while the user manual of 2005 maps generic curves through
    `S2K_CUR.txt`, with SCOS numbers below 1000. The user manual also lists four category
    codes without flight dynamics, where rule G10 of the note names AIT, operations, software
    and flight dynamics.[^tn1060-g1][^um-cfg][^um-roles] Which variant the deliveries used is
    not stated in the available sources.

### The CCS External ICD: extending ICD 5.1 for checkout

The Herschel/Planck Central Checkout System read HPSDB "bridge files" in the format of the
SCOS-2000 import ICD issue 5.1, which Terma's *CCS External ICD* (H-P-4-TE-ID-8020, issue 1.8
of 18 January 2006) declares fully applicable "with the explicit exceptions and additions"
listed in its chapter 9.[^ccs-scope][^ccs-bridge] Unlike the documents above, it extends the
MIB rather than narrowing it:

| Change (CCS ICD section) | Tables | Content |
|---|---|---|
| Danger actions (§9.1) | none | A parameter beyond its danger limits starts the test sequence `danger_<parname>` (case sensitive) |
| Delta limits (§9.2) | `ocp` | New `OCP_TYPE` 'D', with the delta in `OCP_LVALU`; the type list is S soft, H hard, D delta, C status consistency (needs `PCF_USCON` 'Y'), E event generation only |
| Calibration selection (§9.3) | `pcf`, new `cur` | `PCF_CURTX` must be null when a selection exists; `cur` (`CUR_PNAME`, `CUR_POS`, `CUR_RLCHK`, `CUR_VALPAR`, `CUR_SELECT`), sorted by name and position, first match wins; only integer parameters may select |
| Groups (§9.4) | new `grp`, `grpa`, `grpk` | Named parameter groups ('PA') or packet groups ('PK') built from existing parameters or SPIDs |
| System parameters (§9.5) | `pcf`, `pid` | No parameter name may start with `VAR`, `GVAR` or `$` (OL syntax) or with `YZ`; SPIDs 100 to 999 reserved for internal EGSE use |
| EGSE and SCOEs (§9.6-9.8) | new `sco`, `tcd`, `tmd` | Equipment name, host and port; TC distribution to equipment by APID; TM distribution by SPID |
| Extrapolation (§9.3.1, §9.9) | `pcf`, `caf` | `PCF_INTER` ignored by the HPCCS; new `CAF_INTER` 'P' (extrapolate from the two end points) or 'F' (invalid value, default) |
| ECP 1 (§9.10) | calibration, range set and verification tables | Curve and range set identifiers from Number(4) to Char(10); `CVS_ID` from Number(5) to Number(10), range 0 to 2147483647 |
| ECP 3 (§9.10.19) | new `lgf` | Logarithmic curve, $Y = 1/(A_0 + A_1 \ln X + A_2 \ln^2 X + A_3 \ln^3 X + A_4 \ln^4 X)$ |
| ECP 9 to 12 (§9.11) | `ccf`, `csf` | `CCF_SUBSCHEDID` and `CSF_SUBSCHEDID`: default on-board sub-schedule, 1 to 65535 "although the full range is not permitted" (see the PS-ICD) |

Sources: §8-9.13 and the change record.[^ccs-danger][^ccs-cur][^ccs-grp][^ccs-sys][^ccs-sco][^ccs-ecp1][^ccs-subs][^ccs-sum][^ccs-cr]
Issue 1.4 (May 2003) moved the extrapolation flag from `pcf` to `caf`; the note kept under
`PCF_INTER` describes the problem with a per-parameter flag (the ICD does not say that it was
the reason for the move): SCOS-2000 attaches the flag to the calibration curve, so
parameters sharing a curve would all display with the flag of the last one imported.[^ccs-cr][^ccs-cur] It also
overrules the ICD rule that calibrated limits (`OCF_INTER` 'C') need a `PCF_CURTX`: with a
calibration selection that field may stay null.[^ccs-cur]

!!! note "Inconsistencies as printed"
    Two details of the CCS ICD do not agree with themselves. The text of ECP 3 gives a
    second-order formula, $T(R) = 1/[a_0 + a_1 \ln R + a_2 (\ln R)^2]$, while the `lgf` table
    has five coefficients up to the fourth power. And ECP 1 widens range set identifiers to
    Char(10), but the modified `prf`, `prv` and `cpc`/`csp` reference fields are printed as
    Char(8).[^ccs-ecp1][^ccs-lgf]

Most of these extensions returned to the standard import ICD as the Herschel/Planck "Check Out
System functionalities repatriation" of ICD version 6.0 (the default sub-schedule ID came into
the same version through the Cryosat repatriation, and `CAF_INTER` was documented only later,
under S2K-SPR-4911), while `sco`, `tcd` and `tmd` do not (see [History of the Database Import ICD](icd-history.md)).[^icd-repat][^icd-cryo][^icd-sum] The checkout system also
returns a file to the HPSDB: an **update file** with one tab-separated line per telecommand
(`c`) or parameter (`p`) validated by a test sequence, giving time, name, sequence name and issue
and host, to be read together with the MIB issue in `vdf.dat`.[^ccs-upd] The `tcd`
configuration printed in a Herschel release note of 2008 sends APID 0 and the CDMS, ACMS and
instrument APIDs (16, 512, 1024, 1152, 1280) to the TM/TC front end and ten EGSE APIDs between
2017 and 2044 to their own equipment.[^rn-route]

!!! example "The CCS rules against a later mission (real data, Solar Orbiter 2025)"
    In the Solar Orbiter MIB of September 2025 no parameter name starts with `VAR`, `GVAR`,
    `$` or `YZ`. Its 1 974 `cur` rows use 52 different selector parameters (`CUR_RLCHK`): 40
    Booleans (PTC 1, 112 rows), 8 enumerations (PTC 2, 1 834 rows) and 4 unsigned integers
    (PTC 3, 28 rows), all unsigned integers in SCOS-2000's internal representation, so the CCS
    rule that only integer parameters select a calibration, which ICD 7.0 also states, holds.
    `CUR_POS` goes up to 12 and the largest `CUR_VALPAR` is 420.[^mib-cur][^i70-cur][^i70-appa]
    Its `dst` table, the standard ICD's own command routing, has a single row (see
    [SCOS-2000 as EGSE](../scos2000/egse.md)).[^mib-cur]

### One identifier, several widths

The same identifiers were given different widths by each layer of the Herschel/Planck chain:

| Identifier | ICD 5.1 (2001) | Alcatel fax (Jan 2003), instrument S2K files | HPSDB note (2006), S2K files | CCS External ICD (ECP 1, 2003) | ICD 7.0 (2017) |
|---|---|---|---|---|---|
| Calibration curves (`CAF_NUMBR`, `TXF_NUMBR`, `MCF_IDENT`, ...) | Number(4) | Number(3) | Number(3) specific, `1xxx` generic | Char(10) | Char(10) |
| Parameter range sets (`PRF_NUMBR`) | Number(4) | Number(3) | Number(3) specific, `1xxx` generic | Char(10) (but Char(8) in the field tables) | Char(10) |
| Verification stages (`CVS_ID`) | Number(5) | Number(4) | Number(4) specific, `1xxxx` generic | Number(10) | Number(5), 0 to 32767 |

Sources per column.[^i51-widths][^fax1-req][^tn1060-g1][^ccs-ecp1][^i70-widths] ICD 7.0's
change history explains its last column: version 6.0 widened `CVS_ID` from NUM(5) to NUM(8)
with the Herschel/Planck repatriation, and a later change request, S2K-DCR-3909 (listed among
the clarifications of ICD 6.7, with the matching Number(5) length of `CVE_CVSID` and
`CVP_CVSID` in ICD 6.9), restricted it to a signed short integer.[^icd-repat][^i70-cvsdcr] Inside HPSDB a curve
was a Number(6), three digits of theoretical element number and three free digits.[^tn1060-g1]
The HIFI MIB of 2008 shows the instrument side: its textual calibrations, numerical
calibrations and command calibrations are numbered with three digits (for example 249, 293 and
134).[^hmib-cal]

!!! warning "Inference"
    The widths fit together if the short numbers belong to the instrument S2K files and the
    character identifiers to the CCS files that HPSDB generated from its own Number(6) and
    naming-convention identifiers. No source states this division of labour explicitly.

### Naming the EGSE, and real names decoded

The EGSE Interface Requirement Specification (H-P-1-ASPI-IS-0121, issue 4.1, December 2004)
applies the naming convention to the test equipment, so that SCOE commands and monitoring can
live in the same database as the spacecraft. Its rules:[^irs-names][^irs-names2][^irs-db]

* the EGSE subsystem letter is `Y`, written as the number 25 (Y being the 25th letter) in remote
  monitoring packet names;
* each EGSE item owns a range of positions: ACMS SCOE 920-939, CCS 940-941, PLM SCOE 942-943,
  CDMU DFE 944-945, TM/TC DFE 946-947, CDMU SCOE 948-949, TT&C SCOE 950-951, LPS 952-953, SAS
  954-955, BATSIM 956-957, cryo SCOE 958-959, cryo COTE 960-961, HIFI 962-963, PACS 964-965,
  SPIRE 966-967, HFI 968-969, LFI 970-971;
* remote command names are `YC` + three-character function + position, their parameters
  `YP` + function + position, remote monitoring parameters `YM` + function + position; remote
  monitoring packet identifiers combine the subsystem number 25, the position allocation and a
  four-digit element packet number whose first three digits repeat the position (this last rule
  does not apply to the cryo SCOE);
* identifiers may use only the digits, the underscore and the upper-case letters except `I`,
  `O` and `Q`;
* every SCOE subcontractor supplies its remote command and monitoring definitions (mnemonic,
  PTC, PFC, position in the packet, descriptions, calibration) in tables that can be loaded
  into the HPSDB.

The rule against `I`, `O` and `Q` is stricter than NMCVT-0100-C as the HCSS note reports it
(those letters forbidden only as the first character, because the instrument centres used them
for their EGSE-ILT parameters).[^hcss-42][^hcss-nc] The Herschel release note of 2008 shows
the EGSE subsystem as delivered: `Y104 EGSE` at model position 989, with elements such as
940 `CCS`, 946 `TMTCDFE`, 948 `CDMUSCOE` and 962, 964 and 966 for the instrument EGSEs.[^rn-sub]

The same note gives the positions of the instrument elements, which explain the endings of the
names in the printed HIFI MIB (issue 139, July 2008):[^rn-sub][^hmib-cover]

| Name in the HIFI MIB | Mnemonic | Ending | Element at that position in model `HERSCH_FM9` |
|---|---|---|---|
| `HM009190` | `HI_Prime_red` | 190 | `HIFI_ICU_N` |
| `HP056191` | `HIF_ch1_mxbias0_V` | 191 | `HIFI_FCU_N` |
| `HM001193` | `HI_WBSV_S` | 193 | `HIFI_WBS_N` |
| `HM000194` | `HI_LCU_S` | 194 | `HIFI_LCU_N` |
| `HP001197` | `HIFI_BB_ID` | 197 | `HIFI_OBS_N` |

The names come from the annex's parameter lists and packet layouts.[^hmib-icu][^hmib-cmdpar][^hmib-hk][^hmib-cmd]

!!! warning "Inference"
    Reading the names as subsystem letter (`H`), item-type letter (`M` monitoring parameter,
    `P` command parameter, `D` for names such as `HD111190` `HIFI_ptv_input`), three free
    characters and the element position is this wiki's application of HPSDB rule G2 and of the
    EGSE pattern above; the HIFI documents do not explain their names. Thales Alenia Space's
    2015 slides on the successor database list `A` TM packet, `C` curve, `D` synthetic
    parameter, `G` group, `K` constant and `M` TM parameter as item letters.[^tn1060-g1][^sesp-rules]
    The SPIRE convention (`SMiiippp`, `SPiiippp`, `SCiiippp`) follows the same shape with the
    instrument letter `S`.

### The minimum EGSE data set

The SCOS-2000 EGSE delivered to the instrument teams shipped with a minimum MIB, `MIN_EGSE`,
that every mission had to adapt: its own TC packet header in `tcp.dat`, `pcdf.dat` and
`pcpc.dat`, the `ZLOADTT` and `ZBINTC` commands, and the TM header related displays and
parameters. All names in `MIN_EGSE` start with `Z`, and SPIDs 1 to 100 are reserved for the
generic EGSE setup. A `mergeDATA` facility merges `MIN_EGSE` with instrument data sets into a
new MIB directory.[^emcs-min][^emcs-merge] See [SCOS-2000 as EGSE](../scos2000/egse.md).

### Configuration control at SPIRE

SPIRE's note on database management and CUS configuration control (issue 1.0, February 2007)
shows the other half of tailoring, namely how a validated MIB is kept traceable in tests. The
rationale is to know, at any later time, which version of which script produced a given set of
telemetry.[^spire-db-why] The steps for a new test database are: create a Versant database,
create a mission configuration (`config1`), ingest the MIB with `ingestmib` under a user label,
load calibration tables, import the CUS definitions, set the initial observation ID and create
an instrument model for the configuration.[^spire-db-steps] Ingestion runs semantic checks and
writes `mibchecker.log`. Serious problems stop the ingestion, while minor ones are only
logged.[^spire-db-ingest]

Scripts are tagged in CVS as `LABEL_CONFIGN`, for example `AVM_TEST_CONFIG6`. During a test,
changes are tracked only by the database's automatic versions (a CVS version 1.2 becomes 1.2.1
on ingestion), and the results are checked back into CVS afterwards. A new configuration
freezes a snapshot of definitions and calibration tables.[^spire-db-cvs] A calibration table
`TestSetup.txt` with the keys configuration, environment (`moc`, `ilt`, `hsc`, `ist`, `par`),
test type, prime or redundant instrument, thermal condition and debug level lets the same CUS
definitions serve every test environment.[^spire-db-table]

## Solar Orbiter: tables beyond the ICD

The Solar Orbiter MIB releases contain the 53 ICD tables plus extra files that the ICD does not
define. The September 2025 release has six, `ASW_sw_para.dat`, `pcf_glob_det.dat`, `dup.dat`,
`s13a.dat`, `s13p.dat` and `s13t.dat`, and the April 2020 release has the first three. The SWA
instrument database has `pcf_glob_det.dat`, `sw_para.dat` and an empty `ssy.dat`.[^mib-extra][^mib2020][^swa-extra]
No document in the library describes these files, so everything below is deduced from their
contents.

| File | 2020 rows | 2025 rows | Columns | Deduced role |
|---|---|---|---|---|
| `ASW_sw_para.dat` | 85,430 | 105,222 | 3 | long software names and descriptions for MIB identifiers |
| `pcf_glob_det.dat` | 52,417 | 56,631 | 3 | bit position of each "detail" parameter inside a "global" parameter |
| `dup.dat` | 36 | 69 | 2 | packets to be re-identified under a second APID |
| `s13a.dat` | – | 7 | 6 | file attribute (content type) codes |
| `s13p.dat` | – | 11 | 6 | on-board file partitions |
| `s13t.dat` | – | 12 | 7 | file types, linking an attribute and a default partition |

Counts from this wiki's queries.[^mib-extra][^mib2020]

!!! warning "Inference"
    All interpretations in this section are deduced from column contents and cross-table
    matches. The ICD does not define these files, and the Solar Orbiter documents in the library
    do not mention them. They may be consumed by mission-specific tools rather than by the
    SCOS-2000 importer.

### ASW_sw_para: software names and long descriptions

Each row holds an identifier, a software-level name and a description of up to 255
characters. The identifiers are unique and cover every kind of MIB object: 77,565 are
monitoring parameters (`PCF_NAME`), 3,676 command parameters (`CPC_PNAME`), 2,221 commands
(`CCF_CNAME`), 7,665 TM packet mnemonics (`TPCF_NAME`), 208 textual calibrations, 130 command
textual calibrations and 77 range sets. 13,727 identifiers starting with `B` match no ICD table.[^mib-asw]

| Identifier | Second column | Third column (truncated) | Matches |
|---|---|---|---|
| `NAH7Z002` | `NAH7Z002` | "[Clone of NAHD0000] HGA-APME A Mode" | `PCF_NAME` |
| `PCA8B021` | `PTC_GET_N_PARAM` | "Maximum value is (<TC_MAX_DATA_LENGTH>-1)/4" | `CPC_PNAME` |
| `ZAHG0000` | `ZAHG0000` | "This TC sends one 1553 command to the HGA-APME A …" | `CCF_CNAME` |
| `YCA00101` | `TMA_TCACK_ACC_SUCCESS` | "This telemetry is the report generated when a TC is successfully received …" | `TPCF_NAME` |
| `CCDT0001TX` | `AOCS_PROFILE_ID` | "AOCS profiles" | `TXF_NUMBR` |
| `VCD00147` | `Z_IDINT0TO1` | "Integer between 0 and 1" | `PRF_NUMBR` |
| `BCAY0002` | `AOCSCORE_STRUNITA_QUAT_LSB` | (empty) | none |

Real rows from the release.[^mib-asw]

!!! warning "Inference"
    The file looks like the place where Solar Orbiter keeps what the ICD has no field for: the
    long, software-level mnemonic of each item (up to 122 characters in the second column) and
    a long description (up to 255 characters), much like the 64-character mnemonic and
    256-character long description that HPSDB stored for every item but could not export to
    SCOS-2000.[^tn1060-g1] The `B` identifiers, with names such as
    `AOCSCORE_STRUNITA_QUAT_LSB`, look like on-board software constants that have no MIB
    table. The SWA database's `sw_para.dat` holds 2,841 identifiers in a differently filled
    layout (empty second column).[^swa-extra]

### pcf_glob_det: detail parameters inside global parameters

Each of the 56,631 rows names a **global** parameter, a **detail** parameter and a number.
All names are PCF parameters, each detail belongs to exactly one global, and there are 8,704
globals with up to 1,024 details each. A typical example is the 8-bit `NAH0Z000` "APMHA_TM_1
[000]", split into the 3-bit `NAHD0000` "APMHA_Mode" at offset 0 and five 1-bit flags at offsets
3 to 7.[^mib-glob]

| Global | Detail | Offset | Detail description | Detail type |
|---|---|---|---|---|
| `NAH0Z000` (PTC 3, PFC 4) | `NAHD0000` | 0 | APMHA_Mode | 2/3 |
| | `NAHD0001` | 3 | APMHA_Mode trans | 2/1 |
| | `NAHD0002` | 4 | APMHA_SafePos achieved | 2/1 |
| | `NAHD0003`–`NAHD0005` | 5–7 | APMHA_Survnce_ Stat, APMHA_Vind_Elev_Stat, APMHA_Va_Elev_Stat | 2/1 |

The number is a bit offset. In every packet where both a global and one of its details are
located by the PLF (215,859 such pairs), the detail starts exactly that many bits after the
global: in SPID 33500, for instance, `NAH0Z000` and `NAHD0000` both start at octet 67, bit 0,
and `NAHD0001` at octet 67, bit 3.[^mib-glob] 12,074 rows have a global with no PLF entry. Of
the 8,704 globals, 5,124 are octet strings (PTC 7; 1,913 of them 8 octets long) and 3,580 are
unsigned integers (PTC 3), mostly of 8 bits (1,607) or 16 bits (1,464).[^mib-glob]

!!! warning "Inference"
    The table records, as data, the structure that the PLF expresses only implicitly through
    overlapping entries: a raw word is located once as a global parameter, and its fields are
    located again as overlapping detail parameters. Tools can use it to show a word together
    with its decoded fields, or to check that the overlaps are consistent. The ICD allows
    overlapping PLF entries,[^icd-plf] but has no table that ties a field to its container.

### dup: duplicating packets under a pseudo-APID

The 69 rows of `dup.dat` map a SPID to an APID. Every SPID exists in the PID, and every target
APID is one of 41 APIDs between 1953 and 1996 that appear in the PID with their own packet
definitions. The duplicated packets are generic reports: event reports (5,1), (5,2) and (5,3),
memory dumps (6,6), monitoring list reports (12,9), functional monitoring reports (142,11) and
some private services.[^mib-dup]

The ICD offers one piece of the mechanism. Since issue 6.5 (release 4.2) the [PIC](tables/pic.md)
table has an optional field `PIC_APID`, so the position and width of the extra identification
fields PI1 and PI2 can be defined per APID and type/subtype instead of per type/subtype
only.[^icd-pic][^icd-annex65] In the 2025 release 47 PIC rows set `PIC_APID`, and their APIDs are
exactly the 41 `dup` targets.[^mib-dup]

The chain for the AOCS monitoring list report shows how the pieces fit together:[^mib-dup]

1. The spacecraft sends a (12,9) monitoring list report from APID 179. The MIB defines it as
   SPID 20129 "Monitoring List Report", a variable packet (`PID_TPSD = 20129`), with no PI1/PI2.
2. `dup.dat` maps SPID 20129 to APID 1986.
3. For type 12, subtype 9 and APID 1986, the PIC places PI1 at octet 19 (8 bits) and PI2 at
   octet 883 (8 bits).
4. The PID has three (12,9) packets on APID 1986: SPID 65909 "AOCS - Monitoring List Report #1"
   (PI1 = 1, PI2 = 41), SPID 65910 "#2" (122, 142) and SPID 65911 "#3" (220, 242). All are fixed
   packets (`PID_TPSD = -1`).
5. SPID 65909 has 1,275 PLF entries, one fixed slot per expected monitor. PI1 is the ID field
   of the first slot (`NXAS001A`, octet 19), and PI2 the ID field of a later slot (`NXAS041A`,
   octet 883).
6. Synthetic "consistency" parameters check every slot's ID and act as validity parameters for
   the slot's fields (see [Synthetic parameters](synthetic-parameters.md#worked-example-2-consistency-of-instantiated-monitoring-reports)).

```mermaid
flowchart LR
    TM["(12,9) report<br/>APID 179"] --> V["SPID 20129<br/>variable packet (VPD)"]
    TM -. "dup.dat: 20129 -> 1986" .-> D["copy identified<br/>under APID 1986"]
    D --> PIC["PIC (12,9, APID 1986):<br/>PI1 @ octet 19, PI2 @ octet 883"]
    PIC --> P1["SPID 65909 #1<br/>PI1=1, PI2=41"]
    PIC --> P2["SPID 65910 #2<br/>PI1=122, PI2=142"]
    PIC --> P3["SPID 65911 #3<br/>PI1=220, PI2=242"]
    P1 --> PLF["fixed PLF slots +<br/>consistency synthetics"]
```

Chain reconstructed from `dup`, `pic`, `pid` and `plf`.[^mib-dup]

!!! warning "Inference"
    The likely purpose is to get full telemetry processing for data that the spacecraft sends
    in variable packets. The ICD warns that parameters extracted from variable packets get no
    validity, limit checking or synthetic evaluation.[^icd-pusvar] By having a ground process
    re-identify a copy of each report under a pseudo-APID, the mission can describe the same
    bytes a second time as fixed packets, chosen by monitor IDs, whose parameters are fully
    processed. The release does not say which process makes the copy. The number of mapped
    packets grew from 36 (27 APIDs) in 2020 to 69 (41 APIDs) in 2025.[^mib-dup][^mib2020]

### s13a, s13p and s13t: file transfer definitions

The three `s13` files are new in 2025. `s13p` lists 11 partitions with numeric identifiers 161 to
195, such as 161 "OMM TC Files (A)", 162 "OMM OBCPs (A)", 163 "OMM System Files (A)", 177 "OMM TC
Files (B)" and 193 "SGM-EEPROM CSW TC Files (A)". `s13a` lists 7 codes 0 to 6: PLAIN, OBCP,
DELAYED TC, IMMEDIATE TC, PAYLOAD CONTEXT, INVALID and OTHER. `s13t` lists 12 file types with
codes −2 to 9, such as "TC sequence (CSF type 1)", "Time tagged TC sequence (CSF type 2)",
"Backup MTL (CSF type 3)", "SCOS stack file" and "OBCP". Its sixth column refers to an `s13a`
entry, and its seventh to a default `s13p` partition (TCFA, SYSA, OBCA).[^mib-s13]

The partition numbers match the commanding side of the MIB. The command `ZCD00D09` "Accept First
Uplink Part", a [PUS service 13](../ecss/pus/st13-large-packet-transfer.md) telecommand
(13,9), has the parameters FTS Id, Partition Id, File IDentifier, File size, File Attribute and
the file content. Its Partition Id is decalibrated by `CCDT0192TX` "Partition", whose 11 values
are the same numbers 161 to 195 as in `s13p` (for example 161 `OMM_TC_FILES_A`, 193
`SGMA_TC_FILES`). Its File Attribute uses `CCDT0082TX` "File types": 0 `FT_INVALID`, 1 `FT_OBCP`,
2 `FT_DEL_TCSEQ`, 3 `FT_IMM_TCSEQ`, 4 `FT_PL_CTX`, 5 `FT_PS`, 6 `FT_PLAIN`, 7 `FT_FAT`.[^mib-s13cmd]

!!! warning "Inference"
    The `s13` tables appear to configure a ground tool that uploads files to the on-board mass
    memory with service 13: `s13p` names the target partitions, `s13a` the attribute values, and
    `s13t` the kinds of file to upload with their default attribute and partition. Codes 1 to 4
    of `s13a` match the File Attribute calibration, but codes 0, 5 and 6 do not (`s13a` has 0
    PLAIN, 5 INVALID, 6 OTHER, while the calibration has 0 `FT_INVALID`, 5 `FT_PS`, 6
    `FT_PLAIN`), and the `s13p` description of 164/180 ("OMM Spare") differs from the calibration
    (`OMM_PAYLOAD_A`/`_B`). The meaning of the one-letter flags in the second column (`M`, `B`,
    `N` in `s13p`; `C`, `W` in `s13t`) is not stated in the available sources.

## Patterns across projects

| Pattern | Herschel/Planck | Solar Orbiter |
|---|---|---|
| Narrower identifiers | curve, range set and stage identifiers shortened by one digit in instrument files (faxes, HPSDB G3–G5) | – |
| Narrower packet types | PTC/PFC limited to the PS-ICD Appendix 6 set; PUS version 0 only | 2,542 of 126,745 parameters use pairs outside that set |
| Wider identifiers and new tables | CCS files: Char(10) curves and range sets, Number(10) stages; `cur`, `grp`, `grpa`, `grpk`, `lgf`, `sco`, `tcd`, `tmd`, delta limits, `CAF_INTER`, default sub-schedule | uses the repatriated features: 1,974 `cur` rows, 105 delta checks, 2 groups, `CCF_SUBSCHEDID` |
| Naming conventions | project NMCVT, SPIRE and HIFI names ending in element positions, `Z` pseudo items, `I`/`O`/`Q` reserved, EGSE items `Y` with positions 920–971 | consistent prefixes visible in the data: `N…` monitoring parameters, `Y…` packet mnemonics, `Z…` commands, `P…` command parameters, `A…` sequences, `D…` displays |
| Reserved ranges | UDC packet partitioned per subsystem; SPIDs 1–100 in the instrument EGSE and 100–999 in the CCS; APIDs 2016–2046 for SCOE/EGSE; parameter names `YZ…` for CCS system parameters | pseudo-APIDs 1953–1996 for re-identified packets; only SPIDs 101–103 (MATIS packets on APID 1966) below 1000 |
| Forbidden features | constants, sequences, parameter sets, printouts, octal radix | – |
| Extra information | command durations table (HCSS); HPSDB long mnemonics and descriptions | `ASW_sw_para`, `pcf_glob_det`, `dup`, `s13*` |
| Configuration control | field-level change records (OIRD); HPSDB working, reference and archive areas with validation by the manager; release notes with change records, NCR status and MD5 checksums; CCS update files naming validated items; CVS tags and database configurations (SPIRE) | release names and `vdf` comments (e.g. `20250916-CSW3.1.2_MAS7.33`) |

Herschel/Planck entries from the documents above; Solar Orbiter entries from the release data
(the naming prefixes are this wiki's observation).[^mib-extra][^mib-vdf][^mib-ptc][^mib-cur]

??? example "SQL used"
    Run against `solo-2025-09-16.sqlite` (and `solo-2020-04-16.sqlite`, `swa-idb.sqlite`). The
    non-ICD tables have generic column names `COL1`…`COLn` in file order. The `pcf_glob_det`
    offset check was done in Python over the same data because the join is slow in SQLite
    without indexes.

    ```sql
    -- sizes
    SELECT count(*) FROM asw_sw_para;  SELECT count(*) FROM pcf_glob_det;  SELECT count(*) FROM dup;
    SELECT * FROM s13a;  SELECT * FROM s13p;  SELECT * FROM s13t;

    -- ASW_sw_para: what the identifiers are
    SELECT count(*), sum(COL1 IN (SELECT PCF_NAME FROM pcf)), sum(COL1 IN (SELECT CPC_NAME FROM cpc)),
           sum(COL1 IN (SELECT CCF_CNAME FROM ccf)), sum(COL1 IN (SELECT TPCF_NAME FROM tpcf)),
           sum(COL1 IN (SELECT PRF_NUMBR FROM prf)), count(DISTINCT COL1)
      FROM asw_sw_para;
    SELECT max(length(COL2)), max(length(COL3)) FROM asw_sw_para;

    -- pcf_glob_det: example and integrity
    SELECT g.COL1, g.COL2, g.COL3, pd.PCF_DESCR, pd.PCF_PTC, pd.PCF_PFC
      FROM pcf_glob_det g JOIN pcf pd ON pd.PCF_NAME = g.COL2 WHERE g.COL1 = 'NAH0Z000';
    SELECT PLF_NAME, PLF_SPID, PLF_OFFBY, PLF_OFFBI FROM plf
     WHERE PLF_NAME IN ('NAH0Z000', 'NAHD0000', 'NAHD0001') AND PLF_SPID = '33500';
    SELECT count(*), count(DISTINCT COL1), count(DISTINCT COL2) FROM pcf_glob_det;

    -- dup and APID-specific PIC rows
    SELECT d.COL1, d.COL2, p.PID_TYPE, p.PID_STYPE, p.PID_APID, p.PID_DESCR
      FROM dup d JOIN pid p ON p.PID_SPID = d.COL1;
    SELECT count(*) FROM pic WHERE PIC_APID <> '';                          -- 47
    SELECT count(DISTINCT d.COL2) FROM dup d
     WHERE EXISTS (SELECT 1 FROM pic WHERE PIC_APID = d.COL2);              -- 41
    SELECT * FROM pic WHERE PIC_APID = '1986';
    SELECT PID_SPID, PID_PI1_VAL, PID_PI2_VAL, PID_DESCR, PID_TPSD FROM pid
     WHERE PID_APID IN ('1986', '179') AND PID_TYPE = '12';

    -- s13 tables against the ST[13] uplink command
    SELECT c.CDF_ELTYPE, c.CDF_BIT, c.CDF_PNAME, p.CPC_DESCR, p.CPC_PAFREF
      FROM cdf c LEFT JOIN cpc p ON p.CPC_NAME = c.CDF_PNAME WHERE c.CDF_CNAME = 'ZCD00D09';
    SELECT * FROM pas WHERE PAS_NUMBR IN ('CCDT0192TX', 'CCDT0082TX');

    -- PTC/PFC pairs against the Herschel/Planck PS-ICD Appendix 6 set
    WITH t AS (SELECT CAST(PCF_PTC AS INT) ptc, CAST(PCF_PFC AS INT) pfc FROM pcf)
    SELECT ptc, count(*), sum(CASE
        WHEN ptc = 1 THEN pfc = 0
        WHEN ptc = 2 THEN pfc IN (1,2,3,4,5,6,7,8,12,16,32)
        WHEN ptc IN (3,4) THEN pfc BETWEEN 0 AND 14
        WHEN ptc = 5 THEN pfc IN (1,2)
        WHEN ptc = 6 THEN pfc IN (1,2,4,8)
        WHEN ptc IN (7,8) THEN 1
        WHEN ptc = 9 THEN pfc = 17
        WHEN ptc = 11 THEN pfc = 0
        ELSE 0 END) AS inside
      FROM t GROUP BY ptc;            -- total 126745, inside 124203 (same query on cpc: 7155, 7115)
    SELECT PCF_PTC, PCF_PFC, count(*) FROM pcf GROUP BY 1, 2;   -- e.g. 2|18|224, 9|15|2116

    -- CCS External ICD rules
    SELECT count(*) FROM pcf WHERE PCF_NAME LIKE 'VAR%' OR PCF_NAME LIKE 'GVAR%'
        OR PCF_NAME LIKE '$%' OR PCF_NAME LIKE 'YZ%';                        -- 0
    SELECT p.PCF_PTC, count(*), count(DISTINCT c.CUR_RLCHK)
      FROM cur c JOIN pcf p ON p.PCF_NAME = c.CUR_RLCHK GROUP BY 1;          -- 1|112|40, 2|1834|8, 3|28|4
    SELECT max(CAST(CUR_POS AS INT)), max(CAST(CUR_VALPAR AS INT)) FROM cur; -- 12 | 420
    SELECT PID_SPID, PID_APID, PID_TYPE, PID_STYPE, PID_DESCR FROM pid
     WHERE CAST(PID_SPID AS INT) BETWEEN 100 AND 999;                        -- 101-103, APID 1966, type 166
    SELECT count(*), sum(coalesce(CCF_SUBSCHEDID, '') <> '') FROM ccf;       -- 5454 | 5304
    SELECT OCP_TYPE, count(*) FROM ocp GROUP BY 1;  SELECT count(*) FROM grp; -- D 105; 2
    SELECT count(*) FROM dst;                                                -- 1
    ```

## Related pages

* [The MIB](index.md), [MIB data model](data-model.md) and
  [History of the Database Import ICD](icd-history.md).
* [Monitoring in the MIB](monitoring.md) (PID, PIC, PLF, VPD) and
  [Synthetic parameters](synthetic-parameters.md).
* [MIB tooling](tooling.md): the editors and databases that applied these rules, and
  [operations preparation](../scos2000/operations-preparation.md#hpsdb-and-srdb-a-database-with-views)
  (HPSDB and SRDB as one database with views).
* [Herschel and Planck](../missions/herschel-planck.md),
  [Herschel/Planck ground segment](../scos2000/herschel-planck-ground.md),
  [Herschel/Planck interface documents](../scos2000/herschel-planck-interfaces.md) (PS-ICD, CCS
  external interfaces) and [The Solar Orbiter MIB](../missions/solar-orbiter/mib.md).

[^icd-sum]: [SCOS-2000 Database Import ICD, EGOS-MCS-S2K-ICD-0001 issue 7.0](../library/icd-7-0-final.md), §3.2 Summary of the ASCII tables, PDF pp. 30–32.
[^icd-21]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §2.1 Assumptions and constraints, PDF p. 21.
[^icd-ppf]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §3.3.2.7.7 ppf and §3.3.2.7.8 ppc, PDF pp. 123–125.
[^oird-ad8]: [Herschel/Planck OIRD issue 2.2](../library/cosmos-operations-interface-requirements.md), §1.3 Applicable documents (AD-8: SCOS-2000 Database Import ICD issue 5.1, Oct. 2001), PDF p. 10.
[^i51-21]: [SCOS-2000 Database Import ICD issue 5.1, S2K-MCS-ICD-0001-TOS-GCI](../library/icd-5-1-tos-gci.md), §2.1 Assumptions and constraints, PDF p. 12.
[^icd-23]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §2.3 Structure of the ASCII files, PDF p. 22.
[^icd-24]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §2.4 Checks applied at import time, PDF pp. 22–23.
[^icd-plf]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §3.3.2.5.1 Parameters location in fixed packets: plf (introduction), PDF p. 97.
[^icd-pic]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §3.3.2.4.2 pic, field 7 PIC_APID, PDF p. 93.
[^icd-annex65]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Annex, "Changes applicable as from R4.2 implemented in ICD version 6.5" (PIC_APID), PDF p. 255.
[^icd-pusvar]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Appendix C §2 Support of PUS data structures, PDF p. 236.
[^oird-sdb]: [Herschel/Planck Operations Interface Requirements Document, SCI-PT-RS-07360 issue 2.2](../library/cosmos-operations-interface-requirements.md), §4.2.1 Satellite Database content requirements SDBC-1 to SDBC-3, PDF p. 40.
[^oird-sdb2]: [Herschel/Planck OIRD issue 2.2](../library/cosmos-operations-interface-requirements.md), SDBC-4 to SDBC-12 and §4.2.2 delivery requirements SDBD-1 to SDBD-5, PDF p. 41.
[^oird-a4]: [Herschel/Planck OIRD issue 2.2](../library/cosmos-operations-interface-requirements.md), Annex A4.1 Satellite Database naming conventions, PDF p. 70.
[^fax1-ref]: [Alcatel Space fax H-P-ASP-LT-2607, "Herschel / Planck - SCOS - Limitation to naming convention", 27 January 2003](../library/alc-scos-fax-2003-01-27.md), header, distribution list and references, PDF p. 1.
[^fax1-req]: [Alcatel Space fax H-P-ASP-LT-2607](../library/alc-scos-fax-2003-01-27.md), Requirements 1–4, PDF p. 1.
[^fax1-just]: [Alcatel Space fax H-P-ASP-LT-2607](../library/alc-scos-fax-2003-01-27.md), UDC allocation, requirement 5, Justification and Document impacts, PDF p. 2.
[^fax2]: [Alcatel Space fax H-P-ASP-LT-2905, 27 March 2003](../library/alc-scos-2003-03-27.md), requirements 5 and 6 (PDF p. 1), justifications and document impacts (PDF p. 2). Scanned document without text layer; content as summarised from a manual reading in the library entry.
[^spire-nc-ad]: [SPIRE MIB Naming Convention, SPIRE-RAL-NOT-001155 issue 1.2](../library/spire-mib-naming-convention-1-2.md), §1 Introduction and §1.1 Documentation, PDF p. 1.
[^spire-nc]: [SPIRE MIB Naming Convention issue 1.2](../library/spire-mib-naming-convention-1-2.md), §2 Naming convention, PDF pp. 1–2.
[^spire-nc-id]: [SPIRE MIB Naming Convention issue 1.2](../library/spire-mib-naming-convention-1-2.md), §2 (component list) and §3.1 System Elements, PDF pp. 2–3.
[^spire-nc-real]: [SPIRE MIB Naming Convention issue 1.2](../library/spire-mib-naming-convention-1-2.md), §3.2–3.5 Position identifiers, real element numbers, alternative IDs and parameter unit IDs, PDF pp. 3–4.
[^spire-nc-w]: [SPIRE MIB Naming Convention issue 1.2](../library/spire-mib-naming-convention-1-2.md), §3.5 (continued), PDF p. 5.
[^hcss-cr]: [HCSS MIB Clarification and Tailoring Note, HSC/DOC/0300 issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), title page and document change record, PDF pp. 1–2.
[^hcss-intro]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §1.1–1.3 Overview, purpose and background, PDF pp. 4–5.
[^hcss-bg]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §1.3 Background, PDF p. 4.
[^hcss-rd]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §2 Referenced documents, PDF p. 6.
[^hcss-41]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §4.1 Clarification of [RD-1], points 4.1.1–4.1.8, PDF pp. 9–10.
[^hcss-42]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §4.2 Clarification of [RD-2], PDF pp. 10–11.
[^hcss-51]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §5.1 Required tables and §5.1.1 Command durations table, PDF p. 12.
[^hcss-52]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §5.2 Tailoring of [RD-1], points 5.2.3–5.2.13, PDF pp. 13–14.
[^hcss-53]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §5.3 Tailoring of [RD-2], points 5.3.1–5.3.5, PDF p. 14.
[^hcss-63]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §6.1 and §6.3 Constraints for version 0.2, PDF pp. 15 and 19.
[^hcss-7]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §7 Checks performed by the HCSS MIB software, checks 7.0.1–7.0.34, PDF pp. 20–22.
[^hcss-nc]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §8 Comments on [RD-2], PDF pp. 23–24.
[^hcss-nc2]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §8 (CUS scripting language and underscore), PDF p. 24.
[^hcss-esoc]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §9 ESOC response to comments by HS (DCR 286, 308, 309), PDF pp. 25–27.
[^hcss-10]: [HCSS MIB Clarification and Tailoring Note issue 1.5](../library/hcss-mib-clarification-tailoring-note.md), §10 Discussions on SPID uniqueness, PDF pp. 28–29.
[^tn1060-cr]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB, issue 1](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), title block and change records, PDF pp. 2–3.
[^tn1060-scope]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §1 Scope, PDF p. 7.
[^tn1060-ad]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §2 Documents and §3 Acronyms, PDF p. 8.
[^tn1060-g1]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.1–4.8 (G1–G11), PDF pp. 9–14.
[^tn1060-g7]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.4 "G7 – Commutation", PDF pp. 11–13.
[^tn1060-g13]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §4.9–4.17 (G12–G20), PDF pp. 14–16.
[^tn1060-pcf]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.2.1 PCF (WIDTH row and note 1), PDF pp. 19 and 21.
[^tn1060-pid]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.2.9–5.2.10 PID and PIC, PDF pp. 24–26.
[^tn1060-vpd]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.2.13 VPD and §5.2.20–5.2.21 PPF/PPC, PDF pp. 27–28 and 31.
[^tn1060-seq]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.3.9–5.3.12 and §5.3.16–5.3.20 (sequences and parameter sets), PDF pp. 36–40.
[^tn1060-ccs]: [H-P-1-ASP-TN-1060, MIB files processing by HPSDB](../library/h-p-1-asp-tn-1060-mib-processing-hpsdb.md), §5.4 Specific CCS data (CUR, GRP, GRPA, GRPK, SCO, TCD, TMD, LGF), PDF pp. 42–45.
[^emcs-min]: [EGSE based on SCOS 2000, EMCS Software User Manual issue 4.0](../library/emcs-sum-4-0.md), §4.1.1 The minimum EGSE data set, PDF pp. 21–22.
[^emcs-merge]: [EGSE based on SCOS 2000, EMCS Software User Manual issue 4.0](../library/emcs-sum-4-0.md), §4.1.2–4.1.3 mergeDATA and setSCOSdata facilities, PDF pp. 22–23.
[^spire-db-cr]: [SPIRE Database Management and CUS Configuration Control, SPIRE-RAL-NOT-002829 issue 1.0](../library/spire-db-management-1-0.md), title page and §1.6 Document change record, PDF pp. 1 and 5.
[^spire-db-why]: [SPIRE Database Management and CUS Configuration Control issue 1.0](../library/spire-db-management-1-0.md), §3.1 Configuration control rationale, PDF p. 15.
[^spire-db-steps]: [SPIRE Database Management and CUS Configuration Control issue 1.0](../library/spire-db-management-1-0.md), §2.1.2 Creating a database, steps 2.1.2.1–2.1.2.10, PDF pp. 6–12.
[^spire-db-ingest]: [SPIRE Database Management and CUS Configuration Control issue 1.0](../library/spire-db-management-1-0.md), §2.1.2.5 Ingesting the MIB into the database, PDF pp. 8–9.
[^spire-db-cvs]: [SPIRE Database Management and CUS Configuration Control issue 1.0](../library/spire-db-management-1-0.md), §3.2.2.3–3.2.2.4 Tags and configuration control after the test is started, PDF pp. 18–19.
[^spire-db-table]: [SPIRE Database Management and CUS Configuration Control issue 1.0](../library/spire-db-management-1-0.md), §3.3 Structure and dependencies of the CUS definitions (TestSetup.txt), PDF pp. 20–23.
[^mib-extra]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), file list of the release archive and tables `asw_sw_para`, `pcf_glob_det`, `dup`, `s13a`, `s13p`, `s13t`; inspection and queries by this wiki.
[^mib2020]: [Solar Orbiter MIB release MIB__20200416M10720PFMS001_SOL](../library/mib-20200416m10720pfms001-sol.md), tables `asw_sw_para`, `pcf_glob_det`, `dup` and `pic`; queries by this wiki.
[^swa-extra]: [Solar Orbiter SWA instrument database (ASCII.zip)](../library/swa-idb-ascii.md), files `pcf_glob_det.dat`, `sw_para.dat`, `ssy.dat`; queries by this wiki.
[^mib-asw]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), table `asw_sw_para` matched against `pcf`, `cpc`, `ccf`, `tpcf`, `txf`, `paf` and `prf`; queries by this wiki.
[^mib-glob]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), table `pcf_glob_det` joined with `pcf` and `plf`; queries and script by this wiki.
[^mib-dup]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `dup`, `pic`, `pid`, `tpcf` and `plf` (SPIDs 20129 and 65909–65911); queries by this wiki.
[^mib-s13]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `s13a`, `s13p` and `s13t`; queries by this wiki.
[^mib-s13cmd]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), `ccf`, `cdf` and `cpc` records of command `ZCD00D09`, and `paf`/`pas` records of `CCDT0192TX` and `CCDT0082TX`; queries by this wiki.
[^mib-vdf]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), table `vdf` and first letters of the names in `pcf` (126,740 of 126,745 start with N), `tpcf` (11,131 of 11,150 with Y), `ccf` (5,441 of 5,454 with Z), `cpc` (5,428 of 7,155 with P), `csf` (all 3,404 with A) and `dpf`; queries by this wiki.
[^ps-scope]: [Herschel/Planck Packet Structure ICD, SCI-PT-ICD-07527 issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), §1.1 Scope (applicable document AD-3, the OIRD) and requirement 1000-GEN, PDF p. 39.
[^ps-a6]: [PS-ICD issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), Appendix 6 Parameter types and structures, §A6-1 to A6-3.5 and requirement 1200-A6, PDF pp. 172-176.
[^ps-a6b]: [PS-ICD issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), Appendix 6 §A6-3.6 to A6-3.10 (bit string, octet string, time, deduced, character string), PDF pp. 176-179.
[^ps-cr6a]: [PS-ICD issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), change record of issue 6.draftA (Appendix 6 upgrade: PTC 8 allowed on board for the stored software version identifier), PDF pp. 26-27.
[^ps-cr60]: [PS-ICD issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), change record of issue 6.0, 25 January 2008 (removal of real format PTC 5, PFC 3), PDF p. 32.
[^ps-a3]: [PS-ICD issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), Appendix 3 Application Process ID Assignment, introduction and requirement 1140-A3 c, PDF p. 158.
[^ps-a3b]: [PS-ICD issue 6.0](../library/ad05-sci-pt-icd-07527-6-0-psicd-herschel-planck-packet-structure-interface-control-d.md), Appendix 3, Table A-3.1 (base APIDs and offsets, 2016 to 2046 SCOE/EGSE reserved, 2047 idle), PDF pp. 159-163.
[^i70-appa]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Appendix A, Table 4 "Parameter Type and Format Codes supported by SCOS-2000" (PTC 1 and 2 handled as unsigned integers), PDF pp. 214-224.
[^i70-cur]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), §3.3.2.2.1 cur, fields CUR_POS, CUR_RLCHK (restricted to monitoring parameters with an integer raw representation) and CUR_VALPAR, PDF p. 64.
[^i70-widths]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), field 1 of caf (PDF p. 65), txf (PDF p. 69), mcf (PDF p. 71), §3.3.3.4.1 cvs (CVS_ID Number(5), range 0 to 32767, PDF p. 192) and prf (PDF p. 211).
[^i70-cvsdcr]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), document change history, S2K-DCR-3909 "Restriction of CVS_ID values to signed short int" (document clarifications of ICD version 6.7, PDF p. 259) and the related length updates of CVE_CVSID and CVP_CVSID (ICD version 6.9, PDF p. 260).
[^icd-repat]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Annex 1, items for ICD version 6.0 "Implement modifications related to Hershel & Planck Check Out System functionalities repatriation" (including CVS ID from NUM(5) to NUM(8)), PDF pp. 246-248.
[^i51-widths]: [SCOS-2000 Database Import ICD issue 5.1, S2K-MCS-ICD-0001-TOS-GCI](../library/icd-5-1-tos-gci.md), field 1 of caf (CAF_NUMBR Number(4), PDF p. 32), txf (PDF p. 33), mcf (PDF p. 35), cvs (CVS_ID Number(5), PDF p. 93) and prf (PRF_NUMBR Number(4), PDF p. 102).
[^ccs-cr]: [Herschel Planck Central Checkout System External ICD, H-P-4-TE-ID-8020 issue 1.8 (Terma)](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), document change record (draft A of 22 April 2002 to issue 1.8 of 18 January 2006; issue 1.4 moving the extrapolation flag to CAF, issue 1.5 for ECP 1 and ECP 3), PDF p. 2.
[^ccs-scope]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §1.2 Scope and §2.1 Applicable documents (AD-001 EGSE IRS, AD-002 SCOS-2000 Database Import ICD issue 5.1), PDF p. 7.
[^ccs-bridge]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9 Interface Herschel Plank Bridge-Files (introduction), PDF p. 9.
[^ccs-upd]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §8 Interface Herschel Plank Update files, PDF p. 9.
[^ccs-danger]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.1 Changes due to Danger Actions, PDF pp. 9-10.
[^ccs-cur]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.2-9.3.2, Tables 9.2-1 (OCP_TYPE, OCP_LVALU), 9.3-1 (PCF_CURTX, PCF_INTER and the note on OCF_INTER) and 9.3-2 (CUR), PDF pp. 10-12.
[^ccs-grp]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.4, Tables 9.4-1 to 9.4-3 (GRP, GRPA, GRPK), PDF pp. 12-13.
[^ccs-sys]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.5, Tables 9.5-1 (PCF_NAME) and 9.5-2 (PID_SPID), PDF p. 14.
[^ccs-sco]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.6-9.9, Tables 9.6-1 (SCO), 9.7-1 (TCD), 9.8-1 (TMD) and field CAF_INTER, PDF pp. 14-15.
[^ccs-ecp1]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.10 Changes due to ECP #1 and ECP #3 and §9.10.1-9.10.18 (CUR to CVE), PDF pp. 15-19.
[^ccs-lgf]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.10 (ECP #3 formula) and §9.10.19 New ASCII Table LGF, PDF pp. 16 and 19.
[^ccs-subs]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.11 Changes due to ECP #9 - #12, fields CCF_SUBSCHEDID and CSF_SUBSCHEDID, PDF p. 19.
[^ccs-sum]: [CCS External ICD issue 1.8](../library/rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd.md), §9.12 Relationships (Figures 9.12-1 and 9.12-2) and §9.13 Affected table summary (Table 9.13-1), PDF pp. 21-23.
[^irs-cr]: [EGSE Interface Requirement Specification, H-P-1-ASPI-IS-0121 issue 4.1](../library/rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md), change records (issue 01 of 7 November 2001 to 4.1 of 14 December 2004), PDF pp. 3-4.
[^irs-docs]: [EGSE IRS issue 4.1](../library/rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md), §2.3 Applicable documents (AD2 H-P System Database Specification, AD3 CCS External ICD, AD6 Naming convention), PDF p. 12.
[^irs-db]: [EGSE IRS issue 4.1](../library/rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md), §4.12.2 Database, IFRQT-0810 and IFRQT-0820, Tables 16 (RC definition) and 17 (RM packet definition), PDF pp. 79-81.
[^irs-names]: [EGSE IRS issue 4.1](../library/rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md), §4.12.10 Naming Convention Rules for EGSE items, IFRQT-0888-1 to IFRQT-0888-4, PDF p. 84.
[^irs-names2]: [EGSE IRS issue 4.1](../library/rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md), IFRQT-0888-5 to IFRQT-0888-15, Tables 18 to 21 (RC mnemonics, RC parameters, RM packets, RM parameters), PDF pp. 85-88.
[^um-cover]: [HPSDB Software User Manual, H-P-1-GMV-MA-20487 version 2.6 (GMV)](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), cover and document status sheet, PDF pp. 1-4.
[^um-docs]: [HPSDB Software User Manual 2.6](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), §1.5 Related documents (AD.4 Naming Convention H-P-1-ASPI-SP-0141, AD.5 SCOS-2000 Database import ICD, RD.1 CCS & SCOS 2000 to HPSDB & MOIS ICD), PDF pp. 11-12.
[^um-roles]: [HPSDB Software User Manual 2.6](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), §3.4.3.1 Create user (roles and category flag codes Operations, OB, AIT, All), PDF pp. 59-60.
[^um-bridge]: [HPSDB Software User Manual 2.6](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), §3.4.5.1.1 Functional description and §3.4.5.1.4 Cautions and warnings of bridge file loading, PDF pp. 69 and 75.
[^um-cfg]: [HPSDB Software User Manual 2.6](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), §3.4.5.1.2 Configuration files description, PDF pp. 69-73.
[^um-ex]: [HPSDB Software User Manual 2.6](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), §3.4.5.1.3 Example, PDF pp. 73-75.
[^um-gen]: [HPSDB Software User Manual 2.6](../library/h-p-1-gmv-ma-20487-2-6-hpsdb-user-manual.md), §3.4.5.2 Generate bridge files (file type SCOS or CCS, user category), PDF pp. 76-78.
[^rn-cover]: [Herschel/Planck HPSDB Release Note, H-P-2-ASP-LI-1441 issue 9.0](../library/h-p-2-asp-li-1441-09-herschel-hpsdb-release-note.md), cover page (7 April 2008; CCS files, AIT filter), PDF p. 1.
[^rn-intro]: [HPSDB Release Note issue 9.0](../library/h-p-2-asp-li-1441-09-herschel-hpsdb-release-note.md), §1 Introduction (to ASED, file type CCS, filter AIT User, reason Herschel IRR), PDF p. 8.
[^rn-route]: [HPSDB Release Note issue 9.0](../library/h-p-2-asp-li-1441-09-herschel-hpsdb-release-note.md), §5.2.11-5.2.12 TM packet routing tmd.dat and TC packet routing tcd.dat, PDF p. 10.
[^rn-sub]: [HPSDB Release Note issue 9.0](../library/h-p-2-asp-li-1441-09-herschel-hpsdb-release-note.md), Figures 2 to 11 (theoretical subsystems and element positions, including H004 HIFI and Y104 EGSE), PDF pp. 12-16.
[^hmib-cover]: [HIFI User Manual Annex, MIB 139 (ASPI 11.7) overview, SRON-U/HIF/UM/2004-001 (Annex)](../library/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.md), cover page (11 July 2008) and §1, PDF pp. 1 and 4.
[^hmib-cmdpar]: [HIFI MIB annex](../library/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.md), §1.1.1 FCU Command parameters, PDF p. 4.
[^hmib-icu]: [HIFI MIB annex](../library/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.md), §1.4.1 ICU Monitor parameters, PDF p. 52.
[^hmib-cal]: [HIFI MIB annex](../library/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.md), §1.2.1 PAF, §1.2.2 CCA (curve 134), §1.5.1 TXF (curve 249) and §1.5.2 CAF (curve 293), PDF pp. 31, 41, 268 and 282.
[^hmib-cmd]: [HIFI MIB annex](../library/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.md), §1.7.15 HIFI_Set_OBS_ID, PDF p. 358.
[^hmib-hk]: [HIFI MIB annex](../library/hifi-user-manual-annex-3-mib-139-aspi-11-7-overview.md), §1.8.1 HIFI_HK_rev_7 (including HM001193 and HM000194), PDF p. 456.
[^sesp-rules]: [Thales Alenia Space, "System Reference Data Base - From H/P to EGS-CC", SESP 2015](../library/02-sesp-2015-from-hpsdb-to-egs-cc-presentation.md), slide "Rules" (item core identifier letters), PDF p. 3.
[^mib-ptc]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `pcf` and `cpc` (PTC/PFC pairs compared with the PS-ICD Appendix 6 set); queries by this wiki (SQL above).
[^mib-cur]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `pcf`, `cur`, `ocp`, `grp`, `ccf`, `pid` and `dst`; queries by this wiki (SQL above).
[^icd-cryo]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Annex 1, Cryosat repatriation items for ICD version 6.0 (sub-schedule ID of execution time-tagged commands, one field added to CCF and CSF), PDF p. 249, and change history S2K-SPR-4911 (CAF_INTER documented), PDF p. 259.
