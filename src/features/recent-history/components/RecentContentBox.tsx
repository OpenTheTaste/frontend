import { RecentContentList } from "@features/recent-history/components";
import { mockRecentData } from "@shared/mocks/mockRecent";

export default function RecentContentBox() {
  return (
    <div className="flex flex-col w-full">
      <div>
        <RecentContentList items={mockRecentData} />
      </div>
    </div>
  );
}
