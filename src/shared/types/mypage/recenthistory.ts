import { PageInfo } from "@/shared/types/pagination";

// 이제 사용 X
export interface RecentItem {
  id: string;
  title: string;
  image: string;
}

// 3개월 내 시청 내역 dataList 안쪽 타입
export interface RecentHistoryItem {
  mediaId: number;
  mediaType: string;
  posterUrl: string;
  positionSec: number | null;
  duration: number | null;
}

// 3개월 내 시청내역 조회 목록 전체 틀
export interface RecentHistoryResponse {
  pageInfo: PageInfo;
  dataList: RecentHistoryItem[];
}
