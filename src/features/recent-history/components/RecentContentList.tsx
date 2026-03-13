"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollEdgeButton } from "@base-components";
import { PlaylistItem } from "@shared/types";
import { useMediaLink } from "@/shared/hooks";
import { useInfiniteScroll } from "@shared/hooks";
import ViewProgressBar from "@entities/home/components/ViewProgressBar";

interface RecentContentListProps {
  items: PlaylistItem[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function RecentContentList({
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: RecentContentListProps) {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [showRightButton, setShowRightButton] = useState<boolean>(true); // 오른쪽 버튼 상태 (처음은 있음)
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false); // 왼쪽 버튼 상태 (처음엔 없음)
  const { getMediaHref } = useMediaLink();

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const checkScrollPosition = () => {
    if (horizontalRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = horizontalRef.current;

      // 현재 위치가 오른쪽 끝인지 확인 -> 맞으면 오른쪽 화살표 지움
      const isEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      setShowRightButton(!isEnd);

      // 현재 위치가 왼쪽 끝인지 확인 -> 맞으면 왼쪽 화살표 지움
      const isStart = scrollLeft <= 5;
      setShowLeftButton(!isStart);
    }
  };

  // 가로 휠 스크롤 기능
  useEffect(() => {
    const el = horizontalRef.current;
    if (!el) {
      return;
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) {
        return;
      }
      e.preventDefault(); // 세로 스크롤 방지 (지금은 가로 방향)
      // 가로 방향으로 스크롤 움직임
      el.scrollTo({
        left: el.scrollLeft - e.deltaY * 2,
        behavior: "auto",
      });
      checkScrollPosition();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", checkScrollPosition);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // 오른쪽 끝으로 한 번에 스크롤
  const scrollToRight = () => {
    if (horizontalRef.current) {
      horizontalRef.current.scrollTo({
        left: horizontalRef.current.scrollWidth,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 500);
    }
  };

  // 왼쪽 끝으로 한 번에 스크롤
  const scrollToLeft = () => {
    if (horizontalRef.current) {
      horizontalRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 500);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-16">
        <p className="text-ot-gray-600">최근 시청한 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 가로 스크롤 */}
      <div
        ref={horizontalRef}
        className="no-scrollbar flex gap-6 overflow-x-auto py-8"
      >
        {items.map((item) => (
          <Link
            key={item.mediaId}
            href={getMediaHref(item.mediaId, item.mediaType, {
              type: "history",
            })}
            className="block"
          >
            <div className="shrink-0">
              {/* 포스터 이미지 영역 (이미지 4 : 3 비율) */}
              <div className="bg-ot-gray-800 relative flex aspect-4/3 w-60 items-center justify-center overflow-hidden rounded-lg">
                {item.thumbnailUrl ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-ot-gray-400 text-sm">
                      {item.title}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full">
                  <ViewProgressBar
                    duration={item.duration}
                    positionSec={item.positionSec}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* 무한스크롤 감지 영역 */}
        <div ref={observerRef} className="flex w-4 shrink-0 items-center justify-center">
          {isFetchingNextPage && (
            <Loader2 className="text-ot-placeholder animate-spin" size={20} />
          )}
        </div>
      </div>

      {/* 왼쪽 끝에 스크롤 버튼 */}
      {showLeftButton && (
        <ScrollEdgeButton direction="left" onClick={scrollToLeft} />
      )}

      {/* 오른쪽 끝에 스크롤 버튼 */}
      {showRightButton && (
        <ScrollEdgeButton direction="right" onClick={scrollToRight} />
      )}
    </div>
  );
}