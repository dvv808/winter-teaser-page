"use client";

import { useEffect, useId, useRef } from "react";

type VideoLightboxProps = {
  videoId: string;
  startSeconds?: number;
  title: string;
  onClose: () => void;
};

export function VideoLightbox({
  videoId,
  startSeconds = 0,
  title,
  onClose,
}: VideoLightboxProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="video-lightbox" onClick={onClose}>
      <div
        className="video-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="video-lightbox-close"
          aria-label="Video schließen"
          onClick={onClose}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4.5 4.5 13.5 13.5M13.5 4.5 4.5 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="video-lightbox-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&start=${startSeconds}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <p id={titleId} className="video-lightbox-caption">
          {title}
        </p>
      </div>
    </div>
  );
}
