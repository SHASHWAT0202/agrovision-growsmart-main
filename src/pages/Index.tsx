import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WeatherForecast from "@/components/WeatherForecast";
import GoogleMaps from "@/components/GoogleMaps";
import ShopSection from "@/components/ShopSection";
import SoilCropSection from "@/components/SoilCropSection";
import PlantClassification from "@/components/PlantClassification";
import AIChat from "@/components/AIChat";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WeatherForecast />
      <GoogleMaps />
      <ShopSection />
      <SoilCropSection />
      <PlantClassification />
      <AIChat />
      <Footer />
    </div>
  );
};

export default Index;
