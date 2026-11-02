"use client";

import { useSyncExternalStore } from "react";

type ObfuscatedEmailProps = {
  user: string;
  domain: string;
};

function addressFrom(user: string, domain: string) {
  return user + String.fromCharCode(64) + domain;
}

function mailtoHref(address: string) {
  return String.fromCharCode(109, 97, 105, 108, 116, 111, 58) + address;
}

function fallbackText(user: string, domain: string) {
  return `${user} [at] ${domain.replace(/\./g, " [dot] ")}`;
}

const noopSubscribe = () => () => {};

export function ObfuscatedEmail({ user, domain }: ObfuscatedEmailProps) {
  // The server HTML only carries the [at]/[dot] text; the link is built in the browser.
  const inBrowser = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const address = inBrowser ? addressFrom(user, domain) : null;

  if (!address) {
    return <a>{fallbackText(user, domain)}</a>;
  }

  return <a href={mailtoHref(address)}>{address}</a>;
}
