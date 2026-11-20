import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
