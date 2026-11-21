# 1943-12-13~19 forward 사료감사 (2026-11-19)

## 정본·중복
- 최신 원격 HEAD de131e99d18c164ed5b23a0d56160342c8d1513d, WORK_STATE/ledger 커서 1943-12-13, 누적 3726/2213/1275 일치. 기존 1943 연표에서 12/12 다음 12/26 사이 공백 확인. EVT-3727/3728, SRC-2214/2215, RQ-1276 미사용 및 두 신규 URL 중복 없음 확인.

## 출처·색인
1. [미 해군 제7상륙부대 작전보고](https://www.history.navy.mil/content/history/nhhc/research/library/online-reading-room/title-list-alphabetically/o/operations-seventh-amphibious-force.html): 1943-12-15 아라웨 상륙, 현지 기상·상륙지원 조건 기록. [미 육군 공식 전역사](https://history.army.mil/portals/143/Images/Publications/catalog/72-24.pdf)는 12/15 상륙과 이후 일본군 반격·1944년 1월 전투를 구분. EVT-3727, SRC-2214/2215. 기만상륙 피해 수치와 일본군 원전은 미검증.
2. [미 육군 공식 전역사 Fifth Army at the Winter Line](https://history.army.mil/portals/143/Images/Publications/catalog/100-9.pdf): 12/8 최초 공격·12/15 재공격·12/16~17 독일군 철수 후 산피에트로 확보를 구분. 기존 SRC-2212 재사용, EVT-3728. 정확한 독일군 철수 시각과 민간인 피해는 미검증.
3. [미 육군 공식 연표 1941–45](https://history.army.mil/portals/143/Images/Publications/catalog/11-1.pdf)는 12/13~17일 아라웨 출항·이탈리아·동부전선 병행 사건을 수록. 개별 사건에 별도 SRC로 중복 등록하지 않고 추가 backfill 후보로 보존.

## 검증 한계
- 태평양과 이탈리아만 선별 조사; 중국·동부전선·대서양·아프리카·학살·점령·경제·민간인 전수 조사 아님. RQ-1276 및 기존 RQ-0003/0007/1275를 BACKFILL_QUEUE에 유지.
- 신규 2/2/1, 누적 3728/2215/1276. 정본/미러 바이트 일치, 날짜 오름차순, 허용 출처상태, 신규 ID/URL 중복 사전검사. 전체 로컬 validate_index.py 미실행; 게시 뒤 SHA CI 확인.
