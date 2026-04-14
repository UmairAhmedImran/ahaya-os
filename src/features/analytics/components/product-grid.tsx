import { useEffect, useState } from "react"

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

export function ProductGrid() {
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = localStorage.getItem("products")

    if (cached) {
      setData(JSON.parse(cached))
      setLoading(false)
      return
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products")
        return res.json()
      })
      .then((products: Product[]) => {
        setData(products)
        localStorage.setItem("products", JSON.stringify(products)) // cache
      })
      .catch((err) => {
        console.error(err)
        setError("Something went wrong while fetching products.")
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading products...</p>
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>
  }

  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-4"
            />

            <h2 className="text-sm font-semibold line-clamp-2 mb-2">
              {product.title}
            </h2>

            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-black">
                ${product.price}
              </span>

              <span className="text-xs text-yellow-600 font-medium">
                ⭐ {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
