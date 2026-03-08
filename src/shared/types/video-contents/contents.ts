// 콘텐츠 기본 타입 -> 현재 미사용
export interface BaseContent {
  id: number;
  mediaType: "CONTENTS" | "SERIES";
  title: string;
  description: string;
  actors: string;
  category: string;
  tags: string[];
  thumbnail: string | null;
  isLiked: boolean;
  isBookmarked: boolean;
}

// 시리즈 콘텐츠 -> 현재 미사용
export interface SeriesContent extends BaseContent {
  mediaType: "SERIES";
  lastWatchedEpisode: number | null;
  episodes: Episode[];
}

// 단편 콘텐츠 -> 현재 미사용
export interface SingleContent extends BaseContent {
  mediaType: "CONTENTS";
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
