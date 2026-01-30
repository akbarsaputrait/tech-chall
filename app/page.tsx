import { ProductList } from "@/components/ProductList";
import { getCategories, getProducts, searchProducts } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Premium Product Catalog",
  description:
    "Browse our extensive collection of high-quality products. Find the best deals on electronics, fashion, beauty products, and more. Free shipping available.",
  keywords: [
    "products",
    "online shopping",
    "e-commerce",
    "best deals",
    "shop online",
  ],
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sortBy?: string; order?: string }>;
}) {
  const params = await searchParams;
  const sortBy = params.sortBy || "title";
  const order = params.order || "asc";
  const searchQuery = params.q || "";

  const [productsData, categories] = await Promise.all([
    searchQuery.trim()
      ? searchProducts(searchQuery, sortBy, order)
      : getProducts(sortBy, order),
    getCategories(),
  ]);

  return (
    <>
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-2">
              Discover our collection of premium products
            </p>
          </header>

          <ProductList
            initialProducts={productsData.products}
            categories={categories}
          />
        </div>
      </main>
    </>
  );
}
