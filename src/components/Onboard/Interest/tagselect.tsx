'use client';

interface TagSelectionProps {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export default function TagSelect({
  tags,
  selectedTags,
  onToggleTag
}: TagSelectionProps) {
  return (
    <div className="flex-1 bg-ot-gray-800 p-6">
      <h3 className="text-[1rem] font-bold text-ot-pink-500 mb-6">태그</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-4 py-2 rounded-full text-[0.875rem] font-medium transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-ot-primary-50 text-ot-primary-500'
                : 'bg-ot-gray-700 text-ot-gray-300 hover:bg-ot-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}