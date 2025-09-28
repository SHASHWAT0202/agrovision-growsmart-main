import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Leaf, TrendingUp, Users } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium">
              <Leaf className="w-4 h-4" />
              <span>AI-Powered Smart Farming</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                AgroVision
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Revolutionize your farming with AI-driven insights, real-time monitoring, 
                and smart recommendations for maximum yield and sustainability.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group animate-glow">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-in">
            <Card className="p-6 bg-gradient-card shadow-card border-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">45%</p>
                  <p className="text-sm text-muted-foreground">Yield Increase</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card shadow-card border-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">Happy Farmers</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card shadow-card border-0 sm:col-span-2">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">30%</p>
                  <p className="text-sm text-muted-foreground">Water Conservation</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;