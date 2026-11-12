---
title: MIB table reference
description: Every table of the SCOS-2000 MIB, field by field, from the Database Import ICD issue 7.0, with Solar Orbiter statistics.
sources: [icd-7-0-final, mib-20250916m25925pfms001-sol]
---

# MIB table reference

One page per table of the SCOS-2000 Mission Information Base. Each page lists every field in ICD order, with its type, whether it is mandatory, its meaning and allowed values, foreign keys, history across ICD issues, and how it is filled in the real Solar Orbiter MIB. Field definitions come from the [SCOS-2000 Database Import ICD issue 7.0](../../library/icd-7-0-final.md), cross-checked against the open-source pyscos2000 schema (based on issue 7.2) and the data. For concepts, start with [The MIB](../index.md) and the [data model](../data-model.md).

## General

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`vdf.dat`](vdf.md) | Database version | 3.3.1.1 | 5 | 1 |

## Monitoring

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`caf.dat`](caf.md) | Numerical calibrations | 3.3.2.2.2 | 8 | 679 |
| [`cap.dat`](cap.md) | Numerical calibrations definition | 3.3.2.2.3 | 3 | 7,830 |
| [`cur.dat`](cur.md) | Calibration conditional selection | 3.3.2.2.1 | 5 | 1,974 |
| [`grp.dat`](grp.md) | Monitoring groups definition | 3.3.2.6.1 | 3 | 2 |
| [`grpa.dat`](grpa.md) | Parameters groups | 3.3.2.6.2 | 2 | 0 |
| [`grpk.dat`](grpk.md) | Telemetry packets groups | 3.3.2.6.3 | 2 | 4 |
| [`lgf.dat`](lgf.md) | Logarithmic calibrations definitions | 3.3.2.2.7 | 7 | 0 |
| [`mcf.dat`](mcf.md) | Polynomial calibrations definitions | 3.3.2.2.6 | 7 | 229 |
| [`ocf.dat`](ocf.md) | Monitoring checks | 3.3.2.3.1 | 5 | 5,338 |
| [`ocp.dat`](ocp.md) | Monitoring checks definition | 3.3.2.3.2 | 7 | 7,369 |
| [`pcf.dat`](pcf.md) | Monitoring parameters characteristics | 3.3.2.1.1 | 23 | 126,745 |
| [`pic.dat`](pic.md) | Packets identification criteria | 3.3.2.4.2 | 7 | 256 |
| [`pid.dat`](pid.md) | Packets identification | 3.3.2.4.1 | 16 | 11,150 |
| [`plf.dat`](plf.md) | Parameters location in fixed packets | 3.3.2.5.1 | 8 | 400,792 |
| [`tpcf.dat`](tpcf.md) | Telemetry packets characteristics | 3.3.2.4.3 | 3 | 11,150 |
| [`txf.dat`](txf.md) | Textual calibrations | 3.3.2.2.4 | 4 | 1,003 |
| [`txp.dat`](txp.md) | Textual calibrations definition | 3.3.2.2.5 | 4 | 35,032 |
| [`vpd.dat`](vpd.md) | Variable packet definition | 3.3.2.5.2 | 14 | 19,863 |

## Displays

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`dpc.dat`](dpc.md) | Alphanumeric displays definition | 3.3.2.7.2 | 7 | 626 |
| [`dpf.dat`](dpf.md) | Alphanumeric displays | 3.3.2.7.1 | 3 | 33 |
| [`gpc.dat`](gpc.md) | Graphic displays definition | 3.3.2.7.4 | 11 | 0 |
| [`gpf.dat`](gpf.md) | Graphic displays | 3.3.2.7.3 | 14 | 0 |
| [`ppc.dat`](ppc.md) | Printout proforma definition | 3.3.2.7.8 | 4 | 0 |
| [`ppf.dat`](ppf.md) | Printout proforma | 3.3.2.7.7 | 3 | 0 |
| [`spc.dat`](spc.md) | Scrolling displays definition | 3.3.2.7.6 | 8 | 5 |
| [`spf.dat`](spf.md) | Scrolling displays | 3.3.2.7.5 | 4 | 1 |

