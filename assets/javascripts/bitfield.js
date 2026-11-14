/* Bit-field diagram renderer for OPEN-SPACE-INFO.
 * Markup: <div class="bitfield" data-title="..." data-width="32"
 *              data-fields='[{"n":"Version","b":3,"v":"000","d":"...","g":"Group"}, ...]'></div>
 * Fields are drawn MSB-first in transmission order; bit 0 is the first transmitted bit (CCSDS convention).
 */
(function () {
  "use strict";
  var HUES = [212, 168, 262, 32, 340, 190, 128, 290, 8, 230, 52, 300];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function render(box) {
    if (box.dataset.rendered) return;
    var fields;
    try { fields = JSON.parse(box.getAttribute("data-fields")); } catch (e) {
      box.textContent = "[bitfield: invalid JSON] " + e; return;
    }
    var width = parseInt(box.getAttribute("data-width") || "32", 10);
    if ([8, 16, 24, 32, 64].indexOf(width) < 0) width = 32;
    var total = fields.reduce(function (s, f) { return s + (f.b | 0); }, 0);
    box.dataset.rendered = "1";
    box.innerHTML = "";
    box.setAttribute("role", "figure");
    var title = box.getAttribute("data-title");
    if (title) box.appendChild(el("div", "bf-title", title));
    box.setAttribute("aria-label", (title || "Bit-field diagram") + ": " +
      fields.map(function (f) { return f.n + " (" + f.b + " bits)"; }).join(", "));

    var grid = el("div", "bf-grid");
    grid.style.setProperty("--bf-cols", width);
    // ruler
    var rulerLbl = el("div", "bf-off bf-ruler-lbl", "bit");
    grid.appendChild(rulerLbl);
    for (var i = 0; i < width; i++) {
      var r = el("div", "bf-ruler", (i % 4 === 0 || width <= 16) ? String(i) : "");
      r.style.gridColumn = (i + 2) + " / span 1";
      r.style.gridRow = "1";
      grid.appendChild(r);
    }
    var bit = 0, row = 0, rowLine = 2;
    var rows = Math.ceil(total / width) || 1;
    var hasGroups = fields.some(function (f) { return f.g; });
    // precompute segments per row
    var segs = [];
    fields.forEach(function (f, idx) {
      var remaining = f.b | 0, start = bit, part = 0;
      while (remaining > 0) {
        var r0 = Math.floor(bit / width), c0 = bit % width;
        var take = Math.min(remaining, width - c0);
        segs.push({ f: f, idx: idx, row: r0, col: c0, len: take, part: part++, fstart: start });
        bit += take; remaining -= take;
      }
    });
    for (row = 0; row < rows; row++) {
      var rowSegs = segs.filter(function (s) { return s.row === row; });
      if (hasGroups) {
        var gl = el("div", "bf-off", "");
        gl.style.gridRow = String(rowLine);
        grid.appendChild(gl);
        // contiguous group spans within this row
        var spans = [];
        rowSegs.forEach(function (s) {
          var g = s.f.g || "";
          var last = spans[spans.length - 1];
          if (last && last.g === g && last.col + last.len === s.col) { last.len += s.len; }
          else { spans.push({ g: g, col: s.col, len: s.len }); }
        });
        spans.forEach(function (sp) {
          if (!sp.g) return;
          var b = el("div", "bf-group", sp.g);
          b.style.gridColumn = (sp.col + 2) + " / span " + sp.len;
          b.style.gridRow = String(rowLine);
          b.title = sp.g;
          grid.appendChild(b);
        });
        rowLine++;
      }
      var off = el("div", "bf-off", "octet " + (row * width / 8));
      off.style.gridRow = String(rowLine);
      grid.appendChild(off);
      rowSegs.forEach(function (s) {
        var hue = HUES[s.idx % HUES.length];
        var c = el("div", "bf-cell" + (s.f.v !== undefined ? " bf-fixed" : ""));
        c.style.gridColumn = (s.col + 2) + " / span " + s.len;
        c.style.gridRow = String(rowLine);
        c.style.setProperty("--bf-h", hue);
        var name = el("span", "bf-name", s.part === 0 ? s.f.n : s.f.n + " (cont.)");
        c.appendChild(name);
        var meta = (s.f.b | 0) + (s.f.b === 1 ? " bit" : " bits");
        if (s.part === 0) c.appendChild(el("span", "bf-bits", meta));
        if (s.f.v !== undefined && s.part === 0) c.appendChild(el("span", "bf-val", String(s.f.v)));
        var tip = s.f.n + " — " + meta + " (bits " + s.fstart + "–" + (s.fstart + s.f.b - 1) + ")" +
          (s.f.v !== undefined ? ", value " + s.f.v : "") + (s.f.d ? "\n" + s.f.d : "");
        c.title = tip;
        c.tabIndex = 0;
        c.setAttribute("aria-label", tip);
        if (s.len <= 2) c.classList.add("bf-narrow");
        grid.appendChild(c);
      });
      rowLine++;
    }
    var scroller = el("div", "bf-scroll");
    scroller.appendChild(grid);
    box.appendChild(scroller);
    var cap = box.getAttribute("data-caption");
    box.appendChild(el("div", "bf-caption",
      (cap ? cap + " · " : "") + total + " bits" + (total % 8 === 0 ? " = " + (total / 8) + " octets" : "")));
  }

  function renderAll(root) {
    (root || document).querySelectorAll("div.bitfield").forEach(render);
  }
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () { renderAll(document); });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { renderAll(document); });
  } else { renderAll(document); }
})();
