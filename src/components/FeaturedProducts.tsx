
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/context/CartContext";

// Mock featured products data
const featuredProducts: Product[] = [
  {
    id: "prod-1",
    name: "Organic Cotton Baby Romper",
    price: 24.99,
    image: "/placeholder.svg",
    category: "clothing",
    description: "Soft and breathable organic cotton romper for your baby's comfort."
  },
  {
    id: "prod-2",
    name: "Baby Bath Set",
    price: 34.99,
    image: "/placeholder.svg",
    category: "care",
    description: "Complete bath set with gentle baby soap, shampoo, and lotion."
  },
  {
    id: "prod-3",
    name: "Adjustable Baby Stroller",
    price: 149.99,
    image: "/placeholder.svg",
    category: "gear",
    description: "Lightweight and adjustable stroller for comfortable outings."
  },
  {
    id: "prod-4",
    name: "Maternity Support Belt",
    price: 29.99,
    image: "/placeholder.svg",
    category: "maternity",
    description: "Comfortable support belt for expectant mothers."
  },
  {
    id: "prod-5",
    name: "Baby Sleep Sack",
    price: 19.99,
    image: "/placeholder.svg",
    category: "sale",
    description: "Cozy sleep sack to keep your baby warm and comfortable during sleep."
  },
  {
    id: "prod-6",
    name: "Teething Toys Set",
    price: 15.99,
    image: "/placeholder.svg",
    category: "care",
    description: "Safe and colorful teething toys to soothe your baby's gums."
  },
  {
    id: "prod-7",
    name: "Baby Monitor",
    price: 79.99,
    image: "/placeholder.svg", 
    category: "gear",
    description: "High-definition video monitor with night vision and two-way audio."
  },
  {
    id: "prod-8",
    name: "Nursing Cover",
    price: 22.99,
    image: "/placeholder.svg",
    category: "maternity",
    description: "Breathable and stylish nursing cover for privacy while breastfeeding."
  }
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredProducts = activeTab === "all" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeTab);
  
  const tabs = [
    { id: "all", label: "All Products" },
    { id: "clothing", label: "Clothing" },
    { id: "care", label: "Baby Care" },
    { id: "gear", label: "Baby Gear" },
    { id: "maternity", label: "Maternity" },
    { id: "sale", label: "On Sale" }
  ];
  
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
        <Link 
          to="/products" 
          className="text-brand flex items-center hover:underline"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      {/* Category tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2 scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-brand text-white font-medium"
                : "bg-secondary hover:bg-secondary/80"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
