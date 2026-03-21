// ShortsPlayer.tsx
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
      const playVideo = () => {
        video.muted = true;
        video
          .play()
          .then(() => {
            video.muted = false;
          })
          .catch(() => {});
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener("canplay", playVideo, { once: true });
        return () => video.removeEventListener("canplay", playVideo);
      }
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

  const handleSeek = (newTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = newTime;
    setCurrentTime(newTime);
    if (newTime >= duration - 0.5) onEnded();
  };

  return (
    <div
      className="relative flex h-full w-full cursor-pointer items-center justify-center bg-black"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        autoPlay
        muted
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
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="absolute bottom-0 left-0 h-1.5 w-full cursor-pointer opacity-0"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
