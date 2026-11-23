import type { Metadata, Viewport } from "next";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { siteUrl } from "@/lib/content";

const title = "Shan Mickyla | GoHighLevel Specialist & AI Automation";
const description =
  "Shan Mickyla is a GoHighLevel specialist who builds funnels, websites, CRM pipelines and AI automations that reply to every lead in seconds, qualify them and book them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Shan Mickyla",
  authors: [{ name: "Shan Mickyla", url: siteUrl }],
  creator: "Shan Mickyla",
  keywords: [
    "GoHighLevel specialist",
    "HighLevel expert",
    "GHL automation",
    "GoHighLevel funnels",
    "AI lead follow-up",
    "Conversation AI",
    "n8n automation",
    "CRM pipeline setup",
    "appointment booking automation",
    "freelance GoHighLevel VA Philippines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Shan Mickyla",
    locale: "en_US",
    title,
    description: "GoHighLevel funnels and the AI systems that run them.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "GoHighLevel funnels and the AI systems that run them.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#070709",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/ClashDisplay-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
