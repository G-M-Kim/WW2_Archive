# WW2 Archive

제2차 세계대전의 전사, 전쟁기, 전후를 사료와 함께 정리하는 백과사전입니다.

[공개 위키](https://g-m-kim.github.io/WW2_Archive/) · [인터랙티브 타임라인](https://g-m-kim.github.io/WW2_Archive/timeline/) · [7개국 카테고리](https://g-m-kim.github.io/WW2_Archive/categories/)

| 자료 | 원고와 기록 |
| --- | --- |
| 연도별 사건 색인 | [1905–1938](chronology-1905-1938.md) · [1939–1941](chronology-1939-1941.md) · [1942–1943](chronology-1942-1943.md) · [1944–1947](chronology-1944-1947.md) |
| 사료와 미확인 쟁점 | [연표 출처 등록부](chronology-sources-v1.md) · [검증 과제](research-backlog.md) |
| 7개국 문서 | [국가별 원고와 조사 범위](categories/README.md) |
| 작업 이력 | [기존 연표 작업 상태](WORK_STATE.md) · [진행 원장](research/PROGRESS_LEDGER.md) · [이전 README와 조사 이력 링크](https://github.com/G-M-Kim/WW2_Archive/blob/b3e0850314c69b7f8708068bce69d6dc9724f9a9/README.md) |

연표에서 `문헌대조`는 사건별 원고에 기록된 범위의 확인 상태입니다. `링크등록`과 `미등록`도 원고의 표시를 그대로 따릅니다. 주별 통계는 위키 수록량을 보여줍니다.

## 위키 빌드

`main`이 갱신되면 GitHub Pages 빌드에서 국가별 문서와 주간 타임라인 데이터를 다시 만듭니다. 타임라인의 주간·일간 집계는 위 표의 연도별 사건 색인과 출처 등록부에서 생성합니다. 검증한 기록 이미지와 이용 조건은 [사진 목록](scripts/timeline_media.json)에 연결합니다.

```sh
python -m pip install -r requirements.txt
python scripts/build_category_pages.py
zensical build --clean
```
