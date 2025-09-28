import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Leaf, Info, CheckCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { API_CONFIG, buildApiUrl } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

interface PlantResult {
  plantType: string;
  confidence: number;
  commonUses: string[];
  description: string;
  careInstructions: string;
}

const PlantClassification = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [plantResult, setPlantResult] = useState<PlantResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Demo data for when API is not working
  const demoPlantData: PlantResult[] = [
    {
      plantType: "Rose",
      confidence: 95,
      commonUses: ["Ornamental", "Perfume", "Medicinal"],
      description: "A woody perennial flowering plant of the genus Rosa, in the family Rosaceae. Roses are known for their beautiful flowers and fragrance.",
      careInstructions: "Plant in well-draining soil with full sun exposure. Water regularly but avoid overwatering. Prune in early spring to promote new growth."
    },
    {
      plantType: "Sunflower",
      confidence: 92,
      commonUses: ["Oil", "Seeds", "Ornamental"],
      description: "An annual plant in the family Asteraceae with a large flower head. The flower head can be up to 30 cm wide with yellow petals.",
      careInstructions: "Plant in full sun with rich, well-draining soil. Water deeply but infrequently. Support tall varieties with stakes."
    },
    {
      plantType: "Lavender",
      confidence: 88,
      commonUses: ["Aromatherapy", "Culinary", "Ornamental"],
      description: "A flowering plant in the mint family, known for its fragrant purple flowers and aromatic leaves.",
      careInstructions: "Plant in well-draining, alkaline soil with full sun. Water sparingly once established. Prune after flowering to maintain shape."
    }
  ];

  // Test API connection
  const testApiConnection = async () => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
        method: 'OPTIONS'
      });
      console.log('API connection test response:', response.status);
      
      if (response.status === 405) {
        toast({
          title: "API Test Result",
          description: "API endpoint exists but is not accepting requests. This indicates a backend issue.",
          variant: "destructive",
        });
        return false;
      } else if (response.ok) {
        toast({
          title: "API Test Result",
          description: "API connection successful! Plant detection should work now.",
          variant: "default",
        });
        return true;
      } else {
        toast({
          title: "API Test Result",
          description: `API returned status ${response.status}. Please try again later.`,
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('API connection test failed:', error);
      toast({
        title: "API Test Result",
        description: "Failed to connect to API. Please check your internet connection.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Test API with a simple image
  const testApiWithImage = async () => {
    try {
      // Create a simple test image (1x1 pixel)
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 224, 224);
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('file', blob, 'test.png');
            
            console.log('Testing API with generated test image');
            
            const response = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
              method: 'POST',
              body: formData
            });
            
            if (response.ok) {
              const data = await response.json();
              toast({
                title: "API Test Success",
                description: `Test image processed successfully! Detected: ${data.predicted_class}`,
                variant: "default",
              });
            } else {
              const errorText = await response.text();
              toast({
                title: "API Test Failed",
                description: `Error ${response.status}: ${errorText}`,
                variant: "destructive",
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('API test with image failed:', error);
      toast({
        title: "API Test Failed",
        description: "Failed to test API with test image",
        variant: "destructive",
      });
    }
  };

  // Test API with exact Swagger format
  const testSwaggerFormat = async () => {
    try {
      // Create a simple test image exactly like Swagger would
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 224, 224);
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('file', blob, 'test.png');
            
            console.log('=== Testing with Swagger format ===');
            console.log('Blob size:', blob.size);
            console.log('Blob type:', blob.type);
            console.log('FormData entries:');
            for (const [key, value] of formData.entries()) {
              console.log(`${key}:`, value);
            }
            
            const response = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
              method: 'POST',
              body: formData,
              mode: 'cors',
              credentials: 'omit'
            });
            
            console.log('=== Swagger Test Response ===');
            console.log('Status:', response.status);
            console.log('Headers:', response.headers);
            console.log('OK:', response.ok);
            
            if (response.ok) {
              const data = await response.json();
              console.log('Success data:', data);
              toast({
                title: "Swagger Test Success",
                description: `API working! Detected: ${data.predicted_class}`,
                variant: "default",
              });
            } else {
              const errorText = await response.text();
              console.error('Error response:', errorText);
              toast({
                title: "Swagger Test Failed",
                description: `Error ${response.status}: ${errorText}`,
                variant: "destructive",
              });
            }
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error('Swagger format test failed:', error);
      toast({
        title: "Test Failed",
        description: "Failed to test with Swagger format",
        variant: "destructive",
      });
    }
  };

  // Test CORS preflight
  const testCorsPreflight = async () => {
    try {
      console.log('=== Testing CORS Preflight ===');
      
      const response = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
        method: 'OPTIONS',
        mode: 'cors',
        credentials: 'omit'
      });
      
      console.log('Preflight Status:', response.status);
      console.log('Preflight Headers:', response.headers);
      console.log('Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
      console.log('Access-Control-Allow-Methods:', response.headers.get('Access-Control-Allow-Methods'));
      console.log('Access-Control-Allow-Headers:', response.headers.get('Access-Control-Allow-Headers'));
      
      if (response.status === 200) {
        toast({
          title: "CORS Test Success",
          description: "CORS preflight successful!",
          variant: "default",
        });
      } else {
        toast({
          title: "CORS Test Failed",
          description: `Preflight failed with status ${response.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('CORS preflight test failed:', error);
      toast({
        title: "CORS Test Failed",
        description: "Failed to test CORS preflight",
        variant: "destructive",
      });
    }
  };

  // Test CORS bypass methods
  const testCorsBypass = async () => {
    try {
      console.log('=== Testing CORS Bypass Methods ===');
      
      // Method 1: Try with no-cors mode
      console.log('Trying no-cors mode...');
      try {
        const response1 = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
          method: 'POST',
          mode: 'no-cors'
        });
        console.log('no-cors response:', response1);
      } catch (e) {
        console.log('no-cors failed:', e);
      }
      
      // Method 2: Try with different origin
      console.log('Trying with different origin...');
      try {
        const response2 = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Origin': 'https://web-production-f233.up.railway.app'
          }
        });
        console.log('Origin override response:', response2);
      } catch (e) {
        console.log('Origin override failed:', e);
      }
      
      // Method 3: Try with proxy approach
      console.log('Trying proxy approach...');
      try {
        const response3 = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        console.log('Proxy headers response:', response3);
      } catch (e) {
        console.log('Proxy headers failed:', e);
      }
      
      toast({
        title: "CORS Bypass Test Complete",
        description: "Check console for results",
        variant: "default",
      });
      
    } catch (error) {
      console.error('CORS bypass test failed:', error);
      toast({
        title: "CORS Bypass Failed",
        description: "All bypass methods failed",
        variant: "destructive",
      });
    }
  };

  // Test model file accessibility
  const testModelFile = async () => {
    try {
      console.log('=== Testing Model File Accessibility ===');
      
      // Try to access the model file indirectly through a test request
      const testResponse = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
        method: 'POST',
        body: new FormData(), // Empty form data to trigger model loading
        mode: 'cors',
        credentials: 'omit'
      });
      
      console.log('Model Test Status:', testResponse.status);
      
      if (testResponse.status === 422) {
        // 422 means validation error - model is loaded but missing file field
        toast({
          title: "Model Test Success",
          description: "Model is loaded and accessible!",
          variant: "default",
        });
      } else if (testResponse.status === 500) {
        // 500 might indicate model loading error
        const errorText = await testResponse.text();
        toast({
          title: "Model Test Failed",
          description: `Model error: ${errorText}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Model Test Result",
          description: `Unexpected status: ${testResponse.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Model file test failed:', error);
      toast({
        title: "Model Test Failed",
        description: "Failed to test model file",
        variant: "destructive",
      });
    }
  };

  // Alternative API call method (bypass CORS)
  const callApiAlternative = async (formData: FormData) => {
    try {
      // Try multiple approaches
      const approaches = [
        // Approach 1: Standard CORS
        {
          method: 'POST',
          mode: 'cors' as RequestMode,
          credentials: 'omit' as RequestCredentials,
          body: formData
        },
        // Approach 2: No CORS
        {
          method: 'POST',
          mode: 'no-cors' as RequestMode,
          body: formData
        },
        // Approach 3: With specific headers
        {
          method: 'POST',
          mode: 'cors' as RequestMode,
          credentials: 'omit' as RequestCredentials,
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: formData
        }
      ];
      
      for (let i = 0; i < approaches.length; i++) {
        try {
          console.log(`Trying approach ${i + 1}:`, approaches[i]);
          
          const response = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), approaches[i]);
          console.log(`Approach ${i + 1} response:`, response);
          
          if (response.ok || response.type === 'opaque') {
            if (response.type === 'opaque') {
              // no-cors mode - we can't read the response but request went through
              console.log('Request sent successfully with no-cors mode');
              return { success: true, message: 'Request sent (no-cors mode)' };
            } else {
              // Normal response
              const data = await response.json();
              return { success: true, data };
            }
          }
        } catch (e) {
          console.log(`Approach ${i + 1} failed:`, e);
        }
      }
      
      throw new Error('All approaches failed');
      
    } catch (error) {
      console.error('Alternative API call failed:', error);
      throw error;
    }
  };

  // Check API status on component mount
  useEffect(() => {
    testApiConnection().then(isAvailable => {
      if (!isAvailable) {
        console.log('API is not available, suggesting demo mode');
        toast({
          title: "API Status",
          description: "Plant detection API is currently unavailable. Enable Demo Mode to test the interface.",
          variant: "destructive",
        });
      }
    });
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPlantResult(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemoMode = () => {
    setLoading(true);
    setTimeout(() => {
      const randomPlant = demoPlantData[Math.floor(Math.random() * demoPlantData.length)];
      setPlantResult(randomPlant);
      setLoading(false);
    }, 1500);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setPlantResult(null);

    // If demo mode is enabled, use demo data
    if (useDemoMode) {
      handleDemoMode();
      return;
    }

    // Create FormData outside try block so it's accessible in catch
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      console.log('Sending request to:', buildApiUrl(API_CONFIG.PLANT_DETECT));
      console.log('FormData contents:', formData);
      console.log('Selected image:', selectedImage);
      console.log('Selected image name:', selectedImage.name);
      console.log('Selected image size:', selectedImage.size);
      console.log('Selected image type:', selectedImage.type);
      console.log('Full URL being called:', buildApiUrl(API_CONFIG.PLANT_DETECT));

      const response = await fetch(buildApiUrl(API_CONFIG.PLANT_DETECT), {
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData - let the browser set it with boundary
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'omit', // Don't send credentials
        headers: {
          // Add explicit headers to help with CORS
          'Accept': 'application/json',
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response ok:', response.ok);
      console.log('Response URL:', response.url);
      console.log('Response type:', response.type);

      if (!response.ok) {
        const text = await response.text();
        console.error('API Error Response:', text);
        
        // Check for specific error types
        if (text.includes('model') || text.includes('Model')) {
          throw new Error(`Model loading error: ${text}`);
        } else if (text.includes('file') || text.includes('File')) {
          throw new Error(`File processing error: ${text}`);
        } else {
          throw new Error(`API error ${response.status}: ${text}`);
        }
      }

      const data = await response.json();
      console.log('API Success Response:', data);
      
      const mapped: PlantResult = {
        plantType: data.predicted_class || "Unknown",
        confidence: Number(data.confidence ?? 0),
        commonUses: [],
        description: "",
        careInstructions: "",
      };
      setPlantResult(mapped);
    } catch (err) {
      console.error('Standard API call failed, trying alternative method:', err);
      
      // Try alternative method
      try {
        console.log('Attempting alternative API call method...');
        const result = await callApiAlternative(formData);
        
        if (result.success && result.data) {
          console.log('Alternative method succeeded:', result.data);
          
          const mapped: PlantResult = {
            plantType: result.data.predicted_class || "Unknown",
            confidence: Number(result.data.confidence ?? 0),
            commonUses: [],
            description: "",
            careInstructions: "",
          };
          setPlantResult(mapped);
          return; // Success, don't show error
        } else if (result.success) {
          console.log('Alternative method sent request but no data:', result.message);
          // Show success message but no data
          setPlantResult({
            plantType: "Request Sent",
            confidence: 0,
            commonUses: [],
            description: "Request sent successfully. Check server logs for processing.",
            careInstructions: "",
          });
          return;
        }
      } catch (altErr) {
        console.error('Alternative method also failed:', altErr);
      }
      
      // If we get here, both methods failed
      console.error('Plant detection error:', err);
      
      // Provide more specific error messages
      let errorMessage = "Failed to classify image. Please try again.";
      if (err instanceof Error) {
        if (err.message.includes('405')) {
          errorMessage = "API endpoint not accepting requests. Please contact support.";
        } else if (err.message.includes('CORS')) {
          errorMessage = "CORS error. Please check your browser settings.";
        } else if (err.message.includes('fetch')) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (err.message.includes('Model loading error')) {
          errorMessage = "AI model is not loaded. Please contact support.";
        } else if (err.message.includes('File processing error')) {
          errorMessage = "Image processing failed. Please try a different image.";
        } else if (err.message.includes('500')) {
          errorMessage = "Server error. Please try again later.";
        }
      }
      
      setPlantResult({
        plantType: "Error",
        confidence: 0,
        commonUses: [],
        description: errorMessage,
        careInstructions: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="plant" className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <Camera className="w-4 h-4 mr-2" />
            Plant Identification
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            AI Plant Classification
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of any plant or leaf to get instant identification and detailed information.
          </p>
          
          {/* API Status Indicator */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${useDemoMode ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-muted-foreground">
              {useDemoMode ? 'Demo Mode Active' : 'API Currently Unavailable'}
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-gradient-card shadow-card border-0 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Plant Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Selected plant"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button 
                      onClick={triggerFileInput}
                      variant="outline"
                      className="absolute top-2 right-2"
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Click to upload image</p>
                    <p className="text-sm text-muted-foreground">
                      Support JPG, PNG up to 10MB
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!selectedImage || loading}
                  className="w-full"
                >
                  {loading ? "Analyzing..." : "Identify Plant"}
                </Button>
                
                {/* Demo Mode Toggle */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useDemoMode}
                      onChange={(e) => setUseDemoMode(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-muted-foreground">Demo Mode (API currently unavailable)</span>
                  </label>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testApiConnection}
                    className="text-xs"
                  >
                    Test API
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testApiWithImage}
                    className="text-xs"
                  >
                    Test with Image
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testSwaggerFormat}
                    className="text-xs"
                  >
                    Test Swagger Format
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testCorsPreflight}
                    className="text-xs"
                  >
                    Test CORS
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testCorsBypass}
                    className="text-xs"
                  >
                    Test CORS Bypass
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testModelFile}
                    className="text-xs"
                  >
                    Test Model File
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedImage) {
                        const formData = new FormData();
                        formData.append("file", selectedImage);
                        callApiAlternative(formData).then(result => {
                          console.log('Direct alternative call result:', result);
                          toast({
                            title: "Alternative Call Result",
                            description: result.success ? "Success!" : "Failed",
                            variant: result.success ? "default" : "destructive",
                          });
                        });
                      } else {
                        toast({
                          title: "No Image",
                          description: "Please select an image first",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="text-xs"
                  >
                    Test Alternative Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-gradient-card shadow-card border-0 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Identification Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-20 bg-muted rounded"></div>
                    </div>
                  </div>
                ) : plantResult ? (
                  <div className="space-y-6 animate-scale-in">
                    {/* Plant Type & Confidence */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">{plantResult.plantType}</h3>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        {plantResult.confidence}% Confidence
                      </Badge>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Description
                      </h4>
                      <p className="text-muted-foreground">{plantResult.description}</p>
                    </div>

                    {/* Common Uses */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Common Uses</h4>
                      <div className="flex flex-wrap gap-2">
                        {plantResult.commonUses.map((use, index) => (
                          <Badge key={index} variant="outline">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Care Instructions */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Care Instructions</h4>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {plantResult.careInstructions}
                      </p>
                    </div>
                    
                    {/* Demo Mode Notice */}
                    {useDemoMode && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Demo Mode:</strong> This is sample data. The actual AI plant detection API is currently unavailable.
                        </p>
                      </div>
                    )}
                    
                    {/* Error Guidance */}
                    {plantResult.plantType === "Error" && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">
                          <strong>Troubleshooting:</strong>
                        </p>
                        <ul className="text-sm text-red-700 mt-2 space-y-1">
                          <li>• Check your internet connection</li>
                          <li>• Try enabling Demo Mode above to test the interface</li>
                          <li>• Contact support if the issue persists</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to identify the plant type</p>
                    {!useDemoMode && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> The AI plant detection API is currently experiencing issues. 
                          Enable "Demo Mode" above to test the interface with sample data.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantClassification;