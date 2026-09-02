import type { Metadata, Viewport } from "next";
import { site, siteUrl } from "@/lib/site";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/motion";
// Lenis ships required base styles (html.lenis { height: auto }). Without this
// import the smooth-scroll wrapper mis-measures page height.
import "lenis/dist/lenis.css";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase makes every relative OG/canonical URL resolve to the real
  // origin. Without it Next emits relative URLs that crawlers and link
  // unfurlers cannot use.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI voice receptionist",
    "AI front desk",
    "web design",
    "lead capture",
    "local business websites",
    "brand identity",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a13",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-ink text-snow font-sans antialiased selection:bg-gold selection:text-ink">
        {/* Structured data. Deliberately limited to facts we can stand behind:
            identity, contact route and what we sell. No aggregateRating, no
            review markup, no employee counts -- fabricated structured data is
            both a trust and a Google penalty risk. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: site.name,
                  url: siteUrl,
                  email: site.email,
                  description: site.description,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/og.png`,
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: site.name,
                  description: site.description,
                  publisher: { "@id": `${siteUrl}/#organization` },
                  inLanguage: "en",
                },
                {
                  "@type": "Service",
                  name: "Website + AI voice front desk",
                  provider: { "@id": `${siteUrl}/#organization` },
                  description:
                    "Fixed-price website build paired with an AI voice front desk that answers calls and qualifies leads.",
                  areaServed: "Worldwide",
                },
              ],
            }),
          }}
        />
        <MotionProvider>
          <Nav />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
