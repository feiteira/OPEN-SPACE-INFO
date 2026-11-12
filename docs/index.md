---
title: OPEN-SPACE-INFO
description: An open, cited, interlinked wiki of how spacecraft talk to the ground — CCSDS, ECSS PUS, SLE, SCOS-2000 and the MIB, with a full explorer of the public Solar Orbiter MIB.
hide:
  - navigation
  - toc
sources: []
---

<div class="osi-hero" markdown>
<div class="osi-hero__inner" markdown>
<p class="osi-hero__kicker">Spacecraft telemetry &amp; telecommand, explained from the sources</p>

# How spacecraft talk to the ground

<p class="osi-hero__lead">One open wiki covers the whole chain, from a bit in an on-board packet to a value on an operator's screen. It explains the CCSDS protocols, the ECSS Packet Utilization Standard, Space Link Extension, ESA's SCOS-2000 mission control system and its Mission Information Base. Every statement cites the document and page it comes from.</p>

[Start here](overview/index.md){ .md-button .md-button--primary .osi-btn-lg }
[Open the MIB Explorer](explorer/index.md){ .md-button .osi-btn-lg .osi-btn-ghost }

<p class="osi-hero__prov">All information on this site was retrieved from sources publicly available online. <a href="about/sources-and-copies/">See every source →</a></p>
</div>
</div>

<div class="osi-stats">
<a class="osi-stat" href="library/"><span>197</span>source documents &amp; datasets</a>
<a class="osi-stat" href="references/"><span>1,506</span>referenced documents catalogued</a>
<a class="osi-stat" href="explorer/#/solo/search/params/"><span>126,745</span>Solar Orbiter TM parameters</a>
<a class="osi-stat" href="explorer/#/solo/search/commands/"><span>5,454</span>telecommands with full definitions</a>
</div>

## The chain, layer by layer

<div class="osi-stack">
  <a href="ecss/pus/" class="l-app"><b>Application</b><span>PUS services: housekeeping, events, commanding, scheduling…</span></a>
  <a href="ccsds/space-packet/" class="l-net"><b>Packet</b><span>CCSDS Space Packet: APID, sequence count, length</span></a>
  <a href="ccsds/tm-sdlp/" class="l-link"><b>Data link</b><span>TM · TC · AOS · USLP frames, COP-1, SDLS</span></a>
  <a href="ccsds/tm-coding/" class="l-code"><b>Sync &amp; coding</b><span>ASM, randomiser, Reed-Solomon, LDPC · CLTU &amp; BCH</span></a>
  <a href="scos2000/nctrs-nis/" class="l-gs"><b>Ground station</b><span>ESTRACK, IFMS, NCTRS/NIS</span></a>
  <a href="ccsds/sle/" class="l-sle"><b>Space Link Extension</b><span>RAF · RCF · ROCF · FCLTU over TCP/IP</span></a>
  <a href="scos2000/" class="l-mcs"><b>Mission control</b><span>SCOS-2000, driven by the MIB</span></a>
  <a href="scos2000/edds/" class="l-dist"><b>Archives &amp; users</b><span>PARC · DARC · FARC → EDDS → science teams</span></a>
</div>

## Explore the wiki

<div class="grid cards" markdown>

-   :material-satellite-variant:{ .lg .middle } **Start here**

    ---

    The big picture, with step-by-step downlink and uplink walkthroughs and two worked examples built on real Solar Orbiter definitions.

    [:octicons-arrow-right-24: How it all fits together](overview/index.md)

-   :material-layers-triple:{ .lg .middle } **CCSDS standards**

    ---

    Space Packet, TM/TC/AOS/USLP transfer frames, channel coding, CLTU, COP-1, SDLS, time codes, CFDP, XTCE and SLE, with every header drawn bit by bit.

    [:octicons-arrow-right-24: The protocol stack](ccsds/index.md)

-   :material-package-variant-closed:{ .lg .middle } **ECSS & PUS**

    ---

    The Packet Utilization Standard (PUS-C, 2016, and PUS-A, 2003), with a page for every service and a catalogue of all message types.

    [:octicons-arrow-right-24: Packet Utilization Standard](ecss/pus/index.md)

-   :material-monitor-dashboard:{ .lg .middle } **SCOS-2000**

    ---

    ESA's mission control system: history, architecture, EGSE use, time correlation, EDDS/GDDS/TDRS data dissemination, archives, NCTRS/NIS and EGS-CC.

    [:octicons-arrow-right-24: SCOS-2000](scos2000/index.md)

-   :material-database-cog:{ .lg .middle } **The MIB**

    ---

    The Mission Information Base explained concept by concept and table by table, from the Database Import ICD.

    [:octicons-arrow-right-24: The MIB](mib/index.md)

-   :material-database-search:{ .lg .middle } **MIB Explorer**

    ---

    Every parameter, packet, calibration, limit, telecommand and sequence of the public Solar Orbiter MIB, each with its own address.

    [:octicons-arrow-right-24: Explore](explorer/index.md)

-   :material-rocket-launch:{ .lg .middle } **Missions**

    ---

    Solar Orbiter in depth, plus Herschel/Planck, Rosetta, Mars Express, Venus Express and other SCOS-2000 users.

    [:octicons-arrow-right-24: Missions](missions/index.md)

-   :material-bookshelf:{ .lg .middle } **Library & references**

    ---

    Every source with its summary, contents, reference list, original link and copy time, plus a catalogue of everything those sources cite.

    [:octicons-arrow-right-24: Library](library/index.md)

</div>

!!! info "Independent and sourced"
    This is a community wiki. It is not affiliated with or endorsed by ESA, CCSDS, ECSS or any mission. Everything here was compiled
    from publicly available documents, all listed with links back to their originals on [Sources & copies](about/sources-and-copies.md).
    Wiki text and code are MIT-licensed. Read how the pages were produced in [Methodology](about/methodology.md).
