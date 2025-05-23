import "./css/global.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { siteOrigin } from "~/lib/constants";
import { Analytics } from "@vercel/analytics/next";

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
  title: "Repository",
  description:
    "A demo website made exclusively to showcase a couple of cool animations powered by our new library, @bsmnt/scrollytelling.",
  viewport: {
    height: "device-height",
    initialScale: 1,
    width: "device-width",
  },
  icons: {
    icon: "/circle.png",
    shortcut: "/circle.png",
  },
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    creator: "@basementstudio",
    description: "BSMNT @ Scrollytelling",
    images: [{ width: 1200, height: 630, url: `${siteOrigin}/og.jpg` }],
    site: "@basementstudio",
    title: "Repository",
  },
  openGraph: {
    description: "Repository",
    images: [{ width: 1200, height: 630, url: `${siteOrigin}/og.jpg` }],
    locale: "en-US",
    siteName: "Repository",
    title: "Repository",
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
        ["--font-jetbrains-mono" as string]: `${jetBrainsMono.style.fontFamily}, var(--font-system), sans-serif`,
      }}
    >
      <body>{children}</body>

      <Analytics />
    </html>
  );
}
