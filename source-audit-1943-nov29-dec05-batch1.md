# 1943-11-29~12-05 forward 사료감사 (2026-11-19)

## 재시작·중복 확인
- 기준 원격 HEAD 96d6f535441e82b62ba4d6ea99a4264e1d999157, tree d17d0c96d9e4fc299d8d1f0fb4d64d72cb77b0f9; WORK_STATE·ledger 마지막 커서 1943-11-29, 누적 3723/2209/1273 일치. 이전 미게시 후보를 회수했으며 같은 기간 재검색을 신규 성과로 산정하지 않음.
- EVT-0198(12/2 바리항) 기존 등록 확인하여 신규 EVT 중복 억제. EVT-3724, SRC-2210/2211, RQ-1274 미사용 확인. 신규 출처 URL은 등록부에 동일 URL 미등록 확인.

## 사료 확인 및 정본 반영
1. [FRUS Document 419](https://history.state.gov/historicaldocuments/frus1943CairoTehran/d419): 1943-12-01 이란 3국 선언 서명 원본. 타자 날짜 11/30을 12/1로 고쳤으며 대외 공개 12/6 20시 모스크바 시간과 구별. 이란 주권·독립·영토 보전 및 가능한 경제 지원 원칙을 EVT-3724·SRC-2210에 등록. 이행 여부는 별도 과제.
2. [NHHC H-Gram 035](https://www.history.navy.mil/content/history/nhhc/about-us/leadership/director/directors-corner/h-grams/h-gram-035.html): 이전 미게시 후보 감사에서 12/2 바리항 공습·SS John Harvey 화학탄 적재 관련 해설 확인. 이번 재접근은 시간 초과. EVT-0198은 SRC-2211을 링크등록 상태로 연결했으며 상세 피해 수치 확정 금지, RQ-1274로 분리.
3. [FRUS Document 411](https://history.state.gov/historicaldocuments/frus1943CairoTehran/d411) 및 [FRUS Document 343](https://history.state.gov/historicaldocuments/frus1943CairoTehran/d343): 테헤란 성명과 카이로 선언의 합의·서명·공표 차이는 기존 RQ-1273으로 추적. 추가 EVT/SRC 중복 억제.

## 조사 범위·잔여 검증
- 중국·버마·동부전선·태평양·아프리카·점령·민간인·경제 전수조사가 아님. RQ-0003/0007 및 RQ-1273/1274 BACKFILL_QUEUE.
- 신규 EVT/SRC/RQ 1/2/1, 누적 3724/2211/1274. 정본과 research 미러는 바이트 일치, 연표 날짜 오름차순·출처 상태 허용값 확인. 전체 로컬 validate_index.py 미실행.
