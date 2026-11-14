// OPEN-SPACE-INFO Solar Orbiter simulator: page UI.
import { Ephemeris, STATIONS, hex, parseTmHeader, ptcName, bitWidth, OBT_EPOCH_MS, obtOf } from "./core.js";
import { Simulator, FAILURES, HK, CONFIG, ARCHIVE, missionProfile, SSMM_GBIT, CONJ_SEP, rsWindows, SA_TARGET_C, HGA_BEAM_OK, relText } from "./model.js";
import { LineChart, fmtNum, fmtUtc } from "./charts.js";

const THREE_URL = "https://unpkg.com/three@0.160.0/build/three.module.js";
const root = document.getElementById("osi-sim");
const BASE = root.dataset.base || "data/";
const WIKI = root.dataset.wiki || "../";
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const h = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (k === "class") e.className = v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v); } if (html) e.innerHTML = html; return e; };
const paramLink = (n) => `<a class="sim-pname" href="${WIKI}explorer/#/solo/param/${encodeURIComponent(n)}" title="Open ${esc(n)} in the MIB Explorer">${esc(n)}</a>`;
const pktLink = (s) => `<a href="${WIKI}explorer/#/solo/packet/${s}" title="Open packet ${s} in the MIB Explorer">${s}</a>`;
const tcLink = (c) => `<a href="${WIKI}explorer/#/solo/command/${encodeURIComponent(c)}" title="Open ${esc(c)} in the MIB Explorer">${esc(c)}</a>`;
const seqLink = (c) => `<a href="${WIKI}explorer/#/solo/sequence/${encodeURIComponent(c)}" title="Open sequence ${esc(c)} in the MIB Explorer">${esc(c)}</a>`;
const listJoin = (a) => (a.length > 1 ? a.slice(0, -1).join(", ") + " and " + a[a.length - 1] : a.join(""));
const IFTT = { Y: "contains execution time-tagged commands", B: "may be loaded on-board time-tagged or ground time-tagged; the simulator uses the ground release times", N: "no execution time tags" };
// Charts tab: real MIB parameters grouped by subsystem; the short labels are the direct line labels.
const CHART_GROUPS = [
  { key: "sa", label: "Solar arrays", charts: [
    { title: "Solar-array wing temperatures", params: [["NRU02263", "PY wing"], ["NRU02266", "MY wing"]] },
    { title: "Solar-array position, SADE A sensors", params: [["NCFT55P0", "PY"], ["NCFT55U0", "MY"]] },
    { title: "Solar-array drive mechanism temperatures", params: [["NCFT55Y0", "PY"], ["NCFT5600", "MY"]] },
  ] },
  { key: "aocs", label: "AOCS", charts: [
    { title: "Reaction-wheel speeds", params: [["NCASXAG0", "RW1"], ["NCASXB10", "RW2"], ["NCASXBK0", "RW3"], ["NCASXC40", "RW4"]], bands: "wol" },
    { title: "Wheel friction-torque estimates", params: [["NCAD6VZ1", "RW1"], ["NCAD6VZ2", "RW2"], ["NCAD6VZ3", "RW3"], ["NCAD6VZ4", "RW4"]], bands: "wol" },
    { title: "Attitude error", params: [["NCAD4NP1", "X"], ["NCAD4NP2", "Y"], ["NCAD4NP3", "Z"]], bands: "wol" },
    { title: "Estimated body rate", params: [["NCAD6VN1", "X"], ["NCAD6VN2", "Y"], ["NCAD6VN3", "Z"]] },
    { title: "Distance from the Sun, on-board ephemeris", params: [["NCASX003", "distance"]], unit: "au" },
  ] },
  { key: "thermal", label: "Thermal", charts: [
    { title: "Battery temperature", params: [["NRU02341", "battery"]] },
    { title: "Antenna temperatures", params: [["NRU02664", "HGA"], ["NRU02673", "MGA"], ["NRU02663", "LGA"]] },
    { title: "Avionics temperatures", params: [["NRU02301", "OBC"], ["NRU02275", "PCDU"], ["NRU02310", "RIU"]] },
    { title: "PHI telescope HREW temperatures", params: [["NRU02721", "HRT"], ["NRU02783", "FDT"]] },
    { title: "Transmitter temperatures", params: [["NRU02231", "TWTA-1"], ["NRU02230", "DST-1"]] },
  ] },
  { key: "comms", label: "Communications", charts: [
    { title: "HGA acquired azimuth and elevation", params: [["NCFT29S0", "azimuth"], ["NCFT29T0", "elevation"]], wrap: 360 },
    { title: "HGA pointing error", params: [["NCFT29V0", "azimuth"], ["NCFT29X0", "elevation"]], bands: "pass" },
    { title: "TWTA EPC-1 helix current", params: [["NRU02141", "helix"]], bands: "pass" },
    { title: "TWTA EPC-1 anode voltage", params: [["NRU02142", "anode"]], bands: "pass" },
  ] },
];
const WINDOWS = [["live", "Live TM", 0], ["6h", "6 h", 6 * 3600e3], ["1d", "1 day", 86400e3], ["7d", "7 days", 7 * 86400e3]];
const UNITS = { DegC: "°C", degC: "°C", deg: "°", "dg/s": "°/s" };
// smallest y range per unit, so that a steady signal is not blown up into quantisation noise
const MIN_SPAN = { "°C": 2, "°": 1, "°/s": 0.02, rpm: 20, mA: 0.02, V: 2, au: 0.002 };
const SPEEDS = [[1, "1×"], [10, "10×"], [60, "1 min/s"], [600, "10 min/s"], [3600, "1 h/s"], [21600, "6 h/s"], [86400, "1 day/s"], [432000, "5 days/s"]];
const STATUS = {
  OK: ["ok", "✓", "OK"], S: ["soft", "▲", "Soft limit"], H: ["hard", "✖", "Hard limit"], INV: ["inv", "?", "Invalid"], NS: ["ns", "·", "Not simulated"],
};
const fmtDur = (s) => { s = Math.max(0, s); if (s < 90) return s.toFixed(0) + " s"; if (s < 5400) return (s / 60).toFixed(1) + " min"; if (s < 172800) return (s / 3600).toFixed(1) + " h"; return (s / 86400).toFixed(1) + " d"; };
const fmtEng = (v, p) => {
  if (v === null || v === undefined) return "–";
  if (typeof v === "string") return esc(v);
  const a = Math.abs(v);
  if (p && p.ptc === 3 && !p.cal) return String(Math.round(v));
  if (a !== 0 && (a < 1e-3 || a >= 1e7)) return v.toExponential(4);
  return v.toFixed(a >= 1000 ? 1 : a >= 10 ? 2 : 4);
};
const fmtRaw = (r, p) => {
  if (r === null || r === undefined) return "–";
  if (typeof r === "string") return "0x" + r.toUpperCase();
  if (p && p.ptc === 5) return r.toPrecision(7);
  const n = bitWidth(p.ptc, p.pfc), u = r < 0 ? r + 2 ** n : r;
  return `${r} <span class="sim-mut">0x${u.toString(16).toUpperCase().padStart(Math.ceil(n / 4), "0")}</span>`;
};

