import { useState } from "react";
import { patchMoodHideApi } from "@entities/home/apis";

export const useHideMood = () => {
  const [isLoading, setIsLoading] = useState(false);

  const hideMood = async (refreshId: number) => {
    setIsLoading(true);
    try {
      await patchMoodHideApi(refreshId);
    } finally {
      setIsLoading(false);
    }
  };

  return { hideMood, isLoading };
};
