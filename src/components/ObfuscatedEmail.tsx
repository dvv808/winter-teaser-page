"use client";

import { useLayoutEffect, useState } from "react";

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

export function ObfuscatedEmail({ user, domain }: ObfuscatedEmailProps) {
  const [address, setAddress] = useState<string | null>(null);

  useLayoutEffect(() => {
    setAddress(addressFrom(user, domain));
  }, [user, domain]);

  if (!address) {
    return <a>{fallbackText(user, domain)}</a>;
  }

  return <a href={mailtoHref(address)}>{address}</a>;
}
