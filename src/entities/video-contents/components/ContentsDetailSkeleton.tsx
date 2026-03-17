interface ContentsDetailSkeletonProps {
  isSeries?: boolean;
}

export function ContentsDetailSkeleton({
  isSeries = false,
}: ContentsDetailSkeletonProps) {
  return (
    <div className="mx-24 my-7">
      <div className="flex gap-14">
        {/* 좌측 메인섹션  */}
        <div className="flex-1">
          <div className="bg-ot-gray-800 aspect-video w-full max-w-284 animate-pulse rounded-sm" />
          <div className="mt-8 flex items-center gap-4">
            <div className="bg-ot-gray-800 h-12 w-36 animate-pulse rounded-lg" />
            <div className="bg-ot-gray-800 h-11 w-14 animate-pulse rounded-[2.25rem]" />
            <div className="bg-ot-gray-800 h-11 w-14 animate-pulse rounded-[2.25rem]" />
          </div>
          <div className="mt-13 max-w-284">
            <div className="bg-ot-gray-800 h-9 w-80 animate-pulse rounded-md" />
            <div className="mt-5 flex gap-20">
              <div className="flex w-3/5 flex-col gap-3">
                <div className="bg-ot-gray-800 h-4 w-full animate-pulse rounded-md" />
                <div className="bg-ot-gray-800 h-4 w-full animate-pulse rounded-md" />
                <div className="bg-ot-gray-800 h-4 w-4/5 animate-pulse rounded-md" />
              </div>
              <div className="flex flex-1 flex-col gap-5">
                <div className="flex items-start gap-5">
                  <div className="bg-ot-gray-800 h-5 w-10 animate-pulse rounded-md" />
                  <div className="bg-ot-gray-800 h-5 w-40 animate-pulse rounded-md" />
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-ot-gray-800 h-5 w-16 animate-pulse rounded-md" />
                  <div className="bg-ot-gray-800 h-6 w-20 animate-pulse rounded-full" />
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-ot-gray-800 h-5 w-10 animate-pulse rounded-md" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-ot-gray-800 h-6 w-16 animate-pulse rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 우측 사이드섹션  */}
        <div className="w-full max-w-134 shrink-0">
          {isSeries ? (
            // 시리즈
            <div className="flex h-[80vh] flex-col overflow-y-hidden rounded-lg px-5 py-4">
              <div className="border-ot-gray-700 mb-2 border-b pb-3">
                <div className="bg-ot-gray-800 h-7 w-24 animate-pulse rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-6 p-4">
                    <div className="bg-ot-gray-800 aspect-4/3 w-full max-w-25 animate-pulse rounded-lg" />
                    <div className="bg-ot-gray-800 h-6 flex-1 animate-pulse rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // 콘텐츠(단편, 에피)
            <>
              <div className="mb-6 flex flex-col rounded-lg p-6">
                <div className="mb-3 flex justify-between">
                  <div className="bg-ot-gray-800 h-7 w-16 animate-pulse rounded-md" />
                  <div className="bg-ot-gray-800 h-5 w-16 animate-pulse rounded-md" />
                </div>
                <div className="bg-ot-gray-800 h-16 w-full animate-pulse rounded-lg" />
                <div className="mt-2 flex flex-col gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-ot-gray-700 flex flex-col gap-2 border-b p-3"
                    >
                      <div className="bg-ot-gray-800 h-4 w-full animate-pulse rounded-md" />
                      <div className="bg-ot-gray-800 h-3 w-24 animate-pulse rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex h-[45vh] flex-col rounded-lg px-5 py-4">
                <div className="border-ot-gray-800 mb-2 border-b pb-3">
                  <div className="bg-ot-gray-800 h-7 w-32 animate-pulse rounded-md" />
                </div>
                <div className="flex flex-col gap-2 overflow-hidden">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-6 p-4">
                      <div className="bg-ot-gray-800 aspect-4/3 w-full max-w-25 animate-pulse rounded-lg" />
                      <div className="bg-ot-gray-800 h-6 flex-1 animate-pulse rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
