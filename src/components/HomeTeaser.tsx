"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { PhoneLink } from "@/components/PhoneLink";
import { SocialIcon } from "@/components/SocialIcon";
import { SocialPhotoGrid } from "@/components/SocialPhotoGrid";
import { contactLocations } from "@/lib/contact";
import { socialLinks } from "@/lib/social";

const legalLinks = [
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/impressum", label: "Impressum" },
  { href: "/cookie-einstellungen", label: "Cookie Einstellungen" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
] as const;

const CHICKENS = [
  { y: "16%", dur: "7.4s", delay: "0s", scale: 0.82, back: false },
  { y: "30%", dur: "6.2s", delay: "0.25s", scale: 1.08, back: false },
  { y: "44%", dur: "8.6s", delay: "0.1s", scale: 0.7, back: true },
  { y: "56%", dur: "5.8s", delay: "0.55s", scale: 1.16, back: false },
  { y: "68%", dur: "7.8s", delay: "0.15s", scale: 0.92, back: false },
  { y: "22%", dur: "9s", delay: "0.8s", scale: 0.66, back: true },
  { y: "78%", dur: "6.6s", delay: "0.4s", scale: 1, back: false },
] as const;

function ChickenMark() {
  return (
    <svg viewBox="0 0 80 56" aria-hidden>
      <g className="chicken-bob">
        <path
          d="M16 34c1-10 10-16 20-13 2-8 14-10 18-2 8 1 14 8 12 16-9 7-32 11-44 5-3-2-6-4-6-6z"
          fill="#f7f7f7"
        />
        <path d="M14 30c-8-1-12 7-5 9 3-3 5-5 5-9z" fill="#ececec" />
        <circle cx="54" cy="20" r="9" fill="#ffffff" />
        <path
          d="M48 14c2-6 4-6 6 0 2-7 5-6 6 1-4 1-8 1-12-1z"
          fill="#e61951"
        />
        <path d="M61 20h10l-10 4z" fill="#f2b134" />
        <circle cx="57" cy="18" r="1.3" fill="#313537" />
        <ellipse cx="36" cy="34" rx="8" ry="5" fill="#e7e7e7" />
      </g>
      <g className="chicken-leg">
        <path
          d="M30 40v12M26 52h8"
          stroke="#e2a15a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g className="chicken-leg chicken-leg--b">
        <path
          d="M42 40v12M38 52h8"
          stroke="#e2a15a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function HomeTeaser() {
  const [panelsIn, setPanelsIn] = useState(false);
  const [flock, setFlock] = useState(0);
  const clicks = useRef(0);
  const clickTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!flock) return;
    const hide = window.setTimeout(() => setFlock(0), 11000);
    return () => window.clearTimeout(hide);
  }, [flock]);

  function onCopyrightClick() {
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    clicks.current += 1;
    if (clicks.current >= 10) {
      clicks.current = 0;
      setFlock((current) => current + 1);
      return;
    }
    clickTimer.current = window.setTimeout(() => {
      clicks.current = 0;
    }, 2000);
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPanelsIn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="home-teaser">
      <div className="home-teaser-bg" aria-hidden>
        <img src="/images/home/landscape.jpg?v=3" alt="" />
        <div className="home-teaser-scrim" />
        <div className="home-teaser-rays" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="home-teaser-inner">
        <header className="home-intro">
          <AnimatedLetters
            as="p"
            text="Willkommen auf unserer Übergangsseite"
            delay={0.12}
            stagger={0.008}
          />
          <AnimatedLetters
            as="h1"
            text="Unsere neue Website ist in Arbeit"
            delay={0.45}
            stagger={0.01}
          />
        </header>

        <div className={`home-panels${panelsIn ? " home-panels--in" : ""}`}>
          <div className="home-panels-side">
            <article className="home-card home-card--web">
              <img
                className="home-card-photo"
                src="/images/home/neue-webseite.png"
                alt=""
              />
              <div className="home-card-shade" aria-hidden>
                <span className="home-card-glow" />
                <span className="home-card-glow" />
                <span className="home-card-glow" />
                <span className="home-card-glow" />
                <span className="home-card-glow" />
              </div>
              <div className="home-card-copy">
                <h2>Persönlich für Sie da</h2>
                <p>
                  Unser neuer Webauftritt braucht noch etwas Zeit. Für Ihre
                  Anliegen sind wir wie gewohnt persönlich erreichbar.
                </p>
              </div>
            </article>

            <article className="home-card home-card--social home-glass">
              <h2>Soziale Medien</h2>
              <SocialPhotoGrid />
              <div className="home-social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <SocialIcon
                      id={link.id}
                      width={link.cardWidth}
                      height={link.cardHeight}
                    />
                  </a>
                ))}
              </div>
            </article>
          </div>

          <div className="home-contact-frame">
          <article
            className="home-card home-card--contact home-glass"
            id="kontakt"
          >
            <div className="home-contact-head">
              <h2>Kontakt</h2>
              <img
                className="home-contact-mark"
                src="/images/home/icons/w-mark.svg"
                alt=""
                width={61}
                height={32}
              />
            </div>

            <div className="home-contact-locations">
              <div className="home-contact-rule" aria-hidden />
              {contactLocations.map((location) => (
                <div key={location.id} className="home-contact-location">
                  <h3>{location.name}</h3>
                  <p className="home-contact-address">
                    {location.company}
                    <br />
                    {location.address[0]}
                    <br />
                    {location.address[1]}
                  </p>
                  <p className="home-contact-links">
                    <ObfuscatedEmail
                      user={location.email.user}
                      domain={location.email.domain}
                    />
                    <PhoneLink phone={location.phone} />
                  </p>
                </div>
              ))}
            </div>

            <nav className="home-contact-legal" aria-label="Rechtliches">
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </article>
          <img
            className="home-contact-outline"
            src="/images/home/icons/mainblock_vector.svg?v=2"
            alt=""
            width={694}
            height={612}
          />
          </div>
        </div>
      </div>

      <p className="home-copyright" onClick={onCopyrightClick}>
        © 2026 Winter Versicherungsmakler Ges.m.b.H.
      </p>
      {flock > 0 && (
        <div className="chicken-flock" key={flock} aria-hidden>
          {CHICKENS.map((chicken) => (
            <span
              key={`${chicken.y}-${chicken.delay}`}
              className={`chicken${chicken.back ? " chicken--back" : ""}`}
              style={
                {
                  "--chicken-y": chicken.y,
                  "--chicken-dur": chicken.dur,
                  "--chicken-delay": chicken.delay,
                  "--chicken-scale": String(chicken.scale),
                } as CSSProperties
              }
            >
              <ChickenMark />
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
