import React, { useState, useEffect } from 'react';
import { Download, Share2, ShoppingCart, RotateCcw, X, Box } from 'lucide-react';
import triedOnImage from 'figma:asset/7e9e2f4a46b23faaa5b906e9257615c5917fe836.png';
import redDressMidi from 'figma:asset/4b2005394f829c3a489a706ec4956e0f9af664b7.png';
import redDressMini from 'figma:asset/086b58b6bb20f1b3cdabc8347ff5b7af2d3ae725.png';
import redDressElegant from 'figma:asset/88987a7ebe34d59282d9d9c4a94354c216e427c3.png';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

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

interface TryOnResultProps {
  userImage: string;
  product: Product;
  onClose: () => void;
  onTryAgain: () => void;
  onTryOnSuccess?: (userImage: string) => void;
  onViewIn3D?: () => void;
}

export function TryOnResult({ userImage, product, onClose, onTryAgain, onTryOnSuccess, onViewIn3D }: TryOnResultProps) {
  const [isProcessing, setIsProcessing] = useState(true);

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

  // Simulate processing time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // Create a link to download the result
    const link = document.createElement('a');
    link.href = selectedTryOnImage; // Use the selected try-on result
    link.download = `tryOn_${product.name.replace(/\s+/g, '_')}.jpg`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I tried on ${product.name}!`,
        text: `Check out how I look in this ${product.name} from ${product.brand}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
    // Add to cart functionality
  };

  const handleKeepLook = () => {
    onTryOnSuccess?.(selectedTryOnImage);
    onClose();
  };

  const handleClose = () => {
    // Save the try-on result when closing
    onTryOnSuccess?.(selectedTryOnImage);
    onClose();
  };

  if (isProcessing) {
    return (
      <div className="p-6 text-center max-w-md mx-auto">
        {/* Processing preview */}
        <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-6">
          <img 
            src={userImage} 
            alt="Your photo" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">Creating your try-on...</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please wait while we fit the {product.name} on you
        </p>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <span className="text-muted-foreground">Analyzing your photo...</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-muted-foreground">Fitting the garment...</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-muted-foreground">Applying lighting and shadows...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Your Virtual Try-On</h2>
          <p className="text-sm text-muted-foreground">How you look in {product.name}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Before */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-center">Original Photo</h3>
            <div className="aspect-[3/4] overflow-hidden rounded-lg border">
              <img 
                src={userImage} 
                alt="Your original photo" 
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* After - Mock try-on result */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-center">With {product.name}</h3>
            <div className="aspect-[3/4] overflow-hidden rounded-lg border relative">
              {/* Tried-on result image */}
              <img 
                src={selectedTryOnImage} 
                alt="Try-on result" 
                className="w-full h-full object-cover"
              />
              
              {/* Try-on badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-500/90 text-white border-0">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  AI Try-On
                </Badge>
              </div>
              
              {/* Bottom overlay with product info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="text-white text-sm">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-white/80 text-xs">{product.brand} • ${product.price}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Info */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium">${product.price}</span>
                <Badge variant="secondary" className="text-xs">{product.color}</Badge>
                {product.recommendedSize && (
                  <Badge variant="default" className="text-xs">
                    Size {product.recommendedSize} ✨
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Actions */}
      <div className="space-y-3 mb-4">
        {onViewIn3D && (
          <Button onClick={onViewIn3D} className="w-full" size="lg">
            <Box className="w-4 h-4 mr-2" />
            View in 3D & Get Analysis
          </Button>
        )}
        <Button onClick={handleKeepLook} variant="outline" className="w-full" size="lg">
          ✨ Keep This Look
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button onClick={handleAddToCart} variant="outline" className="flex-1">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button onClick={onTryAgain} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={handleDownload} variant="ghost" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button onClick={handleShare} variant="ghost" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          This is a simulated try-on result. Actual fit and appearance may vary.
          For the best experience, we recommend ordering your usual size.
        </p>
      </div>
    </div>
  );
}