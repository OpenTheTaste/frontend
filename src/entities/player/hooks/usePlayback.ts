import { useEffect, useRef } from "react";
import { playbackApi } from "@entities/player/api";

interface usePlaybackProps {
  mediaId: number;
  getCurrentPostionSec: () => number;
  isPlaying: boolean;
}
export const usePlayback = ({
  mediaId,
  getCurrentPostionSec,
  isPlaying,
}: usePlaybackProps) => {
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isPlayingRef.current) return;
      try {
        await playbackApi(mediaId, getCurrentPostionSec());
      } catch {}
    }, 10000);

    return () => clearInterval(interval);
  }, [mediaId]);
};
