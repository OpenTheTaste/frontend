import { PageInfo } from "@shared/types";

export interface TagRanking {
  tagId: number;
  tagName: string;
  count: number;
  etc: boolean;
}

export interface TagRankingResponse {
  rankings: TagRanking[];
}

// 해당 달이 언제인지 표시 ex) 2026-03 / 카운트 ex) 12
export interface MonthStat {
  yearMonth: string;
  count: number;
}

// 태그별 시청 통계 타입 (저번 달 ~ 이번 달 비교)
export interface TagMonthlyStatsResponse {
  tagId: number;
  tagName: string;
  currentMonth: MonthStat;
  previousMonth: MonthStat | null;
}

// 해당 태그 모달창 아래 뜨는 콘텐츠 안쪽 타입
export interface TagPlaylistItem {
  mediaId: number;
  title: string;
  posterUrl: string;
  thumbnailUrl: string;
  mediaType: "CONTENTS" | "SERIES";
  duration: number;
  positionSec: number;
}

// 해당 태그 모달창 추천 콘텐츠 리스트 전체 타입
export interface TagPlaylistResponse {
  pageInfo: PageInfo;
  dataList: TagPlaylistItem[];
}


// ==================== Mock 데이터 타입 또는 차트 디자인 관련 ====================
// 태그 상세 통계 모달창 추천 콘텐츠 관련
export interface RecommendedContent {
  id: number;
  image: string;
}

// 각 태그(조각)를 클릭했을 때 나타날 상세 통계 관련
export interface TagDetail {
  monthlyStats: {
    thisMonth: number;
    lastMonth: number;
  };
  recommendations: RecommendedContent[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export interface DashboardData {
  labels: string[];
  datasets: ChartDataset[];
  tagDetails?: TagDetail[];
  tagIds?: number[];
}
