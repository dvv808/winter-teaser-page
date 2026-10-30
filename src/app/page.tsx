import type { Metadata } from "next";
import { HomeTeaser } from "@/components/HomeTeaser";
import { SiteTopBar } from "@/components/SiteTopBar";

export const metadata: Metadata = {
  description:
    "Wir sind österreichweit tätig und betreuen 1.806 Geschäftskunden in allen Bundesländern. 6.000 Privatkunden werden regional, in Schladming und in Kapfenberg, von uns betreut.",
};

export default function Home() {
  return (
    <>
      <SiteTopBar />
      <HomeTeaser />
    </>
  );
}
