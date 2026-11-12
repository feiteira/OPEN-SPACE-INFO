---
title: TM synchronization and channel coding (CCSDS 131.0-B-5)
description: The CCSDS synchronization and channel coding sublayer for TM, AOS and USLP frames - attached sync markers and CADUs, the pseudo-randomizers, convolutional, Reed-Solomon, concatenated, turbo and LDPC codes, frame validation, allowed frame lengths and managed parameters, with the performance rationale of the Green Book and Solar Orbiter's turbo coding.
tags: [CCSDS, Data link layer, Channel coding, Telemetry]
sources: [ccsds-131-0-131x0b5, ccsds-130-1-130x1g3e1, ecss-e-hb-50a-15november2008, ccsds-132-0-132x0b3, ecss-e-st-50-03c-31july2008, ecss-e-st-50c-rev-1-1march2021, ecss-e-as-50-25c-rev-1-13january2023, ccsds-911-1-911x1b5e1, tn-1030-time-correlation, mex-esc-if-5003-b5, sol-s-astr-tn-00079-07, solo-ddid-i1r2, mib-20250916m25925pfms001-sol, mib-20200416m10720pfms001-sol]
---

# TM synchronization and channel coding (CCSDS 131.0-B-5)

**TM Synchronization and Channel Coding** is the CCSDS standard for the lower sublayer of the Data
Link Layer on telemetry links. It takes the fixed-length Transfer Frames produced by the
[TM](tm-sdlp.md), [AOS](aos.md) or [USLP](uslp.md) Space Data Link Protocol and turns them into a
continuous stream of channel symbols that survives a weak, noisy radio link: it marks where each frame
starts (the **Attached Sync Marker**), optionally protects the frame with an error-correcting code, and
scrambles the bits with a **pseudo-randomizer** so that the receiver can stay locked.[^c-purpose][^c-arch]
The ECSS communications handbook quantifies what is at stake: depending on the scheme, coding lowers
the $E_b/N_0$ needed for a frame error rate of 10⁻⁴ by roughly 4 to 12 dB.[^hb-gains]

!!! info "At a glance"
    | Item | Value |
    |---|---|
    | Current issue | CCSDS 131.0-B-5, September 2023 (B-1 2003, B-2 2011, B-3 2017, B-4 2022); B-5 revises the pseudo-randomizer[^c-ctl] |
    | Applies to | TM, AOS and USLP Transfer Frames, space-to-ground, space-to-space and (AOS/USLP) ground-to-space[^c-purpose][^c-uplink] |
    | Sync marker | 32-bit ASM `0x1ACFFC1D`; longer markers for turbo and some LDPC codes[^c-asm] |
    | Codes | Convolutional (7,1/2) and punctured 2/3–7/8; Reed-Solomon (255,223) and (255,239); concatenated RS + convolutional; turbo 1/2–1/6; LDPC 1/2, 2/3, 4/5 and 223/255[^c-func] |
    | Randomizer | 131071-bit sequence, $h(x)=x^{17}+x^{14}+1$; 255-bit legacy option, $h(x)=x^8+x^7+x^5+x^3+1$[^c-rand-seq] |
    | Frame lengths | Up to 2048 octets (TM/AOS) uncoded or convolutional; fixed lengths for RS, turbo and LDPC[^c-len] |
    | ECSS equivalent | ECSS-E-ST-50-01C (2008), superseded by the adoption notice ECSS-E-AS-50-21[^e50-adopt] |

## Role of the sublayer

The sublayer performs three functions: **error-control coding** (including the frame validation that
tells the upper layer whether a decoded frame can be trusted), **synchronization** (delimiting frames
or codeblocks with a marker) and **pseudo-randomizing** (guaranteeing bit transitions and a clean
spectrum).[^c-func] The TM SDLP assumes exactly these services from below, and requires that all
frames of a Physical Channel use the same coding options so that the receiver can decode them.[^b3-lower]

The order of operations is fixed. At the sending end, block codes come first, then randomization, then
the marker, and convolutional coding (or slicing into LDPC codeblocks) is last because it works on a
continuous stream; the receiver undoes the steps in reverse.[^c-org][^c-rand-ov]

```mermaid
flowchart LR
    subgraph Send["Sending end"]
      direction TB
      TF["Transfer Frames<br/>(fixed length)"] --> BC["Reed-Solomon, turbo or LDPC<br/>encoding (optional)"]
      BC --> RND["Pseudo-randomizer<br/>(optional, managed)"]
      RND --> ASM["Attach ASM<br/>→ CADU / SMTF"]
      ASM --> CC["Convolutional encoding, or<br/>LDPC coding of an SMTF stream (optional)"]
      CC --> CS["Channel symbols<br/>to modulator"]
    end
    subgraph Recv["Receiving end"]
      direction TB
      RS1["Channel symbols"] --> VD["Viterbi decoding or<br/>SMTF-stream LDPC decoding"]
      VD --> FS["Frame synchronization<br/>(find ASM)"]
      FS --> DR["Derandomize"]
      DR --> BD["RS / turbo / LDPC decoding"]
      BD --> TF2["Transfer Frames +<br/>quality indicator"]
    end
    Send -. "space link" .-> Recv
```

Receivers may synchronize before Viterbi decoding when the basic rate-1/2 code is used, so the
receiving-end figure is a logical model rather than a required implementation.[^c-org]

### The service

The sublayer offers a single service: one-way transfer of fixed-length frames at a constant frame rate
on a Physical Channel, with optional error detection and correction, and only one user per Physical
Channel. Its primitives are `ChannelAccess.request (Frame)` at the sending end and
`ChannelAccess.indication (Frame, Quality Indicator, Sequence Indicator)` at the receiving end. The
**Quality Indicator** flags an uncorrectable error in the frame; the **Sequence Indicator** flags that
frames were lost because frame synchronization was lost.[^c-svc]

### History and the ECSS view

Issue 5 (September 2023) revises the pseudo-randomizer to avoid spectral spikes on high-rate links:
a 131071-bit sequence becomes the standard one and the old 255-bit sequence remains only for backward
compatibility.[^c-ctl][^c-rand-seq] ECSS originally published its own subset as ECSS-E-ST-50-01, which
kept fewer options (Reed-Solomon E=8 only with 4D-8PSK-TCM and interleaving depth 8; turbo only at rates
1/2 and 1/4).[^hb-cdiff] ECSS-E-ST-50C Rev.1 (2021) lists ECSS-E-AS-50-21, an adoption notice of the
CCSDS Blue Book itself, as superseding ECSS-E-ST-50-01C; the January 2023 bibliography of the TC
adoption notice gives ECSS-E-AS-50-21C Rev.1 as adopting CCSDS 131.0-B-4.[^e50-adopt][^as25-ctx]
Whether ECSS has since adopted 131.0-B-5 is not stated in the available sources. See
[ECSS-E-ST-50C communications](../ecss/e-st-50-communications.md).

## Why code at all

Channel coding lets data cross a noisy channel so that the possible messages stay distinguishable: for
the same error rate it needs less energy per information bit, or for the same energy it gives a lower
error rate.[^g1-why] The Green Book adds three operational benefits: compressed data, which is far more
sensitive to errors, becomes usable; adaptive (self-identifying) telemetry becomes safe; and anomalies in
the decoded data can be trusted to be real, which enables more unattended operations.[^g1-why]

### Measuring performance

Codes are compared on the Additive White Gaussian Noise (AWGN) channel as a function of the
bit-energy-to-noise ratio $E_b/N_0$. Three error rates are used: the Bit Error Rate (BER), the Word Error
Rate (WER, per codeword) and the Frame Error Rate (FER). Only for independent errors does
$\text{FER} = 1-(1-\text{BER})^L$ hold for an $L$-bit frame, which is true for uncoded data but not
after any of the recommended codes, because decoders make errors in bursts.[^g1-meas]

