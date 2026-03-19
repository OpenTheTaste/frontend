import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore {
  nickname: string | null;
  setNickname: (nickname: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      nickname: null,

      setNickname: (nickname) =>
        set({ nickname }, false, "setNickname"),

      clearUser: () =>
        set({ nickname: null }, false, "clearUser"),
    }),
    { name: "UserStore", store: "UserStore", enabled: true },
  ),
);
