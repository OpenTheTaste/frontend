"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { ConfirmModal } from "@base-components";
import { useBookmarkContents } from "@entities/bookmark/hooks";
import { useToggleBookmark } from "@entities/bookmark/hooks";
import { useMediaLink } from "@/shared/hooks";

export default function BookmarkContentList() {
  const [isDeleteContentModalOpen, setIsDeleteContentModalOpen] =
    useState<boolean>(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);

  const { data, isLoading, isError } = useBookmarkContents();
  const { mutate: deleteBookmark, isPending } = useToggleBookmark();
  const { getMediaHref } = useMediaLink();
  const router = useRouter();

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
      <div className="flex h-100 items-center justify-center">
        <p className="text-ot-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-100 items-center justify-center">
        <p className="text-ot-gray-600">
          북마크를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-100 items-center justify-center">
        <p className="text-ot-gray-600">현재 북마크한 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="no-scrollbar h-100 w-full overflow-y-auto">
      <div className="relative grid grid-cols-2 gap-x-10 gap-y-2">
        {items.map((item) => (
          <div
            key={item.mediaId}
            onClick={() =>
              router.push(
                getMediaHref(item.mediaId, item.mediaType, {
                  type: "bookmarks",
                }),
              )
            }
            className="group hover:bg-ot-gray-900 relative flex w-full cursor-pointer items-center gap-8 rounded-xl p-4 transition-all duration-200"
          >
            {/* 포스터 이미지 (4:3) */}
            <div className="bg-ot-gray-800 relative aspect-4/3 w-36 shrink-0 overflow-hidden rounded-lg">
              {item.posterUrl ? (
                <>
                  <Image
                    src={item.posterUrl}
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
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-ot-gray-400 text-sm">{item.title}</span>
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
                e.stopPropagation(); // 부모 div onClick 막기
                setSelectedMediaId(item.mediaId);
                setIsDeleteContentModalOpen(true);
              }}
              className="text-ot-gray-500 hover:text-ot-text hover:bg-ot-gray-800 absolute top-3 right-3 rounded-full p-1.5 transition-all duration-150"
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
