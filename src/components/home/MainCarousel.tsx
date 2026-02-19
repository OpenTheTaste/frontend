'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentCarouselProps {
  title: string;
  itemCount?: number;
  itemWidth?: number;
  itemHeight?: number;
}

export default function MainCarousel({
  title,
  itemCount = 10,
  itemWidth = 160,
  itemHeight = 220
}: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerScroll = 1;
  const itemWidthWithGap = itemWidth + 16;
  const maxIndex = Math.max(0, itemCount - itemsPerScroll);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = Math.min(currentIndex + itemsPerScroll, maxIndex);
    } else {
      newIndex = Math.max(currentIndex - itemsPerScroll, 0);
    }

    setCurrentIndex(newIndex);

    scrollRef.current.scrollTo({
      left: newIndex * itemWidthWithGap,
      behavior: 'smooth'
    });
  };

  const handleScrollPosition = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const newIndex = Math.min(
      Math.round(scrollLeft / itemWidthWithGap),
      maxIndex
    );
    setCurrentIndex(newIndex);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  return (
    <div className="w-full bg-ot-background pl-[3rem] pr-[3rem] pt-[1.33rem] pb-[1.33rem]">
      {/* 제목 */}
      <h2 className="text-[1.5rem] font-bold text-white mb-5">{title}</h2>

      {/* 캐러셀 */}
      <div className="relative">
        {!isAtStart && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent transition-colors hover:text-white"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden no-scrollbar"
          onScroll={handleScrollPosition}
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-4">
            {Array.from({ length: itemCount }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 rounded-xl bg-ot-gray-800 border border-ot-gray-700"
                style={{ 
                  width: `${itemWidth}px`, 
                  height: `${itemHeight}px` 
                }}
              />
            ))}
          </div>
        </div>

        {!isAtEnd && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent transition-colors hover:text-white"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        )}

        {/* Indicator Dots (negative margin으로 위로 올리기) */}
        <div className="flex justify-end gap-2 -mt-8 relative z-20 pr-4">
          {Array.from({
            length: Math.ceil(itemCount / itemsPerScroll)
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newIndex = Math.min(
                  idx * itemsPerScroll,
                  maxIndex
                );
                setCurrentIndex(newIndex);
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: newIndex * itemWidthWithGap,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`transition-all ${
                idx === Math.floor(currentIndex / itemsPerScroll)
                  ? 'w-6 h-2 bg-ot-primary-500 rounded-full'
                  : 'w-2 h-2 bg-ot-gray-600 rounded-full hover:bg-ot-gray-500'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}