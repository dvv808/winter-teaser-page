"use client";

import type { CSSProperties } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";

const logos = [
  "Alpine Bau",
  "Nordstern AG",
  "Möbius & Co",
  "Klarwerk",
  "Donau Tech",
  "Feldmann GmbH",
  "Helvetia Soft",
  "Greiner Logistics",
  "Steiner Holz",
  "Orbit Media",
  "VitaCare",
  "Lumen Energy",
  "Bergmann KG",
  "Pulse Finance",
  "Astra Hotels",
  "Rhein Digital",
  "Nova Pharma",
  "Kühn Maschinen",
  "Atlas Food",
  "Silberwerk",
  "Horizon IT",
  "Weissmann",
  "Delta Bau",
  "Sonnleitner",
] as const;

/** Staggered cycles — each logo generates, holds, then vanishes */
const pulseByIndex = [
  { duration: "11.2s", delay: "0s" },
  { duration: "12.4s", delay: "1.4s" },
  { duration: "10.6s", delay: "2.8s" },
  { duration: "13.1s", delay: "0.7s" },
  { duration: "11.8s", delay: "3.6s" },
  { duration: "12.8s", delay: "2.1s" },
  { duration: "10.9s", delay: "4.5s" },
  { duration: "13.5s", delay: "0.4s" },
  { duration: "11.4s", delay: "3.2s" },
  { duration: "12.1s", delay: "5.4s" },
  { duration: "13.0s", delay: "1.7s" },
  { duration: "10.5s", delay: "4.1s" },
  { duration: "12.6s", delay: "1.0s" },
  { duration: "11.0s", delay: "5.0s" },
  { duration: "13.3s", delay: "2.4s" },
  { duration: "11.7s", delay: "5.9s" },
  { duration: "12.2s", delay: "1.9s" },
  { duration: "10.8s", delay: "3.8s" },
  { duration: "13.6s", delay: "0.5s" },
  { duration: "11.5s", delay: "5.2s" },
  { duration: "12.9s", delay: "3.0s" },
  { duration: "10.4s", delay: "5.6s" },
  { duration: "13.2s", delay: "2.2s" },
  { duration: "11.9s", delay: "4.3s" },
] as const;

export function TrustLogosSection() {
  return (
    <section className="trust-section" aria-labelledby="trust-heading">
      <AnimatedLetters
        as="h2"
        id="trust-heading"
        className="text-h2 trust-heading"
        text="Unternehmen die uns vertrauen"
        delay={0.1}
        stagger={0.012}
        whenVisible
      />

      <ul className="trust-constellation" aria-label="Partnerunternehmen">
        {logos.map((name, i) => {
          const pulse = pulseByIndex[i % pulseByIndex.length];
          return (
            <li
              key={name}
              className="trust-logo"
              style={
                {
                  "--trust-pulse-duration": pulse.duration,
                  "--trust-pulse-delay": pulse.delay,
                } as CSSProperties
              }
            >
              <span className="trust-logo-mark">{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
