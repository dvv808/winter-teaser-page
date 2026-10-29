import Image from "next/image";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { PhoneLink } from "@/components/PhoneLink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#team", label: "Unser Team" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "#login", label: "Wino Login" },
] as const;

const legalLinks = [
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/impressum", label: "Impressum" },
  { href: "/cookie-einstellungen", label: "Cookie Einstellungen" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
] as const;

const socialLinks = [
  {
    href: "https://www.youtube.com/@makler-winterat",
    label: "YouTube",
    icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
        <path
          d="M21.3 2.5a2.75 2.75 0 0 0-1.94-1.95C17.7.1 11 .1 11 .1s-6.7 0-8.36.45A2.75 2.75 0 0 0 .7 2.5 28.8 28.8 0 0 0 .25 8a28.8 28.8 0 0 0 .45 5.5 2.75 2.75 0 0 0 1.94 1.95C4.3 15.9 11 15.9 11 15.9s6.7 0 8.36-.45a2.75 2.75 0 0 0 1.94-1.95A28.8 28.8 0 0 0 21.75 8a28.8 28.8 0 0 0-.45-5.5ZM8.9 11.3V4.7L14.4 8l-5.5 3.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/makler.winter",
    label: "Facebook",
    icon: (
      <svg width="12" height="22" viewBox="0 0 12 22" fill="none" aria-hidden>
        <path
          d="M7.6 21.5V12h3.05l.45-3.5H7.6V6.25c0-1 .28-1.7 1.73-1.7H11.2V1.4C10.7 1.33 9.55 1.2 8.2 1.2 5.4 1.2 3.5 2.9 3.5 5.9V8.5H.5V12h3v9.5h4.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/winter_versicherungsmakler/",
    label: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle
          cx="12"
          cy="12"
          r="4.25"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="17.5" cy="6.5" r="1.15" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/winterversicherungsmakler",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M4.05 6.3H.75V17.1h3.3V6.3ZM2.4.9a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM17.25 17.1h-3.28v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76V17.1H6.97V6.3h3.14v1.47h.04c.44-.83 1.5-1.7 3.1-1.7 3.31 0 3.92 2.18 3.92 5.01V17.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer" id="kontakt">
      <div className="site-footer-inner">
        <div className="site-footer-content">
          <div className="site-footer-top">
            <Image
              src="/logos/Winter Logo.svg"
              alt="Winter Versicherungsmakler"
              width={140}
              height={42}
              className="site-footer-logo"
            />
            <p className="site-footer-tagline">
              Deine Versicherung, zu deinen Konditionen.
            </p>
          </div>

          <div className="site-footer-main">
            <div className="site-footer-nav-block">
              <nav className="site-footer-nav" aria-label="Footer Navigation">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="site-footer-socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="site-footer-columns">
              <div className="site-footer-col">
                <h3 className="site-footer-col-title">Bürozeiten</h3>
                <p>
                  Montag bis Donnerstag:
                  <br />
                  08:00 - 12:30
                  <br />
                  13:30 - 16:00
                </p>
                <p>
                  Freitag:
                  <br />
                  08:00 - 11:00
                </p>
              </div>

              <div className="site-footer-col-stroke" aria-hidden />

              <div className="site-footer-col">
                <h3 className="site-footer-col-title">Kontakt Schladming</h3>
                <p>
                  Winter Versicherungsmakler
                  <br />
                  Obere Klaus 244
                  <br />
                  8970 Schladming
                </p>
                <p>
                  <ObfuscatedEmail user="office" domain="makler-winter.at" />
                  <br />
                  <PhoneLink phone="+43 3687 23753" />
                </p>
              </div>

              <div className="site-footer-col-stroke" aria-hidden />

              <div className="site-footer-col">
                <h3 className="site-footer-col-title">Kontakt Kapfenberg</h3>
                <p>
                  Winter Versicherungsmakler
                  <br />
                  Wiener Straße 45
                  <br />
                  8605 Kapfenberg
                </p>
                <p>
                  <ObfuscatedEmail user="office" domain="makler-winter.at" />
                  <br />
                  <PhoneLink phone="+43 3687 23753" />
                </p>
              </div>
            </div>
          </div>

          <div className="site-footer-bottom">
            <nav className="site-footer-legal" aria-label="Rechtliches">
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="site-footer-copy">
              © 2025 Winter Versicherungsmakler Ges.m.b.H.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
