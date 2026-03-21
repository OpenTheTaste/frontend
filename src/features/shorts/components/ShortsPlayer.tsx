"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useHls } from "@entities/player/hooks";

interface ShortsPlayerProps {
  src: string;
  shortsId: number;
  isActive: boolean;
  onEnded: () => void;
}

export const ShortsPlayer = ({
  src,
  shortsId,
  isActive,
  onEnded,
}: ShortsPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const hlsRef = useHls({ src, videoRef });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = src;
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => onEnded();

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <div
      className="relative flex h-full w-full shrink-0 cursor-pointer items-center justify-center bg-black"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        autoPlay
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="fill-ot-text text-ot-text h-16 w-16" />
        </div>
      )}

      <div
        className="absolute right-0 bottom-0 left-0 h-4 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
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
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
