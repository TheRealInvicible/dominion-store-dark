
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      
      {/* Promotions Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">On all orders above ₦599</p>
          </div>
          <div className="mt-4">
            <a href="/shipping" className="text-sm underline text-green-700 dark:text-green-400">Learn more</a>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-6 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-xl font-bold mb-2">30 Day Returns</h3>
            <p className="text-muted-foreground">Shop with confidence</p>
          </div>
          <div className="mt-4">
            <a href="/returns" className="text-sm underline text-blue-700 dark:text-blue-400">Return policy</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
