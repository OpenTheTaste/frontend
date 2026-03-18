"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiCardSlide } from "@entities/home/components";
import { useMoodCard } from "@entities/home/hooks";
import { ScrollEdgeButton } from "@shared/components";

const GAP = 16;
const PEEK = 48;

const BANNER_IMAGES = [
  { src: "/images/carouselPoster1.png", alt: "배너 1" },
  { src: "/images/carouselPoster2.png", alt: "배너 2" },
  { src: "/images/carouselPoster3.png", alt: "배너 3" },
];

interface ContentCarouselProps {
  title: string;
  itemWidth?: number;
  itemHeight?: number;
}

export default function MainCarousel({
  title,
  itemWidth = 160,
  itemHeight = 220,
}: ContentCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: aiCardData } = useMoodCard();
  const [dismissed, setDismissed] = useState(false);

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

  const itemCount = 1 + BANNER_IMAGES.length;
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
    <div className="bg-ot-background w-full pt-[1.33rem] pr-12 pb-[1.33rem] pl-12">
      <h2 className="text-ot-text mb-5 text-2xl font-bold">{title}</h2>

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
            <div
              className="bg-ot-gray-800 relative shrink-0 overflow-hidden rounded-xl"
              style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
            >
              {aiCardData && !dismissed && (
                <AiCardSlide
                  aiCard={aiCardData}
                  onClose={() => setDismissed(true)}
                />
              )}
            </div>

            {BANNER_IMAGES.map((banner, idx) => (
              <div
                key={idx}
                className="bg-ot-gray-800 relative shrink-0 overflow-hidden rounded-xl"
                style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                />
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
