"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useRadarRecommend } from "@entities/custom/hooks";
import { CommonButton } from "@shared/components";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const router = useRouter();
  const { data } = useRadarRecommend({ page: 1, size: 3 });
  const previewItems = data?.dataList.slice(0, 3) ?? [];

  const handleLike = () => {
    onClose();
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-ot-gray-900 mx-4 w-full max-w-lg rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold">추천 미리보기</h3>
          <button
            onClick={onClose}
            className="text-ot-gray-400 hover:text-ot-text cursor-pointer transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-ot-gray-400 mb-5 text-sm">
          설정한 가중치로 추천된 콘텐츠입니다. 마음에 드시나요?
        </p>

        <div className="flex flex-col gap-4">
          {previewItems.map((item) => (
            <div
              key={item.mediaId}
              className="bg-ot-gray-800 flex items-center gap-4 rounded-xl p-4"
            >
              <div className="bg-ot-gray-700 relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-ot-gray-400 text-sm">{item.mediaType}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <CommonButton onClick={handleLike} className="mt-6 w-full py-3">
            좋아요
          </CommonButton>
          <CommonButton
            onClick={onClose}
            variant="secondary"
            className="mt-6 w-full py-3"
          >
            별로예요
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
