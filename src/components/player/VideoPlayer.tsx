"use client";

import { useHls } from "@/hooks/useHls";
import { useEffect, useRef, useState } from "react";
import type { Level } from "hls.js";
import { SettingModal } from "@/components/player/SettingModal";
import {
  ArrowLeft,
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
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRouter } from "next/navigation";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const router = useRouter();
  // ref
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 컨트롤러 숨기기
  const levelModalRef = useRef<HTMLDivElement>(null); // 화질 모달
  const speedModalRef = useRef<HTMLDivElement>(null); // 배속 모달

  // 화질 선택 관련 state
  const [isOpenLevels, setIsOpenLevels] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]); // 화질 선택
  const [isAutoLevels, setIsAutoLevels] = useState<boolean>(true); // auto

  // 배속 선택 관련 state
  const [isOpenSpeed, setIsOpenSpeed] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1); // 배속

  // 볼륨 state
  const [volume, setVolume] = useState<number>(1); // 볼륨
  const [isMuted, setIsMuted] = useState<boolean>(false); // 음소거 여부
  const [prevVolume, setPrevVolume] = useState<number>(1); // 이전 볼륨

  // 재생 관련
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 재생 여부
  const [currentTime, setCurrentTime] = useState<number>(0); // 현재 시간
  const [duration, setDuration] = useState<number>(0); // 영상 길이

  const [showControls, setShowControls] = useState<boolean>(true); // 컨트롤러 표시 여부
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false); // 전체화면 상태
  // hls
  const hlsRef = useHls({
    src,
    videoRef,
    onLevels: setLevels,
  });

  // 모달 외부 클릭 시 false 처리
  useOutsideClick(levelModalRef, () => setIsOpenLevels(false), isOpenLevels);
  useOutsideClick(speedModalRef, () => setIsOpenSpeed(false), isOpenSpeed);

  // 화질 옵션 생성
  const levelOptions = [
    { label: "auto", value: -1, isActive: isAutoLevels },
    ...levels.map((level, index) => ({
      label: `${level.height}p`,
      value: index,
      isActive: !isAutoLevels && hlsRef.current?.currentLevel === index,
    })),
  ];

  // 배속 옵션 생성
  const speedOptions = [
    { label: "1x", value: 1, isActive: playbackRate === 1 },
    { label: "1.25x", value: 1.25, isActive: playbackRate === 1.25 },
  ];

  // 컨트롤러 숨김 타이머 설정 (5초 간 표시)
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

  // 마우스 움직임 이벤트 등록 -> 마우스 움직이면 컨트롤러 표시 관련
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

  // seek bar (= 시간대 조정 bar)
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

  // 공통 볼륨 설정 로직
  const adjustVolume = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    video.volume = clampedVolume;
    setVolume(clampedVolume);

    if (clampedVolume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      video.muted = false;
      setIsMuted(false);
      setPrevVolume(clampedVolume);
    }
  };

  // 볼륨 - input용
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    adjustVolume(Number(e.target.value));
  };

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
      adjustVolume(volume + 0.1);
    }
    // 아래쪽 화살표: 볼륨 줄이기
    if (e.code === "ArrowDown") {
      e.preventDefault();
      adjustVolume(volume - 0.1);
    }
  };

  // 뒤로 가기
  const handleBack = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    router.back();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black"
      tabIndex={0}
      onKeyDown={handleKeyboardShortcuts}
    >
      <div
        className={`fixed top-0 left-0 right-0 z-20 p-4 flex items-center transition-opacity duration-300 bg-linear-to-b from-black/40 via-black/20 to-transparent
        ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <button onClick={handleBack} className="p-2 cursor-pointer">
          <ArrowLeft className="w-7 h-7 stroke-2 text-ot-text hover:text-ot-gray-600 active:text-ot-gray-600" />
        </button>
      </div>

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

      {/* 컨트롤러 */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 text-ot-text z-10 transition-opacity duration-300  bg-linear-to-t from-black/40 via-black/20 to-transparent
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
          {/* 좌측: 재생, 감기, 음향 */}
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

          {/* 우측: 화질, 배속, 전체화면 */}
          <div className="flex items-center gap-5">
            {/* 화질 */}
            <div ref={levelModalRef} className="relative flex items-center">
              <button
                onClick={() => {
                  setIsOpenSpeed(false);
                  setIsOpenLevels((prev) => !prev);
                }}
              >
                <Hd className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              </button>
              <SettingModal
                title="화질"
                isOpen={isOpenLevels}
                options={levelOptions}
                onClose={() => setIsOpenLevels(false)}
                onSelect={(value) => changeLevels(value as number)}
              />
            </div>

            {/* 배속 */}
            <div ref={speedModalRef} className="relative flex items-center">
              <button
                onClick={() => {
                  setIsOpenLevels(false);
                  setIsOpenSpeed((prev) => !prev);
                }}
              >
                <Gauge className="w-8 h-8 stroke-1 stroke-ot-text cursor-pointer hover:stroke-ot-gray-600" />
              </button>

              <SettingModal
                title="배속"
                isOpen={isOpenSpeed}
                options={speedOptions}
                onClose={() => setIsOpenSpeed(false)}
                onSelect={(value) => changeSpeed(value as number)}
              />
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
