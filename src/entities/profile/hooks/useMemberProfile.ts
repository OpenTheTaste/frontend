import { useQuery } from "@tanstack/react-query";
import { memberApi } from "@entities/profile/api";

export function useMemberProfile() {
  return useQuery({
    queryKey: ["memberProfile"],
    queryFn: async () => {
      const res = await memberApi.getMemberProfile();
      return res.data.data;
    },
  });
}
