#!/usr/bin/env python3
"""Build the MIB explorer data (JSON shards) from a directory of SCOS-2000 MIB ASCII tables.

Usage:
  python3 -I tools/build_explorer.py MISSION_KEY MIB_DIR "Release label" SOURCE_SLUG [--compare OTHER_MIB_DIR]

Writes docs/explorer/data/<MISSION_KEY>/: meta.json, index-*.json and bucketed detail files.
Rows are stored as arrays in the column order given by tools/mib_columns.json (trailing
empty fields trimmed), so the browser can label them with the ICD field names.
"""
import json
import os
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
COLS = {t: v["columns"] for t, v in json.load(open(os.path.join(HERE, "mib_columns.json"))).items() if not t.startswith("_")}
NB = {"p": 256, "k": 64, "c": 64, "s": 32, "cal": 32}


def fnv(s):
    h = 2166136261
    for b in s.encode("utf-8"):
        h ^= b
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def read(d, t):
    p = os.path.join(d, t + ".dat")
    if not os.path.exists(p):
        alt = [f for f in os.listdir(d) if f.lower() == t + ".dat"]
        if not alt:
            return []
        p = os.path.join(d, alt[0])
    rows = []
    with open(p, encoding="latin-1", newline="") as fh:
        for line in fh:
            line = line.rstrip("\r\n")
            if line:
                rows.append(line.split("\t"))
    return rows


def trim(r):
    r = list(r)
    while r and r[-1] == "":
        r.pop()
    return r


def col(t, name):
    return COLS[t].index(name)


def g(r, t, name):
    i = col(t, name)
    return r[i] if i < len(r) else ""


