"use client";

import { getProducts, searchProducts } from "@/lib/api";
import {
  SortOption,
  sortOptionToParams,
  urlParamsToSortOption,
} from "@/lib/sorting";
import { Category, Product } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductListSkeleton } from "./ProductListSkeleton";

interface ProductListProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductList({ initialProducts, categories }: ProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = useMemo(
    () =>
      urlParamsToSortOption(
        searchParams.get("sortBy"),
        searchParams.get("order")
      ),
    [searchParams]
  );

  const [searchInput, setSearchInput] = useState(urlSearchQuery);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMountRef = useRef(true);
  const lastClientFetchParamsRef = useRef<string>("");

  const updateURL = useCallback(
    (params: {
      q?: string;
      category?: string;
      sortBy?: string;
      order?: string;
    }) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (params.q !== undefined) {
        if (params.q) {
          current.set("q", params.q);
        } else {
          current.delete("q");
        }
      }
      if (params.category !== undefined) {
        if (params.category === "all") {
          current.delete("category");
        } else {
          current.set("category", params.category);
        }
      }
      if (params.sortBy !== undefined) current.set("sortBy", params.sortBy);
      if (params.order !== undefined) current.set("order", params.order);

      const query = current.toString();
      router.replace(`/${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  const fetchProducts = useCallback(
    async (query: string, sort: SortOption) => {
      setLoading(true);
      try {
        const { sortBy: apiSortBy, order } = sortOptionToParams(sort);
        const data = query.trim()
          ? await searchProducts(query, apiSortBy, order)
          : await getProducts(apiSortBy, order);
        setProducts(data.products);

        const fetchKey = `${query}|${apiSortBy}|${order}`;
        lastClientFetchParamsRef.current = fetchKey;

        updateURL({ q: query, sortBy: apiSortBy, order });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [updateURL]
  );

  // Handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        fetchProducts(value, sortBy);
      }, 500);
    },
    [fetchProducts, sortBy]
  );

  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      fetchProducts(urlSearchQuery, newSort);
    },
    [fetchProducts, urlSearchQuery]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      updateURL({ category });
    },
    [updateURL]
  );

  useEffect(() => {
    setSearchInput(urlSearchQuery);
  }, [urlSearchQuery]);

  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    const sortParams = sortOptionToParams(sortBy);
    const currentKey = `${urlSearchQuery}|${sortParams.sortBy}|${sortParams.order}`;
    const lastClientKey = lastClientFetchParamsRef.current;

    if (currentKey !== lastClientKey) {
      setProducts(initialProducts);
      lastClientFetchParamsRef.current = "";
    }
  }, [initialProducts, urlSearchQuery, sortBy]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="search"
                className="text-sm font-medium text-gray-700"
              >
                Search
              </label>
              <input
                id="search"
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products..."
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="min-w-[200px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-700"
              >
                Sort
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="min-w-[200px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Title (A-Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount-asc">Discount: Low to High</option>
                <option value="discount-desc">Discount: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="sr-only">Product listings</h2>
        {loading ? (
          <ProductListSkeleton />
        ) : filteredProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
