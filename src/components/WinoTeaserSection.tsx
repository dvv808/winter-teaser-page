"use client";

import Image from "next/image";
import { AnimatedLetters } from "@/components/AnimatedLetters";
import { WinoFloaterSection } from "@/components/WinoFloaterSection";
import { WinoStrokes } from "@/components/WinoStrokes";

export function WinoTeaserSection() {
  return (
    <>
      <section className="wino-teaser" aria-labelledby="wino-teaser-heading">
        <img
          src="/images/wino%20section/wino_teaser_main_bg_4k.png"
          alt=""
          className="wino-teaser-bg"
          aria-hidden
        />

        <div className="wino-teaser-strokes" aria-hidden>
          <WinoStrokes />
        </div>

        <div className="wino-teaser-copy">
          <Image
            src="/images/wino%20section/Wino_Logo_Full.svg"
            alt="WINO"
            width={280}
            height={80}
            className="wino-teaser-logo"
          />

          <AnimatedLetters
            as="h2"
            id="wino-teaser-heading"
            className="text-h2 wino-teaser-heading"
            text="Deine Versicherungen. Dein Makler. Alles an einem Ort."
            delay={0.1}
            stagger={0.012}
            whenVisible
          />

          <AnimatedLetters
            as="p"
            className="text-section-body wino-teaser-body"
            text="Behalte den Überblick über deine Verträge, melde Schäden unkompliziert online und erreiche deinen Makler direkt — alles über WINO."
            delay={0.55}
            stagger={0.008}
            whenVisible
          />
        </div>
      </section>

      <WinoFloaterSection />
    </>
  );
}
