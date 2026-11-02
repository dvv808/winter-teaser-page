"use client";

import { useEffect, useRef, useState } from "react";
import { SocialOutboundLink } from "@/components/SocialOutboundLink";

const SLOT_MS = 4000;

const socialPhotos = [
  {
    src: "/images/home/social-woman.jpg",
    video: "/images/home/social-woman.mp4?v=4",
    alt: "Winter Mitarbeiterin auf einer Veranstaltung",
    position: "center 18%",
    href: "https://www.youtube.com/watch?v=ONba5rrLt8M",
  },
  {
    src: "/images/home/social-mug.jpg",
    video: "/images/home/social-mug.mp4?v=2",
    alt: "Winter Tasse",
    position: "center center",
    href: "https://www.linkedin.com/company/winterversicherungsmakler",
  },
  {
    src: "/images/home/social-man.jpg",
    video: "/images/home/social-man.mp4?v=2",
    alt: "Winter Mitarbeiter vor dem Büro",
    position: "center 22%",
    href: "https://www.instagram.com/winter_versicherungsmakler/",
  },
  {
    src: "/images/home/social-building.jpg",
    video: "/images/home/social-building.mp4?v=4",
    alt: "Bürogebäude von Winter Versicherungsmakler",
    position: "center 48%",
    href: "https://www.facebook.com/makler.winter",
  },
] as const;

function showVideo(index: number) {
  return (current: boolean[]) => {
    if (current[index]) return current;
    const next = [...current];
    next[index] = true;
    return next;
  };
}

function playClip(video: HTMLVideoElement) {
  video.muted = true;
  const pending = video.play();
  if (pending) pending.catch(() => {});
}

export function SocialPhotoGrid() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [ready, setReady] = useState<boolean[]>(() =>
    socialPhotos.map(() => false),
  );
  const [reduced, setReduced] = useState(false);
  const [limit, setLimit] = useState<number>(socialPhotos.length);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      setReduced(motion.matches);
      setLimit(narrow.matches ? 3 : socialPhotos.length);
    };
    sync();
    motion.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  // On phones only 3 photos show, so an index past the limit falls back to the first.
  const current = active < limit ? active : 0;
  const playing = reduced ? hovered : (hovered ?? current);

  useEffect(() => {
    activeRef.current = current;
    const video = videos.current[current];
    if (!video || video.readyState < 1) return;
    video.currentTime = 0;
  }, [current]);

  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === playing) playClip(video);
      else video.pause();
    });
  }, [playing]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || playing === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      const video = videos.current[playing];
      if (video) playClip(video);
    }, { threshold: 0.25 });
    observer.observe(row);
    return () => observer.disconnect();
  }, [playing]);

  useEffect(() => {
    if (reduced || hovered !== null) return;
    const id = window.setTimeout(() => {
      setActive((index) => ((index < limit ? index : 0) + 1) % limit);
    }, SLOT_MS);
    return () => window.clearTimeout(id);
  }, [active, hovered, reduced, limit]);

  return (
    <div className="home-social-photos" ref={rowRef}>
      {socialPhotos.map((photo, index) => {
        const isPlaying = playing === index && ready[index];
        return (
          <SocialOutboundLink
            key={photo.src}
            href={photo.href}
            className={isPlaying ? "is-playing" : undefined}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse") return;
              const video = videos.current[index];
              if (video && video.readyState >= 1) video.currentTime = 0;
              setHovered(index);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "mouse") return;
              const video = videos.current[activeRef.current];
              if (video) video.currentTime = 0;
              setHovered((current) => (current === index ? null : current));
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{ objectPosition: photo.position }}
            />
            <video
              ref={(node) => {
                videos.current[index] = node;
              }}
              src={photo.video}
              muted
              loop
              playsInline
              autoPlay={index === 0}
              preload="metadata"
              aria-hidden
              onPlaying={() => setReady(showVideo(index))}
            />
          </SocialOutboundLink>
        );
      })}
    </div>
  );
}
