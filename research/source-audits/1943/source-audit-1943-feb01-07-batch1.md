# 1943-02-01~07 forward 사료감사 (2026-11-16)

## 재개·중복 검증
기준 HEAD 4c89a865a5046b54895cd0977546393f1ed0544f. WORK_STATE와 PROGRESS_LEDGER 마지막 커서 1943-02-01 일치. 기존 EVT-0169는 2/2 스탈린그라드 항복을 이미 수록해 신규 EVT를 만들지 않고 문헌대조로 보강. 케 작전의 2/1 첫 철수는 별도 사건 행이 없고, SRC-2121/2122 URL도 등록부에 없음. 신규 EVT-3673, SRC-2121/2122.

## 기관 문헌 및 한계
- https://www.history.navy.mil/about-us/leadership/director/directors-corner/h-grams/h-gram-015.html — 미 해군 역사유산사령부 후대 해설. 1943년 2월 첫 주 일본 구축함의 세 차례 철수, 미군이 2/7에 일본군 철수 의도를 인지한 사실. 2/1 첫 철수는 2/4·2/7 및 2/9 섬 확보 선언과 구분. 당대 일본 해군 전투상보와 함정별 탑승 수·손실 미검증.
- https://www.bundesarchiv.de/themen-entdecken/online-entdecken/dokumente-zur-zeitgeschichte/ende-der-schlacht-von-stalingrad/ — 독일 연방문서보관소 후대 기관 해설. 1/31 및 2/2 남부·중부·북부 포위구역 전투 종료를 구분. 포로 수와 부대별 마지막 항복 시각은 당대 소련·독일 기록으로 검증 전.
- 두 출처 모두 기관의 후대 설명이며, 원명령·전투일지 직접 열람은 아님. 피해·포로 숫자 신규 확정 없음. 발표/실제 실행·전투 종료/포로 집계를 혼동하지 않음.

## 색인·백로그
EVT-3673 및 SRC-2121/2122 등록, 기존 EVT-0169 갱신. 새로운 독립 RQ 대신 기존 RQ-0007(누락 지역)·RQ-0003(원전 검증)에 연결, WORK_STATE BACKFILL_QUEUE에 구체화. 중국·버마·튀니지·점령·민간인·경제 분야는 이번 선별 조사에서 전수 확인하지 않았으며 다음 기본 forward 재조사 금지.

## 사전 검사
연표 전체 시작일 오름차순, 출처 상태 허용값, 신규 ID·URL 중복, 정본·미러 바이트 일치, WORK_STATE·ledger 커서 및 증분을 검사. 로컬 저장소 전체 스냅샷 부재로 python validate_index.py는 실행하지 못함. CI는 게시 후 정확한 SHA 기준 확인.
