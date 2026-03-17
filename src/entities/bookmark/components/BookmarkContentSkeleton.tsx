export function BookmarkContentSkeleton() {
  return (
    <div className="h-100 w-full">
      <div className="grid grid-cols-2 gap-x-10 gap-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-8 rounded-xl p-4">
            {/* 포스터 4:3 */}
            <div className="bg-ot-gray-800 aspect-4/3 w-36 animate-pulse rounded-lg" />
            {/* 텍스트 */}
            <div className="flex flex-1 flex-col gap-2">
              <div className="bg-ot-gray-800 h-5 w-full animate-pulse rounded-md" />
              <div className="bg-ot-gray-800 h-4 w-4/5 animate-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
