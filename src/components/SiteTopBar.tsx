"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteNav, type SiteNavActiveId } from "@/components/SiteNav";
import { useScrollHideOnDown } from "@/hooks/useScrollHideOnDown";

type SiteTopBarProps = {
  activeId?: SiteNavActiveId | null;
};

export function SiteTopBar({ activeId = "home" }: SiteTopBarProps) {
  const visible = useScrollHideOnDown();

  return (
    <div
      className={`site-top-bar ${visible ? "" : "site-top-bar--hidden"}`}
      aria-hidden={!visible}
    >
      <Link href="/" className="site-top-bar-logo">
        <Image
          src="/logos/Winter Logo.svg"
          alt="Winter Versicherungsmakler"
          width={140}
          height={42}
          priority
        />
      </Link>
      <SiteNav activeId={activeId ?? undefined} />
    </div>
  );
}
