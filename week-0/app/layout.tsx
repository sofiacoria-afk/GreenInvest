import "./globals.css";

export const metadata = {
  title: "GREENInvest",
  description: "Financial and environmental information for investment research"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