## Commanding

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`cca.dat`](cca.md) | Numerical (de-)calibration curves | 3.3.3.6.1 | 7 | 99 |
| [`ccf.dat`](ccf.md) | Command characteristics | 3.3.3.2.1 | 21 | 5,454 |
| [`ccs.dat`](ccs.md) | Numerical (de-)calibration curves definition | 3.3.3.6.2 | 3 | 1,226 |
| [`cdf.dat`](cdf.md) | Commands definition | 3.3.3.2.3 | 10 | 47,609 |
| [`cpc.dat`](cpc.md) | Command parameters | 3.3.3.2.2 | 16 | 7,155 |
| [`dst.dat`](dst.md) | Command routing | 3.3.3.2.1.1 | 2 | 1 |
| [`paf.dat`](paf.md) | Textual (de-)calibrations | 3.3.3.6.3 | 4 | 624 |
| [`pas.dat`](pas.md) | Textual (de-)calibrations definitions | 3.3.3.6.4 | 3 | 11,834 |
| [`pcdf.dat`](pcdf.md) | Packet headers definition | 3.3.3.1.3 | 8 | 20 |
| [`pcpc.dat`](pcpc.md) | Packet headers parameters | 3.3.3.1.2 | 3 | 7 |
| [`prf.dat`](prf.md) | Parameter range sets | 3.3.3.7.1 | 7 | 565 |
| [`prv.dat`](prv.md) | Parameter range values | 3.3.3.7.2 | 3 | 1,072 |
| [`ptv.dat`](ptv.md) | Commands pre-transmission validation | 3.3.3.2.4 | 4 | 5 |
| [`tcp.dat`](tcp.md) | Packet headers characteristics | 3.3.3.1.1 | 2 | 4 |

## Command verification

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`cve.dat`](cve.md) | Verification expressions | 3.3.3.4.2 | 6 | 171 |
| [`cvp.dat`](cvp.md) | Verification profiles | 3.3.3.4.3 | 3 | 10,697 |
| [`cvs.dat`](cvs.md) | Verification stages file | 3.3.3.4.1 | 7 | 206 |

## Command sequences

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`csf.dat`](csf.md) | Command sequence characteristics | 3.3.3.3.1 | 16 | 3,404 |
| [`csp.dat`](csp.md) | Command sequence formal parameters | 3.3.3.3.4 | 16 | 10,981 |
| [`css.dat`](css.md) | Command sequences definition | 3.3.3.3.2 | 18 | 13,879 |
| [`sdf.dat`](sdf.md) | Command sequence element parameters | 3.3.3.3.3 | 10 | 50,014 |

## Parameter sets

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`cps.dat`](cps.md) | Parameter sets definition | 3.3.3.5.3 | 3 | 0 |
| [`psm.dat`](psm.md) | Parameter sets mapping to commands/sequences | 3.3.3.5.5 | 3 | 0 |
| [`pst.dat`](pst.md) | Parameter sets | 3.3.3.5.1 | 2 | 0 |
| [`psv.dat`](psv.md) | Parameter value sets | 3.3.3.5.2 | 3 | 0 |
| [`pvs.dat`](pvs.md) | Parameter value sets definition | 3.3.3.5.4 | 6 | 0 |

## Solar Orbiter mission-specific tables (not in the ICD)

| Table | Name | ICD § | Fields | Solar Orbiter rows |
|---|---|---|---|---|
| [`asw_sw_para.dat`](asw_sw_para.md) | Flight-software names of MIB items (inferred title) | — | 3 | 105,222 |
| [`dup.dat`](dup.md) | Packet duplication to secondary APIDs (inferred title) | — | 2 | 69 |
| [`pcf_glob_det.dat`](pcf_glob_det.md) | Global-to-detailed parameter decomposition (inferred title) | — | 3 | 56,631 |
| [`s13a.dat`](s13a.md) | File attribute codes for on-board file uploads (inferred title) | — | 6 | 7 |
| [`s13p.dat`](s13p.md) | On-board file partitions for uploads (inferred title) | — | 6 | 11 |
| [`s13t.dat`](s13t.md) | Ground file types for on-board file uploads (inferred title) | — | 7 | 12 |
| [`ssy.dat`](ssy.md) | ssy (empty in the SWA database; purpose unknown) | — | 1 | 0 |
| [`sw_para.dat`](sw_para.md) | Software names of SWA database items (inferred title) | — | 3 | 2,841 |

## Parameter types (PTC/PFC) accepted by SCOS-2000

From the ICD's parameter type tables. See [MIB parameter types](../parameter-types.md) for the explanation.

