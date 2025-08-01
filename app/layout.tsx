import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { NavbarDemo } from "@/components/ui/navbar-demo";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GridBackground } from "@/components/ui/grid-background";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconMail,
  IconBrandInstagram,
} from "@tabler/icons-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  const socialItems = [
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "https://github.com/TayyabSohail",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full" />,
      href: "https://www.linkedin.com/in/muhammad-tayyab-sohail/",
    },

    {
      title: "WhatsApp",
      icon: <IconBrandWhatsapp className="h-full w-full" />,
      href: "https://wa.me/923338199915",
    },
    {
      title: "Email",
      icon: <IconMail className="h-full w-full" />,
      href: "mailto:m.tayyabsohail614@gmail.com",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full" />,
      href: "https://www.instagram.com/muhammad_tayyab_sohail_/",
    },
  ];

  return (
    <html lang="en" className="scroll-smooth">
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
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <GridBackground />
        <NavbarDemo />
        {children}

        {/* Floating Dock */}
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
          <FloatingDock
            items={socialItems}
            desktopClassName="max-w-2xl w-full justify-center backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800"
            mobileClassName="w-full max-w-xs mx-auto"
          />
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
