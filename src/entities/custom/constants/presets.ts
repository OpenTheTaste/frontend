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
      대중성: 40,
      몰입도: 10,
      마니아: 20,
      최신성: 20,
      재시청률: 10,
    },
  },
  HIDDEN_GEM: {
    id: "hidden_gem",
    label: "숨은 명작",
    icon: "💎",
    values: {
      대중성: 5,
      몰입도: 30,
      마니아: 45,
      최신성: 10,
      재시청률: 10,
    },
  },
  RESET: {
    id: "reset",
    label: "초기화",
    icon: "↩️",
    values: { ...INITIAL_VALUES },
  },
};
