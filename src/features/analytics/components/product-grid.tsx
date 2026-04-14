import { useCallback, useEffect, useRef, useState } from "react"
import { AlertCircle, PackageSearch, RotateCcw, Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/use-debounce"

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const ITEMS_PER_PAGE = 8


function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ">
      <Skeleton className="mb-4 h-40 w-full rounded-lg" />
      <Skeleton className="mb-2 h-4 w-16 rounded-full" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="mb-3 h-4 w-3/4" />
      <Skeleton className="mb-1 h-3 w-full" />
      <Skeleton className="mb-4 h-3 w-5/6" />
      <div className="mt-auto flex items-center justify-between">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div>
      <div className="mb-6 space-y-3">
        <Skeleton className="h-10 w-full max-w-md rounded-lg" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}


type CategoryChipsProps = {
  categories: string[]
  selected: string | null
  onSelect: (cat: string | null) => void
}

function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(selected === cat ? null : cat)}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
        >
          {cat}
          {selected === cat && <X className="size-3" />}
        </button>
      ))}
    </div>
  )
}


type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </Button>
      <div className="flex flex-wrap gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className="w-9"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </Button>
    </div>
  )
}


export function ProductGrid() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSearch = useDebounce(searchQuery, 400)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchProducts = useCallback(() => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    const cached = localStorage.getItem("products")
    if (cached) {
      try {
        setAllProducts(JSON.parse(cached))
        setLoading(false)
        return
      } catch {
        localStorage.removeItem("products")
      }
    }

    fetch("https://fakestoreapi.com/products", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products")
        return res.json()
      })
      .then((products: Product[]) => {
        setAllProducts(products)
        localStorage.setItem("products", JSON.stringify(products))
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return
        console.error(err)
        setError("Could not load products. Please check your connection and try again.")
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchProducts()
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchProducts])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedCategory])

  const categories = Array.from(new Set(allProducts.map((p) => p.category)))

  const filteredProducts = allProducts.filter((product) => {
    const q = debouncedSearch.toLowerCase()
    const matchesSearch =
      q === "" ||
      product.title.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    const matchesCategory =
      selectedCategory === null || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const hasActiveFilters = debouncedSearch !== "" || selectedCategory !== null
  const rangeStart = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const rangeEnd = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)

  if (loading) return <ProductGridSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5 text-center px-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-8 text-destructive" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">Failed to load products</p>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">{error}</p>
        </div>
        <Button onClick={fetchProducts} variant="default" size="sm">
          <RotateCcw className="size-4" />
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9 pr-9"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <CategoryChips
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-5 text-center px-4">
          <div className="flex size-20 items-center justify-center rounded-full bg-muted">
            <PackageSearch className="size-10 text-muted-foreground" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              {hasActiveFilters
                ? "No results match your search or filters. Try adjusting them."
                : "No products are available right now."}
            </p>
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
            >
              <X className="size-4" />
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {rangeStart}–{rangeEnd} of {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>

          {/* Product grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition duration-300 hover:shadow-md "
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-4 h-40 w-full object-contain"
                  loading="lazy"
                />
                <Badge variant="outline" className="mb-2 w-fit capitalize">
                  {product.category}
                </Badge>
                <h2 className="mb-2 line-clamp-2 text-sm font-semibold">
                  {product.title}
                </h2>
                <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-yellow-600">
                    ⭐ {product.rating.rate}{" "}
                    <span className="text-muted-foreground">({product.rating.count})</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}
