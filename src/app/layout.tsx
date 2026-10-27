import type { Metadata } from "next";
import { apex } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Winter Versicherungsmakler",
  description: "Winter Versicherungsmakler — Ihr Versicherungsmakler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${apex.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col font-body">{children}</body>
    </html>
  );
}
