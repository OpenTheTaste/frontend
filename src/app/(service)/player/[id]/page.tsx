// /player 도메인

import { VideoPlayer } from "@/domains/player/video/components";

export default function PlayerPage() {
  return (
    <div className="bg-black">
      <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </div>
  );
}
