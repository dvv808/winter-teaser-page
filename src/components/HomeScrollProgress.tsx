"use client";

import { useEffect, useState } from "react";

export function HomeScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setProgress(Math.min(Math.max(window.scrollY / maxScroll, 0), 1));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="home-scroll-progress"
      role="progressbar"
      aria-label="Seitenfortschritt"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="home-scroll-progress-track">
        <div
          className="home-scroll-progress-fill"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>
    </div>
  );
}
