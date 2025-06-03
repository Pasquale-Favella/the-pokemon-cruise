import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { JotaiProvider } from "@/providers/jotai-provider";
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
  title: "Pokemon Cruise - Book Your Pokemon-Themed Adventure",
  description: "Discover and book unique, immersive cruise experiences inspired by the world of Pokemon. Explore regions like Kanto, Johto, and Hoenn on themed luxury cruises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <JotaiProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
