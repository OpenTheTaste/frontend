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
        className={`flex items-center justify-center rounded-t-lg rounded-b-none text-[20px] font-semibold
          px-8.25 py-4
          ${
            activeTab === "recenthistory"
              ? "bg-ot-primary-gradient text-ot-text rounded-t-xl border-b-2 border-ot-primary-500"
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
              ? "bg-ot-primary-gradient text-ot-text rounded-t-xl border-b-2 border-ot-primary-500"
              : "bg-transparent text-ot-gray-600 border-b border-ot-gray-600"
          }`}
      >
        북마크
      </button>
    </div>
  );
}
