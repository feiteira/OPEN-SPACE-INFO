---
title: "MIB parameter types: PTC/PFC in SCOS-2000"
description: Every Parameter Type Code and Parameter Format Code accepted by the SCOS-2000 MIB, its bit width and encoding, its value syntax, how it differs from PUS-A and PUS-C, and how often each one occurs in the Solar Orbiter MIB.
tags: [MIB, SCOS-2000, PUS, PTC, PFC, Solar Orbiter]
sources: [icd-7-0-final, icd-6-9-archive-org, icd-6-7-drafta, icd-5-1-tos-gci, ecss-e-st-70-41c-15april2016, ecss-e-70-41a-30jan2003-pus, mib-20250916m25925pfms001-sol]
---

# MIB parameter types: PTC/PFC in SCOS-2000

Every value that SCOS-2000 extracts from telemetry or puts into a telecommand has a type,
written as a pair of small integers: the **Parameter Type Code (PTC)** and the **Parameter
Format Code (PFC)**. The PTC names the abstract type, for example unsigned integer, real or
absolute time. The PFC selects the concrete encoding and, through it, the width in bits.
The pair comes from the ESA
[Packet Utilisation Standard](../ecss/pus/index.md). The
[Database Import ICD](../library/icd-7-0-final.md) defines which pairs the SCOS-2000
[MIB](index.md) accepts, how wide each one is, and the text syntax in which values of each
type are written in the ASCII tables.[^i70-appa]

This page covers the full SCOS-2000 type table, the value syntax, the related fields
(width, endianness, time correlation, calibration category) and the differences from PUS-A
(2003) and PUS-C (2016). It ends with the frequency of each PTC/PFC pair in the real
[Solar Orbiter MIB](../missions/solar-orbiter/mib.md). The PUS definitions themselves are
on [PUS parameter types](../ecss/pus/parameter-types.md).

## Where types appear in the MIB

| Field | Table | Type | Role |
|---|---|---|---|
| `PCF_PTC`, `PCF_PFC` | [`pcf`](tables/pcf.md) | Number(2), Number(5) | Type of a monitoring parameter. Mandatory. PTC in the range 1 to 13.[^i70-pcfptc] |
| `CPC_PTC`, `CPC_PFC` | [`cpc`](tables/cpc.md) | Number(2), Number(5) | Type of a command parameter. Mandatory.[^i70-cpcptc] |
| `CSP_PTC`, `CSP_PFC` | [`csp`](tables/csp.md) | Number(2), Number(5) | Type of a sequence formal parameter[^i70-csp] |
| `PCF_WIDTH` | `pcf` | Number(6) | "Padded" width in bits, used only when extracting through `vpd`[^i70-width] |
| `PCF_ENDIAN` | `pcf` | Char(1) | Byte order of whole-byte types: `B` (default) or `L`[^i70-endian] |
| `PCF_CORR`, `PCF_OBTID` | `pcf` | Char(1), Number(5) | Whether time correlation is applied to time values, and which on-board clock[^i70-corr] |
| `CPC_CORR`, `CPC_OBTID`, `CPC_ENDIAN` | `cpc` | as above | The same for command parameters. `CPC_ENDIAN` is a future extension.[^i70-cpccorr][^i70-cpcendian] |
| `PCF_CATEG`, `CPC_CATEG` | `pcf`, `cpc` | Char(1) | Calibration category. It must be consistent with the type.[^i70-categ][^i70-cpccateg] |

For telemetry, the type controls decoding. SCOS-2000 uses `PCF_PTC`/`PCF_PFC` to decode
parameters extracted from packets (`PCF_NATUR` = `R` or `C`). A synthetic parameter must
still carry a valid pair that matches the format of its computed value, otherwise it is
rejected at import. A saved synthetic parameter must have PTC 13.[^i70-pcfptc] For commands,
the type both drives encoding and constrains the raw values that are accepted in the MIB and
on the stack. The importer syntax-checks every command and sequence parameter value against
its type, and replaces bad values with `0`, an empty string or `1970.001.00.00.00`.[^i70-24]

Remember the distinction made in §1.3.1 of the ICD. The **raw value** is the value before
calibration. The **encoded value** is the bit pattern on the link. The two coincide only for
unsigned integers. A 16-bit signed integer with raw value −1 is encoded as `0xFFFF`.[^i70-defs]

## The SCOS-2000 type table

Appendix A of the ICD (Table 4) lists every supported pair, together with the internal type
and the width the importer assumes. It refers to the PUS nomenclature of ESA PSS-07-101
(Packet Utilisation Standard, issue 1, May 1994). Pairs that SCOS-2000 supports beyond that
document are printed in bold, and pairs listed there but unsupported are printed in
italics.[^i70-appa][^i70-rd] The bold and italic marking does not survive in the text
extraction used by this wiki, so the support status below is taken from the comment column
and from Appendix C.

### PTC 1 Boolean and PTC 2 enumerated

| PTC | PFC | SCOS-2000 internal type | Width | Notes |
|---|---|---|---|---|
| 1 | 0 | unsigned integer | 1 bit | Boolean |
| 2 | 1 … 32 | unsigned integer | PFC bits | Enumerated. PUS permits only some PFCs. SCOS-2000 only limits the width to 32 bits.[^i70-appa] |

An enumerated value has discrete, unordered values, each meaning a text. An error code is
the classic example.[^pusa-2352] In the MIB, those texts come from a textual calibration
(`PCF_CATEG` = `S`, see [Calibration](calibration.md)).[^i70-categ] In the Solar Orbiter MIB,
25,081 of the 29,443 enumerated parameters have one.[^solo]

### PTC 3 unsigned and PTC 4 signed integers

