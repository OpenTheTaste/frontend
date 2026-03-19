import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
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
    END_POINTS.COMMENTS_BY_MEDIA(params.mediaId),
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
