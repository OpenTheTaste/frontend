"use client";

import { TagItem } from "@entities/auth/api/auth";

interface TagSelectionProps {
  tags: TagItem[];
  selectedTagIds: number[];
  onToggleTag: (tagId: number) => void;
}

export default function SelectTag({
  tags,
  selectedTagIds,
  onToggleTag,
}: TagSelectionProps) {
  return (
    <div className="flex-1 bg-ot-background p-6">
      <h3 className="text-[1rem] font-bold text-ot-pink-500 mb-6">태그</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag.tagId}
            onClick={() => onToggleTag(tag.tagId)}
            className={`px-6 py-2 rounded-lg text-[1rem] font-bold transition-colors border border-ot-text ${
              selectedTagIds.includes(tag.tagId)
                ? "bg-ot-primary-50 text-ot-primary-500"
                : "bg-ot-background text-ot-gray-300 hover:bg-ot-gray-700"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
