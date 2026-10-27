"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";

const MASK = "/images/quotes/quote_bg.svg";

const quotes = [
  {
    id: "farmer",
    image: "/images/quotes/quote_man_farmer.png",
    imageAlt: "Landwirt und Winter-Kunde",
    text: "Ich hab nach dem Wasserschaden 2023 drei Wochen lang auf eine Rückmeldung meiner alten Versicherung gewartet. Bei Winter hatte ich am nächsten Tag jemanden am Telefon — nicht eine KI-Hotline, sondern eine Person, die meinen Namen kannte. Das vergisst man nicht.",
    name: "Harald Stonehammer",
    company: "Stonehammer & Lamster GesmbH",
    premasked: false,
  },
  {
    id: "pension",
    image: "/images/quotes/quotes_men_pension.png",
    imageAlt: "Kunden mit Pensionsvorsorge bei Winter",
    text: "Vorsorge war für uns lange ein Thema, das wir vor uns hergeschoben haben. Winter hat die Optionen verständlich gemacht und eine Lösung gefunden, die zu unserem Leben passt — nicht nur auf dem Papier.",
    name: "Thomas Leitner",
    company: "Pensionsvorsorge · Privatkunde",
    premasked: true,
  },
  {
    id: "car",
    image: "/images/quotes/quotes_couple_car.png",
    imageAlt: "Paar mit Kfz-Versicherung bei Winter",
    text: "Nach dem Auffahrunfall wollten wir vor allem eines: Klarheit. Winter hat den Schaden unkompliziert aufgenommen und uns Schritt für Schritt durch den Prozess geführt. Ohne Warteschleife, ohne Rätselraten.",
    name: "Anna & Markus Berger",
    company: "Kfz-Versicherung · Privatkunden",
    premasked: true,
  },
  {
    id: "selfemployment",
    image: "/images/quotes/quotes_woman_selfemployment.png",
    imageAlt: "Selbstständige Kundin bei Winter",
    text: "Als Selbstständige brauche ich Absicherung, die mitwächst. Winter denkt mit, fragt nach und liefert Lösungen, die zu meinem Alltag passen — nicht ein Standardpaket von der Stange.",
    name: "Elena Hofmann",
    company: "Selbstständig · Gewerbeversicherung",
    premasked: true,
  },
] as const;

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={direction === "prev" ? "M11 4 6 9l5 5" : "M7 4l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuotesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function go(delta: number) {
    setIndex((current) => (current + delta + quotes.length) % quotes.length);
  }

  return (
    <section
      ref={sectionRef}
      className={`quotes-section ${visible ? "quotes-section--visible" : ""}`}
      aria-label="Kundenstimmen"
    >
      <header className="quotes-header">
        <Image
          src="/logos/little_w.svg"
          alt=""
          width={32}
          height={16}
          className="quotes-w quotes-fade"
          aria-hidden
        />
        <AnimatedLetters
          as="h2"
          className="text-h2 quotes-heading"
          text="Was Kunden über uns Sagen"
          delay={0.1}
          stagger={0.012}
          whenVisible
        />
      </header>

      <div className="quotes-row">
        <div className="quotes-visual">
          <div className="quotes-stack quotes-fade">
            {quotes.map((item, i) => {
              const depth =
                (i - index + quotes.length) % quotes.length;
              const tilt = depth === 0 ? 0 : depth % 2 === 0 ? 1 : -1;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`quotes-portrait ${item.premasked ? "quotes-portrait--premasked" : ""} ${depth === 0 ? "quotes-portrait--front" : ""}`}
                  style={
                    {
                      "--stack-depth": depth,
                      "--stack-tilt": tilt,
                      zIndex: quotes.length - depth,
                      ...(item.premasked
                        ? {}
                        : {
                            ["--quotes-mask" as string]: `url("${MASK}")`,
                          }),
                    } as CSSProperties
                  }
                  aria-label={`Zitat ${i + 1}: ${item.name}`}
                  aria-current={depth === 0 ? "true" : undefined}
                  tabIndex={depth === 0 ? -1 : 0}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 900px) 80vw, 32vw"
                    className={
                      item.premasked ? "object-contain" : "object-cover"
                    }
                    priority={i === 0}
                  />
                </button>
              );
            })}
          </div>

          <div className="quotes-dots quotes-fade" role="tablist" aria-label="Zitate">
            {quotes.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`quotes-dot ${i === index ? "quotes-dot--active" : ""}`}
                aria-label={`Zitat ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="quotes-body">
          <button
            type="button"
            className="quotes-nav quotes-nav--prev quotes-fade"
            aria-label="Vorheriges Zitat"
            onClick={() => go(-1)}
          >
            <ArrowIcon direction="prev" />
          </button>

          <blockquote className="quotes-quote" key={quote.id}>
            <Image
              src="/images/quotes/qmarks_top.svg"
              alt=""
              width={67}
              height={67}
              className="quotes-mark quotes-mark--open quotes-fade"
              aria-hidden
            />
            <AnimatedLetters
              as="p"
              className="quotes-text"
              text={quote.text}
              delay={0.08}
              stagger={0.005}
              whenVisible
            />
            <Image
              src="/images/quotes/qmarks_bottom.svg"
              alt=""
              width={67}
              height={67}
              className="quotes-mark quotes-mark--close quotes-fade"
              aria-hidden
            />
            <footer className="quotes-attrib">
              <AnimatedLetters
                as="p"
                className="quotes-name"
                text={quote.name}
                delay={0.55}
                stagger={0.012}
                whenVisible
              />
              <AnimatedLetters
                as="p"
                className="quotes-company"
                text={quote.company}
                delay={0.7}
                stagger={0.01}
                whenVisible
              />
            </footer>
          </blockquote>

          <button
            type="button"
            className="quotes-nav quotes-nav--next quotes-fade"
            aria-label="Nächstes Zitat"
            onClick={() => go(1)}
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
