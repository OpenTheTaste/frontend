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
}

export default function ContentCarousel<T = undefined>({
  title,
  itemCount = 10,
  itemWidth = 160,
  itemHeight = 220,
  items,
  renderItem,
}: ContentCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerScroll = 5;
  const itemWidthWithGap = itemWidth + 16;
  const resolvedCount = items ? items.length : itemCount;
  const maxIndex = Math.max(0, resolvedCount - itemsPerScroll);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    let newIndex = currentIndex;

    if (direction === "right") {
      newIndex = Math.min(currentIndex + itemsPerScroll, maxIndex);
    } else {
      newIndex = Math.max(currentIndex - itemsPerScroll, 0);
    }

    setCurrentIndex(newIndex);

    scrollRef.current.scrollTo({
      left: newIndex * itemWidthWithGap,
      behavior: "smooth",
    });
  };

  const handleScrollPosition = () => {
    if (!scrollRef.current) return;

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
    <div className="w-full bg-ot-background pl-[3rem] pr-[3rem] pt-[1.33rem] pb-[1.33rem]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-[1.5rem] font-bold text-ot-text">{title}</h2>
          <button>
            <RefreshCw
              size={20}
              className="text-ot-text hover:text-ot-gray-600"
            />
          </button>
        </div>
        <div className="flex gap-2">
          {Array.from({
            length: Math.ceil(resolvedCount / itemsPerScroll),
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newIndex = Math.min(idx * itemsPerScroll, maxIndex);
                setCurrentIndex(newIndex);
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: newIndex * itemWidthWithGap,
                    behavior: "smooth",
                  });
                }
              }}
              className={`transition-all ${
                idx === Math.floor(currentIndex / itemsPerScroll)
                  ? "w-6 h-2 bg-ot-primary-500 rounded-full"
                  : "w-2 h-2 bg-ot-gray-600 rounded-full hover:bg-ot-gray-500"
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
          className="overflow-x-auto overflow-y-hidden no-scrollbar"
          onScroll={handleScrollPosition}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-4">
            {items && renderItem
              ? items.map((item, idx) => (
                  <div
                    key={idx}
                    className="shrink-0"
                    style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
                  >
                    {renderItem(item, idx)}
                  </div>
                ))
              : Array.from({ length: resolvedCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 rounded-lg bg-ot-gray-800 border border-ot-gray-700"
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
