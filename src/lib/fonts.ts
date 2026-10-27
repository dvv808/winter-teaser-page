import localFont from "next/font/local";

/** Apex New (Labor & Wait web licence) — keeps --font-apex for existing CSS */
export const apex = localFont({
  src: [
    {
      path: "../fonts/apex-new/ApexNew-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/apex-new/ApexNew-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/apex-new/ApexNew-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/apex-new/ApexNew-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/apex-new/ApexNew-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/apex-new/ApexNew-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-HeavyItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/apex-new/ApexNew-Ultra.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/apex-new/ApexNew-UltraItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-apex",
  display: "swap",
});
