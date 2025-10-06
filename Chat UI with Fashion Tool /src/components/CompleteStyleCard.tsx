import React, { useState } from 'react';
import { Sparkles, ShoppingCart, Heart, ExternalLink, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
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

interface StyleLook {
  id: string;
  title: string;
  description: string;
  occasion: string;
  totalPrice: number;
  items: Product[];
  mainItem: Product; // The item the user originally tried on
}

interface CompleteStyleCardProps {
  styleLook: StyleLook;
  tryOnImages?: Record<string, string>;
  onTryOnComplete?: (productId: string, userImage: string) => void;
  onTryOnModalClose?: (productId: string) => void;
  onAnalysisComplete?: (productId: string, analysisData: any) => void;
  onStyleSave?: (styleId: string) => void;
}

export function CompleteStyleCard({ 
  styleLook, 
  tryOnImages = {},
  onTryOnComplete,
  onTryOnModalClose,
  onAnalysisComplete,
  onStyleSave
}: CompleteStyleCardProps) {
  const [selectedTryOnProduct, setSelectedTryOnProduct] = useState<Product | null>(null);
  const [isShoppyFitOpen, setIsShoppyFitOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isStyleSaved, setIsStyleSaved] = useState(false);

  const handleTryOnClick = (product: Product) => {
    setSelectedTryOnProduct(product);
    setIsShoppyFitOpen(true);
  };

  const handleModalClose = () => {
    setIsShoppyFitOpen(false);
    setSelectedTryOnProduct(null);
  };

  const handleTryOnSuccess = (userImage: string) => {
    if (selectedTryOnProduct) {
      onTryOnComplete?.(selectedTryOnProduct.id, userImage);
    }
  };

  const handleAnalysisComplete = (analysisData: any) => {
    if (selectedTryOnProduct) {
      onAnalysisComplete?.(selectedTryOnProduct.id, analysisData);
    }
  };

  const handleHeartClick = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems(prev => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };

  const handleSaveStyle = () => {
    setIsStyleSaved(!isStyleSaved);
    onStyleSave?.(styleLook.id);
  };

  const handleAddAllToCart = () => {
    // Add all items to cart functionality
    console.log('Added complete style to cart:', styleLook);
  };

  const discountPercentage = Math.round((1 - (styleLook.totalPrice / styleLook.items.reduce((sum, item) => sum + item.price, 0))) * 100);

  return (
    <>
      {selectedTryOnProduct && (
        <ShoppyFitModal
          isOpen={isShoppyFitOpen}
          onClose={handleModalClose}
          onTryOnSuccess={handleTryOnSuccess}
          onAnalysisComplete={handleAnalysisComplete}
          product={selectedTryOnProduct}
        />
      )}

      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{styleLook.title}</h3>
                <p className="text-sm text-muted-foreground">{styleLook.description}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {styleLook.occasion}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveStyle}
              className={`${isStyleSaved ? 'text-red-500' : 'text-muted-foreground'} transition-colors`}
            >
              <Heart className={`w-5 h-5 ${isStyleSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Main Item - The one that was originally tried on */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-xs font-medium text-primary">Your Selected Item</span>
            </div>
            
            <div className="bg-white/50 rounded-lg p-2 border">
              <div className="flex gap-2">
                <div className="relative w-14 h-14 rounded-md overflow-hidden">
                  <ImageWithFallback
                    src={tryOnImages[styleLook.mainItem.id] || styleLook.mainItem.image}
                    alt={styleLook.mainItem.name}
                    className="w-full h-full object-cover"
                  />
                  {tryOnImages[styleLook.mainItem.id] && (
                    <div className="absolute top-0.5 left-0.5">
                      <div className="bg-green-500 text-white px-1 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        Tried
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-1 text-xs">{styleLook.mainItem.name}</h4>
                  <p className="text-xs text-muted-foreground">{styleLook.mainItem.brand}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-medium text-xs">${styleLook.mainItem.price}</span>
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      {styleLook.mainItem.recommendedSize || 'M'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complementary Items */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
              <span className="text-xs font-medium">Complete the Look</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {styleLook.items.filter(item => item.id !== styleLook.mainItem.id).map((item) => (
                <div key={item.id} className="bg-white/50 rounded-lg p-2 border hover:shadow-md transition-shadow">
                  <div className="space-y-1.5">
                    <div className="relative aspect-square rounded-md overflow-hidden">
                      <ImageWithFallback
                        src={tryOnImages[item.id] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {tryOnImages[item.id] && (
                        <div className="absolute top-1 left-1">
                          <div className="bg-green-500/90 text-white px-1 py-0.5 rounded-full text-xs flex items-center gap-0.5">
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                            <span className="text-xs">✓</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-1 right-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleHeartClick(item.id, e)}
                          className={`w-5 h-5 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full ${
                            savedItems.has(item.id) ? 'text-red-500' : 'text-gray-600'
                          }`}
                        >
                          <Heart className={`w-2.5 h-2.5 ${savedItems.has(item.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium line-clamp-1 text-xs">{item.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{item.brand}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-medium text-xs">${item.price}</span>
                        <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                          {item.recommendedSize || 'M'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTryOnClick(item)}
                        className="flex-1 text-xs h-6 px-1"
                      >
                        <ExternalLink className="w-2.5 h-2.5 mr-0.5" />
                        Try
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-1.5"
                      >
                        <ShoppingCart className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Style Summary */}
          <div className="bg-white/70 rounded-lg p-3 border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Complete Style</span>
              {discountPercentage > 0 && (
                <Badge className="bg-green-500 text-white text-xs">
                  {discountPercentage}% Off
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-muted-foreground">
                {styleLook.items.length} items • {styleLook.occasion}
              </div>
              <div className="text-right">
                {discountPercentage > 0 && (
                  <div className="text-xs text-muted-foreground line-through">
                    ${styleLook.items.reduce((sum, item) => sum + item.price, 0)}
                  </div>
                )}
                <div className="font-semibold text-sm">
                  ${styleLook.totalPrice}
                </div>
              </div>
            </div>

            <div className="flex gap-1.5">
              <Button onClick={handleAddAllToCart} className="flex-1 h-8 text-xs">
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add Look
              </Button>
              <Button variant="outline" onClick={handleSaveStyle} className="h-8 px-2">
                <Heart className={`w-3 h-3 ${isStyleSaved ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}