"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollEdgeButton } from "@shared/components";

const GAP = 16;
const PEEK = 48;

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
  itemHeight = 220,
}: ContentCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
      setCurrentPage(0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const itemsPerPage = Math.max(
    1,
    Math.floor((containerWidth - 2 * PEEK + GAP) / (itemWidth + GAP)),
  );
  const pageWidth = itemsPerPage * (itemWidth + GAP);
  const totalPages = Math.ceil(itemCount / itemsPerPage);
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages - 1;

  const translateX = isFirst ? 0 : currentPage * pageWidth - PEEK;

  return (
    <div className="w-full bg-ot-background pl-[3rem] pr-[3rem] pt-[1.33rem] pb-[1.33rem]">
      <h2 className="text-[1.5rem] font-bold text-ot-text mb-5">{title}</h2>

      <div className="relative" ref={containerRef}>
        {!isFirst && (
          <ScrollEdgeButton
            direction="left"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            className="left-0"
          />
        )}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {Array.from({ length: itemCount }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 rounded-xl bg-ot-gray-800 border border-ot-gray-700"
                style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
              />
            ))}
          </div>
        </div>

        {!isLast && (
          <ScrollEdgeButton
            direction="right"
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
            className="right-0"
          />
        )}

        <div className="flex justify-end gap-2 mt-3 pr-12">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`transition-all ${
                idx === currentPage
                  ? "w-6 h-2 bg-ot-primary-500 rounded-full"
                  : "w-2 h-2 bg-ot-gray-600 rounded-full hover:bg-ot-gray-500"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
