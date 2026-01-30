# Product Catalog

A modern, responsive product catalog application built with Next.js 16, TypeScript, and Tailwind CSS. Browse products, search, filter by category, and view detailed product information.

## Features

- **Product Listing**: Browse products with pagination and sorting
- **Search**: Real-time product search functionality
- **Category Filtering**: Filter products by category
- **Product Details**: Detailed product pages with images, specifications, and reviews
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Dynamic metadata and sitemap generation
- **Performance**: Server-side rendering with Next.js App Router and data caching

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **API**: DummyJSON API
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Package manager: Bun (recommended) or npm/yarn/pnpm

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
# Build for production
bun run build

# Start production server
bun start
```

### Linting

```bash
# Run ESLint
bun run lint
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (product listing)
│   ├── products/
│   │   └── [id]/          # Dynamic product detail pages
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading UI
│   ├── manifest.ts        # PWA manifest
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── ProductList.tsx    # Product listing with filters
│   ├── ProductCard.tsx    # Product card component
│   ├── ImageCarousel.tsx  # Image carousel for product details
│   └── ProductListSkeleton.tsx  # Loading skeleton
├── lib/                   # Utility functions
│   ├── api.ts            # API client functions
│   ├── formatter.ts      # Formatting utilities
│   └── sorting.ts        # Sorting utilities
├── types/                 # TypeScript type definitions
│   └── product.ts        # Product-related types
└── proxy.ts              # Next.js middleware for security headers
```

## API Integration

The application fetches product data from [DummyJSON API](https://dummyjson.com):

- Products listing with pagination
- Product search
- Product categories
- Individual product details

Data is cached for 1 hour using Next.js `revalidate` option for optimal performance.

## Features in Detail

### Product Listing

- Display products in a responsive grid
- Sort by title, price, rating
- Filter by category
- Search products by name/description
- Loading states and error handling

### Product Details

- Image carousel with multiple product images
- Product specifications (brand, SKU, weight, dimensions)
- Reviews and ratings
- Shipping and warranty information
- Discount pricing display

## Security

The application includes security headers via Next.js middleware:

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin
- X-DNS-Prefetch-Control: on

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
