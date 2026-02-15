// src/components/Interest/SelectedTagsDisplay.tsx
'use client';

import { Category } from "@/types/interest/category";

interface SelectedTagsDisplayProps {
  selectedTagsByCategory: Record<Category, string[]>;
  onClearAll: () => void;
}

export default function SelectedTags({
  selectedTagsByCategory,
  onClearAll
}: SelectedTagsDisplayProps) {
  const allSelectedTags = Object.entries(selectedTagsByCategory)
    .flatMap(([category, tags]) => 
      tags.map(tag => ({ category: category as Category, tag }))
    );

  return (
    <div className="border border-ot-white rounded-lg bg-ot-background p-6 mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[1rem] font-bold text-white">
          선택한 관심사 ({allSelectedTags.length})
        </h3>
        <button
          onClick={onClearAll}
          className="text-[0.75rem] text-ot-pink-500 hover:text-ot-pink-600 font-medium transition-colors"
        >
          전체 해제
        </button>
      </div>

      {allSelectedTags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {allSelectedTags.map(({ category, tag }, idx) => (
            <div
              key={`${category}-${tag}-${idx}`}
              className="bg-ot-primary-50 text-ot-primary-500 px-3 py-1 rounded text-[0.75rem] font-medium flex items-center gap-2"
            >
              <span>{tag}</span>
              <span className="text-ot-primary-500">|</span>
              <span>{category}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[0.75rem] text-ot-gray-500">선택된 관심사가 없습니다.</p>
      )}
    </div>
  );
}