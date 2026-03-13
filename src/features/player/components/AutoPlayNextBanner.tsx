"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

interface NextMediaInfo {
  mediaId: number;
  title: string;
  thumbnailUrl: string;
}

interface AutoPlayNextBannerProps {
  type: "contents" | "episode";
  nextMedia: NextMediaInfo;
  countdownSec?: number;
  onConfirm: () => void;
  onCancel: () => void;
  showControls: boolean;
}

export const AutoPlayNextBanner = ({
  type,
  nextMedia,
  countdownSec,
  onConfirm,
  onCancel,
  showControls,
}: AutoPlayNextBannerProps) => {
  const defaultSec = countdownSec ?? (type === "contents" ? 15 : 5);
  const [remaining, setRemaining] = useState(defaultSec);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onConfirm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onConfirm]);

  const bottomClass = showControls ? "bottom-20" : "bottom-4";

  if (type === "episode") {
    return (
      <div
        className={`bg-ot-gray-900/90 hover:bg-ot-gray-800/90 absolute right-4 ${bottomClass} flex items-center gap-4 rounded-md px-3 py-3 shadow-lg backdrop-blur-sm transition-all`}
      >
        <div
          className="relative h-14 w-22 shrink-0 cursor-pointer overflow-hidden rounded-md"
          onClick={onConfirm}
        >
          <Image
            src={nextMedia.thumbnailUrl}
            alt={nextMedia.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex cursor-pointer flex-col gap-1" onClick={onConfirm}>
          <p className="text-ot-text line-clamp-1 max-w-35 text-sm leading-tight font-semibold">
            {nextMedia.title}
          </p>
          <p className="text-ot-gray-400 text-xs">{remaining}초 뒤 연속 재생</p>
        </div>

        <button
          onClick={onCancel}
          className="text-ot-gray-600 hover:text-ot-text ml-1 shrink-0 self-start p-1 transition-colors"
          aria-label="자동재생 취소"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onConfirm}
      className={`bg-ot-gray-900/90 hover:bg-ot-gray-800/90 absolute right-4 ${bottomClass} flex items-center gap-3 rounded-md px-4 py-3 shadow-lg backdrop-blur-sm transition-all`}
    >
      <Play size={16} fill="currentColor" />
      <span className="text-ot-text text-sm font-semibold whitespace-nowrap">
        {remaining}초 후 다음 화 재생
      </span>
    </button>
  );
};
