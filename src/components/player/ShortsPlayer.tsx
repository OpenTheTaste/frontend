'use client';

import { useHls } from "@/hooks/useHls";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface ShortsPlayerProps {
  src: string;
  shortsId: string;
  onNextShorts: () => void;
}

export const ShortsPlayer = ({ 
  src, 
  shortsId,
  onNextShorts 
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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      onNextShorts();
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
      className="w-full h-full bg-black relative flex items-center justify-center cursor-pointer"
      tabIndex={0}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="w-16 h-16 fill-white text-white" />
        </div>
      )}
    </div>
  );
};