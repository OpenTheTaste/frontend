export function TagStatsModalSkeleton() {
  return (
    <>
      {/* 그래프 영역 */}
      <div className="px-25">
        <div className="relative flex flex-col items-center rounded-lg p-3">
          {/* 제목 */}
          <div className="bg-ot-gray-700 h-6 w-40 animate-pulse rounded-md" />

          {/* TagStatsModalGraph와 동일한 구조 - max-w-sm p-6 */}
          <div className="flex w-full max-w-sm items-center justify-center p-6">
            {/* 범례 - mt-10 mr-6 shrink-0 */}
            <div className="mt-10 mr-6 flex shrink-0 flex-col gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-ot-gray-700 h-3 w-6 animate-pulse rounded-sm" />
                <div className="bg-ot-gray-700 h-3 w-10 animate-pulse rounded-sm" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-ot-gray-700 h-3 w-6 animate-pulse rounded-sm" />
                <div className="bg-ot-gray-700 h-3 w-10 animate-pulse rounded-sm" />
              </div>
            </div>

            {/* 그래프 - aspect-ratio 652/380 flex-1 */}
            <div
              className="bg-ot-gray-700 flex-1 animate-pulse rounded-md"
              style={{ aspectRatio: "652/380" }}
            />
          </div>
        </div>
      </div>

      <div className="px-15 py-2">
        <hr className="border-ot-gray-600" />
      </div>

      {/* 추천 콘텐츠 */}
      <div className="mt-2 px-15">
        <div className="bg-ot-gray-700 mb-3 h-7 w-36 animate-pulse rounded-md" />
        <div className="flex gap-6 overflow-hidden py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-ot-gray-700 aspect-4/3 w-45 shrink-0 animate-pulse rounded-lg"
              style={{ opacity: i >= 4 ? 0.4 : 1 }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
