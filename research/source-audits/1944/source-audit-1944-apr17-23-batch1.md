# 1944-04-17~23 forward 사료감사 (2026-11-21)

- **미게시 배치 복구**: 이전 후보 파일 pending_1944-04-17_23.md에서 기록한 사실만 검증·색인 재시도. 조사 범위 1944-04-17..1944-04-23. HEAD 8bd753dfbd6e1ccfba66d94e552c20cd827e8948에서 시작. 기존 EVT-0210을 신규 EVT로 중복 생성하지 않음.
- **확인·한계**: 미 육군 Center of Military History, *China Defensive*, https://history.army.mil/portals/143/Images/Publications/catalog/72-38.pdf (SRC-2249)는 웹 검색 발췌에서 이치고 작전 개시를 1944-04-19로 명기. PDF 원문은 웹에서 403으로 직접 페이지 전수 검증 불가. 이 근거는 공식 2차 문헌의 특정 문장에 한정; 당대 1차 사료 아님. 기존 EVT-0210의 1944-04-17 날짜와 차이가 있으므로 날짜 자체를 4/19로 변경하지 않고 행의 이견 및 출처 상태 '링크등록'으로 보강.
- **제3의 날짜 단서**: 미 육군 지휘참모대학 CGSC 연표 https://cgsc.contentdm.oclc.org/digital/api/collection/p4013coll8/id/2408/download 의 웹 검색 발췌는 4월 18일 첫 단계 개시로 기재. 이 문서 역시 PDF 전체를 직접 열람하지 못했으므로 별도 SRC 부여 보류; RQ-1294에서 일본·중국 당대 원문과 함께 검증.
- **중복 검사**: 기존 EVT-0210을 재활용. SRC 등록부에 CMH PDF URL 미등록, RQ-1294 미사용 확인. 추가 EVT 0, SRC-2249 한 건, RQ-1294 한 건. 누적 EVT/SRC/RQ 3746/2249/1294.
- **BACKFILL_QUEUE**: RQ-1294 (이치고 작전 4/17, 4/18, 4/19의 작전 단계·현장 시각·원본), 기존 RQ-0003/RQ-0007 (같은 기간 버마·태평양·유럽·아프리카·경제·점령·민간인), CGSC 연표 원문 열람. 전세계 전수확인 완료 아님.
- **검증**: 현재 HEAD Actions 성공 사전 확인. 수정 1944 연표 전체 날짜 정렬·출처 상태·정본/research 미러·ID 개수 정합성을 게시 전 점검. 로컬 전체 python validate_index.py는 Git DNS로 저장소 전체 스냅샷을 받지 못해 미실행. 게시된 SHA의 CI를 별도로 조회.
