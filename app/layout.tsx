import type { Metadata } from "next";
import { Geist, Geist_Mono, Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ChatbotWindow from "@/components/ChatbotWindow";
import { themeInitScript } from "@/lib/theme";
import {
  DEFAULT_SHARE_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
  getSiteUrl,
} from "@/lib/seo";

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
  // Required so relative image/canonical URLs resolve to absolute https URLs in og:/twitter: tags.
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: "The Centre for Policy Analysis (CEPA) is a leading think tank in Uganda focused on parliamentary democracy, governance, transparency, accountability, and human rights.",
  keywords: "policy analysis, Uganda, parliamentary democracy, governance, transparency, accountability, human rights, think tank",
  authors: [{ name: "Centre for Policy Analysis" }],
  icons: {
    icon: "/CEPA-LOGO.png",
    apple: "/CEPA-LOGO.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_UG",
    url: "/",
    images: [
      {
        url: DEFAULT_SHARE_IMAGE_PATH,
        width: 1242,
        height: 936,
        alt: SITE_NAME
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE_PATH]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gabarito.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotWindow />
      </body>
    </html>
  );
}
