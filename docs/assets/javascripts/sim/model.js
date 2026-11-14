// OPEN-SPACE-INFO Solar Orbiter simulator: spacecraft model, space-ground link and ground segment.
// The physical models are this simulator's own simple approximations; every constant marked
// "assumption" is not taken from a source (see the page for the list). Packet layouts, parameter
// types, calibrations, limits, telecommands and synthetic-parameter formulas come from the MIB.
import {
  DEG, AU_KM, clamp, lerp, v3, noise, hashName, geometry, hgaAnglesFor, hgaDir, PassPlanner, STATIONS,
  Mib, TcBuilder, compileOL, encodeRaw, decodeRaw, buildTmHeader, parseTmHeader, readBits, bitWidth, geoVector, stationElevation, ELEV_MASK, PASS_MAX_H,
} from "./core.js";

// ---------------------------------------------------------------- constants
export const SOLAR_CONSTANT = 1361; // W/m2 at 1 au (IAU 2015 B3 nominal value)
export const SA_SIZING = 974 / 630; // W per (W/m2): 974 W at 630 W/m2 (Red Book sizing case), cold array
export const SA_T1AU_K = 325; // assumption: equilibrium temperature of an untilted wing at 1 au
export const SA_TARGET_C = 130; // assumption: wing temperature the steering law aims not to exceed
export const SA_MAX_TILT = 85; // assumption
export const SA_RATE = 0.2; // deg/s, assumption (within the SADM speed calibration, max 0.3 dg/s)
export const LOAD_PLATFORM_W = 760; // assumption, so that platform + heaters = 919 W far from the Sun (Red Book)
export const LOAD_HEATERS_W = 160; // assumption
export const LOAD_PAYLOAD_W = 180; // Red Book: 180 W to the payload in the science phase
export const RATE_1AU_KBPS = 150; // Red Book requirement at 1 au
export const RATE_MAX_KBPS = 1000; // assumption
export const SSMM_GBIT = 549; // Red Book
export const INSITU_KBPS = 12, RS_KBPS = 70; // assumptions
export const HGA_BEAM_OK = 1.0; // deg, assumption: TM lost beyond this pointing error
export const CONJ_SEP = 2.0; // deg, assumption: no link closer than this to the Sun as seen from Earth
export const WHEEL_J = 0.12, WHEEL_MAX_RPM = 2500, WHEEL_BIAS = [100, -100, 100, -100]; // assumptions (rad/s bias)
export const SRP_TORQUE_1AU = 1.2e-5; // N m, assumption
export const WOL_DURATION_S = 1200; // assumption
export const SCIENCE_START = Date.UTC(2021, 10, 27); // Earth flyby, end of cruise (Horizons object notes)

// HK generation periods: assumption (the MIB does not give them)
export const HK = {
  29500: { period: 4, label: "AOCS Dynamics FAST" },
  29516: { period: 32, label: "AOCS Dynamics SLOW" },
  33501: { period: 16, label: "PLF Summary Thermal" },
  33580: { period: 16, label: "PLF Comms Summary" },
  33582: { period: 32, label: "PLF SADE HK" },
};
// Configuration (SCV) parameters that gate validity and relevance checks: assumption (nominal side A)
export const CONFIG = {
  NCSD0PE3: 2, NCSD0PE4: 2, NCSD0PF3: 2, NCSD0PF4: 1, NCSD3KG3: 2, NCSD3KG2: 2, NCSD3KH3: 1, NCSD3KH2: 1,
  NCSD3KJ4: 2, NCSD3KK4: 1, NCSD0PN4: 2, NCSD0PS4: 2, NCST1U10: 1, NCAT42X0: 1, NCAT43P0: 1, NCAT6J70: 1,
};
// TC APID -> TM APID of the same application (inferred from the MIB: AOCS 188->178, PLF 220->210)
const TC_TO_TM_APID = { 188: 178, 220: 210, 172: 162, 236: 226 };

export const FAILURES = {
  batHeater: { label: "Battery heater stuck on", detail: "The battery heater line stays on: the battery warms towards its upper limits (ANY_2_1_1 Battery)." },
  thermOpen: { label: "Battery thermistor open circuit (RIU A)", detail: "The RIU A battery thermistor reads full scale; the raw value falls outside its calibration curve." },
  rwFriction: { label: "RW3 friction increase", detail: "Reaction wheel 3 friction torque rises sixfold (WSPD_EST_TRQ_FRIC-3)." },
  hgaStuck: { label: "HGA pointing mechanism stuck", detail: "The HGA stops moving; Earth gradually drifts out of the beam (days near aphelion, faster near perihelion) and telemetry is lost." },
  saStuck: { label: "Solar-array drive stuck", detail: "The arrays stop rotating; near the Sun the wings overheat." },
};

function thermalClass(d) {
  if (/SA (PY|MY) Wing/.test(d)) return "sa";
  if (/HGA STP|MGA STP|LGA/.test(d)) return "ant";
  if (/Battery/.test(d)) return "bat";
  if (/HREW/.test(d)) return "hrew";
  if (/SRP|Hinge|OutBoss|SpCon|MON |ANT/.test(d)) return "ext";
  return "int";
}

