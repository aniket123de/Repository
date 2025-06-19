import "./css/global.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { siteOrigin } from "~/lib/constants";
import { Analytics } from "@vercel/analytics/next";
import SessionProvider from "~/providers/SessionProvider";
import GlobalInitialLoader from "~/components/GlobalInitialLoader";
import { StructuredData } from "~/components/StructuredData";

const jetBrainsMono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  fallback: ["var(--font-system)"],
});

const basementGrotesque = localFont({
  src: [
    { path: "./fonts/BasementGrotesque-Regular.woff2", weight: "400" },
    { path: "./fonts/BasementGrotesque-BlackExpanded.woff2", weight: "800" },
    {
      path: "./fonts/BasementGrotesqueDisplay-UltraBlackExtraExpanded.woff2",
      weight: "900",
    },
  ],
  fallback: ["var(--font-system)"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Repository - Build More, Grow More | Development Community",
    template: "%s | Repository"
  },
  description:
    "Join Repository's thriving developer community. Build innovative projects, collaborate with talented developers, and grow your skills. Discover hackathons, workshops, and networking opportunities.",
  keywords: [
    "developer community",
    "programming",
    "hackathons",
    "open source",
    "collaboration",
    "web development",
    "software engineering",
    "coding bootcamp",
    "tech community",
    "build projects"
  ],
  authors: [{ name: "Repository Team" }],
  creator: "Repository Team",
  publisher: "Repository",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/circle.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/circle.png",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteOrigin,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@repository",
    description: "Join Repository's thriving developer community. Build innovative projects, collaborate with talented developers, and grow your skills.",
    images: [{ width: 1200, height: 630, url: `${siteOrigin}/og.png` }],
    site: "@repository-main",
    title: "Repository - Build More, Grow More | Development Community",
  },
  openGraph: {
    title: "Repository - Build More, Grow More | Development Community",
    description: "Join Repository's thriving developer community. Build innovative projects, collaborate with talented developers, and grow your skills.",
    images: [
      {
        url: `${siteOrigin}/og.png`,
        width: 1200,
        height: 630,
        alt: "Repository - Developer Community Platform"
      }
    ],
    locale: "en-US",
    siteName: "Repository",
    type: "website",
    url: siteOrigin,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        ["--font-basement-grotesque" as string]: `${basementGrotesque.style.fontFamily}, var(--font-system), sans-serif`,
        ["--font-jetbrains-mono" as string]: `${jetBrainsMono.style.fontFamily}, var(--font-system), sans-serif`,      }}    >
      <body>
        <GlobalInitialLoader />
        <SessionProvider>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
