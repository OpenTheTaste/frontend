import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRadarApi } from "@entities/custom/apis";
import { RadarResponse } from "@entities/custom/apis";

export function usePutRadar() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (body: RadarResponse) => putRadarApi.putRadar(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["radar"] });
    },
    onError: (err) => {
      console.error("레이더 설정 저장 실패:", err);
    },
  });
  return { mutate, isPending };
}
