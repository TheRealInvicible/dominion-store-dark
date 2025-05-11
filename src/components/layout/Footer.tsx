
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card shadow-inner border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="inline-flex items-center mb-4">
              <span className="text-2xl font-bold text-brand">DOMINION</span>
              <span className="ml-1 text-xl font-semibold">STORE</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Dealing with Mother Care, Baby Needs, Adult Dress & Many More
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <p className="text-sm text-muted-foreground">
                  Ajegunle Street ASA Dam Road, Ilorin Kwara state
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <p className="text-sm text-muted-foreground">
                  07066991001, 07033866666, 08079772213
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                <p className="text-sm text-muted-foreground">
                  info@dominionstore.com
                </p>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a 
                href="#" 
                className="p-2 bg-secondary rounded-full hover:text-brand transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-secondary rounded-full hover:text-brand transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-secondary rounded-full hover:text-brand transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/clothing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Baby Clothing
                </Link>
              </li>
              <li>
                <Link to="/products/care" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Baby Care
                </Link>
              </li>
              <li>
                <Link to="/products/gear" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Baby Gear
                </Link>
              </li>
              <li>
                <Link to="/products/maternity" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Moms & Maternity
                </Link>
              </li>
              <li>
                <Link to="/products/sale" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest products and offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md border bg-background text-foreground"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dominion Store. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
