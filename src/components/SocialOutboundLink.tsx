"use client";

import { forwardRef, type ComponentProps } from "react";
import { allowsExternalMedia, socialProvider } from "@/lib/consent";
import { useConsentApi } from "@/components/CookieConsent";

type SocialOutboundLinkProps = ComponentProps<"a"> & {
  href: string;
  label?: string;
};

export const SocialOutboundLink = forwardRef<
  HTMLAnchorElement,
  SocialOutboundLinkProps
>(function SocialOutboundLink({ href, label, onClick, ...rest }, ref) {
  const { openLeave } = useConsentApi();
  const provider = socialProvider(href);

  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !provider || allowsExternalMedia()) return;
        event.preventDefault();
        openLeave(href, label ?? provider);
      }}
    />
  );
});
