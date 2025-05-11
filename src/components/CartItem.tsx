
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/context/CartContext";

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 p-2 border rounded-lg animate-fadeIn">
      {/* Product Image */}
      <div className="w-20 h-20 overflow-hidden rounded-md bg-secondary flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{product.name}</h4>
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-1 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-md"
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center text-sm">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-md"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-md ml-2"
            onClick={() => removeItem(product.id)}
            aria-label="Remove item"
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        </div>
      </div>
      
      {/* Total Price */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-bold">
          ${(product.price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
