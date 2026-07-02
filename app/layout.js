import {
  Cormorant_Garamond,
  Hanken_Grotesk,
  Space_Mono,
  Noto_Sans_JP,
  Noto_Serif_JP,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";

// Direction: refined editorial (A) with delicate Cormorant display type (C vibe).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body sans with more character than Inter (lifts the $10K feel).
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp-sans",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jp-serif",
  display: "swap",
});

const SITE_URL = "https://mumudancecamp.com";
const OG_DESC =
  "長野・松本 四賀で開催するダンスリトリート「Dance Camp」。自然の中で身体をひらき、感覚を取り戻す3日間。";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Heart, dance, return to nature.",
    template: "%s | Dance Camp",
  },
  description:
    OG_DESC +
    " A dance retreat in the forests of Matsumoto, Nagano — where movement becomes a way of living.",
  keywords: [
    "Dance Camp",
    "ダンスキャンプ",
    "ダンスリトリート",
    "リトリート",
    "コンテンポラリーダンス",
    "松本",
    "四賀",
    "長野",
    "自然",
    "ワークショップ",
    "dance retreat",
    "Matsumoto",
    "Nagano",
  ],
  authors: [{ name: "Creative Art Village - Aida" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Dance Camp",
    locale: "ja_JP",
    url: SITE_URL,
    title: "Dance Camp — Heart, dance, return to nature.",
    description: OG_DESC,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Dance Camp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dance Camp — Heart, dance, return to nature.",
    description: OG_DESC,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#1F2A24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${hanken.variable} ${spaceMono.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <div className="grain animate-grain" aria-hidden="true" />
        </LanguageProvider>
      </body>
    </html>
  );
}
