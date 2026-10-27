import type { Metadata } from "next";
import { LegalCopy } from "@/components/LegalCopy";
import { TextPage } from "@/components/TextPage";
import legalPages from "@/content/legal-pages.json";

export const metadata: Metadata = {
  title: "Barrierefreiheit — Winter Versicherungsmakler",
};

export default function BarrierefreiheitPage() {
  return (
    <TextPage title="Barrierefreiheit">
      <LegalCopy blocks={legalPages.barrierefreiheit} />
    </TextPage>
  );
}
