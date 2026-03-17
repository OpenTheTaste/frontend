export function SearchResultSkeleton() {
  return (
    <div className="-mt-10 flex flex-col gap-y-8">
      <div className="bg-ot-gray-800 h-8 w-64 animate-pulse rounded-md" />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-ot-gray-800 aspect-5/7 w-full animate-pulse rounded-lg"
            style={{ opacity: i >= 10 ? 0.4 : 1 }}
          />
        ))}
      </div>
    </div>
  );
}
