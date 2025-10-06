import React, { useState, useEffect } from 'react';
import { RotateCcw, Maximize2, Download, Share2, Eye, Ruler, Palette, User, Sparkles, ArrowRight } from 'lucide-react';
import triedOnImage from 'figma:asset/7e9e2f4a46b23faaa5b906e9257615c5917fe836.png';
import redDressMidi from 'figma:asset/4b2005394f829c3a489a706ec4956e0f9af664b7.png';
import redDressMini from 'figma:asset/086b58b6bb20f1b3cdabc8347ff5b7af2d3ae725.png';
import redDressElegant from 'figma:asset/88987a7ebe34d59282d9d9c4a94354c216e427c3.png';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  sizes: string[];
  color: string;
  category: string;
  recommendedSize?: string;
}

interface ThreeDModelViewerProps {
  userImage: string;
  product: Product;
  onClose: () => void;
  onContinueToChat: (analysisData: AnalysisData) => void;
  onKeepStyle?: (triedOnImage: string) => void;
}

interface AnalysisData {
  measurements: {
    height: string;
    chest: string;
    waist: string;
    hips: string;
    shoulderWidth: string;
  };
  bodyShape: string;
  skinTone: string;
  eyeColor: string;
  recommendedStyles: string[];
  fitConfidence: number;
}

