---
title: WW2 Archive 1939-09-18~25 사후 무결성 및 CI 실패 감사
status: integrity-audit
audit_date: 2026-10-28
base_snapshot_commit: 7909711039964770e8b42911bfd892e1e6fd52c3
reviewed_head_commit: 337ebccec6f89f4b13ab99c8ae205be712acb372
---

# 1939년 9월 18~25일 연구분 사후 점검 (2026-10-28)

## 질문과 결론

GitHub 알림의 과거 CI 실패와 연결 불안정이 1939-09-18 이후 연구 데이터 파손을 의미하는지 조사했다.

- **기존 연구 데이터가 삭제되거나 덮어써진 흔적은 없음.** 해당 기간 직전의 609 사건/342 출처 ID/112 RQ에서 현재 672 사건/384 출처 ID/138 RQ로 증가. 기존 609 EVT 행은 제목·날짜·유형·상태·출처 모두 **동일**, 기존 342 SRC 행도 **변경·삭제 0**. 기존 RQ는 RQ-0112의 `open→in_progress` 상태 변경 한 건 외 본문 보존.
- **2026-10-26 13:27 UTC, Run #30** https://github.com/G-M-Kim/WW2_Archive/actions/runs/40330713614 실패는 **407 사건/39 연구과제 시점**의 구형 검증 프로그램 문제: `research-backlog.md`의 일반 텍스트 및 Markdown 표 헤더를 데이터 행으로 검사, `expected 7 columns; got 1`, 정상 `RQ-0001` 등에 `invalid task ID` 출력. 알림에 나오는 최신 v1.7 PR 제목은 당시 워크플로가 최신 데이터를 검증한 것을 의미하지 않음. Node.js 20 지원 중단·Ubuntu 이미지 이전 알림은 직접 실패 원인이 아니었음.
- **2026-10-27 14:02 UTC, Run #93** https://github.com/G-M-Kim/WW2_Archive/actions/runs/40517365574 실패는 다른 오류: SRC-343~350 8건의 출처 ID가 조사 중 일시 중복됐기 때문. 이후 **커밋 `b187254`**에서 중복 표를 정리했고, Run #94 https://github.com/G-M-Kim/WW2_Archive/actions/runs/40517430841 검사 단계 PASS 및 실행 최종 Success 확인. 후속 95~104도 Success.
- **최신 Run #104** https://github.com/G-M-Kim/WW2_Archive/actions/runs/40520870050 `success`: 672 EVT, 384 SRC, 138 RQ, 상태 `문헌대조`448·`링크등록`84·`미등록`140. 현재 PR #1 Draft이고 merged=false, base main, head `draft/chronology-index-v1`; PR 파일은 `research/`와 `.github/workflows/research-index-check.yml`에 한정. `main`과 `docs/` 배포 없음.

## 9월 18~25일 집중 구조 검사

| 분류 | 검사 내용 | 결과 |
|---|---|---|
| 사건 무결성 | 전 연표 4개 파일 672건, EVT 고유성·날짜 정렬·7열 구조 | PASS, 중복 0·누락 0 |
| 출처 | SRC-001~384, URL https 존재, 현재 EVT 참조된 SRC ID 존재 | PASS, 누락 참조 0 |
| 백로그 | RQ-0001~0138, 각 고유 ID·7열 표 | PASS |
| 기간 샘플 | 1939-09-18~25 날짜에 속한 신규 63 EVT | **59건 기본 문헌대조, 4건 링크등록, 미등록 0** |
| 출처 신규 | SRC-343~384 42개 등록 | ID 중복 0 (웹페이지 중복별칭은 아래 유의) |
| 감사 원문 | `source-audit-1939-sep18-21-batch1.md` 37 EVT 및 `source-audit-1939-sep22-25-batch1.md` 27 EVT 모두 연표상 ID 존재, SRC도 존재 | PASS (공통 선행 `EVT-0643` 한 번 중복 감사·실제 사건 ID는 1개) |
| 이전 내용 보존 | 2026-10-27 v1.5 커밋의 EVT 609·SRC 342와 현재 차분 | 기존 행 유실/무단 변경 0 |

**구조검사는 내용의 역사적 진실을 독립적으로 확정하지 않는다.**

## 날짜·사료 수준에 대한 별도 점검

