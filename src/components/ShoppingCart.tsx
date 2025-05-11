
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";

export function ShoppingCart() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen, 
    clearCart 
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-card shadow-xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-medium">Your Cart ({totalItems})</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button 
                  variant="default" 
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t bg-card shadow-inner">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium">
                  {totalPrice >= 599 ? "Free" : "$50.00"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span>
                  ${(totalPrice + (totalPrice >= 599 ? 0 : 50)).toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button 
                  variant="default"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
