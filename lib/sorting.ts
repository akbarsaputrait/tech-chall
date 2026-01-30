export type SortOption =
  | "name"
  | "price-asc"
  | "price-desc"
  | "discount-asc"
  | "discount-desc";

export interface SortParams {
  sortBy: string;
  order: string;
}

/**
 * Mapping between SortOption and API params
 */
const SORT_MAPPING: Record<SortOption, SortParams> = {
  name: { sortBy: "title", order: "asc" },
  "price-asc": { sortBy: "price", order: "asc" },
  "price-desc": { sortBy: "price", order: "desc" },
  "discount-asc": { sortBy: "discountPercentage", order: "asc" },
  "discount-desc": { sortBy: "discountPercentage", order: "desc" },
};

export function sortOptionToParams(sort: SortOption): SortParams {
  return SORT_MAPPING[sort];
}

export function urlParamsToSortOption(
  sortBy: string | null,
  order: string | null
): SortOption {
  const normalizedSortBy = sortBy || "title";
  const normalizedOrder = order || "asc";

  for (const [option, params] of Object.entries(SORT_MAPPING)) {
    if (
      params.sortBy === normalizedSortBy &&
      params.order === normalizedOrder
    ) {
      return option as SortOption;
    }
  }

  return "name";
}
