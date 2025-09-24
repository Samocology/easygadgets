import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductListCardProps {
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
  description: string;
  features: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite?: boolean;
}

export const ProductListCard = ({
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
  description,
  features,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductListCardProps) => {
  const navigate = useNavigate();
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="product-card border-0 shadow-card gradient-card overflow-hidden group cursor-pointer">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row" onClick={() => navigate(`/product/${id}`)}>
          {/* Image container */}
          <div className="relative sm:w-64 h-48 sm:h-auto overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          </div>

          {/* Product info */}
          <div className="flex-1 p-6 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {brand} • {category}
              </p>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-muted-foreground mt-2 line-clamp-2">
                {description}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
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
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            {/* Pricing and Actions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ₦{price.toLocaleString('en-NG')}
                  </span>
                  {originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₦{originalPrice.toLocaleString('en-NG')}
                    </span>
                  )}
                </div>
              </div>
              
              <Button
                className="btn-glow gradient-primary text-primary-foreground border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(id);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};