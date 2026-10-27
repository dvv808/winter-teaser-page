"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const CLIPS = [
  "/images/hero/01_hero.mp4",
  "/images/hero/02_hero.mp4",
] as const;

const CLIP_MS = 4000;

const HeroClipContext = createContext(0);

export function HeroClipProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((index) => (index + 1) % CLIPS.length);
    }, CLIP_MS);

    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <HeroClipContext.Provider value={active}>{children}</HeroClipContext.Provider>
  );
}

type HeroVideoProps = {
  blurred?: boolean;
};

export function HeroVideo({ blurred = false }: HeroVideoProps) {
  const active = useContext(HeroClipContext);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const video = videoRefs.current[active];
    if (!video) return;

    video.currentTime = 0;
    void video.play().catch(() => {});
  }, [active]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === active) return;
      video.pause();
    });
  }, [active]);

  return (
    <>
      {CLIPS.map((src, index) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover ${
            blurred ? "scale-125 blur-[56px]" : ""
          } ${index === active ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
