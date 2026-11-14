#!/usr/bin/env python3
"""Build the data files of the Solar Orbiter simulator page.

Usage:
  python3 -I tools/build_simulator.py MIB_SQLITE HORIZONS_DIR

MIB_SQLITE   the read-only SQLite copy of the Solar Orbiter MIB release (2025-09-16)
HORIZONS_DIR the directory holding the raw JPL Horizons API responses:
             vec_-144.txt, vec_399.txt, vec_299.txt, vec_199.txt (heliocentric vectors)
             obs_sun_from_solo.txt (observer sub-latitude/longitude of the Sun seen from Solar Orbiter)

Writes docs/simulator/data/mib.json (the subset of the MIB the simulator encodes and decodes)
and docs/simulator/data/ephem.json (daily state vectors and derived mission events).
Nothing is invented here: every value is copied from the MIB tables or the Horizons files.
"""
import json
import math
import os
import re
import sqlite3
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
OUT = os.path.join(ROOT, "docs", "simulator", "data")

# Housekeeping and report packets the simulator generates (PID_SPID).
SPIDS = [29500, 29516, 33501, 33580, 33582, 14181, 14182, 14178]
# Telecommands the simulator offers (CCF_CNAME).
TCS = ["ZCD01101", "ZCSD0004", "ZCSD0003", "ZCSD3713", "ZCSD3714", "ZCSD1013", "ZCSD1012",
       "ZCAD482A", "ZCF00305", "ZCF00306", "ZCA00305", "ZCA00306", "ZCF00382", "ZCA00382", "ZCF00380", "ZCA00380"]
# Command sequences: every sequence whose elements are all in TCS is copied (see build_sequences).
# Synthetic (OL) parameters whose published source the simulator evaluates.
SYNTH = ["NCASX002", "NCASX003", "NCASXAG0", "NCASXB10", "NCASXBK0", "NCASXC40"]


def rows(db, sql, args=()):
    cur = db.execute(sql, args)
    cols = [c[0] for c in cur.description]
    return [dict(zip(cols, r)) for r in cur.fetchall()]


def num(s):
    if s is None or s == "":
        return None
    try:
        v = float(s)
        return int(v) if v.is_integer() and "." not in s and "E" not in s.upper() else v
    except ValueError:
        return s