Shannon's capacity limits bound what any code can do. For a binary-input AWGN channel the low-BER
asymptotes are about 0.2 dB for rate 1/2, −0.5 dB for 1/3, −0.8 dB for 1/4 and −1.1 dB for 1/6, against
−1.6 dB for rate → 0. Finite block lengths cost more: 1000-bit blocks are about 1.3 dB better than
100-bit blocks, 10,000-bit blocks just over 0.5 dB better again, and 100,000-bit blocks another
0.2 dB.[^g1-limits] These numbers explain why the newer codes use large blocks.

| Scheme (frame 8920 bits, AWGN, BPSK) | Bandwidth vs uncoded | Coding gain at FER 10⁻⁴ | at FER 10⁻⁶ |
|---|---|---|---|
| (255,223) Reed-Solomon only | 1.14 | 5.4 dB | 6.2 dB |
| Punctured convolutional 7/8 | 1.14 | 3.8 dB | 3.9 dB |
| RS + punctured convolutional 7/8 | 1.31 | 6.8 dB | 7.7 dB |
| Punctured convolutional 3/4 | 1.33 | 5.3 dB | 5.4 dB |
| RS + punctured convolutional 3/4 (I = 5) | 1.52 | 8.2 dB | 9.6 dB |
| Basic convolutional (7,1/2) | 2 | 6.1 dB | 6.6 dB |
| Turbo rate 1/2, $k$ = 8920 | 2 | 10.8 dB | 11.6 dB |
| RS + basic convolutional 1/2 (I = 5) | 2.28 | 9.4 dB | 10.8 dB |
| Turbo rate 1/4, $k$ = 8920 | 4 | 11.7 dB | 12.5 dB |

The table restates part of Table 5-2 of the ECSS communications handbook; uncoded BPSK would need
11.9 dB (FER 10⁻⁴) or 13.0 dB (FER 10⁻⁶), and the gains already account for the higher symbol rate.[^hb-gains]
The Green Book's own summary: the convolutional code gains about 5.5 dB over uncoded data at BER 10⁻⁵,
the Reed-Solomon outer code adds about 2.0 dB, and the rate-1/2 turbo code with 8920-bit blocks comes
within about 1 dB of the rate-1/2 Shannon limit and beats the concatenated code by about 1.5 dB.[^g1-perf]

## Frame synchronization: the Attached Sync Marker

### CADU and ASM placement

The **Attached Sync Marker** (ASM) is a known bit pattern placed immediately before every frame,
codeblock or codeword, with no gap after the preceding one. The ASM plus what follows it is the
**Channel Access Data Unit** (CADU):[^c-sync-ov][^c-asm][^c-asm-loc]

| Coding scheme | CADU = ASM + … | ASM attached to |
|---|---|---|
| None, or convolutional only | the Transfer Frame | each Transfer Frame |
| Reed-Solomon, or concatenated | the Reed-Solomon codeblock | each codeblock |
| Turbo | the turbo codeword | each codeword |
| LDPC applied to a Transfer Frame | the LDPC codeword | each codeword |
| LDPC applied to a stream of SMTFs | (CSM and the LDPC codeblock) | each Transfer Frame (ASM), each codeblock (CSM) |

The ASM is never fed into the Reed-Solomon, turbo or LDPC encoder; it is attached to the encoded block.
For Reed-Solomon this prevents the encoder from regenerating a copy of the marker in the check symbols
for certain repetitive data, which would confuse the frame synchronizer.[^c-asm-loc] With convolutional
coding, the ASM is convolutionally encoded together with the frame; in the concatenated scheme it is
encoded by the inner code but not by the outer code.[^c-asm] The ASM is not part of the Transfer Frame
and does not count in its length.[^c-len][^hb-tf]

### ASM bit patterns

| Used with | Length | Pattern (hex) |
|---|---|---|
| Uncoded, convolutional, Reed-Solomon, concatenated, LDPC rate 223/255, all LDPC of SMTF streams | 32 bits | `1ACFFC1D` |
| Turbo rate 1/2; LDPC rates 1/2, 2/3, 4/5 applied to frames | 64 bits | `034776C7272895B0` |
| Turbo rate 1/3 | 96 bits | `25D5C0CE8990F6C9461BF79C` |
| Turbo rate 1/4 | 128 bits | `034776C7272895B0FCB88938D8D76A4F` |
| Turbo rate 1/6 | 192 bits | `25D5C0CE8990F6C9461BF79CDA2A3F31766F0936B9E40863` |
| Embedded stream (e.g. forward playback of recorded frames) | 32 bits | `352EF853` |

All patterns are restated from section 9 of the standard.[^c-asm][^c-asm-emb] The turbo markers grow as
$32/r$ bits, the same factor as the codeword, which keeps synchronization performance roughly
independent of the code rate.[^c-tc-sync][^g1-fsync]

<div class="bitfield" data-title="Attached Sync Marker 0x1ACFFC1D (32 bits)" data-width="32"
     data-fields='[{"n":"1","b":4,"v":"0001"},{"n":"A","b":4,"v":"1010"},{"n":"C","b":4,"v":"1100"},{"n":"F","b":4,"v":"1111"},
                   {"n":"F","b":4,"v":"1111"},{"n":"C","b":4,"v":"1100"},{"n":"1","b":4,"v":"0001"},{"n":"D","b":4,"v":"1101"}]'
     data-caption="Bit 0 (first transmitted) is the leftmost bit"></div>

<div class="bitfield" data-title="64-bit ASM 0x034776C7272895B0 (turbo 1/2, LDPC 1/2-4/5)" data-width="32"
     data-fields='[{"n":"0","b":4,"v":"0000"},{"n":"3","b":4,"v":"0011"},{"n":"4","b":4,"v":"0100"},{"n":"7","b":4,"v":"0111"},
                   {"n":"7","b":4,"v":"0111"},{"n":"6","b":4,"v":"0110"},{"n":"C","b":4,"v":"1100"},{"n":"7","b":4,"v":"0111"},
                   {"n":"2","b":4,"v":"0010"},{"n":"7","b":4,"v":"0111"},{"n":"2","b":4,"v":"0010"},{"n":"8","b":4,"v":"1000"},
                   {"n":"9","b":4,"v":"1001"},{"n":"5","b":4,"v":"0101"},{"n":"B","b":4,"v":"1011"},{"n":"0","b":4,"v":"0000"}]'></div>

The ASM can also resolve the "sense" of the data (true versus inverted bits) when the modulation leaves
that ambiguity.[^c-func] The embedded pattern `0x352EF853` exists so that a stream of recorded frames
inserted in the data field of real-time frames does not contain the main marker; ECSS uses it for its
legacy asynchronously inserted playback data.[^c-asm-emb][^e03-async]

### Where the marker can be found

The domain in which the receiver looks for the ASM depends on the code:[^c-sync-ov]

| Code | ASM acquired in |
|---|---|
| Basic (7,1/2) convolutional, alone or concatenated | channel symbols (before decoding) or decoded bits |
| Punctured convolutional, alone or concatenated | decoded bits only |
| Turbo | channel symbols only |
| LDPC applied to frames | channel symbols only |
| LDPC applied to a stream of SMTFs | decoded bits (codeblocks are first found with the CSM) |

For the rate-1/2 convolutional code, the 52-symbol invariant part of the encoded marker lets the
receiver establish node synchronization and frame synchronization in one step. A turbo decoder cannot
find a marker in the decoded-bit domain because each constituent decoder is too weak and the iterations
need the codeword boundaries first; channel-symbol-domain synchronization in turn needs longer markers
and faster processing.[^g1-fsync]

### How frame synchronizers work

The Green Book describes two families of frame synchronizer:[^g1-fsimpl]

```mermaid
stateDiagram-v2
    [*] --> Search
    Search: SEARCH - look for the ASM at every bit offset
    Search --> Check: tentative match
    Check: CHECK - confirm ASM at the expected position
    Check --> Search: ASM missing
    Check --> Lock: N consecutive confirmations
    Lock: LOCK - frames delivered
    Lock --> Flywheel: ASM missed
    Flywheel: FLYWHEEL - keep delivering, count misses
    Flywheel --> Lock: ASM found again
    Flywheel --> Search: M consecutive misses (loss of lock)
```

