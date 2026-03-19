import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
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

export const getContentsDetailApi = async (mediaId: number) =>
  await api
    .get<
      ApiResponse<ContentsDetailReponse>
    >(END_POINTS.CONTENTS_DETAIL(mediaId))
    .then((res) => res.data.data);