| PFC | Width (PTC 3 and 4) | Unsigned range | Signed range | SCOS-2000 |
|---|---|---|---|---|
| 0 … 12 | PFC + 4 bits (4 … 16) | 0 to 2^(PFC+4) − 1 | −2^(PFC+3) to 2^(PFC+3) − 1 | supported |
| 13 | 24 bits | 0 to 16,777,215 | −8,388,608 to 8,388,607 | supported |
| 14 | 32 bits | 0 to 2^32 − 1 | −2^31 to 2^31 − 1 | supported |
| 15 | 48 bits | 0 to 2^48 − 1 | −2^47 to 2^47 − 1 | **not supported** |
| 16 | 64 bits | 0 to 2^64 − 1 | −2^63 to 2^63 − 1 | **not supported** |

The widths are those of ICD Table 4.[^i70-appa] The ranges follow the PUS definitions.[^pusc-734]
Unsigned integers are most-significant-bit first. Signed integers use two's complement, with
bit 0 as the sign.[^pusc-734] Appendix C confirms the 32-bit limit: PFC 15 and 16 are not
supported.[^i70-c1] In practice, PTC 3 PFC 12 is the familiar 16-bit word and PFC 14 the
32-bit one.

### PTC 5 real

| PFC | Format | Width | SCOS-2000 |
|---|---|---|---|
| 1 | IEEE 754 single precision | 32 bits | TM and TC |
| 2 | IEEE 754 double precision | 64 bits | TM and TC |
| 3 | MIL-STD-1750A single precision | 32 bits | TM and TC. ESA missions often call it "PTC=5, PFC=2". |
| 4 | MIL-STD-1750A extended precision | 48 bits | **commands only** (from R3.0), not telemetry |

All four rows come from ICD Table 4.[^i70-appa] The command-only restriction for 5/4 was
clarified in ICD 6.1 (S2K-40-DCR-808), and Appendix C repeats it.[^i70-a1-61][^i70-c1] The
remark about "PTC=5, PFC=2" means that older ESA mission documents, such as the Rosetta
Space/Ground ICD cited by Table 5, number the MIL single-precision format as PFC 2.
SCOS-2000 numbers it PFC 3, so a translation is needed when such documents feed a
MIB.[^i70-appa5]

The bit layouts below follow PUS-A, which reproduces both standards:[^pusa-2355]

<div class="bitfield" data-title="IEEE 754 single precision (PTC 5, PFC 1), 32 bits" data-width="32"
     data-fields='[{"n":"S","b":1,"d":"Sign"},{"n":"Exponent","b":8,"d":"E + 127"},{"n":"Fraction","b":23,"d":"b1 ... b23 of the significand"}]'></div>

<div class="bitfield" data-title="MIL-STD-1750A single precision (PTC 5, PFC 3), 32 bits" data-width="32"
     data-fields='[{"n":"Mantissa (2-complement, sign = bit 0)","b":24},{"n":"Exponent (2-complement)","b":8}]'></div>

<div class="bitfield" data-title="MIL-STD-1750A extended precision (PTC 5, PFC 4), 48 bits" data-width="16"
     data-fields='[{"n":"Mantissa, most significant part","b":24},{"n":"Exponent","b":8},{"n":"Mantissa, least significant part","b":16}]'></div>

The extended layout is derived from the PUS-A examples, which print each value as
"Mantissa (MS) Exp Mantissa (LS)" with 6, 2 and 4 hexadecimal digits.[^pusa-2355b] As an
example taken from PUS-A, 0.5 × 2^1 in MIL single precision is `0x40000001`. The mantissa is
`0x400000` (0.5) and the exponent is `0x01`.[^pusa-2355]

### PTC 6 bit string

| PFC | Meaning | Width | SCOS-2000 |
|---|---|---|---|
| 0 | variable-length bit string | variable | **not supported** |
| 1 … 32 | fixed-length bit string, handled as an unsigned integer | PFC bits | **monitoring only** |

SCOS-2000 treats fixed bit strings as unsigned integers of PFC bits, at most 32, and only on
the monitoring side.[^i70-appa] PUS-C also uses fixed-length PTC 6 for spare fields, whose
bits must all be zero.[^pusc-737]

### PTC 7 octet string and PTC 8 character string

| PTC | PFC | Meaning | Width | SCOS-2000 |
|---|---|---|---|---|
| 7 | 0 | variable-length octet string | variable | **commands and sequences only** |
| 7 | n > 0 | fixed octet string | n octets | TM and TC |
| 8 | 0 | variable-length character string | variable | **commands and sequences only** |
| 8 | n > 0 | fixed character string | n characters (octets) | TM and TC |

Variable-length strings can be given values from a Stack Import file or on a manual stack.
To receive values from stack files, they must be editable elements of the command
(`CDF_ELTYPE` = `E`).[^i70-appa78] In PUS, a variable-length string is preceded by an
unsigned length field *n*. SCOS-2000 command sources work out the length by counting the
octets or characters in the value, and they do not read *n*. Before R4.0, *n* had to be part
of the value or a separate parameter. From R4.0, SCOS-2000 can be configured to insert *n*
automatically.[^i70-appa5][^i70-a1-hp]

<div class="bitfield" data-title="Variable-length octet string (PTC 7, PFC 0) as defined by PUS" data-width="16"
     data-fields='[{"n":"n (length)","b":8,"d":"Unsigned integer; its PFC is declared per application process (8 bits shown for illustration)"},{"n":"octet 1","b":8},{"n":"octet 2 ... octet n","b":16,"d":"n octets in total"}]'></div>

The width of *n* is not fixed by PUS-C. It is declared per application process.[^pusc-738]
Octet and character strings cannot be calibrated.[^i70-appa5] On the telemetry side,
variable-length strings are not decoded natively. Memory dumps and similar data need special
processing.[^i70-c1]

### PTC 9 absolute time

