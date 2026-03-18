interface ContentCarouselSkeletonProps {
  itemWidth?: number;
  itemHeight?: number;
  itemCount?: number;
}

export function ContentCarouselSkeleton({
  itemWidth = 180,
  itemHeight = 240,
  itemCount = 10,
}: ContentCarouselSkeletonProps) {
  return (
    <div className="bg-ot-background w-full px-12 pt-5 pb-5">
      {/* 섹션 제목 */}
      <div className="bg-ot-gray-800 mb-5 h-6 w-52 animate-pulse rounded-md" />

      {/* 카드 행 */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="bg-ot-gray-800 shrink-0 animate-pulse rounded-lg"
            style={{
              width: `${itemWidth}px`,
              height: `${itemHeight}px`,
              opacity: i >= itemCount - 1 ? 0.4 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
