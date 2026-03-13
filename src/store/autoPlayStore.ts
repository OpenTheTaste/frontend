import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AutoPlayMedia {
  mediaId: number;
  title: string;
  thumbnailUrl: string;
}

interface AutoPlayStore {
  queue: AutoPlayMedia[];
  currentMediaId: number | null;
  source: string | null; // playlist 종류 들어옴
  setQueue: (
    queue: AutoPlayMedia[],
    currentMediaId: number,
    source?: string,
  ) => void; // 현재 저장되어있는 콘텐츠 리스트와 mediaId 저장
  getNextMedia: () => AutoPlayMedia | null;
  clear: () => void;
}

export const useAutoPlayStore = create<AutoPlayStore>()(
  devtools(
    (set, get) => ({
      queue: [],
      currentMediaId: null,

      setQueue: (queue, currentMediaId, source) =>
        set({ queue, currentMediaId, source }, false, "setQueue"),

      getNextMedia: () => {
        const { queue, currentMediaId } = get();
        const idx = queue.findIndex((item) => item.mediaId === currentMediaId);
        return queue[idx + 1] ?? null;
      },

      clear: () => set({ queue: [], currentMediaId: null }, false, "clear"),
    }),
    { name: "AutoPlayStore", store: "AutoPlayStore", enabled: true },
  ),
);
