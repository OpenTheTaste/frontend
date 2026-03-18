export function ProfileSkeleton() {
  return (
    <div className="flex w-full items-end justify-between">
      {/* 프로필 */}
      <div className="flex h-20 w-fit items-center">
        <div className="bg-ot-gray-800 h-16 w-16 animate-pulse rounded-full" />
        <div className="flex h-full flex-col justify-center gap-1 pl-8">
          <div className="pb-2">
            <div className="bg-ot-gray-800 h-8 w-36 animate-pulse rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-ot-gray-800 h-7 w-16 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 버튼 2개 */}
      <div className="mb-2 flex items-center gap-5">
        <div className="bg-ot-gray-800 h-10 w-26 animate-pulse rounded-lg" />
        <div className="bg-ot-gray-800 h-10 w-31 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
