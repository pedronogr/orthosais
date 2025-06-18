import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieConsent from "./components/CookieConsent";
import SchemaOrg from "./components/SchemaOrg";
import { AppProvider } from "./context/AppContext";
import CartSidebar from "./components/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Orthosais Farma | Proteção à Vida",
  description: "Orthosais Farma - Produtos farmacêuticos de extrema qualidade voltados para a proteção à vida.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.png', sizes: '32x32' },
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/favicon/favicon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.png" type="image/png" />
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/favicon.png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AppProvider>
          {children}
          <CartSidebar />
          <WhatsAppButton />
          <CookieConsent />
        </AppProvider>
      </body>
    </html>
  );
}
