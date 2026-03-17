export function CustomSettingSkeleton() {
  return (
    <div className="text-ot-text min-h-[calc(100vh-100px)]">
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* 헤더 */}
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-ot-gray-800 h-7 w-7 animate-pulse rounded-md" />
          <div className="bg-ot-gray-800 h-8 w-72 animate-pulse rounded-md" />
        </div>

        {/* 메인 2컬럼 */}
        <div className="mb-10 grid grid-cols-2 gap-6">
          {/* 좌측: 레이더 차트 */}
          <div className="bg-ot-gray-900 flex min-h-125 items-center justify-center rounded-2xl p-10">
            <div className="bg-ot-gray-800 h-112.5 w-full animate-pulse rounded-full" />
          </div>

          {/* 우측: 슬라이더 패널 */}
          <div className="bg-ot-gray-900 flex flex-col rounded-2xl p-8">
            {/* 상단 바 */}
            <div className="mb-7 flex items-center justify-between">
              <div className="bg-ot-gray-800 h-6 w-32 animate-pulse rounded-md" />
              <div className="flex gap-2">
                <div className="bg-ot-gray-800 h-6 w-20 animate-pulse rounded-full" />
                <div className="bg-ot-gray-800 h-6 w-20 animate-pulse rounded-full" />
              </div>
            </div>

            {/* 슬라이더 5개 */}
            <div className="flex flex-1 flex-col justify-center gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-ot-gray-800 w-30 shrink-0 animate-pulse rounded-lg py-2.5">
                    <div className="h-5" />
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="bg-ot-gray-800 h-3 w-4 animate-pulse rounded-md" />
                    <div className="bg-ot-gray-800 h-3 flex-1 animate-pulse rounded-full" />
                    <div className="bg-ot-gray-800 h-3 w-8 animate-pulse rounded-md" />
                  </div>
                  <div className="bg-ot-gray-800 h-5 w-7 animate-pulse rounded-md" />
                </div>
              ))}
            </div>

            {/* 버튼 2개 */}
            <div className="mt-8 flex gap-4">
              <div className="bg-ot-gray-800 h-11 flex-1 animate-pulse rounded-xl" />
              <div className="bg-ot-gray-800 h-11 flex-1 animate-pulse rounded-xl" />
            </div>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div>
          <div className="bg-ot-gray-800 mb-4 h-7 w-28 animate-pulse rounded-md" />
          <div className="bg-ot-gray-900 rounded-2xl p-8">
            <div className="flex flex-col gap-3">
              {GUIDE_WIDTHS.map((width, i) => (
                <div
                  key={i}
                  className="bg-ot-gray-800 h-4 animate-pulse rounded-md"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GUIDE_WIDTHS = [92, 87, 95, 78, 88, 96, 83, 90];
