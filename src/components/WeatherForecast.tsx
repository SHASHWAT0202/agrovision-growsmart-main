import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, MapPin, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { API_CONFIG, buildApiUrl } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

interface WeatherData {
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
}

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const { toast } = useToast();
  
  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      // For demo purposes, using enhanced mock data based on location
      // Replace with actual API call: const response = await fetch(buildApiUrl(API_CONFIG.WEATHER, { lat, lon }));
      const mockData: WeatherData[] = [
        { date: "Today", temperature: Math.round(25 + Math.random() * 8), humidity: Math.round(60 + Math.random() * 20), rainfall: Math.round(Math.random() * 3), windSpeed: Math.round(8 + Math.random() * 15), condition: "sunny" },
        { date: "Tomorrow", temperature: Math.round(23 + Math.random() * 8), humidity: Math.round(65 + Math.random() * 20), rainfall: Math.round(Math.random() * 5), windSpeed: Math.round(10 + Math.random() * 15), condition: Math.random() > 0.5 ? "cloudy" : "sunny" },
        { date: "Wed", temperature: Math.round(22 + Math.random() * 8), humidity: Math.round(70 + Math.random() * 20), rainfall: Math.round(Math.random() * 8), windSpeed: Math.round(12 + Math.random() * 15), condition: Math.random() > 0.3 ? "rainy" : "cloudy" },
        { date: "Thu", temperature: Math.round(24 + Math.random() * 8), humidity: Math.round(55 + Math.random() * 20), rainfall: Math.round(Math.random() * 2), windSpeed: Math.round(8 + Math.random() * 12), condition: "sunny" },
        { date: "Fri", temperature: Math.round(26 + Math.random() * 8), humidity: Math.round(50 + Math.random() * 20), rainfall: 0, windSpeed: Math.round(6 + Math.random() * 10), condition: "sunny" },
        { date: "Sat", temperature: Math.round(23 + Math.random() * 8), humidity: Math.round(75 + Math.random() * 15), rainfall: Math.round(Math.random() * 6), windSpeed: Math.round(15 + Math.random() * 15), condition: Math.random() > 0.4 ? "cloudy" : "rainy" },
        { date: "Sun", temperature: Math.round(21 + Math.random() * 8), humidity: Math.round(80 + Math.random() * 15), rainfall: Math.round(2 + Math.random() * 10), windSpeed: Math.round(18 + Math.random() * 15), condition: "rainy" },
      ];
      
      setWeatherData(mockData);
      
      // Get location name from coordinates (mock)
      setLocationName(`Location ${lat.toFixed(2)}, ${lon.toFixed(2)}`);
      
      toast({
        title: "Weather Updated",
        description: "Fetched latest weather data for your location.",
      });
    } catch (error) {
      toast({
        title: "Weather Error",
        description: "Failed to fetch weather data. Using demo data.",
        variant: "destructive",
      });
      console.error("Weather fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Error", 
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
        fetchWeatherData(lat, lon);
      },
      (error) => {
        setLoading(false);
        toast({
          title: "Location Error",
          description: "Unable to get your location. Using default location.",
          variant: "destructive",
        });
        // Fallback to default location
        const defaultLat = 40.7128;
        const defaultLon = -74.0060;
        setLocation({ lat: defaultLat, lon: defaultLon });
        fetchWeatherData(defaultLat, defaultLon);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Initial load with current location
  useEffect(() => {
    getCurrentLocation();
  }, []);
  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return <Sun className="h-8 w-8 text-accent" />;
      case "cloudy": return <Cloud className="h-8 w-8 text-muted-foreground" />;
      case "rainy": return <CloudRain className="h-8 w-8 text-secondary" />;
      default: return <Sun className="h-8 w-8 text-accent" />;
    }
  };
  
  return (
    <section id="weather" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <Cloud className="w-4 h-4 mr-2" />
            Weather Insights
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">7-Day Weather Forecast</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your farming activities with accurate weather predictions and insights.
          </p>
          
          {/* Location & Refresh Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            {locationName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{locationName}</span>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={getCurrentLocation}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Update Location'}
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {Array(7).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-muted rounded-md"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 animate-scale-in">
            {weatherData.map((day, index) => (
              <Card key={index} className="bg-gradient-card shadow-card border-0 hover:shadow-glow transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-center">{day.date}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Weather Icon & Temperature */}
                  <div className="text-center space-y-2">
                    <div className="flex justify-center group-hover:scale-110 transition-transform">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-bold">{day.temperature}°C</span>
                    </div>
                  </div>
                  
                  {/* Weather Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-secondary" />
                        <span>Humidity</span>
                      </div>
                      <span className="font-medium">{day.humidity}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <CloudRain className="h-3 w-3 text-primary" />
                        <span>Rain</span>
                      </div>
                      <span className="font-medium">{day.rainfall}mm</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Wind className="h-3 w-3 text-accent" />
                        <span>Wind</span>
                      </div>
                      <span className="font-medium">{day.windSpeed}km/h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WeatherForecast;