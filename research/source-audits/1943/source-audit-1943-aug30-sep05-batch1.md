# 1943-08-30~09-05 forward 사료감사 (2026-11-18)

## 원격 정본·중복 점검
- 기준 HEAD `b6c5743ee101aaab9bf1c7a6c2e161792cf378e0`; WORK_STATE와 PROGRESS_LEDGER 최종 커서 `1943-08-30`, 누적 3709/2181/1262 일치 확인. 직전 HEAD CI `44103491148` 성공 확인.
- 기존 9/3 카시빌레 서명 EVT-0186은 신규 생성하지 않고 보강. 9/3 베이타운 상륙은 기존 연표에서 독립 EVT가 없어 EVT-3710으로 신규 등록. SRC-2182~2184 URL 및 RQ-1263의 기존 ID 중복 없음(기존 등록부 말미와 대상 연도 행 대조).

## 사료·교차 확인
- [FRUS 당대 문서 616](https://history.state.gov/historicaldocuments/frus1943/d616): 9월 3일 카시빌레 서명을 17:30으로 기록하며 서명 당사자 카스텔라노·스미스를 특정. [Yale Avalon 원문](https://avalon.law.yale.edu/wwii/italy01.asp): 군사휴전 조항과 서명일·당사자 확인. 문서의 '발효' 표현은 9/8 공개 발표·군사적 시행과 동일하다고 단정하지 않음.
- [History of War 베이타운](https://www.historyofwar.org/articles/operation_baytown.html): 9/3 제8군 제13군단 칼라브리아 상륙과 독일군 지연전을 후대 전사로 설명. 작전일지 원전이 아니므로 병력·손실 상세는 유보.
- [이탈리아 저항박물관](https://museonazionaleresistenza.it/story/armistizio/)은 서명 시각을 17:00으로 제시해 FRUS 17:30과 차이. RQ-1263으로 추적하며 확정 시각은 연표에 쓰지 않음.

## 범위·한계 및 backfill
- 8/30~9/5 선별 확인은 카시빌레 휴전과 이탈리아 본토 상륙에 집중. 동부전선·중국·버마·태평양·대서양·아프리카·점령·민간인·경제는 전수 조사하지 못함. 기존 RQ-0003/RQ-0007 및 신규 RQ-1263을 BACKFILL_QUEUE로 지정; 동일 기간 정규 forward 반복 금지.
- 신규 EVT/SRC/RQ 1/3/1, 누적 3710/2184/1263, 다음 커서 1943-09-06. 루트·research 3개 미러 바이트 동일, 연표 날짜 순서·출처 상태·SRC 링크 확인. 로컬 전체 validate_index.py 미실행(저장소 스냅샷 접근 실패); 원격 CI 확인 필요.
