"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollEdgeButton } from "@shared/components";
import { mockActiveAiCard } from "@shared/mocks/mockAiCardList";
import { AiCardSlide } from "@entities/home/components";

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
  const [aiCard, setAiCard] = useState(mockActiveAiCard);

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
    <div className="bg-ot-background w-full pt-[1.33rem] pr-[3rem] pb-[1.33rem] pl-[3rem]">
      <h2 className="text-ot-text mb-5 text-[1.5rem] font-bold">{title}</h2>

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
                className="bg-ot-gray-800 border-ot-gray-700 flex-shrink-0 rounded-xl border"
                style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
              >
                {/* ============================== 추가한 부분 ============================== */}
                {idx === 0 && aiCard ? (
                  <AiCardSlide
                    aiCard={aiCard}
                    onClose={() => setAiCard(null)}
                  />
                ) : null}
                {/* ====================================================================== */}
              </div>
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

        <div className="mt-3 flex justify-end gap-2 pr-12">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
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
    </div>
  );
}
