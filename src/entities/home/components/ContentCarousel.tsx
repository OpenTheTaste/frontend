"use client";

import { useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { ScrollEdgeButton } from "@shared/components";

interface ContentCarouselProps<T = undefined> {
  title: string;
  itemCount?: number;
  itemWidth?: number;
  itemHeight?: number;
  items?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  onRefresh?: (nextPage: number) => void;
}

export default function ContentCarousel<T = undefined>({
  title,
  itemCount = 10,
  itemWidth = 160,
  itemHeight = 220,
  items,
  renderItem,
  onRefresh,
}: ContentCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshPage, setRefreshPage] = useState(0);
  const isProgrammaticRef = useRef(false);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const itemsPerScroll = 5;
  const itemWidthWithGap = itemWidth + 16;
  const resolvedCount = items ? items.length : itemCount;
  const maxIndex = Math.max(0, resolvedCount - itemsPerScroll);
  const totalPages = Math.ceil(resolvedCount / itemsPerScroll);
  const currentPage =
    currentIndex >= maxIndex
      ? totalPages - 1
      : Math.floor(currentIndex / itemsPerScroll);

  const scrollToIndex = (index: number) => {
    isProgrammaticRef.current = true;
    if (programmaticTimerRef.current)
      clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = setTimeout(() => {
      isProgrammaticRef.current = false;
    }, 500);
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({
      left: index * itemWidthWithGap,
      behavior: "smooth",
    });
  };

  const handleRefresh = () => {
    const nextPage = refreshPage + 1;
    setRefreshPage(nextPage);
    onRefresh?.(nextPage);
    scrollToIndex(0);
  };

  const handleScroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "right"
        ? Math.min(currentIndex + itemsPerScroll, maxIndex)
        : Math.max(currentIndex - itemsPerScroll, 0);
    scrollToIndex(newIndex);
  };

  const handleScrollPosition = () => {
    if (isProgrammaticRef.current || !scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const newIndex = Math.min(
      Math.round(scrollLeft / itemWidthWithGap),
      maxIndex,
    );
    setCurrentIndex(newIndex);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  return (
    <div className="bg-ot-background w-full pt-[1.33rem] pr-[3rem] pb-[1.33rem] pl-[3rem]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-ot-text text-[1.5rem] font-bold">{title}</h2>
          {onRefresh && (
            <button onClick={handleRefresh}>
              <RefreshCw
                size={20}
                className="text-ot-text hover:text-ot-gray-600"
              />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() =>
                scrollToIndex(Math.min(idx * itemsPerScroll, maxIndex))
              }
              className={`transition-all ${
                idx === currentPage
                  ? "bg-ot-primary-500 h-2 w-6 rounded-full"
                  : "bg-ot-gray-600 hover:bg-ot-gray-500 h-2 w-2 rounded-full"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        {!isAtStart && (
          <ScrollEdgeButton
            direction="left"
            onClick={() => handleScroll("left")}
            className="left-0"
          />
        )}

        <div
          ref={scrollRef}
          className="no-scrollbar overflow-x-auto overflow-y-hidden"
          onScroll={handleScrollPosition}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-4">
            {items && renderItem
              ? items.map((item, idx) => (
                  <div
                    key={idx}
                    className="shrink-0"
                    style={{
                      width: `${itemWidth}px`,
                      height: `${itemHeight}px`,
                    }}
                  >
                    {renderItem(item, idx)}
                  </div>
                ))
              : Array.from({ length: resolvedCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-ot-gray-800 border-ot-gray-700 shrink-0 rounded-lg border"
                    style={{
                      width: `${itemWidth}px`,
                      height: `${itemHeight}px`,
                    }}
                  />
                ))}
          </div>
        </div>

        {!isAtEnd && (
          <ScrollEdgeButton
            direction="right"
            onClick={() => handleScroll("right")}
            className="right-0"
          />
        )}
      </div>
    </div>
  );
}
