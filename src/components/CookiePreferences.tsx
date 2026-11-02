"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

function statusText(choice: ConsentChoice | null) {
  if (!choice) return "Noch keine Auswahl gespeichert.";
  const when = new Intl.DateTimeFormat("de-AT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(choice.decidedAt));
  return choice.externalMedia
    ? `Externe Medien sind erlaubt. Gespeichert am ${when}.`
    : `Externe Medien sind nicht erlaubt. Gespeichert am ${when}. „Alle ablehnen“ widerruft eine frühere Einwilligung.`;
}

export function CookiePreferences() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    const sync = () => setChoice(readConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <section className="cookie-prefs" id="auswahl" aria-labelledby="cookie-prefs-title">
      <h2 id="cookie-prefs-title">Ihre Auswahl</h2>
      <p>{statusText(choice)}</p>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="cookie-choice-secondary"
          onClick={() => writeConsent(false)}
        >
          Alle ablehnen
        </button>
        <button
          type="button"
          className="cookie-choice-primary"
          onClick={() => writeConsent(true)}
        >
          Alle akzeptieren
        </button>
      </div>
    </section>
  );
}
