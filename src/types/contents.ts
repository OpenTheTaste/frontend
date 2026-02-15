// 콘텐츠 기본 타입
export interface BaseContent {
  id: number;
  type: "single" | "series";
  title: string;
  description: string;
  cast: string;
  categories: string[];
  tags: string[];
  thumbnail: string | null;
}

// 시리즈 콘텐츠
export interface SeriesContent extends BaseContent {
  type: "series";
  lastWatchedEpisode: number | null;
  episodes: Episode[];
}

// 단편 콘텐츠
export interface SingleContent extends BaseContent {
  type: "single";
}

// 시리즈 회차 (에피소드) - 시리즈
export interface Episode {
  id: number;
  episodeNumber: number;
  title: string;
  thumbnail: string;
  description: string;
  cast: string;
}

// 다음 재생목록 - 단편
export interface Recommendation {
  id: number;
  title: string;
  thumbnail: string;
}

export type Content = SingleContent | SeriesContent;
