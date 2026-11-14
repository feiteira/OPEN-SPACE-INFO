// Three.js views of the simulator: the inner solar system from the Horizons ephemeris, and a
// schematic Solar Orbiter in its own body frame (+X to the Sun). THREE is passed in by the caller.
import { utcToJdTdb, hgaDir, v3 } from "./core.js";

const AU = 10; // scene units per au
const e2t = (THREE, p) => new THREE.Vector3(p[0] * AU, p[2] * AU, -p[1] * AU); // ecliptic -> three (y up)
const b2t = (THREE, p, s = 1) => new THREE.Vector3(p[0] * s, p[2] * s, -p[1] * s); // body -> three

function glowTexture(THREE, inner, outer) {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const g = c.getContext("2d"), grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, inner); grd.addColorStop(0.25, inner); grd.addColorStop(1, outer);
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function stars(THREE, n, radius, seed = 7) {
  let s = seed; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    pos.set([r * Math.cos(th) * radius, u * radius, r * Math.sin(th) * radius], i * 3);
    const b = 0.45 + rnd() * 0.55; col.set([b, b, b * (0.9 + rnd() * 0.2)], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 1.4, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false }));
}

class Orbit {
  // minimal orbit camera control: drag to rotate, wheel/pinch to zoom, shift-drag or right-drag to pan
  constructor(THREE, cam, el, { r = 30, theta = 0.6, phi = 1.0 } = {}) {
    this.THREE = THREE; this.cam = cam; this.el = el; this.target = new THREE.Vector3(); this.r = r; this.theta = theta; this.phi = phi;
    this.min = 0.5; this.max = 400; this.panOff = new THREE.Vector3(); this.enabled = true;
    let drag = null;
    const pts = new Map();
    el.addEventListener("pointerdown", (e) => { if (!this.enabled) return; this.touched = true; el.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); drag = { x: e.clientX, y: e.clientY, pan: e.button === 2 || e.shiftKey }; });
    el.addEventListener("pointermove", (e) => {
      if (!drag) return;
      if (pts.size === 2) {
        const [a, b] = [...pts.values()]; const d0 = Math.hypot(a[0] - b[0], a[1] - b[1]);
        pts.set(e.pointerId, [e.clientX, e.clientY]);
        const [c, d] = [...pts.values()]; const d1 = Math.hypot(c[0] - d[0], c[1] - d[1]);
        if (d0 > 0) this.r = Math.min(this.max, Math.max(this.min, this.r * d0 / d1));
        return;
      }
      pts.set(e.pointerId, [e.clientX, e.clientY]);
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY;
      if (drag.pan) {
        const s = this.r / el.clientHeight * 1.2;
        const right = new THREE.Vector3().setFromMatrixColumn(cam.matrix, 0), up = new THREE.Vector3().setFromMatrixColumn(cam.matrix, 1);
        this.panOff.addScaledVector(right, -dx * s).addScaledVector(up, dy * s);
      } else { this.theta -= dx * 0.006; this.phi = Math.min(Math.PI - 0.02, Math.max(0.02, this.phi - dy * 0.006)); }
    });
    const end = (e) => { pts.delete(e.pointerId); if (!pts.size) drag = null; };
    el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
    el.addEventListener("contextmenu", (e) => e.preventDefault());
    el.addEventListener("wheel", (e) => { if (!this.enabled) return; this.touched = true; e.preventDefault(); this.r = Math.min(this.max, Math.max(this.min, this.r * Math.exp(e.deltaY * 0.0012))); }, { passive: false });
  }
  update() {
    const { r, theta, phi } = this;
    const c = this.target.clone().add(this.panOff);
    this.cam.position.set(c.x + r * Math.sin(phi) * Math.sin(theta), c.y + r * Math.cos(phi), c.z + r * Math.sin(phi) * Math.cos(theta));
    this.cam.lookAt(c);
  }
}

