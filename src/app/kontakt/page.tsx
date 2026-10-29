import type { Metadata } from "next";
import { ContactPageMain } from "@/components/ContactPageMain";
import { KontaktPageShell } from "@/components/KontaktPageShell";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Kontakt — Winter Versicherungsmakler",
  description:
    "Kontaktieren Sie Winter Versicherungsmakler in Schladming und Kapfenberg.",
};

export default function KontaktPage() {
  return (
    <>
      <KontaktPageShell>
        <SiteHeader activeId="kontakt" logo="light" />
        <ContactPageMain />
      </KontaktPageShell>
    </>
  );
}
