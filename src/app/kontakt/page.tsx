import type { Metadata } from "next";
import { ContactPageMain } from "@/components/ContactPageMain";
import { KontaktPageShell } from "@/components/KontaktPageShell";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Kontakt — Winter Versicherungsmakler",
  description:
    "Wir freuen uns über Ihre Kontaktaufnahme und melden uns umgehend bei Ihnen.",
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
