import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { NavbarDemo } from "@/components/ui/navbar-demo";
import { GridBackground } from "@/components/ui/grid-background";
import { HashScroll } from "@/components/ui/hash-scroll";
import { BackToTop } from "@/components/ui/back-to-top";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tayyab | Full Stack Developer",
  description:
    "Building modern web applications with React, Next.js, and Node.js",
  keywords: [
    "Tayyab",
    "portfolio",
    "developer",
    "full stack",
    "next.js",
    "react",
    "typescript",
  ],
  authors: [{ name: "Tayyab", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Tayyab | Full Stack Developer",
    description:
      "Building modern web applications with React, Next.js, and Node.js",
    url: "https://yourwebsite.com",
    siteName: "Tayyab Portfolio",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayyab | Full Stack Developer",
    description:
      "Building modern web applications with React, Next.js, and Node.js",
    creator: "@yourtwitter",
    images: ["https://yourwebsite.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html id="top" lang="en">
      <head>
        {/* Google Analytics (gtag.js) - Using Next.js Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7ERWVLWFKQ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7ERWVLWFKQ');
        `}
        </Script>
        <meta name="theme-color" content="#07110f" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <GridBackground />
        <NavbarDemo />
        <HashScroll />
        {children}

        <div className="mx-auto flex w-full max-w-6xl justify-center px-5 pb-10 sm:px-6">
          <BackToTop />
        </div>

        {/* Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const storedTheme = localStorage.getItem('theme');
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const initialTheme = storedTheme || systemTheme;
              if (initialTheme === 'dark') {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          }}
        />
      </body>
    </html>
  );
}
