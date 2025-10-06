"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Trash2, Package, User } from "lucide-react"
import Link from "next/link"
import { EditProductDialog } from "@/components/edit-product-dialog"

type Product = {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  image_url: string | null
  status: string
  created_at: string
}

type Profile = {
  email: string
  full_name: string | null
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const supabase = createClient()

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // Fetch profile
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (profileData) {
      setProfile(profileData)
    }

    // Fetch user's products
    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false })

    if (productsData) {
      setProducts(productsData)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (!error) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  const handleEditComplete = () => {
    setEditingProduct(null)
    fetchData()
  }

  const availableProducts = products.filter((p) => p.status === "available")
  const soldProducts = products.filter((p) => p.status === "sold")

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">My Dashboard</h1>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{profile?.full_name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                  <div className="pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{availableProducts.length}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-muted-foreground">{soldProducts.length}</p>
                        <p className="text-xs text-muted-foreground">Sold</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Section */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    My Listings
                  </CardTitle>
                  <Button asChild>
                    <Link href="/upload">Add New Item</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="available">
                    <TabsList className="mb-4">
                      <TabsTrigger value="available">Available ({availableProducts.length})</TabsTrigger>
                      <TabsTrigger value="sold">Sold ({soldProducts.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="available" className="space-y-4">
                      {availableProducts.length === 0 ? (
                        <div className="py-8 text-center text-muted-foreground">
                          <p>No active listings</p>
                          <Button asChild className="mt-4 bg-transparent" variant="outline">
                            <Link href="/upload">List Your First Item</Link>
                          </Button>
                        </div>
                      ) : (
                        availableProducts.map((product) => (
                          <Card key={product.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                  {product.image_url ? (
                                    <img
                                      src={product.image_url || "/placeholder.svg"}
                                      alt={product.title}
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
                                    <div className="flex items-start justify-between gap-2">
                                      <h3 className="font-semibold">{product.title}</h3>
                                      <Badge variant="secondary">{product.category}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                                    <span className="text-xs text-muted-foreground">{product.condition}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <Button variant="outline" size="icon" onClick={() => setEditingProduct(product)}>
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </TabsContent>

                    <TabsContent value="sold" className="space-y-4">
                      {soldProducts.length === 0 ? (
                        <div className="py-8 text-center text-muted-foreground">No sold items yet</div>
                      ) : (
                        soldProducts.map((product) => (
                          <Card key={product.id} className="opacity-60">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                                  {product.image_url ? (
                                    <img
                                      src={product.image_url || "/placeholder.svg"}
                                      alt={product.title}
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
                                    <div className="flex items-start justify-between gap-2">
                                      <h3 className="font-semibold">{product.title}</h3>
                                      <Badge>Sold</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                  </div>
                                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {editingProduct && <EditProductDialog product={editingProduct} onClose={handleEditComplete} />}
    </div>
  )
}
