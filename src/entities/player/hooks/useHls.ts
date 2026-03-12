"use client";

import { useEffect, useRef } from "react";
import Hls, { Level } from "hls.js";

interface UseHlsProps {
  src: string; // 영상 src
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onLevels?: (levels: Level[]) => void;
  startTime?: number;
}

export const useHls = ({ src, videoRef, onLevels, startTime }: UseHlsProps) => {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    // if (!videoRef.current) return;
    if (!videoRef.current || !src) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      // FIXME: 아래 코드 주석 해제 해야 함
      hls.loadSource(src); // m3u8 파일 로드

      // hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"); // 임시테스트용
      hls.attachMedia(videoRef.current);
      // hls엔진을 video 태그에 연결 -> 여기서부터 video가 hls 기반으로 재생 가능하게 됨

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onLevels) {
          onLevels(hls.levels); // 화질 목록 배열 생성 완료
        }
        if (startTime && videoRef.current) {
          videoRef.current.currentTime = startTime; // 이어보기 구현
        }
      });

      return () => {
        if (document.pictureInPictureElement) return;
        // cleanup
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src; // safari 대응
      if (startTime) videoRef.current.currentTime = startTime;
    }
  }, [src]);

  return hlsRef;
};
