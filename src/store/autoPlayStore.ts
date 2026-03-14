import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MediaType, PlaylistSource } from "@shared/types";

interface AutoPlayMedia {
  mediaId: number;
  title: string;
  thumbnailUrl: string;
  mediaType: MediaType;
}

interface AutoPlayStore {
  queue: AutoPlayMedia[];
  currentMediaId: number | null;
  source: PlaylistSource | null; // playlist 종류 들어옴
  setQueue: (
    queue: AutoPlayMedia[],
    currentMediaId: number,
    source?: PlaylistSource,
  ) => void; // 현재 저장되어있는 콘텐츠 리스트와 mediaId 저장
  getNextMedia: () => AutoPlayMedia | null;
  clear: () => void;
}

export const useAutoPlayStore = create<AutoPlayStore>()(
  devtools(
    (set, get) => ({
      queue: [],
      currentMediaId: null,
      source: null,

      setQueue: (queue, currentMediaId, source) =>
        set({ queue, currentMediaId, source }, false, "setQueue"),

      getNextMedia: () => {
        const { queue, currentMediaId } = get();
        const idx = queue.findIndex((item) => item.mediaId === currentMediaId);
        if (idx < 0) return null;
        return queue[idx + 1] ?? null;
      },

      clear: () =>
        set({ queue: [], currentMediaId: null, source: null }, false, "clear"),
    }),
    { name: "AutoPlayStore", store: "AutoPlayStore", enabled: true },
  ),
);
