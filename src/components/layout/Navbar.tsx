
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Baby Clothing", path: "/products/clothing" },
  { name: "Baby Care", path: "/products/care" },
  { name: "Baby Gear", path: "/products/gear" },
  { name: "Moms & Maternity", path: "/products/maternity" },
  { name: "Sale", path: "/products/sale" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm border-b"
          : "border-b"
      }`}
    >
      {/* Top bar with offers */}
      <div className="bg-blue-600 text-white text-center py-1 text-xs">
        Free Shipping on orders above ₹599 | 30 Day Returns
      </div>
      
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand">DOMINION</span>
              <span className="ml-1 text-xl font-semibold">STORE</span>
            </Link>
          </div>

          {/* Search bar in center */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded-md py-2 pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="User menu"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">Welcome!</p>
                    <p className="text-muted-foreground text-xs">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">Your Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cart">Your Cart</Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <a href="https://admin.dominionstore.com" target="_blank" rel="noopener noreferrer">
                        Admin Dashboard
                      </a>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Category navigation */}
        <nav className="hidden md:flex items-center border-t py-2 px-4">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="text-sm font-medium px-3 py-1 transition-colors hover:text-foreground/80"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t px-4 py-3 animate-fadeIn">
            <nav className="space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="block py-1 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <div className="pt-2 border-t">
                {!isAuthenticated ? (
                  <div className="space-y-2 pt-1">
                    <Button variant="default" className="w-full" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <Button variant="default" className="w-full" asChild>
                      <Link to="/account" onClick={() => setIsMenuOpen(false)}>Your Account</Link>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