* **State-machine synchronizers** search expensively for a marker, verify a number of subsequent
  markers before declaring lock, and tolerate a number of missed markers ("flywheel") before going back
  to search. They are cheap once locked, but a symbol slip costs several frames.[^g1-fsimpl]
* **Argmax synchronizers** continuously score every possible offset once per frame interval and pick
  the best; they have no lock state. Massey showed that the optimal metric is not plain soft correlation;
  a simple approximation counts only symbols with the wrong sign, weighted by their magnitude. Using two
  consecutive markers improves performance further.[^g1-fsimpl]
* For BPSK the synchronizer can run for both polarities to resolve the 180° ambiguity; QPSK and higher
  orders need four or more hypotheses.[^g1-fsimpl]

With a single 64-symbol marker, soft or hard correlation limits a rate-1/2 LDPC link at FERs below
about 10⁻³, which is why the better metrics matter.[^g1-fsimpl] The N and M thresholds in the diagram
are implementation choices, not values from the standard.

### The ASM as a time reference

Because the leading edge of the first ASM bit is a precise, recognizable instant, the ESA Packet
Telemetry Standard (as quoted in the Rosetta and Mars Express interface document) uses it for time
correlation: the on-board clock is sampled when the ASM of a specific VC 0 frame is sent and the ground
station time-tags the reception of the same bit.[^mex-tc] SCOS-2000 defines frame radiation time, frame
reception time and the ground delay with respect to that edge.[^tco] See
[time correlation](../scos2000/time-correlation.md).

## Pseudo-randomization

### Why randomize

Every receiver needs a data stream that is random enough: a sufficient density of bit transitions for
the bit synchronizer, no strong spectral lines, and no patterns that upset codeword synchronization and
frame validation.[^c-rand-ov] None of the codes guarantees this alone. The inverter on one output of the
basic convolutional code helps with BPSK but not with QPSK multiplexing or punctured codes; Reed-Solomon
and LDPC codes, being quasi-cyclic, can also decode wrongly after false codeblock synchronization if the
data are not randomized.[^c-cc-gen][^c-rs-gen][^c-ldpc-gen] CCSDS therefore makes the randomizer
**required unless the system designer verifies** that the system works without it, and both CCSDS and
ECSS record that missions have had telemetry problems because they skipped it.[^c-rand-ov][^hb-crp]

### How it works

Each bit of the codeblock, codeword or frame (not the ASM) is exclusive-ORed with a standard
pseudo-random sequence. The generator restarts at the beginning of every codeblock, codeword or frame,
during the ASM, so the ASM also synchronizes the randomizer. On the receiving end, derandomization is the
same exclusive-OR on hard bits, or a sign inversion of soft symbols.[^c-rand-ov][^c-rand-sync] The
randomizer is applied after Reed-Solomon, turbo or LDPC encoding and before convolutional encoding, and
its presence is a managed parameter of the Physical Channel, never signalled in the data.[^c-rand-ov]

| Sequence | Polynomial | Seed | First 40 bits |
|---|---|---|---|
| 131071 bits (default since B-5) | $h(x) = x^{17} + x^{14} + 1$ | `11000111000111000` | `0001 1100 0111 0001 1011 1001 0001 1011 1010 1001` |
| 255 bits (legacy, backward compatibility) | $h(x) = x^8 + x^7 + x^5 + x^3 + 1$ | all ones | `1111 1111 0100 1000 0000 1110 1100 0000 1001 1010` |

Both rows restate §10.4.[^c-rand-seq] The seed of the long sequence was chosen for performance and to
avoid a long run of ones at the start; the short sequence may cause spectral lines at 1/255 of the symbol
rate and may not guarantee compliance with ITU power-flux-density limits.[^c-rand-seq] For LDPC coding
of an SMTF stream, the whole LDPC codeblock (after encoding) is randomized from its first bit, without
reset at codeword boundaries, and the CSM is not randomized.[^c-smtf-rand]

!!! note "Why the randomizer changed"
    The Green Book (2020) explains the problem: with the 255-bit randomizer and a QPSK link, the
    transmitted sequence repeats every 510 bits, producing spurious lines spaced by $R_b / 510$. Keeping
    that spacing below the 4 kHz ITU resolution bandwidth limits the bit rate to about 2.04 Mb/s. Idle
    frames filled with zeros make it worse, since the randomizer output then dominates the transmitted
    signal. It discusses a 15-cell LFSR (period 32767) and filling idle frame data fields with a
    free-running pseudo-noise sequence.[^g1-hdr] The ECSS handbook had already flagged high-rate links
    above about 2 megasymbols per second as a problem with no agreed ECSS solution.[^hb-crp] CCSDS
    132.0-B-3 (2021) now mandates PN-filled OID frames, and 131.0-B-5 (2023) the 131071-bit sequence.[^b3-oid][^c-ctl]

The Green Book also notes that integration and test teams may like to see un-randomized data, and
suggests a randomizer that can be switched off during early testing.[^g1-randuse]

## Convolutional coding

### The basic (7,1/2) code

| Characteristic | Value |
|---|---|
| Code rate | 1/2 |
| Constraint length $K$ | 7 bits (6 memory cells, 64 states) |
| Connection vectors | $G_1$ = `1111001` (171 octal), $G_2$ = `1011011` (133 octal) |
| Symbol inversion | on the $G_2$ output |
| Output order | $C_1(1), \overline{C_2}(1), C_1(2), \overline{C_2}(2), \ldots$ |
| Decoding | maximum likelihood (Viterbi); soft decisions with at least 3-bit quantization recommended |

The values are those of §3.3 and §3.2.4; the memory and state count follow from $K = m + 1$ and
$2^m$ states.[^c-cc-basic][^c-cc-gen][^g1-cc] With suppressed-carrier modulation, NRZ-L or NRZ-M may be
used; if differential encoding (NRZ-L to NRZ-M) is wanted, it should be done at the encoder input,
because differential encoding after a convolutional encoder costs considerable performance.[^c-cc-basic][^g1-transp] The ASM is always inserted before convolutional encoding, and the
FECF must validate the frame unless an outer Reed-Solomon code is used, because a Viterbi decoder whose
correction capability is exceeded can emit undetected error bursts.[^c-cc-gen]

**Rationale.** An exhaustive search in the 1970s showed that, among rate-1/2 codes with $K \le 7$, only
this code (and symmetric equivalents) reaches a free distance $d_{free} = 10$; the best $K = 6$ code
reaches 8 and $K = 8$ cannot do better than 10. Since Viterbi decoding effort doubles with every unit
of $K$, $K = 7$ was the sweet spot of the technology of the time.[^g1-cc] The code is **transparent**:
inverting the input inverts the output, so a BPSK receiver locked 180° out of phase simply produces
inverted bits, which known headers reveal. The $G_2$ inverter bounds the number of consecutive symbols
without a transition to 14. ESA, NASA-GSFC and NASA-JPL historically used different parity orders or
inversions; CCSDS kept one convention.[^g1-cc]

**Decoding.** The Viterbi algorithm keeps one survivor path per state ($2^{K-1} = 64$) and has a cost
linear in the number of bits.[^g1-viterbi] With 8-bit soft quantization it is within 0.2 dB of
unquantized performance, while hard decisions lose more than 2 dB. The usual rule of thumb is a
truncation (decision) length of about $5K$; for rate 1/2, 30 bits (five times the memory $m$) already
costs very little and 60 bits is nearly optimal.[^g1-ccperf]

### Punctured codes

To save bandwidth, symbols of the rate-1/2 code are deleted according to a fixed pattern, giving rates
2/3, 3/4, 5/6 or 7/8 (without the $G_2$ inversion):[^c-cc-punct]

