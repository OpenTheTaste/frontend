import { useQuery } from "@tanstack/react-query";
import { GetHistoryListParams, getHistoryListApi } from "@entities/home/apis";

export const useHistoryList = (params: GetHistoryListParams) => {
  return useQuery({
    queryKey: ["HistoryList", params],
    queryFn: () => getHistoryListApi(params),
  });
};
