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
        className={`flex items-center justify-center rounded-lg text-[16px] cursor-pointer transition-all
          py-2 pl-5 
          ${
            activeFilter === "contents"
              ? "text-ot-primary-300 font-bold"
              : "text-ot-gray-700 hover:text-ot-primary-200/90 font-semibold hover:font-bold"
          }`}
      >
        콘텐츠
      </button>

      <div className="w-px h-5 bg-ot-gray-700 mx-6" />

      {/* 숏폼 필터 버튼 */}
      <button
        type="button"
        aria-pressed={activeFilter === "shorts"}
        onClick={() => onFilterChange("shorts")}
        className={`flex items-center justify-center rounded-lg text-[16px] cursor-pointer transition-all
             py-2 
          ${
            activeFilter === "shorts"
              ? "text-ot-primary-300 font-bold"
              : "text-ot-gray-700 hover:text-ot-primary-200/90 font-semibold hover:font-bold"
          }`}
      >
        숏폼
      </button>
    </div>
  );
}
