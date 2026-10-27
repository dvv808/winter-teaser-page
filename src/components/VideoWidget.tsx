"use client";

import Image from "next/image";
import { useState } from "react";
import { VideoLightbox } from "@/components/VideoLightbox";
import { FEATURED_YOUTUBE_VIDEO } from "@/lib/youtube";

export function VideoWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="video-widget group"
        aria-label={`Video abspielen: ${FEATURED_YOUTUBE_VIDEO.title}`}
        onClick={() => setIsOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/video_masthead_bg.svg"
          alt=""
          className="video-widget-bg"
          aria-hidden
        />

        <div className="video-widget-inner">
          <div className="video-widget-media">
            <Image
              src={FEATURED_YOUTUBE_VIDEO.thumbnailSrc}
              alt="Arbeiten bei Winter Versicherungsmakler"
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
          </div>

          <div className="video-widget-content">
            <p className="video-widget-title">{FEATURED_YOUTUBE_VIDEO.title}</p>

            <span className="video-widget-play" aria-hidden>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path
                  d="M13.5 7.134c.667.385.667 1.347 0 1.732L1.5 15.794C.833 16.18 0 15.697 0 14.928V1.072C0 .303.833-.18 1.5.206l12 6.928Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>
      </button>

      {isOpen ? (
        <VideoLightbox
          videoId={FEATURED_YOUTUBE_VIDEO.videoId}
          startSeconds={FEATURED_YOUTUBE_VIDEO.startSeconds}
          title={FEATURED_YOUTUBE_VIDEO.title}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
}
