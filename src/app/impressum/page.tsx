import type { Metadata } from "next";
import { LegalCopy } from "@/components/LegalCopy";
import { TextPage } from "@/components/TextPage";
import legalPages from "@/content/legal-pages.json";

export const metadata: Metadata = {
  title: "Impressum — Winter Versicherungsmakler",
};

export default function ImpressumPage() {
  return (
    <TextPage title="Impressum">
      <LegalCopy blocks={legalPages.impressum} />
    </TextPage>
  );
}
