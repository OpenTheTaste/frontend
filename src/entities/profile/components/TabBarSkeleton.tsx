export function TabBarSkeleton() {
  return (
    <div className="relative mt-16 flex justify-start">
      <div className="flex w-fit items-center">
        <div className="bg-ot-gray-800 h-12 w-42 animate-pulse rounded-t-xl" />
        <div className="bg-ot-gray-800 ml-1 h-12 w-40 animate-pulse rounded-t-xl" />
      </div>
      <div className="border-ot-gray-800 absolute bottom-0 left-0 w-full border-t" />
    </div>
  );
}
