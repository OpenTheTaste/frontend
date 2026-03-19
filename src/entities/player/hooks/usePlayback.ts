import { useEffect, useRef } from "react";
import { putPlaybackApi } from "@entities/player/api";

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
    if (!mediaId) return;

    const interval = setInterval(async () => {
      if (!isPlayingRef.current) return;
      try {
        await putPlaybackApi(mediaId, getCurrentPostionSec());
      } catch {}
    }, 10000);

    return () => clearInterval(interval);
  }, [mediaId]);
};
