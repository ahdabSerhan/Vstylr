import React from 'react';
import { CheckCircle, Package, Truck, Calendar, MapPin, CreditCard, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

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

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PurchaseConfirmationProps {
  product: Product;
  orderNumber: string;
  estimatedDelivery: string;
  shippingAddress: ShippingAddress;
}

export function PurchaseConfirmation({ 
  product, 
  orderNumber, 
  estimatedDelivery, 
  shippingAddress 
}: PurchaseConfirmationProps) {
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for order:', orderNumber);
  };

  const handleSharePurchase = () => {
    if (navigator.share) {
      navigator.share({
        title: `I just bought ${product.name}!`,
        text: `Check out my new ${product.name} from ${product.brand} - can't wait to wear it!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`I just bought ${product.name} from ${product.brand}! 🛍️✨`);
    }
  };

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-700">Order Confirmed!</h3>
            <p className="text-sm text-green-600">Your purchase is being processed</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="bg-white/80 rounded-lg p-4 border">
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
                <Badge variant="outline" className="text-xs">{product.color}</Badge>
                <Badge variant="default" className="text-xs">
                  Size {product.recommendedSize || 'M'}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-lg">${product.price}</p>
              <p className="text-xs text-muted-foreground">1 item</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Order Number</p>
                <p className="text-sm text-muted-foreground font-mono">{orderNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium text-sm">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Shipping Method</p>
                <p className="text-sm text-muted-foreground">Standard (Free)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium text-sm">Payment Status</p>
                <Badge variant="default" className="text-xs bg-green-500">
                  Paid
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Shipping Address */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <h4 className="font-medium text-sm">Shipping Address</h4>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border text-sm">
            <p className="font-medium">{shippingAddress.fullName}</p>
            <p>{shippingAddress.address}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p>{shippingAddress.country}</p>
          </div>
        </div>

        <Separator />

        {/* Order Total */}
        <div className="bg-white/80 rounded-lg p-4 border">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${product.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>${(product.price * 0.08).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${(product.price * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleDownloadReceipt} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button onClick={handleSharePurchase} variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Purchase
          </Button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
          <h4 className="font-medium text-sm text-blue-700 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>📧 You'll receive a confirmation email shortly</li>
            <li>📦 We'll send tracking info when your order ships</li>
            <li>🚚 Estimated delivery: {estimatedDelivery}</li>
            <li>💫 Get ready to look amazing in your new {product.name}!</li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for your purchase! Questions? Contact our support team.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}