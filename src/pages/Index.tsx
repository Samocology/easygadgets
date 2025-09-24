import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";

const Index = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    // Category selection will be handled in ProductGrid
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={totalItems} 
        onSearchChange={handleSearchChange}
        onCategorySelect={handleCategorySelect}
      />
      <main>
        <Hero />
        <ProductGrid 
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
