import { create } from "zustand";

interface PipState {
  isPip: boolean;
  src: string;
  mediaId: number | null;
  currentTime: number;
  enterPip: (src: string, mediaId: number, currentTime: number) => void;
  exitPip: () => void;
  setCurrentTime: (time: number) => void;
}

export const usePipStore = create<PipState>((set) => ({
  isPip: false,
  src: "",
  mediaId: null,
  currentTime: 0,
  enterPip: (src, mediaId, currentTime) => {
    set({ isPip: true, src, mediaId, currentTime });
  },
  exitPip: () => set({ isPip: false, src: "", mediaId: null }),
  setCurrentTime: (time) => set({ currentTime: time }),
}));