export class Views {
  constructor(THREE, host, sim, labelsHost) {
    this.THREE = THREE; this.host = host; this.sim = sim; this.labelsHost = labelsHost;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setClearColor(0x03050c, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.append(this.renderer.domElement);
    this.mode = "system";
    this.follow = false;
    this.labels = {};
    this.buildSystem();
    this.buildCraft();
    this.setMode("system");
    this.resize();
    new ResizeObserver(() => this.resize()).observe(host);
  }
  label(key, text, cls = "") {
    const d = document.createElement("div"); d.className = "sim-lbl " + cls; d.textContent = text; this.labelsHost.append(d); this.labels[key] = { el: d, pos: null, scene: null }; return d;
  }
  resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    for (const c of [this.sysCam, this.scCam]) { c.aspect = w / h; c.updateProjectionMatrix(); }
    // pull the camera back on narrow views until the user takes control
    const k = Math.max(1, 1.3 / (w / h));
    if (!this.sysCtl.touched) this.sysCtl.r = 26 * k;
    if (!this.scCtl.touched) this.scCtl.r = 24 * k;
  }
  // ---------------------------------------------------------- solar system
  buildSystem() {
    const THREE = this.THREE, eph = this.sim.eph;
    const sc = (this.sys = new THREE.Scene());
    this.sysCam = new THREE.PerspectiveCamera(45, 1, 0.01, 2000);
    this.sysCtl = new Orbit(THREE, this.sysCam, this.renderer.domElement, { r: 26, theta: 0.35, phi: 0.75 });
    sc.add(stars(THREE, 2500, 900));
    // Sun
    const sun = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 16), new THREE.MeshBasicMaterial({ color: 0xffe2a0 }));
    sc.add(sun);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(THREE, "rgba(255,214,120,1)", "rgba(255,160,40,0)"), blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.set(2.6, 2.6, 1); sc.add(glow);
    this.label("sun", "Sun", "sim-lbl-sun"); this.labels.sun.pos = new THREE.Vector3(0, 0.35, 0); this.labels.sun.scene = "system";
    // ecliptic rings
    const ringMat = new THREE.LineBasicMaterial({ color: 0x3a4a78, transparent: true, opacity: 0.55 });
    for (const rr of [0.25, 0.5, 0.75, 1.0, 1.25]) {
      const pts = []; for (let k = 0; k <= 128; k++) { const a = k / 128 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * rr * AU, 0, Math.sin(a) * rr * AU)); }
      sc.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
      const l = this.label("ring" + rr, rr + " au", "sim-lbl-ring"); this.labels["ring" + rr].pos = new THREE.Vector3(rr * AU * 0.7071, 0, rr * AU * 0.7071); this.labels["ring" + rr].scene = "system";
    }
    const eq = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.4 * AU, 0, 0)]), new THREE.LineBasicMaterial({ color: 0x55658f, transparent: true, opacity: 0.6 }));
    sc.add(eq);
    this.label("vernal", "♈ vernal equinox", "sim-lbl-ring"); this.labels.vernal.pos = new THREE.Vector3(1.42 * AU, 0, 0); this.labels.vernal.scene = "system";
    // planets: full sampled paths and markers
    const planets = { mercury: [0x9a9a9a, "Mercury", 0.07], venus: [0xe8d6a0, "Venus", 0.1], earth: [0x5aa0ff, "Earth", 0.11] };
    this.planets = {};
    for (const [k, [col, name, rad]] of Object.entries(planets)) {
      const period = { mercury: 88, venus: 225, earth: 366 }[k];
      const pts = []; for (let i = 0; i < Math.min(eph.n, period + 1); i++) pts.push(e2t(THREE, eph.sample(k, i)));
      sc.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.35 })));
      const m = new THREE.Mesh(new THREE.SphereGeometry(rad, 24, 12), new THREE.MeshBasicMaterial({ color: col }));
      sc.add(m); this.planets[k] = m;
      this.label(k, name); this.labels[k].obj = m; this.labels[k].scene = "system";
    }
    // Solar Orbiter trajectory with past/future colouring
    const n = eph.n, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const v = e2t(THREE, eph.sample("solo", i)); pos.set([v.x, v.y, v.z], i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.trajCol = new Float32Array(n * 3); g.setAttribute("color", new THREE.BufferAttribute(this.trajCol, 3));
    this.traj = new THREE.Line(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 }));
    sc.add(this.traj);
    this.solo = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), new THREE.MeshBasicMaterial({ color: 0x4fe3f0 }));
    sc.add(this.solo);
    const sg = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(THREE, "rgba(80,230,240,.9)", "rgba(80,230,240,0)"), blending: THREE.AdditiveBlending, depthWrite: false }));
    sg.scale.set(0.8, 0.8, 1); this.solo.add(sg);
    this.label("solo", "Solar Orbiter", "sim-lbl-solo"); this.labels.solo.obj = this.solo; this.labels.solo.scene = "system";
    // drop line to the ecliptic, and the radio link to Earth
    this.drop = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: 0x4fe3f0, transparent: true, opacity: 0.5 }));
    sc.add(this.drop);
    this.linkLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineDashedMaterial({ color: 0x7c8cb5, dashSize: 0.25, gapSize: 0.18, transparent: true, opacity: 0.8 }));
    sc.add(this.linkLine);
    // flyby markers
    for (const e of eph.events.filter((x) => x.kind === "flyby")) {
      const p = e2t(THREE, eph.pos("solo", utcToJdTdb(e.t)));
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 6), new THREE.MeshBasicMaterial({ color: e.label.startsWith("Earth") ? 0x5aa0ff : 0xe8d6a0 }));
      m.position.copy(p); sc.add(m);
    }
    this.lastColT = null;
  }
  colourTrajectory(t) {
    const eph = this.sim.eph, n = eph.n;
    const iNow = (utcToJdTdb(t) - eph.jd0);
    for (let i = 0; i < n; i++) {
      const past = i <= iNow;
      const near = Math.abs(i - iNow) < 180;
      const c = past ? (near ? [0.31, 0.89, 0.94] : [0.18, 0.5, 0.56]) : (near ? [0.55, 0.62, 0.85] : [0.22, 0.26, 0.42]);
      this.trajCol.set(c, i * 3);
    }
    this.traj.geometry.attributes.color.needsUpdate = true;
    this.lastColT = t;
  }
  // ---------------------------------------------------------- spacecraft (schematic)
  buildCraft() {
    const THREE = this.THREE;
    const sc = (this.craft = new THREE.Scene());
    this.scCam = new THREE.PerspectiveCamera(40, 1, 0.05, 3000);
    this.scCtl = new Orbit(THREE, this.scCam, this.renderer.domElement, { r: 24, theta: 0.85, phi: 1.12 });
    sc.add(stars(THREE, 2000, 1500, 11));
    sc.add(new THREE.AmbientLight(0x9aa8c8, 1.1));
    sc.add(new THREE.HemisphereLight(0xbcc8ff, 0x2a2418, 0.9));
    const sunL = new THREE.DirectionalLight(0xfff1d6, 3.2); sunL.position.copy(b2t(THREE, [1, 0, 0], 50)); sc.add(sunL);
    const fill = new THREE.DirectionalLight(0x8899cc, 0.8); fill.position.copy(b2t(THREE, [-0.5, -1, 0.6], 50)); sc.add(fill);
    const metal = (c, r = 0.5, m = 0.6) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    const body = new THREE.Group(); sc.add(body); this.body = body;
    const box = (sx, sy, sz, mat, at) => { const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sz, sy), mat); m.position.copy(b2t(THREE, at)); body.add(m); return m; };
    // bus (MLI gold) and heat shield (+X)
    box(2.3, 2.5, 2.5, metal(0xc9a24a, 0.55, 0.7), [-0.3, 0, 0]);
    box(0.08, 3.1, 2.4, metal(0x8c8f96, 0.4, 0.8), [1.25, 0, 0]);
    box(0.06, 3.0, 2.3, new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.95, metalness: 0.05 }), [1.32, 0, 0]);
    for (const [y, z] of [[1.3, 1.0], [-1.3, 1.0], [1.3, -1.0], [-1.3, -1.0]]) box(0.4, 0.05, 0.05, metal(0xb0b4bb), [1.05, y, z]);
    // solar-array wings on +Y and -Y, rotating about Y
    const cellTex = (() => {
      const c = document.createElement("canvas"); c.width = 256; c.height = 128; const g = c.getContext("2d");
      g.fillStyle = "#1b2a5c"; g.fillRect(0, 0, 256, 128);
      for (let x = 0; x < 256; x += 16) for (let y = 0; y < 128; y += 16) { g.fillStyle = (x / 16 + y / 16) % 3 === 0 ? "#c8ccd6" : "#22357a"; g.fillRect(x + 1, y + 1, 14, 14); }
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
    })();
    const panelMat = new THREE.MeshStandardMaterial({ map: cellTex, roughness: 0.35, metalness: 0.5 });
    const backMat = metal(0x6b6f78, 0.7, 0.3);
    this.wings = [];
    for (const sgn of [1, -1]) {
      const pivot = new THREE.Group(); pivot.position.copy(b2t(THREE, [0, sgn * 1.25, 0])); body.add(pivot);
      const yoke = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), metal(0xb0b4bb));
      yoke.rotation.x = Math.PI / 2; yoke.position.set(0, 0, -sgn * 0.55); pivot.add(yoke);
      for (let k = 0; k < 3; k++) {
        const g = new THREE.Group();
        const front = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.15, 2.0), [panelMat, backMat, backMat, backMat, backMat, backMat]);
        front.position.set(0, 0, -sgn * (1.1 + 1.0 + k * 2.05)); g.add(front); pivot.add(g);
      }
      this.wings.push({ pivot, sgn });
    }
    // HGA on a boom below -Z, steerable
    const hgaBase = new THREE.Group(); hgaBase.position.copy(b2t(THREE, [-0.6, 0.5, -1.25])); body.add(hgaBase);
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), metal(0xb0b4bb)); boom.position.set(0, -0.45, 0); hgaBase.add(boom);
    this.hga = new THREE.Group(); this.hga.position.set(0, -0.95, 0); hgaBase.add(this.hga);
    const dishPts = []; for (let k = 0; k <= 16; k++) { const r = k / 16 * 0.55; dishPts.push(new THREE.Vector2(r, r * r * 0.55)); }
    const dish = new THREE.Mesh(new THREE.LatheGeometry(dishPts, 40), new THREE.MeshStandardMaterial({ color: 0xe9e9ea, roughness: 0.4, metalness: 0.2, side: THREE.DoubleSide }));
    dish.rotation.x = Math.PI / 2; this.hga.add(dish);
    const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.35, 8), metal(0x999999)); feed.rotation.x = -Math.PI / 2; feed.position.set(0, 0, 0.28); this.hga.add(feed);
    // MGA, instrument boom, RPW antennas
    const mga = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16), metal(0xd8d8d8)); mga.position.copy(b2t(THREE, [-0.9, -0.8, -1.4])); body.add(mga);
    const instBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 4.4, 8), metal(0xa0a4ab));
    instBoom.rotation.z = Math.PI / 2; instBoom.position.copy(b2t(THREE, [-3.65, -0.9, 0.6])); body.add(instBoom);
    box(0.25, 0.25, 0.25, metal(0xdddddd), [-5.85, -0.9, 0.6]);
    const rpwDirs = [[0.15, 0.9, 0.42], [0.15, -0.9, 0.42], [0.15, 0, -1]];
    for (const d of rpwDirs) {
      const dir = b2t(THREE, v3.norm(d)), len = 6.5;
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, len, 6), metal(0x888888));
      rod.position.copy(b2t(THREE, [1.0, Math.sign(d[1]) * 1.2, d[2] > 0 ? 1.1 : -1.1])).addScaledVector(dir, len / 2);
      rod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir); body.add(rod);
    }
    // thruster plumes (shown during wheel off-loading)
    this.plumes = [];
    const pm = new THREE.SpriteMaterial({ map: glowTexture(THREE, "rgba(200,220,255,.9)", "rgba(200,220,255,0)"), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 });
    for (const at of [[-1.45, 1.2, 1.2], [-1.45, -1.2, -1.2], [-1.45, 1.2, -1.2], [-1.45, -1.2, 1.2]]) { const s = new THREE.Sprite(pm.clone()); s.position.copy(b2t(THREE, at)); s.scale.set(0.9, 0.9, 1); body.add(s); this.plumes.push(s); }
    // direction arrows
    this.sunArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), b2t(THREE, [1.6, 0, 0]), 4, 0xffc44d, 0.5, 0.25); sc.add(this.sunArrow);
    this.earthArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 5, 0x5aa0ff, 0.5, 0.25); sc.add(this.earthArrow);
    this.beam = new THREE.Mesh(new THREE.ConeGeometry(0.6, 9, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0x5aa0ff, transparent: true, opacity: 0.08, depthWrite: false, side: THREE.DoubleSide }));
    sc.add(this.beam);
    const axes = [[[1, 0, 0], "+X (Sun)"], [[0, 1, 0], "+Y"], [[0, 0, 1], "+Z"]];
    for (const [d, name] of axes) {
      const a = new THREE.ArrowHelper(b2t(THREE, d), b2t(THREE, [-0.3, 0, 0]), 2.2, 0x9aa6c8, 0.2, 0.1); sc.add(a);
      this.label("ax" + name, name, "sim-lbl-axis"); this.labels["ax" + name].pos = b2t(THREE, [-0.3 + d[0] * 2.5, d[1] * 2.5, d[2] * 2.5]); this.labels["ax" + name].scene = "craft";
    }
    this.label("toSun", "to the Sun", "sim-lbl-sun"); this.labels.toSun.pos = b2t(THREE, [6, 0, 0]); this.labels.toSun.scene = "craft";
    this.label("toEarth", "to Earth", "sim-lbl-earth"); this.labels.toEarth.scene = "craft";
  }
  setMode(m) { this.mode = m; this.sysCtl.enabled = m === "system"; this.scCtl.enabled = m !== "system"; }
  resetCamera(kind) {
    if (this.mode === "system") {
      const c = this.sysCtl; c.panOff.set(0, 0, 0);
      if (kind === "top") { c.phi = 0.03; c.theta = 0; c.r = 30; } else if (kind === "edge") { c.phi = Math.PI / 2 - 0.02; c.theta = 0.3; c.r = 30; } else { c.phi = 0.75; c.theta = 0.35; c.r = 26; }
    } else { const c = this.scCtl; c.panOff.set(0, 0, 0); c.r = 24; c.theta = 0.85; c.phi = 1.12; }
  }
  update(t) {
    const THREE = this.THREE, sim = this.sim, g = sim.geo, eph = sim.eph;
    const jd = utcToJdTdb(t);
    // system
    for (const [k, m] of Object.entries(this.planets)) m.position.copy(e2t(THREE, eph.pos(k, jd)));
    const p = e2t(THREE, g.S);
    this.solo.position.copy(p);
    this.solo.rotation.y += 0.01;
    this.drop.geometry.setFromPoints([p, new THREE.Vector3(p.x, 0, p.z)]);
    const ep = e2t(THREE, g.E);
    this.linkLine.geometry.setFromPoints([p, ep]); this.linkLine.computeLineDistances();
    const lk = sim.link;
    this.linkLine.material.color.set(lk.down ? 0x34d17a : lk.up ? 0xf0b84a : 0x6b7699);
    this.linkLine.material.opacity = lk.pass ? 0.95 : 0.45;
    if (this.lastColT === null || Math.abs(t - this.lastColT) > 6 * 3600000) this.colourTrajectory(t);
    if (this.follow) this.sysCtl.target.copy(p); else this.sysCtl.target.set(0, 0, 0);
    // craft
    const sc = sim.sc;
    // wings rotate about body Y (three -z); the two wings turn in opposite senses
    for (const w of this.wings) w.pivot.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), w.sgn * sc.saTilt * Math.PI / 180);
    const hd = b2t(THREE, hgaDir(sc.hga.az, sc.hga.el));
    this.hga.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), hd.clone().normalize());
    const eDir = b2t(THREE, g.eB).normalize();
    const hgaWorld = new THREE.Vector3(); this.hga.getWorldPosition(hgaWorld);
    this.earthArrow.position.copy(hgaWorld); this.earthArrow.setDirection(eDir);
    this.labels.toEarth.pos = hgaWorld.clone().addScaledVector(eDir, 5.6);
    this.beam.position.copy(hgaWorld).addScaledVector(hd.clone().normalize(), 4.5);
    this.beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), hd.clone().normalize());
    this.beam.material.opacity = sc.twta.on ? (lk.hgaErr < 1 ? 0.12 : 0.05) : 0.0;
    const puff = sc.wol > 0 ? 0.35 + 0.35 * Math.abs(Math.sin(performance.now() / 90)) : 0;
    for (const s of this.plumes) s.material.opacity = puff;
  }
  render() {
    this.sysCtl.update(); this.scCtl.update();
    const scene = this.mode === "system" ? this.sys : this.craft, cam = this.mode === "system" ? this.sysCam : this.scCam;
    this.renderer.render(scene, cam);
    const w = this.host.clientWidth, h = this.host.clientHeight, v = new this.THREE.Vector3();
    for (const L of Object.values(this.labels)) {
      if (L.scene !== this.mode) { L.el.style.display = "none"; continue; }
      if (L.obj) L.obj.getWorldPosition(v); else if (L.pos) v.copy(L.pos); else { L.el.style.display = "none"; continue; }
      v.project(cam);
      if (v.z > 1 || v.z < -1) { L.el.style.display = "none"; continue; }
      L.el.style.display = "";
      L.el.style.transform = `translate(${((v.x + 1) / 2 * w).toFixed(1)}px, ${((1 - v.y) / 2 * h).toFixed(1)}px)`;
    }
  }
}