| PFC | Format | Coarse octets | Fine octets | Total | SCOS-2000 |
|---|---|---:|---:|---:|---|
| 0 | CUC or CDS with explicit P-field | – | – | variable | **not supported** |
| 1 | CDS without µs | – | – | 6 | supported from R5.0 |
| 2 | CDS with µs | – | – | 8 | **commands only** |
| 3 … 6 | CUC | 1 | 0 … 3 | 1 … 4 | supported |
| 7 … 10 | CUC | 2 | 0 … 3 | 2 … 5 | supported |
| 11 … 14 | CUC | 3 | 0 … 3 | 3 … 6 | supported |
| 15 … 18 | CUC | 4 | 0 … 3 | 4 … 7 | supported |
| 30 | Unix time: 4 octets seconds since 1970-01-01T00:00:00, then 4 octets of µs within the second | – | – | 8 | SCOS-2000 specific, "not defined in PUS". Added in ICD 6.7. |

All rows come from ICD Table 4.[^i70-appa9][^i70-a1-67] For PFC 3 to 18, the number of
coarse octets is ⌊(PFC + 1) / 4⌋ and the number of fine octets is (PFC + 1) mod 4. That is
exactly the PUS rule.[^pusc-7310] SCOS-2000 cannot recognise a time format from a P-field:
the format must be known implicitly from the MIB.[^i70-c1] Absolute time values are converted
between raw and encoded form by a mission-specific time correlation routine, and they cannot
be calibrated.[^i70-appa5] The CUC and CDS codes themselves are explained on
[Time code formats](../ccsds/time-codes.md).

<div class="bitfield" data-title="CDS with microseconds (PTC 9, PFC 2), 64 bits" data-width="32"
     data-fields='[{"n":"Day","b":16,"d":"Days since the epoch, 0 to 2^16-1"},{"n":"Milliseconds of day","b":32},{"n":"Microseconds of millisecond","b":16}]'></div>

<div class="bitfield" data-title="CUC, 4 octets coarse and 2 octets fine (PTC 9, PFC 17), 48 bits" data-width="16"
     data-fields='[{"n":"Coarse time C1 ... C4","b":32,"d":"Whole seconds since the epoch"},{"n":"Fine time F1 F2","b":16,"d":"Fractions of a second in units of 2^-16 s"}]'></div>

<div class="bitfield" data-title="Unix time (PTC 9, PFC 30), 64 bits, SCOS-2000 specific" data-width="32"
     data-fields='[{"n":"Seconds since 1970-01-01 00:00:00","b":32},{"n":"Microseconds within the second","b":32}]'></div>

The CDS layout follows PUS-C Table 7-10 note 2, and the CUC value is
t = C1·256³ + C2·256² + C3·256 + C4 + F1·256⁻¹ + F2·256⁻² (+ F3·256⁻³).[^pusc-7310] The Unix
layout is the one given in ICD Table 4.[^i70-appa9]

