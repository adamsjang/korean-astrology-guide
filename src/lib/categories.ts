export interface Category {
  slug: string;
  title: string;
  description: string;
  color: string;
}

export const CATEGORIES: Record<string, Category> = {
  "fortune-guide": {
    slug: "fortune-guide",
    title: "운세 이용 가이드",
    description: "운세를 현명하게 활용하는 방법",
    color: "#8B6914",
  },
  dream: {
    slug: "dream",
    title: "꿈해몽",
    description: "꿈의 의미를 해석하는 방법",
    color: "#4A6741",
  },
  zodiac: {
    slug: "zodiac",
    title: "별자리",
    description: "별자리와 점성술 기초",
    color: "#1B3A6B",
  },
  tarot: {
    slug: "tarot",
    title: "타로",
    description: "타로카드 해석 가이드",
    color: "#6B2D5E",
  },
  palmistry: {
    slug: "palmistry",
    title: "손금",
    description: "손금으로 보는 성향 해석",
    color: "#5C4A3A",
  },
  physiognomy: {
    slug: "physiognomy",
    title: "관상",
    description: "전통 관상학 기초 해설",
    color: "#5C4A3A",
  },
  learn: {
    slug: "learn",
    title: "명리학 기초",
    description: "사주와 명리학의 기본 개념",
    color: "#2C4A1E",
  },
  compatibility: {
    slug: "compatibility",
    title: "궁합 해석법",
    description: "사주 궁합을 보는 기준과 방법",
    color: "#4A2C6E",
  },
  column: {
    slug: "column",
    title: "연애·관계 칼럼",
    description: "명리학으로 보는 관계 이야기",
    color: "#7A3D2A",
  },
  "zodiac-animal": {
    slug: "zodiac-animal",
    title: "띠별 운세",
    description: "십이지 띠의 성격과 관계 성향",
    color: "#8B4513",
  },
};

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES[slug];
}

export const ALL_CATEGORY_SLUGS = Object.keys(CATEGORIES);
