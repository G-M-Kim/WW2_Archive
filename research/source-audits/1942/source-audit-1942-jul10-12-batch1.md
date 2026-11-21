# 사료감사 — 1942-07-10~12 (forward, 2026-11-14)

## 정본·중복 확인
- 시작 원격 HEAD 4e835a7b75338dc5c86beac04c5af4a0d580c2bc; WORK_STATE/ledger 최신 FORWARD_CURSOR 1942-07-10 일치. chronology-1942-1943.md에는 7/1 엘알라메인 개전 EVT-0150이 있으나 7/10 텔엘에이사 공세는 별도 행 없음. SRC 등록부에서 아래 두 URL 미등록, EVT-3630/SRC-2066~2067 미사용 확인.
- 호주 전쟁기념관 공식 전투명예 https://www.awm.gov.au/collection/E84632 : 7/10~11 텔엘에이사 공격·철도 측선 주변 거점 점령과 이후 추축군 반격을 설명(후대 기관 정리). 새 EVT-3630 날짜는 **공세 개시 7/10**이며 11일 이후 전투 전체 종료로 해석하지 않음. SRC-2066.
- 호주 전쟁기념관 1942-07-10 촬영 사진 소장품 https://www.awm.gov.au/collection/C8276 : 제26호주보병여단의 텔엘에이사 진격 중 이탈리아군 포로를 보여 주는 당대 사진과 현대 메타데이터. SRC-2067. 사진만으로 포로 총수·점령 지역 전체를 확정하지 않음.
- 보조 대조: AWM 역사 강연 https://www.awm.gov.au/articles/blog/1942-ruin-ridge 에서 7/10 제26여단의 이탈리아군 상대 공격 성과를 언급하나 이번에 별도 SRC로 중복 등록하지 않음.
- 7/11~12 개별 전투·동부전선·태평양·중국·점령지·학살·경제는 전수 검증하지 못했음. https://www.holocaust-chronologie.de/chronologie/1942/juli.html 에 7/10~11 강제이송·살해 후보가 있으나 기관 독립 원전 대조 전이므로 신규 EVT/SRC로 등록하지 않고 RQ-0007의 backfill 범위에 포함. 새 독립 RQ는 기존 RQ-0007 범위를 중복하므로 만들지 않음.

## 정본 반영·검증
- EVT-3630 1건, SRC-2066/2067 2건, RQ 0건. 누적 3630/2067/1238. 기존 EVT-0150은 7/1 개전으로 유지하여 7/10 공격과 중복하지 않음.
- chronology-1942-1943.md 및 chronology-sources-v1.md, research-backlog.md의 research 미러 바이트 일치 예정. BACKFILL_QUEUE에 7/11~12 및 다른 전역 미검증을 기록하고 forward 커서는 1942-07-13으로 전진.
- 당대 사진 실물·원문은 복제하지 않음. 로컬 validate_index.py 실행 불가 시 CI로 별도 검증하며 통과 여부는 SHA 기준 확인.
