export function MyReviewSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="border-ot-gray-700 relative flex w-full items-center gap-8 border-b px-4 py-5"
        >
          <div className="flex flex-1 items-center gap-4">
            {/* 텍스트 영역 */}
            <div className="flex flex-1 flex-col gap-3 pr-8">
              <div className="bg-ot-gray-800 h-4 w-full animate-pulse rounded-md" />
              <div className="bg-ot-gray-800 h-3 w-24 animate-pulse rounded-md" />
            </div>

            {/* 썸네일 16:9 w-36 */}
            <div className="bg-ot-gray-800 aspect-video w-36 shrink-0 animate-pulse rounded-lg" />
          </div>

          {/* 삭제 버튼 자리 */}
          <div className="bg-ot-gray-800 h-4 w-4 animate-pulse self-start rounded-sm" />
        </div>
      ))}
    </div>
  );
}
