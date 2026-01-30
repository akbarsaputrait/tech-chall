import { toTitleCase } from "@/lib/formatter";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const discountedPrice =
    product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-white transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-sm font-medium text-gray-700 backdrop-blur">
            {toTitleCase(product.category)}
          </span>

          {product.discountPercentage > 0 && (
            <span className="rounded-full bg-blue-500 px-2 py-0.5 text-sm font-semibold text-white">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title + Rating */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {product.title}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-sm text-yellow-600">
            ★<span className="text-gray-700">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-2 text-xs text-gray-600">
          {product.description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            {product.discountPercentage > 0 && (
              <p className="text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
            <p className="text-lg font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </p>
          </div>

          <span className="text-xs text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
}
