"use client";

import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/SocialIcon";
import { socialLinks } from "@/lib/social";

const mainLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "/kontakt", label: "Kontakt", id: "kontakt" },
  { href: "/zulassungsstelle", label: "Zulassungstelle", id: "zulassung" },
] as const;

const menuLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "/kontakt", label: "Kontakt", id: "kontakt" },
  { href: "/zulassungsstelle", label: "Zulassungstelle", id: "zulassung" },
] as const;

export type SiteNavActiveId = (typeof mainLinks)[number]["id"];

type Pill = { left: number; width: number };

type SiteNavProps = {
  activeId?: SiteNavActiveId;
};

export function SiteNav({ activeId }: SiteNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<Pill>({ left: 3, width: 0 });
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function movePillTo(id: string) {
    const nav = navRef.current;
    const item = itemRefs.current[id];
    if (!nav || !item) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setPill({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
    });
  }

  function movePillToAfterLayout(id: string) {
    requestAnimationFrame(() => movePillTo(id));
  }

  useEffect(() => {
    if (!activeId) {
      setPill({ left: 3, width: 0 });
      setReady(true);
      return;
    }

    movePillTo(activeId);
    setReady(true);

    function onResize() {
      if (activeId) movePillTo(activeId);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    function onResize() {
      if (window.innerWidth > 900) setMenuOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className="site-nav"
      aria-label="Hauptnavigation"
      onMouseLeave={() => {
        requestAnimationFrame(() => {
          if (activeId) movePillTo(activeId);
          else setPill({ left: 3, width: 0 });
        });
      }}
    >
      <button
        type="button"
        className={`nav-burger${menuOpen ? " is-active" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="site-nav-menu"
        aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img
          src="/images/home/icons/nav-burger.svg"
          alt=""
          width={20}
          height={11.2852}
        />
        <span className="nav-burger-x" aria-hidden="true" />
      </button>

      <div
        className={`nav-menu-scrim${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="site-nav-menu"
        className={`nav-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <ul className="nav-menu-list">
          {menuLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                aria-current={link.id === activeId ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-menu-socials">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                id={link.id}
                width={link.navWidth}
                height={link.navHeight}
              />
            </a>
          ))}
        </div>
      </div>

      <span
        className="nav-active-pill"
        aria-hidden
        style={{
          width: pill.width,
          transform: `translateX(${pill.left}px)`,
          opacity: ready && pill.width > 0 ? 1 : 0,
        }}
      />

      <div className="site-nav-items">
        {mainLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            ref={(el) => {
              itemRefs.current[link.id] = el;
            }}
            className="nav-item"
            aria-current={link.id === activeId ? "page" : undefined}
            onMouseEnter={() => movePillToAfterLayout(link.id)}
          >
            {link.label}
          </a>
        ))}

        <div className="nav-socials">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              ref={(el) => {
                itemRefs.current[link.id] = el;
              }}
              className="nav-social"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => movePillToAfterLayout(link.id)}
            >
              <SocialIcon
                id={link.id}
                width={link.navWidth}
                height={link.navHeight}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
