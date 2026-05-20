# 사주 계산기 설계 문서

## 핵심 발견: korean-lunar-calendar 패키지 활용

`korean-lunar-calendar` (MIT, KARI 기준, 1000~2050 지원)의 `getKoreanGapja()` 메서드가
절기 기반 월주 + 일주를 직접 반환함 → 절기 오차 문제 해결됨.

```js
calendar.setSolarDate(2017, 6, 24);
calendar.getKoreanGapja();
// → { year: "정유년", month: "병오월", day: "임오일" }
```

연도/월/일 간지를 문자열 파싱으로 stemIdx/branchIdx 변환.
시주만 직접 계산 (일간 → 시간 공식).

---

## 파일 구조

```
src/lib/saju/
  constants.ts   ← 천간/지지/오행/동물/색상 데이터
  types.ts       ← 공유 타입 (SajuInput, Pillar, SajuResult)
  pillars.ts     ← 사주 계산 (korean-lunar-calendar wrapper + 시주)
  compare.ts     ← 궁합 비교 로직 (TODO)

src/components/saju/
  DateInput.tsx     ← 양력/음력 토글 + 날짜 + 시간 + 이름(궁합용) + 성별
  PillarGrid.tsx    ← 4기둥 그리드 (mobile: 2×2, desktop: 4×1)
  PillarCard.tsx    ← 개별 기둥 카드
  ElementChart.tsx  ← 오행 분포 바 차트

src/app/
  saju-calculator/
    page.tsx         ← 서버 래퍼 + metadata
    SajuCalculator.tsx
  gunghap/
    page.tsx
    GunghapChecker.tsx
```

---

## 타입 설계

```typescript
// types.ts

export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hourBranch?: number;       // 0-11 (자축인묘...), undefined=시주 없음
  gender?: "male" | "female"; // 대운 방향 계산용 (나중)
  name?: string;             // 궁합 레이블용
  calendar: "solar" | "lunar";
  isLeapMonth?: boolean;     // 음력 윤달 여부
}

export interface Pillar {
  stemIdx: number;   // 0-9 (갑~계)
  branchIdx: number; // 0-11 (자~해)
}

export interface SajuResult {
  input: SajuInput;          // 원본 입력 (round-trip용)
  solarDate: { year: number; month: number; day: number }; // 양력 변환 결과
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour?: Pillar;
  // 확장 슬롯 (나중)
  // daeun?: DaeunPeriod[];
  // yongshin?: string;
}
```

---

## 계산 흐름

```
사용자 입력 (양력/음력)
  ↓ [음력인 경우] korean-lunar-calendar.setLunarDate() → getSolarCalendar()
  ↓ 양력 날짜 확보
  ↓ korean-lunar-calendar.setSolarDate() → getKoreanGapja()
  ↓ { year: "정유년", month: "병오월", day: "임오일" } 파싱
  ↓ stemIdx/branchIdx 추출
  ↓ [시간 있을 경우] 일간 → 시간 공식으로 시주 계산
  → SajuResult
```

---

## 궁합 설계 (compare.ts - 나중)

입력: SajuResult × 2
출력:
- 일간 오행 상생/상극 관계 (예: 壬수 vs 丁화 → 수극화)
- 일지 합충 여부 (6합/삼합/충)
- 오행 분포 비교 (A vs B 바 차트)

---

## 대운 확장 슬롯

SajuInput에 `gender` 필드 이미 포함.
대운은 출생일 → 가장 가까운 절기까지의 날 수 × (남양여음/남음여양) 로 계산.
절기 날짜 데이터는 korean-lunar-calendar가 내부적으로 갖고 있으나 public API 미노출.
→ 별도 절기 lookup table 필요 (1930-2050). 나중 구현 시 추가.

---

## UI/UX 설계

### 사주 계산기 페이지

1. 입력 카드 (하나의 박스)
   - 상단: 양력 | 음력 토글
   - 연도 / 월 / 일 / 성별(선택) — 가로 4분할
   - 시간 드롭다운 (12시, "모름" 포함) — 전체 폭
   - 계산 버튼

2. 결과 영역
   - 4기둥 카드 그리드
     - 모바일: 2×2 (년월 / 일시)
     - 데스크탑: 4×1
     - 일주 카드: 색상 테두리로 강조
   - 각 카드: 천간(큰 글자+오행색) / 구분선 / 지지(큰 글자+오행색) / 동물
   - 일간 요약 박스 (나를 나타내는 글자 설명)
   - 오행 분포 바 차트
   - 하단: 궁합 계산하기 → 링크

3. 주의사항 (disclaimer) 한 줄

### 궁합 페이지

- 좌우 2열 입력 (DateInput × 2) — 모바일에서는 위아래
- 계산 버튼
- 결과: 두 사람 4기둥 나란히 표시
- 일간 오행 관계 설명
- 오행 분포 비교 차트

### 공통 UX 원칙
- 오행 색상은 전 페이지 통일 (목=초록, 화=빨강, 토=황갈, 금=회색, 수=청남)
- 일주(나) 강조: 색상 테두리 + 배경 미세 차이
- 설명 텍스트: 단정하되 과도한 해석 금지 (사이트 톤 일치)
- 디스클레이머: 하단에 항상 표시

---

## 헤더 정리 제안

현재 네비게이션: 10 카테고리 + 꿈검색 + 타로뽑기 + (사주) + (궁합) = 14개
→ "도구" 항목 아래 드롭다운으로 묶기:
  - 사주 계산기
  - 궁합 보기
  - 타로 뽑기
  - 꿈 키워드 검색
