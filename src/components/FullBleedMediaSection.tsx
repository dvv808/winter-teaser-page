"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatedLetters } from "@/components/AnimatedLetters";

const MASK = "/images/full%20bleed%20media/full_bleed_media.svg";

/** Scroll progress (0–1) where phase 1 ends and phase 2 begins */
const SWAP_AT = 0.52;
/** Length of white fade-in at section start (fraction of total scroll) */
const WHITE_IN_LENGTH = 0.24;
/** Length of white fade-out at section end */
const WHITE_OUT_LENGTH = 0.12;
const WHITE_IN_END = WHITE_IN_LENGTH;
const WHITE_OUT_START = 1 - WHITE_OUT_LENGTH;

type FullBleedPhase = {
  videoSrc: string;
  text: string;
};

type FullBleedMediaSectionProps = {
  text: string;
  videoSrc: string;
  ariaLabel?: string;
  /** Enables sticky scroll: phase 1 → phase 2 → fade to white */
  phase2?: FullBleedPhase;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function rangeProgress(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

const TEXT_DELAY_AFTER_PLAY_S = 0.4;

function FullBleedFrame({
  videoSrc,
  text,
  active,
  contentReady,
  revealTextImmediately = false,
  letterKey,
}: {
  videoSrc: string;
  text: string;
  active: boolean;
  contentReady: boolean;
  revealTextImmediately?: boolean;
  letterKey: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textTimerRef = useRef<number | null>(null);
  const [lettersActive, setLettersActive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (textTimerRef.current !== null) {
      window.clearTimeout(textTimerRef.current);
      textTimerRef.current = null;
    }

    if (!active || !contentReady) {
      video.pause();
      setLettersActive(false);
      return;
    }

    setLettersActive(false);

    function revealTextAfterDelay() {
      textTimerRef.current = window.setTimeout(() => {
        textTimerRef.current = null;
        setLettersActive(true);
      }, TEXT_DELAY_AFTER_PLAY_S * 1000);
    }

    function startPlayback() {
      if (!video) return;

      if (revealTextImmediately) {
        void video.play().catch(() => {});
        setLettersActive(true);
        return;
      }

      void video.play().then(() => {
        revealTextAfterDelay();
      }).catch(() => {
        revealTextAfterDelay();
      });
    }

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener("loadeddata", startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", startPlayback);
      if (textTimerRef.current !== null) {
        window.clearTimeout(textTimerRef.current);
        textTimerRef.current = null;
      }
    };
  }, [active, contentReady, revealTextImmediately, videoSrc]);

  return (
    <div
      className="full-bleed-media-phase"
      style={{ visibility: active ? "visible" : "hidden" }}
      aria-hidden={!active}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="full-bleed-media-video"
        aria-hidden
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="full-bleed-media-content">
        <Image
          src="/logos/little_w.svg"
          alt=""
          width={32}
          height={16}
          className="full-bleed-media-w"
          aria-hidden
        />
        {lettersActive ? (
          <AnimatedLetters
            key={letterKey}
            as="p"
            className="full-bleed-media-text"
            text={text}
            delay={0.12}
            stagger={0.014}
          />
        ) : (
          <p className="full-bleed-media-text opacity-0" aria-hidden>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export function FullBleedMediaSection({
  text,
  videoSrc,
  ariaLabel,
  phase2,
}: FullBleedMediaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  const isScrollSequence = Boolean(phase2);

  useEffect(() => {
    if (!isScrollSequence) return;

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
      setScrollActive(rect.top <= 0 && rect.bottom > window.innerHeight);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isScrollSequence]);

  useEffect(() => {
    if (isScrollSequence) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isScrollSequence]);

  const showPhase2 = isScrollSequence && progress >= SWAP_AT;
  const phase1Ready = scrollActive && !showPhase2;
  const whiteIn = isScrollSequence ? 1 - rangeProgress(progress, 0, WHITE_IN_END) : 0;
  const whiteOut = isScrollSequence ? rangeProgress(progress, WHITE_OUT_START, 1) : 0;
  const whiteOverlay = Math.max(whiteIn, whiteOut);

  if (isScrollSequence && phase2) {
    return (
      <section
        ref={sectionRef}
        className="full-bleed-media full-bleed-media--scroll"
        aria-label={ariaLabel ?? (showPhase2 ? phase2.text : text)}
        style={{ ["--full-bleed-mask" as string]: `url("${MASK}")` }}
      >
        <div className="full-bleed-media-scroll-sticky">
          <div className="full-bleed-media-frame full-bleed-media-frame--in-scroll">
            <FullBleedFrame
              videoSrc={videoSrc}
              text={text}
              active={!showPhase2}
              contentReady={phase1Ready}
              revealTextImmediately
              letterKey="phase-1"
            />

            <FullBleedFrame
              videoSrc={phase2.videoSrc}
              text={phase2.text}
              active={showPhase2}
              contentReady={showPhase2}
              letterKey="phase-2"
            />

            <div className="full-bleed-media-shade" aria-hidden />
            <div
              className="full-bleed-media-white-out"
              style={{ opacity: whiteOverlay }}
              aria-hidden
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`full-bleed-media ${visible ? "full-bleed-media--visible" : ""}`}
      aria-label={ariaLabel ?? text}
      style={{ ["--full-bleed-mask" as string]: `url("${MASK}")` }}
    >
      <div className="full-bleed-media-frame">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="full-bleed-media-video"
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="full-bleed-media-shade" aria-hidden />

        <div className="full-bleed-media-content">
          <Image
            src="/logos/little_w.svg"
            alt=""
            width={32}
            height={16}
            className="full-bleed-media-w"
            aria-hidden
          />
          <AnimatedLetters
            as="p"
            className="full-bleed-media-text"
            text={text}
            delay={0.25}
            stagger={0.014}
            whenVisible
          />
        </div>
      </div>
    </section>
  );
}
