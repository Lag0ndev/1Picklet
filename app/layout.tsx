import type { Metadata } from "next";
import { Rubik_One, Nunito } from "next/font/google";
import "./globals.css";

const rubikOne = Rubik_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-one",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "1Picklet | Picklet Hub",
  description: "The central hub for everything Picklet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikOne.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
