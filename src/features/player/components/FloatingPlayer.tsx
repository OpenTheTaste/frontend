"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePipStore } from "@store";
import { Maximize2, Pause, Play, X } from "lucide-react";
import { useHideControls, useHls } from "@entities/player/hooks";

const PADDING = 16;
const PLAYER_WIDTH = 400;
const PLAYER_HEIGHT = 230;

const snapToCorner = (x: number, y: number, actualHeight: number) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const isLeft = x + PLAYER_WIDTH / 2 < centerX;
  const isTop = y + actualHeight / 2 < centerY;
  return {
    x: isLeft ? PADDING : window.innerWidth - PLAYER_WIDTH - PADDING,
    y: isTop ? PADDING : window.innerHeight - actualHeight - PADDING,
  };
};

export const FloatingPlayer = () => {
  const { isPip, src, mediaId, currentTime, exitPip, setCurrentTime } =
    usePipStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const lastSavedTimeRef = useRef(0);
  const router = useRouter();

  const { showControls, reset: resetHideControlsTimer } = useHideControls(3000);

  useHls({ src: isPip ? src : "", videoRef, startTime: currentTime });

  // 초기 위치 - 우측 하단
  useEffect(() => {
    setPos({
      x: window.innerWidth - PLAYER_WIDTH - PADDING,
      y: window.innerHeight - PLAYER_HEIGHT - PADDING,
    });
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // video 이벤트
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setProgress(video.currentTime);
      if (Math.abs(video.currentTime - lastSavedTimeRef.current) >= 1) {
        setCurrentTime(video.currentTime);
        lastSavedTimeRef.current = video.currentTime;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [isPip]);

  // 초기 컨트롤 타이머
  useEffect(() => {
    if (isPip) resetHideControlsTimer();
  }, [isPip]);

  // 드래그 이벤트
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX =
        dragStartRef.current.posX + (e.clientX - dragStartRef.current.mouseX);
      const newY =
        dragStartRef.current.posY + (e.clientY - dragStartRef.current.mouseY);
      const clampedX = Math.max(
        0,
        Math.min(window.innerWidth - PLAYER_WIDTH, newX),
      );
      const clampedY = Math.max(
        0,
        Math.min(window.innerHeight - PLAYER_HEIGHT, newY),
      );
      setPos({ x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const actualHeight = containerRef.current?.offsetHeight ?? PLAYER_HEIGHT;
      setPos((prev) => snapToCorner(prev.x, prev.y, actualHeight));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isPip) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).tagName === "INPUT"
    )
      return;
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const handleExpand = () => {
    const video = videoRef.current;
    if (!mediaId || !video) {
      return alert("전체보기 전환 중 에러가 발생했습니다. 다시 시도해주세요.");
    }
    setCurrentTime(video.currentTime);
    router.push(`/player/${mediaId}`);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      style={{ left: pos.x, top: pos.y }}
      className={`fixed z-50 w-100 overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${
        isDragging
          ? "scale-105 cursor-grabbing shadow-[0_16px_48px_rgba(0,0,0,0.8)] transition-shadow"
          : "cursor-grab transition-all duration-300 ease-out"
      }`}
      onMouseMove={resetHideControlsTimer}
      onMouseEnter={resetHideControlsTimer}
      onMouseDown={handleMouseDown}
    >
      <div className="relative bg-black">
        <video ref={videoRef} className="w-full" autoPlay playsInline />

        <div
          className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
        >
          {/* 상단: 닫기 */}
          <div className="flex justify-end bg-linear-to-b from-black/50 to-transparent p-2">
            <button
              onClick={exitPip}
              className="text-ot-text rounded-full bg-black/40 p-1 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <X className="h-3 w-3" />
            </button>
          </div>

          {/* 중앙: 재생/일시정지 */}
          <div className="flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-ot-text/20 hover:bg-ot-text/30 rounded-full p-3 backdrop-blur-sm transition-colors"
            >
              {isPlaying ? (
                <Pause className="text-ot-text h-5 w-5" />
              ) : (
                <Play className="text-ot-text h-5 w-5" />
              )}
            </button>
          </div>

          {/* 하단: seekbar + 시간 + 전체화면 */}
          <div className="bg-linear-to-t from-black/60 to-transparent px-3 pt-6 pb-1">
            <div className="bg-ot-text/30 relative h-1 cursor-pointer rounded-full">
              <div
                className="bg-ot-primary-400 absolute top-0 left-0 h-full rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.currentTime = Number(e.target.value);
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            <div className="mt-1 flex items-center justify-between">
              <span className="text-ot-text text-xs">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
              <button
                onClick={handleExpand}
                className="text-ot-text hover:text-ot-gray-600 flex items-center px-1 py-1 transition-colors duration-200"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
