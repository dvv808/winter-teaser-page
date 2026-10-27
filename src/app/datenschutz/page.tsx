import type { Metadata } from "next";
import { LegalCopy } from "@/components/LegalCopy";
import { TextPage } from "@/components/TextPage";
import legalPages from "@/content/legal-pages.json";

export const metadata: Metadata = {
  title: "Datenschutz — Winter Versicherungsmakler",
};

export default function DatenschutzPage() {
  return (
    <TextPage title="Datenschutz">
      <LegalCopy blocks={legalPages.datenschutz} />
    </TextPage>
  );
}
