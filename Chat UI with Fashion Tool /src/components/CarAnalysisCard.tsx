import React from "react";
import { Car, Camera, Palette, Calendar, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CarAnalysis {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate?: string;
  bodyType: string;
  estimatedMileage?: string;
  condition: "Excellent" | "Good" | "Fair" | "Needs Work";
  identifiedParts: string[];
  recommendedUpgrades: string[];
}

interface CarAnalysisCardProps {
  carImage: string;
  analysis: CarAnalysis;
}

export function CarAnalysisCard({ carImage, analysis }: CarAnalysisCardProps) {
  const conditionColors = {
    Excellent: "bg-green-100 text-green-800",
    Good: "bg-blue-100 text-blue-800", 
    Fair: "bg-yellow-100 text-yellow-800",
    "Needs Work": "bg-red-100 text-red-800"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5" />
          Car Analysis Results
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Car Image */}
        <div className="aspect-video rounded-lg overflow-hidden">
          <ImageWithFallback
            src={carImage}
            alt="Your car"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Vehicle Details</span>
            </div>
            
            <div className="space-y-2 pl-6">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Make & Model:</span>
                <span className="text-sm font-medium">{analysis.make} {analysis.model}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Year:</span>
                <span className="text-sm font-medium">{analysis.year}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Body Type:</span>
                <span className="text-sm font-medium">{analysis.bodyType}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Color:</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: analysis.color.toLowerCase() }}></div>
                  <span className="text-sm font-medium">{analysis.color}</span>
                </div>
              </div>

              {analysis.licensePlate && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">License Plate:</span>
                  <span className="text-sm font-medium font-mono bg-muted px-2 py-1 rounded">{analysis.licensePlate}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Condition Assessment</span>
            </div>
            
            <div className="space-y-2 pl-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Overall Condition:</span>
                <Badge className={`${conditionColors[analysis.condition]} border-0`}>
                  {analysis.condition}
                </Badge>
              </div>
              
              {analysis.estimatedMileage && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Est. Mileage:</span>
                  <span className="text-sm font-medium">{analysis.estimatedMileage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Identified Parts */}
        {analysis.identifiedParts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Visible Parts</span>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {analysis.identifiedParts.map((part, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {part}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Upgrades */}
        {analysis.recommendedUpgrades.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Recommended Upgrades</span>
            </div>
            <div className="space-y-2 pl-6">
              {analysis.recommendedUpgrades.map((upgrade, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-sm">{upgrade}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}