def main(argv):
    key, mib, label, slug = argv[1], argv[2], argv[3], argv[4]
    compare = argv[argv.index("--compare") + 1] if "--compare" in argv else None
    out = os.path.join(ROOT, "docs", "explorer", "data", key)
    os.makedirs(out, exist_ok=True)
    T = {t: read(mib, t) for t in COLS}
    extra = {t: read(mib, t) for t in ("asw_sw_para", "pcf_glob_det", "dup", "s13a", "s13p", "s13t")}
    reg = {o["slug"]: o for o in json.load(open(os.path.join(ROOT, "data", "sources.json")))}
    src = reg.get(slug, {})

    pcf = {g(r, "pcf", "PCF_NAME"): r for r in T["pcf"]}
    pid = {g(r, "pid", "PID_SPID"): r for r in T["pid"]}
    tpcf = {g(r, "tpcf", "TPCF_SPID"): r for r in T["tpcf"]}

    # ---- calibrations
    cal = {}
    caps = defaultdict(list)
    for r in T["cap"]:
        caps[g(r, "cap", "CAP_NUMBR")].append(trim(r))
    for r in T["caf"]:
        i = g(r, "caf", "CAF_NUMBR"); cal["num:" + i] = {"caf": trim(r), "cap": caps.get(i, [])}
    txps = defaultdict(list)
    for r in T["txp"]:
        txps[g(r, "txp", "TXP_NUMBR")].append(trim(r))
    for r in T["txf"]:
        i = g(r, "txf", "TXF_NUMBR"); cal["txt:" + i] = {"txf": trim(r), "txp": txps.get(i, [])}
    for r in T["mcf"]:
        cal["poly:" + g(r, "mcf", "MCF_IDENT")] = {"mcf": trim(r)}
    for r in T["lgf"]:
        cal["log:" + g(r, "lgf", "LGF_IDENT")] = {"lgf": trim(r)}
    ccss = defaultdict(list)
    for r in T["ccs"]:
        ccss[g(r, "ccs", "CCS_NUMBR")].append(trim(r))
    for r in T["cca"]:
        i = g(r, "cca", "CCA_NUMBR"); cal["cnum:" + i] = {"cca": trim(r), "ccs": ccss.get(i, [])}
    pass_ = defaultdict(list)
    for r in T["pas"]:
        pass_[g(r, "pas", "PAS_NUMBR")].append(trim(r))
    for r in T["paf"]:
        i = g(r, "paf", "PAF_NUMBR"); cal["ctxt:" + i] = {"paf": trim(r), "pas": pass_.get(i, [])}
    prvs = defaultdict(list)
    for r in T["prv"]:
        prvs[g(r, "prv", "PRV_NUMBR")].append(trim(r))
    for r in T["prf"]:
        i = g(r, "prf", "PRF_NUMBR"); cal["range:" + i] = {"prf": trim(r), "prv": prvs.get(i, [])}

    def resolve_mon_cal(cid, categ):
        if not cid:
            return None
        order = ["txt"] if categ == "S" else ["num", "poly", "log"]
        for k in order:
            if f"{k}:{cid}" in cal:
                return f"{k}:{cid}"
        return None

    cal_users = defaultdict(set)

    # ---- parameters
    curs = defaultdict(list)
    for r in T["cur"]:
        curs[g(r, "cur", "CUR_PNAME")].append(trim(r))
    ocf = {g(r, "ocf", "OCF_NAME"): trim(r) for r in T["ocf"]}
    ocps = defaultdict(list)
    for r in T["ocp"]:
        ocps[g(r, "ocp", "OCP_NAME")].append(trim(r))
    locs = defaultdict(list)
    pkt_params = defaultdict(list)
    for r in T["plf"]:
        n, spid = g(r, "plf", "PLF_NAME"), g(r, "plf", "PLF_SPID")
        locs[n].append(trim(r))
        pkt_params[spid].append(trim(r))
    vpds = defaultdict(list)
    vpd_by_param = defaultdict(list)
    for r in T["vpd"]:
        vpds[g(r, "vpd", "VPD_TPSD")].append(trim(r))
        vpd_by_param[g(r, "vpd", "VPD_NAME")].append(trim(r))
    tpsd_to_spids = defaultdict(list)
    for spid, r in pid.items():
        tp = g(r, "pid", "PID_TPSD")
        if tp not in ("", "-1"):
            tpsd_to_spids[tp].append(spid)
    synth = {}
    sd = os.path.join(mib, "synthetic")
    if os.path.isdir(sd):
        for f in os.listdir(sd):
            fp = os.path.join(sd, f)
            if os.path.isfile(fp):
                synth[f] = open(fp, encoding="latin-1").read()
    cve_by_param = defaultdict(list)
    for r in T["cve"]:
        cve_by_param[g(r, "cve", "CVE_PARNAM")].append(g(r, "cve", "CVE_CVSID"))
    ptv_by_param = defaultdict(list)
    for r in T["ptv"]:
        ptv_by_param[g(r, "ptv", "PTV_PARNAM")].append(g(r, "ptv", "PTV_CNAME"))
    validity_of = defaultdict(list)
    for n, r in pcf.items():
        v = g(r, "pcf", "PCF_VALID")
        if v:
            validity_of[v].append(n)
    asw = {r[0]: r[1] for r in extra["asw_sw_para"] if len(r) > 1}
    glob = defaultdict(list)
    glob_rev = defaultdict(list)
    for r in extra["pcf_glob_det"]:
        if len(r) > 2:
            glob[r[0]].append([r[1], r[2]])
            glob_rev[r[1]].append(r[0])
    older = set()
    if compare:
        older = {r[0] for r in read(compare, "pcf")}

    p_index, p_buckets = [], defaultdict(dict)
    for n, r in pcf.items():
        categ = g(r, "pcf", "PCF_CATEG")
        d = {"pcf": trim(r)}
        ck = resolve_mon_cal(g(r, "pcf", "PCF_CURTX"), categ)
        if ck:
            d["cal"] = ck; cal_users[ck].add(n)
        if n in curs:
            d["cur"] = curs[n]
            d["curcal"] = {}
            for c in curs[n]:
                sel = c[col("cur", "CUR_SELECT")] if len(c) > col("cur", "CUR_SELECT") else ""
                k = resolve_mon_cal(sel, categ)
                if k:
                    d["curcal"][sel] = k; cal_users[k].add(n)
        if n in ocf: d["ocf"] = ocf[n]
        if n in ocps: d["ocp"] = ocps[n]
        if n in locs:
            d["plf"] = [l[1:] for l in locs[n]]   # PLF row without PLF_NAME
        if n in vpd_by_param:
            d["vpd"] = vpd_by_param[n]
            d["vpkts"] = sorted({s for v in vpd_by_param[n] for s in tpsd_to_spids.get(v[0], [])}, key=int)[:200]
        if n in synth: d["ol"] = synth[n]
        if n in cve_by_param: d["cve"] = sorted(set(cve_by_param[n]))
        if n in ptv_by_param: d["ptv"] = sorted(set(ptv_by_param[n]))
        if n in validity_of: d["validity_of"] = sorted(validity_of[n])[:200]
        if n in asw: d["asw"] = asw[n]
        if n in glob: d["glob"] = glob[n]
        if n in glob_rev: d["glob_of"] = glob_rev[n]
        p_buckets[fnv(n) % NB["p"]][n] = d
        p_index.append([n, g(r, "pcf", "PCF_DESCR"), g(r, "pcf", "PCF_UNIT"), g(r, "pcf", "PCF_PTC"),
                        g(r, "pcf", "PCF_PFC"), g(r, "pcf", "PCF_NATUR"), categ, g(r, "pcf", "PCF_SUBSYS")])

    # ---- packets
    pics = [trim(r) for r in T["pic"]]
    grpk = defaultdict(list)
    for r in T["grpk"]:
        grpk[r[1] if len(r) > 1 else ""].append(r[0])
    k_index, k_buckets = [], defaultdict(dict)
    for spid, r in pid.items():
        d = {"pid": trim(r)}
        if spid in tpcf: d["tpcf"] = trim(tpcf[spid])
        if spid in pkt_params:
            # PLF rows without PLF_SPID: [name, offby, offbi, nbocc, lgocc, time, tdocc]
            d["plf"] = [[x[0]] + x[2:] for x in sorted(pkt_params[spid], key=lambda x: (int(x[2] or 0), int(x[3] or 0)))]
        tp = g(r, "pid", "PID_TPSD")
        if tp not in ("", "-1") and tp in vpds:
            d["vpd"] = sorted(vpds[tp], key=lambda x: int(x[1] or 0))
        ty, st, ap = g(r, "pid", "PID_TYPE"), g(r, "pid", "PID_STYPE"), g(r, "pid", "PID_APID")
        d["pic"] = [p for p in pics if p[0] == ty and p[1] == st and (len(p) < 7 or p[6] in ("", ap))]
        if spid in grpk: d["groups"] = grpk[spid]
        k_buckets[fnv(spid) % NB["k"]][spid] = d
        k_index.append([spid, ty, st, ap, g(r, "pid", "PID_PI1_VAL"), g(r, "pid", "PID_PI2_VAL"),
                        g(r, "pid", "PID_DESCR"), tpcf[spid][1] if spid in tpcf and len(tpcf[spid]) > 1 else "",
                        len(pkt_params.get(spid, [])) + (len(vpds.get(tp, [])) if tp not in ("", "-1") else 0),
                        "V" if tp not in ("", "-1") else "F", g(r, "pid", "PID_EVENT")])

    # ---- verification
    cvs = {g(r, "cvs", "CVS_ID"): trim(r) for r in T["cvs"]}
    cves = defaultdict(list)
    for r in T["cve"]:
        cves[g(r, "cve", "CVE_CVSID")].append(trim(r))
    cvp = defaultdict(list)
    cvs_users = defaultdict(list)
    for r in T["cvp"]:
        task, ty, sid = g(r, "cvp", "CVP_TASK"), g(r, "cvp", "CVP_TYPE"), g(r, "cvp", "CVP_CVSID")
        cvp[task].append(sid)
        cvs_users[sid].append([task, ty])
    verif = {sid: {"cvs": r, "cve": cves.get(sid, []), "n_users": len(cvs_users.get(sid, [])),
                   "users": cvs_users.get(sid, [])[:400]} for sid, r in cvs.items()}

    # ---- commands
    cpc = {g(r, "cpc", "CPC_PNAME"): trim(r) for r in T["cpc"]}
    cdfs = defaultdict(list)
    for r in T["cdf"]:
        cdfs[g(r, "cdf", "CDF_CNAME")].append(trim(r))
    ptvs = defaultdict(list)
    for r in T["ptv"]:
        ptvs[g(r, "ptv", "PTV_CNAME")].append(trim(r))
    seq_users = defaultdict(set)
    for r in T["css"]:
        seq_users[g(r, "css", "CSS_ELEMID")].add(g(r, "css", "CSS_SQNAME"))
    dst = {g(r, "dst", "DST_APID"): trim(r) for r in T["dst"]}
    c_index, c_buckets = [], defaultdict(dict)
    for r in T["ccf"]:
        n = g(r, "ccf", "CCF_CNAME")
        d = {"ccf": trim(r)}
        if n in cdfs:
            d["cdf"] = cdfs[n]
            d["cpc"] = {}
            for e in cdfs[n]:
                pn = g(e, "cdf", "CDF_PNAME")
                if pn and pn in cpc:
                    d["cpc"][pn] = cpc[pn]
                    for refcol, pre in (("CPC_PRFREF", "range"), ("CPC_CCAREF", "cnum"), ("CPC_PAFREF", "ctxt")):
                        v = g(cpc[pn], "cpc", refcol)
                        if v and f"{pre}:{v}" in cal:
                            cal_users[f"{pre}:{v}"].add("cmd:" + n)
        if n in cvp: d["cvp"] = cvp[n]
        if n in ptvs: d["ptv"] = ptvs[n]
        if n in seq_users: d["seqs"] = sorted(seq_users[n])[:300]
        ap = g(r, "ccf", "CCF_APID")
        if ap in dst: d["dst"] = dst[ap]
        c_buckets[fnv(n) % NB["c"]][n] = d
        c_index.append([n, g(r, "ccf", "CCF_DESCR"), g(r, "ccf", "CCF_TYPE"), g(r, "ccf", "CCF_STYPE"), ap,
                        g(r, "ccf", "CCF_NPARS"), g(r, "ccf", "CCF_CRITICAL"), g(r, "ccf", "CCF_SUBSYS")])

    # ---- sequences
    csss = defaultdict(list)
    for r in T["css"]:
        csss[g(r, "css", "CSS_SQNAME")].append(trim(r))
    sdfs = defaultdict(list)
    for r in T["sdf"]:
        sdfs[g(r, "sdf", "SDF_SQNAME")].append(trim(r))
    csps = defaultdict(list)
    for r in T["csp"]:
        csps[g(r, "csp", "CSP_SQNAME")].append(trim(r))
    s_index, s_buckets = [], defaultdict(dict)
    for r in T["csf"]:
        n = g(r, "csf", "CSF_NAME")
        d = {"csf": trim(r), "css": csss.get(n, []), "sdf": sdfs.get(n, []), "csp": csps.get(n, [])}
        if n in cvp: d["cvp"] = cvp[n]
        if n in seq_users: d["seqs"] = sorted(seq_users[n])
        s_buckets[fnv(n) % NB["s"]][n] = d
        s_index.append([n, g(r, "csf", "CSF_DESC"), g(r, "csf", "CSF_NFPARS"), g(r, "csf", "CSF_ELEMS"), g(r, "csf", "CSF_SUBSYS")])

    # ---- calibration buckets + index
    cal_index, cal_buckets = [], defaultdict(dict)
    for k, d in cal.items():
        users = sorted(cal_users.get(k, []))
        d = dict(d); d["users"] = users[:500]; d["n_users"] = len(users)
        cal_buckets[fnv(k) % NB["cal"]][k] = d
        first = next(iter(v for kk, v in d.items() if kk in ("caf", "txf", "mcf", "lgf", "cca", "paf", "prf")))
        cal_index.append([k, first[1] if len(first) > 1 else "", len(users)])

    def dump(name, obj):
        with open(os.path.join(out, name), "w", encoding="utf-8") as fh:
            json.dump(obj, fh, ensure_ascii=False, separators=(",", ":"))

    for kind, buckets in (("p", p_buckets), ("k", k_buckets), ("c", c_buckets), ("s", s_buckets), ("cal", cal_buckets)):
        os.makedirs(os.path.join(out, kind), exist_ok=True)
        for b in range(NB[kind]):
            dump(os.path.join(kind, f"{b}.json"), buckets.get(b, {}))
    dump("index-params.json", p_index)
    dump("index-packets.json", k_index)
    dump("index-commands.json", c_index)
    dump("index-sequences.json", s_index)
    dump("index-calib.json", cal_index)
    dump("verif.json", verif)
    dump("mission-tables.json", {t: extra[t] for t in ("dup", "s13a", "s13p", "s13t")})
    if compare:
        o_pid = {r[col("pid", "PID_SPID")] for r in read(compare, "pid") if len(r) > col("pid", "PID_SPID")}
        o_ccf = {r[0] for r in read(compare, "ccf")}
        o_csf = {r[0] for r in read(compare, "csf")}
        dump("diff.json", {
            "against": os.path.basename(os.path.normpath(compare)),
            "params_added": sorted(set(pcf) - older), "params_removed": sorted(older - set(pcf)),
            "packets_added": sorted(set(pid) - o_pid, key=int), "packets_removed": sorted(o_pid - set(pid), key=int),
            "commands_added": sorted({r[0] for r in T["ccf"]} - o_ccf), "commands_removed": sorted(o_ccf - {r[0] for r in T["ccf"]}),
            "sequences_added": sorted({r[0] for r in T["csf"]} - o_csf), "sequences_removed": sorted(o_csf - {r[0] for r in T["csf"]}),
        })
    meta = {
        "key": key, "label": label, "source_slug": slug, "source_url": src.get("source_url"),
        "copied_at": src.get("copied_at"), "sha256": src.get("sha256"), "buckets": NB,
        "counts": {t: len(v) for t, v in T.items() if v} | {"synthetic": len(synth), "asw_sw_para": len(extra["asw_sw_para"]),
                                                            "pcf_glob_det": len(extra["pcf_glob_det"])},
        "columns": COLS, "compare": bool(compare),
    }
    dump("meta.json", meta)
    total = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(out) for f in fs)
    print(f"{key}: {len(p_index)} params, {len(k_index)} packets, {len(c_index)} commands, {len(s_index)} sequences, "
          f"{len(cal_index)} calibrations, {len(verif)} verification stages -> {total/1e6:.1f} MB")


if __name__ == "__main__":
    main(sys.argv)
