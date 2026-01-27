import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rasimrama.com";

export const metadata: Metadata = {
  title: "Project Gallery | Hydropower Installation Portfolio",
  description: "Explore our portfolio of hydropower engineering projects. View turbine installations, infrastructure development, and generator assembly work across Albania and the Balkans.",
  keywords: [
    "hydropower gallery",
    "turbine installation photos",
    "hydroelectric projects",
    "infrastructure installation",
    "generator assembly",
    "Albania hydropower projects",
    "Balkans renewable energy",
    "Francis turbine installation",
    "Kaplan turbine",
    "Pelton turbine",
  ],
  openGraph: {
    title: "Project Gallery | Rasim Rama Hydropower",
    description: "Explore our portfolio of hydropower engineering projects including turbine installations, infrastructure development, and generator assembly work.",
    type: "website",
    url: `${siteUrl}/gallery`,
    siteName: "Rasim Rama Hydropower",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rasim Rama Hydropower Engineering Project Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | Rasim Rama Hydropower",
    description: "Explore our portfolio of hydropower engineering projects.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
