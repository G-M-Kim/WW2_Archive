# 1943-09-06~12 forward 사료감사 (2026-11-18)

## 중복·정본 대조
- 기준 HEAD 63281f1c72c239ccde300c22c6bf5e2be26fc13f; WORK_STATE와 PROGRESS_LEDGER 최종 커서 1943-09-06 일치. 기존 EVT-0187(9/8 휴전 공표), EVT-0188(9/9 살레르노 상륙) 보강, 신규 EVT 없음.
- 기존 SRC-2184(휴전 협정 원문) 및 SRC-021 유지. 신규 FRUS d610, NHHC 자료 URL의 기존 SRC 등록부 중복 없음. 신규 SRC-2185/2186 등록. 기존 RQ-1263이 휴전 서명/발효/공표 시점 쟁점을 포괄하여 신규 RQ 생성하지 않음.

## 사료 확인 및 구분
- [FRUS 1943 Document 610](https://history.state.gov/historicaldocuments/frus1943/d610): 9월 7일 미·영 측 휴전 공표 준비 관련 당대 전문. 9월 8일 알제 방송 계획과 실제 방송, 9월 3일 비밀 서명은 동일 사건일이 아니다. 예정 시각을 실행 확정 시각으로 옮기지 않음.
- [NHHC 공식 역사해설](https://www.history.navy.mil/content/history/museums/nmusn/explore/photography/wwii/wwii-europe/italian-campaign/allied-invasion-mainland-italy.html): 9월 9일 살레르노 연합군 상륙과 해군 지원 설명. 후대 해설로 취급하고 함정별 전투상보·손실 수치 원전 대조는 유보.
- [USNI Proceedings 1953 휴잇 회고](https://www.usni.org/magazines/proceedings/1953/september/allied-navies-salerno-operation-avalanche-september-1943): 지휘관 사후 회고로서 독립적인 당대 항해일지와 구별; 별도 SRC 등록은 보류.
- 기존 [Yale Avalon 휴전 원문](https://avalon.law.yale.edu/wwii/italy01.asp) SRC-2184는 9/3 서명·조항의 근거이며 9/8 방송 실황의 직접 근거는 아님.

## 색인 및 미완료
- EVT-0187: 휴전 발표/서명/군사이행 분리, SRC-2185/2184 연결. EVT-0188: 제5군 상륙과 해군 지원 보강, SRC-021/2186 연결. 상태 문헌대조.
- RQ-1263: 9/3 서명시각·9/8 방송/발효 및 살레르노 당대 부대일지 교차 검증 계속. 9/12 그란사소 작전과 중국·버마·동부전선·태평양·대서양·아프리카·점령·민간인·경제 미검증 범위는 RQ-0003/RQ-0007 BACKFILL_QUEUE로 이관. 이번 기간 전세계 전수완료 아님.
- 신규 EVT/SRC/RQ = 0/2/0; 누적 3710/2186/1263. 0 EVT는 두 사건 모두 기존 ID로 등록된 때문이며, 0 RQ는 기존 RQ-1263 및 범위 백로그가 포괄하기 때문. 다음 커서 1943-09-13.
- 루트와 research 미러 동시 변경, 날짜 정렬·출처 상태·참조 및 원장 커서 교차 검사. 전체 로컬 validate_index.py 미실행(로컬 Git DNS로 전체 저장소 스냅샷 확보 실패); 게시 SHA CI 별도 확인.
