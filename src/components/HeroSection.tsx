import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Leaf, TrendingUp, Users, Droplets } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-teal-950/20">{/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
      </div>

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Brand Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 dark:border-primary/40 rounded-full text-primary dark:text-primary font-semibold shadow-lg backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Leaf className="w-5 h-5" />
              </motion.div>
              <span>AI-Powered Smart Farming</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                <motion.span 
                  className="gradient-text animate-gradient bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  AgroVision
                </motion.span>
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/80 dark:text-foreground/90 max-w-2xl leading-relaxed font-medium">
                Revolutionize your farming with <span className="text-primary font-bold">AI-driven insights</span>, 
                real-time monitoring, and smart recommendations for <span className="text-secondary font-bold">maximum yield</span> and sustainability.
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary/80 shadow-elegant hover:shadow-2xl transition-all duration-300 text-base font-semibold px-8 w-full sm:w-auto"
                  onClick={() => {
                    const element = document.querySelector('#weather');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Started
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300 text-base font-semibold px-8 w-full sm:w-auto"
                  onClick={() => {
                    window.open('https://www.youtube.com/watch?v=5fgNlH_eiYI', '_blank');
                  }}
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
              <Card className="p-6 glass-effect shadow-elegant border border-primary/20 hover:border-primary/40 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TrendingUp className="h-7 w-7 text-primary" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      45%
                    </motion.p>
                    <p className="text-sm font-semibold text-muted-foreground">Yield Increase</p>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
              <Card className="p-6 glass-effect shadow-elegant border border-secondary/20 hover:border-secondary/40 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="h-7 w-7 text-secondary" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-3xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      10K+
                    </motion.p>
                    <p className="text-sm font-semibold text-muted-foreground">Happy Farmers</p>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div 
              className="sm:col-span-2"
              variants={cardVariants} 
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="p-6 glass-effect shadow-elegant border border-accent/20 hover:border-accent/40 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Droplets className="h-7 w-7 text-accent" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-3xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      30%
                    </motion.p>
                    <p className="text-sm font-semibold text-muted-foreground">Water Conservation</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;