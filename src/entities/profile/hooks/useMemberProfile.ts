import { useQuery } from "@tanstack/react-query";
import { getMemberProfileApi } from "@entities/profile/api";

export function useMemberProfile() {
  return useQuery({
    queryKey: ["memberProfile"],
    queryFn: async () => {
      const res = await getMemberProfileApi();
      return res.data.data;
    },
  });
}
