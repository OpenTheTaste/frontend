import { api } from "@shared/api";
import { ApiResponse } from "@shared/types";

export interface ContentsDetailReponse {
  mediaId: number;
  seriesMediaId: number;
  title: string;
  description: string;
  actors: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  isBookmarked: boolean;
  isLiked: boolean;
  masterPlaylistUrl: string;
  duration: number;
  positionSec: number;
}

export const getContentsDetail = async (mediaId: number) =>
  await api
    .get<ApiResponse<ContentsDetailReponse>>(`/contents/${mediaId}`)
    .then((res) => res.data.data);
