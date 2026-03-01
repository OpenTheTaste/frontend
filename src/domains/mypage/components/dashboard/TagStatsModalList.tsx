"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RecommendedContent } from "@/domains/mypage/types/dashboard";
import { ScrollEdgeButton } from "@basecomponent";

interface TagStatsModalListProps {
  items: RecommendedContent[];
}

export default function TagStatsModalList({ items }: TagStatsModalListProps) {
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

  // 가로 휠 스크롤 기능
  useEffect(() => {
    const el = scrollRef.current;
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
        left: el.scrollLeft - e.deltaY * 1,
        behavior: "auto",
      });
      checkScrollPosition();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", checkScrollPosition);

    // 초기 상태 확인
    checkScrollPosition();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // 오른쪽 끝으로 한 번에 스크롤
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

  return (
    <div className="w-full max-w-250 mx-auto relative group">
      {/* 가로 스크롤 */}
      <div
        ref={scrollRef}
        className="flex gap-6 py-4 overflow-x-auto no-scrollbar"
      >
        {items.map((item) => (
          <div key={item.id} className="shrink-0">
            {/* 포스터 이미지 영역 (그림 320 * 240 크기) */}
            <div className="w-45 aspect-4/3 relative flex items-center justify-center bg-ot-gray-800 rounded-lg overflow-hidden border border-ot-gray-700">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`content-${item.id}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-ot-gray-400 text-sm px-2 text-center">
                  콘텐츠 {item.id}
                </span>
              )}
            </div>
          </div>
        ))}
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
