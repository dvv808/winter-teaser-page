"use client";

import { useEffect, useState } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";
import { SocialIcon } from "@/components/SocialIcon";
import { contactLocations } from "@/lib/contact";
import { socialLinks } from "@/lib/social";

const legalLinks = [
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/impressum", label: "Impressum" },
  { href: "/cookie-einstellungen", label: "Cookie Einstellungen" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
] as const;

const socialPhotos = [
  {
    src: "/images/home/social-woman.jpg",
    alt: "Winter Mitarbeiterin auf einer Veranstaltung",
    position: "center 18%",
    href: "https://www.youtube.com/watch?v=ONba5rrLt8M",
  },
  {
    src: "/images/home/social-mug.jpg",
    alt: "Winter Tasse",
    position: "center center",
    href: "https://www.linkedin.com/company/winterversicherungsmakler",
  },
  {
    src: "/images/home/social-man.jpg",
    alt: "Winter Mitarbeiter vor dem Büro",
    position: "center 22%",
    href: "https://www.instagram.com/winter_versicherungsmakler/",
  },
  {
    src: "/images/home/social-building.jpg",
    alt: "Bürogebäude von Winter Versicherungsmakler",
    position: "center 48%",
    href: "https://www.youtube.com/@makler-winterat",
  },
] as const;

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function HomeTeaser() {
  const [panelsIn, setPanelsIn] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPanelsIn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="home-teaser">
      <div className="home-teaser-bg" aria-hidden>
        <img src="/images/home/landscape.jpg?v=3" alt="" />
        <div className="home-teaser-scrim" />
      </div>

      <div className="home-teaser-inner">
        <header className="home-intro">
          <AnimatedLetters
            as="p"
            text="Wir sind österreichweit tätig und betreuen 1.806 Geschäftskunden in allen Bundesländern."
            delay={0.12}
            stagger={0.008}
          />
          <AnimatedLetters
            as="h1"
            text={"Deine Versicherung,\nzu deinen Konditionen."}
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
              <div className="home-card-shade" aria-hidden />
              <div className="home-card-copy">
                <h2>Neue Webseite</h2>
                <p>
                  Wir überarbeiten unseren Online-Auftritt und sind bald mit
                  einer neuen Website für Sie da.
                </p>
              </div>
            </article>

            <article className="home-card home-card--social home-glass">
              <h2>Soziale Medien</h2>
              <div className="home-social-photos">
                {socialPhotos.map((photo) => (
                  <a
                    key={photo.src}
                    href={photo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      style={{ objectPosition: photo.position }}
                    />
                  </a>
                ))}
              </div>
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
                    <a href={`mailto:${location.email}`}>{location.email}</a>
                    <a href={phoneHref(location.phone)}>{location.phone}</a>
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

      <p className="home-copyright">
        © 2026 Winter Versicherungsmakler Ges.m.b.H.
      </p>
    </main>
  );
}
