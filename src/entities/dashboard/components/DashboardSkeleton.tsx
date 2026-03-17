export function DashboardSkeleton() {
  return (
    <div className="border-ot-text mx-auto flex w-full flex-col items-center rounded-lg border pt-6 pb-3">
      <div className="relative flex h-125 w-full min-w-150 items-center justify-center overflow-x-auto">
        {/* 파이 차트 - 정중앙 */}
        <div className="bg-ot-gray-800 h-80 w-80 animate-pulse rounded-full" />

        {/* 범례 - 오른쪽 끝 absolute */}
        <div className="absolute right-13 flex flex-col gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-ot-gray-800 h-3 w-3 animate-pulse rounded-full" />
              <div
                className="bg-ot-gray-800 h-4 animate-pulse rounded-md"
                style={{ width: `${90 - i * 10}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
