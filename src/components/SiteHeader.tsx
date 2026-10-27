"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteNav, type SiteNavActiveId } from "@/components/SiteNav";
import { useScrollHideOnDown } from "@/hooks/useScrollHideOnDown";

type SiteHeaderProps = {
  activeId?: SiteNavActiveId;
};

export function SiteHeader({ activeId = "home" }: SiteHeaderProps) {
  const menuVisible = useScrollHideOnDown();

  return (
    <header className="site-page-header">
      <Link
        href="/"
        className={`site-page-header-logo site-chrome-reveal ${menuVisible ? "" : "site-chrome-reveal--hidden"}`}
      >
        <Image
          src="/logos/Winter Logo Ink.svg"
          alt="Winter Versicherungsmakler"
          width={140}
          height={42}
          priority
        />
      </Link>

      <div
        className={`site-page-header-nav site-chrome-reveal ${menuVisible ? "" : "site-chrome-reveal--hidden"}`}
      >
        <SiteNav activeId={activeId} />
      </div>
    </header>
  );
}
