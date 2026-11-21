# 1943-03-15~21 forward 사료감사 (2026-11-16)

## 원격 기준과 중복
기준 HEAD cacf19d0a997d48d7113e2697cfa8d0a70db76f8; 이전 CI 성공. WORK_STATE와 ledger 다음 커서 1943-03-15 일치. 기존 1943년 연표의 3/8 HX 229 출항 EVT-3682와 3/16 해상 교전은 서로 다른 단계. 3/20 마레스선 주공은 기존 EVT에서 발견되지 않음. SRC 등록부의 아래 3개 URL 및 SRC-2135~2137 신규 등록 전 중복 없음. RQ 신규 없음: 기존 RQ-0003/0007이 원자료·전역 누락 검증을 포괄.

## 출처별 확인 및 한계
- https://www.secnav.navy.mil/foia/readingroom/HotTopics/THRESHER%20RELEASE/USS%20Thresher%20Interim%20Release%206%20pt%202.pdf — 미 해군 공개 전사 발췌: 3/16~17 밤 HX 229/SC 122 집중 공격, 3/20 교전 이탈. 21척·141000톤은 해당 문헌의 집계이며 최종 확정치 아님. SRC-2135.
- https://www.usni.org/magazines/naval-history-magazine/2023/june/crisis-victory-north-atlantic — USNI 후대 해군사 연구: 3/16 접촉·공격, HX 229 13척과 SC 122 9척 손실로 기술. 앞 문헌과 21/22척 불일치; 별도 함명·침몰시각 원자료 미대조. SRC-2136.
- https://www.historyofwar.org/articles/battles_mareth.html — 마레스선 전투 후대 해설: 3/20 21:45 준비사격·23:15 보병 진격, 우회기동 19~20일과 구분. 영국 공식 당대 전투일지는 미대조. SRC-2137.

## 범위·후속
3/15~21 대서양·튀니지 2건 선별 조사. 동부전선·중국·태평양·버마·점령·민간인·경제 전수 조사 아님. 해상 손실·시각 충돌 및 기타 전역은 WORK_STATE BACKFILL_QUEUE와 기존 RQ-0003/RQ-0007로 후속. 동일 날짜 정규 forward 반복 금지.

## 구조 검사
신규 EVT-3683/3684, SRC-2135/2136/2137. 연표 전체 날짜 오름차순 및 허용 출처상태 확인, SRC 링크 존재, 정본과 미러 동일 바이트, ledger 2/3/0과 실제 ID 추가 수 일치. 누적 3684/2137/1246. ledger cursor_after=WORK_STATE FORWARD_CURSOR=1943-03-22. 로컬 validate_index.py 미실행, 게시 SHA CI 확인 필요.