def build_mib(path):
    db = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
    vdf = rows(db, "select * from vdf")[0]
    out = {"release": {"name": vdf["VDF_NAME"], "comment": vdf["VDF_COMMENT"]},
           "packets": {}, "params": {}, "cal": {"num": {}, "txt": {}, "poly": {}, "log": {}},
           "lim": {}, "synth": {}, "tcs": {}, "cpc": {}, "prf": {}, "pas": {}, "cca": {}, "tchdr": {}, "seqs": {}}
    pnames = set()
    for spid in SPIDS:
        pid = rows(db, "select * from pid where PID_SPID=?", (str(spid),))[0]
        plf = rows(db, "select * from plf where PLF_SPID=? order by cast(PLF_OFFBY as int), cast(PLF_OFFBI as int)", (str(spid),))
        out["packets"][str(spid)] = {
            "spid": spid, "type": int(pid["PID_TYPE"]), "stype": int(pid["PID_STYPE"]), "apid": int(pid["PID_APID"]),
            "pi1": int(pid["PID_PI1_VAL"] or 0), "descr": pid["PID_DESCR"], "dfh": int(pid["PID_DFHSIZE"] or 0),
            "params": [[r["PLF_NAME"], int(r["PLF_OFFBY"]), int(r["PLF_OFFBI"] or 0)] for r in plf],
        }
        pnames.update(r["PLF_NAME"] for r in plf)
    for s in SYNTH:
        src = rows(db, "select SOURCE from synthetic where NAME=?", (s,))
        out["synth"][s] = src[0]["SOURCE"].strip() if src else None
        pnames.add(s)
        for ref in re.findall(r"\b(N[A-Z0-9]{7})\b", out["synth"][s] or ""):
            pnames.add(ref)
    cals = set()
    todo = sorted(pnames)
    while todo:
        n = todo.pop(0)
        if n in out["params"]:
            continue
        r = rows(db, "select * from pcf where PCF_NAME=?", (n,))
        if not r:
            continue
        r = r[0]
        out["params"][n] = {k: v for k, v in {
            "d": r["PCF_DESCR"], "u": r["PCF_UNIT"] or None, "ptc": int(r["PCF_PTC"]), "pfc": int(r["PCF_PFC"]),
            "cat": r["PCF_CATEG"], "nat": r["PCF_NATUR"], "cal": r["PCF_CURTX"] or None,
            "inter": r["PCF_INTER"] or None, "valid": r["PCF_VALID"] or None, "valpar": num(r["PCF_VALPAR"]),
        }.items() if v is not None}
        if r["PCF_CURTX"]:
            cals.add(r["PCF_CURTX"])
        if r["PCF_VALID"]:
            todo.append(r["PCF_VALID"])
        ocf = rows(db, "select * from ocf where OCF_NAME=?", (n,))
        if ocf:
            o = ocf[0]
            ocp = rows(db, "select * from ocp where OCP_NAME=? order by cast(OCP_POS as int)", (n,))
            out["lim"][n] = {"inter": o["OCF_INTER"], "codin": o["OCF_CODIN"], "nbool": num(o["OCF_NBOOL"]),
                             "checks": [{k: v for k, v in {"pos": int(c["OCP_POS"]), "type": c["OCP_TYPE"], "lo": num(c["OCP_LVALU"]),
                                                           "hi": num(c["OCP_HVALU"]), "rlchk": c["OCP_RLCHK"] or None,
                                                           "valpar": num(c["OCP_VALPAR"])}.items() if v is not None} for c in ocp]}
            for c in ocp:
                if c["OCP_RLCHK"]:
                    todo.append(c["OCP_RLCHK"])
    for c in sorted(cals):
        caf = rows(db, "select * from caf where CAF_NUMBR=?", (c,))
        if caf:
            a = caf[0]
            pts = rows(db, "select * from cap where CAP_NUMBR=?", (c,))
            out["cal"]["num"][c] = {"d": a["CAF_DESCR"], "eng": a["CAF_ENGFMT"], "raw": a["CAF_RAWFMT"], "u": a["CAF_UNIT"] or None,
                                    "inter": a["CAF_INTER"] or "F",
                                    "x": [num(p["CAP_XVALS"]) for p in pts], "y": [num(p["CAP_YVALS"]) for p in pts]}
            continue
        txf = rows(db, "select * from txf where TXF_NUMBR=?", (c,))
        if txf:
            pts = rows(db, "select * from txp where TXP_NUMBR=?", (c,))
            out["cal"]["txt"][c] = {"d": txf[0]["TXF_DESCR"], "map": [[num(p["TXP_FROM"]), num(p["TXP_TO"]), p["TXP_ALTXT"]] for p in pts]}
            continue
        mcf = rows(db, "select * from mcf where MCF_IDENT=?", (c,))
        if mcf:
            m = mcf[0]
            out["cal"]["poly"][c] = {"d": m["MCF_DESCR"], "a": [float(m[f"MCF_POL{i}"] or 0) for i in range(1, 6)]}
            continue
        lgf = rows(db, "select * from lgf where LGF_IDENT=?", (c,))
        if lgf:
            m = lgf[0]
            out["cal"]["log"][c] = {"d": m["LGF_DESCR"], "a": [float(m[f"LGF_POL{i}"] or 0) for i in range(1, 6)]}
    # telecommands
    for cn in TCS:
        c = rows(db, "select * from ccf where CCF_CNAME=?", (cn,))[0]
        el = rows(db, "select * from cdf where CDF_CNAME=? order by cast(CDF_BIT as int)", (cn,))
        out["tcs"][cn] = {"d": c["CCF_DESCR"], "d2": c["CCF_DESCR2"] or None, "type": int(c["CCF_TYPE"]), "stype": int(c["CCF_STYPE"]),
                          "apid": int(c["CCF_APID"]), "ack": int(c["CCF_ACK"] or 0), "crit": c["CCF_CRITICAL"], "hdr": c["CCF_PKTID"],
                          "el": [{k: v for k, v in {"t": e["CDF_ELTYPE"], "d": e["CDF_DESCR"] or None, "len": int(e["CDF_ELLEN"]),
                                                    "bit": int(e["CDF_BIT"]), "p": e["CDF_PNAME"] or None, "inter": e["CDF_INTER"] or None,
                                                    "v": e["CDF_VALUE"] or None}.items() if v is not None} for e in el]}
        hdr = c["CCF_PKTID"]
        if hdr and hdr not in out["tchdr"]:
            out["tchdr"][hdr] = [{"d": h["PCDF_DESC"], "t": h["PCDF_TYPE"], "len": int(h["PCDF_LEN"]), "bit": int(h["PCDF_BIT"]),
                                  "p": h["PCDF_PNAME"] or None, "v": h["PCDF_VALUE"], "radix": h["PCDF_RADIX"]}
                                 for h in rows(db, "select * from pcdf where PCDF_TCNAME=? order by cast(PCDF_BIT as int)", (hdr,))]
        for e in el:
            p = e["CDF_PNAME"]
            if not p or p in out["cpc"]:
                continue
            r = rows(db, "select * from cpc where CPC_NAME=?", (p,))[0]
            out["cpc"][p] = {k: v for k, v in {"d": r["CPC_DESCR"], "ptc": int(r["CPC_PTC"]), "pfc": int(r["CPC_PFC"]), "cat": r["CPC_CATEG"],
                                               "u": r["CPC_UNIT"] or None, "prf": r["CPC_PRFREF"] or None, "cca": r["CPC_CCAREF"] or None,
                                               "pas": r["CPC_PAFREF"] or None, "def": r["CPC_DEFVAL"] or None,
                                               "inter": r["CPC_INTER"] or None}.items() if v is not None}
            add_refs(db, out, r["CPC_PRFREF"], r["CPC_PAFREF"], r["CPC_CCAREF"])
    build_sequences(db, out)
    return out


