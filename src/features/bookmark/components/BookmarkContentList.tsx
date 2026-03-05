"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { useBookmarkContents } from "@entities/bookmark/hooks";
import { useDeleteBookmark } from "@entities/bookmark/hooks";

export default function BookmarkContentList() {
  const [isDeleteContentModalOpen, setIsDeleteContentModalOpen] = useState<boolean>(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);

  const { data, isLoading, isError } = useBookmarkContents();
  const { mutate: deleteBookmark, isPending } = useDeleteBookmark();

  const handleDelete = () => {
    if (isPending || selectedMediaId === null) return;
    deleteBookmark(selectedMediaId, {
      onSuccess: () => {
        setIsDeleteContentModalOpen(false);
        setSelectedMediaId(null);
      },
    });
  };

  const items = data?.pages.flatMap((page) => page.dataList) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-100">
        <p className="text-ot-text">로딩 중 ~</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-100">
        <p className="text-ot-gray-600">북마크를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-100">
        <p className="text-ot-gray-600">북마크한 콘텐츠 X</p>
      </div>
    );
  }

  return (
    <div className="w-full h-100 overflow-y-auto no-scrollbar">
      <div className="relative grid grid-cols-2 gap-x-10 gap-y-2">
        {items.map((item) => (
          <div
            key={item.mediaId}
            className="relative group flex items-center gap-8 p-4 rounded-xl hover:bg-ot-gray-900 w-full cursor-pointer transition-all duration-200"
          >
            {/* 포스터 이미지 (4:3) */}
            <div className="relative shrink-0 w-36 aspect-4/3 bg-ot-gray-800 rounded-lg overflow-hidden">
              {item.posterUrl ? (
                <>
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:brightness-50 transition-all duration-200"
                  />
                  {/* 플레이 아이콘 오버레이 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Play size={18} className="text-ot-text fill-ot-text drop-shadow-md" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[9px] text-ot-gray-400 text-center leading-tight px-1">
                  4:3
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
                setSelectedMediaId(item.mediaId); // 북마크 삭제 API
                setIsDeleteContentModalOpen(true);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-full text-ot-gray-500 hover:text-ot-text hover:bg-ot-gray-800 transition-all duration-150"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isDeleteContentModalOpen}
        message="북마크를 삭제하시겠습니까?"
        onConfirm={handleDelete}
        onClose={() => {
          if (isPending) return;
          setIsDeleteContentModalOpen(false);
          setSelectedMediaId(null);
        }}
        confirmText="네, 삭제합니다"
        cancelText="남겨두기"
        disabled={isPending}
      />
    </div>
  );
}
