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
    <div className="flex items-center gap-5">
      {/* 콘텐츠 필터 버튼 */}
      <button
        onClick={() => onFilterChange("contents")}
        className={`flex items-center justify-center rounded-[10px] text-[18px] font-semibold
          py-3 px-7
          ${
            activeFilter === "contents"
              ? "bg-ot-primary-500 text-foreground"
              : "bg-ot-gray-600 text-foreground"
          }`}
      >
        콘텐츠
      </button>

      {/* 숏폼 필터 버튼 */}
      <button
        onClick={() => onFilterChange("shorts")}
        className={`flex items-center justify-center rounded-[10px] text-[18px] font-semibold
          py-[11.5px] px-9
          ${
            activeFilter === "shorts"
              ? "bg-ot-primary-500 text-foreground"
              : "bg-ot-gray-600 text-foreground"
          }`}
      >
        숏폼
      </button>
    </div>
  );
}
