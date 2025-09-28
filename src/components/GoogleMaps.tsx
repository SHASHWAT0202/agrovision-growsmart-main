import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Layers, Locate, Satellite } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_CONFIG } from "@/config/api";

// Extend Window interface to include google
declare global {
  interface Window {
    google: any;
  }
}

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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Layers, Locate, Satellite, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_CONFIG } from "@/config/api";

// Extend Window interface to include google
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        InfoWindow: any;
        LatLng: any;
        MapTypeId: any;
        event: any;
      };
    };
  }
}

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
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  // Mock farm data with more realistic coordinates
  const markers: MapMarker[] = [
    {
      id: "1",
      lat: 28.6139,
      lng: 77.2090,
      title: "Main Farm Area - Delhi",
      type: "farm",
      data: { status: "Active" }
    },
    {
      id: "2", 
      lat: 28.6189,
      lng: 77.2140,
      title: "Soil Sensor A1",
      type: "soil",
      data: { moisture: 68, temperature: 24 }
    },
    {
      id: "3",
      lat: 28.6089,
      lng: 77.2040,
      title: "Crop Field B - Wheat",
      type: "crop",
      data: { cropType: "Wheat", status: "Growing" }
    },
    {
      id: "4",
      lat: 28.6239,
      lng: 77.2190,
      title: "Irrigation System C",
      type: "soil",
      data: { moisture: 72, temperature: 26 }
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

  // Get user's current location
  const getCurrentLocation = () => {
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        
        // If map is already loaded, update it
        if (mapInstanceRef.current && window.google) {
          mapInstanceRef.current.setCenter(location);
          mapInstanceRef.current.setZoom(15);
          
          // Add or update user location marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setMap(null);
          }
          
          userMarkerRef.current = new window.google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(24, 24)
            }
          });
        }
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied by user.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Toggle map type between roadmap and satellite
  const toggleMapType = () => {
    const newMapType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    setMapType(newMapType);
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(newMapType);
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
        return new Promise<void>((resolve, reject) => {
          if (window.google?.maps) {
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
        if (window.google?.maps) {
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
        // Use user location if available, otherwise use first marker
        const center = userLocation || { lat: markers[0].lat, lng: markers[0].lng };
        
        const map = new window.google.maps.Map(mapContainerRef.current as HTMLDivElement, {
          center,
          zoom: userLocation ? 15 : 12,
          mapTypeId: mapType,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });
        mapInstanceRef.current = map;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add farm markers
        markers.forEach((m) => {
          const marker = new window.google.maps.Marker({
            position: { lat: m.lat, lng: m.lng },
            map,
            title: m.title,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="${m.type === 'farm' ? '#22c55e' : m.type === 'soil' ? '#3b82f6' : '#f59e0b'}" stroke="#ffffff" stroke-width="2"/>
                  <text x="16" y="20" text-anchor="middle" font-size="14" fill="#ffffff">${getMarkerIcon(m.type)}</text>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32)
            }
          });
          
          marker.addListener("click", () => {
            setSelectedMarker(m);
            map.panTo({ lat: m.lat, lng: m.lng });
          });
          
          markersRef.current.push(marker);
        });

        // Add user location marker if available
        if (userLocation) {
          userMarkerRef.current = new window.google.maps.Marker({
            position: userLocation,
            map,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(24, 24)
            }
          });
        }

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setLocationError('Failed to load Google Maps. Please check your internet connection.');
      });
  }, [userLocation, mapType]);

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
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
                <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    Farm Location Map
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleMapType}
                      className="flex items-center gap-2"
                    >
                      {mapType === 'roadmap' ? <Satellite className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      {mapType === 'roadmap' ? 'Satellite' : 'Map'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={getCurrentLocation}
                      className="flex items-center gap-2"
                    >
                      <Locate className="w-4 h-4" />
                      My Location
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading Map...</p>
                    </div>
                  </div>
                )}
                {locationError && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-800 text-sm">{locationError}</span>
                  </div>
                )}
                <div 
                  ref={mapContainerRef} 
                  className={`relative h-96 rounded-lg overflow-hidden ${isLoading ? 'hidden' : 'block'}`} 
                />
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