"""Stage the seven-power research articles for the Zensical site build."""

import json
import posixpath
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
REPO_URL = "https://github.com/G-M-Kim/WW2_Archive/blob/main"
DOCTRINES = {
    "army-doctrine.md": "육군 교리",
    "naval-doctrine.md": "해군 교리",
    "air-doctrine.md": "공군 교리",
}
STATUS_LABELS = {"reviewed": "첫 조사 검토", "partial": "부분 조사", "blocked": "자료 확인 제한"}
LOCAL_LINK = re.compile(r"\]\(((?:[\w.-]+/)*[\w.-]+\.(?:md|json))(#[^\s)]+)?\)")
# Preserve the source fragment across GitHub and Zensical's different heading slugs.
HEADING_IDS = {"categories/united-states/13-historical-place-names.md": {"진주만과 포드섬": "진주만과-포드섬"}}
HEADING = re.compile(r"^# .+$", re.MULTILINE)


def derive_page(source, destination, pages, banner):
    markdown = (ROOT / source).read_text(encoding="utf-8")

    def replace_link(match):
        target, fragment = match.group(1), match.group(2) or ""
        path = posixpath.normpath(posixpath.join(source.parent.as_posix(), target))
        if path in pages:
            href = posixpath.relpath(pages[path], destination.parent)
        elif (ROOT / path).is_file():
            href = f"{REPO_URL}/{path}"
        else:
            raise ValueError(f"{source}: missing local link target {target}")
        return f"]({href}{fragment})"

    rendered = LOCAL_LINK.sub(replace_link, markdown)
    for heading, anchor in HEADING_IDS.get(source.as_posix(), {}).items():
        rendered = rendered.replace(f"\n## {heading}\n", f"\n## {heading} {{ #{anchor} }}\n")
    if banner:
        heading = HEADING.search(rendered)
        if not heading:
            raise ValueError(f"{source}: missing article heading")
        end = heading.end()
        rendered = rendered[:end] + f"\n\n> {banner}" + rendered[end:]
    return rendered


def main():
    queue = json.loads((ROOT / "categories/QUEUE.json").read_text(encoding="utf-8"))
    countries = defaultdict(list)
    pages = {"categories/INFRASTRUCTURE_RATING.md": Path("categories/facility-rating.md")}
    banners = {}
    for job in queue:
        status = job["status"]
        if status == "pending":
            continue
        source = Path(job["article_path"])
        pages[source.as_posix()] = source
        countries[job["country_folder"]].append(job)
        banners[source.as_posix()] = (
            f"**{STATUS_LABELS[status]}** · 첫 조사에서 확인한 사례와 후속 검증 과제를 담았습니다."
        )

    output = {}
    country_rows = []
    doctrine_count = 0
    for folder, jobs in countries.items():
        path = Path("categories") / folder
        label = jobs[0]["country"]
        pages[(path / "README.md").as_posix()] = path / "index.md"
        country_rows.append(f"| [{label}]({folder}/index.md) | {len(jobs)} |")
        index = [
            f"# {label} 카테고리 조사",
            "",
            "| 번호 | 항목 | 조사 상태 |",
            "| --- | --- | --- |",
        ]
        for job in jobs:
            name = Path(job["article_path"]).name
            status = STATUS_LABELS[job["status"]]
            index.append(f"| {job['category_number']} | [{job['category']}]({name}) | {status} |")

        doctrines = [name for name in DOCTRINES if (ROOT / path / name).is_file()]
        if doctrines:
            index.extend(["", "## 보충 조사", ""])
        for name in doctrines:
            article = path / name
            pages[article.as_posix()] = article
            index.append(f"- [{DOCTRINES[name]}]({name})")
        doctrine_count += len(doctrines)
        index.extend([
            "",
            f"[출처 장부]({REPO_URL}/{path}/SOURCES.json) · "
            f"[후속 검증 과제]({REPO_URL}/{path}/QUESTIONS.json)",
        ])
        output[path / "index.md"] = "\n".join(index) + "\n"

    descriptions = [
        "# 7개국 카테고리 조사",
        "",
        "장비, 인물, 산업, 인구, 영토와 주요 시설을 국가별로 찾아볼 수 있습니다.",
        "원고는 첫 조사에서 확인한 범위를 담고 있으며, 남은 확인 과제는 각 문서에 표시했습니다.",
        "",
        "| 국가 | 카테고리 원고 |",
        "| --- | --- |",
        *country_rows,
        "",
        f"카테고리 원고 **{sum(map(len, countries.values()))}개**와 보충 교리 문서 **{doctrine_count}개**를 수록했습니다.",
        "",
        "[시설 규모 평가 기준](facility-rating.md)",
    ]
    output[Path("categories/index.md")] = "\n".join(descriptions) + "\n"

    for source, destination in pages.items():
        if destination not in output:
            output[destination] = derive_page(Path(source), destination, pages, banners.get(source))

    for destination, markdown in output.items():
        target = DOCS / destination
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(markdown, encoding="utf-8")
    print(f"Staged {len(output)} Markdown pages under docs/categories.")


if __name__ == "__main__":
    main()