| Rate | Pattern C1 | Pattern C2 | Transmitted sequence |
|---|---|---|---|
| 2/3 | `1 0` | `1 1` | C1(1) C2(1) C2(2) … |
| 3/4 | `1 0 1` | `1 1 0` | C1(1) C2(1) C2(2) C1(3) … |
| 5/6 | `1 0 1 0 1` | `1 1 0 1 0` | C1(1) C2(1) C2(2) C1(3) C2(4) C1(5) … |
| 7/8 | `1 0 0 0 1 0 1` | `1 1 1 1 0 1 0` | C1(1) C2(1) C2(2) C2(3) C2(4) C1(5) C2(6) C1(7) … |

A Viterbi decoder handles punctured codes by inserting neutral values at the deleted positions.[^g1-viterbi]
The price is about 2.4 dB between rate 1/2 and rate 7/8, and high rates need longer truncation depths
(about 80 bits for 5/6 and 90 bits for 7/8, instead of 60).[^g1-ccperf] ECSS recommends the basic code
whenever the bandwidth allows it.[^hb-crp]

## Reed-Solomon coding

### Code parameters

| Parameter | Value |
|---|---|
| Symbol size $J$ | 8 bits |
| Error-correction capability $E$ | 16 or 8 symbols per codeword |
| Codeword length $n$ | $2^J - 1 = 255$ symbols |
| Information symbols $k$ | $n - 2E$: 223 ($E$ = 16) or 239 ($E$ = 8) |
| Field generator | $F(x) = x^8 + x^7 + x^2 + x + 1$ over GF(2) |
| Code generator | $g(x) = \prod_{j=128-E}^{127+E} \left(x - \alpha^{11j}\right)$ over GF(2⁸), $F(\alpha) = 0$ |
| Representation | dual basis (Berlekamp), $z_0$ transmitted first |
| Interleaving depth $I$ | 1, 2, 3, 4, 5 or 8 (normally fixed per Physical Channel and Mission Phase) |

The values restate §4.3.[^c-rs-param][^c-rs-il][^c-rs-dual] The code is systematic: the $kI$ information
symbols pass unchanged and $2EI$ check symbols are appended.[^c-rs-param][^c-rs-disc]

**Rationale.** A Reed-Solomon code with minimum distance $d = n - k + 1$ corrects any $E = (n-k)/2$
symbol errors, regardless of how many bits inside a symbol are wrong, so it is excellent against bursts
and poor on its own against random AWGN errors.[^g1-rs] The 8-bit symbol matches octet-based frames and
the decoder technology; $E = 16$ was chosen because it performed best when concatenated with the (7,1/2)
code, and $E = 8$ was added later for a higher rate. The generator polynomials are palindromes, which
halves the multipliers in the encoder, and the dual-basis representation further simplifies the
hardware.[^g1-rs] The parity overhead of (255,223) is about 15 %.[^g1-rs]

**Decoding.** The Reed-Solomon decoder is a bounded-distance decoder. Three outcomes are possible: at
most $E$ symbol errors are corrected; more errors are usually **detected** (the decoder knows it failed
and can flag the frame); rarely, the received word falls within distance $E$ of another codeword and is
decoded wrongly. For (255,223) this last probability is of the order of $1/E!$, about $5 \times 10^{-14}$,
which is why the Reed-Solomon decoder alone can validate frames; for $E = 8$ the margin is much smaller.[^g1-rsdec][^g1-crc]
The ECSS handbook quotes decoder-error probabilities of about 10⁻¹³ for $E = 16$ and 10⁻⁵ for $E = 8$,
the reason ECSS restricted $E = 8$ to 4D-8PSK-TCM links with $I = 8$.[^hb-cdiff] Decoders can also accept
erasures, which count half as much as errors ($2t + e \le 2E$).[^g1-rsdec]

### Interleaving

With interleaving depth $I$, $I$ codewords are interleaved symbol by symbol: the symbol stream entering
the encoder is distributed round-robin to $I$ encoders, and the check symbols are emitted the same way.
A burst of channel errors is then spread across $I$ codewords instead of overwhelming one.[^c-rs-disc][^g1-rsil]
For $I = 2$, the transmitted order is: symbol 1 of codeword 1, symbol 1 of codeword 2, symbol 2 of
codeword 1, symbol 2 of codeword 2, and so on, followed by the interleaved check symbols. The
information symbols still appear in their original order, so the code remains systematic at codeblock
level.[^c-rs-disc]

### Codeblock, virtual fill and frame lengths

The transmitted codeblock is the Transfer Frame followed by the $2EI$ check symbols, preceded by the
32-bit ASM. A frame shorter than $kI$ symbols is handled by **virtual fill**: $Q$ leading zero symbols
are assumed by both encoder and decoder but never transmitted.[^c-rs-il][^c-rs-part] Virtual fill must be
all zeros, fixed for the Mission Phase, inserted only at the start of the codeblock and only in
multiples of $I$ symbols ($8I$ bits).[^c-rs-part] The allowed frame lengths in octets are therefore

$$L = (255 - 2E - q)\, I$$

with $q$ virtual-fill symbols per codeword; if 32-bit alignment is needed, the codeblock length
$(255 - q) I$ must also be a multiple of 4.[^c-len]

| $I$ | 1 | 2 | 3 | 4 | 5 | 8 |
|---|---|---|---|---|---|---|
| Frame length, $E$ = 16, no fill | 223 | 446 | 669 | 892 | **1115** | 1784 |
| Frame length, $E$ = 8, no fill | 239 | 478 | 717 | 956 | 1195 | 1912 |

The table is computed by this wiki from the equation above (octets).[^c-len] For example, with $E = 16$
and $I = 5$ the check symbols are always 1280 bits and the transmitted codeblock is 10,200 bits, so the
CADU is 10,232 bits.[^c-rs-part] The Green Book's virtual-fill example uses $q = 3$: an 8800-bit frame,
120 bits of virtual fill and a 10,080-bit transmitted codeblock.[^g1-rs] The standard notes that only
the unshortened codeblock gives full performance and that more virtual fill means more codeblocks per
second for the decoder to handle.[^c-rs-il] The Green Book qualifies this: shortening generally, but not
always, degrades performance, and on the AWGN channel with Reed-Solomon alone it can even help, which is
not the case in the concatenated system.[^g1-rs][^g1-rsdec]

Because the Reed-Solomon code loses its transparency when virtual fill is used, the data sense (true
or inverted) must be resolved before decoding: with NRZ-L the 32-bit ASM does this, NRZ-M data are
self-resolving.[^c-rs-dual][^g1-rs]

## Concatenated coding

The **concatenated** scheme uses a Reed-Solomon code as the outer code and a convolutional code as the
inner code.[^c-concat] It works because of the way Viterbi decoders fail: when the decoder leaves the
correct trellis path it produces a burst of errors from a few bits to several constraint lengths long,
with a little over half the bits wrong. Three or four such errors typically fall into one 8-bit
Reed-Solomon symbol, which the outer
code corrects as a single symbol error, and moderate interleaving spreads the longer bursts over several
codewords.[^g1-concat] An interleaving depth of 5 already gives near-ideal performance.[^g1-concatperf]

The ASM is encoded by the inner convolutional code but not by the outer code.[^c-asm] Frame lengths are
the same as for Reed-Solomon alone.[^c-len] The Green Book adds a practical warning: some commercial
Viterbi decoders, because of their node-synchronization thresholds, cannot work below about
$E_b/N_0$ = 4 dB at rate 1/2, which must be budgeted as an implementation loss.[^g1-concat]

## Turbo codes

### Specification

| Characteristic | Value |
|---|---|
| Type | Systematic parallel concatenated turbo code: two recursive convolutional components plus the uncoded information |
| Component codes | 16 states each (4 memory cells, $K = 5$) |
| Nominal rates $r$ | 1/2, 1/3, 1/4, 1/6 |
| Information block length $k$ | 1784, 3568, 7136, 8920 bits (223 × 1, 2, 4, 5 octets) |
| Codeword length | $n = (k + 4)/r$ (4 trellis-termination bits) |
| Backward connection vector | $G_0$ = `10011` for both components |
| Forward vectors, rates 1/2 and 1/3 | $G_1$ = `11011`; rate 1/2 punctures every other parity symbol of each component |
| Forward vectors, rate 1/4 | $G_2$ = `10101`, $G_3$ = `11111` (component a); $G_1$ = `11011` (component b) |
| Forward vectors, rate 1/6 | $G_1, G_2, G_3$ (component a); $G_1, G_3$ (component b) |
| Synchronization | ASM of $32/r$ bits before each codeword |
| Frame validation | FECF mandatory |

