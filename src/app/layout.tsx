import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: {
    default: "운세 참고서",
    template: "%s | 운세 참고서",
  },
  description:
    "명리학·별자리·타로·꿈해몽을 교육적으로 해설하는 정보성 콘텐츠 사이트입니다.",
  keywords: ["운세", "사주", "명리학", "별자리", "타로", "꿈해몽", "궁합"],
  openGraph: {
    siteName: "운세 참고서",
    locale: "ko_KR",
    type: "website",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3758936086172142"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
