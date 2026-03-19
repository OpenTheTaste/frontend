import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export interface PostPreferredTagsResponse {
  tagId: number[];
  name: string;
}

export const postPreferredTagsApi = async (tagsId: number[]) =>
  await api.post<PostPreferredTagsResponse>(END_POINTS.MEMBER_ME_TAGS, {
    tagsId,
  });
