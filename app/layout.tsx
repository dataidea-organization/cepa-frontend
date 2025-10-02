import type { Metadata } from "next";
import { Geist, Geist_Mono, Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CEPA - Centre for Policy Analysis",
  description: "The Centre for Policy Analysis (CEPA) is a leading think tank in Uganda focused on parliamentary democracy, governance, transparency, accountability, and human rights.",
  keywords: "policy analysis, Uganda, parliamentary democracy, governance, transparency, accountability, human rights, think tank",
  authors: [{ name: "Centre for Policy Analysis" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "CEPA - Centre for Policy Analysis",
    description: "Leading think tank in Uganda focused on policy analysis and governance",
    type: "website",
    locale: "en_UG",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "CEPA Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CEPA - Centre for Policy Analysis",
    description: "Leading think tank in Uganda focused on policy analysis and governance",
    images: ["/android-chrome-512x512.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gabarito.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
