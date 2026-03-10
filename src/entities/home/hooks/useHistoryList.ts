import { useQuery } from "@tanstack/react-query";
import { GetHistoryListParams, historyListApi } from "@entities/home/apis";

export const useHistoryList = (params: GetHistoryListParams) => {
  return useQuery({
    queryKey: ["HistoryList", params],
    queryFn: () => historyListApi(params),
  });
};
