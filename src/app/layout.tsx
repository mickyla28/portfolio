import type { Metadata, Viewport } from "next";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shan Mickyla | GoHighLevel Specialist",
  description:
    "GoHighLevel funnels, pipelines and AI-powered workflows that reply to every lead in seconds, qualify them and book them.",
  openGraph: {
    title: "Shan Mickyla | GoHighLevel Specialist",
    description: "GoHighLevel funnels and the AI systems that run them.",
    images: ["/images/shan-portrait.jpg"],
  },
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
