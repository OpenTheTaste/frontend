"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RecentItem } from "@/shared/types/mypage/recenthistory";
import { ScrollEdgeButton } from "@shared-ui";

interface RecentContentListProps {
  items: RecentItem[];
}

export default function RecentContentList({ items }: RecentContentListProps) {
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

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-16">
        <p className="text-ot-gray-600">최근 시청한 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* 가로 스크롤 */}
      <div
        ref={scrollRef}
        className="flex gap-10 py-8 overflow-x-auto no-scrollbar"
      >
        {items.map((item) => (
          <div key={item.id} className="shrink-0">
            {/* 포스터 이미지 영역 (이미지 4 : 3 비율) */}
            <div className="w-45 aspect-4/3 relative flex items-center justify-center bg-ot-gray-800 rounded-lg overflow-hidden border border-ot-gray-700">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-ot-gray-400 text-sm px-2 text-center">
                  {item.title}
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
