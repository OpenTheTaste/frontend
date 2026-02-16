"use client";

import { useHls } from "@/hooks/useHls";
import { useEffect, useRef, useState } from "react";
import type { Level } from "hls.js";
import {
  FastForward,
  Gauge,
  Hd,
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const levelModalRef = useRef<HTMLDivElement>(null);
  const [isOpenLevels, setIsOpenLevels] = useState<boolean>(false);
  const [isAutoLevels, setIsAutoLevels] = useState<boolean>(true);

  const SpeedModalRef = useRef<HTMLDivElement>(null);
  const [isOpenSpeed, setIsOpenSpeed] = useState<boolean>(false);

  const [levels, setLevels] = useState<Level[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true); // 컨트롤러 표시 여부
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false); // 전체화면 상태

  // 볼륨
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [prevVolume, setPrevVolume] = useState<number>(1);

  // 배속
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const hlsRef = useHls({
    src,
    videoRef,
    onLevels: setLevels,
  });

  // 컨트롤러 숨김 타이머 설정
  const resetHideControlsTimer = () => {
    setShowControls(true);

    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  };

  // 마우스 움직임 감지
  const handleMouseMove = () => {
    resetHideControlsTimer();
  };

  // 전체화면 상태 변경 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 마우스 움직임 이벤트 등록
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);

    // 초기 타이머 설정
    resetHideControlsTimer();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  // 이벤트 핸들러들
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // video 이벤트 연결
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  // 재생/일시정지
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  // 10초 뒤로
  const rewind = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime -= 10;
  };

  // 10초 앞으로
  const forward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += 10;
  };

  // 화질 변경
  const changeLevels = (levelIndex: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = levelIndex;
    setIsAutoLevels(levelIndex === -1);
  };

  // 배속 변경
  const changeSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackRate(speed);
  };

  // 전체화면 토글
  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("전체화면 전환 실패:", error);
    }
  };

  // 시간 포맷
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Number(e.target.value);
  };

  // 음소거 토글
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      video.volume = prevVolume;
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      video.muted = true;
      video.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = Number(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);

    if (newVolume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      video.muted = false;
      setIsMuted(false);
      setPrevVolume(newVolume);
    }
  };

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 화질 모달
      if (
        isOpenLevels &&
        levelModalRef.current &&
        !levelModalRef.current.contains(event.target as Node)
      ) {
        setIsOpenLevels(false);
      }

      // 배속 모달
      if (
        isOpenSpeed &&
        SpeedModalRef.current &&
        !SpeedModalRef.current.contains(event.target as Node)
      ) {
        setIsOpenSpeed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenLevels, isOpenSpeed]);

  // 키보드 단축키 핸들러
  const handleKeyboardShortcuts = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 스페이스바: 재생/일시정지
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    }

    // 왼쪽 화살표: 10초 뒤로
    if (e.code === "ArrowLeft") {
      e.preventDefault();
      rewind();
    }

    // 오른쪽 화살표: 10초 앞으로
    if (e.code === "ArrowRight") {
      e.preventDefault();
      forward();
    }

    // 위쪽 화살표: 볼륨 올리기
    if (e.code === "ArrowUp") {
      e.preventDefault();
      const video = videoRef.current;
      if (!video) return;
      const newVolume = Math.min(volume + 0.1, 1);
      video.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) {
        video.muted = false;
        setIsMuted(false);
        setPrevVolume(newVolume);
      }
    }

    // 아래쪽 화살표: 볼륨 줄이기
    if (e.code === "ArrowDown") {
      e.preventDefault();
      const video = videoRef.current;
      if (!video) return;
      const newVolume = Math.max(volume - 0.1, 0);
      video.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        video.muted = true;
        setIsMuted(true);
      } else {
        setPrevVolume(newVolume);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black"
      tabIndex={0}
      onKeyDown={handleKeyboardShortcuts}
    >
      {/* 비디오 영역 */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-screen max-h-screen flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
          />
        </div>
      </div>

      {/* 컨트롤러 - 조건부 표시 */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-2 text-ot-text z-10 transition-opacity duration-300  bg-linear-to-t from-black/40 via-black/20 to-transparent
           ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {/* Seek bar */}
        <div className="flex justify-between gap-3 items-center">
          <p className="text-sm whitespace-nowrap">{formatTime(currentTime)}</p>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-ot-primary-400"
          />
          <p className="text-sm whitespace-nowrap">{formatTime(duration)}</p>
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="flex justify-between px-2 mt-2">
          <div className="flex items-center gap-5">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              ) : (
                <Play className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              )}
            </button>
            <button onClick={rewind}>
              <FastForward className="w-8 h-8 stroke-1 stroke-ot-text rotate-180 cursor-pointer hover:stroke-ot-gray-600" />
            </button>
            <button onClick={forward}>
              <FastForward className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
            </button>

            {/* 음향 조절 */}
            <div className="relative flex items-center group">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ot-gray-800 rounded-lg p-3 flex-col items-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="accent-ot-primary-400 cursor-pointer block"
                  style={{
                    writingMode: "vertical-lr",
                    direction: "rtl",
                  }}
                />
              </div>

              <button onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
                ) : (
                  <Volume2 className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* 우측 컨트롤 */}
          <div className="flex items-center gap-5">
            {/* 화질 */}
            <div className="relative flex items-center">
              <button onClick={() => setIsOpenLevels(!isOpenLevels)}>
                <Hd className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              </button>

              {isOpenLevels && (
                <div
                  ref={levelModalRef}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ot-gray-800 rounded-lg p-5"
                >
                  <div className="flex gap-x-10">
                    <p className="text-ot-text text-md font-semibold whitespace-nowrap">
                      화질
                    </p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          changeLevels(-1);
                          setIsOpenLevels(false);
                        }}
                        className={`text-sm text-right transition-colors cursor-pointer ${
                          isAutoLevels
                            ? "text-ot-text font-bold"
                            : "text-ot-gray-600 hover:text-ot-text"
                        }`}
                      >
                        auto
                      </button>
                      {levels.map((level, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            changeLevels(index);
                            setIsOpenLevels(false);
                          }}
                          className={`text-sm text-right transition-colors cursor-pointer ${
                            !isAutoLevels &&
                            hlsRef.current?.currentLevel === index
                              ? "text-ot-text font-semibold"
                              : "text-ot-gray-600 hover:text-ot-text"
                          }`}
                        >
                          {level.height}p
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 배속 */}
            <div className="relative flex items-center">
              <button onClick={() => setIsOpenSpeed(!isOpenSpeed)}>
                <Gauge className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              </button>

              {isOpenSpeed && (
                <div
                  ref={SpeedModalRef}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ot-gray-800 rounded-lg p-5"
                >
                  <div className="flex gap-x-10">
                    <p className="text-ot-text text-md font-semibold whitespace-nowrap">
                      배속
                    </p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          changeSpeed(1);
                          setIsOpenSpeed(false);
                        }}
                        className={`text-sm text-right transition-colors cursor-pointer ${
                          playbackRate === 1
                            ? "text-ot-text font-bold"
                            : "text-ot-gray-600 hover:text-ot-text"
                        }`}
                      >
                        1x
                      </button>
                      <button
                        onClick={() => {
                          changeSpeed(1.25);
                          setIsOpenSpeed(false);
                        }}
                        className={`text-sm text-right transition-colors cursor-pointer ${
                          playbackRate === 1.25
                            ? "text-ot-text font-bold"
                            : "text-ot-gray-600 hover:text-ot-text"
                        }`}
                      >
                        1.25x
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 전체화면 */}
            <button onClick={toggleFullscreen}>
              {isFullscreen ? (
                <Minimize className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              ) : (
                <Maximize className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