| PTC | PFC | SCOS-2000 type | Size | PUS name | ICD PDF p. |
|---|---|---|---|---|---|
| 1 | 0 | Unsigned integer (Boolean) | 1 bit | Boolean | 214 |
| 2 | 1-32 | Unsigned integer (enumerated) | PFC bits (1 to 32) | Enumerated | 214 |
| 3 | 0 | Unsigned integer | 4 bits | Unsigned integer parameter | 214 |
| 3 | 1 | Unsigned integer | 5 bits | Unsigned integer parameter | 214 |
| 3 | 2 | Unsigned integer | 6 bits | Unsigned integer parameter | 214 |
| 3 | 3 | Unsigned integer | 7 bits | Unsigned integer parameter | 214 |
| 3 | 4 | Unsigned integer | 8 bits | Unsigned integer parameter | 214 |
| 3 | 5 | Unsigned integer | 9 bits | Unsigned integer parameter | 214 |
| 3 | 6 | Unsigned integer | 10 bits | Unsigned integer parameter | 214 |
| 3 | 7 | Unsigned integer | 11 bits | Unsigned integer parameter | 214 |
| 3 | 8 | Unsigned integer | 12 bits | Unsigned integer parameter | 214 |
| 3 | 9 | Unsigned integer | 13 bits | Unsigned integer parameter | 214 |
| 3 | 10 | Unsigned integer | 14 bits | Unsigned integer parameter | 214 |
| 3 | 11 | Unsigned integer | 15 bits | Unsigned integer parameter | 215 |
| 3 | 12 | Unsigned integer | 16 bits | Unsigned integer parameter | 215 |
| 3 | 13 | Unsigned integer | 24 bits | Unsigned integer parameter | 215 |
| 3 | 14 | Unsigned integer | 32 bits | Unsigned integer parameter | 215 |
| 3 | 15 | Unsigned integer | 48 bits | Unsigned integer parameter | 215 |
| 3 | 16 | Unsigned integer | 64 bits | Unsigned integer parameter | 215 |
| 4 | 0 | Signed integer | 4 bits | Signed integer parameter | 215 |
| 4 | 1 | Signed integer | 5 bits | Signed integer parameter | 215 |
| 4 | 2 | Signed integer | 6 bits | Signed integer parameter | 215 |
| 4 | 3 | Signed integer | 7 bits | Signed integer parameter | 215 |
| 4 | 4 | Signed integer | 8 bits | Signed integer parameter | 215 |
| 4 | 5 | Signed integer | 9 bits | Signed integer parameter | 215 |
| 4 | 6 | Signed integer | 10 bits | Signed integer parameter | 215 |
| 4 | 7 | Signed integer | 11 bits | Signed integer parameter | 215 |
| 4 | 8 | Signed integer | 12 bits | Signed integer parameter | 215 |
| 4 | 9 | Signed integer | 13 bits | Signed integer parameter | 215 |
| 4 | 10 | Signed integer | 14 bits | Signed integer parameter | 215 |
| 4 | 11 | Signed integer | 15 bits | Signed integer parameter | 215 |
| 4 | 12 | Signed integer | 16 bits | Signed integer parameter | 215 |
| 4 | 13 | Signed integer | 24 bits | Signed integer parameter | 216 |
| 4 | 14 | Signed integer | 32 bits | Signed integer parameter | 216 |
| 4 | 15 | Signed integer | 48 bits | Signed integer parameter | 216 |
| 4 | 16 | Signed integer | 64 bits | Signed integer parameter | 216 |
| 5 | 1 | Simple precision real (IEEE) | 32 bits | Real | 216 |
| 5 | 2 | Double precision real (IEEE) | 64 bits | Real | 216 |
| 5 | 3 | Simple precision real (MIL-STD-1750A) | 32 bits | Real | 216 |
| 5 | 4 | Extended precision real (MIL-STD-1750A) | 48 bits | Real | 216 |
| 6 | 0 | Bit string (variable length) | variable | Bit-string | 216 |
| 6 | 1-32 | Unsigned integer (PUS bit string) | PFC bits (1 to 32) | Bit-string | 217 |
| 7 | 0 | Octet string (variable length) | variable | Octet-string | 217 |
| 7 | &gt;0 | Octet string (fixed length) | 8 x PFC bits (PFC octets) | Octet-string | 218 |
| 8 | 0 | ASCII character string (variable length) | variable | Character-string | 218 |
| 8 | &gt;0 | ASCII character string (fixed length) | 8 x PFC bits (PFC octets) | Character-string | 219 |
| 9 | 0 | Absolute time (CUC or CDS) with P-field | variable | Absolute time | 219 |
| 9 | 1 | Absolute time CDS without microseconds | 6 octets, no P-field | Absolute time | 219 |
| 9 | 2 | Absolute time CDS with microseconds | 8 octets, no P-field | Absolute time | 219 |
| 9 | 3 | Absolute time CUC | 1 octet (1 coarse + 0 fine) | Absolute time | 219 |
| 9 | 4 | Absolute time CUC | 2 octets (1 coarse + 1 fine) | Absolute time | 220 |
| 9 | 5 | Absolute time CUC | 3 octets (1 coarse + 2 fine) | Absolute time | 220 |
| 9 | 6 | Absolute time CUC | 4 octets (1 coarse + 3 fine) | Absolute time | 220 |
| 9 | 7 | Absolute time CUC | 2 octets (2 coarse + 0 fine) | Absolute time | 220 |
| 9 | 8 | Absolute time CUC | 3 octets (2 coarse + 1 fine) | Absolute time | 220 |
| 9 | 9 | Absolute time CUC | 4 octets (2 coarse + 2 fine) | Absolute time | 220 |
| 9 | 10 | Absolute time CUC | 5 octets (2 coarse + 3 fine) | Absolute time | 220 |
| 9 | 11 | Absolute time CUC | 3 octets (3 coarse + 0 fine) | Absolute time | 220 |
| 9 | 12 | Absolute time CUC | 4 octets (3 coarse + 1 fine) | Absolute time | 220 |
| 9 | 13 | Absolute time CUC | 5 octets (3 coarse + 2 fine) | Absolute time | 221 |
| 9 | 14 | Absolute time CUC | 6 octets (3 coarse + 3 fine) | Absolute time | 221 |
| 9 | 15 | Absolute time CUC | 4 octets (4 coarse + 0 fine) | Absolute time | 221 |
| 9 | 16 | Absolute time CUC | 5 octets (4 coarse + 1 fine) | Absolute time | 221 |
| 9 | 17 | Absolute time CUC | 6 octets (4 coarse + 2 fine) | Absolute time | 221 |
| 9 | 18 | Absolute time CUC | 7 octets (4 coarse + 3 fine) | Absolute time | 221 |
| 9 | 30 | Absolute time, Unix format | 8 octets | Absolute time | 221 |
| 10 | 3 | Relative time CUC | 1 octet (1 coarse + 0 fine) | Relative time | 221 |
| 10 | 4 | Relative time CUC | 2 octets (1 coarse + 1 fine) | Relative time | 222 |
| 10 | 5 | Relative time CUC | 3 octets (1 coarse + 2 fine) | Relative time | 222 |
| 10 | 6 | Relative time CUC | 4 octets (1 coarse + 3 fine) | Relative time | 222 |
| 10 | 7 | Relative time CUC | 2 octets (2 coarse + 0 fine) | Relative time | 222 |
| 10 | 8 | Relative time CUC | 3 octets (2 coarse + 1 fine) | Relative time | 222 |
| 10 | 9 | Relative time CUC | 4 octets (2 coarse + 2 fine) | Relative time | 222 |
| 10 | 10 | Relative time CUC | 5 octets (2 coarse + 3 fine) | Relative time | 222 |
| 10 | 11 | Relative time CUC | 3 octets (3 coarse + 0 fine) | Relative time | 222 |
| 10 | 12 | Relative time CUC | 4 octets (3 coarse + 1 fine) | Relative time | 222 |
| 10 | 13 | Relative time CUC | 5 octets (3 coarse + 2 fine) | Relative time | 223 |
| 10 | 14 | Relative time CUC | 6 octets (3 coarse + 3 fine) | Relative time | 223 |
| 10 | 15 | Relative time CUC | 4 octets (4 coarse + 0 fine) | Relative time | 223 |
| 10 | 16 | Relative time CUC | 5 octets (4 coarse + 1 fine) | Relative time | 223 |
| 10 | 17 | Relative time CUC | 6 octets (4 coarse + 2 fine) | Relative time | 223 |
| 10 | 18 | Relative time CUC | 7 octets (4 coarse + 3 fine) | Relative time | 223 |
| 11 | 0 | Deduced | taken from the deduced type | Deduced | 223 |
| 11 | &gt;0 | Deduced, fixed width | PFC bits | Deduced | 223 |
| 13 | 0 | Saved synthetic parameter | n/a (13-byte slot in the synthetic packet) | none (SCOS-2000 specific) | 224 |

