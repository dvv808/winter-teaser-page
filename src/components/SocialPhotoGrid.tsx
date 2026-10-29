"use client";

import { useEffect, useRef, useState } from "react";

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
    href: "https://www.youtube.com/@makler-winterat",
  },
] as const;

export function SocialPhotoGrid() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [ready, setReady] = useState<boolean[]>(() =>
    socialPhotos.map(() => false),
  );
  const [reduced, setReduced] = useState(false);
  const [limit, setLimit] = useState<number>(socialPhotos.length);

  useEffect(() => {
    const mark = (index: number) => {
      setReady((current) => {
        if (current[index]) return current;
        const next = [...current];
        next[index] = true;
        return next;
      });
    };

    const cleanups = videos.current.map((video, index) => {
      if (!video) return () => {};
      const onReady = () => mark(index);
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) onReady();
      video.addEventListener("canplay", onReady);
      return () => video.removeEventListener("canplay", onReady);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

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

  useEffect(() => {
    if (active < limit) return;
    setActive(0);
  }, [active, limit]);

  activeRef.current = active;
  const playing = reduced ? hovered : (hovered ?? active);

  useEffect(() => {
    const video = videos.current[active];
    if (!video || video.readyState < 1) return;
    video.currentTime = 0;
  }, [active]);

  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === playing && ready[index]) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [playing, ready]);

  useEffect(() => {
    if (reduced || hovered !== null) return;
    const available = ready.flatMap((isReady, index) =>
      isReady && index < limit ? [index] : [],
    );
    if (available.length < 2) return;

    const id = window.setTimeout(() => {
      setActive((current) => {
        const position = available.indexOf(current);
        return available[(position < 0 ? 0 : position + 1) % available.length];
      });
    }, SLOT_MS);

    return () => window.clearTimeout(id);
  }, [active, hovered, reduced, ready, limit]);

  return (
    <div className="home-social-photos">
      {socialPhotos.map((photo, index) => {
        const isPlaying = playing === index && ready[index];
        return (
          <a
            key={photo.src}
            href={photo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={isPlaying ? "is-playing" : undefined}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse" || !ready[index]) return;
              const video = videos.current[index];
              if (video) video.currentTime = 0;
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
              preload="auto"
              aria-hidden
              onCanPlay={() => {
                setReady((current) => {
                  if (current[index]) return current;
                  const next = [...current];
                  next[index] = true;
                  return next;
                });
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
