# 1943-01-04~10 forward 사료감사 (2026-11-16)

## 재개·중복 점검
기준 HEAD d8c34dde2bd40a32a116e7f59cc1d617d5b9b755, WORK_STATE/ledger 모두 1943-01-04. 기존 1943년 연표의 1월 14일 카사블랑카 EVT-0167, 1월 18일 이스크라 EVT-0168과 구분. 문다 야간 포격과 벨리키예루키 1/5 시가지 분할은 기존 EVT 미색인; 신규 URL 2건 기존 SRC 등록부와 중복 검색 후 등록. 독립적 새 RQ는 기존 RQ-0007/0003의 당대 전투일지·피해 대조에 포괄되므로 만들지 않음.

## 검증된 사건·사료
- https://www.history.navy.mil/content/history/nhhc/about-us/leadership/director/directors-corner/h-grams/h-gram-015/h-015-2.html — NHHC 공식 해군 전사. 1/4 20:00 출항, 1/5 01:02 문다 비행장 포격, 약 4,000발 발사. 이 수치는 사후 해설이며 실제 피해 평가·함정별 탄약 장부와 분리. 1/5 후속 일본군 공습 및 근접신관 최초 전과는 별개 검증 대상으로 둠.
- https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo81636/pdf/GOVPUB-D114-PURL-gpo81636.pdf — 미 육군의 독일군 경험 전사. 1/5 소련군 북쪽 공세로 벨리키예루키 수비대가 두 포위구역으로 나뉨. 1/10 독일군 서부 요새 연결 시도와 1/16 최종 항복은 다른 사건·단계. 독일측 시각의 전사이므로 소련측 원작전일지 미확인.
- https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/n/navy-depart-communiques-1-300-pertinent-press-releases.html — 당대 미 해군 1943-01-05 Communiqué 240에 1/4 문다 공습 기록. 항공 공습과 1/5 해상 함포사격을 동일 사건으로 합치지 않음. 이번에는 별도 SRC ID를 생성하지 않음.

## 한계 및 BACKFILL_QUEUE
1/4~10 전체 세계사 전수 조사 아님. 중국·버마·북아프리카·유럽 점령·민간인·경제 및 기타 전역은 RQ-0007/RQ-0003로 후속. 1/5 문다 함포사격의 피해량과 소련측 1/5 전투일지는 원전 미확인. 신규 2/2/0, 정본·미러 동기화 예정. 로컬 validate_index.py 미실행; 원격 CI 결과 별도 확인.
