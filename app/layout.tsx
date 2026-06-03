import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PagePulse - Reading Tracker",
    template: "%s | PagePulse",
  },
  description: "Transform your reading habit with beautiful tracking, smart goals, and a community that inspires you to read more.",
  keywords: [
    "reading tracker",
    "book tracker",
    "reading goals",
    "reading habit",
    "book club",
    "reading statistics",
    "reading timer",
  ],
  authors: [{ name: "PagePulse" }],
  creator: "PagePulse",
  publisher: "PagePulse",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pagepulse.app",
    siteName: "PagePulse",
    title: "PagePulse - Feel the Pulse of Your Reading",
    description: "Transform your reading habit with beautiful tracking, smart goals, and a community that inspires you to read more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PagePulse - Reading Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PagePulse - Feel the Pulse of Your Reading",
    description: "Transform your reading habit with beautiful tracking, smart goals, and a community that inspires you to read more.",
    images: ["/og-image.png"],
    creator: "@pagepulse",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#6366f1",
      },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://pagepulse.app"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
        
        {/* Theme color */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PagePulse" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}