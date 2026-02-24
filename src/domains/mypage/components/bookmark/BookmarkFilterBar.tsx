"use client";

interface BookmarkFilterBarProps {
  activeFilter: "contents" | "shorts";
  onFilterChange: (filter: "contents" | "shorts") => void;
}

export default function BookmarkFilterBar({
  activeFilter,
  onFilterChange,
}: BookmarkFilterBarProps) {
  return (
    <div className="flex flex-row items-center">
      {/* 콘텐츠 필터 버튼 */}
      <button
        type="button"
        aria-pressed={activeFilter === "contents"}
        onClick={() => onFilterChange("contents")}
        className={`flex items-center justify-center rounded-lg text-[16px] border-[3px] font-semibold cursor-pointer transition-all
          py-2 px-5
          ${
            activeFilter === "contents"
              ? "text-ot-primary-300 border-ot-primary-100"
              : "text-ot-gray-700 border-transparent hover:text-ot-primary-300 hover:border-ot-primary-100"
          }`}
      >
        콘텐츠
      </button>

      <div className="w-px h-6 bg-ot-text mx-4" />

      {/* 숏폼 필터 버튼 */}
      <button
        type="button"
        aria-pressed={activeFilter === "shorts"}
        onClick={() => onFilterChange("shorts")}
        className={`flex items-center justify-center rounded-lg text-[16px] border-[3px] font-semibold cursor-pointer transition-all
          py-2 px-7
          ${
            activeFilter === "shorts"
              ? "text-ot-primary-300 border-ot-primary-100"
              : "text-ot-gray-700 border-transparent hover:text-ot-primary-300 hover:border-ot-primary-100"
          }`}
      >
        숏폼
      </button>
    </div>
  );
}
