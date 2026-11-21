# 사료감사 — 1943-06-21~27 (forward, 2026-11-17)

## 정본·중복 확인
- 시작 HEAD `ef3573b9fd88d579355de09eb2b634bd159df648`, tree `c5915f68457a7e4607c5ed4ca661bdbe8d9a4f69`. WORK_STATE와 ledger 마지막 커서 1943-06-21 일치. 누적 3699/2163/1254.
- 기존 EVT-3699는 6월 20일 벨아일 최초 충돌, 신규 EVT-3700은 6월 21일 도심 확산 및 대통령의 연방군 투입 지시로 시간·행위가 구분된다. SRC-2162/2163 기존 등록 확인, 신규 SRC 중복 생성하지 않음. 기존 RQ-1254가 원명령·피해 집계 미확인을 포괄하므로 신규 RQ 중복 생성하지 않음.

## 출처·날짜 검토
- [Detroit Historical Society](https://www.detroithistorical.org/learn/online-research/encyclopedia-of-detroit/race-riot-1943): 6월 20일 벨아일 발단, 21일 도심 폭동 및 군 투입. 후대 시립 역사기관 해설로 1차 명령서 자체는 아님. 기존 SRC-2162.
- [National Park Service](https://www.nps.gov/articles/000/-h-our-history-lesson-the-detroit-race-riot-of-1943.htm): 20일 공원 충돌과 21일 새벽 도심 확산을 구분. 기존 SRC-2163. 두 기관 해설은 1차 사료 독립 검증 2건으로 세지 않음.
- [FDR 대통령도서관 교육자료의 1943-06-21 대통령 명령 설명](https://www.fdrlibrary.org/documents/356632/390886/5.3%2BRoosevelt%2Band%2BRace%2BFINAL%2B5-20-14.pdf/a805ca12-70af-48e8-8147-ce755854ed0e): 6월 21일 연방군 지시 맥락. 교육자료가 소개한 당대 문건과 원문 직접 열람을 구분하고 별도 SRC는 미등록. 정확한 명령·부대도착 시각은 RQ-1254 후속.
- 6월 22~27일 다른 전역·민간인·외교 사건은 이번 실행에서 독립 사료 교차 확인이 부족하여 새 EVT/SRC/RQ를 만들지 않음. 해당 날짜 전수완료가 아니며 기존 RQ-0003/0007로 backfill.

## 검증
- 1942~43 연표 날짜 오름차순·출처 상태 `문헌대조` 확인, 루트·research 연표 바이트 일치, 기존 SRC 링크와 신규 ID·원장 증분 대조. 신규 EVT 1, SRC 0, RQ 0. 로컬 git DNS 실패로 전체 `python validate_index.py` 미실행; 게시 SHA CI 확인 필요.
