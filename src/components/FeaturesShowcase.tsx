import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Zap, Database, Shield } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Brain,
      title: "Disease Detection",
      description: "AI-powered crop disease identification using YOLOv8",
      stats: "99.2% accuracy",
      color: "from-purple-500 to-indigo-500",
      bgGlow: "bg-purple-400/10"
    },
    {
      icon: TrendingUp,
      title: "Yield Prediction",
      description: "ML-based forecasting for optimal harvest planning",
      stats: "95% accuracy rate",
      color: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-400/10"
    },
    {
      icon: AlertTriangle,
      title: "Early Warning System",
      description: "Real-time alerts for weather & pest threats",
      stats: "24/7 monitoring",
      color: "from-orange-500 to-red-500",
      bgGlow: "bg-orange-400/10"
    },
    {
      icon: Zap,
      title: "Smart Irrigation",
      description: "IoT-enabled water management system",
      stats: "30% water savings",
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-400/10"
    },
    {
      icon: Database,
      title: "Crop Analytics",
      description: "Historical data analysis for better decisions",
      stats: "50K+ crops analyzed",
      color: "from-teal-500 to-green-500",
      bgGlow: "bg-teal-400/10"
    },
    {
      icon: Shield,
      title: "Soil Health",
      description: "AI-driven soil quality assessment & recommendations",
      stats: "Real-time insights",
      color: "from-amber-500 to-yellow-500",
      bgGlow: "bg-amber-400/10"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-background to-gray-50 dark:from-slate-950/20 dark:via-background dark:to-gray-950/20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30 bg-primary/5">
            <Brain className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary font-semibold">AI-Powered Technology</span>
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
              Cutting-Edge Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built with advanced AI and machine learning models to revolutionize modern agriculture.
            Experience the future of farming today.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full glass-effect shadow-elegant border-0 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer">
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-4 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-full h-full text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${feature.color} text-white border-0 font-semibold`}
                    >
                      {feature.stats}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Impact Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-8 text-center glass-effect shadow-elegant border-0 hover:shadow-2xl transition-all duration-300">
            <motion.h3 
              className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              45%
            </motion.h3>
            <p className="text-muted-foreground font-semibold">Average Yield Increase</p>
          </Card>

          <Card className="p-8 text-center glass-effect shadow-elegant border-0 hover:shadow-2xl transition-all duration-300">
            <motion.h3 
              className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
            >
              10K+
            </motion.h3>
            <p className="text-muted-foreground font-semibold">Farmers Empowered</p>
          </Card>

          <Card className="p-8 text-center glass-effect shadow-elegant border-0 hover:shadow-2xl transition-all duration-300">
            <motion.h3 
              className="text-5xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
            >
              30%
            </motion.h3>
            <p className="text-muted-foreground font-semibold">Resource Conservation</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
