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
SOURCE_RE = re.compile(r"^SRC-\d{3,}$")
LINK_RE = re.compile(r"\[(SRC-\d{3,})\]\(chronology-sources-v1\.md\)")
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
        if re.match(r"^\| SRC-\d{3,} \|", line):
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

    # Root tables are canonical; research/ copies must not diverge silently.
    # The 2026-11-07 audit found different recent IDs in each location.
    mirror_files = (
        "chronology-1939-1941.md",
        "chronology-sources-v1.md",
        "research-backlog.md",
    )
    for name in mirror_files:
        canonical = ROOT / name
        mirror = ROOT / "research" / name
        if not mirror.is_file():
            errors.append(f"missing research mirror: research/{name}")
        elif canonical.read_bytes() != mirror.read_bytes():
            errors.append(f"research/{name} differs from canonical root file")

    # Continuous-research guard: a selective period is completed on first pass,
    # while missing events and source verification stay in BACKFILL_QUEUE/RQ.
    # This checks workflow integrity, NOT historical correctness.
    ledger = ROOT / "research" / "PROGRESS_LEDGER.md"
    work_state = ROOT / "WORK_STATE.md"
    if not ledger.is_file():
        errors.append("missing research/PROGRESS_LEDGER.md")
    elif not work_state.is_file():
        errors.append("missing authoritative WORK_STATE.md")
    else:
        text = ledger.read_text(encoding="utf-8")
        rows = []
        for n, line in enumerate(text.splitlines(), 1):
            if not re.match(r"^\| \d{4}-\d{2}-\d{2} \|", line):
                continue
            c = parse_row(line)
            if len(c) != 9:
                errors.append(f"PROGRESS_LEDGER.md:{n}: expected 9 cells")
                continue
            recorded, mode, period, before, after, delta, totals, audit, note = c
            rows.append((n, recorded, mode, period, before, after, delta, totals, audit, note))
        if not rows:
            errors.append("no progress-ledger entries")
        else:
            previous = None
            for n, recorded, mode, period, before, after, delta, totals, audit, note in rows:
                for name, value in (("recorded", recorded), ("before", before), ("after", after)):
                    try:
                        date.fromisoformat(value)
                    except ValueError:
                        errors.append(f"PROGRESS_LEDGER.md:{n}: bad {name} date {value}")
                if mode not in {"forward", "backfill", "recovery"}:
                    errors.append(f"PROGRESS_LEDGER.md:{n}: bad mode {mode}")
                match = re.fullmatch(r"(\d{4}-\d{2}-\d{2})\.\.(\d{4}-\d{2}-\d{2})", period)
                if not match:
                    errors.append(f"PROGRESS_LEDGER.md:{n}: bad date range {period}")
                elif match.group(1) > match.group(2):
                    errors.append(f"PROGRESS_LEDGER.md:{n}: reversed date range")
                if previous and before != previous:
                    errors.append(f"PROGRESS_LEDGER.md:{n}: cursor before {before} != prior after {previous}")
                if mode in {"forward", "recovery"}:
                    if not before < after:
                        errors.append(f"PROGRESS_LEDGER.md:{n}: forward cursor did not advance")
                    if match and match.group(1) != before:
                        errors.append(f"PROGRESS_LEDGER.md:{n}: forward period must start at cursor")
                    if match:
                        try:
                            from datetime import timedelta
                            next_date = (date.fromisoformat(match.group(2)) + timedelta(days=1)).isoformat()
                            if after != next_date:
                                errors.append(f"PROGRESS_LEDGER.md:{n}: after cursor must equal period end + 1")
                        except ValueError:
                            pass
                elif mode == "backfill" and before != after:
                    errors.append(f"PROGRESS_LEDGER.md:{n}: backfill must not move forward cursor")
                if not re.fullmatch(r"\d+/\d+/\d+", delta):
                    errors.append(f"PROGRESS_LEDGER.md:{n}: bad new-EVT/SRC/RQ triple")
                if not re.fullmatch(r"\d+/\d+/\d+", totals):
                    errors.append(f"PROGRESS_LEDGER.md:{n}: bad total triple")
                if not audit.endswith(".md") or not (ROOT / audit).is_file():
                    errors.append(f"PROGRESS_LEDGER.md:{n}: audit file not found {audit}")
                previous = after

            # Recent-run integrity: 'audit only' work must not silently form a
            # permanent all-zero forward loop. Historic rows are immutable;
            # constrain the latest run and its immediate predecessor only.
            if len(rows) >= 2:
                older, latest = rows[-2], rows[-1]
                try:
                    prior_totals = tuple(map(int, older[7].split("/")))
                    last_delta = tuple(map(int, latest[6].split("/")))
                    last_totals = tuple(map(int, latest[7].split("/")))
                    if len(prior_totals) == len(last_delta) == len(last_totals) == 3:
                        expected_totals = tuple(a + b for a, b in zip(prior_totals, last_delta))
                        if last_totals != expected_totals:
                            errors.append(
                                "PROGRESS_LEDGER.md: latest declared delta does not match "
                                f"previous totals ({prior_totals} + {last_delta} != {last_totals})"
                            )
                except ValueError:
                    pass  # Existing format checks already report malformed totals.
                if all(row[2] == "forward" and row[6] == "0/0/0" for row in (older, latest)):
                    errors.append(
                        "PROGRESS_LEDGER.md: two consecutive forward batches with "
                        "zero EVT/SRC/RQ; repair missing canonical indexing or "
                        "document a blocked/recovery workflow before continuing"
                    )

            state_text = work_state.read_text(encoding="utf-8")
            cursor_match = re.search(r"(?m)^FORWARD_CURSOR:\s*(\d{4}-\d{2}-\d{2})\s*$", state_text)
            if not cursor_match:
                errors.append("WORK_STATE.md: missing single authoritative FORWARD_CURSOR line")
            elif cursor_match.group(1) != rows[-1][5]:
                errors.append(f"WORK_STATE.md: cursor differs from ledger latest {rows[-1][5]}")
            if len(re.findall(r"(?m)^FORWARD_CURSOR:", state_text)) != 1:
                errors.append("WORK_STATE.md: duplicate active FORWARD_CURSOR lines")
            ledger_total = rows[-1][7]
            if ledger_total != f"{len(event_ids)}/{len(source_ids)}/{len(backlog_ids)}":
                errors.append(f"PROGRESS_LEDGER.md: totals mismatch: {ledger_total} vs actual {len(event_ids)}/{len(source_ids)}/{len(backlog_ids)}")
            if any(rows[i][2] == "backfill" and rows[i-1][2] == "backfill" for i in range(1, len(rows))):
                errors.append("PROGRESS_LEDGER.md: consecutive backfill runs prohibited; return to forward research first")

    print(f"Checked {len(event_ids)} event records in {len(event_files)} files")
    print(f"Statuses: {dict(stats)}, source IDs: {len(source_ids)}, backlog tasks: {len(backlog_ids)}")
    if errors:
        for issue in errors:
            print("ERROR:", issue)
        return 1
    print("PASS: structure, references, dates, IDs and research mirrors (NOT independent historical verification)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
