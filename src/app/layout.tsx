import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GREENInvest",
  description: "Compara rendimiento financiero e impacto ambiental.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
