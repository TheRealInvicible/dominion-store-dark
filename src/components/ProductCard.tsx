
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          {product.category === "sale" && (
            <div className="absolute top-2 left-2 bg-brand text-white px-2 py-1 text-xs font-bold rounded">
              SALE
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block group">
          <h3 className="font-medium truncate group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-brand hover:text-white border-brand"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
