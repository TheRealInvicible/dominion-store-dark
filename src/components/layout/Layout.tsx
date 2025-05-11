
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ShoppingCart } from "../ShoppingCart";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-950 bg-gray-50">
      <Navbar />
      <ShoppingCart />
      <main className="flex-grow container mx-auto py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
