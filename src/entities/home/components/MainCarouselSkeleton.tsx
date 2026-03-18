const ITEM_WIDTH = 1350;
const ITEM_HEIGHT = 400;
const VISIBLE_COUNT = 3;

export function MainCarouselSkeleton() {
  return (
    <div className="bg-ot-background w-full px-12 pt-5 pb-5">
      <div className="mb-5 h-7 w-0" />
      <div className="relative overflow-hidden">
        <div className="flex gap-4">
          {Array.from({ length: VISIBLE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="bg-ot-gray-800 shrink-0 animate-pulse rounded-xl"
              style={{
                width: `${ITEM_WIDTH}px`,
                height: `${ITEM_HEIGHT}px`,
                opacity: i === 0 ? 1 : i === 1 ? 0.5 : 0.2,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2 pr-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`bg-ot-gray-700 h-2 animate-pulse rounded-full ${
              i === 0 ? "w-6" : "w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
