import { RecentContentList } from "@mypage-recenthistory";
import { mockRecentData } from "@/mocks/mockRecent";

export default function RecentContentBox() {
  return (
    <div className="flex flex-col w-full">
      <div>
        <RecentContentList items={mockRecentData} />
      </div>
    </div>
  );
}