// SA steering law used by the simulator (assumption): smallest incidence angle keeping the wing
// below SA_TARGET_C, given the solar flux factor f = (1 au / r)^2.
export function saTiltFor(f) {
  const allowed = ((SA_TARGET_C + 273.15) / SA_T1AU_K) ** 4; // allowed effective flux factor
  if (f <= allowed) return 0;
  return Math.min(SA_MAX_TILT, Math.acos(allowed / f) / DEG);
}
export const saTempFor = (f, tilt) => SA_T1AU_K * Math.max(1e-3, f * Math.cos(tilt * DEG)) ** 0.25 - 273.15;
export function saPower(f, tilt, tC) {
  const cold = SA_T1AU_K * (630 / SOLAR_CONSTANT) ** 0.25 - 273.15; // wing temperature in the sizing case
  const eta = clamp(1 - 0.0045 * (tC - cold), 0.05, 1.2); // assumption: -0.45 %/K
  return SA_SIZING * eta * f * SOLAR_CONSTANT * Math.cos(tilt * DEG);
}
export const loadFor = (r, science) => LOAD_PLATFORM_W + LOAD_HEATERS_W * clamp((r - 0.3) / 0.7, 0, 1) + (science ? LOAD_PAYLOAD_W : 0);
export const rateFor = (dE) => Math.min(RATE_MAX_KBPS, RATE_1AU_KBPS / (dE * dE));

// remote-sensing windows: 10 days centred on perihelion and on the two latitude extremes (Red Book)
export function rsWindows(eph) {
  return eph.events.filter((e) => ["perihelion", "latmax", "latmin"].includes(e.kind) && e.t >= SCIENCE_START)
    .map((e) => ({ kind: e.kind, from: e.t - 5 * 86400000, to: e.t + 5 * 86400000 }));
}

// ---------------------------------------------------------------- simulator
export class Simulator {
  constructor(mibData, ephem) {
    this.mib = new Mib(mibData);
    this.eph = ephem;
    this.tcb = new TcBuilder(this.mib);
    this.passes = new PassPlanner(ephem);
    this.rs = rsWindows(ephem);
    this.synth = {};
    for (const [n, src] of Object.entries(mibData.synth)) if (src) { try { this.synth[n] = { fn: compileOL(src), src, refs: [...src.matchAll(/\b(N[A-Z0-9]{7})\b/g)].map((m) => m[1]) }; } catch (e) { console.warn(e); } }
    this.pidIndex = new Map();
    for (const p of Object.values(this.mib.packets)) this.pidIndex.set(`${p.apid}|${p.type}|${p.stype}|${p.type === 3 ? p.pi1 : 0}`, p);
    // thermistor models
    this.therm = {};
    const tp = this.mib.packets[33501].params.concat(this.mib.packets[33582].params, this.mib.packets[33580].params);
    for (const [n] of tp) {
      const p = this.mib.P[n];
      if (!p || !p.u || !/degc/i.test(p.u) || !/^NRU/.test(n)) continue;
      const L = mibData.lim[n];
      const soft = L && L.checks.find((c) => c.type === "S"), hard = L && L.checks.find((c) => c.type === "H");
      const lim = soft || hard;
      const lo = lim ? lim.lo : -20, hi = lim ? lim.hi : 60;
      this.therm[n] = { cls: thermalClass(p.d), mid: (lo + hi) / 2, half: (hi - lo) / 2, seed: hashName(n), twin: /^NRU1/.test(n) ? "NRU0" + n.slice(4) : null };
    }
    this.listeners = new Set();
    this.speed = 60;
    this.running = true;
    this.stationsOn = new Set(["MLG"]);
    this.failures = new Set();
    this.reset(Date.now());
  }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(kind, data) { for (const f of this.listeners) f(kind, data); }
  log(sev, text, t = this.t) { const e = { t, sev, text }; this.events.unshift(e); if (this.events.length > 400) this.events.pop(); this.emit("log", e); }

  reset(t) {
    t = clamp(t, this.eph.tStart, this.eph.tEnd);
    this.t = t;
    const g = geometry(this.eph, t);
    this.geo = g;
    const f = 1 / (g.r * g.r);
    const tilt = saTiltFor(f);
    const a = hgaAnglesFor(g.eB);
    this.sc = {
      saTilt: tilt, saCmd: tilt, saSteering: true, saMoving: false, saTempPY: saTempFor(f, tilt), saTempMY: saTempFor(f, tilt),
      hga: { az: a.az, el: a.el, tAz: a.az, tEl: a.el, mode: "AUTO", steering: true },
      twta: { on: true, warm: 0 },
      wheels: WHEEL_BIAS.slice(), wol: 0, wolFrom: null,
      temps: {}, ssmm: 120, ssc: {}, connTest: 0,
    };
    for (const [n, m] of Object.entries(this.therm)) this.sc.temps[n] = this.thermEq(n, m, g);
    this.hk = {};
    for (const [spid, h] of Object.entries(HK)) this.hk[spid] = { enabled: true, period: h.period, next: t + Math.random() * h.period * 1000 };
    this.inflight = [];
    this.uplink = [];
    this.onboardQ = [];
    this.ground = { params: new Map(), packets: [], latest: {}, recv: 0, lost: 0, lastRecv: null };
    this.hist = new Map();
    this.tcs = this.tcs || [];
    this.tcs.length = 0;
    this.tcSsc = 1;
    this.events = this.events || [];
    this.events.length = 0;
    this.lastPass = null;
    this.prevStatus = new Map();
    this.link = this.linkState(t, g);
    this.emit("reset", t);
  }
  jump(t) { this.reset(t); this.log("info", "Simulation moved to " + new Date(this.t).toISOString().slice(0, 16).replace("T", " ") + " UTC"); }

  science(t) { return t >= SCIENCE_START; }
  inRsWindow(t) { return this.rs.some((w) => t >= w.from && t <= w.to); }

  thermEq(n, m, g) {
    const f = 1 / (g.r * g.r);
    const u = clamp(Math.log(f / 0.6) / Math.log(12.8 / 0.6), 0, 1);
    let T;
    switch (m.cls) {
      case "sa": return null; // computed by the array model
      case "ant": { const exp = Math.max(0, Math.cos(g.spe * DEG)); T = m.mid + m.half * (-0.55 + 0.9 * Math.sqrt(clamp(f * exp / 12.8, 0, 1))); break; }
      case "bat": T = m.mid + m.half * (-0.2 + 0.15 * u) + (this.failures.has("batHeater") ? 22 : 0); break;
      case "hrew": T = m.mid + m.half * (-0.5 + 1.0 * u); break;
      case "ext": T = m.mid + m.half * (-0.55 + 0.9 * u); break;
      default: T = m.mid + m.half * (-0.2 + 0.3 * u);
    }
    return T;
  }

