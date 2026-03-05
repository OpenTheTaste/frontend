import { api } from "@shared/api/apiClient"

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export interface TagItem {
  tagId: number;
  name: string;
}

export interface SetPreferredTagsRequest {
  tagsId: number[];
}

export interface SetPreferredTagsResponse {
    tagId: number[];
    name: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getCategories = async () =>
  await api.get<ApiResponse<CategoryItem[]>>("/categories").then((res) => res.data.data);

export const getTags = async (categoryId: number) =>
  await api.get<ApiResponse<TagItem[]>>(`/categories/${categoryId}/tags`).then((res) => res.data.data);

export const setPreferredTags = async (tagsId: number[]) =>
  await api.post<SetPreferredTagsResponse>("/member/me/tags", { tagsId });
