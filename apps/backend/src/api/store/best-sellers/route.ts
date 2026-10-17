import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "items.product_id", "items.quantity"],
    pagination: { skip: 0, take: 100 },
  })

  const salesMap = new Map<string, number>()
  for (const order of orders) {
    for (const item of order.items ?? []) {
      if (!item) continue
      if (!item.product_id) continue
      salesMap.set(item.product_id, (salesMap.get(item.product_id) ?? 0) + Number(item.quantity ?? 0))
    }
  }

  const ranked = Array.from(salesMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)

  if (ranked.length === 0) {
    return res.json({ best_sellers: [] })
  }

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "thumbnail", "handle"],
    filters: { id: ranked.map(([id]) => id) },
  })

  const productMap = new Map(products.map((p: any) => [p.id, p]))

  const bestSellers = ranked.map(([id, quantity]) => {
    const p = productMap.get(id)
    return {
      product_id: id,
      title: p?.title ?? "Unknown",
      thumbnail: p?.thumbnail ?? null,
      handle: p?.handle ?? "",
      units_sold: quantity,
    }
  })

  res.json({ best_sellers: bestSellers })
}