The rows restate §6.3; $K = 5$ is from the Green Book.[^c-tc-spec][^c-tc-enc][^c-tc-sync][^c-tc-gen][^g1-turbo]

| $k$ (bits) | $n$, rate 1/2 | rate 1/3 | rate 1/4 | rate 1/6 |
|---|---|---|---|---|
| 1784 | 3576 | 5364 | 7152 | 10728 |
| 3568 | 7144 | 10716 | 14288 | 21432 |
| 7136 | 14280 | 21420 | 28560 | 42840 |
| 8920 | 17848 | 26772 | 35696 | 53544 |

(Table 6-2 of the standard.)[^c-tc-spec] The block lengths were chosen for compatibility with
Reed-Solomon codeblocks of interleaving depth 1, 2, 4 and 5.[^c-tc-spec] The frame **is** the information block: the Transfer Frame length
must be 223, 446, 892 or 1115 octets, the only lengths whose performance CCSDS has validated.[^c-len]

**Encoding.** The $k$ bits are buffered and read twice: in natural order into component encoder a, and
in a permuted order into component encoder b. Both start from all-zero registers, run for $k+4$ bit
times, and during the last 4 the input switches to the feedback so that the registers return to zero
(trellis termination), still emitting symbols. For rate 1/3 the output is (out 0a, out 1a, out 1b)
repeated; rate 1/2 alternates (out 0a, out 1a, out 0a, out 1b).[^c-tc-enc] The permutation is defined by
a rule rather than a table, which was preferred for on-board implementation.[^g1-turbo] With
$k = k_1 k_2$, $k_1 = 8$, $k_2 = k/8$ and the primes $p_1 \ldots p_8$ = 31, 37, 43, 47, 53, 59, 61, 67,
for $s = 1 \ldots k$:[^c-tc-perm]

$$
\begin{aligned}
m &= (s-1) \bmod 2, &
i &= \left\lfloor \frac{s-1}{2k_2} \right\rfloor, &
j &= \left\lfloor \frac{s-1}{2} \right\rfloor - i\,k_2,\\
t &= (19i + 1) \bmod \frac{k_1}{2}, &
q &= t \bmod 8 + 1, &
c &= (p_q\, j + 21m) \bmod k_2,
\end{aligned}
$$

$$\pi(s) = 2\left(t + c\,\frac{k_1}{2} + 1\right) - m$$

and the $s$-th bit read into encoder b is bit $\pi(s)$ of the information block.[^c-tc-perm]

### Performance and caveats

* With 10 decoder iterations, a BER of 10⁻⁶ needs about −0.1 dB, 0.15 dB, 0.4 dB and 1.1 dB of
  $E_b/N_0$ for rates 1/6, 1/4, 1/3 and 1/2; the same thresholds give a FER of about 10⁻⁴. FER equals
  WER here because one codeword carries exactly one frame.[^g1-turboperf]
* At 8920 bits and BER 10⁻⁶, the corresponding turbo codes improve on the DSN's concatenated codes by
  0.9 to 1.6 dB.[^g1-turboperf]
* Decoding is iterative, with two soft-input soft-output APP decoders exchanging extrinsic information;
  the reference curves assume at least 6-bit channel symbols and 8-bit metrics. Stopping rules raise
  average decoder speed by 50 to 100 % at almost no cost in $E_b/N_0$. Latency is at least one block.[^g1-turbo][^g1-turboperf]
* Turbo curves flatten at an **error floor**; the CCSDS codes were designed to push it down to perhaps
  10⁻⁹ BER, against about 10⁻⁵ for the original turbo codes.[^g1-floor]
* Turbo codes are vulnerable to **burst noise** (for example a tumbling spacecraft or RF interference),
  a weakness inherited from the convolutional components; a channel interleaver would help but CCSDS has
  not specified one.[^g1-burst]
* The codes are non-transparent, so differential encoding cannot be used and phase ambiguity must be
  resolved (with the ASM) before decoding.[^c-tc-sync]
* A wide class of turbo codes is covered by a patent of France Télécom and Télédiffusion de France;
  the standard notes that the US patent (5,446,747) expired in 2012.[^c-pat]

ECSS-E-ST-50-01 kept only rates 1/2 and 1/4: rate 1/6 gains only about 0.2 dB over 1/4 at FER 10⁻⁴ while
expanding the bandwidth greatly, and rate 1/3 sits between the two.[^hb-cdiff] Turbo codes suit
power-limited links beyond low Earth orbit; the ECSS handbook notes that real-time turbo decoding was
hard above about 20 Mbit/s at the time.[^c-uplink][^hb-gains]

## LDPC codes

Low-Density Parity-Check codes are defined by a sparse parity-check matrix and decoded iteratively
by belief propagation.[^c-ldpc-gen][^g1-ldpcdec] CCSDS specifies two applications: coding each Transfer
Frame (section 7) and coding a stream of sync-marked frames (section 8).

### The rate-223/255 code "C2"

The (8160,7136) code, of rate about 7/8, is derived from a basic (8176,7156) code whose parity-check
matrix is a 2 × 16 array of 511 × 511 circulants of row weight 2 (a regular (4,32) code, rank 1020).
It is expurgated to (8176,7154), shortened by 18 virtual-fill zeros and extended by 2 zero bits:[^c-ldpc-c2][^g1-ldpcmat]

| Part | 18 virtual fill zeros | 7136 information bits | 1022 parity bits | 2 zero fill bits |
|---|---|---|---|---|
| Transmitted | no | yes | yes | yes |

The 7136-bit information length is a 892-octet Transfer Frame, the same as the (255,223) Reed-Solomon
code with $I = 4$, and all parameters are multiples of 32. It is used with the 32-bit ASM, and the only
allowed frame length is 892 octets.[^c-ldpc-c2][^c-ldpc-gen][^c-len] The Green Book describes it as the
near-Earth code: very high rate, fast convergence and limited complexity for data rates of hundreds of
Mb/s in a 375 MHz band.[^g1-ldpc]

### The AR4JA family (rates 1/2, 2/3, 4/5)

Nine codes from the AR4JA (Accumulate, Repeat-by-4, and Jagged Accumulate) family target deep space.[^g1-ldpc]
Their parity-check matrices are built from $M \times M$ permutation submatrices, the last $M$ code symbols
are punctured, and they use the 64-bit ASM.[^c-ldpc-ar4ja][^c-ldpc-gen]

| $k$ (bits) | Frame (octets) | $n$ rate 1/2 ($M$) | $n$ rate 2/3 ($M$) | $n$ rate 4/5 ($M$) |
|---|---|---|---|---|
| 1024 | 128 | 2048 (512) | 1536 (256) | 1280 (128) |
| 4096 | 512 | 8192 (2048) | 6144 (1024) | 5120 (512) |
| 16384 | 2048 | 32768 (8192) | 24576 (4096) | 20480 (2048) |

The values restate Tables 7-2 and 7-5.[^c-ldpc-ar4ja][^c-len] The design choices are explained in the
Green Book: the four rates (including C2) are spaced by about 1 dB on the capacity curve; the block
lengths by about 0.6 dB on the sphere-packing bound; keeping $k$ constant across rates lets the on-board
data handling build frames without knowing the code rate; and the irregular degree distribution gains
about 0.5 dB at rate 1/2.[^g1-ldpc]

Good belief-propagation implementations perform within about 0.1 dB of the published curves in the
waterfall region, but error floors vary between decoders. The rate-2/3 and rate-4/5 codes with
$k = 1024$ can show a floor near FER 10⁻⁶ unless the decoder uses more than 50 iterations, at least
8-bit messages and careful clipping.[^g1-ldpcdec] The 1/2, 2/3 and 4/5 codes are covered by a US patent
held by Caltech.[^c-pat]

