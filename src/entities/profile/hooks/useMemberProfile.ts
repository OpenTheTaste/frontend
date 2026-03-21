import { useQuery } from "@tanstack/react-query";
import { getMemberProfileApi } from "@entities/profile/api";

export function useMemberProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["memberProfile"],
    queryFn: async () => {
      const res = await getMemberProfileApi();
      return res.data.data;
    },
    enabled: options?.enabled ?? true,
  });
}
