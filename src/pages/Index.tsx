
import React from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="w-full">
      {/* Hero Banner - Sleep Section */}
      <section className="w-full">
        <div className="relative">
          <img 
            src="/placeholder.svg"
            alt="Sleep products for babies"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col justify-center pl-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 mb-4">sleep</h1>
            <Link to="/products/sleep">
              <Button className="bg-green-700 hover:bg-green-800">Shop Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="container mx-auto py-8">
        <h2 className="text-xl font-semibold mb-6">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Beautiful gifts made easy */}
          <div className="relative overflow-hidden rounded-lg">
            <AspectRatio ratio={4/3}>
              <img 
                src="/placeholder.svg" 
                alt="Beautiful gifts made easy"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/50 to-transparent">
              <h3 className="text-white text-lg font-semibold">Beautiful gifts made easy</h3>
              <Link to="/products/gifts">
                <Button variant="outline" size="sm" className="mt-2 bg-white hover:bg-gray-100">Shop Now</Button>
              </Link>
            </div>
          </div>
          
          {/* Home & travel essentials */}
          <div className="relative overflow-hidden rounded-lg">
            <AspectRatio ratio={4/3}>
              <img 
                src="/placeholder.svg" 
                alt="Home & travel essentials"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/50 to-transparent">
              <h3 className="text-white text-lg font-semibold">Home & travel essentials</h3>
              <Link to="/products/travel">
                <Button variant="outline" size="sm" className="mt-2 bg-white hover:bg-gray-100">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid - Featured Products */}
      <section className="container mx-auto py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <AspectRatio ratio={1/1}>
                <img 
                  src="/placeholder.svg" 
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="p-2">
                <h3 className="text-sm font-medium truncate">Product Name</h3>
                <p className="text-sm text-muted-foreground">₹499</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Baby Care Section */}
      <section className="container mx-auto py-8">
        <h2 className="text-xl font-semibold mb-6">Baby Care</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <AspectRatio ratio={1/1}>
                <img 
                  src="/placeholder.svg" 
                  alt={`Baby Care Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="p-2">
                <h3 className="text-sm font-medium truncate">Baby Care Item</h3>
                <Link to={`/products/care/${index + 1}`} className="text-xs text-blue-600 hover:underline">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Brand */}
      <section className="container mx-auto py-8">
        <h2 className="text-xl font-semibold mb-6">Shop By Brand</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="/placeholder.svg" 
                  alt={`Brand ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* First promo banner */}
          <div className="relative overflow-hidden rounded-lg bg-green-100">
            <AspectRatio ratio={16/6}>
              <div className="w-full h-full flex items-center p-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-800">Keeping baby safe & secure</h3>
                  <Button variant="outline" size="sm" className="mt-2 border-green-800 text-green-800 hover:bg-green-50">
                    Shop Now
                  </Button>
                </div>
              </div>
            </AspectRatio>
          </div>
          
          {/* Second promo banner */}
          <div className="relative overflow-hidden rounded-lg bg-blue-100">
            <AspectRatio ratio={16/6}>
              <div className="w-full h-full flex items-center p-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">The perfect gift</h3>
                  <Button variant="outline" size="sm" className="mt-2 border-blue-800 text-blue-800 hover:bg-blue-50">
                    Shop Now
                  </Button>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
        
        {/* Additional single wide banner */}
        <div className="relative overflow-hidden rounded-lg bg-orange-100 mb-8">
          <AspectRatio ratio={21/6}>
            <div className="w-full h-full flex items-center p-6">
              <div>
                <h3 className="text-xl font-semibold text-orange-800">Feeding essentials for your little one</h3>
                <Button variant="outline" size="sm" className="mt-2 border-orange-800 text-orange-800 hover:bg-orange-50">
                  Shop Now
                </Button>
              </div>
            </div>
          </AspectRatio>
        </div>
      </section>
    </div>
  );
};

export default Index;
