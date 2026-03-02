"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@shared/lib/cn";

export interface ScrollEdgeButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

export const ScrollEdgeButton = ({
  direction,
  onClick,
  className,
}: ScrollEdgeButtonProps) => {
  const isLeft = direction === "left";

  return (
    <div
      className={cn(
        "absolute inset-y-0 flex items-center pointer-events-none duration-300",
        isLeft ? "left-0" : "right-0",
        className,
      )}
    >
      <div className="pointer-events-auto">
        <button
          onClick={onClick}
          className={cn(
            "group absolute top-1/2 -translate-y-1/2 z-10 flex h-full w-10 cursor-pointer items-center",
            isLeft ? "left-0 justify-start" : "right-0 justify-end",
          )}
        >
          {/* 가장자리 페이드 */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-300 backdrop-blur-[1px] group-hover:opacity-100",
              isLeft
                ? "bg-linear-to-r from-black/25 to-transparent"
                : "bg-linear-to-l from-black/25 to-transparent",
            )}
          />

          {isLeft ? (
            <ChevronLeft
              size={28}
              className="relative z-10 text-ot-gray-600 transition-all duration-200 group-hover:text-ot-text group-hover:scale-105"
            />
          ) : (
            <ChevronRight
              size={28}
              className="relative z-10 text-ot-gray-600 transition-all duration-200 group-hover:text-ot-text group-hover:scale-105"
            />
          )}
        </button>
      </div>
    </div>
  );
};
