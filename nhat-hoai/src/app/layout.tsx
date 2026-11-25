import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL || "https://test.aiempie.cloud"),
  title: "Thiệp Mời Đám Cưới - Nhật & Hoài",
  description: "Trân trọng kính mời bạn đến tham dự lễ thành hôn của chúng tôi",
  openGraph: {
    type: "website",
    title: "Thiệp Mời Đám Cưới - Nhật & Hoài",
    description: "Trân trọng kính mời bạn đến tham dự lễ thành hôn của chúng tôi",
    images: ["/asset/img/aaa.PNG"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#180208",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${beVietnamPro.variable} ${playfairDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
