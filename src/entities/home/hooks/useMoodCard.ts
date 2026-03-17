import { useQuery } from "@tanstack/react-query";
import { getMoodCardApi } from "@entities/home/apis";

export const useMoodCard = () => {
  return useQuery({
    queryKey: ["moodCard"],
    queryFn: () => getMoodCardApi.getMoodCards(),
    select: (res) => res.data.data,
  });
};
