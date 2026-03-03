"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { BookmarkShortsMockData } from "@shared/mocks/mockbookmarkshorts";

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
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-ot-gray-600">북마크한 숏폼이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] overflow-y-auto no-scrollbar">
      <div className="relative grid grid-cols-2 gap-x-10 gap-y-2">
        {BookmarkShortsMockData.map((item) => (
          <div
            key={item.id}
            className="relative group flex items-center gap-8 p-4 rounded-xl hover:bg-ot-gray-900 w-full cursor-pointer transition-all duration-200"
          >
            {/* 숏폼 이미지 (9:16) */}
            <div className="relative shrink-0 w-20 aspect-9/16 bg-ot-gray-800 rounded-lg overflow-hidden">
              {item.image ? (
                <>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:brightness-50 transition-all duration-200"
                  />
                  {/* 플레이 아이콘 오버레이 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Play
                      size={18}
                      className="text-ot-text fill-ot-text drop-shadow-md"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[9px] text-ot-gray-400 text-center leading-tight px-1">
                  9:16
                </div>
              )}
            </div>

            {/* 텍스트 설명 */}
            <div className="flex flex-col flex-1 min-w-0 pr-8">
              <h3 className="text-lg font-semibold text-ot-text mb-1.5 line-clamp-2 break-all group-hover:text-ot-gray-300 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-sm font-normal text-ot-gray-400 line-clamp-2 break-all group-hover:text-ot-gray-500 transition-colors leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* 삭제 버튼 */}
            <button
              type="button"
              aria-label="북마크 삭제"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteShortsModalOpen(true);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-full text-ot-gray-500 hover:text-ot-text hover:bg-ot-gray-800 transition-all duration-150"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>
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
