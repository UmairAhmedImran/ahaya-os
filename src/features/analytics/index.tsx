import { ProductGrid } from "./components/product-grid";

export function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and filter products from the store.
        </p>
      </div>
      <ProductGrid />
    </div>
  )
}