  linkState(t, g) {
    const pass = this.passes.activeAt(t, this.stationsOn);
    const st = pass ? STATIONS.find((s) => s.id === pass.st) : null;
    const conj = g.sep < CONJ_SEP;
    const hgaErr = v3.angle(hgaDir(this.sc.hga.az, this.sc.hga.el), g.eB) / DEG;
    const tx = this.sc.twta.on && hgaErr < HGA_BEAM_OK;
    const el = st ? stationElevation(st, t, g.geo) : null;
    return { pass, st, el, conj, hgaErr, tx, down: !!pass && !conj && tx, up: !!pass && !conj, rate: rateFor(g.dE) };
  }

  // ------------------------------------------------------------ main loop
  tick(dtReal) {
    if (!this.running) return;
    const dt = clamp(dtReal, 0, 0.25) * this.speed; // simulated seconds this frame
    if (dt <= 0) return;
    const t1 = Math.min(this.eph.tEnd, this.t + dt * 1000);
    const dts = (t1 - this.t) / 1000;
    this.t = t1;
    const g = geometry(this.eph, t1);
    this.geo = g;
    this.stepPhysics(dts, g);
    // on-board arrival of telecommands
    while (this.uplink.length && this.uplink[0].arrive <= t1) this.execute(this.uplink.shift());
    while (this.onboardQ.length && this.onboardQ[0].at <= t1) { const q = this.onboardQ.shift(); q.fn(q.at); }
    // housekeeping generation
    for (const [spid, h] of Object.entries(this.hk)) {
      if (!h.enabled) continue;
      if (t1 >= h.next) { this.generate(+spid, t1, g); h.next = Math.max(h.next + h.period * 1000, t1 + (dts > h.period ? 0 : 0)); if (h.next <= t1) h.next = t1 + h.period * 1000; }
    }
    // link and ground reception
    const link = this.linkState(t1, g);
    const was = this.link;
    this.link = link;
    if (!!was.pass !== !!link.pass) this.log(link.pass ? "good" : "info", link.pass ? `AOS ${link.st.name} (${link.st.dsa}), elevation ${link.el.toFixed(1)}°` : `LOS ${was.st ? was.st.name : ""}`);
    if (was.conj !== link.conj) this.log("warn", link.conj ? `Solar conjunction: Sun-Earth-probe angle ${g.sep.toFixed(1)}° < ${CONJ_SEP}°, no link` : "Solar conjunction over");
    if (was.tx && !link.tx && link.pass) this.log("warn", this.sc.twta.on ? `HGA pointing error ${link.hgaErr.toFixed(2)}° exceeds ${HGA_BEAM_OK}°: downlink lost` : "TWTA off: no downlink");
    while (this.inflight.length && this.inflight[0].arrive <= t1) {
      const pk = this.inflight.shift();
      const rx = this.passes.activeAt(pk.arrive, this.stationsOn);
      if (!rx || pk.sep < CONJ_SEP) { this.ground.lost++; continue; }
      this.receive(pk, rx);
    }
    // SSMM (science data store): production minus downlink during passes
    const prodKbps = this.science(t1) ? INSITU_KBPS + (this.inRsWindow(t1) ? RS_KBPS : 0) : 2;
    const downKbps = link.down ? link.rate * 8 / 9 : 0;
    this.sc.ssmm = clamp(this.sc.ssmm + (prodKbps - downKbps) * dts / 1e6, 0, SSMM_GBIT);
    this.timeoutTcs(t1);
    this.emit("tick", t1);
  }

