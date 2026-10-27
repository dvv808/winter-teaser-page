"use client";

import { useEffect, useState } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";
import { mapsHref } from "@/lib/contact";
import {
  zulassungHours,
  zulassungIntro,
  zulassungSections,
  zulassungToc,
} from "@/lib/zulassung";

const mapsLocation = {
  id: "zulassung-schladming",
  name: "Schladming",
  contactTitle: zulassungHours.contactTitle,
  company: zulassungHours.company,
  address: [zulassungHours.street, zulassungHours.city] as [string, string],
  email: "",
  phone: zulassungHours.phone,
};

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className={`zulassung-toggle${open ? " is-open" : ""}`} aria-hidden>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1 7.5h13" stroke="currentColor" strokeWidth="1" />
        <path
          className="zulassung-toggle-vert"
          d="M7.5 1v13"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </span>
  );
}

export function ZulassungPage() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(zulassungSections.map((section) => [section.id, true])),
  );
  const [activeId, setActiveId] = useState<string>(zulassungToc[0].id);

  useEffect(() => {
    const ids = zulassungToc.map((item) => item.id);

    function update() {
      const marker = 140;
      let current = ids[0];
      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= marker) current = id;
      }
      const atEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8;
      if (atEnd) current = ids[ids.length - 1];
      setActiveId(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function jumpTo(id: string) {
    setActiveId(id);
    if (id in open) {
      setOpen((current) => ({ ...current, [id]: true }));
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="zulassung-page">
      <div className="zulassung-layout">
        <nav className="zulassung-toc" aria-label="Inhalte">
          <p className="zulassung-toc-label">Inhalte</p>
          <ul>
            {zulassungToc.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      jumpTo(item.id);
                    }}
                  >
                    {active ? (
                      <img
                        className="zulassung-toc-mark"
                        src="/images/zulassung/toc-mark.svg"
                        alt=""
                        width={16}
                        height={9}
                      />
                    ) : null}
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <header className="zulassung-intro">
          <img
            className="zulassung-mark"
            src="/images/home/icons/contact-w.svg"
            alt=""
            width={61}
            height={37}
          />
          <p className="zulassung-eyebrow">{zulassungIntro.eyebrow}</p>
          <AnimatedLetters
            as="h1"
            className="zulassung-title"
            text={zulassungIntro.title}
            delay={0.12}
            stagger={0.014}
          />
          <div className="zulassung-lead">
            {zulassungIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <div className="zulassung-sections">
          {zulassungSections.map((section) => {
            const isOpen = open[section.id];
            return (
              <section
                key={section.id}
                id={section.id}
                className="zulassung-section"
                aria-labelledby={`${section.id}-title`}
              >
                <div className="zulassung-section-inner">
                  <h2 id={`${section.id}-title`}>
                    <button
                      type="button"
                      className="zulassung-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`${section.id}-panel`}
                      onClick={() =>
                        setOpen((current) => ({
                          ...current,
                          [section.id]: !current[section.id],
                        }))
                      }
                    >
                      <span>{section.title}</span>
                      <ToggleIcon open={isOpen} />
                    </button>
                  </h2>
                  <div id={`${section.id}-panel`} hidden={!isOpen}>
                    <ul className="zulassung-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

      <section
        id={zulassungHours.id}
        className="zulassung-band"
        aria-labelledby="zulassung-hours-title"
      >
        <div className="zulassung-band-media" aria-hidden>
          <img src="/images/zulassung/hills.png" alt="" />
          <div className="zulassung-band-shade" />
        </div>

        <div className="contact-card-frame contact-card-frame--visible zulassung-hours">
          <article className="contact-card contact-card--flip">
            <div className="contact-card-inner">
              <h2 className="contact-card-title" id="zulassung-hours-title">
                {zulassungHours.title}
              </h2>
              <div className="contact-card-grid">
                <div className="contact-card-rule" aria-hidden />
                <div className="contact-card-col">
                  <h3 className="contact-card-col-title">Bürozeiten</h3>
                  <p>
                    {zulassungHours.weekdaysLabel}
                    <br />
                    {zulassungHours.weekdays}
                  </p>
                  <p>
                    {zulassungHours.fridayLabel}
                    <br />
                    {zulassungHours.friday}
                  </p>
                </div>
                <div className="contact-card-col">
                  <h3 className="contact-card-col-title">
                    {zulassungHours.contactTitle}
                  </h3>
                  <p>
                    <a
                      href={mapsHref(mapsLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {zulassungHours.company}
                      <br />
                      {zulassungHours.street}
                      <br />
                      {zulassungHours.city}
                    </a>
                  </p>
                  <p className="contact-card-links">
                    <a href={`tel:${zulassungHours.phone.replace(/\s/g, "")}`}>
                      {zulassungHours.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </article>
          <img
            className="contact-card-outline contact-card-outline--flip"
            src="/images/home/icons/contact_blocks.svg?v=2"
            alt=""
            width={708}
            height={470}
          />
        </div>
      </section>
      </div>
    </main>
  );
}
