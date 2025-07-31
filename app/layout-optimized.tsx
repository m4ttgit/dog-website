import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dog Breeds Guide - Complete AKC Breed Directory & Information",
  description: "Discover 277+ AKC dog breeds with detailed information, photos, temperament, and care guides. Find your perfect canine companion with our comprehensive breed directory.",
  keywords: "dog breeds, AKC breeds, dog breed guide, puppy information, dog temperament, breed characteristics, dog adoption, canine breeds",
  authors: [{ name: "Dog Breeds Guide" }],
  creator: "Dog Breeds Guide",
  publisher: "Dog Breeds Guide",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Dog Breeds Guide",
    title: "Dog Breeds Guide - Complete AKC Breed Directory",
    description: "Discover 277+ AKC dog breeds with detailed information, photos, and care guides.",
    images: [
      {
        url: "/hero1.jpg",
        width: 1200,
        height: 630,
        alt: "Dog Breeds Guide - Happy Dogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Breeds Guide - Complete AKC Breed Directory",
    description: "Discover 277+ AKC dog breeds with detailed information and photos.",
    images: ["/hero1.jpg"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#2f27ce",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://your-domain.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header>
          <Nav />
        </Header>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}