import { ImageCarousel } from "@/components/ImageCarousel";
import { getProduct } from "@/lib/api";
import { formatDate, toTitleCase } from "@/lib/formatter";
import {
  ArrowLeft,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: `${product.title} – Product Details`,
    description: product.description,
    keywords: [
      product.title,
      product.category,
      product.brand,
      ...(product.tags || []),
      "buy online",
      "product",
    ].filter(Boolean),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

  const averageReviewRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <article className="grid grid-cols-1 gap-8 rounded-xl border bg-white p-6 shadow-sm lg:grid-cols-2">
          <div>
            <ImageCarousel images={product.images} alt={product.title} />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Category + discount */}
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                {toTitleCase(product.category)}
              </span>

              {product.discountPercentage > 0 && (
                <span className="rounded-full bg-blue-500 px-2 py-0.5 font-semibold text-white">
                  -{product.discountPercentage.toFixed(0)}%
                </span>
              )}

              {product.availabilityStatus && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-700">
                  {product.availabilityStatus}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-gray-900">
                  {product.rating.toFixed(1)}
                </span>
              </span>
              <span>•</span>
              <span>{product.stock} in stock</span>
              {product.reviews?.length > 0 && (
                <>
                  <span>•</span>
                  <span>{product.reviews.length} reviews</span>
                </>
              )}
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1">
                {product.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {toTitleCase(tag)}
                  </span>
                ))}
                {product.tags.length > 4 && (
                  <span className="text-xs text-gray-400">
                    +{product.tags.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="mb-4">
              {product.discountPercentage > 0 && (
                <span className="mr-2 text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="mb-4 rounded-lg border bg-gray-50 px-3 text-sm">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {product.brand && (
                    <tr>
                      <td className="py-2 pr-4 text-gray-500">Brand</td>
                      <td className="py-2 font-medium text-gray-900">
                        {product.brand}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2 pr-4 text-gray-500">SKU</td>
                    <td className="py-2 font-medium text-gray-900">
                      {product.sku}
                    </td>
                  </tr>
                  {product.weight && (
                    <tr>
                      <td className="py-2 pr-4 text-gray-500">Weight</td>
                      <td className="py-2 font-medium text-gray-900">
                        {product.weight} kg
                      </td>
                    </tr>
                  )}
                  {product.dimensions && (
                    <tr>
                      <td className="py-2 pr-4 text-gray-500">Size</td>
                      <td className="py-2 font-medium text-gray-900">
                        {product.dimensions.width}×{product.dimensions.height}×
                        {product.dimensions.depth} cm
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Shipping & Warranty */}
            <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
              {product.shippingInformation && (
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4" />
                  {product.shippingInformation}
                </span>
              )}
              {product.warrantyInformation && (
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4" />
                  {product.warrantyInformation}
                </span>
              )}
              {product.returnPolicy && (
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4" />
                  {product.returnPolicy}
                </span>
              )}
            </div>

            <button
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Add ${product.title} to cart`}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </article>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                {averageReviewRating && (
                  <p className="mt-0.5 text-xs text-gray-600">
                    Average: {averageReviewRating}/5
                  </p>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {product.reviews.length} review
                {product.reviews.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="mb-1.5 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {review.reviewerName}
                        </p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatDate(review.date)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