def add_refs(db, out, prf, pas, cca):
    """Copy a range set (PRF/PRV), a textual (PAS) and a numeric (CCA/CCS) de-calibration referenced by a CPC or CSP record."""
    if prf and prf not in out["prf"]:
        f = rows(db, "select * from prf where PRF_NUMBR=?", (prf,))[0]
        out["prf"][prf] = {"d": f["PRF_DESCR"], "inter": f["PRF_INTER"], "ranges": [[num(v["PRV_MINVAL"]), num(v["PRV_MAXVAL"])]
                           for v in rows(db, "select * from prv where PRV_NUMBR=?", (prf,))]}
    if pas and pas not in out["pas"]:
        out["pas"][pas] = [[v["PAS_ALTXT"], num(v["PAS_ALVAL"])] for v in rows(db, "select * from pas where PAS_NUMBR=?", (pas,))]
    if cca and cca not in out["cca"]:
        a = rows(db, "select * from cca where CCA_NUMBR=?", (cca,))[0]
        pts = rows(db, "select * from ccs where CCS_NUMBR=?", (cca,))
        out["cca"][cca] = {"d": a["CCA_DESCR"], "u": a["CCA_UNIT"] or None, "eng": [num(p["CCS_XVALS"]) for p in pts],
                           "raw": [num(p["CCS_YVALS"]) for p in pts]}


def build_sequences(db, out):
    """Copy every command sequence (CSF/CSS/SDF/CSP) whose elements, nested sequences included, are all commands the simulator offers."""
    css = {}
    for r in rows(db, "select * from css order by CSS_SQNAME, cast(CSS_ENTRY as int)"):
        css.setdefault(r["CSS_SQNAME"], []).append(r)

    def usable(name, path=()):
        return name in css and name not in path and all(
            (e["CSS_TYPE"] == "C" and e["CSS_ELEMID"] in TCS) or (e["CSS_TYPE"] == "S" and usable(e["CSS_ELEMID"], path + (name,)))
            for e in css[name])

    for name in sorted(n for n in css if usable(n)):
        f = rows(db, "select * from csf where CSF_NAME=?", (name,))[0]
        sdf = rows(db, "select * from sdf where SDF_SQNAME=? order by cast(SDF_ENTRY as int), cast(SDF_POS as int)", (name,))
        for v in sdf:
            if v["SDF_VTYPE"] not in ("R", "E", "F", "D", "S"):
                raise SystemExit(f"{name}: SDF_VTYPE {v['SDF_VTYPE']} is not supported by the simulator")
        if any(e["CSS_GROUP"] or e["CSS_BLOCK"] for e in css[name]):
            raise SystemExit(f"{name}: groups and blocks are not supported by the simulator")
        fps = rows(db, "select * from csp where CSP_SQNAME=? order by cast(CSP_FPNUM as int)", (name,))
        for c in fps:
            add_refs(db, out, c["CSP_PRFREF"], c["CSP_PAFREF"], c["CSP_CCAREF"])
        out["seqs"][name] = {k: v for k, v in {
            "d": f["CSF_DESC"], "d2": f["CSF_DESC2"] or None, "iftt": f["CSF_IFTT"] or "N", "crit": f["CSF_CRITICAL"] or "N",
            "exec": f["CSF_EXEC"] or "Y", "plan": f["CSF_PLAN"] or "N", "doc": f["CSF_DOCNAME"] or None, "issue": f["CSF_ISSUE"] or None,
            "date": f["CSF_DATE"] or None,
            "fp": [{k2: v2 for k2, v2 in {"n": c["CSP_FPNAME"], "num": int(c["CSP_FPNUM"]), "d": c["CSP_DESCR"], "ptc": int(c["CSP_PTC"]),
                                           "pfc": int(c["CSP_PFC"]), "cat": c["CSP_CATEG"] or "N", "vt": c["CSP_VTYPE"] or None,
                                           "def": c["CSP_DEFVAL"] or None, "prf": c["CSP_PRFREF"] or None, "pas": c["CSP_PAFREF"] or None,
                                           "cca": c["CSP_CCAREF"] or None, "u": c["CSP_UNIT"] or None}.items() if v2 is not None} for c in fps],
            "el": [{k2: v2 for k2, v2 in {
                "e": int(e["CSS_ENTRY"]), "t": e["CSS_TYPE"], "id": e["CSS_ELEMID"], "c": e["CSS_COMM"] or None,
                "rt": e["CSS_RELTYPE"] or "R", "rel": e["CSS_RELTIME"] or None, "pr": e["CSS_PREVREL"] or "R", "ex": e["CSS_EXTIME"] or None,
                "man": e["CSS_MANDISP"] or "N",
                "v": [{"pos": int(v["SDF_POS"]), "p": v["SDF_PNAME"], "ft": v["SDF_FTYPE"] or "E", "vt": v["SDF_VTYPE"], "v": v["SDF_VALUE"]}
                      for v in sdf if v["SDF_ENTRY"] == e["CSS_ENTRY"]],
            }.items() if v2 is not None} for e in css[name]],
        }.items() if v is not None}


