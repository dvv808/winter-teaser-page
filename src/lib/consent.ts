export const CONSENT_STORAGE_KEY = "winter-consent";
export const CONSENT_EVENT = "winter-consent";
export const CONSENT_VERSION = 1;

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const SOCIAL_HOSTS: { host: RegExp; label: string }[] = [
  { host: /(^|\.)youtube\.com$/i, label: "YouTube" },
  { host: /(^|\.)youtu\.be$/i, label: "YouTube" },
  { host: /(^|\.)facebook\.com$/i, label: "Facebook" },
  { host: /(^|\.)fb\.com$/i, label: "Facebook" },
  { host: /(^|\.)instagram\.com$/i, label: "Instagram" },
  { host: /(^|\.)linkedin\.com$/i, label: "LinkedIn" },
];

export type ConsentChoice = {
  version: number;
  necessary: true;
  externalMedia: boolean;
  decidedAt: string;
};

let sessionChoice: ConsentChoice | null = null;

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return sessionChoice;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (parsed.version !== CONSENT_VERSION || parsed.necessary !== true) return null;
    if (typeof parsed.externalMedia !== "boolean") return null;
    if (typeof parsed.decidedAt !== "string") return null;
    const decidedAt = Date.parse(parsed.decidedAt);
    if (Number.isNaN(decidedAt) || Date.now() - decidedAt > YEAR_MS) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      externalMedia: parsed.externalMedia,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return sessionChoice;
  }
}

export function writeConsent(externalMedia: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    version: CONSENT_VERSION,
    necessary: true,
    externalMedia,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Storage blocked (private mode): the choice holds for this page view only.
  }
  sessionChoice = choice;
  window.dispatchEvent(new Event(CONSENT_EVENT));
  return choice;
}

export function allowsExternalMedia() {
  return readConsent()?.externalMedia === true;
}

export function socialProvider(href: string) {
  try {
    const hostname = new URL(href, "https://example.com").hostname;
    return SOCIAL_HOSTS.find((item) => item.host.test(hostname))?.label ?? null;
  } catch {
    return null;
  }
}
