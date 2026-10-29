"use client";

import { ContactLocationCard } from "@/components/ContactLocationCard";
import { contactLocations } from "@/lib/contact";

export function ContactPageMain() {
  return (
    <main className="contact-page">
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
