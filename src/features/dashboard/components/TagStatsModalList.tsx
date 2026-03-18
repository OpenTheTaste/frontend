"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScrollEdgeButton } from "@base-components";
import { useTagRecommendPlaylist } from "@entities/dashboard/hooks";
import { useMediaLink } from "@shared/hooks";

interface TagStatsModalListProps {
  selectedTagId: number | null;
}

export default function TagStatsModalList({
  selectedTagId,
}: TagStatsModalListProps) {
  const {
    data: playlist,
    isLoading,
    isError,
  } = useTagRecommendPlaylist(selectedTagId ?? 0);
  const items = playlist?.dataList ?? [];

  const { getMediaHref } = useMediaLink();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightButton, setShowRightButton] = useState<boolean>(true); // 오른쪽 버튼 상태 (처음은 있음)
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false); // 왼쪽 버튼 상태 (처음엔 없음)

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // 현재 위치가 오른쪽 끝인지 확인 -> 맞으면 오른쪽 화살표 지움
      const isEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      setShowRightButton(!isEnd);

      // 현재 위치가 왼쪽 끝인지 확인 -> 맞으면 왼쪽 화살표 지움
      const isStart = scrollLeft <= 5;
      setShowLeftButton(!isStart);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) {
        return;
      }
      e.preventDefault(); // 세로 스크롤 방지 (지금은 가로 방향)
      // 가로 방향으로 스크롤 움직임
      el.scrollTo({
        left: el.scrollLeft - e.deltaY * 1,
        behavior: "auto",
      });
      checkScrollPosition();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const scrollToRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 500);
    }
  };

  // 왼쪽 끝으로 한 번에 스크롤
  const scrollToLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 500);
    }
  };

  if (isLoading) return <div className="text-ot-gray-600 py-4">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-ot-gray-600 py-4">
        추천 콘텐츠를 불러올 수 없습니다.
      </div>
    );

  return (
    <div className="group relative mx-auto w-full max-w-250">
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-6 overflow-x-auto py-4"
      >
        {items.map((item) => (
          <div key={item.mediaId} className="shrink-0">
            <div className="bg-ot-gray-800 relative flex aspect-4/3 w-45 items-center justify-center overflow-hidden rounded-lg">
              {item.posterUrl ? (
                <Link
                  href={getMediaHref(item.mediaId, item.mediaType, {
                    type: "recommend",
                  })}
                  className="block"
                >
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-2">
                    <p className="text-ot-text line-clamp-2 text-xs font-medium">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <span className="text-ot-gray-400 px-2 text-center text-sm">
                  콘텐츠 {item.mediaId}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showLeftButton && (
        <ScrollEdgeButton direction="left" onClick={scrollToLeft} />
      )}
      {showRightButton && (
        <ScrollEdgeButton direction="right" onClick={scrollToRight} />
      )}
    </div>
  );
}
