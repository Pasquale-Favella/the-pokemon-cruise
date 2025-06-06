import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { JotaiProvider } from "@/providers/jotai-provider";
import "./globals.css";
import Chatbot from "@/components/Chatbot"; // Import Chatbot component


const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
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
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <JotaiProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Chatbot /> {/* Add Chatbot component here */}
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