export function ThreeDModelViewer({ userImage, product, onClose, onContinueToChat, onKeepStyle }: ThreeDModelViewerProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // Function to get the appropriate try-on image based on product
  const getTryOnImage = () => {
    const category = product.category.toLowerCase();
    const name = product.name.toLowerCase();
    const brand = product.brand.toLowerCase();

    // Check if it's a dress
    if (category.includes('dress')) {
      // Specific product matching for better results
      if (name.includes('elegant') && brand.includes('evolve')) {
        return redDressMidi; // Elegant Red Dress from Evolve - fits the midi style
      } else if (name.includes('party') && brand.includes('zara')) {
        return redDressMini; // Party Red dress from Zara - perfect for party style
      } else if (name.includes('maxi') || name.includes('aldona') || name.includes('slinky')) {
        return redDressElegant; // Maxi dresses get the elegant draped style
      } else if (name.includes('long') && brand.includes('zara')) {
        return redDressElegant; // Long Red dress - elegant style
      } else if (name.includes('mini') || name.includes('bodycon') || name.includes('short')) {
        return redDressMini; // Mini/bodycon dresses
      } else if (name.includes('midi') || name.includes('mid-length')) {
        return redDressMidi; // Midi length dresses
      } else {
        // Default assignment based on style keywords
        if (name.includes('evening') || name.includes('formal') || name.includes('gown')) {
          return redDressElegant;
        } else if (name.includes('casual') || name.includes('day')) {
          return redDressMidi;
        } else {
          // Final fallback to midi dress for general dresses
          return redDressMidi;
        }
      }
    }
    
    // For non-dress items, use the original try-on image
    return triedOnImage;
  };

  const selectedTryOnImage = getTryOnImage();

  const processingSteps = [
    { label: 'Analyzing body proportions...', progress: 20 },
    { label: 'Creating 3D mesh...', progress: 40 },
    { label: 'Applying textures and lighting...', progress: 60 },
    { label: 'Extracting measurements...', progress: 80 },
    { label: 'Generating style recommendations...', progress: 100 }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsProcessing(false);
            generateAnalysisData();
          }, 1000);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (!isProcessing) {
      const rotationInterval = setInterval(() => {
        setRotationY(prev => (prev + 1) % 360);
      }, 50);

      return () => clearInterval(rotationInterval);
    }
  }, [isProcessing]);

  const generateAnalysisData = () => {
    // Mock analysis data - in reality this would come from AI analysis
    const mockData: AnalysisData = {
      measurements: {
        height: "5'8\" (173 cm)",
        chest: "38\" (97 cm)",
        waist: "32\" (81 cm)",
        hips: "40\" (102 cm)",
        shoulderWidth: "17\" (43 cm)"
      },
      bodyShape: "Athletic Rectangle",
      skinTone: "Medium with warm undertones",
      eyeColor: "Hazel",
      recommendedStyles: [
        "Structured blazers to define waist",
        "High-waisted bottoms to create curves",
        "Earth tones and warm colors",
        "V-neck tops to elongate torso"
      ],
      fitConfidence: 94
    };
    setAnalysisData(mockData);
  };

  const handleContinueToChat = () => {
    if (analysisData) {
      onContinueToChat(analysisData);
    }
  };

  const handleKeepStyle = () => {
    onKeepStyle?.(selectedTryOnImage);
    onClose();
  };

  if (isProcessing) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Creating Your 3D Model</h2>
          <p className="text-muted-foreground">
            Our AI is analyzing your photo and creating a detailed 3D representation
          </p>
        </div>

        {/* Processing visualization */}
        <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/60 rounded-2xl overflow-hidden mb-6">
          <img 
            src={userImage} 
            alt="Your photo" 
            className="w-full h-full object-cover opacity-30"
          />
          
          {/* 3D processing overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Scanning lines */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div 
                  className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
                  style={{
                    top: `${(processingStep * 20) + 10}%`,
                    animation: 'scan 2s ease-in-out infinite'
                  }}
                />
              </div>
              
              {/* 3D wireframe effect */}
              <div className="w-40 h-48 border-2 border-primary/40 rounded-lg relative">
                <div className="absolute inset-2 border border-primary/20 rounded"></div>
                <div className="absolute inset-4 border border-primary/10 rounded"></div>
                
                {/* Corner markers */}
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-3 h-3 border-2 border-primary rounded-full ${
                      i === 0 ? 'top-2 left-2' :
                      i === 1 ? 'top-2 right-2' :
                      i === 2 ? 'bottom-2 left-2' : 'bottom-2 right-2'
                    }`}
                    style={{
                      animation: `pulse 1s ease-in-out infinite ${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Processing Progress</span>
            <span className="text-sm text-muted-foreground">
              {processingSteps[processingStep]?.progress || 0}%
            </span>
          </div>
          
          <Progress value={processingSteps[processingStep]?.progress || 0} className="h-2" />
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              {processingSteps[processingStep]?.label || 'Processing...'}
            </span>
          </div>
        </div>

        <style jsx>{`
          @keyframes scan {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3D Model Viewer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your 3D Model</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset View
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 3D Viewer Container */}
          <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden border-2 border-muted">
            {/* Mock 3D model display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="relative w-48 h-64 transition-transform duration-100"
                style={{
                  transform: `perspective(800px) rotateY(${rotationY}deg) rotateX(5deg)`
                }}
              >
                {/* Main body silhouette */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40 rounded-full blur-sm"></div>
                
                {/* Tried-on image overlay */}
                <img 
                  src={selectedTryOnImage} 
                  alt="3D Model with outfit" 
                  className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-white/50"
                  style={{
                    clipPath: 'ellipse(45% 50% at 50% 50%)',
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                />
                
                {/* 3D effect highlights */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/10 rounded-lg"></div>
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* Product overlay on model */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                <div className="flex items-center gap-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Virtual Try-On</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls overlay */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-green-500/90 text-white">
                <Eye className="w-3 h-3 mr-1" />
                3D Model Ready
              </Badge>
            </div>

            {/* Rotation indicator */}
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
              Auto-rotating...
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Body Analysis Results</h3>
          
          {analysisData && (
            <div className="space-y-4">
              {/* Measurements */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    <h4 className="font-medium">Measurements</h4>
                    <Badge variant="secondary" className="ml-auto">
                      {analysisData.fitConfidence}% Confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(analysisData.measurements).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-1">
                      <span className="text-sm capitalize text-muted-foreground">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium text-sm">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Body Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <h4 className="font-medium">Body Analysis</h4>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Body Shape:</span>
                    <Badge variant="outline">{analysisData.bodyShape}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Skin Tone:</span>
                    <span className="text-sm font-medium">{analysisData.skinTone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Eye Color:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-600 border"></div>
                      <span className="text-sm font-medium">{analysisData.eyeColor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Style Recommendations Preview */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="font-medium">Style Recommendations</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your body analysis, we have personalized style recommendations for you.
                  </p>
                  <div className="space-y-2">
                    {analysisData.recommendedStyles.slice(0, 2).map((style, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>{style}</span>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-2">
                      +{analysisData.recommendedStyles.length - 2} more recommendations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {onKeepStyle && (
              <Button onClick={handleKeepStyle} className="w-full" size="lg">
                ✨ Keep This Style
              </Button>
            )}
            
            <Button onClick={handleContinueToChat} variant="outline" className="w-full" size="lg">
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue to Detailed Analysis
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Save Model
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}