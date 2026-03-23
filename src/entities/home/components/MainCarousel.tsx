"use client";

import Image from "next/image";
import { useState } from "react";
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
  itemHeight?: number;
}

export default function MainCarousel({
  title,
  itemHeight = 220,
}: ContentCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: aiCardData } = useMoodCard();
  const [dismissed, setDismissed] = useState(false);

  const itemCount = (aiCardData && !dismissed ? 1 : 0) + BANNER_IMAGES.length;
  const totalPages = itemCount;
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages - 1;

  return (
    <div className="bg-ot-background w-full pt-[1.33rem] pr-12 pb-[1.33rem] pl-12">
      <h2 className="text-ot-text mb-5 text-2xl font-bold">{title}</h2>

      <div className="relative">
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
              transform: `translateX(calc(
                -${currentPage} * (100% - ${PEEK * 2}px + ${GAP}px)
                + ${currentPage > 0 ? PEEK : 0}px
              ))`,
            }}
          >
            {aiCardData && !dismissed && (
              <div
                className="bg-ot-gray-800 relative shrink-0 overflow-hidden rounded-xl"
                style={{
                  width: `calc(100% - ${PEEK * 2}px)`,
                  height: `${itemHeight}px`,
                }}
              >
                <AiCardSlide
                  aiCard={aiCardData}
                  onClose={() => {
                    setDismissed(true);
                    setCurrentPage(0);
                  }}
                />
              </div>
            )}

            {BANNER_IMAGES.map((banner, idx) => (
              <div
                key={idx}
                className="bg-ot-gray-800 relative shrink-0 overflow-hidden rounded-xl"
                style={{
                  width: `calc(100% - ${PEEK * 2}px)`,
                  height: `${itemHeight}px`,
                }}
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
