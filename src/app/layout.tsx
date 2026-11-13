import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteNavigation from "./SiteNavigation";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "GREENInvest",
  description: "Explore financial performance and environmental data.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteNavigation />{children}</body>
    </html>
  );
}
