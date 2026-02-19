"use client";

import Hls, { Level } from "hls.js";
import { useEffect, useRef } from "react";

interface UseHlsProps {
  src: string; // 영상 src
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onLevels?: (levels: Level[]) => void;
}

export const useHls = ({ src, videoRef, onLevels }: UseHlsProps) => {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src); // m3u8 파일 로드
      hls.attachMedia(videoRef.current);
      // hls엔진을 video 태그에 연결 -> 여기서부터 video가 hls 기반으로 재생 가능하게 됨

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onLevels) {
          onLevels(hls.levels); // 화질 목록 배열 생성 완료
        }
      });

      return () => {
        // cleanup
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src; // safari 대응
    }
  }, [src]);

  return hlsRef;
};
