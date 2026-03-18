export function ProfileEditSkeleton() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="bg-ot-gray-800 h-16 w-16 animate-pulse rounded-full" />
      <div className="bg-ot-gray-800 mt-4 mb-3 h-10 w-full max-w-100 animate-pulse rounded-lg" />

      <section className="flex w-full flex-1 flex-col items-center justify-center py-6">
        <div className="mx-auto flex w-full max-w-275 flex-col items-center px-3">
          <div className="border-ot-gray-700 mb-2 flex w-full overflow-hidden rounded-lg border">
            <div className="border-ot-gray-700 w-45 shrink-0 border-r">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="border-ot-gray-700 flex items-center justify-between border-b px-6 py-4 last:border-b-0"
                >
                  <div className="bg-ot-gray-800 h-6 w-20 animate-pulse rounded-md" />
                  <div className="bg-ot-gray-800 h-6 w-5 animate-pulse rounded-sm" />
                </div>
              ))}
            </div>

            <div className="flex-1 p-6">
              <div className="bg-ot-gray-800 mb-6 h-5 w-10 animate-pulse rounded-md" />
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-ot-gray-800 h-10 w-24 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-ot-text mb-3 w-full rounded-lg border p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="bg-ot-gray-800 h-5 w-28 animate-pulse rounded-md" />
              <div className="bg-ot-gray-800 h-4 w-14 animate-pulse rounded-md" />
            </div>
            <div className="bg-ot-gray-800 h-4 w-36 animate-pulse rounded-md" />
          </div>
        </div>
      </section>

      <div className="bg-ot-gray-800 mt-4 mb-4 h-12 w-60 animate-pulse rounded-lg" />
    </div>
  );
}
