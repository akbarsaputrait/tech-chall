export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-xl border bg-white"
        >
          <div className="aspect-square bg-gray-200 animate-pulse" />

          <div className="flex flex-1 flex-col p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-10 rounded bg-gray-200 animate-pulse" />
            </div>

            <div className="mb-2 h-3 w-full rounded bg-gray-200 animate-pulse" />
            <div className="mb-4 h-3 w-5/6 rounded bg-gray-200 animate-pulse" />

            <div className="flex-1" />

            <div className="flex items-end justify-between">
              <div>
                <div className="mb-1 h-3 w-16 rounded bg-gray-200 animate-pulse" />
                <div className="h-5 w-20 rounded bg-gray-200 animate-pulse" />
              </div>

              <div className="h-3 w-14 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
