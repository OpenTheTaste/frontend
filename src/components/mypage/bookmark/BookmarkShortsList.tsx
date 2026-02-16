"use client";

import { X } from "lucide-react";
import { BookmarkShortsMockData } from "@/mocks/mockbookmarkshorts";

export default function BookmarkShortsList() {
  return (
    <div className="w-full h-142 overflow-y-auto no-scrollbar flex flex-col gap-15">
      {BookmarkShortsMockData.map((item) => (
        <div key={item.id} className="relative flex shrink-0 h-60 w-full">
          {/* 숏폼 이미지 (135 * 240) */}
          <div className="relative shrink-0 w-33.75 h-60 bg-ot-gray-800 rounded-lg overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-ot-gray-400">
                135 x 240
              </div>
            )}
          </div>

          {/* 텍스트 설명 (이미지 오른쪽) */}
          <div className="flex flex-col flex-1 w-full ml-15 pt-16 pr-15">
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
