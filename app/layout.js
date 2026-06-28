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

export const metadata = {
  metadataBase: new URL("https://dance-camp.example.com"),
  title: "Heart, dance, return to nature.",
  description:
    "A four-day dance retreat in the forest. Movement, music and stillness — where dance becomes a way of living. 森の中の4日間のダンスリトリート。",
  openGraph: {
    title: "Heart, dance, return to nature.",
    description:
      "A four-day dance retreat in the forest. Movement, music and stillness.",
    type: "website",
  },
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
