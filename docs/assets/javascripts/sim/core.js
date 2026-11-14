// OPEN-SPACE-INFO Solar Orbiter simulator: data access, geometry, packet codec, calibration,
// monitoring checks and the OL expression evaluator. No DOM access in this module.
// All MIB definitions come from docs/simulator/data/mib.json (built by tools/build_simulator.py).

export const AU_KM = 149597870.7;
export const C_KMS = 299792.458;
export const LT_AU_S = AU_KM / C_KMS; // 499.004784 s
export const DEG = Math.PI / 180;
export const OBLIQUITY = 23.4392911 * DEG; // IAU 1980 mean obliquity of J2000 (84381.448")
export const TDB_MINUS_UTC_S = 69.184; // 37 leap seconds + 32.184 s (TDB-TT periodic terms < 2 ms ignored)
export const OBT_EPOCH_MS = Date.UTC(2000, 0, 1);

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, u) => a + (b - a) * u;
export const v3 = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  norm: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  angle: (a, b) => Math.acos(clamp(v3.dot(v3.norm(a), v3.norm(b)), -1, 1)),
};
export const eclToEq = (v) => {
  const c = Math.cos(OBLIQUITY), s = Math.sin(OBLIQUITY);
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
};
export const utcToJdTdb = (ms) => ms / 86400000 + 2440587.5 + TDB_MINUS_UTC_S / 86400;
export const jdTdbToUtc = (jd) => (jd - 2440587.5) * 86400000 - TDB_MINUS_UTC_S * 1000;