### LDPC coding of a stream of SMTFs

Section 8 decouples the frame length from the code: an ASM is attached to every Transfer Frame, the
resulting **Sync-Marked Transfer Frames** (SMTFs) are concatenated into a stream, the stream is sliced into
$k$-bit information blocks, each is encoded, $m$ codewords (1 to 8) form a codeblock, the codeblock is
randomized, and a **Code Sync Marker** (CSM) is prepended.[^c-smtf][^c-mp]

```mermaid
flowchart LR
    F["Transfer Frames<br/>(any length ≤ 2048 octets TM)"] --> S["Prepend 32-bit ASM<br/>→ SMTF stream"]
    S --> SL["Slice into k-bit blocks"]
    SL --> E["LDPC encode<br/>(k → n)"]
    E --> CB["Group m codewords<br/>→ codeblock"]
    CB --> R["Randomize codeblock"]
    R --> C["Prepend CSM<br/>32-bit 1ACFFC1D (rate 7/8)<br/>64-bit 034776C7272895B0"]
```

The receiver therefore synchronizes twice: on the CSM for codeblocks, then on the (decoded,
derandomized) ASMs for frames. The CSM and the frame ASM may share the pattern `1ACFFC1D` without
conflict because the ASMs are randomized inside the codeblock. If a codeword fails to decode, the
Quality Indicator of every frame it touched is set.[^c-smtf][^c-smtf-rand] The maximum TM frame length is
then 2048 octets, as for uncoded data.[^c-len] Section 13 prescribes this option for AOS or USLP
ground-to-space links that use an SMTF stream.[^c-uplink]

## Frame validation

Every coding option must tell the upper layer whether a frame is good:[^c-func][^c-cc-gen][^c-rs-gen][^c-tc-gen][^c-ldpc-gen][^c-smtf][^c-mp]

| Coding | Validation mechanism | FECF |
|---|---|---|
| None | FECF | mandatory |
| Convolutional only | FECF | mandatory |
| Reed-Solomon (alone or concatenated) | RS decoder failure flag | optional (useful with $E$ = 8) |
| Turbo | FECF | mandatory |
| LDPC applied to frames | LDPC decoder | optional |
| LDPC applied to SMTF stream | LDPC decoder sets the Quality Indicator of the affected frames | optional |

The FECF's undetected-error rate is about $2^{-15} \approx 3 \times 10^{-5}$, many orders of magnitude worse
than the $E$ = 16 Reed-Solomon decoder, which is why the CRC is superfluous there but still needed in the
borderline cases ($E$ = 8, turbo).[^g1-crc] ECSS-E-ST-50-03C required the FECF whenever the frame is not
Reed-Solomon encoded.[^e03-fecf] The coding layer delivers data with the minimum possible residual errors
but provides no security; security belongs to higher layers or [SDLS](sdls.md).[^c-sec]

On the ground, the [SLE Return All Frames service](sle/return-services.md) reports the outcome per frame
as `good`, `erred` or `undetermined`. A frame is good if it consists only of valid Reed-Solomon or LDPC
codewords, or, for other codes, if its FECF checks. Good Reed-Solomon frames are delivered without their
check symbols; erred ones are delivered whole, check symbols included.[^raf]

## Allowed Transfer Frame lengths

The frame protocols do not fix the frame length, because the codes constrain it. Once chosen, the length
is fixed for a Physical Channel and Mission Phase, and it excludes the ASM.[^c-len]

| Case | Coding | Allowed Transfer Frame length |
|---|---|---|
| 1 | Uncoded | any whole number of octets, max 2048 (TM, AOS) or 65536 (USLP) |
| 2 | Convolutional only | as case 1 |
| 3 | Reed-Solomon only | $L = (255-2E-q)\,I$ octets; 32-bit compatibility optional |
| 4 | Concatenated | as case 3 |
| 5 | Turbo | 223, 446, 892 or 1115 octets |
| 6 | LDPC applied to frames | 892 octets (rate 7/8); 128, 512 or 2048 octets (rates 1/2, 2/3, 4/5) |
| 7 | LDPC applied to SMTF stream | max 2048 (TM, AOS) or 65536 (USLP) |

## Managed parameters

All managed parameters are fixed for every frame of a Physical Channel during a Mission Phase.[^c-mp]

| Group | Managed parameter | Allowed values |
|---|---|---|
| Selected options | Randomizer | Long (131071 bits), Short (255 bits), Absent |
| | Coding method | None, Convolutional, Reed-Solomon, Concatenated, Turbo, LDPC (frame), LDPC (SMTF stream) |
| Convolutional | Code rate | 1/2, 2/3, 3/4, 5/6, 7/8 |
| Reed-Solomon | Error correction capability $E$ | 8, 16 |
| | Interleaving depth $I$ | 1, 2, 3, 4, 5, 8 |
| | Virtual fill length $Q$ (symbols) | integer |
| Turbo | Nominal code rate | 1/2, 1/3, 1/4, 1/6 |
| | Information block length (bits) | 1784, 3568, 7136, 8920 |
| LDPC (frame) | Code rate | 1/2, 2/3, 4/5, 7/8 |
| | Information block length (bits) | 1024, 4096, 16384 (rates 1/2–4/5); 7136 (rate 7/8) |
| LDPC (SMTF stream) | Code rate; slice length | as LDPC (frame) |
| | Codeblock size $m$ (codewords) | 1 to 8 |
| Frame synchronization | Transfer Frame length (bits) | integer |

The table restates Tables 12-1 to 12-7. The standard also requires the FECF to be present when neither
Reed-Solomon nor LDPC is used.[^c-mp]

## Choosing a coding scheme

The ECSS handbook frames the choice as a trade between occupied bandwidth (which, with the data rate,
caps the usable code rate), the coding gain the link budget needs, and decoding complexity and data
rate.[^hb-gains] Missions first derive the FER they need and then pick the scheme.[^hb-crp] The Green
Book plots the same trade: turbo codes for power-constrained links, LDPC codes when bandwidth is the
constraint, and the classic RS and convolutional codes outperformed on both axes by the LDPC codes.[^g1-ldpcapp]

```mermaid
flowchart TD
    A["Required FER and data rate known"] --> B{"Bandwidth limited?"}
    B -- "yes, high rate" --> C["LDPC 223/255 (892-octet frames)<br/>or RS + punctured convolutional"]
    B -- "no, power limited" --> D{"Decoder can run turbo<br/>at this data rate?"}
    D -- yes --> E["Turbo 1/2 or 1/4<br/>(frames 223/446/892/1115 octets)<br/>or AR4JA LDPC 1/2"]
    D -- no --> F["RS (255,223) + convolutional (7,1/2), I = 5"]
    C --> G["Always: randomizer on, FECF if no RS/LDPC"]
    E --> G
    F --> G
```

!!! warning "Inference"
    The decision tree is this wiki's summary of the trade-offs stated in the ECSS handbook, the Green
    Book and §13 of the standard; neither document prescribes such a tree, and real missions also weigh
    ground-station decoder availability and heritage.[^hb-gains][^g1-ldpcapp][^c-uplink]

### Ground-to-space and space-to-space use

The codes were designed for telemetry, but AOS and USLP can also be used upwards and between
spacecraft. For such links CCSDS allows any of the turbo codes (best for power-limited links beyond low
Earth orbit, rates ≤ 1/2), any of the LDPC codes of section 7 (best for high-rate, bandwidth-limited
links with at least two code symbols per modulation symbol, such as QPSK), or the SMTF-stream LDPC
option. Low-rate turbo codes near threshold can put the symbol SNR below −5 dB, which demands unusually
narrow tracking loops.[^c-uplink] The telecommand link itself uses the different
[TC coding and CLTU](tc-coding-cltu.md) standard.

## Worked example: one Solar Orbiter frame on the link

