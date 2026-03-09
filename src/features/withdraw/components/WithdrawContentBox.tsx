"use client";

import { WithdrawContentList } from "@features/withdraw/components";
import { useWithdrawContents } from "@entities/withdraw-recommends/hooks";

export default function WithdrawContentBox() {
  const { data, isLoading, isError } = useWithdrawContents({ page: 0, size: 20 });
  const dataList = data?.dataList ?? [];

  return (
    <div className="w-full mx-auto border border-ot-text rounded-lg flex flex-col items-center p-8">
      <h2 className="text-ot-text text-[24px] font-semibold pt-2 pb-2">
        떠나시기 전에 다음{" "}
        <span className="text-ot-primary-gradient">콘텐츠</span>를 시청해보세요.
      </h2>

      <div className="w-full">
        {isLoading && <div>로딩 중...</div>}
        {isError && <div>추천 콘텐츠를 불러오지 못했습니다.</div>}
        {!isLoading && !isError && dataList.length === 0 && <div>추천 콘텐츠가 없습니다.</div>}
        {!isLoading && !isError && <WithdrawContentList items={dataList} />}
      </div>
    </div>
  );
}
