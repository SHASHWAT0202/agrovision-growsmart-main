import { Navbar1 } from "@/components/ui/navbar-1";
import HeroSection from "@/components/HeroSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import WeatherForecast from "@/components/WeatherForecast";
import RealGoogleMaps from "@/components/RealGoogleMaps";
import ShopSection from "@/components/ShopSection";
import SoilCropSection from "@/components/SoilCropSection";
import PlantClassification from "@/components/PlantClassification";
import FarmerCalendar from "@/components/FarmerCalendar";
import AIChat from "@/components/AIChat";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const sectionVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      bounce: 0.4, 
      duration: 0.8 
    }
  }
};

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Navbar1 />
      <HeroSection />
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <FeaturesShowcase />
      </motion.div>
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <WeatherForecast />
      </motion.div>
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <RealGoogleMaps />
      </motion.div>
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <ShopSection />
      </motion.div>
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <SoilCropSection />
      </motion.div>
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <PlantClassification />
      </motion.div>
      
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <FarmerCalendar />
      </motion.div>
      
      <AIChat />
      <Footer />
    </motion.div>
  );
};

export default Index;
