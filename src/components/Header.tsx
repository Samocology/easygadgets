import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User, Smartphone, Laptop, Headphones, Watch, Gamepad2, Zap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  cartCount?: number;
  onSearchChange?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

export const Header = ({ cartCount = 0, onSearchChange, onCategorySelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const categories = [
    { name: "Smartphones", icon: Smartphone },
    { name: "Laptops", icon: Laptop }, 
    { name: "Headphones", icon: Headphones },
    { name: "Accessories", icon: Zap },
    { name: "Smart Watches", icon: Watch },
    { name: "Gaming", icon: Gamepad2 }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b hidden md:block">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => navigate('/')}
              role="button"
              aria-label="Easy Gadgets Home"
            >
              <img
                src={logo}
                alt="Easy Gadgets"
                className="h-10 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Search bar */}
            <div className="flex flex-1 max-w-md mx-8">
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
                onClick={handleProfileClick}
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
          <nav className="flex items-center space-x-8 py-3 border-t">
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
        </div>
      </header>

      {/* Mobile Header - Minimal Top Bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
              role="button"
              aria-label="Easy Gadgets Home"
            >
              <img
                src={logo}
                alt="Easy Gadgets"
                className="h-8 w-auto"
              />
            </div>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
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
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-t md:hidden">
        <div className="grid grid-cols-5 h-16">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors">
                <Menu className="h-5 w-5" />
                <span className="text-xs font-medium">Categories</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 mb-2" 
              align="center"
              side="top"
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <DropdownMenuItem
                    key={category.name}
                    className="flex items-center space-x-3 py-3 cursor-pointer"
                    onClick={() => onCategorySelect?.(category.name)}
                  >
                    <IconComponent className="h-4 w-4 text-primary" />
                    <span className="font-medium">{category.name}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
                <span className="text-xs font-medium">Search</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-72 mb-2" 
              align="center"
              side="top"
            >
              <div className="p-3">
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
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => navigate('/cart')}
            className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs font-medium">Cart</span>
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-1 right-3 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                {cartCount}
              </Badge>
            )}
          </button>

          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Account</span>
          </button>
        </div>
      </nav>

    </>
  );
};