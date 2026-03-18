import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RadarResponse, putRadarApi } from "@entities/custom/apis";

export function usePutRadar() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (body: RadarResponse) => putRadarApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["radar"] });
    },
    onError: (err) => {
      console.error("레이더 설정 저장 실패:", err);
    },
  });
  return { mutate, isPending };
}
