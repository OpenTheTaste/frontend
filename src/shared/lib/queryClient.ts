import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // 데이터 재요청까지 걸리는 시간 (5초)
      gcTime: Infinity, // 브라우저 탭이 살아 있는 동안 Query 캐시 유지
      retry: 1, // query 요청 실패 시 자동으로 재시도하는 횟수
      refetchOnWindowFocus: false, // 브라우저 탭 포커스 복귀 시 자동 재요청 여부 -> 안함
    },
  },
});
