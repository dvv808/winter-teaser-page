"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

type LeaveTarget = {
  href: string;
  label: string;
};

type ConsentApi = {
  openLeave: (href: string, label: string) => void;
};

const ConsentApiContext = createContext<ConsentApi | null>(null);

const noopSubscribe = () => () => {};

export function useConsentApi() {
  const value = useContext(ConsentApiContext);
  if (!value) {
    throw new Error("Social links need the cookie notice.");
  }
  return value;
}

export function CookieConsent({ children }: { children: ReactNode }) {
  const titleId = useId();
  const textId = useId();
  const leaveTitleId = useId();
  // false on the server and during hydration, true after: the banner never flashes for people who already chose.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [choice, setChoice] = useState<ConsentChoice | null>(readConsent);
  const [leave, setLeave] = useState<LeaveTarget | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!leave) return;
    const previous = document.activeElement;
    cancelRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLeave(null);
        return;
      }
      if (event.key !== "Tab") return;
      const first = cancelRef.current;
      const last = continueRef.current;
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [leave]);

  function acceptAll() {
    writeConsent(true);
  }

  function rejectAll() {
    writeConsent(false);
  }

  return (
    <ConsentApiContext.Provider
      value={{
        openLeave: (href, label) => setLeave({ href, label }),
      }}
    >
      {children}
      {ready && !choice ? (
        <section
          className="cookie-banner"
          aria-labelledby={titleId}
          aria-describedby={textId}
        >
          <h2 id={titleId}>Cookies</h2>
          <p id={textId}>
            Diese Seite speichert nur Ihre Auswahl in diesem Browser.
            Statistik- oder Werbe-Cookies setzen wir nicht. Links zu YouTube,
            Facebook, Instagram und LinkedIn verlassen diese Seite. Diese
            Anbieter können dann eigene Cookies setzen und Daten auch in den
            USA verarbeiten. Ohne Einwilligung fragen wir vor jedem solchen
            Link noch einmal nach.
          </p>
          <p className="cookie-banner-links">
            <a href="/datenschutz">Datenschutz</a>
            <a href="/cookie-einstellungen">Cookie-Einstellungen</a>
          </p>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="cookie-choice-secondary"
              onClick={rejectAll}
            >
              Alle ablehnen
            </button>
            <button
              type="button"
              className="cookie-choice-primary"
              onClick={acceptAll}
            >
              Alle akzeptieren
            </button>
          </div>
        </section>
      ) : null}
      {leave ? (
        <div
          className="cookie-leave-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLeave(null);
          }}
        >
          <section
            className="cookie-leave"
            role="dialog"
            aria-modal="true"
            aria-labelledby={leaveTitleId}
          >
            <h2 id={leaveTitleId}>Sie verlassen diese Seite</h2>
            <p>
              {leave.label} gehört nicht zu dieser Website. Beim Öffnen kann{" "}
              {leave.label} Cookies setzen und Daten verarbeiten, auch in den
              USA. Es gelten die Datenschutzregeln von {leave.label}.
            </p>
            <div className="cookie-banner-actions">
              <button
                type="button"
                ref={cancelRef}
                onClick={() => setLeave(null)}
              >
                Abbrechen
              </button>
              <button
                type="button"
                ref={continueRef}
                onClick={() => {
                  window.open(leave.href, "_blank", "noopener,noreferrer");
                  setLeave(null);
                }}
              >
                Weiter
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </ConsentApiContext.Provider>
  );
}
