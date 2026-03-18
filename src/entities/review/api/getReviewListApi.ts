import { api } from "@shared/api";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

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
  mine: boolean;
}
export interface GetReviewListParams extends BasePaginationParams {
  mediaId: number;
  includeSpoiler?: boolean;
}

export const getReviewListApi = async (params: GetReviewListParams) => {
  const res = await api.get<ApiResponse<ReviewListResponse>>(
    `/comments/${params.mediaId}/comments`,
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
