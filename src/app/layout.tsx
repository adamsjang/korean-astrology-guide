import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://korean-astrology-guide.pages.dev";

export const metadata: Metadata = {
  title: {
    default: "운세 참고서",
    template: "%s | 운세 참고서",
  },
  description:
    "명리학·별자리·타로·꿈해몽을 교육적으로 해설하는 정보성 콘텐츠 사이트입니다.",
  keywords: ["운세", "사주", "명리학", "별자리", "타로", "꿈해몽", "궁합"],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "운세 참고서",
    locale: "ko_KR",
    type: "website",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKr.variable} h-full`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3758936086172142"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
