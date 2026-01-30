import { ProductListSkeleton } from "@/components/ProductListSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">
            Discover our collection of premium products
          </p>
        </header>

        {/* Toolbar skeleton */}
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="h-10 w-40 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-10 w-40 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-10 w-40 rounded-lg bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Product grid skeleton */}
        <ProductListSkeleton />
      </div>
    </main>
  );
}
