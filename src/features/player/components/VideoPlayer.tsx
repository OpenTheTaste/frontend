"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAutoPlayStore, usePipStore } from "@store";
import type { Level } from "hls.js";
import {
  ArrowLeft,
  FastForward,
  Gauge,
  Hd,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture,
  PictureInPicture2,
  Play,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AutoPlayNextBanner, SettingModal } from "@features/player/components";
import { playbackApi } from "@entities/player/api";
import { useHideControls, useHls, usePlayback } from "@entities/player/hooks";
import { useContentsDetail } from "@entities/video-contents/hooks";
import { useOutsideClick } from "@shared/hooks";

export const AUTO_PLAY_THRESHOLD = 0.95; // 영상길이 대 현재재생길이에 대한 비율 상수

interface VideoPlayerProps {
  mediaId: number;
}

export const VideoPlayer = ({ mediaId }: VideoPlayerProps) => {
  const { data, isLoading } = useContentsDetail(mediaId);
  const router = useRouter();
  // ref
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오
  const containerRef = useRef<HTMLDivElement>(null);
  const levelModalRef = useRef<HTMLDivElement>(null); // 화질 모달
  const speedModalRef = useRef<HTMLDivElement>(null); // 배속 모달
  const currentTimeRef = useRef(0);
  const isSavedRef = useRef(false);

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

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [showNextBanner, setShowNextBanner] = useState<boolean>(false);
  const showNextBannerRef = useRef(false);

  const {
    enterPip,
    exitPip,
    isPip,
    currentTime: pipCurrentTime,
  } = usePipStore();
  const { setQueue } = useAutoPlayStore();

  // 다음 재생 영상 호출
  const nextMedia = useAutoPlayStore((state) => {
    const idx = state.queue.findIndex(
      (item) => item.mediaId === state.currentMediaId,
    );
    return state.queue[idx + 1] ?? null;
  });

  const startTime = isPip ? pipCurrentTime : (data?.positionSec ?? 0);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      currentTimeRef.current = videoRef.current.currentTime;

      const { currentTime, duration } = videoRef.current;
      if (
        duration > 0 &&
        currentTime / duration >= AUTO_PLAY_THRESHOLD &&
        !showNextBannerRef.current
      ) {
        showNextBannerRef.current = true;
        setShowNextBanner(true);
      }
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  const attachVideoEvents = () => {
    const video = videoRef.current;
    if (!video) return;

    video.removeEventListener("timeupdate", handleTimeUpdate);
    video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    video.removeEventListener("play", handlePlay);
    video.removeEventListener("pause", handlePause);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
  };

  // hls
  const hlsRef = useHls({
    src: data?.masterPlaylistUrl ?? "",
    videoRef,
    onLevels: setLevels,
    startTime,
    onReady: attachVideoEvents,
  });

  useEffect(() => {
    if (isPip) exitPip();
  }, []);

  // 모달 외부 클릭 시 false 처리
  useOutsideClick(levelModalRef, () => setIsOpenLevels(false), isOpenLevels);
  useOutsideClick(speedModalRef, () => setIsOpenSpeed(false), isOpenSpeed);
  const { showControls, reset: resetHideControlsTimer } = useHideControls(3000); // 3초 뒤 컨트롤러 사라짐
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

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

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
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    }
    if (e.code === "ArrowLeft") {
      e.preventDefault();
      rewind();
    }
    if (e.code === "ArrowRight") {
      e.preventDefault();
      forward();
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      adjustVolume(volume + 0.1);
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      adjustVolume(volume - 0.1);
    }
  };

  const handleBack = async () => {
    isSavedRef.current = true;
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    await playbackApi(mediaId, currentTimeRef.current).catch(() => {});
    router.back();
  };

  // pip
  const togglePip = async () => {
    const video = videoRef.current;
    if (!video || !data?.masterPlaylistUrl) {
      return alert("pip 전환 중 에러가 발생했습니다. 다시 시도해주세요.");
    }
    isSavedRef.current = true;
    video.pause();
    await playbackApi(mediaId, video.currentTime).catch(() => {});
    enterPip(data?.masterPlaylistUrl, mediaId, video.currentTime);
    router.back();
  };

  const handleNextConfirm = useCallback(() => {
    if (!nextMedia) return;
    showNextBannerRef.current = false;
    setShowNextBanner(false);
    isSavedRef.current = true;
    setQueue(useAutoPlayStore.getState().queue, nextMedia.mediaId);
    router.push(`/player/${nextMedia.mediaId}`);
  }, [nextMedia, router, setQueue]);

  usePlayback({
    mediaId,
    getCurrentPostionSec: () => videoRef.current?.currentTime ?? 0,
    isPlaying,
  });

  // 플레이어 unmount 시 playback 저장 (+ 트랙패드 뒤로가기 포함)
  useEffect(() => {
    return () => {
      if (isSavedRef.current) return;
      if (currentTimeRef.current === 0) return;
      playbackApi(mediaId, currentTimeRef.current).catch(() => {});
    };
  }, [mediaId]);

  if (isLoading) return <div className="fixed inset-0 bg-black" />;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black"
      tabIndex={0}
      onKeyDown={handleKeyboardShortcuts}
      onMouseMove={resetHideControlsTimer}
      onClick={() => containerRef.current?.focus()}
    >
      <div
        className={`fixed top-0 right-0 left-0 z-20 flex items-center justify-between bg-linear-to-b from-black/40 via-black/20 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="text-ot-text hover:text-ot-gray-600 active:text-ot-gray-600 h-7 w-7 stroke-2" />
        </button>
        <button onClick={togglePip} className="p-2">
          {isPip ? (
            <PictureInPicture2 className="text-ot-text hover:text-ot-gray-600 h-7 w-7 stroke-2" />
          ) : (
            <PictureInPicture className="text-ot-text hover:text-ot-gray-600 h-7 w-7 stroke-2" />
          )}
        </button>
      </div>

      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative flex h-full max-h-screen w-full max-w-screen items-center justify-center">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            autoPlay
            playsInline
          />
        </div>
      </div>

      {showNextBanner && nextMedia && (
        <AutoPlayNextBanner
          type={data?.seriesMediaId ? "episode" : "contents"}
          nextMedia={nextMedia}
          onConfirm={handleNextConfirm}
          onCancel={() => {
            showNextBannerRef.current = false;
            setShowNextBanner(false);
          }}
          showControls={showControls}
        />
      )}

      <div
        className={`text-ot-text fixed right-0 bottom-0 left-0 z-10 bg-linear-to-t from-black/40 via-black/20 to-transparent p-3 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-3">
          <p className="min-w-13 text-right text-sm whitespace-nowrap">
            {formatTime(currentTime)}
          </p>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="accent-ot-primary-400 w-full focus:outline-none"
          />
          <p className="min-w-13 text-sm whitespace-nowrap">
            {formatTime(duration)}
          </p>
        </div>
        <div className="mt-2 flex justify-between px-2">
          <div className="flex items-center gap-5">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
              ) : (
                <Play className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
              )}
            </button>
            <button onClick={rewind}>
              <FastForward className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 rotate-180 cursor-pointer stroke-1" />
            </button>
            <button onClick={forward}>
              <FastForward className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
            </button>

            <div className="group relative flex items-center">
              <div className="bg-ot-gray-800 invisible absolute bottom-full left-1/2 mb-2 -translate-x-1/2 flex-col items-center rounded-lg p-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="accent-ot-primary-400 block cursor-pointer"
                  style={{
                    writingMode: "vertical-lr",
                    direction: "rtl",
                  }}
                />
              </div>

              <button onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
                ) : volume < 0.5 ? (
                  <Volume1 className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
                ) : (
                  <Volume2 className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div ref={levelModalRef} className="relative flex items-center">
              <button
                onClick={() => {
                  setIsOpenSpeed(false);
                  setIsOpenLevels((prev) => !prev);
                }}
              >
                <Hd className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
              </button>
              <SettingModal
                title="화질"
                isOpen={isOpenLevels}
                options={levelOptions}
                onClose={() => setIsOpenLevels(false)}
                onSelect={(value) => changeLevels(value as number)}
              />
            </div>

            <div ref={speedModalRef} className="relative flex items-center">
              <button
                onClick={() => {
                  setIsOpenLevels(false);
                  setIsOpenSpeed((prev) => !prev);
                }}
              >
                <Gauge className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
              </button>

              <SettingModal
                title="배속"
                isOpen={isOpenSpeed}
                options={speedOptions}
                onClose={() => setIsOpenSpeed(false)}
                onSelect={(value) => changeSpeed(value as number)}
              />
            </div>

            <button onClick={toggleFullscreen}>
              {isFullscreen ? (
                <Minimize className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
              ) : (
                <Maximize className="stroke-ot-text hover:stroke-ot-gray-600 h-8 w-8 cursor-pointer stroke-1" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
