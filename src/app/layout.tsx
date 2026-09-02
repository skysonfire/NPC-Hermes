import type { Metadata, Viewport } from "next";
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
  title: {
    default: "NPC Protocol — Stop Being a Background Character",
    template: "%s · NPC Protocol",
  },
  description:
    "Most brands are NPCs — generic, background, on-loop. NPC Protocol is the system that turns you into the main character: your story, your design, built with modern AI.",
  keywords: [
    "web design",
    "brand identity",
    "main character",
    "AI web development",
    "web developer",
  ],
  authors: [{ name: "NPC Protocol" }],
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
        <MotionProvider>
          <Nav />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
