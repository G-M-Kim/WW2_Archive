# 1943-03-01~07 forward 사료감사 (2026-11-16)

## 재개 및 중복 확인
기준 원격 HEAD `637070c4bdd528d8d4c1d3c66c4958f8bc9799e5`; WORK_STATE와 ledger 마지막 커서 1943-03-01 일치. 이전 SHA Actions 성공. 1943-03-02 비스마르크해 해전은 기존 EVT-0172로 확인되어 중복 신규 EVT를 만들지 않고 사료상태·참조만 보강. 르제프 철수는 독립 사건으로 EVT-3681 등록. 신규 출처 URL 및 ID 중복 점검, 신규 RQ는 기존 RQ-0003/0007 범위에 포함되어 미생성.

## 확인한 자료 및 해석
- https://www.airforce.gov.au/about-us/history/our-journey/battle-bismarck-sea — 호주 공군 공식 역사해설: 1943-03-02~04 전투, 3/3 집중공격. 3/1 정찰·3/2 공격·3/3 집중공격·3/4 결과를 분리. SRC-2132. 일본군 선단 원기록과 전투별 격침 주장 미대조.
- https://www.awm.gov.au/articles/blog/battle-of-bismarck-sea — 호주 전쟁기념관: 3/1 정찰, 3/2 공습, 3/3 집중 공격 및 3/4 격침 결과 교차. SRC-2132와 별도 신규 SRC 미생성(같은 공공기관 계열 후대 설명). 생존자 공격과 피해 수치의 법적·자료적 검증은 별도.
- https://www.armyupress.army.mil/Portals/7/Research%20and%20Books/2023/ArmiesRetrt-HeckMills-2023.pdf — 미 육군 대학 출판 학술서 11장(Jeff Rutherford): 1943년 3월 르제프 철수와 3/13 제7보병사단 철수 완료, 독일군 기록 인용. 3/1 철수 개시일은 추가 원명령 대조 필요. SRC-2133. 민간인 강제이주·파괴 및 피해 규모는 본문에서 확정하지 않음.

## 범위·검증 한계
중국·버마·대서양·점령·경제·민간인 사건은 이번 7일 선별조사에서 전수검증하지 못함. 기존 RQ-0003/0007 및 WORK_STATE BACKFILL_QUEUE로 추적. 0 신규 RQ는 포괄 과제 중복 방지에 따른 것임.

## 사전 구조검사
기존 EVT-0172 날짜 보존, 신규 EVT-3681은 3/2보다 앞선 3/1에 삽입. 허용 출처상태 `문헌대조` 사용, SRC 링크·ID 중복 검사, 정본/미러 동일 콘텐츠 준비, ledger 증분 1/2/0과 커서 1943-03-08 일치. 로컬 Git DNS 실패로 전체 저장소를 내려받지 못하여 `python validate_index.py` 미실행. 게시 SHA CI로 별도 검증 필요.
