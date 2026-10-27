"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedLettersProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  id?: string;
  delay?: number;
  stagger?: number;
  /** Start animating when the element scrolls into view */
  whenVisible?: boolean;
};

export function AnimatedLetters({
  text,
  className = "",
  as: Tag = "span",
  id,
  delay = 0.15,
  stagger = 0.018,
  whenVisible = false,
}: AnimatedLettersProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(!whenVisible);
  const parts = text.split(/(\s+)/);
  let charIndex = 0;

  useEffect(() => {
    if (!whenVisible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [whenVisible]);

  return (
    <Tag ref={ref as never} id={id} className={className} aria-label={text}>
      {parts.map((part, partIndex) => {
        if (part.includes("\n")) {
          return <br key={`br-${partIndex}`} />;
        }

        if (/^\s+$/.test(part)) {
          return <span key={`space-${partIndex}`}>{part}</span>;
        }

        return (
          <span
            key={`word-${partIndex}`}
            className="inline-block whitespace-nowrap"
          >
            {Array.from(part).map((char) => {
              const i = charIndex++;
              return (
                <span
                  key={`${char}-${i}`}
                  className={active ? "animate-letter-in" : "opacity-0"}
                  aria-hidden
                  style={
                    active
                      ? { animationDelay: `${delay + i * stagger}s` }
                      : undefined
                  }
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
