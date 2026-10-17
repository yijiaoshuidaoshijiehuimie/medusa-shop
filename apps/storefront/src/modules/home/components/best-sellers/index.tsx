export default async function BestSellers({ region }: { region: any }) {
  const backendUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const publishableKey =
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ||
    "pk_a925084be8a4e102a382a56d9a10d4b7044db64d572e67d877b7d683672b665d"

  const res = await fetch(`${backendUrl}/store/best-sellers`, {
    headers: { "x-publishable-api-key": publishableKey },
    cache: "no-store",
  })

  if (!res.ok) return null

  const { best_sellers } = await res.json()
  if (!best_sellers || best_sellers.length === 0) return null

  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🔥 Best Sellers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {best_sellers.map((item: any) => (
          <div
            key={item.product_id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover mb-3 rounded"
              />
            )}
            <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
            <p className="text-red-500 text-sm mt-2 font-semibold">
              Sold: {item.units_sold} units
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
