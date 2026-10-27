"use client";

import { useEffect, useRef, type ReactNode } from "react";

const TRANSPORT_VIDEO = "/images/full%20bleed%20media/full_bleed_transport.mp4";

type KontaktPageShellProps = {
  children: ReactNode;
};

export function KontaktPageShell({ children }: KontaktPageShellProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const syncBand = () => {
      if (window.innerWidth > 900) {
        page.style.removeProperty("--kontakt-band");
        return;
      }

      const intro = page.querySelector<HTMLElement>(".contact-page-intro");
      if (!intro) return;

      const end =
        intro.getBoundingClientRect().bottom - page.getBoundingClientRect().top;
      page.style.setProperty("--kontakt-band", `${Math.round(end)}px`);
    };

    syncBand();

    const intro = page.querySelector<HTMLElement>(".contact-page-intro");
    const observer = new ResizeObserver(syncBand);
    observer.observe(page);
    if (intro) observer.observe(intro);
    window.addEventListener("resize", syncBand);
    void document.fonts?.ready.then(syncBand);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncBand);
    };
  }, []);

  return (
    <div className="kontakt-page" ref={pageRef}>
      <div className="kontakt-page-video" aria-hidden>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className="kontakt-page-video-media"
        >
          <source src={TRANSPORT_VIDEO} type="video/mp4" />
        </video>
        <div className="kontakt-page-video-shade" />
      </div>
      <div className="kontakt-page-sheet" aria-hidden />
      <div className="kontakt-page-inner">{children}</div>
    </div>
  );
}
