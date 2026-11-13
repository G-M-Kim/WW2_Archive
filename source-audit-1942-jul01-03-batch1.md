# 사료감사 — 1942-07-01~03 (forward, 2026-11-14)

## 정본 중복 검사 및 결론
- 이전 HEAD 2db47fbc17dd65b93f4a428d1bab058bbe6df1ef; WORK_STATE/ledger 다음 커서 1942-07-01 일치. 기존 EVT-0150(7/1 제1차 엘알라메인 시작, 미등록) 발견하여 **신규 EVT로 중복 생성하지 않고 근거 보강**. SRC-2063 URL은 기존 출처 등록부에 없음을 확인.
- 6/29 세바스토폴 만 남안 기습은 기존 EVT-3626이며, 7/1 도시·항구 점령은 독립 단계 EVT-3627로 분리. 기존 SRC-2062 재사용(중복 SRC 생성하지 않음), 기존 RQ-1237이 7/1과 7/4의 구분·포로 및 민간인 피해 검증을 포괄하여 신규 RQ 불필요.

## 출처별 확인
1. 독일 역사박물관 DHM, Arnulf Scriba, *Die Eroberung von Sewastopol 1942* (2015-05-19), https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/kriegsverlauf/eroberung-von-sewastopol-1942 : 6/29 세베르나야 만 기습, 7/1 시가지·항구 점령, 7/4 헤르소네스 잔여 교두보 상실을 **각각 별도 단계**로 기술. 97,000 포로 수는 당대 원문 미대조이므로 이번 사건행에 확정치로 넣지 않음. 기존 SRC-2062 재사용.
2. Australian War Memorial, *Battles of El Alamein*, https://www.awm.gov.au/collection/E84345 : 7/1 롬멜군의 제8군 방어선 첫 공격, 7/4까지 저지. 후대 기관 전투사로서 SRC-2063 신규 등록; 원본 부대 전쟁일지는 미열람. 10~11월 제2차 엘알라메인 전투와 구별.
3. Anzac Memorial NSW, Peter Stanley, *Australians and the battles of El Alamein, 1942*, https://www.anzacmemorial.nsw.gov.au/our-stories/our-stories/australians-and-battles-el-alamein-1942 : 7월 방어전과 10~11월 공격전 구분을 보조 대조. 별도 SRC 미등록(동일 쟁점에 대한 후대 설명; 이번 배치 필수 신규 링크는 AWM 한 건).

## 미완료 / BACKFILL_QUEUE
- 7/2~3 중국·태평양·대서양·점령지·아프리카 각 전역의 당대 문서에 대한 독립 교차는 이번 선별조사에서 완료하지 못함. 검증되지 않은 후보를 사건으로 생성하지 않음. 기존 포괄 RQ-0007 및 세바스토폴 RQ-1237에 연결해 backfill; 7/1 엘알라메인 부대별 전투일지·사상자/장비 숫자는 후속 교차 필요.
- 조사 범위는 7/1 주요 두 전역 중심의 **부분조사**이며 7/2~3 전세계 무사건을 의미하지 않음. 기본 forward 커서는 다음 미방문 7/4로 이동.

## 등록 증분
EVT +1 (EVT-3627), SRC +1 (SRC-2063), RQ +0 (기존 RQ-1237/RQ-0007). 기존 EVT-0150 보강. 누적 3627/2063/1237. 루트와 research 미러 동일 내용으로 준비.