- `EVT-0610` 1939-09-18 ORP Orzeł 탈린 탈출은 폴란드 해군박물관 https://muzeummw.pl/orp-orzel-ucieka-z-portu-w-tallinie/ 에서 17~18 야간 02:00 탈출 명시.
- `EVT-0612`·`EVT-0624` Wilno 18~19일, `EVT-0637`·`EVT-0642` Grodno 20~21일은 폴란드 IPN https://ipn.gov.pl/pl/aktualnosci/206451%2C85-rocznica-agresji-ZSRS-na-Polske-Warszawa-17-wrzesnia-2024.html 로 기초 일자 대조.
- `EVT-0647`·`EVT-0648` Lwów 22일 소련 상대 항복·장교 보호약속 위반, `EVT-0649` Brześć 독소 인계·행진, `EVT-0650` Białystok 이양은 https://polskiemiesiace.ipn.gov.pl/mie/wszystkie-wydarzenia/wrzesien-1939/kalendarium/poczatek-ii-wojny-swiat/118471%2C22-wrzesnia-1939-piatek.html 및 https://bialystok.ipn.gov.pl/pl1/archiwa/archiwalia-bialystok/170684%2CWrzesien-pazdziernik-03939-w-dokumentach-Oddzialowego-Archiwum-IPN-w-Bialymstoku.html 자료와 기초 날짜 일치.
- `EVT-0661` ORP Żbik 스웨덴 억류는 육군박물관 https://muzeumwp.pl/timeline/podniesienie-polskiej-bandery-na-okrecie-podwodnym-orp-quotzbikquot/ 에서 9/25, IPN 9/24와 상충. **링크등록** 상태를 유지하고 입항/공식 억류 날짜 구분해야 함.
- `EVT-0658` Starzyński 유명 방송일 9/23 vs 9/25는 https://www.gov.pl/web/uw-mazowiecki/pamieci-prezydenta-stefana-starzynskiego 정부문서에서 25일로 기술. 23일 IPN 기록과 충돌하며 현재 **링크등록**, 수록 날짜 확정 아님.
- `EVT-0619` Śladów 9/18 vs 9/20은 2차문헌 이견; `EVT-0654` Wójtowce/Kodziowce 포로 피해 정확 개별일자 불확정. 모두 **링크등록**, 현재 기준일을 확정 증거로 사용하지 않음.
- `SRC-365`가 `FRUS 1941 v01 Doc220` 권에 실렸지만 **실제 전보 원문은 1939-09-23**이다. 선집의 출판 편집상 권 이름과 원전 전문 발신일이 다른 것이며 당시 전보의 날짜 오류가 아니다: https://history.state.gov/historicaldocuments/frus1941v01/d220

## 확인한 편집상 남은 위험

1. **동일 URL의 출처별칭이 3종 묶음에 재사용됨:** SRC-338/SRC-357, SRC-341/SRC-349/SRC-379, SRC-353/SRC-367. 서로 독립 원전 2~3종으로 집계하면 안 된다. 본문에서 SRC ID 384개는 **독립 사료 384종이라는 뜻이 아님**.
2. **역사기관의 후대 해설과 당대 원문은 다른 증거등급.** 일부 IPN 날짜별 사이트는 검색 색인은 확인되지만 개별 페이지 원문 열람이 실패한 기록이 있다. 지상전 세부 시간·희생자명부와 정치적 동기는 추후 1차 대조 필요.
3. 위 4건은 날짜·귀속 불확실성을 가진 채 참고자료만 연결된 `링크등록`임. 그 밖의 `문헌대조` 59건도 기초 날짜·존재 검증이지 전체 세부주장의 1차 검증이 아니다.
4. 2026-10-28 시점 전체 후보 672 중 **224건(링크등록 84+미등록 140)**은 최소 주장대조 미완료. 완성된 역사 백과의 확정 본문으로 일괄 병합하면 안 된다.
5. 동시 쓰기/네트워크 불안정 시 서로 다른 GitHub 커밋 기준으로 SRC·RQ 다음 번호를 추산하면 중복될 수 있다. **각 파일 갱신 직전 최신 브랜치의 목록과 SHA를 재조회하고, 실패한 중간 CI가 아니라 최종 HEAD CI 결과를 보고**해야 한다.

## 이번 감사의 한계와 후속 원칙

- 이 보고서는 구형 CI 오류와 1939-09-18~25 데이터 유실·구조 불일치를 실측 점검하고 **핵심 역사사례를 표본 교차검증**한 것. 63개 사건의 각 원전 전문과 42개 URL의 콘텐츠를 모두 독립 검사한 것은 아니다.
- 날짜 미확정 4건의 당대 항만·방송·지방 법원·군사수사 원본을 추후 우선 조사하되, 기존 원인표시·RQ-0130/0132/0133 등을 지우지 않는다.
- Draft PR #1은 계속 **병합 보류**, `main`·`docs/` 변경·Pages 게시에는 사용자 명시 승인 필요.
