import React from 'react';
import { ShoppingCart, CreditCard, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
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

interface PurchasePromptProps {
  product: Product;
  requestingAddress: boolean;
  onPurchaseConfirm: () => void;
}

export function PurchasePrompt({ product, requestingAddress, onPurchaseConfirm }: PurchasePromptProps) {
  if (requestingAddress) {
    return (
      <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Shipping Information Required</h3>
              <p className="text-sm text-muted-foreground">Almost there! Just need your address</p>
            </div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.brand} • ${product.price}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Size {product.recommendedSize || 'M'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> You can format your address like: "John Smith, 123 Main St, New York, NY 10001, USA"
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium">Ready to Purchase?</h3>
            <p className="text-sm text-muted-foreground">This piece looks perfect on you!</p>
          </div>
        </div>

        {/* Product Preview */}
        <div className="bg-white/80 rounded-lg p-4 border mb-4">
          <div className="flex items-center gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium text-lg">${product.price}</span>
                <Badge variant="outline" className="text-xs">{product.color}</Badge>
                <Badge variant="default" className="text-xs">
                  Size {product.recommendedSize || 'M'} ✨
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Perfect match!</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-white/60 rounded-lg border">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs font-medium">Free Returns</p>
            <p className="text-xs text-muted-foreground">30 days</p>
          </div>
          <div className="text-center p-3 bg-white/60 rounded-lg border">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs font-medium">Secure Payment</p>
            <p className="text-xs text-muted-foreground">Protected</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={onPurchaseConfirm} 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
            size="lg"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Yes, I want to buy this!
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            Maybe later
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-3">
          🚚 Free shipping on orders over $50 • ⚡ Fast 2-7 day delivery
        </p>
      </CardContent>
    </Card>
  );
}