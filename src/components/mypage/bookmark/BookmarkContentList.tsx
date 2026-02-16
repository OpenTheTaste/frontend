"use client";

import { X } from "lucide-react";
import { BookmarkContentsMockData } from "@/mocks/mockbookmarkcontent";

export default function BookmarkContentList() {
  return (
    <div className="w-full h-142 overflow-y-auto no-scrollbar flex flex-col gap-15">
      {BookmarkContentsMockData.map((item) => (
        <div key={item.id} className="relative flex shrink-0 h-60 w-full">
          {/* 포스터 이미지 (320 * 240) */}
          <div className="relative shrink-0 w-50 h-37.5 bg-ot-gray-800 rounded-lg overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-ot-gray-400">
                320 x 240
              </div>
            )}
          </div>

          {/* 텍스트 설명 (이미지 오른쪽) */}
          <div className="flex flex-col flex-1 w-full ml-15 pt-16 pr-10">
            {/* 제목 */}
            <h3 className="text-[36px] font-bold text-foreground mb-6 line-clamp-2 break-all">
              {item.title}
            </h3>

            {/* 설명글 (2줄 이상이면 끝에 ...으로 함) */}
            <p className="text-[16px] font-normal text-ot-gray-300 line-clamp-2 break-all">
              {item.description}
            </p>
          </div>

          {/* 삭제 버튼 */}
          <button className="absolute top-0 right-0 text-ot-gray-400 hover:text-ot-gray-600">
            <X size={24} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
