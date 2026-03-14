"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useHls } from "@entities/player/hooks";

interface ShortsPlayerProps {
  src: string;
  shortsId: number;
  onNextShorts: () => void;
  onPrevShorts: () => void;
}

export const ShortsPlayer = ({
  src,
  shortsId,
  onNextShorts,
  onPrevShorts,
}: ShortsPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const hlsRef = useHls({
    src,
    videoRef,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }
  }, [src]);

  const isScrollingRef = useRef(false);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      if (e.deltaY > 0) {
        onNextShorts();
      } else if (e.deltaY < 0) {
        onPrevShorts();
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  const [mouseDown, setMouseDown] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setStartY(e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown) return;
    setMouseDown(false);

    const endY = e.clientY;
    const diff = startY - endY;

    if (diff > 50) {
      onNextShorts();
    } else if (diff < -50) {
      onPrevShorts();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full cursor-pointer items-center justify-center bg-black"
      tabIndex={0}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        playsInline
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="fill-ot-text text-ot-text h-16 w-16" />
        </div>
      )}
    </div>
  );
};
