import type { Metadata } from "next";
import Link from "next/link";
import { SiteTopBar } from "@/components/SiteTopBar";

const LANDSCAPE = "/images/home/landscape.jpg?v=3";

export const metadata: Metadata = {
  title: "Seite nicht gefunden — Winter Versicherungsmakler",
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-bg" aria-hidden>
        <img src={LANDSCAPE} alt="" />
        <div className="not-found-scrim" />
      </div>
      <SiteTopBar activeId={null} />
      <div className="not-found-copy">
        <p>404</p>
        <h1>Diese Seite existiert nicht</h1>
        <Link href="/" className="not-found-home">
          <span>Zur Startseite</span>
        </Link>
      </div>
      <p className="home-copyright">© 2026 Winter Versicherungsmakler Ges.m.b.H.</p>
    </main>
  );
}
