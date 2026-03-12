"use client";

import { useEffect, useRef } from "react";
import Hls, { Level } from "hls.js";

interface UseHlsProps {
  src: string; // 영상 src
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onLevels?: (levels: Level[]) => void;
  startTime?: number;
}

const toProxySrc = (src: string) =>
  src.replace(process.env.NEXT_PUBLIC_CDN_BASE_URL!, "/cdn-proxy");

export const useHls = ({ src, videoRef, onLevels, startTime }: UseHlsProps) => {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current || !src) return;

    const proxySrc = toProxySrc(src);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(proxySrc); // m3u8 파일 로드
      hls.attachMedia(videoRef.current);
      // hls엔진을 video 태그에 연결 -> 여기서부터 video가 hls 기반으로 재생 가능하게 됨

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onLevels) {
          onLevels(hls.levels); // 화질 목록 배열 생성 완료
        }
        if (startTime && videoRef.current) {
          videoRef.current.currentTime = startTime;
        }
      });

      return () => {
        if (document.pictureInPictureElement) return; // 이어보기 구현
        // clean up
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.setAttribute("referrerpolicy", "no-referrer");
      videoRef.current.src = proxySrc;
      if (startTime) videoRef.current.currentTime = startTime;
    }
  }, [src]);

  return hlsRef;
};
