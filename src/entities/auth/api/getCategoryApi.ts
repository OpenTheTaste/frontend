import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export interface TagItem {
  tagId: number;
  name: string;
}

export const getCategoriesApi = async () =>
  await api
    .get<ApiResponse<CategoryItem[]>>(END_POINTS.CATEGORIES)
    .then((res) => res.data.data);

export const getTagsApi = async (categoryId: number) =>
  await api
    .get<ApiResponse<TagItem[]>>(`/categories/${categoryId}/tags`)
    .then((res) => res.data.data);
