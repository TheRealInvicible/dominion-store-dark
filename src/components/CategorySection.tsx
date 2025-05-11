
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
  count: number;
}

const categories: Category[] = [
  {
    id: "cat-1",
    name: "Baby Clothing",
    image: "/placeholder.svg",
    path: "/products/clothing",
    count: 120,
  },
  {
    id: "cat-2",
    name: "Baby Care",
    image: "/placeholder.svg",
    path: "/products/care",
    count: 85,
  },
  {
    id: "cat-3",
    name: "Baby Gear",
    image: "/placeholder.svg",
    path: "/products/gear",
    count: 64,
  },
  {
    id: "cat-4",
    name: "Moms & Maternity",
    image: "/placeholder.svg",
    path: "/products/maternity",
    count: 73,
  },
];

export function CategorySection() {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Shop By Category</h2>
        <Link 
          to="/products" 
          className="text-brand flex items-center hover:underline"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="group relative flex flex-col overflow-hidden rounded-lg bg-card shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <div className="aspect-square w-full">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            </div>
            <div className="flex flex-col p-4">
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
