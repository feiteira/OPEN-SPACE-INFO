// Small canvas line charts for the simulator: one axis, thin 2px lines, recessive grid,
// limit reference lines in status colours, crosshair + tooltip on hover.
const TIME_STEPS = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 10800, 21600, 43200, 86400, 2 * 86400, 7 * 86400,
  14 * 86400, 30.44 * 86400, 91.31 * 86400, 182.6 * 86400, 365.25 * 86400, 2 * 365.25 * 86400].map((s) => s * 1000);

export function niceTicks(min, max, n = 4) {
  const mag0 = Math.max(Math.abs(min), Math.abs(max));
  const minSpan = Math.max(mag0 * 2e-5, mag0 === 0 ? 1 : 1e-9);
  if (!(max - min >= minSpan)) { const c = (min + max) / 2; min = c - minSpan / 2; max = c + minSpan / 2; }
  const raw = (max - min) / n, mag = 10 ** Math.floor(Math.log10(raw)), f = raw / mag;
  const step = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Math.abs(v) < step / 1e6 ? 0 : v);
  return { lo, hi, step, ticks };
}
export function fmtNum(v, step) {
  if (!Number.isFinite(v)) return "–";
  if (step && Math.abs(v) < step / 2) v = 0;
  const a = Math.abs(v);
  if (step && step < 1e-4) return v === 0 ? "0" : v.toExponential(Math.max(1, Math.min(4, Math.ceil(Math.log10(a / step)))));
  if (a >= 1e6) return (v / 1e6).toFixed(a >= 1e7 ? 0 : 1) + "M";
  if (a >= 1e4) return (v / 1e3).toFixed(0) + "K";
  const dec = step ? Math.max(0, Math.min(6, -Math.floor(Math.log10(step) + 1e-9))) : a >= 100 ? 1 : a >= 1 ? 3 : 5;
  return v.toFixed(dec);
}
const pad = (n) => String(n).padStart(2, "0");
export function fmtTime(ms, span) {
  const d = new Date(ms);
  const Y = d.getUTCFullYear(), M = pad(d.getUTCMonth() + 1), D = pad(d.getUTCDate()), h = pad(d.getUTCHours()), m = pad(d.getUTCMinutes()), s = pad(d.getUTCSeconds());
  if (span <= 15 * 60000) return `${h}:${m}:${s}`;
  if (span <= 2.5 * 86400000) return `${h}:${m}`;
  if (span <= 200 * 86400000) return `${M}-${D}`;
  if (span <= 4 * 365 * 86400000) return `${Y}-${M}`;
  return String(Y);
}
export const fmtUtc = (ms) => new Date(ms).toISOString().replace("T", " ").slice(0, 19);

function tokens(el) {
  const cs = getComputedStyle(el);
  const g = (n, d) => cs.getPropertyValue(n).trim() || d;
  return {
    surface: g("--sim-surface", "#fff"), ink: g("--sim-ink", "#0b0b0b"), ink2: g("--sim-ink2", "#52514e"), muted: g("--sim-muted", "#898781"),
    grid: g("--sim-grid", "#e1e0d9"), axis: g("--sim-axis", "#c3c2b7"),
    series: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => g(`--sim-s${i}`, "#2a78d6")),
    warning: g("--sim-warning", "#fab219"), critical: g("--sim-critical", "#d03b3b"), good: g("--sim-good", "#0ca30c"),
    font: cs.fontFamily,
  };
}

