import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Base URL for the site - update this to your production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rasimrama.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Rasim Rama | Hydropower Engineering Services in Albania",
    template: "%s | Rasim Rama Hydropower",
  },
  description: "Professional hydropower turbine installation, assembly, maintenance, and generator repairs. 15+ years of engineering excellence serving Albania and the Balkans. Francis, Kaplan & Pelton turbine specialists.",
  keywords: [
    "hydropower engineering",
    "turbine installation",
    "hydroelectric plant",
    "Francis turbine",
    "Kaplan turbine",
    "Pelton turbine",
    "generator repair",
    "hydropower maintenance",
    "Albania hydropower",
    "Balkans renewable energy",
    "run-of-river hydropower",
    "turbine assembly",
    "hydrocentral",
    "clean energy Albania",
    "renewable energy services",
  ],
  authors: [{ name: "Rasim Rama", url: siteUrl }],
  creator: "Rasim Rama",
  publisher: "Rasim Rama Hydropower Engineering",

  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "sq": "/?lang=sq",
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Rasim Rama | Hydropower Engineering Services",
    description: "Professional turbine installation, assembly, maintenance, and generator repairs. 15+ years of hydropower engineering excellence in Albania.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["sq_AL"],
    url: siteUrl,
    siteName: "Rasim Rama Hydropower",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rasim Rama Hydropower Engineering - Professional turbine installation and maintenance services",
      },
    ],
  },

  // Twitter/X card metadata
  twitter: {
    card: "summary_large_image",
    title: "Rasim Rama | Hydropower Engineering",
    description: "Professional turbine installation, assembly, maintenance, and generator repairs in Albania and beyond.",
    images: ["/og-image.png"],
    creator: "@rasimrama",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification tags (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // App category
  category: "Engineering Services",

  // Additional metadata
  other: {
    "geo.region": "AL",
    "geo.placename": "Tirana, Albania",
    "business:contact_data:locality": "Tirana",
    "business:contact_data:country_name": "Albania",
  },
};

// JSON-LD Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rasim Rama Hydropower Engineering",
  alternateName: "Rasim Rama",
  url: siteUrl,
  logo: `${siteUrl}/rasimramalogo.png`,
  description: "Professional hydropower turbine installation, assembly, maintenance, and generator repairs. 15+ years of engineering excellence in Albania and the Balkans.",
  foundingDate: "2009",
  areaServed: [
    { "@type": "Country", name: "Albania" },
    { "@type": "Place", name: "Balkans" },
    { "@type": "Place", name: "Europe" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirana",
    addressCountry: "AL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@rasimrama.com",
    availableLanguage: ["English", "Albanian"],
  },
  sameAs: [
    // Add your social media profiles here
    // "https://www.linkedin.com/company/rasimrama",
    // "https://www.facebook.com/rasimrama",
  ],
  knowsAbout: [
    "Hydropower Engineering",
    "Turbine Installation",
    "Francis Turbines",
    "Kaplan Turbines",
    "Pelton Turbines",
    "Generator Repair",
    "Hydroelectric Power Plants",
    "Renewable Energy",
  ],
};

// JSON-LD for Local Business (Service Provider)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rasim Rama Hydropower Engineering",
  image: `${siteUrl}/rasimramalogo.png`,
  url: siteUrl,
  telephone: "+355 69 XXX XXXX",
  email: "info@rasimrama.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirana",
    addressCountry: "Albania",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.3275,
    longitude: 19.8187,
  },
  priceRange: "$$$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  serviceType: [
    "Turbine Installation",
    "Hydropower Assembly",
    "Generator Maintenance",
    "Generator Bearing Replacement",
    "Hydroelectric Plant Services",
  ],
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

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
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