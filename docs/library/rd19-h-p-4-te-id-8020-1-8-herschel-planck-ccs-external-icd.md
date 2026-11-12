---
title: "Herschel/Planck CCS External ICD (Terma, issue 1.8)"
description: "Issue 1.8 (18 January 2006) of the external interface control document of the Herschel/Planck Central Checkout System (CCS), the SCOS-2000-based EGSE that Terma B.V."
tags: ["Interface Control Document", "Tools, MIB editors and related standards"]
sources: [rd19-h-p-4-te-id-8020-1-8-herschel-planck-ccs-external-icd]
---

# Herschel Planck Central Checkout System External Interface Control Document

<dl class="osi-meta"><dt>Document ID</dt><dd>H-P-4-TE-ID-8020</dd><dt>Issue / version</dt><dd>Issue 1, Revision 8 (Issue 1.8)</dd><dt>Date</dt><dd>2006-01-18</dd><dt>Organisation</dt><dd>Terma B.V., Space Division</dd><dt>Authors</dt><dd>L. R. Hansen</dd><dt>Type</dt><dd>Interface Control Document</dd><dt>Status</dt><dd>Issue 1.8 dated 18-01-2006, distribution 'All' (PDF p. 1); document status sheet shows all pages at issue 1.8 (PDF p. 3). Technical review N. B. Mecredy, standards review K. Pedersen, authorised by A. Armitage, approved by C. Jørgensen (PDF p. 1). The change record (PDF p. 2) runs from Draft A (22-April-2002) through issue 1.0 for the PDR (17-May-2002) and updates after PDR and CDR RIDs to 1.8 (new sub-schedule ID fields in CCF and CSF; bug fixes #2393 and #2395). Later issues, if any, are not known from the available sources; the HPSDB release note H-P-2-ASP-LI-1441 cites this issue (01/08) as its AD1.</dd><dt>Pages</dt><dd>23</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/003055_DOC_ESA_IIDA_Applicable_Reference_Documents/IIDA_Applicable_Ref_Docs/RD19%20-%20H-P-4-TE-ID-8020_1_8%20-%20Herschel%20Planck%20CCS%20External%20ICD.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/003055_DOC_ESA_IIDA_Applicable_Reference_Documents/IIDA_Applicable_Ref_Docs/RD19%20-%20H-P-4-TE-ID-8020_1_8%20-%20Herschel%20Planck%20CCS%20External%20ICD.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-12T17:48:43Z</dd><dt>SHA-256</dt><dd><code>c657bfb93924afe1473656e43ddf9050d1f8675aebc71fb8fd129de9f935219c</code></dd><dt>Size</dt><dd>119.2 KB</dd><dt>Our copy</dt><dd><a href="../third-party/tooling/RD19---H-P-4-TE-ID-8020_1_8---Herschel-Planck-CCS-External-ICD.pdf">RD19---H-P-4-TE-ID-8020_1_8---Herschel-Planck-CCS-External-ICD.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

Issue 1.8 (18 January 2006) of the external interface control document of the Herschel/Planck Central Checkout System (CCS), the SCOS-2000-based EGSE that Terma B.V. built for satellite-level testing. The document is short because it delegates most of its content: the CCS interfaces to the SCOE/DFE LAN, the instrument station LAN and the World Wide Web station are defined in the EGSE Interface Requirement Specification H-P-1-ASPI-IS-0121 (the PIPE protocol), and the database interface follows the SCOS-2000 Database Import ICD issue 5.1. What this ICD adds is the format of the HPSDB 'update files' that the CCS writes (tab-separated records of validated telecommands and parameters with the test sequence name and issue and the host), and, above all, the Herschel/Planck exceptions and additions to the MIB ICD for the 'bridge files' exported by the Herschel/Planck System Database (HPSDB).

Those changes make it a valuable record of MIB tailoring for an EGSE. They cover danger actions that start a test sequence named danger_&lt;parname&gt;; a 'D' delta out-of-limit check type in OCP; a new CUR table for calibration selection driven by an integer applicability parameter; parameter and packet groups (GRP, GRPA, GRPK); reserved 'YZ' names for EGSE system parameters and reserved SPIDs 100 to 999; equipment and routing tables (SCO, TCD, TMD) that send TC APIDs and TM SPIDs to particular SCOEs or EGSEs; the move of the extrapolation flag from PCF_INTER to a new CAF_INTER; character identifiers for calibration curves and range sets and 10-digit CVS IDs (ECP #1); a logarithmic calibration table LGF (ECP #3); and default sub-schedule ID fields in CCF and CSF (ECP #9-#12). Relationship diagrams and a table of all affected .dat files close the document.


## Key points

- Scope: the interface is fully defined in [AD-002] (SCOS-2000 Database Import ICD, S2K-MCS-ICD-0001-TOS-GCI issue 5.1), with the explicit exceptions and additions described in this document. *(PDF p. 7)*
- External interfaces of the CCS: SCOE/DFE LAN, Instrument Station LAN and WWW station (all defined in [AD-001]), and the Herschel-Planck database files (HPSDB update files and bridge files). *(PDF p. 8)*
- The CCS implements the PIPE protocol (defined in [AD-001]) towards the SCOEs and the TM/TC DFE, including DFE TM-Dump telemetry, and towards the instrument EGSEs. *(PDF p. 8)*
- HPSDB update files are tab-separated ASCII lines &lt;datetime&gt; &lt;type&gt; &lt;name&gt; &lt;tseq name&gt; &lt;tseq issue&gt; &lt;host&gt;, with datetime in the SCOS standard format YYYY.DDD.HH.MM.SS.mmm and type c (telecommand) or p (parameter); the MIB database issue is given by vdf.dat. *(PDF p. 9)*
- A danger action always starts a test sequence; the sequence started when a parameter exceeds its danger limits is named 'danger_&lt;parname&gt;' (case sensitive), e.g. danger_PAR_A. *(PDF p. 9)*
- OCP_TYPE gains the value 'D' (Delta OOL), with the delta value stored in OCP_LVALU, alongside 'S' soft, 'H' hard, 'C' status consistency and 'E' event generation only. *(PDF p. 10)*
- PCF_INTER is ignored in the HPCCS implementation of SCOS-2000; the extrapolation flag ('P' extrapolate, 'F' invalid, default 'F') is carried instead by the new field CAF_INTER (issue 1.4 change). *(PDF p. 11)*
- New table CUR (CUR_PNAME, CUR_POS, CUR_RLCHK, CUR_VALPAR, CUR_SELECT) selects a calibration when the raw value of an integer applicability parameter equals CUR_VALPAR; expressions are evaluated in CUR_POS order and only the first true one is activated; PCF_CURTX must then be null. *(PDF p. 12)*
- Grouping tables: GRP (GRP_NAME, GRP_DESCR, GRP_GTYPE 'PA' parameter group or 'PK' packet group), GRPA (group name, PCF parameter name) and GRPK (group name, PID SPID). *(PDF p. 13)*
- Parameter names whose first two characters are 'YZ' are reserved: 'Y' identifies the EGSE subsystem and 'Z' identifies system parameters; names may not start with VAR, GVAR or $ because of the OL syntax. *(PDF p. 14)*
- PID_SPID allowed values are 0 to 99 and 1000 to 4294967295; values 100 through 999 are reserved for internal EGSE usage. *(PDF p. 14)*
- New table SCO defines each equipment (SCO_NAME, SCO_HOST, SCO_PORT); TCD routes TC packets by APID and TMD routes TM packets by SPID to equipment named in SCO. *(PDF p. 14)*
- ECP #1 changes calibration curve IDs from NUM(4) to CHAR(10), range set IDs from NUM(4) to CHAR(10) and CVS IDs from NUM(5) to NUM(10); ECP #3 adds a logarithmic calibration curve. *(PDF p. 15)*
- Logarithmic calibration table LGF (LGF_IDENT, LGF_DESCR, LGF_POL1..LGF_POL5) computes Y(X) = 1 / (POL1 + POL2 ln X + POL3 (ln X)^2 + POL4 (ln X)^3 + POL5 (ln X)^4). *(PDF p. 19)*
- CVS_ID becomes Number(10) in the range 0 to 2147483647, and CVP_CVSID/CVE_CVSID are widened accordingly. *(PDF p. 19)*
- ECP #9-#12 add CCF_SUBSCHEDID and CSF_SUBSCHEDID (Number(5)): the default on-board sub-schedule for execution-time-tagged loading, range 1 to 65535 but restricted for Herschel Planck by the PSICD. *(PDF p. 19)*
- Table 9.13-1 lists the affected MIB files: CAF, CAP, CCA, CCS, CPC, CSP, CVE, CVP, CVS, OCP, PAF, PAS, PCF, PID, PRF, PRV modified; CUR, GRP, GRPA, GRPK, LGF, SCO, TCD, TMD new; all other [AD-002] tables unchanged. *(PDF p. 22)*


## Cited by these wiki pages (6)

- [Herschel and Planck](../missions/herschel-planck.md)
- [Herschel/Planck interface documents: packets, ground links and the CCS](../scos2000/herschel-planck-interfaces.md)
- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (61 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Document Change Record | 2 |
    |  | Document Status Sheet | 3 |
    |  | Table of Contents, List of Tables, List of Figures | 4 |
    | 1 | Introduction | 7 |
    | 1.1 | Purpose | 7 |
    | 1.2 | Scope | 7 |
    | 2 | References | 7 |
    | 2.1 | Applicable Documents | 7 |
    | 2.2 | Reference Documents | 7 |
    | 3 | Abbreviations, Terms and Definitions | 7 |
    | 4 | Interface Overview | 8 |
    | 5 | Interface Herschel-Plank CCS - SCOE's | 8 |
    | 6 | Interface Herschel-Plank CCS - Instrument EGSE's | 9 |
    | 7 | Interface Herschel-Plank CCS - World Wide Web | 9 |
    | 8 | Interface Herschel Plank Update files - Herschel-Plank CCS | 9 |
    | 9 | Interface Herschel Plank Bridge-Files - Herschel-Plank CCS | 9 |
    | 9.1 | Changes due to Danger Actions | 9 |
    | 9.2 | Changes due to Delta Limits | 10 |
    | 9.2.1 | Changes to ASCII Table OCP | 10 |
    | 9.3 | Changes due to Calibration Selection | 10 |
    | 9.3.1 | Changes to ASCII Table PCF | 11 |
    | 9.3.2 | New ASCII Table CUR | 12 |
    | 9.4 | Changes due to Grouping of Parameters and Packets | 12 |
    | 9.4.1 | New ASCII Table GRP | 13 |
    | 9.4.2 | New ASCII Table GRPA | 13 |
    | 9.4.3 | New ASCII Table GRPK | 13 |
    | 9.5 | Changes due to System Parameters | 13 |
    | 9.5.1 | Changes to ASCII Table PCF | 14 |
    | 9.5.2 | Changes to ASCII Table PID | 14 |
    | 9.6 | Changes due to EGSE's and SCOE's | 14 |
    | 9.6.1 | New ASCII Table SCO | 14 |
    | 9.7 | Changes due to TC Distribution | 15 |
    | 9.7.1 | New ASCII Table TCD | 15 |
    | 9.8 | Changes due to TM Packet distribution | 15 |
    | 9.8.1 | New ASCII Table TMD | 15 |
    | 9.9 | New Field in Table CAF | 15 |
    | 9.10 | Changes due to ECP #1and ECP #3 | 15 |
    | 9.10.1 | Modified field in ASCII Table CUR | 16 |
    | 9.10.2 | Modified field in ASCII Table CAF | 16 |
    | 9.10.3 | Modified field in ASCII Table CAP | 16 |
    | 9.10.4 | Modified field in ASCII Table TXF | 16 |
    | 9.10.5 | Modified field in ASCII Table TXP | 16 |
    | 9.10.6 | Modified field in ASCII Table MCF | 16 |
    | 9.10.7 | Modified field in ASCII Table PCF | 16 |
    | 9.10.8 | Modified fields in ASCII Table CPC | 17 |
    | 9.10.9 | Modified fields in ASCII Table CSP | 17 |
    | 9.10.10 | Modified fields in ASCII Table CCA | 18 |
    | 9.10.11 | Modified fields in ASCII Table CCS | 18 |
    | 9.10.12 | Modified fields in ASCII Table PAF | 18 |
    | 9.10.13 | Modified fields in ASCII Table PAS | 18 |
    | 9.10.14 | Modified fields in ASCII Table PRF | 18 |
    | 9.10.15 | Modified fields in ASCII Table PRV | 18 |
    | 9.10.16 | Modified fields in ASCII Table CVP | 18 |
    | 9.10.17 | Modified fields in ASCII Table CVS | 19 |
    | 9.10.18 | Modified fields in ASCII Table CVE | 19 |
    | 9.10.19 | New ASCII Table LGF | 19 |
    | 9.11 | Changes due to ECP#9 - #12 | 19 |
    | 9.11.1 | New field in ASCII Table CCF | 19 |
    | 9.11.2 | New field in ASCII Table CSF | 19 |
    | 9.12 | Relationships | 21 |
    | 9.13 | Affected Table summary | 22 |


## Documents this one references (8)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| [AD-001] | [H-P-1-ASPI-IS-0121](../references/index.md#ref-h-p-1-aspi-is-0121) · [library](rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification.md) | Herschel Plank EGSE Interface Requirement Specification |  | applicable |
| [AD-002] | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 Database Import ICD | Issue 5.1 | applicable |
| [AD-003] | [H-P-4-TE-TN-9002](../references/index.md#ref-h-p-4-te-tn-9002) | Herschel-Planck Central Checkout System Packet Analysis Tools |  | applicable |
| [RB] | [H-P-4-TE-RB-0010](../references/index.md#ref-h-p-4-te-rb-0010) | Herschel Plank Central Checkout System, Requirements Baseline |  | applicable |
| [RD-001] | [H-P-4-TE-TN-9001](../references/index.md#ref-h-p-4-te-tn-9001) | Herschel Plank Central Checkout System Glossary, Definitions and Acronyms |  | reference |
|  | [H-P-MI-AI-0156](../references/index.md#ref-h-p-mi-ai-0156) | MoM (action item AI#32, addressed in issue 1.3) |  | mentioned |
|  | [catalogue](../references/index.md#ref-psicd-packet-structure-icd-for-permitted-sub-schedule-ids) | PSICD (Packet Structure ICD), for permitted sub-schedule IDs |  | mentioned |
|  | [catalogue](../references/index.md#ref-pipe-protocol-defined-in-ad-001) | PIPE Protocol (defined in [AD-001]) |  | mentioned |

!!! note "Notes"
    'Planck' is spelled 'Plank' throughout most of the body, as printed (titles above keep the document's spelling). The interface overview figure is numbered 3.2-1 although it sits in section 4 (PDF p. 8). Field names are inconsistent in places: section 9.2.1 mixes OCP_LVALU with OCF_LVALU and OCF_CODIN; Figure 9.12-2 labels the group member fields GRD_PNAME and GRD_PKSPID instead of GRPA_PANAME and GRPK_PKSPID (PDF p. 21); CCF_SUBSCHEDID and CSF_SUBSCHEDID are split across lines in the text layer. Table 9.13-1 does not list the TXF, TXP and MCF identifier changes of 9.10.4-9.10.6 or the CCF/CSF fields of 9.11. Change record entry 1.6 ends with a stray 'removed.l'. PDF p. 20 (printed page 14) is blank; the relationship diagrams (PDF p. 21) survive only as labels. The extraction reports 24 PDF pages (registry: 23); the last is empty. The file name prefix 'RD19' comes from the SPIRE IIDA applicable/reference document pack it was archived in. The document is cited as AD1 (issue 01/08) by the HPSDB release note h-p-2-asp-li-1441-09-herschel-hpsdb-release-note (PDF p. 18), as AD3 by h-p-1-asp-tn-1060-mib-processing-hpsdb (PDF p. 8) and as RD23/AD3 by rd03-h-p-1-aspi-is-0121-4-1-egse-interface-requirement-specification (PDF pp. 11-12). [AD-001] is held in the library as issue 4.1 (rd03-...) and [AD-002] as icd-5-1-tos-gci. The CUR, LGF and GRPA tables added here also appear in the generic Database Import ICD issue 7.0 (icd-7-0-final, PDF pp. 64, 72, 109).