  stepPhysics(dt, g) {
    const sc = this.sc, f = 1 / (g.r * g.r);
    // solar arrays
    const want = sc.saSteering ? saTiltFor(f) : sc.saCmd;
    if (sc.saSteering && Math.abs(want - sc.saCmd) > 0.5) sc.saCmd = want;
    const stuck = this.failures.has("saStuck");
    const d = sc.saCmd - sc.saTilt;
    sc.saMoving = !stuck && Math.abs(d) > 0.01;
    if (!stuck) sc.saTilt += Math.sign(d) * Math.min(Math.abs(d), SA_RATE * dt);
    const kSA = 1 - Math.exp(-dt / 600);
    const tSA = saTempFor(f, sc.saTilt);
    sc.saGradPY = (tSA - sc.saTempPY) * kSA / Math.max(dt, 1e-3);
    sc.saTempPY += (tSA - sc.saTempPY) * kSA;
    sc.saTempMY += (tSA + 0.6 - sc.saTempMY) * kSA;
    // thermistors (first-order lags)
    for (const [n, m] of Object.entries(this.therm)) {
      if (m.cls === "sa") { sc.temps[n] = /MY/.test(this.mib.P[n].d) ? sc.saTempMY : sc.saTempPY; continue; }
      const tau = m.cls === "int" ? 3 * 3600 : m.cls === "bat" ? 2 * 3600 : m.cls === "ant" ? 1800 : 3600;
      const eq = this.thermEq(n, m, g);
      sc.temps[n] += (eq - sc.temps[n]) * (1 - Math.exp(-dt / tau));
    }
    // HGA mechanism
    const h = sc.hga;
    if (h.steering && h.mode === "AUTO") { const a = hgaAnglesFor(g.eB); h.tAz = a.az; h.tEl = a.el; }
    if (!this.failures.has("hgaStuck")) {
      const step = 0.05 * dt; // deg/s, assumption
      const dAz = ((h.tAz - h.az + 540) % 360) - 180;
      h.az += Math.sign(dAz) * Math.min(Math.abs(dAz), step);
      h.el += Math.sign(h.tEl - h.el) * Math.min(Math.abs(h.tEl - h.el), step);
      h.az = ((h.az + 540) % 360) - 180;
    }
    // TWTA warm-up
    if (!sc.twta.on && sc.twta.warm > 0) { sc.twta.warm -= dt; if (sc.twta.warm <= 0) { sc.twta.on = true; } }
    // reaction wheels: solar radiation pressure torque absorbed by the wheels (assumption)
    const tq = SRP_TORQUE_1AU * f * (1 + 0.5 * Math.sin(sc.saTilt * DEG));
    const tau = [0.15 * tq, 0.6 * tq, 0.78 * tq];
    if (sc.wol > 0) {
      const u = Math.min(1, dt / sc.wol);
      for (let i = 0; i < 4; i++) sc.wheels[i] = lerp(sc.wheels[i], WHEEL_BIAS[i], u);
      sc.wol -= dt;
      if (sc.wol <= 0) { sc.wol = 0; sc.wheels = WHEEL_BIAS.slice(); }
    } else {
      for (let i = 0; i < 4; i++) sc.wheels[i] += v3.dot(PINV[i], tau) * dt / WHEEL_J;
      const maxRpm = Math.max(...sc.wheels.map((w) => Math.abs(w))) * 9.549297;
      if (maxRpm > WHEEL_MAX_RPM) this.startWol(this.t, "automatic (wheel speed above " + WHEEL_MAX_RPM + " rpm)");
    }
  }
  startWol(t, why) {
    if (this.sc.wol > 0) return false;
    this.sc.wol = WOL_DURATION_S;
    this.sc.wolFrom = t;
    this.emit("wol", t);
    this.onboardLog(t, `Wheel off-loading started (${why})`);
    return true;
  }
  schedule(at, fn) {
    const q = this.onboardQ; let i = q.length;
    while (i > 0 && q[i - 1].at > at) i--;
    q.splice(i, 0, { at, fn });
  }
  onboardLog(t, text) { this.log("info", "On board: " + text + " — seen on ground one light time later", t); }

