import { useQuery } from "@tanstack/react-query";
import { getRadarApi } from "@entities/custom/apis";

export function useRadar() {
  return useQuery({
    queryKey: ["radar"],
    queryFn: async () => {
      const res = await getRadarApi.getRadar();
      return res.data;
    },
  });
}
