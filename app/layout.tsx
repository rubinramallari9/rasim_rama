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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ramarasim.com";

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
    default: "Rasim Rama | Hydropower Engineering Services - Albania, Italy, Germany, USA, Balkans",
    template: "%s | Rasim Rama Hydropower",
  },
  description: "Professional hydropower turbine installation, assembly, maintenance, and generator repairs. 15+ years of engineering excellence serving Albania, Italy, Germany, USA, Kosovo, Bulgaria, and Greece. Francis, Kaplan & Pelton turbine specialists.",
  keywords: [
    // Core services
    "hydropower engineering",
    "turbine installation",
    "hydroelectric plant",
    "Francis turbine",
    "Kaplan turbine",
    "Pelton turbine",
    "generator repair",
    "hydropower maintenance",
    "turbine assembly",
    "renewable energy services",
    // Albania
    "Albania hydropower",
    "hidrocentral Shqipëri",
    "turbina hidroelektrike",
    "energji e rinovueshme",
    // Italy
    "Italy hydropower",
    "centrale idroelettrica Italia",
    "turbine idrauliche",
    "manutenzione turbine Italia",
    "energia idroelettrica",
    // Germany
    "Germany hydropower",
    "Wasserkraftwerk Deutschland",
    "Turbinen Installation",
    "Wasserkraft Engineering",
    "erneuerbare Energie",
    // USA
    "USA hydropower",
    "hydroelectric power USA",
    "turbine installation America",
    "renewable energy United States",
    // Kosovo
    "Kosovo hydropower",
    "hidrocentral Kosovë",
    "energji hidroelektrike",
    // Bulgaria
    "Bulgaria hydropower",
    "водноелектрическа централа",
    "хидроенергия България",
    "ВЕЦ България",
    // Greece
    "Greece hydropower",
    "υδροηλεκτρικό εργοστάσιο",
    "υδροενέργεια Ελλάδα",
    // Regional
    "Balkans renewable energy",
    "European hydropower",
    "run-of-river hydropower",
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
      "de": "/?lang=de",
      "it": "/?lang=it",
      "el": "/?lang=el",
      "bg": "/?lang=bg",
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Rasim Rama | International Hydropower Engineering Services",
    description: "Professional turbine installation, assembly, maintenance, and generator repairs. Serving Albania, Italy, Germany, USA, Kosovo, Bulgaria, and Greece with 15+ years of excellence.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["sq_AL", "de_DE", "it_IT", "el_GR", "bg_BG"],
    url: siteUrl,
    siteName: "Rasim Rama Hydropower",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rasim Rama Hydropower Engineering - International turbine installation and maintenance services",
      },
    ],
  },

  // Twitter/X card metadata
  twitter: {
    card: "summary_large_image",
    title: "Rasim Rama | International Hydropower Engineering",
    description: "Professional turbine installation serving Albania, Italy, Germany, USA, Kosovo, Bulgaria, and Greece.",
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

  // Additional metadata for international targeting
  other: {
    "geo.region": "AL",
    "geo.placename": "Tirana, Albania",
    "business:contact_data:locality": "Tirana",
    "business:contact_data:country_name": "Albania",
    // International service areas
    "distribution": "global",
    "target": "Albania, Italy, Germany, USA, Kosovo, Bulgaria, Greece",
    "coverage": "Europe, United States, Balkans",
  },
};

// JSON-LD Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rasim Rama Hydropower Engineering",
  alternateName: ["Rasim Rama", "Rasim Rama Hidrocentrale"],
  url: siteUrl,
  logo: `${siteUrl}/rasimramalogo.png`,
  description: "Professional hydropower turbine installation, assembly, maintenance, and generator repairs. 15+ years of engineering excellence serving Albania, Italy, Germany, USA, Kosovo, Bulgaria, and Greece.",
  foundingDate: "2009",
  areaServed: [
    { "@type": "Country", name: "Albania", sameAs: "https://en.wikipedia.org/wiki/Albania" },
    { "@type": "Country", name: "Italy", sameAs: "https://en.wikipedia.org/wiki/Italy" },
    { "@type": "Country", name: "Germany", sameAs: "https://en.wikipedia.org/wiki/Germany" },
    { "@type": "Country", name: "United States", sameAs: "https://en.wikipedia.org/wiki/United_States" },
    { "@type": "Country", name: "Kosovo", sameAs: "https://en.wikipedia.org/wiki/Kosovo" },
    { "@type": "Country", name: "Bulgaria", sameAs: "https://en.wikipedia.org/wiki/Bulgaria" },
    { "@type": "Country", name: "Greece", sameAs: "https://en.wikipedia.org/wiki/Greece" },
    { "@type": "Place", name: "Balkans" },
    { "@type": "Place", name: "Europe" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirana",
    addressCountry: "AL",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@ramarasim.com",
      availableLanguage: ["English", "Albanian", "Italian", "German", "Greek", "Bulgarian"],
      areaServed: ["AL", "IT", "DE", "US", "XK", "BG", "GR"],
    },
  ],
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
    "Run-of-River Hydropower",
    "Storage Hydropower",
    "Cascade Hydropower Systems",
  ],
};

// JSON-LD for Local Business (Service Provider) with international reach
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rasim Rama Hydropower Engineering",
  image: `${siteUrl}/rasimramalogo.png`,
  url: siteUrl,
  telephone: "+355 69 XXX XXXX",
  email: "info@ramarasim.com",
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
  areaServed: [
    { "@type": "Country", name: "Albania" },
    { "@type": "Country", name: "Italy" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Kosovo" },
    { "@type": "Country", name: "Bulgaria" },
    { "@type": "Country", name: "Greece" },
  ],
  priceRange: "$$$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hydropower Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Turbine Installation",
          description: "Professional installation of Francis, Kaplan, and Pelton turbines",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Generator Maintenance",
          description: "Comprehensive maintenance and repair services for hydroelectric generators",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hydropower Assembly",
          description: "Complete assembly services for hydroelectric power plant components",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Generator Bearing Replacement",
          description: "Specialized bearing replacement and repair for hydroelectric generators",
        },
      },
    ],
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