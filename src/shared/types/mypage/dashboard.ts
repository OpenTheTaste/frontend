export interface TagRanking {
  tagId: number;
  tagName: string;
  count: number;
  etc: boolean;
}

export interface TagRankingResponse {
  rankings: TagRanking[];
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
}
