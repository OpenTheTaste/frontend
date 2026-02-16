// /player 도메인

import { VideoPlayer } from "@/components/player/VideoPlayer";

export default function PlayerPage() {
  return (
    <div className="bg-black">
      <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </div>
  );
}
