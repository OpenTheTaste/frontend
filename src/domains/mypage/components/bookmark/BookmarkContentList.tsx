"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { BookmarkContentsMockData } from "@/mocks/mockbookmarkcontent";

export default function BookmarkContentList() {
  return (
    <div className="w-full h-100 overflow-y-auto no-scrollbar grid grid-cols-2 gap-6">
      {BookmarkContentsMockData.map((item) => (
        <div
          key={item.id}
          className="relative group flex items-start p-6 border border-foreground rounded-xl bg-transparent w-full h-fit cursor-pointer hover:border-ot-gray-600 transition-colors"
        >
          {/* 포스터 이미지 (4 : 3) */}
          <div className="relative shrink-0 w-40 aspect-4/3 bg-ot-gray-800 rounded-lg overflow-hidden">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:brightness-60 transition-all duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-ot-gray-400">
                4 : 3 비율 이미지
              </div>
            )}
          </div>

          {/* 텍스트 설명 (이미지 오른쪽) */}
          <div className="flex flex-col flex-1 min-w-0 pl-6 pr-6">
            {/* 제목 */}
            <h3 className="text-[24px] font-bold text-foreground mb-3 line-clamp-2 break-all group-hover:text-ot-gray-600 transition-colors">
              {item.title}
            </h3>

            {/* 설명글 (2줄 이상이면 끝에 ...으로 함) */}
            <p className="text-[14px] font-normal text-ot-gray-300 line-clamp-2 break-all group-hover:text-ot-gray-600 transition-colors">
              {item.description}
            </p>
          </div>

          {/* 삭제 버튼 */}
          <button
            type="button"
            aria-label="북마크 삭제"
            className="absolute top-4 right-4 text-ot-gray-500 hover:text-ot-gray-600"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
