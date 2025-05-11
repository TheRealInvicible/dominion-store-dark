
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast({
      description: `${productName} removed from your cart.`,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet.
            Browse our products and find something you'll love!
          </p>
          <Button asChild>
            <Link to="/products/clothing">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Product</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell>
                        <div className="w-20 h-20 overflow-hidden rounded-md bg-secondary">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>${item.product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 w-10 flex items-center justify-center border-y">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline" asChild>
                <Link to="/products/clothing">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 pb-4 border-b">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{totalPrice >= 599 ? "Free" : "$50.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.07).toFixed(2)}</span>
                </div>

                <div className="my-4 pt-4 border-t border-dashed">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${(totalPrice + (totalPrice >= 599 ? 0 : 50) + totalPrice * 0.07).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {totalPrice < 599 && (
                <div className="mt-4 p-3 bg-secondary rounded-md text-center">
                  <p className="text-sm font-medium">
                    Add ${(599 - totalPrice).toFixed(2)} more to qualify for free shipping!
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">We Accept</h3>
                <div className="flex gap-2">
                  <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                    Visa
                  </div>
                  <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                    MC
                  </div>
                  <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                    Amex
                  </div>
                  <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                    PayPal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
