import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";

const Index = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalItems} />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
