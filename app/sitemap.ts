import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await getProducts();

  const productUrls = products.map((product: Product) => ({
    // @TODO: Change to the actual domain
    url: `https://example.com/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      // @TODO: Change to the actual domain
      url: "https://example.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productUrls,
  ];
}
