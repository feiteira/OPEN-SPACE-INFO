> [!IMPORTANT]
> **All information in this repository and on its website was retrieved from sources publicly available online.**
> Every page cites the documents it relies on. The
> **[Sources & copies](https://feiteira.github.io/OPEN-SPACE-INFO/about/sources-and-copies/)** page lists each
> document and dataset with a link back to its original location, the date and time (UTC) we copied it, and its
> SHA-256 checksum. This is an independent community project. It is not affiliated with or endorsed by ESA, CCSDS,
> ECSS or any mission team. Third-party documents and data keep their owners' copyright and terms. They are **not**
> covered by this repository's MIT License (see [`docs/third-party/NOTICE.md`](docs/third-party/NOTICE.md)).

# OPEN-SPACE-INFO

**An open, cited, interlinked wiki of how spacecraft talk to the ground.**
Website: **https://feiteira.github.io/OPEN-SPACE-INFO/**

It explains, end to end and with sources for every claim:

* **CCSDS standards**: Space Packet and Encapsulation, TM / TC / AOS / USLP data links, TM synchronization and
  channel coding, the CLTU and the physical-layer operations procedures, COP-1 (FOP-1/FARM-1, CLCW), SDLS,
  time code formats, CFDP, XTCE, and Space Link Extension (RAF, RCF, ROCF, FCLTU, ISP1, SLE API).
* **ECSS standards**: the Packet Utilization Standard (PUS, ECSS-E-ST-70-41C and the 2003 PUS-A), with a page for
  every standard service, plus ECSS-E-ST-50C, E-ST-70-31C, E-ST-70-11C and the CCSDS adoption notices.
* **ESA/ESOC ground segment**: SCOS-2000 and its history and architecture, SCOS-based EGSE, time correlation,
  EDDS/GDDS/TDRS data dissemination, the PARC/DARC/FARC archives, NCTRS/NIS and the ground-station interfaces,
  and the move to EGS-CC.
* **The MIB (Mission Information Base)**: the SCOS-2000 Database Import ICD explained table by table and field by
  field. It comes with a **MIB Explorer** over the real, publicly posted Solar Orbiter MIB, where every telemetry
  parameter, packet, calibration, limit, telecommand and sequence has its own linkable page.
* **A library** of every source document (metadata, summary, contents, reference list, original URL, copy time),
  and a **reference catalogue** of every document those sources cite.

## Repository layout

| Path | Contents |
|---|---|
| `docs/` | Wiki pages (Markdown, MkDocs Material) and the explorer front-end |
| `docs/explorer/data/` | MIB explorer data derived from the public Solar Orbiter MIB releases |
| `data/sources.json` | Source registry: original URL, copy time (UTC), SHA-256, size, pages |
| `data/library/` | Per-document metadata and reference lists |
| `data/mib_schema/` | MIB table and field definitions extracted from the ICD |
| `docs/third-party/` | Copies of the third-party documents and data, exactly as downloaded (not MIT, see its NOTICE) |
| `tools/` | Build scripts: explorer data, generated pages, page checker, source search |
| `AUTHORING.md` | Writing and citation conventions |

## Build locally

```bash
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
mkdocs serve        # http://127.0.0.1:8000/OPEN-SPACE-INFO/
```

The site is rebuilt and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Contributing

Corrections are very welcome. Every factual statement must cite a source (clause and PDF page), as described in
[AUTHORING.md](AUTHORING.md). If you know a better public source, or a newer issue of a document, please open an
issue or a pull request.

## License

The wiki text, diagrams and code written for this project are released under the [MIT License](LICENSE).
Third-party documents and data, and quotations from them, remain the property of their respective owners and are
provided for reference under their own terms. See [`docs/third-party/NOTICE.md`](docs/third-party/NOTICE.md).
