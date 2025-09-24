import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductListCard } from "./ProductListCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts, Product } from "@/data/mockProducts";
import { useCart } from "@/hooks/useCart";
import { Filter, Grid, List } from "lucide-react";

interface ProductGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export const ProductGrid = ({ searchQuery = "", selectedCategory: propSelectedCategory = "All" }: ProductGridProps) => {
  const [products] = useState<Product[]>(mockProducts);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { addToCart } = useCart();

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = propSelectedCategory === "All" || product.category === propSelectedCategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 8);
  };

  const handleAddToCart = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand
      });
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-primary bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium electronics from top brands
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={propSelectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {}} // Removed local state management
                className={propSelectedCategory === category ? "gradient-primary text-primary-foreground border-0" : ""}
                disabled
              >
                {category}
                {category !== "All" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {products.filter(p => p.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="transition-smooth"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {displayedProducts.map((product) => (
            viewMode === "grid" ? (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            ) : (
              <ProductListCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                description={product.description}
                features={product.features}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            )
          ))}
        </div>

        {/* Load More */}
        {visibleProducts < filteredProducts.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="transition-smooth hover:bg-primary hover:text-primary-foreground"
              onClick={loadMoreProducts}
            >
              Load More Products ({filteredProducts.length - visibleProducts} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};