import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite?: boolean;
}

export const ProductCard = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  category,
  isNew = false,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop';
  };

  return (
    <Card className="product-card border-0 shadow-card gradient-card overflow-hidden group cursor-pointer">
      <CardContent className="p-0">
        <div onClick={() => navigate(`/product/${id}`)}>
          {/* Image container */}
          <div className="relative overflow-hidden">
                        <img
              src={image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'}
              alt={name}
              onError={handleImageError}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isNew && (
                <Badge className="gradient-primary text-primary-foreground border-0">
                  New
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Favorite button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-background/80 hover:bg-background transition-smooth"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(id);
              }}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                }`} 
              />
            </Button>

            {/* Quick add overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                size="sm"
                className="btn-glow gradient-primary text-primary-foreground border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(id);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          {/* Product info */}
          <div className="p-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {brand} • {category}
              </p>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewCount})
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ₦{price.toLocaleString('en-NG')}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₦{originalPrice.toLocaleString('en-NG')}
                    </span>
                  )}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 transition-smooth hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(id);
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};