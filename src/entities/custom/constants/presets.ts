import { Factor } from "./factors";

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
      "숏폼 트렌드": 5,
      "내 취향": 5,
    },
  },
  HIDDEN_GEM: {
    id: "hidden_gem",
    label: "숨은 명작",
    icon: "💎",
    values: {
      대중성: 5,
      몰입도: 30,
      마니아: 40,
      최신성: 10,
      "숏폼 트렌드": 5,
      "내 취향": 10,
    },
  },
  PERSONALIZED: {
    id: "personalized",
    label: "내 취향",
    icon: "⚡",
    values: {
      대중성: 10,
      몰입도: 20,
      마니아: 10,
      최신성: 5,
      "숏폼 트렌드": 5,
      "내 취향": 50,
    },
  },
  RESET: {
    id: "reset",
    label: "초기화",
    icon: "↩️",
    values: {
      대중성: 0,
      몰입도: 0,
      마니아: 0,
      최신성: 0,
      "숏폼 트렌드": 0,
      "내 취향": 0,
    },
  },
};
