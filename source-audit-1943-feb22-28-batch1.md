# 1943-02-22~28 forward 사료감사 (2026-11-16)

## 재개·중복 점검
기준 HEAD 709b74397b94ba34d4022b23ee479a80f9baaa85; WORK_STATE 및 ledger 마지막 커서 1943-02-22 일치, 이전 SHA GitHub Actions 성공. 대상 연표 1943년 2/22~28 기존 독립 사건 없음. 2/18 백장미 체포 EVT-3677, 1942-12-16 로마인 강제이송 명령 EVT-3663과 이번 사건을 분리. SRC-2127/2109는 기존 등록이므로 재사용하고, 신규 기관 URL 3개만 SRC-2129~2131 등록. 기존 RQ-0003/0007 포괄하므로 RQ 신규 0.

## 근거 및 한계
- https://www.bundesarchiv.de/themen-entdecken/online-entdecken/geschichtsgalerien/sophie-und-hans-scholl-zum-tode-verurteilt-am-22021943/ — 독일 연방문서보관소: 2/22 숄 남매·프롭스트 사형 선고 및 같은 날 처형. 1차 기록 소개·후대 해설 혼합, 판결문 전문 미대조.
- https://www.lmu.de/en/about-lmu/lmu-at-a-glance/history/contexts/1942-43-the-white-rose-resistance-group/ — 대학 공식 해설: 2/18 체포와 2/22 판결·집행을 분리; 기존 SRC-2127 재사용.
- https://hmd.org.uk/resource/26-february-1943-first-transport-of-roma-and-sinti-reaches-auschwitz/ — 홀로코스트 추모교육기관: 2/26 독일 출발 신티·로마인 첫 수송 도착. 1942-12-16 명령·1943-01 시행지침·2/26 실행을 구분; 원수송명부 미대조.
- https://www.nia.no/en/the-operations/ — 노르웨이 산업노동자박물관: 2/27 20시 접근, 2/28 자정 직후 중수시설 폭파. 500kg 중수 손실 수치는 현장박물관 설명이며 생산장부와 독립 대조하지 않아 EVT 본문에 미기재.
- https://www.nia.no/en/vemork/experiences/the-heavy-water-cellar/ — 현장 전시 안내의 2/28 날짜 재확인. SRC-2131과 같은 기관이므로 중복 SRC 미생성.

## 백필·범위 한계
기존 RQ-0003(당대 문서 검증)·RQ-0007(전역·민간인 누락) 및 WORK_STATE BACKFILL_QUEUE에 원판결문·수송명부·작전보고서, 중국·태평양·버마·동부전선·경제·점령·민간인 미조사를 기록. 전 세계 전수완료 아님.

## 구조 사전검사
1943 연표 전체 시작일 오름차순, 출처 상태 허용값, 신규 ID·URL 중복, 기존 SRC 링크, 정본/미러 바이트 동일, ledger 증가수 및 WORK_STATE 커서 일치 확인. 로컬 전체 저장소 스냅샷 부재로 python validate_index.py 미실행. 게시 SHA CI 결과 별도 확인.
