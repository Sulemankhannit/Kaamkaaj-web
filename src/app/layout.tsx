import type { Metadata } from "next";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const chakraPetch = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KaamKaaj | The Accountability RPG",
  description: "To-do lists rely on willpower. KaamKaaj relies on photographic proof, an AI Game Master, and real XP stakes.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${geistSans.variable} ${geistMono.variable} h-[100dvh] antialiased dark scroll-smooth`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/25 selection:text-primary">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
