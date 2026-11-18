# 1943-11-08~14 forward 사료 감사 (2026-11-18)

## 기준·중복 검사
- 원격 HEAD 8dc846ae1a6c1912ad1346cfee8f377f9d9fa94a, WORK_STATE 커서 및 ledger 마지막 커서 모두 1943-11-08 확인. 1943-11-08~14 기존 연표 행 부재. 기존 11/1 모스크바 의정서 EVT-3720 및 11/6 키이우 EVT-0194와 중복 없음.
- 신규 URL 두 개가 SRC 정본에 미등록임을 검사. 신규 EVT-3721/3722, SRC-2204/2205, RQ-1271 기존 ID 미사용 확인.

## 확인 자료와 선별 사건
1. [미 해군 National Museum of the U.S. Navy 부건빌 전역 공식 개요](https://www.history.navy.mil/content/history/museums/nmusn/explore/photography/wwii/wwii-pacific/south-southwestern-pacific/bougainville-campaign.html): 토로키나 곶 상륙 교두보를 1943-11-13 확보했다고 기술. 11/1 상륙 시작과 11/13 확보를 구분하여 EVT-3722·SRC-2204 등록. 이 문서는 후대 기관 해설이며 1차 작전일지는 미대조.
2. [미 해군연구소 Naval History 2013년 전문 역사 해설](https://www.usni.org/magazines/naval-history-magazine/2013/july/north-guadalcanal): 에식스·벙커힐·인디펜던스 항모전단의 1943-11-11 라바울 공습을 설명. 11/5 별도 공습과 구별하여 EVT-3721·SRC-2205 등록. 함정별 피해 및 항공기 손실 수치는 당대 보고와 미대조이므로 EVT에 단정적으로 적지 않음.

## 검증 한계·백필
- 양 자료는 기관 해설/전문 2차 연구이며 독립적인 미·일 1차 전투상보의 양측 교차검증이 아니다. 정확한 항공기 출격/투하/피해 수, 일본군 함정별 피해, 교두보 확보 판정 시각은 RQ-1271로 별도 등록.
- 중국·버마·동부전선·대서양·아프리카·민간인·경제·점령의 미검증 범위는 기존 RQ-0003/RQ-0007 및 BACKFILL_QUEUE로 이관. 전 세계 전수조사 완료 아님.
- 신규 2 EVT / 2 SRC / 1 RQ, 누적 3722/2205/1271. 정본/미러 바이트 일치, 날짜 오름차순·출처 상태·기존 ID 중복 사전검사. 로컬 전체 validate_index.py 미실행(로컬 GitHub DNS 실패).
