---
title: "Alcatel fax: SCOS MIB naming limits, part 1 (Jan 2003)"
description: "A fax of 27 January 2003 (three pages, the third carrying only the letterhead) from the Alcatel Space Industries Herschel/Planck project office in Cannes to the HIFI, SPIRE, PACS, HFI and LFI instrume"
tags: ["Letter/Fax", "SCOS-2000, EGSE and Herschel/Planck"]
sources: [alc-scos-fax-2003-01-27]
---

# Herschel / Planck - SCOS - Limitation to naming convention

<dl class="osi-meta"><dt>Document ID</dt><dd>H-P-ASP-LT-2607</dd><dt>Date</dt><dd>2003-01-27</dd><dt>Organisation</dt><dd>Alcatel Space Industries, Herschel Planck project office (OS/M/H), Etablissement de Cannes</dd><dt>Authors</dt><dd>F. Chatte</dd><dt>Type</dt><dd>Letter/Fax</dd><dt>Status</dt><dd>Not stated. Project fax setting requirements 1-5 for the instrument MIBs; announces that REF2 (H-P-1-ASPI-SP-0141) will be updated accordingly (PDF p. 2). Extended by the follow-up fax H-P-ASP-LT-2905 of 27/03/03 (library item alc-scos-2003-03-27).</dd><dt>Pages</dt><dd>3</dd></dl>

## Provenance

<dl class="osi-meta"><dt>Original location</dt><dd><a href="https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000443_COM_ALC_SCOS_27Jan03/Fax_2607.pdf" rel="noopener">https://archives.esac.esa.int/hsa/legacy/ADP/SPIRE/SPIRE_docs/SPIRE_Internal_Documents/000443_COM_ALC_SCOS_27Jan03/Fax_2607.pdf</a></dd><dt>Copied (UTC)</dt><dd>2026-11-05T14:06:34Z</dd><dt>SHA-256</dt><dd><code>d6cd4af278d439ace0fb6295934ac410c0c9976507da5daf32700fc6f001679f</code></dd><dt>Size</dt><dd>439.7 KB</dd><dt>Our copy</dt><dd><a href="../third-party/core/alc-scos-fax-2003-01-27.pdf">alc-scos-fax-2003-01-27.pdf</a> (unchanged third-party file, not MIT; see the <a href="../third-party/NOTICE/">notice</a>)</dd></dl>

## Summary

A fax of 27 January 2003 (three pages, the third carrying only the letterhead) from the Alcatel Space Industries Herschel/Planck project office in Cannes to the HIFI, SPIRE, PACS, HFI and LFI instrument teams, copied to ESTEC and ESOC. Its subject is the limits that the Herschel/Planck naming convention places on identifiers in the SCOS-2000 Mission Information Base (MIB), so that instrument test databases can move to module-level testing without renaming (the 'smooth transition').

It sets five requirements. Calibration-curve and range-set identifiers are limited to Number(3) and command-verification-stage identifiers to Number(4), one digit fewer than the SCOS-2000 Database Import ICD issue 5.1 (REF1) supports, because the naming convention (REF2) defines these identifiers at theoretical element level as 'IDIN03F' and 'IDIN04F'. Dynamic UDC definitions inside the single SCOS 'constant packet', allocated in the `plf` table, are partitioned into ranges of 100 between System, SVM, PLM and each instrument, with 0600-1023 kept spare for allocation by ASP, and the SPID of the constant packet must support 1024 octets. The justification is that the constant packet is unique, so allocations would overlap when databases are integrated, and that all test levels generate the same archive file format; the fax concedes that a lot of disk space is lost at instrument level.

The document shows concretely how a prime contractor constrained the generic MIB for a multi-instrument programme. It is REF3 of the follow-up fax of March 2003 (library item `alc-scos-2003-03-27`).


## Key points

- Requirement 1: limit the 'curve' identifier to Number(3); justification: REF1 supports Number(4) and REF2 defines a curve identifier as 'IDIN03F'. *(PDF p. 1)*
- Requirement 2: limit the 'range set' identifier to Number(3); REF1 supports Number(4), REF2 defines it as 'IDIN03F'. *(PDF p. 1)*
- Requirement 3: limit the 'command verification stage' identifier to Number(4); REF1 supports Number(5), REF2 defines it as 'IDIN04F'. *(PDF p. 1)*
- Requirement 4: dynamic UDC allocation inside the 'constant packet' in table 'plf': System 0000-0099, SVM 0100-0199 and PLM 0200-0299 for both satellites; HIFI (Herschel) and HFI (Planck) 0300-0399; PACS (Herschel) and LFI (Planck) 0400-0499; 0500-0599 printed as HIFI for Herschel and not used for Planck ('Sorbtion cooler ?'). *(PDF p. 2)*
- Requirement 5: the SPID corresponding to the 'constant packet' shall support 1024 octets; spare range 0600-1023 to be allocated by ASP according to needs. *(PDF p. 2)*
- Justification 4: the dynamic UDC is allocated to a dedicated SCOS packet (part of the reserved SPIDs), the unique 'constant packet', so allocation is needed to prevent overlapping at integration time. *(PDF p. 2)*
- Justification 5: all levels generate the same archiving file format, so system level can access instrument- and module-level archives for the constant packet; drawback: a lot of disk space is lost, mainly at instrument level. *(PDF p. 2)*
- REF1 is the SCOS-2000 Data base import ICD S2K-MCS-ICD-0001-TOS-GCI issue 5.1; REF2 is the naming convention specification H-P-1-ASPI-SP-0141 issue 01/02. *(PDF p. 1)*


## Cited by these wiki pages (5)

- [Herschel/Planck: SCOS-2000 in a science mission ground segment](../scos2000/herschel-planck-ground.md)
- [Methodology](../about/methodology.md)
- [Mission tailoring of the MIB](../mib/tailoring.md)
- [SCOS-2000 as EGSE and central checkout](../scos2000/egse.md)
- [Sources &amp; copies](../about/sources-and-copies.md)


??? abstract "Contents (5 headings)"

    | Section | Title | PDF page |
    |---|---|---|
    |  | Header, distribution list, object and references (REF1-REF2) | 1 |
    |  | Requirements (items 1-5) | 1 |
    |  | Justification | 2 |
    |  | Document impacts | 2 |
    |  | Page 3/3 (letterhead only) | 3 |


## Documents this one references (2)

| Label | Document | Title | Issue / date | Kind |
|---|---|---|---|---|
| REF1 | [S2K-MCS-ICD-0001-TOS-GCI](../references/index.md#ref-s2k-mcs-icd-0001-tos-gci) · [library](icd-5-1-tos-gci.md) | SCOS-2000 - Data base import ICD | Issue 5.1 | reference |
| REF2 | [H-P-1-ASPI-SP-0141](../references/index.md#ref-h-p-1-aspi-sp-0141) | Naming convention specification | Issue 01/02 | reference |

!!! note "Notes"
    Fax with an OCR-quality text layer (artefacts such as 't able', 'Indu stries'). Stamped SPIRE-COM-ALC-000443. Page 3/3 carries only the letterhead and footer. As printed, the 0500-0599 range is assigned to 'HIFI' for Herschel although HIFI already has 0300-0399; SPIRE is not named anywhere in the allocation (presumably SPIRE was meant, an inference). Justification 3 cites 'RF2' for REF2. 'UDC' is not expanded in the fax. REF1 is available in this library as icd-5-1-tos-gci. A telephone extension printed in the closing is omitted here.

