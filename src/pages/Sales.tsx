import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "@/api/productsApi";
import { Product } from "@/data/products";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Phone, 
  MessageCircle,
  Grid,
  List,
  SlidersHorizontal,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Products" },
  { id: "laptops", name: "Laptops" },
  { id: "monitors", name: "Monitors" },
  { id: "cpu", name: "CPU" },
  { id: "graphics-card", name: "Graphics Card" },
  { id: "motherboard", name: "Motherboard" },
  { id: "keyboard", name: "Keyboard" },
  { id: "mouse", name: "Mouse" },
  { id: "accessories", name: "Accessories" },
  { id: "components", name: "Components" },
  { id: "networking", name: "Networking" },
  { id: "printers", name: "Printers" },
];

const Sales = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await getProducts();
    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Computer Sales
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Browse our wide selection of quality computers, laptops, and accessories.
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2.5 transition-colors", viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary")}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2.5 transition-colors", viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">Showing {sortedProducts.length} products</p>

          <div className={cn(viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4")}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "group bg-card rounded-xl border border-border overflow-hidden hover:shadow-card hover:border-primary/20 transition-all duration-300",
                  viewMode === "list" && "flex"
                )}
              >
                <div className={cn("relative bg-secondary overflow-hidden", viewMode === "grid" ? "aspect-square" : "w-48 shrink-0")}>
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" />
                  </Link>
                  {product.badge && (
                    <Badge className={cn("absolute top-3 left-3", product.badge === "Sale" ? "bg-destructive" : product.badge === "Gaming" ? "bg-purple-600" : "bg-primary")}>
                      {product.badge}
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <span className="bg-background px-4 py-2 rounded-lg font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className={cn("p-4 flex-1", viewMode === "list" && "flex flex-col justify-between")}>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                    <h3 className={cn("font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors", viewMode === "grid" ? "line-clamp-2" : "line-clamp-1")}>
                      <Link to={`/product/${product.id}`} className="hover:underline">{product.name}</Link>
                    </h3>

                    {viewMode === "list" && product.specs && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.specs.map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">{spec}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-display font-bold text-lg text-foreground">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gradient-primary" disabled={!product.inStock} asChild>
                      <a href="tel:+919876543210"><Phone className="h-4 w-4 mr-1" />Call</a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" disabled={!product.inStock} asChild>
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 mr-1" />WhatsApp</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Sales;