Solar Orbiter's only TM frame length is 1115 octets, or 8920 bits.[^sol-tf] That is simultaneously a
turbo information block ($k$ = 8920) and a (255,223) Reed-Solomon codeblock with $I = 5$.[^c-tc-spec][^c-len]
The arithmetic below is **illustrative**, computed by this wiki from the formulas cited in each row; the
mission's actual coding configuration is discussed in the next section.

| Scheme | Codeblock or codeword | ASM | Channel symbols per frame | Information bits per symbol |
|---|---|---|---|---|
| Uncoded | 8920 bits | 32 | 8952 | 0.996 |
| RS (255,223), $I$ = 5 | 10,200 bits | 32 | 10,232 | 0.872 |
| RS $I$ = 5 + convolutional 1/2 | 10,232 × 2 | (encoded) | 20,464 | 0.436 |
| Turbo 1/2 | $(8920+4) \times 2$ = 17,848 | 64 | 17,912 | 0.498 |
| Turbo 1/4 | $(8920+4) \times 4$ = 35,696 | 128 | 35,824 | 0.249 |

The sources for the formulas are §4.3.8 (RS codeblock), §3.3 (rate 1/2 doubles every bit, ASM
included), §6.3 and §9.3 (turbo codeword and ASM lengths).[^c-rs-part][^c-cc-basic][^c-asm][^c-tc-spec][^c-tc-sync]
At the same symbol rate, switching from turbo 1/2 to turbo 1/4 therefore halves the frame rate, in
exchange for roughly 0.9 dB more coding gain at FER 10⁻⁴ (Table 5-2: 10.8 dB versus 11.7 dB).[^hb-gains]

## Solar Orbiter: turbo coding in the MIB

The Solar Orbiter [MIB](../missions/solar-orbiter/mib.md) reveals which codes the spacecraft actually
uses.[^mib]

