import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Product Catalog - Shop Premium Products Online",
    template: "%s | Product Catalog",
  },
  description:
    "Browse our collection of high-quality products. Find the best deals on electronics, fashion, beauty products, and more.",
  keywords: [
    "products",
    "online shopping",
    "e-commerce",
    "shop online",
    "best deals",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
