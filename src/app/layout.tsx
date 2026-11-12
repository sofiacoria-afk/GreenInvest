import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteNavigation from "./SiteNavigation";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "GREENInvest",
  description: "Compara rendimiento financiero e impacto ambiental.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body><SiteNavigation />{children}</body>
    </html>
  );
}
