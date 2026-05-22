export interface Category {
  slug: string;
  title: string;
  description: string;
  intro: string;
  color: string;
  /** Default image URL used by ArticleCard when a post has no `image` of its own. */
  image?: string;
  /** Slugs of categories to surface as "관련 카테고리" cross-links. Curated for topical relatedness. */
  related: string[];
}

export const CATEGORIES: Record<string, Category> = {
  "fortune-guide": {
    slug: "fortune-guide",
    title: "운세 이용 가이드",
    description: "운세를 현명하게 활용하는 방법",
    intro: "사주·타로·꿈해몽 등 다양한 운세 도구를 처음 접하는 분들을 위한 실용 가이드입니다. 운세 결과를 맹신하지 않고 자기 이해의 도구로 활용하는 방법, 좋은 상담을 고르는 기준, 운세를 현명하게 대하는 관점을 다룹니다. 운세는 정해진 운명이 아닌 자신을 돌아보는 하나의 참고 자료입니다.",
    color: "#8B6914",
    related: ["learn", "dream", "tarot"],
  },
  dream: {
    slug: "dream",
    title: "꿈해몽",
    description: "꿈의 의미를 해석하는 방법",
    intro: "꿈에서 본 것이 무엇을 의미하는지 궁금하다면 이곳에서 찾아보세요. 동물·자연·사람·상황 등 다양한 꿈 주제를 한국 전통 해몽과 심리학적 관점으로 해설합니다. 꿈해몽 키워드 검색 도구를 이용하면 원하는 해몽을 빠르게 찾을 수 있습니다.",
    color: "#4A6741",
    related: ["tarot", "physiognomy", "fortune-guide"],
  },
  zodiac: {
    slug: "zodiac",
    title: "별자리",
    description: "별자리와 점성술 기초",
    intro: "서양 점성술의 12별자리(양자리~물고기자리)를 교육적으로 소개합니다. 각 별자리의 원소·지배 행성·성격 특성부터 연애 스타일, 잘 맞는 별자리 궁합까지 다룹니다. 별자리 해석은 자기 이해를 위한 참고 관점으로 활용할 때 가장 유익합니다.",
    color: "#1B3A6B",
    related: ["zodiac-animal", "tarot", "fortune-guide"],
  },
  tarot: {
    slug: "tarot",
    title: "타로",
    description: "타로카드 해석 가이드",
    intro: "메이저 아르카나 22장을 포함한 타로 카드의 상징과 의미를 해설합니다. 라이더-웨이트 덱 기준으로 각 카드의 정방향·역방향 해석과 실생활 활용법을 설명합니다. 타로는 절대적 예언이 아닌 직관과 성찰을 돕는 참고 도구입니다.",
    color: "#6B2D5E",
    related: ["zodiac", "dream", "fortune-guide"],
  },
  palmistry: {
    slug: "palmistry",
    title: "손금",
    description: "손금으로 보는 성향 해석",
    intro: "수상학(手相學)에서 손의 선과 언덕이 나타내는 기질적 경향을 해설합니다. 생명선·감정선·두뇌선·운명선 등 주요 손금 선과 손 모양 타입, 손의 언덕을 교육적으로 소개합니다. 손금 해석은 성격과 기질을 성찰하는 하나의 참고 관점으로 활용합니다.",
    color: "#5C4A3A",
    related: ["physiognomy", "fortune-guide", "learn"],
  },
  physiognomy: {
    slug: "physiognomy",
    title: "관상",
    description: "전통 관상학 기초 해설",
    intro: "전통 관상학(觀相學)에서 얼굴 각 부위가 나타내는 의미를 설명합니다. 이마·눈·코·입·귀·턱 등 부위별 해석과 얼굴형·광대뼈 등 전체 균형을 교육적으로 다룹니다. 관상은 외모를 평가하는 기준이 아닌 자기 이해의 참고 자료로 활용하는 것이 바람직합니다.",
    color: "#5C4A3A",
    related: ["palmistry", "dream", "fortune-guide"],
  },
  learn: {
    slug: "learn",
    title: "명리학 기초",
    description: "사주와 명리학의 기본 개념",
    intro: "사주와 명리학을 처음 공부하는 분들을 위한 기초 개념 시리즈입니다. 음양·오행부터 천간·지지, 사주팔자 구조, 십성·대운·용신까지 단계적으로 설명합니다. 기초 이론을 갖추면 사주 계산 결과를 스스로 이해하고 비판적으로 활용할 수 있습니다.",
    color: "#2C4A1E",
    related: ["ilju", "compatibility", "column"],
  },
  compatibility: {
    slug: "compatibility",
    title: "궁합 해석법",
    description: "사주 궁합을 보는 기준과 방법",
    intro: "명리학에서 두 사람의 사주를 비교해 관계의 특성을 파악하는 궁합 해석법을 소개합니다. 일간 오행 관계, 일지 합충, 오행 분포 비교 등 궁합을 보는 다양한 기준을 설명합니다. 궁합은 관계를 단정 짓는 판정이 아니라 두 사람의 에너지 방향을 이해하는 참고 자료입니다.",
    color: "#4A2C6E",
    related: ["learn", "column", "zodiac-animal"],
  },
  column: {
    slug: "column",
    title: "연애·관계 칼럼",
    description: "명리학으로 보는 관계 이야기",
    intro: "명리학 십성과 오행을 활용해 연애와 인간관계의 패턴을 분석하는 칼럼 시리즈입니다. 비겁·식상·재성·관성·인성 등 십성별 연애 특징부터 일간별 성향, 결혼 타이밍까지 다룹니다. 사주를 통해 나와 상대의 관계 패턴을 더 입체적으로 이해할 수 있습니다.",
    color: "#7A3D2A",
    related: ["compatibility", "ilju", "learn"],
  },
  "zodiac-animal": {
    slug: "zodiac-animal",
    title: "띠별 운세",
    description: "십이지 띠의 성격과 관계 성향",
    intro: "십이지(十二支) 12가지 동물 띠의 성격 특성과 연애 방식을 명리학 관점에서 해설합니다. 각 띠의 기본 에너지(오행·지지)를 바탕으로 성향과 관계 패턴, 육합·삼합·충 기반의 띠 궁합을 설명합니다. 띠별 해석은 개인의 기질을 이해하는 하나의 참고 관점으로 활용합니다.",
    color: "#8B4513",
    related: ["compatibility", "ilju", "zodiac"],
  },
  ilju: {
    slug: "ilju",
    title: "일주 완전 가이드",
    description: "60갑자 일주별 성격·연애·직업 특징",
    intro: "60갑자의 일주(日柱)별 성격 특징과 기질을 명리학 관점에서 해설합니다. 사주에서 나를 나타내는 일주는 천간(天干)과 지지(地支)의 조합으로 이루어지며, 각 조합은 고유한 에너지와 기질을 나타냅니다. 자신의 일주를 찾아 기질과 특성을 이해해 보세요.",
    color: "#4A5568",
    related: ["learn", "column", "zodiac-animal"],
  },
};

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES[slug];
}

export function getRelatedCategories(slug: string): Category[] {
  const cat = CATEGORIES[slug];
  if (!cat) return [];
  return cat.related
    .map((s) => CATEGORIES[s])
    .filter((c): c is Category => Boolean(c));
}

export const ALL_CATEGORY_SLUGS = Object.keys(CATEGORIES);
