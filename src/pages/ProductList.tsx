
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, FilterX, ArrowUpDown } from "lucide-react";

// Mock products data - in a real app, you would fetch this from an API
import { Product } from "@/context/CartContext";

const allProducts: Product[] = [
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
  },
  // Add more products as needed
  {
    id: "prod-9",
    name: "Baby Bottle Set",
    price: 29.99,
    image: "/placeholder.svg",
    category: "care",
    description: "Anti-colic baby bottles for comfortable feeding."
  },
  {
    id: "prod-10",
    name: "Baby Onesie 3-Pack",
    price: 19.99,
    image: "/placeholder.svg",
    category: "clothing",
    description: "Set of three soft cotton onesies in different colors."
  },
  {
    id: "prod-11",
    name: "Baby Car Seat",
    price: 119.99,
    image: "/placeholder.svg",
    category: "gear",
    description: "Safety-rated car seat with extra padding for comfort."
  },
  {
    id: "prod-12",
    name: "Maternity Dress",
    price: 39.99,
    image: "/placeholder.svg",
    category: "maternity",
    description: "Comfortable and stylish dress designed for expectant mothers."
  }
];

const brands = ["All Brands", "Mothercare", "Pampers", "Chicco", "Fisher-Price", "Medela"];
const priceRanges = ["All Prices", "$0-$25", "$25-$50", "$50-$100", "$100-$200", "$200+"];
const ages = ["All Ages", "Newborn", "0-3 months", "3-6 months", "6-12 months", "1-2 years", "2+ years"];
const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Name: A to Z", "Name: Z to A"];

const ProductList = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("Default");
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on category param and other filters
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Filter by category
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter(
        product => product.category === category
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (sortOrder !== "Default") {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOrder) {
          case "Price: Low to High":
            return a.price - b.price;
          case "Price: High to Low":
            return b.price - a.price;
          case "Name: A to Z":
            return a.name.localeCompare(b.name);
          case "Name: Z to A":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }
    
    setProducts(filteredProducts);
  }, [category, searchTerm, selectedBrands, selectedPriceRange, selectedAges, sortOrder]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setSelectedPriceRange("All Prices");
    setSelectedAges([]);
    setSortOrder("Default");
  };

  const categoryTitle = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}` 
    : "All Products";

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile filters button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full flex justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters</span>
          <FilterX className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter sidebar */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64 space-y-6`}>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Accordion type="multiple" className="w-full">
          {/* Brand filter */}
          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.slice(1).map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                    />
                    <Label htmlFor={brand}>{brand}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price range filter */}
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <Select 
                value={selectedPriceRange}
                onValueChange={setSelectedPriceRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          {/* Age range filter */}
          <AccordionItem value="age">
            <AccordionTrigger>Age Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {ages.slice(1).map((age) => (
                  <div key={age} className="flex items-center space-x-2">
                    <Checkbox 
                      id={age}
                      checked={selectedAges.includes(age)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAges([...selectedAges, age]);
                        } else {
                          setSelectedAges(selectedAges.filter(a => a !== age));
                        }
                      }}
                    />
                    <Label htmlFor={age}>{age}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>

      {/* Products area */}
      <div className="flex-1">
        {/* Category header and sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">{categoryTitle}</h1>
          
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try changing your filters or search term
            </p>
            <Button variant="default" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
