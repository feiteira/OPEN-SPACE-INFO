/* OPEN-SPACE-INFO MIB explorer.
 * Static, dependency-free single-page explorer over JSON shards produced by tools/build_explorer.py.
 * Routes: #/<mission>/<kind>/<id>  kinds: param, packet, apid, command, sequence, calib/<type>/<id>, verif, search/<kind>/<q>
 * All MIB strings are untrusted: everything is HTML-escaped before rendering.
 */
(function () {
  "use strict";
  var ROOT = document.getElementById("osi-mib-explorer");
  if (!ROOT) return;
  var BASE = ROOT.getAttribute("data-base") || "data/";
  var WIKI = ROOT.getAttribute("data-wiki") || "../";
  var MISSIONS = [
    { key: "solo", label: "Solar Orbiter — MIB 2025-09-16" },
    { key: "solo2020", label: "Solar Orbiter — MIB 2020-04-16" },
    { key: "swa", label: "Solar Orbiter SWA instrument DB (2021 ASCII set)" },
    { key: "swa65", label: "Solar Orbiter SWA instrument DB v6.5.0 (2025)" },
    { key: "stix", label: "Solar Orbiter STIX instrument DB v2.26.38" }
  ];
  var cache = {};
  var FIELDS = null; // field documentation, loaded from data/fields.json when present

  // ---------- utilities ----------
  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function fnv(s) {
    var bytes = new TextEncoder().encode(s), h = 2166136261;
    for (var i = 0; i < bytes.length; i++) { h ^= bytes[i]; h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function getJSON(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
        return r.json();
      });
    }
    return cache[url];
  }
  function href(m, kind, id) { return "#/" + m + "/" + kind + (id !== undefined ? "/" + encodeURIComponent(id) : ""); }
  function link(m, kind, id, text) { return '<a href="' + href(m, kind, id) + '">' + esc(text !== undefined ? text : id) + "</a>"; }
  function chip(text, cls) { return '<span class="mx-chip ' + (cls || "") + '">' + esc(text) + "</span>"; }
  function tableLink(t) { return WIKI + "mib/tables/" + t + "/"; }
  function colName(meta, t, i) { return (meta.columns[t] || [])[i] || (t.toUpperCase() + "_" + (i + 1)); }
  function fieldDoc(t, name) {
    if (!FIELDS || !FIELDS[t]) return "";
    var f = FIELDS[t][name];
    return f ? (f.type ? f.type + " — " : "") + (f.d || "") : "";
  }
  function val(meta, t, row, name) {
    var i = (meta.columns[t] || []).indexOf(name);
    return i >= 0 && row && i < row.length ? row[i] : "";
  }

  // ---------- PTC/PFC description (ECSS-E-ST-70-41C clause 7 / SCOS-2000 ICD; refined by fields.json when present) ----------
  function ptcpfc(ptc, pfc) {
    ptc = parseInt(ptc, 10); pfc = parseInt(pfc, 10);
    if (FIELDS && FIELDS._ptcpfc && FIELDS._ptcpfc[ptc + "/" + pfc]) return FIELDS._ptcpfc[ptc + "/" + pfc];
    var uint = { 0: 4, 1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10, 7: 11, 8: 12, 9: 13, 10: 14, 11: 15, 12: 16, 13: 24, 14: 32, 15: 48, 16: 64 };
    switch (ptc) {
      case 1: return { t: "Boolean", bits: pfc === 0 ? 1 : null };
      case 2: return { t: "Enumerated", bits: pfc > 0 ? pfc : null };
      case 3: return { t: "Unsigned integer", bits: uint[pfc] || null };
      case 4: return { t: "Signed integer", bits: uint[pfc] || null };
      case 5: return { t: "Real", bits: { 1: 32, 2: 64, 3: 32, 4: 48 }[pfc] || null, note: { 1: "IEEE single", 2: "IEEE double", 3: "MIL-STD-1750A simple", 4: "MIL-STD-1750A extended" }[pfc] };
      case 6: return { t: "Bit string", bits: pfc > 0 ? pfc : null, note: pfc === 0 ? "variable length" : "" };
      case 7: return { t: "Octet string", bits: pfc > 0 ? pfc * 8 : null, note: pfc === 0 ? "variable length" : "" };
      case 8: return { t: "Character string", bits: pfc > 0 ? pfc * 8 : null, note: pfc === 0 ? "variable length" : "" };
      case 9: return { t: "Absolute time", bits: null };
      case 10: return { t: "Relative time", bits: null };
      case 11: return { t: "Deduced (type given by another parameter)", bits: null };
      case 13: return { t: "Saved synthetic / SCOS-specific", bits: null };
      default: return { t: "PTC " + ptc, bits: null };
    }
  }
  function typeLabel(ptc, pfc) {
    if (ptc === "" || ptc === undefined) return "";
    var d = ptcpfc(ptc, pfc);
    return d.t + (d.bits ? " · " + d.bits + " bits" : "") + (d.note ? " · " + d.note : "");
  }
  var NATUR = { R: "Raw (extracted from packets)", D: "Dynamic OL synthetic", P: "Synthetic (OL)", H: "Hard-coded synthetic", S: "Saved synthetic", C: "Constant" };
  var CATEG = { N: "Numerical", S: "Status (textual calibration)", T: "Text string" };

  // ---------- generic field table ----------
  function fieldTable(meta, t, row, opts) {
    opts = opts || {};
    var cols = meta.columns[t] || [];
    var h = '<table class="mx-fields"><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>';
    for (var i = 0; i < Math.max(cols.length, row.length); i++) {
      var v = i < row.length ? row[i] : "";
      if (v === "" && !opts.showEmpty) continue;
      var name = colName(meta, t, i), doc = fieldDoc(t, name);
      var rendered = opts.render && opts.render[name] ? opts.render[name](v) : esc(v);
      h += '<tr><td><a class="mx-field" href="' + tableLink(t) + "#" + name.toLowerCase() + '" title="' + esc(doc) + '">' + esc(name) + "</a></td><td>" + rendered + "</td></tr>";
    }
    return h + "</tbody></table>";
  }
  function rowsTable(meta, t, rows, opts) {
    opts = opts || {};
    if (!rows || !rows.length) return '<p class="mx-muted">None.</p>';
    var cols = (opts.cols || meta.columns[t] || []).slice();
    var used = cols.map(function (_, i) { return rows.some(function (r) { return (r[i] || "") !== ""; }); });
    var h = '<div class="mx-scroll"><table class="mx-rows"><thead><tr>';
    cols.forEach(function (c, i) { if (used[i]) h += '<th><a class="mx-field" href="' + tableLink(t) + "#" + c.toLowerCase() + '" title="' + esc(fieldDoc(t, c)) + '">' + esc(c) + "</a></th>"; });
    h += "</tr></thead><tbody>";
    rows.slice(0, opts.limit || 2000).forEach(function (r) {
      h += "<tr>";
      cols.forEach(function (c, i) {
        if (!used[i]) return;
        var v = r[i] || "";
        h += "<td>" + (opts.render && opts.render[c] ? opts.render[c](v, r) : esc(v)) + "</td>";
      });
      h += "</tr>";
    });
    h += "</tbody></table></div>";
    if (rows.length > (opts.limit || 2000)) h += '<p class="mx-muted">' + (rows.length - (opts.limit || 2000)) + " more rows not shown.</p>";
    return h;
  }
  function section(title, body, tableName) {
    return '<section class="mx-section"><h3>' + esc(title) + (tableName ? ' <a class="mx-tbl" href="' + tableLink(tableName) + '">' + esc(tableName) + ".dat</a>" : "") + "</h3>" + body + "</section>";
  }
  function provenance(meta) {
    return '<div class="mx-prov">Data: <strong>' + esc(meta.label) + "</strong> · original: " +
      (meta.source_url ? '<a href="' + esc(meta.source_url) + '" rel="noopener">' + esc(meta.source_url) + "</a>" : "n/a") +
      " · copied " + esc(meta.copied_at || "?") + ' · <a href="' + WIKI + "library/" + esc(meta.source_slug) + '/">library entry</a></div>';
  }

  // ---------- data access ----------
  function meta(m) { return getJSON(BASE + m + "/meta.json"); }
  function index(m, kind) { return getJSON(BASE + m + "/index-" + kind + ".json"); }
  function bucket(m, meta, kind, key) {
    var n = meta.buckets[kind];
    return getJSON(BASE + m + "/" + kind + "/" + (fnv(key) % n) + ".json").then(function (b) { return b[key]; });
  }
  function paramIndexMap(m) {
    var k = "pmap:" + m;
    if (!cache[k]) cache[k] = index(m, "params").then(function (rows) { var o = {}; rows.forEach(function (r) { o[r[0]] = r; }); return o; });
    return cache[k];
  }
  function packetIndexMap(m) {
    var k = "kmap:" + m;
    if (!cache[k]) cache[k] = index(m, "packets").then(function (rows) { var o = {}; rows.forEach(function (r) { o[r[0]] = r; }); return o; });
    return cache[k];
  }

  // ---------- calibration rendering ----------
  function numChart(points) {
    var pts = points.map(function (p) { return [parseFloat(p[1]), parseFloat(p[2])]; }).filter(function (p) { return isFinite(p[0]) && isFinite(p[1]); });
    if (pts.length < 2) return "";
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    if (x1 === x0) x1 = x0 + 1; if (y1 === y0) y1 = y0 + 1;
    var W = 520, H = 220, P = 34;
    function X(v) { return P + (v - x0) / (x1 - x0) * (W - 2 * P); }
    function Y(v) { return H - P - (v - y0) / (y1 - y0) * (H - 2 * P); }
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1); }).join(" ");
    var dots = pts.map(function (p) { return '<circle cx="' + X(p[0]).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="2.6"><title>raw ' + esc(p[0]) + " → eng " + esc(p[1]) + "</title></circle>"; }).join("");
    return '<svg class="mx-chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Calibration curve">' +
      '<line x1="' + P + '" y1="' + (H - P) + '" x2="' + (W - P) + '" y2="' + (H - P) + '" class="ax"/><line x1="' + P + '" y1="' + P + '" x2="' + P + '" y2="' + (H - P) + '" class="ax"/>' +
      '<text x="' + P + '" y="' + (H - 10) + '">' + esc(x0) + '</text><text x="' + (W - P) + '" y="' + (H - 10) + '" text-anchor="end">' + esc(x1) + " (raw)</text>" +
      '<text x="4" y="' + (P - 8) + '">' + esc(y1) + ' (eng)</text><text x="4" y="' + (H - P) + '">' + esc(y0) + "</text>" +
      '<path d="' + d + '" class="ln"/>' + dots + "</svg>";
  }
  function renderCalib(m, meta, key, c, compact) {
    var type = key.split(":")[0], h = "";
    if (type === "num") {
      h += fieldTable(meta, "caf", c.caf) + numChart(c.cap || []) + (compact ? "" : rowsTable(meta, "cap", c.cap));
    } else if (type === "txt") {
      h += fieldTable(meta, "txf", c.txf) + rowsTable(meta, "txp", c.txp, { limit: compact ? 40 : 5000 });
    } else if (type === "poly") {
      h += fieldTable(meta, "mcf", c.mcf);
      var a = [2, 3, 4, 5, 6].map(function (i) { return c.mcf[i] || "0"; });
      h += '<p class="mx-formula">y = ' + a.map(function (v, i) { return esc(v) + (i ? " · x" + (i > 1 ? "<sup>" + i + "</sup>" : "") : ""); }).join(" + ") + "</p>";
    } else if (type === "log") {
      h += fieldTable(meta, "lgf", c.lgf);
    } else if (type === "cnum") {
      h += fieldTable(meta, "cca", c.cca) + numChart((c.ccs || []).map(function (r) { return [r[0], r[1], r[2]]; })) + (compact ? "" : rowsTable(meta, "ccs", c.ccs));
    } else if (type === "ctxt") {
      h += fieldTable(meta, "paf", c.paf) + rowsTable(meta, "pas", c.pas, { limit: compact ? 40 : 5000 });
    } else if (type === "range") {
      h += fieldTable(meta, "prf", c.prf) + rowsTable(meta, "prv", c.prv);
    }
    return h;
  }
  var CALNAME = { num: "Numerical calibration (CAF/CAP)", txt: "Textual calibration (TXF/TXP)", poly: "Polynomial calibration (MCF)", log: "Logarithmic calibration (LGF)",
    cnum: "Command numerical de-calibration (CCA/CCS)", ctxt: "Command textual de-calibration (PAF/PAS)", range: "Command parameter range check (PRF/PRV)" };
  var CALTABLE = { num: "caf", txt: "txf", poly: "mcf", log: "lgf", cnum: "cca", ctxt: "paf", range: "prf" };

  // ---------- views ----------
  function viewParam(m, meta, name) {
    return Promise.all([bucket(m, meta, "p", name), packetIndexMap(m)]).then(function (res) {
      var d = res[0], pk = res[1];
      if (!d) return notFound("parameter", name);
      var r = d.pcf, ptc = val(meta, "pcf", r, "PCF_PTC"), pfc = val(meta, "pcf", r, "PCF_PFC");
      var natur = val(meta, "pcf", r, "PCF_NATUR"), categ = val(meta, "pcf", r, "PCF_CATEG");
      var h = hero("Monitoring parameter", name, val(meta, "pcf", r, "PCF_DESCR"), [
        typeLabel(ptc, pfc), "PTC " + ptc + " / PFC " + pfc, NATUR[natur] || ("Nature " + natur), CATEG[categ] || categ,
        val(meta, "pcf", r, "PCF_UNIT") ? "unit " + val(meta, "pcf", r, "PCF_UNIT") : "", val(meta, "pcf", r, "PCF_SUBSYS") ? "subsystem " + val(meta, "pcf", r, "PCF_SUBSYS") : ""]);
      if (d.asw) h += '<p class="mx-note">On-board (ASW) name from the mission-specific <code>ASW_sw_para</code> table: <code>' + esc(d.asw) + "</code></p>";
      h += section("Definition", fieldTable(meta, "pcf", r, { render: {
        PCF_VALID: function (v) { return link(m, "param", v); },
        PCF_RELATED: function (v) { return link(m, "param", v); },
        PCF_CURTX: function (v) { return d.cal ? link(m, "calib/" + d.cal.split(":")[0], v) : esc(v); }
      } }), "pcf");
      var calHtml = "";
      if (d.cal) calHtml += '<div class="mx-sub">Default curve: ' + link(m, "calib/" + d.cal.split(":")[0], d.cal.split(":").slice(1).join(":"), d.cal) + '</div><div class="mx-cal" data-cal="' + esc(d.cal) + '"></div>';
      if (d.cur) calHtml += '<div class="mx-sub">Conditional curve selection (CUR)</div>' + rowsTable(meta, "cur", d.cur, { render: {
        CUR_RLCHK: function (v) { return link(m, "param", v); },
        CUR_SELECT: function (v) { var k = d.curcal && d.curcal[v]; return k ? link(m, "calib/" + k.split(":")[0], v) : esc(v); } } });
      if (calHtml) h += section("Calibration", calHtml);
      if (d.ocf || d.ocp) h += section("Monitoring checks", (d.ocf ? fieldTable(meta, "ocf", d.ocf) : "") + rowsTable(meta, "ocp", d.ocp, { render: {
        OCP_RLCHK: function (v) { return link(m, "param", v); } } }), "ocp");
      if (d.plf) {
        var rows = d.plf.map(function (l) { return [name].concat(l); });
        h += section("Location in fixed-layout packets (" + d.plf.length + ")", rowsTable(meta, "plf", rows, { render: {
          PLF_NAME: function () { return esc(name); },
          PLF_SPID: function (v) { return link(m, "packet", v) + (pk[v] ? ' <span class="mx-muted">' + esc(pk[v][6]) + "</span>" : ""); } } }), "plf");
      }
      if (d.vpd) {
        h += section("Use in variable packets (VPD)", rowsTable(meta, "vpd", d.vpd) +
          (d.vpkts && d.vpkts.length ? '<p>Packets using these structures: ' + d.vpkts.map(function (s) { return link(m, "packet", s); }).join(", ") + "</p>" : ""), "vpd");
      }
      if (d.ol) h += section("Synthetic parameter definition (OL source)", '<pre class="mx-code"><code>' + esc(d.ol) + "</code></pre>");
      var rel = "";
      if (d.validity_of) rel += "<p><strong>Validity parameter for:</strong> " + d.validity_of.map(function (n) { return link(m, "param", n); }).join(", ") + "</p>";
      if (d.glob) rel += "<p><strong>Detail parameters (mission table <code>pcf_glob_det</code>):</strong> " + d.glob.map(function (g) { return link(m, "param", g[0]) + " [" + esc(g[1]) + "]"; }).join(", ") + "</p>";
      if (d.glob_of) rel += "<p><strong>Detail of global parameter(s):</strong> " + d.glob_of.map(function (n) { return link(m, "param", n); }).join(", ") + "</p>";
      if (d.cve) rel += "<p><strong>Used in command verification stages:</strong> " + d.cve.map(function (s) { return link(m, "verif", s); }).join(", ") + "</p>";
      if (d.ptv) rel += "<p><strong>Used in pre-transmission validation of:</strong> " + d.ptv.map(function (s) { return link(m, "command", s); }).join(", ") + "</p>";
      if (rel) h += section("Relations", rel);
      return h;
    }).then(function (h) { return h; });
  }

  function hero(kind, id, descr, chips) {
    return '<header class="mx-hero"><div class="mx-kind">' + esc(kind) + '</div><h2><code>' + esc(id) + "</code></h2>" +
      (descr ? '<p class="mx-descr">' + esc(descr) + "</p>" : "") + '<div class="mx-chips">' + chips.filter(Boolean).map(function (c) { return chip(c); }).join("") + "</div></header>";
  }
  function notFound(kind, id) { return '<div class="mx-empty">No ' + esc(kind) + " <code>" + esc(id) + "</code> in this database.</div>"; }

  function viewPacket(m, meta, spid) {
    return Promise.all([bucket(m, meta, "k", spid), paramIndexMap(m)]).then(function (res) {
      var d = res[0], pm = res[1];
      if (!d) return notFound("packet", spid);
      var r = d.pid, ty = val(meta, "pid", r, "PID_TYPE"), st = val(meta, "pid", r, "PID_STYPE"), ap = val(meta, "pid", r, "PID_APID");
      var tp = val(meta, "pid", r, "PID_TPSD");
      var h = hero("Telemetry packet (SPID)", spid, val(meta, "pid", r, "PID_DESCR"), [
        "APID " + ap, "PUS TM[" + ty + "," + st + "]", "PI1 = " + val(meta, "pid", r, "PID_PI1_VAL"), "PI2 = " + val(meta, "pid", r, "PID_PI2_VAL"),
        tp && tp !== "-1" ? "variable layout (TPSD " + tp + ")" : "fixed layout", val(meta, "pid", r, "PID_EVENT") && val(meta, "pid", r, "PID_EVENT") !== "N" ? "event packet" : "",
        d.tpcf && d.tpcf[1] ? "name " + d.tpcf[1] : ""]);
      h += '<p class="mx-note">' + link(m, "apid", ap, "All packets and commands of APID " + ap) + " · " +
        '<a href="' + WIKI + 'ecss/pus/message-types/">PUS message types</a></p>';
      h += section("Identification", fieldTable(meta, "pid", r, { render: { PID_APID: function (v) { return link(m, "apid", v); } } }) +
        (d.pic && d.pic.length ? '<div class="mx-sub">Identification criteria (PIC)</div>' + rowsTable(meta, "pic", d.pic) : ""), "pid");
      if (d.plf) {
        var rows = d.plf.map(function (x) { return [x[0], spid].concat(x.slice(1)); });
        h += section("Fixed layout (" + d.plf.length + " parameter locations)", layoutMap(d.plf, pm, parseInt(val(meta, "pid", r, "PID_DFHSIZE") || "0", 10)) +
          rowsTable(meta, "plf", rows, { render: {
            PLF_NAME: function (v) { return link(m, "param", v) + (pm[v] ? ' <span class="mx-muted">' + esc(pm[v][1]) + "</span>" : ""); },
            PLF_SPID: function () { return esc(spid); } } }), "plf");
      }
      if (d.vpd) h += section("Variable layout (VPD, TPSD " + tp + ")", rowsTable(meta, "vpd", d.vpd, { render: {
        VPD_NAME: function (v) { return link(m, "param", v) + (pm[v] ? ' <span class="mx-muted">' + esc(pm[v][1]) + "</span>" : ""); } } }), "vpd");
      if (d.groups) h += section("Groups", d.groups.map(function (g) { return chip(g); }).join(""), "grpk");
      return h;
    });
  }
  function layoutMap(plf, pm, dfh) {
    // byte map of the packet: one cell per octet, coloured when a parameter starts there
    var maxByte = 0, starts = {};
    plf.forEach(function (x) {
      var off = parseInt(x[1] || "0", 10), p = pm[x[0]], bits = p ? (ptcpfc(p[3], p[4]).bits || 8) : 8;
      var end = off + Math.ceil((parseInt(x[2] || "0", 10) + bits) / 8);
      if (end > maxByte) maxByte = end;
      (starts[off] = starts[off] || []).push(x[0]);
    });
    if (maxByte > 4096) return "";
    var h = '<div class="mx-bytes" aria-label="Byte map">';
    for (var b = 0; b < maxByte; b++) {
      var cls = b < 6 ? "hdr" : (b < 6 + dfh ? "dfh" : (starts[b] ? "start" : "body"));
      h += '<span class="' + cls + '" title="octet ' + b + (starts[b] ? ": " + esc(starts[b].join(", ")) : (b < 6 ? ": packet primary header" : (b < 6 + dfh ? ": data field header" : ""))) + '"></span>';
    }
    return h + '</div><p class="mx-legend"><span class="hdr"></span> primary header <span class="dfh"></span> data field header (' + dfh + ' octets per PID_DFHSIZE) <span class="start"></span> a parameter starts here <span class="body"></span> other octets</p>';
  }

  function viewApid(m, meta, apid) {
    return Promise.all([index(m, "packets"), index(m, "commands")]).then(function (res) {
      var pk = res[0].filter(function (r) { return r[3] === apid; }), cm = res[1].filter(function (r) { return r[4] === apid; });
      var h = hero("Application process (APID)", apid, "", [pk.length + " TM packet definitions", cm.length + " telecommands"]);
      h += section("Telemetry packets", resultTable(m, "packets", pk));
      h += section("Telecommands", resultTable(m, "commands", cm));
      return h;
    });
  }

  function viewCommand(m, meta, name) {
    return bucket(m, meta, "c", name).then(function (d) {
      if (!d) return notFound("command", name);
      var r = d.ccf;
      var h = hero("Telecommand", name, val(meta, "ccf", r, "CCF_DESCR"), [
        val(meta, "ccf", r, "CCF_TYPE") !== "" ? "PUS TC[" + val(meta, "ccf", r, "CCF_TYPE") + "," + val(meta, "ccf", r, "CCF_STYPE") + "]" : "no PUS type/subtype (non-PUS command)",
        val(meta, "ccf", r, "CCF_PKTID") ? "packet header " + val(meta, "ccf", r, "CCF_PKTID") : "",
        val(meta, "ccf", r, "CCF_APID") !== "" ? "APID " + val(meta, "ccf", r, "CCF_APID") : "",
        val(meta, "ccf", r, "CCF_NPARS") + " parameters", val(meta, "ccf", r, "CCF_CRITICAL") === "Y" ? "critical" : "",
        val(meta, "ccf", r, "CCF_SUBSYS") ? "subsystem " + val(meta, "ccf", r, "CCF_SUBSYS") : ""]);
      h += section("Definition", fieldTable(meta, "ccf", r, { render: { CCF_APID: function (v) { return link(m, "apid", v); } } }), "ccf");
      if (d.cdf) {
        h += section("Command elements (CDF)", rowsTable(meta, "cdf", d.cdf, { render: {
          CDF_PNAME: function (v) { return v ? '<a href="#cpc-' + esc(v) + '">' + esc(v) + "</a>" : ""; },
          CDF_ELTYPE: function (v) { return esc(v) + ' <span class="mx-muted">' + esc({ A: "fixed area", F: "fixed parameter", E: "editable parameter" }[v] || "") + "</span>"; } } }), "cdf");
        var pk = Object.keys(d.cpc || {});
        if (pk.length) {
          var ph = "";
          pk.forEach(function (p) {
            var c = d.cpc[p];
            ph += '<div class="mx-card" id="cpc-' + esc(p) + '"><div class="mx-card-h"><code>' + esc(p) + "</code> " + esc(val(meta, "cpc", c, "CPC_DESCR")) +
              ' <span class="mx-muted">' + esc(typeLabel(val(meta, "cpc", c, "CPC_PTC"), val(meta, "cpc", c, "CPC_PFC"))) + "</span></div>" +
              fieldTable(meta, "cpc", c, { render: {
                CPC_PRFREF: function (v) { return link(m, "calib/range", v); },
                CPC_CCAREF: function (v) { return link(m, "calib/cnum", v); },
                CPC_PAFREF: function (v) { return link(m, "calib/ctxt", v); } } }) + "</div>";
          });
          h += section("Command parameters (CPC)", ph, "cpc");
        }
      }
      if (d.cvp) h += section("Verification stages", '<div class="mx-verifs" data-ids="' + esc(d.cvp.join(",")) + '"></div>', "cvp");
      if (d.ptv) h += section("Pre-transmission validation (PTV)", rowsTable(meta, "ptv", d.ptv, { render: { PTV_PARNAM: function (v) { return link(m, "param", v); } } }), "ptv");
      if (d.dst) h += section("Destination (DST)", fieldTable(meta, "dst", d.dst), "dst");
      if (d.seqs) h += section("Used in sequences", d.seqs.map(function (s) { return link(m, "sequence", s); }).join(", "));
      return h;
    });
  }

  function viewSequence(m, meta, name) {
    return bucket(m, meta, "s", name).then(function (d) {
      if (!d) return notFound("sequence", name);
      var r = d.csf;
      var h = hero("Command sequence", name, val(meta, "csf", r, "CSF_DESC"), [
        val(meta, "csf", r, "CSF_ELEMS") + " elements", val(meta, "csf", r, "CSF_NFPARS") + " formal parameters",
        val(meta, "csf", r, "CSF_SUBSYS") ? "subsystem " + val(meta, "csf", r, "CSF_SUBSYS") : ""]);
      h += section("Definition", fieldTable(meta, "csf", r), "csf");
      h += section("Elements (CSS)", rowsTable(meta, "css", d.css, { render: {
        CSS_ELEMID: function (v, row) { var t = row[3]; return t === "C" ? link(m, "command", v) : (t === "S" ? link(m, "sequence", v) : esc(v)); } } }), "css");
      if (d.sdf && d.sdf.length) h += section("Element parameter values (SDF)", rowsTable(meta, "sdf", d.sdf), "sdf");
      if (d.csp && d.csp.length) h += section("Formal parameters (CSP)", rowsTable(meta, "csp", d.csp), "csp");
      if (d.cvp) h += section("Verification stages", '<div class="mx-verifs" data-ids="' + esc(d.cvp.join(",")) + '"></div>', "cvp");
      if (d.seqs) h += section("Used in sequences", d.seqs.map(function (s) { return link(m, "sequence", s); }).join(", "));
      return h;
    });
  }

  function viewCalib(m, meta, type, id) {
    var key = type + ":" + id;
    return bucket(m, meta, "cal", key).then(function (c) {
      if (!c) return notFound("calibration", key);
      var h = hero(CALNAME[type] || "Calibration", id, (c[CALTABLE[type]] || [])[1], [c.n_users + " users"]);
      h += section("Definition", renderCalib(m, meta, key, c, false), CALTABLE[type]);
      if (c.users && c.users.length) h += section("Used by", c.users.map(function (u) {
        return u.indexOf("cmd:") === 0 ? link(m, "command", u.slice(4)) + " (command)" : link(m, "param", u); }).join(", ") +
        (c.n_users > c.users.length ? ' <span class="mx-muted">… and ' + (c.n_users - c.users.length) + " more</span>" : ""));
      return h;
    });
  }

  function viewVerif(m, meta, id) {
    return getJSON(BASE + m + "/verif.json").then(function (v) {
      var s = v[id];
      if (!s) return notFound("verification stage", id);
      var TYPES = { A: "acceptance", S: "start", C: "completion", "0": "progress stage 0" };
      var h = hero("Command verification stage (CVS)", id, "", [TYPES[val(meta, "cvs", s.cvs, "CVS_TYPE")] || ("type " + val(meta, "cvs", s.cvs, "CVS_TYPE")),
        val(meta, "cvs", s.cvs, "CVS_SOURCE") === "R" ? "based on TM reports" : "based on parameter values", s.n_users + " commands/sequences"]);
      h += section("Stage", fieldTable(meta, "cvs", s.cvs), "cvs");
      if (s.cve.length) h += section("Expressions (CVE)", rowsTable(meta, "cve", s.cve, { render: { CVE_PARNAM: function (x) { return link(m, "param", x); } } }), "cve");
      h += section("Used by", s.users.map(function (u) { return u[1] === "S" ? link(m, "sequence", u[0]) : link(m, "command", u[0]); }).join(", "));
      return h;
    });
  }

  // ---------- search ----------
  var KINDS = [
    { k: "params", label: "Parameters", cols: ["Name", "Description", "Unit", "Type", "Nature"] },
    { k: "packets", label: "TM packets", cols: ["SPID", "TM[type,sub]", "APID", "PI1/PI2", "Description", "Params"] },
    { k: "commands", label: "Telecommands", cols: ["Name", "Description", "TC[type,sub]", "APID", "Params"] },
    { k: "sequences", label: "Sequences", cols: ["Name", "Description", "Elements", "Formal params"] },
    { k: "calib", label: "Calibrations", cols: ["Id", "Description", "Users"] }
  ];
  function resultTable(m, kind, rows, limit) {
    limit = limit || 300;
    if (!rows.length) return '<p class="mx-muted">No matches.</p>';
    var kd = KINDS.filter(function (x) { return x.k === kind; })[0];
    var h = '<div class="mx-scroll"><table class="mx-rows mx-results"><thead><tr>' + kd.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    rows.slice(0, limit).forEach(function (r) {
      if (kind === "params") h += "<tr><td>" + link(m, "param", r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td><td>" + esc(typeLabel(r[3], r[4])) + "</td><td>" + esc(r[5]) + "</td></tr>";
      else if (kind === "packets") h += "<tr><td>" + link(m, "packet", r[0]) + "</td><td>[" + esc(r[1]) + "," + esc(r[2]) + "]</td><td>" + link(m, "apid", r[3]) + "</td><td>" + esc(r[4]) + " / " + esc(r[5]) + "</td><td>" + esc(r[6]) + "</td><td>" + esc(r[8]) + (r[9] === "V" ? " (var)" : "") + "</td></tr>";
      else if (kind === "commands") h += "<tr><td>" + link(m, "command", r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + (r[2] !== "" ? "[" + esc(r[2]) + "," + esc(r[3]) + "]" : "non-PUS") + "</td><td>" + link(m, "apid", r[4]) + "</td><td>" + esc(r[5]) + "</td></tr>";
      else if (kind === "sequences") h += "<tr><td>" + link(m, "sequence", r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[3]) + "</td><td>" + esc(r[2]) + "</td></tr>";
      else if (kind === "calib") { var t = r[0].split(":")[0], id = r[0].split(":").slice(1).join(":"); h += "<tr><td>" + link(m, "calib/" + t, id, r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }
    });
    h += "</tbody></table></div>";
    if (rows.length > limit) h += '<p class="mx-muted">Showing ' + limit + " of " + rows.length + " matches — refine the query.</p>";
    return h;
  }
  function matcher(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return function (r) {
      var hay = r.join(" ").toLowerCase();
      return terms.every(function (t) {
        var m = /^(type|apid|ptc|sub):(\S+)$/.exec(t);
        if (m) return true;
        return hay.indexOf(t) >= 0;
      });
    };
  }
  function filters(kind, q) {
    var f = {}, re = /(type|apid|ptc|sub):(\S+)/g, x;
    while ((x = re.exec(q.toLowerCase()))) f[x[1]] = x[2];
    return function (r) {
      if (kind === "packets") return (!f.type || r[1] === f.type) && (!f.sub || r[2] === f.sub) && (!f.apid || r[3] === f.apid);
      if (kind === "commands") return (!f.type || r[2] === f.type) && (!f.sub || r[3] === f.sub) && (!f.apid || r[4] === f.apid);
      if (kind === "params") return !f.ptc || r[3] === f.ptc;
      return true;
    };
  }
  function viewSearch(m, meta, kind, q) {
    kind = kind || "params";
    return index(m, kind === "calib" ? "calib" : kind).then(function (rows) {
      var mt = matcher(q || ""), ft = filters(kind, q || "");
      var res = q ? rows.filter(function (r) { return mt(r) && ft(r); }) : rows;
      var h = '<div class="mx-tabs">' + KINDS.map(function (k) {
        return '<a class="' + (k.k === kind ? "on" : "") + '" href="#/' + m + "/search/" + k.k + "/" + encodeURIComponent(q || "") + '">' + esc(k.label) + "</a>"; }).join("") + "</div>";
      h += '<p class="mx-muted">' + res.length + " of " + rows.length + " " + esc(kind) + ". Tip: combine words; filters <code>type:3 sub:25 apid:123 ptc:5</code>.</p>";
      return h + resultTable(m, kind, res);
    });
  }

  function viewHome(m, meta) {
    var c = meta.counts || {};
    var stat = function (n, l, kind) { return '<a class="mx-stat" href="#/' + m + "/search/" + kind + '/"><span>' + (n || 0).toLocaleString("en") + "</span>" + esc(l) + "</a>"; };
    var h = '<div class="mx-stats">' + stat(c.pcf, "monitoring parameters", "params") + stat(c.pid, "TM packet definitions", "packets") +
      stat(c.ccf, "telecommands", "commands") + stat(c.csf, "command sequences", "sequences") +
      stat((c.caf || 0) + (c.txf || 0) + (c.mcf || 0) + (c.lgf || 0), "monitoring calibrations", "calib") + stat(c.synthetic, "synthetic (OL) parameters", "params") + "</div>";
    h += '<p>Pick a category above, type in the search box, or follow a link from the wiki. Every item has its own address, so you can bookmark and share it. Field names link to the ' +
      '<a href="' + WIKI + 'mib/tables/">MIB table reference</a>, and hovering a field name shows its ICD definition.</p>';
    return Promise.resolve(h);
  }

  // ---------- shell ----------
  var state = { m: null };
  function shell() {
    ROOT.innerHTML =
      '<div class="mx-bar"><select class="mx-mission" aria-label="Database">' + MISSIONS.map(function (x) { return '<option value="' + x.key + '">' + esc(x.label) + "</option>"; }).join("") + "</select>" +
      '<form class="mx-search" role="search"><input type="search" placeholder="Search parameters, packets, commands… (e.g. NACS, temperature, type:3 sub:25)" aria-label="Search the MIB"/>' +
      '<select class="mx-kind-sel" aria-label="Category">' + KINDS.map(function (k) { return '<option value="' + k.k + '">' + esc(k.label) + "</option>"; }).join("") + "</select>" +
      '<button type="submit">Search</button></form></div><div class="mx-provbox"></div><div class="mx-view" aria-live="polite"></div>';
    ROOT.querySelector(".mx-mission").addEventListener("change", function (e) { location.hash = "#/" + e.target.value; });
    ROOT.querySelector(".mx-search").addEventListener("submit", function (e) {
      e.preventDefault();
      var q = ROOT.querySelector(".mx-search input").value.trim(), k = ROOT.querySelector(".mx-kind-sel").value;
      location.hash = "#/" + (state.m || "solo") + "/search/" + k + "/" + encodeURIComponent(q);
    });
  }
  function postRender(m, meta, view) {
    view.querySelectorAll(".mx-cal[data-cal]").forEach(function (el) {
      var key = el.getAttribute("data-cal");
      bucket(m, meta, "cal", key).then(function (c) { if (c) el.innerHTML = renderCalib(m, meta, key, c, true); });
    });
    view.querySelectorAll(".mx-verifs[data-ids]").forEach(function (el) {
      getJSON(BASE + m + "/verif.json").then(function (v) {
        var ids = el.getAttribute("data-ids").split(","), rows = [];
        ids.forEach(function (id) { if (v[id]) rows.push(v[id].cvs); });
        el.innerHTML = rowsTable(meta, "cvs", rows, { render: { CVS_ID: function (x) { return link(m, "verif", x); } } });
      });
    });
  }
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/").map(function (p) { try { return decodeURIComponent(p); } catch (e) { return p; } });
    var m = MISSIONS.some(function (x) { return x.key === parts[0]; }) ? parts[0] : "solo";
    state.m = m;
    ROOT.querySelector(".mx-mission").value = m;
    var view = ROOT.querySelector(".mx-view");
    view.innerHTML = '<div class="mx-loading">Loading…</div>';
    meta(m).then(function (mt) {
      ROOT.querySelector(".mx-provbox").innerHTML = provenance(mt);
      var kind = parts[1] || "", id = parts.slice(2).join("/"), p;
      if (kind === "param") p = viewParam(m, mt, id);
      else if (kind === "packet") p = viewPacket(m, mt, id);
      else if (kind === "apid") p = viewApid(m, mt, id);
      else if (kind === "command") p = viewCommand(m, mt, id);
      else if (kind === "sequence") p = viewSequence(m, mt, id);
      else if (kind === "calib") p = viewCalib(m, mt, parts[2], parts.slice(3).join("/"));
      else if (kind === "verif") p = viewVerif(m, mt, id);
      else if (kind === "search") {
        var known = KINDS.some(function (k) { return k.k === parts[2]; });
        var sk = known ? parts[2] : "params", q = known ? parts.slice(3).join("/") : parts.slice(2).join("/");
        ROOT.querySelector(".mx-search input").value = q; ROOT.querySelector(".mx-kind-sel").value = sk;
        p = viewSearch(m, mt, sk, q);
      } else p = viewHome(m, mt);
      return p.then(function (h) {
        view.innerHTML = h; postRender(m, mt, view);
        var t = view.querySelector(".mx-hero h2");
        document.title = (t ? t.textContent + " · " : "") + "MIB Explorer · OPEN-SPACE-INFO";
        if (kind && kind !== "search") ROOT.scrollIntoView({ block: "start" });
      });
    }).catch(function (e) { view.innerHTML = '<div class="mx-empty">Could not load data: ' + esc(e.message) + "</div>"; });
  }
  shell();
  getJSON(BASE + "fields.json").then(function (f) { FIELDS = f; }).catch(function () { FIELDS = null; }).then(function () {
    window.addEventListener("hashchange", route);
    route();
  });
})();
