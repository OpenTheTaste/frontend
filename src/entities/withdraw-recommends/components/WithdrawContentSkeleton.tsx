export function WithdrawContentSkeleton() {
  return (
    <div className="border-ot-text mx-auto flex w-full flex-col items-center rounded-lg border p-8">
      <div className="bg-ot-gray-800 mb-4 h-8 w-96 animate-pulse rounded-md" />

      <div className="w-full pt-5 pb-5">
        <div className="grid grid-cols-5 gap-x-9 gap-y-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-ot-gray-800 h-45 w-60 animate-pulse rounded-lg"
              style={{ opacity: i >= 8 ? 0.4 : 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
