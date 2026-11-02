import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { apex } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.makler-winter.at"),
  title: "Winter Versicherungsmakler",
  description: "Winter Versicherungsmakler — Ihr Versicherungsmakler",
  openGraph: {
    type: "website",
    siteName: "Winter Versicherungsmakler",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${apex.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col font-body">
        <CookieConsent>{children}</CookieConsent>
      </body>
    </html>
  );
}
