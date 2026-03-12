"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { CommonButton } from "@base-components";
import { useRadarRecommend } from "@entities/custom/hooks";

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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-ot-gray-900 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">추천 미리보기</h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-ot-gray-400 hover:text-ot-text transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-ot-gray-400 mb-5">
          설정한 가중치로 추천된 콘텐츠입니다. 마음에 드시나요?
        </p>

        <div className="flex flex-col gap-4">
          {previewItems.map((item) => (
            <div key={item.mediaId} className="flex items-center gap-4 bg-ot-gray-800 rounded-xl p-4">
              <div className="relative w-20 h-14 rounded-lg bg-ot-gray-700 shrink-0 overflow-hidden">
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
                <p className="text-sm text-ot-gray-400">{item.mediaType}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <CommonButton onClick={handleLike} className="w-full mt-6 py-3">
            좋아요
          </CommonButton>
          <CommonButton onClick={onClose} variant="secondary" className="w-full mt-6 py-3">
            별로예요
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
