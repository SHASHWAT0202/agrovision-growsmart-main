import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Layers, Locate, Satellite, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

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

const GoogleMapsFixed = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Mock farm data with more realistic coordinates - wrapped in useMemo to prevent re-renders
  const markers: MapMarker[] = useMemo(() => [
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
  ], []);

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
      case "farm": return "bg-green-100 text-green-700 border-green-300";
      case "soil": return "bg-blue-100 text-blue-700 border-blue-300";
      case "crop": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
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
      },
      () => {
        setLocationError('Unable to retrieve your location. Please enable location services.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Toggle map type
  const toggleMapType = () => {
    setMapType(prev => prev === 'roadmap' ? 'satellite' : 'roadmap');
  };

  // Initialize interactive map
  useEffect(() => {
    const initMap = () => {
      if (!mapContainerRef.current) {
        console.log('Map container ref not available');
        return;
      }
      
      console.log('Initializing map...');
      const mapElement = mapContainerRef.current;
      const isDark = mapType === 'satellite';
      
      // Force container visibility and dimensions
      mapElement.style.height = '400px';
      mapElement.style.minHeight = '400px';
      mapElement.style.width = '100%';
      mapElement.style.display = 'block';
      mapElement.style.visibility = 'visible';
      mapElement.style.opacity = '1';
      
      mapElement.innerHTML = `
        <div class="w-full h-full relative rounded-lg overflow-hidden border-2 border-gray-300 ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-green-100 via-blue-50 to-green-50'}" style="min-height: 400px; height: 400px;">
          <div class="absolute inset-0 ${isDark ? 'bg-gray-900/80' : 'bg-gradient-to-br from-green-50/90 to-blue-50/90'}"></div>
          
          <!-- Map Header -->
          <div class="absolute top-4 left-4 ${isDark ? 'bg-gray-800' : 'bg-white'} bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}">
                ${mapType === 'satellite' ? 'Satellite View' : 'Map View'} - Live Monitoring
              </span>
            </div>
          </div>

          <!-- Legend -->
          <div class="absolute top-4 right-4 ${isDark ? 'bg-gray-800' : 'bg-white'} bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
            <div class="text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-1">
              <div class="flex items-center gap-2">
                <span>🏡</span> <span>Farm</span>
              </div>
              <div class="flex items-center gap-2">
                <span>🌱</span> <span>Sensors</span>
              </div>
              <div class="flex items-center gap-2">
                <span>🌾</span> <span>Crops</span>
              </div>
            </div>
          </div>
          
          <!-- User Location Indicator -->
          ${userLocation ? `
            <div class="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div class="relative">
                <div class="w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-blue-500 text-white px-2 py-1 rounded whitespace-nowrap">
                  📍 Your Location
                </div>
                <div class="absolute inset-0 w-6 h-6 bg-blue-300 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          ` : ''}
          
          <!-- Farm Markers Grid -->
          <div class="relative w-full h-full flex items-center justify-center p-8" style="min-height: 300px;">
            <div class="grid grid-cols-2 gap-6 max-w-lg w-full">
              ${markers.map((marker, index) => `
                <div 
                  class="marker-button cursor-pointer ${isDark ? 'bg-gray-700' : 'bg-white'} bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                    marker.type === 'farm' ? 'border-green-400 hover:border-green-500' : 
                    marker.type === 'soil' ? 'border-blue-400 hover:border-blue-500' : 
                    'border-yellow-400 hover:border-yellow-500'
                  } group animate-fade-in"
                  data-marker-id="${marker.id}"
                  style="animation-delay: ${index * 0.2}s; opacity: 1; transform: translateY(0);"
                >
                  <div class="text-center">
                    <div class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">${getMarkerIcon(marker.type)}</div>
                    <div class="text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-1">${marker.title}</div>
                    <div class="text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2">${marker.type.charAt(0).toUpperCase() + marker.type.slice(1)}</div>
                    ${marker.data.status ? `<div class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">${marker.data.status}</div>` : ''}
                    ${marker.data.moisture ? `<div class="text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}">${marker.data.moisture}% 💧</div>` : ''}
                    ${marker.data.cropType ? `<div class="text-xs ${isDark ? 'text-yellow-300' : 'text-yellow-600'}">${marker.data.cropType}</div>` : ''}
                  </div>
                  
                  <!-- Hover Effect Ring -->
                  <div class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 group-hover:border-dashed transition-all duration-300"></div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Map Controls -->
          <div class="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
            <button 
              class="zoom-in-btn w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg flex items-center justify-center ${isDark ? 'text-white' : 'text-gray-700'} hover:shadow-xl transition-all duration-200"
              title="Zoom In"
            >
              +
            </button>
            <button 
              class="zoom-out-btn w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg flex items-center justify-center ${isDark ? 'text-white' : 'text-gray-700'} hover:shadow-xl transition-all duration-200"
              title="Zoom Out"
            >
              −
            </button>
          </div>

          <!-- Status Bar -->
          <div class="absolute bottom-4 left-4 ${isDark ? 'bg-gray-800' : 'bg-white'} bg-opacity-90 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10">
            <div class="flex items-center gap-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All Systems Online • ${markers.length} Locations</span>
            </div>
          </div>
        </div>
      `;

      // Add click handlers to markers
      const markerElements = mapElement.querySelectorAll('.marker-button');
      markerElements.forEach((element) => {
        element.addEventListener('click', () => {
          const markerId = element.getAttribute('data-marker-id');
          const marker = markers.find(m => m.id === markerId);
          if (marker) {
            setSelectedMarker(marker);
            // Add visual feedback
            markerElements.forEach(el => el.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-50'));
            element.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-50');
          }
        });
      });

      // Add zoom button functionality
      const zoomInBtn = mapElement.querySelector('.zoom-in-btn');
      const zoomOutBtn = mapElement.querySelector('.zoom-out-btn');
      
      zoomInBtn?.addEventListener('click', () => {
        markerElements.forEach(el => {
          el.classList.add('scale-110');
          setTimeout(() => el.classList.remove('scale-110'), 200);
        });
      });

      zoomOutBtn?.addEventListener('click', () => {
        markerElements.forEach(el => {
          el.classList.add('scale-90');
          setTimeout(() => el.classList.remove('scale-90'), 200);
        });
      });

      console.log('Map initialized successfully');
      setIsLoading(false);
    };

    // Set loading to true initially
    setIsLoading(true);
    
    // Initialize map with multiple attempts
    const attemptInit = () => {
      if (mapContainerRef.current) {
        initMap();
      } else {
        setTimeout(attemptInit, 100);
      }
    };
    
    attemptInit();
  }, [mapType, userLocation, markers]);

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
            Explore your farm locations and get real-time insights about soil conditions and crop status with our interactive monitoring system.
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
                    Smart Farm Monitoring Map
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleMapType}
                      className="flex items-center gap-2 transition-all duration-200"
                    >
                      {mapType === 'roadmap' ? <Satellite className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      {mapType === 'roadmap' ? 'Satellite' : 'Map'} View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={getCurrentLocation}
                      className="flex items-center gap-2 transition-all duration-200"
                      disabled={isLoading}
                    >
                      <Locate className="w-4 h-4" />
                      Find Me
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-gray-200">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">Loading Interactive Map...</p>
                      <p className="text-gray-500 text-sm">Connecting to farm sensors</p>
                    </div>
                  </div>
                )}
                {locationError && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    <span className="text-yellow-800 text-sm">{locationError}</span>
                  </div>
                )}
                
                {/* Fallback visible container to ensure map area is always shown */}
                <div className="relative">
                  <div 
                    ref={mapContainerRef} 
                    className="map-container relative w-full rounded-lg overflow-hidden transition-all duration-500 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-gray-200"
                    style={{
                      height: '400px',
                      minHeight: '400px',
                      display: isLoading ? 'none' : 'block',
                      opacity: isLoading ? 0 : 1,
                      visibility: isLoading ? 'hidden' : 'visible'
                    }}
                  />
                  
                  {/* Fallback content if map fails to load */}
                  {!isLoading && mapContainerRef.current && mapContainerRef.current.innerHTML === '' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-gray-300">
                      <div className="text-center p-8">
                        <div className="text-4xl mb-4">🗺️</div>
                        <p className="text-gray-600 font-medium mb-2">Interactive Farm Map</p>
                        <p className="text-gray-500 text-sm mb-4">Monitoring 4 active locations</p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-white/80 rounded-lg p-3 shadow-md">
                            <div className="text-2xl mb-1">🏡</div>
                            <div className="text-xs text-gray-600">Main Farm</div>
                          </div>
                          <div className="bg-white/80 rounded-lg p-3 shadow-md">
                            <div className="text-2xl mb-1">🌱</div>
                            <div className="text-xs text-gray-600">Sensors</div>
                          </div>
                          <div className="bg-white/80 rounded-lg p-3 shadow-md">
                            <div className="text-2xl mb-1">🌾</div>
                            <div className="text-xs text-gray-600">Crops</div>
                          </div>
                          <div className="bg-white/80 rounded-lg p-3 shadow-md">
                            <div className="text-2xl mb-1">💧</div>
                            <div className="text-xs text-gray-600">Irrigation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Map Legend */}
            <Card className="bg-gradient-card shadow-card border-0 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Map Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xl">🏡</span>
                  <div>
                    <span className="text-sm font-medium">Farm Buildings</span>
                    <p className="text-xs text-gray-500">Main facility locations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xl">🌱</span>
                  <div>
                    <span className="text-sm font-medium">Smart Sensors</span>
                    <p className="text-xs text-gray-500">IoT monitoring devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xl">🌾</span>
                  <div>
                    <span className="text-sm font-medium">Crop Fields</span>
                    <p className="text-xs text-gray-500">Active growing areas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="text-sm font-medium">Your Location</span>
                    <p className="text-xs text-gray-500">GPS position</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Marker Info */}
            {selectedMarker ? (
              <Card className="bg-gradient-card shadow-card border-0 animate-bounce-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">{getMarkerIcon(selectedMarker.type)}</span>
                    {selectedMarker.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge className={getStatusColor(selectedMarker.type)}>
                    {selectedMarker.type.charAt(0).toUpperCase() + selectedMarker.type.slice(1)} Station
                  </Badge>
                  
                  <div className="space-y-3">
                    {selectedMarker.data.moisture && (
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium flex items-center gap-2">
                          💧 Soil Moisture
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {selectedMarker.data.moisture}%
                        </span>
                      </div>
                    )}
                    
                    {selectedMarker.data.temperature && (
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium flex items-center gap-2">
                          🌡️ Temperature
                        </span>
                        <span className="text-sm font-bold text-orange-600">
                          {selectedMarker.data.temperature}°C
                        </span>
                      </div>
                    )}
                    
                    {selectedMarker.data.cropType && (
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium flex items-center gap-2">
                          🌾 Crop Type
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          {selectedMarker.data.cropType}
                        </span>
                      </div>
                    )}
                    
                    {selectedMarker.data.status && (
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium flex items-center gap-2">
                          ⚡ Status
                        </span>
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                          {selectedMarker.data.status}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm font-medium">Select a Location</p>
                  <p className="text-xs mt-2">
                    Click on any marker to view detailed information about that location
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Sensors</span>
                  <span className="text-lg font-bold text-green-600">{markers.filter(m => m.type === 'soil').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Crop Fields</span>
                  <span className="text-lg font-bold text-yellow-600">{markers.filter(m => m.type === 'crop').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Farm Buildings</span>
                  <span className="text-lg font-bold text-blue-600">{markers.filter(m => m.type === 'farm').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapsFixed;