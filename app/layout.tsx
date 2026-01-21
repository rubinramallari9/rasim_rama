import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Rasim Rama | Hydropower Engineering",
  description: "Professional turbine installation, assembly, maintenance, and generator repairs. 15+ years of hydropower engineering excellence in Albania and beyond.",
  keywords: ["hydropower", "turbine installation", "hydrocentral", "Albania", "generator repair", "maintenance"],
  authors: [{ name: "Rasim Rama" }],
  openGraph: {
    title: "Rasim Rama | Hydropower Engineering",
    description: "Professional turbine installation, assembly, maintenance, and generator repairs.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for API */}
        <link rel="dns-prefetch" href="//localhost:8000" />
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased overflow-x-hidden w-full max-w-[100vw]`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="overflow-x-hidden">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}