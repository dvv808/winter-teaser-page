"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";
import { WinoStrokes } from "@/components/WinoStrokes";

const ICONS = "/images/wino%20section/Card%20Icons";

const cards = [
  {
    id: "vertrag",
    title: "Vertragsübersicht",
    body: "Alle deine Versicherungen zentral und übersichtlich an einem Ort",
    icon: `${ICONS}/Icon_vertrag.svg`,
    slot: "top-right",
    style: { top: "calc(12% - 60px)", right: "8%", left: "auto" },
    at: 0.08,
  },
  {
    id: "schaden",
    title: "Schaden melden",
    body: "Unkompliziert und direkt online, ohne Telefon und Warteschleife",
    icon: `${ICONS}/Icon_schadenmelden.svg`,
    slot: "mid-left",
    style: { top: "calc(32% - 60px)", left: "8%", right: "auto" },
    at: 0.18,
  },
  {
    id: "ansprechpartner",
    title: "Dein Ansprechpartner",
    body: "Dein Makler erreichst du direkt über die Plattform.",
    icon: `${ICONS}/Icon_ansprechpartner.svg`,
    slot: "mid-right",
    style: { top: "calc(52% - 60px)", right: "8%", left: "auto" },
    at: 0.28,
  },
  {
    id: "stand",
    title: "Neuster Stand",
    body: "Automatische infos wenn sich etwas an deinen Verträgen ändert",
    icon: `${ICONS}/Icon_Neusterstand.svg`,
    slot: "bottom-left",
    style: { top: "calc(72% - 60px)", left: "8%", right: "auto" },
    at: 0.38,
  },
] as const;

/** Crossfade backgrounds: 3rd card → outro image; after last card parks → flipped main bg + copy */
const IMAGE_SWAP_1_AT = 0.28;

/** Scroll distance (as section progress) for a card to travel from bottom → park */
const CARD_TRAVEL = 0.09;
const CARD_FROM_VH = 110;
const LAST_CARD_PARKED_AT =
  cards[cards.length - 1].at + CARD_TRAVEL;
const IMAGE_SWAP_2_AT = LAST_CARD_PARKED_AT;
const OUTRO_AT = LAST_CARD_PARKED_AT;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function cardEnterProgress(progress: number, at: number) {
  return easeOutCubic(
    Math.min(1, Math.max(0, (progress - at) / CARD_TRAVEL)),
  );
}

export function WinoFloaterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    function onChange() {
      setReduceMotion(mq.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const showSwap1 = progress >= IMAGE_SWAP_1_AT;
  const showSwap2 = progress >= IMAGE_SWAP_2_AT;
  const outro = progress >= OUTRO_AT;
  const cardsOut = progress >= LAST_CARD_PARKED_AT;

  return (
    <section
      ref={sectionRef}
      className="wino-floater-section"
      aria-label="WINO App Features"
    >
      <div className={`wino-floater-sticky ${outro ? "wino-floater-sticky--outro" : ""}`}>
        <img
          src="/images/wino%20section/wino_teaser_floaterbg.png"
          alt="WINO App Überblick"
          className={`wino-floater-img ${showSwap1 ? "wino-floater-img--dimmed" : ""}`}
        />

        <Image
          src="/images/wino%20section/wino_outro.png"
          alt=""
          fill
          sizes="100vw"
          quality={95}
          className={`wino-floater-bg-swap wino-floater-bg-swap--1 ${showSwap1 ? "wino-floater-bg-swap--visible" : ""} ${showSwap2 ? "wino-floater-bg-swap--dimmed" : ""}`}
          aria-hidden
        />

        <Image
          src="/images/wino%20section/wino_teaser_main_bg_4k.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className={`wino-floater-bg-swap wino-floater-bg-swap--2 wino-floater-bg-swap--flipped ${showSwap2 ? "wino-floater-bg-swap--visible" : ""}`}
          aria-hidden
        />

        <div className={`wino-floater-cards ${cardsOut ? "wino-floater-cards--out" : ""}`}>
          {cards.map((card) => {
            const enter = reduceMotion
              ? progress >= card.at
                ? 1
                : 0
              : cardEnterProgress(progress, card.at);
            const parked = enter >= 1;
            const active = enter > 0 && !cardsOut;
            const offsetY = (1 - enter) * CARD_FROM_VH;

            return (
              <article
                key={card.id}
                className={`wino-card wino-card--${card.slot} ${active ? "wino-card--visible" : ""} ${parked ? "wino-card--parked" : ""}`}
                style={
                  {
                    ...(card.style as unknown as CSSProperties),
                    "--card-y": `${offsetY}vh`,
                  } as CSSProperties
                }
              >
                <div className="wino-card-glass">
                  <h3 className="wino-card-title">{card.title}</h3>
                  <p className="wino-card-body">{card.body}</p>
                  <div className="wino-card-footer">
                    <span className="wino-card-rule" aria-hidden />
                    <Image
                      src={card.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="wino-card-icon"
                      aria-hidden
                    />
                    <span className="wino-card-rule" aria-hidden />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`wino-floater-outro ${outro ? "wino-floater-outro--visible" : ""}`}
        >
          <Image
            src="/images/wino%20section/wino_logo_isolated.svg"
            alt=""
            width={72}
            height={72}
            className="wino-floater-outro-logo"
            aria-hidden
          />
          {outro ? (
            <AnimatedLetters
              as="p"
              className="wino-floater-outro-text"
              text="Wino steht Kunden von Makler Winter zur Verfügung. Deinen persönlichen Zugang erhältst du direkt von deinem Makler - einfach anfragen und los geht's."
              delay={0.12}
              stagger={0.008}
            />
          ) : (
            <p className="wino-floater-outro-text" aria-hidden>
              Wino steht Kunden von Makler Winter zur Verfügung. Deinen persönlichen
              Zugang erhältst du direkt von deinem Makler - einfach anfragen und los
              geht&apos;s.
            </p>
          )}
          <a href="#login" className="wino-floater-outro-cta">
            Wino einloggen
          </a>
        </div>

        <div
          className={`wino-floater-strokes-bottom ${outro ? "wino-floater-strokes-bottom--visible" : ""}`}
          aria-hidden
        >
          <WinoStrokes />
        </div>
      </div>
    </section>
  );
}
