import { PageInfo } from "@/shared/types/pagination";

// 내가 쓴 댓글 형태 안쪽 타입
export interface MyReview {
  commentId: number;
  content: string;
  contentsPosterUrl: string;
  writerId: number;
  writerNickname: string;
  createdDate: string;
}

// 내가 쓴 댓글 목록 조회될 때 타입
export interface MyReviewListResponse {
  pageInfo: PageInfo;
  dataList: MyReview[];
}

// 내 댓글 삭제 요청 보낼 때 (프 -> 백) - 안씀
export interface MyReviewDeleteRequest {
  commentId: number;
}
