"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollHideOnDownOptions = {
  /** Minimum scroll delta before toggling visibility */
  threshold?: number;
  /** Always show menu when scroll position is above this */
  minScroll?: number;
};

export function useScrollHideOnDown({
  threshold = 10,
  minScroll = 48,
}: UseScrollHideOnDownOptions = {}) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y <= minScroll) {
        setVisible(true);
      } else if (delta > threshold) {
        setVisible(false);
      } else if (delta < -threshold) {
        setVisible(true);
      }

      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [minScroll, threshold]);

  return visible;
}
