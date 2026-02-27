"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ConfirmModal } from "@mypage";
import { BookmarkShortsMockData } from "@/mocks/mockbookmarkshorts";

export default function BookmarkShortsList() {
  const [isDeleteShortsModalOpen, setIsDeleteShortsModalOpen] =
    useState<boolean>(false);

  const handleDelete = () => {
    // 실제 북마크 삭제 처리 로직 작성 부분 (API 호출 등)
    console.log("북마크 숏폼 삭제 완료");
    setIsDeleteShortsModalOpen(false);
  };

  if (BookmarkShortsMockData.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-ot-gray-600">북마크한 숏폼이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-100 overflow-y-auto no-scrollbar grid grid-cols-2 gap-6">
      {BookmarkShortsMockData.map((item) => (
        <div
          key={item.id}
          className="relative group flex items-start p-6 border border-ot-textround rounded-xl bg-transparent w-full h-fit cursor-pointer hover:border-ot-gray-600 transition-colors"
        >
          {/* 숏폼 이미지 (9:16) */}
          <div className="relative shrink-0 w-18 aspect-9/16 bg-ot-gray-800 rounded-lg overflow-hidden">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:brightness-50 transition-all duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-ot-gray-400">
                9 : 16 비율 이미지
              </div>
            )}
          </div>

          {/* 텍스트 설명 (이미지 오른쪽) */}
          <div className="flex flex-col flex-1 min-w-0 pl-6 pr-6">
            {/* 제목 */}
            <h3 className="text-[24px] font-bold text-ot-textround mb-6 line-clamp-2 break-all group-hover:text-ot-gray-600 transition-colors">
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
            onClick={() => setIsDeleteShortsModalOpen(true)}
            className="absolute top-4 right-4 text-ot-gray-500 hover:text-ot-gray-600"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>
      ))}
      <ConfirmModal
        isOpen={isDeleteShortsModalOpen}
        message="북마크를 삭제하시겠습니까?"
        onConfirm={handleDelete}
        onClose={() => setIsDeleteShortsModalOpen(false)}
        confirmText="네, 삭제합니다"
        cancelText="남겨두기"
      />
    </div>
  );
}
