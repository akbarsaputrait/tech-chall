import { Category, Product, ProductsResponse } from "@/types/product";

const API_BASE = "https://dummyjson.com";

export async function getProducts(
  sortBy: string = "title",
  order: string = "asc"
): Promise<ProductsResponse> {
  const res = await fetch(
    `${API_BASE}/products?sortBy=${sortBy}&order=${order}&limit=24`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return await res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data;
}

export async function searchProducts(
  query: string,
  sortBy: string = "title",
  order: string = "asc"
): Promise<ProductsResponse> {
  const res = await fetch(
    `${API_BASE}/products/search?q=${encodeURIComponent(query)}&sortBy=${sortBy}&order=${order}&limit=24`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error("Failed to search products");

  return await res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/products/categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const categories: Category[] = await res.json();
  return categories;
}