export class LineChart {
  constructor(host, { height = 150, onClick = null, unit = "", digits = null } = {}) {
    this.host = host;
    this.unit = unit;
    this.digits = digits;
    this.wrap = document.createElement("div");
    this.wrap.className = "sim-chart";
    this.canvas = document.createElement("canvas");
    this.canvas.style.height = height + "px";
    this.tip = document.createElement("div");
    this.tip.className = "sim-tip";
    this.tip.hidden = true;
    this.wrap.append(this.canvas, this.tip);
    host.append(this.wrap);
    this.height = height;
    this.data = null;
    this.onClick = onClick;
    this.hoverX = null;
    this.canvas.addEventListener("mousemove", (e) => { const r = this.canvas.getBoundingClientRect(); this.hoverX = e.clientX - r.left; this.draw(); });
    this.canvas.addEventListener("mouseleave", () => { this.hoverX = null; this.tip.hidden = true; this.draw(); });
    if (onClick) this.canvas.addEventListener("click", (e) => { const r = this.canvas.getBoundingClientRect(); const t = this.xToT(e.clientX - r.left); if (t) onClick(t); });
    this.canvas.style.cursor = onClick ? "pointer" : "crosshair";
  }
  set(data) { this.data = data; this.draw(); }
  xToT(x) { if (!this.geom) return null; const g = this.geom; return g.x0 + (x - g.L) / (g.W) * (g.x1 - g.x0); }
  draw() {
    const d = this.data, c = this.canvas;
    const w = c.clientWidth, h = this.height;
    if (!w) return;
    const dpr = window.devicePixelRatio || 1;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const T = tokens(this.host);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = T.surface;
    ctx.fillRect(0, 0, w, h);
    ctx.font = `11px ${T.font}`;
    const series = (d && d.series) || [];
    let xs = [], ys = [];
    for (const s of series) for (let i = 0; i < s.t.length; i++) if (Number.isFinite(s.v[i])) { xs.push(s.t[i]); ys.push(s.v[i]); }
    if (!xs.length) {
      ctx.fillStyle = T.muted; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(d && d.empty ? d.empty : "Waiting for telemetry…", w / 2, h / 2);
      this.geom = null;
      return;
    }
    let x0 = d.x0 ?? Math.min(...xs), x1 = d.x1 ?? Math.max(...xs);
    if (x1 - x0 < 1000) { x1 = x0 + 1000; }
    let ymin = Math.min(...ys), ymax = Math.max(...ys);
    for (const L of d.limits || []) { if (L.show === "always") { if (L.v < ymin) ymin = L.v; if (L.v > ymax) ymax = L.v; } }
    if (d.yMin !== undefined) ymin = Math.min(ymin, d.yMin);
    if (d.yMax !== undefined) ymax = Math.max(ymax, d.yMax);
    const yt = niceTicks(ymin, ymax, 4);
    const labW = Math.max(...yt.ticks.map((v) => ctx.measureText(fmtNum(v, yt.step)).width)) + 10;
    const L = labW, R = 10, Tp = 8, B = 20, W = w - L - R, H = h - Tp - B;
    this.geom = { L, W, x0, x1 };
    const X = (t) => L + (t - x0) / (x1 - x0) * W, Y = (v) => Tp + (1 - (v - yt.lo) / (yt.hi - yt.lo)) * H;
    // grid + y labels
    ctx.strokeStyle = T.grid; ctx.lineWidth = 1; ctx.fillStyle = T.muted; ctx.textAlign = "right"; ctx.textBaseline = "middle";
    for (const v of yt.ticks) { const y = Math.round(Y(v)) + 0.5; ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(L + W, y); ctx.stroke(); ctx.fillText(fmtNum(v, yt.step), L - 6, y); }
    // x ticks
    const span = x1 - x0, step = TIME_STEPS.find((s) => span / s <= 6) || TIME_STEPS[TIME_STEPS.length - 1];
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    let tt = Math.ceil(x0 / step) * step;
    if (step >= 30 * 86400000) { const dd = new Date(x0); dd.setUTCDate(1); dd.setUTCHours(0, 0, 0, 0); tt = dd.getTime(); }
    let guard = 0;
    while (tt <= x1 && guard++ < 50) {
      if (tt >= x0) { const x = Math.round(X(tt)) + 0.5; ctx.strokeStyle = T.grid; ctx.beginPath(); ctx.moveTo(x, Tp); ctx.lineTo(x, Tp + H); ctx.stroke(); ctx.fillText(fmtTime(tt, span), x, Tp + H + 5); }
      if (step >= 30 * 86400000) { const dd = new Date(tt); const months = Math.round(step / (30.44 * 86400000)); dd.setUTCMonth(dd.getUTCMonth() + months); tt = dd.getTime(); } else tt += step;
    }
    ctx.strokeStyle = T.axis; ctx.beginPath(); ctx.moveTo(L, Tp + H + 0.5); ctx.lineTo(L + W, Tp + H + 0.5); ctx.stroke();
    // shaded bands (e.g. remote-sensing windows)
    for (const b of d.bands || []) {
      if (b.to < x0 || b.from > x1) continue;
      ctx.fillStyle = b.color || "rgba(127,127,127,.12)";
      ctx.fillRect(X(Math.max(x0, b.from)), Tp, X(Math.min(x1, b.to)) - X(Math.max(x0, b.from)), H);
    }
    // limits
    for (const lim of d.limits || []) {
      if (lim.v < yt.lo || lim.v > yt.hi) continue;
      const y = Math.round(Y(lim.v)) + 0.5;
      ctx.strokeStyle = lim.kind === "H" ? T.critical : lim.kind === "S" ? T.warning : T.muted;
      ctx.lineWidth = 1; ctx.setLineDash(lim.kind === "ref" ? [3, 3] : []);
      ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(L + W, y); ctx.stroke(); ctx.setLineDash([]);
      // soft-limit labels on the left, hard-limit and reference labels on the right, so close pairs do not collide
      const right = lim.kind !== "S";
      ctx.font = `10px ${T.font}`;
      const tw = ctx.measureText(lim.label).width + 6;
      ctx.fillStyle = T.surface; ctx.globalAlpha = 0.85;
      ctx.fillRect(right ? L + W - tw - 2 : L + 2, y - 13, tw, 11); ctx.globalAlpha = 1;
      ctx.fillStyle = T.ink2; ctx.textAlign = right ? "right" : "left"; ctx.textBaseline = "bottom";
      ctx.fillText(lim.label, right ? L + W - 5 : L + 5, y - 2);
      ctx.font = `11px ${T.font}`;
    }
    // series
    series.forEach((s, k) => {
      ctx.strokeStyle = s.color || T.series[(s.slot ?? k) % 8]; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath();
      let pen = false, last = null;
      for (let i = 0; i < s.t.length; i++) {
        const v = s.v[i];
        if (!Number.isFinite(v) || s.t[i] < x0 || s.t[i] > x1) { pen = false; continue; }
        const gap = s.gap && last !== null && s.t[i] - last > s.gap;
        const x = X(s.t[i]), y = Y(v);
        if (!pen || gap) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        pen = true; last = s.t[i];
      }
      ctx.stroke();
      if (s.t.length === 1 && Number.isFinite(s.v[0])) { ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(X(s.t[0]), Y(s.v[0]), 4, 0, 7); ctx.fill(); }
    });
    // cursor (current time)
    if (d.cursor !== undefined && d.cursor >= x0 && d.cursor <= x1) {
      const x = Math.round(X(d.cursor)) + 0.5;
      ctx.strokeStyle = T.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, Tp); ctx.lineTo(x, Tp + H); ctx.stroke();
    }
    // hover
    if (this.hoverX !== null && this.hoverX >= L && this.hoverX <= L + W) {
      const t = x0 + (this.hoverX - L) / W * (x1 - x0);
      ctx.strokeStyle = T.muted; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(Math.round(this.hoverX) + 0.5, Tp); ctx.lineTo(Math.round(this.hoverX) + 0.5, Tp + H); ctx.stroke();
      const rows = [];
      series.forEach((s, k) => {
        let best = -1, bd = Infinity;
        for (let i = 0; i < s.t.length; i++) { const dd = Math.abs(s.t[i] - t); if (dd < bd) { bd = dd; best = i; } }
        if (best < 0) return;
        const col = s.color || T.series[(s.slot ?? k) % 8];
        const x = X(s.t[best]), y = Y(s.v[best]);
        if (Number.isFinite(s.v[best])) {
          ctx.fillStyle = T.surface; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill();
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
        }
        rows.push({ col, name: s.name, v: s.v[best], t: s.t[best] });
      });
      if (rows.length) {
        const unit = d.unit || this.unit;
        this.tip.innerHTML = `<div class="sim-tip-t">${fmtUtc(rows[0].t)} UTC</div>` + rows.map((r) =>
          `<div class="sim-tip-r"><span class="sim-key" style="background:${r.col}"></span>${series.length > 1 ? `<span>${r.name}</span>` : ""}<b>${fmtNum(r.v, d.tipStep ?? null)}${unit ? " " + unit : ""}</b></div>`).join("");
        this.tip.hidden = false;
        const tw = this.tip.offsetWidth;
        this.tip.style.left = Math.min(w - tw - 4, Math.max(4, this.hoverX + 12)) + "px";
        this.tip.style.top = "6px";
      }
    }
  }
}
