import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { getCategory } from "@/lib/categories";
import { loadOgFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";
export const dynamicParams = false;
export const alt = "운세 참고서";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF8F5";
const ACCENT = "#8B6914";
const PRIMARY = "#2C1810";
const SECONDARY = "#6B5744";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export default async function Image({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  const cat = getCategory(category);
  const { bold, regular } = await loadOgFonts();

  const title = post?.title ?? "운세 참고서";
  const description = post?.description ?? "";
  const catLabel = cat?.title ?? category;
  const catColor = cat?.color ?? ACCENT;
  const date = post?.publishedAt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          padding: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <p
              style={{
                fontSize: 22,
                letterSpacing: 4,
                color: ACCENT,
                margin: 0,
                fontWeight: 700,
              }}
            >
              KOREAN ASTROLOGY GUIDE
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderRadius: 999,
                background: `${catColor}1a`,
                border: `1px solid ${catColor}50`,
                alignSelf: "flex-start",
              }}
            >
              <p
                style={{
                  fontSize: 26,
                  color: catColor,
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {catLabel}
              </p>
            </div>
          </div>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 999,
              border: `2px solid ${ACCENT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              color: ACCENT,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            運
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <p
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: PRIMARY,
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: -1,
            }}
          >
            {truncate(title, 60)}
          </p>
          {description && (
            <p
              style={{
                fontSize: 28,
                color: SECONDARY,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: 1050,
              }}
            >
              {truncate(description, 110)}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTop: `1px solid ${ACCENT}40`,
          }}
        >
          <p
            style={{
              fontSize: 22,
              color: SECONDARY,
              margin: 0,
              letterSpacing: 1,
            }}
          >
            운세 참고서 {date ? `· ${date}` : ""}
          </p>
          <p
            style={{
              fontSize: 20,
              color: SECONDARY,
              margin: 0,
              letterSpacing: 1,
            }}
          >
            korean-astrology-guide.pages.dev
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: regular, style: "normal", weight: 400 },
        { name: "Noto Sans KR", data: bold, style: "normal", weight: 700 },
      ],
    }
  );
}
