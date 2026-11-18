# 1943-10-25~31 forward 선별 사료감사 (2026-11-18)

## 기준과 미게시 배치 회수
- 시작 원격 HEAD c11d08ebec1a7222dd1f10af8096f02e94fff742; WORK_STATE/ledger cursor 1943-10-25 일치. 기존 누적 3718/2200/1269.
- 직전 미게시 후보를 회수하고 최신 연표·출처·백로그에서 동일 사건, EVT-3719, SRC-2201/2202, RQ-1270 및 두 URL의 중복 부재 확인. 저장 실패를 무사건으로 기록하지 않음.

## 당대 사료 확인
1. [FRUS 1943 General I, Doc. 615](https://history.state.gov/historicaldocuments/frus1943v01/d615): 10월 30일 제12차 회기 회의록. 모스크바 현지 시각 오후 6시 30분 미·영·소 외무장관 및 주모스크바 중국 대사가 4국 선언에 서명. EVT-3719 및 SRC-2201 등록.
2. [FRUS 1943 General I, Doc. 624](https://history.state.gov/historicaldocuments/frus1943v01/d624): 10월 31일 19시 미국 대표단 전보. 공동성명과 4국 선언·독일 잔학행위·이탈리아·오스트리아 선언의 공식 발표를 11월 1일 20시(모스크바)로 계획. 편찬자 각주에 예정대로 11월 1일 공개되었다고 기록. SRC-2202 등록, 11월 사건은 다음 forward에서 검토.
3. [FRUS Doc. 684](https://history.state.gov/historicaldocuments/frus1943v01/d684): 11월 1일 의정서 후보는 이번 기간 외. 원문 세부 대조 미완료로 별도 SRC·EVT 생성하지 않고 RQ-1270으로 이관.
4. [Yale Avalon 모스크바 선언 전사](https://avalon.law.yale.edu/wwii/moscow.asp): 원문 비교 후보이나 이번 배치에서 독립적 출처 검증 완료로 간주하지 않음.

## 범위·검증 한계
- 10월 25~31일 중 모스크바 선언을 선별 확인. 다른 전역·점령·민간인·경제는 RQ-0003/RQ-0007 BACKFILL_QUEUE. 전 세계 전수조사 완료를 뜻하지 않음.
- 신규 EVT/SRC/RQ 1/2/1, 누적 3719/2202/1270. 정본·research 미러 동일, 날짜 정렬·ID·URL 중복 및 원장/WORK_STATE 커서 검사. 전체 로컬 validate_index.py는 Git DNS 실패로 저장소 스냅샷 확보 불가하여 미실행. 게시 SHA CI 별도 확인.
