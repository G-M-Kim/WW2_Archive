"""Build the timeline from the canonical Markdown tables."""

import json
import os
import re
from collections import Counter, defaultdict
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "timeline"
SOURCE_FILE = "research/chronology-sources-v1.md"
FIRST_YEAR, LAST_YEAR = 1936, 1945
MONTHS = tuple(f"{year}-{month:02d}" for year in range(FIRST_YEAR, LAST_YEAR + 1)
               for month in range(1, 13))
PROLOGUE, EPILOGUE = "prologue", "epilogue"
PERIODS = (PROLOGUE, *MONTHS, EPILOGUE)
LEGACY_OUTSIDE = f"outside-{MONTHS[0]}_{MONTHS[-1]}"
RECORD = re.compile(r"^\|\s*((?:EVT|SRC)-\d+)\s*\|")
LINK = re.compile(r"https://[^\s<>|]+")
SOURCES = re.compile(r"\bSRC-\d{3,}\b")
EVIDENCE = {"문헌대조": 0, "링크등록": 1, "미등록": 2}


def table_rows(path, prefix, columns):
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        match = RECORD.match(line)
        if not match or not match[1].startswith(prefix):
            continue
        cells = [cell.strip().replace(r"\|", "|") for cell in re.split(r"(?<!\\)\|", line.strip()[1:-1])]
        if len(cells) != columns:
            raise ValueError(f"{path.name}:{number}: expected {columns} table columns")
        yield number, cells


def plain(value):
    value = re.sub(r"\[([^\]]+)\]\((?:[^()]|\([^()]*\))*\)", r"\1", value)
    return re.sub(r"\*\*|\x60|(?<!\w)\*([^*]+)\*", r"\1", value)


def date_key(value):
    if not re.fullmatch(r"\d{4}(?:-\d{2}(?:-\d{2})?)?", value):
        raise ValueError(f"Unrecognized chronology date: {value}")
    parts = [int(part) for part in value.split("-")]
    return date(*((parts + [1, 1])[:3]))


def load_sources(root):
    entries = {}
    for line, (key, name, kind, locator, raw_url, _) in table_rows(root / SOURCE_FILE, "SRC-", 6):
        if key in entries:
            raise ValueError(f"{SOURCE_FILE}:{line}: duplicate {key}")
        # Some rows link multiple resources. The full registered row remains accessible.
        raw_url = re.sub(r"\[([^\]]+)\]\((https://[^\s)]+)\)", r"\2", raw_url)
        urls = list(dict.fromkeys(link.rstrip(".,;") for link in LINK.findall(raw_url)))
        entries[key] = [plain(name), plain(kind), plain(locator), urls, line]
    return entries


def chronology_bucket(when):
    year = int(when[:4])
    if year < FIRST_YEAR:
        return PROLOGUE
    if year > LAST_YEAR:
        return EPILOGUE
    # Year-only dates belong to the January document and retain their precision.
    return (when + "-01")[:7]


def chronology_files(root):
    directory = root / "chronology"
    expected = {f"{name}.md" for name in PERIODS}
    actual = {path.name for path in directory.glob("*.md")} - {"README.md", "references.md", f"{LEGACY_OUTSIDE}.md"}
    if expected != actual:
        raise ValueError(
            f"Chronology files: missing {sorted(expected - actual)}, unexpected {sorted(actual - expected)}"
        )
    return [directory / f"{name}.md" for name in PERIODS]


def read_events(root, available_sources):
    events = {}
    for path in chronology_files(root):
        for line, (key, when, title, category, state, evidence, source_text) in table_rows(path, "EVT-", 7):
            if key in events:
                raise ValueError(f"{path.name}:{line}: duplicate {key}")
            date_key(when)
            if chronology_bucket(when) != path.stem:
                raise ValueError(f"{path.name}:{line}: date {when} belongs to {chronology_bucket(when)}")
            if evidence not in EVIDENCE:
                raise ValueError(f"{path.name}:{line}: unrecognized evidence status {evidence}")
            sources = list(dict.fromkeys(SOURCES.findall(source_text)))
            unknown = set(sources) - available_sources.keys()
            if unknown:
                raise ValueError(f"{path.name}:{line}: missing registered sources {sorted(unknown)}")
            events[key] = [when, plain(title), plain(category), plain(state), EVIDENCE[evidence], sources, path.relative_to(root).as_posix(), line]
    if not events:
        raise ValueError("No chronology events")
    return dict(sorted(events.items(), key=lambda record: (record[1][0], record[1][7])))


def make_index(root, output):
    sources = load_sources(root)
    events = read_events(root, sources)
    weeks = defaultdict(list)
    periods = {period: [] for period in PERIODS}
    years = defaultdict(Counter)
    for key, event in events.items():
        when, _, _, _, evidence, *_ = event
        periods[chronology_bucket(when)].append(key)
        year = when[:4]
        years[year][str(evidence)] += 1
        if len(when) == 10:
            day = date_key(when)
            weeks[(day - timedelta(days=day.weekday())).isoformat()].append(key)
    gallery = json.loads((root / "scripts" / "timeline_media.json").read_text(encoding="utf-8"))
    media = {}
    for key, item in gallery.items():
        if key not in events:
            print(f"Timeline media omitted because {key} is absent from the chronology.")
            continue
        file = Path(item["file"])
        if file.parent != Path("photos") or not (output / file).is_file():
            raise ValueError(f"Missing timeline media: {file}")
        if any(urlsplit(item[field]).scheme != "https" for field in ("source", "licenseUrl")):
            raise ValueError(f"Missing media attribution URL: {key}")
        media[key] = item
    revision = os.environ.get("GITHUB_SHA", "")
    if not re.fullmatch(r"[0-9a-f]{40}", revision):
        revision = "main"
    return {
        "events": events, "weeks": weeks, "periods": periods, "years": years,
        "sources": sources, "sourceFile": SOURCE_FILE, "media": media, "revision": revision,
    }


def main():
    data = make_index(ROOT, OUT)
    target = OUT / "data.json"
    target.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Staged timeline: {len(data['events'])} events, {len(data['weeks'])} occupied weeks, {len(data['media'])} media records.")
    return data


if __name__ == "__main__":
    main()
