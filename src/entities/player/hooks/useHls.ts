"use client";

import { useEffect, useRef } from "react";
import Hls, { Level } from "hls.js";

interface UseHlsProps {
  src: string;
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

      hls.loadSource(proxySrc);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onLevels) {
          onLevels(hls.levels);
        }
        if (startTime && videoRef.current) {
          videoRef.current.currentTime = startTime;
        }
      });

      return () => {
        if (document.pictureInPictureElement) return;
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
