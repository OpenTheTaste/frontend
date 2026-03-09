import { useQuery } from "@tanstack/react-query";
import { HistoryListApi, GetHistoryListParams } from "@entities/home/apis";

export const useHistoryList = (params: GetHistoryListParams) => { 
    return useQuery({
        queryKey: ["HistoryList", params],
        queryFn: () => HistoryListApi(params),
    })
}