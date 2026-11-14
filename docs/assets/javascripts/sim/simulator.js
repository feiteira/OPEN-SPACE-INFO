// OPEN-SPACE-INFO Solar Orbiter simulator: page UI.
import { Ephemeris, STATIONS, hex, parseTmHeader, ptcName, bitWidth, OBT_EPOCH_MS, obtOf } from "./core.js";
import { Simulator, FAILURES, HK, missionProfile, SSMM_GBIT, CONJ_SEP, rsWindows, SA_TARGET_C, HGA_BEAM_OK } from "./model.js";
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
    if (!h2.get("t")) return;
    const t2 = Date.parse(h2.get("t").length <= 16 ? h2.get("t") + "Z" : h2.get("t"));
    if (Number.isFinite(t2)) { sim.jump(t2); ui.afterJump(); }
    if (h2.get("speed")) { sim.speed = +h2.get("speed"); ui.el.speed.value = h2.get("speed"); }
    if (h2.get("view")) ui.root.querySelector(`[data-view="${h2.get("view") === "craft" ? "craft" : "system"}"]`)?.click();
    if (h2.get("tab")) ui.root.querySelector(`[data-tab="${h2.get("tab")}"]`)?.click();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

class UI {
  constructor(root, sim, mib, eph, q = new URLSearchParams()) {
    this.root = root; this.sim = sim; this.mib = mib; this.ephRaw = eph;
    this.tab = ["tm", "plots", "profile", "packets", "tc", "ops"].includes(q.get("tab")) ? q.get("tab") : "tm";
    this.pktFilter = HK[q.get("pkt")] || ["synth", "verif"].includes(q.get("pkt")) ? q.get("pkt") : "33501";
    this.initialView = q.get("view") === "craft" ? "craft" : "system"; this.selPkt = null; this.plotList = ["NCASX003", "NRU02263", "NCFT55P0", "NRU02664", "NRU02341", "NCASXAG0", "NCASXB10", "NCASXBK0", "NCASXC40", "NCFT29V0", "NRU02141"];
    this.tcSel = "ZCD01101"; this.tcVals = {};
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
    const TABS = [["tm", "Telemetry"], ["plots", "Plots"], ["profile", "Mission profile"], ["packets", "Packets"], ["tc", "Commanding"], ["ops", "Failures & log"]];
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
    if (kind === "tc" && this.tab === "tc") this.renderTcHistory();
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
      <div class="sim-scroll sim-tablewrap"><table class="sim-table"><thead><tr><th>Parameter</th><th>Description</th><th>Raw</th><th>Engineering</th><th>Unit</th><th>Limits (MIB)</th><th>Status</th><th>Generated on board (UTC)</th><th title="Add to plots">Plot</th></tr></thead><tbody data-k="tmbody"></tbody></table></div>
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
      this.el.pkthdr.innerHTML = `Packet ${pktLink(f)} · <b>${esc(pk.descr)}</b> · APID ${pk.apid} · TM(${pk.type},${pk.stype}) SID ${pk.pi1} · ${pk.length} octets · every ${HK[f].period} s (assumed)${hk && !hk.enabled ? ' · <b class="sim-warn-t">generation disabled by TC</b>' : ""} · ${last ? `last received ${fmtUtc(last.t).slice(11)} UTC via ${esc(STATIONS.find((s) => s.id === last.station)?.name)}` : "not received yet"}`;
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
        <td>${q && typeof q.eng === "number" ? `<button class="sim-star ${plotted ? "on" : ""}" data-plot="${esc(n)}" title="${plotted ? "Remove from" : "Add to"} the Plots tab">${plotted ? "★" : "☆"}</button>` : ""}</td></tr>`);
    }
    this.el.tmbody.innerHTML = rows.join("") || `<tr><td colspan="9" class="sim-mut">No telemetry received yet. Telemetry flows only during a ground-station pass: press “Next pass ▸”.</td></tr>`;
  }
  // ---------------------------------------------------------------- plots
  buildPlots(P) {
    P.innerHTML = `<p class="sim-foot">Live telemetry as decoded on the ground, plotted against the on-board generation time. Add or remove parameters with the ☆ buttons in the Telemetry tab. Limit lines are the MIB soft (amber) and hard (red) limits that apply in the current configuration.</p><div class="sim-grid" data-k="plotgrid"></div>`;
    const grid = P.querySelector('[data-k="plotgrid"]');
    for (const n of this.plotList) {
      const p = this.mib.params[n] || {};
      const card = h("div", { class: "sim-card" });
      card.innerHTML = `<div class="sim-card-h"><div>${paramLink(n)} <span class="sim-mut">${esc(p.d || "")}</span></div><div class="sim-card-v" data-v></div></div>`;
      grid.append(card);
      const ch = new LineChart(card, { height: 140, unit: p.u || "" });
      ch.valueEl = card.querySelector("[data-v]");
      this.charts.set(n, ch);
    }
    this.renderPlots();
  }
  renderPlots() {
    const sim = this.sim;
    for (const [n, ch] of this.charts) {
      if (!ch.valueEl) continue;
      const s = sim.series(n), p = this.mib.params[n] || {};
      const q = sim.ground.params.get(n);
      ch.valueEl.innerHTML = q && typeof q.eng === "number" ? `<b>${fmtEng(q.eng, p)}</b> ${esc(p.u || "")}` : "";
      const lim = sim.mib.limitsFor(n, (x) => { const v = sim.ground.params.get(x); return v && typeof v.raw === "number" ? v.raw : undefined; });
      const limits = [];
      for (const L of lim) { if (L.lo !== undefined) limits.push({ v: L.lo, kind: L.type, label: `${L.type === "H" ? "hard" : "soft"} low ${L.lo}` }); if (L.hi !== undefined) limits.push({ v: L.hi, kind: L.type, label: `${L.type === "H" ? "hard" : "soft"} high ${L.hi}` }); }
      ch.set({ series: [{ name: n, t: s.t, v: s.v }], limits, unit: p.u || "", empty: "Waiting for telemetry: it flows during ground-station passes" });
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
    const tcs = this.mib.tcs;
    P.innerHTML = `<div class="sim-tcgrid"><div class="sim-tclist">${Object.entries(tcs).map(([k, c]) => `<button data-tc="${k}" class="${k === this.tcSel ? "on" : ""}"><b>${esc(k)}</b><span>${esc(c.d)}</span><span class="sim-mut">TC(${c.type},${c.stype}) · APID ${c.apid}</span></button>`).join("")}</div>
      <div class="sim-tcform" data-k="tcform"></div></div>
      <h4 class="sim-h4">Command history</h4><div class="sim-scroll"><table class="sim-table"><thead><tr><th>Released (UTC)</th><th>Command</th><th>SSC</th><th>Via</th><th>On board (UTC)</th><th>TM(1,1) accepted</th><th>TM(1,7) completed</th><th>Result</th></tr></thead><tbody data-k="tchist"></tbody></table></div>`;
    P.querySelectorAll("[data-tc]").forEach((b) => b.addEventListener("click", () => { this.tcSel = b.dataset.tc; this.tcVals = {}; P.querySelectorAll("[data-tc]").forEach((x) => x.classList.toggle("on", x === b)); this.renderTcForm(); }));
    this.el.tcform = P.querySelector('[data-k="tcform"]'); this.el.tchist = P.querySelector('[data-k="tchist"]');
    this.renderTcForm();
    this.renderTcHistory();
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
      return `<tr><td>${fmtUtc(c.released).slice(5)}</td><td>${tcLink(c.cname)} <span class="sim-mut">${esc(c.def.d)}</span></td><td>${c.id}</td><td>${esc(c.station)}</td><td>${c.stages.onboard ? fmtUtc(c.stages.onboard).slice(5) : `<span class="sim-mut">due ${fmtUtc(c.arrive).slice(11)}</span>`}</td><td>${T(c.stages.acc)}</td><td>${T(c.stages.exe)}</td><td>${res}</td></tr>`;
    }).join("") || `<tr><td colspan="8" class="sim-mut">No commands sent yet.</td></tr>`;
  }
  renderTcStatus() { if (this.sim.running) { if (!this.tcHistT || performance.now() - this.tcHistT > 1000) { this.tcHistT = performance.now(); this.renderTcHistory(); } } }
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
