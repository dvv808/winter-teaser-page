"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

export type BrandCardCorner = "top-left" | "bottom-right";

type BrandCardProps = {
  corner: BrandCardCorner;
  imageSrc: string;
  imageAlt: string;
  title: string;
  videoSrc?: string;
  ctaLabel?: string;
  href?: string;
  className?: string;
  revealDelay?: number;
};

const maskByCorner: Record<BrandCardCorner, string> = {
  "top-left": "/images/im_vi_mask_top-left.svg",
  "bottom-right": "/images/im_vi_mask_bottom-right.svg",
};

export function BrandCard({
  corner,
  imageSrc,
  imageAlt,
  title,
  videoSrc,
  ctaLabel = "Mehr herausfinden",
  href = "#",
  className = "",
  revealDelay = 0,
}: BrandCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          const video = videoRef.current;
          if (video) void video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      className={`brand-card brand-card--${corner} ${visible ? "brand-card--visible" : ""} ${className}`.trim()}
      style={
        {
          "--brand-card-mask": `url("${maskByCorner[corner]}")`,
          transitionDelay: visible ? `${revealDelay}ms` : "0ms",
        } as CSSProperties
      }
    >
      <div className="brand-card-media">
        {videoSrc ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={imageSrc}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={imageAlt}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            className="object-cover"
          />
        )}
        <div className="brand-card-gradient" aria-hidden />
      </div>

      <div className="brand-card-content">
        <h3 className="brand-card-title">{title}</h3>
        <span className="btn-secondary-small">{ctaLabel}</span>
      </div>
    </a>
  );
}
