import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ZulassungPage } from "@/components/ZulassungPage";

export const metadata: Metadata = {
  title: "Zulassungsstelle — Winter Versicherungsmakler",
  description:
    "Ihre Zulassungsstelle in Schladming – direkt bei Winter Versicherungsmakler.",
};

export default function ZulassungsstellePage() {
  return (
    <div className="zulassung-shell">
      <SiteHeader activeId="zulassung" />
      <ZulassungPage />
    </div>
  );
}
