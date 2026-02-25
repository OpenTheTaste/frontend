export default function StatisticsContents() {
  return (
    <div className="w-full flex flex-col">
      {/* 제목 & 설명글 영역 */}
      <section className="mt-10 mb-8">
        <div className="flex flex-col">
          {/* 제목 */}
          <p className="text-ot-text text-3xl font-bold leading-tight mb-2">대시보드</p>
          {/* 설명글 */}
          <p className="text-ot-placeholder text-md">
            실시간 콘텐츠 업로드 및 트랜스코딩 작업 현황을 파악합니다.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6 items-start">
        {/* [왼쪽] 카테고리별 #태그 시청 통계 그래프 모음 */}
        <div className="col-span-8 bg-ot-gray-700 rounded-xl p-6 h-90">
          <h3 className="text-ot-text font-bold text-[18px] mb-4">
            카테고리별 #태그 시청 통계 (월별)
          </h3>
          {/* 차트 컴포넌트가 들어갈 자리 */}
          <div className="w-full h-62 bg-ot-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-ot-gray-600">Chart Placeholder</span>
          </div>
        </div>

        {/* [오른쪽] 숏폼 콘텐츠 전환율 값 */}
        <div className="flex flex-col col-span-4 rounded-xl p-6 h-90 bg-ot-gray-700">
          <h3 className="text-ot-text font-bold text-[18px]">숏폼 → 콘텐츠 전환율 (월별)</h3>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center py-10 border border-ot-gray-600 rounded-lg bg-ot-gray-800/50">
              <div className="flex items-center justify-center gap-3">
                <span className="text-[48px] font-bold text-ot-primary-100">18.5%</span>
                <span className="text-ot-primary-200 text-[18px] font-semibold">+ 2.1% ↑</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
