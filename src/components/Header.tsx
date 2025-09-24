import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartCount?: number;
  onSearchChange?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

export const Header = ({ cartCount = 0, onSearchChange, onCategorySelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Smartphones",
    "Laptops", 
    "Headphones",
    "Accessories",
    "Smart Watches",
    "Gaming"
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            <div className="gradient-primary bg-clip-text text-transparent">
              <h1 className="text-2xl font-bold">Easy Gadgets</h1>
            </div>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearchChange?.(e.target.value);
                }}
                className="pl-10 transition-smooth focus:shadow-glow"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative btn-glow">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t">
          {categories.map((category) => (
            <button
              key={category}
              className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => onCategorySelect?.(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            {/* Mobile search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearchChange?.(e.target.value);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Mobile navigation */}
            <nav className="py-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  onClick={() => {
                    onCategorySelect?.(category);
                    setIsMenuOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
              <div className="border-t mt-4 pt-4 px-4">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};