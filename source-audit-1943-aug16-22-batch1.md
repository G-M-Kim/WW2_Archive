# 1943-08-16~22 forward 사료감사 (2026-11-17)

## 공개 사료 대조
- 미 공군 국립박물관: https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/1519655/regensburgschweinfurt-august-17-1943/ — 8월 17일 레겐스부르크/슈바인푸르트 두 공습, 기상 지연과 독일 전투기 재출격, 출격 B-17 376대 및 손실 60대. 공식 역사해설(당대 1차 원본은 아님).
- National WWII Museum: https://www.nationalww2museum.org/war/articles/schweinfurt-regensburg-raid-august-17-1943 — 편대별 목표·선발편대 북아프리카 전환·공업시설 피해와 재건. 2차 연구해설.

## 기존 정본과 중복 검사
- 1943 연표에 이미 `EVT-0185`로 8/17 공습이 등록되어 있어 신규 EVT 생성 금지; 기존 행의 사료 상태와 출처 연결을 보강.
- 위 두 URL은 SRC 등록부 기존 항목에서 중복 발견되지 않아 SRC-2176/2177 등록. 출격 376대와 손실 60대는 공식 박물관 서술의 서로 다른 분모/분자이며, 폭격 성공·생산 타격 지속기간은 단정하지 않음.
- 기존 RQ-1260은 퀘벡 회담의 승인시점으로 공습 피해/생산통계 검증을 포괄하지 않으므로 RQ-1261 신규.
- 8/16, 8/18~22의 전세계 군사·외교·경제·점령·중국·태평양·민간인 사건은 이번 배치에서 원자료 교차검증하지 못함. RQ-0003/0007 BACKFILL_QUEUE 및 RQ-1261에 추적하며 전수 완료 주장 금지.

## 검증·집계
- EVT 신규 0(기존 EVT-0185 보강), SRC 신규 2, RQ 신규 1. 누적 3707/2177/1261. 1943 연표 날짜순 정렬 유지, 정본·research 미러 바이트 동일. 전체 로컬 `validate_index.py`는 미실행(원격 CI 확인 예정).
