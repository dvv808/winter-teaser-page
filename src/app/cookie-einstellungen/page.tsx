import type { Metadata } from "next";
import { LegalCopy } from "@/components/LegalCopy";
import { TextPage } from "@/components/TextPage";
import legalPages from "@/content/legal-pages.json";

export const metadata: Metadata = {
  title: "Cookie Einstellungen — Winter Versicherungsmakler",
};

export default function CookieEinstellungenPage() {
  return (
    <TextPage title="Cookie Einstellungen">
      <LegalCopy blocks={legalPages.cookie} />
    </TextPage>
  );
}
