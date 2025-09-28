import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Leaf, Menu, Sun, Moon, MapPin, Cloud, ShoppingBag, Sprout, Camera, MessageCircle, Calendar } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Weather', href: '#weather', icon: Cloud },
    { name: 'Maps', href: '#maps', icon: MapPin },
    { name: 'Shop', href: '#shop', icon: ShoppingBag },
    { name: 'Soil & Crops', href: '#soil', icon: Sprout },
    { name: 'Plant ID', href: '#plant-classification', icon: Camera },
    { name: 'Calendar', href: '#calendar', icon: Calendar },
    { name: 'AI Chat', href: '#chat', icon: MessageCircle },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-card border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AgroVision</h1>
              <Badge variant="outline" className="text-xs px-2 py-0">
                Smart Farming AI
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="relative hover:bg-muted"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">AgroVision</h1>
                    <Badge variant="outline" className="text-xs">
                      Smart Farming AI
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {navigation.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-muted transition-colors duration-200 group"
                      >
                        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;