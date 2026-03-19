"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [src]);

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
        muted
        playsInline
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="fill-ot-text text-ot-text h-16 w-16" />
        </div>
      )}

      {/* 재생 progress bar */}
      <div
        className="absolute right-0 bottom-0 left-0 h-4 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        <div className="absolute right-0 bottom-0 left-0 h-1.5 bg-white/30">
          <div
            className="bg-ot-primary-400 h-full transition-none"
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
            }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => {
            const video = videoRef.current;
            if (!video) return;
            video.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
          }}
          className="absolute bottom-0 left-0 h-1.5 w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
};
