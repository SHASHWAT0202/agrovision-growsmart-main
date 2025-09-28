import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_CONFIG } from "@/config/api";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: "farm" | "soil" | "crop";
  data: {
    moisture?: number;
    temperature?: number;
    cropType?: string;
    status?: string;
  };
}

const GoogleMaps = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  
  // Mock farm data
  const markers: MapMarker[] = [
    {
      id: "1",
      lat: 40.7128,
      lng: -74.0060,
      title: "Main Farm Area",
      type: "farm",
      data: { status: "Active" }
    },
    {
      id: "2", 
      lat: 40.7140,
      lng: -74.0050,
      title: "Soil Sensor A1",
      type: "soil",
      data: { moisture: 68, temperature: 24 }
    },
    {
      id: "3",
      lat: 40.7120,
      lng: -74.0070,
      title: "Crop Field B",
      type: "crop",
      data: { cropType: "Corn", status: "Growing" }
    }
  ];

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "farm": return "🏡";
      case "soil": return "🌱";
      case "crop": return "🌾";
      default: return "📍";
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case "farm": return "bg-primary/10 text-primary border-primary/20";
      case "soil": return "bg-secondary/10 text-secondary border-secondary/20";
      case "crop": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  // Load Google Maps script and initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    const loadScript = () => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (existing) {
        // If script tag exists, wait until google.maps is available
        return new Promise<void>((resolve, reject) => {
          if ((window as any).google?.maps) {
            resolve();
            return;
          }
          const onLoad = () => resolve();
          existing.addEventListener("load", onLoad, { once: true });
          existing.addEventListener("error", () => reject(new Error("Failed to load Google Maps script")), { once: true });
        });
      }
      const script = document.createElement("script");
      const key = API_CONFIG.GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Google Maps script"));
      });
    };

    const waitForGoogle = () => new Promise<void>((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        if ((window as any).google?.maps) {
          resolve();
        } else if (Date.now() - start > 15000) {
          reject(new Error("Google Maps not available"));
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });

    loadScript()
      .then(() => waitForGoogle())
      .then(() => {
        // Center around first marker
        const center = { lat: markers[0].lat, lng: markers[0].lng };
        const map = new google.maps.Map(mapContainerRef.current as HTMLDivElement, {
          center,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        mapInstanceRef.current = map;

        // Add markers
        markers.forEach((m) => {
          const marker = new google.maps.Marker({
            position: { lat: m.lat, lng: m.lng },
            map,
            title: m.title,
          });
          marker.addListener("click", () => setSelectedMarker(m));
        });
      })
      .catch(() => {
        // If maps fails to load, keep the UI without breaking
      });
  }, []);

  return (
    <section id="maps" className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Farm Location
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Interactive Farm Map</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore your farm locations and get insights about soil conditions and crop recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-card border-0 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    Farm Location Map
                  </span>
                  <Button variant="outline" size="sm">
                    <Layers className="w-4 h-4 mr-2" />
                    Satellite View
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={mapContainerRef} className="relative h-96 rounded-lg overflow-hidden" />
              </CardContent>
            </Card>
          </div>

          {/* Marker Info Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card border-0 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏡</span>
                  <span className="text-sm">Farm Buildings</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌱</span>
                  <span className="text-sm">Soil Sensors</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌾</span>
                  <span className="text-sm">Crop Fields</span>
                </div>
              </CardContent>
            </Card>

            {selectedMarker ? (
              <Card className="bg-gradient-card shadow-card border-0 animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">{getMarkerIcon(selectedMarker.type)}</span>
                    {selectedMarker.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge className={getStatusColor(selectedMarker.type)}>
                    {selectedMarker.type.charAt(0).toUpperCase() + selectedMarker.type.slice(1)}
                  </Badge>
                  
                  <div className="space-y-3">
                    {selectedMarker.data.moisture && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Soil Moisture:</span>
                        <span className="text-sm font-bold text-secondary">
                          {selectedMarker.data.moisture}%
                        </span>
                      </div>
                    )}
                    
                    {selectedMarker.data.temperature && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Temperature:</span>
                        <span className="text-sm font-bold text-accent">
                          {selectedMarker.data.temperature}°C
                        </span>
                      </div>
                    )}
                    
                    {selectedMarker.data.cropType && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Crop Type:</span>
                        <span className="text-sm font-bold text-primary">
                          {selectedMarker.data.cropType}
                        </span>
                      </div>
                    )}
                    
                    {selectedMarker.data.status && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedMarker.data.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Click on a marker to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMaps;