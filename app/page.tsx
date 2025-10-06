import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Package, ShoppingBag, Users, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
              Buy & Sell Pre-Loved Items
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Join our sustainable marketplace for students and young professionals. Find great deals on books,
              electronics, stationery, and more.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/upload">Sell Your Items</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose ThriftHub?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">Easy to Use</h3>
                  <p className="text-sm text-muted-foreground">
                    Simple interface to browse, buy, and sell items in minutes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-secondary/10 p-3">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="mb-2 font-semibold">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with fellow students and professionals in your area
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-accent/20 p-3">
                    <Sparkles className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold">Sustainable</h3>
                  <p className="text-sm text-muted-foreground">Give items a second life and reduce waste together</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">Great Deals</h3>
                  <p className="text-sm text-muted-foreground">Find quality items at affordable prices every day</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">Shop by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {["Books", "Electronics", "Stationery", "Accessories", "Others"].map((category) => (
              <Link key={category} href={`/products?category=${category}`}>
                <Card className="transition-all hover:shadow-lg">
                  <CardContent className="flex h-32 items-center justify-center p-6">
                    <h3 className="text-xl font-semibold">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-balance">Ready to Start?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of users buying and selling on ThriftHub
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/auth/sign-up">Create Your Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ThriftHub. Built with sustainability in mind.</p>
        </div>
      </footer>
    </div>
  )
}