  // ------------------------------------------------------------ parameter values (engineering)
  values(spid, t, g) {
    const sc = this.sc, V = {};
    const n = (name, seedOff, amp) => amp * noise(hashName(name) + seedOff, t / 1000);
    if (spid === 29500) {
      const r = g.rate;
      V.NCAD6VN1 = r[0] + n("r1", 1, 2e-8); V.NCAD6VN2 = r[1] + n("r2", 2, 2e-8); V.NCAD6VN3 = r[2] + n("r3", 3, 2e-8);
      const ae = sc.wol > 0 ? 3e-5 : 1.5e-6;
      V.NCAD4NP1 = n("e1", 4, ae); V.NCAD4NP2 = n("e2", 5, ae); V.NCAD4NP3 = n("e3", 6, ae);
      [V.NCAD4NE2, V.NCAD4NE3, V.NCAD6VL1, V.NCAD6VL2] = g.q;
      const w = sc.wheels;
      V.NCAT1AG0 = w[0]; V.NCAT1B10 = w[1]; V.NCAT1BK0 = w[2]; V.NCAT1C40 = w[3];
      const fr = (i) => (0.002 + 1.5e-5 * Math.abs(w[i])) * (i === 2 && this.failures.has("rwFriction") ? 6 : 1) * Math.sign(w[i] || 1);
      V.NCAD6VZ1 = fr(0); V.NCAD6VZ2 = fr(1); V.NCAD6VZ3 = fr(2); V.NCAD6VZ4 = fr(3);
    } else if (spid === 29516) {
      V.NCAT1EM0 = sc.wol > 0 ? "OCM" : "NCM"; V.NCAT1EP0 = "NONE";
      V.NCAT5K50 = "HEALTHY_UNIT"; V.NCAT5LU0 = "HEALTHY_UNIT";
      const eS = g.eB, eI = g.earthIrf, sI = g.sunIrf;
      [V.NCAD6W81, V.NCAD6W82, V.NCAD6W83] = eI; [V.NCAD6W91, V.NCAD6W92, V.NCAD6W93] = eS;
      [V.NCAD6WA1, V.NCAD6WA2, V.NCAD6WA3] = eI; [V.NCAD6WB1, V.NCAD6WB2, V.NCAD6WB3] = eS;
      [V.NCAD6WC1, V.NCAD6WC2, V.NCAD6WC3] = sI; [V.NCAD6WD1, V.NCAD6WD2, V.NCAD6WD3] = [1, 0, 0];
      const fss = (k) => [Math.sqrt(1 - 2e-8), n("fss" + k, 7, 1e-4), n("fss" + k, 8, 1e-4)];
      [V.NCAD1XA1, V.NCAD1XA2, V.NCAD1XA3] = fss("a"); [V.NCAD1XB1, V.NCAD1XB2, V.NCAD1XB3] = fss("b");
      [V.NCAD1XC1, V.NCAD1XC2, V.NCAD1XC3] = fss("c"); [V.NCAD1XD1, V.NCAD1XD2, V.NCAD1XD3] = fss("d");
      V.NCAT2W50 = g.r < 0.5 ? "NEAR_SUN" : "FAR_SUN"; V.NCAT2W60 = "SUN";
      const a = hgaAnglesFor(g.eB);
      V.NCAT6RA0 = a.az; V.NCAT6RB0 = a.el;
      V.NCAT6M70 = g.r * AU_KM * 1000;
    } else if (spid === 33501 || spid === 33582 || spid === 33580) {
      for (const [k, T] of Object.entries(sc.temps)) {
        if (!this.mib.packets[spid].params.some((p) => p[0] === k)) continue;
        const m = this.therm[k];
        let v = m.twin && sc.temps[m.twin] !== undefined ? sc.temps[m.twin] + 0.3 : T;
        V[k] = v + 0.08 * noise(m.seed, t / 16000);
      }
      if (spid === 33501) {
        for (const k of ["NRU02372", "NRU02466", "NRU02468", "NRU12372", "NRU12466", "NRU12468"]) V[k] = 1500 + 3 * noise(hashName(k), t / 60000);
        if (this.failures.has("thermOpen")) V.NRU02341 = { raw: 32767 };
      }
      if (spid === 33582) Object.assign(V, this.sadeValues(t, g));
      if (spid === 33580) Object.assign(V, this.commsValues(t, g));
    } else if (spid === 14178) {
      // TM(17,2) has no parameters beyond the header
    }
    return V;
  }
  sadeValues(t, g) {
    const sc = this.sc, V = {};
    const moving = sc.saMoving, dir = sc.saCmd >= sc.saTilt ? "ANTI_CLOCKWISE" : "CLOCKWISE";
    Object.assign(V, {
      NCFT55C0: moving ? "DRIVE" : "STANDBY", NCFT55D0: "LEVEL_16", NCFT55E0: moving ? "CONSTANT_SPEED" : "IDLE", NCFT55F0: dir,
      NCFT55G0: moving ? SA_RATE : 0, NCFT55H0: Math.abs(sc.saCmd - sc.saTilt),
      NCFT55J0: "LEVEL_16", NCFT55K0: moving ? "CONSTANT_SPEED" : "IDLE", NCFT55L0: dir === "CLOCKWISE" ? "ANTI_CLOCKWISE" : "CLOCKWISE",
      NCFT55M0: moving ? SA_RATE : 0, NCFT55N0: Math.abs(sc.saCmd - sc.saTilt),
      NCFT55P0: sc.saTilt, NCFT55U0: -sc.saTilt,
      NCFT55Y0: 30 + 8 * Math.log(1 / (g.r * g.r)), NCFT5600: 30.5 + 8 * Math.log(1 / (g.r * g.r)),
      NCFT55Z0: "NO_END_STOP", NCFT5610: "NO_END_STOP",
      NCFT5620: 28.2, NCFT5630: 5.02, NCFT5640: 15.1, NCFT5650: -15.05, NCFT5660: 34 + 2 * Math.log(1 / (g.r * g.r)),
      NCFT5670: "TABLE_1", NCFT5690: moving ? SA_RATE : 0, NCFT56B0: "TABLE_1", NCFT56D0: moving ? SA_RATE : 0,
      NCFT4W70: "TRUE", NCFT5680: sc.saCmd, NCFT56C0: -sc.saCmd,
      NCFT55T0: Math.round(sc.saTilt / (0.0727 / 512)), NCFT55X0: Math.round(sc.saTilt / (0.0727 / 512)),
      NCFT2PX0: sc.saTempPY, NCFT2PW0: sc.saTempMY,
      NCFT2PZ0: sc.saSteering ? "TRUE" : "FALSE", NCFT2PY0: "NOMINAL", NCFT2T00: "FALSE", NCFT2YU0: moving ? "TRUE" : "FALSE",
      NCFT2YT0: sc.saTempPY > 150 ? "TRUE" : "FALSE",
      NCFT3U90: sc.saGradPY || 0, NCFT3UA0: sc.saGradPY || 0, NCFT3UC0: sc.saGradPY || 0, NCFT3UD0: sc.saGradPY || 0,
      NCFT3X00: "FALSE", NCFT3WG0: "TRUE", NCFT3WZ0: "TRUE",
      NCFT2XT0: this.failures.has("saStuck") ? clamp((saTiltFor(1 / (g.r * g.r)) - sc.saTilt), -5, 5) : 0.02 * noise(11, t / 32000),
      NCFT2XS0: this.failures.has("saStuck") ? clamp((saTiltFor(1 / (g.r * g.r)) - sc.saTilt), -5, 5) : 0.02 * noise(12, t / 32000),
    });
    V.NCFT55R0 = { raw: Math.round(this.mib.uncalibrate("NCFT55P0", sc.saTilt)) };
    V.NCFT55V0 = { raw: Math.round(this.mib.uncalibrate("NCFT55U0", -sc.saTilt)) };
    return V;
  }
  commsValues(t, g) {
    const sc = this.sc, h = sc.hga, V = {};
    const on = sc.twta.on, B = (x) => (x ? "TRUE" : "FALSE");
    Object.assign(V, {
      NCFT1BY0: "FALSE", NCFT1BZ0: "FALSE", NCFT1C00: "FALSE", NCFT1C60: "TRUE", NCFT1C10: "FALSE", NCFT1C50: "FALSE",
      NCFT2XU0: 86400, NCFT2XV0: 172800, NCFT1Y00: "FALSE", NCFT2P10: B(h.steering),
      NCFT29S0: h.az, NCFT29T0: h.el, NCFT29U0: h.tAz, NCFT29W0: h.tEl, NCFT29Y0: h.tAz, NCFT29Z0: h.tEl,
      NCFT29V0: ((h.tAz - h.az + 540) % 360) - 180, NCFT29X0: h.tEl - h.el, NCFT2P00: "FALSE",
      NCFT2P40: 0, NCFT2PT0: "FALSE", NCFT2P20: "FALSE", NCFT2PU0: 0, NCFT2PV0: "FALSE", NCFT2P50: 0,
      NCFT4VR0: "WGS_POS_1", NCFT4VU0: "WGS_POS_1", NCFT4VX0: "WGS_POS_1", NCFT4W00: "WGS_POS_1", NCFT4W30: "WGS_POS_1",
      NCFT4VS0: "WGS_POS_1", NCFT4VV0: "WGS_POS_1", NCFT4VY0: "WGS_POS_1", NCFT4W10: "WGS_POS_1", NCFT4W40: "WGS_POS_1",
      NCFT5510: "WGS_POS_1", NCFT5520: "WGS_POS_1", NCFT5530: "WGS_POS_1", NCFT5540: "WGS_POS_1", NCFT5550: "WGS_POS_1",
      NCFT5570: "TWTA_A", NCFT1BW0: "HGA", NCFT1BX0: "LGA_B",
      NRU02141: on ? 0.35 + 0.01 * noise(21, t / 16000) : 0, NRU02142: on ? 3300 + 5 * noise(22, t / 16000) : 0,
      NRU02161: 0, NRU02162: 0, NRU12141: on ? 0.36 : 0, NRU12142: on ? 3302 : 0, NRU12161: 0, NRU12162: 0,
      NCFT2N20: on ? 1850 : 12, NCFT2N70: 10,
      NRUD2053: "On", NRUD2054: on ? "On" : "Off", NRUD2055: on ? "On" : "Off", NRUD2113: "Off", NRUD2114: "Off", NRUD2115: "Off",
      NRUT2053: "On", NRUT2054: on ? "On" : "Off", NRUT2055: on ? "On" : "Off", NRUT2113: "Off", NRUT2114: "Off", NRUT2115: "Off",
      NCFT2NY0: "DST_A", NCFT2NZ0: "TWTA_A", NCFT2YB0: 0, NCFT3TL0: 0,
    });
    return V;
  }

