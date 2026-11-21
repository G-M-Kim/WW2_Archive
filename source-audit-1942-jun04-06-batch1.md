# 1942-06-04..06-06 사료감사 (forward, 이전 미게시 배치 회수)

## 재시작·중복 검사
원격 PR #1 HEAD 4035b170d915224e30bb93fd0aa794a5a3ed913a에서 마지막 원장 커서 1942-06-04, 누적 3616/2050/1231 확인. 기존 EVT-0145는 **6/3 정찰·육상기 공격 개시**로 유지; 6/4 항모 결전 및 6/6 함정 피해는 기존 별도 EVT가 없으므로 신규 EVT-3617/3618로 색인. 기존 SRC-2050(NHHC 전투사) 중복 등록하지 않음. 기존 RQ-1230은 더치하버 6/3~4 공보 정정, RQ-1231은 6/1~3 타전역이므로 6/4~6 시간대·전과검증은 RQ-1232로 분리.

## 사료별 확인과 한계
1. **6/4 미드웨이 항모전**: [미 해군 공식 전투사](https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/world-war-ii/1942/midway.html) (기존 SRC-2050)는 아카기·가가·소류에 미 급강하폭격기 치명타, 히류 반격으로 요크타운 피격 및 이후 히류 피격을 설명한다. [미 해군 당대 전투서술](https://www.history.navy.mil/content/history/nhhc/research/library/online-reading-room/title-list-alphabetically/b/battle-of-midway-3-6-june-1942-combat-narrative.html) (신규 SRC-2051)은 공격시각 10:22/10:25 등을 제시하나 당대 전과 주장은 사후 확인과 구분해야 한다. **EVT-3617**.
2. **일본 측 기록 교차**: [미 해군 전후 일본측 문서 번역 부록](https://www.history.navy.mil/content/history/nhhc/research/library/online-reading-room/title-list-alphabetically/b/battle-of-midway-japanese-plans-chapter-5-of-the-campaigns-of-the-pacific-war.html) (SRC-2052)은 일본측 항공공격 시각·명중 보고를 제시한다. 원 일본어 원본과 표의 현지/도쿄 시각 혼동 가능성이 있어 개별 피해 시각을 확정하지 않음. SRC-2052는 일본측 진술의 번역 수록이지 독립 일본 원면 직접 열람은 아님.
3. **6/5**: NHHC는 미 TF16의 서쪽 추격과 요크타운 구조 시도, 아카기·히류의 일본측 자침을 기술한다. 이는 6/4 피격의 후속 단계로 기존 사건의 설명에 포함하고 새 EVT를 만들지 않음.
4. **6/6**: [NHHC 공식 전투사](https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/b/battle-of-midway-4-7-june-1942.html)는 미쿠마 침몰·모가미 손상, 일본 I-168 어뢰로 하만 침몰·요크타운 추가 피격을 구분한다. 요크타운 실제 침몰은 **6/7**이므로 6/6에 침몰했다고 쓰지 않음. **EVT-3618**. 미측 당대 서술의 모가미 침몰 주장은 확정 전과로 채택하지 않음.

## BACKFILL_QUEUE
- **RQ-1232**: 일본어 원작전일지·미군 함정 피해 보고·각 전과 집계 차이, 알류샨 애투/키스카 점령 시각 재검증. 동부전선·중국·버마·북아프리카·점령 민간인·학살·경제는 이번 3일간 미대조이며 세계 전수완료 아님.
- **RQ-1230**: 6/4 더치하버 공보 정정은 기존 과제에 남김.

## 증분 검산
신규 EVT 3617~3618 2건, SRC 2051~2052 2건, RQ 1232 1건. 누적 3618/2052/1232. 루트 출처·백로그와 research 미러 동일 내용 적용. 다음 FORWARD_CURSOR **1942-06-07**. 검증 스크립트 로컬 실행 여부는 게시 후 결과에 따라 별도 판단.
