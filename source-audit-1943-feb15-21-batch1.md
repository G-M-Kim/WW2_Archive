# 1943-02-15~21 forward 사료감사 (2026-11-16)

## 재개 및 중복검사
기준 HEAD e1e5a6ebbdec8e76319187517fd57ec49f3bccac; WORK_STATE와 ledger 최신 커서 1943-02-15 일치. 기존 EVT-0171 카세린 협곡 개전(2/19)은 신규 EVT를 만들지 않고 보강. 2/18 백장미 체포는 별도 EVT 미색인으로 확인하여 EVT-3677 추가. SRC-2126~2128 URL은 기존 출처 등록부에서 미등록 확인.

## 근거와 한계
- https://www.bundesarchiv.de/themen-entdecken/online-entdecken/dokumente-zur-zeitgeschichte/weisse-rose/ — 독일 연방문서보관소: 1943-02-18 한스 숄 체포 시 제7호 전단 초안 압수. 수사문서 BArch R 3017/34635의 2/21 조사기록을 안내. 당시 자료 일부 공개·기관 해설이므로 전체 수사기록 원문 검증 완료로 주장하지 않음.
- https://www.lmu.de/en/about-lmu/lmu-at-a-glance/history/contexts/1942-43-the-white-rose-resistance-group/ — 뮌헨대학교 공식 해설: 2/18 제6호 전단 배포·체포, 2/22 재판·처형. 2/18 체포와 2/22 처형을 분리. 전단 부수는 자료 간 차이로 미확정.
- https://www.nationalww2museum.org/war/articles/kasserine-pass-german-offensive-american-victory — 미국 국립제2차세계대전박물관: 카세린 전투 2/19 이후 전개, 스비바·탈라 등 후속 교전 구분. 기존 EVT-0171의 미등록 출처를 보강; 시디부지드 2/14 EVT-3675와 중복 생성하지 않음.

## 색인과 백필
신규 EVT 1, SRC 3, RQ 0. RQ-0003(당대 기록 확인), RQ-0007(전역·민간인 누락) 유지. BACKFILL_QUEUE: 카세린 미 제2군단 전투일지·명령과 병력/손실 원자료, 백장미 게슈타포 조사기록 전문·당대 재판문서, 2/15~21 중국·버마·태평양·동부전선·점령·경제·민간인 미조사. 이번 기간 전 세계 전수조사 완료를 주장하지 않음.

## 사전 구조검사
1943년 연표 기존/신규 행 시작일 정렬, 허용 상태, EVT/SRC ID 및 URL 중복, 출처 링크, 정본/미러 문자열 동일성, ledger/WORK_STATE 커서와 신규 증분 대조. 로컬 전체 저장소 스냅샷 및 python validate_index.py 미실행. 게시 SHA CI 별도 확인.
