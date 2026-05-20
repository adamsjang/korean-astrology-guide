// (stemIdx, branchIdx) → ilju page slug
// 60갑자 전체 매핑
const ILJU_SLUGS: Record<string, string> = {
  "0-0":"gapja",    "1-1":"eulchuk",   "2-2":"byeongin",  "3-3":"jeongmyo",
  "4-4":"mujin",    "5-5":"gisa",      "6-6":"gyeongo",   "7-7":"sinmi",
  "8-8":"imsin",    "9-9":"gyeyu",     "0-10":"gabsul",   "1-11":"eulhae",
  "2-0":"byeongja", "3-1":"jeongchuk", "4-2":"muin",      "5-3":"gimyo",
  "6-4":"gyeongjin","7-5":"sinsa",     "8-6":"imo",       "9-7":"gyemi",
  "0-8":"gabsin",   "1-9":"eulyu",     "2-10":"byeongsul","3-11":"jeonghae",
  "4-0":"muja",     "5-1":"gichuk",    "6-2":"gyeongin",  "7-3":"sinmyo",
  "8-4":"imjin",    "9-5":"gyesa",     "0-6":"gabo",      "1-7":"eulmi",
  "2-8":"byeongsin","3-9":"jeongyu",   "4-10":"musul",    "5-11":"gihae",
  "6-0":"gyeongja", "7-1":"sinchuk",   "8-2":"imin",      "9-3":"gyemyo",
  "0-4":"gabjin",   "1-5":"eulsa",     "2-6":"byeongo",   "3-7":"jeongmi",
  "4-8":"musin",    "5-9":"giyu",      "6-10":"gyeongsul","7-11":"sinhae",
  "8-0":"imja",     "9-1":"gyechuk",   "0-2":"gabin",     "1-3":"eulmyo",
  "2-4":"byeongjin","3-5":"jeongsa",   "4-6":"muo",       "5-7":"gimi",
  "6-8":"gyeongsin","7-9":"sinyu",     "8-10":"imsul",    "9-11":"gyehae",
};

export function getIljuSlug(stemIdx: number, branchIdx: number): string | null {
  return ILJU_SLUGS[`${stemIdx}-${branchIdx}`] ?? null;
}
