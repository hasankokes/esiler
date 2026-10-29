import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://esiler.com.tr"),
  title: "Eşiler Triko — 1964'ten Beri Toptan Triko & Penye Üretimi",
  description: "1964'ten beri İstanbul'un kalbinde, 60 yıllık tecrübeyle kaliteli toptan triko ve penye üretimi. Türk dokusunun sesi, güvenin simgesi.",
  keywords: ["toptan triko", "toptan penye", "bayan triko üreticisi", "istanbul tekstil firmaları", "kaliteli penye", "battal anne penye", "toptan bayan giyim", "1964'ten beri triko"],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "cfR4W986dG38z2nFKAwStXL7RCUT5ElqPnPLVcXSnfY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className="font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
