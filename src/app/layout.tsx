import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhushan Gowda — Full-Stack Developer",
  description:
    "Portfolio of Bhushan Gowda, a full-stack developer crafting cinematic, high-performance web experiences.",
};

export const viewport = {
  themeColor: "#030305",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
