export function ShortsSkeleton() {
  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-end justify-items-center px-8">
      <div className="mr-4 flex max-w-sm flex-col gap-3 justify-self-end">
        <div className="bg-ot-gray-800 h-4 w-24 animate-pulse rounded-md" />
        <div className="bg-ot-gray-800 h-6 w-48 animate-pulse rounded-md" />
        <div className="bg-ot-gray-800 h-4 w-32 animate-pulse rounded-md" />
      </div>

      <div className="bg-ot-gray-800 aspect-9/16 h-[80vh] max-h-180 animate-pulse rounded-lg" />
      <div className="ml-4 flex flex-col gap-3 justify-self-start">
        <div className="bg-ot-gray-800 h-7.5 w-10 animate-pulse rounded-full" />
        <div className="bg-ot-gray-800 h-7.5 w-10 animate-pulse rounded-full" />
      </div>
    </div>
  );
}
