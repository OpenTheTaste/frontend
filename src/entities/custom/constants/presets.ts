import { Factor, INITIAL_VALUES } from "@/entities/custom/constants/factors";

export interface Preset {
  id: string;
  label: string;
  icon: string;
  values: Record<Factor, number>;
}

export const CUSTOM_PRESETS: Record<string, Preset> = {
  POPULAR: {
    id: "popular",
    label: "인기작 위주",
    icon: "🔥",
    values: {
      대중성: 60,
      몰입도: 30,
      마니아: 0,
      최신성: 0,
      재시청률: 10,
    },
  },
  HIDDEN_GEM: {
    id: "hidden_gem",
    label: "숨은 명작",
    icon: "💎",
    values: {
      대중성: 0,
      몰입도: 20,
      마니아: 60,
      재시청률: 20,
      최신성: 0,
    },
  },
  RESET: {
    id: "reset",
    label: "초기화",
    icon: "↩️",
    values: { ...INITIAL_VALUES },
  },
};
