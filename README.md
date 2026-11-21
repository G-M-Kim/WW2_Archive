# WW2 Archive

제2차 세계대전의 전사, 전쟁기, 전후를 사료와 함께 정리하는 백과사전입니다.

[공개 위키](https://g-m-kim.github.io/WW2_Archive/) · [인터랙티브 타임라인](https://g-m-kim.github.io/WW2_Archive/timeline/) · [7개국 카테고리](https://g-m-kim.github.io/WW2_Archive/categories/)

| 자료 | 원고와 기록 |
| --- | --- |
| 월별 사건 연표 | [1936년 1월~1945년 12월](chronology/README.md) · [기간 밖 사건](chronology/outside-1936-01_1945-12.md) |
| 사료와 미확인 쟁점 | [연표 출처 등록부](chronology-sources-v1.md) · [검증 과제](research-backlog.md) |
| 7개국 문서 | [01~22번 카테고리 비교](categories/INDEX.md) · [국가별 원고와 조사 범위](categories/README.md) |
| 작업 이력 | [기존 연표 작업 상태](WORK_STATE.md) · [진행 원장](research/PROGRESS_LEDGER.md) · [이전 README와 조사 이력 링크](https://github.com/G-M-Kim/WW2_Archive/blob/b3e0850314c69b7f8708068bce69d6dc9724f9a9/README.md) |

연표에서 `문헌대조`는 사건별 원고에 기록된 범위의 확인 상태입니다. `링크등록`과 `미등록`도 원고의 표시를 그대로 따릅니다. 주별 통계는 위키 수록량을 보여줍니다.

## 위키 빌드

`main`이 갱신되면 GitHub Pages 빌드에서 월별 연표, 국가별 문서와 주간 타임라인을 다시 만듭니다. 위키의 연표와 타임라인은 같은 월별 사건 원고를 사용합니다. 출처는 출처 등록부에서 읽습니다. 검증한 기록 이미지와 이용 조건은 [사진 목록](scripts/timeline_media.json)에 연결합니다.

```sh
python -m pip install -r requirements.txt
python scripts/build_category_pages.py
zensical build --clean
```
