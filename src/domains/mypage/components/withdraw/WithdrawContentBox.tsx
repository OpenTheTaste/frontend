"use client";

import { mockWithdrawContentData } from "@/mocks/mockwithdrawcontent";
import WithdrawContentList from "@/components/mypage/withdraw/WithdrawContentList";

export default function WithdrawContentBox() {
  return (
    <div className="w-full mx-auto border border-ot-text rounded-lg flex flex-col items-center p-8">
      <h2 className="text-ot-text text-[24px] font-semibold pt-2 pb-2">
        떠나시기 전에 다음 <span className="text-ot-primary-gradient">컨텐츠</span>를 시청해보세요.
      </h2>

      <div className="w-full">
        <WithdrawContentList items={mockWithdrawContentData} />
      </div>
    </div>
  );
}