  // ------------------------------------------------------------ packets
  generate(spid, t, g, extra) {
    const pkt = this.mib.packets[spid];
    const buf = new Uint8Array(pkt.length);
    const ssc = (this.sc.ssc[pkt.apid] = ((this.sc.ssc[pkt.apid] || 0) + 1) & 0x3fff);
    buildTmHeader(buf, pkt, ssc, t);
    const V = extra || this.values(spid, t, g);
    const simulated = new Set();
    for (const [name, by, bi] of pkt.params) {
      const p = this.mib.P[name];
      if (!p) continue;
      let raw;
      if (name === "NCD030A1") raw = pkt.pi1;
      else if (V[name] === undefined) continue;
      else if (typeof V[name] === "object") raw = V[name].raw;
      else raw = this.mib.calKind(name) ? this.mib.uncalibrate(name, V[name]) : V[name];
      if (typeof raw === "string") continue;
      encodeRaw(buf, by, bi, p.ptc, p.pfc, raw);
      simulated.add(name);
    }
    const ok = this.link.tx || (this.sc.twta.on && v3.angle(hgaDir(this.sc.hga.az, this.sc.hga.el), g.eB) / DEG < HGA_BEAM_OK);
    if (ok && this.sc.twta.on) this.inflight.push({ gen: t, arrive: t + g.owlt * 1000, spid, bytes: buf, simulated, sep: g.sep });
    return buf;
  }
  receive(pk, pass) {
    const hdr = parseTmHeader(pk.bytes);
    const pi1 = hdr.service === 3 ? pk.bytes[16] : 0;
    const pkt = this.pidIndex.get(`${hdr.apid}|${hdr.service}|${hdr.subservice}|${pi1}`);
    if (!pkt) return;
    const rec = { t: pk.arrive, gen: pk.gen, spid: pkt.spid, hdr, bytes: pk.bytes, station: pass.st };
    this.ground.packets.unshift(rec);
    if (this.ground.packets.length > 250) this.ground.packets.pop();
    this.ground.latest[pkt.spid] = rec;
    this.ground.recv++;
    this.ground.lastRecv = pk.arrive;
    const ctx = (n) => { const q = this.ground.params.get(n); return q && typeof q.raw === "number" ? q.raw : CONFIG[n]; };
    const changed = [];
    for (const [name, by, bi] of pkt.params) {
      const p = this.mib.P[name];
      if (!p) continue;
      const raw = decodeRaw(pk.bytes, by, bi, p.ptc, p.pfc);
      const cal = this.mib.calibrate(name, raw);
      const valid = this.mib.isValid(name, ctx);
      const entry = { name, raw, eng: cal.v, ok: cal.ok, why: cal.why, valid, sim: pk.simulated.has(name) || name === "NCD030A1", gen: pk.gen, t: pk.arrive, spid: pkt.spid };
      this.ground.params.set(name, entry);
      changed.push(entry);
    }
    // synthetic parameters
    for (const [n, s] of Object.entries(this.synth)) {
      if (!s.refs.some((r) => pkt.params.some((p) => p[0] === r))) continue;
      try {
        const v = s.fn((ref, mode) => { const q = this.ground.params.get(ref); return q ? (mode === "raw" ? q.raw : q.eng) : NaN; });
        const entry = { name: n, raw: v, eng: v, ok: Number.isFinite(v), valid: true, sim: true, synth: true, gen: pk.gen, t: pk.arrive, spid: null };
        this.ground.params.set(n, entry);
        changed.push(entry);
      } catch (e) { /* ignore */ }
    }
    for (const e of changed) {
      const chk = e.valid && e.ok && e.sim ? this.mib.check(e.name, e.eng, ctx) : { status: e.valid ? (e.ok ? "OK" : "INV") : "INV" };
      e.status = chk.status;
      e.hit = chk.hit;
      if (typeof e.eng === "number" && e.valid && e.ok) this.record(e.name, pk.gen, e.eng);
      const prev = this.prevStatus.get(e.name);
      if (prev === undefined && (e.status === "OK" || e.status === "INV")) { this.prevStatus.set(e.name, e.status); continue; }
      if (e.sim && prev !== e.status) {
        if (e.status === "S" || e.status === "H") this.log(e.status === "H" ? "crit" : "warn", `${e.name} ${this.mib.P[e.name]?.d || ""}: ${typeof e.eng === "number" ? e.eng.toFixed(2) : e.eng} ${this.mib.P[e.name]?.u || ""} — ${e.status === "H" ? "hard" : "soft"} limit${e.hit && e.hit.lo !== undefined ? ` (${e.hit.lo}${e.hit.hi !== undefined ? " … " + e.hit.hi : ""})` : ""}`, pk.arrive);
        else if (e.status === "INV" && prev !== "INV") this.log("warn", `${e.name} ${this.mib.P[e.name]?.d || ""}: invalid (${e.why || "validity condition"})`, pk.arrive);
        else if (e.status === "OK" && (prev === "S" || prev === "H")) this.log("good", `${e.name} back within limits`, pk.arrive);
        this.prevStatus.set(e.name, e.status);
      }
    }
    if (pkt.type === 1 || pkt.type === 17) this.verify(pkt, rec);
    this.emit("packet", rec);
  }
  record(name, t, v) {
    let h = this.hist.get(name);
    if (!h) { h = { t: new Float64Array(900), v: new Float64Array(900), i: 0, n: 0 }; this.hist.set(name, h); }
    h.t[h.i] = t; h.v[h.i] = v; h.i = (h.i + 1) % 900; h.n = Math.min(900, h.n + 1);
  }
  series(name) {
    const h = this.hist.get(name);
    if (!h) return { t: [], v: [] };
    const t = new Array(h.n), v = new Array(h.n);
    for (let k = 0; k < h.n; k++) { const j = (h.i - h.n + k + 900) % 900; t[k] = h.t[j]; v[k] = h.v[j]; }
    return { t, v };
  }

