import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-electronics.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 gradient-hero opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Latest Tech,
                <span className="gradient-primary bg-clip-text text-transparent block">
                  Best Prices
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover premium smartphones, laptops, and accessories from top brands. 
                Quality guaranteed with fast shipping.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-glow gradient-primary text-primary-foreground border-0">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="transition-smooth hover:bg-muted">
                View Deals
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">Same day shipping</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Warranty</p>
                  <p className="text-xs text-muted-foreground">2 year protection</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Truck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over $100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
            <img
              src={heroImage}
              alt="Latest Electronics"
              className="relative w-full h-auto rounded-2xl shadow-elevated product-card"
            />
          </div>
        </div>
      </div>
    </section>
  );
};