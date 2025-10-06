"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

type CartItem = {
  id: string
  product_id: string
  products: {
    id: string
    title: string
    description: string
    price: number
    category: string
    condition: string
    image_url: string | null
    seller_id: string
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from("cart")
      .select(
        `
        id,
        product_id,
        products (
          id,
          title,
          description,
          price,
          category,
          condition,
          image_url,
          seller_id
        )
      `,
      )
      .eq("user_id", user.id)

    if (!error && data) {
      setCartItems(data as CartItem[])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleRemove = async (cartItemId: string) => {
    const { error } = await supabase.from("cart").delete().eq("id", cartItemId)

    if (!error) {
      setCartItems(cartItems.filter((item) => item.id !== cartItemId))
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.products.price, 0)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">Start shopping to add items to your cart</p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {item.products.image_url ? (
                          <img
                            src={item.products.image_url || "/placeholder.svg"}
                            alt={item.products.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold">{item.products.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.products.description}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{item.products.category}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{item.products.condition}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <span className="text-lg font-bold text-primary">${item.products.price.toFixed(2)}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                  <div className="space-y-2 border-b border-border pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items ({cartItems.length})</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Button className="mt-6 w-full" size="lg">
                    Proceed to Checkout
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Contact sellers directly to arrange payment and pickup
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
