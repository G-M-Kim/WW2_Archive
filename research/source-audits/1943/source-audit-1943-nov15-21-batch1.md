# 1943-11-15~21 forward 사료감사 (2026-11-18)

## 기준과 중복
- 시작 HEAD ac77c9cd2e24fa89b79244baed29864388ef795a, tree e7169ed427645d6dc630dedd321afd07094e048b; WORK_STATE·ledger 마지막 cursor_after=1943-11-15, 기존 총수 EVT/SRC/RQ 3722/2205/1271.
- EVT-0195(타라와 11/20)가 이미 존재하므로 새 EVT를 만들지 않고 해당 행을 보강. 레로스 11/16 기존 동일 사건 및 EVT-3723 미등록 확인. SRC-2206/2207 URL 기존 정본 미등록, RQ-1272 미사용 확인.

## 사료 확인
1. [영국 공군 Air Historical Branch의 당대 전역 서술](https://www.raf.mod.uk/what-we-do/our-history/air-historical-branch/second-world-war-campaign-narratives/raf-in-maritime-war-vol-vii-part-i-mediterranean-reconquest-and-the-submarine-war-may-1943-may-1944/): 1943-11-16 레로스 항복, 11/18 사모스·11/19 세리포스·11/20 미코노스 연합군 철수 기재. 레로스 항복을 EVT-3723/SRC-2206로 색인. 당대 영국 공군의 관점이며 영·이·독 부대별 항복 시각, 손실과 포로 집계는 미확인.
2. [미 해군 박물관 타라와 공식 역사 해설](https://www.history.navy.mil/content/history/museums/nmusn/explore/photography/wwii/wwii-pacific/gilbert-marshall-islands-campaign/invasion-gilbert-islands/tarawa-atoll-betio.html): 1943-11-20 제2해병사단의 베티오 상륙, 11/23 베티오 확보 구분. 기존 EVT-0195에 SRC-2207 연결 및 날짜·서술 보강. 상륙 첫날과 베티오 확보·환초 전체 확보를 혼동하지 않음.
3. [미 해군 NHHC 갈바닉 작전 상세 해설](https://www.history.navy.mil/about-us/leadership/director/directors-corner/h-grams/h-gram-025/h-025-1.html): 11/20 타라와·마킨 상륙과 조석·상륙정 문제 보조 대조. 본 실행에서 SRC 별도 등록하지 않음; 추가 1차 사료 검증 대상으로 유지.

## 검증 한계와 백필
- 독일·이탈리아 원자료와 영국군 전투일지 미확인: RQ-1272. 타라와 당대 전투상보, 중국·버마·동부전선·민간인·경제·점령 등은 기존 RQ-0003/RQ-0007과 BACKFILL_QUEUE로 이관. 전세계 전수조사 아님.
- 신규 EVT/SRC/RQ 1/2/1, 누적 3723/2207/1272. EVT-0195 기존 행 수정은 신규 EVT로 계산하지 않음. 정본/research 미러 일치 및 날짜 정렬 검사 후 게시 예정.
