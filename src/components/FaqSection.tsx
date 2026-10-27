"use client";

import { useState } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";

const faqs = [
  {
    id: "das-sind-wir",
    title: "Das sind wir",
    body: "Als familiengeführter Versicherungsmakler mit rund 130 Mitarbeitenden und Standorten in Schladming und Kapfenberg betreuen wir mehr als 1.800 Firmenkunden und 6.000 Privatkunden in ganz Österreich – persönlich, partnerschaftlich und mit dem Anspruch, Lösungen zu finden, die wirklich passen.",
  },
  {
    id: "dafuer-stehen-wir",
    title: "Dafür stehen wir",
    body: "Unabhängigkeit, Verlässlichkeit und Nähe. Wir stellen Ihre Interessen in den Mittelpunkt, vergleichen den Markt und schaffen Absicherung, die zu Ihrem Leben und Ihrem Unternehmen passt — nicht umgekehrt.",
  },
  {
    id: "so-arbeiten-wir",
    title: "So arbeiten wir",
    body: "Persönlich vor Ort, digital über WINO und immer mit einem festen Ansprechpartner. Wir analysieren Ihren Bedarf, begleiten Entscheidungen und bleiben auch nach dem Abschluss an Ihrer Seite.",
  },
  {
    id: "ablauf-schaden",
    title: "Ablauf im Schadensfall",
    body: "Sie melden den Schaden uns — wir übernehmen die Abstimmung mit der Versicherung, dokumentieren, beraten und halten Sie über jeden Schritt informiert, bis der Fall erledigt ist.",
  },
] as const;

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className={`faq-toggle ${open ? "faq-toggle--open" : ""}`} aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="faq-toggle-vert"
          d="M7 2v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <AnimatedLetters
        as="h2"
        id="faq-heading"
        className="text-h2 faq-heading"
        text="Wer sind wir?"
        delay={0.1}
        stagger={0.012}
        whenVisible
      />

      <div className="faq-rule" aria-hidden />

      <div className="faq-list">
        {faqs.map((faq) => {
          const open = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`faq-item ${open ? "faq-item--open" : ""}`}
            >
              <div className="faq-item-inner">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${faq.id}`}
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => setOpenId(open ? null : faq.id)}
                >
                  <h3 className="faq-title">{faq.title}</h3>
                  <ToggleIcon open={open} />
                </button>

                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  className="faq-panel"
                  hidden={!open}
                >
                  <p className="faq-body">{faq.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
