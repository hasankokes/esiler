import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

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
        className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
