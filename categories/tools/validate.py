#!/usr/bin/env python3
"""Validate 154 WW2 category records and references. NOT historical correctness."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
COUNTRIES = [
    ("DE", "germany"), ("FR", "france"), ("GB", "united-kingdom"),
    ("US", "united-states"), ("JP", "japan"), ("IT", "italy"),
    ("SU", "soviet-union"),
]
DOCTRINES = {20: "20-army-doctrine.md", 21: "21-naval-doctrine.md",
             22: "22-air-doctrine.md"}
REFS = re.compile(r"CAT-(?:DE|FR|GB|US|JP|IT|SU)-(?:SRC|RQ)-[0-9]{4,}")


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def require(condition, message):
    if not condition:
        raise ValueError(message)


def main():
    queue = read(ROOT / "QUEUE.json")
    state = read(ROOT / "RESEARCH_STATE_V3.json")
    schema = read(ROOT / "CATALOG_SCHEMA.json")
    require(len(queue) == 154, "Expected 154 category jobs")
    expected = {(f"CAT-{c}-{n:02d}", folder, n) for c, folder in COUNTRIES
                for n in range(1, 23)}
    actual, paths = set(), set()
    for job in queue:
        jid, folder, num = job["job_id"], job["country_folder"], job["category_number"]
        key = (jid, folder, num)
        require(key in expected and key not in actual, f"Invalid or duplicate category {key}")
        actual.add(key)
        path = job["article_path"]
        require(path not in paths and path.startswith(f"categories/{folder}/{num:02d}-")
                and path.endswith(".md"), f"Invalid path for {jid}: {path}")
        paths.add(path)
        article = REPO / path
        require(article.is_file(), f"Missing article: {path}")
        content = article.read_text(encoding="utf-8")
        if num >= 20:
            require(article.name == DOCTRINES[num] and content.startswith(f"# {num} "),
                    f"Unnumbered doctrine article: {path}")
        else:
            require(jid in content, f"Missing legacy job ID in {path}")
        require(job.get("status") in {"reviewed", "partial", "blocked", "pending", "not_reviewed"},
                f"Unknown legacy status: {jid}")
        if job.get("run_record"):
            run_file = REPO / job["run_record"]
            require(run_file.is_file(), f"Missing historical run: {jid}")
            require(read(run_file).get("job_id") == jid, f"Wrong historical run: {jid}")
    require(actual == expected, "The 154-job registry has missing country-category pairs")
    require(state.get("schema_version") == 3 and
            state.get("registry") == "categories/QUEUE.json" and
            state.get("expected_total") == 154, "Invalid V3 progress state")
    valid_ids = {item[0] for item in actual}
    require(state.get("current_job_id") in valid_ids, "Unknown current job")
    classified = set()
    for field in ("completed_job_ids", "reviewed_with_gaps_job_ids", "blocked_job_ids"):
        entries = state.get(field, [])
        require(len(entries) == len(set(entries)) and set(entries) <= valid_ids,
                f"Bad job IDs in {field}")
        require(not classified.intersection(entries), f"Job classification conflict: {field}")
        classified.update(entries)

    references = {}
    for code, folder in COUNTRIES:
        for kind, filename in (("SRC", "SOURCES.json"), ("RQ", "QUESTIONS.json")):
            for entry in read(ROOT / folder / filename):
                ident = entry["id"]
                require(re.fullmatch(fr"CAT-{code}-{kind}-[0-9]{{4,}}", ident),
                        f"Invalid source/question ID: {ident}")
                require(ident not in references, f"Duplicate source/question ID: {ident}")
                needed = schema["source_required" if kind == "SRC" else "question_required"]
                require(set(needed).issubset(entry), f"Incomplete reference metadata: {ident}")
                references[ident] = entry
    for path in paths:
        missing = set(REFS.findall((REPO / path).read_text(encoding="utf-8"))) - references.keys()
        require(not missing, f"Unregistered citation in {path}: {sorted(missing)}")

    history = read(ROOT / "archive" / "first-pass-STATE.json")
    require(history["total_steps"] == history["CAT_VISITED_COUNT"] == 133,
            "Historical first-pass state was changed")
    print(f"PASS: 154 files (7 x 22), {len(references)} registered references; "
          "133 historic first visits do not count as research completion. Structure only.")


if __name__ == "__main__":
    main()