# ---------------------------------------------------------------- ephemeris
def read_vectors(p):
    txt = open(p, encoding="utf-8").read()
    body = txt.split("$$SOE")[1].split("$$EOE")[0]
    out = []
    for line in body.strip().splitlines():
        f = [x.strip() for x in line.split(",")]
        out.append((float(f[0]), [float(v) for v in f[2:8]]))
    return out


def read_hg(p):
    txt = open(p, encoding="utf-8").read()
    body = txt.split("$$SOE")[1].split("$$EOE")[0]
    out = []
    for line in body.strip().splitlines():
        f = [x.strip() for x in line.split(",")]
        out.append((float(f[3]), float(f[4])))
    return out


def jd_to_iso(jd):
    """TDB Julian date to an ISO UTC string (UTC = TDB - 69.184 s, valid for the 37 leap seconds in force since 2017)."""
    ms = (jd - 2440587.5) * 86400000.0 - 69184.0
    import datetime
    return (datetime.datetime(1970, 1, 1) + datetime.timedelta(milliseconds=ms)).strftime("%Y-%m-%dT%H:%MZ")


def build_ephem(d):
    bodies = {"solo": "-144", "earth": "399", "venus": "299", "mercury": "199"}
    vec = {k: read_vectors(os.path.join(d, f"vec_{v}.txt")) for k, v in bodies.items()}
    n = len(vec["solo"])
    assert all(len(v) == n for v in vec.values())
    jd0 = vec["solo"][0][0]
    hg = read_hg(os.path.join(d, "obs_sun_from_solo.txt"))
    assert len(hg) == n, (len(hg), n)
    out = {"jd0_tdb": jd0, "step_days": 1.0, "n": n, "units": {"pos": "1e-6 au", "vel": "1e-8 au/day", "hg": "1e-3 deg"},
           "frame": "Heliocentric (Sun centre), ecliptic and mean equinox of J2000 (ICRF), TDB time tags", "bodies": {}}
    for k, v in vec.items():
        flat = []
        for _, s in v:
            flat += [round(s[0] * 1e6), round(s[1] * 1e6), round(s[2] * 1e6), round(s[3] * 1e8), round(s[4] * 1e8), round(s[5] * 1e8)]
        out["bodies"][k] = flat
    out["hglat"] = [round(a[1] * 1000) for a in hg]
    out["hglon"] = [round(a[0] * 1000) for a in hg]
    # derived events (from the daily samples)
    S = [s for _, s in vec["solo"]]
    r = [math.sqrt(s[0] ** 2 + s[1] ** 2 + s[2] ** 2) for s in S]
    ev = []
    ev.append({"jd": vec["solo"][0][0], "kind": "start", "label": "First ephemeris sample (after launch on 2020-02-10)"})
    for i in range(1, n - 1):
        if r[i] < r[i - 1] and r[i] <= r[i + 1]:
            ev.append({"jd": vec["solo"][i][0], "kind": "perihelion", "label": f"Perihelion, {r[i]:.3f} au", "r": round(r[i], 4)})
        if r[i] > r[i - 1] and r[i] >= r[i + 1]:
            ev.append({"jd": vec["solo"][i][0], "kind": "aphelion", "label": f"Aphelion, {r[i]:.3f} au", "r": round(r[i], 4)})
        lat = [a[1] for a in hg]
        if lat[i] > lat[i - 1] and lat[i] >= lat[i + 1] and lat[i] > 5:
            ev.append({"jd": vec["solo"][i][0], "kind": "latmax", "label": f"Highest heliographic latitude, {lat[i]:+.1f}°", "lat": round(lat[i], 2)})
        if lat[i] < lat[i - 1] and lat[i] <= lat[i + 1] and lat[i] < -5:
            ev.append({"jd": vec["solo"][i][0], "kind": "latmin", "label": f"Lowest heliographic latitude, {lat[i]:+.1f}°", "lat": round(lat[i], 2)})
    # gravity assists: closest approach from the 5-minute planet-centred Horizons files (flyby_<id>_<date>.txt);
    # the minimum is refined by fitting d^2(t) with a parabola through the three samples around the minimum
    # (exact for straight-line relative motion).
    names = {"299": "Venus", "399": "Earth"}
    for fn in sorted(os.listdir(d)):
        m = re.match(r"flyby_(\d+)_[\d-]+\.txt$", fn)
        if not m:
            continue
        st = read_vectors(os.path.join(d, fn))
        d2 = [s[0] ** 2 + s[1] ** 2 + s[2] ** 2 for _, s in st]
        i = min(range(1, len(st) - 1), key=lambda k: d2[k])
        y0, y1, y2 = d2[i - 1], d2[i], d2[i + 1]
        den = y0 - 2 * y1 + y2
        u = 0.5 * (y0 - y2) / den if den else 0.0
        dmin = math.sqrt(max(0.0, y1 - 0.25 * (y0 - y2) * u))
        step = st[i][0] - st[i - 1][0]
        jd = st[i][0] + u * step
        ev.append({"jd": jd, "kind": "flyby", "label": f"{names[m.group(1)]} gravity assist, closest approach {dmin:,.0f} km from the planet's centre",
                   "km": round(dmin)})
    E = [s for _, s in vec["earth"]]
    sep = []
    for i in range(n):
        es = [S[i][k] - E[i][k] for k in range(3)]
        eS = [-E[i][k] for k in range(3)]
        c = sum(a * b for a, b in zip(es, eS)) / (math.sqrt(sum(a * a for a in es)) * math.sqrt(sum(a * a for a in eS)))
        sep.append(math.degrees(math.acos(max(-1, min(1, c)))))
    for i in range(1, n - 1):
        if sep[i] < sep[i - 1] and sep[i] <= sep[i + 1] and sep[i] < 5:
            de = math.dist(S[i][:3], E[i][:3])
            kind = "superior" if de > math.sqrt(sum(x * x for x in E[i][:3])) else "inferior"
            ev.append({"jd": vec["solo"][i][0], "kind": "conjunction",
                       "label": f"Solar conjunction ({kind}), Sun-Earth-probe angle {sep[i]:.1f}°", "sep": round(sep[i], 2)})
    ev.sort(key=lambda e: e["jd"])
    for e in ev:
        e["utc"] = jd_to_iso(e["jd"])
    out["events"] = ev
    return out


def main(argv):
    if len(argv) != 3:
        print(__doc__)
        return 2
    os.makedirs(OUT, exist_ok=True)
    mib = build_mib(argv[1])
    eph = build_ephem(argv[2])
    fa = os.path.join(argv[2], "fetched_at.txt")
    eph["fetched_at"] = open(fa).read().strip() if os.path.exists(fa) else None
    with open(os.path.join(OUT, "mib.json"), "w", encoding="utf-8") as fh:
        json.dump(mib, fh, separators=(",", ":"), ensure_ascii=False)
    with open(os.path.join(OUT, "ephem.json"), "w", encoding="utf-8") as fh:
        json.dump(eph, fh, separators=(",", ":"))
    print("packets", len(mib["packets"]), "params", len(mib["params"]), "limits", len(mib["lim"]),
          "cal", {k: len(v) for k, v in mib["cal"].items()}, "tcs", len(mib["tcs"]), "sequences", len(mib["seqs"]))
    print("ephem samples", eph["n"], "events", len(eph["events"]))
    for e in eph["events"]:
        print(" ", e["utc"], e["kind"], e["label"])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
