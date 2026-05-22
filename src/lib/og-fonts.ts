import { readFile } from "node:fs/promises";
import { join } from "node:path";

type FontPair = { bold: Buffer; regular: Buffer };

let cache: FontPair | null = null;

export async function loadOgFonts(): Promise<FontPair> {
  if (cache) return cache;
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.otf")),
    readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Regular.otf")),
  ]);
  cache = { bold, regular };
  return cache;
}
