import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, filterProducts } from "@/data/products";
import { useSearchStore } from "@/store/searchStore";
import type { ProductCategory } from "@/types";
import { PackageSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SortKey = "default" | "price-asc" | "price-desc" | "capacity-asc";

const TABS: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "water", label: "Water Tanks" },
  { key: "septic", label: "Septic Tanks" },
  { key: "agricultural", label: "Agricultural / Silage" },
];

const URL_TO_CAT: Record<string, ProductCategory | "all"> = {
  "water-tanks": "water",
  "septic-tanks": "septic",
  agricultural: "agricultural",
  "custom-solutions": "all",
  all: "all",
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "capacity-asc", label: "Capacity: Small → Large" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, activeCategory, setActiveCategory } = useSearchStore();
  const [sortKey, setSortKey] = useState<SortKey>("default");

  const urlCat = searchParams.get("category") ?? searchParams.get("cat");
  const mappedCat: ProductCategory | "all" | null = urlCat
    ? (URL_TO_CAT[urlCat] ?? null)
    : null;
  const effectiveCat: ProductCategory | "all" = mappedCat ?? activeCategory;

  const filtered = useMemo(() => {
    let result = filterProducts(PRODUCTS, query, effectiveCat);
    if (sortKey === "price-asc")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc")
      result = [...result].sort((a, b) => b.price - a.price);
    else if (sortKey === "capacity-asc")
      result = [...result].sort((a, b) => a.capacity - b.capacity);
    return result;
  }, [query, effectiveCat, sortKey]);

  useEffect(() => {
    document.title = "Water Tanks & Storage Solutions | Kentainers Kenya";
  }, []);

  function handleCategoryChange(cat: ProductCategory | "all") {
    setActiveCategory(cat);
    const catEntry = Object.entries(URL_TO_CAT).find(([, v]) => v === cat);
    if (cat === "all") {
      setSearchParams({});
    } else if (catEntry) {
      setSearchParams({ category: catEntry[0] });
    }
  }

  return (
    <Layout>
      {/* Page header band */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <h1 className="font-display font-black text-primary text-2xl md:text-3xl mb-1 tracking-tight">
            Product Catalog
          </h1>

          {/* Category tabs */}
          <div
            className="flex flex-wrap gap-2 mt-4"
            role="tablist"
            aria-label="Filter by category"
          >
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={effectiveCat === key}
                onClick={() => handleCategoryChange(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-display font-bold transition-smooth border ${
                  effectiveCat === key
                    ? "bg-primary text-primary-foreground border-primary shadow-subtle"
                    : "bg-card text-muted-foreground border-border hover:border-secondary hover:text-secondary"
                }`}
                data-ocid={`products.filter.${key}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Results count + sort bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <p
              className="text-muted-foreground text-sm font-body"
              data-ocid="products.result_count"
            >
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {PRODUCTS.length}
              </span>{" "}
              product{PRODUCTS.length !== 1 ? "s" : ""}
              {query && (
                <span className="text-secondary font-semibold">
                  {` for "${query}"`}
                </span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-xs text-muted-foreground font-body whitespace-nowrap"
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="text-sm font-body bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-smooth cursor-pointer"
                data-ocid="products.sort_select"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center gap-4"
            data-ocid="products.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-2">
              <PackageSearch size={36} className="text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-foreground text-lg">
              No products found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {query
                ? `No results for "${query}". Try a different search term or clear the filter.`
                : "No products in this category yet. Try selecting a different filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchParams({});
              }}
              className="mt-2 px-5 py-2 rounded-full bg-secondary text-secondary-foreground font-display font-bold text-sm transition-smooth hover:bg-secondary/90"
              data-ocid="products.clear_filters_button"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="products.list"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
