/**
 * Suggest free Wikimedia Commons images for category default images.
 *
 * Run: node scripts/suggest-category-images.mjs
 *
 * Prints up to 5 candidate image URLs per category. Copy the best fit into
 * src/lib/categories.ts as the `image:` field on the matching category entry.
 *
 * Only suggests for the 6 text-heavy categories that currently lack images.
 * Visual-by-nature categories (dream/palmistry/physiognomy/tarot/zodiac-animal)
 * already have per-post images.
 */

const KEYWORD_MAP = {
  "fortune-guide": ["taegeuk korea", "taegeuk symbol", "korean folk painting"],
  column: ["yin yang symbol", "wuxing diagram", "five phases chinese"],
  compatibility: ["bagua diagram", "wuxing five elements", "yi jing hexagram"],
  ilju: ["sexagenary cycle", "ganzhi chinese", "chinese calendar wheel"],
  learn: ["bagua trigrams", "i ching diagram", "korean dancheong pattern"],
  zodiac: ["zodiac wheel", "horoscope wheel", "astrological chart"],
};

async function searchCommons(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrlimit: "5",
      gsrnamespace: "6",
      prop: "imageinfo",
      iiprop: "url|extmetadata|size",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    }).toString();

  const res = await fetch(url, {
    headers: {
      "User-Agent": "korean-astrology-guide-image-suggester/1.0 (educational)",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for "${query}"`);
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .filter((p) => {
      const ext = (p.imageinfo?.[0]?.url || "").toLowerCase();
      return /\.(jpe?g|png|webp)$/.test(ext);
    })
    .map((p) => ({
      title: p.title,
      url: p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url,
      fullUrl: p.imageinfo?.[0]?.url,
      width: p.imageinfo?.[0]?.thumbwidth,
      height: p.imageinfo?.[0]?.thumbheight,
    }));
}

async function main() {
  for (const [cat, keywords] of Object.entries(KEYWORD_MAP)) {
    console.log(`\n=== ${cat} ===`);
    for (const kw of keywords) {
      try {
        const hits = await searchCommons(kw);
        console.log(`  [query: ${kw}]`);
        if (hits.length === 0) {
          console.log("    (no image results)");
          continue;
        }
        for (const h of hits) {
          console.log(`    - ${h.url}`);
          console.log(`      title: ${h.title}`);
        }
      } catch (e) {
        console.log(`  [query: ${kw}] failed: ${e.message}`);
      }
    }
  }
  console.log("\nDone. Copy a URL into src/lib/categories.ts as `image: \"...\"`.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
