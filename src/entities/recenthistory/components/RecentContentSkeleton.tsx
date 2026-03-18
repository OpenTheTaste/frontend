export function RecentContentSkeleton() {
  return (
    <div className="flex gap-6 overflow-hidden py-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-ot-gray-800 aspect-4/3 w-60 animate-pulse rounded-lg"
          style={{ opacity: i >= 5 ? 0.4 : 1 }}
        />
      ))}
    </div>
  );
}
