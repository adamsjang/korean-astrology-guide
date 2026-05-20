export const STEMS     = ["갑","을","병","정","무","기","경","신","임","계"] as const;
export const STEMS_H   = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"] as const;
export const BRANCHES  = ["자","축","인","묘","진","사","오","미","신","유","술","해"] as const;
export const BRANCHES_H= ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"] as const;
export const ANIMALS   = ["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"] as const;

// 천간 오행: 갑을=목, 병정=화, 무기=토, 경신=금, 임계=수
export const STEM_EL   = ["목","목","화","화","토","토","금","금","수","수"] as const;
// 지지 오행: 자=수, 축=토, 인=목, 묘=목, 진=토, 사=화, 오=화, 미=토, 신=금, 유=금, 술=토, 해=수
export const BRANCH_EL = ["수","토","목","목","토","화","화","토","금","금","토","수"] as const;
// 음양: 갑병무경임=양(짝수idx), 을정기신계=음(홀수idx)
export const STEM_YY   = ["양","음","양","음","양","음","양","음","양","음"] as const;
export const BRANCH_YY = ["양","음","양","음","양","음","양","음","양","음","양","음"] as const;

export type Element = "목"|"화"|"토"|"금"|"수";

export const ELEMENT_COLOR: Record<Element, string> = {
  목: "#2d6a4f",
  화: "#c0392b",
  토: "#9a7d3a",
  금: "#6c757d",
  수: "#1a5276",
};

export const ELEMENT_BG: Record<Element, string> = {
  목: "#2d6a4f22",
  화: "#c0392b22",
  토: "#9a7d3a22",
  금: "#6c757d22",
  수: "#1a527622",
};

export const HOUR_OPTIONS = [
  { label: "모름 (시주 제외)",       branch: undefined },
  { label: "자시 (子) 23:00~01:00", branch: 0 },
  { label: "축시 (丑) 01:00~03:00", branch: 1 },
  { label: "인시 (寅) 03:00~05:00", branch: 2 },
  { label: "묘시 (卯) 05:00~07:00", branch: 3 },
  { label: "진시 (辰) 07:00~09:00", branch: 4 },
  { label: "사시 (巳) 09:00~11:00", branch: 5 },
  { label: "오시 (午) 11:00~13:00", branch: 6 },
  { label: "미시 (未) 13:00~15:00", branch: 7 },
  { label: "신시 (申) 15:00~17:00", branch: 8 },
  { label: "유시 (酉) 17:00~19:00", branch: 9 },
  { label: "술시 (戌) 19:00~21:00", branch: 10 },
  { label: "해시 (亥) 21:00~23:00", branch: 11 },
] as const;
