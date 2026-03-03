"use client";

export type TabType = "recenthistory" | "bookmark";

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center gap-0 w-fit">
      {/* 3개월 내 시청내역 버튼 */}
      <button
        onClick={() => onTabChange("recenthistory")}
        className={`flex items-center justify-center rounded-t-xl rounded-b-none text-lg font-semibold cursor-pointer
          px-5 py-3
          ${
            activeTab === "recenthistory"
              ? "bg-ot-primary-gradient text-ot-text"
              : "text-ot-gray-600 hover:bg-ot-primary-400/20 transition-colors"
          }`}
      >
        3개월 내 시청내역
      </button>

      {/* 북마크 버튼 */}
      <button
        onClick={() => onTabChange("bookmark")}
        className={`flex items-center justify-center rounded-t-xl rounded-b-none text-lg font-semibold cursor-pointer
          px-16 py-3
          ${
            activeTab === "bookmark"
              ? "bg-ot-primary-gradient text-ot-text "
              : "text-ot-gray-600 hover:bg-ot-primary-400/20 transition-colors"
          }`}
      >
        북마크
      </button>
    </div>
  );
}