  // ------------------------------------------------------------ commanding
  send(cname, values) {
    const params = this.tcb.editable(cname);
    for (const p of params) {
      const err = this.tcb.checkValue(p, values[p.name]);
      if (err) return { ok: false, error: `${p.name} (${p.descr}): ${err}` };
    }
    const link = this.link;
    if (!link.up) return { ok: false, error: link.conj ? "No uplink: solar conjunction" : "No uplink: no ground station in view. Use “Next pass” or enable a backup station." };
    const ssc = this.tcSsc++;
    const built = this.tcb.build(cname, values, ssc);
    const def = this.tcb.def(cname);
    const tc = {
      id: ssc, cname, def, values: { ...values }, built, released: this.t, station: link.st.name,
      arrive: this.t + this.geo.owlt * 1000, stages: { onboard: null, acc: null, exe: null, fail: null }, ack: def.ack, note: "",
    };
    this.tcs.unshift(tc);
    this.uplink.push(tc);
    this.uplink.sort((a, b) => a.arrive - b.arrive);
    this.log("info", `TC ${cname} “${def.d}” released via ${link.st.name}; arrives on board in ${(this.geo.owlt / 60).toFixed(1)} min`);
    this.emit("tc", tc);
    return { ok: true, tc };
  }
  execute(tc) {
    const t = tc.arrive, g = geometry(this.eph, t);
    tc.stages.onboard = t;
    const sc = this.sc;
    // TM(1,1) acceptance report
    const ackVals = { NCD01011: tc.built.packetId, NCD01012: tc.built.seqCtrl };
    if (tc.ack & 8) this.generate(14181, t, g, ackVals);
    const done = (delay, note) => this.schedule(t + delay * 1000, (at) => { if (tc.ack & 1) this.generate(14182, at, geometry(this.eph, at), ackVals); if (note) tc.note = note; });
    const v = tc.values;
    switch (tc.cname) {
      case "ZCD01101": this.schedule(t + 500, (at) => this.generate(14178, at, geometry(this.eph, at), {})); done(1); break;
      case "ZCSD0004": sc.saSteering = true; done(1, "SA steering enabled"); break;
      case "ZCSD0003": sc.saSteering = false; sc.saCmd = sc.saTilt; done(1, "SA steering disabled: arrays hold position"); break;
      case "ZCSD3713": {
        sc.hga.steering = true; sc.hga.mode = v.PCSB0152;
        if (v.PCSB0152 === "MANUAL") { sc.hga.tAz = Number(v.PCSB0032); sc.hga.tEl = Number(v.PCSB0052); }
        done(2, v.PCSB0152 === "AUTO" ? "HGA tracks Earth" : `HGA moves to az ${(+v.PCSB0032).toFixed(1)}°, el ${(+v.PCSB0052).toFixed(1)}°`); break;
      }
      case "ZCSD3714": sc.hga.steering = false; sc.hga.tAz = sc.hga.az; sc.hga.tEl = sc.hga.el; done(1, "HGA steering stopped: antenna holds position"); break;
      case "ZCSD1013": done(1, v.PCSB00BC === "TWTA_A" ? "TWTA A off: no downlink" : "TWTA B was already off"); if (v.PCSB00BC === "TWTA_A") this.schedule(t + 1500, () => { sc.twta.on = false; sc.twta.warm = 0; }); break;
      case "ZCSD1012": {
        const a = v.PCSB00BC === "TWTA_A", wasOn = sc.twta.on;
        if (a && !wasOn) sc.twta.warm = 180;
        done(a && !wasOn ? 185 : 1, !a ? "TWTA B is not modelled by the simulator" : wasOn ? "TWTA A was already on" : "TWTA A on after 180 s warm-up (assumption)"); break;
      }
      case "ZCAD482A": { const ok = this.startWol(t, "commanded by ZCAD482A"); done(ok ? WOL_DURATION_S : 1, ok ? "Off-loading complete" : "Off-loading already in progress"); break; }
      case "ZCF00305": case "ZCF00306": case "ZCA00305": case "ZCA00306": {
        const tmApid = TC_TO_TM_APID[tc.def.apid], sid = Number(v.PCD03011), on = tc.def.stype === 5;
        const pk = Object.values(this.mib.packets).find((p) => p.type === 3 && p.stype === 25 && p.apid === tmApid && p.pi1 === sid);
        if (pk && this.hk[pk.spid]) { this.hk[pk.spid].enabled = on; if (on) this.hk[pk.spid].next = t; done(1, `${pk.descr} (SID ${sid}) ${on ? "enabled" : "disabled"}`); }
        else done(1, `SID ${sid} on APID ${tmApid} is not generated by this simulator`);
        break;
      }
      default: done(1);
    }
    this.emit("tc", tc);
  }
  verify(pkt, rec) {
    const pid = readBits(rec.bytes, 128, 16), seq = readBits(rec.bytes, 144, 16);
    if (pkt.type === 17) { this.log("good", "TM(17,2) connection test report received", rec.t); return; }
    const tc = this.tcs.find((c) => c.built.packetId === pid && c.built.seqCtrl === seq);
    if (!tc) return;
    if (pkt.stype === 1) tc.stages.acc = rec.t;
    if (pkt.stype === 7) tc.stages.exe = rec.t;
    this.log("good", `TC ${tc.cname}: TM(1,${pkt.stype}) ${pkt.stype === 1 ? "acceptance" : "execution completed"}${pkt.stype === 7 && tc.note ? " — " + tc.note : ""}`, rec.t);
    this.emit("tc", tc);
  }
  timeoutTcs(t) {
    for (const tc of this.tcs) {
      if (tc.stages.exe || tc.stages.fail) continue;
      const due = tc.released + (2 * this.geo.owlt + 1800 + (tc.cname === "ZCAD482A" ? WOL_DURATION_S : 0)) * 1000;
      if (t > due) { tc.stages.fail = t; this.log("warn", `TC ${tc.cname}: verification timed out (no TM received)`); this.emit("tc", tc); }
    }
  }
  setFailure(id, on) {
    if (on) this.failures.add(id); else this.failures.delete(id);
    this.log(on ? "warn" : "info", `${on ? "Injected" : "Cleared"} failure: ${FAILURES[id].label}`);
  }
}

