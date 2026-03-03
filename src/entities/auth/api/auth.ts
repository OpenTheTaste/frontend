import api from "@shared/api/apiClient";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export interface TagItem {
  tagId: number;
  name: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const authApi = {
  getKakaoOAuthUrl: () => `${BASE_URL}oauth2/authorization/kakao`,
  getCategories: () =>
    api.get("/categories") as unknown as Promise<ApiResponse<CategoryItem[]>>,
  getTags: (categoryId: number) =>
    api.get(`/categories/${categoryId}/tags`) as unknown as Promise<ApiResponse<TagItem[]>>,
};
