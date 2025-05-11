
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-lg shadow-lg mb-12">
      <div className="bg-gradient-to-r from-brand/40 to-brand/60 dark:from-brand/50 dark:to-brand/80">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Baby Deserves The Best
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Discover premium baby products for your little one. From clothing to care essentials, we've got everything you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full font-medium" asChild>
                  <Link to="/products/clothing">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full font-medium">
                  <Link to="/products/sale">View Sales</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center">
                  <span className="bg-white dark:bg-white/90 text-black rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium ml-2">Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-white dark:bg-white/90 text-black rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium ml-2">30 Days Return</span>
                </div>
              </div>
            </div>
            <div className="lg:flex hidden justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand to-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Baby products" 
                  className="relative rounded-2xl shadow-2xl max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
