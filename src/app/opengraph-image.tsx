import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "운세 참고서 — 명리학·별자리·타로·꿈해몽 가이드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF8F5";
const SURFACE = "#FFFFFF";
const ACCENT = "#8B6914";
const PRIMARY = "#2C1810";
const SECONDARY = "#6B5744";

const ELEMENTS = [
  { label: "목", color: "#2d6a4f" },
  { label: "화", color: "#c0392b" },
  { label: "토", color: "#9a7d3a" },
  { label: "금", color: "#7f8c8d" },
  { label: "수", color: "#1d3557" },
];

export default async function Image() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.otf")),
    readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Regular.otf")),
  ]);

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
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <p
              style={{
                fontSize: 26,
                letterSpacing: 6,
                color: ACCENT,
                margin: 0,
                fontWeight: 700,
              }}
            >
              KOREAN ASTROLOGY GUIDE
            </p>
            <p
              style={{
                fontSize: 34,
                color: SECONDARY,
                margin: 0,
                letterSpacing: 1,
              }}
            >
              명리학 · 별자리 · 타로 · 꿈해몽 · 손금 · 관상
            </p>
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
              fontSize: 92,
              fontWeight: 700,
              color: PRIMARY,
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            운세 참고서
          </p>
          <p
            style={{
              fontSize: 32,
              color: SECONDARY,
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 1000,
            }}
          >
            운명을 정해 주는 잣대가 아닌, 자신을 이해하기 위한 도구로 운세를 풀어
            드리는 정보형 가이드 사이트입니다.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 22,
            borderTop: `1px solid ${ACCENT}40`,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {ELEMENTS.map((el) => (
              <div
                key={el.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: SURFACE,
                  border: `1px solid ${el.color}50`,
                  fontSize: 22,
                  color: el.color,
                  fontWeight: 700,
                }}
              >
                {el.label}
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 22,
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