**Worked example (illustrative bytes).** Take a PTC 9 / PFC 17 field with bytes
`0x2A 0x3B 0x4C 0x5D 0x80 0x00`. The coarse time is 0x2A3B4C5D = 708,529,245 s and the fine
time is 0x8000 / 65,536 = 0.5 s, so t = 708,529,245.5 s after the epoch. Which epoch, and
whether on-board time correlation applies, depend on `PCF_CORR` and `PCF_OBTID` (see
[below](#time-correlation-flags)). The bytes are constructed for this explanation. They are
not taken from a real packet.

### PTC 10 relative time

| PFC | Format | Coarse octets | Fine octets | SCOS-2000 |
|---|---|---:|---:|---|
| 3 … 18 | CUC (same numbering as PTC 9) | 1 … 4 | 0 … 3 | supported |

The rows come from ICD Table 4.[^i70-appa10] A relative time is a positive or negative
offset, negative values being two's complement.[^pusc-7311] It cannot be calibrated.
`PCF_CORR` and `CPC_CORR` must be `N` for relative times (clarified in issue 7.0, changes
S2K-8572 and S2K-8778).[^i70-corr][^i70-a2]

!!! danger "Relative-time PFC numbering differs between PUS-A and SCOS-2000"
    PUS-A (ECSS-E-70-41A, 2003) numbers relative CUC times from PFC 1 to 16, with
    ⌊(PFC + 3) / 4⌋ coarse and (PFC + 3) mod 4 fine octets.[^pusa-23510] SCOS-2000, like
    PUS-C, uses PFC 3 to 18 with the absolute-time rule.[^i70-appa10][^pusc-7311] The same
    four-coarse, two-fine relative time is therefore PFC 15 in PUS-A and PFC 17 in
    SCOS-2000. A mission whose packet ICD follows PUS-A must translate relative-time PFCs
    when building its MIB.

    !!! warning "Inference"
        The translation rule is this wiki's arithmetic from the two formulas. The ICD
        refers to PSS-07-101 (1994) rather than to PUS-A, and that document is not in the
        library, so which numbering PSS-07-101 used is not stated in the available sources.

### PTC 11 deduced

| PFC | Meaning | SCOS-2000 |
|---|---|---|
| 0 | Deduced. Type and width come from another, earlier field of the same packet. | TM (through `vpd`) and TC |
| n > 0 | Deduced with a forced width of n bits | **commands only** |

These rows are from ICD Table 4.[^i70-appa11] PUS defines a deduced field as one whose
actual type and encoding are deduced from preceding fields of the same packet, from
mission constants, or both.[^pusa-23511] The typical case in the ICD is a parameter value
whose type follows from a preceding on-board parameter identifier (PUS "Parameter#").[^i70-related]
SCOS-2000 implements this as follows:

* **Telemetry.** A deduced parameter is decoded only in variable packets (`vpd`). Its
  `PCF_RELATED` names the parameter that carries the on-board parameter ID. That ID is
  matched against `PCF_PID` to find the real parameter, whose PTC/PFC is then used.
  `PCF_WIDTH` either forces a fixed slot width or, if empty, lets the slot follow the width
  of the identified parameter, padded by that parameter's own `PCF_WIDTH`.[^i70-related][^i70-width]
* **Commands.** A deduced command parameter (`CPC_PTC` = 11) inherits type, width and
  calibration from the TM parameter named by the first "Parameter ID" command parameter in
  the same (repeated) array. `CPC_PFC` = 0 keeps that width, and a value above 0 forces the
  width in bits. Deduced command parameters were introduced with SCOS-2000 R5 (ICD
  6.4).[^i70-cpcspecial][^i70-cpcptc][^i70-a1-64]

A deduced *data structure*, as opposed to a deduced field, is not supported.[^i70-c2]

**Real example.** In the Solar Orbiter MIB, variable structure TPSD 14406 ("OBCP
telemetry", TM(18,144)) contains a repeated group of two fields. The group counter is
`NCD12091` with `VPD_GRPSIZE` = 2. The first field, `NCD12904`, is the parameter ID: PTC 3,
PFC 14, flagged `VPD_PIDREF` = `Y`. The second, [`NCD12905`](../explorer/index.md#/solo/param/NCD12905)
"OBCHP_S18_Param Value", is deduced: PTC 11, PFC 0, with `PCF_RELATED` = `NCD12904`.[^solo]

### PTC 13 saved synthetic

| PTC | PFC | Meaning |
|---|---|---|
| 13 | 0 | Saved synthetic parameter. Its value characteristics come from the related synthetic parameter (`PCF_RELATED`).[^i70-appa13] |

PTC 13 is specific to SCOS-2000: the PUS-C list of type codes ends at PTC 12.[^pusc-731] Each saved synthetic value
occupies a 13-byte slot in its synthetic packet: 8 bytes of value, 1 byte of value type and
4 bytes of validity flags. The order of these parts within the slot is not stated in the
available sources.[^i70-synth] Solar Orbiter's two saved synthetics, `NTTSS030` and
`NTTSS031`, carry `PCF_WIDTH` = 104 bits (13 bytes) and sit at byte offsets 0 and 13 of
packet 66838.[^solo]

### Special command parameter types

The ICD defines three "special PUS command parameter types". Command ID and Parameter ID are
expressed through `CPC_CATEG` on top of an ordinary PTC. Deduced command parameters use
PTC 11, the same code as deduced telemetry fields:[^i70-cpcspecial][^i70-cpccateg][^i70-c1]

| Kind | How it is declared | What SCOS-2000 encodes | Typical use |
|---|---|---|---|
| Command ID | `CPC_CATEG` = `A`, PTC 7, PFC 0 | The complete raw packet of the named command (`CCF_CNAME`), with configurable header fields | Commands that embed a TC, such as TC(19,1) |
| Parameter ID | `CPC_CATEG` = `P`, PTC 3 (any width) | The on-board ID (`PCF_PID`) of the named TM parameter | Commands that list TM parameter IDs, such as TC(4,6) and TC(12,1) |
| Deduced | `CPC_PTC` = 11 | See [PTC 11](#ptc-11-deduced) | Parameter-value lists |

Command ID and Parameter ID came from Cryosat and were integrated into the ICD with release
4.0 (issue 6.0).[^i70-a1-cryo] Deduced command parameters came later, with R5
(issue 6.4).[^i70-a1-64] Solar Orbiter has 2 Command ID parameters, both PTC 7 / PFC 0
("Complete TC packet" and "TC to send upon event"). It has 152 Parameter ID parameters, all
PTC 3 / PFC 14.[^solo]

## Raw value syntax

Wherever the MIB holds a *value*, for example a default (`CPC_DEFVAL`, `CDF_VALUE`,
`SDF_VALUE`), a limit (`OCP_LVALU`), a calibration point or a constant (`PCF_PARVAL`), the
value is text in the raw format of its type (ICD Table 5):[^i70-appa5]

| Type | Encoding on the link | Raw format in the MIB | Examples from the ICD |
|---|---|---|---|
| Unsigned integer | unsigned integer | Digits in the selected radix. Decimal is the default. Binary, octal or hexadecimal are possible. | `15`, `1111`, `17`, `F` |
| Signed integer | two's complement | Decimal only | `127`, `-1`, `-127` |
| Real (IEEE single or double) | IEEE 754 | Scientific or fixed-point notation | `23.13`, `-1.2E3`, `2.5E38` (single), `1.6E308` (double) |
| Real (MIL single) | MIL-STD-1750A | Scientific or fixed-point notation | `23.13`, `-1.2E3`, `1.6E38` |
| Octet string | unsigned integer | Hex digits, two per octet, no spaces | `0AAFBB` |
| Character string | ASCII | ASCII characters | `ANY-STRING` |
| Absolute time | per PUS | `yyyy.ddd.hh.mm.ss` | `2001.159.23.59.59` |
| Relative time | per PUS | `+/-[ddd.]hh.mm.ss[.mmm]` | `-00.01.00`, `+251.23.59.59.010` |

Engineering (calibrated) values of unsigned integers are always input and displayed in
decimal, even when the calibration's engineering format is unsigned. The engineering format
of command parameters is dictated by the associated calibration.[^i70-appa5] For integer
*fields* of the tables, as opposed to parameter values, the C++ prefixes `0x` and `0` select
hexadecimal and octal.[^i70-conv] When a command or sequence parameter value does not
match its type, the importer substitutes `0` (integers, reals, relative times), an empty
string or `1970.001.00.00.00` (absolute times). A mandatory field left null becomes `0` or
an empty string.[^i70-24]

## Related fields

### Width and padding

`PCF_WIDTH` is the "padded" width of a parameter in bits. It is used only by the variable
packet (`vpd`) extraction, to find where the next field starts when a slot is wider than the
PTC/PFC implies. Padding bits always precede the value (they are its most significant
bits). For fixed packets (`plf`) the width is always implied by PTC/PFC, and `PCF_WIDTH` is
ignored.[^i70-width][^i70-vpd] On the commanding side, `CDF_ELLEN` gives each element's length
in bits.[^i70-cdfellen]

### Endianness

`PCF_ENDIAN` (added in ICD 6.7, S2K-DCR-5192) declares the byte order of types whose length
is a whole number of bytes. Issues 6.7 Draft A and 6.9 describe it as a field that "can be
used in the future". Issue 7.0 drops "in the future" (S2K-8353, applicable from SCOS-2000
6.0.1).[^i67-endian][^i70-a2] `B` means big endian, most
significant byte first, and is the default. `L` means little endian. The conversion applies
to signed and unsigned integers, strings, octet strings, absolute times and relative
times.[^i70-endian][^i70-a1-67][^i70-a2] `CPC_ENDIAN` has the same values but is marked as a
future extension (S2K-7749): issue 7.0 assigns it to "No SCOS version".[^i70-cpcendian][^i70-a2]
PUS itself always transmits the most significant bit first.[^pusc-734]

### Time correlation flags

`PCF_CORR` = `Y` (the default) applies time correlation to an absolute time parameter when
it is decoded. `N` extracts the time without correlation. `PCF_OBTID` selects which
on-board clock's format and correlation to use. The value is 1 to N for N clocks, and when it
is left empty the MISCconfig default `TCO_DEFAULT_OBT_ID` applies. With `N` and no OBT ID,
the epoch is the MISCconfig variable `TCO_ESA_EPOCH`. The command-side fields `CPC_CORR` and
`CPC_OBTID` mirror these.[^i70-corr][^i70-cpccorr] All four fields arrived with SCOS-2000
R5.2 (ICD 6.7, S2K-SCR-4917), together with PFC 30.[^i70-a1-67] See
[Time correlation in SCOS-2000](../scos2000/time-correlation.md).

### Calibration category and type

The category must agree with the type:[^i70-categ][^i70-curtx][^i70-cpccateg]

* `PCF_CATEG` = `N` (numerical) covers numerical parameters, with or without a numerical,
  polynomial or logarithmic calibration. It also covers PTC 6, 7, 9 and 10.
* `S` (status) is for parameters with a textual calibration.
* `T` (text) is for PTC 8 character strings only.
* `PCF_CURTX` must be empty for PTC 7, 8, 9 and 10. Strings and times are never calibrated.
* `CPC_CATEG` must be null or `N` for strings and times, unless the parameter is a Command
  ID (`A`) or a Parameter ID (`P`).

## SCOS-2000 compared with PUS-A and PUS-C

SCOS-2000 implements most of the PUS type system. The differences are listed below, because
each one either limits what a mission's packets may contain or calls for a translation when
the MIB is generated.

| Topic | PUS-A (2003) | PUS-C (2016) | SCOS-2000 MIB (ICD 7.0) |
|---|---|---|---|
| Boolean | PFC 0 (1 bit)[^pusa-2351] | PFC 0, or n > 1 bits[^pusc-732] | PFC 0 only |
| Enumerated widths | 1–16, 24, 32 bits[^pusa-2352] | 1–64 bits[^pusc-733] | 1–32 bits |
| Unsigned/signed integers | PFC 0–16 (up to 64 bits)[^pusa-2353] | PFC 0–16, plus unsigned 17–19 = 1, 2, 3 bits[^pusc-734] | PFC 0–14 (up to 32 bits) |
| Real | PFC 1–4[^pusa-2355] | PFC 1–4[^pusc-736] | PFC 1–3. PFC 4 for commands only. |
| Bit string | PFC 0 variable, n fixed[^pusa-2356] | same[^pusc-737] | Only n ≤ 32, monitoring only, as unsigned |
| Variable octet/character string | supported[^pusa-2357] | supported[^pusc-738] | Commands and sequences only. Length *n* counted, optionally inserted (R4.0). |
| Absolute time | PFC 0–18[^pusa-2359] | PFC 0–46 (19–46: CUC with 4 to 10 fine octets)[^pusc-7310] | PFC 1–18 (2 for TC only) and 30 (Unix). No P-field. |
| Relative time | PFC 0–16, (PFC + 3) / 4 rule[^pusa-23510] | PFC 2 (CDS) and 3–18[^pusc-7311] | PFC 3–18 |
| Deduced | PFC 0[^pusa-23511] | PFC 0[^pusc-7312] | PFC 0. PFC > 0 (forced width) for TC only. No deduced structures. |
| Packet (PTC 12) | – | PFC 0 TM, PFC 1 TC[^pusc-7313] | Not in Table 4. Command ID parameters (7/0) carry TC packets instead. |
| Saved synthetic (PTC 13) | – | – | SCOS-2000 specific |

The SCOS-2000 column summarises ICD Table 4 and Appendix C.[^i70-appa][^i70-c1] The PUS
migration itself is covered in [PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md).

## Types in the Solar Orbiter MIB

The tables below count the PTC/PFC pairs in the 2025-09-16 Solar Orbiter MIB.[^solo]

### Monitoring parameters (pcf), by type

| PTC | Type | Parameters | Distinct PFCs | Most frequent PFCs (count) |
|---:|---|---:|---:|---|
| 1 | Boolean | 4,380 | 1 | 0 (4,380) |
| 2 | Enumerated | 29,443 | 23 | 1 (10,209), 8 (5,896), 32 (5,414), 16 (4,399), 2 (2,534) |
| 3 | Unsigned integer | 50,341 | 15 | 12 (17,160), 4 (15,297), 14 (14,529), 8 (1,206), 0 (1,050) |
| 4 | Signed integer | 1,950 | 8 | 12 (1,462), 14 (426), 7 (24), 4 (23) |
| 5 | Real | 29,718 | 2 | 1 (28,316), 2 (1,402) |
| 6 | Bit string | 950 | 12 | 2 (820), 3 (53), 6 (22), 5 (19), 11 (16) |
| 7 | Octet string | 5,990 | 104 | 8 (2,515), 12 (983), 24 (275), 32 (256), 36 (182) |
| 8 | Character string | 120 | 17 | 8 (49), 6 (26), 10 (14), 40 (6) |
| 9 | Absolute time | 3,796 | 4 | 15 (2,116), 17 (1,677), 30 (2), 2 (1) |
| 10 | Relative time | 47 | 3 | 17 (37), 6 (6), 15 (4) |
| 11 | Deduced | 8 | 1 | 0 (8) |
| 13 | Saved synthetic | 2 | 1 | 0 (2) |
| | **Total** | **126,745** | | |

??? note "All 191 PTC/PFC pairs used in pcf (count)"
    **PTC 1:** 0 (4,380).
    **PTC 2:** 1 (10,209), 2 (2,534), 3 (563), 4 (133), 5 (18), 6 (8), 7 (15), 8 (5,896),
    10 (4), 11 (1), 12 (4), 16 (4,399), 17 (2), 18 (224), 19 (1), 21 (1), 22 (2), 24 (3),
    25 (1), 28 (1), 30 (4), 31 (6), 32 (5,414).
    **PTC 3:** 0 (1,050), 1 (174), 2 (140), 3 (262), 4 (15,297), 5 (24), 6 (79), 7 (19),
    8 (1,206), 9 (2), 10 (63), 11 (25), 12 (17,160), 13 (311), 14 (14,529).
    **PTC 4:** 0 (2), 1 (8), 4 (23), 6 (1), 7 (24), 8 (4), 12 (1,462), 14 (426).
    **PTC 5:** 1 (28,316), 2 (1,402).
    **PTC 6:** 1 (5), 2 (820), 3 (53), 4 (1), 5 (19), 6 (22), 7 (9), 11 (16), 14 (1),
    16 (1), 17 (1), 20 (2).
    **PTC 7:** 104 distinct octet lengths from 1 to 6,448. The most frequent are 8 (2,515),
    12 (983), 24 (275), 32 (256), 36 (182), 16 (167), 25 (163), 28 (114), 52 (109), 44 (85)
    and 104 (84). The longest is `NCAMBP00` "SSE segments", with 6,448 octets.
    **PTC 8:** 1 (5), 4 (2), 6 (26), 8 (49), 10 (14), 12 (1), 13 (1), 16 (3), 20 (1),
    24 (2), 32 (4), 36 (2), 37 (1), 38 (1), 40 (6), 51 (1), 70 (1).
    **PTC 9:** 2 (1), 15 (2,116), 17 (1,677), 30 (2).
    **PTC 10:** 6 (6), 15 (4), 17 (37).
    **PTC 11:** 0 (8). **PTC 13:** 0 (2).

### Command and sequence parameters (cpc, csp)

| PTC | `cpc` (7,155) | `csp` (10,981) |
|---:|---|---|
| 1 | 225 (PFC 0) | 145 (PFC 0) |
| 2 | 1,552, mostly 1 (598), 8 (364), 16 (196), 5 (124) | 1,390, mostly 8 (477), 1 (314), 16 (171), 2 (154), 32 (149) |
| 3 | 4,349, mostly 12 (1,540), 4 (1,120), 14 (984) | 7,560, mostly 12 (3,458), 4 (2,336), 14 (1,071) |
| 4 | 178, mostly 14 (77), 12 (64) | 378, mostly 4 (141), 12 (120), 14 (112) |
| 5 | 702: 1 (630), 2 (72) | 1,351: 1 (1,212), 2 (139) |
| 7 | 84, including 13 variable-length (PFC 0) | 51, including 8 variable-length |
| 8 | 6, including 1 variable-length | – |
| 9 | 58: 15 (35), 17 (23) | 103: 15 (58), 17 (45) |
| 10 | 1: 17 | 3: 17 |

### What the numbers show

* **Within the SCOS-2000 limits.** No parameter uses an integer wider than 32 bits, a
  MIL-STD real, a variable bit string or an explicit P-field.[^solo][^i70-appa] The time
  types are the 4-octet coarse CUC formats 9/15 and 9/17, plus three ground-side
  oddities (next point).
* **Two SCOS-specific time formats.** The Unix-time format 9/30 appears exactly twice,
  `NYG02101` "Period From" and `NYG02102` "Period To", both in the "Time Correlation Report"
  packet (SPID 66840, APID 1966). The CDS-with-µs format 9/2 appears once, in telemetry:
  `NYG02204` "GS Acceptance Time" in SPID 66850, "TM Packet used by the Releaser G/S
  response". ICD Table 4 says that 9/2 is supported for command parameters only.[^solo][^i70-appa9]
  The same packet holds the only little-endian parameter in the MIB, `NYG02201` "GS Packet
  Size" (PTC 3, PFC 14, `PCF_ENDIAN` = `L`).[^solo]
* **Enumerated widths beyond PUS-A.** 242 enumerated parameters use widths that PUS-A does
  not list (17, 18, 19, 21, 22, 25, 28, 30 and 31 bits). SCOS-2000 (up to 32 bits) and
  PUS-C (up to 64 bits) both allow them.[^solo][^pusa-2352][^pusc-733]
* **Small fields.** Fields of 1 to 3 bits are encoded as Booleans (1/0, 4,380 parameters),
  enumerated (2/1–2/3, 13,306) or bit strings (6/1–6/3, 878), never as the PUS-C unsigned
  PFCs 17–19, which SCOS-2000 does not list.[^solo][^pusc-734]
* **Time correlation.** All 50 parameters with `PCF_CORR` = `N` are relative times (47) or
  the three ground-side times above. No parameter sets `PCF_OBTID`.[^solo][^i70-corr]
* **Consistency with the category rules.** Category `T` occurs only with PTC 8 (120
  parameters). No string or time parameter has a `PCF_CURTX`.[^solo][^i70-categ]

!!! warning "Inference"
    The parameters `NYG021xx` and `NYG022xx` are on APID 1966, in packets with
    mission-specific types (164 and 165) that describe ground functions. Unix-time,
    CDS-with-µs and little-endian encodings therefore most likely describe data produced
    by ground software rather than by the spacecraft. Whether SCOS-2000 decodes a 9/2
    *monitoring* parameter despite the Table 4 restriction is not stated in the available
    sources.

??? example "SQL used"
    ```sql
    -- solo-2025-09-16.sqlite (command parameter name column is CPC_NAME in the SQLite copy)
    SELECT PCF_PTC, PCF_PFC, count(*) FROM pcf GROUP BY 1,2
     ORDER BY CAST(PCF_PTC AS int), CAST(PCF_PFC AS int);
    SELECT PCF_PTC, count(*), count(DISTINCT PCF_PFC) FROM pcf GROUP BY 1;
    SELECT CPC_PTC, CPC_PFC, count(*) FROM cpc GROUP BY 1,2;
    SELECT CSP_PTC, CSP_PFC, count(*) FROM csp GROUP BY 1,2;
    SELECT CPC_CATEG, CPC_PTC, CPC_PFC, count(*) FROM cpc WHERE CPC_CATEG IN ('A','P') GROUP BY 1,2,3;
    SELECT PCF_NAME, PCF_DESCR, PCF_PTC, PCF_PFC, PCF_ENDIAN, PCF_CORR FROM pcf
     WHERE PCF_ENDIAN='L' OR (PCF_PTC='9' AND PCF_PFC IN ('2','30'));
    SELECT PCF_PTC, PCF_PFC, PCF_CORR, count(*) FROM pcf WHERE PCF_PTC IN ('9','10') GROUP BY 1,2,3;
    SELECT PCF_CATEG, PCF_PTC, count(*) FROM pcf GROUP BY 1,2;
    SELECT count(*) FROM pcf WHERE PCF_PTC IN ('7','8','9','10') AND PCF_CURTX <> '';  -- 0
    SELECT PCF_NAME, PCF_PTC, PCF_PFC, PCF_WIDTH, PCF_RELATED FROM pcf WHERE PCF_WIDTH <> '';
    SELECT VPD_POS, VPD_NAME, VPD_GRPSIZE, VPD_PIDREF FROM vpd WHERE VPD_TPSD='14406';
    ```

## Related pages

* PUS definitions and history: [PUS parameter types](../ecss/pus/parameter-types.md),
  [PUS packet structures](../ecss/pus/packets.md), [PUS-A vs PUS-C](../ecss/pus/pus-a-vs-pus-c.md).
* Time formats: [Time code formats (CCSDS 301.0-B-4)](../ccsds/time-codes.md).
* How types are used for extraction and encoding: [Monitoring](monitoring.md),
  [Commanding](commanding.md), [Calibration](calibration.md).
* How the type table evolved (for example 9/1 in R5.0, 9/30 and endianness in R5.2):
  [ICD history](icd-history.md).

[^i70-appa]: [SCOS-2000 Database Import ICD issue 7.0](../library/icd-7-0-final.md), Appendix A, introduction and Table 4 "Parameter Type and Format Codes supported by SCOS-2000", PDF pp. 214–224.
[^i70-rd]: [ICD 7.0](../library/icd-7-0-final.md), §1.4.2 Reference documents (RD-6 ESA PSS-07-101, RD-7 Rosetta Space/Ground ICD, RD-8 CCSDS 301.0-B-2), PDF p. 19.
[^i70-pcfptc]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 fields `PCF_PTC` and `PCF_PFC`, PDF p. 43.
[^i70-cpcptc]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.2.2 fields `CPC_PTC` and `CPC_PFC`, PDF p. 144.
[^i70-csp]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.3.4 csp, fields `CSP_PTC` and `CSP_PFC`, PDF p. 185.
[^i70-width]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 field `PCF_WIDTH`, PDF p. 44.
[^i70-endian]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 field `PCF_ENDIAN`, PDF p. 55.
[^i70-corr]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 fields `PCF_CORR` and `PCF_OBTID`, PDF pp. 53–54.
[^i70-cpccorr]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.2.2 fields `CPC_CORR` and `CPC_OBTID`, PDF p. 150.
[^i70-cpcendian]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.2.2 field `CPC_ENDIAN`, PDF p. 151.
[^i70-categ]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 field `PCF_CATEG`, PDF p. 47.
[^i70-cpccateg]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.2.2 field `CPC_CATEG`, PDF p. 146.
[^i70-24]: [ICD 7.0](../library/icd-7-0-final.md), §2.4 Checks applied at import time, PDF p. 23.
[^i70-defs]: [ICD 7.0](../library/icd-7-0-final.md), §1.3.1 Definitions and Terminology, PDF p. 17.
[^pusa-2352]: [ECSS-E-70-41A (PUS-A)](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.2 Enumerated parameter, PDF p. 192.
[^pusc-734]: [ECSS-E-ST-70-41C (PUS-C)](../library/ecss-e-st-70-41c-15april2016.md), §7.3.4 Unsigned integer (Table 7-4) and §7.3.5 Signed integer (Table 7-5), PDF pp. 430–431.
[^i70-c1]: [ICD 7.0](../library/icd-7-0-final.md), Appendix C §1 Support of PUS data types, PDF p. 235.
[^i70-a1-61]: [ICD 7.0](../library/icd-7-0-final.md), Annex 1, "Additional modifications implemented in ICD version 6.1" (S2K-40-DCR-808), PDF p. 251.
[^i70-appa5]: [ICD 7.0](../library/icd-7-0-final.md), Appendix A, Table 5 "Value formats for the SCOS-2000 parameter types", PDF pp. 225–228.
[^pusa-2355]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.5 Real parameter, §23.5.5.1 IEEE and §23.5.5.2 MIL-STD-1750A formats, PDF pp. 193–195.
[^pusa-2355b]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.5.2, examples of 48-bit extended floating point numbers, PDF p. 196.
[^pusc-737]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.7 Bit-string, Table 7-7 and requirements e–f, PDF p. 432.
[^i70-appa78]: [ICD 7.0](../library/icd-7-0-final.md), Appendix A, Table 4 rows PTC 7 and 8, PDF pp. 217–219.
[^i70-a1-hp]: [ICD 7.0](../library/icd-7-0-final.md), Annex 1, Herschel/Planck repatriation items "String parameters" and "Encoding of variable string parameters" (ICD 6.0), PDF p. 248.
[^pusc-738]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.8 Octet-string, Figure 7-4 and requirement d, PDF p. 433.
[^i70-appa9]: [ICD 7.0](../library/icd-7-0-final.md), Appendix A, Table 4 rows PTC 9, PDF pp. 219–221.
[^i70-a1-67]: [ICD 7.0](../library/icd-7-0-final.md), Annex 1, "Changes applicable as from R5.2 implemented in ICD version 6.7" (S2K-SCR-4917, S2K-SPR-5711) and clarifications (S2K-DCR-5192), PDF pp. 258–259.
[^pusc-7310]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.10 Absolute time, Table 7-10 and notes 2–3, PDF pp. 435–436.
[^i70-appa10]: [ICD 7.0](../library/icd-7-0-final.md), Appendix A, Table 4 rows PTC 10, PDF pp. 221–223.
[^pusc-7311]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.11 Relative time, Table 7-11, PDF pp. 436–437.
[^i70-a2]: [ICD 7.0](../library/icd-7-0-final.md), Annex 2, items S2K-8353, S2K-7749, S2K-8572 and S2K-8778, PDF pp. 262–263.
[^pusa-23510]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.10 Relative time parameter, PDF p. 198.
[^i70-appa11]: [ICD 7.0](../library/icd-7-0-final.md), Appendix A, Table 4 rows PTC 11, PDF p. 223.
[^pusa-23511]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.11 Deduced parameter, PDF p. 199.
[^i70-related]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 field `PCF_RELATED`, PDF p. 46.
[^i70-cpcspecial]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.2.2 "Special PUS Command Parameter Types", PDF p. 143.
[^i70-a1-64]: [ICD 7.0](../library/icd-7-0-final.md), Annex 1, "Changes applicable as from R5.0 implemented in ICD version 6.4", PDF p. 254.
[^i70-c2]: [ICD 7.0](../library/icd-7-0-final.md), Appendix C §2 Support of PUS data structures, PDF p. 236.
[^solo]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `pcf`, `cpc`, `csp`, `vpd`, `plf` and `pid`, queried by this wiki on 2026-11-12.
[^i70-appa13]: [ICD 7.0](../library/icd-7-0-final.md), Appendix A, Table 4 row PTC 13, PDF p. 224.
[^i70-synth]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.2 Synthetic parameters (saved synthetic parameters), PDF p. 57.
[^i70-a1-cryo]: [ICD 7.0](../library/icd-7-0-final.md), Annex 1, "Cryosat special command/sequence parameter types repatriation" (ICD 6.0), PDF p. 249.
[^i70-conv]: [ICD 7.0](../library/icd-7-0-final.md), §3.3 Detailed definition of the ASCII tables structure, PDF p. 36.
[^i70-vpd]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.5.2 vpd, PDF pp. 99–100.
[^i70-cdfellen]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.3.2.3 cdf, field `CDF_ELLEN`, PDF p. 155.
[^i70-curtx]: [ICD 7.0](../library/icd-7-0-final.md), §3.3.2.1.1 field `PCF_CURTX`, PDF p. 49.
[^pusa-2351]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.1 Boolean parameter, PDF p. 192.
[^pusc-732]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.2 Boolean, Table 7-2, PDF p. 429.
[^pusc-733]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.3 Enumerated, Table 7-3, PDF p. 430.
[^pusa-2353]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.3 and §23.5.4, PDF pp. 192–193.
[^pusc-736]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.6 Real, Table 7-6, PDF p. 431.
[^pusa-2356]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.6 Bit-string parameter, PDF p. 196.
[^pusa-2357]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.7 and §23.5.8, PDF pp. 196–197.
[^pusa-2359]: [PUS-A](../library/ecss-e-70-41a-30jan2003-pus.md), §23.5.9 Absolute time parameter, PDF p. 198.
[^pusc-7312]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.12 Deduced, PDF p. 437.
[^pusc-7313]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.13 Packet, Table 7-12, PDF p. 437.
[^pusc-731]: [PUS-C](../library/ecss-e-st-70-41c-15april2016.md), §7.3.1, Table 7-1 "PTC – packet field type code", PDF p. 429.
[^i67-endian]: [ICD 6.7 Draft A](../library/icd-6-7-drafta.md), §3.3.2.1.1 field `PCF_ENDIAN`, PDF p. 51; [ICD 6.9](../library/icd-6-9-archive-org.md), same field, PDF p. 54.