// Seeded noise so that the same time always gives the same "measurement" noise.
export function noise(seed, t) {
  let h = (seed * 374761393 + Math.floor(t) * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 4294967296 * 2 - 1;
}
export function hashName(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

// ------------------------------------------------------------------ ephemeris
export class Ephemeris {
  constructor(d) {
    this.d = d;
    this.jd0 = d.jd0_tdb;
    this.n = d.n;
    this.bodies = {};
    for (const [k, arr] of Object.entries(d.bodies)) this.bodies[k] = Int32Array.from(arr);
    this.hglat = Int32Array.from(d.hglat);
    this.events = d.events.map((e) => ({ ...e, t: jdTdbToUtc(e.jd) }));
    this.tStart = jdTdbToUtc(this.jd0);
    this.tEnd = jdTdbToUtc(this.jd0 + this.n - 1);
  }
  // Cubic Hermite interpolation of position (au) and velocity (au/day) between daily samples.
  state(body, jd) {
    const A = this.bodies[body];
    let x = jd - this.jd0;
    x = clamp(x, 0, this.n - 1.000001);
    const i = Math.floor(x), u = x - i, j = i * 6, k = j + 6;
    const p0 = [A[j] * 1e-6, A[j + 1] * 1e-6, A[j + 2] * 1e-6], v0 = [A[j + 3] * 1e-8, A[j + 4] * 1e-8, A[j + 5] * 1e-8];
    const p1 = [A[k] * 1e-6, A[k + 1] * 1e-6, A[k + 2] * 1e-6], v1 = [A[k + 3] * 1e-8, A[k + 4] * 1e-8, A[k + 5] * 1e-8];
    const u2 = u * u, u3 = u2 * u;
    const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
    const d00 = 6 * u2 - 6 * u, d10 = 3 * u2 - 4 * u + 1, d01 = -6 * u2 + 6 * u, d11 = 3 * u2 - 2 * u;
    const p = [0, 1, 2].map((c) => h00 * p0[c] + h10 * v0[c] + h01 * p1[c] + h11 * v1[c]);
    const v = [0, 1, 2].map((c) => d00 * p0[c] + d10 * v0[c] + d01 * p1[c] + d11 * v1[c]);
    return { p, v };
  }
  pos(body, jd) { return this.state(body, jd).p; }
  sample(body, i) { const A = this.bodies[body], j = i * 6; return [A[j] * 1e-6, A[j + 1] * 1e-6, A[j + 2] * 1e-6]; }
  hgLat(jd) {
    let x = clamp(jd - this.jd0, 0, this.n - 1.000001);
    const i = Math.floor(x), u = x - i;
    return lerp(this.hglat[i], this.hglat[i + 1], u) / 1000;
  }
}

// ------------------------------------------------------------------ geometry
// Body frame used by the simulator (a simplification, see the page): +X towards the Sun (heat shield),
// +Z towards the projection of ecliptic north on the plane normal to X, +Y completes the right-handed set.
export function bodyAxes(S) {
  const X = v3.norm(v3.scale(S, -1));
  const N = [0, 0, 1];
  const Z = v3.norm(v3.sub(N, v3.scale(X, v3.dot(N, X))));
  const Y = v3.cross(Z, X);
  return { X, Y, Z };
}
export const toBody = (ax, v) => [v3.dot(v, ax.X), v3.dot(v, ax.Y), v3.dot(v, ax.Z)];

export function quatFromAxes(ax) {
  // Columns of R are the body axes in EME2000 (R maps body -> inertial). Returns [qx, qy, qz, qs].
  const X = eclToEq(ax.X), Y = eclToEq(ax.Y), Z = eclToEq(ax.Z);
  const m00 = X[0], m01 = Y[0], m02 = Z[0], m10 = X[1], m11 = Y[1], m12 = Z[1], m20 = X[2], m21 = Y[2], m22 = Z[2];
  const tr = m00 + m11 + m22;
  let qx, qy, qz, qs;
  if (tr > 0) { const s = Math.sqrt(tr + 1) * 2; qs = 0.25 * s; qx = (m21 - m12) / s; qy = (m02 - m20) / s; qz = (m10 - m01) / s; }
  else if (m00 > m11 && m00 > m22) { const s = Math.sqrt(1 + m00 - m11 - m22) * 2; qs = (m21 - m12) / s; qx = 0.25 * s; qy = (m01 + m10) / s; qz = (m02 + m20) / s; }
  else if (m11 > m22) { const s = Math.sqrt(1 + m11 - m00 - m22) * 2; qs = (m02 - m20) / s; qx = (m01 + m10) / s; qy = 0.25 * s; qz = (m12 + m21) / s; }
  else { const s = Math.sqrt(1 + m22 - m00 - m11) * 2; qs = (m10 - m01) / s; qx = (m02 + m20) / s; qy = (m12 + m21) / s; qz = 0.25 * s; }
  if (qs < 0) { qx = -qx; qy = -qy; qz = -qz; qs = -qs; }
  return [qx, qy, qz, qs];
}

export function geometry(eph, tMs) {
  const jd = utcToJdTdb(tMs);
  const so = eph.state("solo", jd), ea = eph.state("earth", jd);
  const S = so.p, E = ea.p;
  const r = v3.len(S);
  const ES = v3.sub(S, E), dE = v3.len(ES);
  const ax = bodyAxes(S);
  const toEarth = v3.norm(v3.sub(E, S));
  const eB = toBody(ax, toEarth);
  // body rates from the frame rotation over 60 s (rad/s, body components)
  const S2 = eph.pos("solo", jd + 60 / 86400), ax2 = bodyAxes(S2);
  const w = v3.scale(v3.add(v3.add(v3.cross(ax.X, v3.sub(ax2.X, ax.X)), v3.cross(ax.Y, v3.sub(ax2.Y, ax.Y))), v3.cross(ax.Z, v3.sub(ax2.Z, ax.Z))), 0.5 / 60);
  return {
    t: tMs, jd, S, V: so.v, E, VE: ea.v, r, dE, owlt: dE * LT_AU_S,
    sep: v3.angle(v3.scale(ES, 1), v3.scale(E, -1)) / DEG, // Sun-Earth-probe angle seen from Earth
    spe: v3.angle(v3.scale(S, -1), v3.sub(E, S)) / DEG, // Sun-probe-Earth angle seen from the spacecraft
    hglat: eph.hgLat(jd), eclat: Math.asin(S[2] / r) / DEG,
    speed: v3.len(so.v) * AU_KM / 86400,
    ax, eB, sunB: [1, 0, 0], q: quatFromAxes(ax), rate: toBody(ax, w),
    earthIrf: eclToEq(toEarth), sunIrf: eclToEq(v3.norm(v3.scale(S, -1))),
    geo: eclToEq(ES), // geocentric spacecraft vector, equatorial J2000 (au)
  };
}

// HGA pointing convention adopted by the simulator: azimuth = atan2(eY, eX) in the body X-Y plane,
// elevation = -(angle between the target and body +Z), so the MIB command range -180..0 deg applies.
export const hgaAnglesFor = (eB) => ({ az: Math.atan2(eB[1], eB[0]) / DEG, el: -Math.acos(clamp(eB[2], -1, 1)) / DEG });
export const hgaDir = (az, el) => { const th = -el * DEG, a = az * DEG; return [Math.sin(th) * Math.cos(a), Math.sin(th) * Math.sin(a), Math.cos(th)]; };

// ------------------------------------------------------------------ ground stations
export const STATIONS = [
  { id: "MLG", name: "Malargüe", dsa: "DSA 3", lat: -35.776, lon: -69.398, mibId: 25 },
  { id: "NNO", name: "New Norcia", dsa: "DSA 1", lat: -31.048, lon: 116.191, mibId: 23 },
  { id: "CEB", name: "Cebreros", dsa: "DSA 2", lat: 40.453, lon: -4.368, mibId: 24 },
];
export const ELEV_MASK = 10; // deg, simulator assumption
export const PASS_MAX_H = 9; // h, Red Book nominal Malargüe pass length

export function geoVector(eph, tMs) {
  const jd = utcToJdTdb(tMs);
  return eclToEq(v3.sub(eph.pos("solo", jd), eph.pos("earth", jd)));
}
export function gmstDeg(tMs) {
  const jd = tMs / 86400000 + 2440587.5;
  return ((280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360 + 360) % 360;
}
export function stationElevation(st, tMs, geo) {
  const ra = Math.atan2(geo[1], geo[0]), dec = Math.asin(geo[2] / v3.len(geo));
  const H = (gmstDeg(tMs) + st.lon) * DEG - ra, phi = st.lat * DEG;
  return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) / DEG;
}

export class PassPlanner {
  constructor(eph) { this.eph = eph; this.cache = new Map(); }
  // Scheduled passes overlapping UTC day `day` (integer days since 1970), for every station.
  day(day) {
    if (this.cache.has(day)) return this.cache.get(day);
    // passes are owned by the UTC day in which they rise; the window runs on for 24 h so none is cut short
    const step = 5 * 60000, d0 = day * 86400000, t0 = d0 - 3600000, t1 = d0 + 48 * 3600000;
    const out = [], cur = {};
    for (let t = t0; t <= t1; t += step) {
      const g = geoVector(this.eph, t);
      for (const st of STATIONS) {
        const el = stationElevation(st, t, g);
        let c = cur[st.id];
        if (el >= ELEV_MASK) {
          if (!c) c = cur[st.id] = { st: st.id, aos: t, los: t, maxEl: el, tmax: t };
          c.los = t;
          if (el > c.maxEl) { c.maxEl = el; c.tmax = t; }
        } else if (c) { out.push(c); cur[st.id] = null; }
      }
    }
    for (const c of Object.values(cur)) if (c) out.push(c);
    for (let k = out.length - 1; k >= 0; k--) if (out[k].aos < d0 || out[k].aos >= d0 + 86400000) out.splice(k, 1);
    for (const p of out) {
      p.visAos = p.aos; p.visLos = p.los;
      if (p.los - p.aos > PASS_MAX_H * 3600000) { p.aos = p.tmax - PASS_MAX_H * 1800000; p.los = p.tmax + PASS_MAX_H * 1800000; }
    }
    if (this.cache.size > 64) this.cache.clear();
    this.cache.set(day, out);
    return out;
  }
  passesAround(tMs) {
    const d = Math.floor(tMs / 86400000);
    const all = [];
    for (const dd of [d - 1, d, d + 1]) for (const p of this.day(dd)) all.push(p);
    return all.sort((a, b) => a.aos - b.aos);
  }
  activeAt(tMs, enabled) {
    return this.passesAround(tMs).find((p) => enabled.has(p.st) && tMs >= p.aos && tMs <= p.los) || null;
  }
  next(tMs, enabled) {
    for (let k = 0; k < 4; k++) {
      const ps = this.passesAround(tMs + k * 86400000).filter((p) => enabled.has(p.st) && p.aos > tMs);
      if (ps.length) return ps[0];
    }
    return null;
  }
}

// ------------------------------------------------------------------ PTC/PFC
export function bitWidth(ptc, pfc) {
  if (ptc === 1) return 1;
  if (ptc === 2) return pfc;
  if (ptc === 3 || ptc === 4) return pfc <= 12 ? pfc + 4 : ({ 13: 24, 14: 32, 15: 48, 16: 64 })[pfc] || 0;
  if (ptc === 5) return pfc === 1 ? 32 : pfc === 2 ? 64 : pfc === 3 ? 32 : 48;
  if (ptc === 7 || ptc === 8) return pfc * 8;
  if (ptc === 9) return ({ 1: 48, 2: 64, 3: 8, 4: 16 })[pfc] || 48;
  return 0;
}
export const ptcName = (ptc, pfc) => ({ 1: "boolean", 2: `enumerated, ${pfc} bits`, 3: `unsigned integer, ${bitWidth(3, pfc)} bits`,
  4: `signed integer, ${bitWidth(4, pfc)} bits`, 5: pfc === 1 ? "IEEE 754 single precision" : pfc === 2 ? "IEEE 754 double precision" : "MIL-STD-1750A real",
  7: `octet string, ${pfc} octets`, 8: `ASCII string, ${pfc} characters`, 9: "absolute time" })[ptc] || `PTC ${ptc}`;

export function writeBits(buf, bitOff, n, value) {
  // value: non-negative integer < 2^n (n <= 32)
  if ((bitOff & 7) === 0 && (n & 7) === 0) {
    // byte-aligned fast path: big-endian octets
    for (let b = (bitOff >> 3) + (n >> 3) - 1; b >= bitOff >> 3; b--) { if (b < buf.length) buf[b] = value % 256; value = Math.floor(value / 256); }
    return;
  }
  for (let i = 0; i < n; i++) {
    const bit = Math.floor(value / 2 ** (n - 1 - i)) & 1;
    const b = bitOff + i, byte = b >> 3, sh = 7 - (b & 7);
    if (byte >= buf.length) return;
    buf[byte] = (buf[byte] & ~(1 << sh)) | (bit << sh);
  }
}
export function readBits(buf, bitOff, n) {
  let v = 0;
  if ((bitOff & 7) === 0 && (n & 7) === 0) {
    for (let b = bitOff >> 3, e = b + (n >> 3); b < e; b++) v = v * 256 + (b < buf.length ? buf[b] : 0);
    return v;
  }
  for (let i = 0; i < n; i++) {
    const b = bitOff + i, byte = b >> 3;
    v = v * 2 + (byte < buf.length ? (buf[byte] >> (7 - (b & 7))) & 1 : 0);
  }
  return v;
}
export function encodeRaw(buf, byteOff, bitOff, ptc, pfc, raw) {
  const n = bitWidth(ptc, pfc), off = byteOff * 8 + bitOff;
  if (ptc === 5) {
    const dv = new DataView(buf.buffer, buf.byteOffset);
    if (byteOff + n / 8 > buf.length) return;
    if (pfc === 1) dv.setFloat32(byteOff, raw, false); else if (pfc === 2) dv.setFloat64(byteOff, raw, false);
    return;
  }
  if (ptc === 7 || ptc === 8 || ptc === 9 || n > 32 || n === 0) return; // containers and times are left at zero
  let v = Math.round(raw);
  if (ptc === 4) { const lo = -(2 ** (n - 1)), hi = 2 ** (n - 1) - 1; v = clamp(v, lo, hi); if (v < 0) v += 2 ** n; }
  else v = clamp(v, 0, 2 ** n - 1);
  writeBits(buf, off, n, v);
}
// What decodeRaw returns after encodeRaw(raw), without building the packet: the archive uses it to
// quantise samples exactly as the telemetry chain does. Returns null for types the encoder leaves at zero.
export function roundTripRaw(ptc, pfc, raw) {
  const n = bitWidth(ptc, pfc);
  if (ptc === 5) return pfc === 1 ? Math.fround(raw) : pfc === 2 ? raw : null;
  if (ptc === 7 || ptc === 8 || ptc === 9 || n > 32 || n === 0) return null;
  const v = Math.round(raw);
  return ptc === 4 ? clamp(v, -(2 ** (n - 1)), 2 ** (n - 1) - 1) : clamp(v, 0, 2 ** n - 1);
}
export function decodeRaw(buf, byteOff, bitOff, ptc, pfc) {
  const n = bitWidth(ptc, pfc), off = byteOff * 8 + bitOff;
  if (ptc === 5) {
    if (byteOff + n / 8 > buf.length) return null;
    const dv = new DataView(buf.buffer, buf.byteOffset);
    return pfc === 1 ? dv.getFloat32(byteOff, false) : pfc === 2 ? dv.getFloat64(byteOff, false) : null;
  }
  if (ptc === 7 || ptc === 8 || ptc === 9 || n > 32 || n === 0) {
    const nb = Math.ceil(n / 8);
    return Array.from(buf.slice(byteOff, byteOff + nb)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let v = readBits(buf, off, n);
  if (ptc === 4 && v >= 2 ** (n - 1)) v -= 2 ** n;
  return v;
}

// ------------------------------------------------------------------ calibration
export class Mib {
  constructor(d) {
    this.d = d;
    this.P = d.params;
    this.num = {};
    for (const [k, c] of Object.entries(d.cal.num)) {
      const pts = c.x.map((x, i) => [x, c.y[i]]).sort((a, b) => a[0] - b[0]);
      // strictly monotonic curves (all but two in this subset) are inverted by binary search
      let inc = true, dec = true;
      for (let i = 0; i < pts.length - 1; i++) { if (!(pts[i + 1][1] > pts[i][1])) inc = false; if (!(pts[i + 1][1] < pts[i][1])) dec = false; }
      this.num[k] = { ...c, pts, mono: inc ? 1 : dec ? -1 : 0 };
    }
    this.txt = d.cal.txt;
    this.kinds = new Map();
    this.packets = d.packets;
    for (const p of Object.values(this.packets)) {
      let bits = 0;
      for (const [n, by, bi] of p.params) { const q = this.P[n]; if (q) bits = Math.max(bits, by * 8 + bi + bitWidth(q.ptc, q.pfc)); }
      p.length = Math.max(Math.ceil(bits / 8), p.dfh + (p.type === 3 ? 1 : 0));
    }
  }
  calKind(name) {
    const k = this.kinds.get(name);
    if (k !== undefined) return k;
    const p = this.P[name];
    const kind = !p || !p.cal ? null : this.num[p.cal] ? "num" : this.txt[p.cal] ? "txt" : null;
    this.kinds.set(name, kind);
    return kind;
  }
  // raw -> engineering. Returns {v, ok, text?}
  calibrate(name, raw) {
    const p = this.P[name];
    if (raw === null || raw === undefined || !p) return { v: raw, ok: false };
    if (typeof raw === "string") return { v: raw, ok: true };
    const kind = this.calKind(name);
    if (kind === "num") {
      const c = this.num[p.cal], pts = c.pts, n = pts.length;
      if (raw < pts[0][0] || raw > pts[n - 1][0]) {
        // PCF_INTER (or CAF_INTER) 'F': raw values outside the curve give an invalid engineering value
        if ((p.inter || c.inter) !== "P") return { v: null, ok: false, why: "outside calibration curve" };
        const [a, b] = raw < pts[0][0] ? [pts[0], pts[1]] : [pts[n - 2], pts[n - 1]];
        return { v: a[1] + (raw - a[0]) * (b[1] - a[1]) / (b[0] - a[0]), ok: true, extrap: true };
      }
      // first segment whose raw interval contains the value (binary search, then step back over shared end points)
      let lo = 0, hi = n - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (pts[m][0] <= raw) lo = m; else hi = m; }
      while (lo > 0 && raw <= pts[lo][0]) lo--;
      const a = pts[lo], b = pts[lo + 1];
      if (b && raw >= a[0] && raw <= b[0]) return { v: b[0] === a[0] ? a[1] : a[1] + (raw - a[0]) * (b[1] - a[1]) / (b[0] - a[0]), ok: true };
      return { v: pts[n - 1][1], ok: true };
    }
    if (kind === "txt") {
      for (const [f, t, s] of this.txt[p.cal].map) if (raw >= f && raw <= t) return { v: s, ok: true, text: true };
      return { v: "****", ok: false, text: true, why: "no text string for this raw value" };
    }
    return { v: raw, ok: true };
  }
  // engineering -> raw (inverse), used by the simulator to produce raw telemetry.
  uncalibrate(name, eng) {
    const p = this.P[name];
    if (!p) return 0;
    const kind = this.calKind(name);
    if (kind === "num") {
      const { pts, mono } = this.num[p.cal];
      if (mono && pts.length > 2) {
        const y0 = pts[0][1], yn = pts[pts.length - 1][1];
        if ((eng - y0) * (eng - yn) <= 0) {
          let lo = 0, hi = pts.length - 1;
          while (hi - lo > 1) { const m = (lo + hi) >> 1; if ((pts[m][1] - eng) * mono <= 0) lo = m; else hi = m; }
          const a = pts[lo], b = pts[lo + 1];
          return a[0] + (eng - a[1]) * (b[0] - a[0]) / (b[1] - a[1]);
        }
      }
      // the widest raw segment containing the value wins (handles wrap-around curves such as CCF2Z002TM)
      let bestSeg = -1, span = -1;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        if ((eng - a[1]) * (eng - b[1]) <= 0 && a[1] !== b[1] && b[0] - a[0] > span) { span = b[0] - a[0]; bestSeg = i; }
      }
      if (bestSeg >= 0) { const a = pts[bestSeg], b = pts[bestSeg + 1]; return a[0] + (eng - a[1]) * (b[0] - a[0]) / (b[1] - a[1]); }
      // outside the curve: clamp to the nearest end point
      let best = pts[0], bd = Infinity;
      for (const q of pts) { const d = Math.abs(q[1] - eng); if (d < bd) { bd = d; best = q; } }
      return best[0];
    }
    if (kind === "txt") {
      if (typeof eng === "number") return eng;
      const m = this.txt[p.cal].map.find((x) => x[2] === eng);
      return m ? m[0] : 0;
    }
    return eng;
  }
  // Monitoring checks (OCF/OCP). ctx(name) -> raw value of a relevance/validity parameter.
  check(name, eng, ctx) {
    const L = this.d.lim[name];
    if (!L || eng === null || eng === undefined) return { status: "OK" };
    let status = "OK", hit = null, applicable = 0;
    for (const c of L.checks) {
      if (c.rlchk) { const v = ctx(c.rlchk); if (v === undefined || v !== c.valpar) continue; }
      applicable++;
      let viol = false;
      if (L.codin === "A") viol = String(eng) !== String(c.lo);
      else if (typeof eng === "number") viol = (c.lo !== undefined && eng < c.lo) || (c.hi !== undefined && eng > c.hi);
      if (viol && (c.type === "H" || (c.type === "S" && status !== "H"))) { status = c.type === "H" ? "H" : "S"; hit = c; }
    }
    return { status, hit, applicable };
  }
  limitsFor(name, ctx) {
    const L = this.d.lim[name];
    if (!L || L.codin === "A") return [];
    return L.checks.filter((c) => !c.rlchk || ctx(c.rlchk) === c.valpar).map((c) => ({ type: c.type, lo: c.lo, hi: c.hi }));
  }
  isValid(name, ctx) {
    const p = this.P[name];
    if (!p || !p.valid) return true;
    return ctx(p.valid) === p.valpar;
  }
}

// ------------------------------------------------------------------ OL (synthetic parameter) evaluator
// Supports the arithmetic subset used by the selected synthetic parameters:
// numbers, parameter references (NAME, NAME.raw, NAME.eng), + - * / unary minus, parentheses, return(...).
export function compileOL(src) {
  const code = src.replace(/#[^\n]*/g, " ").replace(/;/g, " ");
  const toks = [];
  const re = /\s*(\d+\.?\d*(?:[eE][-+]?\d+)?|[A-Za-z_][A-Za-z0-9_]*(?:\.(?:raw|eng))?|[-+*/()])/y;
  let m;
  re.lastIndex = 0;
  while (re.lastIndex < code.length) {
    const before = re.lastIndex;
    m = re.exec(code);
    if (!m) { if (/^\s*$/.test(code.slice(before))) break; throw new Error("OL: cannot parse near " + code.slice(before, before + 12)); }
    toks.push(m[1]);
  }
  let i = 0;
  const peek = () => toks[i], next = () => toks[i++];
  function primary() {
    const t = next();
    if (t === "(") { const v = expr(); next(); return v; }
    if (t === "-") { const v = primary(); return (env) => -v(env); }
    if (t === "return") { if (peek() === "(") { next(); const v = expr(); next(); return v; } return expr(); }
    if (/^\d/.test(t)) { const n = parseFloat(t); return () => n; }
    const [name, mode] = t.split(".");
    return (env) => env(name, mode || "eng");
  }
  function term() {
    let a = primary();
    while (peek() === "*" || peek() === "/") { const op = next(), b = primary(), x = a; a = op === "*" ? (e) => x(e) * b(e) : (e) => x(e) / b(e); }
    return a;
  }
  function expr() {
    let a = term();
    while (peek() === "+" || peek() === "-") { const op = next(), b = term(), x = a; a = op === "+" ? (e) => x(e) + b(e) : (e) => x(e) - b(e); }
    return a;
  }
  const f = expr();
  return f;
}

// ------------------------------------------------------------------ CRC (PUS packet error control)
export function crc16(bytes, len = bytes.length) {
  let crc = 0xffff;
  for (let i = 0; i < len; i++) {
    crc ^= bytes[i] << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc;
}

// ------------------------------------------------------------------ TM packets
export function obtOf(tMs) {
  const s = (tMs - OBT_EPOCH_MS) / 1000;
  const coarse = Math.floor(s);
  return { coarse, fine: Math.floor((s - coarse) * 65536) };
}
export function buildTmHeader(buf, pkt, ssc, tMs) {
  writeBits(buf, 0, 3, 0); writeBits(buf, 3, 1, 0); writeBits(buf, 4, 1, 1); writeBits(buf, 5, 11, pkt.apid);
  writeBits(buf, 16, 2, 3); writeBits(buf, 18, 14, ssc & 0x3fff); writeBits(buf, 32, 16, buf.length - 7);
  // PUS-A TM data field header (10 octets): spare, PUS version 1, spare; type; subtype; destination ID 0; CUC 4+2
  writeBits(buf, 48, 1, 0); writeBits(buf, 49, 3, 1); writeBits(buf, 52, 4, 0);
  writeBits(buf, 56, 8, pkt.type); writeBits(buf, 64, 8, pkt.stype); writeBits(buf, 72, 8, 0);
  const o = obtOf(tMs);
  writeBits(buf, 80, 32, o.coarse >>> 0); writeBits(buf, 112, 16, o.fine);
}
export function parseTmHeader(buf) {
  return {
    version: readBits(buf, 0, 3), type: readBits(buf, 3, 1), dfhFlag: readBits(buf, 4, 1), apid: readBits(buf, 5, 11),
    seqFlags: readBits(buf, 16, 2), ssc: readBits(buf, 18, 14), length: readBits(buf, 32, 16),
    pusVersion: readBits(buf, 49, 3), service: readBits(buf, 56, 8), subservice: readBits(buf, 64, 8), dest: readBits(buf, 72, 8),
    obtCoarse: readBits(buf, 80, 32), obtFine: readBits(buf, 112, 16),
  };
}

// ------------------------------------------------------------------ TC packets
export class TcBuilder {
  constructor(mib) { this.mib = mib; this.d = mib.d; }
  def(cname) { return this.d.tcs[cname]; }
  // editable parameters with their engineering defaults
  editable(cname) {
    const c = this.def(cname);
    return c.el.filter((e) => e.t === "E").map((e) => {
      const p = this.d.cpc[e.p] || {};
      let choices = null, def = p.def ?? e.v ?? null;
      if (p.cat === "T" && p.pas) choices = this.d.pas[p.pas].map((x) => x[0]);
      const range = p.prf ? this.d.prf[p.prf].ranges : null;
      if (def === null) def = choices ? choices[0] : range ? range[0][0] : 0;
      return { name: e.p, descr: p.d, ptc: p.ptc, pfc: p.pfc, cat: p.cat, unit: p.u || null, choices, range, def, bit: e.bit, len: e.len, prf: p.prf };
    });
  }
  checkValue(param, value) {
    if (param.choices) return param.choices.includes(value) ? null : "not one of the allowed values";
    const v = Number(value);
    if (!Number.isFinite(v)) return "not a number";
    if (param.range && !param.range.some(([a, b]) => v >= a && v <= b)) return `outside the range ${param.range.map(([a, b]) => `${a}…${b}`).join(", ")} (${param.prf})`;
    if ((param.ptc === 3 || param.ptc === 2) && (v < 0 || !Number.isInteger(v))) return "must be a non-negative integer";
    return null;
  }
  engToRaw(pname, value) {
    const p = this.d.cpc[pname] || {};
    if (p.cat === "T" && p.pas) { const m = this.d.pas[p.pas].find((x) => x[0] === value); return m ? m[1] : 0; }
    if (p.cat === "C" && p.cca) {
      const c = this.d.cca[p.cca], e = c.eng, r = c.raw, v = Number(value);
      const pts = e.map((x, i) => [x, r[i]]).sort((a, b) => a[0] - b[0]);
      for (let i = 0; i < pts.length - 1; i++) if (v >= pts[i][0] && v <= pts[i + 1][0]) return Math.round(pts[i][1] + (v - pts[i][0]) * (pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
      return Math.round(v < pts[0][0] ? pts[0][1] : pts[pts.length - 1][1]);
    }
    return Number(value);
  }
  build(cname, values, ssc) {
    const c = this.def(cname);
    const hdr = this.d.tchdr[c.hdr];
    let adBits = 0;
    for (const e of c.el) adBits = Math.max(adBits, e.bit + e.len);
    const hdrBits = Math.max(...hdr.map((h) => h.bit + h.len));
    const total = hdrBits / 8 + Math.ceil(adBits / 8) + 2;
    const buf = new Uint8Array(total);
    const fields = [];
    for (const h of hdr) {
      let v = parseInt(h.v || "0", h.radix === "H" ? 16 : 10) || 0;
      if (h.t === "A") v = c.apid;
      else if (h.t === "K") v = c.ack;
      else if (h.t === "T") v = c.type;
      else if (h.t === "S") v = c.stype;
      else if (h.t === "P" && h.p === "PH_SSC") v = ssc & 0x3fff;
      else if (h.t === "P" && h.p === "PH_LEN") v = total - 7;
      writeBits(buf, h.bit, h.len, v);
      fields.push({ name: h.d, bit: h.bit, len: h.len, value: v, group: "header", src: `NOM_TC ${h.t}` });
    }
    const base = hdrBits;
    for (const e of c.el) {
      let raw;
      if (e.t === "A" || e.t === "F") raw = parseInt(e.v || "0", 16); // fixed areas: hexadecimal values (e.g. 482A)
      else {
        const p = this.d.cpc[e.p] || {};
        raw = this.engToRaw(e.p, values[e.p]);
        if (p.ptc === 5) {
          const dv = new DataView(buf.buffer);
          if (p.pfc === 1) dv.setFloat32((base + e.bit) / 8, raw, false); else dv.setFloat64((base + e.bit) / 8, raw, false);
          fields.push({ name: (this.d.cpc[e.p] || {}).d || e.p, pname: e.p, bit: base + e.bit, len: e.len, value: raw, eng: values[e.p], group: "data" });
          continue;
        }
        if (p.ptc === 4 && raw < 0) raw += 2 ** e.len;
      }
      writeBits(buf, base + e.bit, e.len, Math.max(0, raw));
      fields.push({ name: e.t === "A" ? (e.d || "Fixed area") : (this.d.cpc[e.p] || {}).d || e.p, pname: e.p, bit: base + e.bit, len: e.len, value: raw,
        eng: e.t === "E" ? values[e.p] : undefined, group: "data" });
    }
    const crc = crc16(buf, total - 2);
    buf[total - 2] = crc >> 8; buf[total - 1] = crc & 0xff;
    fields.push({ name: "Packet error control (CRC-16)", bit: (total - 2) * 8, len: 16, value: crc, group: "pec" });
    return { bytes: buf, fields, packetId: readBits(buf, 0, 16), seqCtrl: readBits(buf, 16, 16) };
  }
}

export const hex = (bytes, from = 0, to = bytes.length) => Array.from(bytes.slice(from, to)).map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(" ");
