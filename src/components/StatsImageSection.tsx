"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STAR = "/images/animation%20shooting%20star";

const segments = [
  {
    id: "01",
    src: `${STAR}/01_bottom_left.svg`,
    className: "shooting-star-seg shooting-star-seg--01",
    at: 0.12,
  },
  {
    id: "02",
    src: `${STAR}/02_top_left.svg`,
    className: "shooting-star-seg shooting-star-seg--02",
    at: 0.32,
  },
  {
    id: "03",
    src: `${STAR}/03_top_right.svg`,
    className: "shooting-star-seg shooting-star-seg--03",
    at: 0.52,
  },
  {
    id: "04",
    src: `${STAR}/04_bottom_right.svg`,
    className: "shooting-star-seg shooting-star-seg--04",
    at: 0.72,
  },
] as const;

const stats = [
  {
    id: "left",
    value: "1.806",
    label: "Geschäftskunden in ganz Österreich",
    position: "stats-pin-stat--left",
    at: 0.12,
    marker: true,
  },
  {
    id: "top",
    value: "6.000",
    label: "Privatkunden regional",
    position: "stats-pin-stat--top",
    at: 0.32,
    marker: true,
  },
  {
    id: "right",
    value: "7.000",
    labelAbove: "Pro Jahr",
    labelBelow: "Schadensfälle abgewickelt",
    position: "stats-pin-stat--right",
    at: 0.52,
    marker: true,
  },
  {
    id: "center",
    lines: ["Versicherungen mit", "Wohlfühlfaktor"],
    position: "stats-pin-stat--center",
    at: 0.72,
    logo: true,
  },
] as const;

export function StatsImageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-pin-section"
      aria-label="Winter Statistiken"
    >
      <div className="stats-pin-sticky">
        <Image
          src="/images/stats_image_container.png"
          alt="Winter Statistik-Übersicht"
          fill
          sizes="100vw"
          className="stats-image object-cover"
          priority={false}
        />
        <div className="stats-pin-gradient" aria-hidden />

        <div className="shooting-star" aria-hidden>
          {segments.map((seg) => (
            <img
              key={seg.id}
              src={seg.src}
              alt=""
              className={`${seg.className} ${progress >= seg.at ? "shooting-star-seg--visible" : ""}`}
            />
          ))}
        </div>

        {stats.map((stat) => {
          const visible = progress >= stat.at;
          const isMarker = "marker" in stat && stat.marker;
          const isLogo = "logo" in stat && stat.logo;

          return (
            <div
              key={stat.id}
              className={`stats-pin-stat ${stat.position} ${isMarker ? "stats-pin-stat--marker" : ""} ${isLogo ? "stats-pin-stat--logo" : ""} ${visible ? "stats-pin-stat--visible" : ""}`}
            >
              {isLogo ? (
                <>
                  <p className="stats-pin-tagline">
                    {"lines" in stat
                      ? stat.lines.map((line) => (
                          <span key={line} className="stats-pin-tagline-line">
                            {line}
                          </span>
                        ))
                      : null}
                  </p>
                  <Image
                    src="/logos/little_w.svg"
                    alt=""
                    width={32}
                    height={16}
                    className="stats-pin-w"
                    aria-hidden
                  />
                </>
              ) : (
                <>
                  {"labelAbove" in stat ? (
                    <p className="stats-pin-label">{stat.labelAbove}</p>
                  ) : null}
                  {"label" in stat ? (
                    <p className="stats-pin-label">{stat.label}</p>
                  ) : null}
                  <p className="stats-pin-value">
                    {"value" in stat ? stat.value : null}
                  </p>
                  {"labelBelow" in stat ? (
                    <p className="stats-pin-label">{stat.labelBelow}</p>
                  ) : null}
                  {isMarker ? (
                    <span className="stats-pin-marker" aria-hidden>
                      <span className="stats-pin-marker-ring" />
                      <span className="stats-pin-marker-dot" />
                    </span>
                  ) : null}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
