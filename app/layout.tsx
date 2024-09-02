import type { Metadata } from "next";
import { Orbit, Orbitron } from "next/font/google";
import "./globals.css";

const orbit = Orbit({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiniFyr",
  description: "Effortlessly Shorten, Seamlessly Share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbit.className} bg-mBackground text-white`}>
        {children}
      </body>
    </html>
  );
}
