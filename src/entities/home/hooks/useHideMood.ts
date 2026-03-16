import { useState } from "react";
import { patchMoodHide } from "@entities/home/apis";

export const useHideMood = () => {
  const [isLoading, setIsLoading] = useState(false);

  const hideMood = async (refreshId: number) => {
    setIsLoading(true);
    try {
      await patchMoodHide(refreshId);
    } finally {
      setIsLoading(false);
    }
  };

  return { hideMood, isLoading };
};
