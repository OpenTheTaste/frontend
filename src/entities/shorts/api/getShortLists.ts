import { api } from "@shared/api";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

export interface ShortFormItem {
  shortFormId: number;
  title: string;
  editorName: string;
  uploadDate: string;
  isBookmarked: boolean;
  isLiked: boolean;
  shortMasterPlaylistUrl: string;
  originMediaId: number;
  mediaType: string;
}

interface ShortFormsData {
  pageInfo: PageInfo;
  dataList: ShortFormItem[];
}

export const getShortLists = async (
  params: Pick<BasePaginationParams, "page" | "size">
) => {
  const { data } = await api.get<ApiResponse<ShortFormsData>>("/short-forms", {
    params,
  });
  return data.data;
};
