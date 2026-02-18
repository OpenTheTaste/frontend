"use client";

import { useEffect, useRef } from "react";
import RightListScroll from "@/components/mypage/recenthistory/RightListScroll";
import { RecentItem } from "@/types/recent3m";

interface RecentContentListProps {
  items: RecentItem[];
}

export default function RecentContentList({ items }: RecentContentListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 가로 휠 스크롤 기능
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft - e.deltaY * 2,
        behavior: "auto",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // 오른쪽 끝으로 한 번에 스크롤
  const ListScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative group">
      {/* 가로 스크롤 */}
      <div ref={scrollRef} className="flex gap-15 pt-5 pb-5 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="shrink-0">
            {/* 포스터 이미지 영역 (그림 320 * 240 크기) */}
            <div className="w-50 h-37.5 flex items-center justify-center bg-ot-gray-800 rounded-lg overflow-hidden border border-ot-gray-700">
              {/* 이미지 추가 부분: item.image가 있으면 출력, 없으면 텍스트 출력 */}
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-ot-gray-400 text-sm">{item.title}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 오른쪽 끝에 스크롤 버튼 */}
      <div className="absolute inset-y-0 right-0 pointer-events-none flex items-center pr-2">
        <div className="pointer-events-auto">
          <RightListScroll onClick={ListScroll} />
        </div>
      </div>
    </div>
  );
}
