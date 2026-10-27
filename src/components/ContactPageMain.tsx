"use client";

import { AnimatedLetters } from "@/components/AnimatedLetters";
import { ContactLocationCard } from "@/components/ContactLocationCard";
import { contactLocations } from "@/lib/contact";

export function ContactPageMain() {
  return (
    <main className="contact-page">
      <div className="contact-page-intro">
        <img
          className="contact-page-mark"
          src="/images/home/icons/contact-w.svg"
          alt=""
          width={61}
          height={37}
        />
        <AnimatedLetters
          as="h1"
          className="contact-page-title"
          text={"Damit Sie ernten,\nwas Sie säen"}
          delay={0.12}
          stagger={0.014}
        />
      </div>

      <div className="contact-cards">
        {contactLocations.map((location, index) => (
          <ContactLocationCard
            key={location.id}
            location={location}
            flipped={index === 1}
            revealDelay={index * 160}
          />
        ))}
      </div>
      <p className="contact-page-copyright">
        © 2026 Winter Versicherungsmakler Ges.m.b.H.
      </p>
    </main>
  );
}
