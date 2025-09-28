import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Package, Wrench, Sprout } from "lucide-react";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  count: number;
}

const ShopSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { name: "All", icon: <Package className="w-4 h-4" />, count: 24 },
    { name: "Seeds", icon: <Sprout className="w-4 h-4" />, count: 8 },
    { name: "Fertilizers", icon: <ShoppingCart className="w-4 h-4" />, count: 10 },
    { name: "Tools", icon: <Wrench className="w-4 h-4" />, count: 6 },
  ];

  // Mock product data - replace with actual API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Premium Corn Seeds",
        category: "Seeds",
        price: 45.99,
        image: "/placeholder.svg",
        description: "High-yield corn seeds resistant to drought and pests",
        rating: 4.8
      },
      {
        id: "2",
        name: "Organic Fertilizer",
        category: "Fertilizers",
        price: 32.50,
        image: "/placeholder.svg",
        description: "100% organic fertilizer for sustainable farming",
        rating: 4.6
      },
      {
        id: "3",
        name: "Smart Irrigation Tool",
        category: "Tools",
        price: 129.99,
        image: "/placeholder.svg",
        description: "IoT-enabled irrigation system with mobile control",
        rating: 4.9
      },
      {
        id: "4",
        name: "Wheat Seeds Variety Pack",
        category: "Seeds",
        price: 38.75,
        image: "/placeholder.svg",
        description: "Multiple wheat varieties for different soil types",
        rating: 4.7
      },
      {
        id: "5",
        name: "NPK Fertilizer Blend",
        category: "Fertilizers",
        price: 28.99,
        image: "/placeholder.svg",
        description: "Balanced NPK fertilizer for optimal plant growth",
        rating: 4.5
      },
      {
        id: "6",
        name: "Soil pH Meter",
        category: "Tools",
        price: 67.50,
        image: "/placeholder.svg",
        description: "Digital soil pH and moisture meter",
        rating: 4.4
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="shop" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Farm Store
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Premium Agricultural Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated selection of high-quality seeds, fertilizers, and farming tools.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted rounded-md mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-gradient-card shadow-card border-0 hover:shadow-glow transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary/90">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {product.rating}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <Button className="w-full group">
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;