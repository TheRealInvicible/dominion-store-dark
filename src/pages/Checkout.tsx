
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(isAuthenticated ? 1 : 0);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
    phone: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    saveInfo: true,
  });
  
  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    try {
      // In a real app, this would be an API call to process the payment and create the order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order has been received.",
      });
      
      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          You don't have any items in your cart to checkout.
        </p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Checkout Form */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="text-sm flex space-x-2">
            <div className={`flex items-center ${step >= 0 ? "text-brand" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 0 ? "bg-brand border-brand text-white" : "border-muted-foreground"}`}>
                {step > 0 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <span className="ml-2 hidden sm:inline">Account</span>
            </div>
            <div className="w-8 h-[2px] bg-muted self-center"></div>
            <div className={`flex items-center ${step >= 1 ? "text-brand" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? "bg-brand border-brand text-white" : "border-muted-foreground"}`}>
                {step > 1 ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <span className="ml-2 hidden sm:inline">Shipping</span>
            </div>
            <div className="w-8 h-[2px] bg-muted self-center"></div>
            <div className={`flex items-center ${step >= 2 ? "text-brand" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? "bg-brand border-brand text-white" : "border-muted-foreground"}`}>
                3
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Step 0: Login/Register for guest users */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Account</h2>
              <p className="mb-4">Please sign in to continue with your purchase.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/login" state={{ returnUrl: "/checkout" }}>Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/register" state={{ returnUrl: "/checkout" }}>Create Account</Link>
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="ghost" 
                  className="text-sm" 
                  onClick={() => setStep(1)}
                >
                  Continue as Guest
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Information */}
        {step === 1 && (
          <form onSubmit={handleContinueToPayment} className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={updateFormData}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={updateFormData}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={updateFormData}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={updateFormData}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={updateFormData}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={updateFormData}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={updateFormData}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={updateFormData}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={formData.country} 
                    onValueChange={(value) => handleSelectChange("country", value)}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="South Africa">South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={updateFormData}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Return to Cart
              </Button>
              <Button type="submit">Continue to Payment</Button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Information */}
        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className={`flex items-center border rounded-md p-4 ${paymentMethod === 'credit-card' ? 'border-brand' : 'border-muted'}`}>
                  <RadioGroupItem value="credit-card" id="credit-card" className="mr-3" />
                  <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 mr-3" />
                    Credit / Debit Card
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                      Visa
                    </div>
                    <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                      MC
                    </div>
                    <div className="h-8 w-12 bg-card border rounded flex items-center justify-center text-xs font-medium">
                      Amex
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center border rounded-md p-4 ${paymentMethod === 'paypal' ? 'border-brand' : 'border-muted'}`}>
                  <RadioGroupItem value="paypal" id="paypal" className="mr-3" />
                  <Label htmlFor="paypal" className="cursor-pointer flex-1">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-3 inline-block">
                      <path
                        fill="#00457C"
                        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.698.698 0 0 1 .691-.59h6.982c3.59 0 5.52 1.936 5.202 4.734-.432 3.718-3.6 5.70-7.25 5.7h-2.343c-.516 0-.868.34-.98.853l-.858 5.92zm8.261-17.48c-.257-.299-.66-.563-1.228-.831a7.281 7.281 0 0 0-2.03-.565 17.795 17.795 0 0 0-2.57-.16H4.977a1.077 1.077 0 0 0-1.066.91L.703 21.553a.768.768 0 0 0 .758.883h4.606l1.159-7.335a.928.928 0 0 1 .918-.769h1.017c4.157 0 7.402-1.693 8.342-6.582.366-1.89.007-3.378-1.166-4.393z"
                      />
                    </svg>
                    PayPal
                  </Label>
                </div>

                <div className={`flex items-center border rounded-md p-4 ${paymentMethod === 'pay-on-delivery' ? 'border-brand' : 'border-muted'}`}>
                  <RadioGroupItem value="pay-on-delivery" id="pay-on-delivery" className="mr-3" />
                  <Label htmlFor="pay-on-delivery" className="cursor-pointer">
                    Pay on Delivery
                  </Label>
                </div>
              </RadioGroup>
              
              {/* Credit Card Form */}
              {paymentMethod === 'credit-card' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={updateFormData}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="•••• •••• •••• ••••"
                      value={formData.cardNumber}
                      onChange={updateFormData}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Expiration Date (MM/YY)</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={updateFormData}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="•••"
                        value={formData.cardCvc}
                        onChange={updateFormData}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Instructions */}
              {paymentMethod === 'paypal' && (
                <div className="mt-6 p-4 bg-secondary rounded-md text-sm">
                  <p>You will be redirected to PayPal to complete your payment after placing your order.</p>
                </div>
              )}

              {/* Pay on Delivery Instructions */}
              {paymentMethod === 'pay-on-delivery' && (
                <div className="mt-6 p-4 bg-secondary rounded-md text-sm">
                  <p>You will pay for your order when it is delivered to your address. Additional fees may apply.</p>
                </div>
              )}
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Shipping Method</h2>
              <RadioGroup defaultValue="standard" className="space-y-4">
                <div className="flex items-center justify-between border rounded-md p-4 border-brand">
                  <div className="flex items-center">
                    <RadioGroupItem value="standard" id="standard" className="mr-3" />
                    <Label htmlFor="standard" className="cursor-pointer">Standard Shipping</Label>
                  </div>
                  <div>
                    {totalPrice >= 599 ? <span className="text-sm font-medium text-brand">Free</span> : <span>₦50.00</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="express" id="express" className="mr-3" />
                    <Label htmlFor="express" className="cursor-pointer">Express Shipping</Label>
                  </div>
                  <div>
                    <span>₦150.00</span>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Accordion type="single" defaultValue="billing" className="w-full">
              <AccordionItem value="billing">
                <AccordionTrigger className="text-lg font-medium">Billing Address</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                      defaultChecked
                    />
                    <label htmlFor="sameAsShipping" className="ml-2 text-sm">
                      Same as shipping address
                    </label>
                  </div>

                  <div className="bg-secondary rounded-md p-4">
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    {formData.apartment && <p>{formData.apartment}</p>}
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Return to Shipping
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Order Summary */}
      <div className="lg:col-start-3">
        <div className="bg-card border rounded-lg p-6 shadow-sm sticky top-24">
          <h2 className="text-lg font-bold mb-4 pb-4 border-b">Order Summary</h2>
          
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="relative w-16 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-brand text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.product.category}</p>
                  <p className="text-sm font-bold mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
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
            
            <div className="pt-4 border-t border-dashed">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  ${(totalPrice + (totalPrice >= 599 ? 0 : 50) + totalPrice * 0.07).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>
              By placing your order, you agree to our{" "}
              <Link to="/terms" className="text-brand hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-brand hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
