import api from "@shared/api/apiClient"; 

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
    nane: string;
}

export const getCategories = () =>
  api.get<CategoryItem[]>("/categories");

export const getTags = (categoryId: number) =>
    api.get<TagItem[]>(`/categories/${categoryId}/tags`);

export const setPreferredTags = (tagsId: number[]) =>
  api.post<SetPreferredTagsResponse>("/member/me/tags", { tagsId });