// Wheel pyramid (assumption): four wheels at 45 deg + k*90 deg azimuth, 30 deg elevation about body Z.
const A = [0, 1, 2, 3].map((k) => { const ph = (45 + 90 * k) * DEG, el = 30 * DEG; return [Math.cos(el) * Math.cos(ph), Math.cos(el) * Math.sin(ph), Math.sin(el)]; });
const PINV = (() => {
  // pseudo-inverse A+ = A^T (A A^T)^-1 for the 4x3 matrix whose rows are the wheel axes
  const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const a of A) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) M[i][j] += a[i] * a[j];
  const det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const inv = [
    [(M[1][1] * M[2][2] - M[1][2] * M[2][1]) / det, (M[0][2] * M[2][1] - M[0][1] * M[2][2]) / det, (M[0][1] * M[1][2] - M[0][2] * M[1][1]) / det],
    [(M[1][2] * M[2][0] - M[1][0] * M[2][2]) / det, (M[0][0] * M[2][2] - M[0][2] * M[2][0]) / det, (M[0][2] * M[1][0] - M[0][0] * M[1][2]) / det],
    [(M[1][0] * M[2][1] - M[1][1] * M[2][0]) / det, (M[0][1] * M[2][0] - M[0][0] * M[2][1]) / det, (M[0][0] * M[1][1] - M[0][1] * M[1][0]) / det],
  ];
  return A.map((a) => [0, 1, 2].map((j) => a[0] * inv[0][j] + a[1] * inv[1][j] + a[2] * inv[2][j]));
})();

// ---------------------------------------------------------------- mission profile (daily, whole mission)
export async function missionProfile(sim, onProgress) {
  const eph = sim.eph, n = eph.n;
  const out = { t: [], r: [], hglat: [], dE: [], owlt: [], sep: [], tilt: [], saT: [], pAv: [], load: [], rate: [], passH: [], down: [], prod: [], ssmm: [] };
  let ssmm = 0;
  const st = STATIONS[0];
  for (let i = 0; i < n; i++) {
    const t = eph.tStart + i * 86400000;
    const g = geometry(eph, t);
    const f = 1 / (g.r * g.r), tilt = saTiltFor(f), T = saTempFor(f, tilt);
    // Malargüe visibility, sampled every 15 min, clipped to a 9-hour scheduled pass
    let vis = 0;
    for (let k = 0; k < 96; k++) { const tk = t + k * 900000; if (stationElevation(st, tk, geoVector(eph, tk)) >= ELEV_MASK) vis += 0.25; }
    const passH = g.sep < CONJ_SEP ? 0 : Math.min(vis, PASS_MAX_H);
    const rate = rateFor(g.dE);
    const down = rate * passH * 3600 * 8 / 9 / 1e6; // Gbit/day
    const prod = (t >= SCIENCE_START ? INSITU_KBPS + (sim.inRsWindow(t) ? RS_KBPS : 0) : 2) * 86400 / 1e6;
    ssmm = clamp(ssmm + prod - down, 0, SSMM_GBIT);
    out.t.push(t); out.r.push(g.r); out.hglat.push(g.hglat); out.dE.push(g.dE); out.owlt.push(g.owlt / 60); out.sep.push(g.sep);
    out.tilt.push(tilt); out.saT.push(T); out.pAv.push(saPower(f, tilt, T)); out.load.push(loadFor(g.r, t >= SCIENCE_START));
    out.rate.push(rate); out.passH.push(passH); out.down.push(down); out.prod.push(prod); out.ssmm.push(ssmm);
    if (i % 200 === 199) { onProgress && onProgress(i / n); await new Promise((r) => setTimeout(r, 0)); }
  }
  return out;
}
