import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PipState {
  isPip: boolean;
  src: string;
  mediaId: number | null;
  currentTime: number;
  enterPip: (src: string, mediaId: number, currentTime: number) => void;
  exitPip: () => void;
  setCurrentTime: (time: number) => void;
}

export const usePipStore = create<PipState>()(
  devtools(
    (set) => ({
      isPip: false,
      src: "",
      mediaId: null,
      currentTime: 0,
      enterPip: (src, mediaId, currentTime) =>
        set({ isPip: true, src, mediaId, currentTime }, false, "enterPip"),
      exitPip: () =>
        set({ isPip: false, src: "", mediaId: null }, false, "exitPip"),
      setCurrentTime: (time) =>
        set({ currentTime: time }, false, "setCurrentTime"),
    }),
    { name: "PipStore" },
  ),
);
