"use client";

interface TabBarProps {
  activeTab: "recent-3m" | "bookmark";
  onTabChange: (tab: "recent-3m" | "bookmark") => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center gap-0 w-fit">
      {/* 3개월 내 시청내역 버튼 */}
      <button
        onClick={() => onTabChange("recent-3m")}
        className={`flex items-center justify-center rounded-t-lg rounded-b-none text-[20px] font-semibold
          px-8.25 py-4
          ${
            activeTab === "recent-3m"
              ? "bg-ot-primary-gradient text-ot-text rounded-t-xl"
              : "bg-transparent text-ot-gray-600 border-b border-ot-gray-600"
          }`}
      >
        3개월 내 시청내역
      </button>

      {/* 북마크 버튼 */}
      <button
        onClick={() => onTabChange("bookmark")}
        className={`flex items-center justify-center rounded-t-lg rounded-b-none text-[20px] font-semibold
          px-21.25 py-4
          ${
            activeTab === "bookmark"
              ? "bg-ot-primary-gradient text-ot-text rounded-t-xl"
              : "bg-transparent text-ot-gray-600 border-b border-ot-gray-600"
          }`}
      >
        북마크
      </button>
    </div>
  );
}
