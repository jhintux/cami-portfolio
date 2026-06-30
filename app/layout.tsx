import type { Metadata } from "next";
import { Josefin_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import "./portfolio.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-montserrat",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "The Witch Keeper — Camilo Estacio",
  description:
    "Portfolio of Camilo Estacio — graphic designer and illustrator from Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${montserrat.variable} ${josefinSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
