import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Package, Wrench, Sprout, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useRazorpay } from "@/hooks/useRazorpay";

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
  const [cart, setCart] = useState<string[]>([]);
  const { initiatePayment } = useRazorpay();

  const categories: Category[] = [
    { name: "All", icon: <Package className="w-4 h-4" />, count: 12 },
    { name: "Seeds", icon: <Sprout className="w-4 h-4" />, count: 4 },
    { name: "Fertilizers", icon: <ShoppingCart className="w-4 h-4" />, count: 4 },
    { name: "Tools", icon: <Wrench className="w-4 h-4" />, count: 4 },
  ];

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Corn Seeds Premium",
        category: "Seeds",
        price: 3799,
        image: "/corn-seeds.svg",
        description: "High-yield corn seeds with excellent germination rate and disease resistance.",
        rating: 4.5
      },
      {
        id: "2",
        name: "Organic Fertilizer",
        category: "Fertilizers",
        price: 2450,
        image: "/organic-fertilizer.svg",
        description: "100% organic fertilizer made from natural compost. Rich in nutrients.",
        rating: 4.8
      },
      {
        id: "3",
        name: "Smart Irrigation Kit",
        category: "Tools",
        price: 16599,
        image: "/smart-irrigation.svg",
        description: "Automated irrigation system with smart sensors and mobile app control.",
        rating: 4.7
      },
      {
        id: "4",
        name: "Wheat Seeds Hybrid",
        category: "Seeds",
        price: 3210,
        image: "/wheat-seeds.svg",
        description: "Premium hybrid wheat variety with superior grain quality.",
        rating: 4.6
      },
      {
        id: "5",
        name: "NPK Fertilizer 20-20-20",
        category: "Fertilizers",
        price: 2675,
        image: "/npk-fertilizer.svg",
        description: "Balanced NPK fertilizer formula providing essential nutrients.",
        rating: 4.4
      },
      {
        id: "6",
        name: "Soil pH Meter Digital",
        category: "Tools",
        price: 5430,
        image: "/soil-ph-meter.svg",
        description: "Professional digital pH meter for accurate soil testing.",
        rating: 4.5
      },
      {
        id: "7",
        name: "Tomato Seeds Hybrid",
        category: "Seeds",
        price: 2075,
        image: "/tomato-seeds.svg",
        description: "Disease-resistant hybrid tomato seeds with exceptional flavor.",
        rating: 4.6
      },
      {
        id: "8",
        name: "Bio-Compost Enriched",
        category: "Fertilizers",
        price: 1660,
        image: "/bio-compost.svg",
        description: "Premium bio-compost enriched with essential minerals.",
        rating: 4.3
      },
      {
        id: "9",
        name: "Precision Seed Drill",
        category: "Tools",
        price: 7465,
        image: "/precision-drill.svg",
        description: "Manual precision seed drill for accurate seed placement.",
        rating: 4.2
      },
      {
        id: "10",
        name: "Rice Paddy Seeds",
        category: "Seeds",
        price: 4355,
        image: "/rice-seeds.svg",
        description: "High-yielding rice variety suitable for paddy cultivation.",
        rating: 4.8
      },
      {
        id: "11",
        name: "Liquid Micronutrients",
        category: "Fertilizers",
        price: 2965,
        image: "/liquid-micronutrients.svg",
        description: "Concentrated liquid micronutrient solution with essential minerals.",
        rating: 4.7
      },
      {
        id: "12",
        name: "Soil Moisture Sensor",
        category: "Tools",
        price: 3730,
        image: "/soil-moisture-sensor.svg",
        description: "Wireless soil moisture sensor with real-time monitoring.",
        rating: 4.5
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleBuyNow = async (product: Product) => {
    try {
      await initiatePayment({
        amount: product.price,
        productName: product.name,
        productId: product.id,
        customerName: "Customer",
        customerEmail: "customer@example.com",
        customerPhone: "9999999999"
      });
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const handleAddToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
    alert('Product added to cart!');
    console.log('Added to cart:', productId);
  };

  return (
    <section id="shop" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Agricultural Shop
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our comprehensive collection of premium seeds, fertilizers, and farming tools.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(12).fill(0).map((_, i) => (
              <Card key={i} className="h-96">
                <CardHeader className="space-y-0 pb-2">
                  <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-0 pb-2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category to browse our products.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