async function boot() {
  root.innerHTML = `<div class="sim-loading">Loading the Solar Orbiter MIB subset and the JPL Horizons ephemeris…</div>`;
  let mib, eph;
  try {
    [mib, eph] = await Promise.all([fetch(BASE + "mib.json").then((r) => r.json()), fetch(BASE + "ephem.json").then((r) => r.json())]);
  } catch (e) { root.innerHTML = `<div class="sim-loading">Could not load the simulator data (${esc(e.message)}).</div>`; return; }
  const ephem = new Ephemeris(eph);
  const sim = new Simulator(mib, ephem);
  // shareable state in the URL hash: #t=2027-02-07T12:00&speed=600&tab=tm&view=craft&pkt=33582
  const q = new URLSearchParams(location.hash.slice(1));
  const tq = q.get("t") ? Date.parse(q.get("t").length <= 16 ? q.get("t") + "Z" : q.get("t")) : NaN;
  if (Number.isFinite(tq)) sim.reset(tq);
  else if (!sim.link.pass) {
    // start at the next Malargüe pass so that telemetry flows straight away
    const np = sim.passes.next(sim.t, sim.stationsOn);
    if (np && np.aos - sim.t < 30 * 3600000) { sim.reset(np.aos + 30000); sim.log("info", "Simulation starts at the next Malargüe pass after the real current time"); }
  }
  if (q.get("speed")) sim.speed = +q.get("speed");
  if (q.get("paused")) sim.running = false;
  for (const f of (q.get("fail") || "").split(",").filter((x) => FAILURES[x])) sim.setFailure(f, true);
  const ui = new UI(root, sim, mib, eph, q);
  window.addEventListener("hashchange", () => {
    const h2 = new URLSearchParams(location.hash.slice(1));
    const seq = mib.seqs && mib.seqs[h2.get("seq")] ? h2.get("seq") : null;
    if (!h2.get("t") && !seq) return;
    const t2 = h2.get("t") ? Date.parse(h2.get("t").length <= 16 ? h2.get("t") + "Z" : h2.get("t")) : NaN;
    if (Number.isFinite(t2)) { sim.jump(t2); ui.afterJump(); }
    if (seq) { ui.seqSel = seq; ui.tcMode = "seq"; if (ui.tab === "tc" && !h2.get("tab")) ui.renderPanel(); }
    if (h2.get("speed")) { sim.speed = +h2.get("speed"); ui.el.speed.value = h2.get("speed"); }
    if (h2.get("view")) ui.root.querySelector(`[data-view="${h2.get("view") === "craft" ? "craft" : "system"}"]`)?.click();
    if (WINDOWS.some((w) => w[0] === h2.get("win"))) ui.plotWin = h2.get("win");
    if (CHART_GROUPS.some((g) => g.key === h2.get("grp")) || ["all", "star"].includes(h2.get("grp"))) ui.plotGroup = h2.get("grp");
    const tab = h2.get("tab") || (h2.get("win") || h2.get("grp") ? "plots" : seq ? "tc" : null);
    if (tab) ui.root.querySelector(`[data-tab="${tab}"]`)?.click();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

class UI {
  constructor(root, sim, mib, eph, q = new URLSearchParams()) {
    this.root = root; this.sim = sim; this.mib = mib; this.ephRaw = eph;
    this.tab = ["tm", "plots", "profile", "packets", "tc", "ops"].includes(q.get("tab")) ? q.get("tab") : "plots";
    this.plotWin = WINDOWS.some((w) => w[0] === q.get("win")) ? q.get("win") : "1d";
    this.plotGroup = CHART_GROUPS.some((g) => g.key === q.get("grp")) || q.get("grp") === "star" ? q.get("grp") : "all";
    this.pktFilter = HK[q.get("pkt")] || ["synth", "verif"].includes(q.get("pkt")) ? q.get("pkt") : "33501";
    this.initialView = q.get("view") === "craft" ? "craft" : "system"; this.selPkt = null; this.plotList = (q.get("star") || "").split(",").filter((n) => mib.params[n]);
    this.tcSel = "ZCD01101"; this.tcVals = {};
    this.seqSel = mib.seqs && mib.seqs[q.get("seq")] ? q.get("seq") : "ADMF011E"; this.seqVals = {};
    this.tcMode = mib.seqs && mib.seqs[q.get("seq")] ? "seq" : "tc";
    if (this.tcMode === "seq" && !q.get("tab")) this.tab = "tc";
    this.charts = new Map(); this.profile = null;
    this.build();
    sim.on((k, d) => this.onSim(k, d));
    this.loadThree();
    let last = performance.now(), lastUi = 0;
    const loop = (now) => {
      const dt = (now - last) / 1000; last = now;
      sim.tick(dt);
      if (this.views) { this.views.update(sim.t); this.views.render(); }
      if (now - lastUi > 200) { lastUi = now; this.refresh(); }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    new MutationObserver(() => this.redrawCharts()).observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
  }
  async loadThree() {
    try {
      const THREE = await import(THREE_URL);
      const { Views } = await import("./view3d.js");
      this.views = new Views(THREE, this.el.view, this.sim, this.el.labels);
      this.el.viewMsg.hidden = true;
      if (this.initialView === "craft") this.root.querySelector('[data-view="craft"]').click();
    } catch (e) {
      console.error(e);
      this.el.viewMsg.textContent = "The 3D view needs WebGL and the three.js library from unpkg.com (" + e.message + "). Everything else works without it.";
    }
  }
  // ---------------------------------------------------------------- layout
  build() {
    const sim = this.sim;
    this.root.innerHTML = "";
    const bar = h("div", { class: "sim-bar" });
    bar.innerHTML = `
      <div class="sim-clock"><div class="sim-utc" data-k="utc"></div><div class="sim-sub" data-k="sub"></div></div>
      <div class="sim-transport">
        <button class="sim-btn sim-play" data-k="play" title="Play / pause (space)"></button>
        <label class="sim-field"><span>Speed</span><select data-k="speed">${SPEEDS.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></label>
        <label class="sim-field sim-jump"><span>Go to</span><select data-k="jump"><option value="">Mission event…</option><option value="now">Today (real date)</option>${sim.eph.events.filter((e) => e.kind !== "start").map((e) => `<option value="${e.t}">${e.utc.slice(0, 10)} · ${esc(e.label)}</option>`).join("")}</select></label>
        <button class="sim-btn" data-k="nextpass" title="Jump to the next acquisition of signal">Next pass ▸</button>
      </div>
      <div class="sim-link" data-k="link"></div>`;
    const main = h("div", { class: "sim-main" });
    main.innerHTML = `
      <div class="sim-viewbox">
        <div class="sim-viewtabs" role="tablist">
          <button data-view="system" class="on">Inner solar system</button><button data-view="craft">Spacecraft</button>
          <span class="sim-sp"></span>
          <button data-cam="default" title="Reset the camera">Reset view</button><button data-cam="top" class="sim-sys-only">Ecliptic, from above</button><button data-cam="edge" class="sim-sys-only">Edge-on</button>
          <label class="sim-chk sim-sys-only"><input type="checkbox" data-k="follow"> Follow</label>
        </div>
        <div class="sim-view" data-k="view"><div class="sim-labels" data-k="labels"></div><div class="sim-viewmsg" data-k="viewMsg">Loading the 3D view…</div>
          <div class="sim-legend" data-k="legend"></div>
          <div class="sim-hint">Drag to rotate · wheel or pinch to zoom · shift-drag to pan</div></div>
      </div>
      <aside class="sim-state" data-k="state"></aside>`;
    const tabs = h("div", { class: "sim-tabs", role: "tablist" });
    const TABS = [["plots", "Charts"], ["tm", "Telemetry"], ["profile", "Mission profile"], ["packets", "Packets"], ["tc", "Commanding"], ["ops", "Failures & log"]];
    tabs.innerHTML = TABS.map(([k, l]) => `<button data-tab="${k}" class="${k === this.tab ? "on" : ""}">${l}<span class="sim-badge" data-badge="${k}"></span></button>`).join("");
    const panel = h("div", { class: "sim-panel" });
    this.root.append(bar, main, tabs, panel);
    this.el = {};
    for (const n of this.root.querySelectorAll("[data-k]")) this.el[n.dataset.k] = n;
    this.el.panel = panel;
    this.el.speed.value = String(sim.speed);
    this.el.play.addEventListener("click", () => { sim.running = !sim.running; this.refresh(); });
    this.el.speed.addEventListener("change", () => { sim.speed = +this.el.speed.value; });
    this.el.jump.addEventListener("change", () => {
      const v = this.el.jump.value; if (!v) return;
      sim.jump(v === "now" ? Date.now() : +v - 6 * 3600000); this.el.jump.value = ""; this.afterJump();
    });
    this.el.nextpass.addEventListener("click", () => {
      const p = sim.passes.next(sim.t, sim.stationsOn);
      if (p) { sim.jump(p.aos - 2 * 60000); this.afterJump(); }
    });
    main.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => {
      main.querySelectorAll("[data-view]").forEach((x) => x.classList.toggle("on", x === b));
      this.viewMode = b.dataset.view; this.root.classList.toggle("sim-mode-craft", this.viewMode === "craft");
      if (this.views) this.views.setMode(b.dataset.view);
      this.legend();
    }));
    main.querySelectorAll("[data-cam]").forEach((b) => b.addEventListener("click", () => this.views && this.views.resetCamera(b.dataset.cam)));
    this.el.follow.addEventListener("change", () => { if (this.views) this.views.follow = this.el.follow.checked; });
    tabs.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => { this.tab = b.dataset.tab; tabs.querySelectorAll("[data-tab]").forEach((x) => x.classList.toggle("on", x === b)); this.renderPanel(); }));
    document.addEventListener("keydown", (e) => { if (e.key === " " && e.target === document.body) { e.preventDefault(); sim.running = !sim.running; this.refresh(); } });
    this.viewMode = "system";
    this.legend();
    this.renderPanel();
    this.refresh();
  }
  legend() {
    this.el.legend.innerHTML = this.viewMode === "craft"
      ? `<div><i style="background:#ffc44d"></i>Sun direction (+X, heat shield)</div><div><i style="background:#5aa0ff"></i>Earth direction and HGA beam</div><div class="sim-mut">Schematic model, not to scale or engineering-accurate</div>`
      : `<div><i style="background:#4fe3f0"></i>Solar Orbiter (past track bright, future dim)</div><div><i style="background:#34d17a"></i>Radio link: green downlink, amber uplink only, grey none</div><div><i style="background:#e8d6a0"></i>Venus · <i style="background:#5aa0ff"></i>Earth · <i style="background:#9a9a9a"></i>Mercury · dots: gravity assists</div><div class="sim-mut">Positions from JPL Horizons; bodies not to scale</div>`;
  }
  afterJump() { this.charts.forEach((c) => c.set(null)); this.selPkt = null; this.renderPanel(); this.refresh(); }
  onSim(kind) {
    if ((kind === "tc" || kind === "seq") && this.tab === "tc") { this.renderTcHistory(); this.renderSeqRuns(); if (this.tcMode === "seq") this.renderSeqPlan(); }
    if (kind === "log") this.logDirty = true;
  }
  // ---------------------------------------------------------------- periodic refresh
  refresh() {
    const sim = this.sim, g = sim.geo, sc = sim.sc, lk = sim.link;
    this.el.play.textContent = sim.running ? "❚❚ Pause" : "▶ Play";
    this.el.play.classList.toggle("paused", !sim.running);
    this.el.utc.textContent = fmtUtc(sim.t) + " UTC";
    const o = obtOf(sim.t);
    const ld = (sim.t - Date.UTC(2020, 1, 10, 4, 3)) / 86400000;
    const phase = sim.t < Date.UTC(2021, 10, 27, 4, 31) ? "Cruise phase" : sim.t < Date.UTC(2027, 1, 10) ? "Nominal mission" : "Extended mission";
    this.el.sub.innerHTML = `OBT <span title="CUC coarse/fine, seconds since 2000-01-01 (simulator simplification)">${o.coarse}.${String(o.fine).padStart(5, "0")}</span> · L+${ld.toFixed(1)} d · ${phase}`;
    const st = lk.pass ? STATIONS.find((s) => s.id === lk.pass.st) : null;
    let linkHtml;
    if (lk.down) linkHtml = `<span class="sim-dot good"></span><b>${st.name}</b> ${st.dsa} · el ${lk.el.toFixed(0)}° · ${fmtNum(lk.rate, 1)} kbit/s · LOS ${fmtUtc(lk.pass.los).slice(11, 16)}`;
    else if (lk.up) linkHtml = `<span class="sim-dot warn"></span><b>${st.name}</b> in view, no downlink: ${!sc.twta.on ? "TWTA off" : `HGA off-pointed ${lk.hgaErr.toFixed(1)}°`}`;
    else {
      const np = sim.passes.next(sim.t, sim.stationsOn);
      linkHtml = `<span class="sim-dot off"></span>${lk.conj ? "Solar conjunction: no link" : "No ground station in view"}${np ? ` · next AOS ${STATIONS.find((s) => s.id === np.st).name} in ${fmtDur((np.aos - sim.t) / 1000)}` : ""}`;
    }
    this.el.link.innerHTML = linkHtml;
    // state panel
    const f = 1 / (g.r * g.r);
    const rows = [
      ["Geometry", null],
      ["Distance from the Sun", `${g.r.toFixed(4)} au`, `${(g.r * 149.5978707).toFixed(2)} million km · flux ${f.toFixed(2)} × 1 au`],
      ["Heliographic latitude", `${g.hglat >= 0 ? "+" : ""}${g.hglat.toFixed(2)}°`, `ecliptic latitude ${g.eclat.toFixed(2)}°`],
      ["Heliocentric speed", `${g.speed.toFixed(2)} km/s`],
      ["Distance from Earth", `${g.dE.toFixed(4)} au`, `one-way light time ${fmtDur(g.owlt)}`],
      ["Sun–Earth–probe angle", `${g.sep.toFixed(2)}°`, g.sep < CONJ_SEP ? "inside the conjunction zone" : g.sep < 5 ? "approaching conjunction" : ""],
      ["Spacecraft (model)", null],
      ["Solar-array tilt", `${sc.saTilt.toFixed(1)}°`, `${sc.saSteering ? "steering on" : "steering OFF"}${sc.saMoving ? " · moving" : ""} · target ≤ ${SA_TARGET_C} °C`],
      ["Solar-array wing temperature", `${sc.saTempPY.toFixed(1)} °C`],
      ["HGA azimuth / elevation", `${sc.hga.az.toFixed(1)}° / ${sc.hga.el.toFixed(1)}°`, `pointing error ${lk.hgaErr.toFixed(2)}° (beam limit ${HGA_BEAM_OK}°)${sc.hga.steering ? "" : " · steering stopped"}`],
      ["Wheel speeds", `${sc.wheels.map((w) => (w * 9.549297).toFixed(0)).join(" / ")} rpm`, sc.wol > 0 ? `off-loading, ${fmtDur(sc.wol)} left` : ""],
      ["TWTA", sc.twta.on ? "On" : sc.twta.warm > 0 ? `Warming up (${sc.twta.warm.toFixed(0)} s)` : "Off"],
      ["Mass memory (SSMM)", `${sc.ssmm.toFixed(1)} Gbit`, `of ${SSMM_GBIT} Gbit · ${sim.inRsWindow(sim.t) ? "remote-sensing window" : "in-situ only"}`],
      ["Ground", null],
      ["Telemetry received", `${sim.ground.recv} packets`, sim.ground.lastRecv ? `latest generated ${fmtDur((sim.t - (sim.ground.packets[0]?.gen ?? sim.t)) / 1000)} ago` : "none yet"],
    ];
    this.el.state.innerHTML = rows.map(([k, v, s]) => v === null ? `<div class="sim-st-h">${k}</div>` : `<div class="sim-st"><div class="sim-st-k">${k}</div><div class="sim-st-v">${v}</div>${s ? `<div class="sim-st-s">${s}</div>` : ""}</div>`).join("")
      + `<div class="sim-st-note">The 3D view and this panel show the geometric state now. Telemetry reaches the ground one light time later.</div>`;
    // badges
    let soft = 0, hard = 0;
    for (const q of sim.ground.params.values()) if (q.sim) { if (q.status === "S") soft++; else if (q.status === "H") hard++; }
    const b = this.root.querySelector('[data-badge="tm"]');
    b.textContent = hard ? `${hard} hard` : soft ? `${soft} soft` : ""; b.className = "sim-badge " + (hard ? "crit" : soft ? "warn" : "");
    const pend = sim.tcs.filter((t) => !t.stages.exe && !t.stages.fail).length;
    const bt = this.root.querySelector('[data-badge="tc"]'); bt.textContent = pend ? `${pend} pending` : ""; bt.className = "sim-badge" + (pend ? " info" : "");
    // panel content
    if (this.tab === "tm") this.renderTmTable();
    else if (this.tab === "plots") this.renderPlots();
    else if (this.tab === "profile") this.drawProfile();
    else if (this.tab === "packets") this.renderPacketList();
    else if (this.tab === "tc") this.renderTcStatus();
    else if (this.tab === "ops" && this.logDirty) { this.renderLog(); this.logDirty = false; }
  }
  renderPanel() {
    const P = this.el.panel;
    this.charts.clear();
    P.innerHTML = "";
    if (this.tab === "tm") this.buildTm(P);
    else if (this.tab === "plots") this.buildPlots(P);
    else if (this.tab === "profile") this.buildProfile(P);
    else if (this.tab === "packets") this.buildPackets(P);
    else if (this.tab === "tc") this.buildTc(P);
    else this.buildOps(P);
  }
  // ---------------------------------------------------------------- telemetry table
  buildTm(P) {
    const chips = Object.entries(HK).map(([s, x]) => [s, x.label]).concat([["synth", "Synthetic (OL)"], ["verif", "Verification TM(1,x)"]]);
    P.innerHTML = `<div class="sim-row sim-wrap"><div class="sim-chips">${chips.map(([k, l]) => `<button data-f="${k}" class="${k === this.pktFilter ? "on" : ""}">${esc(l)}${/^\d+$/.test(k) ? ` <span class="sim-mut">${k}</span>` : ""}</button>`).join("")}</div>
      <label class="sim-chk"><input type="checkbox" data-k="onlysim" ${this.onlySim ? "checked" : ""}> Hide parameters the simulator does not model</label></div>
      <div class="sim-pkthdr" data-k="pkthdr"></div>
      <div class="sim-scroll sim-tablewrap"><table class="sim-table"><thead><tr><th>Parameter</th><th>Description</th><th>Raw</th><th>Engineering</th><th>Unit</th><th>Limits (MIB)</th><th>Status</th><th>Generated on board (UTC)</th><th title="Add to the starred charts">Chart</th></tr></thead><tbody data-k="tmbody"></tbody></table></div>
      <p class="sim-foot">Raw values are decoded from the packet bytes using the PLF offsets and PCF types; engineering values use the MIB calibration curves (CAF/CAP, TXF/TXP); limits and the relevance and validity conditions come from OCF/OCP and PCF_VALID. Rows marked “not simulated” are real fields of the packet that this simulator leaves at zero.</p>`;
    P.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { this.pktFilter = b.dataset.f; P.querySelectorAll("[data-f]").forEach((x) => x.classList.toggle("on", x === b)); this.renderTmTable(true); }));
    this.el.onlysim = P.querySelector('[data-k="onlysim"]'); this.el.tmbody = P.querySelector('[data-k="tmbody"]'); this.el.pkthdr = P.querySelector('[data-k="pkthdr"]');
    this.el.onlysim.addEventListener("change", () => { this.onlySim = this.el.onlysim.checked; this.renderTmTable(true); });
    this.el.tmbody.addEventListener("click", (e) => { const b = e.target.closest("[data-plot]"); if (!b) return; const n = b.dataset.plot; const i = this.plotList.indexOf(n); if (i >= 0) this.plotList.splice(i, 1); else this.plotList.push(n); this.renderTmTable(true); });
    this.renderTmTable(true);
  }
  tmNames() {
    const sim = this.sim, f = this.pktFilter;
    if (f === "synth") return Object.keys(sim.synth);
    if (f === "verif") return ["NCD01011", "NCD01012"];
    return sim.mib.packets[f].params.map((p) => p[0]);
  }
  renderTmTable() {
    if (!this.el.tmbody || !this.el.tmbody.isConnected) return;
    const sim = this.sim, M = sim.mib, ctx = (n) => { const q = sim.ground.params.get(n); return q && typeof q.raw === "number" ? q.raw : undefined; };
    const f = this.pktFilter;
    if (/^\d+$/.test(f)) {
      const pk = M.packets[f], last = sim.ground.latest[f], hk = sim.hk[f];
      this.el.pkthdr.innerHTML = `Packet ${pktLink(f)} · <b>${esc(pk.descr)}</b> · APID ${pk.apid} · TM(${pk.type},${pk.stype}) SID ${pk.pi1} · ${pk.length} octets · every ${+sim.hk[f].period.toFixed(3)} s ${sim.hk[f].byTc ? "(set by TC(3,130))" : "(assumed)"}${hk && !hk.enabled ? ' · <b class="sim-warn-t">generation disabled by TC</b>' : ""} · ${last ? `last received ${fmtUtc(last.t).slice(11)} UTC via ${esc(STATIONS.find((s) => s.id === last.station)?.name)}` : "not received yet"}`;
    } else this.el.pkthdr.innerHTML = f === "synth" ? "Synthetic parameters are computed on the ground from other parameters with the OL source published in the MIB." : "Fields of the last TM(1,1)/TM(1,7) verification report received.";
    const rows = [];
    for (const n of this.tmNames()) {
      const p = M.P[n] || {}, q = sim.ground.params.get(n);
      if (this.onlySim && q && !q.sim) continue;
      if (p.ptc === 7 && !q) continue;
      const lim = M.limitsFor(n, (x) => ctx(x) ?? undefined);
      const L = sim.mib.d.lim[n];
      let limTxt = "";
      if (L && L.codin === "A") limTxt = L.checks.map((c) => `${c.type === "H" ? "hard" : "soft"}: expect ${esc(c.lo)}${c.rlchk ? ` <span class="sim-mut">if ${esc(c.rlchk)}=${c.valpar}</span>` : ""}`).join("<br>");
      else if (L) limTxt = L.checks.map((c) => `<span class="sim-lim-${c.type}">${c.type === "H" ? "H" : "S"}</span> ${c.lo ?? "–"} … ${c.hi ?? "–"}${c.rlchk ? ` <span class="sim-mut" title="relevance check">if ${esc(c.rlchk)}=${c.valpar}</span>` : ""}`).join("<br>");
      const stKey = !q ? null : !q.sim ? "NS" : q.status;
      const [cls, ico, lab] = stKey ? STATUS[stKey] : ["", "", ""];
      const plotted = this.plotList.includes(n);
      const cal = p.cal ? `<span class="sim-mut" title="calibration">${esc(p.cal)}</span>` : "";
      rows.push(`<tr class="${q && !q.sim ? "sim-dim" : ""}"><td>${paramLink(n)}</td><td>${esc(p.d)}${p.ptc ? `<div class="sim-mut sim-small">${ptcName(p.ptc, p.pfc)}${p.valid ? ` · valid if ${esc(p.valid)}=${p.valpar}` : ""}</div>` : ""}</td>
        <td class="sim-num">${q ? (q.synth ? '<span class="sim-mut">derived</span>' : fmtRaw(q.raw, p)) : "–"}</td>
        <td class="sim-num"><b>${q ? (q.ok && q.valid ? fmtEng(q.eng, p) : `<span class="sim-mut">${esc(q.why || "invalid")}</span>`) : "–"}</b><div class="sim-small">${cal}</div></td>
        <td>${esc(p.u || "")}</td><td class="sim-small">${limTxt}</td>
        <td>${stKey ? `<span class="sim-status ${cls}"><span aria-hidden="true">${ico}</span> ${lab}</span>` : '<span class="sim-mut">–</span>'}</td>
        <td class="sim-small">${q ? fmtUtc(q.gen).slice(5) : "–"}</td>
        <td>${q && typeof q.eng === "number" ? `<button class="sim-star ${plotted ? "on" : ""}" data-plot="${esc(n)}" title="${plotted ? "Remove from" : "Add to"} the starred charts">${plotted ? "★" : "☆"}</button>` : ""}</td></tr>`);
    }
    this.el.tmbody.innerHTML = rows.join("") || `<tr><td colspan="9" class="sim-mut">No telemetry received yet. Telemetry flows only during a ground-station pass: press “Next pass ▸”.</td></tr>`;
  }
  // ---------------------------------------------------------------- charts
  unitOf(n, def) { const p = this.mib.params[n] || {}; return (def && def.unit) || UNITS[p.u] || p.u || ""; }
  buildPlots(P) {
    const groups = CHART_GROUPS.map((g) => [g.key, g.label]).concat([["star", `☆ Starred${this.plotList.length ? ` (${this.plotList.length})` : ""}`]]);
    P.innerHTML = `<div class="sim-ctl">
        <div class="sim-seg" role="group" aria-label="Time window">${WINDOWS.map(([k, l]) => `<button data-win="${k}" class="${k === this.plotWin ? "on" : ""}">${l}</button>`).join("")}</div>
        <div class="sim-chips" role="group" aria-label="Subsystem"><button data-grp="all" class="${this.plotGroup === "all" ? "on" : ""}">All</button>${groups.map(([k, l]) => `<button data-grp="${k}" class="${k === this.plotGroup ? "on" : ""}">${esc(l)}</button>`).join("")}</div>
      </div>
      <p class="sim-foot" data-k="plotnote"></p><div data-k="plotgroups"></div>`;
    P.querySelectorAll("[data-win]").forEach((b) => b.addEventListener("click", () => { this.plotWin = b.dataset.win; this.renderPanel(); }));
    P.querySelectorAll("[data-grp]").forEach((b) => b.addEventListener("click", () => { this.plotGroup = b.dataset.grp; this.renderPanel(); }));
    const live = this.plotWin === "live";
    P.querySelector('[data-k="plotnote"]').textContent = live
      ? "Real-time telemetry as decoded on the ground, plotted against the on-board generation time. It arrives only during ground-station passes, one light time after it was generated."
      : `On-board history of every housekeeping parameter, sampled every ${ARCHIVE.fine.step / 60e3} min (6 h, 1 day) or ${ARCHIVE.coarse.step / 60e3} min (7 days) through the same encoding, calibration and validity checks as live telemetry. A jump in time re-runs the models over the previous 7 days; a failure starts when you inject it. Amber and red lines are the MIB soft and hard limits.`;
    const host = P.querySelector('[data-k="plotgroups"]');
    const sections = CHART_GROUPS.filter((g) => this.plotGroup === "all" || this.plotGroup === g.key).map((g) => [g.label, g.charts]);
    if (this.plotGroup === "all" || this.plotGroup === "star") sections.push(["☆ Starred", this.plotList.map((n) => ({ title: (this.mib.params[n] || {}).d || n, params: [[n, n]] })), true]);
    for (const [label, defs, star] of sections) {
      const sec = h("section", { class: "sim-csec" });
      sec.innerHTML = `<div class="sim-gh">${esc(label)}</div>`;
      const grid = h("div", { class: "sim-grid" });
      sec.append(grid);
      host.append(sec);
      if (star && !defs.length) { grid.innerHTML = `<p class="sim-mut sim-hintcard">Add any numeric parameter here with its ☆ button in the Telemetry tab.</p>`; continue; }
      for (const def of defs) {
        const multi = def.params.length > 1, p0 = this.mib.params[def.params[0][0]] || {}, unit = this.unitOf(def.params[0][0], def);
        const card = h("div", { class: "sim-card" });
        const keys = def.params.map(([n, l], k) => multi ? `<span><i class="sim-key" style="background:var(--sim-s${k + 1})"></i>${esc(l)} ${paramLink(n)}</span>` : `<span>${paramLink(n)} ${esc(p0.d || "")}</span>`).join("");
        const note = def.bands === "wol" ? "shaded: wheel off-loading" : def.bands === "pass" ? "shaded: ground-station passes" : "";
        card.innerHTML = `<div class="sim-card-h"><div><b>${esc(def.title)}</b>${unit ? ` <span class="sim-mut">${esc(unit)}</span>` : ""}</div><div class="sim-card-v" data-v></div></div>
          <div class="sim-card-legend">${keys}${note ? `<span class="sim-mut">${note}</span>` : ""}</div>`;
        grid.append(card);
        const ch = new LineChart(card, { height: 150, unit });
        ch.def = def; ch.valueEl = card.querySelector("[data-v]");
        this.charts.set("c" + this.charts.size, ch);
      }
    }
    this.plotKey = null;
    this.renderPlots();
  }
  limitLines(n) {
    const sim = this.sim, ctx = (x) => { const v = sim.ground.params.get(x); return v && typeof v.raw === "number" ? v.raw : CONFIG[x]; };
    const out = [];
    for (const L of sim.mib.limitsFor(n, ctx)) {
      if (L.lo !== undefined) out.push({ v: L.lo, kind: L.type, label: `${L.type === "H" ? "hard" : "soft"} low ${L.lo}` });
      if (L.hi !== undefined) out.push({ v: L.hi, kind: L.type, label: `${L.type === "H" ? "hard" : "soft"} high ${L.hi}` });
    }
    return out;
  }
  bandsFor(kind, x0, x1) {
    const sim = this.sim;
    if (kind === "wol") return sim.wolHist.filter((b) => b.to >= x0 && b.from <= x1);
    if (kind !== "pass") return [];
    // passes are ground times; the charts use on-board generation time, one light time earlier
    const out = [], owlt = sim.geo.owlt * 1000;
    for (let d = Math.floor(x0 / 864e5) - 1; d <= Math.floor(x1 / 864e5) + 1; d++) {
      for (const p of sim.passes.day(d)) if (sim.stationsOn.has(p.st) && p.los - owlt >= x0 && p.aos - owlt <= x1) out.push({ from: p.aos - owlt, to: p.los - owlt });
    }
    return out;
  }
  renderPlots(force) {
    const sim = this.sim, win = WINDOWS.find((w) => w[0] === this.plotWin), live = !win[2];
    // redraw only when something changed (new samples, new packets, time moved)
    const key = `${sim.arch.ver}|${sim.ground.recv}|${this.plotWin}|${Math.round(sim.t / 1000)}`;
    if (!force && key === this.plotKey) return;
    this.plotKey = key;
    const x1 = sim.t, x0 = live ? sim.t - 86400e3 : Math.max(sim.eph.tStart, x1 - win[2]);
    for (const ch of this.charts.values()) {
      const def = ch.def;
      if (!def) continue;
      const series = def.params.map(([n, label], k) => {
        const s = live ? sim.series(n) : sim.archiveSeries(n, x0, x1);
        // break lines only across real holes: several times the typical (median) sample spacing
        const step = live ? 6 * 60e3 : win[2] > 86400e3 ? ARCHIVE.coarse.step : ARCHIVE.fine.step;
        const dts = [];
        for (let i = 1; i < s.t.length; i += Math.max(1, Math.floor(s.t.length / 200))) dts.push(s.t[i] - s.t[i - 1]);
        dts.sort((a, b) => a - b);
        const med = dts.length ? dts[dts.length >> 1] : step;
        return { name: label, label, t: s.t, v: s.v, slot: k, gap: Math.max(2.5 * step, 5 * med), wrap: def.wrap };
      });
      const unit = this.unitOf(def.params[0][0], def);
      // limit lines only when every line shares the same MIB limits and there are at most three lines
      let limits = [];
      if (def.params.length <= 3) {
        const sets = def.params.map(([n]) => this.limitLines(n));
        if (sets.every((x) => JSON.stringify(x) === JSON.stringify(sets[0]))) limits = sets[0];
        // a limit the data crosses, or comes within one display span of, is always drawn
        let lo = Infinity, hi = -Infinity;
        for (const s of series) for (let i = 0; i < s.v.length; i++) { const v = s.v[i]; if (Number.isFinite(v) && s.t[i] >= x0) { if (v < lo) lo = v; if (v > hi) hi = v; } }
        const near = Math.max(hi - lo, MIN_SPAN[this.unitOf(def.params[0][0], def)] || 0);
        limits = limits.map((L) => (Number.isFinite(lo) && L.v > lo - near && L.v < hi + near) || (/high/.test(L.label) && hi > L.v) || (/low/.test(L.label) && lo < L.v) ? { ...L, show: "always" } : L);
      }
      const bands = def.bands ? this.bandsFor(def.bands, x0, x1) : [];
      ch.set({ series, limits, unit, bands, minSpan: MIN_SPAN[unit] || 0, x0: live ? undefined : x0, x1: live ? undefined : x1,
        empty: live ? "Waiting for telemetry: it flows during ground-station passes" : "No samples in this window (housekeeping disabled?)" });
      if (def.params.length === 1) {
        const n = def.params[0][0], p = this.mib.params[n] || {}, s = series[0];
        let v = null;
        if (live) { const q = sim.ground.params.get(n); if (q && typeof q.eng === "number") v = q.eng; }
        else for (let i = s.v.length - 1; i >= 0; i--) if (Number.isFinite(s.v[i])) { v = s.v[i]; break; }
        ch.valueEl.innerHTML = v === null ? "" : `<b>${fmtEng(v, p)}</b> ${esc(unit)}`;
      }
    }
  }
  redrawCharts() { this.charts.forEach((c) => c.draw()); }
  // ---------------------------------------------------------------- mission profile
  buildProfile(P) {
    P.innerHTML = `<p class="sim-foot">Daily values over the whole ephemeris (February 2020 to November 2030). The geometry panels are JPL Horizons data; the solar-array, power and data panels apply this simulator's models (see the assumptions below the simulator). Click a chart to move the simulation to that day. Shaded bands mark the 10-day remote-sensing windows centred on perihelion and on the latitude extremes.</p><div class="sim-progress" data-k="prog">Computing the mission profile…</div><div class="sim-grid" data-k="profgrid"></div>
    <details class="sim-details"><summary>Mission profile as a table (one row every 30 days)</summary><div class="sim-scroll" data-k="proftable"></div></details>`;
    this.el.profgrid = P.querySelector('[data-k="profgrid"]'); this.el.prog = P.querySelector('[data-k="prog"]'); this.el.proftable = P.querySelector('[data-k="proftable"]');
    const make = async () => {
      if (!this.profile) this.profile = await missionProfile(this.sim, (u) => { if (this.el.prog) this.el.prog.textContent = `Computing the mission profile… ${(u * 100).toFixed(0)}%`; });
      if (!this.el.profgrid.isConnected) return;
      this.el.prog.hidden = true;
      const pr = this.profile, mibLim = this.mib.lim.NRU02263;
      const bands = rsWindows(this.sim.eph).map((w) => ({ from: w.from, to: w.to }));
      const defs = [
        ["r", "Distance from the Sun", "au", "JPL Horizons"],
        ["hglat", "Heliographic latitude", "°", "JPL Horizons (observer sub-latitude)"],
        ["owlt", "One-way light time to Earth", "min", "JPL Horizons"],
        ["sep", "Sun–Earth–probe angle", "°", "JPL Horizons", [{ v: CONJ_SEP, kind: "ref", label: `conjunction threshold ${CONJ_SEP}° (assumption)`, show: "always" }]],
        ["tilt", "Solar-array tilt from the steering law", "°", "model"],
        ["saT", "Solar-array wing temperature", "°C", "model; limits NRU02263 (MIB)", mibLim ? mibLim.checks.flatMap((c) => [{ v: c.hi, kind: c.type, label: `${c.type === "H" ? "hard" : "soft"} high ${c.hi} °C`, show: "always" }]) : []],
        ["power", "Solar-array power available and spacecraft load", "W", "model"],
        ["rate", "Downlink rate (150 kbit/s × (1 au / Earth distance)²)", "kbit/s", "Red Book scaling, assumed cap"],
        ["ssmm", "Mass memory fill", "Gbit", "model", [{ v: SSMM_GBIT, kind: "ref", label: `capacity ${SSMM_GBIT} Gbit (Red Book)`, show: "always" }]],
      ];
      this.el.profgrid.innerHTML = "";
      for (const [k, title, unit, src, limits] of defs) {
        const card = h("div", { class: "sim-card" });
        card.innerHTML = `<div class="sim-card-h"><div><b>${esc(title)}</b> <span class="sim-mut">${esc(unit)} · ${esc(src)}</span></div>${k === "power" ? `<div class="sim-legend-inline"><span><i class="sim-key s1"></i>available</span><span><i class="sim-key s2"></i>load</span></div>` : ""}</div>`;
        this.el.profgrid.append(card);
        const ch = new LineChart(card, { height: 150, unit, onClick: (t) => { this.sim.jump(t); this.afterJump(); } });
        const series = k === "power" ? [{ name: "available", t: pr.t, v: pr.pAv, slot: 0 }, { name: "load", t: pr.t, v: pr.load, slot: 1 }] : [{ name: title, t: pr.t, v: pr[k] }];
        ch.prof = { series, limits: limits || [], unit, bands: ["r", "hglat", "ssmm"].includes(k) ? bands : [], yMin: ["ssmm", "tilt", "rate"].includes(k) ? 0 : undefined };
        this.charts.set("prof:" + k, ch);
      }
      const rowsT = [];
      for (let i = 0; i < pr.t.length; i += 30) rowsT.push(`<tr><td>${fmtUtc(pr.t[i]).slice(0, 10)}</td><td>${pr.r[i].toFixed(3)}</td><td>${pr.hglat[i].toFixed(1)}</td><td>${pr.owlt[i].toFixed(1)}</td><td>${pr.sep[i].toFixed(1)}</td><td>${pr.tilt[i].toFixed(1)}</td><td>${pr.saT[i].toFixed(0)}</td><td>${pr.pAv[i].toFixed(0)}</td><td>${pr.load[i].toFixed(0)}</td><td>${pr.rate[i].toFixed(0)}</td><td>${pr.passH[i].toFixed(1)}</td><td>${pr.ssmm[i].toFixed(0)}</td></tr>`);
      this.el.proftable.innerHTML = `<table class="sim-table"><thead><tr><th>Date</th><th>r (au)</th><th>HG lat (°)</th><th>OWLT (min)</th><th>SEP (°)</th><th>SA tilt (°)</th><th>SA T (°C)</th><th>P avail (W)</th><th>Load (W)</th><th>Rate (kbit/s)</th><th>Pass (h)</th><th>SSMM (Gbit)</th></tr></thead><tbody>${rowsT.join("")}</tbody></table>`;
      this.drawProfile();
    };
    make();
  }
  drawProfile() {
    for (const [k, ch] of this.charts) if (k.startsWith("prof:") && ch.prof) ch.set({ ...ch.prof, cursor: this.sim.t });
  }
  // ---------------------------------------------------------------- packets
  buildPackets(P) {
    P.innerHTML = `<div class="sim-split"><div class="sim-scroll sim-pktlist"><table class="sim-table sim-click"><thead><tr><th>Received (UTC)</th><th>APID</th><th>SSC</th><th>Service</th><th>SPID</th><th>Packet</th><th>Octets</th><th>Station</th></tr></thead><tbody data-k="pktbody"></tbody></table></div>
      <div class="sim-pktdetail" data-k="pktdetail"><p class="sim-mut">Select a packet to see its header fields, its bytes and the decoded parameters.</p></div></div>`;
    this.el.pktbody = P.querySelector('[data-k="pktbody"]'); this.el.pktdetail = P.querySelector('[data-k="pktdetail"]');
    this.el.pktbody.addEventListener("click", (e) => { const tr = e.target.closest("tr[data-i]"); if (!tr) return; this.selPkt = this.sim.ground.packets[+tr.dataset.i]; this.renderPacketDetail(); this.renderPacketList(true); });
    this.renderPacketList(true);
  }
  renderPacketList(force) {
    if (!this.el.pktbody || !this.el.pktbody.isConnected) return;
    if (!force && this.sim.running && this.lastPktRender && performance.now() - this.lastPktRender < 800) return;
    this.lastPktRender = performance.now();
    const pk = this.sim.ground.packets.slice(0, 120);
    this.el.pktbody.innerHTML = pk.map((r, i) => { const p = this.mib.packets[r.spid]; return `<tr data-i="${i}" class="${r === this.selPkt ? "sel" : ""}"><td>${fmtUtc(r.t).slice(11)}</td><td>${r.hdr.apid}</td><td>${r.hdr.ssc}</td><td>TM(${r.hdr.service},${r.hdr.subservice})</td><td>${r.spid}</td><td>${esc(p.descr)}</td><td>${r.bytes.length}</td><td>${esc(r.station)}</td></tr>`; }).join("") || `<tr><td colspan="8" class="sim-mut">No packets received yet: telemetry arrives during ground-station passes.</td></tr>`;
  }
  renderPacketDetail() {
    const r = this.selPkt, M = this.sim.mib;
    if (!r) return;
    const pk = M.packets[r.spid], H = r.hdr;
    const fields = [
      ["Version", 0, 3, H.version], ["Type", 3, 1, H.type + " (TM)"], ["Data field header flag", 4, 1, H.dfhFlag], ["APID", 5, 11, H.apid],
      ["Sequence flags", 16, 2, H.seqFlags + " (stand-alone)"], ["Source sequence count", 18, 14, H.ssc], ["Packet length", 32, 16, `${H.length} (= ${r.bytes.length} − 7)`],
      ["Spare", 48, 1, 0], ["PUS version", 49, 3, H.pusVersion], ["Spare", 52, 4, 0], ["Service type", 56, 8, H.service], ["Service subtype", 64, 8, H.subservice],
      ["Destination ID", 72, 8, H.dest], ["On-board time, coarse (s)", 80, 32, H.obtCoarse], ["On-board time, fine (2⁻¹⁶ s)", 112, 16, H.obtFine],
    ];
    const params = pk.params.map(([n, by, bi]) => { const p = M.P[n] || {}; return { n, by, bi, len: bitWidth(p.ptc, p.pfc), p }; });
    const bytes = Array.from(r.bytes);
    let hexHtml = "";
    for (let i = 0; i < bytes.length; i += 16) {
      hexHtml += `<div><span class="sim-off">${i.toString(16).toUpperCase().padStart(4, "0")}</span>` + bytes.slice(i, i + 16).map((b, j) => `<span data-b="${i + j}" class="${i + j < 6 ? "hb-ph" : i + j < 16 ? "hb-dfh" : "hb-data"}">${b.toString(16).toUpperCase().padStart(2, "0")}</span>`).join("") + `</div>`;
    }
    const gp = this.sim.ground.params;
    this.el.pktdetail.innerHTML = `<h4>${pktLink(r.spid)} ${esc(pk.descr)}</h4>
      <p class="sim-small">Generated on board ${fmtUtc(r.gen)} UTC, received at ${esc(STATIONS.find((s) => s.id === r.station)?.name)} ${fmtUtc(r.t)} UTC (${fmtDur((r.t - r.gen) / 1000)} light time). The SPID is identified on the ground from APID ${pk.apid}, type ${pk.type}, subtype ${pk.stype}${pk.type === 3 ? ` and the SID (PI1) ${pk.pi1} at octet 16` : ""} (PID table).</p>
      <div class="sim-hex" data-k="hex">${hexHtml}</div>
      <div class="sim-hexkey"><span class="hb-ph">primary header (6)</span><span class="hb-dfh">PUS-A data field header (10)</span><span class="hb-data">source data</span> · hover a field or parameter to highlight its bits</div>
      <div class="sim-cols"><div><h5>Header</h5><table class="sim-table sim-hov">${fields.map(([n, b, l, v]) => `<tr data-bits="${b},${l}"><td>${n}</td><td class="sim-mut sim-nw">bit ${b}, ${l}</td><td><b>${v}</b></td></tr>`).join("")}</table></div>
      <div><h5>Parameters (PLF)</h5><div class="sim-scroll" style="max-height:24em"><table class="sim-table sim-hov">${params.map((x) => { const q = gp.get(x.n); return `<tr data-bits="${x.by * 8 + x.bi},${x.len}" class="${q && !q.sim ? "sim-dim" : ""}"><td>${paramLink(x.n)}</td><td class="sim-mut sim-nw">octet ${x.by}${x.bi ? "." + x.bi : ""}, ${x.len} bits</td><td>${esc(x.p.d || "")}</td></tr>`; }).join("")}</table></div></div></div>`;
    const hexEl = this.el.pktdetail.querySelector('[data-k="hex"]');
    this.el.pktdetail.querySelectorAll("tr[data-bits]").forEach((tr) => {
      tr.addEventListener("mouseenter", () => { const [b, l] = tr.dataset.bits.split(",").map(Number); const b0 = Math.floor(b / 8), b1 = Math.floor((b + l - 1) / 8); hexEl.querySelectorAll("[data-b]").forEach((s) => s.classList.toggle("hl", +s.dataset.b >= b0 && +s.dataset.b <= b1)); });
      tr.addEventListener("mouseleave", () => hexEl.querySelectorAll(".hl").forEach((s) => s.classList.remove("hl")));
    });
  }
  // ---------------------------------------------------------------- commanding
  buildTc(P) {
    const tcs = this.mib.tcs, seqs = this.mib.seqs || {}, seqMode = this.tcMode === "seq";
    const items = seqMode
      ? Object.entries(seqs).map(([k, q]) => { const n = this.seqCount(k), nested = q.el.some((e) => e.t === "S");
        return `<button data-sq="${k}" class="${k === this.seqSel ? "on" : ""}"><b>${esc(k)}</b><span>${esc(q.d)}</span><span class="sim-mut">${n} command${n > 1 ? "s" : ""}${nested ? " · nested sequences" : ""}${q.fp.length ? ` · ${q.fp.length} parameter${q.fp.length > 1 ? "s" : ""}` : ""}${q.doc ? ` · ${esc(q.doc)}` : ""}</span></button>`; }).join("")
      : Object.entries(tcs).map(([k, c]) => `<button data-tc="${k}" class="${k === this.tcSel ? "on" : ""}"><b>${esc(k)}</b><span>${esc(c.d)}</span><span class="sim-mut">TC(${c.type},${c.stype}) · APID ${c.apid}</span></button>`).join("");
    P.innerHTML = `<div class="sim-ctl sim-tcmode"><div class="sim-seg" role="group" aria-label="Show commands or sequences"><button data-tcm="tc" class="${seqMode ? "" : "on"}" aria-pressed="${!seqMode}">Commands (${Object.keys(tcs).length})</button><button data-tcm="seq" class="${seqMode ? "on" : ""}" aria-pressed="${seqMode}">Sequences (${Object.keys(seqs).length})</button></div>
      <span class="sim-small sim-mut">${seqMode ? "Command sequences of the MIB (tables CSF, CSS, SDF, CSP) whose commands this simulator models. The ground releases each command at its release time during a pass." : "Telecommands of the MIB (tables CCF, CDF, CPC). Each one is encoded bit by bit and uplinked during a pass."}</span></div>
      <div class="sim-tcgrid"><div class="sim-tclist">${items}</div><div class="sim-tcform" data-k="tcform"></div></div>
      <div data-k="seqruns"></div>
      <h4 class="sim-h4">Command history</h4><div class="sim-scroll"><table class="sim-table"><thead><tr><th>Released (UTC)</th><th>Command</th><th>Sequence</th><th>SSC</th><th>Via</th><th>On board (UTC)</th><th>TM(1,1) accepted</th><th>TM(1,7) completed</th><th>Result</th></tr></thead><tbody data-k="tchist"></tbody></table></div>`;
    P.querySelectorAll("[data-tcm]").forEach((b) => b.addEventListener("click", () => { if (this.tcMode !== b.dataset.tcm) { this.tcMode = b.dataset.tcm; this.buildTc(P); } }));
    P.querySelectorAll("[data-tc]").forEach((b) => b.addEventListener("click", () => { this.tcSel = b.dataset.tc; this.tcVals = {}; P.querySelectorAll("[data-tc]").forEach((x) => x.classList.toggle("on", x === b)); this.renderTcForm(); }));
    P.querySelectorAll("[data-sq]").forEach((b) => b.addEventListener("click", () => { this.seqSel = b.dataset.sq; this.seqShow = null; P.querySelectorAll("[data-sq]").forEach((x) => x.classList.toggle("on", x === b)); this.renderSeqForm(); }));
    this.el.tcform = P.querySelector('[data-k="tcform"]'); this.el.tchist = P.querySelector('[data-k="tchist"]'); this.el.seqruns = P.querySelector('[data-k="seqruns"]');
    if (seqMode) this.renderSeqForm(); else this.renderTcForm();
    this.renderSeqRuns();
    this.renderTcHistory();
    if (seqMode) P.querySelector("[data-sq].on")?.scrollIntoView({ block: "nearest" });
  }
  // number of commands a sequence releases once its nested sequences are expanded
  seqCount(name) { return this.mib.seqs[name].el.reduce((n, e) => n + (e.t === "C" ? 1 : this.seqCount(e.id)), 0); }
  seqHasHk(name) { return this.mib.seqs[name].el.some((e) => (e.t === "C" ? /^ZC[AF]003/.test(e.id) : this.seqHasHk(e.id))); }
  renderSeqForm() {
    const sim = this.sim, name = this.seqSel, q = this.mib.seqs[name];
    const vals = this.seqVals[name] || (this.seqVals[name] = Object.fromEntries(q.fp.map((f) => [f.n, sim.fpDefault(f) ?? ""])));
    const uses = (f) => q.el.flatMap((e) => e.v.filter((v) => v.vt === "F" && v.v === f.n).map((v) => `${v.p} of element ${e.e} (${e.id})`));
    const sids = Object.entries(HK).map(([sp, h]) => { const pk = this.mib.packets[sp]; return `${pk.apid === 178 ? "AOCS" : "platform"} SID ${pk.pi1} ${esc(h.label)}`; }).join(", ");
    this.el.tcform.innerHTML = `<h4>${seqLink(name)} ${esc(q.d)}</h4>
      ${q.d2 ? `<p class="sim-small">${esc(q.d2)}</p>` : ""}
      <p class="sim-small sim-mut">${q.doc ? `Generated from procedure ${esc(q.doc)}${q.issue ? ` issue ${esc(q.issue)}` : ""}${q.date ? `, ${esc(q.date)}` : ""} · ` : ""}${q.el.length} element${q.el.length > 1 ? "s" : ""}, ${this.seqCount(name)} command${this.seqCount(name) > 1 ? "s" : ""} once expanded · time tags (CSF_IFTT ${esc(q.iftt)}): ${esc(IFTT[q.iftt] || q.iftt)} · critical: ${q.crit === "Y" ? "yes" : "no"}</p>
      ${q.fp.length ? `<div class="sim-tcparams">${q.fp.map((f) => { const pp = sim.fpParam(f), d = sim.fpDefault(f), u = uses(f);
        return `<label class="sim-field sim-tcp"><span>${esc(f.n)} · ${esc(f.d)}${f.u ? ` (${esc(f.u)})` : ""}</span>
        ${pp.choices ? `<select data-f="${esc(f.n)}"><option value="">— choose —</option>${pp.choices.map((x) => `<option ${x === vals[f.n] ? "selected" : ""}>${esc(x)}</option>`).join("")}</select>` : `<input data-f="${esc(f.n)}" value="${esc(vals[f.n])}" inputmode="decimal" placeholder="required">`}
        <span class="sim-mut sim-small">${ptcName(f.ptc, f.pfc)}${pp.range ? ` · range ${pp.range.map(([a, b]) => `${a} … ${b}`).join(", ")} (${esc(f.prf)})` : ""} · ${d !== null ? `default ${esc(d)} (CSP_DEFVAL)` : "no default in the MIB: the operator enters it"}${u.length ? ` · sets ${esc(u.join(", "))}` : ""}</span></label>`; }).join("")}</div>` : '<p class="sim-small sim-mut">This sequence has no formal parameters: every value is fixed in the MIB.</p>'}
      ${this.seqHasHk(name) ? `<p class="sim-small sim-mut">Housekeeping reports this simulator generates: ${sids}. Commands for other SIDs are accepted and verified but have no visible effect. Collection intervals are in cycles of 8 Hz (1/8 s), as the MIB's own parameter description “Coll Interval (8Hz Cyc)” states.</p>` : ""}
      <div class="sim-row"><button class="sim-btn sim-primary" data-k="sqgo">Load and release</button><button class="sim-btn" data-k="sqstop">Stop sequence</button><span data-k="sqmsg" class="sim-small"></span></div>
      <div data-k="sqplan"></div>`;
    this.el.tcform.querySelectorAll("[data-f]").forEach((inp) => inp.addEventListener("input", () => { vals[inp.dataset.f] = inp.value; this.seqShow = null; this.renderSeqPlan(); }));
    this.el.tcform.querySelector('[data-k="sqgo"]').addEventListener("click", () => {
      const r = sim.startSequence(name, vals), m = this.el.tcform.querySelector('[data-k="sqmsg"]');
      m.className = "sim-small " + (r.ok ? "sim-good-t" : "sim-warn-t");
      if (r.ok) this.seqShow = r.run.id;
      m.textContent = r.ok ? `Loaded. ${r.run.items.length} command${r.run.items.length > 1 ? "s" : ""} released over ${relText(r.run.items[r.run.items.length - 1].off)}; the first reaches the spacecraft in ${fmtDur(sim.geo.owlt)}.` : r.error || "Fix the parameters first: " + r.errors.join("; ");
      this.renderSeqPlan(); this.renderSeqRuns(); this.renderTcHistory();
    });
    this.el.tcform.querySelector('[data-k="sqstop"]').addEventListener("click", () => { const run = sim.seqRuns.find((r) => r.name === name && r.state === "running"); if (run) sim.abortSequence(run.id); });
    this.renderSeqPlan();
  }
  // the expanded sequence: from the latest run of this sequence, or a preview from the current parameter values
  renderSeqPlan() {
    const box = this.el.tcform && this.el.tcform.querySelector('[data-k="sqplan"]');
    if (!box || this.tcMode !== "seq") return;
    const sim = this.sim, name = this.seqSel, q = this.mib.seqs[name];
    const run = sim.seqRuns.find((r) => r.id === this.seqShow && r.name === name) || sim.seqRuns.find((r) => r.name === name && r.state === "running");
    const stop = this.el.tcform.querySelector('[data-k="sqstop"]');
    if (stop) stop.disabled = !(run && run.state === "running");
    let rows;
    if (run) rows = run.items;
    else {
      const r = sim.expandSequence(name, this.seqVals[name] || {});
      if (!r.ok) {
        const errs = r.errors || [r.error], missing = errs.filter((e) => /a value is required/.test(e)), other = errs.filter((e) => !missing.includes(e));
        box.innerHTML = `<div class="sim-small sim-mut">${missing.length ? `Enter ${missing.length > 1 ? "the formal parameters" : "the formal parameter"} ${listJoin(missing.map((e) => esc(e.split(" ")[0])))} to see the commands this sequence will release.` : "Expanded sequence:"}</div>${other.map((e) => `<div class="sim-small sim-warn-t">${esc(e)}</div>`).join("")}`;
        return;
      }
      rows = r.items.map((it) => ({ ...it, at: null, tc: null }));
    }
    const st = (it) => {
      if (!run) return '<span class="sim-mut">–</span>';
      const c = it.tc;
      if (!c) return run.state === "aborted" ? '<span class="sim-status soft">▲ Not released</span>' : '<span class="sim-mut">Queued</span>';
      if (c.stages.exe) return `<span class="sim-status ok">✓ Completed</span>${c.note ? ` <span class="sim-small">${esc(c.note)}</span>` : ""}`;
      if (c.stages.fail) return '<span class="sim-status soft">▲ No verification TM</span>';
      if (c.stages.acc) return '<span class="sim-status inv">Accepted</span>';
      return `<span class="sim-status inv">${c.stages.onboard ? "On board" : "Uplinking"}</span>`;
    };
    box.innerHTML = `<div class="sim-small sim-mut">${run ? `Run ${run.id}, loaded ${fmtUtc(run.start).slice(5)} UTC: ${run.state === "running" ? `${run.released} of ${run.items.length} released` : run.state === "released" ? "all commands released" : `stopped ${esc(run.error)}`}` : "Expanded sequence (preview): what the ground will release, one command after another"}</div>
      <div class="sim-scroll"><table class="sim-table"><thead><tr><th>Element</th><th title="Release time from the start of the sequence (CSS_RELTYPE and CSS_RELTIME)">Release</th><th>Command</th><th>Values</th><th title="CSS_MANDISP: whether the command needs its own ARM and GO on a SCOS-2000 manual stack. The simulator dispatches every command automatically.">MIB dispatch</th><th>Status</th></tr></thead><tbody>
      ${rows.map((it) => `<tr><td class="sim-nowrap">${esc(it.label)}${it.path.length > 1 ? `<div class="sim-small sim-mut">in ${it.path.slice(1).map(seqLink).join(" › ")}</div>` : ""}</td><td>T+${relText(it.off)}${it.at ? `<div class="sim-small sim-mut">${fmtUtc(it.at).slice(11)}</div>` : ""}</td>
        <td>${tcLink(it.cname)} <span class="sim-mut">${esc(this.mib.tcs[it.cname].d)}</span></td>
        <td class="sim-small">${Object.entries(it.values).map(([k, v]) => `${esc(k)} = <b>${esc(v)}</b>`).join("<br>") || '<span class="sim-mut">none</span>'}</td>
        <td class="sim-small">${it.man ? "manual" : "with previous"}</td><td>${st(it)}</td></tr>`).join("")}</tbody></table></div>`;
  }
  renderSeqRuns() {
    const box = this.el.seqruns;
    if (!box || !box.isConnected) return;
    const runs = this.sim.seqRuns;
    if (!runs.length) { box.innerHTML = ""; return; }
    box.innerHTML = `<h4 class="sim-h4">Sequences loaded</h4><div class="sim-scroll"><table class="sim-table"><thead><tr><th>Loaded (UTC)</th><th>Sequence</th><th>Released</th><th>State</th><th></th></tr></thead><tbody>
      ${runs.slice(0, 20).map((r) => `<tr><td>${fmtUtc(r.start).slice(5)}</td><td>${seqLink(r.name)} <span class="sim-mut">${esc(r.def.d)}</span></td><td>${r.released} of ${r.items.length}</td>
        <td>${r.state === "running" ? '<span class="sim-status inv">… Releasing</span>' : r.state === "released" ? '<span class="sim-status ok">✓ Released</span>' : `<span class="sim-status soft">▲ Stopped</span> <span class="sim-small">${esc(r.error)}</span>`}</td>
        <td>${r.state === "running" ? `<button class="sim-btn" data-stop="${r.id}">Stop</button>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
    box.querySelectorAll("[data-stop]").forEach((b) => b.addEventListener("click", () => this.sim.abortSequence(+b.dataset.stop)));
  }
  renderTcForm() {
    const sim = this.sim, c = this.mib.tcs[this.tcSel], params = sim.tcb.editable(this.tcSel);
    for (const p of params) if (this.tcVals[p.name] === undefined) this.tcVals[p.name] = this.defaultFor(p);
    this.el.tcform.innerHTML = `<h4>${tcLink(this.tcSel)} ${esc(c.d)}</h4>
      ${c.d2 ? `<p class="sim-small">${esc(c.d2)}…</p>` : ""}
      <p class="sim-small sim-mut">TC(${c.type},${c.stype}) · APID ${c.apid} · header ${esc(c.hdr)} · ack flags ${c.ack.toString(2).padStart(4, "0")} (acceptance and completion reports) · critical: ${c.crit === "Y" ? "yes" : "no"}</p>
      <div class="sim-tcparams">${params.length ? params.map((p) => `<label class="sim-field sim-tcp"><span>${esc(p.name)} · ${esc(p.descr || "")}${p.unit ? ` (${esc(p.unit)})` : ""}</span>
        ${p.choices ? `<select data-p="${esc(p.name)}">${p.choices.map((x) => `<option ${x === this.tcVals[p.name] ? "selected" : ""}>${esc(x)}</option>`).join("")}</select>` : `<input data-p="${esc(p.name)}" value="${esc(this.tcVals[p.name])}" inputmode="decimal">`}
        <span class="sim-mut sim-small">${ptcName(p.ptc, p.pfc)}${p.range ? ` · range ${p.range.map(([a, b]) => `${a} … ${b}`).join(", ")} (${esc(p.prf)})` : ""}${p.cat === "C" ? " · numerically calibrated (CCA)" : ""}${p.cat === "T" ? " · textual (PAS)" : ""}</span></label>`).join("") : '<p class="sim-mut">This command has no editable parameters.</p>'}</div>
      <div class="sim-row"><button class="sim-btn sim-primary" data-k="tcsend">Send command</button><span data-k="tcmsg" class="sim-small"></span></div>
      <div class="sim-small sim-mut">Encoded packet (CRC-16 packet error control included):</div><div class="sim-hex sim-hex-tc" data-k="tchex"></div><div class="sim-small" data-k="tcfields"></div>`;
    this.el.tcform.querySelectorAll("[data-p]").forEach((inp) => inp.addEventListener("input", () => { this.tcVals[inp.dataset.p] = inp.value; this.previewTc(); }));
    this.el.tcform.querySelector('[data-k="tcsend"]').addEventListener("click", () => {
      const r = sim.send(this.tcSel, this.tcVals);
      const m = this.el.tcform.querySelector('[data-k="tcmsg"]');
      m.className = "sim-small " + (r.ok ? "sim-good-t" : "sim-warn-t");
      m.textContent = r.ok ? `Released. On board in ${fmtDur(sim.geo.owlt)}; TM(1,1) expected in ${fmtDur(2 * sim.geo.owlt)}.` : r.error;
      this.renderTcHistory();
    });
    this.previewTc();
  }
  defaultFor(p) {
    const g = this.sim.geo;
    if (p.name === "PCSB0052" || p.name === "PCS2Z009") return (-Math.acos(Math.max(-1, Math.min(1, g.eB[2]))) * 180 / Math.PI).toFixed(2);
    if (p.name === "PCSB0032" || p.name === "PCSB0044") return (Math.atan2(g.eB[1], g.eB[0]) * 180 / Math.PI).toFixed(2);
    if (p.name === "PCD03011") return this.tcSel.startsWith("ZCA") ? "1" : "2";
    if (p.name === "PCSB0152") return "AUTO";
    return p.choices ? p.choices[0] : String(p.def ?? 0);
  }
  previewTc() {
    const sim = this.sim, params = sim.tcb.editable(this.tcSel);
    const errs = params.map((p) => [p, sim.tcb.checkValue(p, this.tcVals[p.name])]).filter(([, e]) => e);
    const hx = this.el.tcform.querySelector('[data-k="tchex"]'), fl = this.el.tcform.querySelector('[data-k="tcfields"]');
    if (errs.length) { hx.textContent = "–"; fl.innerHTML = errs.map(([p, e]) => `<div class="sim-warn-t">${esc(p.name)}: ${esc(e)}</div>`).join(""); return; }
    const b = sim.tcb.build(this.tcSel, this.tcVals, sim.tcSsc);
    hx.textContent = hex(b.bytes);
    fl.innerHTML = `<table class="sim-table"><tbody>${b.fields.map((f) => `<tr><td>${esc(f.name)}${f.pname ? ` <span class="sim-mut">${esc(f.pname)}</span>` : ""}</td><td class="sim-mut">bit ${f.bit}, ${f.len}</td><td><b>${typeof f.value === "number" && !Number.isInteger(f.value) ? f.value.toPrecision(7) : f.value}</b>${typeof f.value === "number" && Number.isInteger(f.value) ? ` <span class="sim-mut">0x${(f.value >>> 0).toString(16).toUpperCase()}</span>` : ""}${f.eng !== undefined && String(f.eng) !== String(f.value) ? ` <span class="sim-mut">(${esc(f.eng)})</span>` : ""}</td></tr>`).join("")}</tbody></table>`;
  }
  renderTcHistory() {
    if (!this.el.tchist || !this.el.tchist.isConnected) return;
    const T = (v) => (v ? fmtUtc(v).slice(5) : '<span class="sim-mut">pending</span>');
    this.el.tchist.innerHTML = this.sim.tcs.map((c) => {
      const res = c.stages.exe ? `<span class="sim-status ok">✓ Completed</span>${c.note ? ` <span class="sim-small">${esc(c.note)}</span>` : ""}` : c.stages.fail ? '<span class="sim-status soft">▲ No verification TM</span>' : '<span class="sim-status inv">… In progress</span>';
      return `<tr><td>${fmtUtc(c.released).slice(5)}</td><td>${tcLink(c.cname)} <span class="sim-mut">${esc(c.def.d)}</span></td><td class="sim-nowrap">${c.seq ? `${seqLink(c.seq.name)} <span class="sim-mut">· ${esc(c.seq.label)}</span>` : '<span class="sim-mut">–</span>'}</td><td>${c.id}</td><td>${esc(c.station)}</td><td>${c.stages.onboard ? fmtUtc(c.stages.onboard).slice(5) : `<span class="sim-mut">due ${fmtUtc(c.arrive).slice(11)}</span>`}</td><td>${T(c.stages.acc)}</td><td>${T(c.stages.exe)}</td><td>${res}</td></tr>`;
    }).join("") || `<tr><td colspan="9" class="sim-mut">No commands sent yet.</td></tr>`;
  }
  renderTcStatus() { if (this.sim.running) { if (!this.tcHistT || performance.now() - this.tcHistT > 1000) { this.tcHistT = performance.now(); this.renderTcHistory(); this.renderSeqRuns(); if (this.tcMode === "seq") this.renderSeqPlan(); } } }
  // ---------------------------------------------------------------- failures & log
  buildOps(P) {
    const sim = this.sim;
    P.innerHTML = `<div class="sim-cols"><div><h4 class="sim-h4">Failure injection</h4><p class="sim-small sim-mut">Inject a fault on board and watch how it appears on the ground: through limits, invalid calibrations or the loss of the link.</p>
      ${Object.entries(FAILURES).map(([k, f]) => `<label class="sim-chk sim-fail"><input type="checkbox" data-fail="${k}" ${sim.failures.has(k) ? "checked" : ""}><span><b>${esc(f.label)}</b><br><span class="sim-small sim-mut">${esc(f.detail)}</span></span></label>`).join("")}
      <h4 class="sim-h4">Ground stations</h4><p class="sim-small sim-mut">Malargüe is the baseline station; New Norcia and Cebreros are backups. A station tracks while the spacecraft is at least 10° above its horizon, for at most 9 hours a pass.</p>
      ${STATIONS.map((s) => `<div><label class="sim-chk"><input type="checkbox" data-st="${s.id}" ${sim.stationsOn.has(s.id) ? "checked" : ""}> ${esc(s.name)} (${s.dsa}, ${s.lat.toFixed(2)}°, ${s.lon.toFixed(2)}°)</label></div>`).join("")}
      <h4 class="sim-h4">Upcoming passes</h4><div data-k="passes" class="sim-small"></div></div>
      <div><h4 class="sim-h4">Event log</h4><div class="sim-log" data-k="log"></div></div></div>`;
    P.querySelectorAll("[data-fail]").forEach((c) => c.addEventListener("change", () => sim.setFailure(c.dataset.fail, c.checked)));
    P.querySelectorAll("[data-st]").forEach((c) => c.addEventListener("change", () => { if (c.checked) sim.stationsOn.add(c.dataset.st); else sim.stationsOn.delete(c.dataset.st); this.renderPasses(); }));
    this.el.log = P.querySelector('[data-k="log"]'); this.el.passes = P.querySelector('[data-k="passes"]');
    this.renderLog(); this.renderPasses();
  }
  renderPasses() {
    const sim = this.sim, ps = sim.passes.passesAround(sim.t).filter((p) => p.los > sim.t).slice(0, 8);
    this.el.passes.innerHTML = `<table class="sim-table"><thead><tr><th>Station</th><th>AOS (UTC)</th><th>LOS (UTC)</th><th>Max el.</th></tr></thead><tbody>${ps.map((p) => `<tr class="${sim.stationsOn.has(p.st) ? "" : "sim-dim"}"><td>${esc(STATIONS.find((s) => s.id === p.st).name)}</td><td>${fmtUtc(p.aos).slice(5, 16)}</td><td>${fmtUtc(p.los).slice(5, 16)}</td><td>${p.maxEl.toFixed(0)}°</td></tr>`).join("")}</tbody></table>`;
  }
  renderLog() {
    if (!this.el.log || !this.el.log.isConnected) return;
    const ico = { good: "✓", info: "•", warn: "▲", crit: "✖" };
    this.el.log.innerHTML = this.sim.events.slice(0, 200).map((e) => `<div class="sim-ev ${e.sev}"><span class="sim-ev-i" aria-hidden="true">${ico[e.sev] || "•"}</span><span class="sim-ev-t">${fmtUtc(e.t).slice(5)}</span><span>${esc(e.text)}</span></div>`).join("") || '<p class="sim-mut">No events yet.</p>';
  }
}

boot();
