import React, { useState, useEffect } from 'react';
import { ExternalLink, Heart, ShoppingCart, X, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppyFitModal } from './ShoppyFitModal';

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

interface ProductCardProps {
  product: Product;
  tryOnImage?: string;
  onTryOnComplete?: (productId: string, userImage: string) => void;
  onTryOnModalClose?: (productId: string) => void;
  onAnalysisComplete?: (productId: string, analysisData: AnalysisData) => void;
}

export function ProductCard({ 
  product, 
  tryOnImage, 
  onTryOnComplete, 
  onTryOnModalClose,
  onAnalysisComplete
}: ProductCardProps) {
  const [isShoppyFitOpen, setIsShoppyFitOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [objectFit, setObjectFit] = useState<'contain' | 'cover'>('contain');

  const handleTryOnClick = () => {
    setIsShoppyFitOpen(true);
  };

  const handleModalClose = () => {
    setIsShoppyFitOpen(false);
    // Don't call onTryOnModalClose here - we want to keep the image
  };

  const handleTryOnSuccess = (userImage: string) => {
    onTryOnComplete?.(product.id, userImage);
    // Don't close modal here - let the TryOnResult component handle it
  };

  const handleAnalysisComplete = (analysisData: AnalysisData) => {
    onAnalysisComplete?.(product.id, analysisData);
  };

  const handleClearTryOn = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTryOnModalClose?.(product.id);
  };

  const handleAddToCart = () => {
    // Add to cart functionality
    console.log('Added to cart:', product);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleZoomReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tryOnImage || zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tryOnImage) return;
    e.preventDefault();
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setImagePosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleToggleFit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setObjectFit(prev => prev === 'contain' ? 'cover' : 'contain');
    // Reset zoom and position when changing fit
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleImageDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tryOnImage) return;
    
    if (zoomLevel === 1) {
      setZoomLevel(1.5);
    } else {
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  // Reset zoom when try-on image changes
  useEffect(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsDragging(false);
    setObjectFit('cover'); // Default to cover for better presentation
  }, [tryOnImage]);

  return (
    <>
      <ShoppyFitModal
        isOpen={isShoppyFitOpen}
        onClose={handleModalClose}
        onTryOnSuccess={handleTryOnSuccess}
        onAnalysisComplete={handleAnalysisComplete}
        product={product}
      />
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div 
        className={`overflow-hidden relative cursor-pointer select-none ${
          tryOnImage 
            ? 'aspect-[3/4] bg-gradient-to-b from-muted/20 to-muted/40' 
            : 'aspect-square'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleImageDoubleClick}
        style={{ cursor: isDragging ? 'grabbing' : (tryOnImage && zoomLevel > 1 ? 'grab' : 'pointer') }}
      >
        <ImageWithFallback
          src={tryOnImage || product.image}
          alt={tryOnImage ? `You wearing ${product.name}` : product.name}
          className={`w-full h-full transition-transform duration-300 ${
            tryOnImage 
              ? (objectFit === 'contain' ? 'object-contain' : 'object-cover object-top')
              : 'object-cover hover:scale-105'
          }`}
          style={tryOnImage ? {
            transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
            transformOrigin: objectFit === 'contain' ? 'center' : 'center top'
          } : {}}
        />
        
        {tryOnImage && (
          <>
            <div className="absolute top-2 left-2">
              <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Tried On
              </div>
            </div>
            
            {/* Zoom Controls */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFit}
                className="w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full"
                title={objectFit === 'contain' ? 'Crop to fit card' : 'Show full image'}
              >
                {objectFit === 'contain' ? <Maximize className="w-3 h-3" /> : <Minimize className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-3 h-3" />
              </Button>
              {(zoomLevel !== 1 || imagePosition.x !== 0 || imagePosition.y !== 0) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomReset}
                  className="w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full text-xs"
                  title="Reset zoom and position"
                >
                  1:1
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearTryOn}
                className="w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Status indicators */}
            <div className="absolute bottom-2 left-2 flex flex-col gap-1">
              {/* Fit mode indicator - only show if not default */}
              {objectFit === 'contain' && (
                <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                  Full Image
                </div>
              )}
              
              {/* Interaction hints */}
              {zoomLevel > 1 && !isDragging ? (
                <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                  Drag to pan
                </div>
              ) : zoomLevel === 1 && (
                <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                  Double-click to zoom
                </div>
              )}
            </div>

            {/* Zoom level indicator */}
            {zoomLevel !== 1 && (
              <div className="absolute bottom-2 right-2">
                <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                  {Math.round(zoomLevel * 100)}%
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <CardContent className="p-3 md:p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium line-clamp-2 text-sm md:text-base">{product.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleHeartClick}
            className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 transition-colors ${
              isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-base md:text-lg font-medium">${product.price}</span>
          <Badge variant="secondary" className="text-xs">{product.color}</Badge>
        </div>
        
        <div className="space-y-2 flex-1">
          <p className="text-xs md:text-sm text-muted-foreground">Available sizes:</p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => {
              const isRecommended = product.recommendedSize === size;
              return (
                <Badge 
                  key={size} 
                  variant={isRecommended ? "default" : "outline"} 
                  className={`text-xs ${isRecommended ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : ''}`}
                >
                  {size}
                  {isRecommended && <span className="ml-1">✨</span>}
                </Badge>
              );
            })}
          </div>
          {product.recommendedSize && (
            <p className="text-xs text-primary">✨ {product.recommendedSize} is recommended for you</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 md:p-4 pt-0 mt-auto">
        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1 text-xs md:text-sm" 
            variant={tryOnImage ? "outline" : "default"}
            size="sm"
            onClick={handleTryOnClick}
          >
            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            {tryOnImage ? "Try Again" : "Try it on"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className="px-3"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
    </>
  );
}