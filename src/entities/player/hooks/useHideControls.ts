import { useEffect, useRef, useState } from "react";

export const useHideControls = (delay = 5000) => {
  const [showControls, setShowControls] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    setShowControls(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowControls(false), delay);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return { showControls, reset };
};
