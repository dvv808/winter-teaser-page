# Winter Versicherungsmakler – Teaser

Transitional website for www.makler-winter.at while the new website is being built.
Next.js (App Router), React and Tailwind; every page is prerendered as static HTML.

## Pages

- `/` – teaser with contact card and social clips
- `/kontakt` – both locations with office hours
- `/zulassungsstelle` – registration office: plates, documents, costs, hours
- `/impressum`, `/datenschutz`, `/cookie-einstellungen`, `/barrierefreiheit` – legal texts

## Content

- Contact data and office hours: `src/lib/contact.ts`
- Zulassungsstelle content: `src/lib/zulassung.ts`
- Social links: `src/lib/social.ts`
- Legal texts: `src/content/legal-pages.json`

## Cookie notice

`src/components/CookieConsent.tsx` stores the visitor's choice in localStorage
(`winter-consent`, 12 months). Without consent, links to YouTube, Facebook,
Instagram and LinkedIn show a "Sie verlassen diese Seite" notice first. The
choice can be changed on `/cookie-einstellungen`.

## Development

```bash
npm install
npm run dev
```

Before deploying, run `npm run lint` and `npm run build`.
