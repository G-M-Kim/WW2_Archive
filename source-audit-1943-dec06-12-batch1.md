# 1943-12-06~12-12 forward 사료감사 (2026-11-19)

## 정본·중복·재시작
- 원격 HEAD 4fbed89f772488167942cf5a188b5b615fd720dc, WORK_STATE/ledger 커서 1943-12-06, 누적 3724/2211/1274 일치. 기존 1943 연표 12/02 다음 12/26 사이의 미색인 날짜 확인. EVT-3725/3726, SRC-2212/2213, RQ-1275 미사용 확인, 신규 URL은 출처 등록부에 미등록.

## 근거·색인
1. [미 육군 공식 전역사 *Fifth Army at the Winter Line*](https://history.army.mil/portals/143/Images/Publications/catalog/100-9.pdf): 12/8 산피에트로·삼무크로 방면 143보병연대 공격을 기술. 12/8~9 최초 공격, 12/15~17 재공격과 후일 점령을 혼동하지 않음. EVT-3725·SRC-2212. 독일군 기록·민간인 피해 미대조.
2. [FRUS 1943 III Doc.574](https://history.state.gov/historicaldocuments/frus1943v03/d574): 12/13 외교전문은 소련·체코슬로바키아 조약이 전날 모스크바에서 서명되었다고 명시. [FRUS 1943 I Doc.682](https://history.state.gov/historicaldocuments/frus1943v01/d682)는 10/23 합의된 초안을 수록하며 서명과 구분. EVT-3726·SRC-2213; 비준 및 폴란드·체코·소련 원문 대조 RQ-1275.
3. [FRUS 1943 III Doc.579](https://history.state.gov/historicaldocuments/frus1943v03/d579)는 12/22 비준서 교환을 기록하므로 조사기간 밖의 사실로 별도 RQ 후속 처리하며 이번 주 신규 EVT를 생성하지 않음.

## 범위·제약
- 이탈리아 전역과 동유럽 외교만 선별 검토. 중국·태평양·아프리카·점령·학살·민간인·경제 사건 전수 검토가 아니며 RQ-0003/0007/1274/1275를 BACKFILL_QUEUE에 유지.
- 신규 EVT/SRC/RQ 2/2/1, 누적 3726/2213/1275. 날짜 오름차순, 허용 출처상태, 미러 바이트 일치, 신규 ID·URL 중복 사전검사. 전체 로컬 validate_index.py 미실행; 게시 뒤 SHA CI 별도 확인.
