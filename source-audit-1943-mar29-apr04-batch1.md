# 1943-03-29~04-04 forward 사료감사 — 미게시 배치 복구 (2026-11-16)

## 재개·중복 검사
원격 PR #1 HEAD 8b6746a95765bebcb6e8d632038068ee94f2be70; WORK_STATE/ledger 커서 1943-03-29 일치. 이전 미게시 파일 ww2_unpublished_1943-03-29_04-04.md에서 확인된 사실을 재검색 대신 회수. 기존 chronology-1942-1943.md에 로테르담 3/31 공습 없음; 출처 등록부 URL과 ID SRC-2141/2142, RQ-1248 및 EVT-3687 중복 없음. 기존 HEAD CI success.

## 사료·색인
- EVT-3687: 1943-03-31 로테르담 서부 Bospolder-Tussendijken 오폭. 미군 공습 표적 Schiedam Wilton-Fijenoord 조선소와 실제 폭탄 낙하 지역 구분.
- SRC-2141 https://stadsarchief.rotterdam.nl/rotterdam-oorlog — 로테르담 시립기록보관소 공식 해설(2차). 사망 453명, 부상 약 400명, 이재민 1만명 이상은 기관 집계이며 원명부 미대조.
- SRC-2142 https://voorouder.nl/namen-slachtoffers-bombardement-31-maart-1943-rotterdam — 독립 피해자 명단 연구(2차). 명부 포함 기준·시립 기록과 차이는 미검증.
- RQ-1248: 일부 다른 연구의 326~401명 집계와 453명 간의 범위·기준일·명단 차이, 당대 미 육군항공대 임무보고를 추후 교차.

## 범위·후속
3/29 가베스 점령 후보 https://www.historyofwar.org/articles/battles_gabes.html 은 원사료 추가 확인 전 신규 EVT/SRC로 등록하지 않음. 튀니지·중국·태평양·점령지·민간인 등 미조사 부분은 기존 RQ-0003/0007 및 BACKFILL_QUEUE로 추적. 세계 전수 완료 아님. 해당 기간 기본 forward 반복 금지.

## 정합성 사전 점검
연도별 1943 표 시작일 오름차순, 허용 출처 상태 문헌대조, EVT-3687→SRC-2141/2142 링크, SRC 등록부 URL, RQ-1248, 정본·research 미러 바이트 동일, 원장 신규 1/2/1·누적 3687/2142/1248, ledger cursor_after=WORK_STATE FORWARD_CURSOR=1943-04-05. 로컬 전체 validate_index.py 미실행(로컬 Git DNS 장애). 게시 후 SHA CI 확인 필요.
