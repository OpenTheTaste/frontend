import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";
import { BasePaginationParams, PageInfo } from "@shared/types/pagination";

// 댓글 목록 api
export interface ReviewListResponse {
  pageInfo: PageInfo;
  dataList: ReviewListItem[];
}

export interface ReviewListItem {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  spoiler: boolean;
}
export interface GetReviewListParams extends BasePaginationParams {
  contentsId: number;
  includeSpoiler?: boolean;
}

export const getReviewList = async (params: GetReviewListParams) => {
  const res = await api.get<ApiResponse<ReviewListResponse>>(
    `/comments/${params.contentsId}/comments`,
    {
      params: {
        page: params.page,
        size: params.size,
        includeSpoiler: params.includeSpoiler,
      },
    },
  );
  return res.data.data;
};

// 댓글 작성 api
export interface WriteReviewRequest {
  contentId: number;
  content: string;
  isSpoiler: boolean;
}
export interface ReviewWriter {
  memberId: number;
  nickname: string;
}
export interface WriteReviewResponse {
  commentId: number;
  contentsId: number;
  content: string;
  isSpoiler: boolean;
  createdDate: string;
  writer: ReviewWriter;
}

export const writeReview = async (body: WriteReviewRequest) => {
  const res = await api.post<ApiResponse<WriteReviewResponse>>(
    "/comments",
    body,
  );
  return res.data.data;
};

// 댓글 수정
export interface EditReviewRequest {
  content: string;
  isSpoiler: boolean;
}

export interface EditReviewResponse extends WriteReviewResponse {}

export const editReview = async (
  commentId: number,
  body: EditReviewRequest,
) => {
  const res = await api.patch<ApiResponse<EditReviewResponse>>(
    `/comments/${commentId}`,
    body,
  );
  return res.data.data;
};
