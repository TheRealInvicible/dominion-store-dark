import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  PackageOpen,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "May 10, 2025",
    status: "Delivered",
    total: 64.99,
    items: 2,
  },
  {
    id: "ORD-12346",
    date: "April 28, 2025",
    status: "Processing",
    total: 129.99,
    items: 1,
  },
  {
    id: "ORD-12347",
    date: "April 15, 2025",
    status: "Delivered",
    total: 49.98,
    items: 3,
  },
];

const Account = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    phone: "+234 70 1234 5678",
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnUrl: "/account" }} />;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated.",
      });
    }, 1000);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="max-w-3xl overflow-x-auto">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <PackageOpen className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Methods
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{profileData.firstName} {profileData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member Since</p>
                    <p className="font-medium">April 2025</p>
                  </div>
                  <div className="pt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Button variant="outline" asChild>
                <Link to="/account?tab=orders">View All Orders</Link>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Order #</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Total</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 2).map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">${order.total.toFixed(2)}</td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/order/${order.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-medium">No orders yet</h3>
                <p className="text-muted-foreground mt-1">
                  When you place orders, they will appear here
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Order #</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Items</th>
                      <th className="pb-2">Total</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="py-3">{order.id}</td>
                        <td className="py-3">{order.date}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">{order.items}</td>
                        <td className="py-3">${order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/order/${order.id}`}>View</Link>
                            </Button>
                            {order.status === "Delivered" &&
                              <Button variant="ghost" size="sm">Reorder</Button>
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Other tabs would follow the same pattern */}
        <TabsContent value="wishlist">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
            <div className="text-center py-8">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-medium">Your wishlist is empty</h3>
              <p className="text-muted-foreground mt-1">
                Save items you like to your wishlist
              </p>
              <Button className="mt-4" asChild>
                <Link to="/">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="addresses">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
            <div className="text-center py-8">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-medium">No addresses saved</h3>
              <p className="text-muted-foreground mt-1">
                Add shipping and billing addresses for faster checkout
              </p>
              <Button className="mt-4">Add New Address</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <div className="text-center py-8">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-medium">No payment methods saved</h3>
              <p className="text-muted-foreground mt-1">
                Save your payment details for faster checkout
              </p>
              <Button className="mt-4">Add Payment Method</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
