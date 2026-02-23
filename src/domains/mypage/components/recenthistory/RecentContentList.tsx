"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RightListScroll from "@/components/mypage/RightListScroll";
import LeftListScroll from "@/components/mypage/LeftListScroll";
import { RecentItem } from "@/types/recenthistory";

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

  return (
    <div className="w-full relative group">
      {/* 가로 스크롤 */}
      <div ref={scrollRef} className="flex gap-15 pt-5 pb-5 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="shrink-0">
            {/* 포스터 이미지 영역 (그림 320 * 240 크기) */}
            <div className="w-50 h-37.5 relative flex items-center justify-center bg-ot-gray-800 rounded-lg overflow-hidden border border-ot-gray-700">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              ) : (
                <span className="text-ot-gray-400 text-sm px-2 text-center">{item.title}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 왼쪽 끝에 스크롤 버튼 */}
      {showLeftButton && (
        <div className="absolute inset-y-0 left-0 pointer-events-none flex items-center pl-2 duration-300">
          <div className="pointer-events-auto">
            <LeftListScroll onClick={scrollToLeft} />
          </div>
        </div>
      )}

      {/* 오른쪽 끝에 스크롤 버튼 */}
      {showRightButton && (
        <div className="absolute inset-y-0 right-0 pointer-events-none flex items-center pr-2 duration-300">
          <div className="pointer-events-auto">
            <RightListScroll onClick={scrollToRight} />
          </div>
        </div>
      )}
    </div>
  );
}
