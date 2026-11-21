# 사료감사 — 1942-07-19~21 (forward, 미게시 배치 복구)

## 선행 저장 실패 복구
- 기준 원격 HEAD `6cca644c374639f2fbb86a83f3e2ece4d2080da6`, 원격 커서 1942-07-19, 원장 누적 3632/2072/1239를 확인. 이전 미게시 후보 파일 `ww2_unpublished_1942-07-19_21.md`에서 사료·ID 후보를 회수하고 같은 날짜의 인터넷 조사 재실행을 피함.
- GitHub Git Data API로 HEAD의 tree SHA `300ffc7ed57b75f4d5d12ef762c22a8b6c96968d`를 직접 확인하여 DNS 장애로 실패한 단일 트리·단일 커밋 경로 복구.

## 사건·출처 대조
- USHMM 공식 연표 https://encyclopedia.ushmm.org/content/en/article/1942-key-dates 의 7월 19일 항목에서 히믈러가 총독부 고급 SS·경찰지도자에게 1942-12-31까지 유대인 강제이송을 지시했음을 확인. 절멸시설 또는 주요 도시의 폐쇄 시설로 이송한다는 명령의 범위를 기록. 실제 강제이송 및 살해 완료를 의미하지 않음.
- 원문 후보 https://holocausthistory.site/1942-07-19-heinrich-himmlers-directive-for-the-complete-resettlement-of-jews-in-the-general-government/ 는 BArch NS 19/1757이라고 표기하지만 원본을 직접 대조하지 않아 독립 SRC로 승격하지 않음. https://www.holocaust-chronologie.de/chronologie/uebersicht/langfassung.html 도 원문 교차 미완료로 보조 후보에만 남김.
- 기존 7/17 EVT-0152와 7/22 EVT-0153은 서로 다른 사건. 7/19 사건 및 USHMM URL·EVT-3633·SRC-2073은 기존 정본에서 중복이 없음을 확인한 후 등록. RQ-0007의 광역 사료검증 범위로 원문·이행 시점 후속조사; 독립 RQ 억지 생성하지 않음.
- 7/20~21 중국·태평양·동부전선·아프리카·점령지·민간인·경제 사건 전수 검증하지 못함. BACKFILL_QUEUE에 보존. 신규 1 EVT/1 SRC/0 RQ. 누적 3633/2073/1239. 원문·사진 복제 없음.

## 검증
- 정본/미러 동일, 날짜 순서·기존 ID·증분 검증 대상. 로컬 Git DNS 장애로 전체 저장소의 `python validate_index.py` 직접 실행하지 못함. 게시된 SHA의 CI 결과를 별도 확인해야 함.
