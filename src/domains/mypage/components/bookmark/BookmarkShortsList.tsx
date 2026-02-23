"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { BookmarkShortsMockData } from "@/mocks/mockbookmarkshorts";

export default function BookmarkShortsList() {
  return (
    <div className="w-full h-142 overflow-y-auto no-scrollbar flex flex-col gap-15">
      {BookmarkShortsMockData.map((item) => (
        <div key={item.id} className="relative flex items-start shrink-0 h-53.25 w-full">
          {/* 숏폼 이미지 (9:16) */}
          <div className="relative shrink-0 w-30 aspect-9/16 bg-ot-gray-800 rounded-lg overflow-hidden">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-ot-gray-400">
                135 x 240
              </div>
            )}
          </div>

          {/* 텍스트 설명 (이미지 오른쪽) */}
          <div className="flex flex-col flex-1 w-full ml-15 pt-12 pr-15">
            {/* 제목 */}
            <h3 className="text-[24px] font-bold text-foreground mb-6 line-clamp-2 break-all">
              {item.title}
            </h3>

            {/* 설명글 (2줄 이상이면 끝에 ...으로 함) */}
            <p className="text-[14px] font-normal text-ot-gray-300 line-clamp-2 break-all">
              {item.description}
            </p>
          </div>

          {/* 삭제 버튼 */}
          <button
            type="button"
            aria-label="북마크 삭제"
            className="absolute top-0 right-0 text-ot-gray-400 hover:text-ot-gray-600"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
