"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";

type SocialPost = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  body: string;
  ctaLabel: string;
  href: string;
};

const posts: SocialPost[] = [
  {
    id: "linkedin",
    imageSrc: "/images/social/social_linkedin.png",
    imageAlt: "",
    body: "Versicherungen sollten einfach sein. Mit WINO haben unsere Kunden ihre Verträge immer im Blick, können Schäden direkt melden und uns jederzeit erreichen. Einfach. Digital. Persönlich. #Versicherung #Makler #WINO",
    ctaLabel: "Winter auf LinkedIn",
    href: "https://linkedin.com",
  },
  {
    id: "facebook",
    imageSrc: "/images/social/social_facebook.png",
    imageAlt: "",
    body: "Dein Makler. Deine Versicherungen. Alles in einer App. 📱 WINO macht's möglich — frag uns nach deinem Zugang.",
    ctaLabel: "Winter auf Facebook",
    href: "https://facebook.com",
  },
];

const maskByCorner = {
  "top-left": "/images/im_vi_mask_top-left.svg",
  "bottom-right": "/images/im_vi_mask_bottom-right.svg",
} as const;

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={direction === "prev" ? "M11 4 6 9l5 5" : "M7 4l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SocialMediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visiblePosts = [
    posts[index % posts.length],
    posts[(index + 1) % posts.length],
  ];

  return (
    <section
      ref={sectionRef}
      className="social-section"
      aria-labelledby="social-heading"
    >
      <AnimatedLetters
        as="h2"
        id="social-heading"
        className="text-h2 social-heading"
        text="Winter auf Social Media"
        delay={0.08}
        stagger={0.012}
        whenVisible
      />

      <div className="social-grid">
        {visiblePosts.map((post, i) => {
          const corner = i === 0 ? "top-left" : "bottom-right";
          return (
            <a
              key={`${post.id}-${index}-${i}`}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card social-card--${corner} ${visible ? "social-card--visible" : ""} ${i === 0 ? "social-card--left" : "social-card--right"}`}
              style={
                {
                  "--brand-card-mask": `url("${maskByCorner[corner]}")`,
                  transitionDelay: visible ? `${i * 140}ms` : "0ms",
                } as CSSProperties
              }
            >
              <div className="social-card-media">
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="social-card-gradient" aria-hidden />
              </div>

              <div className="social-card-content">
                <p className="social-card-body">{post.body}</p>
                <span className="btn-secondary-small">{post.ctaLabel}</span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="social-nav">
        <button
          type="button"
          className="quotes-nav quotes-nav--prev"
          aria-label="Vorherige Beiträge"
          onClick={() => setIndex((v) => (v - 1 + posts.length) % posts.length)}
        >
          <ArrowIcon direction="prev" />
        </button>
        <button
          type="button"
          className="quotes-nav quotes-nav--next"
          aria-label="Nächste Beiträge"
          onClick={() => setIndex((v) => (v + 1) % posts.length)}
        >
          <ArrowIcon direction="next" />
        </button>
      </div>
    </section>
  );
}
