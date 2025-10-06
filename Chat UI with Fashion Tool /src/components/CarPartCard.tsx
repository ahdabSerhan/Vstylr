import React, { useState } from "react";
import { Heart, ExternalLink, ShoppingCart, Star, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CarPart {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  compatibility: string[];
  rating: number;
  reviews: number;
  buyUrl: string;
  specifications: string[];
  installationLevel: "Easy" | "Moderate" | "Professional";
}

interface CarPartCardProps {
  part: CarPart;
  onSave?: (partId: string) => void;
  isSelected?: boolean;
}

export function CarPartCard({ part, onSave, isSelected }: CarPartCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(part.id);
    }
  };

  const handleBuyClick = () => {
    window.open(part.buyUrl, '_blank');
  };

  const installationColors = {
    Easy: "bg-green-100 text-green-800",
    Moderate: "bg-yellow-100 text-yellow-800",
    Professional: "bg-red-100 text-red-800"
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <ImageWithFallback
            src={part.image}
            alt={part.name}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveClick}
            className={`w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full ${
              isSaved ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={`${installationColors[part.installationLevel]} border-0`}>
            <Wrench className="w-3 h-3 mr-1" />
            {part.installationLevel}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium line-clamp-2 mb-1">{part.name}</h3>
            <p className="text-sm text-muted-foreground">{part.brand}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{part.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({part.reviews} reviews)</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">${part.price}</span>
              <Badge variant="outline" className="text-xs">
                {part.category}
              </Badge>
            </div>
          </div>

          {part.specifications.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Specs: </span>
              {part.specifications.slice(0, 2).join(", ")}
              {part.specifications.length > 2 && "..."}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleBuyClick}
              className="flex-1"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>

          {part.compatibility.length > 0 && (
            <div className="pt-2 border-t border-border">
              <span className="text-xs font-medium text-muted-foreground">Compatible with: </span>
              <span className="text-xs text-muted-foreground">
                {part.compatibility.slice(0, 3).join(", ")}
                {part.compatibility.length > 3 && " +more"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}