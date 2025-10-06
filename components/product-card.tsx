"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Product = {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  image_url: string | null
  seller_id: string
}

export function ProductCard({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsAdding(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    const { error } = await supabase.from("cart").insert({
      user_id: user.id,
      product_id: product.id,
    })

    if (error) {
      if (error.code === "23505") {
        alert("Item already in cart")
      } else {
        alert("Failed to add to cart")
      }
    } else {
      alert("Added to cart!")
    }
    setIsAdding(false)
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        {product.image_url ? (
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>

      <CardContent className="flex-1 p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold">{product.title}</h3>
          <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge>
        </div>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">{product.condition}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart} disabled={isAdding}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
