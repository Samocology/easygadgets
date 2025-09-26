import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User, Smartphone, Laptop, Headphones, Watch, Gamepad2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  cartCount?: number;
  onSearchChange?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

export const Header = ({ cartCount = 0, onSearchChange, onCategorySelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const categories = [
    { name: "Smartphones", icon: Smartphone },
    { name: "Laptops", icon: Laptop }, 
    { name: "Headphones", icon: Headphones },
    { name: "Accessories", icon: Zap },
    { name: "Smart Watches", icon: Watch },
    { name: "Gaming", icon: Gamepad2 }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => navigate('/auth')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative btn-glow"
              onClick={() => navigate('/cart')}
            >
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
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                className="nav-link flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => onCategorySelect?.(category.name)}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile menu dropdown */}
        <div className="md:hidden">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden shadow-elevated"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 ml-4 mt-2" 
              align="start"
              sideOffset={8}
            >
              {/* Mobile search */}
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      onSearchChange?.(e.target.value);
                    }}
                    className="pl-10 h-9"
                  />
                </div>
              </div>
              
              {/* Categories */}
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <DropdownMenuItem
                    key={category.name}
                    className="flex items-center space-x-3 py-3 cursor-pointer"
                    onClick={() => {
                      onCategorySelect?.(category.name);
                      setIsMenuOpen(false);
                    }}
                  >
                    <IconComponent className="h-4 w-4 text-primary" />
                    <span className="font-medium">{category.name}</span>
                  </DropdownMenuItem>
                );
              })}
              
              <DropdownMenuSeparator />
              
              {/* Account */}
              <DropdownMenuItem
                className="flex items-center space-x-3 py-3 cursor-pointer"
                onClick={() => {
                  navigate('/auth');
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">Account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};