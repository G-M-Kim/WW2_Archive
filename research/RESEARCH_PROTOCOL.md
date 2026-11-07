# WW2 Archive — 자동 연속조사 운영 수칙

## 재개 지점 우선순위

1. GitHub `draft/chronology-index-v1` **현 PR #1 HEAD**를 읽는다. 다른 실행/자동화가 이미 새 커밋을 추가했다면 현재 HEAD에 다시 맞춘다.
2. [WORK_STATE.md](../WORK_STATE.md)에서 단일 `FORWARD_CURSOR`를, [PROGRESS_LEDGER.md](PROGRESS_LEDGER.md) 마지막 행의 `다음 커서`와 비교한다. 불일치하면 수정 후 조사 시작.
3. 과거 채팅 메시지, 예약 프롬프트의 과거 초기값, [WORK_STATE_HISTORY_2026-11-07.md](WORK_STATE_HISTORY_2026-11-07.md)의 이전 FORWARD_CURSOR는 **절대로 사용하지 않는다**.

## 진도 / 누락 구분

- **forward:** 다음에 역사적 사건을 처음 탐색할 일자. 기본 7일 선별 조사. 중요한 고밀도 시기 1~3일, 사건 적은 시기 2~4주 이상. 기록할 수 있는 근거와 사건/출처를 남기고 배치 종료일 다음날로 **커서를 전진**한다.
- '전 세계 전수 조사·모든 RQ 종결'을 다음 일자로 넘어가기 위한 조건으로 설정하지 않는다. 남은 사건·미확인 원자료·민간인 피해·다른 전역은 `BACKFILL_QUEUE`와 기존/신규 RQ에 남긴다. '아직 모든 지역을 조사하지 못했으므로 커서 유지' 행위는 금지.
- **backfill:** 과거 누락·날짜/피해분쟁 조사. 커서는 바꾸지 않는다. 4회의 forward마다 최대 1회의 backfill을 우선 고려하고 **연속 두 번 backfill 금지**. 같은 주제/날짜를 최근 조사에서 다뤘으면 다른 RQ 또는 전진 기간으로 우선 변경.
- 원자료 접근 장애 또는 결과 0건이어도 의미있는 검사 범위·불확실성·후속 확인할 문헌을 문서로 기록한다. 사실 검증이 되지 않으면 신규 사건으로 가장하지 않는다. 완전히 아무 검사도 못 한 실패는 진도 전진으로 기록하지 않는다.

## 커밋 원자성

1. 먼저 기존 사건/출처/백로그와 중복 여부 확인. 양측 원문·날짜·발표/실행·편제정원/실현원·가동/총 보유/손실 구분. 자료에 없는 숫자를 절대 추정하지 않는다.
2. 루트 `chronology-*.md`, `chronology-sources-v1.md`, `research-backlog.md`와 동일 바이트의 `research/` 미러, `WORK_STATE.md`, 이 `PROGRESS_LEDGER.md`, 최신 사료감사 파일을 **가능하면 단일 커밋**으로 갱신한다. 신규 EVT/SRC/RQ 누적을 직접 계산한다.
3. 연표 날짜순 정렬 확인. `python validate_index.py` 및 원격 해당 HEAD Actions 확인. 단순 CI 통과는 사료 독립검증 완료가 아니다.
4. Draft PR #1 업데이트, `main`, `docs/`, Pages 및 PR 병합 건드리지 말 것. GitHub 쓰기 실패나 다른 커밋 충돌 시 성공했다고 보고하지 않는다.

## 사용자를 위한 보고

한국어 3~5줄: 연구 날짜 및 forward/backfill 모드, 신규·누적 EVT/SRC/RQ, GitHub 커밋/PR, CI 결과·문제, **다음 FORWARD_CURSOR**만. 상세 조사는 GitHub 문서에 저장.