* On board, parameter [NCFT1YN0](../explorer/index.md#/solo/param/NCFT1YN0) "OBC TM Turbo Encoding"
  (PTC 2, PFC 16, a status parameter) has the [textual calibration](../mib/calibration.md)
  [CCDT0345TM](../explorer/index.md#/solo/calib/txt/CCDT0345TM), described as "TTR encoding (tubocode))"
  [sic], with raw 0 = `TURBO_1_2` and raw 2 = `TURBO_1_4`. It is reported in the housekeeping packets
  (PUS 3,25) [SPID 30514](../explorer/index.md#/solo/packet/30514) "SYS Safe Mode Slow",
  [33793](../explorer/index.md#/solo/packet/33793) "PLF DST HK" and
  [33794](../explorer/index.md#/solo/packet/33794) "PLF RIU TM Statuses".[^mib]
* Parameter `NYP09104` "TM Encoding PSS" (subsystem `EGSE_GEN`, which suggests ground support
  equipment; the MIB does not expand it; unit `bps`) in
  "PSS HK Packet 1" (SPID 64901, APID 1940) uses calibration `CYPT9104TM` "TM Encoding Register", which
  maps the register values 1042 to `TurboRate 1/2` and 5138 to `TurboRate 1/4`.[^mib]
* SCOS-2000's internal **Time Correlation Report** (SPID 66840, type 164/1, APID 1966) contains, next
  to the correlation results, the fields "Bit rate" (`NYG02105`) and "Encoding scheme" (`NYG02106`).[^mib]
* The same definitions are present, unchanged, in the April 2020 MIB release.[^mib2020]

!!! warning "Inference"
    Only turbo rates 1/2 and 1/4 appear as calibrated values, which matches both the 1115-octet frame
    length (a valid turbo block) and the ECSS-E-ST-50-01 subset of turbo rates. That Solar Orbiter's
    downlink uses turbo coding at these two rates is deduced from MIB definitions; the TM/TC ICD in the
    library does not specify the coding scheme, and the meaning of the "PSS" register values (1042,
    5138) is not stated in the available sources.[^mib][^hb-cdiff][^sol-tf] Why the time-correlation
    report records the encoding scheme is also not stated; plausibly because coding changes the
    on-board and ground delays between clock sampling and frame time-stamping. The "TTR" in the
    calibration description plausibly refers to the on-board computer's TTRM board, which the ICD
    lists as hosting the TC decoder, the TM encoder and the on-board time.[^sol-ttrm]

??? example "SQL used"
    ```sql
    SELECT PCF_NAME, PCF_DESCR, PCF_PTC, PCF_PFC, PCF_CATEG, PCF_CURTX, PCF_UNIT, PCF_SUBSYS
      FROM pcf WHERE PCF_NAME IN ('NCFT1YN0','NYP09104','NYG02105','NYG02106');
    SELECT * FROM txf WHERE TXF_NUMBR IN ('CCDT0345TM','CYPT9104TM');
    SELECT * FROM txp WHERE TXP_NUMBR IN ('CCDT0345TM','CYPT9104TM');
    SELECT p.PLF_SPID, d.PID_TYPE, d.PID_STYPE, d.PID_APID, d.PID_DESCR
      FROM plf p JOIN pid d ON d.PID_SPID = p.PLF_SPID
     WHERE p.PLF_NAME IN ('NCFT1YN0','NYP09104','NYG02106');
    ```
    Run with `sqlite3 -readonly` on `solo-2025-09-16.sqlite` (and `solo-2020-04-16.sqlite` for the
    comparison). Table references: [PCF](../mib/tables/pcf.md), [TXF](../mib/tables/txf.md),
    [TXP](../mib/tables/txp.md), [PLF](../mib/tables/plf.md), [PID](../mib/tables/pid.md).

A small curiosity from the ground segment: the Solar Orbiter RAPID archive files, which mirror SCOS-2000
packet archives, carry in every record a fixed "sync marker" (SM) field of value `1ACFFC1D`, the same
pattern as the space-link ASM.[^ddid-rapid]

## Transparency and bit remappings

Inverting the received symbols (a 180° phase error with BPSK) inverts the output of a transparent code.
The convolutional and Reed-Solomon codes are transparent (Reed-Solomon only without virtual fill), the
turbo and LDPC codes are not, so their phase ambiguity must be resolved before decoding, typically with
the ASM.[^c-defs][^g1-cc][^g1-rs][^c-tc-gen][^c-tc-sync][^c-ldpc-gen] The optional NRZ-L to NRZ-M conversion is a differential
precoding that resolves the ambiguity for transparent codes; placed at the output of a convolutional
encoder it costs a lot of performance, which is why it is only allowed before the encoder (or, the
Green Book notes, between the outer and inner codes, which the Blue Book does not clearly permit).[^g1-transp]

## Related pages

* [TM Space Data Link Protocol](tm-sdlp.md) — the frames this sublayer carries.
* [AOS](aos.md), [USLP](uslp.md) — other users of the same coding sublayer.
* [TC synchronization and channel coding: the CLTU](tc-coding-cltu.md) — the uplink counterpart.
* [SLE return services](sle/return-services.md) — how decoded frames reach the control centre.
* [Downlink overview](../overview/downlink.md), [CCSDS overview](index.md), [glossary](../glossary.md).

[^c-ctl]: [CCSDS 131.0-B-5, TM Synchronization and Channel Coding](../library/ccsds-131-0-131x0b5.md), Document Control, PDF p. 7.
[^c-purpose]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §1.1, PDF p. 13.
[^c-defs]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §1.6.1.3 (definitions), PDF pp. 16–18.
[^c-pat]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §1.7 and Annex B3, PDF pp. 19 and 86.
[^c-arch]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §2.1, PDF p. 21.
[^c-func]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §2.2, PDF pp. 21–23.
[^c-org]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §2.3 and Figures 2-2, 2-3, PDF pp. 23–25.
[^c-cc-gen]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§3.1–3.2, PDF pp. 26–27.
[^c-cc-basic]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §3.3, PDF pp. 27–28.
[^c-cc-punct]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §3.4 and Table 3-1, PDF p. 29.
[^c-rs-gen]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§4.1–4.2, PDF p. 30.
[^c-rs-param]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§4.3.1–4.3.4, PDF pp. 30–31.
[^c-rs-il]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§4.3.5–4.3.7, PDF pp. 32–33.
[^c-rs-part]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §4.3.8 and Figure 4-1, PDF pp. 33–34.
[^c-rs-dual]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§4.3.9–4.3.10, PDF pp. 34–35.
[^c-rs-disc]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §4.4.1, PDF pp. 35–37.
[^c-concat]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §5, PDF p. 38.
[^c-tc-gen]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§6.1–6.2, PDF p. 39.
[^c-tc-spec]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §6.3 a) to f), Tables 6-1 and 6-2, PDF pp. 39–41.
[^c-tc-perm]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §6.3 g) and Table 6-3, PDF pp. 41–43.
[^c-tc-enc]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §6.3 h) to j), PDF pp. 43–45.
[^c-tc-sync]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §6.3 k) and Figure 6-4, PDF pp. 46–47.
[^c-ldpc-gen]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§7.1–7.2, PDF pp. 48–49.
[^c-ldpc-c2]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §7.3, PDF pp. 49–54.
[^c-ldpc-ar4ja]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §7.4, Tables 7-2 and 7-5, PDF pp. 54–58.
[^c-smtf]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§8.1–8.2 and Table 8-1, PDF pp. 59–62.
[^c-smtf-rand]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §8.3, PDF pp. 62–63.
[^c-sync-ov]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §9.1 and Table 9-1, PDF pp. 64–65.
[^c-asm]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§9.2–9.3 and Figures 9-1 to 9-5, PDF pp. 65–67.
[^c-asm-loc]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§9.4–9.5, PDF pp. 67–68.
[^c-asm-emb]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §9.6, PDF p. 68.
[^c-rand-ov]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §§10.1–10.2, PDF p. 69.
[^c-rand-sync]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §10.3, PDF p. 70.
[^c-rand-seq]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §10.4, PDF pp. 70–71.
[^c-len]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §11 (Transfer Frame lengths), PDF pp. 73–75.
[^c-mp]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §12 and Tables 12-1 to 12-7, PDF pp. 76–79.
[^c-uplink]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), §13, PDF pp. 80–81.
[^c-svc]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), Annex A (service), PDF pp. 82–84.
[^c-sec]: [CCSDS 131.0-B-5](../library/ccsds-131-0-131x0b5.md), Annex B1 (security considerations), PDF pp. 85–86.
[^g1-why]: [CCSDS 130.1-G-3, TM Synchronization and Channel Coding—Summary of Concept and Rationale](../library/ccsds-130-1-130x1g3e1.md), §3.1, PDF p. 25.
[^g1-meas]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §3.3.1, PDF pp. 27–28.
[^g1-limits]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §3.3.2, PDF pp. 28–30.
[^g1-perf]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §3.3.3, PDF p. 30.
[^g1-cc]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§4.1–4.2, PDF pp. 32–34.
[^g1-viterbi]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §4.4, PDF pp. 35–38.
[^g1-ccperf]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§4.5–4.7, PDF pp. 38–44.
[^g1-rs]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§5.1–5.2 and Figure 5-3, PDF pp. 45–48.
[^g1-rsil]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §5.3, PDF pp. 48–49.
[^g1-rsdec]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§5.4–5.5 and Figure 5-9, PDF pp. 49–54.
[^g1-concat]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§6.1–6.2, PDF pp. 55–57.
[^g1-concatperf]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §6.3, PDF pp. 59–64.
[^g1-turbo]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§7.1–7.3, PDF pp. 68–74.
[^g1-turboperf]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§7.4.1–7.4.2, PDF pp. 74–78.
[^g1-floor]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §7.4.3, PDF pp. 80–81.
[^g1-burst]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §7.4.4, PDF pp. 82–83.
[^g1-ldpc]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §8.1, PDF pp. 84–85.
[^g1-ldpcapp]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §8.2 and Figure 8-1, PDF pp. 85–86.
[^g1-ldpcmat]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §8.3, PDF pp. 87–89.
[^g1-ldpcdec]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§8.5–8.7, PDF pp. 91–94.
[^g1-hdr]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §9.2.4, PDF pp. 98–100.
[^g1-randuse]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §9.2.5, PDF pp. 100–101.
[^g1-fsync]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§9.3.1–9.3.6, PDF pp. 101–104.
[^g1-fsimpl]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §9.3.7 and Figure 9-3, PDF pp. 104–109.
[^g1-crc]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §9.4.4, PDF pp. 114–115.
[^g1-transp]: [CCSDS 130.1-G-3](../library/ccsds-130-1-130x1g3e1.md), §§9.5–9.6, PDF pp. 115–117.
[^hb-tf]: [ECSS-E-HB-50A, Communications guidelines](../library/ecss-e-hb-50a-15november2008.md), §4.6.2.1, PDF p. 54.
[^hb-cdiff]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §4.5.3 (differences of ECSS-E-ST-50-01 from CCSDS 131.0-B-1), PDF pp. 50–51.
[^hb-crp]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §4.5.5 (recommended practice), PDF p. 52.
[^hb-gains]: [ECSS-E-HB-50A](../library/ecss-e-hb-50a-15november2008.md), §5.2.2 and Table 5-2, PDF pp. 124–126.
[^b3-lower]: [CCSDS 132.0-B-3, TM Space Data Link Protocol](../library/ccsds-132-0-132x0b3.md), §2.4, PDF pp. 30–31.
[^b3-oid]: [CCSDS 132.0-B-3](../library/ccsds-132-0-132x0b3.md), §4.1.4.6 and Annex D, PDF pp. 69–70 and 112.
[^e03-async]: [ECSS-E-ST-50-03C, Telemetry transfer frame protocol](../library/ecss-e-st-50-03c-31july2008.md), §5.4.4, PDF p. 27.
[^e03-fecf]: [ECSS-E-ST-50-03C](../library/ecss-e-st-50-03c-31july2008.md), §5.6.1, PDF p. 29.
[^e50-adopt]: [ECSS-E-ST-50C Rev.1, Communications](../library/ecss-e-st-50c-rev-1-1march2021.md), table of adoption notices, PDF p. 20.
[^as25-ctx]: [ECSS-E-AS-50-25C Rev.1](../library/ecss-e-as-50-25c-rev-1-13january2023.md), Bibliography, PDF p. 23.
[^raf]: [CCSDS 911.1-B-5, SLE Return All Frames Service](../library/ccsds-911-1-911x1b5e1.md), §§2.4.1–2.4.2, PDF pp. 27–28, and §3.6.2.6, PDF p. 79.
[^tco]: [EGOS-MCS-S2K-TN-1030, Technical Note – Time Correlation](../library/tn-1030-time-correlation.md), §6.1, PDF p. 26.
[^mex-tc]: [RO-ESC-IF-5003 / MEX-ESC-IF-5003, Rosetta/Mars Express MCS DDID, Issue B5](../library/mex-esc-if-5003-b5.md), §18.1.2.1.1, PDF p. 127.
[^sol-tf]: [SOL.S.ASTR.TN.00079, Solar Orbiter TM-TC and Packet Structure ICD, Issue 7](../library/sol-s-astr-tn-00079-07.md), §4.3, requirement PUS-242, PDF p. 27.
[^sol-ttrm]: [SOL.S.ASTR.TN.00079](../library/sol-s-astr-tn-00079-07.md), Annex 8, §13.1 (Application Process ID assignment, process ID 10 "OBC CSW"), PDF p. 273.
[^ddid-rapid]: [SOL-ESC-IF-05011, Solar Orbiter Data Delivery ICD, Issue 1 Rev 2](../library/solo-ddid-i1r2.md), §10.5 (RAPID record structure), PDF p. 35.
[^mib]: [Solar Orbiter MIB release MIB__20250916M25925PFMS001_SOL](../library/mib-20250916m25925pfms001-sol.md), tables `pcf`, `txf`, `txp`, `plf`, `pid`, queried by this wiki (see "SQL used").
[^mib2020]: [Solar Orbiter MIB release MIB__20200416M10720PFMS001_SOL](../library/mib-20200416m10720pfms001-sol.md), tables `pcf` and `txp`, queried by this wiki.
