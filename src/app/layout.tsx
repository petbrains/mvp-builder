import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bantadthong Vibes",
  description: "AI-curated daily food route generator for Bangkok's hidden food scene",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
