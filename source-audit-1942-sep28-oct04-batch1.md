# 1942-09-28~10-04 사료감사 — 미게시 후보 복구

- 모드: forward recovery. 이전 실행에서 미게시한 `/mnt/data/ww2_unpublished_1942_sep28_oct04.md` 후보를 재검색 성과로 중복 계상하지 않고 정본 등록. 기준 HEAD `7f5b6153e7912795d6fc81e97f681028c1c6638f`, 커서 1942-09-28.
- 1942-10-02: 영국 경순양함 HMS Curacoa가 RMS Queen Mary와 충돌·침몰. 호주 해군사학회 https://navyhistory.au/ss-queen-mary-the-loss-of-hms-curacoa-1942/ 후대 서술을 SRC-2093으로 등록, EVT-3651 색인. 법정 판결문 재게시 https://www.commsmuseum.co.uk/publications/rmsqueenmary.pdf 는 원판결문 진본·시점 추가 검증 필요. 331/337/338명 집계 충돌은 RQ-1241에 보류, 확정 숫자를 사건에 넣지 않음.
- 1942-10-03: 스미스소니언 국립항공우주박물관 https://airandspace.si.edu/collection-objects/missile-surface-surface-v-2-4/nasm_A19600342000 에서 페네뮌데 A-4 시험발사 확인, EVT-3652/SRC-2094. 페네뮌데 역사기술박물관 https://museum-peenemuende.de/wp-content/uploads/2018/05/Museum-Peenem%C3%BCnde-2018-engl.pdf 에서 1942년 10월 성공 시험을 별도 기술. 정확한 시험 성능은 당대 독일 기록 미대조로 수치 생략. 실전 V-2 공격과 분리.
- 9/28~10/1 및 10/4와 동부전선·중국·태평양·아프리카·점령·학살·경제: 이번 후보 복구에서 별도 1차 원문 확보하지 못해 사건 추가 없음. 기존 RQ-0007/RQ-0003와 WORK_STATE BACKFILL_QUEUE로 추적; 세계 전수 조사 완료 아님.
- 중복검사: 기존 연표에 1942-10-02 Curacoa, 1942-10-03 A-4 사건 부재, SRC URL 기존 등록 부재, EVT-3651/3652·SRC-2093/2094·RQ-1241 기존 ID 부재 확인. 신규 2/2/1, 누적 3652/2094/1241. 정본·research 미러 동일 내용으로 준비. 로컬 전체 validate_index.py 미실행; 원격 CI 결과 별도 확인.
