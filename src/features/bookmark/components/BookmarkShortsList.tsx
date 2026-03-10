"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { useBookmarkShortForms } from "@entities/bookmark/hooks";
import { useToggleBookmark } from "@entities/bookmark/hooks";

export default function BookmarkShortsList() {
  const [isDeleteShortsModalOpen, setIsDeleteShortsModalOpen] =
    useState<boolean>(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);

  const { data, isLoading } = useBookmarkShortForms();
  const { mutate: deleteBookmark, isPending } = useToggleBookmark();

  const handleDelete = () => {
    if (selectedMediaId === null) return;
    deleteBookmark(selectedMediaId, {
      onSuccess: () => setIsDeleteShortsModalOpen(false),
    });
  };

  const items = data?.pages.flatMap((page) => page.dataList) ?? [];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-ot-text">로딩 중...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-ot-gray-600">현재 북마크한 숏폼이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="no-scrollbar h-[50vh] w-full overflow-y-auto">
      <div className="relative grid grid-cols-2 gap-x-10 gap-y-2">
        {items.map((item) => (
          <div
            key={item.mediaId}
            className="group hover:bg-ot-gray-900 relative flex w-full cursor-pointer items-center gap-8 rounded-xl p-4 transition-all duration-200"
          >
            {/* 숏폼 이미지 (9:16) */}
            <div className="bg-ot-gray-800 relative aspect-9/16 w-20 shrink-0 overflow-hidden rounded-lg">
              {item.thumbnailUrl ? (
                <>
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-200 group-hover:brightness-50"
                  />
                  {/* 플레이 아이콘 오버레이 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Play
                      size={18}
                      className="text-ot-text fill-ot-text drop-shadow-md"
                    />
                  </div>
                </>
              ) : (
                <div className="text-ot-gray-400 flex h-full w-full items-center justify-center px-1 text-center text-[9px] leading-tight">
                  9:16
                </div>
              )}
            </div>

            {/* 텍스트 설명 */}
            <div className="flex min-w-0 flex-1 flex-col pr-8">
              <h3 className="text-ot-text group-hover:text-ot-gray-300 mb-1.5 line-clamp-2 text-lg leading-snug font-semibold break-all transition-colors">
                {item.title}
              </h3>
              <p className="text-ot-gray-400 group-hover:text-ot-gray-500 line-clamp-2 text-sm leading-relaxed font-normal break-all transition-colors">
                {item.description}
              </p>
            </div>

            {/* 삭제 버튼 */}
            <button
              type="button"
              aria-label="북마크 삭제"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMediaId(item.mediaId); // 북마크 삭제 API
                setIsDeleteShortsModalOpen(true);
              }}
              className="text-ot-gray-500 hover:text-ot-text hover:bg-ot-gray-800 absolute top-3 right-3 rounded-full p-1.5 transition-all duration-150"
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
        disabled={isPending}
      />
    </div>
  );
}
