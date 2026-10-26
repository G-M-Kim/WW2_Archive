#!/usr/bin/env python3
"""Check WW2 Archive's Markdown chronology structure (NOT historical truth)."""
from __future__ import annotations

from collections import Counter
from datetime import date
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent
SOURCES = ROOT / "chronology-sources-v1.md"
DATE_RE = re.compile(r"^\d{4}(?:-\d{2}(?:-\d{2})?)?$")
EVENT_RE = re.compile(r"^EVT-\d{4}$")
SOURCE_RE = re.compile(r"^SRC-\d{3}$")
LINK_RE = re.compile(r"\[(SRC-\d{3})\]\(chronology-sources-v1\.md\)")
STATUSES = {"문헌대조", "링크등록", "미등록"}


def parse_row(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def normalized(d: str) -> str:
    return (d + "-01-01")[:10] if len(d) == 4 else d + "-01" if len(d) == 7 else d


def main() -> int:
    errors: list[str] = []
    event_ids: list[str] = []
    source_ids: list[str] = []

    if not SOURCES.is_file():
        print(f"ERROR: missing {SOURCES}")
        return 1

    for n, line in enumerate(SOURCES.read_text(encoding="utf-8").splitlines(), 1):
        if re.match(r"^\| SRC-\d{3} \|", line):
            cells = parse_row(line)
            if len(cells) != 6 or not SOURCE_RE.fullmatch(cells[0]):
                errors.append(f"{SOURCES.name}:{n}: bad source table row")
            else:
                source_ids.append(cells[0])
                if not any(link.startswith("https://") for link in cells[4].split()):
                    errors.append(f"{SOURCES.name}:{n}: missing https URL")

    if len(set(source_ids)) != len(source_ids):
        errors.append(f"duplicate source IDs: {dict((k,v) for k,v in Counter(source_ids).items() if v>1)}")

    event_files = sorted(ROOT.glob("chronology-[0-9]*.md"))
    if not event_files:
        errors.append("no chronology files found")

    stats = Counter()
    for file in event_files:
        current_year: str | None = None
        prev_date: str | None = None
        seen_table_header = False
        for n, line in enumerate(file.read_text(encoding="utf-8").splitlines(), 1):
            year_match = re.fullmatch(r"## (\d{4})년", line.strip())
            if year_match:
                current_year = year_match.group(1)
                prev_date = None
                seen_table_header = False
            if line.startswith("| ID |"):
                seen_table_header = True
            if not re.match(r"^\| EVT-\d{4} \|", line):
                continue
            cells = parse_row(line)
            if len(cells) != 7:
                errors.append(f"{file.name}:{n}: expected 7 columns, got {len(cells)}")
                continue
            event_id, when, title, event_type, state, evidence, sources = cells
            event_ids.append(event_id)
            stats[evidence] += 1
            if not seen_table_header:
                errors.append(f"{file.name}:{n}: event row before table header")
            if not EVENT_RE.fullmatch(event_id):
                errors.append(f"{file.name}:{n}: invalid ID {event_id}")
            if evidence not in STATUSES:
                errors.append(f"{file.name}:{n}: invalid evidence status {evidence}")
            if not title or not event_type or not state:
                errors.append(f"{file.name}:{n}: missing required content")
            if not DATE_RE.fullmatch(when):
                errors.append(f"{file.name}:{n}: invalid date format {when}")
                continue
            try:
                date.fromisoformat(normalized(when))
            except ValueError:
                errors.append(f"{file.name}:{n}: impossible calendar date {when}")
            if current_year != when[:4]:
                errors.append(f"{file.name}:{n}: year heading mismatch {when}")
            if prev_date is not None and normalized(when) < prev_date:
                errors.append(f"{file.name}:{n}: out of order {when}")
            prev_date = normalized(when)
            refs = LINK_RE.findall(sources)
            if evidence == "미등록" and refs:
                errors.append(f"{file.name}:{n}: unregistered record has references")
            if evidence in {"문헌대조", "링크등록"} and not refs:
                errors.append(f"{file.name}:{n}: status requires a source reference")
            if sources != "—" and not refs:
                errors.append(f"{file.name}:{n}: source text without valid source link")
            for ref in refs:
                if ref not in source_ids:
                    errors.append(f"{file.name}:{n}: missing source ID {ref}")

    duplicates = {k: v for k, v in Counter(event_ids).items() if v > 1}
    if duplicates:
        errors.append(f"duplicate event IDs: {duplicates}")

    # Persistent research backlog is required for every future chronology change.
    backlog = ROOT / "research-backlog.md"
    if not backlog.is_file():
        errors.append("persistent research-backlog.md is missing")
        backlog_ids: list[str] = []
    else:
        backlog_ids = []
        allowed_task_states = {"open", "in_progress", "blocked", "done"}
        for n, line in enumerate(backlog.read_text(encoding="utf-8").splitlines(), 1):
            if not re.match(r"^\| RQ-\d{4} \|", line):
                continue
            cells = parse_row(line)
            if len(cells) != 7:
                errors.append(f"{backlog.name}:{n}: expected 7 columns; got {len(cells)}")
                continue
            task_id, priority, state, area, description, linked, finish_rule = cells
            backlog_ids.append(task_id)
            if not re.fullmatch(r"RQ-\d{4}", task_id):
                errors.append(f"{backlog.name}:{n}: invalid task ID {task_id}")
            if priority not in {"P0", "P1", "P2"} or state not in allowed_task_states:
                errors.append(f"{backlog.name}:{n}: invalid priority/status {priority}/{state}")
            if not all((area, description, linked, finish_rule)):
                errors.append(f"{backlog.name}:{n}: incomplete backlog task")
            if state == "done" and not any(
                evidence in line for evidence in (".md", "https://github.com/")
            ):
                errors.append(f"{backlog.name}:{n}: completed task needs evidence URL/file")
        if len(set(backlog_ids)) != len(backlog_ids):
            errors.append("duplicate research backlog task IDs")
        if not backlog_ids:
            errors.append("research backlog contains no tasks")

    print(f"Checked {len(event_ids)} event records in {len(event_files)} files")
    print(f"Statuses: {dict(stats)}, source IDs: {len(source_ids)}, backlog tasks: {len(backlog_ids)}")
    if errors:
        for issue in errors:
            print("ERROR:", issue)
        return 1
    print("PASS: structure, references, dates and IDs (NOT independent historical verification)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
