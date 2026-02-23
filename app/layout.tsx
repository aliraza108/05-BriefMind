import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ToastProvider } from "@/components/shared/toast";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "BriefMind | AI Executive Briefing Generator",
  description: "Turn dense documents into executive intelligence in minutes."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${plexMono.variable}`}>
        <ToastProvider>
          <div className="relative min-h-screen overflow-x-hidden bg-brand-bg">
            <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-35" />
            <div className="relative z-10">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}

