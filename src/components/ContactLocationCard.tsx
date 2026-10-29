"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { PhoneLink } from "@/components/PhoneLink";
import type { ContactLocation } from "@/lib/contact";
import { mapsHref, officeHours } from "@/lib/contact";

type ContactLocationCardProps = {
  location: ContactLocation;
  flipped?: boolean;
  revealDelay?: number;
};

export function ContactLocationCard({
  location,
  flipped = false,
  revealDelay = 0,
}: ContactLocationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`contact-card-frame ${visible ? "contact-card-frame--visible" : ""}`.trim()}
      style={
        {
          transitionDelay: visible ? `${revealDelay}ms` : "0ms",
        } as CSSProperties
      }
    >
      <article className={flipped ? "contact-card contact-card--flip" : "contact-card"}>
        <div className="contact-card-inner">
          <h2 className="contact-card-title">{location.name}</h2>

          <div className="contact-card-grid">
            <div className="contact-card-rule" aria-hidden />

            <div className="contact-card-col">
              <h3 className="contact-card-col-title">{officeHours.title}</h3>
              <p>
                {officeHours.weekdays.label}
                <br />
                {officeHours.weekdays.lines[0]}
                <br />
                {officeHours.weekdays.lines[1]}
              </p>
              <p>
                {officeHours.friday.label}
                <br />
                {officeHours.friday.lines[0]}
              </p>
            </div>

            <div className="contact-card-col">
              <h3 className="contact-card-col-title">{location.contactTitle}</h3>
              <p>
                <a
                  href={mapsHref(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {location.company}
                  <br />
                  {location.address[0]}
                  <br />
                  {location.address[1]}
                </a>
              </p>
              <p className="contact-card-links">
                <ObfuscatedEmail
                  user={location.email.user}
                  domain={location.email.domain}
                />
                <PhoneLink phone={location.phone} />
              </p>
            </div>
          </div>
        </div>
      </article>
      <img
        className={
          flipped
            ? "contact-card-outline contact-card-outline--flip"
            : "contact-card-outline"
        }
        src="/images/home/icons/contact_blocks.svg?v=2"
        alt=""
        width={708}
        height={470}
      />
    </div>
  );
}
