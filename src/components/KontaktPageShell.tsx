import type { ReactNode } from "react";

const LANDSCAPE = "/images/home/landscape.jpg?v=3";

type KontaktPageShellProps = {
  children: ReactNode;
};

export function KontaktPageShell({ children }: KontaktPageShellProps) {
  return (
    <div className="kontakt-page">
      <div className="kontakt-page-video" aria-hidden>
        <img src={LANDSCAPE} alt="" className="kontakt-page-video-media" />
        <div className="home-teaser-rays">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="kontakt-page-inner">{children}</div>
    </div>
  );
}
