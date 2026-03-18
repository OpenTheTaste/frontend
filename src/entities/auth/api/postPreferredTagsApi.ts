import { api } from "@shared/api";

export interface PostPreferredTagsResponse {
  tagId: number[];
  name: string;
}

export const postPreferredTagsApi = async (tagsId: number[]) =>
  await api.post<PostPreferredTagsResponse>("/member/me/tags", { tagsId });
