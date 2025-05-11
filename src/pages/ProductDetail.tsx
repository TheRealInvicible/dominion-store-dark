
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  Truck,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock product data
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
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Find the product by id - in a real app, fetch from API
  const product = allProducts.find(p => p.id === id) || {
    id: "not-found",
    name: "Product Not Found",
    price: 0,
    image: "/placeholder.svg",
    category: "",
    description: "This product could not be found."
  };

  // Mock related products - in a real app, fetch from API based on category or tags
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  // Mock multiple product images
  const productImages = [
    product.image,
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav className="flex mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-foreground">Home</Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <Link to={`/products/${product.category}`} className="hover:text-foreground">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li className="text-foreground font-medium truncate">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
            <img
              src={productImages[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`aspect-square overflow-hidden rounded-md ${
                  activeImage === index ? "ring-2 ring-brand" : "opacity-70"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < 4 ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-muted-foreground"}`}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.0 (24 reviews)</span>
            </div>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          </div>

          <div className="border-t border-b py-4">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            {/* Quantity selector */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center w-32">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="h-10 w-10 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-10 w-10 rounded-l-none"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Add to cart and wishlist buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 gap-2" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shipping and returns info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-10 w-10 p-2 rounded-full bg-secondary text-brand" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over ₦599</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-10 w-10 p-2 rounded-full bg-secondary text-brand" />
              <div>
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-10 w-10 p-2 rounded-full bg-secondary text-brand" />
              <div>
                <p className="text-sm font-medium">30 Days Return</p>
                <p className="text-xs text-muted-foreground">30 days money back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs: Description, Additional Info, Reviews */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="space-y-4">
          <h3 className="text-xl font-medium">Product Description</h3>
          <p>
            This premium quality product is designed with your baby's comfort and safety in mind. 
            Made from high-quality materials, it provides lasting durability and a superior experience.
          </p>
          <p>
            Our products meet the strictest safety standards and are thoroughly tested to ensure they're
            safe for your child. We prioritize non-toxic materials and eco-friendly manufacturing practices.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Premium quality materials</li>
            <li>Safety certified and tested</li>
            <li>Durable and long-lasting</li>
            <li>Easy to clean and maintain</li>
            <li>Stylish design</li>
          </ul>
        </TabsContent>
        <TabsContent value="additional" className="space-y-4">
          <h3 className="text-xl font-medium">Additional Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Dimensions</h4>
              <p className="text-muted-foreground">10 × 15 × 2 cm</p>
            </div>
            <div>
              <h4 className="font-medium">Weight</h4>
              <p className="text-muted-foreground">200g</p>
            </div>
            <div>
              <h4 className="font-medium">Materials</h4>
              <p className="text-muted-foreground">100% Organic Cotton</p>
            </div>
            <div>
              <h4 className="font-medium">Age Range</h4>
              <p className="text-muted-foreground">0-12 months</p>
            </div>
            <div>
              <h4 className="font-medium">Care Instructions</h4>
              <p className="text-muted-foreground">Machine washable at 30°C</p>
            </div>
            <div>
              <h4 className="font-medium">Country of Origin</h4>
              <p className="text-muted-foreground">Nigeria</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Customer Reviews (24)</h3>
            <Button variant="outline">Write a Review</Button>
          </div>
          
          {/* Sample reviews */}
          <div className="space-y-6">
            <div className="pb-6 border-b">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">Amazing product!</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">May 12, 2025</span>
              </div>
              <p className="text-sm">
                This product exceeded my expectations! The quality is excellent and my baby loves it. 
                Will definitely purchase again.
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Sarah M.</span> - Verified Purchaser
              </div>
            </div>
            
            <div className="pb-6 border-b">
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">Good value for money</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < 4 ? "currentColor" : "none"}
                        stroke={i < 4 ? "" : "currentColor"}
                        strokeWidth={i < 4 ? "0" : "2"}
                        className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-muted-foreground"}`}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">April 28, 2025</span>
              </div>
              <p className="text-sm">
                The product is good quality and reasonably priced. Delivery was fast and the product
                was as described. Would recommend.
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">David K.</span> - Verified Purchaser
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="product-grid">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
