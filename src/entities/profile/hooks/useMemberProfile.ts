import { useQuery } from "@tanstack/react-query";
import { memberApi } from "@entities/profile/api";

export function useMemberProfile() {
  return useQuery({
    queryKey: ["memberProfile"],
    queryFn: async () => {
      const res = await memberApi.getMemberProfile();
      console.log("res:", res);
      console.log("res.data:", res.data);
      return res.data;
    },
  });
}
