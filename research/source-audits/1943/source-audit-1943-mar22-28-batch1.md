# 1943-03-22~28 forward 사료감사 (2026-11-16)

## 재개 및 중복 검사
기준 PR HEAD df093a82e4c6008fcc6d34d4a2c9cfab3afe6ac0; WORK_STATE 및 ledger 커서 1943-03-22 일치. 기존 연표 1943-03-20 마레스 공세 EVT-3684와 3/23 엘게타르 독일 반격은 별도 사건. 기존 1943년 연표에 3/26 코만도르스키 교전 없음. 신규 EVT-3685~3686, SRC-2138~2140, RQ-1247 기존 ID/URL 중복 확인 후 등록. 직전 SHA GitHub Actions pull_request 검증 성공(43817058559).

## 확인된 사료 및 한계
- https://www.nationalww2museum.org/war/articles/us-ii-corps-el-guettar — 미국 국립 2차대전박물관의 공식 전사 인용 연구. 3/22 공격 명령, 3/23 독일 제10기갑사단 반격·미군 방어를 구분. SRC-2138.
- https://www.abmc.gov/news-events/news/north-africa-campaign-remembering-fight-el-guettar/ — 미국 전쟁기념위원회 기관 해설. 3/23 공격 시작과 지뢰·포병 방어. 시작시각 03:00은 기관 서술로만 남기며 당대 작전일지 미확인. SRC-2139.
- https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/a/the-aleutians-campaign.html — 미 해군 공식 전투서술 9장, 코만도르스키 해전 3/26. 3/27 현지 날짜와 시각대 충돌은 RQ-1247, 미·일 항해일지 원문 미대조. SRC-2140.

## 범위와 후속
3/22~28 튀니지 지상전과 알류샨 해전 선별 조사이며 전세계 전수완료 아님. 마레스선 3/26~28 후속 철수·슈퍼차지 II 작전의 영국군 원작전일지, 중국·동부전선·버마·점령지 학살·경제·민간인 미검증은 기존 RQ-0003/RQ-0007과 BACKFILL_QUEUE로 추적. 손실 숫자·전과·일본측 날짜는 독립 확인 전 단정하지 않음. 같은 기간 기본 forward 재조사 금지.

## 사전 구조 검사
연표 1943년 표 전체 시작일 오름차순, 출처 상태 허용값, SRC 링크 및 정본·research 미러 동일 내용, 새 ID 실제 2/3/1, 누적 3686/2140/1247, ledger cursor_after=WORK_STATE FORWARD_CURSOR=1943-03-29. 로컬 전체 validate_index.py는 별도 실행 확인 필요. 게시 후 해당 SHA CI 확인 필요.
